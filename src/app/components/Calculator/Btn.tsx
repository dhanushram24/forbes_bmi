import React from "react";
import styles from './Calculator.module.css';
export default function Btn({ bmiResult, handleCalculate }) {
	return (
		<div className={styles.Btnn}>
				{bmiResult==='NaN'?(
				<button onClick={handleCalculate} className={styles.CalBtn}>
					Calculate &gt;
				</button>
				):(
				<button onClick={handleCalculate} className={styles.CalBtn}>
					Recalculate &#10227;
				</button>)}
			</div>
	)}