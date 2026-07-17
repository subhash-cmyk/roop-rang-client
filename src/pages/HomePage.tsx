import { useEffect, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Star,
} from 'lucide-react'
import { productAPI, categoryAPI, getImageUrl, offerAPI, heroAPI } from '../services/api'
import ProductCard from '../components/product/ProductCard'
import ProductModal from '../components/product/ProductModal'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const [featured, setFeatured] = useState<any[]>([])
  const [newArrivals, setNewArrivals] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [offers, setOffers] = useState<any[]>([])
  const [selected, setSelected] = useState<any | null>(null)
  const [activeOffer, setActiveOffer] = useState(0)
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [hero, setHero] = useState<any>(null)
  const [heroLoading, setHeroLoading] = useState(true)

  useEffect(() => {
    heroAPI
      .get()
      .then((data) => {
        setHero(data)
      })
      .catch((err) => {
        console.log('Hero API Error', err)
      })
      .finally(() => {
        setHeroLoading(false)
      })

    productAPI.featured().then((data) => {
      setFeatured(data || [])
    })

    productAPI.newArrivals().then((data) => {
      setNewArrivals(data || [])
    })

    categoryAPI.list().then((r) => {
      console.log('Category Response:', r)
      const list = Array.isArray(r) ? r : r?.data
      setCategories(list || [])
    })

    offerAPI.list().then((r) => {
      const list = Array.isArray(r) ? r : r?.data
      setOffers(list || [])
    })
  }, [])

  useEffect(() => {
    if (offers.length <= 1) return

    const timer = setInterval(() => {
      setActiveOffer((prev) => (prev === offers.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(timer)
  }, [offers])

  // Guard against index going out of bounds if offers list changes
  const currentOffer =
    offers.length > 0 ? offers[Math.min(activeOffer, offers.length - 1)] : null

  return (
    <div className="bg-[#FAF8F5]">
      {/* ══════════════════════ HERO ══════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#F3EDE6]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative w-full">
          {heroLoading ? (
            <div className="h-[80vh] min-h-[520px] w-full animate-pulse bg-[#F3EDE6]" />
          ) : hero ? (
            <div className="relative">
              <img
                src={getImageUrl(hero.image)}
                alt="Roop Rang Cosmetics"
                className="block h-[80vh] min-h-[520px] w-full object-cover object-center"
              />

              {/* Soft dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1C]/60 via-[#1C1C1C]/25 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/45 via-transparent to-transparent" />
              {/* Top scrim — keeps the transparent header (nav + Login) readable over any hero image */}
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#1C1C1C]/60 to-transparent" />

              {/* Hero Content */}
              <div className="absolute inset-0 flex items-center px-6 sm:px-12 lg:px-24">
                <div className="max-w-xl text-white">
                  {hero.badgeText && (
                    <span className="mb-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#C9A45B]">
                      <span className="h-[1px] w-8 bg-[#C9A45B]" />
                      {hero.badgeText}
                    </span>
                  )}

                  {hero.title && (
                    <h1 className="font-playfair text-4xl leading-[1.12] sm:text-5xl lg:text-[64px]">
                      {hero.title}
                    </h1>
                  )}

                  {hero.subtitle && (
                    <p className="mt-5 max-w-md text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
                      {hero.subtitle}
                    </p>
                  )}

                  <Link
                    to="/products"
                    className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#C9A45B] px-9 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-[#1C1C1C]"
                  >
                    Shop Collection
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Fallback when hero API fails / returns null */
            <div className="flex h-[80vh] min-h-[520px] w-full items-center justify-center bg-[#F3EDE6]">
              <span className="font-playfair text-3xl text-[#1C1C1C]/30 sm:text-4xl">
                Roop Rang Cosmetics
              </span>
            </div>
          )}
        </motion.div>
      </section>

      {/* ══════════════════════ CATEGORIES ══════════════════════ */}
      <section className="container-custom py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left"
        >
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C9A45B]">
              Shop by
            </div>
            <h2 className="mt-2 font-playfair text-3xl text-[#1C1C1C] sm:text-4xl">
              Luxury Categories
            </h2>
          </div>

          {categories.length > 4 && (
            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="rounded-full border border-[#1C1C1C]/10 bg-white px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#1C1C1C] transition-all duration-300 hover:border-[#C9A45B] hover:text-[#C9A45B]"
            >
              {showAllCategories ? 'Show Less ↑' : 'View All →'}
            </button>
          )}
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {(showAllCategories ? categories : categories.slice(0, 4)).map((c: any) => (
            <Link to={`/products?category=${c.slug}`} key={c.id} className="group">
              <div className="relative overflow-hidden rounded-[24px] bg-[#F3EDE6] shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_24px_50px_rgba(28,28,28,0.12)]">
                <div className="aspect-[4/5] w-full overflow-hidden">
                  {c.image ? (
                    <img
                      src={getImageUrl(c.image)}
                      alt={c.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-playfair text-4xl text-[#C9A45B]">
                      {c.name?.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Bottom Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent px-5 py-5">
                  <h3 className="font-playfair text-xl text-white transition-colors duration-300 group-hover:text-[#F4D28A]">
                    {c.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════ FEATURED PRODUCTS ══════════════════════ */}
      <section className="border-y border-[#1C1C1C]/[0.05] bg-[#F3EDE6] py-16 lg:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 flex items-end justify-between gap-4"
          >
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C9A45B]">
                Editor's Pick
              </div>
              <h2 className="mt-2 font-playfair text-3xl text-[#1C1C1C] sm:text-4xl">
                Featured Products
              </h2>
            </div>
            <Link
              to="/products"
              className="rounded-full border border-[#1C1C1C]/10 bg-white px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#1C1C1C] transition-all duration-300 hover:border-[#C9A45B] hover:text-[#C9A45B]"
            >
              View All →
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {featured.map((p: any) => (
              <ProductCard key={p.id} product={p} onView={setSelected} />
            ))}
            {featured.length === 0 &&
              [...Array(4)].map((_, i) => <div key={i} className="h-[320px] shimmer rounded-2xl" />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════ OFFERS ══════════════════════ */}
      {offers.length > 0 && currentOffer && (
        <section className="py-16 lg:py-24">
          <div className="mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[28px] border border-[#1C1C1C]/[0.05] bg-white text-[#1C1C1C] shadow-[0_30px_80px_rgba(28,28,28,0.10)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentOffer.id}
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-[0.85fr_1.15fr]"
                >
                  {/* Content */}
                  <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C9A45B]">
                      Limited Offer
                    </div>

                    <h3 className="mt-3 font-playfair text-3xl text-[#1C1C1C] sm:text-4xl">
                      {currentOffer.name}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[#666666] sm:text-base sm:leading-8">
                      {currentOffer.description}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        to="/products"
                        className="rounded-full bg-[#1C1C1C] px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#C9A45B]"
                      >
                        Shop Now
                      </Link>

                      <a
                        href="https://wa.me/917096241594"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-[#25D366]/40 px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1eb858] transition-all duration-300 hover:bg-[#25D366] hover:text-white"
                      >
                        WhatsApp Order
                      </a>
                    </div>

                    {currentOffer.endDate && (
                      <div className="mt-6 text-[11px] font-medium uppercase tracking-[0.18em] text-[#666666]/70">
                        Valid till {new Date(currentOffer.endDate).toLocaleDateString('en-IN')}
                      </div>
                    )}
                  </div>

                  {/* Image */}
                  <div className="relative h-[300px] overflow-hidden md:h-auto md:min-h-[440px]">
                    {currentOffer.bannerImage && (
                      <img
                        src={getImageUrl(currentOffer.bannerImage)}
                        alt={currentOffer.name || 'offer'}
                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                      />
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Left Arrow */}
              {offers.length > 1 && (
                <button
                  aria-label="Previous offer"
                  onClick={() =>
                    setActiveOffer(activeOffer === 0 ? offers.length - 1 : activeOffer - 1)
                  }
                  className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[#1C1C1C] shadow-lg transition-all duration-300 hover:bg-[#C9A45B] hover:text-white"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* Right Arrow */}
              {offers.length > 1 && (
                <button
                  aria-label="Next offer"
                  onClick={() =>
                    setActiveOffer(activeOffer === offers.length - 1 ? 0 : activeOffer + 1)
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[#1C1C1C] shadow-lg transition-all duration-300 hover:bg-[#C9A45B] hover:text-white"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            {/* Dots */}
            {offers.length > 1 && (
              <div className="mt-7 flex justify-center gap-2">
                {offers.map((_, index) => (
                  <button
                    key={index}
                    aria-label={`Go to offer ${index + 1}`}
                    onClick={() => setActiveOffer(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeOffer === index
                        ? 'w-8 bg-[#C9A45B]'
                        : 'w-2.5 bg-[#1C1C1C]/15 hover:bg-[#C9A45B]/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══════════════════════ NEW ARRIVALS ══════════════════════ */}
      <section className="container-custom py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C9A45B]">
            Just In
          </div>
          <h2 className="mt-2 font-playfair text-3xl text-[#1C1C1C] sm:text-4xl">New Arrivals</h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {newArrivals.map((p: any) => (
            <ProductCard key={p.id} product={p} onView={setSelected} />
          ))}
        </div>
      </section>

      {/* ══════════════════════ WHY CHOOSE ══════════════════════ */}
      <section className="border-t border-[#1C1C1C]/[0.05] bg-white py-16 lg:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C9A45B]">
              Our Promise
            </div>
            <h2 className="mt-2 font-playfair text-3xl text-[#1C1C1C] sm:text-4xl">
              Why Choose Roop Rang?
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <ShieldCheck className="text-[#C9A45B]" />, t: '100% Authentic', d: 'Genuine premium cosmetics only' },
              { icon: <Sparkles className="text-[#C9A45B]" />, t: 'Luxury Curation', d: 'Handpicked shades for Indian skin' },
              { icon: <Truck className="text-[#C9A45B]" />, t: 'Surat Fast Delivery', d: 'Same-day local dispatch' },
              { icon: <HeartHandshake className="text-[#C9A45B]" />, t: 'WhatsApp Support', d: 'Personal beauty consultant' },
            ].map((f, i) => (
              <div
                key={i}
                className="rounded-[24px] border border-[#1C1C1C]/[0.05] bg-[#FAF8F5] p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(28,28,28,0.08)]"
              >
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#F3EDE6] ring-1 ring-[#C9A45B]/20">
                  {f.icon}
                </div>
                <div className="font-playfair text-lg text-[#1C1C1C]">{f.t}</div>
                <div className="mt-2 text-sm leading-6 text-[#666666]">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ TESTIMONIALS ══════════════════════ */}
      <section className="container-custom py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C9A45B]">
            Testimonials
          </div>
          <h2 className="mt-2 font-playfair text-3xl text-[#1C1C1C] sm:text-4xl">
            Loved by 2000+ Beauties
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { n: 'Priya S.', c: 'Surat', t: 'Lipstick pigment is insane! Roop Rang is my go-to now.' },
            { n: 'Anjali M.', c: 'Dindoli', t: 'Foundation shade matched perfectly. Love the luxury packaging.' },
            { n: 'Kavya R.', c: 'Ahmedabad', t: 'Super fast WhatsApp order. Authentic products, great price.' },
          ].map((t, i) => (
            <div
              key={i}
              className="rounded-[24px] border border-[#1C1C1C]/[0.05] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(28,28,28,0.08)]"
            >
              <div className="mb-4 flex text-[#C9A45B]">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="leading-7 text-[#666666]">“{t.t}”</p>
              <div className="mt-5 text-sm font-semibold text-[#1C1C1C]">
                {t.n} <span className="font-medium text-[#666666]/70">• {t.c}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════ CONTACT CTA ══════════════════════ */}
      <section className="bg-[#1C1C1C] py-16 lg:py-20">
        <div className="container-custom text-center">
          <div className="mx-auto mb-6 h-[1px] w-12 bg-[#C9A45B]" />
          <h3 className="font-playfair text-3xl text-white sm:text-4xl">
            Visit Our Boutique in Surat
          </h3>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/60">
            Shop No 521, Apex Building, Madhuram Circle, Dindoli, Surat – 394210
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="tel:+917096241594"
              className="inline-flex items-center justify-center rounded-full bg-[#C9A45B] px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-white hover:text-[#1C1C1C]"
            >
              Call +91 7096241594
            </a>
            <Link
              to="/inquiry"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-[#C9A45B] hover:text-[#C9A45B]"
            >
              Send Inquiry
            </Link>
          </div>
        </div>
      </section>

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
