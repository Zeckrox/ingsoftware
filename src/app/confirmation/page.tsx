'use client';
import React, { Suspense, useEffect, useState } from 'react';
import styles from '../../components/styles/Confirmation/confirmation.module.css';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@/context/userContext'; 
import Link from 'next/link';

function Inside(){
  const searchParams = useSearchParams();
  const { user, isLoadingUser, isAuthenticated } = useUser(); 

  // Estados para almacenar los datos recibidos de la URL
  const [mesa, setMesa] = useState(searchParams.get('mesa'));
  const [cubiculo, setCubiculo] = useState(searchParams.get('cubiculo'));
  const [sala, setSala] = useState(searchParams.get('sala'));
  const [dia, setDia] = useState(searchParams.get('dia'));
  const [horaInicio, setHoraInicio] = useState(searchParams.get('horaInicio'));
  const [horaFin, setHoraFin] = useState(searchParams.get('horaFin'));
  const [cantidadPersonas, setCantidadPersonas] = useState(searchParams.get('cantidadPersonas'));

  // Función para formatear la fecha si la recibes en formato ISO
  const formatDisplayDate = (dateString: string | null): string => {
    if (!dateString) return "Fecha no disponible";
    try {
      // Intenta parsear la fecha, asumiendo un formato como 'YYYY-MM-DD'
      const date = new Date(dateString + 'T00:00:00'); // Añade T00:00:00 para evitar problemas de zona horaria

      const weekday = date.toLocaleDateString('es-ES', { weekday: 'long' });
      const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);

      const dayMonth = date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short'
      }).replace('.', ''); // Eliminar el punto del mes abreviado si existe

      return `${capitalizedWeekday} ${dayMonth.toUpperCase()}`; // Viernes 07 FEB
    } catch (error) {
      console.error("Error al formatear la fecha:", error);
      return "Fecha inválida";
    }
  };

  // Muestra un estado de carga mientras se obtiene el usuario
  if (isLoadingUser) {
    return <div>Cargando datos de usuario...</div>;
  }

  // Si no está autenticado o no hay usuario, puedes redirigir o mostrar un mensaje
  if (!isAuthenticated || !user) {
    // Puedes redirigir al login o a una página de error
    // router.push('/login'); // Si tuvieras un hook 'useRouter' aquí
    return <div>No estás autenticado o no se encontraron los datos del usuario.</div>;
  }

  // Lógica para determinar el título de la reserva (Mesa o Cubículo)
  const reservationTitle = () => {
    if (mesa) { // Si el parámetro 'mesa' existe y tiene un valor
      return `Mesa ${mesa}`;
    } else if (cubiculo) { // Si el parámetro 'cubiculo' existe y tiene un valor
      return `Cubículo ${cubiculo}`;
    }
    return 'Espacio no especificado'; // Fallback si ninguno existe
  };

  return (
    <div className={styles.container}>

    
      {/* Contenido principal */}
      <div className={styles.mainContent}>
        {/* Sección izquierda - Detalles de reserva */}
        <div className={styles.reservationInfo}>
          <h1 className={styles.mainTitle}>Reserva</h1>
          <h2 className={styles.reservationTitle}>{reservationTitle()}</h2>
          <div className={styles.reservationDetails}>
            <p className={styles.reservationText}><span className={styles.boldLabel}>{sala || 'N/A'}</span></p>
            <p className={styles.reservationText}><span className={styles.boldLabel}>Día:</span> {formatDisplayDate(dia)}</p>
            <p className={styles.reservationText}><span className={styles.boldLabel}>Horario:</span> {horaInicio || 'N/A'} - {horaFin || 'N/A'}</p>
            <p className={styles.reservationText}><span className={styles.boldLabel}>Cantidad de personas:</span> {cantidadPersonas || 'N/A'}</p>
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
              <div className={styles.dataValueBox}>{user.firstName}</div>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.dataLabel}>Apellido:</span>
              <div className={styles.dataValueBox}>{user.lastName}</div>
            </div>
          </div>
          <div className={styles.dataRow}>
            <div className={styles.dataItem}>
              <span className={styles.dataLabel}>Email (Institucional):</span>
              <div className={styles.dataValueBox}>{user.email}</div>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.dataLabel}>Carrera:</span>
              <div className={styles.dataValueBox}>{user.career}</div>
            </div>
          </div>
        </div>

        <div className={styles.confirmButtonContainer}>
          <Link  href="/profile">
          <button className={styles.confirmButton}>Aceptar</button>
          </Link>
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
}

const ConfirmationPage = () => {
  return(
    <Suspense>
      <Inside/>
    </Suspense>
  )
};

export default ConfirmationPage;