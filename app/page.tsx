"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cookie, Heart, Star, ShoppingCart, Plus } from "lucide-react"
import Link from "next/link"
import { useCart } from "./hooks/useCart"
import Image from "next/image"

export default function Home() {
  const { addToCart, cartItems } = useCart()

  const classicCookies = [
    {
      id: 1,
      name: "Loaded Chocolate Chip",
      description: "Packed with melty chocolate chunks and baked to golden perfection",
      price: 7.0,
      category: "classic",
      image: "/images/loaded-chocolate-chip.jpeg",
      hasDough: true,
    },
    {
      id: 2,
      name: "Salt & Straw Snickerdoodle",
      description: "A cinnamon-sugar twist inspired by the famous ice cream shop",
      price: 7.0,
      category: "classic",
      image: "/images/salt-straw-snickerdoodles.jpeg",
      hasDough: true,
    },
    {
      id: 3,
      name: "Key Lime Snowballs",
      description: "Buttery shortbread with a zesty lime kick and a powdered sugar finish",
      price: 7.0,
      category: "classic",
      image: "/images/key-lime-snowballs.jpeg",
      hasDough: true,
    },
  ]

  const seasonalCookies = [
    {
      id: 4,
      name: "Raspberry Lime Thumbprints",
      description: "Buttery shortbread with a zesty lime kick and a powdered sugar finish",
      price: 7.0,
      category: "seasonal",
      image: "/images/raspberry-lime-thumbprints.jpeg",
    },
    {
      id: 5,
      name: "Edible Cookie Dough",
      description: "My classic chocolate chip cookie dough, made safe to eat raw!",
      price: 7.0,
      category: "seasonal",
      image: "/images/edible-cookie-dough.jpeg",
    },
  ]

  const doughOptions = [
    {
      id: 11,
      name: "Loaded Chocolate Chip Dough",
      description: "Ready-to-bake dough - enjoy fresh cookies whenever you want!",
      price: 7.0,
      category: "dough",
    },
    {
      id: 12,
      name: "Salt & Straw Snickerdoodle Dough",
      description: "Ready-to-bake dough - enjoy fresh cookies whenever you want!",
      price: 7.0,
      category: "dough",
    },
    {
      id: 13,
      name: "Key Lime Snowballs Dough",
      description: "Ready-to-bake dough - enjoy fresh cookies whenever you want!",
      price: 7.0,
      category: "dough",
    },
  ]

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

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
            <nav className="flex items-center gap-6">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6">
                <a href="#classics" className="text-gray-700 hover:text-peach transition-colors">
                  Classic Flavors
                </a>
                <a href="#seasonal" className="text-gray-700 hover:text-peach transition-colors">
                  Seasonal
                </a>
                <Link href="/story" className="text-gray-700 hover:text-peach transition-colors">
                  My Story
                </Link>
                <Link href="/testimonials" className="text-gray-700 hover:text-peach transition-colors">
                  Testimonials
                </Link>
                <Link href="/payment" className="text-gray-700 hover:text-peach transition-colors">
                  Payment
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-peach transition-colors">
                  Contact + FAQ
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-peach text-peach hover:bg-peach hover:text-white bg-transparent"
                  onClick={() => {
                    const menu = document.getElementById("mobile-menu")
                    menu?.classList.toggle("hidden")
                  }}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Menu
                </Button>
              </div>

              {/* Cart Button */}
              <Link href="/cart" className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-peach text-peach hover:bg-peach hover:text-white bg-transparent"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                  {cartItemCount > 0 && <Badge className="ml-2 bg-pink text-white text-xs">{cartItemCount}</Badge>}
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Dropdown */}
            <div
              id="mobile-menu"
              className="hidden md:hidden bg-white border-t border-peach/20 absolute top-full left-0 right-0 z-40"
            >
              <div className="container mx-auto px-4 py-4 space-y-3">
                <a href="#classics" className="block text-gray-700 hover:text-peach transition-colors py-2">
                  Classic Flavors
                </a>
                <a href="#seasonal" className="block text-gray-700 hover:text-peach transition-colors py-2">
                  Seasonal
                </a>
                <Link href="/story" className="block text-gray-700 hover:text-peach transition-colors py-2">
                  My Story
                </Link>
                <Link href="/testimonials" className="block text-gray-700 hover:text-peach transition-colors py-2">
                  Testimonials
                </Link>
                <Link href="/payment" className="block text-gray-700 hover:text-peach transition-colors py-2">
                  Payment
                </Link>
                <Link href="/contact" className="block text-gray-700 hover:text-peach transition-colors py-2">
                  Contact + FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

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
              <Card
                key={cookie.id}
                className="border-2 border-peach/20 hover:border-peach/40 transition-colors bg-white overflow-hidden"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={cookie.image || "/placeholder.svg"}
                    alt={`Delicious ${cookie.name} cookies`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Cookie className="h-6 w-6 text-peach" />
                    </div>
                  </div>
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-gray-800">{cookie.name}</CardTitle>
                  <div className="text-2xl font-bold text-peach">${cookie.price.toFixed(2)} per dozen</div>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <CardDescription className="text-gray-600 mb-4">{cookie.description}</CardDescription>
                  <div className="space-y-2">
                    <Button onClick={() => addToCart(cookie)} className="w-full bg-peach hover:bg-peach/90 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Baked Cookies
                    </Button>
                    {cookie.hasDough && (
                      <Button
                        onClick={() => {
                          const doughVersion = doughOptions.find((d) => d.name.includes(cookie.name.split(" ")[0]))
                          if (doughVersion) addToCart(doughVersion)
                        }}
                        variant="outline"
                        className="w-full border-peach text-peach hover:bg-peach hover:text-white bg-transparent"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Cookie Dough
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Cookies Section */}
      <section id="seasonal" className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-pink/20 text-pink-800 mb-4">Limited Time</Badge>
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Seasonal Specialties</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Special flavors that rotate throughout the year - get them while they last!
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {seasonalCookies.map((cookie) => (
              <Card
                key={cookie.id}
                className="border-2 border-pink/20 hover:border-pink/40 transition-colors bg-white overflow-hidden"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={cookie.image || "/placeholder.svg"}
                    alt={`Delicious ${cookie.name} cookies`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Star className="h-6 w-6 text-pink" />
                    </div>
                  </div>
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-gray-800">{cookie.name}</CardTitle>
                  <div className="text-2xl font-bold text-pink">${cookie.price.toFixed(2)} per dozen</div>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-4">{cookie.description}</CardDescription>
                  <Button onClick={() => addToCart(cookie)} className="w-full bg-pink hover:bg-pink/90 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
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

            <Card className="border-2 border-peach/20 bg-white mb-8">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg text-gray-700 italic mb-4 leading-relaxed">
                  "Fresh, sweet, timely, and delicious. She is the brightest and kindest entrepreneur! This might be the
                  beginning of something big! Watch out Crumbl, here comes Winnie!"
                </blockquote>
                <div className="flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5 text-peach" />
                  <span className="font-semibold text-gray-800">Diane Youd</span>
                </div>
              </CardContent>
            </Card>

            <Link href="/testimonials">
              <Button size="lg" className="bg-pink hover:bg-pink/90 text-white">
                <Star className="mr-2 h-5 w-5" />
                Read More & Share Your Review
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Europe Trip Progress Section */}
      <section className="py-16 px-4 bg-peach/5">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <Badge className="bg-peach/20 text-peach-800 mb-4">My Dream Journey</Badge>
            <h3 className="text-4xl font-bold text-gray-800 mb-6">Europe Trip Progress</h3>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Every dozen cookies sold brings me closer to my dream of exploring Europe in summer 2026! See how close I
              am to my goal and help me get there.
            </p>

            <Card className="border-2 border-peach/20 bg-white mb-8">
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="text-4xl">✈️</div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800">Track My Journey</h4>
                    <p className="text-gray-600">See my real-time progress toward Europe 2026!</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-700">
                    🍪 <strong>Every $7 dozen = One step closer to Europe!</strong>
                  </p>
                  <p className="text-gray-600">
                    My official EF Tours page shows exactly how much I've raised and how much I still need. When you buy
                    cookies OR donate directly, you're helping make this dream come true!
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://account.eftours.com/donations/YlnEpn" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-peach hover:bg-peach/90 text-white">
                  <Heart className="mr-2 h-5 w-5" />
                  View My Progress Tracker
                </Button>
              </a>
              <Link href="/cart">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-peach text-peach hover:bg-peach hover:text-white bg-transparent"
                >
                  <Cookie className="mr-2 h-5 w-5" />
                  Buy Cookies & Help My Dream
                </Button>
              </Link>
            </div>
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
