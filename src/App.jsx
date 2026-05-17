import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense, useState } from 'react'
import Analytics from './components/Analytics'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import './index.css'
import SiteBanner from './components/SiteBanner'
import InitialLoader from './components/InitialLoader'
import MaintenanceMode from './components/MaintenanceMode'
import { useCMS } from './hooks/useCMS'
import { SITE_URL } from './lib/siteConfig'
import { INDEXABLE_PAGE_META, withTrailingSlash } from './lib/seoContent'
const OG_IMAGE_URL = `${SITE_URL}/og-image.svg`

const Services = lazy(() => import('./pages/Services'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const ShopHome = lazy(() => import('./pages/ShopHome'))
const ShopCategory = lazy(() => import('./pages/ShopCategory'))
const ShopProduct = lazy(() => import('./pages/ShopProduct'))
const ShopCart = lazy(() => import('./pages/ShopCart'))
const ShopCheckout = lazy(() => import('./pages/ShopCheckout'))
const ShopCheckoutSuccess = lazy(() => import('./pages/ShopCheckoutSuccess'))
const ShopCheckoutCancel = lazy(() => import('./pages/ShopCheckoutCancel'))
const ShopInfo = lazy(() => import('./pages/ShopInfo'))
const Contact = lazy(() => import('./pages/Contact'))
const Careers = lazy(() => import('./pages/Careers'))
const CareerRole = lazy(() => import('./pages/CareerRole'))
const CareerApply = lazy(() => import('./pages/CareerApply'))
const ApplicationSuccess = lazy(() => import('./pages/ApplicationSuccess'))
const Legal = lazy(() => import('./pages/Legal'))
const Appointment = lazy(() => import('./pages/Appointment'))
const Calculator = lazy(() => import('./pages/Calculator'))
const About = lazy(() => import('./pages/About'))
const Partners = lazy(() => import('./pages/Partners'))
const ManagedPage = lazy(() => import('./pages/ManagedPage'))
const GeoPage = lazy(() => import('./pages/GeoPage'))
const MailingListPopup = lazy(() => import('./components/MailingListPopup'))
const WhatsAppButtonLazy = lazy(() => import('./components/WhatsAppButton'))
const ExitIntentLazy = lazy(() => import('./components/ExitIntent'))

function RouteFallback() {
  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      <section className="section">
        <div className="container section-narrow">
          <p className="body-md">Loading…</p>
        </div>
      </section>
    </main>
  )
}

const PAGE_META = {
  ...INDEXABLE_PAGE_META,
  '/shop': {
    title: 'Shop | DH Website Services',
    description: 'Buy iPhones, iPads, Samsung phones, laptops, and business devices through the DH Website Services shop.',
    robots: 'index,follow',
  },
  '/shop/cart': {
    title: 'Your Cart | DH Website Services Shop',
    description: 'Review your selected devices and continue to checkout.',
    robots: 'noindex,nofollow',
  },
  '/shop/checkout': {
    title: 'Checkout | DH Website Services Shop',
    description: 'Complete payment securely with Stripe for your selected devices.',
    robots: 'noindex,nofollow',
  },
  '/shop/checkout/success': {
    title: 'Order confirmed | DH Website Services Shop',
    description: 'Your payment has been confirmed and your order has been received.',
    robots: 'noindex,nofollow',
  },
  '/shop/checkout/cancel': {
    title: 'Checkout cancelled | DH Website Services Shop',
    description: 'Your checkout was cancelled before payment completed.',
    robots: 'noindex,nofollow',
  },
  '/404': {
    title: 'Page not found | DH Website Services',
    description: 'The page you requested could not be found.',
    robots: 'noindex,nofollow',
  },
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function MarketingEnhancements() {
  const { pathname } = useLocation()
  const [ready, setReady] = useState(false)
  const enabledRoutes = new Set([
    '/',
    '/services',
    '/pricing',
    '/portfolio',
    '/about',
    '/partners',
    '/calculator',
  ])

  useEffect(() => {
    const canIdle = typeof window.requestIdleCallback === 'function'
    const handle = canIdle
      ? window.requestIdleCallback(() => setReady(true), { timeout: 1500 })
      : window.setTimeout(() => setReady(true), 300)

    return () => {
      if (canIdle && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(handle)
      } else {
        window.clearTimeout(handle)
      }
    }
  }, [])

  if (!ready) return null
  if (!enabledRoutes.has(pathname)) return null

  return (
    <Suspense fallback={null}>
      <>
        <WhatsAppButtonLazy />
        <ExitIntentLazy />
      </>
    </Suspense>
  )
}

function PageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const normalizedPath = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
    let meta = PAGE_META[normalizedPath]
    if (!meta && /^\/careers\/[^/]+\/?$/.test(pathname)) {
      meta = {
        title: 'Role details | DH Website Services Careers',
        description: 'Review the role detail, expectations, and package before applying to DH Website Services.',
        robots: 'index,follow',
      }
    }
    if (!meta && /^\/careers\/[^/]+\/apply\/?$/.test(pathname)) {
      meta = {
        title: 'Apply | DH Website Services Careers',
        description: 'Submit your CV and complete the DH Website Services application form online.',
        robots: 'noindex,nofollow',
      }
    }
    if (!meta && normalizedPath === '/careers/application-success') {
      meta = {
        title: 'Application submitted | DH Website Services Careers',
        description: 'Your application has been submitted successfully.',
        robots: 'noindex,nofollow',
      }
    }
    if (!meta && normalizedPath.startsWith('/appointment/')) {
      meta = {
        title: 'Manage appointment | DH Website Services',
        description: 'Reschedule or cancel your appointment with DH Website Services.',
        robots: 'noindex,nofollow',
      }
    }
    meta = meta || {
      title: 'DH Website Services',
      description: 'Production-ready websites built for growth.',
      robots: 'index,follow',
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
    ensureMeta('meta[name="robots"]', 'name', 'robots').setAttribute('content', meta.robots || 'index,follow')

    ensureMeta('meta[property="og:title"]', 'property', 'og:title').setAttribute('content', meta.title)
    ensureMeta('meta[property="og:description"]', 'property', 'og:description').setAttribute('content', meta.description)
    ensureMeta('meta[property="og:url"]', 'property', 'og:url').setAttribute('content', `${SITE_URL}${withTrailingSlash(normalizedPath)}`)
    ensureMeta('meta[property="og:type"]', 'property', 'og:type').setAttribute('content', normalizedPath === '/' ? 'website' : 'article')
    ensureMeta('meta[property="og:image"]', 'property', 'og:image').setAttribute('content', OG_IMAGE_URL)
    ensureMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt').setAttribute('content', `${meta.title} - DH Website Services`)
    ensureMeta('meta[property="og:site_name"]', 'property', 'og:site_name').setAttribute('content', 'DH Website Services')
    ensureMeta('meta[name="twitter:card"]', 'name', 'twitter:card').setAttribute('content', 'summary_large_image')
    ensureMeta('meta[name="twitter:title"]', 'name', 'twitter:title').setAttribute('content', meta.title)
    ensureMeta('meta[name="twitter:description"]', 'name', 'twitter:description').setAttribute('content', meta.description)
    ensureMeta('meta[name="twitter:image"]', 'name', 'twitter:image').setAttribute('content', OG_IMAGE_URL)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${SITE_URL}${withTrailingSlash(normalizedPath)}`)

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
  const [popupReady, setPopupReady] = useState(false)

  useEffect(() => {
    const canIdle = typeof window.requestIdleCallback === 'function'
    const handle = canIdle
      ? window.requestIdleCallback(() => setPopupReady(true), { timeout: 1800 })
      : window.setTimeout(() => setPopupReady(true), 500)

    return () => {
      if (canIdle && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(handle)
      } else {
        window.clearTimeout(handle)
      }
    }
  }, [])

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
      <Nav />
      <SiteBanner settings={bannerSettings} />
      {popupReady && (
        <Suspense fallback={null}>
          <MailingListPopup settings={mlSettings} />
        </Suspense>
      )}
      <MarketingEnhancements />
      <Suspense fallback={<RouteFallback />}>
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
          <Route path="/website-builder" element={<GeoPage />} />
          <Route path="/website-builder-:location" element={<GeoPage />} />
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
      </Suspense>
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
