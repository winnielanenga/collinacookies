import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "./hooks/useCart"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Collina Cookies - Handcrafted with Love",
  description:
    "Delicious homemade cookies by Winnie Lanenga. Classic flavors, seasonal specialties, and custom bakes made with love.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
