import { useEffect, useState } from 'react'
import { productAPI, categoryAPI } from '../services/api'
import ProductCard from '../components/product/ProductCard'
import { useSearchParams } from 'react-router-dom'
import { Search, Filter, ChevronDown, Sparkles, ShoppingBag } from 'lucide-react'

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

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
    setLoading(true)
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
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [search, category, sort, page])

  useEffect(() => {
    categoryAPI.list().then((r) => {
      setCategories(r.data || [])
    })
  }, [])

  const activeFiltersCount = (search ? 1 : 0) + (category ? 1 : 0)

  const clearFilters = () => {
    setSearch('')
    setCategory('')
    setSort('newest')
    setPage(1)
    setSearchParams({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBF7] via-white to-[#FDFBF7]">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#24211E] py-16 md:py-24">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D8B08C]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C9A45B]/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8B08C]/20 border border-[#D8B08C]/30 mb-6 animate-fade-up">
              <Sparkles className="w-4 h-4 text-[#D8B08C]" />
              <span className="text-sm font-medium text-[#D8B08C] tracking-wider uppercase">
                Premium Collection
              </span>
            </div>

            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl text-white mb-6 animate-fade-up delay-100">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D8B08C] via-[#E8C866] to-[#D8B08C]">Luxury</span> Collection
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed animate-fade-up delay-200">
              Discover premium cosmetics curated by Roop Rang. Crafted to bring elegance, confidence, and beauty into every shade.
            </p>

            <div className="flex items-center gap-6 mt-8 animate-fade-up delay-300">
              <div className="flex items-center gap-2 text-gray-400">
                <ShoppingBag className="w-5 h-5 text-[#D8B08C]" />
                <span className="text-sm">{products.length} Products</span>
              </div>
              {categories.length > 0 && (
                <div className="flex items-center gap-2 text-gray-400">
                  <Filter className="w-5 h-5 text-[#D8B08C]" />
                  <span className="text-sm">{categories.length} Categories</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8 md:py-12">
        
        {/* Filter Bar */}
        <div className="sticky top-20 z-40 mb-8">
          <div className="bg-white/80 backdrop-blur-xl border border-[#E8DCC8] rounded-2xl shadow-lg p-4 md:p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              
              {/* Search */}
              <div className="relative flex-1 w-full lg:w-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#E5D8C4] bg-[#FDFBF7] focus:border-[#D8B08C] focus:ring-2 focus:ring-[#D8B08C]/20 outline-none transition-all duration-300 text-sm"
                />
              </div>

              {/* Category */}
              <div className="relative w-full lg:w-48">
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
                  className="w-full appearance-none px-4 py-3 pr-10 rounded-xl border border-[#E5D8C4] bg-[#FDFBF7] focus:border-[#D8B08C] focus:ring-2 focus:ring-[#D8B08C]/20 outline-none transition-all duration-300 text-sm cursor-pointer"
                >
                  <option value="">All Categories</option>
                  {categories.map((c: any) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort */}
              <div className="relative w-full lg:w-48">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full appearance-none px-4 py-3 pr-10 rounded-xl border border-[#E5D8C4] bg-[#FDFBF7] focus:border-[#D8B08C] focus:ring-2 focus:ring-[#D8B08C]/20 outline-none transition-all duration-300 text-sm cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                  <option value="name">Name: A-Z</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-3 rounded-xl border border-[#E5D8C4] text-gray-600 hover:border-[#D8B08C] hover:text-[#D8B08C] transition-all duration-300 text-sm font-medium whitespace-nowrap"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#E8DCC8]">
                {search && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#D8B08C]/10 text-[#D8B08C] text-xs font-medium">
                    Search: "{search}"
                  </span>
                )}
                {category && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#D8B08C]/10 text-[#D8B08C] text-xs font-medium">
                    {categories.find((c: any) => c.slug === category)?.name || category}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#EFE7DA] overflow-hidden">
                <div className="aspect-[3/4] bg-[#F3EDE6] shimmer" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-[#F3EDE6] rounded shimmer" />
                  <div className="h-3 bg-[#F3EDE6] rounded shimmer w-3/4" />
                  <div className="h-5 bg-[#F3EDE6] rounded shimmer w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {products.map((product, index) => (
                <div 
                  key={product.id} 
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Empty State */}
            {products.length === 0 && (
              <div className="py-20 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FDFBF7] border border-[#E8DCC8] mb-6">
                  <ShoppingBag className="w-10 h-10 text-[#D8B08C]" />
                </div>
                <h3 className="font-playfair text-2xl text-[#1A1A1A] mb-3">
                  No Products Found
                </h3>
                <p className="text-gray-500 max-w-2xl mx-auto mb-6">
                  We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8B08C] text-white font-medium hover:bg-[#C9A45B] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Filter className="w-4 h-4" />
                  Clear All Filters
                </button>
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && !loading && products.length > 0 && (
          <div className="flex flex-col items-center gap-4 mt-12 md:mt-16">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-10 h-10 rounded-full border border-[#E5D8C4] flex items-center justify-center text-gray-600 hover:border-[#D8B08C] hover:text-[#D8B08C] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
              >
                ←
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1
                const isCurrentPage = pageNum === page
                const isNearCurrent = Math.abs(pageNum - page) <= 2 || pageNum === 1 || pageNum === totalPages

                if (!isNearCurrent && totalPages > 7) {
                  if (index === 2 || index === totalPages - 3) {
                    return (
                      <span key={index} className="text-gray-400">
                        ...
                      </span>
                    )
                  }
                  return null
                }

                return (
                  <button
                    key={index}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 rounded-full font-medium transition-all duration-300 ${
                      isCurrentPage
                        ? 'bg-gradient-to-r from-[#D8B08C] to-[#C9A45B] text-white shadow-lg shadow-[#D8B08C]/30'
                        : 'border border-[#E5D8C4] text-gray-600 hover:border-[#D8B08C] hover:text-[#D8B08C]'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-10 h-10 rounded-full border border-[#E5D8C4] flex items-center justify-center text-gray-600 hover:border-[#D8B08C] hover:text-[#D8B08C] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
              >
                →
              </button>
            </div>

            <p className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}