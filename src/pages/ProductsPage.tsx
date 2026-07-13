import { useEffect, useState } from 'react'
import { productAPI, categoryAPI } from '../services/api'
import ProductCard from '../components/product/ProductCard'
import ProductModal from '../components/product/ProductModal'
import { useSearchParams } from 'react-router-dom'

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [selected, setSelected] = useState<any | null>(null)

  const [searchParams, setSearchParams] = useSearchParams()

  const [search, setSearch] = useState(
    searchParams.get('search') || ''
  )
  const [category, setCategory] = useState(
    searchParams.get('category') || ''
  )
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const load = () => {
    productAPI
      .list({
        search,
        category,
        sort,
        page,
        limit: 12,
      })
      .then((r) => {
        setProducts(r.data || [])
        setTotalPages(r.pagination?.pages || 1)
      })
  }

  useEffect(() => {
    load()
  }, [search, category, sort, page])

  useEffect(() => {
    categoryAPI.list().then((r) => {
      setCategories(r.data || [])
    })
  }, [])

  return (
    <div className="container-custom py-12">

      {/* Heading */}
      <div className="text-center mb-12">
        <span className="uppercase tracking-[5px] text-[#B8865B] text-sm font-medium">
          Premium Collection
        </span>

        <h1 className="mt-3 font-playfair text-5xl text-[#1A1A1A]">
          Our Luxury Collection
        </h1>

        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
          Discover premium cosmetics curated by Roop Rang.
          Crafted to bring elegance, confidence, and beauty
          into every shade.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#E8DCC8] rounded-2xl shadow-sm p-6 mb-10">
        <div className="flex flex-wrap gap-4">

          {/* Search */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="flex-1 min-w-[220px] rounded-xl border border-[#E5D8C4] px-4 py-3 outline-none focus:border-[#D8B08C] transition"
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)

              setSearchParams(
                e.target.value
                  ? { category: e.target.value }
                  : {}
              )
            }}
            className="rounded-xl border border-[#E5D8C4] px-4 py-3 outline-none focus:border-[#D8B08C]"
          >
            <option value="">All Categories</option>

            {categories.map((c: any) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-[#E5D8C4] px-4 py-3 outline-none focus:border-[#D8B08C]"
          >
            <option value="newest">Newest</option>
            <option value="price_asc">
              Price Low → High
            </option>
            <option value="price_desc">
              Price High → Low
            </option>
            <option value="popular">
              Popular
            </option>
            <option value="name">
              Name A-Z
            </option>
          </select>

        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onView={setSelected}
          />
        ))}

      </div>

      {/* Empty */}
      {products.length === 0 && (
        <div className="py-24 text-center text-gray-500">
          No products found.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-14">

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`w-11 h-11 rounded-full transition ${
                page === index + 1
                  ? 'bg-[#D8B08C] text-black'
                  : 'border border-[#D8B08C] text-[#B8865B] hover:bg-[#D8B08C] hover:text-black'
              }`}
            >
              {index + 1}
            </button>
          ))}

        </div>
      )}

      {/* Modal */}
      {selected && (
        <ProductModal
          product={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}