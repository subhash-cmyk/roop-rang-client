import { useEffect, useState } from 'react'
import { productAPI, categoryAPI, offerAPI, getImageUrl } from '../services/api'
import ProductCard from '../components/product/ProductCard'
import { motion } from 'framer-motion'
import { Sparkles, ShieldCheck, Truck, HeartHandshake, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductModal from '../components/product/ProductModal'
export default function HomePage(){
  const [featured, setFeatured] = useState<any[]>([])
  const [newArrivals, setNewArrivals] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [offers, setOffers] = useState<any[]>([])
  const [selected, setSelected] = useState<any|null>(null)
  useEffect(()=>{ productAPI.featured().then(r=>setFeatured(r.data||[])); productAPI.newArrivals().then(r=>setNewArrivals(r.data||[])); categoryAPI.list().then(r=>setCategories(r.data||[])); offerAPI.list().then(r=>setOffers(r.data||[])); },[])
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff8f1] via-[#fff0f5] to-[#fdf6e7]">
        <div className="container-custom py-20 lg:py-28 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-roop-gold text-xs font-semibold tracking-widest bg-white/70 px-3 py-1 rounded-full border border-[#f0d9a7] mb-4"><Sparkles size={14}/> LUXURY COSMETICS • SURAT</div>
            <h1 className="font-playfair text-5xl lg:text-[64px] leading-[1.05] text-roop-dark">Timeless Beauty,<br/><span className="text-roop-gold italic">Roop Rang</span><br/>Radiance.</h1>
            <p className="mt-5 text-[#5a4044] max-w-lg text-[17px] leading-relaxed">Discover premium lipsticks, foundations, skincare & more. Handpicked luxury beauty – now delivered via WhatsApp ordering direct from Surat.</p>
            <div className="flex gap-3 mt-7"><Link to="/products" className="btn-primary">Shop Collection</Link><Link to="/inquiry" className="btn-outline">Ask Expert</Link></div>
            <div className="flex gap-8 mt-10 text-sm text-[#7a5a5f]"><div><div className="font-playfair text-2xl text-roop-dark">2k+</div>Happy Clients</div><div><div className="font-playfair text-2xl text-roop-dark">120+</div>Premium SKUs</div><div><div className="font-playfair text-2xl text-roop-dark">4.9★</div>Trusted Rating</div></div>
          </div>
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="relative">
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-roop-pink-deep/30 rounded-full blur-2xl"/>
            <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80" alt="Roop Rang Cosmetics" className="rounded-[32px] shadow-luxury relative z-10 w-full object-cover aspect-[4/5]"/>
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-lg rounded-2xl shadow-card px-5 py-4 z-20"><div className="text-xs text-roop-rose font-semibold">DIWALI GLOW SALE</div><div className="font-playfair text-xl">Up to 50% OFF</div></div>
          </motion.div>
        </div>
      </section>
      <section className="container-custom py-16">
        <div className="text-center mb-10"><div className="text-roop-gold text-xs tracking-widest font-semibold">SHOP BY</div><h2 className="font-playfair text-4xl mt-2">Luxury Categories</h2></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.slice(0,6).map((c:any)=>(<Link to={`/products?category=${c.slug}`} key={c.id} className="card-luxury p-5 text-center hover:-translate-y-1 transition"><div className="w-16 h-16 mx-auto rounded-2xl bg-roop-pink flex items-center justify-center font-playfair text-roop-rose text-xl mb-3">{c.name.charAt(0)}</div><div className="font-medium text-sm">{c.name}</div><div className="text-[11px] text-gray-500">{c._count?.products || 0} items</div></Link>))}
        </div>
      </section>
      <section className="bg-[#fffaf5] py-16 border-y border-[#f5e8d2]">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-8"><div><div className="text-roop-gold text-xs tracking-widest font-semibold">EDITOR'S PICK</div><h2 className="font-playfair text-4xl mt-1">Featured Products</h2></div><Link to="/products" className="text-roop-gold font-medium hover:underline">View All →</Link></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{featured.map(p=> <ProductCard key={p.id} product={p} onView={setSelected} />)}{featured.length===0 && [...Array(4)].map((_,i)=><div key={i} className="h-[440px] shimmer rounded-[24px]"/>)}</div>
        </div>
      </section>
      {offers[0] && (<section className="container-custom py-14"><div className="rounded-[32px] overflow-hidden bg-gradient-to-r from-[#2d1b1e] to-[#4b2e33] text-white grid md:grid-cols-2"><div className="p-10 lg:p-14"><div className="text-roop-gold-light text-xs tracking-widest">LIMITED OFFER</div><h3 className="font-playfair text-4xl mt-2">{offers[0].name}</h3><p className="mt-3 text-[#f0dccc]">{offers[0].description}</p><div className="mt-6 flex gap-3"><Link to="/products" className="bg-roop-gold text-white px-6 py-3 rounded-full font-medium">Shop Now</Link><a href="https://wa.me/917096241594" className="border border-white/30 px-6 py-3 rounded-full">WhatsApp Order</a></div><div className="text-xs mt-4 opacity-80">Valid till {new Date(offers[0].endDate).toLocaleDateString('en-IN')}</div></div><div className="relative min-h-[260px]"><img src={getImageUrl(offers[0].bannerImage)} alt="offer" className="w-full h-full object-cover opacity-90"/></div></div></section>)}
      <section className="container-custom py-16"><h2 className="font-playfair text-4xl text-center mb-9">New Arrivals</h2><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{newArrivals.map(p=> <ProductCard key={p.id} product={p} onView={setSelected} />)}</div></section>
      <section className="bg-white py-16 border-t border-[#f5e8d2]"><div className="container-custom"><h2 className="font-playfair text-4xl text-center">Why Choose Roop Rang?</h2><div className="grid md:grid-cols-4 gap-6 mt-10">{[{icon:<ShieldCheck className="text-roop-gold"/>,t:'100% Authentic',d:'Genuine premium cosmetics only'},{icon:<Sparkles className="text-roop-gold"/>,t:'Luxury Curation',d:'Handpicked shades for Indian skin'},{icon:<Truck className="text-roop-gold"/>,t:'Surat Fast Delivery',d:'Same-day local dispatch'},{icon:<HeartHandshake className="text-roop-gold"/>,t:'WhatsApp Support',d:'Personal beauty consultant'},].map((f,i)=>(<div key={i} className="card-luxury p-6 text-center"><div className="w-12 h-12 rounded-2xl bg-roop-pink mx-auto flex items-center justify-center mb-3">{f.icon}</div><div className="font-playfair text-lg">{f.t}</div><div className="text-sm text-gray-600 mt-1">{f.d}</div></div>))}</div></div></section>
      <section className="container-custom py-16"><h2 className="font-playfair text-4xl text-center mb-10">Loved by 2000+ Beauties</h2><div className="grid md:grid-cols-3 gap-6">{[{n:'Priya S.',c:'Surat',t:'Lipstick pigment is insane! Roop Rang is my go-to now.'},{n:'Anjali M.',c:'Dindoli',t:'Foundation shade matched perfectly. Love the luxury packaging.'},{n:'Kavya R.',c:'Ahmedabad',t:'Super fast WhatsApp order. Authentic products, great price.'},].map((t,i)=>(<div key={i} className="card-luxury p-6"><div className="flex text-roop-gold mb-2">{[...Array(5)].map((_,s)=><Star key={s} size={16} fill="currentColor"/>)}</div><p className="text-[#453035]">“{t.t}”</p><div className="mt-3 text-sm font-medium">{t.n} <span className="text-gray-500">• {t.c}</span></div></div>))}</div></section>
      <section className="bg-roop-pink/60 py-14"><div className="container-custom text-center"><h3 className="font-playfair text-3xl">Visit Our Boutique in Surat</h3><p className="mt-2 text-[#5b3e42]">Shop No 521, Apex Building, Madhuram Circle, Dindoli, Surat – 394210</p><div className="mt-5 flex justify-center gap-3"><a href="tel:+917096241594" className="btn-primary">Call +91 7096241594</a><Link to="/inquiry" className="btn-outline">Send Inquiry</Link></div></div></section>
      {selected && <ProductModal product={selected} onClose={()=>setSelected(null)} />}
    </div>
  )
}
