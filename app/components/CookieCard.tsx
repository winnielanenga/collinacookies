"use client"

import { Plus } from "lucide-react"
import { useCart } from "../hooks/useCart"

interface CookieData {
  id: number
  name: string
  description: string
  price: number
  category: string
  tag?: string
}

interface CookieCardProps {
  cookie: CookieData
}

export default function CookieCard({ cookie }: CookieCardProps) {
  const { addToCart } = useCart()

  return (
    <div>
      <div className="flex items-baseline gap-3">
        <h3 className="font-carte text-2xl italic text-cream md:text-[27px]">{cookie.name}</h3>
        <span className="dotted-leader" />
        <span className="whitespace-nowrap font-carte text-2xl text-gold">
          ${cookie.price.toFixed(0)}{" "}
          <small className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-latte">each</small>
        </span>
      </div>
      <p className="mt-2 max-w-xl text-latte">{cookie.description}</p>
      <div className="mt-4 flex items-center gap-4">
        {cookie.tag && <span className="carte-tag">{cookie.tag}</span>}
        <button onClick={() => addToCart(cookie)} className="btn-gold-sm">
          <Plus className="h-3.5 w-3.5" />
          Add to Cart
        </button>
      </div>
    </div>
  )
}
