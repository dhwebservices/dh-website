# Open questions — answer before the campaign goes out

## 1. What does "hosting and domain included" actually cover?

The templates say "hosting and your domain name included" without a term. That
is a commercial commitment with no stated end, and a customer could reasonably
read it as forever.

Decide and write it into the templates. Suggested: **first 12 months included,
then £35/month hosting and the domain at cost.** Whatever it is, it needs to be
in the email — this is the sort of thing that turns into a dispute in month 13.

## 2. The live pricing page contradicts the offer

`/pricing` currently shows Starter at **£449, 2–3 weeks**, and hosting as a
separate monthly plan that is explicitly **not** bundled:

> "Is hosting included in the build price?" — "No — hosting is a separate
> monthly plan."

The email says £224.50, 7 days, hosting and domain included, and links to that
same site. A prospect who clicks through sees a different offer and a direct
contradiction of the bundle.

Fix one of these before sending:

- Put a promo banner on `/pricing` with the half-price prices and the
  4 September end date (the `SiteBanner` component already exists), **or**
- Add a dedicated landing page for the offer and point the email there instead
  of `/contact`, **or**
- Update the FAQ answer for the duration of the promo.

The source of truth is `src/blocks/documents/pricing.js`.

## 3. Is 7-day delivery real at volume?

Seven days is achievable for one Starter site. If twenty land in the same week
it is not, and a missed deadline on the thing you advertised is worse than not
running the offer.

Consider capping it — "first 10 bookings" — or staggering the sends.

## 4. Confirm the postal address

The opt-out footer uses **36b Coedpenmaen Road, Pontypridd, CF37 4LP**, taken
from your Sky broadband enquiry. Confirm that is the right business address to
publish on outbound marketing.

## 5. The list has no email addresses

See `README.md`. Every business in `prospects.csv` was found via web search,
which returns names, addresses and phone numbers but no email addresses.
Directory and Facebook pages could not be opened from this environment to dig
them out. Nothing can be emailed until that column is filled.
