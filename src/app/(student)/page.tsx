'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../../../components/styles/Profile/profile.module.css';
import RegisterForm from '../../../components/auth/registerFormAdmin';
import { useUser } from '@/context/userContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoadingUser } = useUser();
  const [showRegisterAdminForm, setShowRegisterAdminForm] = useState(false);
  const [showPeopleModal, setShowPeopleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [peopleCount, setPeopleCount] = useState(4); // Valor inicial de 4 personas

  if (isLoadingUser) {
    return <div>Cargando...</div>;
  }

  if (!user || !user.role) {
    return <div>Usuario no autenticado o rol no definido.</div>;
  }

  function handleLogOut() {
    localStorage.removeItem("token");
    router.push("/");
  }

  const handlePeopleChange = (increment: boolean) => {
    if (increment && peopleCount < 6) {
      setPeopleCount(peopleCount + 1);
    } else if (!increment && peopleCount > 1) {
      setPeopleCount(peopleCount - 1);
    }
  };

  const handleCancelReservation = () => {
    // Lógica para cancelar la reserva
    setShowCancelModal(false);
    // Aquí iría la llamada a la API para cancelar la reserva
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

      {/* Información del usuario */}
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
          {isStudent && (
            <div className={styles.detailItem}>
              <h3 className={styles.detailLabel}>Carrera</h3>
              <p className={styles.detailValue}>{user.career}</p>
            </div>
          )}
        </div>
      </div>

      {/* Reservas Activas - Solo para estudiantes */}
      {isStudent && (
        <>
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
                <p><strong>Personas:</strong> {peopleCount}</p>
              </div>
            </div>
            <div className={styles.reservationActions}>
              <button 
                className={styles.actionButton} 
                onClick={() => setShowPeopleModal(true)}
              >
                Modificar cant. personas
              </button>
              <button 
                className={styles.cancelButton}
                onClick={() => setShowCancelModal(true)}
              >
                Cancelar reserva
              </button>
            </div>
          </div>

          {/* Historial - Solo para estudiantes */}
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
        </>
      )}

      {/* Sección para registrar administradores - Solo si el usuario actual es admin */}
      {isAdmin && (
        <div className={styles.adminSection}>
          <h3 className={styles.sectionTitle}>Administración de Usuarios</h3>
          <button
            className={styles.adminActionButton} 
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

      {/* Modal para modificar cantidad de personas */}
      {showPeopleModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.peopleModal}>
            <h3>Modificar cantidad de personas</h3>
            <div className={styles.peopleCounter}>
              <button 
                className={styles.counterButton} 
                onClick={() => handlePeopleChange(false)}
                disabled={peopleCount <= 1}
              >
                -
              </button>
              <span className={styles.peopleCount}>{peopleCount}</span>
              <button 
                className={styles.counterButton}
                onClick={() => handlePeopleChange(true)}
                disabled={peopleCount >= 6}
              >
                +
              </button>
            </div>
            <div className={styles.modalButtons}>
              <button 
                className={styles.confirmButton}
                onClick={() => setShowPeopleModal(false)}
              >
                Confirmar
              </button>
              <button 
                className={styles.cancelModalButton}
                onClick={() => setShowPeopleModal(false)}
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
            <h3>¿Estás seguro que quieres cancelar la reserva?</h3>
            <div className={styles.modalButtons}>
              <button 
                className={styles.noButton}
                onClick={() => setShowCancelModal(false)}
              >
                No
              </button>
              <button 
                className={styles.yesButton}
                onClick={handleCancelReservation}
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