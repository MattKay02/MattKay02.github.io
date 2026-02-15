import { useState, useRef, useEffect } from 'react'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import projects from '../data/projects'
import useCardScale from '../hooks/useCardScale'
import styles from './Portfolio.module.css'

const filters = ['All', 'Mobile Apps', 'Web Apps']

const filterMap = {
  All: null,
  'Mobile Apps': 'Mobile App',
  'Web Apps': 'Web',
}

/*
 * ADJUSTABLE CARD ANIMATION VALUES:
 * - MIN_SCALE: smallest card size when far from center (default 0.65)
 * - SMOOTHING: lerp factor, lower = smoother (default 0.04)
 * - SLIDE_DISTANCE: max horizontal card offset in px (default 150)
 *
 * BG TEXT ANIMATION:
 * - BG_OFFSET: how far off-screen the bg text starts/ends (default 500px)
 * - BG_ANCHOR: portion of scroll where text holds still (0-1, default 0.5)
 *   e.g. 0.5 = text anchors for 50% of the scroll through the center
 *
 * The bg text has 3 phases:
 *   1. SLIDE IN:  text enters from same side as card
 *   2. ANCHOR:    text holds in place
 *   3. SLIDE OUT: text exits from opposite side of card
 */
const MIN_SCALE = 0.65       // <-- Change: minimum card scale (0-1)
const SMOOTHING = 0.04        // <-- Change: animation smoothness (lower = smoother)
const SLIDE_DISTANCE = 150    // <-- Change: max horizontal slide in px
const CARD_ANCHOR = 0.35      // <-- Change: how long card holds at full size (0-1)
const BG_OFFSET = 500         // <-- Change: bg text off-screen distance in px
const BG_ANCHOR = 0.5         // <-- Change: how long bg text holds still (0-1)

