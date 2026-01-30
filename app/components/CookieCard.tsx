"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cookie, Star, Plus } from "lucide-react"
import Image from "next/image"
import { useCart } from "../hooks/useCart"

interface CookieData {
  id: number
  name: string
  description: string
  price: number
  category: string
  image?: string
  hasDough?: boolean
}

interface CookieCardProps {
  cookie: CookieData
  doughOptions?: CookieData[]
  variant?: "classic" | "seasonal"
}

export default function CookieCard({ cookie, doughOptions = [], variant = "classic" }: CookieCardProps) {
  const { addToCart } = useCart()

  const borderColor =
    variant === "classic" ? "border-peach/20 hover:border-peach/40" : "border-pink/20 hover:border-pink/40"
  const priceColor = variant === "classic" ? "text-peach" : "text-pink"
  const buttonColor = variant === "classic" ? "bg-peach hover:bg-peach/90" : "bg-pink hover:bg-pink/90"
  const iconColor = variant === "classic" ? "text-peach" : "text-pink"
  const Icon = variant === "classic" ? Cookie : Star

  return (
    <Card className={`border-2 ${borderColor} transition-colors bg-white overflow-hidden`}>
      <div className="relative h-48 w-full">
        <Image
          src={cookie.image || "/placeholder.svg"}
          alt={`Delicious ${cookie.name} cookies`}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 right-3">
          <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
        </div>
      </div>
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-gray-800">{cookie.name}</CardTitle>
        <div className={`text-2xl font-bold ${priceColor}`}>
          ${cookie.price.toFixed(2)} per {variant === "classic" ? "dozen" : "batch"}
        </div>
      </CardHeader>
      <CardContent className="text-center space-y-3">
        <CardDescription className="text-gray-600 mb-4">{cookie.description}</CardDescription>
        <div className="space-y-2">
          <Button onClick={() => addToCart(cookie)} className={`w-full ${buttonColor} text-white`}>
            <Plus className="h-4 w-4 mr-2" />
            {variant === "classic" ? "Add Baked Cookies" : "Add to Cart"}
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
  )
}
