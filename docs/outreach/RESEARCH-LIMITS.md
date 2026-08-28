# Why the list has no email addresses

## The catch-22

Web search surfaces an email address when a page containing it has been
indexed. In practice that page is the business's **own contact page**.

That produces a bind that no amount of searching gets around:

| Segment | Email findable? | Want a website? |
|---|---|---|
| Has a website | **Yes** — contact page is indexed | No, they have one |
| No website | **No** — nothing to index | **Yes, this is the target** |

The businesses whose emails can be found are precisely the ones who do not need
the offer. The target segment is invisible to search by definition — a barber
whose entire presence is a Facebook page has no indexed page carrying an email.

Confirmed across eight searches. Names, addresses and phone numbers come back
reliably; email addresses for no-website businesses never do.

## Why the pages can't just be opened

Facebook, Yell, Cylex, Fresha and the local directories all publish contact
details. None can be opened from this environment:

```
facebook.com          EGRESS_BLOCKED
mbasic.facebook.com   EGRESS_BLOCKED
yell.com              EGRESS_BLOCKED
buttyhut.org          EGRESS_BLOCKED
dhwebsiteservices.co.uk  EGRESS_BLOCKED
```

It is not a Facebook block. The session's egress allowlist covers package
registries (npm, PyPI, crates.io, Go) and the Anthropic API — nothing else.
Our own website is blocked too. Web search works only because it is routed
through the Anthropic API rather than through egress.

**This is an environment setting, chosen when the environment was created, and
it can be changed.** Widening the network policy would allow the directory and
Facebook pages to be read directly, which removes the bottleneck entirely.
See https://code.claude.com/docs/en/claude-code-on-the-web

## The three ways forward

1. **Widen the network policy**, then the no-website list can be researched
   properly, emails and all.
2. **Phone the no-website list.** 11 numbers are already in `prospects.csv`.
   This is also the lawful channel for sole traders (`compliance.md`) and the
   faster one for a 7-day offer.
3. **Email the has-website list a different offer.** `prospects-with-websites.csv`
   holds the businesses whose addresses *are* findable. They will not buy a
   build, but hosting at £35/month, a redesign, or the HR system are all live
   pitches. Note the addresses are `@hotmail.com` / `@gmail.com`, which suggests
   sole traders — check Companies House before emailing, or phone instead.
