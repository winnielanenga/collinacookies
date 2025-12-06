"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Cookie, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useCart } from "../hooks/useCart"
import { useState, useEffect } from "react"

export default function Header() {
  const { cartItems } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cartItemCount =
    mounted && Array.isArray(cartItems) ? cartItems.reduce((sum, item) => sum + item.quantity, 0) : 0

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-peach/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Cookie className="h-8 w-8 text-peach" />
            <h1 className="text-2xl font-bold text-gray-800">Collina Cookies</h1>
          </Link>
          <nav className="flex items-center gap-6">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#classics" className="text-gray-700 hover:text-peach transition-colors">
                Classic Flavors
              </a>
              <a href="#seasonal" className="text-gray-700 hover:text-peach transition-colors">
                Seasonal
              </a>
              <Link href="/story" className="text-gray-700 hover:text-peach transition-colors">
                My Story
              </Link>
              <Link href="/testimonials" className="text-gray-700 hover:text-peach transition-colors">
                Testimonials
              </Link>
              <Link href="/payment" className="text-gray-700 hover:text-peach transition-colors">
                Payment
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-peach transition-colors">
                Contact + FAQ
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="outline"
                size="sm"
                className="border-peach text-peach hover:bg-peach hover:text-white bg-transparent"
                onClick={() => {
                  const menu = document.getElementById("mobile-menu")
                  menu?.classList.toggle("hidden")
                }}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Menu
              </Button>
            </div>

            {/* Cart Button */}
            <Link href="/cart" className="relative">
              <Button
                variant="outline"
                size="sm"
                className="border-peach text-peach hover:bg-peach hover:text-white bg-transparent"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {mounted && cartItemCount > 0 && (
                  <Badge className="ml-2 bg-pink text-white text-xs">{cartItemCount}</Badge>
                )}
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Dropdown */}
          <div
            id="mobile-menu"
            className="hidden md:hidden bg-white border-t border-peach/20 absolute top-full left-0 right-0 z-40"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              <a href="#classics" className="block text-gray-700 hover:text-peach transition-colors py-2">
                Classic Flavors
              </a>
              <a href="#seasonal" className="block text-gray-700 hover:text-peach transition-colors py-2">
                Seasonal
              </a>
              <Link href="/story" className="block text-gray-700 hover:text-peach transition-colors py-2">
                My Story
              </Link>
              <Link href="/testimonials" className="block text-gray-700 hover:text-peach transition-colors py-2">
                Testimonials
              </Link>
              <Link href="/payment" className="block text-gray-700 hover:text-peach transition-colors py-2">
                Payment
              </Link>
              <Link href="/contact" className="block text-gray-700 hover:text-peach transition-colors py-2">
                Contact + FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
