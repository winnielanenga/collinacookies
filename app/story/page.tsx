import { Cookie, Heart, Users } from "lucide-react"
import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"

const chapters = [
  {
    icon: Heart,
    title: "How It Started",
    paragraphs: [
      "I learned to bake from my dad. We started making chocolate chip cookies together on weekends when I was little, and I never really stopped. I still remember standing in front of the oven waiting for that first batch to turn golden — the whole kitchen smelled like butter and vanilla.",
      "My friends and family got used to being taste testers. Some batches were great, some definitely weren't, but I kept going — trying new flavors, tweaking recipes, and slowly figuring out what actually works.",
    ],
  },
  {
    icon: Cookie,
    title: "Becoming Collina Cookies",
    paragraphs: [
      "When people started asking to buy my cookies for parties and events, my dad helped me turn it into a real business. I named it Collina after our street, because that's where everything gets baked — every single order still comes out of my home kitchen.",
      "What started as doorstep deliveries around the neighborhood has slowly grown into something bigger. This summer I got a booth at the Lake Oswego Farmers' Market, where I sell my new jumbo bakes — big blueberry muffins, brown butter chocolate chunk cookies, and my Salt & Straw snickerdoodles. Come say hi!",
    ],
  },
]

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-espresso">
      <Header />

      {/* Hero Section */}
      <section className="px-4 py-24 text-center">
        <div className="container mx-auto max-w-3xl">
          <p className="eyebrow mb-5">The Baker</p>
          <h1 className="font-carte text-5xl font-normal text-cream md:text-6xl">My Story</h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-latte">
            Hi! I&rsquo;m Winnie. I&rsquo;m 14, I live in Lake Oswego, and I bake everything you see here.
          </p>
        </div>
      </section>

      {/* Story Content */}
      <section className="px-4 pb-24">
        <div className="container mx-auto flex max-w-3xl flex-col gap-10">
          {chapters.map((chapter) => (
            <div key={chapter.title} className="border border-gold/20 bg-roast p-8 md:p-10">
              <div className="mb-6 flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center border border-gold/35">
                  <chapter.icon className="h-6 w-6 text-gold" />
                </div>
                <h2 className="font-carte text-3xl font-normal text-cream">{chapter.title}</h2>
              </div>
              <div className="space-y-4">
                {chapter.paragraphs.map((text, i) => (
                  <p key={i} className="leading-relaxed text-latte">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {/* My Mission */}
          <div className="gold-frame bg-roast p-10 text-center md:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border border-gold/35">
              <Users className="h-7 w-7 text-gold" />
            </div>
            <h2 className="font-carte text-3xl font-normal text-cream">My Mission</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-latte">
              Every cookie I bake carries the love and lessons my dad taught me. My goal is simple: to create
              delicious treats that bring joy to your day and sweetness to your special moments.
            </p>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-latte">
              Whether it&rsquo;s a classic chocolate chip cookie that reminds you of childhood or a custom creation
              for your special event, I put the same care and attention into every single batch. Because at the end
              of the day, baking is about bringing people together and creating happy memories – one cookie at a
              time.
            </p>
          </div>

          {/* Call to Action */}
          <div className="pt-6 text-center">
            <h2 className="font-carte text-3xl font-normal text-cream">Ready to Try My Bakes?</h2>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/#menu" className="btn-gold">
                <Cookie className="h-4 w-4" />
                View the Carte
              </Link>
              <Link href="/contact" className="btn-gold-ghost">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
