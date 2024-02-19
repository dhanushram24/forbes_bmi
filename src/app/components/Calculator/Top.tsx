import React from 'react';
import Image from 'next/image';
import styles from './Calculator.module.css';

export default function Top() {
  return (
    <div className={styles.Top}>
      <div className={styles.TopContent}>
        <h1 className={styles.Heading}>BMI Calculator</h1>
        <h2 className={styles.SubHeading}>Use this calculator to check your body mass index (BMI).</h2>
      </div>
      <div>
        <Image className={styles.img} src="/bmi2.png" alt="" width={100} height={50} />
      </div>
    </div>
  );
};