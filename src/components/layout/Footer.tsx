import { Link } from 'react-router-dom'
import {
  Instagram,
  Facebook,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'
import roopRangLogo from '../../assets/images/roop-rang-banner.png'

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0B] text-[#f3e3c8] mt-16 border-t border-[#2a2118]">
      <div className="container-custom py-14 grid md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-3 mb-4">
            <img
              src={roopRangLogo}
              alt="Roop Rang"
              className="w-16 h-16 object-contain"
            />

            <div>
              <h2 className="text-[#D8B08C] text-2xl font-playfair leading-none">
                Roop Rang
              </h2>

              <p className="text-[9px] tracking-[4px] text-[#B8865B] mt-1 uppercase">
                Luxury in Every Shade
              </p>
            </div>
          </Link>

          <p className="text-sm text-[#d6c6a8] leading-relaxed">
            Luxury Cosmetics, Timeless Beauty. Premium beauty products curated
            in Surat, Gujarat.
          </p>

          <div className="flex gap-3 mt-5">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D8B08C] hover:text-black transition"
            >
              <Instagram size={18} />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D8B08C] hover:text-black transition"
            >
              <Facebook size={18} />
            </a>

            <a
              href="https://wa.me/917096241594"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#25D366] transition"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-playfair text-xl mb-4 text-white">
            Quick Links
          </h4>

          <ul className="space-y-3 text-sm text-[#d6c6a8]">
            <li>
              <Link to="/" className="hover:text-[#D8B08C]">
                Home
              </Link>
            </li>

            <li>
              <Link to="/products" className="hover:text-[#D8B08C]">
                Products
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-[#D8B08C]">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/inquiry" className="hover:text-[#D8B08C]">
                Inquiry
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-playfair text-xl mb-4 text-white">
            Legal
          </h4>

          <ul className="space-y-3 text-sm text-[#d6c6a8]">
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-[#D8B08C]"
              >
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link
                to="/terms"
                className="hover:text-[#D8B08C]"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-playfair text-xl mb-4 text-white">
            Contact
          </h4>

          <ul className="space-y-4 text-sm text-[#d6c6a8]">
            <li className="flex gap-3">
              <MapPin
                size={18}
                className="text-[#D8B08C] mt-1 shrink-0"
              />
              <span>
                Shop No 521, Apex Building,
                <br />
                Madhuram Circle,
                <br />
                Dindoli, Surat – 394210
              </span>
            </li>

            <li className="flex items-center gap-3">
              <Phone size={16} className="text-[#D8B08C]" />
              +91 7096241594
            </li>

            <li className="flex items-center gap-3">
              <Mail size={16} className="text-[#D8B08C]" />
              rangroop@gmail.com
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t border-[#2a2118] text-center py-6 text-sm text-[#bfae8a]">
        © {new Date().getFullYear()} <span className="text-[#D8B08C]">Roop Rang</span>. All Rights Reserved.
      </div>
    </footer>
  )
}