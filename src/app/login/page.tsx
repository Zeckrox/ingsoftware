import * as React from "react";
import Image from "next/image"; 
import styles from "../../components/auth/login.module.css"; 
import LoginForm  from "../../components/auth/loginform";
import Link from "next/link";

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
          <Link href="/">
            <Image
              src="/images/Logo-BPG.png" 
              alt="Logo"
              className={styles.logo}
              width={400} 
              height={100} 
            />
          </Link>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}