import { FiGithub } from 'react-icons/fi'
import projects from '../data/projects'
import styles from './Portfolio.module.css'

function Portfolio() {
  return (
    <div className={`${styles.portfolio} section-padding`}>
      <div className={styles.header}>
        <h2 className={styles.title}>SELECTED</h2>
        <h2 className={styles.titleOutline}>WORK</h2>
        <div className={styles.line} />
      </div>

      <div className={styles.grid}>
        {projects.map((project, i) => (
          <article
            key={project.id}
            className={`${styles.card} ${i === 1 ? styles.cardOffset : ''}`}
          >
            <div className={styles.imageWrap}>
              <div className={styles.image}>
                <span>PROJECT SCREENSHOT</span>
              </div>
              <span className={styles.category}>{project.category}</span>
            </div>

            <div className={styles.info}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.description}>{project.description}</p>

              <div className={styles.meta}>
                <div className={styles.tags}>
                  {project.tech.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.github}
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <FiGithub />
                  <span>REPO</span>
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
