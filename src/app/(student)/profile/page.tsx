'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../../../components/styles/Profile/profile.module.css';
import { useUser } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';


export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoadingUser } = useUser();
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [peopleCount, setPeopleCount] = useState(4); // Valor inicial de 4 personas


  const { data: reservas = [], isLoading, isError } = useQuery({
    queryKey: ['reservas', user?._id], 
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/reservations/reservas-user/${user._id}`);
      if (!res.ok) throw new Error('error al cargar reserv');
      return res.json();
    },
    enabled: !!user, 
  });

    if (isLoadingUser) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    // router.push("/login"); // se puede redirect al login si no hay user act
    return <div>Usuario no autenticado</div>;
  }

  
  if (isLoadingUser || isLoading || !user) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    return <div>Error al cargar tus reservas</div>;
  }

  // para separar reservas activas y el histirial de las pasadas comparando fechas
  const ahora = new Date();
  const reservasActivas = reservas.filter((reserva: any) => new Date(reserva.date) >= ahora);
  const reservasPasadas = reservas.filter((reserva: any) => new Date(reserva.date) < ahora);


  if (isLoadingUser || !user) {
    return <div>Cargando...</div>;
  }

  function handleLogOut() {
    localStorage.removeItem("token");
    router.push("/");
  }

  // mejor hacer una card para acortar codigo (pagina lentaaa)
  const renderReservaCard = (reserva: any) => {
    const fecha = new Date(reserva.date).toLocaleDateString();
    const horaInicio = reserva.timeblocks?.[0] || 10;
    // hacer logica bien de horaaaa!!! y abajo cambiar
    const horaFin = reserva.timeblocks?.[reserva.timeblocks.length - 1] + 1 || 12;

    return (
      <div key={reserva._id} className={styles.reservationCard}>
        <div className={styles.reservationImageContainer}>
          <Image 
            src="/images/Mesas.jpg" 
            alt="Reserva"
            fill
            className={styles.reservationImage}
          />
          <div className={styles.mesaBadge}>
            {reserva.tableId ? `Mesa ${reserva.number}` : `Cubículo ${reserva.number}`}
          </div>
        </div>
        <div className={styles.reservationDetails}>
          <p><strong>Fecha:</strong> {fecha}</p>
          {/* AQUI CAMBIAR HORAAAAAA */}
          <p><strong>Horario:</strong> {horaInicio}:00 - {horaFin}:00</p> 
          <p><strong>Sala:</strong> {reserva.room}</p>
          <p><strong>Personas:</strong> {reserva.floorNumber}</p>
        </div>
      </div>
    );
  };


  const isAdmin = user.role === 'admin';
  const isStudent = user.role === 'student';
  function handleModifyPeople(increment) {
    const newCount = peopleCount + increment;
    if (newCount >= 1 && newCount <= 6) {
      setPeopleCount(newCount);
    }
  }

  function confirmModify() {
    // Aquí iría la lógica para guardar el cambio en el backend
    setShowModifyModal(false);
  }

  function confirmCancel() {
    // Aquí iría la lógica para cancelar la reserva en el backend
    setShowCancelModal(false);
  }


  return (
    <div className={styles.profileContainer}>
      {/* Encabezado con botón de edición */}
      <div className={styles.logOutContainer}>
        <button className={styles.logOut} onClick={handleLogOut}>Cerrar Sesion</button>
      </div>
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

      {/* informacion del usuario */}
      <div className={styles.userInfoSection}>
        <h2 className={styles.userName}>{`${user.firstName} ${user.lastName}`}</h2>
        <p className={styles.userEmail}>{user.email}</p>

        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <h3 className={styles.detailLabel}>Nombre</h3>
            <p className={styles.detailValue}>{user.firstName}</p>
          </div>
          <div className={styles.detailItem}>
            <h3 className={styles.detailLabel}>Apellido</h3>
            <p className={styles.detailValue}>{user.lastName}</p>
          </div>
          <div className={styles.detailItem}>
            <h3 className={styles.detailLabel}>Carrera</h3>
            <p className={styles.detailValue}>{user.career}</p>
          </div>
        </div>
      </div>

      {/* Reservas activas (studiantes */}
      {isStudent && (
        <>
        <h3 className={styles.sectionTitle}>Reservas activas</h3>
        {reservasActivas.length === 0 ? (
          <p className={styles.noReservations}>No tienes reservas activas actualmente</p>
        ) : (
          <div className={styles.reservationSection}>
            {reservasActivas.map((reserva: any) => renderReservaCard(reserva))}
          </div>
        )}
          {/* <h3 className={styles.sectionTitle}>Reservas Activas</h3>
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
            <div className={styles.reservationActions}>
              <button className={styles.actionButton}>Modificar cant. personas</button>
              <button className={styles.cancelButton}>Cancelar reserva</button>
            </div>
          </div> */}

          {/* Historial (estudiantes)) */}
          <h3 className={styles.sectionTitle}>Historial</h3>
          {reservasPasadas.length === 0 ? (
            <p className={styles.noReservations}>No tienes reservas pasadas. Empieza a reservar con nosotros</p>
          ) : (
            <div className={styles.reservationSection}>
              {reservasPasadas.map((reserva: any) => renderReservaCard(reserva))}
            </div>
          )}
          {/* <h3 className={styles.sectionTitle}>Historial</h3>
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
          </div> */}
        </>
      {/* Modal para modificar cantidad de personas */}
      {showModifyModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.peopleModal}>
            <h2 className={styles.modalTitle}>Modificar cantidad de personas</h2>
            <div className={styles.peopleCounter}>
              <button 
                className={styles.counterButton} 
                onClick={() => handleModifyPeople(-1)}
                disabled={peopleCount <= 1}
              >
                -
              </button>
              <span className={styles.peopleCount}>{peopleCount}</span>
              <button 
                className={styles.counterButton} 
                onClick={() => handleModifyPeople(1)}
                disabled={peopleCount >= 6}
              >
                +
              </button>
            </div>
            <div className={styles.modalButtons}>
              <button 
                className={styles.confirmButton}
                onClick={confirmModify}
              >
                Confirmar
              </button>
              <button 
                className={styles.cancelModalButton}
                onClick={() => setShowModifyModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para cancelar reserva */}
      {showCancelModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.cancelModal}>
            <h2 className={styles.modalTitle}>¿Seguro que quieres cancelar la reserva?</h2>
            <div className={styles.modalButtons}>
              <button 
                className={styles.noButton}
                onClick={() => setShowCancelModal(false)}
              >
                No
              </button>
              <button 
                className={styles.yesButton}
                onClick={confirmCancel}
              >
                Sí, estoy seguro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
