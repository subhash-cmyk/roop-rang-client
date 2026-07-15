import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
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
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f4] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Login to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 mt-8">

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border rounded-xl p-3"
            value={form.email}
            onChange={handleChange}
            required
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full border rounded-xl p-3"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              className="absolute right-4 top-4"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

          </div>

          <button
            disabled={loading}
            className="w-full bg-[#B8865B] hover:bg-[#a87549] text-white rounded-xl py-3 font-semibold"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6">
          Don't have an account?
          <Link to="/register" className="text-[#B8865B] ml-2">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}