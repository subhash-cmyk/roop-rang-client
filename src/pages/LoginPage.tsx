import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { userAuthAPI } from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await userAuthAPI.login(form);

      if (res.success) {
        toast.success("Logged in successfully");

        localStorage.setItem("user_token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        window.dispatchEvent(new Event("authChanged"));

        navigate("/profile");
      }
    } catch (error: any) {
      const message = error.response?.data?.message;

      if (message === "Please verify your email first.") {
        toast.error(
          "Please verify your email first. OTP has been sent to your email."
        );
        navigate("/verify-email", {
          state: {
            email: form.email,
          },
        });

        return;
      }

      toast.error(message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

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
              <Lock className="text-white" strokeWidth={2.25} size={18} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#2c241c] leading-tight">
              Welcome Back
            </h1>
            <p className="mt-0.5 text-sm text-gray-500 leading-snug">
              Login to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            {/* Email */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-[13px] font-medium text-[#4a3f35]"
              >
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
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-lg border border-[#e8ddd0] bg-[#fdfbf9] py-2.5 pl-10 pr-3 text-sm text-[#2c241c] placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-[#B8865B] focus:bg-white focus:ring-2 focus:ring-[#B8865B]/20"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-[13px] font-medium text-[#4a3f35]"
              >
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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-lg border border-[#e8ddd0] bg-[#fdfbf9] py-2.5 pl-10 pr-10 text-sm text-[#2c241c] placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-[#B8865B] focus:bg-white focus:ring-2 focus:ring-[#B8865B]/20"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-md text-[#a89078] transition-colors duration-150 hover:bg-[#f5ebe0] hover:text-[#B8865B]"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end -mt-0.5">
              <Link
                to="/forgot-password"
                className="text-[13px] font-medium text-[#B8865B] transition-colors duration-150 hover:text-[#a87549] hover:underline underline-offset-2"
              >
                Forgot Password?
              </Link>
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
                  Signing In...
                </>
              ) : (
                <>
                  Login
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

          {/* Register link */}
          <p className="text-center text-sm text-gray-600 leading-snug">
            Don&apos;t have an account?
            <Link
              to="/register"
              className="ml-1.5 font-semibold text-[#B8865B] transition-colors duration-150 hover:text-[#a87549] hover:underline underline-offset-2"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
