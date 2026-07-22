import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "prabinxfitness_jwt_secret_key_123456";
const COOKIE_NAME = "admin_token";

// Helper to get authenticated user session and check if they are an ADMIN
async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; username: string; role?: string };
    
    // Check role. If role is not in JWT, fetch from DB
    let role = decoded.role;
    if (!role) {
      const user = await prisma.adminUser.findUnique({
        where: { id: decoded.userId }
      });
      role = user?.role || "ADMIN";
    }

    if (role !== "ADMIN") return null;

    return decoded;
  } catch {
    return null;
  }
}

// GET /api/admin/users - List all users (Admins only)
export async function GET() {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const users = await prisma.adminUser.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Fetch users error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/admin/users - Create a new user (Admins only)
export async function POST(req: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const body = await req.json();
    const { username, password, role } = body;

    if (!username || !password || password.length < 6) {
      return NextResponse.json(
        { error: "Username and password (min 6 characters) are required" },
        { status: 400 }
      );
    }

    const userRole = role === "ADMIN" ? "ADMIN" : "CLIENT";

    // Check if username already exists
    const existingUser = await prisma.adminUser.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 });
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.adminUser.create({
      data: {
        username,
        password: passwordHash,
        role: userRole,
      },
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Create user error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/admin/users - Delete a user (Admins only)
export async function DELETE(req: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");
    if (!idParam) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const idToDelete = parseInt(idParam, 10);
    if (isNaN(idToDelete)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Prevent deleting themselves
    if (idToDelete === admin.userId) {
      return NextResponse.json({ error: "You cannot delete your own account" }, { status: 400 });
    }

    // Check if the user to delete is an ADMIN, and if so, check that we have another admin
    const targetUser = await prisma.adminUser.findUnique({
      where: { id: idToDelete }
    });

    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (targetUser.role === "ADMIN") {
      const adminCount = await prisma.adminUser.count({
        where: { role: "ADMIN" }
      });

      if (adminCount <= 1) {
        return NextResponse.json(
          { error: "Cannot delete the last remaining administrator account" },
          { status: 400 }
        );
      }
    }

    await prisma.adminUser.delete({
      where: { id: idToDelete },
    });

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
