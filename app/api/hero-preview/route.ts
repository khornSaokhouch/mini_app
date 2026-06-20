import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const [
      totalOrders,
      totalRevenue,
      totalProducts,
      totalCustomers,
      // Monthly revenue for last 6 months (for chart)
      monthlyRevenue,
      // Sample products from first store (for Telegram mockup)
      sampleProducts,
    ] = await Promise.all([
      db.order.count(),
      db.order.aggregate({ _sum: { totalAmount: true } }),
      db.product.count(),
      db.customer.count(),
      db.order.groupBy({
        by: ["createdAt"],
        where: {
          createdAt: {
            gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
          },
        },
        _sum: { totalAmount: true },
        orderBy: { createdAt: "asc" },
      }),
      db.product.findMany({
        take: 4,
        where: { status: "ACTIVE" },
        select: {
          id: true,
          name: true,
          sellPrice: true,
          images: true,
        },
        orderBy: { createdAt: "desc" },
      }),
    ])

    // Aggregate monthly revenue into a simpler format by month label
    const monthMap: Record<string, number> = {}
    for (const row of monthlyRevenue) {
      const label = new Date(row.createdAt).toLocaleString("en", {
        month: "short",
        year: "2-digit",
      })
      monthMap[label] = (monthMap[label] ?? 0) + (row._sum.totalAmount ?? 0)
    }
    const chartData = Object.entries(monthMap).map(([month, total]) => ({
      month,
      total,
    }))

    return NextResponse.json({
      stats: {
        totalOrders,
        totalRevenue: totalRevenue._sum.totalAmount ?? 0,
        totalProducts,
        totalCustomers,
      },
      chartData,
      products: sampleProducts,
    })
  } catch (error) {
    console.error("[hero-preview]", error)
    return NextResponse.json(
      { error: "Failed to load preview data" },
      { status: 500 }
    )
  }
}
