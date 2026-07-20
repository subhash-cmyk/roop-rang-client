import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Phone, Lock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { userAuthAPI } from "../services/api";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const phone = value.replace(/\D/g, "").slice(0, 10);

      setForm((prev) => ({
        ...prev,
        phone,
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.phone.length !== 10) {
      toast.error("Mobile number must be exactly 10 digits");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await userAuthAPI.register(form);

      if (res.success) {
        toast.success("Account created successfully. Please verify your email.");

        navigate("/verify-email", {
          state: {
            email: res.email,
          },
        });
      }
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "Please enter a valid Indian mobile number"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "h-11 w-full rounded-lg border border-[#e8ddd0] bg-[#fdfbf9] py-2.5 pl-10 pr-3 text-sm text-[#2c241c] placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-[#B8865B] focus:bg-white focus:ring-2 focus:ring-[#B8865B]/20";

  const labelClass = "block text-[13px] font-medium text-[#4a3f35]";

  return (
    <div className="bg-[#faf7f4] px-4 pt-6 pb-8 relative overflow-hidden">
      {/* Subtle background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-[#D8B08C]/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-[#B8865B]/10 blur-3xl"
      />

      <div className="relative w-full max-w-[400px] mx-auto">
        <div className="rounded-2xl border border-[#efe6dc] bg-white px-6 py-5 shadow-lg shadow-[#B8865B]/[0.08] sm:px-7 sm:py-6">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#B8865B] to-[#a87549] shadow-md shadow-[#B8865B]/25">
              <User className="text-white" strokeWidth={2.25} size={18} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#2c241c] leading-tight">
              Create Account
            </h1>
            <p className="mt-0.5 text-sm text-gray-500 leading-snug">
              Join Roop Rang
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            {/* Full Name */}
            <div className="space-y-1">
              <label htmlFor="name" className={labelClass}>
                Full Name
              </label>
              <div className="relative">
                <User
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#c4a882]"
                  size={16}
                  aria-hidden
                />
                <input
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  className={inputClass}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#c4a882]"
                  size={16}
                  aria-hidden
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={inputClass}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label htmlFor="phone" className={labelClass}>
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#c4a882]"
                  size={16}
                  aria-hidden
                />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="Phone Number"
                  className={inputClass}
                  value={form.phone}
                  onChange={handleChange}
                  required
                  autoComplete="tel"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#c4a882]"
                  size={16}
                  aria-hidden
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="h-11 w-full rounded-lg border border-[#e8ddd0] bg-[#fdfbf9] py-2.5 pl-10 pr-10 text-sm text-[#2c241c] placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-[#B8865B] focus:bg-white focus:ring-2 focus:ring-[#B8865B]/20"
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-md text-[#a89078] transition-colors duration-150 hover:bg-[#f5ebe0] hover:text-[#B8865B]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className={labelClass}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#c4a882]"
                  size={16}
                  aria-hidden
                />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  className={inputClass}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#B8865B] text-sm font-semibold text-white shadow-sm shadow-[#B8865B]/20 transition-all duration-200 hover:bg-[#a87549] hover:shadow-md hover:shadow-[#B8865B]/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:active:scale-100"
            >
              {loading ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creating...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-3.5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#efe6dc]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2.5 text-[11px] uppercase tracking-wider text-gray-400">
                or
              </span>
            </div>
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-gray-600 leading-snug">
            Already have an account?
            <Link
              to="/login"
              className="ml-1.5 font-semibold text-[#B8865B] transition-colors duration-150 hover:text-[#a87549] hover:underline underline-offset-2"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
