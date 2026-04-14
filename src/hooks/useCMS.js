import { useState, useEffect } from 'react'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../lib/siteConfig'

const DEFAULTS = {
  hero: {
    headline: 'Elevate Your Digital Presence',
    subheadline: 'Modern, high-performance websites built for growth. From concept to deployment, we deliver excellence with full functionality and strategic design.',
    cta_primary: 'View Pricing',
    cta_secondary: 'Start a Project',
    pill1: '⚡ Lightning Fast',
    pill2: '✓ Fully Functional',
    pill3: '🚀 Ready to Deploy',
  },
  banner: {
    enabled: false,
    bars: [
      {
        id: 1,
        text: 'First month free on Starter plans',
        link: '',
        link_text: '',
        bg_color: '#1a1a2e',
        text_color: '#ffffff',
        pages: ['home', 'services', 'pricing', 'contact', 'careers'],
        size: 'normal',
      },
    ],
  },
  services: [
    { icon: '💻', title: 'Custom Web Development', desc: 'Tailored solutions built from the ground up for your unique business needs. Production-ready code, not templates.', color: 'var(--cyan)' },
    { icon: '🎨', title: 'User-Centric Design', desc: 'Beautiful interfaces that engage visitors and drive conversions. Every pixel intentional, every interaction purposeful.', color: 'var(--purple2)' },
    { icon: '🛠', title: 'Full Support & Maintenance', desc: "Ongoing maintenance to keep your site running at peak performance. We're here long after launch.", color: 'var(--green)' },
    { icon: '👥', title: 'HR System Integration', desc: 'Full HR portal built into your website — onboarding, leave, payslips, timesheets and more.', color: 'var(--amber)' },
  ],
  pricing: {
    builds: [
      { name: 'Starter', price: 449, delivery: '2–3 weeks', revisions: '1 round', badge: '', features: ['5-page professional website', 'Mobile responsive design', 'Basic SEO setup', 'Contact form', 'Google Maps embed', 'SSL certificate'] },
      { name: 'Growth', price: 999, delivery: '3–4 weeks', revisions: '2 rounds', badge: 'Most Popular', features: ['10-page website', 'Blog section', 'Full SEO setup', 'Branding integration', 'Google Analytics', 'Social media links', 'SSL certificate'] },
      { name: 'Pro', price: 1499, delivery: '4–6 weeks', revisions: '3 rounds', badge: '', features: ['15 pages', 'E-commerce ready', 'Custom integrations', 'Advanced SEO', 'Blog/News section', 'Priority support', 'SSL certificate'] },
      { name: 'Enterprise + HR', price: 2499, delivery: '6–8 weeks', revisions: '3 rounds', badge: 'Most Complete', features: ['Full enterprise website', 'Integrated HR system', 'Staff onboarding portal', 'Leave & timesheet management', 'SEO & branding', 'Content creation'] },
    ],
    hosting: [
      { name: 'Starter', price: 35, badge: '', features: ['1 content update/month', '48–72hr support response', 'Weekly backups', 'Uptime monitoring'] },
      { name: 'Professional', price: 65, badge: 'Most Popular', features: ['3 content updates/month', 'Priority support', 'Weekly backups', 'SEO health check', 'Uptime monitoring'] },
      { name: 'Business', price: 109, badge: '', features: ['Unlimited content updates', 'Priority support', 'Weekly backups', 'Weekly performance tuning', 'Quarterly strategy review'] },
    ],
  },
  faq: [
    { q: 'Do you offer payment plans?', a: 'Yes — we can arrange staged payments for larger projects. Get in touch to discuss what works for you.' },
    { q: 'What happens after the project is delivered?', a: 'You get a handover call, access to all files, and ongoing support through one of our hosting & maintenance plans.' },
    { q: 'Can I upgrade my package later?', a: 'Absolutely. Many clients start on Starter and grow into Growth or Pro as their business scales.' },
    { q: 'Is hosting included in the build price?', a: "No — hosting is a separate monthly plan. This keeps things flexible so you're not locked into a bundle you don't need." },
    { q: 'Do you work with clients outside Wales / the UK?', a: 'Yes, we work with clients across the UK and internationally. Everything is done remotely.' },
  ],
  contact: {
    email: 'clients@dhwebsiteservices.co.uk',
    phone: '029 2002 4218',
    location: 'Cardiff, United Kingdom',
    response_time: 'Within 24 hours',
    hours_weekday: '9:00 AM – 5:00 PM GMT',
    hours_weekend: 'Next business day',
  },
}

export function useCMS(section) {
  const [data, setData] = useState(DEFAULTS[section] || null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/website_content?section=eq.${section}&limit=1`,
          { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
        )
        const rows = await res.json()
        if (rows?.[0]?.content) setData(rows[0].content)
      } catch { /* use defaults */ }
      setLoading(false)
    }
    fetch_()
  }, [section])

  return { data, loading }
}
