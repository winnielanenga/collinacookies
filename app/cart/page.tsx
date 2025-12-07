"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Cookie, Plus, Minus, Trash2, ShoppingBag, Mail, CheckCircle, Tag, Percent } from "lucide-react"
import Link from "next/link"
import { useCart } from "../hooks/useCart"
import { useState } from "react"
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

  const handleCheckout = () => {
    if (cartItems.length === 0) return

    // Create order summary
    const orderSummary = cartItems
      .map((item) => `${item.quantity} dozen ${item.name} - $${(item.price * item.quantity).toFixed(2)}`)
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

    message += `\n\nI can pay with cash on delivery or through your EF Tours donation page. Please let me know about delivery details. Thank you!`

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
      <div className="min-h-screen bg-cream">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-peach/20 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <Cookie className="h-8 w-8 text-peach" />
                <h1 className="text-2xl font-bold text-gray-800">Collina Cookies</h1>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-gray-700 hover:text-peach transition-colors">
                  Home
                </Link>
                <Link href="/story" className="text-gray-700 hover:text-peach transition-colors">
                  My Story
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-peach transition-colors">
                  Contact + FAQ
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Empty Cart */}
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any delicious cookies yet! Let's fix that.
            </p>
            <Link href="/">
              <Button size="lg" className="bg-peach hover:bg-peach/90 text-white">
                <Cookie className="mr-2 h-5 w-5" />
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-peach/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Cookie className="h-8 w-8 text-peach" />
              <h1 className="text-2xl font-bold text-gray-800">Collina Cookies</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-700 hover:text-peach transition-colors">
                Home
              </Link>
              <Link href="/story" className="text-gray-700 hover:text-peach transition-colors">
                My Story
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-peach transition-colors">
                Contact + FAQ
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Order Sent Confirmation */}
      {emailSent && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-green-300 bg-green-50">
              <CardContent className="p-8 text-center">
                <Mail className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Email Ready to Send!</h3>
                <p className="text-lg text-gray-700 mb-6">
                  I've opened your email client with your cookie order ready to go. Please send that email, then come
                  back here for a special surprise!
                </p>
                <div className="bg-white rounded-lg p-4 border border-green-200 mb-6">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Next steps:</strong>
                  </p>
                  <ol className="text-sm text-gray-600 text-left max-w-md mx-auto">
                    <li>1. Check your email client (it should have opened)</li>
                    <li>2. Review your cookie order details</li>
                    <li>3. Click "Send" in your email</li>
                    <li>4. Come back here and click the button below!</li>
                  </ol>
                </div>
                <Button onClick={handleEmailConfirmed} className="bg-green-600 hover:bg-green-700 text-white" size="lg">
                  <CheckCircle className="mr-2 h-5 w-5" />I Sent My Order!
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Cart Items */}
      {!emailSent && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Your Cookie Cart</h2>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="border-2 border-peach/20 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-peach/10 rounded-full flex items-center justify-center">
                            <Cookie className="h-6 w-6 text-peach" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{item.name}</h3>
                            <p className="text-peach font-bold">${item.price.toFixed(2)} per dozen</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="border-2 border-pink/20 bg-white sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-800">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>
                            {item.quantity} dozen {item.name}
                          </span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <hr className="border-gray-200" />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Subtotal:</span>
                      <span>${getCartTotal().toFixed(2)}</span>
                    </div>

                    {/* Promo Code Section */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Tag className="h-4 w-4 text-peach" />
                        Promo Code
                      </div>

                      {!appliedPromo ? (
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Enter promo code"
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value)}
                              className="text-sm"
                            />
                            <Button
                              onClick={handleApplyPromo}
                              variant="outline"
                              size="sm"
                              className="border-peach text-peach hover:bg-peach hover:text-white bg-transparent"
                            >
                              Apply
                            </Button>
                          </div>
                          {promoError && <p className="text-xs text-red-500">{promoError}</p>}
                        </div>
                      ) : (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Percent className="h-4 w-4 text-green-600" />
                              <div>
                                <p className="text-sm font-semibold text-green-800">{appliedPromo.code}</p>
                                <p className="text-xs text-green-600">{appliedPromo.description}</p>
                              </div>
                            </div>
                            <Button
                              onClick={handleRemovePromo}
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 h-6 w-6 p-0"
                            >
                              ×
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    {appliedPromo && (
                      <>
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Discount ({appliedPromo.code}):</span>
                          <span>-${calculateDiscount().toFixed(2)}</span>
                        </div>
                        <hr className="border-gray-200" />
                      </>
                    )}

                    <div className="flex justify-between text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-peach">${getFinalTotal().toFixed(2)}</span>
                    </div>

                    {/* Phone Number Section */}
                    <div className="space-y-2 pt-2 border-t border-gray-200">
                      <Label htmlFor="phone" className="text-sm">
                        Phone Number (Optional)
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="(555) 123-4567"
                        className="text-sm"
                      />
                      {phoneNumber && (
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="preferText"
                            checked={preferText}
                            onChange={(e) => setPreferText(e.target.checked)}
                            className="h-4 w-4 text-peach focus:ring-peach border-gray-300 rounded"
                          />
                          <Label htmlFor="preferText" className="text-xs text-gray-600 cursor-pointer">
                            I prefer text messages
                          </Label>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 pt-4">
                      <Button
                        onClick={handleCheckout}
                        className="w-full bg-peach hover:bg-peach/90 text-white"
                        size="lg"
                      >
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        Place Order
                      </Button>

                      <p className="text-xs text-gray-500 text-center">
                        Clicking "Place Order" will open your email to send me your order details!
                      </p>

                      <Link href="/">
                        <Button variant="outline" className="w-full bg-transparent">
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Easter Egg Game */}
      {showGame && <CookieMonsterGame onClose={() => setShowGame(false)} />}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4 mt-16">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Cookie className="h-6 w-6 text-peach" />
            <span className="text-xl font-semibold">Collina Cookies</span>
          </div>
          <p className="text-gray-400 mb-4">Handcrafted with love by Winnie Lanenga</p>
          <p className="text-sm text-gray-500">Made with ❤️ and lots of flour</p>
        </div>
      </footer>
    </div>
  )
}
