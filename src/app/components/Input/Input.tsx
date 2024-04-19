import React from "react";
import styles from './input.module.css';

export default function Input({
  value,
  min,
  max,
  invalidMessage,
  onChange,
}) {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="number"
        value={value}
        className={styles.Input}
        min={min}
        max={max}
        onChange={handleInputChange}
      />
      {(parseInt(value) >= min && parseInt(value) <= max) || value === "" ? (
        <div></div>
      ) : (
        <div className={styles.inputInvalid}>
          <span>{invalidMessage}</span>
        </div>
      )}
    </div>
  );
}
