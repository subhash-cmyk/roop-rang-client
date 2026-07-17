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
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[#EFE7DA] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C9A45B]/40 hover:shadow-[0_20px_45px_rgba(28,28,28,0.10)]"
    >
      {/* Image — Myntra-style portrait ratio, larger display area, no inner padding */}
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="relative aspect-[3/4] w-full cursor-pointer overflow-hidden bg-[#F3EDE6]"
      >
        {product.discount > 0 && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-[#C9A45B] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-md">
            {product.discount}% OFF
          </span>
        )}

        <img
          src={getImageUrl(img)}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
      </div>

      {/* Content — Myntra-style: bold brand + 1-line title + price row */}
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">

        {/* Brand / Category — bold, dark (Myntra style) */}
        <p className="truncate text-[13px] font-bold uppercase tracking-wide text-[#C9A45B]">
          {product.category?.name || product.brand || 'Roop Rang'}
        </p>

        {/* Name — single line with ellipsis */}
        <h3
          onClick={() => navigate(`/product/${product.id}`)}
          className="mt-0.5 cursor-pointer truncate text-sm font-normal text-[#666666] transition-colors duration-300 hover:text-[#C9A45B]"
        >
          {product.name}
        </h3>

        {/* Price — bold selling price + struck MRP + (% OFF) in gold */}
        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5">
          <span className="text-base font-bold text-[#1C1C1C]">
            ₹{Number(product.sellingPrice).toLocaleString()}
          </span>

          {Number(product.mrp) > Number(product.sellingPrice) && (
            <span className="text-xs text-[#666666]/60 line-through">
              ₹{Number(product.mrp).toLocaleString()}
            </span>
          )}

          {Number(product.discount) > 0 && (
            <span className="text-xs font-bold text-[#C9A45B]">
            </span>
          )}
        </div>

        {/* Buy on WhatsApp — the ONLY button (existing handler unchanged) */}
        <div className="mt-auto pt-3.5">
          <button
            onClick={() =>
              whatsappBuy(product.name, product.sellingPrice)
            }
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-[#1eb858] hover:shadow-[0_10px_24px_rgba(37,211,102,0.35)]"
          >
            <MessageCircle size={14} />
            Buy on WhatsApp
          </button>
        </div>

      </div>
    </div>
  )
}
