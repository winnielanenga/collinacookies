import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cookie, DollarSign, Smartphone, HandCoins } from "lucide-react"
import Link from "next/link"

export default function PaymentPage() {
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
              Easy <span className="text-pink">Payment</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              I've made paying for your cookies as simple as possible! Choose the method that works best for you.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Payment Methods */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-peach/20 bg-peach/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-gray-800">
                  <HandCoins className="h-6 w-6 text-peach" />
                  Cash on Delivery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  The easiest way! Pay with cash when I deliver your cookies. I'll have change if you need it.
                </p>
                <div className="bg-white rounded-lg p-4 border border-peach/20">
                  <p className="text-sm text-gray-600">
                    <strong>Perfect for:</strong> Anyone who prefers cash transactions
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink/20 bg-pink/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-gray-800">
                  <Smartphone className="h-6 w-6 text-pink" />
                  Europe Trip Donation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Support my Europe trip directly! Pay for your cookies through my official EF Tours donation page.
                </p>
                <div className="bg-white rounded-lg p-4 border border-pink/20">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Donation Link:</strong>
                  </p>
                  <a
                    href="https://account.eftours.com/donations/YlnEpn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink hover:text-pink/80 underline text-sm break-all"
                  >
                    account.eftours.com/donations/YlnEpn
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How It Works */}
          <Card className="border-2 border-yellow/20 bg-white mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800 text-center">How Payment Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-peach/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-peach font-bold">1</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Place Your Order</h4>
                  <p className="text-gray-600 text-sm">
                    Email me your order and we'll confirm the details and total cost.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-pink/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-pink font-bold">2</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Choose Payment</h4>
                  <p className="text-gray-600 text-sm">
                    Let me know if you'd prefer cash on delivery or to donate through my EF Tours page.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-yellow/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-yellow-600 font-bold">3</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Enjoy Your Cookies!</h4>
                  <p className="text-gray-600 text-sm">
                    I'll deliver your fresh cookies and collect payment (if cash) or confirm your donation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Reminder */}
          <Card className="border-2 border-peach/20 bg-peach/5 text-center">
            <CardContent className="p-8">
              <DollarSign className="h-12 w-12 text-peach mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Simple Pricing</h3>
              <p className="text-lg text-gray-600 mb-6">
                Every dozen cookies is just $7, no matter which flavor you choose. Free local delivery included!
              </p>
              <div className="mb-6 p-4 bg-white rounded-lg border border-peach/20">
                <p className="text-gray-600 text-sm mb-2">
                  <strong>🎯 Track My Progress:</strong>
                </p>
                <p className="text-gray-600 text-sm">
                  Want to see how close I am to my Europe 2026 goal?
                  <a
                    href="https://account.eftours.com/donations/YlnEpn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-peach hover:text-peach/80 underline ml-1"
                  >
                    Check my official progress tracker!
                  </a>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button size="lg" className="bg-peach hover:bg-peach/90 text-white">
                    <Cookie className="mr-2 h-5 w-5" />
                    Start Shopping
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-pink text-pink hover:bg-pink hover:text-white bg-transparent"
                  >
                    Ask Questions
                  </Button>
                </Link>
              </div>
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
