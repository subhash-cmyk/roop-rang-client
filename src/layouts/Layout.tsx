import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import WhatsAppFloat from '../components/ui/WhatsAppFloat'
export default function Layout(){ return (
  <div className="min-h-screen flex flex-col bg-[#FFFCF9]">
    <Header />
    <main className="flex-1"><Outlet /></main>
    <Footer />
    <WhatsAppFloat />
  </div>
)}
