import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.cta}>
          <h2 className={styles.big}>LET'S</h2>
          <h2 className={styles.bigOutline}>WORK</h2>
        </div>

        <div className={styles.bottom}>
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

          <a href="mailto:mattykay2002@gmail.com" className={styles.email}>
            mattykay2002@gmail.com
          </a>

          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} Matthew Kay
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
