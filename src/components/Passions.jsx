import gymImg from '../assets/passions/Gym_image.JPG'
import golfImg from '../assets/passions/Golf_image.JPG'
import ps5Img from '../assets/passions/Playstation_image.png'
import styles from './Passions.module.css'

const passions = [
  { label: 'FITNESS', img: gymImg, note: 'Early mornings, heavy lifts.' },
  { label: 'GOLF', img: golfImg, note: 'Still working on the handicap.' },
  { label: 'GAMING', img: ps5Img, note: 'Competitive by nature.' },
]

function Passions() {
  return (
    <div className={`${styles.passions} section-padding`}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>OFF THE</h2>
          <h2 className={styles.titleOutline}>CLOCK</h2>
        </div>

        <div className={styles.grid}>
          {passions.map((p, i) => (
            <div
              key={p.label}
              className={`${styles.item} ${i === 1 ? styles.itemShift : ''}`}
            >
              <div className={styles.image}>
                <img src={p.img} alt={p.label} className={styles.passionImg} />
              </div>
              <div className={styles.info}>
                <h3 className={styles.label}>{p.label}</h3>
                <p className={styles.note}>{p.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Passions
