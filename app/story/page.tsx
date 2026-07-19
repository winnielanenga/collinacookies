import { Cookie, Heart, Users, Award } from "lucide-react"
import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"

const chapters = [
  {
    icon: Heart,
    title: "Where It All Started",
    paragraphs: [
      "My love for baking began in the kitchen with my dad. He's the one who taught me that baking isn't just about following recipes – it's about putting love into every ingredient, every mix, and every batch that comes out of the oven.",
      "I remember the first time we made chocolate chip cookies together. The smell of vanilla and butter filling our kitchen, the excitement of waiting for that perfect golden-brown color, and most importantly, the joy of sharing something delicious with people we care about.",
    ],
  },
  {
    icon: Cookie,
    title: "Learning & Experimenting",
    paragraphs: [
      "What started as weekend baking sessions with dad quickly became my favorite hobby. I began experimenting with different flavors, trying new techniques, and learning from every batch – even the ones that didn't turn out quite right!",
      'My friends and family became my taste testers, and their smiles and requests for "just one more cookie" gave me the confidence to keep improving. Each recipe became a little adventure, and I discovered that I had a real passion for creating treats that make people happy.',
    ],
  },
  {
    icon: Award,
    title: "Collina Cookies is Born",
    paragraphs: [
      "When people started asking if they could order my cookies for their own events and celebrations, I realized this could be more than just a hobby. With my dad's support and encouragement, Collina Cookies was born!",
      'I chose the name "Collina" because it\'s actually the name of my street! Every time I see the street sign, it reminds me of this sweet journey I\'m on. It felt perfect to name my business after the place where all the magic happens in my kitchen.',
    "And the journey keeps growing! Collina Cookies now has its very own booth at the Lake Oswego Farmers' Market, where I sell my new line of jumbo, premium bakes — big blueberry muffins, brown butter chocolate chunk cookies, and my famous Salt & Straw snickerdoodles. Come say hi at the market!",
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
            Hi! I&rsquo;m Winnie Lanenga, and I&rsquo;m 14 years old. Welcome to my sweet journey of turning a love for
            baking into Collina Cookies!
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
              Every cookie I bake carries the love and lessons my dad taught me. My goal is simple: to create delicious
              treats that bring joy to your day and sweetness to your special moments.
            </p>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-latte">
              Whether it&rsquo;s a classic chocolate chip cookie that reminds you of childhood or a custom creation for
              your special event, I put the same care and attention into every single batch. Because at the end of the
              day, baking is about bringing people together and creating happy memories – one cookie at a time.
            </p>
          </div>

          {/* Call to Action */}
          <div className="pt-6 text-center">
            <h2 className="font-carte text-3xl font-normal text-cream">Ready to Try My Bakes?</h2>
            <p className="mt-4 text-latte">
              I&rsquo;d love to share my passion for baking with you! Browse the carte and place an order today.
            </p>
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
