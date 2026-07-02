import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  try {
    const { id } = await params
    const body = await req.json()
    const sub = await (db as any).subscription.update({
      where: { id },
      data: {
        ...body,
        cancelledAt: body.status === "CANCELLED" ? new Date() : undefined,
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        plan: { select: { id: true, name: true, priceMonthly: true, priceYearly: true } },
      }
    })
    return NextResponse.json(sub)
  } catch {
    return NextResponse.json({ error: "Failed to update subscription" }, { status: 500 })
  }
}
