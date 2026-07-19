import type React from "react"
import { Playfair_Display, Jost } from "next/font/google"
import "./globals.css"
import { CartProvider } from "./hooks/useCart"

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
})

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
})

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
          content="Jumbo, premium muffins and cookies by Winnie Lanenga. Find Collina Cookies at the Lake Oswego Farmers' Market or order online for free local delivery."
        />
      </head>
      <body className={`${playfair.variable} ${jost.variable} font-body bg-espresso text-cream antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
