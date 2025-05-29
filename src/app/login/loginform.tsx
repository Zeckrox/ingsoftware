"use client";
import styles from "./loginform.module.css";
import InputField from "../components/inputfield/inputField";
import Divider from "../components/divider/divider";
import SocialLogin from "../components/boton_google/socialLogin";

export default function LoginForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
