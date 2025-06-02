"use client";
import React from "react";
import styles from "./inputfield.module.css";
import Image from "next/image";

// Update the interface to include value and onChange
interface InputFieldProps {
  label: string;
  type: "text" | "email" | "password" | "select" | "tel"; // Added "tel" for phone number semantic
  placeholder: string;
  iconSrc?: string;
  showPasswordToggle?: boolean;
  lockIconSrc?: string;
  options?: string[];
  // Add value and onChange to props
  value: string; // The current value of the input
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // Function to call when value changes
}

export default function InputField({
  label,
  type,
  placeholder,
  showPasswordToggle,
  options,
  value, // <--- Destructure 'value' from props
  onChange, // <--- Destructure 'onChange' from props
}: InputFieldProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  // For select type
  if (type === "select" && options) {
    return (
      <div className={styles.inputContainer}>
        <label className={styles.label}>{label}</label>
        <div className={styles.inputWrapper}>
          <select
            className={styles.selectInput}
            value={value} // <--- BIND THE VALUE PROP
            onChange={onChange} // <--- BIND THE ONCHANGE PROP
          >
            {/* The first option should have an empty value for "placeholder" behavior
                and should be disabled to prevent selection if it's just a placeholder. */}
            <option value="" disabled selected={!value}>
              {placeholder}
            </option>
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

  // For text, email, password, tel types
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          className={styles.input}
          value={value} // <--- BIND THE VALUE PROP
          onChange={onChange} // <--- BIND THE ONCHANGE PROP
        />
        {showPasswordToggle && (
          <div className={styles.passwordControls}>
            <Image
              src="/images/ojocontraseña.png"
              alt="Toggle password visibility"
              width={40}
              height={40}
              className={styles.visibilityIcon}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        )}
      </div>
    </div>
  );
}