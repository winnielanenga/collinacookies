"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Cookie {
  id: number
  name: string
  price: number
  category: string
  description?: string
}

interface CartItem extends Cookie {
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (cookie: Cookie) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("collina-cookies-cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("collina-cookies-cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (cookie: Cookie) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === cookie.id)
      if (existingItem) {
        return prev.map((item) => (item.id === cookie.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...cookie, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
