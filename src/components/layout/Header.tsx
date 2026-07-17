import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { MoreVertical, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getUser, logout } from "../../utils/auth";

const nav = [
  { to: '/', label: 'HOME' },
  { to: '/products', label: 'SHOP' },
  { to: '/about', label: 'ABOUT US' },
  { to: '/inquiry', label: 'INQUIRY' },
]

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(getUser());
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const syncUser = () => setUser(getUser());
    window.addEventListener("authChanged", syncUser);
    return () => window.removeEventListener("authChanged", syncUser);
  }, []);

  // UI-ONLY: drives the transparent → solid header style on scroll.
  // No business logic, API, routing or auth behaviour is touched here.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHome = location.pathname === '/';
  // Header is solid white when scrolled — and always solid on non-home pages
  // (so dark text never sits on a light page background).
  const solid = scrolled || !isHome;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${solid
          ? 'bg-white/95 shadow-[0_12px_40px_rgba(28,28,28,0.08)] backdrop-blur-md'
          : 'bg-transparent'
          }`}
      >
        {/* Main bar — 90px → 70px on scroll */}
        <div
          className={`relative flex w-full items-center justify-between px-5 transition-all duration-300 sm:px-8 lg:px-12 ${scrolled ? 'h-[70px]' : 'h-[90px]'
            }`}
        >
          {/* ── Left navigation ── */}
          <nav className="hidden flex-1 items-center gap-9 lg:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `group relative py-2 text-[12px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${isActive
                    ? 'text-[#C9A45B]'
                    : solid
                      ? 'text-[#1C1C1C]/60 hover:text-[#1C1C1C]'
                      : 'text-white/70 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] origin-left bg-[#C9A45B] transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ── Center logo ── */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link to="/" className="group flex items-center gap-3">
            <div className="hidden flex-col sm:flex">
                <h1
                  className={`font-playfair font-semibold leading-none transition-all duration-300 ${scrolled ? 'text-[22px]' : 'text-[26px]'
                    } ${solid ? 'text-[#1C1C1C]' : 'text-white'}`}
                >
                  Roop Rang
                </h1>

                <span
                  className={`mt-1 text-[11px] font-semibold uppercase tracking-[0.32em] transition-colors duration-300 ${solid ? 'text-[#C9A45B]' : 'text-white'
                    }`}
                >
                  Luxury in Every Shade
                </span>
              </div>
            </Link>
          </div>

          {/* ── Right actions ── */}
          <div className="flex flex-1 items-center justify-end gap-3">
            {!user && (
              <>
                <Link
                  to="/login"
                  className="hidden h-10 items-center justify-center rounded-full border border-[#C9A45B]/60 bg-white/95 px-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1C1C1C] shadow-sm transition-all duration-300 hover:bg-[#C9A45B] hover:border-[#C9A45B] hover:text-white md:inline-flex"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hidden h-10 items-center justify-center rounded-full bg-[#C9A45B] px-6 text-[11px] uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#b18e4b] md:inline-flex"
                >
                  Register
                </Link>
              </>
            )}
            {user && (
              <>
                <Link
                  to="/profile"
                  className={`hidden h-10 items-center justify-center rounded-full border px-6 text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 md:inline-flex ${solid
                    ? 'border-[#1C1C1C]/15 text-[#1C1C1C]/70 hover:border-[#C9A45B] hover:text-[#C9A45B]'
                    : 'border-white/40 bg-white/10 text-white backdrop-blur-sm hover:border-[#C9A45B] hover:text-[#C9A45B]'
                    }`}
                >
                  My Profile
                </Link>
                <button
                  onClick={() => { logout(); navigate("/"); }}
                  className={`hidden h-10 items-center justify-center rounded-full px-4 text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 md:inline-flex ${solid ? 'text-[#1C1C1C]/40 hover:text-[#1C1C1C]' : 'text-white/75 hover:text-white'
                    }`}
                >
                  Logout
                </button>
              </>
            )}
            <a
              href="https://wa.me/917096241594"
              target="_blank"
              rel="noreferrer"
              className="hidden h-10 items-center gap-2 rounded-full bg-[#25D366] px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-[#1eb858] hover:shadow-[0_10px_25px_rgba(37,211,102,0.35)] sm:inline-flex"
            >
              <Phone size={14} /> WhatsApp
            </a>

            {/* Mobile 3-dot menu button */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden ${solid ? 'border-[#1C1C1C]/15 text-[#1C1C1C]' : 'border-white/40 bg-white/10 text-white backdrop-blur-sm'
                }`}
            >
              {open ? <X size={18} /> : <MoreVertical size={18} />}
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown menu ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mx-4 mb-4 overflow-hidden rounded-2xl border border-[#1C1C1C]/[0.06] bg-white shadow-[0_28px_60px_rgba(28,28,28,0.16)] lg:hidden"
            >
              <div className="flex flex-col px-6 py-3">
                {nav.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `border-b border-[#1C1C1C]/[0.05] py-4 text-[12px] uppercase tracking-[0.24em] transition-colors duration-300 ${isActive ? 'text-[#C9A45B]' : 'text-[#1C1C1C]/70 hover:text-[#1C1C1C]'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}

                <div className="flex flex-col gap-3 py-5">
                  {!user && (
                    <div className="flex gap-3">
                      <Link
                        to="/login"
                        onClick={() => setOpen(false)}
                        className="flex h-11 flex-1 items-center justify-center rounded-full border border-[#C9A45B]/50 text-[11px] uppercase tracking-[0.18em] text-[#C9A45B]"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setOpen(false)}
                        className="flex h-11 flex-1 items-center justify-center rounded-full bg-[#C9A45B] text-[11px] uppercase tracking-[0.18em] text-white"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                  {user && (
                    <div className="flex gap-3">
                      <Link
                        to="/profile"
                        onClick={() => setOpen(false)}
                        className="flex h-11 flex-1 items-center justify-center rounded-full border border-[#1C1C1C]/15 text-[11px] uppercase tracking-[0.18em] text-[#1C1C1C]/70"
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={() => { logout(); setOpen(false); navigate("/"); }}
                        className="flex h-11 flex-1 items-center justify-center rounded-full bg-[#1C1C1C] text-[11px] uppercase tracking-[0.18em] text-white"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                  <a
                    href="https://wa.me/917096241594"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#25D366] text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
                  >
                    <Phone size={14} /> WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer keeps non-home pages clear of the fixed header (home hero slides under it by design) */}
      {!isHome && <div className="h-[90px]" aria-hidden="true" />}
    </>
  )
}
