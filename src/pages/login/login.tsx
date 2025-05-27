import * as React from "react";
import styles from "./Login.module.css";
import { LoginForm } from "./LoginForm";

export default function Login() {
  return (
    <main className={styles.login}>
      <section className={styles.container}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/ed74dcfaa95a44a29728b63f96c1becf/f0c0ec18cf804d36908e6b2338917c3c2071e33a?placeholderIfAbsent=true"
          alt="Background"
          className={styles.backgroundImage}
        />
        <div className={styles.formContainer}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/ed74dcfaa95a44a29728b63f96c1becf/52a73c88bdacb3605374bbdfe475861ce64cf99a?placeholderIfAbsent=true"
            alt="Logo"
            className={styles.logo}
          />
          <LoginForm />
        </div>
      </section>
    </main>
  );
}