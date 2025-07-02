"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cookie, Plus, Minus, Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useCart } from "../hooks/useCart"

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart()

  const handleCheckout = () => {
    if (cartItems.length === 0) return

    // Create order summary
    const orderSummary = cartItems
      .map((item) => `${item.quantity} dozen ${item.name} - $${(item.price * item.quantity).toFixed(2)}`)
      .join("\n")

    const total = getCartTotal()
    const message = `Hi Winnie! I'd like to place an order:\n\n${orderSummary}\n\nTotal: $${total.toFixed(2)}\n\nI can pay with cash on delivery or through your EF Tours donation page. Please let me know about delivery details. Thank you!`

    // Create mailto link
    const mailtoLink = `mailto:winnie.lanenga@gmail.com?subject=Cookie Order&body=${encodeURIComponent(message)}`
    window.location.href = mailtoLink

    // Clear cart after order
    //clearCart()
  }

  if (cartItems.length === 0) {
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
                    <span>Total:</span>
                    <span className="text-peach">${getCartTotal().toFixed(2)}</span>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Button onClick={handleCheckout} className="w-full bg-peach hover:bg-peach/90 text-white" size="lg">
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
