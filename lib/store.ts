import { create } from 'zustand'

interface SidebarState {
  isCollapsed: boolean
  toggleSidebar: () => void
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isCollapsed: false,
  toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}))

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface CartState {
  items: CartItem[]
  addToCart: (product: any, quantity?: number) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (product, quantity = 1) => set((state) => {
    const existing = state.items.find(i => i.id === product.id)
    if (existing) {
      return {
        items: state.items.map(i => 
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
    }
    return {
      items: [...state.items, {
        id: product.id,
        name: product.name,
        price: product.sellPrice || product.price, // handle both DB model and mock
        quantity,
        image: product.images?.[0] || product.image
      }]
    }
  }),
  removeFromCart: (id) => set((state) => ({
    items: state.items.filter(i => i.id !== id)
  })),
  updateQuantity: (id, quantity) => set((state) => ({
    items: quantity <= 0 
      ? state.items.filter(i => i.id !== id)
      : state.items.map(i => i.id === id ? { ...i, quantity } : i)
  })),
  clearCart: () => set({ items: [] }),
  getTotal: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
  },
  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0)
  }
}))
