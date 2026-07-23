import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { prisma as defaultPrisma } from "@/src/lib/prisma";
import jwt from "jsonwebtoken";

// Use dynamic fallback to new PrismaClient instance if cached global client is stale (lacks new models)
const prisma = (defaultPrisma as any).consultation ? defaultPrisma : new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "prabinxfitness_jwt_secret_key_123456";
const COOKIE_NAME = "admin_token";

async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; username: string; role?: string };
    return decoded;
  } catch {
    return null;
  }
}

export async function GET() {
  const currentUser = await getSessionUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const consultations = await prisma.consultation.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, consultations });
  } catch (error: unknown) {
    console.error("Fetch consultations error:", error);
    return NextResponse.json({ error: "Failed to fetch consultations" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const currentUser = await getSessionUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing ID or status" }, { status: 400 });
    }

    const updated = await prisma.consultation.update({
      where: { id: Number(id) },
      data: { status },
    });

    return NextResponse.json({ success: true, consultation: updated });
  } catch (error: unknown) {
    console.error("Update consultation error:", error);
    return NextResponse.json({ error: "Failed to update consultation" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const currentUser = await getSessionUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing ID parameter" }, { status: 400 });
    }

    await prisma.consultation.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true, message: "Consultation deleted successfully" });
  } catch (error: unknown) {
    console.error("Delete consultation error:", error);
    return NextResponse.json({ error: "Failed to delete consultation" }, { status: 500 });
  }
}
