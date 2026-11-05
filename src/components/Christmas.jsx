/**
 * Christmas designs.
 *
 * Three looks that dress the real site rather than replace it: every page, the
 * nav and the footer keep their own content. A look is switched on with
 * ?xmas=wrapped | midnight | jumper and remembered for the tab, so David can
 * click around the whole site in one design. ?xmas=off clears it.
 *
 * XMAS_DEFAULT is what everyone sees with no query string. David picked
 * Midnight on 4 Nov 2026. Set it back to null after Christmas to switch off.
 *
 * Everything here is decoration: pointer-events are off, nothing moves the
 * layout, and prefers-reduced-motion stops all of the animation.
 */

import { createContext, useContext, useEffect, useRef, useState } from 'react'

export const XMAS_THEMES = [
  { id: 'wrapped', name: 'Wrapped' },
  { id: 'midnight', name: 'Midnight' },
  { id: 'jumper', name: 'Jumper' },
]
export const XMAS_DEFAULT = 'midnight'

const KEY = 'dh-xmas'
const valid = (id) => XMAS_THEMES.some((t) => t.id === id)

function initialTheme() {
  if (typeof window === 'undefined') return { theme: XMAS_DEFAULT, preview: false }
  try {
    const q = new URLSearchParams(window.location.search).get('xmas')
    if (q !== null) {
      sessionStorage.setItem(KEY, q)
      return { theme: valid(q) ? q : null, preview: true }
    }
    const saved = sessionStorage.getItem(KEY)
    if (saved !== null) return { theme: valid(saved) ? saved : null, preview: true }
  } catch {
    /* storage blocked: fall through to the default */
  }
  return { theme: XMAS_DEFAULT, preview: false }
}

const XmasContext = createContext(null)
export const useXmas = () => useContext(XmasContext)

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Canvas work waits until the page has loaded and the browser is idle, so the
// decoration never competes with the content for the first paint.
function afterLoad(fn) {
  let id = 0, done = false
  const run = () => { if (!done) { done = true; fn() } }
  const idle = () => { id = window.requestIdleCallback ? window.requestIdleCallback(run, { timeout: 1500 }) : window.setTimeout(run, 200) }
  if (document.readyState === 'complete') idle()
  else window.addEventListener('load', idle, { once: true })
  return () => { done = true; window.removeEventListener('load', idle); if (window.cancelIdleCallback) window.cancelIdleCallback(id); window.clearTimeout(id) }
}

export function XmasProvider({ children }) {
  const [{ theme, preview }, setState] = useState(initialTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme) root.dataset.xmas = theme
    else delete root.dataset.xmas
    if (theme === 'jumper') {
      root.style.setProperty('--knit-band', `url(${knitBand()})`)
      root.style.setProperty('--knit-green', `url(${knitPlain('#16502F', '#0F3B22')})`)
      root.style.setProperty('--knit-red', `url(${knitPlain('#B70F2B', '#8A0A20')})`)
    }
  }, [theme])

  const choose = (id) => {
    try { sessionStorage.setItem(KEY, id || 'off') } catch { /* ignore */ }
    setState({ theme: valid(id) ? id : null, preview: true })
  }

  return (
    <XmasContext.Provider value={theme}>
      {children}
      {theme && <SnowOverlay theme={theme} />}
      {theme && <NavLights />}
      {preview && <Switcher theme={theme} choose={choose} />}
    </XmasContext.Provider>
  )
}

/* ── Preview switcher ────────────────────────────────────────────────────── */

function Switcher({ theme, choose }) {
  return (
    <div className="xmas-switcher" role="group" aria-label="Christmas design">
      <span>Christmas design</span>
      {XMAS_THEMES.map((t) => (
        <button key={t.id} type="button" aria-pressed={theme === t.id} onClick={() => choose(t.id)}>{t.name}</button>
      ))}
      <button type="button" aria-pressed={!theme} onClick={() => choose(null)}>Off</button>
    </div>
  )
}

/* ── Snow over the whole page, settling on the menu bar ──────────────────── */

