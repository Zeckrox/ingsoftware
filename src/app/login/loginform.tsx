"use client";
import * as React from "react";
import styles from "./loginform.module.css"; 
import inputStyles from "./inputfield.module.css"; 
import dividerStyles from "./divider.module.css"; 
import Image from "next/image";
// InputField Component
interface InputFieldProps {
  label: string;
  type: "text" | "email" | "password";
  placeholder: string;
  iconSrc?: string;
  showPasswordToggle?: boolean;
  lockIconSrc?: string;
}

function InputField({
  label,
  type,
  placeholder,
  iconSrc,
  showPasswordToggle,
  lockIconSrc,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className={inputStyles.inputContainer}>
      <label className={inputStyles.label}>{label}</label>
      <div className={inputStyles.inputWrapper}>
        <input
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          className={inputStyles.input}
        />
        {iconSrc && (
          <img src={iconSrc} alt="" className={inputStyles.icon} />
        )}
        {showPasswordToggle && (
          <div className={inputStyles.passwordControls}>
            <div className={inputStyles.lockContainer}>
              <img
                src={lockIconSrc}
                alt="Lock"
                className={inputStyles.visibilityIcon}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// SocialLogin Component (Assuming a simple placeholder for now)
function SocialLogin() {
  return (
      <button className={styles.googleButton}>
        <Image
          src="/images/logoGoogle.png"
          alt="Google"
          width={40}
          height={40}
        />
        <span className={styles.googleText}>
        Continua con Google
        </span>
      </button>
  );
}

// Divider Component
function Divider() {
  return (
    <div className={dividerStyles.divider}>
      <div className={dividerStyles.line} />
      <span className={dividerStyles.text}>O</span>
      <div className={dividerStyles.line} />
    </div>
  );
}

// LoginForm Component
export function LoginForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted!");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.title}>Inicia sesión en tu cuenta</h1>

      <InputField
        label="Email"
        type="email"
        placeholder="info@unimet.edu.ve"
      />

      <InputField
        label="Contraseña"
        type="password"
        placeholder="Ingresa tu contraseña"
        showPasswordToggle
        lockIconSrc="https://cdn.builder.io/api/v1/image/assets/ed74dcfaa95a44a29728b63f96c1becf/ec987e659b94cac3f468c6905b9e57d11c3d9303?placeholderIfAbsent=true"
      />

      <button type="submit" className={styles.submitButton}>
        Inicia sesión
      </button>

      <Divider />
      <SocialLogin />

      <footer className={styles.footer}>
        <p className={styles.registerText}>
          ¿Aún no tienes una cuenta?
          <button className={styles.registerLink}>Registrate gratis</button>
        </p>
      </footer>
    </form>
  );
}