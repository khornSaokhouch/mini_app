import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const plans = await db.plan.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" }
    })
    return NextResponse.json(plans)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch plans" }, { status: 500 })
  }
}
