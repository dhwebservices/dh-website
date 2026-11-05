// Early Black Friday (5 to 30 Nov 2026). Shared by the /black-friday page and
// the homepage notice, so both stop on the same second.
// Monday 30 November 2026, 23:59:59 UK time (GMT in November).
export const BLACK_FRIDAY_ENDS = Date.UTC(2026, 10, 30, 23, 59, 59)
export const blackFridayOn = () => Date.now() <= BLACK_FRIDAY_ENDS

// Black Friday prices for every plan, about 25% off (David, 5 Nov 2026).
// The "was" price is each plan's real normal price, as UK pricing rules need.
// Matched on the plan name so they apply whether the page content comes from
// this repo or from the portal editor.
const PLAN_PRICES = [
  [/^simple app/i, 249, 349],
  [/^booking or ordering app/i, 499, 699],
  [/^business app/i, 1099, 1499],
  [/^growth/i, 749, 999],
  [/^pro$/i, 1099, 1499],
  [/^enterprise/i, 1899, 2499],
]
const isStarter = (name) => /starter/i.test(String(name || ''))
const planPrice = (name) => PLAN_PRICES.find(([re]) => re.test(String(name || '').trim()))
const gbp = (n) => `£${n.toLocaleString('en-GB')}`
const wasNote = (was) => `Was ${gbp(was)} · ends 30 Nov`

// The Starter website becomes the £249 three-page offer; every other plan
// shows its Black Friday price with the normal price beside it.
const STARTER_CARD = {
  name: 'Early Black Friday website',
  price: '£249',
  priceNote: 'Normally from £449 · ends 30 Nov',
  tagline: 'A three-page website',
  who: 'Only 10 places, built as soon as you book',
  features: '3 pages · Mobile layout · Contact form · Care plan £15/mo for 12 months',
  badge: 'Black Friday',
  href: '/black-friday',
  ctaLabel: 'Book a place',
}

export const withBlackFridayPackages = (packages) =>
  !blackFridayOn() ? packages : (packages || []).map((p) => {
    if (isStarter(p.name)) return { ...p, ...STARTER_CARD }
    const m = planPrice(p.name.replace(/ website$/i, ''))
    return m ? { ...p, price: gbp(m[1]), priceNote: wasNote(m[2]), badge: 'Black Friday' } : p
  })

export const withBlackFridayBuilds = (builds) =>
  !blackFridayOn() ? builds : (builds || []).map((b) => {
    if (isStarter(b.name)) return {
      ...b, name: 'Early Black Friday', price: 249, priceNote: 'Normally from £449 · ends 30 Nov',
      delivery: 'starts when you book', badge: 'Black Friday', href: '/black-friday', ctaLabel: 'Book a place',
      features: ['3-page website', 'Mobile responsive design', 'Basic SEO setup', 'Contact form', 'Google Maps embed', 'Care plan £15/mo + VAT for 12 months'],
    }
    const m = planPrice(b.name)
    return m ? { ...b, price: m[1], priceNote: wasNote(m[2]) } : b
  })

export const withBlackFridayApps = (plans) =>
  !blackFridayOn() ? plans : (plans || []).map((p) => {
    const m = planPrice(p.name)
    if (!m) return p
    const from = /^from /i.test(String(p.price)) ? 'from ' : ''
    return { ...p, price: from + gbp(m[1]), priceNote: wasNote(m[2]), monthly: null }
  })

// Headline numbers ("From £349", "£349 apps from") follow the cheapest Black Friday prices.
export const withBlackFridayStats = (stats) =>
  !blackFridayOn() ? stats : (stats || []).map((s) => ({ ...s, value: String(s.value).replace('£449', '£249').replace('£349', '£249') }))

export const blackFridayText = (text) =>
  !blackFridayOn() || typeof text !== 'string' ? text
    : text.replace('Apps from £349 and websites from £449.', 'Black Friday prices until 30 November: apps from £249 and websites from £249.')
