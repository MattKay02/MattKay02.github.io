import { useRef, useEffect } from 'react'
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiHtml5,
  SiCss3,
  SiCplusplus,
  SiDotnet,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiNodedotjs,
  SiBootstrap,
  SiMongodb,
  SiMysql,
  SiSupabase,
  SiGithub,
  SiVercel,
  SiNetlify,
} from 'react-icons/si'
import { FiCpu } from 'react-icons/fi'
import styles from './TechStack.module.css'

// Deterministic scatter start positions — cycled per item so every item
// flies in from a unique direction. These are used as CSS custom property
// values on each .item element, resolved by the base CSS rule (not inside
// a @keyframes block, which has inconsistent var() support across browsers).
const SCATTER_OFFSETS = [
  { x: '-220px', y: '-70px',  r: '-12deg' },
  { x: '200px',  y: '-95px',  r: '11deg'  },
  { x: '-170px', y: '110px',  r: '-9deg'  },
  { x: '240px',  y: '65px',   r: '15deg'  },
  { x: '-250px', y: '-55px',  r: '-14deg' },
  { x: '175px',  y: '-115px', r: '8deg'   },
  { x: '-135px', y: '130px',  r: '-13deg' },
  { x: '210px',  y: '85px',   r: '12deg'  },
  { x: '-190px', y: '-85px',  r: '7deg'   },
  { x: '155px',  y: '105px',  r: '-10deg' },
  { x: '-145px', y: '-100px', r: '16deg'  },
  { x: '230px',  y: '-45px',  r: '-7deg'  },
]

const categories = [
  {
    name: 'LANGUAGES',
    items: [
      { icon: SiJavascript, label: 'JavaScript' },
      { icon: SiTypescript, label: 'TypeScript' },
      { icon: SiPython, label: 'Python' },
      { icon: SiHtml5, label: 'HTML' },
      { icon: SiCss3, label: 'CSS' },
      { icon: SiCplusplus, label: 'C++' },
      { icon: SiDotnet, label: 'C#' },
    ],
  },
  {
    name: 'FRAMEWORKS',
    items: [
      { icon: SiReact, label: 'React' },
      { icon: SiNextdotjs, label: 'Next.js' },
      { icon: SiVuedotjs, label: 'Vue.js' },
      { icon: SiNodedotjs, label: 'Node.js' },
      { icon: SiBootstrap, label: 'Bootstrap' },
    ],
  },
  {
    name: 'DATA',
    items: [
      { icon: SiMongodb, label: 'MongoDB' },
      { icon: SiMysql, label: 'MySQL' },
      { icon: SiSupabase, label: 'Supabase' },
    ],
  },
  {
    name: 'TOOLS',
    items: [
      { icon: SiGithub, label: 'GitHub' },
      { icon: SiVercel, label: 'Vercel' },
      { icon: SiNetlify, label: 'Netlify' },
      { icon: FiCpu, label: 'REST APIs' },
    ],
  },
  {
    name: 'AI',
    items: [
      { icon: null, label: 'Claude' },
      { icon: null, label: 'ChatGPT' },
      { icon: null, label: 'Gemini' },
    ],
  },
]

function TechStack() {
  const categoryRefs = useRef([])

  useEffect(() => {
    // Use a scroll listener (not IntersectionObserver) so the trigger fires
    // regardless of which element is the scroll container. body { overflow-x:
    // hidden } forces overflow-y to compute as auto, which can make <body>
    // the scroll container rather than the window — causing IntersectionObserver
    // with its default viewport root to never see elements "entering" the
    // viewport because the viewport itself doesn't change.
    const navEl = document.querySelector('nav')

    const check = () => {
      // Subtract the fixed navbar height from the viewport so all thresholds
      // are relative to the actual visible area below the navbar.
      const navH = navEl?.offsetHeight ?? 0
      const usableVh = window.innerHeight - navH

      categoryRefs.current.forEach((el) => {
        if (!el) return
        const rect = el.getBoundingClientRect()

        // Reveal: top of category crosses 65% of the usable viewport
        const inView = rect.top < navH + usableVh * 0.65 && rect.bottom > navH
        // Hide (exit upward): bottom crosses 35% of the usable viewport —
        // element is mostly past but its tail is still visible on screen
        const exitedTop = rect.bottom < navH + usableVh * 0.35
        // Hide (exit downward): element fully below the viewport
        const exitedBottom = rect.top > window.innerHeight

        if (inView) {
          el.setAttribute('data-revealed', '')
        } else if (exitedTop || exitedBottom) {
          el.removeAttribute('data-revealed')
        }
        // Gap zone (partially visible, between thresholds) — leave state as-is
      })
    }

    window.addEventListener('scroll', check, { passive: true })
    // Run once on mount in case the section is already in view
    check()

    return () => window.removeEventListener('scroll', check)
  }, [])

  return (
    <div className={`${styles.stack} section-padding`}>
      <div className={styles.header}>
        <h2 className={styles.title}>TECH</h2>
        <h2 className={styles.titleOutline}>STACK</h2>
      </div>

      <div className={styles.categories}>
        {categories.map((cat, ci) => (
          <div
            key={cat.name}
            ref={(el) => (categoryRefs.current[ci] = el)}
            className={`${styles.category} ${ci % 2 !== 0 ? styles.categoryShift : ''}`}
          >
            <h3 className={styles.catName}>{cat.name}</h3>

            <div className={styles.items}>
              {cat.items.map((item, ii) => {
                const offset = SCATTER_OFFSETS[(ci * 3 + ii) % SCATTER_OFFSETS.length]
                return (
                  <div
                    key={item.label}
                    className={styles.item}
                    style={{
                      // These CSS custom properties are consumed by the
                      // base .item CSS rule (NOT inside a @keyframes from
                      // block). Using var() in a regular rule is fully
                      // reliable; using it in a keyframes from block has
                      // inconsistent per-element resolution across browsers.
                      '--startX': offset.x,
                      '--startY': offset.y,
                      '--startR': offset.r,
                      '--stagger': ii,
                    }}
                  >
                    {item.icon ? (
                      <item.icon className={styles.icon} />
                    ) : (
                      <span className={styles.iconFallback}>AI</span>
                    )}
                    <span className={styles.label}>{item.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TechStack
