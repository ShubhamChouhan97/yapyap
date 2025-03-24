import React from "react";
import styles from "./style.module.css";

function Input({ type = "text", name, placeholder, value, onChange, required = false, label, onKeyDown  }) {
  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        name={name}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export default Input;
