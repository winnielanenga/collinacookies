"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Cookie, Star, Heart, Send, MessageCircle } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const fieldStyles = "rounded-none border-latte/40 bg-espresso text-cream placeholder:text-latte/60"

const testimonials = [
  {
    name: "Diane Youd",
    text: "Fresh, sweet, timely, and delicious. She is the brightest and kindest entrepreneur! This might be the beginning of something big! Watch out Crumbl, here comes Winnie!",
  },
  {
    name: "Milessa Lowrie",
    text: "I love that Winnie not only offers fresh, delicious cookies, but also gives us the option to buy her dough and bake them at home whenever we'd like. Her creative recipes, professional packaging, and top-notch service make the whole experience even sweeter!",
  },
  {
    name: "Heather Bogaty",
    text: "Winnie's Chai Spice Cookies are pure comfort in every bite, and her Loaded Chocolate Chip cookies are the perfect mix of chewy, melty, and rich. They taste just like the cookies my grandmother used to make...baked with love. The cookies were hand-delivered with such care, still warm from the oven! The packaging was beautiful and very professional. It's such a joy to support Winnie's big dream of traveling to Europe. I've shared her cookies with friends and family, and everyone who tries them wants to know where they can get their own. Winnie's cookies aren't just delicious, they're magical.",
  },
  {
    name: "Kathryn Latour",
    text: "Winnie brought me a box of her cookies last year when she was just starting her company. She carefully left them on my doorstep, not knowing I was on vacation. Weeks later, I discovered the darling Collina box shredded in the garden. I have since tried her delicious, scrumptious cookies and can highly recommend them, apparently so can all the raccoons in Lake Oswego.",
  },
]

export default function TestimonialsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "5",
    testimonial: "",
  })

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

    alert("Thank you for your testimonial! I'll add it to the website soon!")
    setFormData({ name: "", email: "", rating: "5", testimonial: "" })
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
          <p className="eyebrow mb-5">Kind Words</p>
          <h1 className="font-carte text-5xl font-normal text-cream md:text-6xl">Customer Love</h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-latte">
            Nothing makes me happier than hearing from customers who love my bakes! Here&rsquo;s what people are saying
            about Collina Cookies.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-24">
        <div className="mx-auto max-w-4xl">
          {/* Testimonials */}
          <div className="mb-16 flex flex-col gap-8">
            {testimonials.map((t) => (
              <figure key={t.name} className="border border-gold/25 bg-roast p-8 text-center md:p-10">
                <div className="mb-4 flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-gold" />
                  ))}
                </div>
                <blockquote className="font-carte text-lg italic leading-relaxed text-cream md:text-xl">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-center gap-2">
                  <Heart className="h-4 w-4 text-gold" />
                  <span className="text-xs font-semibold uppercase tracking-[0.28em] text-latte">{t.name}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Submit Testimonial Section */}
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Testimonial Form */}
            <div className="border border-gold/25 bg-roast p-8 md:p-10">
              <div className="mb-2 flex items-center gap-3">
                <MessageCircle className="h-6 w-6 text-gold" />
                <h2 className="font-carte text-2xl font-normal text-cream">Share Your Experience</h2>
              </div>
              <p className="mb-8 text-sm italic text-latte">
                Loved your bakes? I&rsquo;d love to hear from you! Your testimonial might be featured on this page.
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
                  <Label htmlFor="rating" className="text-xs font-semibold uppercase tracking-[0.18em] text-latte">
                    Rating *
                  </Label>
                  <select
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="mt-2 w-full border border-latte/40 bg-espresso px-3 py-2 text-cream focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5 stars)</option>
                    <option value="4">⭐⭐⭐⭐ (4 stars)</option>
                    <option value="3">⭐⭐⭐ (3 stars)</option>
                    <option value="2">⭐⭐ (2 stars)</option>
                    <option value="1">⭐ (1 star)</option>
                  </select>
                </div>

                <div>
                  <Label
                    htmlFor="testimonial"
                    className="text-xs font-semibold uppercase tracking-[0.18em] text-latte"
                  >
                    Your Testimonial *
                  </Label>
                  <Textarea
                    id="testimonial"
                    name="testimonial"
                    value={formData.testimonial}
                    onChange={handleChange}
                    required
                    className={`mt-2 min-h-[120px] ${fieldStyles}`}
                    placeholder="Tell me what you loved about your Collina Cookies experience! What was your favorite bake? Would you recommend it to friends?"
                  />
                </div>

                <button type="submit" className="btn-gold w-full">
                  <Send className="h-4 w-4" />
                  Submit Testimonial
                </button>
              </form>
            </div>

            {/* Why Testimonials Matter */}
            <div className="space-y-8">
              <div className="border border-gold/25 bg-roast p-6 md:p-8">
                <div className="mb-4 flex items-center gap-4">
                  <Heart className="h-7 w-7 text-gold" />
                  <h3 className="font-carte text-xl text-cream">Your Words Mean Everything</h3>
                </div>
                <p className="text-latte">
                  As a young entrepreneur, your feedback helps me grow and improve. Every testimonial encourages me to
                  keep baking and chasing my dreams!
                </p>
              </div>

              <div className="border border-gold/25 bg-roast p-6 md:p-8">
                <div className="mb-4 flex items-center gap-4">
                  <Star className="h-7 w-7 text-gold" />
                  <h3 className="font-carte text-xl text-cream">Help Others Discover</h3>
                </div>
                <p className="mb-4 text-latte">
                  Your review helps other cookie lovers find Collina Cookies — online and at my Lake Oswego
                  Farmers&rsquo; Market booth!
                </p>
                <div className="space-y-1 text-sm text-latte/70">
                  <p>· Share your favorite bake</p>
                  <p>· Tell others about the quality</p>
                  <p>· Mention the delivery experience</p>
                  <p>· Help spread the word!</p>
                </div>
              </div>

              <div className="gold-frame bg-roast p-6 text-center md:p-8">
                <Cookie className="mx-auto mb-4 h-10 w-10 text-gold" />
                <h3 className="mb-2 font-carte text-xl text-cream">Thank You!</h3>
                <p className="text-latte">
                  Every order, every kind word, and every testimonial helps Collina Cookies grow. You&rsquo;re not just
                  buying cookies - you&rsquo;re supporting a young entrepreneur&rsquo;s journey!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
