import { useEffect, useRef, useState } from 'react'

/**
 * Returns [ref, scale, position] for a single card.
 *
 * - scale: 0 to 1 (minScale when far, 1 when centered)
 * - position: -1 to +1 (negative = card is below center, 0 = centered, positive = above/past)
 *
 * Adjustable:
 * - minScale: smallest scale value (default 0.65)
 * - smoothing: lerp factor, lower = smoother (default 0.04)
 * - anchorZone: portion of viewport center where card stays fully scaled (default 0.3)
 *   e.g. 0.3 = card holds at scale 1 and position 0 for 30% of viewport around center
 */
export default function useCardScale(minScale = 0.65, smoothing = 0.04, anchorZone = 0.3) {
  const ref = useRef(null)
  const [values, setValues] = useState({ scale: minScale, position: -1 })
  const targetScale = useRef(minScale)
  const targetPos = useRef(-1)
  const currentScale = useRef(minScale)
  const currentPos = useRef(-1)
  const rafRef = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const halfAnchor = anchorZone / 2

    const compute = () => {
      const rect = el.getBoundingClientRect()
      const viewH = window.innerHeight
      const cardCenter = rect.top + rect.height / 2
      const viewCenter = viewH / 2
      // Signed: negative = card below center, positive = card above center
      const signed = (viewCenter - cardCenter) / (viewH / 2)
      const clamped = Math.min(Math.max(signed, -1), 1)

      // Apply anchor zone: if within [-halfAnchor, halfAnchor], treat as 0
      let adjustedPos
      if (clamped >= -halfAnchor && clamped <= halfAnchor) {
        adjustedPos = 0
      } else if (clamped < -halfAnchor) {
        // Remap [-1, -halfAnchor] to [-1, 0]
        adjustedPos = (clamped + halfAnchor) / (1 - halfAnchor) * -1 * -1
        adjustedPos = -((Math.abs(clamped) - halfAnchor) / (1 - halfAnchor))
      } else {
        // Remap [halfAnchor, 1] to [0, 1]
        adjustedPos = (clamped - halfAnchor) / (1 - halfAnchor)
      }

      const absDist = Math.abs(adjustedPos)
      targetScale.current = 1 - absDist * (1 - minScale)
      targetPos.current = adjustedPos
    }

    const animate = () => {
      const sDiff = targetScale.current - currentScale.current
      const pDiff = targetPos.current - currentPos.current
      currentScale.current += sDiff * smoothing
      currentPos.current += pDiff * smoothing

      if (Math.abs(sDiff) < 0.0005) currentScale.current = targetScale.current
      if (Math.abs(pDiff) < 0.001) currentPos.current = targetPos.current

      setValues({ scale: currentScale.current, position: currentPos.current })
      rafRef.current = requestAnimationFrame(animate)
    }

    const onScroll = () => compute()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    compute()
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [minScale, smoothing, anchorZone])

  return [ref, values.scale, values.position]
}
