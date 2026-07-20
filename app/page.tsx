"use client"

import Link from "next/link"
import Image from "next/image"
import Header from "./components/Header"
import Footer from "./components/Footer"
import CookieCard from "./components/CookieCard"
import HalfDozenBuilder from "./components/HalfDozenBuilder"
import ReviewCarousel from "./components/ReviewCarousel"

export default function Home() {
  const menuItems = [
    {
      id: 1,
      name: "Mr. Herron's Big Blueberry Muffins",
      description:
        "A jumbo, bakery-style muffin bursting with juicy blueberries under a golden, sugar-crusted top",
      price: 5.0,
      category: "premium",
      tag: "Jumbo",
    },
    {
      id: 2,
      name: "Brown Butter Chocolate Chunk",
      description:
        "Nutty browned butter, pools of melty chocolate chunks, and a whisper of sea salt. Our signature",
      price: 5.0,
      category: "premium",
      tag: "Signature",
    },
    {
      id: 3,
      name: "Salt & Straw Snickerdoodles",
      description: "A jumbo cinnamon-sugar twist inspired by the famous Portland ice cream shop",
      price: 5.0,
      category: "premium",
      tag: "Fan Favorite",
    },
  ]

  return (
    <div className="min-h-screen bg-espresso">
      <Header />

      {/* Hero Section */}
      <section className="flex min-h-[86vh] flex-col items-center justify-center px-4 py-24 text-center">
        <p className="eyebrow animate-rise motion-reduce:animate-none">Lake Oswego · Oregon</p>
        <h1 className="mt-7 animate-rise font-carte text-7xl font-normal leading-[0.95] text-cream [animation-delay:150ms] motion-reduce:animate-none md:text-9xl">
          Collina
        </h1>
        <p className="mt-4 animate-rise pl-[0.58em] text-sm uppercase tracking-[0.58em] text-latte [animation-delay:300ms] motion-reduce:animate-none">
          Cookies &amp; Bakes
        </p>
        <p className="mx-auto mt-9 max-w-2xl animate-rise text-lg leading-relaxed text-latte [animation-delay:450ms] motion-reduce:animate-none">
          Jumbo, premium bakes from a very small bakery — browned butter, wild blueberries, and cinnamon sugar, baked
          by <strong className="font-semibold text-cream">Winnie</strong> and sold fresh at the{" "}
          <strong className="font-semibold text-cream">Lake Oswego Farmers&rsquo; Market</strong>.
        </p>
        <div className="mt-11 flex animate-rise flex-col justify-center gap-4 [animation-delay:600ms] motion-reduce:animate-none sm:flex-row">
          <a href="#menu" className="btn-gold">
            View the Carte
          </a>
          <Link href="/cart" className="btn-gold-ghost">
            Order for Delivery
          </Link>
        </div>
      </section>

      {/* Gold Ticker */}
      <div className="overflow-hidden whitespace-nowrap bg-gold text-espresso" aria-hidden="true">
        <div className="inline-block animate-marquee py-3 text-xs font-semibold uppercase tracking-[0.26em] motion-reduce:animate-none">
          <span>
            At the Lake Oswego Farmers&rsquo; Market Aug 1 &amp; 29&nbsp;&nbsp;·&nbsp;&nbsp;Jumbo Bakes, $5
            Each&nbsp;&nbsp;·&nbsp;&nbsp;Any Half Dozen, $25&nbsp;&nbsp;·&nbsp;&nbsp;Free Local
            Delivery&nbsp;&nbsp;·&nbsp;&nbsp;
          </span>
          <span>
            At the Lake Oswego Farmers&rsquo; Market Aug 1 &amp; 29&nbsp;&nbsp;·&nbsp;&nbsp;Jumbo Bakes, $5
            Each&nbsp;&nbsp;·&nbsp;&nbsp;Any Half Dozen, $25&nbsp;&nbsp;·&nbsp;&nbsp;Free Local
            Delivery&nbsp;&nbsp;·&nbsp;&nbsp;
          </span>
        </div>
      </div>

      {/* The Carte */}
      <section id="menu" className="px-4 py-24 md:py-28">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <p className="eyebrow mb-4">The Carte</p>
            <h2 className="font-carte text-4xl font-normal text-cream md:text-5xl">Small Menu, Big Bakes</h2>
            <p className="mt-4 text-latte">
              Every bake is one big, jumbo-sized treat — <b className="font-semibold text-gold">$5 apiece</b>,
              whichever you choose.
            </p>
            <p className="mt-2 text-sm italic text-latte">
              Single-item orders have a <b className="font-semibold not-italic text-gold">four-bake minimum</b>.
            </p>
          </div>

          <div className="mx-auto flex max-w-2xl flex-col gap-12">
            {menuItems.map((item) => (
              <CookieCard key={item.id} cookie={item} />
            ))}
          </div>

          {/* Half Dozen Deal */}
          <div className="gold-frame mx-auto mt-20 max-w-2xl p-10 text-center md:p-12">
            <p className="eyebrow mb-3">Mix &amp; Match</p>
            <h3 className="font-carte text-3xl font-normal text-cream">The Half Dozen</h3>
            <p className="my-2 font-carte text-6xl text-gold">$25</p>
            <p className="mx-auto max-w-md text-latte">
              Any six bakes, in any combination — muffins, chocolate chunk, snickerdoodles. That&rsquo;s $25 instead of
              $30: one of the six is on the house.
            </p>
            <HalfDozenBuilder />
          </div>
        </div>
      </section>

      {/* Farmers Market Section */}
      <section id="market" className="bg-roast px-4 py-24 md:py-28">
        <div className="container mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="eyebrow mb-4">Two Market Days Left</p>
            <h2 className="font-carte text-4xl font-normal text-cream md:text-5xl">Find the Booth</h2>
            <p className="mt-5 leading-relaxed text-latte">
              Collina Cookies has grown from a doorstep-delivery cookie company into a real booth at the Lake Oswego
              Farmers&rsquo; Market — on select dates. Everything on the table is baked the morning you buy it.
            </p>
            <div className="my-8 flex max-w-sm flex-col gap-4">
              <div className="flex items-baseline gap-3">
                <span className="text-[11.5px] font-semibold uppercase tracking-[0.24em] text-latte">Saturday</span>
                <span className="dotted-leader" />
                <span className="font-carte text-2xl text-gold md:text-[27px]">August 1</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-[11.5px] font-semibold uppercase tracking-[0.24em] text-latte">Saturday</span>
                <span className="dotted-leader" />
                <span className="font-carte text-2xl text-gold md:text-[27px]">August 29</span>
              </div>
            </div>
            <p className="text-sm italic text-latte">
              If more booth space opens up, more dates will follow — check back here.
            </p>
            <p className="mt-5 leading-relaxed text-latte">
              Can&rsquo;t make a market day? Order online — local delivery is always free.
            </p>
          </div>
          <figure className="m-0 w-full max-w-[420px] justify-self-center border border-gold/30 bg-espresso p-3 pb-4 md:justify-self-end">
            <div className="relative aspect-[68/75] w-full">
              <Image
                src="/images/winnie-market-booth.jpeg"
                alt="Winnie at the Collina Cookies booth under the Young Entrepreneur tent at the Lake Oswego Farmers' Market"
                fill
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3.5 text-center text-[11px] uppercase tracking-[0.26em] text-latte">
              The Collina booth · Lake Oswego Farmers&rsquo; Market
            </figcaption>
          </figure>
        </div>
      </section>

      {/* From My Kitchen */}
      <section className="px-4 py-24 text-center md:py-28">
        <div className="container mx-auto max-w-3xl">
          <p className="eyebrow mb-8">From My Kitchen</p>
          <blockquote className="mx-auto max-w-2xl font-carte text-2xl italic leading-snug text-cream md:text-[34px]">
            <span className="text-gold">&ldquo;</span>I bake because it makes people happy. That&rsquo;s honestly the
            entire business plan.<span className="text-gold">&rdquo;</span>
          </blockquote>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.28em] text-latte">— Winnie</p>
          <Link href="/story" className="btn-gold-ghost mt-9">
            Read My Story
          </Link>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="bg-roast px-4 py-24 text-center md:py-28">
        <div className="container mx-auto max-w-3xl">
          <p className="eyebrow mb-4">Customer Love</p>
          <h2 className="mb-12 font-carte text-4xl font-normal text-cream md:text-5xl">What People Are Saying</h2>

          <ReviewCarousel />

          <Link href="/testimonials" className="btn-gold-ghost mt-8">
            Read More &amp; Share Your Review
          </Link>
        </div>
      </section>

      {/* Custom Bakes Section */}
      <section id="custom" className="px-4 py-24 text-center md:py-28">
        <div className="container mx-auto max-w-3xl">
          <p className="eyebrow mb-4">Made to Order</p>
          <h2 className="font-carte text-4xl font-normal text-cream md:text-5xl">Custom Bakes</h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-latte">
            Have a special event or unique flavor in mind? Let&rsquo;s create something magical together — from
            birthday parties to school events, I&rsquo;ll craft the perfect baked goods for your occasion.
          </p>
          <div className="gold-frame mx-auto mt-10 max-w-2xl bg-espresso p-10">
            <h3 className="font-carte text-2xl font-normal text-cream">Perfect For</h3>
            <div className="mt-6 grid grid-cols-2 gap-4 text-latte md:grid-cols-4">
              <div>🎂 Birthdays</div>
              <div>🏢 Corporate Events</div>
              <div>🎉 Parties</div>
              <div>🎁 Gifts</div>
              <div>🏠 Family Gatherings</div>
              <div>🎈 Celebrations</div>
              <div>🍪 Bake Sales</div>
              <div>❤️ Special Occasions</div>
            </div>
          </div>
          <Link href="/contact" className="btn-gold mt-10">
            Request a Custom Bake
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
