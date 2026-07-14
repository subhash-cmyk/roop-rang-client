import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import AboutPage from './pages/AboutPage'
import InquiryPage from './pages/InquiryPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import NotFound from './pages/NotFound'
import { useEffect } from 'react'

function App() { 
  useEffect(() => {

    fetch("http://localhost:5000/api/visitor", {
      method: "POST"
    })
      .then(res => res.json())
      .then(data => {
        console.log("Visitor tracked", data)
      })
      .catch(error => {
        console.log("Visitor error", error)
      })

  }, [])  
  return (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/inquiry" element={<InquiryPage />} />
      <Route path="/privacy-policy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
)}
export default App
