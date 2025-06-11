import React from 'react';
import styles from '../../components/styles/Confirmation/confirmation.module.css';
import Link from 'next/link';
import Image from 'next/image';

const ConfirmationPage = () => {
  return (
    <div className={styles.container}>
      {/* Barra de navegación */}
      <nav className={styles.navBar}>
        <Link href="/mesas" className={styles.navItem}>Mesas</Link>
        <span className={styles.separator}>/</span>
        <Link href="/calendario" className={styles.navItem}>Calendario</Link>
        <span className={styles.separator}>/</span>
        <Link href="/mapa" className={styles.navItem}>Mapa</Link>
        <span className={styles.separator}>/</span>
        <Link href="/reserva" className={`${styles.navItem} ${styles.active}`}>Reserva</Link>
      </nav>

      {/* Contenido principal */}
      <div className={styles.mainContent}>
        {/* Sección izquierda - Detalles de reserva */}
        <div className={styles.reservationInfo}>
          <h1 className={styles.mainTitle}>Reserva</h1>
          <h2 className={styles.reservationTitle}>Mesa 5</h2>
          <div className={styles.reservationDetails}>
            <p className={styles.reservationText}><span className={styles.boldLabel}>Sala de Referencia</span></p>
            <p className={styles.reservationText}><span className={styles.boldLabel}>Día:</span> Viernes 07 FEB</p>
            <p className={styles.reservationText}><span className={styles.boldLabel}>Horario:</span> 8am - 8:30am</p>
            <p className={styles.reservationText}><span className={styles.boldLabel}>Cantidad de personas:</span> 4</p>
          </div>
        </div>

        {/* Sección derecha - Imagen */}
        <div className={styles.imageWrapper}>
          <div className={styles.imageContainer}>
            <Image 
              src="/images/Mesas.jpg" 
              alt="Mesas" 
              width={400} 
              height={400}
              className={styles.reservationImage}
              priority
            />
            <div className={styles.orangeBorder}></div>
          </div>
        </div>
      </div>

      {/* Sección de confirmación */}
      <div className={styles.confirmationSection}>
        <h2 className={styles.sectionTitle}>Confirma tus datos:</h2>
        
        <div className={styles.dataGrid}>
          <div className={styles.dataRow}>
            <div className={styles.dataItem}>
              <span className={styles.dataLabel}>Nombre:</span>
              <div className={styles.dataValueBox}>María</div>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.dataLabel}>Apellido:</span>
              <div className={styles.dataValueBox}>Pérez</div>
            </div>
          </div>
          <div className={styles.dataRow}>
            <div className={styles.dataItem}>
              <span className={styles.dataLabel}>Email (Institucional):</span>
              <div className={styles.dataValueBox}>maria.perez@correo.unimet.edu.ve</div>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.dataLabel}>Carrera:</span>
              <div className={styles.dataValueBox}>Ingeniería de Sistemas</div>
            </div>
          </div>
        </div>

        <div className={styles.confirmButtonContainer}>
          <button className={styles.confirmButton}>Confirmar Reserva</button>
        </div>

        <div className={styles.remindersSection}>
          <h3 className={styles.remindersTitle}>Recuerda:</h3>
          <ul className={styles.remindersList}>
            <li>Llega a tiempo: Así aprovechas al máximo tu reserva y no interrumpes a los demás.</li>
            <li>Mantén el silencio: La biblioteca es un lugar para la concentración y el estudio.</li>
            <li>Respeta el espacio compartido: Cuida las instalaciones y deja todo ordenado.</li>
          </ul>
          <h3 className={styles.finalMessage}>¡Disfruta de tu Biblioteca!</h3>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;