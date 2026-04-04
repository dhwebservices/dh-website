import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ringRef = useRef()
  const glowRef = useRef()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const ring = ringRef.current
    const glow = glowRef.current
    if (!ring || !glow) return

    document.documentElement.classList.add('has-custom-cursor')

    let mouseX = -200, mouseY = -200
    let ringX = -200, ringY = -200
    let glowX = -200, glowY = -200
    let rafId

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.14
      ringY += (mouseY - ringY) * 0.14
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'

      glowX += (mouseX - glowX) * 0.06
      glowY += (mouseY - glowY) * 0.06
      glow.style.left = glowX + 'px'
      glow.style.top = glowY + 'px'

      rafId = requestAnimationFrame(animate)
    }

    const onEnter = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select')) {
        ring.style.transform = 'translate(-50%,-50%) scale(1.5)'
        ring.style.borderColor = 'rgba(0,113,227,0.7)'
        ring.style.background = 'rgba(0,113,227,0.08)'
        ring.querySelector('img').style.opacity = '0'
      }
    }
    const onLeave = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select')) {
        ring.style.transform = 'translate(-50%,-50%) scale(1)'
        ring.style.borderColor = 'rgba(201,168,76,0.55)'
        ring.style.background = 'rgba(255,255,255,0.85)'
        ring.querySelector('img').style.opacity = '1'
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(rafId)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  const isMobile = typeof window !== 'undefined' && (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )
  if (isMobile) return null

  return (
    <>
      {/* Ambient gold glow */}
      <div ref={glowRef} style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 9996,
        width: 380, height: 380, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.09) 0%, rgba(201,168,76,0.03) 45%, transparent 70%)',
        transform: 'translate(-50%,-50%)',
        left: -400, top: -400,
      }} />

      {/* Ring with logo inside */}
      <div ref={ringRef} style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 9999,
        width: 40, height: 40, borderRadius: '50%',
        border: '1.5px solid rgba(201,168,76,0.55)',
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        transform: 'translate(-50%,-50%)',
        left: -200, top: -200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.2s, background 0.2s',
      }}>
        <img
          src="/dh-logo-icon.png"
          alt=""
          style={{
            width: 20, height: 20, objectFit: 'contain',
            transition: 'opacity 0.15s',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      </div>
    </>
  )
}
