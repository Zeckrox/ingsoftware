import Image from 'next/image';
import styles from './profile.module.css';

export default function ProfilePage() {
  return (
    <div className={styles.profileContainer}>
      {/* Encabezado con botón de edición */}
      <div className={styles.headerContainer}>
        <h1 className={styles.welcomeTitle}>Bienvenido</h1>
        <a 
          href="about:blank" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.editLink}
        >
          <Image 
            src="/images/Lapiz.png" 
            alt="Editar perfil" 
            width={24} 
            height={24}
            className={styles.editIcon}
          />
        </a>
      </div>

      {/* Información del usuario */}
      <div className={styles.userInfoSection}>
        <h2 className={styles.userName}>María Perez</h2>
        <p className={styles.userEmail}>mperez@unimet.edu.ve</p>

        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <h3 className={styles.detailLabel}>Nombre</h3>
            <p className={styles.detailValue}>María</p>
          </div>
          <div className={styles.detailItem}>
            <h3 className={styles.detailLabel}>Apellido</h3>
            <p className={styles.detailValue}>Perez</p>
          </div>
          <div className={styles.detailItem}>
            <h3 className={styles.detailLabel}>Carrera</h3>
            <p className={styles.detailValue}>Ing. Sistemas</p>
          </div>
          <div className={styles.detailItem}>
            <h3 className={styles.detailLabel}>Teléfono</h3>
            <p className={styles.detailValue}>+58 414-3686749</p>
          </div>
          <div className={styles.detailItem}>
            <h3 className={styles.detailLabel}>Género</h3>
            <p className={styles.detailValue}>Mujer</p>
          </div>
        </div>
      </div>

      {/* Reservas*/}
      <h3 className={styles.sectionTitle}>Reservas Activas</h3>
      <div className={styles.reservationSection}>
        <div className={styles.reservationCard}>
          <div className={styles.reservationImageContainer}>
            <Image 
              src="/images/Mesas.jpg" 
              alt="Mesa reservada"
              fill
              className={styles.reservationImage}
            />
          </div>
          <div className={styles.reservationDetails}>
            <h4>Mesa 3</h4>
            <p><strong>Fecha:</strong> 19/05/2025</p>
            <p><strong>Horario:</strong> 10:00 am - 12:00 m</p>
            <p><strong>Sala:</strong> Referencia</p>
            <p><strong>Personas:</strong> 4</p>
          </div>
        </div>
        {/* BOTONES EN RESERVAS ACTIVAS */}
        <div className={styles.reservationActions}>
          <button className={styles.actionButton}>Modificar cant. personas</button>
          <button className={styles.cancelButton}>Cancelar reserva</button>
        </div>
      </div>

      {/* Historial*/}
      <h3 className={styles.sectionTitle}>Historial</h3>
      <div className={styles.reservationSection}>
        <div className={styles.reservationCard}>
          <div className={styles.reservationImageContainer}>
            <Image 
              src="/images/Mesas.jpg" 
              alt="Mesa histórica"
              fill
              className={styles.reservationImage}
            />
          </div>
          <div className={styles.reservationDetails}>
            <h4>Mesa 3</h4>
            <p><strong>Fecha:</strong> 19/02/2025</p>
            <p><strong>Horario:</strong> 10:00 am - 12:00 m</p>
            <p><strong>Sala:</strong> Referencia</p>
            <p><strong>Personas:</strong> 4</p>
          </div>
        </div>
      </div>
    </div>
  );
}