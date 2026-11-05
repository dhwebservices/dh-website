// Early Black Friday (5 to 30 Nov 2026). Shared by the /black-friday page and
// the homepage notice, so both stop on the same second.
// Monday 30 November 2026, 23:59:59 UK time (GMT in November).
export const BLACK_FRIDAY_ENDS = Date.UTC(2026, 10, 30, 23, 59, 59)
export const blackFridayOn = () => Date.now() <= BLACK_FRIDAY_ENDS

// While the offer runs it takes the Starter website's place in the price
// cards (homepage and /pricing). "Normally from £449" is true: it is our
// lowest normal website price.
const isStarter = (name) => /starter/i.test(String(name || ''))

export const withBlackFridayPackages = (packages) =>
  !blackFridayOn() ? packages : (packages || []).map((p) => !isStarter(p.name) ? p : {
    ...p,
    name: 'Early Black Friday website',
    price: '£249',
    priceNote: 'Normally from £449 · ends 30 Nov',
    tagline: 'A three-page website',
    who: 'Only 10 places, built as soon as you book',
    features: '3 pages · Mobile layout · Contact form · Care plan £15/mo for 12 months',
    badge: 'Black Friday',
    href: '/black-friday',
    ctaLabel: 'Book a place',
  })

export const withBlackFridayBuilds = (builds) =>
  !blackFridayOn() ? builds : (builds || []).map((b) => !isStarter(b.name) ? b : {
    ...b,
    name: 'Early Black Friday',
    price: 249,
    priceNote: 'Normally from £449 · ends 30 Nov',
    delivery: 'starts when you book',
    badge: 'Black Friday',
    href: '/black-friday',
    ctaLabel: 'Book a place',
    features: ['3-page website', 'Mobile responsive design', 'Basic SEO setup', 'Contact form', 'Google Maps embed', 'Care plan £15/mo + VAT for 12 months'],
  })
