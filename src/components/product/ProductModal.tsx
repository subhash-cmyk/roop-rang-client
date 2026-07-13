import { X, Phone, MessageCircle, ShieldCheck, Store } from 'lucide-react'
import { motion } from 'framer-motion'
import { getImageUrl, whatsappBuy } from '../../services/api'

interface ProductModalProps {
  product: any
  onClose: () => void
}

export default function ProductModal({
  product,
  onClose,
}: ProductModalProps) {
  if (!product) return null

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-6xl rounded-3xl overflow-hidden grid lg:grid-cols-2 shadow-2xl max-h-[92vh]"
      >
        {/* Left Image */}
        <div className="relative bg-[#F8F5F2] flex items-center justify-center">

          {product.discount > 0 && (
            <span className="absolute top-6 left-6 bg-[#D8B08C] text-black text-xs font-semibold px-4 py-2 rounded-full shadow z-10">
              {product.discount}% OFF
            </span>
          )}

          <img
            src={getImageUrl(product.images?.[0]?.url)}
            alt={product.name}
            className="w-full h-full object-cover aspect-[4/5]"
          />

          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#D8B08C] hover:text-black transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Right Content */}
        <div className="p-8 lg:p-10 overflow-y-auto">

          {/* Category */}
          <p className="uppercase tracking-[3px] text-[#B8865B] text-xs font-semibold">
            {product.category?.name || 'Roop Rang'}
          </p>

          {/* Product Name */}
          <h2 className="font-playfair text-4xl text-[#111] mt-3 leading-tight">
            {product.name}
          </h2>

          {/* Price */}
          <div className="flex flex-wrap items-center gap-4 mt-6">

            <span className="text-4xl font-bold text-[#111]">
              ₹{product.sellingPrice}
            </span>

            {product.mrp > product.sellingPrice && (
              <span className="text-xl text-gray-400 line-through">
                ₹{product.mrp}
              </span>
            )}

            {product.discount > 0 && (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                Save {product.discount}%
              </span>
            )}

          </div>

          {/* Description */}
          <p className="mt-6 text-gray-600 leading-8">
            {product.description}
          </p>

          {/* Product Info */}
          <div className="grid grid-cols-2 gap-4 mt-8">

            <div className="rounded-2xl border border-[#EFE5D8] p-4">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                SKU
              </p>

              <p className="mt-2 font-semibold text-[#222]">
                {product.sku || '-'}
              </p>
            </div>

            <div className="rounded-2xl border border-[#EFE5D8] p-4">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Stock
              </p>

              <p
                className={`mt-2 font-semibold ${
                  product.stock > 10
                    ? 'text-green-600'
                    : product.stock > 0
                    ? 'text-orange-500'
                    : 'text-red-500'
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} Available`
                  : 'Out of Stock'}
              </p>
            </div>

          </div>

          {/* Buttons */}
          <div className="grid sm:grid-cols-2 gap-4 mt-8">

            <button
              onClick={() =>
                whatsappBuy(product.name, product.sellingPrice)
              }
              className="flex items-center justify-center gap-2 bg-[#0B0B0B] hover:bg-[#D8B08C] hover:text-black text-white rounded-xl py-4 font-semibold transition"
            >
              <MessageCircle size={18} />
              Buy on WhatsApp
            </button>

            <a
              href="tel:+917096241594"
              className="flex items-center justify-center gap-2 border-2 border-[#D8B08C] text-[#B8865B] hover:bg-[#D8B08C] hover:text-black rounded-xl py-4 font-semibold transition"
            >
              <Phone size={18} />
              Call Store
            </a>

          </div>

          {/* Features */}
          <div className="mt-10 border-t border-[#EFE5D8] pt-6 space-y-4">

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <ShieldCheck
                size={18}
                className="text-[#B8865B]"
              />
              100% Authentic Products
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Store
                size={18}
                className="text-[#B8865B]"
              />
              Surat Store Pickup Available
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <ShieldCheck
                size={18}
                className="text-[#B8865B]"
              />
              Easy Returns & Premium Support
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  )
}