"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Minus, Trash2, ShoppingBag, Mail, CheckCircle, Tag, Percent, Cookie } from "lucide-react"
import Link from "next/link"
import { useCart } from "../hooks/useCart"
import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import CookieMonsterGame from "../components/CookieMonsterGame"

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart()
  const [emailSent, setEmailSent] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string
    discount: number
    type: "percent" | "fixed"
  } | null>(null)
  const [promoError, setPromoError] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [preferText, setPreferText] = useState(false)

  // Available promo codes
  const promoCodes = {
    "1STORDER": { discount: 1, type: "fixed", description: "First Order Discount" },
    BACKTOSCHOOL: { discount: 10, type: "percent", description: "Back to School Special" },
    HAPPYHOLIDAYS: { discount: 15, type: "percent", description: "Happy Holidays Discount" },
  }

  const handleApplyPromo = () => {
    const upperCode = promoCode.toUpperCase()
    if (promoCodes[upperCode as keyof typeof promoCodes]) {
      const promo = promoCodes[upperCode as keyof typeof promoCodes]
      setAppliedPromo({ code: upperCode, ...promo })
      setPromoError("")
    } else {
      setPromoError("Invalid promo code. Try 1STORDER, BACKTOSCHOOL, or HAPPYHOLIDAYS!")
      setAppliedPromo(null)
    }
  }

  const handleRemovePromo = () => {
    setAppliedPromo(null)
    setPromoCode("")
    setPromoError("")
  }

  const calculateDiscount = () => {
    if (!appliedPromo) return 0
    const subtotal = getCartTotal()
    if (appliedPromo.type === "percent") {
      return (subtotal * appliedPromo.discount) / 100
    } else {
      return appliedPromo.discount
    }
  }

  const getFinalTotal = () => {
    return Math.max(0, getCartTotal() - calculateDiscount())
  }

  // A Mix & Match box is a complete order on its own; single bakes have a 4-item minimum.
  const getSingleCount = () =>
    cartItems.filter((item) => item.category !== "box").reduce((sum, item) => sum + item.quantity, 0)
  const hasBox = () => cartItems.some((item) => item.category === "box")
  const meetsMinimum = () => hasBox() || getSingleCount() >= 4

  const handleCheckout = () => {
    if (cartItems.length === 0) return

    // Create order summary
    const orderSummary = cartItems
      .map((item) => {
        const mix = item.category === "box" && item.description ? ` (${item.description})` : ""
        return `${item.quantity} x ${item.name}${mix} - $${(item.price * item.quantity).toFixed(2)}`
      })
      .join("\n")

    const subtotal = getCartTotal()
    const discount = calculateDiscount()
    const total = getFinalTotal()

    let message = `Hi Winnie! I'd like to place an order:\n\n${orderSummary}\n\nSubtotal: $${subtotal.toFixed(2)}`

    if (appliedPromo) {
      message += `\nPromo Code: ${appliedPromo.code} (${appliedPromo.description})\nDiscount: -$${discount.toFixed(2)}`
    }

    message += `\nTotal: $${total.toFixed(2)}`

    if (phoneNumber) {
      message += `\n\nPhone: ${phoneNumber}${preferText ? " (Prefers text messages)" : ""}`
    }

    message += `\n\nI can pay with cash on delivery. Please let me know about delivery details. Thank you!`

    // Create mailto link
    const mailtoLink = `mailto:winnie.lanenga@gmail.com?subject=Cookie Order&body=${encodeURIComponent(message)}`
    window.location.href = mailtoLink

    // Show the "email sent" confirmation instead of clearing cart immediately
    setEmailSent(true)
  }

  const handleEmailConfirmed = () => {
    // Show the easter egg game first, then clear cart
    setEmailSent(false)
    setShowGame(true)
    clearCart()
    setAppliedPromo(null)
    setPromoCode("")
    setPromoError("")
    setPhoneNumber("")
    setPreferText(false)
  }

  if (cartItems.length === 0 && !emailSent && !showGame) {
    return (
      <div className="min-h-screen bg-espresso">
        <Header />

        {/* Empty Cart */}
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="mx-auto max-w-md">
            <ShoppingBag className="mx-auto mb-8 h-20 w-20 text-latte/50" />
            <p className="eyebrow mb-4">Your Basket</p>
            <h2 className="font-carte text-4xl font-normal text-cream">Nothing Here Yet</h2>
            <p className="mt-5 text-latte">
              Looks like you haven&rsquo;t added any delicious bakes yet. Let&rsquo;s fix that.
            </p>
            <Link href="/#menu" className="btn-gold mt-9">
              <Cookie className="h-4 w-4" />
              View the Carte
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-espresso">
      <Header />

      {/* Order Sent Confirmation */}
      {emailSent && (
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl">
            <div className="gold-frame bg-roast p-10 text-center">
              <Mail className="mx-auto mb-5 h-14 w-14 text-gold" />
              <h3 className="font-carte text-3xl font-normal text-cream">Your Order Is Ready to Send</h3>
              <p className="mt-5 text-latte">
                I&rsquo;ve opened your email client with your order ready to go. Please send that email, then come back
                here for a special surprise!
              </p>
              <div className="mx-auto mt-7 max-w-md border border-gold/25 bg-espresso p-5 text-left">
                <p className="eyebrow mb-3 text-[10px]">Next Steps</p>
                <ol className="space-y-1.5 text-sm text-latte">
                  <li>1. Check your email client (it should have opened)</li>
                  <li>2. Review your order details</li>
                  <li>3. Click &ldquo;Send&rdquo; in your email</li>
                  <li>4. Come back here and click the button below!</li>
                </ol>
              </div>
              <button onClick={handleEmailConfirmed} className="btn-gold mt-8">
                <CheckCircle className="h-4 w-4" />I Sent My Order!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Items */}
      {!emailSent && (
        <div className="container mx-auto px-4 py-14">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <p className="eyebrow mb-4">Your Basket</p>
              <h2 className="font-carte text-4xl font-normal text-cream md:text-5xl">Review Your Order</h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="space-y-4 lg:col-span-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="border border-gold/20 bg-roast p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-carte text-xl italic text-cream">{item.name}</h3>
                        {item.category === "box" && item.description && (
                          <p className="mt-1 text-sm text-latte">{item.description}</p>
                        )}
                        <p className="mt-1 text-sm text-gold">${item.price.toFixed(2)} each</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="btn-gold-sm !px-2.5 disabled:cursor-not-allowed disabled:opacity-40"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center font-semibold text-cream">{item.quantity}</span>
                          <button
                            className="btn-gold-sm !px-2.5"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <p className="w-16 text-right font-carte text-xl text-gold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="border border-transparent p-2 text-latte transition-colors hover:border-red-400/40 hover:text-red-400"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 border border-gold/30 bg-roast p-7">
                  <h3 className="font-carte text-2xl font-normal text-cream">Order Summary</h3>

                  <div className="mt-5 space-y-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm text-latte">
                        <span>
                          {item.quantity} x {item.name}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <hr className="my-4 border-gold/20" />

                  <div className="flex justify-between text-lg font-bold text-cream">
                    <span>Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>

                  {/* Promo Code Section */}
                  <div className="mt-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-latte">
                      <Tag className="h-4 w-4 text-gold" />
                      Promo Code
                    </div>

                    {!appliedPromo ? (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="rounded-none border-latte/40 bg-espresso text-sm text-cream placeholder:text-latte/60"
                          />
                          <button onClick={handleApplyPromo} className="btn-gold-sm">
                            Apply
                          </button>
                        </div>
                        {promoError && <p className="text-xs text-red-400">{promoError}</p>}
                      </div>
                    ) : (
                      <div className="border border-gold/40 bg-gold/10 p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Percent className="h-4 w-4 text-gold" />
                            <div>
                              <p className="text-sm font-semibold text-gold">{appliedPromo.code}</p>
                              <p className="text-xs text-latte">{appliedPromo.description}</p>
                            </div>
                          </div>
                          <button
                            onClick={handleRemovePromo}
                            className="px-2 text-lg text-latte transition-colors hover:text-red-400"
                            aria-label="Remove promo code"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {appliedPromo && (
                    <div className="mt-4 flex justify-between text-sm text-gold">
                      <span>Discount ({appliedPromo.code})</span>
                      <span>-${calculateDiscount().toFixed(2)}</span>
                    </div>
                  )}

                  <hr className="my-4 border-gold/20" />

                  <div className="flex items-baseline justify-between">
                    <span className="text-lg font-bold text-cream">Total</span>
                    <span className="font-carte text-3xl text-gold">${getFinalTotal().toFixed(2)}</span>
                  </div>

                  {/* Phone Number Section */}
                  <div className="mt-5 space-y-2 border-t border-gold/20 pt-5">
                    <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-[0.2em] text-latte">
                      Phone Number (Optional)
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="(555) 123-4567"
                      className="rounded-none border-latte/40 bg-espresso text-sm text-cream placeholder:text-latte/60"
                    />
                    {phoneNumber && (
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="preferText"
                          checked={preferText}
                          onChange={(e) => setPreferText(e.target.checked)}
                          className="h-4 w-4 rounded border-latte/40 bg-espresso accent-[#DFA94E]"
                        />
                        <Label htmlFor="preferText" className="cursor-pointer text-xs text-latte">
                          I prefer text messages
                        </Label>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 space-y-3">
                    <button
                      onClick={handleCheckout}
                      disabled={!meetsMinimum()}
                      className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Place Order
                    </button>

                    {!meetsMinimum() ? (
                      <p className="text-center text-xs text-gold">
                        Single-bake orders have a four-bake minimum — add {4 - getSingleCount()} more bake
                        {4 - getSingleCount() > 1 ? "s" : ""}, or build a Mix &amp; Match Half Dozen.
                      </p>
                    ) : (
                      <p className="text-center text-xs text-latte">
                        Clicking &ldquo;Place Order&rdquo; will open your email to send me your order details!
                      </p>
                    )}

                    <Link href="/#menu" className="btn-gold-ghost w-full">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Easter Egg Game */}
      {showGame && <CookieMonsterGame onClose={() => setShowGame(false)} />}

      <Footer />
    </div>
  )
}