function ProjectCard({ project, index }) {
  const [ref, scale, position] = useCardScale(MIN_SCALE, SMOOTHING, CARD_ANCHOR)
  const scrollContainerRef = useRef(null)

  /*
   * LONG IMAGE SCROLL VALUES:
   * - SCROLL_SPEED: multiplier for wheel input (lower = slower scroll, default 0.3)
   * - SCROLL_SMOOTHING: lerp factor (lower = smoother, default 0.06)
   */
  const SCROLL_SPEED = 0.3         // <-- Change: wheel sensitivity (0.1 = very slow, 1 = instant)
  const SCROLL_SMOOTHING = 0.06    // <-- Change: smoothness (0.02 = very smooth, 0.2 = snappy)

  const targetScroll = useRef(0)
  const currentScroll = useRef(0)
  const scrollRaf = useRef(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const animate = () => {
      const diff = targetScroll.current - currentScroll.current
      if (Math.abs(diff) > 0.5) {
        currentScroll.current += diff * SCROLL_SMOOTHING
        container.scrollTop = currentScroll.current
        scrollRaf.current = requestAnimationFrame(animate)
      } else {
        currentScroll.current = targetScroll.current
        container.scrollTop = currentScroll.current
        scrollRaf.current = null
      }
    }

    const onWheel = (e) => {
      const maxScroll = container.scrollHeight - container.clientHeight
      if (maxScroll <= 0) return

      e.preventDefault()

      // Accumulate target with speed multiplier, clamp to bounds
      targetScroll.current = Math.min(
        Math.max(targetScroll.current + e.deltaY * SCROLL_SPEED, 0),
        maxScroll
      )

      if (!scrollRaf.current) {
        scrollRaf.current = requestAnimationFrame(animate)
      }
    }

    container.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      container.removeEventListener('wheel', onWheel)
      if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current)
    }
  }, [])

  const isEven = index % 2 === 1
  const cardDirection = isEven ? 1 : -1

  // Card slide
  const slideX = Math.abs(position) * SLIDE_DISTANCE * cardDirection

  // BG TEXT: 3-phase animation
  // position: -1 (below/entering) → 0 (centered) → +1 (above/exiting)
  //
  // Left card (isEven=false): enters from LEFT (-), exits RIGHT (+)
  // Right card (isEven=true): enters from RIGHT (+), exits LEFT (-)
  const enterDir = isEven ? 1 : -1   // direction text comes FROM
  const exitDir = isEven ? -1 : 1    // direction text goes TO

  // Define the 3 zones based on position
  const halfAnchor = BG_ANCHOR / 2
  const slideInEnd = -halfAnchor     // slide-in ends here
  const slideOutStart = halfAnchor   // slide-out starts here

  let bgSlideX = 0
  let bgOpacity = 0

  if (position < -1) {
    // Off screen below — fully hidden
    bgSlideX = enterDir * BG_OFFSET
    bgOpacity = 0
  } else if (position < slideInEnd) {
    // PHASE 1: Sliding in
    // Map position from [-1, slideInEnd] to [1, 0]
    const t = (position - slideInEnd) / (-1 - slideInEnd) // 1 at -1, 0 at slideInEnd
    bgSlideX = enterDir * BG_OFFSET * t
    bgOpacity = (1 - t) * 0.15
  } else if (position <= slideOutStart) {
    // PHASE 2: Anchored — text holds still
    bgSlideX = 0
    bgOpacity = 0.15
  } else if (position < 1) {
    // PHASE 3: Sliding out
    // Map position from [slideOutStart, 1] to [0, 1]
    const t = (position - slideOutStart) / (1 - slideOutStart) // 0 at slideOutStart, 1 at 1
    bgSlideX = exitDir * BG_OFFSET * t
    bgOpacity = (1 - t) * 0.15
  } else {
    // Off screen above — fully hidden
    bgSlideX = exitDir * BG_OFFSET
    bgOpacity = 0
  }

  return (
    <div ref={ref} className={styles.cardWrap}>
      {/* Large background text */}
      <div
        className={`${styles.cardBgText} ${isEven ? styles.cardBgTextLeft : styles.cardBgTextRight}`}
        style={{
          transform: `translateX(${bgSlideX}px)`,
          opacity: bgOpacity,
        }}
        aria-hidden="true"
      >
        {project.title.toUpperCase()}
      </div>

      <article
        className={styles.card}
        style={{
          transform: `translateX(${slideX}px) scale(${scale})`,
        }}
      >
        <div className={styles.imageWrap}>
          {project.longImage ? (
            <div ref={scrollContainerRef} className={styles.longImageWrap}>
              <img
                src={project.longImage}
                alt={project.title}
                className={styles.longImage}
              />
            </div>
          ) : project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className={styles.image}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              <span>PROJECT SCREENSHOT</span>
            </div>
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.badges}>
            <span className={styles.category}>{project.category}</span>
            {project.status && (
              <span className={styles.status}>{project.status}</span>
            )}
          </div>

          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.description}>{project.description}</p>

          <div className={styles.tags}>
            {project.tech.map((t) => (
              <span key={t} className={styles.tag}>
                {t}
              </span>
            ))}
          </div>

          <div className={styles.actions}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionBtn}
              >
                <FiExternalLink />
                <span>View Live</span>
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionBtn}
            >
              <FiGithub />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </article>
    </div>
  )
}

function Portfolio() {
  const [active, setActive] = useState('All')

  const filtered =
    filterMap[active] === null
      ? projects
      : projects.filter((p) => p.category === filterMap[active])

  return (
    <div className={`${styles.portfolio} section-padding`}>
      <div className={styles.header}>
        <h2 className={styles.title}>SELECTED</h2>
        <h2 className={styles.titleOutline}>WORK</h2>
        <div className={styles.line} />
      </div>

      <div className={styles.filters}>
        {filters.map((f) => (
          <button
            key={f}
            className={`${styles.filterBtn} ${active === f ? styles.filterActive : ''}`}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className={styles.stack}>
        {filtered.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Portfolio
