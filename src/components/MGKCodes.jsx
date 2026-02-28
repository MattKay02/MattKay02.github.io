import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import mgkLogo from '../assets/MGKCodes/logo-white-elements.svg'
import styles from './MGKCodes.module.css'

function MGKCodes() {
  return (
    <div className={`${styles.mgk} section-padding`}>
      <div className={styles.bgTicker} aria-hidden="true">
        <div className={styles.bgTickerTrack}>
          <span>MGKCODES&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>MGKCODES&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>

      <div className={styles.bgLogoTicker} aria-hidden="true">
        <div className={styles.bgLogoTrack}>
          {[...Array(10)].map((_, i) => (
            <img key={i} src={mgkLogo} alt="" className={styles.bgLogoItem} draggable="false" />
          ))}
          {[...Array(10)].map((_, i) => (
            <img key={`b${i}`} src={mgkLogo} alt="" className={styles.bgLogoItem} draggable="false" />
          ))}
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>MGK</h2>
          <h2 className={styles.titleOutline}>CODES</h2>
          <div className={styles.line} />
        </div>

        <div className={styles.content}>
          <div className={styles.left}>
            <a
              href="https://mgkcodes.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.logoLink}
            >
              <img src={mgkLogo} alt="MGKCodes" className={styles.logo} draggable="false" />
            </a>
          </div>

          <div className={styles.right}>
            <p className={styles.text}>
              MGKCodes is my software development studio. I build web and
              mobile applications for clients who need solid, reliable
              software built properly from the start.
            </p>
            <p className={styles.text}>
              Not just client work. MGKCodes is also where I build and
              ship my own products. Things I want to exist, built by me,
              launched under this name.
            </p>
            <p className={styles.text}>
              Based in the UK. Working with clients worldwide. 
            </p>

            <div className={styles.actions}>
              <a
                href="https://mgkcodes.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                <span>MGKCODES.COM</span>
                <FiArrowUpRight />
              </a>
              <a
                href="https://github.com/MattKay02/MGKCodes"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.link} ${styles.linkGhost}`}
              >
                <FiGithub />
                <span>GITHUB</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MGKCodes
