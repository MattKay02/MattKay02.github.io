import { useState, useEffect } from 'react'
import styles from './IntroScreen.module.css'

function IntroScreen({ onComplete }) {
  const [phase, setPhase] = useState('scanning')

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase('hold'), 1200)
    const fallTimer = setTimeout(() => setPhase('falling'), 1800)
    const exitTimer = setTimeout(() => setPhase('exit'), 2000)
    const doneTimer = setTimeout(() => {
      setPhase('done')
      onComplete()
    }, 3200)

    return () => {
      clearTimeout(holdTimer)
      clearTimeout(fallTimer)
      clearTimeout(exitTimer)
      clearTimeout(doneTimer)
    }
  }, [onComplete])

  if (phase === 'done') return null

  const isFalling = phase === 'falling' || phase === 'exit'

  return (
    <div className={styles.intro} aria-hidden="true">
      <div className={`${styles.backdrop} ${phase === 'exit' ? styles.backdropExit : ''}`}>
        <div className={styles.textContainer}>
          <span className={`${styles.initials} ${phase === 'scanning' ? styles.scanning : ''} ${isFalling ? styles.falling : ''}`}>
            <span className={styles.letter}>M</span>
            <span className={styles.letter}>K</span>
            <span className={styles.dot}>.</span>
          </span>
          <div className={`${styles.rule} ${phase !== 'scanning' ? styles.ruleVisible : ''} ${isFalling ? styles.ruleFalling : ''}`} />
        </div>
      </div>

      {phase === 'scanning' && <div className={styles.scanLine} />}
    </div>
  )
}

export default IntroScreen
