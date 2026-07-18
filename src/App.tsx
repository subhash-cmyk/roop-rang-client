import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AboutPage from "./pages/AboutPage";
import InquiryPage from "./pages/InquiryPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import VerifyResetOTPPage from "./pages/VerifyResetOTPPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import About from "./pages/AboutPage";
import ScrollToTop from "./components/ScrollToTop";


function App() {
  useEffect(() => {
    fetch("/api/visitor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

      .then(async (res) => {
        console.log("Status:", res.status);

        const text = await res.text();
        console.log("Response:", text);
      })
      .catch((error) => {
        console.error("Visitor error:", error);
      });
      }, []);

    return (
      <>
        <ScrollToTop />

        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/inquiry" element={<InquiryPage />} />
            <Route path="/privacy-policy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verify-reset-otp" element={<VerifyResetOTPPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </>
    );
  }
export default App;