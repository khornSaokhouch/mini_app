import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  // Create Super Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@saas.com' },
    update: {},
    create: {
      email: 'admin@saas.com',
      name: 'Super Admin',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  })

  // Create Store Owner
  const owner = await prisma.user.upsert({
    where: { email: 'owner@store.com' },
    update: {},
    create: {
      email: 'owner@store.com',
      name: 'Demo Owner',
      password: hashedPassword,
      role: 'STORE_OWNER',
    },
  })

  // Create Store
  const store = await prisma.store.upsert({
    where: { slug: 'demo-store' },
    update: {},
    create: {
      name: 'Demo Store',
      slug: 'demo-store',
      currency: 'USD',
      language: 'en',
      ownerId: owner.id,
    },
  })

  // Create Category
  const category = await prisma.category.create({
    data: {
      name: 'Electronics',
      storeId: store.id,
    },
  })

  // Create Product
  const product = await prisma.product.create({
    data: {
      name: 'Wireless Earbuds',
      description: 'High quality wireless earbuds with noise cancellation.',
      sku: 'WE-001',
      costPrice: 20,
      sellPrice: 50,
      stockQty: 100,
      storeId: store.id,
      categoryId: category.id,
    },
  })

  console.log({ admin, owner, store, product })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
