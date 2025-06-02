'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './profile.module.css';

type ProfileData = {
  nombre: string;
  apellido: string;
  carrera: string;
  telefono: string;
  genero: string;
};

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>({
    nombre: 'María',
    apellido: 'Perez',
    carrera: 'Ing. Sistemas',
    telefono: '+58 414-3686749',
    genero: 'Mujer'
  });

  // Cargar datos desde localStorage al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
      setProfileData(JSON.parse(savedData));
    }
  }, []);

  return (
    <div className={styles.profileContainer}>
      {/* Encabezado con botón de edición */}
      <div className={styles.headerContainer}>
        <h1 className={styles.welcomeTitle}>Bienvenido</h1>
        <Link href="/profile/edit" className={styles.editLink}>
          <Image 
            src="/images/Lapiz.png" 
            alt="Editar perfil" 
            width={24} 
            height={24}
            className={styles.editIcon}
          />
        </Link>
      </div>

      {/* Información del usuario */}
      <div className={styles.userInfoSection}>
        <h2 className={styles.userName}>{`${profileData.nombre} ${profileData.apellido}`}</h2>
        <p className={styles.userEmail}>mperez@correo.unimet.edu.ve</p>

        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <h3 className={styles.detailLabel}>Nombre</h3>
            <p className={styles.detailValue}>{profileData.nombre}</p>
          </div>
          <div className={styles.detailItem}>
            <h3 className={styles.detailLabel}>Apellido</h3>
            <p className={styles.detailValue}>{profileData.apellido}</p>
          </div>
          <div className={styles.detailItem}>
            <h3 className={styles.detailLabel}>Carrera</h3>
            <p className={styles.detailValue}>{profileData.carrera}</p>
          </div>
          <div className={styles.detailItem}>
            <h3 className={styles.detailLabel}>Teléfono</h3>
            <p className={styles.detailValue}>{profileData.telefono}</p>
          </div>
          <div className={styles.detailItem}>
            <h3 className={styles.detailLabel}>Género</h3>
            <p className={styles.detailValue}>{profileData.genero}</p>
          </div>
        </div>
      </div>

      {/* Reservas Activas */}
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
            <div className={styles.mesaBadge}>Mesa 3</div>
          </div>
          <div className={styles.reservationDetails}>
            <p><strong>Fecha:</strong> 19/05/2025</p>
            <p><strong>Horario:</strong> 10:00 am - 12:00 m</p>
            <p><strong>Sala:</strong> Referencia</p>
            <p><strong>Personas:</strong> 4</p>
          </div>
        </div>
        {/* Botones en Reservas Activas */}
        <div className={styles.reservationActions}>
          <button className={styles.actionButton}>Modificar cant. personas</button>
          <button className={styles.cancelButton}>Cancelar reserva</button>
        </div>
      </div>

      {/* Historial */}
      <h3 className={styles.sectionTitle}>Historial</h3>
      <div className={styles.reservationSection}>
        <div className={styles.reservationCard}>
          <div className={styles.reservationImageContainer}>
            <Image 
              src="/images/Mesas.jpg" 
              alt="Mesa reservada"
              fill
              className={styles.reservationImage}
            />
            <div className={styles.mesaBadge}>Mesa 3</div>
          </div>
          <div className={styles.reservationDetails}>
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