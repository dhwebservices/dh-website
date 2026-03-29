import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef()
  const glowRef = useRef()

  useEffect(() => {
    // Disable on touch devices
    if (navigator.maxTouchPoints > 0) return

    const cursor = cursorRef.current
    const glow = glowRef.current
    if (!cursor || !glow) return

    let mouseX = -200, mouseY = -200
    let glowX = -200, glowY = -200
    let rafId

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      // Cursor follows instantly
      cursor.style.left = mouseX + 'px'
      cursor.style.top = mouseY + 'px'

      // Glow lerps behind
      glowX += (mouseX - glowX) * 0.08
      glowY += (mouseY - glowY) * 0.08
      glow.style.left = glowX + 'px'
      glow.style.top = glowY + 'px'

      rafId = requestAnimationFrame(animate)
    }

    // Scale up on clickable elements
    const onEnter = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, label')) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.4)'
      }
    }
    const onLeave = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, label')) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)'
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
    }
  }, [])

  // Don't render on touch devices
  if (navigator.maxTouchPoints > 0) return null

  return (
    <>
      {/* Gold radial glow */}
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9998,
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.13) 0%, rgba(201,168,76,0.04) 40%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          left: -200,
          top: -200,
        }}
      />
      {/* DH logo cursor */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          width: 28,
          height: 28,
          transform: 'translate(-50%, -50%)',
          left: -200,
          top: -200,
          transition: 'transform 0.15s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <img
          src="/dh-logo-icon.png"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
    </>
  )
}
