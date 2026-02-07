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
  return (
    <div className={`${styles.stack} section-padding`}>
      <div className={styles.header}>
        <h2 className={styles.title}>TECH</h2>
        <h2 className={styles.titleOutline}>STACK</h2>
      </div>

      <div className={styles.categories}>
        {categories.map((cat, i) => (
          <div
            key={cat.name}
            className={`${styles.category} ${i % 2 !== 0 ? styles.categoryShift : ''}`}
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
        ))}
      </div>
    </div>
  )
}

export default TechStack
