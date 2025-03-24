import React from 'react'
import styles  from './style.module.css'


const Statusstructure = ({ picture, name, time }) => {
  return (
    <div>
      <div className={styles.strut}>
        <div className={styles.imgdiv}>
          <img src={picture} alt={name} />
        </div>
        <div className={styles.statusdetails}>
          <p className={styles.p1}>{name}</p>
          <p className={styles.p2}>{time}</p>
        </div>
      </div>
    </div>
  )
}

export default Statusstructure