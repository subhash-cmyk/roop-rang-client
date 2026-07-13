import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import roopRangLogo from '../../assets/images/roop-rang-banner.png'

const nav = [
  { to: '/', label: 'HOME' },
  { to: '/products', label: 'SHOP' },
  { to: '/about', label: 'ABOUT US' },
  { to: '/inquiry', label: 'INQUIRY' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'px-0 pt-0' : 'px-4 pt-3'
        }`}
    >
      <div
        className={`
          mx-auto
          bg-[#0B0B0B]
          shadow-luxury
          transition-all duration-300
          ${scrolled
            ? 'max-w-full rounded-none'
            : 'max-w-7xl rounded-3xl border border-[#2a2118]'
          }
        `}
      >
        <div className="h-[82px] px-8 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={roopRangLogo}
              alt="Roop Rang"
              className="w-16 h-16 object-contain"
            />

            <div>
              <h1 className="text-[#D8B08C] text-2xl font-playfair leading-none">
                Roop Rang
              </h1>

              <p className="text-[9px] tracking-[4px] text-[#B8865B] mt-1">
                Luxury in Every Shade
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-9">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-[13px] tracking-wide transition ${isActive
                    ? 'text-[#D8B08C]'
                    : 'text-white hover:text-[#D8B08C]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            <a
              href="https://wa.me/917096241594"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-full text-sm font-medium shadow hover:scale-105 transition"
            >
              <Phone size={16} />
              WhatsApp
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-white p-2"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="lg:hidden overflow-hidden border-t border-[#2a2118]"
            >
              <div className="px-8 py-5 flex flex-col gap-4">
                {nav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="text-white hover:text-[#D8B08C]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  )
}