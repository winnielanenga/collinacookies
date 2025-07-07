"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Cookie, Star, Heart, Send, MessageCircle, Mail, CheckCircle } from "lucide-react"
import Link from "next/link"
import CookieMonsterGame from "../components/CookieMonsterGame"

export default function TestimonialsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "5",
    testimonial: "",
  })
  const [showGame, setShowGame] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Create email with testimonial
    const subject = "New Customer Testimonial"
    const body = `New testimonial from ${formData.name}:

Rating: ${formData.rating}/5 stars
Email: ${formData.email}

Testimonial:
"${formData.testimonial}"

Please add this to the website testimonials!`

    const mailtoLink = `mailto:winnie.lanenga@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink

    // Show the "email sent" confirmation instead of the game
    setEmailSent(true)

    // Reset form
    setFormData({ name: "", email: "", rating: "5", testimonial: "" })
  }

  const handleEmailConfirmed = () => {
    // Now show the easter egg game after they confirm they sent the email
    setEmailSent(false)
    setShowGame(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
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
              Customer <span className="text-pink">Love</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Nothing makes me happier than hearing from customers who love my cookies! Here's what people are saying
              about Collina Cookies.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Featured Testimonial */}
          <Card className="border-2 border-peach/20 bg-peach/5 mb-12">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl text-gray-700 italic mb-6 leading-relaxed">
                  "Fresh, sweet, timely, and delicious. She is the brightest and kindest entrepreneur! This might be the
                  beginning of something big! Watch out Crumbl, here comes Winnie!"
                </blockquote>
                <div className="flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5 text-peach" />
                  <span className="font-semibold text-gray-800">Diane Youd</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Sent Confirmation */}
          {emailSent && (
            <Card className="border-2 border-green-300 bg-green-50 mb-12">
              <CardContent className="p-8 text-center">
                <Mail className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Email Ready to Send!</h3>
                <p className="text-lg text-gray-700 mb-6">
                  I've opened your email client with your testimonial ready to go. Please send that email, then come
                  back here!
                </p>
                <div className="bg-white rounded-lg p-4 border border-green-200 mb-6">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Next steps:</strong>
                  </p>
                  <ol className="text-sm text-gray-600 text-left max-w-md mx-auto">
                    <li>1. Check your email client (it should have opened)</li>
                    <li>2. Review the pre-filled testimonial</li>
                    <li>3. Click "Send" in your email</li>
                    <li>4. Come back here and click the button below!</li>
                  </ol>
                </div>
                <Button onClick={handleEmailConfirmed} className="bg-green-600 hover:bg-green-700 text-white" size="lg">
                  <CheckCircle className="mr-2 h-5 w-5" />I Sent the Email!
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Submit Testimonial Section */}
          {!emailSent && (
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Testimonial Form */}
              <Card className="border-2 border-pink/20 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
                    <MessageCircle className="h-6 w-6 text-pink" />
                    Share Your Experience
                  </CardTitle>
                  <CardDescription>
                    Loved your cookies? I'd love to hear from you! Your testimonial might be featured on this page.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="mt-1"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="mt-1"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="rating">Rating *</Label>
                      <select
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink focus:border-pink"
                      >
                        <option value="5">⭐⭐⭐⭐⭐ (5 stars)</option>
                        <option value="4">⭐⭐⭐⭐ (4 stars)</option>
                        <option value="3">⭐⭐⭐ (3 stars)</option>
                        <option value="2">⭐⭐ (2 stars)</option>
                        <option value="1">⭐ (1 star)</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="testimonial">Your Testimonial *</Label>
                      <Textarea
                        id="testimonial"
                        name="testimonial"
                        value={formData.testimonial}
                        onChange={handleChange}
                        required
                        className="mt-1 min-h-[120px]"
                        placeholder="Tell me what you loved about your Collina Cookies experience! What was your favorite flavor? How did the cookies taste? Would you recommend them to friends?"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-pink hover:bg-pink/90 text-white">
                      <Send className="mr-2 h-4 w-4" />
                      Submit Testimonial
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Why Testimonials Matter */}
              <div className="space-y-8">
                <Card className="border-2 border-yellow/20 bg-yellow/5">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Heart className="h-8 w-8 text-yellow-600" />
                      <h3 className="text-xl font-semibold text-gray-800">Your Words Mean Everything</h3>
                    </div>
                    <p className="text-gray-600">
                      As a young entrepreneur, your feedback helps me grow and improve. Every testimonial encourages me
                      to keep baking and chasing my dreams!
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-peach/20 bg-white">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Star className="h-8 w-8 text-peach" />
                      <h3 className="text-xl font-semibold text-gray-800">Help Others Discover</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Your review helps other cookie lovers find Collina Cookies and supports my goal of saving for my
                      Europe trip in 2026!
                    </p>
                    <div className="text-sm text-gray-500">
                      <p>• Share your favorite cookie flavor</p>
                      <p>• Tell others about the quality</p>
                      <p>• Mention the delivery experience</p>
                      <p>• Help spread the word!</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-pink/20 bg-pink/5">
                  <CardContent className="pt-6 text-center">
                    <Cookie className="h-12 w-12 text-pink mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h3>
                    <p className="text-gray-600">
                      Every order, every kind word, and every testimonial brings me closer to my dream of exploring
                      Europe. You're not just buying cookies - you're supporting a young entrepreneur's journey!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Easter Egg Game */}
      {showGame && <CookieMonsterGame onClose={() => setShowGame(false)} />}

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
