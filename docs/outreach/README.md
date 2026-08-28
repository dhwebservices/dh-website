# Pontypridd "no website" outreach campaign

Assets for outreach to Pontypridd-area businesses that have no website of their
own, built around the half-price 7-day offer (ends **4 September 2026**).

| File | Purpose |
|---|---|
| `OPEN-QUESTIONS.md` | **Read first.** Five things to settle before sending. |
| `compliance.md` | Who may be emailed vs phoned. |
| `templates.md` | Initial email, follow-up, and a phone script. |
| `prospects.csv` | The list. 18 businesses, phones only — no emails yet. |

## Status: not sendable yet

`prospects.csv` has **18 real businesses and 11 phone numbers, but zero email
addresses.** They were found by web search, which returns names, addresses and
phone numbers; it does not return email addresses. The pages that would have
them — Facebook, Yell, Cylex, Fresha, the local directories — could not be
opened from the environment this list was built in.

Addresses must not be guessed from business names. Invented `info@` addresses
bounce, and bounces from `dhwebsiteservices.co.uk` degrade deliverability for
client mail, not just outreach.

**To unblock:** open each business's Google Business Profile or Facebook
"About" tab, copy the published address into the `email` column, and note where
it came from in `email_source`. Roughly a minute each.

Also note the rows are drawn from search-result summaries and are **unverified**
— confirm the name, phone and no-website status before contacting anyone.

## Two channels

Under PECR, sole traders cannot lawfully be cold-emailed; registered companies
can. Most of this list will be sole traders, so **phone is the main channel**
and email is the smaller one. See `compliance.md`. For a 7-day offer, phone is
the faster route anyway — use the script in `templates.md`.

## Workflow

1. Settle `OPEN-QUESTIONS.md`.
2. Check Companies House per row, set `companies_house_status`, set `channel`.
3. Fill `email` and `email_source` for the Ltd/LLP rows.
4. Write a true, specific `observation` per row. No observation, no contact.
5. Generate drafts, review every one, then send. Log `sent_date` and `outcome`.
6. Honour opt-outs immediately and permanently.

Send from `David@dhwebsiteservices.co.uk`, capped at ~20–30/day.

## prospects.csv columns

- `web_presence` — `facebook_only`, `fresha_only`, `directory_only`,
  `builder_site_ueni`, `chain_listing`. Anything with a real site of its own is
  dropped from the list.
- `companies_house_status` — `ltd`, `llp`, `sole_trader`, `unchecked`. Decides
  the channel.
- `email_source` — where the address was published. Required; no source, no email.
- `channel` — `email` for Ltd/LLP, `phone` for sole traders.
- `outcome` — `no_reply`, `replied`, `call_booked`, `won`, `unsubscribed`.
