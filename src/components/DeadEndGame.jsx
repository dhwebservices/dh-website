/**
 * "You found a dead end": a small runner game for the 404 page.
 *
 * One canvas, one requestAnimationFrame loop that only runs while something
 * is moving. Jump with Space / ArrowUp / W, or tap the canvas. The game never
 * starts on its own: it waits for the player, pauses when the tab is hidden,
 * and with prefers-reduced-motion the idle animation is off.
 * Best score lives in localStorage (wrapped, since it can be blocked).
 */
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const DARK = '#14181A'
const RED = '#C8102E'
const CREAM = '#F4F5F3'
const HEIGHT = 200
const GROUND = 36            // ground line distance from the bottom
const GRAVITY = 2300         // px/s²
const JUMP = 720             // px/s upwards
const START_SPEED = 260      // px/s
const SPEED_UP = 5           // px/s gained per second of play
const MAX_SPEED = 620
const BEST_KEY = 'dh404-best'

const readBest = () => {
  try { return Number(localStorage.getItem(BEST_KEY)) || 0 } catch { return 0 }
}
const saveBest = (n) => {
  try { localStorage.setItem(BEST_KEY, String(n)) } catch { /* storage blocked */ }
}

function freshWorld() {
  return {
    t: 0, speed: START_SPEED, dist: 0, nextGap: 320,
    player: { y: 0, vy: 0, onGround: true },
    blocks: [],
    dashOffset: 0,
  }
}

