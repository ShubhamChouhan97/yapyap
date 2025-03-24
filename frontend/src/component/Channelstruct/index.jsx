import React from 'react';
import styles from './styles.module.css';

function Channelstruct({ name, message, time, count, image }) {
    return (
        <div className={styles.main}>
            <div className={styles.imgdiv}>
                <img src={image} alt={name} />
            </div>
            <div className={styles.details}>
                <p className={styles.p1}>{name}</p>
                <p className={styles.p2}>{message}</p>
            </div>
            <div className={styles.updates}>
                <div className={styles.p3div}>
                <p className={styles.p3}>{time}</p>
                </div>
                
                <div className={styles.p4div}>
                <p className={styles.p4}>{count}</p>
                </div>
                
            </div>
        </div>
    );
}

export default Channelstruct;
