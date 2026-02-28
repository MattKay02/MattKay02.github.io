import { useState, useEffect } from 'react'
import gymImg from '../assets/passions/Gym_image.PNG'
import golfImg from '../assets/passions/Golf_image.JPG'
import ps5Img from '../assets/passions/Playstation_image.png'
import styles from './Passions.module.css'

const passions = [
  { label: 'GYM',    index: '01', image: gymImg  },
  { label: 'GOLF',   index: '02', image: golfImg },
  { label: 'GAMING', index: '03', image: ps5Img  },
]

// ─── Transform configs (scaled ×1.5 from previous) ───────────────────────────

const IDLE = [
  { x:  -7, y: -5, r: -6 },
  { x:   2, y: -2, r:  2 },
  { x:  10, y:  0, r:  8 },
]

const FAN_3 = [
  { x: -162, y: 22,  r: -22 },
  { x:    0, y: -34, r:   0 },
  { x:  162, y: 22,  r:  22 },
]

const FAN_2_PARTIAL = [
  { x: -70, y: 10, r: -13 },
  { x:  70, y: 10, r:  13 },
]

const FAN_2_FULL = [
  { x: -108, y: 18, r: -19 },
  { x:  108, y: 18, r:  19 },
]

const OTHERS = { 0: [1, 2], 1: [0, 2], 2: [0, 1] }

function buildTransform(cfg) {
  return `translateX(${cfg.x}px) translateY(${cfg.y}px) rotate(${cfg.r}deg)`
}

function getTransform(idx, selectedIdx, isDeckHovered) {
  if (idx === selectedIdx) {
    return `translateX(0px) translateY(-198px) rotate(0deg) scale(1.5)`
  }
  if (selectedIdx === null) {
    return buildTransform(isDeckHovered ? FAN_3[idx] : IDLE[idx])
  }
  const rank = OTHERS[selectedIdx].indexOf(idx)
  return buildTransform(isDeckHovered ? FAN_2_FULL[rank] : FAN_2_PARTIAL[rank])
}

function getZIndex(idx, selectedIdx) {
  if (idx === selectedIdx) return 20
  if (selectedIdx === null) return passions.length - idx
  return OTHERS[selectedIdx].indexOf(idx) + 1
}

// ─── Component ────────────────────────────────────────────────────────────────

function Passions() {
  const [isDeckHovered, setIsDeckHovered] = useState(false)
  const [selectedIdx, setSelectedIdx]     = useState(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSelectedIdx(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleCardClick = (e, idx) => {
    e.stopPropagation()
    setSelectedIdx(prev => (prev === idx ? null : idx))
  }

  const hint =
    selectedIdx !== null ? 'Click card to return'
    : isDeckHovered      ? 'Select a card'
    :                      'Hover to explore'

  return (
    <section className={`${styles.passions} section-padding`}>

      {/* ── Background geometry ── */}
      <div className={styles.bgShapes} aria-hidden="true">
        <div className={`${styles.sq} ${styles.sq1}`} />
        <div className={`${styles.sq} ${styles.sq2}`} />
        <div className={`${styles.sq} ${styles.sq3}`} />
        <div className={`${styles.sq} ${styles.sq4}`} />
        <div className={`${styles.sq} ${styles.sq5}`} />
        <div className={`${styles.sq} ${styles.sq6}`} />
        <div className={`${styles.sq} ${styles.sq7}`} />
        <div className={`${styles.sq} ${styles.sq8}`} />
        <div className={`${styles.sq} ${styles.sq9}`} />
        <div className={`${styles.sq} ${styles.sq10}`} />
        <div className={`${styles.sq} ${styles.sq11}`} />
        <div className={`${styles.sq} ${styles.sq12}`} />
        <div className={`${styles.ln} ${styles.ln1}`} />
        <div className={`${styles.ln} ${styles.ln2}`} />
        <div className={`${styles.ln} ${styles.ln3}`} />
        <div className={`${styles.ln} ${styles.ln4}`} />
        <div className={`${styles.ln} ${styles.ln5}`} />
        <div className={`${styles.ln} ${styles.ln6}`} />
        <div className={`${styles.ln} ${styles.ln7}`} />
        <div className={`${styles.ln} ${styles.ln8}`} />
        <div className={`${styles.ln} ${styles.ln9}`} />
      </div>

      <div className={styles.sectionInner}>

        {/* ── Left: text ── */}
        <div className={styles.textSide}>
          <div className={styles.header}>
            <h2 className={styles.title}>ABOUT</h2>
            <h2 className={styles.titleOutline}>ME</h2>
          </div>
          <div className={styles.bio}>
            <p className={styles.bioLine}>
              Building things has always been the way I think. Before I understood what
              programming was, I was pulling things apart just to understand how they worked.
              Software turned out to be the cleanest expression of that instinct — and getting
              to do it for a living still feels like I got away with something.
            </p>
            <p className={styles.bioLine}>
              Every project is a problem worth solving properly. There&rsquo;s a satisfaction
              in clean, working software that nothing else really matches. It&rsquo;s not just
              a career — it&rsquo;s exactly how I&rsquo;d choose to spend my time anyway.
            </p>
            <p className={styles.bioLine}>
              Alongside the work, I make time for the things that keep me balanced. The gym
              is a constant — early mornings, consistent training, and the kind of progress
              that compounds quietly over time. Golf fills the weekends; it&rsquo;s frustrating
              in the best way and still something I&rsquo;m actively working to get better at.
              And when the day winds down, gaming is where I switch off — competitive by nature,
              even then.
            </p>
          </div>
        </div>

        {/* ── Right: deck ── */}
        <div className={styles.deckSide}>
          <p className={styles.hint} aria-live="polite">{hint}</p>
          <div
            className={styles.deck}
            onMouseEnter={() => setIsDeckHovered(true)}
            onMouseLeave={() => setIsDeckHovered(false)}
            onClick={() => setSelectedIdx(null)}
          >
            {passions.map((p, i) => (
              <div
                key={p.label}
                className={`${styles.card} ${selectedIdx === i ? styles.cardActive : ''}`}
                style={{
                  transform: getTransform(i, selectedIdx, isDeckHovered),
                  zIndex:    getZIndex(i, selectedIdx),
                }}
                onClick={(e) => handleCardClick(e, i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleCardClick(e, i)}
                aria-label={`${p.label} — click to ${selectedIdx === i ? 'close' : 'expand'}`}
              >
                <img src={p.image} alt={p.label} className={styles.img} />
                <div className={styles.cardGradient} aria-hidden="true" />
                <div className={styles.cardContent}>
                  <span className={styles.cardIndex}>{p.index}</span>
                  <h3 className={styles.cardLabel}>{p.label}</h3>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

export default Passions
