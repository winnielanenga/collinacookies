"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, MessageCircle, Clock, Send, CreditCard } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const fieldStyles = "rounded-none border-latte/40 bg-espresso text-cream placeholder:text-latte/60"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderType: "",
    message: "",
    preferText: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create email with contact form data
    const subject = `Contact Form: ${formData.orderType || "General Inquiry"}`
    const body = `New message from ${formData.name}:

Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}${formData.phone && formData.preferText ? " (Prefers text messages)" : ""}
Interest: ${formData.orderType || "Not specified"}

Message:
${formData.message}

Please respond to this inquiry!`

    const mailtoLink = `mailto:winnie.lanenga@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink

    alert("Thank you for your message! I'll get back to you soon!")
    setFormData({ name: "", email: "", phone: "", orderType: "", message: "", preferText: false })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-espresso">
      <Header />

      {/* Hero Section */}
      <section className="px-4 py-24 text-center">
        <div className="container mx-auto max-w-3xl">
          <p className="eyebrow mb-5">Correspondence</p>
          <h1 className="font-carte text-5xl font-normal text-cream md:text-6xl">Contact + FAQ</h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-latte">
            I&rsquo;d love to hear from you! Whether you want to place an order, ask about custom bakes, or just say
            hi, don&rsquo;t hesitate to reach out.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="border border-gold/25 bg-roast p-8 md:p-10">
            <div className="mb-2 flex items-center gap-3">
              <MessageCircle className="h-6 w-6 text-gold" />
              <h2 className="font-carte text-2xl font-normal text-cream">Send Me a Message</h2>
            </div>
            <p className="mb-8 text-sm text-latte">
              Fill out the form below and I&rsquo;ll get back to you as soon as possible!
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.18em] text-latte">
                    Your Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`mt-2 ${fieldStyles}`}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.18em] text-latte">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`mt-2 ${fieldStyles}`}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-[0.18em] text-latte">
                  Phone Number (Optional)
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`mt-2 ${fieldStyles}`}
                  placeholder="(555) 123-4567"
                />
                {formData.phone && (
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="preferText"
                      name="preferText"
                      checked={formData.preferText}
                      onChange={(e) => setFormData({ ...formData, preferText: e.target.checked })}
                      className="h-4 w-4 rounded border-latte/40 bg-espresso accent-[#DFA94E]"
                    />
                    <Label htmlFor="preferText" className="cursor-pointer text-sm text-latte">
                      I prefer to communicate via text message
                    </Label>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="orderType" className="text-xs font-semibold uppercase tracking-[0.18em] text-latte">
                  What are you interested in?
                </Label>
                <select
                  id="orderType"
                  name="orderType"
                  value={formData.orderType}
                  onChange={handleChange}
                  className="mt-2 w-full border border-latte/40 bg-espresso px-3 py-2 text-cream focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                >
                  <option value="">Select an option</option>
                  <option value="custom">Custom Bake Order</option>
                  <option value="event">Event/Party Order</option>
                  <option value="question">Just Have a Question</option>
                </select>
              </div>

              <div>
                <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.18em] text-latte">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`mt-2 min-h-[120px] ${fieldStyles}`}
                  placeholder="Tell me about your order or ask any questions you have!"
                />
              </div>

              <button type="submit" className="btn-gold w-full">
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info & Details */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="grid gap-6">
              <div className="border border-gold/25 bg-roast p-6">
                <div className="flex items-center gap-4">
                  <Mail className="h-7 w-7 flex-none text-gold" />
                  <div>
                    <h3 className="mb-1 font-carte text-xl text-cream">Email Me</h3>
                    <p className="text-latte">winnie.lanenga@gmail.com</p>
                    <p className="mt-1 text-sm text-latte/70">Best way to reach me for orders!</p>
                  </div>
                </div>
              </div>

              <div className="border border-gold/25 bg-roast p-6">
                <div className="flex items-center gap-4">
                  <MapPin className="h-7 w-7 flex-none text-gold" />
                  <div>
                    <h3 className="mb-1 font-carte text-xl text-cream">Delivery Service</h3>
                    <p className="text-latte">Free local delivery available</p>
                    <p className="mt-1 text-sm text-latte/70">Delivery details provided with order</p>
                  </div>
                </div>
              </div>

              <div className="border border-gold/25 bg-roast p-6">
                <div className="flex items-center gap-4">
                  <CreditCard className="h-7 w-7 flex-none text-gold" />
                  <div>
                    <h3 className="mb-1 font-carte text-xl text-cream">Payment Options</h3>
                    <p className="text-latte">Cash or credit card, in person</p>
                    <p className="mt-1 text-sm text-latte/70">
                      Square reader on hand — on delivery or at my market booth
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours & Info */}
            <div className="border border-gold/25 bg-roast p-6 md:p-8">
              <div className="mb-5 flex items-center gap-3">
                <Clock className="h-5 w-5 text-gold" />
                <h3 className="font-carte text-xl text-cream">Baking Schedule</h3>
              </div>
              <div className="space-y-5 text-latte">
                <div>
                  <h4 className="eyebrow mb-2 text-[10px]">When I Bake</h4>
                  <div className="space-y-1">
                    <p>
                      <strong className="text-cream">Summer (June-August):</strong> Monday - Sunday, all day
                    </p>
                    <p>
                      <strong className="text-cream">School Year:</strong> Monday - Saturday, after homework
                    </p>
                    <p>
                      <strong className="text-cream">Sundays:</strong> Taking a break
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="eyebrow mb-2 text-[10px]">Response Time</h4>
                  <p>I usually respond within 24 hours! Sometimes sooner if I&rsquo;m not in school.</p>
                </div>
                <div>
                  <h4 className="eyebrow mb-2 text-[10px]">Order Lead Time</h4>
                  <p>
                    Please order at least 3-4 days in advance for regular orders, and 1 week minimum for custom/large
                    orders.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="border border-gold/25 bg-roast p-6 md:p-8">
              <h3 className="mb-5 font-carte text-xl text-cream">Quick Questions?</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-cream">Do you deliver?</h4>
                  <p className="text-sm text-latte">
                    Yes! I offer free local delivery for all orders. Delivery details will be arranged when you place
                    your order.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-cream">How far in advance should I order?</h4>
                  <p className="text-sm text-latte">
                    3-4 days for regular orders, 1 week for custom orders or large quantities.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-cream">Can you make cookies for allergies?</h4>
                  <p className="text-sm text-latte">
                    Let me know about any allergies and I&rsquo;ll do my best to accommodate!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
