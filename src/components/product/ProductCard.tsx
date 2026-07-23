import { MessageCircle } from 'lucide-react'
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
    <div
      className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-[#EFE7DA] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45B]/40 hover:shadow-[0_12px_30px_rgba(28,28,28,0.12)]"
    >
      {/* Image — Portrait ratio, compact display */}
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="relative aspect-[3/4] w-full cursor-pointer overflow-hidden bg-[#F3EDE6]"
      >
        {product.discount > 0 && (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-[#C9A45B] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-sm">
            {product.discount}% OFF
          </span>
        )}

        <img
          src={getImageUrl(img)}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
      </div>

      {/* Content — Compact layout */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-3">

        {/* Brand / Category */}
        <p className="truncate text-[11px] font-bold uppercase tracking-wide text-[#C9A45B]">
          {product.category?.name || product.brand || 'Roop Rang'}
        </p>

        {/* Name — single line with ellipsis */}
        <h3
          onClick={() => navigate(`/product/${product.id}`)}
          className="mt-0.5 cursor-pointer truncate text-xs sm:text-sm font-normal text-[#666666] transition-colors duration-300 hover:text-[#C9A45B] leading-tight"
        >
          {product.name}
        </h3>

        {/* Price — bold selling price + struck MRP */}
        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5">
          <span className="text-sm sm:text-base font-bold text-[#1C1C1C]">
            ₹{Number(product.sellingPrice).toLocaleString()}
          </span>

          {Number(product.mrp) > Number(product.sellingPrice) && (
            <span className="text-[11px] sm:text-xs text-[#666666]/60 line-through">
              ₹{Number(product.mrp).toLocaleString()}
            </span>
          )}
        </div>

        {/* Buy on WhatsApp — compact button */}
        <div className="mt-auto pt-2 sm:pt-2.5">
          <button
            onClick={() =>
              whatsappBuy(product.name, product.sellingPrice)
            }
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#25D366] py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-[#1eb858] hover:shadow-[0_8px_20px_rgba(37,211,102,0.3)]"
          >
            <MessageCircle size={12} />
            <span className="hidden sm:inline">Buy on WhatsApp</span>
            <span className="sm:hidden">Buy</span>
          </button>
        </div>

      </div>
    </div>
  )
}
