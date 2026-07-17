import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { productAPI, categoryAPI, getImageUrl, offerAPI, heroAPI } from '../services/api'
import ProductCard from '../components/product/ProductCard'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ShieldCheck, Truck, HeartHandshake, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductModal from '../components/product/ProductModal'

export default function HomePage() {
  const [featured, setFeatured] = useState<any[]>([])
  const [newArrivals, setNewArrivals] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [offers, setOffers] = useState<any[]>([])
  const [selected, setSelected] = useState<any | null>(null)
  const [activeOffer, setActiveOffer] = useState(0)
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [hero, setHero] = useState<any>(null)


useEffect(() => {
  heroAPI
    .get()
    .then((data) => {
      setHero(data);
    })
    .catch((err) => {
      console.log("Hero API Error", err);
    });

  productAPI.featured().then((data) => {
    setFeatured(data || []);
  });

  productAPI.newArrivals().then((data) => {
    setNewArrivals(data || []);
  });

  categoryAPI.list().then((r) => {
    setCategories(r.data || []);
  });

  offerAPI.list().then((r) => {
    setOffers(r.data || []);
  });
}, []);

  useEffect(() => {

    if (offers.length <= 1) return;


    const timer = setInterval(() => {

      setActiveOffer((prev) => {

        if (prev === offers.length - 1) {
          return 0;
        }

        return prev + 1;

      });

    }, 5000);


    return () => clearInterval(timer);


  }, [offers]);

  return (
    <div className="bg-[#fffdf9]">
      <section className="relative w-full overflow-hidden bg-[#fff8f1]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-full"
        >
          <img
            src={
              hero?.image
                ? getImageUrl(hero.image)
                : "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1800&q=90"
            }
            alt="Roop Rang Cosmetics"
            className="
              block
              h-[340px]
              w-full
              object-cover
              object-center
              sm:h-[430px]
              md:h-[560px]
              lg:h-[700px]
            "
          />
        </motion.div>
      </section>
      <section className="container-custom py-14 lg:py-20">

        <div className="mb-9 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.26em] text-roop-gold">
              SHOP BY
            </div>

            <h2 className="mt-2 font-playfair text-3xl text-roop-dark sm:text-4xl">
              Luxury Categories
            </h2>
          </div>


          {categories.length > 6 && (
            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="rounded-full border border-[#eadfcf] bg-white px-5 py-2 text-sm font-semibold text-roop-dark shadow-sm transition hover:border-roop-gold hover:text-roop-gold"
            >
              {showAllCategories ? "Show Less ↑" : "View All →"}
            </button>
          )}

        </div>


        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">

          {(showAllCategories ? categories : categories.slice(0, 6))
            .map((c: any) => (

              <Link
                to={`/products?category=${c.slug}`}
                key={c.id}
                className="group rounded-[22px] border border-[#f0e5d8] bg-white p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-roop-gold/50 hover:shadow-[0_18px_45px_rgba(45,27,30,0.08)]"
              >

                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0f5] font-playfair text-xl text-roop-rose ring-1 ring-[#f5d8df] transition group-hover:bg-roop-rose group-hover:text-white">
                  {c.name.charAt(0)}
                </div>


                <div className="text-sm font-semibold text-roop-dark">
                  {c.name}
                </div>


                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#9a7a66]">
                  {c._count?.products || 0} items
                </div>


              </Link>

            ))}

        </div>

      </section>


      <section className="border-y border-[#f5e8d2] bg-[#fff8f1] py-14 lg:py-20">
        <div className="container-custom">
          <div className="mb-8 flex items-end justify-between gap-4"><div><div className="text-xs font-semibold uppercase tracking-[0.26em] text-roop-gold">EDITOR'S PICK</div><h2 className="mt-1 font-playfair text-3xl text-roop-dark sm:text-4xl">Featured Products</h2></div><Link to="/products" className="rounded-full border border-[#eadfcf] bg-white px-5 py-2 text-sm font-semibold text-roop-dark shadow-sm transition hover:border-roop-gold hover:text-roop-gold">View All →</Link></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{featured.map(p => <ProductCard key={p.id} product={p} onView={setSelected} />)}{featured.length === 0 && [...Array(4)].map((_, i) => <div key={i} className="h-[440px] shimmer rounded-[22px]" />)}</div>
        </div>
      </section>


      {offers.length > 0 && (
        <section className="container-custom py-14 lg:py-20">

          <div className="relative rounded-[32px] overflow-hidden 
    border border-[#f2e1d2] bg-white
    text-roop-dark shadow-[0_24px_70px_rgba(45,27,30,0.10)]">

            <AnimatePresence mode="wait">

              <motion.div
                key={offers[activeOffer].id}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-[0.85fr_1.15fr]"
              >

                {/* Content */}

                <div className="p-8 sm:p-10 lg:p-14">

                  <div className="text-xs font-semibold uppercase tracking-[0.26em] text-roop-gold">
                    LIMITED OFFER
                  </div>


                  <h3 className="mt-2 font-playfair text-3xl text-roop-dark sm:text-4xl">
                    {offers[activeOffer].name}
                  </h3>


                  <p className="mt-3 text-sm leading-7 text-[#6f5658] sm:text-base">
                    {offers[activeOffer].description}
                  </p>


                  <div className="mt-6 flex gap-3">

                    <Link
                      to="/products"
                      className="rounded-full bg-roop-dark px-6 py-3 text-sm font-semibold text-white transition hover:bg-roop-gold"
                    >
                      Shop Now
                    </Link>


                    <a
                      href="https://wa.me/917096241594"
                      className="rounded-full border border-[#e8d7c8] px-6 py-3 text-sm font-semibold text-roop-dark transition hover:border-roop-gold hover:text-roop-gold"
                    >
                      WhatsApp Order
                    </a>

                  </div>


                  <div className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-[#9a7a66]">
                    Valid till{" "}
                    {new Date(
                      offers[activeOffer].endDate
                    ).toLocaleDateString('en-IN')}
                  </div>

                </div>



                {/* Image */}

                <div
                  className="
                  relative
                  h-[300px]
                  md:h-[420px]
                  overflow-hidden
                  "
                >
                  <img
                    src={getImageUrl(offers[activeOffer].bannerImage)}
                    alt="offer"
                    className="
                    w-full
                    h-full
                    object-cover
                    object-center
                    transition
                    duration-700
                    hover:scale-105
                    "
                  />
                </div>


              </motion.div>

            </AnimatePresence>



            {/* Left Arrow */}

            <button
              onClick={() =>
                setActiveOffer(
                  activeOffer === 0
                    ? offers.length - 1
                    : activeOffer - 1
                )
              }
              className="
      absolute left-5 top-1/2 -translate-y-1/2
      rounded-full bg-white/85 p-3 text-roop-dark shadow-lg
      transition
      hover:bg-roop-gold hover:text-white
      "
            >
              <ChevronLeft size={24} />
            </button>



            {/* Right Arrow */}

            <button
              onClick={() =>
                setActiveOffer(
                  activeOffer === offers.length - 1
                    ? 0
                    : activeOffer + 1
                )
              }
              className="
      absolute right-5 top-1/2 -translate-y-1/2
      rounded-full bg-white/85 p-3 text-roop-dark shadow-lg
      transition
      hover:bg-roop-gold hover:text-white
      "
            >
              <ChevronRight size={24} />
            </button>


          </div>



          {/* Dots */}

          <div className="mt-6 flex justify-center gap-2">

            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveOffer(index)}
                className={`
          h-3 rounded-full transition-all
          ${activeOffer === index
                    ? "w-8 bg-roop-gold"
                    : "w-3 bg-gray-300"
                  }
        `}
              />

            ))}

          </div>


        </section>
      )}



      <section className="container-custom py-14 lg:py-20"><h2 className="mb-9 text-center font-playfair text-3xl text-roop-dark sm:text-4xl">New Arrivals</h2><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{newArrivals.map(p => <ProductCard key={p.id} product={p} onView={setSelected} />)}</div></section>

      <section className="border-t border-[#f5e8d2] bg-white py-14 lg:py-20"><div className="container-custom"><h2 className="text-center font-playfair text-3xl text-roop-dark sm:text-4xl">Why Choose Roop Rang?</h2><div className="mt-10 grid gap-5 md:grid-cols-4">{[{ icon: <ShieldCheck className="text-roop-gold" />, t: '100% Authentic', d: 'Genuine premium cosmetics only' }, { icon: <Sparkles className="text-roop-gold" />, t: 'Luxury Curation', d: 'Handpicked shades for Indian skin' }, { icon: <Truck className="text-roop-gold" />, t: 'Surat Fast Delivery', d: 'Same-day local dispatch' }, { icon: <HeartHandshake className="text-roop-gold" />, t: 'WhatsApp Support', d: 'Personal beauty consultant' },].map((f, i) => (<div key={i} className="rounded-[22px] border border-[#f0e5d8] bg-[#fffdf9] p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(45,27,30,0.08)]"><div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-roop-pink ring-1 ring-[#f5d8df]">{f.icon}</div><div className="font-playfair text-lg text-roop-dark">{f.t}</div><div className="mt-2 text-sm leading-6 text-gray-600">{f.d}</div></div>))}</div></div></section>

      <section className="container-custom py-14 lg:py-20"><h2 className="mb-10 text-center font-playfair text-3xl text-roop-dark sm:text-4xl">Loved by 2000+ Beauties</h2><div className="grid gap-6 md:grid-cols-3">{[{ n: 'Priya S.', c: 'Surat', t: 'Lipstick pigment is insane! Roop Rang is my go-to now.' }, { n: 'Anjali M.', c: 'Dindoli', t: 'Foundation shade matched perfectly. Love the luxury packaging.' }, { n: 'Kavya R.', c: 'Ahmedabad', t: 'Super fast WhatsApp order. Authentic products, great price.' },].map((t, i) => (<div key={i} className="rounded-[22px] border border-[#f0e5d8] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(45,27,30,0.08)]"><div className="mb-3 flex text-roop-gold">{[...Array(5)].map((_, s) => <Star key={s} size={16} fill="currentColor" />)}</div><p className="leading-7 text-[#453035]">“{t.t}”</p><div className="mt-4 text-sm font-semibold text-roop-dark">{t.n} <span className="font-medium text-gray-500">• {t.c}</span></div></div>))}</div></section>

      <section className="bg-[#fff0f5] py-14"><div className="container-custom text-center"><h3 className="font-playfair text-3xl text-roop-dark">Visit Our Boutique in Surat</h3><p className="mx-auto mt-2 max-w-2xl leading-7 text-[#5b3e42]">Shop No 521, Apex Building, Madhuram Circle, Dindoli, Surat – 394210</p><div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"><a href="tel:+917096241594" className="btn-primary">Call +91 7096241594</a><Link to="/inquiry" className="btn-outline">Send Inquiry</Link></div></div></section>

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
