"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Heart } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Diane Youd",
    rating: 5,
    text: "Fresh, sweet, timely, and delicious. She is the brightest and kindest entrepreneur! This might be the beginning of something big! Watch out Crumbl, here comes Winnie!",
  },
  {
    id: 2,
    name: "Heather Bogaty",
    rating: 5,
    text: "Winnie's Chai Spice Cookies are pure comfort in every bite, and her Loaded Chocolate Chip cookies are the perfect mix of chewy, melty, and rich. They taste just like the cookies my grandmother used to make...baked with love. The cookies were hand-delivered with such care, still warm from the oven! The packaging was beautiful and very professional. It's such a joy to support Winnie's big dream of traveling to Europe. I've shared her cookies with friends and family, and everyone who tries them wants to know where they can get their own. Winnie's cookies aren't just delicious, they're magical.",
  },
  {
    id: 3,
    name: "Milessa Lowrie",
    rating: 5,
    text: "I love that Winnie not only offers fresh, delicious cookies, but also gives us the option to buy her dough and bake them at home whenever we'd like. Her creative recipes, professional packaging, and top-notch service make the whole experience even sweeter!",
  },
  {
    id: 4,
    name: "Kathryn Latour",
    rating: 5,
    text: "Winnie brought me a box of her cookies last year when she was just starting her company. She carefully left them on my doorstep, not knowing I was on vacation. Weeks later, I discovered the darling Collina box shredded in the garden. I have since tried her delicious, scrumptious cookies and can highly recommend them, apparently so can all the raccoons in Lake Oswego.",
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused, mounted])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  if (!mounted) {
    return (
      <Card className="border-2 border-peach/20 bg-white mb-8">
        <CardContent className="p-8">
          <div className="flex justify-center mb-4">
            <Star className="h-6 w-6 text-yellow-400 fill-current" />
            <Star className="h-6 w-6 text-yellow-400 fill-current" />
            <Star className="h-6 w-6 text-yellow-400 fill-current" />
            <Star className="h-6 w-6 text-yellow-400 fill-current" />
            <Star className="h-6 w-6 text-yellow-400 fill-current" />
          </div>
          <blockquote className="text-lg text-gray-700 italic mb-4 leading-relaxed min-h-[120px]">
            "{testimonials[0].text}"
          </blockquote>
          <div className="flex items-center justify-center gap-2">
            <Heart className="h-5 w-5 text-peach" />
            <span className="font-semibold text-gray-800">{testimonials[0].name}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <Card className="border-2 border-peach/20 bg-white mb-8">
        <CardContent className="p-8">
          <div className="flex justify-center mb-4">
            <Star className="h-6 w-6 text-yellow-400 fill-current" />
            <Star className="h-6 w-6 text-yellow-400 fill-current" />
            <Star className="h-6 w-6 text-yellow-400 fill-current" />
            <Star className="h-6 w-6 text-yellow-400 fill-current" />
            <Star className="h-6 w-6 text-yellow-400 fill-current" />
          </div>
          <blockquote className="text-lg text-gray-700 italic mb-4 leading-relaxed min-h-[120px]">
            "{currentTestimonial.text}"
          </blockquote>
          <div className="flex items-center justify-center gap-2">
            <Heart className="h-5 w-5 text-peach" />
            <span className="font-semibold text-gray-800">{currentTestimonial.name}</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center gap-4 mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevious}
          className="border-peach text-peach hover:bg-peach hover:text-white bg-transparent"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-peach" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={goToNext}
          className="border-peach text-peach hover:bg-peach hover:text-white bg-transparent"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