function SnowOverlay({ theme }) {
  const ref = useRef(null)
  useEffect(() => {
    const cv = ref.current
    const ctx = cv.getContext('2d')
    const still = reducedMotion()
    let W = 0, H = 0, D = 1, raf = 0, flakes = [], drift = new Float32Array(0), navH = 52
    const tint = theme === 'midnight' ? null : 'rgba(120,140,165,0.35)'

    const size = () => {
      W = window.innerWidth; H = window.innerHeight; D = Math.min(2, window.devicePixelRatio || 1)
      cv.width = W * D; cv.height = H * D; ctx.setTransform(D, 0, 0, D, 0, 0)
      const n = Math.round((W * H) / 9000)
      flakes = Array.from({ length: n }, () => { const d = Math.random(); return { x: Math.random() * W, y: Math.random() * H, d, r: 0.8 + d * 2.4, ph: Math.random() * 6.28 } })
      const old = drift; drift = new Float32Array(Math.ceil(W)); drift.set(old.subarray(0, Math.min(old.length, drift.length)))
      navH = document.querySelector('.site-header')?.getBoundingClientRect().bottom || 52
    }

    const deposit = (x, amt) => {
      for (let d = -5; d <= 5; d++) { const i = x + d; if (i >= 0 && i < drift.length) drift[i] = Math.min(6, drift[i] + amt * Math.exp(-(d * d) / 8)) }
    }
    const relax = () => {
      for (let i = 1; i < drift.length - 1; i++) {
        const a = drift[i] - drift[i - 1]; if (a > 1.2) { const m = (a - 1.2) / 2; drift[i] -= m; drift[i - 1] += m }
        const b = drift[i] - drift[i + 1]; if (b > 1.2) { const m = (b - 1.2) / 2; drift[i] -= m; drift[i + 1] += m }
      }
    }
    // the page opens with a little snow already on the bar
    const seed = () => { for (let k = 0; k < 500; k++) deposit(Math.floor(Math.random() * drift.length), 0.6); for (let r = 0; r < 8; r++) relax() }

    const onMove = (e) => {
      if (Math.abs(e.clientY - navH) > 40) return
      for (let i = Math.max(0, Math.floor(e.clientX - 26)); i < Math.min(drift.length, e.clientX + 26); i++) drift[i] = 0
    }

    const frame = (t) => {
      ctx.clearRect(0, 0, W, H)
      const wind = Math.sin(t / 4800) * 0.5
      for (const f of flakes) {
        if (!still) {
          f.y += 0.35 + f.d * 1.15; f.x += wind * (0.3 + f.d) + Math.sin(t / 1400 + f.ph) * 0.3
          if (f.d > 0.45 && f.y > navH - drift[Math.floor(f.x)] - 2 && f.y < navH + 4 && f.x > 0 && f.x < W) { deposit(Math.floor(f.x), 0.5 + f.d * 0.5); f.y = -6; f.x = Math.random() * W }
          if (f.y > H + 6) { f.y = -6; f.x = Math.random() * W }
          if (f.x > W + 6) f.x = -6; if (f.x < -6) f.x = W + 6
        }
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.283)
        ctx.fillStyle = '#FFFFFF'; ctx.globalAlpha = 0.55 + f.d * 0.45; ctx.fill()
        if (tint) { ctx.globalAlpha = 1; ctx.strokeStyle = tint; ctx.lineWidth = 0.8; ctx.stroke() }
      }
      ctx.globalAlpha = 1
      // the drift along the bottom edge of the menu bar
      if (!still) relax()
      ctx.beginPath(); ctx.moveTo(0, navH)
      for (let x = 0; x < drift.length; x += 2) ctx.lineTo(x, navH - drift[x])
      ctx.lineTo(W, navH); ctx.lineTo(W, navH + 2); ctx.lineTo(0, navH + 2); ctx.closePath()
      ctx.fillStyle = '#FFFFFF'; ctx.fill()
      ctx.strokeStyle = 'rgba(120,140,165,0.35)'; ctx.lineWidth = 1; ctx.stroke()
      if (!still) raf = requestAnimationFrame(frame)
    }

    const cancelStart = afterLoad(() => { size(); seed(); frame(0) })
    const onResize = () => size()
    const onScroll = () => { navH = document.querySelector('.site-header')?.getBoundingClientRect().bottom || 52 }
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onMove)
    const vis = () => { cancelAnimationFrame(raf); if (!document.hidden && !still) raf = requestAnimationFrame(frame) }
    document.addEventListener('visibilitychange', vis)
    return () => {
      cancelStart(); cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize); window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onMove); document.removeEventListener('visibilitychange', vis)
    }
  }, [theme])
  return <canvas ref={ref} className="xmas-snow" aria-hidden="true" />
}

/* ── A string of lights hanging under the menu bar ───────────────────────── */

function NavLights() {
  const [w, setW] = useState(typeof window === 'undefined' ? 1200 : window.innerWidth)
  useEffect(() => { const r = () => setW(window.innerWidth); window.addEventListener('resize', r); return () => window.removeEventListener('resize', r) }, [])
  const sags = Math.max(2, Math.round(w / 360)), seg = w / sags
  let d = 'M0 2'
  for (let i = 0; i < sags; i++) d += ` Q${seg * i + seg / 2} 30 ${seg * (i + 1)} 2`
  // place bulbs along each quadratic sag
  const bulbs = []
  const per = Math.max(5, Math.round(seg / 42))
  const cols = ['#E8213F', '#F2B33D', '#2FA866', '#3B8FE0', '#FFF1CC']
  for (let i = 0; i < sags; i++) for (let k = 1; k < per; k++) {
    const t = k / per, x0 = seg * i, x1 = seg * (i + 1), cx = x0 + seg / 2
    const x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x1
    const y = (1 - t) * (1 - t) * 2 + 2 * (1 - t) * t * 30 + t * t * 2
    bulbs.push({ x, y, c: cols[(i * per + k) % cols.length], n: i * per + k })
  }
  return (
    <svg className="xmas-lights" viewBox={`0 0 ${w} 44`} preserveAspectRatio="none" aria-hidden="true">
      <path d={d} stroke="#2A2F35" strokeWidth="1.5" fill="none" />
      {bulbs.map((b) => (
        <g key={b.n} transform={`translate(${b.x.toFixed(1)} ${b.y.toFixed(1)})`}>
          <rect x="-2.4" y="-1" width="4.8" height="4" rx="1" fill="#3A3F45" />
          <g className="xmas-bulb" style={{ animationDelay: `${-(b.n * 0.37) % 2.4}s` }}>
            <circle cy="9" r="9" fill={b.c} opacity="0.22" />
            <ellipse cy="9" rx="3.6" ry="5.6" fill={b.c} />
            <ellipse cx="-1.2" cy="7" rx="1" ry="1.8" fill="#fff" opacity="0.6" />
          </g>
        </g>
      ))}
    </svg>
  )
}

