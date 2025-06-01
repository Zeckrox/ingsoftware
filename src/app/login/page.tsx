import * as React from "react";
import Image from "next/image"; 
import styles from "./login.module.css"; 
import LoginForm  from "./loginform";

export default function Login() {
  return (
    <main className={styles.login}>
      <section className={styles.container}>
        <Image
          src="/images/Libreros.jpg" 
          alt="Background"
          className={styles.backgroundImage}
          width={1341} 
          height={687} 
        />
        <div className={styles.formContainer}>
          <Image
            src="/images/Logo-BPG.png" 
            alt="Logo"
            className={styles.logo}
            width={400} 
            height={100} 
          />
          <LoginForm />
        </div>
      </section>
    </main>
  );
}