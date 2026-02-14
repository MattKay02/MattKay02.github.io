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
              MGKCodes is my development studio — I build web and mobile
              apps for founders and businesses who need something that
              actually works.
            </p>
            <p className={styles.text}>
              I also build my own products on the side. I care about good
              code and shipping things people want to use.
            </p>
            <p className={styles.text}>
              Based in London, working with clients everywhere. No fluff,
              just solid work and straight-up communication.
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