/* ── Hero decorations, one per look ──────────────────────────────────────── */

export function XmasHero() {
  const theme = useXmas()
  if (theme === 'wrapped') return <WrappedHero />
  if (theme === 'midnight') return <NightScene />
  if (theme === 'jumper') return <JumperHero />
  return null
}

function Bow({ tag = true }) {
  return (
    <svg width="230" height="300" viewBox="-115 -90 230 300" className="xmas-bowsvg">
      <defs>
        <linearGradient id="xgl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F7DFA2" /><stop offset=".45" stopColor="#E2B65C" /><stop offset="1" stopColor="#9C6F1F" /></linearGradient>
        <linearGradient id="xgr" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F7DFA2" /><stop offset=".5" stopColor="#D9A848" /><stop offset="1" stopColor="#8E6419" /></linearGradient>
        <radialGradient id="xgk" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#FBE7B4" /><stop offset=".6" stopColor="#D7A443" /><stop offset="1" stopColor="#94681C" /></radialGradient>
      </defs>
      {tag && (
        <g className="xmas-tag">
          <path d="M18 14 C24 60 30 92 30 112" stroke="#B8862F" strokeWidth="1.6" fill="none" />
          <g transform="translate(30 112) rotate(-8)">
            <path d="M-36 0 L36 0 L52 18 L52 78 Q52 84 46 84 L-46 84 Q-52 84 -52 78 L-52 18 Z" fill="#FFFDF8" stroke="#E7DCC8" />
            <circle cx="0" cy="12" r="4.5" fill="#C8102E" />
            <text x="0" y="40" textAnchor="middle" fontFamily="Archivo, Arial, sans-serif" fontWeight="800" fontSize="13" fill="#C8102E">Nadolig Llawen</text>
            <text x="0" y="58" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="10.5" fill="#4A5058">Merry Christmas</text>
            <text x="0" y="73" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="10.5" fontWeight="600" fill="#4A5058">from David &amp; Jack</text>
          </g>
        </g>
      )}
      <g className="xmas-bow">
        <path d="M-6 6 C-30 40 -44 70 -40 96 L-22 88 L-14 104 C-16 70 -8 34 4 10 Z" fill="url(#xgr)" />
        <path d="M6 6 C30 40 46 66 44 92 L26 86 L20 102 C18 70 10 34 -2 10 Z" fill="url(#xgl)" />
        <path d="M-4 -2 C-40 -60 -104 -50 -96 -10 C-90 20 -40 18 -4 6 Z" fill="url(#xgl)" />
        <path d="M-10 0 C-40 -36 -82 -34 -80 -12 C-78 6 -42 8 -10 3 Z" fill="#7E5512" opacity=".35" />
        <path d="M4 -2 C40 -60 104 -50 96 -10 C90 20 40 18 4 6 Z" fill="url(#xgr)" />
        <path d="M10 0 C40 -36 82 -34 80 -12 C78 6 42 8 10 3 Z" fill="#7E5512" opacity=".35" />
        <path d="M-70 -34 C-56 -46 -36 -40 -22 -22" stroke="#FFF3CF" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".7" />
        <ellipse cx="0" cy="2" rx="17" ry="15" fill="url(#xgk)" />
      </g>
    </svg>
  )
}

function WrappedHero() {
  return (
    <div className="xmas-wrap" aria-hidden="true">
      <div className="xmas-ribbon xmas-ribbon--v" />
      <div className="xmas-ribbon xmas-ribbon--h" />
      <div className="xmas-bowpos"><Bow /></div>
    </div>
  )
}

function JumperHero() {
  return (
    <div className="xmas-jumper" aria-hidden="true">
      <div className="xmas-knitband xmas-knitband--top" />
      <div className="xmas-knitband xmas-knitband--bottom" />
    </div>
  )
}

/* ── Inner page heroes ───────────────────────────────────────────────────── */

export function XmasPageHero() {
  const theme = useXmas()
  if (theme === 'wrapped') return <div className="xmas-wrap" aria-hidden="true"><div className="xmas-ribbon xmas-ribbon--v xmas-ribbon--page" /></div>
  if (theme === 'midnight') return <div className="xmas-pagenight" aria-hidden="true"><RoofLine /></div>
  if (theme === 'jumper') return <div className="xmas-jumper" aria-hidden="true"><div className="xmas-knitband xmas-knitband--bottom" /></div>
  return null
}

/* ── Footer band ─────────────────────────────────────────────────────────── */

