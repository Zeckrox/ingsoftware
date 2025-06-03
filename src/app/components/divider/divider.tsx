import styles from "./divider.module.css";

export default function Divider() {
  return (
    <div className={styles.divider}>
      <div className={styles.line} />
      <span className={styles.text}>O</span>
      <div className={styles.line} />
    </div>
  );
}
