import { useEffect, useRef, useState } from 'react'

/**
 * Returns [ref, scale, position, rawPosition] for a single card.
 *
 * - scale: 0 to 1 (minScale when far, 1 when centered)
 * - position: -1 to +1 (with anchor zone applied — used for card slide/bg text)
 * - rawPosition: -1 to +1 (smooth, no anchor — used for image scroll)
 *
 * Adjustable:
 * - minScale: smallest scale value (default 0.65)
 * - smoothing: lerp factor, lower = smoother (default 0.04)
 * - anchorZone: portion of viewport center where card stays fully scaled (default 0.3)
 */
export default function useCardScale(minScale = 0.65, smoothing = 0.04, anchorZone = 0.3) {
  const ref = useRef(null)
  const [values, setValues] = useState({ scale: minScale, position: -1, rawPosition: -1 })
  const targetScale = useRef(minScale)
  const targetPos = useRef(-1)
  const targetRaw = useRef(-1)
  const currentScale = useRef(minScale)
  const currentPos = useRef(-1)
  const currentRaw = useRef(-1)
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
      const signed = (viewCenter - cardCenter) / (viewH / 2)
      const clamped = Math.min(Math.max(signed, -1), 1)

      // Raw position (no anchor)
      targetRaw.current = clamped

      // Anchored position
      let adjustedPos
      if (clamped >= -halfAnchor && clamped <= halfAnchor) {
        adjustedPos = 0
      } else if (clamped < -halfAnchor) {
        adjustedPos = -((Math.abs(clamped) - halfAnchor) / (1 - halfAnchor))
      } else {
        adjustedPos = (clamped - halfAnchor) / (1 - halfAnchor)
      }

      const absDist = Math.abs(adjustedPos)
      targetScale.current = 1 - absDist * (1 - minScale)
      targetPos.current = adjustedPos
    }

    const animate = () => {
      const sDiff = targetScale.current - currentScale.current
      const pDiff = targetPos.current - currentPos.current
      const rDiff = targetRaw.current - currentRaw.current
      currentScale.current += sDiff * smoothing
      currentPos.current += pDiff * smoothing
      currentRaw.current += rDiff * smoothing

      if (Math.abs(sDiff) < 0.0005) currentScale.current = targetScale.current
      if (Math.abs(pDiff) < 0.001) currentPos.current = targetPos.current
      if (Math.abs(rDiff) < 0.001) currentRaw.current = targetRaw.current

      setValues({
        scale: currentScale.current,
        position: currentPos.current,
        rawPosition: currentRaw.current,
      })
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

  return [ref, values.scale, values.position, values.rawPosition]
}
