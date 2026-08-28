# Pontypridd "no website" outreach campaign

Assets for cold B2B outreach to Pontypridd-area businesses that have no website.

| File | Purpose |
|---|---|
| `compliance.md` | The rules that decide who we may email. Read first. |
| `prospects.csv` | The list. One row per business. Empty until researched. |
| `templates.md` | Initial email + two follow-ups, with merge fields. |

## Workflow

1. Research businesses into `prospects.csv` (see `compliance.md` for who qualifies).
2. Verify each address is genuinely published by the business itself.
3. Generate drafts from `templates.md`, review every one, then send.
4. Log the send date and any reply in the CSV. Honour opt-outs immediately.

Send from `David@dhwebsiteservices.co.uk`. Cap at ~20–30/day so the domain's
sending reputation is not damaged — a spam-trap hit or a burst of bounces will
affect deliverability of client mail too.

## prospects.csv columns

- `companies_house_status` — `ltd`, `llp`, or `sole_trader`. Decides the channel.
- `has_website` — `no`, `facebook_only`, `directory_only`, `yes` (drop these).
- `email_source` — where the address was published. Required; no source, no email.
- `channel` — `email` for Ltd/LLP, `phone` or `post` for sole traders.
- `outcome` — `no_reply`, `replied`, `call_booked`, `won`, `unsubscribed`.
