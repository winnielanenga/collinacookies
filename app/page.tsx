"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Cookie, Heart, Star } from "lucide-react"
import Link from "next/link"
import Header from "./components/Header"
import CookieCard from "./components/CookieCard"
import ReviewCarousel from "./components/ReviewCarousel"

export default function Home() {
  const classicCookies = [
    {
      id: 1,
      name: "Mr Herron's Big Blueberry Muffins",
      description: "A lemon blueberry muffin with a crunchy sugar topping",
      price: 11.0,
      category: "classic",
      image: "/images/blueberry-muffins.png",
    },
    {
      id: 2,
      name: "Brown Butter Chocolate Chunk Cookies",
      description: "Six tablespoons of brown butter chocolate goodness",
      price: 11.0,
      category: "classic",
      image: "/images/brown-butter-chocolate-chunk.png",
    },
    {
      id: 3,
      name: "Salt & Straw Snickerdoodle",
      description: "A cinnamon-sugar twist inspired by the famous ice cream shop",
      price: 11.0,
      category: "classic",
      image: "/images/salt-straw-snickerdoodles.jpeg",
    },
  ]

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Handcrafted with <span className="text-pink">Love</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Welcome to Collina Cookies! I'm Winnie, and at just 13 years old, I'm following my passion for baking that
              my dad inspired in me. Every cookie is made with care and the love of baking he taught me.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cart">
                <Button size="lg" className="bg-peach hover:bg-peach/90 text-white">
                  <Heart className="mr-2 h-5 w-5" />
                  Start Shopping
                </Button>
              </Link>
              <Link href="/story">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-pink text-pink hover:bg-pink hover:text-white bg-transparent"
                >
                  Read My Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Classic Cookies Section */}
      <section id="classics" className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-yellow/20 text-yellow-800 mb-4">Always Available</Badge>
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Classic Flavors</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">My three signature cookies that started it all</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {classicCookies.map((cookie) => (
              <CookieCard key={cookie.id} cookie={cookie} variant="classic" />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonial Preview */}
      <section className="py-16 px-4 bg-pink/5">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <Badge className="bg-pink/20 text-pink-800 mb-4">Customer Love</Badge>
            <h3 className="text-4xl font-bold text-gray-800 mb-8">What People Are Saying</h3>

            <ReviewCarousel />

            <Link href="/testimonials">
              <Button size="lg" className="bg-pink hover:bg-pink/90 text-white">
                <Star className="mr-2 h-5 w-5" />
                Read More & Share Your Review
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Bakes Section */}
      <section id="custom" className="py-16 px-4 bg-yellow/10">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <Badge className="bg-yellow/30 text-yellow-800 mb-4">Made to Order</Badge>
            <h3 className="text-4xl font-bold text-gray-800 mb-6">Custom Bakes</h3>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Have a special event or unique flavor in mind? Let's create something magical together! From birthday
              parties to school events, I'll craft the perfect baked goods for your occasion.
            </p>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-yellow/20">
              <h4 className="text-2xl font-semibold text-gray-800 mb-4">Perfect for:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-600">
                <div>🎂 Birthdays</div>
                <div>🏢 Corporate Events</div>
                <div>🎉 Parties</div>
                <div>🎁 Gifts</div>
                <div>🏠 Family Gatherings</div>
                <div>🎈 Celebrations</div>
                <div>🍪 Bake Sales</div>
                <div>❤️ Special Occasions</div>
              </div>
            </div>
            <Link href="/contact">
              <Button size="lg" className="mt-8 bg-yellow hover:bg-yellow/90 text-gray-800">
                Request Custom Order
              </Button>
            </Link>
          </div>
        </div>
      </section>

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
