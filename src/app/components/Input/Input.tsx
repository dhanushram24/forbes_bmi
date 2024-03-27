import React from "react";
import styles from './input.module.css';
import { Controller } from "react-hook-form";

export default function Input({
  name,
  value,
  label,
  control,
  rules,
  errorMessage,
  errors,
  onChange,
}) {
  return (
    <div>
      <div style={{ display: 'flex', position: 'relative' }}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <input
              type="number"
              value={value}
              onChange={onChange}
              {...field}
              className={styles.Input}
            />
          )}
        />
        <span className={styles.ym}>{label}</span>
      </div>
      <div className={styles.inInvalid}>
        {errors && errors[name] && <span>{errorMessage}</span>}
      </div>
    </div>
  );
}
