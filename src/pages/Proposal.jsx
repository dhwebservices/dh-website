import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'

const money = (n) =>
  `£${Number(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const vatOf = (n, rate) => Math.round(Number(n) * rate * 100) / 100
const gross = (n, rate) => Math.round(Number(n) * (1 + rate) * 100) / 100

export default function Proposal() {
  const { slug } = useParams()
  const vatRate = 0.2
  const [code, setCode] = useState('')
  const [proposal, setProposal] = useState(null)
  const [error, setError] = useState('')
  const [working, setWorking] = useState(false)

  // A proposal is for one client. Keep it out of search results entirely.
  useEffect(() => {
    const tag = document.createElement('meta')
    tag.name = 'robots'
    tag.content = 'noindex, nofollow'
    document.head.appendChild(tag)
    return () => { document.head.removeChild(tag) }
  }, [])

  const unlock = useCallback(async (e) => {
    e?.preventDefault()
    if (!code.trim()) return
    setWorking(true)
    setError('')
    try {
      const res = await fetch('/api/proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, passcode: code }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error || 'That code did not work.')
      } else {
        setProposal(data.proposal)
      }
    } catch {
      setError('Could not reach the server. Try again in a moment.')
    }
    setWorking(false)
  }, [code, slug])

  return (
    <>
      <style>{`
        .pr-wrap { max-width: 900px; margin: 0 auto; padding: 40px 24px 80px; }

        /* ---------- passcode gate ---------- */
        .pr-gate { max-width: 420px; margin: 60px auto 120px; text-align: left; }
        .pr-gate h1 { font-family: var(--font-display); font-size: 28px; letter-spacing: -0.02em; margin: 0 0 8px; color: var(--dark); }
        .pr-gate p { color: var(--mid); margin: 0 0 24px; line-height: 1.6; }
        .pr-gate label { display: block; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--mid); margin-bottom: 8px; }
        .pr-gate input {
          width: 100%; padding: 13px 14px; font-family: var(--font-mono); font-size: 16px;
          letter-spacing: 0.12em; text-transform: uppercase;
          border: 1px solid var(--border); background: var(--white); color: var(--dark); border-radius: 2px;
        }
        .pr-gate input:focus { outline: 2px solid var(--accent); outline-offset: 1px; border-color: var(--accent); }
        .pr-gate button {
          margin-top: 14px; width: 100%; padding: 13px; border: 0; border-radius: 2px;
          background: var(--accent); color: #fff; font-family: var(--font-sans);
          font-size: 15px; font-weight: 600; cursor: pointer;
        }
        .pr-gate button:hover { background: var(--accent-hover); }
        .pr-gate button:disabled { opacity: .6; cursor: default; }
        .pr-err { margin-top: 12px; font-size: 14px; color: var(--accent); }

        /* ---------- document ---------- */
        .pr-doc { background: var(--white); border: 1px solid var(--border); }
        .pr-band { background: var(--dark); color: #fff; padding: 32px 40px 36px; }
        .pr-band-top { display: flex; justify-content: space-between; gap: 24px; padding-bottom: 22px; border-bottom: 1px solid rgba(255,255,255,.16); }
        .pr-firm { font-weight: 600; font-size: 15px; margin: 0; }
        .pr-firm span { display: block; font-weight: 400; font-size: 12.5px; color: var(--light-decor); margin-top: 3px; }
        .pr-contact { text-align: right; font-size: 12.5px; color: var(--light-decor); line-height: 1.6; }
        .pr-contact a { color: var(--light-decor); }
        .pr-kicker { font-family: var(--font-mono); font-size: 11.5px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin: 26px 0 8px; }
        .pr-band h1 { font-family: var(--font-display); font-size: clamp(28px, 5.5vw, 40px); font-weight: 600; letter-spacing: -0.025em; line-height: 1.1; margin: 0; color: #fff; }
        .pr-band .pr-sub { margin: 8px 0 0; color: var(--light-decor); font-size: 15px; }

        .pr-ref { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); border-bottom: 1px solid var(--border); }
        .pr-ref > div { background: var(--white); padding: 13px 16px; }
        .pr-ref dt { font-size: 10.5px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--mid); margin-bottom: 4px; }
        .pr-ref dd { margin: 0; font-family: var(--font-mono); font-size: 13.5px; color: var(--dark); }

        .pr-body { padding: 36px 40px 48px; }
        .pr-sec + .pr-sec { margin-top: 42px; }
        .pr-sec h2 {
          font-family: var(--font-display); font-size: 17px; font-weight: 600; letter-spacing: -0.01em;
          margin: 0 0 16px; padding-bottom: 8px; border-bottom: 2px solid var(--dark);
          display: flex; gap: 12px; align-items: baseline; color: var(--dark);
        }
        .pr-sec h2 .n { font-family: var(--font-mono); font-size: 13px; color: var(--accent); }
        .pr-sec p { margin: 0 0 13px; color: var(--dark2); line-height: 1.65; }
        .pr-sec p:last-child { margin-bottom: 0; }
        .pr-lede { font-size: 16.5px; color: var(--dark) !important; }
        .pr-note { margin-top: 16px; font-size: 14px; color: var(--dark2); border-left: 3px solid var(--accent); padding: 2px 0 2px 14px; line-height: 1.6; }

        .pr-tw { overflow-x: auto; }
        .pr-tw table { width: 100%; border-collapse: collapse; font-size: 14.5px; }
        .pr-tw caption { text-align: left; font-size: 13px; color: var(--mid); padding-bottom: 10px; }
        .pr-tw th, .pr-tw td { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--border-light); vertical-align: top; color: var(--dark2); }
        .pr-tw th { font-size: 10.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--mid); border-bottom: 1px solid var(--border); white-space: nowrap; }
        .pr-tw td:first-child, .pr-tw th:first-child { padding-left: 0; }
        .pr-tw td:last-child, .pr-tw th:last-child { padding-right: 0; }
        .pr-tw tbody tr:last-child td { border-bottom: 0; }
        .pr-pg { font-weight: 600; color: var(--dark); white-space: nowrap; }
        .pr-later { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; color: var(--accent); text-transform: uppercase; white-space: nowrap; }
        .pr-num { text-align: right; font-family: var(--font-mono); font-variant-numeric: tabular-nums; white-space: nowrap; }

        .pr-price th.a, .pr-price td.a { text-align: right; width: 130px; }
        .pr-price th.b, .pr-price td.b { text-align: right; width: 130px; background: var(--accent-soft); border-left: 1px solid var(--accent); border-right: 1px solid var(--accent); }
        .pr-price thead th.b { border-top: 2px solid var(--accent); }
        .pr-price tbody tr:last-child td.b { border-bottom: 2px solid var(--accent); }
        .pr-price .on { font-family: var(--font-mono); color: var(--dark); }
        .pr-price .off { font-family: var(--font-mono); color: var(--light-decor); }
        .pr-optname { display: block; font-size: 13px; letter-spacing: 0.03em; color: var(--dark); }
        .pr-optsub { display: block; font-weight: 400; text-transform: none; letter-spacing: 0; color: var(--mid); font-size: 11.5px; margin-top: 2px; }
        .pr-price th.b .pr-optname { color: var(--accent); }
        .pr-rec { display: inline-block; font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.12em; text-transform: uppercase; color: #fff; background: var(--accent); padding: 2px 6px; margin-bottom: 6px; }
        /* The two figures that actually matter to the client are the one-off
           and the monthly. The first-year total was previously the boldest
           thing on the page, which made a £199 website look like a £742 one. */
        .pr-price tr.hl td { border-top: 2px solid var(--dark); font-weight: 700; color: var(--dark); font-size: 18px; padding-top: 12px; }
        .pr-price tr.hl td.b { border-top: 2px solid var(--accent); color: var(--accent); }
        .pr-price tr.hl2 td { font-weight: 700; color: var(--dark); font-size: 18px; border-bottom: 0; padding-bottom: 12px; }
        .pr-price tr.hl2 td.b { color: var(--accent); }
        .pr-price tr.sub td { font-size: 13px; color: var(--mid); border-top: 1px solid var(--border); padding-top: 10px; }
        .pr-price tr.sub td.b, .pr-price tr.subq td.b { color: var(--mid); }
        .pr-price tr.subq td { font-size: 13px; color: var(--mid); }

        .pr-tl { list-style: none; margin: 0; padding: 0; }
        .pr-tl li { display: grid; grid-template-columns: 62px 1fr; gap: 0 18px; padding-bottom: 22px; position: relative; }
        .pr-tl li:last-child { padding-bottom: 0; }
        .pr-tl .d { font-family: var(--font-mono); font-size: 12px; font-weight: 600; color: var(--accent); background: var(--accent-soft); border: 1px solid var(--accent); height: 30px; display: grid; place-items: center; position: relative; z-index: 1; }
        .pr-tl li:not(:last-child)::after { content: ""; position: absolute; left: 31px; top: 30px; bottom: 0; border-left: 1px dashed var(--border); }
        .pr-tl .t { font-weight: 600; margin: 2px 0 2px; color: var(--dark); font-size: 15px; }
        .pr-tl .b { margin: 0; font-size: 14.5px; color: var(--dark2); line-height: 1.6; }
        .pr-tl .nd { margin: 4px 0 0; font-size: 13px; color: var(--mid); }
        .pr-tl .nd b { color: var(--dark2); }

        .pr-terms { display: grid; gap: 13px; margin: 0; }
        .pr-terms .r { display: grid; grid-template-columns: 160px 1fr; gap: 2px 20px; }
        .pr-terms dt { font-weight: 600; font-size: 14.5px; color: var(--dark); }
        .pr-terms dd { margin: 0; font-size: 14.5px; color: var(--dark2); line-height: 1.6; }

        .pr-accept { margin-top: 42px; border: 1px solid var(--border); border-top: 3px solid var(--accent); padding: 22px 24px 26px; background: var(--off-white); }
        .pr-accept h2 { border-bottom: 0; padding-bottom: 0; margin-bottom: 10px; }
        .pr-cta { display: inline-block; margin-top: 8px; background: var(--accent); color: #fff; padding: 12px 22px; border-radius: 2px; font-weight: 600; font-size: 15px; text-decoration: none; }
        .pr-cta:hover { background: var(--accent-hover); }

        .pr-ex { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--mid); margin-left: 6px; }
        .pr-sign { margin-top: 40px; padding-top: 20px; border-top: 2px solid var(--dark); font-size: 14.5px; }
        .pr-sign p { margin: 0 0 3px; color: var(--dark2); }
        .pr-sign .nm { font-weight: 600; color: var(--dark); }
        .pr-reg { margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--border-light); font-size: 12.5px; color: var(--mid); line-height: 1.6; }

        @media (max-width: 760px) {
          .pr-wrap { padding: 24px 14px 60px; }
          .pr-band { padding: 24px 20px 28px; }
          .pr-body { padding: 26px 20px 36px; }
          .pr-band-top { flex-direction: column; gap: 12px; }
          .pr-contact { text-align: left; }
          .pr-ref { grid-template-columns: repeat(2, 1fr); }
          .pr-terms .r { grid-template-columns: 1fr; }
        }
      `}</style>

      {!proposal ? (
        <div className="pr-wrap">
          <div className="pr-gate">
            <h1>This proposal is private</h1>
            <p>Enter the code from your email to open it. If you have not got one, give me a ring on 07565 362181.</p>
            <form onSubmit={unlock}>
              <label htmlFor="pr-code">Access code</label>
              <input
                id="pr-code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. ABC123"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck="false"
              />
              <button type="submit" disabled={working || !code.trim()}>
                {working ? 'Checking…' : 'Open proposal'}
              </button>
            </form>
            {error && <p className="pr-err">{error}</p>}
          </div>
        </div>
      ) : (
        <div className="pr-wrap">
          <article className="pr-doc">

            <header className="pr-band">
              <div className="pr-band-top">
                <p className="pr-firm">DH Website Services<span>David Hooper · Pontypridd</span></p>
                <div className="pr-contact">
                  07565 362181<br />
                  <a href="mailto:david@dhwebsiteservices.co.uk">david@dhwebsiteservices.co.uk</a><br />
                  dhwebsiteservices.co.uk
                </div>
              </div>
              <p className="pr-kicker">{proposal.title}</p>
              <h1>{proposal.business}</h1>
              <p className="pr-sub">{proposal.location}</p>
            </header>

            <dl className="pr-ref">
              <div><dt>Prepared for</dt><dd>{proposal.client}</dd></div>
              <div><dt>Date</dt><dd>{proposal.date}</dd></div>
              <div><dt>Reference</dt><dd>{proposal.ref}</dd></div>
              <div><dt>Valid until</dt><dd>{proposal.validUntil}</dd></div>
            </dl>

            <div className="pr-body">

              <section className="pr-sec">
                <h2><span className="n">1</span> Summary</h2>
                {proposal.summary.map((p, i) => (
                  <p key={i} className={i === 0 ? 'pr-lede' : undefined}>{p}</p>
                ))}
              </section>

              <section className="pr-sec">
                <h2><span className="n">2</span> What gets built</h2>
                <p>{proposal.scopeNote}</p>
                <div className="pr-tw">
                  <table>
                    <thead><tr><th>Page</th><th>What is on it</th><th>Status</th></tr></thead>
                    <tbody>
                      {proposal.pages.map((pg) => (
                        <tr key={pg.name}>
                          <td className="pr-pg">{pg.name}</td>
                          <td>{pg.what}</td>
                          <td>{pg.later
                            ? <span className="pr-later">Built now, live when food launches</span>
                            : <span style={{ color: 'var(--mid)', fontSize: '13.5px' }}>Live at launch</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="pr-note">{proposal.foodNote}</p>
              </section>

              <section className="pr-sec">
                <h2><span className="n">3</span> Options and pricing</h2>
                <div className="pr-tw">
                  <table className="pr-price">
                    <caption>Same website either way. {proposal.vatNote}</caption>
                    <thead>
                      <tr>
                        <th>Included</th>
                        <th className="a">
                          <span className="pr-optname">{proposal.options.a.name}</span>
                          <span className="pr-optsub">{proposal.options.a.sub}</span>
                        </th>
                        <th className="b">
                          {proposal.options.b.recommended && <span className="pr-rec">Recommended</span>}
                          <span className="pr-optname">{proposal.options.b.name}</span>
                          <span className="pr-optsub">{proposal.options.b.sub}</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {proposal.features.map((f) => (
                        <tr key={f.label}>
                          <td>{f.label}</td>
                          <td className={`a ${f.a ? 'on' : 'off'}`}>{f.a ? 'Yes' : '—'}</td>
                          <td className={`b ${f.b ? 'on' : 'off'}`}>{f.b ? 'Yes' : '—'}</td>
                        </tr>
                      ))}
                      <tr className="hl">
                        <td>To build the site <span className="pr-ex">one-off, ex VAT</span></td>
                        <td className="a pr-num">{money(proposal.options.a.build)}</td>
                        <td className="b pr-num">{money(proposal.options.b.build)}</td>
                      </tr>
                      <tr className="hl2">
                        <td>Then, per month <span className="pr-ex">ex VAT</span></td>
                        <td className="a pr-num">{money(proposal.options.a.monthly)}</td>
                        <td className="b pr-num">{money(proposal.options.b.monthly)}</td>
                      </tr>
                      <tr className="sub">
                        <td>VAT at {Math.round(vatRate * 100)}% on the build</td>
                        <td className="a pr-num">{money(vatOf(proposal.options.a.build, vatRate))}</td>
                        <td className="b pr-num">{money(vatOf(proposal.options.b.build, vatRate))}</td>
                      </tr>
                      <tr className="subq">
                        <td>VAT at {Math.round(vatRate * 100)}% on the monthly</td>
                        <td className="a pr-num">{money(vatOf(proposal.options.a.monthly, vatRate))}</td>
                        <td className="b pr-num">{money(vatOf(proposal.options.b.monthly, vatRate))}</td>
                      </tr>
                      <tr className="subq">
                        <td>For reference: twelve months, inc VAT</td>
                        <td className="a pr-num">{money(gross(proposal.options.a.firstYear, vatRate))}</td>
                        <td className="b pr-num">{money(gross(proposal.options.b.firstYear, vatRate))}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="pr-note">{proposal.priceNote}</p>
              </section>

              <section className="pr-sec">
                <h2><span className="n">4</span> Payment</h2>
                <div className="pr-tw">
                  <table>
                    <thead>
                      <tr><th>Stage</th><th>When</th><th className="pr-num">Option A</th><th className="pr-num">Option B</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Deposit</td><td>On acceptance</td><td className="pr-num">{money(gross(proposal.options.a.deposit, vatRate))}</td><td className="pr-num">{money(gross(proposal.options.b.deposit, vatRate))}</td></tr>
                      <tr><td>Balance</td><td>Day the site goes live</td><td className="pr-num">{money(gross(proposal.options.a.balance, vatRate))}</td><td className="pr-num">{money(gross(proposal.options.b.balance, vatRate))}</td></tr>
                      <tr><td>Monthly</td><td>From launch, twelve month minimum</td><td className="pr-num">{money(gross(proposal.options.a.monthly, vatRate))}</td><td className="pr-num">{money(gross(proposal.options.b.monthly, vatRate))}</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="pr-note">Figures in this table include VAT — they are what the invoice will say. Nothing is payable until you accept, and the balance is not due until the site is live and you are happy with it.</p>
              </section>

              <section className="pr-sec">
                <h2><span className="n">5</span> Timeline</h2>
                <ol className="pr-tl">
                  {proposal.timeline.map((s) => (
                    <li key={s.day}>
                      <div className="d">{s.day}</div>
                      <div>
                        <p className="t">{s.title}</p>
                        <p className="b">{s.body}</p>
                        <p className="nd"><b>From you:</b> {s.need}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="pr-sec">
                <h2><span className="n">6</span> Terms</h2>
                <dl className="pr-terms">
                  {proposal.terms.map((t) => (
                    <div className="r" key={t.t}><dt>{t.t}</dt><dd>{t.d}</dd></div>
                  ))}
                </dl>
              </section>

              <div className="pr-accept">
                <h2><span className="n">7</span> To accept</h2>
                <p>Reply to my email saying <strong>Option A</strong> or <strong>Option B</strong>, or just ring me on 07565 362181. I will send an invoice for the deposit and register the domain the same day.</p>
                <a
                  className="pr-cta"
                  href={`mailto:david@dhwebsiteservices.co.uk?subject=${encodeURIComponent(`${proposal.business} — proposal ${proposal.ref}`)}&body=${encodeURIComponent('Hi David,\n\nHappy to go ahead with Option ___.\n\n')}`}
                >
                  Accept by email
                </a>
              </div>

              <div className="pr-sign">
                <p className="nm">David Hooper</p>
                <p>DH Website Services, Pontypridd</p>
                <p>07565 362181 · <a href="mailto:david@dhwebsiteservices.co.uk">david@dhwebsiteservices.co.uk</a></p>
                {proposal.company && (
                  <p className="pr-reg">
                    {proposal.company.tradingAs} is a trading name of {proposal.company.legalName},
                    registered in England and Wales, company number {proposal.company.companyNumber}.
                    {proposal.company.vatNumber
                      ? ` VAT registration number ${proposal.company.vatNumber}.`
                      : ' VAT registered.'}
                  </p>
                )}
              </div>

            </div>
          </article>
        </div>
      )}
    </>
  )
}
