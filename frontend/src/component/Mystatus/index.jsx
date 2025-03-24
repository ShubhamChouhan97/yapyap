import React from 'react'
import styles from './style.module.css'
function Mystatus() {
  return (
    <div className={styles.statusmy}>
     <div className={styles.dp}>
        <img src="https://i.pinimg.com/736x/69/a5/60/69a5602fb6377d1fef9bb45e8db9e415.jpg" alt="mystatus" />
     </div>
     <div className={styles.details}>
        <p className={styles.p1}>
            My Status
        </p>
        <p className={styles.p2}>
            Yesterday at 9:08 pm
        </p>
     </div>
    </div>
  )
}

export default Mystatus
