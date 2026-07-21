import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

const JWT_SECRET = process.env.JWT_SECRET || "prabinxfitness_jwt_secret_key_123456";
const COOKIE_NAME = "admin_token";

// Configure Cloudinary if credentials are provided
const useCloudinary = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (useCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export async function POST(req: Request) {
  try {
    // 1. Verify Admin Session
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse Form Data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 3. Validate File Size & Type (e.g. limit to 50MB)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: "File size exceeds limit (50MB)" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let fileUrl = "";

    if (useCloudinary) {
      // Upload to Cloudinary
      try {
        const uploadResult = await new Promise<{ secure_url: string } | null>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: "prabinxfitness",
              resource_type: "auto",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result as { secure_url: string } | null);
            }
          ).end(buffer);
        });
        if (uploadResult && uploadResult.secure_url) {
          fileUrl = uploadResult.secure_url;
        }
      } catch (cloudinaryError) {
        console.error("Cloudinary upload failed, falling back to local storage:", cloudinaryError);
      }
    }

    // Fallback/Local Upload logic
    if (!fileUrl) {
      // 4. Ensure Uploads Directory Exists
      const uploadDir = join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });

      // 5. Generate Unique Filename
      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const uniqueName = `${timestamp}_${safeName}`;
      const filePath = join(uploadDir, uniqueName);

      // 6. Write File to Disk
      await writeFile(filePath, buffer);

      // 7. Return accessible URL
      fileUrl = `/uploads/${uniqueName}`;
    }

    return NextResponse.json({
      success: true,
      url: fileUrl,
      name: file.name
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