export function XmasFooterBand() {
  const theme = useXmas()
  if (!theme) return null
  return (
    <div className={`xmas-footband xmas-footband--${theme}`}>
      {theme === 'wrapped' && <><div className="xmas-ribbon xmas-ribbon--foot" aria-hidden="true" /><div className="xmas-footbow" aria-hidden="true"><Bow tag={false} /></div></>}
      {theme === 'midnight' && <RoofLine />}
      {theme === 'jumper' && <div className="xmas-knitband" aria-hidden="true" />}
      <p className="xmas-footnote">
        <strong>Christmas opening:</strong> closed Wednesday 24 December to Thursday 1 January, back on Friday 2 January. Live websites and apps keep running. Nadolig Llawen.
      </p>
    </div>
  )
}

function RoofLine() {
  // A snowy terrace roofline with lit windows, drawn once on resize.
  const ref = useRef(null)
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d')
    const draw = () => {
      const W = cv.clientWidth, H = 120, D = Math.min(2, window.devicePixelRatio || 1)
      cv.width = W * D; cv.height = H * D; ctx.setTransform(D, 0, 0, D, 0, 0); ctx.clearRect(0, 0, W, H)
      let s = 11; const rand = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646 }
      let x = 0
      while (x < W) {
        const hw = 30, top = 52 + Math.sin(x / 140) * 10
        ctx.fillStyle = '#0D1B30'; ctx.fillRect(x, top, hw, H - top)
        ctx.beginPath(); ctx.moveTo(x - 1, top); ctx.lineTo(x + hw / 2, top - 11); ctx.lineTo(x + hw + 1, top); ctx.fill()
        ctx.fillStyle = '#EEF4FA'; ctx.beginPath(); ctx.moveTo(x - 2, top + 1); ctx.lineTo(x + hw / 2, top - 13); ctx.lineTo(x + hw + 2, top + 1); ctx.lineTo(x + hw / 2, top - 7); ctx.fill()
        if (rand() < 0.5) { ctx.fillStyle = '#0D1B30'; ctx.fillRect(x + 21, top - 16, 5, 10); ctx.fillStyle = '#EEF4FA'; ctx.fillRect(x + 20, top - 18, 7, 3) }
        for (const [wx, wy] of [[x + 5, top + 9], [x + 18, top + 9], [x + 5, top + 26]]) {
          if (rand() < 0.6) { ctx.fillStyle = 'rgba(255,196,107,.2)'; ctx.fillRect(wx - 2, wy - 2, 11, 13); ctx.fillStyle = '#FFC46B'; ctx.fillRect(wx, wy, 7, 9) }
        }
        x += hw
      }
      ctx.fillStyle = '#081426'; ctx.fillRect(0, H - 22, W, 22)
    }
    draw(); window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [])
  return <canvas ref={ref} className="xmas-roofline" aria-hidden="true" />
}

/* ── Midnight: a snowy night over Pontypridd behind the home hero ────────── */

