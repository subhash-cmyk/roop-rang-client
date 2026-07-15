import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
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
        toast.success("Account created successfully");

        localStorage.setItem("user_token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        window.dispatchEvent(new Event("authChanged"));

        navigate("/profile");
      }
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f4] flex items-center justify-center px-4 py-10">

      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Join Roop Rang
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 mt-8"
        >

          <input
            name="name"
            placeholder="Full Name"
            className="w-full border rounded-xl p-3"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border rounded-xl p-3"
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="Phone Number"
            className="w-full border rounded-xl p-3"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <div className="relative">

            <input
              name="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              className="w-full border rounded-xl p-3"
              onChange={handleChange}
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-4"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="w-full border rounded-xl p-3"
            onChange={handleChange}
            required
          />

          <button
            disabled={loading}
            className="w-full bg-[#B8865B] hover:bg-[#a87549] text-white rounded-xl py-3 font-semibold"
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>

        </form>

        <p className="text-center mt-6">

          Already have an account?

          <Link
            to="/login"
            className="text-[#B8865B] ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}