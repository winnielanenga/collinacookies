"use client"

import { useState } from "react"
import { Minus, Plus, ShoppingBag, CheckCircle } from "lucide-react"
import { useCart } from "../hooks/useCart"

const BOX_SIZE = 6

const flavors = [
  { key: "muffin", label: "Mr. Herron's Big Blueberry Muffins", short: "Blueberry Muffins" },
  { key: "chocolate", label: "Brown Butter Chocolate Chunk", short: "Brown Butter Chocolate Chunk" },
  { key: "snickerdoodle", label: "Salt & Straw Snickerdoodles", short: "Snickerdoodles" },
] as const

type FlavorKey = (typeof flavors)[number]["key"]

export default function HalfDozenBuilder() {
  const { addToCart } = useCart()
  const [counts, setCounts] = useState<Record<FlavorKey, number>>({ muffin: 0, chocolate: 0, snickerdoodle: 0 })
  const [justAdded, setJustAdded] = useState(false)

  const totalPicked = Object.values(counts).reduce((sum, n) => sum + n, 0)
  const boxFull = totalPicked === BOX_SIZE

  const adjust = (key: FlavorKey, delta: number) => {
    setCounts((prev) => {
      const next = prev[key] + delta
      if (next < 0) return prev
      if (delta > 0 && totalPicked >= BOX_SIZE) return prev
      return { ...prev, [key]: next }
    })
    setJustAdded(false)
  }

  const handleAddBox = () => {
    if (!boxFull) return

    const mix = flavors
      .filter((f) => counts[f.key] > 0)
      .map((f) => `${counts[f.key]} ${f.short}`)
      .join(", ")

    // Deterministic id per combination, so identical boxes merge in the cart
    // while differently-mixed boxes stay separate line items.
    const id = 4000000 + counts.muffin * 10000 + counts.chocolate * 100 + counts.snickerdoodle

    addToCart({
      id,
      name: "Mix & Match Half Dozen",
      description: mix,
      price: 25.0,
      category: "box",
    })

    setCounts({ muffin: 0, chocolate: 0, snickerdoodle: 0 })
    setJustAdded(true)
  }

  return (
    <div className="mx-auto mt-8 max-w-md text-left">
      <div className="flex flex-col gap-4">
        {flavors.map((flavor) => (
          <div key={flavor.key} className="flex items-center justify-between gap-4">
            <span className="font-carte text-lg italic text-cream">{flavor.label}</span>
            <div className="flex flex-none items-center gap-2">
              <button
                onClick={() => adjust(flavor.key, -1)}
                disabled={counts[flavor.key] === 0}
                className="btn-gold-sm !px-2.5 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={`Remove one ${flavor.label}`}
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-6 text-center font-semibold text-cream">{counts[flavor.key]}</span>
              <button
                onClick={() => adjust(flavor.key, 1)}
                disabled={boxFull}
                className="btn-gold-sm !px-2.5 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={`Add one ${flavor.label}`}
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-gold/25 pt-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-latte">
          {boxFull ? "Your box is full — nicely done!" : `${totalPicked} of ${BOX_SIZE} bakes picked`}
        </p>
        <button
          onClick={handleAddBox}
          disabled={!boxFull}
          className="btn-gold mt-4 w-full disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ShoppingBag className="h-4 w-4" />
          Add My Box to Cart — $25
        </button>
        {justAdded && (
          <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-gold">
            <CheckCircle className="h-4 w-4" />
            Your half dozen is in the cart!
          </p>
        )}
      </div>
    </div>
  )
}
