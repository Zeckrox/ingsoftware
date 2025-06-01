"use client";
import React from "react";
import styles from "./inputfield.module.css";
import Image from "next/image";

interface InputFieldProps {
  label: string;
  type: "text" | "email" | "password" | "select";
  placeholder: string;
  iconSrc?: string;
  showPasswordToggle?: boolean;
  lockIconSrc?: string;
  options?: string[];
}

export default function InputField({
  label,
  type,
  placeholder,
  showPasswordToggle,
  options,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  if (type === "select" && options) {
    return (
      <div className={styles.inputContainer}>
        <label className={styles.label}>{label}</label>
        <div className={styles.inputWrapper}>
          <select className={styles.selectInput}>
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          className={styles.input}
        />
        {showPasswordToggle && (
          <div className={styles.passwordControls}>
            <Image
              src="/images/ojocontraseña.png"
              alt="Lock"
              width={40} height={40}
              className={styles.visibilityIcon}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        )}
      </div>
    </div>
  );
}