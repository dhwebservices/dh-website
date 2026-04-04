import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Analytics from './components/Analytics'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Pricing from './pages/Pricing'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import Careers from './pages/Careers'
import Legal from './pages/Legal'
import Appointment from './pages/Appointment'
import Calculator from './pages/Calculator'
import About from './pages/About'
import WhatsAppButton from './components/WhatsAppButton'
import ExitIntent from './components/ExitIntent'
import NotFound from './pages/NotFound'
import './index.css'
import MailingListPopup from './components/MailingListPopup'
import CustomCursor from './components/CustomCursor'
import { useCMS } from './hooks/useCMS'
import { SITE_URL } from './lib/siteConfig'

const PAGE_META = {
  '/': {
    title: 'DH Website Services | Production-Ready Websites for Growth',
    description: 'Production-ready websites, booking systems, and business platforms built for speed, SEO, and conversion.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'DH Website Services',
      url: SITE_URL,
      email: 'clients@dhwebsiteservices.co.uk',
      telephone: '02920024218',
      areaServed: 'United Kingdom',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Cardiff',
        addressCountry: 'GB',
      },
    },
  },
  '/services': {
    title: 'Services | DH Website Services',
    description: 'Custom website development, UX design, SEO, e-commerce, hosting, and HR portal integrations.',
  },
  '/pricing': {
    title: 'Pricing | DH Website Services',
    description: 'Clear website build, hosting, and HR system pricing with fixed packages and no hidden fees.',
  },
  '/portfolio': {
    title: 'Portfolio | DH Website Services',
    description: 'Recent website work from DH Website Services, including Glow With Lucy at glowwithlucy.co.uk.',
  },
  '/contact': {
    title: 'Book a Call | DH Website Services',
    description: 'Book a free project consultation and get a clear plan with a fixed price.',
  },
  '/careers': {
    title: 'Careers | DH Website Services',
    description: 'Expression of interest for designers, developers, and client-facing roles at DH Website Services.',
  },
  '/about': {
    title: 'About | DH Website Services',
    description: 'DH Website Services is a Cardiff-based web agency founded by David Hooper. Fixed prices, founder-led delivery, production-quality websites for UK businesses.',
  },
  '/calculator': {
    title: 'Project Calculator | DH Website Services',
    description: 'Build a live website quote based on pages, features, design, and support needs.',
  },
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = PAGE_META[pathname] || {
      title: 'DH Website Services',
      description: 'Production-ready websites built for growth.',
    }

    document.title = meta.title

    const ensureMeta = (selector, attr, attrValue) => {
      let element = document.querySelector(selector)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attr, attrValue)
        document.head.appendChild(element)
      }
      return element
    }

    let description = document.querySelector('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.setAttribute('name', 'description')
      document.head.appendChild(description)
    }
    description.setAttribute('content', meta.description)

    ensureMeta('meta[property="og:title"]', 'property', 'og:title').setAttribute('content', meta.title)
    ensureMeta('meta[property="og:description"]', 'property', 'og:description').setAttribute('content', meta.description)
    ensureMeta('meta[property="og:url"]', 'property', 'og:url').setAttribute('content', `${SITE_URL}${pathname}`)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${SITE_URL}${pathname}`)

    const existingSchema = document.getElementById('route-schema')
    if (existingSchema) existingSchema.remove()

    if (meta.schema) {
      const script = document.createElement('script')
      script.id = 'route-schema'
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(meta.schema)
      document.head.appendChild(script)
    }
  }, [pathname])

  return null
}

function Layout() {
  const { data: mlSettings } = useCMS('mailing_list')
  return (
    <>
      <ScrollToTop />
      <PageMeta />
      <Analytics />
      <CustomCursor />
      <Nav />
      <MailingListPopup settings={mlSettings} />
      <WhatsAppButton />
      <ExitIntent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/portfolio" element={<Portfolio />} />
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
        <Route path="/about" element={<About />} />
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
