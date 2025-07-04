import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cookie, Heart, Truck, Clock } from "lucide-react"
import Link from "next/link"

export default function AboutPricingPage() {
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
                Contact
              </Link>
              <Link href="/cart" className="text-gray-700 hover:text-peach transition-colors">
                Cart
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Simple <span className="text-pink">Pricing</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Every dozen cookies is $7, and every order helps me get closer to my dream trip to Europe!
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Pricing Card */}
          <Card className="border-2 border-peach/20 bg-white mb-12 text-center">
            <CardHeader>
              <div className="w-20 h-20 bg-peach/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cookie className="h-10 w-10 text-peach" />
              </div>
              <CardTitle className="text-4xl text-gray-800">$7 per Dozen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-600 mb-6">
                All cookie flavors are the same price - $7 for a dozen delicious, handmade cookies!
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Classic Flavors:</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Loaded Chocolate Chip</li>
                    <li>• Salt & Straw Snickerdoodle</li>
                    <li>• Key Lime Snowballs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Seasonal Specials:</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Raspberry Lime Thumbprints</li>
                    <li>• Edible Cookie Dough</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-pink/20 bg-pink/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <Truck className="h-8 w-8 text-pink" />
                  <h3 className="text-xl font-semibold text-gray-800">Free Local Delivery</h3>
                </div>
                <p className="text-gray-600">
                  I deliver all orders locally at no extra charge! Delivery details will be arranged when you place your
                  order.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow/20 bg-yellow/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <Clock className="h-8 w-8 text-yellow-600" />
                  <h3 className="text-xl font-semibold text-gray-800">Fresh & Made to Order</h3>
                </div>
                <p className="text-gray-600">
                  Every dozen is baked fresh just for you! Please allow 2-3 days for regular orders, 1 week for large
                  orders.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Europe Trip Goal */}
          <Card className="border-2 border-peach/20 bg-peach/5 text-center">
            <CardContent className="p-8">
              <Heart className="h-12 w-12 text-peach mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Every Order Helps My Dream!</h3>
              <p className="text-lg text-gray-600 mb-6">
                I'm saving every dollar from Collina Cookies for my trip to Europe in summer 2026. When you order my
                cookies, you're not just getting delicious treats - you're helping a young entrepreneur chase her
                dreams!
              </p>
              <Link href="/">
                <Button size="lg" className="bg-peach hover:bg-peach/90 text-white">
                  <Cookie className="mr-2 h-5 w-5" />
                  Order Now & Help My Journey
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
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
