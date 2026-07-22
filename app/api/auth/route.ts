import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "prabinxfitness_jwt_secret_key_123456";
const COOKIE_NAME = "admin_token";

// GET /api/auth - Check session status and verify if setup is required
export async function GET() {
  try {
    const userCount = await prisma.adminUser.count();
    const firstTimeSetup = userCount === 0;

    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false, firstTimeSetup });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; username: string; role?: string };
      let role = decoded.role;
      if (!role) {
        const dbUser = await prisma.adminUser.findUnique({ where: { id: decoded.userId } });
        role = dbUser?.role || "ADMIN";
      }
      return NextResponse.json({
        authenticated: true,
        firstTimeSetup,
        user: { id: decoded.userId, username: decoded.username, role }
      });
    } catch {
      // Token is invalid or expired
      return NextResponse.json({ authenticated: false, firstTimeSetup });
    }
  } catch (error) {
    console.error("Auth status error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/auth - Login, register (first-time only), or logout
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, username, password } = body;

    const cookieStore = await cookies();

    if (action === "logout") {
      cookieStore.delete(COOKIE_NAME);
      return NextResponse.json({ success: true, message: "Logged out successfully" });
    }

    if (action === "register") {
      const userCount = await prisma.adminUser.count();
      if (userCount > 0) {
        return NextResponse.json({ error: "Admin already exists. Setup blocked." }, { status: 403 });
      }

      if (!username || !password || password.length < 6) {
        return NextResponse.json({ error: "Invalid username or password (min 6 characters)" }, { status: 400 });
      }

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const newUser = await prisma.adminUser.create({
        data: {
          username,
          password: passwordHash,
        },
      });

      // Automatically log them in after registration
      const token = jwt.sign(
        { userId: newUser.id, username: newUser.username, role: newUser.role },
        JWT_SECRET,
        { expiresIn: "1d" }
      );

      cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });

      return NextResponse.json({
        success: true,
        message: "Admin registered and logged in successfully",
        user: { id: newUser.id, username: newUser.username, role: newUser.role }
      });
    }

    if (action === "login") {
      if (!username || !password) {
        return NextResponse.json({ error: "Username and password required" }, { status: 400 });
      }

      const user = await prisma.adminUser.findUnique({
        where: { username },
      });

      if (!user) {
        return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: "1d" }
      );

      cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });

      return NextResponse.json({
        success: true,
        message: "Logged in successfully",
        user: { id: user.id, username: user.username, role: user.role }
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Auth action error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
