import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, storeName } = await req.json()

    if (!name || !email || !password || !storeName) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ message: "An account with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Generate a unique slug from the store name
    const slug = storeName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 50)
    const uniqueSlug = `${slug}-${Date.now()}`

    // Create user with STORE_OWNER role
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "STORE_OWNER",
      },
    })

    // Create their store
    await db.store.create({
      data: {
        name: storeName,
        slug: uniqueSlug,
        ownerId: user.id,
      },
    })

    return NextResponse.json({
      message: "Account created successfully",
      user: { id: user.id, name: user.name, email: user.email },
    }, { status: 201 })

  } catch (error: any) {
    console.error("[REGISTER_ERROR]", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
