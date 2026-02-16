import { useState, useEffect, useCallback } from 'react'
import IntroScreen from './components/IntroScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import TechStack from './components/TechStack'
import MGKCodes from './components/MGKCodes'
import Passions from './components/Passions'
import Footer from './components/Footer'
import styles from './App.module.css'

function App() {
  const [introDone, setIntroDone] = useState(false)

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true)
    document.body.style.overflow = ''
  }, [])

  useEffect(() => {
    if (!introDone) {
      document.body.style.overflow = 'hidden'
    }
  }, [introDone])

  return (
    <div className={styles.app}>
      {!introDone && <IntroScreen onComplete={handleIntroComplete} />}
      <Navbar />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="work">
          <Portfolio />
        </section>
        <section id="stack">
          <TechStack />
        </section>
        <section id="freelance">
          <MGKCodes />
        </section>
        <section id="about">
          <Passions />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
