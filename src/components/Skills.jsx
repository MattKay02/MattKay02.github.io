import { useState, useEffect } from 'react'
import { FiArrowUpRight, FiTerminal } from 'react-icons/fi'
import fallbackSkills, { REPO, MANIFEST } from '../data/skills'
import styles from './Skills.module.css'

function Skills() {
  // Render the baked fallback immediately, then replace it with the live
  // manifest from the skills repo once it loads. Adding a skill there shows
  // up here with no change to this repo.
  const [skills, setSkills] = useState(fallbackSkills)

  useEffect(() => {
    let cancelled = false
    fetch(MANIFEST, { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        const list = Array.isArray(data) ? data : data.skills
        if (!cancelled && Array.isArray(list) && list.length) setSkills(list)
      })
      .catch(() => {
        /* keep the baked fallback */
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className={`${styles.skills} section-padding`}>
      <div className={styles.header}>
        <h2 className={styles.title}>CUSTOM</h2>
        <h2 className={styles.titleOutline}>SKILLS</h2>
        <div className={styles.line} />
      </div>

      <p className={styles.intro}>
        Skills I&apos;ve built for AI coding agents — reusable capabilities that encode a
        workflow with the judgment and guardrails baked in. Engineering <em>with</em> AI,
        not just prompting it. They live in one open repo I add to as new ones earn their place.
      </p>

      <ul className={styles.list}>
        {skills.map((s) => (
          <li key={s.name} className={styles.item}>
            <a
              href={`${REPO}/tree/main/${s.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.itemLink}
            >
              <div className={styles.itemHead}>
                <FiTerminal className={styles.itemGlyph} />
                <span className={styles.itemName}>{s.name}</span>
                <span className={styles.itemLabel}>{s.label}</span>
                <FiArrowUpRight className={styles.itemArrow} />
              </div>
              <p className={styles.itemDesc}>{s.description}</p>
              <p className={styles.itemWhy}>
                <span>Why</span> {s.why}
              </p>
              <div className={styles.tags}>
                {s.stack.map((t) => (
                  <span key={t} className={styles.tag}>
                    {t}
                  </span>
                ))}
              </div>
            </a>
          </li>
        ))}
      </ul>

      <a
        href={REPO}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.repoLink}
      >
        <FiArrowUpRight /> View the skills repo
      </a>
    </div>
  )
}

export default Skills
