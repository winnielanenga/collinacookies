"use client"

import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useCart } from "../hooks/useCart"

const navLinks = [
  { href: "/#menu", label: "The Carte" },
  { href: "/#market", label: "The Market" },
  { href: "/story", label: "The Baker" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/payment", label: "Payment" },
  { href: "/contact", label: "Contact" },
]

export default function Header() {
  const { cartItems, isLoaded } = useCart()

  const cartItemCount = isLoaded ? cartItems.reduce((sum, item) => sum + item.quantity, 0) : 0

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-espresso/90 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="font-carte text-2xl text-cream">
            Collina <em className="italic text-gold">Cookies</em>
          </Link>

          <nav className="flex items-center gap-6">
            {/* Desktop Navigation */}
            <div className="hidden items-center gap-7 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border-b border-transparent pb-0.5 text-xs font-semibold uppercase tracking-[0.22em] text-latte transition-colors hover:border-gold hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                className="btn-gold-sm"
                onClick={() => {
                  const menu = document.getElementById("mobile-menu")
                  menu?.classList.toggle("hidden")
                }}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Menu
              </button>
            </div>

            {/* Cart Button */}
            <Link href="/cart" className="btn-gold-sm">
              <ShoppingCart className="h-4 w-4" />
              Cart
              {isLoaded && cartItemCount > 0 && (
                <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center bg-gold px-1 text-[11px] font-bold text-espresso">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Dropdown */}
          <div
            id="mobile-menu"
            className="absolute left-0 right-0 top-full z-40 hidden border-t border-gold/20 bg-espresso lg:hidden"
          >
            <div className="container mx-auto space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-xs font-semibold uppercase tracking-[0.22em] text-latte transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
