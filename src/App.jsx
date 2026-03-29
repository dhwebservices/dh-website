import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import Careers from './pages/Careers'
import Legal from './pages/Legal'
import Appointment from './pages/Appointment'
import Calculator from './pages/Calculator'
import NotFound from './pages/NotFound'
import './index.css'
import MailingListPopup from './components/MailingListPopup'
import CustomCursor from './components/CustomCursor'
import { useCMS } from './hooks/useCMS'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout() {
  const { data: mlSettings } = useCMS('mailing_list')
  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <Nav />
      <MailingListPopup settings={mlSettings} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/privacy" element={<Legal page="privacy" />} />
        <Route path="/terms" element={<Legal page="terms" />} />
        <Route path="/services-terms" element={<Legal page="services-terms" />} />
        <Route path="/refunds" element={<Legal page="refunds" />} />
        <Route path="/cookies" element={<Legal page="cookies" />} />
        <Route path="/acceptable-use" element={<Legal page="acceptable-use" />} />
        <Route path="/accessibility" element={<Legal page="accessibility" />} />
        <Route path="/security" element={<Legal page="security" />} />
        <Route path="/complaints" element={<Legal page="complaints" />} />
        <Route path="/appointment/:token" element={<Appointment />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
