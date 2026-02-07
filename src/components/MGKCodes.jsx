import { FiArrowUpRight } from 'react-icons/fi'
import styles from './MGKCodes.module.css'

function MGKCodes() {
  return (
    <div className={`${styles.mgk} section-padding`}>
      <div className={styles.inner}>
        <div className={styles.bgLabel} aria-hidden="true">
          MGK
        </div>

        <div className={styles.content}>
          <div className={styles.left}>
            <h2 className={styles.title}>MGKCODES</h2>
            <div className={styles.line} />
          </div>

          <div className={styles.right}>
            <p className={styles.text}>
              Freelance development under the MGKCodes brand. I build
              websites, web apps, and digital products for clients who want
              something that works — and works well.
            </p>
            <p className={styles.text}>
              Clean code, clear communication, delivered on time. Whether it's
              a landing page or a full-stack build, I approach every project
              with the same standard.
            </p>

            <a
              href="https://mgkcodes.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <span>MGKCODES.COM</span>
              <FiArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MGKCodes
