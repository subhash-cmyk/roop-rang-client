import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import { getImageUrl, whatsappBuy } from '../../services/api'

interface ProductCardProps {
  product: any
  onView?: (product: any) => void
}

export default function ProductCard({
  product,
  onView,
}: ProductCardProps) {
  const img = product.images?.[0]?.url

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group w-full max-w-[300px] mx-auto bg-white rounded-2xl overflow-hidden border border-[#E9DCCB] shadow-sm hover:shadow-2xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-[300px] overflow-hidden bg-[#F8F5F2]">
        {product.discount > 0 && (
          <span className="absolute top-4 left-4 z-10 bg-[#D8B08C] text-[#0B0B0B] text-xs font-semibold px-3 py-1 rounded-full shadow">
            {product.discount}% OFF
          </span>
        )}

        <img
          src={getImageUrl(img)}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <button
          onClick={() => onView?.(product)}
          className="absolute bottom-4 right-4 flex items-center gap-2 bg-white text-[#0B0B0B] px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <Eye size={16} />
          <span className="text-xs font-medium">View</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Category */}
        <p className="text-[11px] uppercase tracking-[2px] text-[#B8865B] font-semibold">
          {product.category?.name || product.brand || 'Roop Rang'}
        </p>

        {/* Name */}
        <h3 className="mt-2 font-playfair text-[20px] text-[#1A1A1A] leading-snug line-clamp-2 min-h-[56px]">
          {product.name}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-500 line-clamp-2 min-h-[42px]">
          {product.shortDesc ||
            product.description?.slice(0, 80)}
        </p>

        {/* Price */}
        <div className="flex items-end gap-2 mt-5">
          <span className="text-2xl font-bold text-[#0B0B0B]">
            ₹{product.sellingPrice}
          </span>

          {product.mrp > product.sellingPrice && (
            <span className="text-base text-gray-400 line-through">
              ₹{product.mrp}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-5">

          <button
            onClick={() =>
              whatsappBuy(product.name, product.sellingPrice)
            }
            className="flex-1 rounded-xl bg-[#0B0B0B] py-3 text-sm font-semibold text-white transition hover:bg-[#D8B08C] hover:text-black"
          >
            Buy on WhatsApp
          </button>

          <button
            onClick={() => onView?.(product)}
            className="rounded-xl border border-[#D8B08C] px-5 py-3 text-sm font-semibold text-[#D8B08C] transition hover:bg-[#D8B08C] hover:text-black"
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