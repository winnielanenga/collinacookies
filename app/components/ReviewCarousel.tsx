"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Testimonial {
  name: string
  rating: number
  text: string
}

const testimonials: Testimonial[] = [
  {
    name: "Diane Youd",
    rating: 5,
    text: "Fresh, sweet, timely, and delicious. She is the brightest and kindest entrepreneur! This might be the beginning of something big! Watch out Crumbl, here comes Winnie!",
  },
  {
    name: "Milessa Lowrie",
    rating: 5,
    text: "I love that Winnie not only offers fresh, delicious cookies, but also gives us the option to buy her dough and bake them at home whenever we'd like. Her creative recipes, professional packaging, and top-notch service make the whole experience even sweeter!",
  },
  {
    name: "Heather Bogaty",
    rating: 5,
    text: "Winnie's Chai Spice Cookies are pure comfort in every bite, and her Loaded Chocolate Chip cookies are the perfect mix of chewy, melty, and rich. They taste just like the cookies my grandmother used to make...baked with love. The cookies were hand-delivered with such care, still warm from the oven! The packaging was beautiful and very professional. It's such a joy to support Winnie's big dream of traveling to Europe. I've shared her cookies with friends and family, and everyone who tries them wants to know where they can get their own. Winnie's cookies aren't just delicious, they're magical.",
  },
  {
    name: "Kathryn Latour",
    rating: 5,
    text: "Winnie brought me a box of her cookies last year when she was just starting her company. She carefully left them on my doorstep, not knowing I was on vacation. Weeks later, I discovered the darling Collina box shredded in the garden. I have since tried her delicious, scrumptious cookies and can highly recommend them, apparently so can all the raccoons in Lake Oswego.",
  },
]

export default function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [isPaused])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToIndex = (index: number) => {
    setCurrentIndex(index)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <Card className="border-2 border-peach/20 bg-white mb-8">
        <CardContent className="p-8">
          <div className="transition-opacity duration-500">
            <div className="flex justify-center mb-4 gap-1">
              {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-lg text-gray-700 italic mb-4 leading-relaxed min-h-[120px]">
              "{currentTestimonial.text}"
            </blockquote>
            <div className="flex items-center justify-center gap-2">
              <Heart className="h-5 w-5 text-peach" />
              <span className="font-semibold text-gray-800">{currentTestimonial.name}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/80 hover:bg-white shadow-md"
        onClick={goToPrevious}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-6 w-6 text-gray-700" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/80 hover:bg-white shadow-md"
        onClick={goToNext}
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-6 w-6 text-gray-700" />
      </Button>

      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-8 bg-peach" : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
