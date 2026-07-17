import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import { getImageUrl, whatsappBuy } from '../../services/api'
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: any
  onView?: (product: any) => void
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const img = product.images?.[0]?.url
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group mx-auto w-full max-w-[310px] overflow-hidden rounded-[22px] border border-[#f0e5d8] bg-white shadow-sm transition-all duration-300 hover:border-roop-gold/40 hover:shadow-[0_22px_55px_rgba(45,27,30,0.10)]"
    >
      {/* Image */}
      <div onClick={() => navigate(`/product/${product.id}`)} className="relative h-[280px] cursor-pointer overflow-hidden bg-[#fff8f1]">
        {product.discount > 0 && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-roop-gold px-3 py-1 text-xs font-semibold text-white shadow">
            {product.discount}% OFF
          </span>
        )}

        <img
          src={getImageUrl(img)}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <button
          onClick={() => navigate(`/product/${product.id}`)}
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[#0B0B0B] opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100"
        >
          <Eye size={16} />
          <span className="text-xs font-medium">View</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Category */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-roop-gold">
          {product.category?.name || product.brand || 'Roop Rang'}
        </p>

        {/* Name */}
        <h3 onClick={() => navigate(`/product/${product.id}`)} className="mt-2 line-clamp-2 min-h-[54px] cursor-pointer font-playfair text-[20px] leading-snug text-roop-dark transition hover:text-roop-gold">
          {product.name}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 min-h-[42px] text-sm leading-6 text-gray-500">
          {product.shortDesc ||
            product.description?.slice(0, 80)}
        </p>

        {/* Price */}
        <div className="mt-5 flex items-end gap-2">
          <span className="text-2xl font-bold text-roop-dark">
            ₹{product.sellingPrice}
          </span>

          {product.mrp > product.sellingPrice && (
            <span className="text-base text-gray-400 line-through">
              ₹{product.mrp}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-5 flex gap-3">

          <button
            onClick={() =>
              whatsappBuy(product.name, product.sellingPrice)
            }
            className="flex-1 rounded-full bg-roop-dark py-3 text-sm font-semibold text-white transition hover:bg-roop-gold"
          >
            Buy on WhatsApp
          </button>

          <button
            onClick={() => navigate(`/product/${product.id}`)}
            className="rounded-full border border-[#e4d2bf] px-5 py-3 text-sm font-semibold text-roop-dark transition hover:border-roop-gold hover:text-roop-gold"
          >
            Details
          </button>

        </div>

        {/* Stock */}
        <div className="mt-4 text-xs font-medium">
          {product.stock > 10 ? (
            <span className="text-emerald-600">● In Stock</span>
          ) : product.stock > 0 ? (
            <span className="text-orange-500">● Low Stock</span>
          ) : (
            <span className="text-red-500">● Out of Stock</span>
          )}
        </div>

      </div>
    </motion.div>
  )
}
