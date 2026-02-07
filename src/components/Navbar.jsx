import { useState } from 'react'
import styles from './Navbar.module.css'

const links = [
  { label: 'WORK', href: '#work' },
  { label: 'STACK', href: '#stack' },
  { label: 'FREELANCE', href: '#freelance' },
  { label: 'ABOUT', href: '#about' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={styles.nav}>
      <a
        href="#hero"
        className={styles.logo}
        onClick={(e) => handleClick(e, '#hero')}
      >
        MK
      </a>

      <button
        className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
      </button>

      <ul className={`${styles.links} ${menuOpen ? styles.linksOpen : ''}`}>
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
    </nav>
  )
}

export default Navbar
