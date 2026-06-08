import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import { db } from "./db"
import { redirect } from "next/navigation"

/** Get the current session user or redirect to /login */
export async function requireSession(locale = "en") {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect(`/${locale}/login`)
  return session
}

/** Get the first store owned by the current user */
export async function getCurrentStore() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null
  const userId = (session.user as any).id as string
  return db.store.findFirst({ where: { ownerId: userId } })
}

/** Require a store; redirect to settings if none exists yet */
export async function requireStore(locale = "en") {
  const session = await requireSession(locale)
  const userId = (session.user as any).id as string
  const store = await db.store.findFirst({ where: { ownerId: userId } })
  if (!store) redirect(`/${locale}/dashboard/settings`)
  return store
}

// ── Dashboard Overview Stats ──────────────────────────────────────────────────
export async function getDashboardStats(storeId: string) {
  const [
    totalOrders,
    pendingOrders,
    totalProducts,
    lowStockProducts,
    totalCustomers,
    revenueAgg,
    recentOrders,
    monthlyRevenue,
  ] = await Promise.all([
    db.order.count({ where: { storeId } }),
    db.order.count({ where: { storeId, status: "PENDING" } }),
    db.product.count({ where: { storeId } }),
    db.product.count({ where: { storeId, stockQty: { lte: 5 } } }),
    db.customer.count({ where: { storeId } }),
    db.order.aggregate({
      where: { storeId },
      _sum: { totalAmount: true },
    }),
    db.order.findMany({
      where: { storeId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { customer: true },
    }),
    // Last 6 months of revenue
    db.order.groupBy({
      by: ["createdAt"],
      where: {
        storeId,
        createdAt: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
        },
      },
      _sum: { totalAmount: true },
    }),
  ])

  return {
    totalOrders,
    pendingOrders,
    totalProducts,
    lowStockProducts,
    totalCustomers,
    totalRevenue: revenueAgg._sum.totalAmount ?? 0,
    recentOrders,
    monthlyRevenue,
  }
}

// ── Products ─────────────────────────────────────────────────────────────────
export async function getProducts(storeId: string) {
  return db.product.findMany({
    where: { storeId },
    include: { category: true, brand: true },
    orderBy: { createdAt: "desc" },
  })
}

export async function getProduct(id: string, storeId: string) {
  return db.product.findFirst({
    where: { id, storeId },
    include: { category: true, brand: true, variants: true },
  })
}

// ── Orders ───────────────────────────────────────────────────────────────────
export async function getOrders(storeId: string) {
  return db.order.findMany({
    where: { storeId },
    include: { customer: true, items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  })
}

// ── Customers ─────────────────────────────────────────────────────────────────
export async function getCustomers(storeId: string) {
  return db.customer.findMany({
    where: { storeId },
    include: {
      orders: { select: { id: true, totalAmount: true } },
    },
    orderBy: { createdAt: "desc" },
  })
}

// ── Inventory (products with stock info) ─────────────────────────────────────
export async function getInventory(storeId: string) {
  return db.product.findMany({
    where: { storeId },
    select: {
      id: true,
      name: true,
      sku: true,
      stockQty: true,
      status: true,
      sellPrice: true,
      images: true,
    },
    orderBy: { stockQty: "asc" },
  })
}

// ── Invoices ─────────────────────────────────────────────────────────────────
export async function getInvoices(storeId: string) {
  return db.invoice.findMany({
    where: { order: { storeId } },
    include: {
      order: {
        include: { customer: true, payment: true },
      },
    },
    orderBy: { createdAt: "desc" },
  })
}

// ── Payments ─────────────────────────────────────────────────────────────────
export async function getPayments(storeId: string) {
  return db.payment.findMany({
    where: { order: { storeId } },
    include: {
      order: { include: { customer: true } },
    },
    orderBy: { createdAt: "desc" },
  })
}
