import styles from './SeccionUno.module.css';
import Image from 'next/image';
/* Intenté usar icono pero no sirvió import { FaCalendarCheck } from 'react-icons/fa'; */

export default function SeccionUno() {
  return (
    <section className={styles.banner}>
        <div className={styles.container}>
            <div className={styles.contenido}>
                
            <div>
                <h1 className={styles.titulo}>Reserva tu espacio</h1>
                <h1 className={styles.titulo}>para estudiar</h1>

                <p className={styles.subtitulo}>
                Cubículos y mesas <strong>disponibles</strong> en la
                </p>
                <p className={styles.pedroGrases}>Biblioteca Pedro Grases</p>
                <br>
                </br>

                <button className={styles.botonReservar}>
                    Reservar
                </button>
                <br>
                </br>
                <p className={styles.lunes}><strong>Lunes a Viernes</strong></p>
                <p className={styles.horario}>
                    <strong>Horario: </strong> 07:00 am – 10:00 pm
                </p>
                </div>

                <div className={styles.imagenWrapper}>
                <div className={styles.fondoDecorativo}></div>
                <div className={styles.imagenBiblioCircular}>
                    <Image
                    src="/biblioteca.png"
                    alt="Biblioteca"
                    width={400}
                    height={400}
                    className={styles.imagen}
                    />
                </div>
                </div>
            </div>
        </div>
    </section>
  );
}