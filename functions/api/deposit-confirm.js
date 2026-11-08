// GET /api/deposit-confirm?session_id=... -- called by the /order page when
// Stripe sends the customer back. Asks Stripe itself whether the deposit was
// paid (never trusts the URL), then emails David and the customer once.

import { json, stripeRequest } from './shop/_lib.js'
import { NOTIFY_EMAIL, esc, sendEmail, stripeGet } from './_deposits.js'
import { pounds } from '../../src/lib/plans.js'

export async function onRequestGet(context) {
  try {
    const id = new URL(context.request.url).searchParams.get('session_id') || ''
    if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(id)) return json({ paid: false }, 400)

    const session = await stripeGet(context, `/checkout/sessions/${encodeURIComponent(id)}`)
    const m = session.metadata || {}
    if (session.payment_status !== 'paid' || !m.plan) return json({ paid: false })

    const total = pounds(session.amount_total)
    const result = { paid: true, plan: m.plan_name, total, email: session.customer_details?.email || session.customer_email, care: m.care_plan, monthly: m.monthly || null }

    // Claim the emails on the session itself, so a refresh of the thank-you
    // page never sends them twice.
    if (m.notified !== '1') {
      const claim = new URLSearchParams({ 'metadata[notified]': '1' })
      await stripeRequest(context, `/checkout/sessions/${encodeURIComponent(id)}`, claim)

      const who = m.business ? `${m.name}, ${m.business}` : m.name
      const monthly = Boolean(m.monthly)
      const rows = [
        ['Package', m.plan_name], monthly
          ? ['Plan', `£${m.monthly} a month + VAT, 12-month minimum`]
          : ['Build price', `£${Number(m.build_price).toLocaleString('en-GB')} + VAT`],
        ['Paid today', monthly ? `${total} (first month + VAT)` : `${total} (50% deposit + VAT)`], ['Name', m.name], ['Business', m.business || '(buying as a consumer)'],
        ['Email', result.email], ['Phone', m.phone], ['What they need', m.notes || '-'], ['Care plan', m.care_plan],
        ['Consumer asked to start now', m.start_now], ['Stripe', session.subscription || session.payment_intent || id],
      ]
      await Promise.all([
        sendEmail(context, NOTIFY_EMAIL, monthly ? `New ${m.plan_name} client: ${who}` : `New deposit: ${total} from ${who}`,
          `<p>${esc(who)} has ${monthly ? 'signed up to' : 'paid the deposit for'} the <b>${esc(m.plan_name)}</b>. Get in touch within one working day.</p>
           <table cellpadding="6">${rows.map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`).join('')}</table>`),
        sendEmail(context, result.email, monthly ? `Welcome to ${m.plan_name}` : `Your deposit for the ${m.plan_name}`,
          (monthly
            ? `<p>Hi ${esc(String(m.name).split(' ')[0])},</p>
           <p>Thanks for signing up to <b>${esc(m.plan_name)}</b>. Your first month of <b>${esc(total)}</b> (£${esc(m.monthly)} + VAT) has been paid, and Stripe will take the same each month. Stripe will send your card receipt separately.</p>
           <p><b>What happens next</b></p>
           <ul><li>We'll be in touch within one working day to plan your website and tell you exactly what we need from you.</li>
           <li>The plan has a 12-month minimum term, then runs month to month on 30 days' notice.</li>
           <li>${esc(m.care_plan)}</li></ul>`
            : `<p>Hi ${esc(String(m.name).split(' ')[0])},</p>
           <p>Thanks for booking the <b>${esc(m.plan_name)}</b>. We've received your deposit of <b>${esc(total)}</b> (50% of the build price, plus VAT). Stripe will send your card receipt separately.</p>
           <p><b>What happens next</b></p>
           <ul><li>We'll be in touch within one working day to plan your build and tell you exactly what we need from you.</li>
           <li>The other 50% of the build price is due before your ${m.plan === 'simple-app' || m.plan === 'booking-app' ? 'app' : 'site'} goes live.</li>
           <li>${esc(m.care_plan)}</li></ul>`)
           + `
           <p>Our <a href="https://dhwebsiteservices.co.uk/services-terms">services terms</a> and <a href="https://dhwebsiteservices.co.uk/refunds">refunds and cancellation policy</a> apply.</p>
           <p>Questions? Reply to this email or call 01443 805303.</p>
           <p>David Hooper and Jack Deane<br>DH Website Services</p>`),
      ])
    }
    return json(result)
  } catch (error) {
    console.error('deposit-confirm', error)
    return json({ paid: false, error: 'We couldn\'t check the payment just now.' }, 500)
  }
}
