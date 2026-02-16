import { useEffect, useState } from 'react'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import headshot from '../assets/hero/Professional_headshot.png'
import useScrollSlide from '../hooks/useScrollSlide'
import styles from './Hero.module.css'

/*
 * ADJUSTABLE SCROLL VALUES:
 * --------------------------
 * scrollStart (1st arg): px scrolled before elements start sliding (default: 0)
 * scrollEnd   (2nd arg): px scrolled when elements are fully off-screen (default: 600)
 *
 * ADJUSTABLE SLIDE DISTANCES (below):
 * Each element has a maxDistance in px (at desktop 1400px+).
 * On smaller screens these scale down automatically.
 * Positive = right/down, negative = left/up.
 *
 * BREAKPOINTS:
 * - Desktop (1400px+): 100% of slide distance
 * - Tablet  (~768px):  ~55% of slide distance
 * - Mobile  (~375px):  ~27% of slide distance
 */
const SCROLL_START = 0    // <-- Change: px before slide begins
const SCROLL_END = 600    // <-- Change: px when fully slid out

function useScreenScale() {
  const [scale, setScale] = useState(
    typeof window !== 'undefined' ? Math.min(window.innerWidth / 1400, 1) : 1
  )

  useEffect(() => {
    const onResize = () => setScale(Math.min(window.innerWidth / 1400, 1))
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return scale
}

function Hero() {
  const progress = useScrollSlide(SCROLL_START, SCROLL_END)
  const scale = useScreenScale()

  // slideX: negative = left, positive = right
  // slideY: negative = up, positive = down
  // Distances auto-scale with screen width
  const slideX = (maxDistance) => ({
    transform: `translateX(${progress * maxDistance * scale}px)`,
  })
  const slideY = (maxDistance) => ({
    transform: `translateY(${progress * maxDistance * scale}px)`,
  })

  return (
    <div className={styles.hero}>
      {/* Background text — slides left */}
      <div
        className={styles.bgText}
        style={slideX(-1500)}   /* <-- Slide distance: 1500px left */
        aria-hidden="true"
      >
        MATTHEW
      </div>

      <div className={styles.content}>
        <div className={styles.left}>
          {/* Tag — slides left */}
          <p className={styles.tag} style={slideX(-600)}>
            {/* <-- Slide distance: 600px left */}
            SOFTWARE DEVELOPER
          </p>

          {/* Name — slides left */}
          <h1 className={styles.name} style={slideX(-1000)}>
            {/* <-- Slide distance: 1000px left */}
            MATTHEW
            <br />
            <span className={styles.nameOffset}>KAY</span>
          </h1>

          {/* Subtitle — slides left */}
          <p className={styles.subtitle} style={slideX(-500)}>
            {/* <-- Slide distance: 500px left */}
            Building modern software with sharp instincts and smarter tools.
          </p>

          {/* Socials — slides down */}
          <div className={styles.socials} style={slideY(200)}>
            {/* <-- Slide distance: 200px down */}
            <a
              href="https://github.com/MattKay02"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
            <a
              href="https://linkedin.com/in/matthew-kay-"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
            <a href="mailto:mattykay2002@gmail.com" aria-label="Email">
              <FiMail />
            </a>
          </div>
        </div>

        {/* Headshot — slides right */}
        <div className={styles.right} style={slideX(900)}>
          {/* <-- Slide distance: 900px right */}
          <div className={styles.headshotWrap}>
            <div className={styles.headshot}>
              <img src={headshot} alt="Matthew Kay" className={styles.headshotImg} />
            </div>
            <div className={styles.headshotLabel} aria-hidden="true">
              MK.
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue — slides down */}
      <a
        href="#work"
        className={styles.scrollCue}
        style={slideY(150)}   /* <-- Slide distance: 150px down */
        onClick={(e) => {
          e.preventDefault()
          document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        SCROLL
      </a>
    </div>
  )
}

export default Hero
