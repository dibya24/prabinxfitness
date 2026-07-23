import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { prisma as defaultPrisma } from "@/src/lib/prisma";

// Use dynamic fallback to new PrismaClient instance if cached global client is stale (lacks new models)
const prisma = (defaultPrisma as any).consultation ? defaultPrisma : new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, goal, message } = body;

    if (!name || !email || !phone || !goal) {
      return NextResponse.json(
        { error: "Name, email, phone, and goal are required." },
        { status: 400 }
      );
    }

    const consultation = await prisma.consultation.create({
      data: {
        name,
        email,
        phone,
        goal,
        message: message || "",
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, consultation });
  } catch (error: any) {
    console.error("Consultation booking error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to book consultation." },
      { status: 500 }
    );
  }
}
