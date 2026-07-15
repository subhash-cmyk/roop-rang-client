import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import roopRangLogo from '../../assets/images/roop-rang-banner.png'
import { getUser, logout } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const nav = [
  { to: '/', label: 'HOME' },
  { to: '/products', label: 'SHOP' },
  { to: '/about', label: 'ABOUT US' },
  { to: '/inquiry', label: 'INQUIRY' },
]

export default function Header() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const syncUser = () => {
      setUser(getUser());
    };

    window.addEventListener("authChanged", syncUser);

    return () => {
      window.removeEventListener("authChanged", syncUser);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-3">
      <div
        className="
        mx-auto
        max-w-7xl
        rounded-3xl
        border border-[#2a2118]
        bg-[#0B0B0B]
        shadow-luxury
        ">
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

            {/* Login / Register */}
            {!user && (
              <>
                <Link
                  to="/login"
                  className="hidden sm:block px-4 py-2 rounded-full border border-[#D8B08C] text-[#D8B08C] text-sm hover:bg-[#D8B08C] hover:text-black transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="hidden sm:block px-4 py-2 rounded-full bg-[#D8B08C] text-black text-sm hover:opacity-90 transition"
                >
                  Register
                </Link>
              </>
            )}

            {/* User Login ke baad */}
            {user && (
              <>
                <Link
                  to="/profile"
                  className="hidden sm:block px-4 py-2 rounded-full border border-[#D8B08C] text-[#D8B08C] text-sm"
                >
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="hidden sm:block px-4 py-2 rounded-full bg-red-500 text-white text-sm"
                >
                  Logout
                </button>
              </>
            )}

            {/* WhatsApp */}
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
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="lg:hidden overflow-hidden border-t border-[#2a2118]"
            >
              <div className="px-8 py-4 flex flex-col gap-2">

                {/* Navigation */}
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
                <div className="border-t border-[#2a2118] pt-2 mt-2">

                  {!user ? (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setOpen(false)}
                        className="block py-2 text-[13px] tracking-wide uppercase text-white hover:text-[#D8B08C] transition"
                      >
                        Login
                      </Link>

                      <Link
                        to="/register"
                        onClick={() => setOpen(false)}
                        className="block py-2 text-[13px] tracking-wide uppercase text-white hover:text-[#D8B08C] transition"
                      >
                        Register
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setOpen(false)}
                        className="block py-2 text-[13px] tracking-wide uppercase text-white hover:text-[#D8B08C] transition"
                      >
                        My Profile
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setOpen(false);
                          navigate("/");
                        }}
                        className="w-full text-left py-2 text-[13px] tracking-wide uppercase text-red-400 hover:text-red-300 transition"
                      >
                        Logout
                      </button>
                    </>
                  )}

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  )
}