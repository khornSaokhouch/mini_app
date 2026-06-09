"use server"

import { revalidatePath } from "next/cache"
import { db } from "./db"
import { requireStore } from "./data"

// --- Products ---

export async function createProduct(data: {
  name: string
  description?: string
  sku?: string
  barcode?: string
  costPrice: number
  sellPrice: number
  stockQty: number
  status: string
  categoryId?: string
  brandId?: string
  images?: string[]
  variants: { name: string; value: string; price: number }[]
}) {
  const store = await requireStore()

  const product = await db.product.create({
    data: {
      storeId: store.id,
      name: data.name,
      description: data.description,
      sku: data.sku,
      barcode: data.barcode,
      costPrice: data.costPrice,
      sellPrice: data.sellPrice,
      stockQty: data.stockQty,
      status: data.status,
      categoryId: data.categoryId || null,
      brandId: data.brandId || null,
      images: data.images ?? [],
      variants: {
        create: data.variants.map((v) => ({
          name: v.name,
          value: v.value,
          additionalPrice: v.price,
          stockQty: data.stockQty, // Default variant stock to product stock
        })),
      },
    },
  })

  revalidatePath("/[locale]/dashboard/products", "layout")
  return { success: true, product }
}

export async function updateProduct(id: string, data: any) {
  const store = await requireStore()

  // Verify ownership
  const existing = await db.product.findFirst({ where: { id, storeId: store.id } })
  if (!existing) throw new Error("Product not found")

  const product = await db.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      sku: data.sku,
      barcode: data.barcode,
      costPrice: data.costPrice,
      sellPrice: data.sellPrice,
      stockQty: data.stockQty,
      status: data.status,
      categoryId: data.categoryId || null,
      brandId: data.brandId || null,
      images: data.images ?? [],
      // Variants update would require deleting and recreating or complex upserts.
      // For simplicity in this iteration, we recreate them if provided.
      ...(data.variants && {
        variants: {
          deleteMany: {},
          create: data.variants.map((v: any) => ({
            name: v.name,
            value: v.value,
            additionalPrice: v.price,
            stockQty: data.stockQty,
          })),
        },
      }),
    },
  })

  revalidatePath("/[locale]/dashboard/products", "layout")
  return { success: true, product }
}

export async function deleteProduct(id: string) {
  const store = await requireStore()

  // Verify ownership
  const existing = await db.product.findFirst({ where: { id, storeId: store.id } })
  if (!existing) throw new Error("Product not found")

  await db.product.delete({ where: { id } })
  revalidatePath("/[locale]/dashboard/products", "layout")
  return { success: true }
}

// --- Store Settings ---

export async function updateStore(data: {
  name: string
  slug: string
  currency: string
  language: string
  bakongLink?: string
  abaMerchantLink?: string
  telegramBot?: string
}) {
  const store = await requireStore()

  const updated = await db.store.update({
    where: { id: store.id },
    data: {
      name: data.name,
      slug: data.slug,
      currency: data.currency,
      language: data.language,
      bakongLink: data.bakongLink || null,
      abaMerchantLink: data.abaMerchantLink || null,
      telegramBot: data.telegramBot || null,
    },
  })

  // Auto-register the Telegram webhook after saving a new token
  if (data.telegramBot) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || ""
    const webhookUrl = `${appUrl}/api/telegram?storeId=${store.id}`
    try {
      const res = await fetch(
        `https://api.telegram.org/bot${data.telegramBot}/setWebhook`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: webhookUrl }),
        }
      )
      const result = await res.json()
      if (!result.ok) {
        console.error("[setWebhook] Telegram error:", result.description)
        revalidatePath("/[locale]/dashboard/settings", "layout")
        return { success: false, error: `Telegram setWebhook failed: ${result.description}` }
      }
    } catch (err) {
      console.error("[setWebhook] Network error:", err)
      revalidatePath("/[locale]/dashboard/settings", "layout")
      return { success: false, error: "Could not reach Telegram API" }
    }
  }

  revalidatePath("/[locale]/dashboard/settings", "layout")
  return { success: true, store: updated }
}

// --- Customers ---

export async function createCustomer(data: { name: string; email?: string; phone?: string; notes?: string }) {
  const store = await requireStore()

  const customer = await db.customer.create({
    data: {
      storeId: store.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      notes: data.notes,
    },
  })

  revalidatePath("/[locale]/dashboard/customers", "layout")
  return { success: true, customer }
}

export async function updateCustomer(id: string, data: any) {
  const store = await requireStore()

  const existing = await db.customer.findFirst({ where: { id, storeId: store.id } })
  if (!existing) throw new Error("Customer not found")

  const customer = await db.customer.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      notes: data.notes,
    },
  })

  revalidatePath("/[locale]/dashboard/customers", "layout")
  return { success: true, customer }
}

export async function deleteCustomer(id: string) {
  const store = await requireStore()

  const existing = await db.customer.findFirst({ where: { id, storeId: store.id } })
  if (!existing) throw new Error("Customer not found")

  await db.customer.delete({ where: { id } })
  revalidatePath("/[locale]/dashboard/customers", "layout")
  return { success: true }
}

// --- Orders ---

export async function updateOrderStatus(id: string, status: any) {
  const store = await requireStore()

  const existing = await db.order.findFirst({ where: { id, storeId: store.id } })
  if (!existing) throw new Error("Order not found")

  const order = await db.order.update({
    where: { id },
    data: { status },
  })

  revalidatePath("/[locale]/dashboard/orders", "layout")
  return { success: true, order }
}

export async function deleteOrder(id: string) {
  const store = await requireStore()

  const existing = await db.order.findFirst({ where: { id, storeId: store.id } })
  if (!existing) throw new Error("Order not found")

  await db.order.delete({ where: { id } })
  revalidatePath("/[locale]/dashboard/orders", "layout")
  return { success: true }
}

// --- Categories & Brands ---

export async function getOrCreateCategory(name: string) {
  const store = await requireStore()
  if (!name.trim()) return null

  let category = await db.category.findFirst({ where: { storeId: store.id, name } })
  if (!category) {
    category = await db.category.create({
      data: { storeId: store.id, name },
    })
  }
  return category
}

export async function getOrCreateBrand(name: string) {
  const store = await requireStore()
  if (!name.trim()) return null

  let brand = await db.brand.findFirst({ where: { storeId: store.id, name } })
  if (!brand) {
    brand = await db.brand.create({
      data: { storeId: store.id, name },
    })
  }
  return brand
}
