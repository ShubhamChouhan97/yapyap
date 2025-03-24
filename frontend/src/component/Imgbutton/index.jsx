import React from 'react';
import styles from './style.module.css';

function Imgbutton({ onClick, image }) {
  return (
    <button onClick={onClick} className={styles.button}>
      <img src={image} alt="Button Icon"  />
    </button>
  );
}

export default Imgbutton;
