import { useRef } from 'react'
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
import useMidscreenReveal from '../hooks/useMidscreenReveal'
import styles from './TechStack.module.css'

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
  const categoryRefs = useRef(
    categories.map(() => ({ current: null }))
  )

  const progressValues = useMidscreenReveal(categoryRefs.current, {
    visibilityZone: 500,
    staggerStep: 60,
    smoothing: 0.06,
  })

  return (
    <div className={`${styles.stack} section-padding`}>
      <div className={styles.header}>
        <h2 className={styles.title}>TECH</h2>
        <h2 className={styles.titleOutline}>STACK</h2>
      </div>

      <div className={styles.categories}>
        {categories.map((cat, i) => {
          const p = progressValues[i] ?? 0
          const c1 = 1.70158
          const c3 = c1 + 1
          const easedP = p >= 1 ? 1 : p <= 0 ? 0
            : 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2)

          return (
            <div
              key={cat.name}
              ref={categoryRefs.current[i]}
              className={`${styles.category} ${i % 2 !== 0 ? styles.categoryShift : ''}`}
              style={{
                opacity: Math.min(p * 1.5, 1),
                transform: `translateX(${(1 - easedP) * 80}px)`,
              }}
            >
              <h3 className={styles.catName}>{cat.name}</h3>
              <div className={styles.items}>
                {cat.items.map((item) => (
                  <div key={item.label} className={styles.item}>
                    {item.icon ? (
                      <item.icon className={styles.icon} />
                    ) : (
                      <span className={styles.iconFallback}>AI</span>
                    )}
                    <span className={styles.label}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TechStack
