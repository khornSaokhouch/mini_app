import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  const plans = await (db as any).plan.findMany({
    include: { _count: { select: { subscriptions: true } } },
    orderBy: { sortOrder: "asc" }
  })
  return NextResponse.json(plans)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  try {
    const body = await req.json()
    const plan = await (db as any).plan.create({
      data: {
        name: body.name,
        description: body.description ?? null,
        priceMonthly: body.priceMonthly,
        priceYearly: body.priceYearly,
        features: body.features ?? [],
        maxProducts: body.maxProducts ?? 50,
        maxOrders: body.maxOrders ?? 500,
        maxStaff: body.maxStaff ?? 3,
        isActive: true,
        isPopular: body.isPopular ?? false,
        sortOrder: body.sortOrder ?? 0,
      },
      include: { _count: { select: { subscriptions: true } } }
    })
    return NextResponse.json(plan, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: "Failed to create plan" }, { status: 500 })
  }
}
