import React from 'react'
import styles from './style.module.css'
import lapimg from '../../assets/lapimg.png'
import Button from '../../component/Button'

function Defchatbox() {
  return (
    <div className={styles.Defchatboxdiv}>

    <div className={styles.lapimg}>
        <img src={lapimg} alt="lapimg" />
    </div>
      <div className={styles.deatills}>
        <h1>Welcome to YapYup</h1>
        <p>The chat app for live time chating </p>
        <p className={styles.p2}>  the windoes app.</p>
      </div>
   <div className={styles.buttondiv}>
   </div>
      <div className={styles.last}>
      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368"><path d="M263.72-96Q234-96 213-117.15T192-168v-384q0-29.7 21.15-50.85Q234.3-624 264-624h24v-96q0-79.68 56.23-135.84 56.22-56.16 136-56.16Q560-912 616-855.84q56 56.16 56 135.84v96h24q29.7 0 50.85 21.15Q768-581.7 768-552v384q0 29.7-21.16 50.85Q725.68-96 695.96-96H263.72Zm.28-72h432v-384H264v384Zm216.21-120Q510-288 531-309.21t21-51Q552-390 530.79-411t-51-21Q450-432 429-410.79t-21 51Q408-330 429.21-309t51 21ZM360-624h240v-96q0-50-35-85t-85-35q-50 0-85 35t-35 85v96Zm-96 456v-384 384Z"/></svg>
        <p>Your personal messages are end-to-end encrypted</p>
      </div>
    </div>
  )
}

export default Defchatbox