export default function DeadEndGame() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const world = useRef(freshWorld())
  const stateRef = useRef('ready')        // ready | playing | paused | over
  const rafRef = useRef(0)
  const lastRef = useRef(0)
  const sizeRef = useRef({ w: 600, dpr: 1 })
  const reduceRef = useRef(false)
  const bestRef = useRef(0)
  const overAtRef = useRef(0)
  const [state, setState] = useState('ready')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)

  const setGameState = (s) => { stateRef.current = s; setState(s) }

  useEffect(() => {
    bestRef.current = readBest()
    setBest(bestRef.current)
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    reduceRef.current = !!mq?.matches
    const onMq = (e) => { reduceRef.current = e.matches; kick() }
    mq?.addEventListener?.('change', onMq)

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      const w = Math.max(280, Math.round(wrapRef.current.clientWidth))
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      sizeRef.current = { w, dpr }
      canvas.width = w * dpr
      canvas.height = HEIGHT * dpr
      canvas.style.height = HEIGHT + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    function draw() {
      const { w } = sizeRef.current
      const W = world.current
      const groundY = HEIGHT - GROUND
      ctx.fillStyle = DARK
      ctx.fillRect(0, 0, w, HEIGHT)

      // Ground: a solid line plus dashes that scroll with the world.
      ctx.fillStyle = 'rgba(244,245,243,0.55)'
      ctx.fillRect(0, groundY, w, 2)
      ctx.fillStyle = 'rgba(244,245,243,0.18)'
      for (let x = -W.dashOffset % 40; x < w; x += 40) ctx.fillRect(x, groundY + 12, 14, 2)

      // Broken links: red blocks with "404" on them.
      ctx.font = '600 11px "IBM Plex Mono", ui-monospace, monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      for (const b of W.blocks) {
        ctx.fillStyle = RED
        ctx.fillRect(b.x, groundY - b.h, b.w, b.h)
        ctx.fillStyle = CREAM
        ctx.fillText('404', b.x + b.w / 2, groundY - b.h / 2)
      }

      // The runner: a small off-white figure, legs swap while running.
      const px = 56
      const py = groundY - 28 - W.player.y
      ctx.fillStyle = CREAM
      ctx.fillRect(px + 4, py, 14, 12)               // head
      ctx.fillStyle = DARK
      ctx.fillRect(px + 13, py + 4, 3, 3)            // eye
      ctx.fillStyle = CREAM
      ctx.fillRect(px + 2, py + 13, 18, 9)           // body
      const moving = stateRef.current === 'playing' || (stateRef.current === 'ready' && !reduceRef.current)
      const step = moving && W.player.onGround ? Math.floor(W.t * 10) % 2 : 0
      ctx.fillRect(px + 4, py + 22, 4, step ? 6 : 4)
      ctx.fillRect(px + 14, py + 22, 4, step ? 4 : 6)

      // Score, top right.
      ctx.textAlign = 'right'
      ctx.textBaseline = 'top'
      ctx.font = '500 13px "IBM Plex Mono", ui-monospace, monospace'
      ctx.fillStyle = 'rgba(244,245,243,0.7)'
      const s = Math.floor(W.dist / 10)
      ctx.fillText(`BEST ${String(bestRef.current).padStart(5, '0')}  ${String(s).padStart(5, '0')}`, w - 14, 14)

      // Messages in the middle.
      const msg = {
        ready: 'Press space or tap to jump',
        paused: 'Paused. Press space or tap to carry on',
        over: 'Game over',
      }[stateRef.current]
      if (msg) {
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.font = '700 18px Archivo, "Helvetica Neue", Arial, sans-serif'
        ctx.fillStyle = stateRef.current === 'over' ? RED : CREAM
        ctx.fillText(msg, w / 2, 58)
      }
    }

    function update(dt) {
      const W = world.current
      const { w } = sizeRef.current
      W.t += dt
      if (stateRef.current !== 'playing') {
        W.dashOffset += START_SPEED * 0.4 * dt     // idle jog
        return
      }
      W.speed = Math.min(MAX_SPEED, W.speed + SPEED_UP * dt)
      const move = W.speed * dt
      W.dist += move
      W.dashOffset += move

      const p = W.player
      p.vy -= GRAVITY * dt
      p.y += p.vy * dt
      if (p.y <= 0) { p.y = 0; p.vy = 0; p.onGround = true }

      for (const b of W.blocks) b.x -= move
      W.blocks = W.blocks.filter((b) => b.x + b.w > -10)
      W.nextGap -= move
      if (W.nextGap <= 0) {
        const h = 24 + Math.random() * 18
        const wide = Math.random() < 0.25
        W.blocks.push({ x: w + 10, w: wide ? 46 : 28, h })
        // Gap grows with speed so every gap stays jumpable.
        W.nextGap = W.speed * (0.75 + Math.random() * 0.8) + 120
      }

      // Hit test with a little forgiveness on every side.
      const px1 = 56 + 5, px2 = 56 + 17
      const pBottom = p.y + 2
      for (const b of W.blocks) {
        if (b.x + 3 < px2 && b.x + b.w - 3 > px1 && pBottom < b.h - 3) {
          const s = Math.floor(W.dist / 10)
          if (s > bestRef.current) { bestRef.current = s; saveBest(s); setBest(s) }
          overAtRef.current = performance.now()
          setScore(s)
          setGameState('over')
          return
        }
      }
    }

    function frame(now) {
      const dt = Math.min(0.05, (now - lastRef.current) / 1000 || 0)
      lastRef.current = now
      update(dt)
      draw()
      if (shouldRun()) rafRef.current = requestAnimationFrame(frame)
      else rafRef.current = 0
    }

    function shouldRun() {
      if (document.hidden) return false
      const s = stateRef.current
      return s === 'playing' || (s === 'ready' && !reduceRef.current)
    }

    function kick() {
      draw()
      if (!rafRef.current && shouldRun()) {
        lastRef.current = performance.now()
        rafRef.current = requestAnimationFrame(frame)
      }
    }

    function jump() {
      const s = stateRef.current
      // A tap that was meant as a jump should not restart straight away.
      if (s === 'over' && performance.now() - overAtRef.current < 500) return
      if (s === 'ready' || s === 'over') {
        world.current = freshWorld()
        setScore(0)
        setGameState('playing')
      } else if (s === 'paused') {
        setGameState('playing')
      }
      const p = world.current.player
      if (p.onGround) { p.vy = JUMP; p.onGround = false }
      kick()
    }

    const onKey = (e) => {
      if (!['Space', 'ArrowUp', 'KeyW'].includes(e.code)) return
      const t = e.target
      // Leave Space alone on links, buttons and form fields.
      if (t && t !== document.body && t !== canvas && t.closest?.('a,button,input,textarea,select,[contenteditable]')) return
      e.preventDefault()
      jump()
    }
    const onPointer = (e) => { e.preventDefault(); canvas.focus({ preventScroll: true }); jump() }
    const onVisibility = () => {
      if (document.hidden && stateRef.current === 'playing') setGameState('paused')
      kick()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(wrapRef.current)
    resize()
    window.addEventListener('keydown', onKey)
    canvas.addEventListener('pointerdown', onPointer)
    document.addEventListener('visibilitychange', onVisibility)
    // Fonts arrive after the first paint; redraw once they are in.
    document.fonts?.ready?.then(draw)
    kick()

    return () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
      ro.disconnect()
      window.removeEventListener('keydown', onKey)
      canvas.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
      mq?.removeEventListener?.('change', onMq)
    }
  }, [])

  return (
    <section aria-label="Dead end mini-game" style={{ width: '100%', maxWidth: 720, margin: '0 auto' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--light)', marginBottom: 10 }}>
        You found a dead end. Jump the broken links.
      </p>
      <div ref={wrapRef} style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', background: DARK }}>
        <canvas
          ref={canvasRef}
          tabIndex={0}
          role="img"
          aria-label="A small runner game. Press space or tap to jump over the 404 blocks."
          style={{ display: 'block', width: '100%', height: HEIGHT, touchAction: 'manipulation', cursor: 'pointer', outlineOffset: -3 }}
        />
      </div>
      {state === 'over' && (
        <div style={{ marginTop: 14, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-primary">Back to the homepage</Link>
          <Link to="/contact" className="btn-secondary">Talk to us about a website</Link>
        </div>
      )}
      <p aria-live="polite" style={{ marginTop: 10, fontSize: 13, color: 'var(--mid)' }}>
        {state === 'over' ? `You scored ${score}. Best: ${best}. Tap or press space to play again.` : `Best score: ${best}`}
      </p>
    </section>
  )
}
