import React from 'react';
import styles from './style.module.css';

function Button({ children, onClick, active }) {
    const buttonStyle = active ? `${styles.selectbtnn} ${styles.activeButton}` : styles.selectbtnn;
    return (
        <button className={buttonStyle} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;