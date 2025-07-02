import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Cookie, Heart, Users, Award } from "lucide-react"
import Link from "next/link"

export default function StoryPage() {
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
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              My <span className="text-pink">Story</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Hi! I'm Winnie Lanenga, and I'm 13 years old. Welcome to my sweet journey of turning a love for baking
              into Collina Cookies!
            </p>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* The Beginning */}
          <Card className="mb-12 border-2 border-peach/20 bg-white">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-peach/10 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-peach" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">Where It All Started</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                My love for baking began in the kitchen with my dad. He's the one who taught me that baking isn't just
                about following recipes – it's about putting love into every ingredient, every mix, and every batch that
                comes out of the oven.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                I remember the first time we made chocolate chip cookies together. The smell of vanilla and butter
                filling our kitchen, the excitement of waiting for that perfect golden-brown color, and most
                importantly, the joy of sharing something delicious with people we care about.
              </p>
            </CardContent>
          </Card>

          {/* Learning and Growing */}
          <Card className="mb-12 border-2 border-pink/20 bg-white">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-pink/10 rounded-full flex items-center justify-center">
                  <Cookie className="h-8 w-8 text-pink" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">Learning & Experimenting</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                What started as weekend baking sessions with dad quickly became my favorite hobby. I began experimenting
                with different flavors, trying new techniques, and learning from every batch – even the ones that didn't
                turn out quite right!
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                My friends and family became my taste testers, and their smiles and requests for "just one more cookie"
                gave me the confidence to keep improving. Each recipe became a little adventure, and I discovered that I
                had a real passion for creating treats that make people happy.
              </p>
            </CardContent>
          </Card>

          {/* Birth of Collina Cookies */}
          <Card className="mb-12 border-2 border-yellow/20 bg-white">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-yellow/10 rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">Collina Cookies is Born</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                When people started asking if they could order my cookies for their own events and celebrations, I
                realized this could be more than just a hobby. With my dad's support and encouragement, Collina Cookies
                was born!
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                I chose the name "Collina" because it's actually the name of my street! Every time I see the street
                sign, it reminds me of this sweet journey I'm on. It felt perfect to name my business after the place
                where all the magic happens in my kitchen.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                I'm not just baking for fun though - I have a big dream! I'm saving up every dollar from Collina Cookies
                for an amazing trip to Europe in the summer of 2026. Every dozen cookies I sell gets me one step closer
                to exploring those beautiful countries I've always dreamed of visiting!
              </p>
            </CardContent>
          </Card>

          {/* My Mission */}
          <Card className="mb-12 border-2 border-peach/20 bg-peach/5">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-peach/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-peach" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">My Mission</h3>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Every cookie I bake carries the love and lessons my dad taught me. My goal is simple: to create
                delicious treats that bring joy to your day and sweetness to your special moments.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Whether it's a classic chocolate chip cookie that reminds you of childhood or a custom creation for your
                special event, I put the same care and attention into every single batch. Because at the end of the day,
                baking is about bringing people together and creating happy memories – one cookie at a time.
              </p>
            </CardContent>
          </Card>

          {/* Europe Progress Tracker */}
          <Card className="mb-12 border-2 border-peach/20 bg-peach/5 text-center">
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-peach/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="text-2xl">✈️</div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Track My Europe Journey</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Want to see exactly how close I am to my Europe 2026 goal? My official EF Tours page shows my real-time
                progress! Every cookie order and every donation gets me one step closer to exploring the beautiful
                countries I've dreamed of visiting.
              </p>
              <a href="https://account.eftours.com/donations/YlnEpn" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-peach hover:bg-peach/90 text-white">
                  <Heart className="mr-2 h-5 w-5" />
                  View My Progress Tracker
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Ready to Try My Cookies?</h3>
            <p className="text-lg text-gray-600 mb-8">
              I'd love to share my passion for baking with you! Browse my flavors and place an order today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="bg-peach hover:bg-peach/90 text-white">
                  <Cookie className="mr-2 h-5 w-5" />
                  Shop Cookies
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-pink text-pink hover:bg-pink hover:text-white bg-transparent"
                >
                  Get in Touch
                </Button>
              </Link>
            </div>
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
