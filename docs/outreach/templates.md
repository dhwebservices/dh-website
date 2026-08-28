# Email templates

Merge fields: `{{business}}`, `{{first_name}}`, `{{trade}}`, `{{observation}}`.

`{{observation}}` is the one specific, true thing you noticed — the reason this
is not a mass mailshot. Examples:

- "your Google listing has 47 reviews averaging 4.8, but no site to send people to"
- "you're taking bookings through Facebook DMs"
- "your listing shows a phone number but no opening hours"

If you cannot write a true `{{observation}}` for a prospect, do not email them.
That sentence is the difference between outreach and spam.

---

## 1. Initial email

**Subject:** `A website for {{business}}`

> Hi {{first_name}},
>
> I run DH Website Services, based on Coedpenmaen Road in Pontypridd — we build
> websites for local businesses.
>
> I came across {{business}} and noticed {{observation}}. For a {{trade}} in
> Ponty, that's usually the gap between someone finding you and someone calling
> a competitor who turns up first on Google.
>
> Our Starter package is £449: a five-page site, mobile-friendly, contact form,
> Google Maps, SSL and basic SEO — live in two to three weeks. Hosting and
> upkeep is £35/month if you want us to look after it, or you can take the site
> and run it yourself.
>
> If it's useful, I'm happy to have a quick fifteen-minute call and tell you
> honestly whether it's worth it for you — no charge and no hard sell. You can
> pick a time here: https://www.dhwebsiteservices.co.uk/contact
>
> Or just reply and I'll answer any questions.
>
> Best,
> David Hooper
> Director, DH Website Services
> 02920 024218 · 07364 166285
> www.dhwebsiteservices.co.uk
>
> ---
> If you'd rather not hear from us again, just reply "unsubscribe" and we'll
> remove you from our list straight away.
> DH Website Services, 36b Coedpenmaen Road, Pontypridd, CF37 4LP

---

## 2. Follow-up (send 5–7 days later, only if no reply)

**Subject:** `Re: A website for {{business}}` — reply in the original thread

> Hi {{first_name}},
>
> Just closing the loop on my note from last week.
>
> If a website isn't a priority right now, that's completely fair — plenty of
> businesses do fine without one. If it's more that you're not sure what it
> would involve or cost, the fifteen-minute call is genuinely just that, and I'm
> as likely to tell you to wait as to sell you something.
>
> Either way I won't chase you again after this.
>
> https://www.dhwebsiteservices.co.uk/contact
>
> Best,
> David Hooper
> Director, DH Website Services
> 02920 024218
>
> ---
> If you'd rather not hear from us again, just reply "unsubscribe" and we'll
> remove you from our list straight away.
> DH Website Services, 36b Coedpenmaen Road, Pontypridd, CF37 4LP

**Two emails is the limit.** No reply after the follow-up means they go on the
suppression list.

---

## Package reference

Pulled from `src/blocks/documents/pricing.js` — keep in sync if pricing changes.

**Builds (one-off)**

| Package | Price | Delivery | Headline |
|---|---|---|---|
| Starter | £449 | 2–3 weeks | 5 pages, mobile, SEO basics, contact form, Maps, SSL |
| Growth | £999 | 3–4 weeks | 10 pages, blog, full SEO, branding, Analytics |
| Pro | £1,499 | 4–6 weeks | 15 pages, e-commerce ready, integrations, priority support |
| Enterprise + HR | £2,499 | 6–8 weeks | Full site with integrated HR portal |

**Hosting (monthly):** Starter £35 · Professional £65 · Business £109

**HR:** Add-on £1,200 · Standalone £1,800 · Maintenance £49/mo

Staged payments are available on larger projects — worth mentioning if price is
the objection.

**Lead with Starter.** A business with no website at all is not buying a £1,499
package on a cold email. Starter is the plausible first step; the rest is an
upsell once they trust you.
