import { useEffect, useRef, useState } from 'react'

/**
 * Returns a smoothed scroll progress value from 0 to 1.
 *
 * 0 = top of page (elements fully in place)
 * 1 = fully slid out
 *
 * Adjustable values:
 * - scrollStart: pixels scrolled before slide begins (default 0)
 * - scrollEnd:   pixels scrolled when slide is fully complete (default 600)
 * - smoothing:   0-1, lower = smoother/slower追い (default 0.08)
 */
export default function useScrollSlide(scrollStart = 0, scrollEnd = 600, smoothing = 0.08) {
  const [progress, setProgress] = useState(0)
  const targetRef = useRef(0)
  const currentRef = useRef(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y <= scrollStart) {
        targetRef.current = 0
      } else if (y >= scrollEnd) {
        targetRef.current = 1
      } else {
        targetRef.current = (y - scrollStart) / (scrollEnd - scrollStart)
      }
    }

    const animate = () => {
      const diff = targetRef.current - currentRef.current
      // Lerp toward target — smoothing controls how fast it catches up
      currentRef.current += diff * smoothing

      // Snap when close enough to avoid endless micro-updates
      if (Math.abs(diff) < 0.001) {
        currentRef.current = targetRef.current
      }

      setProgress(currentRef.current)
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [scrollStart, scrollEnd, smoothing])

  return progress
}
