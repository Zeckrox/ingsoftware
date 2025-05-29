import styles from "./sociallogin.module.css";
import Image from "next/image";

export default function SocialLogin() {
  return (
    <button className={styles.googleButton}>
      <Image src="/images/logoGoogle.png" alt="Google" width={40} height={40} />
      <span className={styles.googleText}>Continua con Google</span>
    </button>
  );
}
