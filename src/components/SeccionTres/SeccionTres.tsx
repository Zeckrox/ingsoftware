import styles from './SeccionTres.module.css';
export default function SeccionTres() {
  return (
    <section className={styles.fondoBibliotecaSillas}>
    <div className={styles.botonWrapper}>
    <button className={styles.botonAzul}>
    <span className={styles.iconoBoton}>📋</span>
    Ver espacios disponibles
    </button>
    </div>
    </section>
  );
}
