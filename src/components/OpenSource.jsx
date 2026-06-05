import { FiExternalLink, FiGitPullRequest } from 'react-icons/fi'
import contributions from '../data/contributions'
import styles from './OpenSource.module.css'

function OpenSource() {
  return (
    <div className={`${styles.openSource} section-padding`}>
      <div className={styles.header}>
        <h2 className={styles.title}>OPEN</h2>
        <h2 className={styles.titleOutline}>SOURCE</h2>
        <div className={styles.line} />
      </div>

      <p className={styles.intro}>
        Working in code I didn&apos;t write — through review, on the maintainer&apos;s
        terms. Where my contributions to other people&apos;s projects land.
      </p>

      {contributions.length > 0 ? (
        <ul className={styles.list}>
          {contributions.map((c) => (
            <li key={c.url} className={styles.item}>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.itemLink}
              >
                <div className={styles.itemMain}>
                  <span className={styles.itemType}>{c.type}</span>
                  <h3 className={styles.itemProject}>{c.project}</h3>
                  <p className={styles.itemDesc}>{c.description}</p>
                  <span className={styles.itemRepo}>{c.repo}</span>
                </div>
                <FiExternalLink className={styles.itemIcon} />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>
          <FiGitPullRequest className={styles.emptyIcon} />
          <h3 className={styles.emptyTitle}>Contributions incoming</h3>
          <p className={styles.emptyText}>
            Next on my list — giving back to the open-source tools I build with.
            Merged pull requests will live here.
          </p>
        </div>
      )}
    </div>
  )
}

export default OpenSource
