import React from 'react'
import styles from './style.module.css'
import Mystatus from '../../component/Mystatus'
import Otherstatus from '../../component/Otherstatus'
function Status() {
  return (
    <div className={styles.status}>
      <div className={styles.top}>
        <p>Status</p>
        <div className={styles.svgdiv}>
        <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#5f6368"><path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#5f6368"><path d="M479.79-192Q450-192 429-213.21t-21-51Q408-294 429.21-315t51-21Q510-336 531-314.79t21 51Q552-234 530.79-213t-51 21Zm0-216Q450-408 429-429.21t-21-51Q408-510 429.21-531t51-21Q510-552 531-530.79t21 51Q552-450 530.79-429t-51 21Zm0-216Q450-624 429-645.21t-21-51Q408-726 429.21-747t51-21Q510-768 531-746.79t21 51Q552-666 530.79-645t-51 21Z"/></svg>
        </div>
      </div>
      <div className={styles.mystatus}>
    <Mystatus/>
  </div>
  
  <div className={styles.otherstatus}>
<Otherstatus/>
  </div>

    </div>
    
  )
}

export default Status
