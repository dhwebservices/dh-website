import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Analytics from './components/Analytics'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Pricing from './pages/Pricing'
import Portfolio from './pages/Portfolio'
import ShopHome from './pages/ShopHome'
import ShopCategory from './pages/ShopCategory'
import ShopProduct from './pages/ShopProduct'
import ShopCart from './pages/ShopCart'
import ShopCheckout from './pages/ShopCheckout'
import ShopCheckoutSuccess from './pages/ShopCheckoutSuccess'
import ShopCheckoutCancel from './pages/ShopCheckoutCancel'
import ShopInfo from './pages/ShopInfo'
import Contact from './pages/Contact'
import Careers from './pages/Careers'
import CareerRole from './pages/CareerRole'
import CareerApply from './pages/CareerApply'
import ApplicationSuccess from './pages/ApplicationSuccess'
import Legal from './pages/Legal'
import Appointment from './pages/Appointment'
import Calculator from './pages/Calculator'
import About from './pages/About'
import Partners from './pages/Partners'
import ManagedPage from './pages/ManagedPage'
import WhatsAppButton from './components/WhatsAppButton'
import ExitIntent from './components/ExitIntent'
import NotFound from './pages/NotFound'
import './index.css'
import MailingListPopup from './components/MailingListPopup'
import CustomCursor from './components/CustomCursor'
import SiteBanner from './components/SiteBanner'
import InitialLoader from './components/InitialLoader'
import MaintenanceMode from './components/MaintenanceMode'
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
  '/shop': {
    title: 'Shop | DH Website Services',
    description: 'Buy iPhones, iPads, Samsung phones, laptops, and business devices through the DH Website Services shop.',
  },
  '/shop/cart': {
    title: 'Your Cart | DH Website Services Shop',
    description: 'Review your selected devices and continue to checkout.',
  },
  '/shop/checkout': {
    title: 'Checkout | DH Website Services Shop',
    description: 'Complete payment securely with Stripe for your selected devices.',
  },
  '/shop/checkout/success': {
    title: 'Order confirmed | DH Website Services Shop',
    description: 'Your payment has been confirmed and your order has been received.',
  },
  '/shop/checkout/cancel': {
    title: 'Checkout cancelled | DH Website Services Shop',
    description: 'Your checkout was cancelled before payment completed.',
  },
  '/contact': {
    title: 'Book a Call | DH Website Services',
    description: 'Book a free project consultation and get a clear plan with a fixed price.',
  },
  '/careers': {
    title: 'Careers | DH Website Services',
    description: 'Live vacancies, role details, and direct online applications at DH Website Services.',
  },
  '/about': {
    title: 'About | DH Website Services',
    description: 'DH Website Services is a Cardiff-based web agency founded by David Hooper. Fixed prices, founder-led delivery, production-quality websites for UK businesses.',
  },
  '/partners': {
    title: 'Partners | DH Website Services',
    description: 'DH Website Services is a Microsoft approved partner building websites and practical workflows for businesses already operating in the Microsoft ecosystem.',
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

function MarketingEnhancements() {
  const { pathname } = useLocation()
  const enabledRoutes = new Set([
    '/',
    '/services',
    '/pricing',
    '/portfolio',
    '/about',
    '/partners',
    '/calculator',
  ])

  if (!enabledRoutes.has(pathname)) return null

  return (
    <>
      <WhatsAppButton />
      <ExitIntent />
    </>
  )
}

function PageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    let meta = PAGE_META[pathname]
    if (!meta && /^\/careers\/[^/]+$/.test(pathname)) {
      meta = {
        title: 'Role details | DH Website Services Careers',
        description: 'Review the role detail, expectations, and package before applying to DH Website Services.',
      }
    }
    if (!meta && /^\/careers\/[^/]+\/apply$/.test(pathname)) {
      meta = {
        title: 'Apply | DH Website Services Careers',
        description: 'Submit your CV and complete the DH Website Services application form online.',
      }
    }
    if (!meta && pathname === '/careers/application-success') {
      meta = {
        title: 'Application submitted | DH Website Services Careers',
        description: 'Your application has been submitted successfully.',
      }
    }
    meta = meta || {
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
  const { data: bannerSettings } = useCMS('banner')
  const { data: maintenanceSettings } = useCMS('maintenance')

  if (maintenanceSettings?.enabled) {
    return (
      <>
        <InitialLoader />
        <ScrollToTop />
        <PageMeta />
        <Analytics />
        <MaintenanceMode settings={maintenanceSettings} />
      </>
    )
  }

  return (
    <>
      <InitialLoader />
      <ScrollToTop />
      <PageMeta />
      <Analytics />
      <CustomCursor />
      <Nav />
      <SiteBanner settings={bannerSettings} />
      <MailingListPopup settings={mlSettings} />
      <MarketingEnhancements />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/shop" element={<ShopHome />} />
        <Route path="/shop/category/:slug" element={<ShopCategory />} />
        <Route path="/shop/product/:slug" element={<ShopProduct />} />
        <Route path="/shop/cart" element={<ShopCart />} />
        <Route path="/shop/checkout" element={<ShopCheckout />} />
        <Route path="/shop/checkout/success" element={<ShopCheckoutSuccess />} />
        <Route path="/shop/checkout/cancel" element={<ShopCheckoutCancel />} />
        <Route path="/shop/delivery" element={<ShopInfo type="delivery" />} />
        <Route path="/shop/returns" element={<ShopInfo type="returns" />} />
        <Route path="/shop/warranty" element={<ShopInfo type="warranty" />} />
        <Route path="/shop/cancellations" element={<ShopInfo type="cancellations" />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/:slug" element={<CareerRole />} />
        <Route path="/careers/:slug/apply" element={<CareerApply />} />
        <Route path="/careers/application-success" element={<ApplicationSuccess />} />
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
        <Route path="/partners" element={<Partners />} />
        <Route path="/:slug" element={<ManagedPage />} />
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
