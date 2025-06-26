// app/profile/page.tsx o .jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react'; // Necesitarás useState para controlar la visibilidad del formulario
import styles from '../../../components/styles/Profile/profile.module.css'; // Asumiendo que esta es la ruta a tu CSS del perfil
import RegisterForm from '../../../components/auth/registerFormAdmin'; // Importa el RegisterForm
import { useUser } from '@/context/userContext'; // Asegúrate de que userContext provee el role del usuario
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoadingUser } = useUser();
  const [showRegisterAdminForm, setShowRegisterAdminForm] = useState(false); // Estado para controlar la visibilidad del formulario de admin


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

  return (
    <div className={styles.profileContainer}>
      {/* Encabezado con botón de edición y cerrar sesión */}
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
          {/* Condición para mostrar la Carrera solo si es student */}
          {isStudent && (
            <div className={styles.detailItem}>
              <h3 className={styles.detailLabel}>Carrera</h3>
              <p className={styles.detailValue}>{user.career}</p>
            </div>
          )}
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
      )}

      {/* Sección para registrar administradores - Solo si el usuario actual es admin */}
      {isAdmin && (
        <div className={styles.adminSection}>
          <h3 className={styles.sectionTitle}>Administración de Usuarios</h3>
          <button
            className={styles.adminActionButton} // Puedes crear un estilo para este botón
            onClick={() => setShowRegisterAdminForm(!showRegisterAdminForm)}
          >
            {showRegisterAdminForm ? "Ocultar Formulario de Registro de Admin" : "Registrar Nuevo Administrador"}
          </button>

          {showRegisterAdminForm && (
            <div className={styles.registerAdminFormContainer}>
              <RegisterForm />
            </div>
          )}
        </div>
      )}
    </div>
  );
}