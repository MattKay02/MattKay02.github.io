import { useState } from 'react'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import projects from '../data/projects'
import styles from './Portfolio.module.css'

const filters = ['All', 'Mobile Apps', 'Web Apps']

const filterMap = {
  All: null,
  'Mobile Apps': 'Mobile App',
  'Web Apps': 'Web',
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
        {filtered.map((project) => (
          <article key={project.id} className={styles.card}>
            <div className={styles.imageWrap}>
              {project.image ? (
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
        ))}
      </div>
    </div>
  )
}

export default Portfolio
