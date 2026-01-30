import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "./hooks/useCart"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Collina Cookies - Handcrafted with Love</title>
        <meta
          name="description"
          content="Delicious homemade cookies by Winnie Lanenga. Classic flavors, seasonal specialties, and custom bakes made with love."
        />
      </head>
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
