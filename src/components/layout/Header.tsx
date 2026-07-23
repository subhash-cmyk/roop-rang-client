import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { MoreVertical, X, Phone, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getUser, logout } from "../../utils/auth";
import { categoryAPI } from "../../services/api";

interface CategoryMenuItem {
  label: string;
  to: string;
  subcategories?: { label: string; to: string }[];
}

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(getUser());
  const [scrolled, setScrolled] = useState(false);
  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);

  useEffect(() => {
    const syncUser = () => setUser(getUser());
    window.addEventListener("authChanged", syncUser);
    return () => window.removeEventListener("authChanged", syncUser);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    categoryAPI.list().then((res) => {
      const list = Array.isArray(res) ? res : res?.data;
      if (list && Array.isArray(list)) {
        setDbCategories(list);
      }
    }).catch(console.error);
  }, []);

  const isHome = location.pathname === '/';
  const solid = scrolled || !isHome;

  // Build beauty subcategories dynamically incorporating DB categories
  const beautySubcategories = [
    { label: 'Skincare', to: '/products?category=skincare' },
    { label: 'Makeup', to: '/products?category=makeup' },
    { label: 'Hair Care', to: '/products?category=hair-care' },
    { label: 'Body Care', to: '/products?category=body-care' },
    { label: 'Fragrance', to: '/products?category=fragrance' },
  ];

  // Include DB categories that aren't already represented by standard labels
  dbCategories.forEach((cat: any) => {
    const slug = cat.slug || cat.name?.toLowerCase().replace(/\s+/g, '-');
    const label = cat.name;
    const exists = beautySubcategories.some(
      (item) => item.label.toLowerCase() === label.toLowerCase() || item.to.includes(slug)
    );
    if (!exists) {
      beautySubcategories.push({
        label,
        to: `/products?category=${slug}`,
      });
    }
  });

  const categoriesNav: CategoryMenuItem[] = [
    { label: 'HOME', to: '/' },
    { label: 'FOR YOU', to: isHome ? '#for-you' : '/products' },
    {
      label: 'BEAUTY',
      to: '/products?category=beauty',
      subcategories: beautySubcategories,
    },
    {
      label: 'GIFTS',
      to: '/products?category=gifts',
      subcategories: [
        { label: 'Gift Sets', to: '/products?search=Gift+Sets' },
        { label: 'Birthday Gifts', to: '/products?search=Birthday+Gifts' },
        { label: 'Special Occasion', to: '/products?search=Special+Occasion' },
        { label: 'Personalized Gifts', to: '/products?search=Personalized+Gifts' },
      ],
    },
    {
      label: 'KIDS',
      to: '/products?category=kids',
      subcategories: [
        { label: 'Kids Care', to: '/products?search=Kids+Care' },
        { label: 'Toys', to: '/products?search=Toys' },
        { label: 'Baby Products', to: '/products?search=Baby+Products' },
        { label: 'Kids Accessories', to: '/products?search=Kids+Accessories' },
      ],
    },
    { label: 'SHOP', to: '/products' },
    { label: 'ABOUT US', to: '/about' },
    { label: 'INQUIRY', to: '/inquiry' },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${
          solid
            ? 'bg-white/95 shadow-[0_12px_40px_rgba(28,28,28,0.08)] backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        {/* Main bar — 90px → 70px on scroll */}
        <div
          className={`relative flex w-full items-center justify-between px-5 transition-all duration-300 sm:px-8 lg:px-12 ${
            scrolled ? 'h-[70px]' : 'h-[90px]'
          }`}
        >
          {/* ── Left navigation ── */}
          <nav className="hidden flex-1 items-center gap-6 xl:gap-8 lg:flex">
            {categoriesNav.map((item) => {
              if (item.subcategories) {
                return (
                  <div key={item.label} className="group relative py-2">
                    <Link
                      to={item.to}
                      className={`inline-flex items-center gap-1 text-[11px] xl:text-[12px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                        solid
                          ? 'text-[#1C1C1C]/70 hover:text-[#C9A45B]'
                          : 'text-white/80 hover:text-[#C9A45B]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown size={13} className="transition-transform duration-300 group-hover:rotate-180 text-[#C9A45B]" />
                    </Link>

                    {/* Mega-menu / Dropdown */}
                    <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                      <div className="w-56 overflow-hidden rounded-2xl border border-[#1C1C1C]/[0.08] bg-white p-3 shadow-[0_20px_40px_rgba(28,28,28,0.12)]">
                        <div className="mb-2 border-b border-[#1C1C1C]/[0.06] pb-2 px-3">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C9A45B]">
                            {item.label} Categories
                          </span>
                        </div>
                        <div className="flex flex-col space-y-1">
                          {item.subcategories.map((sub) => (
                            <Link
                              key={sub.label}
                              to={sub.to}
                              className="rounded-lg px-3 py-2 text-[12px] font-medium text-[#1C1C1C]/70 transition-colors hover:bg-[#F9F6F0] hover:text-[#C9A45B]"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              if (item.to.startsWith('#')) {
                return (
                  <a
                    key={item.label}
                    href={isHome ? item.to : `/${item.to}`}
                    className={`group relative py-2 text-[11px] xl:text-[12px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                      solid
                        ? 'text-[#1C1C1C]/60 hover:text-[#1C1C1C]'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] origin-left scale-x-0 bg-[#C9A45B] transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                );
              }

              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    `group relative py-2 text-[11px] xl:text-[12px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                      isActive
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
                        className={`absolute bottom-0 left-0 right-0 h-[1.5px] origin-left bg-[#C9A45B] transition-transform duration-300 ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* ── Center logo ── */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link to="/" className="group flex items-center gap-3">
              <div className="hidden flex-col sm:flex text-center">
                <h1
                  className={`font-playfair font-semibold leading-none transition-all duration-300 ${
                    scrolled ? 'text-[20px] xl:text-[22px]' : 'text-[24px] xl:text-[26px]'
                  } ${solid ? 'text-[#1C1C1C]' : 'text-white'}`}
                >
                  Roop Rang
                </h1>

                <span
                  className={`mt-1 text-[10px] xl:text-[11px] font-semibold uppercase tracking-[0.32em] transition-colors duration-300 ${
                    solid ? 'text-[#C9A45B]' : 'text-white'
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
                  className={`hidden h-10 items-center justify-center rounded-full border px-6 text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 md:inline-flex ${
                    solid
                      ? 'border-[#1C1C1C]/15 text-[#1C1C1C]/70 hover:border-[#C9A45B] hover:text-[#C9A45B]'
                      : 'border-white/40 bg-white/10 text-white backdrop-blur-sm hover:border-[#C9A45B] hover:text-[#C9A45B]'
                  }`}
                >
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className={`hidden h-10 items-center justify-center rounded-full px-4 text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 md:inline-flex ${
                    solid ? 'text-[#1C1C1C]/40 hover:text-[#1C1C1C]' : 'text-white/75 hover:text-white'
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

            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden ${
                solid
                  ? 'border-[#1C1C1C]/15 text-[#1C1C1C]'
                  : 'border-white/40 bg-white/10 text-white backdrop-blur-sm'
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
              className="mx-4 mb-4 max-h-[80vh] overflow-y-auto rounded-2xl border border-[#1C1C1C]/[0.06] bg-white shadow-[0_28px_60px_rgba(28,28,28,0.16)] lg:hidden"
            >
              <div className="flex flex-col px-6 py-3">
                {categoriesNav.map((item) => {
                  if (item.subcategories) {
                    const isExpanded = mobileExpandedCat === item.label;
                    return (
                      <div key={item.label} className="border-b border-[#1C1C1C]/[0.05]">
                        <div
                          onClick={() =>
                            setMobileExpandedCat(isExpanded ? null : item.label)
                          }
                          className="flex cursor-pointer items-center justify-between py-4 text-[12px] uppercase tracking-[0.24em] text-[#1C1C1C]/80"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${
                              isExpanded ? 'rotate-180 text-[#C9A45B]' : 'text-gray-400'
                            }`}
                          />
                        </div>

                        {isExpanded && (
                          <div className="mb-3 flex flex-col space-y-2 pl-4">
                            {item.subcategories.map((sub) => (
                              <Link
                                key={sub.label}
                                to={sub.to}
                                onClick={() => setOpen(false)}
                                className="py-1 text-[12px] font-medium text-[#1C1C1C]/60 hover:text-[#C9A45B]"
                              >
                                • {sub.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  if (item.to.startsWith('#')) {
                    return (
                      <a
                        key={item.label}
                        href={isHome ? item.to : `/${item.to}`}
                        onClick={() => setOpen(false)}
                        className="border-b border-[#1C1C1C]/[0.05] py-4 text-[12px] uppercase tracking-[0.24em] text-[#1C1C1C]/70 hover:text-[#1C1C1C]"
                      >
                        {item.label}
                      </a>
                    );
                  }

                  return (
                    <NavLink
                      key={item.label}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `border-b border-[#1C1C1C]/[0.05] py-4 text-[12px] uppercase tracking-[0.24em] transition-colors duration-300 ${
                          isActive ? 'text-[#C9A45B]' : 'text-[#1C1C1C]/70 hover:text-[#1C1C1C]'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  );
                })}

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
                        onClick={() => {
                          logout();
                          setOpen(false);
                          navigate("/");
                        }}
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

      {/* Spacer keeps non-home pages clear of the fixed header */}
      {!isHome && <div className="h-[90px]" aria-hidden="true" />}
    </>
  );
}

