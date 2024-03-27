import React from "react";
import styles from './calculator.module.css';

export default function Btn({ bmiResult }) {
  return (
    <div className={styles.Btnn}>
      {isNaN(bmiResult) || bmiResult === null ? (
        <button className={styles.CalBtn}>
          Calculate &gt;
        </button>
      ) : (
        <button className={styles.CalBtn} >
          Recalculate &#10227;
        </button>
      )}
    </div>
  )
}
