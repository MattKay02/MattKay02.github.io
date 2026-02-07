import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import styles from './Hero.module.css'

function Hero() {
  return (
    <div className={styles.hero}>
      {/* Background oversized text */}
      <div className={styles.bgText} aria-hidden="true">
        MATTHEW
      </div>

      <div className={styles.content}>
        <div className={styles.left}>
          <p className={styles.tag}>SOFTWARE DEVELOPER</p>
          <h1 className={styles.name}>
            MATTHEW
            <br />
            <span className={styles.nameOffset}>KAY</span>
          </h1>
          <p className={styles.subtitle}>
            Building modern software with sharp instincts
            <br />
            and smarter tools.
          </p>

          <div className={styles.socials}>
            <a
              href="https://github.com/MattKay02"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
            <a
              href="https://linkedin.com/in/matthew-kay-"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
            <a href="mailto:mattykay2002@gmail.com" aria-label="Email">
              <FiMail />
            </a>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.headshotWrap}>
            <div className={styles.headshot}>
              <span>YOUR HEADSHOT</span>
            </div>
            <div className={styles.headshotLabel} aria-hidden="true">
              MK.
            </div>
          </div>
        </div>
      </div>

      <a
        href="#work"
        className={styles.scrollCue}
        onClick={(e) => {
          e.preventDefault()
          document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        SCROLL
      </a>
    </div>
  )
}

export default Hero