function NightScene() {
  const ref = useRef(null)
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d'), still = reducedMotion()
    let W = 0, H = 0, D = 1, raf = 0, layers = null, windows = [], chimneys = [], smoke = [], lamps = [], treeLights = [], moon = { x: 0, y: 0 }
    const rnd = (a, b) => a + Math.random() * (b - a)
    const seeded = (n) => () => { n = (n * 16807) % 2147483647; return (n - 1) / 2147483646 }
    const ridge = (x, base, amp, s1, s2, ph) => base + Math.sin(x * s1 + ph) * amp + Math.sin(x * s2 + ph * 1.7) * amp * 0.45

    const layer = () => { const c = document.createElement('canvas'); c.width = W * D; c.height = H * D; const g = c.getContext('2d'); g.scale(D, D); return [c, g] }

    const build = () => {
      const r = cv.getBoundingClientRect(); W = Math.max(320, r.width); H = Math.max(400, r.height); D = Math.min(2, window.devicePixelRatio || 1)
      cv.width = W * D; cv.height = H * D; ctx.setTransform(D, 0, 0, D, 0, 0)
      const narrow = W < 760
      // sky
      const [sky, s] = layer()
      const gr = s.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#040A16'); gr.addColorStop(0.55, '#0B1C36'); gr.addColorStop(1, '#173257'); s.fillStyle = gr; s.fillRect(0, 0, W, H)
      const rs = seeded(7)
      for (let i = 0; i < (W * H) / 2600; i++) { const v = rs(); s.globalAlpha = 0.25 + v * 0.6; s.fillStyle = '#fff'; s.beginPath(); s.arc(rs() * W, rs() * H * 0.6, v > 0.95 ? 1.4 : v * 0.9 + 0.2, 0, 6.283); s.fill() }
      s.globalAlpha = 1
      moon = narrow ? { x: W * 0.86, y: 70 } : { x: W * 0.84, y: Math.min(200, H * 0.22) + 40 }
      const mg = s.createRadialGradient(moon.x, moon.y, 20, moon.x, moon.y, 240); mg.addColorStop(0, 'rgba(255,236,196,.33)'); mg.addColorStop(1, 'rgba(255,236,196,0)'); s.fillStyle = mg; s.fillRect(moon.x - 240, moon.y - 240, 480, 480)
      s.fillStyle = '#F7EFD8'; s.beginPath(); s.arc(moon.x, moon.y, narrow ? 20 : 44, 0, 6.283); s.fill()
      s.fillStyle = 'rgba(200,184,146,.45)'; for (const [dx, dy, rr] of [[-12, -8, 7], [10, 6, 9], [-4, 16, 5]]) { s.beginPath(); s.arc(moon.x + dx * (narrow ? 0.45 : 1), moon.y + dy * (narrow ? 0.45 : 1), rr * (narrow ? 0.45 : 1), 0, 6.283); s.fill() }
      // hills
      const [far, f] = layer()
      const range = (base, amp, s1, s2, ph, top, bottom) => {
        f.beginPath(); f.moveTo(0, H); for (let x = 0; x <= W; x += 6) f.lineTo(x, ridge(x, base, amp, s1, s2, ph)); f.lineTo(W, H); f.closePath()
        const g = f.createLinearGradient(0, base - amp * 2, 0, base + 220); g.addColorStop(0, top); g.addColorStop(1, bottom); f.fillStyle = g; f.fill()
        const rt = seeded(Math.floor(ph * 100))
        for (let t = 0; t < W / 14; t++) { const tx = rt() * W, ty = ridge(tx, base, amp, s1, s2, ph) + 6 + rt() * 70, z = 3 + rt() * 5; f.fillStyle = 'rgba(8,18,34,.7)'; f.beginPath(); f.moveTo(tx - z * 0.6, ty); f.lineTo(tx, ty - z * 1.8); f.lineTo(tx + z * 0.6, ty); f.fill() }
        f.beginPath(); for (let x = 0; x <= W; x += 6) { const y = ridge(x, base, amp, s1, s2, ph); x ? f.lineTo(x, y) : f.moveTo(x, y) } f.strokeStyle = 'rgba(235,243,252,.55)'; f.lineWidth = 1.5; f.stroke()
      }
      range(H - 360, 40, 0.0032, 0.009, 1.1, '#7F93B3', '#203A5E')
      range(H - 290, 30, 0.0045, 0.013, 2.4, '#5D7699', '#16304F')
      // terraces
      const [mid, m] = layer(); const rm = seeded(42); windows = []; chimneys = []
      const base = H - 215, amp = 22, ph = 3.3
      m.beginPath(); m.moveTo(0, H); for (let x = 0; x <= W; x += 6) m.lineTo(x, ridge(x, base, amp, 0.006, 0.017, ph)); m.lineTo(W, H); m.closePath()
      const mgd = m.createLinearGradient(0, base - 40, 0, H); mgd.addColorStop(0, '#3E5679'); mgd.addColorStop(0.4, '#142A47'); mgd.addColorStop(1, '#0B1A30'); m.fillStyle = mgd; m.fill()
      const walls = ['#1A2A44', '#22324D', '#1D2B3F', '#2A3350', '#202E46']
      for (const [off, startFrac, sc] of [[20, 0.32, 1], [62, 0.04, 1.08]]) {
        let x = startFrac * W + rm() * 40
        while (x < W - 10) {
          const run = 4 + Math.floor(rm() * 9), hw = 24 * sc
          for (let i = 0; i < run && x < W - 10; i++) {
            const gy = ridge(x + hw / 2, base, amp, 0.006, 0.017, ph) + off, hh = 30 * sc, top = gy - hh
            m.fillStyle = walls[Math.floor(rm() * walls.length)]; m.fillRect(x, top, hw, hh + 14)
            m.fillStyle = '#0D1626'; m.beginPath(); m.moveTo(x - 1, top); m.lineTo(x + hw / 2, top - 9 * sc); m.lineTo(x + hw + 1, top); m.fill()
            m.fillStyle = '#EEF4FA'; m.beginPath(); m.moveTo(x - 2, top + 1); for (let k = 0; k <= 6; k++) m.lineTo(x - 2 + ((hw + 4) * k) / 6, top - 9 * sc * (1 - Math.abs(k / 6 - 0.5) * 2) - 2 - rm() * 2); m.lineTo(x + hw + 2, top + 1); m.lineTo(x + hw / 2, top - 5); m.fill()
            if (i % 2 === 0) { const cx = x + hw * 0.72, cy = top - 9 * sc; m.fillStyle = '#0D1626'; m.fillRect(cx, cy - 6, 5 * sc, 10); m.fillStyle = '#EEF4FA'; m.fillRect(cx - 1, cy - 8, 5 * sc + 2, 3); chimneys.push({ x: cx + 2.5 * sc, y: cy - 8, s: sc }) }
            for (const [j, wx, wy] of [[0, x + 4 * sc, top + 7 * sc], [1, x + 14 * sc, top + 7 * sc], [2, x + 4 * sc, top + 19 * sc]]) {
              const on = rm() < (j === 2 ? 0.45 : 0.62)
              windows.push({ x: wx, y: wy, w: 6 * sc, h: 8 * sc, on, tree: on && rm() < 0.15 })
            }
            x += hw
          }
          x += 30 + rm() * 80
        }
      }
      // foreground: snow, the Old Bridge, pines
      const [front, g] = layer(); const rf = seeded(99); lamps = []; treeLights = []
      const ground = H - 90
      g.beginPath(); g.moveTo(0, ground); for (let x = 0; x <= W; x += 8) g.lineTo(x, ground - 10 - Math.sin(x * 0.009) * 10); g.lineTo(W, H); g.lineTo(0, H); g.closePath()
      const sg = g.createLinearGradient(0, ground - 30, 0, H); sg.addColorStop(0, '#E4ECF5'); sg.addColorStop(1, '#AFC0D5'); g.fillStyle = sg; g.fill()
      const span = narrow ? Math.min(230, W * 0.55) : Math.min(420, W * 0.3), Lx = narrow ? W * 0.38 : W * 0.56, Rx = Lx + span, M = (Lx + Rx) / 2, gy = ground + 6, rise = span * 0.38
      const qp = (t, a, b, c) => (1 - t) * (1 - t) * a + 2 * (1 - t) * t * b + t * t * c
      g.fillStyle = '#081426'; g.beginPath(); g.moveTo(Lx + span * 0.06, gy); g.lineTo(Rx - span * 0.06, gy); g.quadraticCurveTo(Rx + span * 0.2, gy + 40, M + span * 0.9, H); g.lineTo(M - span * 0.7, H); g.quadraticCurveTo(Lx - span * 0.25, gy + 50, Lx + span * 0.06, gy); g.fill()
      g.beginPath(); g.moveTo(Lx - 22, gy - 2); g.quadraticCurveTo(M, gy - rise * 2, Rx + 22, gy - 2); g.lineTo(Rx + 22, gy + 12); g.lineTo(Rx - span * 0.08, gy + 12); g.quadraticCurveTo(M, gy - rise * 1.58, Lx + span * 0.08, gy + 12); g.lineTo(Lx - 22, gy + 12); g.closePath()
      const bg = g.createLinearGradient(0, gy - rise, 0, gy + 12); bg.addColorStop(0, '#24324A'); bg.addColorStop(1, '#0E1828'); g.fillStyle = bg; g.fill()
      g.save(); g.clip(); g.strokeStyle = 'rgba(0,0,0,.35)'
      for (let v = 0; v <= 28; v++) { const t = v / 28, ox = qp(t, Lx + span * 0.08, M, Rx - span * 0.08), oy = qp(t, gy + 12, gy - rise * 1.58, gy + 12), ix = qp(t, Lx - 22, M, Rx + 22), iy = qp(t, gy - 2, gy - rise * 2, gy - 2); g.beginPath(); g.moveTo(ox, oy); g.lineTo(ox + (ix - ox) * 0.55, oy + (iy - oy) * 0.55); g.stroke() }
      g.restore()
      for (let i = 1; i < 26; i++) { const t = i / 26, x = qp(t, Lx + span * 0.08, M, Rx - span * 0.08), y = qp(t, gy + 12, gy - rise * 1.58, gy + 12), len = 4 + rf() * 10; g.fillStyle = 'rgba(220,235,250,.85)'; g.beginPath(); g.moveTo(x - 1.6, y); g.lineTo(x + 1.6, y); g.lineTo(x, y + len); g.fill() }
      g.beginPath(); g.moveTo(Lx - 28, gy - 3); for (let p = 0; p <= 40; p++) { const t = p / 40; g.lineTo(qp(t, Lx - 28, M, Rx + 28), qp(t, gy - 3, gy - rise * 2 - 2, gy - 3) - 5 - rf() * 3) } for (let p = 40; p >= 0; p--) { const t = p / 40; g.lineTo(qp(t, Lx - 28, M, Rx + 28), qp(t, gy - 3, gy - rise * 2 - 2, gy - 3) + 3) } g.fillStyle = '#F2F7FC'; g.fill()
      g.fillStyle = '#E4ECF5'; g.beginPath(); g.ellipse(Lx - 14, gy + 14, span * 0.22, 18, 0, Math.PI, 0); g.fill(); g.beginPath(); g.ellipse(Rx + 14, gy + 14, span * 0.22, 18, 0, Math.PI, 0); g.fill()
      lamps = [{ x: Lx - 30, y: gy - 46 }, { x: Rx + 30, y: gy - 46 }]
      for (const l of lamps) { g.fillStyle = '#0E1828'; g.fillRect(l.x - 1.6, l.y, 3.2, 44); g.fillRect(l.x - 5, l.y - 2, 10, 4) }
      const pine = (tx, ty, hgt, lit) => {
        for (let t = 0; t < 6; t++) {
          const tw = hgt * 0.42 * (1 - (t / 6) * 0.8), y0 = ty - (t * hgt / 6) * 0.82
          g.fillStyle = t % 2 ? '#0D2419' : '#0F2A1D'; g.beginPath(); g.moveTo(tx - tw, y0); g.quadraticCurveTo(tx - tw * 0.3, y0 - hgt * 0.12, tx, y0 - hgt * 0.3); g.quadraticCurveTo(tx + tw * 0.3, y0 - hgt * 0.12, tx + tw, y0); g.fill()
          g.fillStyle = '#EEF4FA'; g.beginPath(); g.moveTo(tx - tw * 0.95, y0 - 1); g.quadraticCurveTo(tx - tw * 0.35, y0 - hgt * 0.1, tx - 2, y0 - hgt * 0.27); g.quadraticCurveTo(tx - tw * 0.25, y0 - hgt * 0.06, tx - tw * 0.95, y0 - 1); g.fill()
          if (lit) for (let b = 0; b < 7; b++) treeLights.push({ x: tx - tw * 0.8 + (tw * 1.6 * b) / 6 + (rf() - 0.5) * 6, y: y0 - 4 - rf() * hgt * 0.08, c: ['#FF4F63', '#FFC46B', '#7FD0FF', '#FFF3D6', '#6EE29B'][Math.floor(rf() * 5)], ph: rf() * 6.28 })
        }
        g.fillStyle = '#1A120C'; g.fillRect(tx - 4, ty, 8, 12)
      }
      pine(narrow ? W * 0.1 : W * 0.06, ground + 10, narrow ? 140 : 220, false)
      pine(narrow ? W * 0.9 : W * 0.92, ground + 16, narrow ? 160 : 250, true)
      layers = { sky, far, mid, front }
    }

    const sleigh = (t) => {
      const p = (t % 30000) / 30000; if (p > 0.5) return
      const k = p / 0.5, x = -180 + k * (W + 360), y = moon.y + 30 - Math.sin(k * Math.PI) * 70
      ctx.save(); ctx.translate(x, y); ctx.rotate(-Math.cos(k * Math.PI) * 0.12)
      ctx.fillStyle = ctx.strokeStyle = 'rgba(3,8,18,.92)'; ctx.lineWidth = 1.4; ctx.lineCap = 'round'
      ctx.beginPath(); ctx.moveTo(-62, 4); ctx.quadraticCurveTo(-64, -9, -50, -9); ctx.lineTo(-32, -9); ctx.lineTo(-28, 4); ctx.fill()
      ctx.beginPath(); ctx.moveTo(-68, 9); ctx.lineTo(-26, 9); ctx.quadraticCurveTo(-20, 9, -20, 3); ctx.stroke()
      ctx.beginPath(); ctx.arc(-47, -14, 5.5, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.moveTo(-26, -3); ctx.lineTo(28, -5); ctx.stroke()
      const leg = Math.sin(t / 85) * 4
      for (const dx of [0, 26]) {
        ctx.beginPath(); ctx.ellipse(dx + 8, -5, 9.5, 4.2, 0, 0, 6.283); ctx.fill()
        ctx.beginPath(); ctx.moveTo(dx + 15, -7); ctx.lineTo(dx + 19, -14); ctx.stroke()
        ctx.beginPath(); ctx.ellipse(dx + 21.5, -15, 3.6, 2.3, 0.3, 0, 6.283); ctx.fill()
        ctx.beginPath(); ctx.moveTo(dx + 19, -17); ctx.lineTo(dx + 16, -24); ctx.moveTo(dx + 20.5, -17); ctx.lineTo(dx + 23, -24); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(dx + 3, -2); ctx.lineTo(dx + 1 - leg, 6); ctx.moveTo(dx + 12, -2); ctx.lineTo(dx + 10 + leg, 6); ctx.moveTo(dx + 14, -2); ctx.lineTo(dx + 16 - leg, 6); ctx.stroke()
      }
      ctx.fillStyle = '#FF4F63'; ctx.beginPath(); ctx.arc(49.5, -15.5, 1.6, 0, 6.283); ctx.fill()
      ctx.restore()
    }

    const frame = (t) => {
      if (!layers) return
      ctx.clearRect(0, 0, W, H)
      ctx.drawImage(layers.sky, 0, 0, W, H)
      if (!still) sleigh(t)
      ctx.drawImage(layers.far, 0, 0, W, H)
      ctx.drawImage(layers.mid, 0, 0, W, H)
      for (const w of windows) {
        if (!w.on) continue
        ctx.fillStyle = 'rgba(255,196,107,.16)'; ctx.fillRect(w.x - 3, w.y - 3, w.w + 6, w.h + 6)
        ctx.fillStyle = '#FFC46B'; ctx.fillRect(w.x, w.y, w.w, w.h)
        ctx.fillStyle = 'rgba(80,40,10,.55)'; ctx.fillRect(w.x + w.w / 2 - 0.5, w.y, 1, w.h); ctx.fillRect(w.x, w.y + w.h / 2 - 0.5, w.w, 1)
        if (w.tree) { ctx.fillStyle = '#1C4A33'; ctx.beginPath(); ctx.moveTo(w.x + 1, w.y + w.h); ctx.lineTo(w.x + w.w / 2, w.y + 1.5); ctx.lineTo(w.x + w.w - 1, w.y + w.h); ctx.fill() }
      }
      if (!still) {
        if (Math.random() < 0.015) { const w = windows[Math.floor(Math.random() * windows.length)]; if (w) w.on = !w.on }
        for (const c of chimneys) if (Math.random() < 0.05) smoke.push({ x: c.x, y: c.y, r: 2 * c.s, a: 0.28 })
        const wind = Math.sin(t / 5200) * 0.6
        for (let k = smoke.length - 1; k >= 0; k--) { const p = smoke[k]; p.y -= 0.35; p.x += wind * 0.35 + 0.15; p.r += 0.045; p.a -= 0.0024; if (p.a <= 0) { smoke.splice(k, 1); continue } ctx.fillStyle = `rgba(190,205,225,${p.a.toFixed(3)})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill() }
      }
      ctx.drawImage(layers.front, 0, 0, W, H)
      ctx.globalCompositeOperation = 'lighter'
      for (const l of lamps) { const gl = ctx.createRadialGradient(l.x, l.y - 2, 1, l.x, l.y - 2, 46); gl.addColorStop(0, 'rgba(255,196,107,.55)'); gl.addColorStop(1, 'rgba(255,196,107,0)'); ctx.fillStyle = gl; ctx.fillRect(l.x - 46, l.y - 48, 92, 92) }
      for (const b of treeLights) { const a = still ? 0.8 : 0.45 + 0.55 * Math.max(0, Math.sin(t / 420 + b.ph)); ctx.globalAlpha = a; ctx.fillStyle = b.c; ctx.beginPath(); ctx.arc(b.x, b.y, 2.2, 0, 6.283); ctx.fill(); ctx.globalAlpha = a * 0.35; ctx.beginPath(); ctx.arc(b.x, b.y, 7, 0, 6.283); ctx.fill() }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'
      if (!still && onScreen) raf = requestAnimationFrame(frame)
    }

    // only animates while the hero is on screen and the tab is visible
    let onScreen = true
    const vis = () => { cancelAnimationFrame(raf); if (layers && onScreen && !document.hidden && !still) raf = requestAnimationFrame(frame) }
    const io = 'IntersectionObserver' in window ? new IntersectionObserver((e) => { onScreen = e[0].isIntersecting; vis() }) : null
    const cancelStart = afterLoad(() => { build(); frame(0); io?.observe(cv) })
    let rt = 0
    const onResize = () => { if (!layers) return; clearTimeout(rt); rt = setTimeout(() => { build(); if (still) frame(0) }, 150) }
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', vis)
    return () => { cancelStart(); io?.disconnect(); cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); document.removeEventListener('visibilitychange', vis) }
  }, [])
  return <canvas ref={ref} className="xmas-night" aria-hidden="true" />
}

/* ── Jumper: knitted fair-isle bands, generated once ─────────────────────── */

const SNOWFLAKE = ['x...x...x', '.x..x..x.', '..x.x.x..', '...xxx...', 'xxxxxxxxx', '...xxx...', '..x.x.x..', '.x..x..x.', 'x...x...x']
const TREE = ['....x....', '...xxx...', '..xxxxx..', '...xxx...', '..xxxxx..', '.xxxxxxx.', 'xxxxxxxxx', '....x....', '....x....']

function stitch(g, x, y, c, shade) {
  g.fillStyle = c
  g.beginPath(); g.ellipse(x + 2.8, y + 5, 2.6, 4.6, -0.55, 0, 6.283); g.fill()
  g.beginPath(); g.ellipse(x + 7.2, y + 5, 2.6, 4.6, 0.55, 0, 6.283); g.fill()
  g.fillStyle = shade
  g.beginPath(); g.ellipse(x + 2.8, y + 7.2, 1.6, 1.6, -0.55, 0, 6.283); g.fill()
  g.beginPath(); g.ellipse(x + 7.2, y + 7.2, 1.6, 1.6, 0.55, 0, 6.283); g.fill()
}

function knitBand() {
  const RED = '#C8102E', WHITE = '#F6F1E7', GREEN = '#16502F'
  const shade = (c) => (c === WHITE ? 'rgba(0,0,0,.08)' : 'rgba(0,0,0,.22)')
  const cols = 24, rows = []
  const solid = (c) => Array(cols).fill(c)
  rows.push(solid(GREEN), solid(GREEN), solid(RED))
  rows.push(Array.from({ length: cols }, (_, i) => (i % 2 ? RED : WHITE)))
  rows.push(solid(RED))
  for (let r = 0; r < 9; r++) {
    const row = []
    for (let i = 0; i < cols; i++) { const m = i % 12, motif = i < 12 ? SNOWFLAKE : TREE; row.push(m < 9 && motif[r][m] === 'x' ? WHITE : RED) }
    rows.push(row)
  }
  rows.push(solid(RED))
  rows.push(Array.from({ length: cols }, (_, i) => (i % 2 ? RED : WHITE)))
  rows.push(solid(RED), solid(GREEN), solid(GREEN))
  const c = document.createElement('canvas'); c.width = cols * 10; c.height = rows.length * 10
  const g = c.getContext('2d'); g.fillStyle = '#5A0817'; g.fillRect(0, 0, c.width, c.height)
  rows.forEach((row, y) => row.forEach((col, x) => stitch(g, x * 10, y * 10, col, shade(col))))
  return c.toDataURL()
}

function knitPlain(colour, gap) {
  const c = document.createElement('canvas'); c.width = 40; c.height = 40
  const g = c.getContext('2d'); g.fillStyle = gap; g.fillRect(0, 0, 40, 40)
  for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) stitch(g, x * 10, y * 10, colour, 'rgba(0,0,0,.18)')
  return c.toDataURL()
}
