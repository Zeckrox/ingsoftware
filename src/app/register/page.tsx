import * as React from "react";
import Image from "next/image"; 
import styles from "../../components/auth/register.module.css"; 
import RegisterForm from "../../components/auth/registerForm";
import Link from "next/link";

export default function Register() {

  
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
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}