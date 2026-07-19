import { Cookie, DollarSign, HandCoins, Tent } from "lucide-react"
import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-espresso">
      <Header />

      {/* Hero Section */}
      <section className="px-4 py-24 text-center">
        <div className="container mx-auto max-w-3xl">
          <p className="eyebrow mb-5">Settling the Bill</p>
          <h1 className="font-carte text-5xl font-normal text-cream md:text-6xl">Easy Payment</h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-latte">
            I&rsquo;ve made paying for your bakes as simple as possible! Choose the method that works best for you.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-24">
        <div className="mx-auto max-w-4xl">
          {/* Payment Methods */}
          <div className="mb-12 grid gap-8 md:grid-cols-2">
            <div className="border border-gold/25 bg-roast p-8">
              <div className="mb-4 flex items-center gap-3">
                <HandCoins className="h-6 w-6 text-gold" />
                <h2 className="font-carte text-2xl font-normal text-cream">Cash on Delivery</h2>
              </div>
              <p className="text-latte">
                The easiest way! Pay with cash when I deliver your bakes. I&rsquo;ll have change if you need it.
              </p>
              <div className="mt-5 border border-gold/20 bg-espresso p-4">
                <p className="text-sm text-latte">
                  <strong className="text-cream">Perfect for:</strong> Anyone who prefers cash transactions
                </p>
              </div>
            </div>

            <div className="border border-gold/25 bg-roast p-8">
              <div className="mb-4 flex items-center gap-3">
                <Tent className="h-6 w-6 text-gold" />
                <h2 className="font-carte text-2xl font-normal text-cream">Pay at the Market</h2>
              </div>
              <p className="text-latte">
                Visiting my booth at the Lake Oswego Farmers&rsquo; Market? Pay right there when you pick up your
                treats — no pre-ordering needed!
              </p>
              <div className="mt-5 border border-gold/20 bg-espresso p-4">
                <p className="text-sm text-latte">
                  <strong className="text-cream">Perfect for:</strong> Market-day shoppers who want their bakes fresh
                  from the booth
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-12 border border-gold/25 bg-roast p-8 md:p-10">
            <h2 className="mb-10 text-center font-carte text-3xl font-normal text-cream">How Payment Works</h2>
            <div className="grid gap-8 text-center md:grid-cols-3">
              <div>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-gold/40 font-carte text-xl text-gold">
                  1
                </div>
                <h3 className="mb-2 font-semibold text-cream">Place Your Order</h3>
                <p className="text-sm text-latte">
                  Email me your order and we&rsquo;ll confirm the details and total cost.
                </p>
              </div>
              <div>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-gold/40 font-carte text-xl text-gold">
                  2
                </div>
                <h3 className="mb-2 font-semibold text-cream">Choose Payment</h3>
                <p className="text-sm text-latte">
                  Pay with cash on delivery, or stop by my farmers&rsquo; market booth and pay in person.
                </p>
              </div>
              <div>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-gold/40 font-carte text-xl text-gold">
                  3
                </div>
                <h3 className="mb-2 font-semibold text-cream">Enjoy Your Bakes!</h3>
                <p className="text-sm text-latte">
                  I&rsquo;ll deliver your fresh bakes and collect payment, or hand them to you right at the booth.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Reminder */}
          <div className="gold-frame bg-roast p-10 text-center md:p-12">
            <DollarSign className="mx-auto mb-4 h-10 w-10 text-gold" />
            <h2 className="font-carte text-3xl font-normal text-cream">Simple Pricing</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-latte">
              Every jumbo, premium bake is <strong className="text-gold">$5 each</strong> — or mix and match any half
              dozen for <strong className="text-gold">$25</strong>. Free local delivery included!
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/#menu" className="btn-gold">
                <Cookie className="h-4 w-4" />
                View the Carte
              </Link>
              <Link href="/contact" className="btn-gold-ghost">
                Ask Questions
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
