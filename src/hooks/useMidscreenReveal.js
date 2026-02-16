import { useEffect, useRef, useState } from 'react'

export default function useMidscreenReveal(
  refs,
  { visibilityZone = 350, staggerStep = 20, smoothing = 0.06 } = {}
) {
  const count = refs.length
  const targetProgress = useRef(new Array(count).fill(0))
  const currentProgress = useRef(new Array(count).fill(0))
  const rafRef = useRef(null)
  const [progressValues, setProgressValues] = useState(() =>
    new Array(count).fill(0)
  )

  useEffect(() => {
    const centerIndex = Math.floor(count / 2)

    const compute = () => {
      const viewH = window.innerHeight
      const viewCenter = viewH / 2

      for (let i = 0; i < count; i++) {
        const el = refs[i]?.current
        if (!el) continue

        const rect = el.getBoundingClientRect()
        const elementCenter = rect.top + rect.height / 2
        const distance = Math.abs(elementCenter - viewCenter)

        const distFromCenter = Math.abs(i - centerIndex)
        const adjustedZone =
          visibilityZone + (centerIndex - distFromCenter) * staggerStep

        targetProgress.current[i] = Math.max(0, 1 - distance / adjustedZone)
      }
    }

    const animate = () => {
      for (let i = 0; i < count; i++) {
        const diff = targetProgress.current[i] - currentProgress.current[i]
        if (Math.abs(diff) < 0.001) {
          currentProgress.current[i] = targetProgress.current[i]
        } else {
          currentProgress.current[i] += diff * smoothing
        }
      }

      setProgressValues([...currentProgress.current])
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
  }, [refs, count, visibilityZone, staggerStep, smoothing])

  return progressValues
}
