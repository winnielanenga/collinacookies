import { Cookie, Heart, Truck, Clock } from "lucide-react"
import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function AboutPricingPage() {
  return (
    <div className="min-h-screen bg-espresso">
      <Header />

      {/* Hero Section */}
      <section className="px-4 py-24 text-center">
        <div className="container mx-auto max-w-3xl">
          <p className="eyebrow mb-5">The Fine Print, Minus the Fine Print</p>
          <h1 className="font-carte text-5xl font-normal text-cream md:text-6xl">Simple Pricing</h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-latte">
            Every jumbo, premium bake is $5 — or mix and match any half dozen for $25!
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-24">
        <div className="mx-auto max-w-4xl">
          {/* Pricing Card */}
          <div className="gold-frame mb-12 bg-roast p-10 text-center md:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border border-gold/35">
              <Cookie className="h-7 w-7 text-gold" />
            </div>
            <h2 className="font-carte text-4xl font-normal text-cream">
              $5 Each <span className="text-gold">·</span> Half Dozen for $25
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-latte">
              Every jumbo, premium bake is $5 — and when you mix and match any six, the half-dozen box is just $25.
              That&rsquo;s one bake on the house! Single-item orders have a four-bake minimum.
            </p>
            <div className="mx-auto mt-8 grid max-w-2xl gap-8 text-left md:grid-cols-2">
              <div>
                <h3 className="eyebrow mb-3 text-[10px]">The Carte</h3>
                <ul className="space-y-2 text-latte">
                  <li>· Mr. Herron&rsquo;s Big Blueberry Muffins</li>
                  <li>· Brown Butter Chocolate Chunk Cookies</li>
                  <li>· Salt &amp; Straw Snickerdoodles</li>
                </ul>
              </div>
              <div>
                <h3 className="eyebrow mb-3 text-[10px]">Mix &amp; Match Half Dozen</h3>
                <ul className="space-y-2 text-latte">
                  <li>· Any 6 bakes, any combination — $25</li>
                  <li>· Build your box right on the menu page</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="mb-12 grid gap-8 md:grid-cols-2">
            <div className="border border-gold/25 bg-roast p-8">
              <div className="mb-4 flex items-center gap-4">
                <Truck className="h-7 w-7 text-gold" />
                <h3 className="font-carte text-2xl font-normal text-cream">Free Local Delivery</h3>
              </div>
              <p className="text-latte">
                I deliver all orders locally at no extra charge! Delivery details will be arranged when you place your
                order.
              </p>
            </div>

            <div className="border border-gold/25 bg-roast p-8">
              <div className="mb-4 flex items-center gap-4">
                <Clock className="h-7 w-7 text-gold" />
                <h3 className="font-carte text-2xl font-normal text-cream">Fresh &amp; Made to Order</h3>
              </div>
              <p className="text-latte">
                Every order is baked fresh just for you! Please allow 2-3 days for regular orders, 1 week for large
                orders.
              </p>
            </div>
          </div>

          {/* Farmers Market */}
          <div className="gold-frame bg-roast p-10 text-center md:p-12">
            <Heart className="mx-auto mb-4 h-10 w-10 text-gold" />
            <h2 className="font-carte text-3xl font-normal text-cream">Visit My Farmers&rsquo; Market Booth!</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-latte">
              You can now find Collina Cookies at the Lake Oswego Farmers&rsquo; Market on select dates! Stop by the
              booth to grab my jumbo muffins and cookies fresh — or order online anytime for free local delivery.
            </p>
            <Link href="/#menu" className="btn-gold mt-8">
              <Cookie className="h-4 w-4" />
              View the Carte
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
