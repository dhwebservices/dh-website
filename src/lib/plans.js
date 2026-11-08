// The packages that can be booked online with a deposit, and what each costs.
//
// Shared by the pricing cards, the /order page and functions/api/deposit.js,
// so the amount Stripe charges is always worked out on the server from this
// list and never taken from the browser. Only fixed-price packages are here:
// anything "from £…" or "agreed at scoping" still needs a quote.

import { PLAN_PRICES, blackFridayOn } from './offers.js'

export const VAT_RATE = 0.2
export const DEPOSIT_SHARE = 0.5

// The care plan every package comes with. Website prices are the hosting
// tiers on the pricing page (Starter £35, Professional £65, Business £109),
// month to month on 30 days' notice as in the services terms.
const WEBSITE_CARE = 'Care plan from £35 a month + VAT, starting when your site goes live. Month to month, 30 days\' notice.'
const APP_CARE = 'App care £29 a month + VAT, starting when your app goes live. Month to month, 30 days\' notice.'

const PLANS = [
  { id: 'bf-website', name: 'Early Black Friday website', kind: 'website', price: 249, was: 449, blackFridayOnly: true,
    summary: 'A three-page website, built as soon as you book.',
    care: 'Care plan £15 a month + VAT for a minimum of 12 months, starting when your site goes live.' },
  { id: 'starter', name: 'Starter website', kind: 'website', price: 449, notDuringBlackFriday: true,
    summary: 'A five-page website.', care: WEBSITE_CARE },
  { id: 'growth', name: 'Growth website', kind: 'website', price: 999,
    summary: 'A ten-page website with a blog.', care: WEBSITE_CARE },
  { id: 'pro', name: 'Pro website', kind: 'website', price: 1499,
    summary: 'A fifteen-page website, e-commerce ready.', care: WEBSITE_CARE },
  { id: 'simple-app', name: 'Simple app', kind: 'app', price: 349,
    summary: 'Your website as a real app on the App Store and Google Play.', care: APP_CARE },
  { id: 'booking-app', name: 'Booking or ordering app', kind: 'app', price: 699,
    summary: 'Customers book or order from their phone and pay by card.', care: APP_CARE },
  // Monthly, nothing upfront: the lead offer in the growth plan (David, 8 Nov 2026).
  { id: 'dh-local', name: 'DH Local', kind: 'website', monthly: 79, minMonths: 12,
    summary: 'A five-page website, kept up to date for you, with your Google listing and reviews looked after.',
    care: 'Hosting, security, backups and updates are included in the monthly fee.' },
]

/** The plan as it can be bought right now, with today's price, or null. */
export function depositPlan(id) {
  const plan = PLANS.find((p) => p.id === id)
  if (!plan) return null
  const bf = blackFridayOn()
  if (plan.blackFridayOnly && !bf) return null
  if (plan.notDuringBlackFriday && bf) return null
  if (plan.monthly) {
    const monthlyPence = plan.monthly * 100
    const vatPence = Math.round(monthlyPence * VAT_RATE)
    return { ...plan, price: 0, was: null, monthlyPence, depositPence: monthlyPence, vatPence, totalPence: monthlyPence + vatPence }
  }
  const offer = !plan.blackFridayOnly && bf ? PLAN_PRICES.find(([re]) => re.test(plan.name.replace(/ website$/i, ''))) : null
  const price = offer ? offer[1] : plan.price
  const was = plan.blackFridayOnly ? plan.was : offer ? offer[2] : null
  const depositPence = Math.round(price * 100 * DEPOSIT_SHARE)
  const vatPence = Math.round(depositPence * VAT_RATE)
  return { ...plan, price, was, depositPence, vatPence, totalPence: depositPence + vatPence }
}

/** Which plan a pricing card books, matched on its name like offers.js does. */
export function planIdForCard(name) {
  const n = String(name || '').trim()
  if (/^early black friday/i.test(n)) return 'bf-website'
  if (/^starter/i.test(n)) return 'starter'
  if (/^growth/i.test(n)) return 'growth'
  if (/^pro$/i.test(n)) return 'pro'
  if (/^simple app/i.test(n)) return 'simple-app'
  if (/^booking or ordering app/i.test(n)) return 'booking-app'
  return null
}

export const pounds = (pence) => `£${(pence / 100).toLocaleString('en-GB', { minimumFractionDigits: pence % 100 ? 2 : 0, maximumFractionDigits: 2 })}`
