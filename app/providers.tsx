"use client"

import type React from "react"

import { CartProvider } from "./hooks/useCart"

export function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}
