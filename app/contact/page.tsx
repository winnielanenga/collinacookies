"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Cookie, Mail, MapPin, MessageCircle, Clock, Send, CreditCard } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderType: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create email with contact form data
    const subject = `Contact Form: ${formData.orderType || "General Inquiry"}`
    const body = `New message from ${formData.name}:

Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}
Interest: ${formData.orderType || "Not specified"}

Message:
${formData.message}

Please respond to this inquiry!`

    const mailtoLink = `mailto:winnie.lanenga@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink

    alert("Thank you for your message! I'll get back to you soon!")
    setFormData({ name: "", email: "", phone: "", orderType: "", message: "" })
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
              Contact + <span className="text-pink">FAQ</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              I'd love to hear from you! Whether you want to place an order, ask about custom cookies, or just say hi,
              don't hesitate to reach out.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="border-2 border-peach/20 bg-white">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-peach" />
                Send Me a Message
              </CardTitle>
              <CardDescription>Fill out the form below and I'll get back to you as soon as possible!</CardDescription>
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
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <Label htmlFor="orderType">What are you interested in?</Label>
                  <select
                    id="orderType"
                    name="orderType"
                    value={formData.orderType}
                    onChange={handleChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-peach focus:border-peach"
                  >
                    <option value="">Select an option</option>
                    <option value="custom">Custom Cookie Order</option>
                    <option value="event">Event/Party Order</option>
                    <option value="question">Just Have a Question</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1 min-h-[120px]"
                    placeholder="Tell me about your order or ask any questions you have!"
                  />
                </div>

                <Button type="submit" className="w-full bg-peach hover:bg-peach/90 text-white">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Details */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="grid gap-6">
              <Card className="border-2 border-peach/20 bg-peach/5">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <Mail className="h-8 w-8 text-peach" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Email Me</h4>
                      <p className="text-gray-600">winnie.lanenga@gmail.com</p>
                      <p className="text-sm text-gray-500">Best way to reach me for orders!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-yellow/20 bg-yellow/5">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <MapPin className="h-8 w-8 text-yellow-600" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Delivery Service</h4>
                      <p className="text-gray-600">Local delivery available</p>
                      <p className="text-sm text-gray-500">Delivery details provided with order</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-peach/20 bg-peach/5">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-8 w-8 text-peach" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Payment Options</h4>
                      <p className="text-gray-600">Cash on delivery or EF Tours donation</p>
                      <p className="text-sm text-gray-500">Support my Europe trip directly!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Hours & Info */}
            <Card className="border-2 border-peach/20 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Clock className="h-5 w-5 text-peach" />
                  Baking Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">When I Bake:</h4>
                  <div className="space-y-1 text-gray-600">
                    <p>
                      <strong>Summer (June-August):</strong> Monday - Sunday, all day
                    </p>
                    <p>
                      <strong>School Year:</strong> Monday - Saturday, after homework
                    </p>
                    <p>
                      <strong>Sundays:</strong> Taking a break
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Response Time:</h4>
                  <p className="text-gray-600">
                    I usually respond within 24 hours! Sometimes sooner if I'm not in school.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Order Lead Time:</h4>
                  <p className="text-gray-600">
                    Please order at least 3-4 days in advance for regular orders, and 1 week minimum for custom/large
                    orders.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="border-2 border-pink/20 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-800">Quick Questions?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-800">Do you deliver?</h4>
                  <p className="text-gray-600 text-sm">
                    Yes! I offer local delivery for all orders. Delivery details will be arranged when you place your
                    order.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">How far in advance should I order?</h4>
                  <p className="text-gray-600 text-sm">
                    3-4 days for regular orders, 1 week for custom orders or large quantities.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Can you make cookies for allergies?</h4>
                  <p className="text-gray-600 text-sm">
                    Let me know about any allergies and I'll do my best to accommodate!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
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
