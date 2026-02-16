import { useState, useEffect } from 'react'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import styles from './Navbar.module.css'

const links = [
  { label: 'WORK', href: '#work' },
  { label: 'STACK', href: '#stack' },
  { label: 'FREELANCE', href: '#freelance' },
  { label: 'ABOUT', href: '#about' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={styles.nav}>
        <a
          href="#hero"
          className={styles.logo}
          onClick={(e) => handleClick(e, '#hero')}
        >
          MK.
        </a>

        {/* Desktop links (centered) */}
        <ul className={styles.desktopLinks}>
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={styles.link}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Social icons (top right) */}
        <div className={styles.socials}>
          <a href="https://github.com/MattKay02" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="GitHub">
            <FiGithub />
          </a>
          <a href="https://linkedin.com/in/matthew-kay-" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
            <FiLinkedin />
          </a>
          <a href="mailto:mattykay2002@gmail.com" className={styles.socialIcon} aria-label="Email">
            <FiMail />
          </a>
        </div>

        {/* Burger button (mobile only) */}
        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile overlay + panel */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayVisible : ''}`}
        onClick={() => setMenuOpen(false)}
      />
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul className={styles.mobileLinks}>
          {links.map((link, i) => (
            <li
              key={link.href}
              className={styles.mobileItem}
              style={{ transitionDelay: menuOpen ? `${i * 0.06}s` : '0s' }}
            >
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={styles.mobileLink}
                tabIndex={menuOpen ? 0 : -1}
              >
                <span className={styles.mobileLinkIndex}>0{i + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Navbar
