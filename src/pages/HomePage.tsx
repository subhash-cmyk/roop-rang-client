import { useEffect, useState, useMemo } from 'react'

import {
  Sparkles,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Star,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'

import { productAPI, categoryAPI, getImageUrl, offerAPI, heroAPI, testimonialAPI } from '../services/api'
import ProductCard from '../components/product/ProductCard'
import ProductModal from '../components/product/ProductModal'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import OffersSection from "../components/offers/OffersSection";
import { useLoader } from '../context/LoaderContext'

/* Small gold eyebrow label with hairline rules */
function Eyebrow({ children, center = false, light = false }: { children: React.ReactNode; center?: boolean; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
      <span className="h-px w-8 bg-[#C9A45B]/60" />
      <span className={`text-[10px] font-semibold uppercase tracking-[0.4em] ${light ? 'text-[#C9A45B]' : 'text-[#C9A45B]'}`}>
        {children}
      </span>
      <span className="h-px w-8 bg-[#C9A45B]/60" />
    </div>
  )
}

export default function HomePage() {
  const { showLoader, hideLoader } = useLoader()
  const [featured, setFeatured] = useState<any[]>([])
  const [newArrivals, setNewArrivals] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [offers, setOffers] = useState<any[]>([])
  const [allProducts, setAllProducts] = useState<any[]>([])
  const [selected, setSelected] = useState<any | null>(null)
  const [activeOffer, setActiveOffer] = useState(0)

  const [showAllCategories, setShowAllCategories] = useState(false)
  const [showAllNewArrivals, setShowAllNewArrivals] = useState(false)

  const [hero, setHero] = useState<any>(null)
  const [heroLoading, setHeroLoading] = useState(true)

  const [testimonials, setTestimonials] = useState<any[]>([])

  // Category subcategory tab states
  const beautySubcategories = ['Skincare', 'Makeup', 'Hair Care', 'Body Care', 'Fragrance']
  const [activeBeautySubcat, setActiveBeautySubcat] = useState('Skincare')

  const giftSubcategories = ['Gift Sets', 'Birthday Gifts', 'Special Occasion', 'Personalized Gifts']
  const [activeGiftsSubcat, setActiveGiftsSubcat] = useState('Gift Sets')

  const kidsSubcategories = ['Kids Care', 'Toys', 'Baby Products', 'Kids Accessories']
  const [activeKidsSubcat, setActiveKidsSubcat] = useState('Kids Care')

  useEffect(() => {
    showLoader();
    console.log("HomePage mounted");
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

    productAPI.list({ limit: 40 }).then((res) => {
      const list = res.data || (Array.isArray(res) ? res : [])
      setAllProducts(list)
    }).catch(console.error)

    productAPI.featured().then((data) => {
      setFeatured(data || [])
    })
    productAPI.newArrivals().then((data) => {
      setNewArrivals(data || [])
    })
    categoryAPI.list().then((r) => {
      const list = Array.isArray(r) ? r : r?.data
      setCategories(list || [])
    })
    offerAPI.list().then((r) => {
      const list = Array.isArray(r) ? r : r?.data
      setOffers(list || [])
    })
    testimonialAPI.list().then((r) => {
      const list = Array.isArray(r) ? r : r?.data
      setTestimonials(list || [])
    }).finally(() => {
      hideLoader();
    })
  }, [])

  useEffect(() => {
    if (offers.length <= 1) return
    const timer = setInterval(() => {
      setActiveOffer((prev) => (prev === offers.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [offers])

  const currentOffer =
    offers.length > 0 ? offers[Math.min(activeOffer, offers.length - 1)] : null

  const marqueeItems = [
    '100% Authentic Products',
    'Same-Day Surat Delivery',
    'WhatsApp Ordering',
    'Luxury Curated Shades',
    'Cash on Delivery Available',
  ]

  // Slice helpers
  const featuredToShow = featured.slice(0, 6)
  const newArrivalsToShow = showAllNewArrivals ? newArrivals : newArrivals.slice(0, 6)

  // Filter products for category sections with robust fallback to keep 6 cards per row
  const filterCategoryProducts = (subcatName: string) => {
    const term = subcatName.toLowerCase()
    const matched = allProducts.filter((p) => {
      const catName = p.category?.name?.toLowerCase() || ''
      const pName = p.name?.toLowerCase() || ''
      const pDesc = p.description?.toLowerCase() || ''
      return catName.includes(term) || pName.includes(term) || pDesc.includes(term)
    })
    if (matched.length >= 6) return matched.slice(0, 6)
    
    // Fill remaining up to 6 with available products
    const remaining = allProducts.filter((p) => !matched.includes(p))
    return [...matched, ...remaining].slice(0, 6)
  }

  const forYouProducts = useMemo(() => {
    if (allProducts.length >= 6) return allProducts.slice(0, 6)
    return featured.length >= 6 ? featured.slice(0, 6) : featured
  }, [allProducts, featured])

  const beautyProducts = useMemo(
    () => filterCategoryProducts(activeBeautySubcat),
    [allProducts, activeBeautySubcat]
  )

  const giftsProducts = useMemo(
    () => filterCategoryProducts(activeGiftsSubcat),
    [allProducts, activeGiftsSubcat]
  )

  const kidsProducts = useMemo(
    () => filterCategoryProducts(activeKidsSubcat),
    [allProducts, activeKidsSubcat]
  )

  return (
    <div className="bg-[#FAF8F5]">
      {/* ══════════════════════ HERO — full width ══════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#F3EDE6]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative w-full">
          {heroLoading ? (
            <div className="h-[88vh] min-h-[560px] w-full animate-pulse bg-[#F3EDE6]" />
          ) : hero ? (
            <div className="relative">
              <motion.img
                initial={{ scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.2, ease: 'easeOut' }}
                src={getImageUrl(hero.image)}
                alt="Roop Rang Cosmetics"
                className="block h-[88vh] min-h-[560px] w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1C]/65 via-[#1C1C1C]/25 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/50 via-transparent to-transparent" />
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#1C1C1C]/60 to-transparent" />
              <div className="absolute inset-0 flex items-center px-6 sm:px-12 lg:px-20 xl:px-28">
                <div className="max-w-2xl text-white">
                  {hero.badgeText && (
                    <motion.span
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.7 }}
                      className="mb-7 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#C9A45B]"
                    >
                      <span className="h-[1px] w-10 bg-[#C9A45B]" />
                      {hero.badgeText}
                    </motion.span>
                  )}
                  {hero.title && (
                    <motion.h1
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.8 }}
                      className="font-playfair text-5xl leading-[1.08] sm:text-6xl lg:text-7xl xl:text-[84px]"
                    >
                      {hero.title}
                    </motion.h1>
                  )}
                  {hero.subtitle && (
                    <motion.p
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="mt-6 max-w-lg text-sm leading-7 text-white/75 sm:text-base sm:leading-8"
                    >
                      {hero.subtitle}
                    </motion.p>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.8 }}
                    className="mt-10 flex flex-wrap items-center gap-5"
                  >
                    <Link
                      to="/products"
                      className="group inline-flex items-center gap-3 rounded-full bg-[#C9A45B] px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-[#1C1C1C]"
                    >
                      Shop Collection
                      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <a
                      href="#for-you"
                      className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/80 underline decoration-[#C9A45B]/60 decoration-1 underline-offset-8 transition-colors duration-300 hover:text-[#C9A45B]"
                    >
                      Explore For You
                    </a>
                  </motion.div>
                </div>
              </div>
              <div className="absolute bottom-8 right-8 hidden flex-col items-center gap-3 lg:flex">
                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/60 [writing-mode:vertical-rl]">
                  Scroll
                </span>
                <span className="h-14 w-px bg-gradient-to-b from-[#C9A45B] to-transparent" />
              </div>
            </div>
          ) : (
            <div className="flex h-[88vh] min-h-[560px] w-full items-center justify-center bg-[#F3EDE6]">
              <span className="font-playfair text-3xl text-[#1C1C1C]/30 sm:text-4xl">
                Roop Rang Cosmetics
              </span>
            </div>
          )}
        </motion.div>
      </section>

      {/* ══════════════════════ MARQUEE STRIP ══════════════════════ */}
      <section className="w-full overflow-hidden border-y border-[#C9A45B]/15 bg-[#1C1C1C] py-4">
        <div className="flex w-max animate-marquee items-center gap-10">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.35em] text-[#C9A45B]">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rotate-45 bg-[#C9A45B]/40" />
            </span>
          ))}
        </div>
      </section>

      {/* ══════════════════════ 1. FOR YOU SECTION ══════════════════════ */}
      <section id="for-you" className="w-full py-16 lg:py-24 bg-white border-b border-[#1C1C1C]/[0.05]">
        <div className="px-5 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <Eyebrow>Curated Discovery</Eyebrow>
              <h2 className="mt-3 font-playfair text-4xl leading-[1.1] text-[#1C1C1C] sm:text-5xl">
                For <span className="italic text-[#C9A45B]">You</span>
              </h2>
              <p className="mt-2 text-sm text-[#666666]">
                Personalized recommendations tailored to your style and skin tones.
              </p>
            </div>
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#C9A45B] hover:text-[#1C1C1C] transition-colors"
            >
              Explore Collection
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-4">
            {forYouProducts.map((p: any, idx: number) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 6) * 0.05 }}
                className="aspect-[3/4] overflow-hidden rounded-[20px] bg-[#EFE8DE]"
              >
                <ProductCard product={p} onView={setSelected} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ CATEGORIES GRID ══════════════════════ */}
      <section id="categories" className="w-full py-16 lg:py-24">
        <div className="px-5 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <Eyebrow>Boutique Categories</Eyebrow>
              <h2 className="mt-4 font-playfair text-4xl leading-[1.1] text-[#1C1C1C] sm:text-5xl lg:text-6xl">
                Shop by <span className="italic text-[#C9A45B]">Category</span>
              </h2>
            </div>
            <div className="flex flex-col items-start gap-5 lg:items-end">
              {categories.length > 12 && (
                <button
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="group inline-flex items-center gap-2 rounded-full border border-[#1C1C1C]/15 bg-white px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1C1C1C] transition-all duration-300 hover:border-[#C9A45B] hover:bg-[#C9A45B] hover:text-white"
                >
                  {showAllCategories ? 'Show Less' : 'View All Categories'}
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:rotate-45" />
                </button>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
            {(showAllCategories ? categories : categories.slice(0, 12)).map((c: any, idx: number) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 6) * 0.06 }}
              >
                <Link to={`/products?category=${c.slug}`} className="group block">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[20px] bg-[#EFE8DE]">
                    {c.image ? (
                      <img
                        src={getImageUrl(c.image)}
                        alt={c.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-playfair text-4xl text-[#C9A45B]/50">
                        {c.name?.charAt(0)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/75 via-[#1C1C1C]/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute left-4 top-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/10 transition-all duration-500 group-hover:ring-2 group-hover:ring-[#C9A45B]/70" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                      <span className="mx-auto mb-2 block h-px w-6 bg-[#C9A45B] transition-all duration-500 group-hover:w-10" />
                      <h3 className="font-playfair text-[15px] leading-snug text-white transition-colors duration-300 group-hover:text-[#F4D28A] sm:text-base">
                        {c.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ 2. BEAUTY CATEGORY SECTION ══════════════════════ */}
      <section id="beauty" className="w-full py-16 lg:py-24 bg-[#F3EDE6] border-y border-[#1C1C1C]/[0.06]">
        <div className="px-5 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <Eyebrow>Cosmetic Essentials</Eyebrow>
              <h2 className="mt-3 font-playfair text-4xl leading-[1.1] text-[#1C1C1C] sm:text-5xl">
                Beauty <span className="italic text-[#C9A45B]">Collection</span>
              </h2>
            </div>
            <Link
              to="/products?category=beauty"
              className="group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1C1C1C] hover:text-[#C9A45B] transition-colors"
            >
              View All Beauty
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Beauty Subcategory Pills */}
          <div className="mb-10 flex flex-wrap items-center gap-2 sm:gap-3">
            {beautySubcategories.map((subcat) => (
              <button
                key={subcat}
                onClick={() => setActiveBeautySubcat(subcat)}
                className={`rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                  activeBeautySubcat === subcat
                    ? 'bg-[#1C1C1C] text-white shadow-md'
                    : 'bg-white/80 text-[#1C1C1C]/70 hover:bg-white hover:text-[#C9A45B]'
                }`}
              >
                {subcat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-4">
            {beautyProducts.map((p: any, idx: number) => (
              <motion.div
                key={`${p.id}-${activeBeautySubcat}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (idx % 6) * 0.05 }}
                className="aspect-[3/4] overflow-hidden rounded-[20px] bg-[#EFE8DE]"
              >
                <ProductCard product={p} onView={setSelected} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ FEATURED PRODUCTS ══════════════════════ */}
      <section className="w-full py-16 lg:py-24">
        <div className="px-5 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <Eyebrow>Editor's Pick</Eyebrow>
              <h2 className="mt-4 font-playfair text-4xl leading-[1.1] text-[#1C1C1C] sm:text-5xl lg:text-6xl">
                Featured <span className="italic text-[#C9A45B]">Products</span>
              </h2>
            </div>
            <div className="flex flex-col items-start gap-5 lg:items-end">
              <Link
                to="/products"
                className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#1C1C1C]/15 bg-white px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1C1C1C] transition-all duration-300 hover:border-[#C9A45B] hover:bg-[#C9A45B] hover:text-white"
              >
                View All
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-4">
            {featuredToShow.map((p: any, idx: number) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 6) * 0.06 }}
                className="aspect-[3/4] overflow-hidden rounded-[20px] bg-[#EFE8DE]"
              >
                <ProductCard product={p} onView={setSelected} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ OFFERS BANNER SECTION ══════════════════════ */}
      {offers.length > 0 && currentOffer && (
        <OffersSection
          offers={offers}
          activeOffer={activeOffer}
          currentOffer={currentOffer}
          setActiveOffer={setActiveOffer}
        />
      )}

      {/* ══════════════════════ 3. GIFTS CATEGORY SECTION ══════════════════════ */}
      <section id="gifts" className="w-full py-16 lg:py-24 bg-[#FAF6F0] border-y border-[#C9A45B]/15">
        <div className="px-5 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <Eyebrow>Thoughtful Presents</Eyebrow>
              <h2 className="mt-3 font-playfair text-4xl leading-[1.1] text-[#1C1C1C] sm:text-5xl">
                Gifts <span className="italic text-[#C9A45B]">Collection</span>
              </h2>
            </div>
            <Link
              to="/products?category=gifts"
              className="group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#C9A45B] hover:text-[#1C1C1C] transition-colors"
            >
              Browse All Gifts
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Gifts Subcategory Pills */}
          <div className="mb-10 flex flex-wrap items-center gap-2 sm:gap-3">
            {giftSubcategories.map((subcat) => (
              <button
                key={subcat}
                onClick={() => setActiveGiftsSubcat(subcat)}
                className={`rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                  activeGiftsSubcat === subcat
                    ? 'bg-[#C9A45B] text-white shadow-md'
                    : 'bg-white text-[#1C1C1C]/70 hover:bg-[#C9A45B]/10 hover:text-[#C9A45B]'
                }`}
              >
                {subcat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-4">
            {giftsProducts.map((p: any, idx: number) => (
              <motion.div
                key={`${p.id}-${activeGiftsSubcat}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (idx % 6) * 0.05 }}
                className="aspect-[3/4] overflow-hidden rounded-[20px] bg-[#EFE8DE]"
              >
                <ProductCard product={p} onView={setSelected} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ 4. KIDS CATEGORY SECTION ══════════════════════ */}
      <section id="kids" className="w-full py-16 lg:py-24 bg-white border-b border-[#1C1C1C]/[0.05]">
        <div className="px-5 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <Eyebrow>Gentle & Fun</Eyebrow>
              <h2 className="mt-3 font-playfair text-4xl leading-[1.1] text-[#1C1C1C] sm:text-5xl">
                Kids <span className="italic text-[#C9A45B]">Collection</span>
              </h2>
            </div>
            <Link
              to="/products?category=kids"
              className="group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1C1C1C] hover:text-[#C9A45B] transition-colors"
            >
              Explore Kids Line
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Kids Subcategory Pills */}
          <div className="mb-10 flex flex-wrap items-center gap-2 sm:gap-3">
            {kidsSubcategories.map((subcat) => (
              <button
                key={subcat}
                onClick={() => setActiveKidsSubcat(subcat)}
                className={`rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                  activeKidsSubcat === subcat
                    ? 'bg-[#1C1C1C] text-white shadow-md'
                    : 'bg-[#F3EDE6] text-[#1C1C1C]/70 hover:bg-white hover:text-[#C9A45B]'
                }`}
              >
                {subcat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-4">
            {kidsProducts.map((p: any, idx: number) => (
              <motion.div
                key={`${p.id}-${activeKidsSubcat}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (idx % 6) * 0.05 }}
                className="aspect-[3/4] overflow-hidden rounded-[20px] bg-[#EFE8DE]"
              >
                <ProductCard product={p} onView={setSelected} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ NEW ARRIVALS ══════════════════════ */}
      <section className="w-full py-16 lg:py-24 bg-[#F3EDE6]">
        <div className="px-5 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <Eyebrow>Just In</Eyebrow>
              <h2 className="mt-4 font-playfair text-4xl leading-[1.1] text-[#1C1C1C] sm:text-5xl lg:text-6xl">
                New <span className="italic text-[#C9A45B]">Arrivals</span>
              </h2>
            </div>
            <div className="flex flex-col items-start gap-5 lg:items-end">
              {newArrivals.length > 6 && (
                <button
                  onClick={() => setShowAllNewArrivals(!showAllNewArrivals)}
                  className="group inline-flex items-center gap-2 rounded-full border border-[#1C1C1C]/15 bg-white px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1C1C1C] transition-all duration-300 hover:border-[#C9A45B] hover:bg-[#C9A45B] hover:text-white"
                >
                  {showAllNewArrivals ? 'Show Less' : 'View All New Arrivals'}
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:rotate-45" />
                </button>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-4">
            {newArrivalsToShow.map((p: any, idx: number) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 6) * 0.06 }}
                className="aspect-[3/4] overflow-hidden rounded-[20px] bg-[#EFE8DE]"
              >
                <ProductCard product={p} onView={setSelected} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ WHY CHOOSE ══════════════════════ */}
      <section className="w-full bg-[#1C1C1C] py-20 lg:py-28">
        <div className="px-5 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Eyebrow center light>Our Promise</Eyebrow>
            <h2 className="mt-4 font-playfair text-4xl leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              Why Choose <span className="italic text-[#C9A45B]">Roop Rang?</span>
            </h2>
          </motion.div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <ShieldCheck size={22} className="text-[#C9A45B]" />, t: '100% Authentic', d: 'Genuine premium cosmetics only' },
              { icon: <Sparkles size={22} className="text-[#C9A45B]" />, t: 'Luxury Curation', d: 'Handpicked shades for Indian skin' },
              { icon: <Truck size={22} className="text-[#C9A45B]" />, t: 'Surat Fast Delivery', d: 'Same-day local dispatch' },
              { icon: <HeartHandshake size={22} className="text-[#C9A45B]" />, t: 'WhatsApp Support', d: 'Personal beauty consultant' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group border-white/[0.07] px-8 py-10 text-center sm:border-l sm:first:border-l-0 sm:[&:nth-child(3)]:border-l-0 lg:[&:nth-child(3)]:border-l"
              >
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A45B]/30 bg-[#C9A45B]/[0.08] transition-all duration-500 group-hover:bg-[#C9A45B]/20">
                  {f.icon}
                </div>
                <div className="font-playfair text-xl text-white">{f.t}</div>
                <div className="mt-2.5 text-sm leading-6 text-white/50">{f.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ TESTIMONIALS ══════════════════════ */}
      <section className="w-full py-20 lg:py-28">
        <div className="px-5 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <Eyebrow center>Testimonials</Eyebrow>
            <h2 className="mt-4 font-playfair text-4xl leading-[1.1] text-[#1C1C1C] sm:text-5xl lg:text-6xl">
              Loved by <span className="italic text-[#C9A45B]">2000+ Beauties</span>
            </h2>
          </motion.div>
          <div className="overflow-hidden">
            <div className="flex gap-6 animate-testimonial-scroll">
              {[...testimonials, ...testimonials].map((t: any, i: number) => (
                <motion.div
                  key={`${t.id}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative w-[360px] flex-shrink-0 rounded-[24px] border border-[#1C1C1C]/[0.05] bg-white p-9 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(28,28,28,0.10)]"
                >
                  <span className="pointer-events-none absolute right-7 top-5 font-playfair text-7xl leading-none text-[#C9A45B]/15">
                    &rdquo;
                  </span>

                  <div className="mb-5 flex text-[#C9A45B]">
                    {[...Array(5)].map((_, s) => (
                      <Star
                        key={s}
                        size={15}
                        fill={s < t.rating ? "currentColor" : "none"}
                        className={s < t.rating ? "" : "text-[#C9A45B]/30"}
                      />
                    ))}
                  </div>

                  <p className="font-playfair text-lg leading-8 text-[#1C1C1C]/80 italic">
                    "{t.review}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ CONTACT CTA ══════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#1C1C1C] py-20 lg:py-28">
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A45B]/10 blur-[120px]" />
        <div className="relative px-5 text-center sm:px-8">
          <Eyebrow center light>Visit Us</Eyebrow>
          <h3 className="mx-auto mt-5 max-w-3xl font-playfair text-4xl leading-[1.12] text-white sm:text-5xl lg:text-6xl">
            Visit Our <span className="italic text-[#C9A45B]">Boutique</span> in Surat
          </h3>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
            Shop No 521, Apex Building, Madhuram Circle, Dindoli, Surat – 394210
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="tel:+917096241594"
              className="inline-flex items-center justify-center rounded-full bg-[#C9A45B] px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-white hover:text-[#1C1C1C]"
            >
              Call +91 7096241594
            </a>
            <Link
              to="/inquiry"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-[#C9A45B] hover:text-[#C9A45B]"
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
