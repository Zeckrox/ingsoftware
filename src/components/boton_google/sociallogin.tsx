import * as React from "react";
import styles from "./SocialLogin.module.css";

export function SocialLogin() {
  return (
    <button className={styles.googleButton}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/ed74dcfaa95a44a29728b63f96c1becf/48c9a6958efff041da030248247cc6070f244b54?placeholderIfAbsent=true"
        alt="Google"
        className={styles.googleIcon}
      />
      <span className={styles.googleText}>
        Continua con Google
      </span>
    </button>
  );
}
