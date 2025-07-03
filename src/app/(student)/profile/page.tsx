// app/profile/page.tsx o .jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react'; // Necesitarás useState para controlar la visibilidad del formulario
import styles from '../../../components/styles/Profile/profile.module.css'; // Asumiendo que esta es la ruta a tu CSS del perfil
import RegisterForm from '../../../components/auth/registerFormAdmin'; // Importa el RegisterForm
import { useUser } from '@/context/userContext'; // Asegúrate de que userContext provee el role del usuario
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoadingUser } = useUser();
  const queryClient = useQueryClient();
  const [showRegisterAdminForm, setShowRegisterAdminForm] = useState(false); // Estado para controlar la visibilidad del formulario de admin
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [peopleCount, setPeopleCount] = useState(4); // Valor inicial de 4 personas
  const [selectedReservaId, setSelectedReservaId] = useState<string | null>(null);

  const { data: reservas = [], isLoading, isError } = useQuery({
    queryKey: ['reservas', user?._id], 
    queryFn: async () => {
      if (!user?._id) return []; // AQUI caso donde no hay user._id
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT_URL}reservations/reservas-user/${user?._id}`);
      if (!res.ok) throw new Error('error al cargar reserv');
      return res.json();
    },
    enabled: !!user?._id, 
  });

  const deleteReservaMutation = useMutation({
  mutationFn: async (id: string) => {
    const res = await fetch(`https://backendsoftware.vercel.app/reservations/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Error al cancelar la reserva');
    }
    return res.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['reservas', user?._id] });
  },
  onError: (error) => {
    console.error(error);
    alert('Hubo un error al cancelar la reserva');
  },
  });

  const updatePeopleMutation = useMutation({
    mutationFn: async ({ id, people }: { id: string; people: number }) => {
      console.log("corre updatePeopleMutation con id d reserva:", id, "y people:", people);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT_URL}reservations/update-people/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ people }),
      });
      if (!res.ok) {
        throw new Error('error al actualizar la cant de personas');
      }
      return res.json();
    },
    onSuccess: (data) => {
      console.log("reserva actualizada bieeeeen:", data);
      queryClient.invalidateQueries({ queryKey: ['reservas', user?._id] });
      alert("cantidad de personas actualizada!!");
    },
    onError: (error) => {
      console.error(error);
      alert('error al actualizar la cantidad de personas');
    },
  });

  if (isLoadingUser) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    // router.push("/login"); // se puede redirect al login si no hay user act
    return <div>Usuario no autenticado</div>;
  }

  if (isLoading) {
    return <div>Cargando reservas...</div>;
  }

  if (isError) {
    return <div>Error al cargar tus reservas</div>;
  }

  // para separar reservas activas y el histirial de las pasadas comparando fechas
  const ahora = new Date();
  const reservasActivas = reservas.filter((reserva: any) =>  new Date(reserva.date).setUTCHours(0,0,0,0) >= ahora.setUTCHours(0,0,0,0));
  const reservasPasadas = reservas.filter((reserva: any) => new Date(reserva.date).setUTCHours(0,0,0,0) < ahora.setUTCHours(0,0,0,0));


  function handleLogOut() {
    localStorage.removeItem("token");
    router.push("/");
  }
  
  function handleModifyPeople(increment: number) {
    const newCount = peopleCount + increment;
    if (newCount >= 1 && newCount <= 6) {
      setPeopleCount(newCount);
    }
  }

    function confirmModify() {
    if (!selectedReservaId) return;
      console.log("modificando reserva:", selectedReservaId, "a personas:", peopleCount);
      updatePeopleMutation.mutate({id: selectedReservaId, people: peopleCount,
      });
    setShowModifyModal(false);
  }

  function confirmCancel() {
    console.log("id de reserva a borrar:", selectedReservaId);
    if (!selectedReservaId) return;
    deleteReservaMutation.mutate(selectedReservaId);
    setShowCancelModal(false);
  }

  const timeblocksjson:any = [
      '08:00 a.m.',
      '08:30 a.m.',
      '09:00 a.m.',
      '09:30 a.m.',
      '10:00 a.m.',
      '10:30 a.m.',
      '11:00 a.m.',
      '11:30 a.m.',
      '12:00 p.m.',
      '12:30 p.m.',
      '01:00 p.m.',
      '01:30 p.m.',
      '02:00 p.m.',
      '02:30 p.m.',
      '03:00 p.m.',
      '03:30 p.m.',
      '04:00 p.m.',
      '04:30 p.m.',
      '05:00 p.m.',
      ];

  // mejor hacer una card para acortar codigo (pagina lentaaa)
  const renderReservaCard = (reserva: any) => {
    const fecha = new Date(reserva.date).toLocaleDateString('es-ES', { timeZone: 'UTC' });
    const horaI = timeblocksjson[reserva.timeblocks[0]];
    const horaF = timeblocksjson[reserva.timeblocks[reserva.timeblocks.length-1]]  //sirve aunque se subraye en rojo!!!

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
          <p><strong>Horario:</strong> {horaI} - {horaF}</p> 
          <p><strong>Sala:</strong> {reserva?.[reserva.tableId ? "tableId" : "cubicleId"]?.room}</p>
          <p><strong>Personas:</strong> {reserva.people}</p>
        </div>
        {/* Botones en Reservas Activas */}
          <div className={styles.reservationActions}>
            <button 
              className={styles.actionButton} 
              onClick={() => {
                setSelectedReservaId(reserva._id);
                setPeopleCount(reserva.people);
                setShowModifyModal(true);}}
            >
              Modificar cantidad de personas
            </button>
            <button 
              className={styles.cancelButton} 
              onClick={() => {
                console.log("cancelar reserva:", reserva._id);
                setSelectedReservaId(reserva._id);
                setShowCancelModal(true);
              }}
            >
              Cancelar reserva
            </button>
          </div>
        {/* END Botones en Reservas Activas */}
      </div>
    );
  };


  const isAdmin = user.role === 'admin';
  const isStudent = user.role === 'student';

  return (
    <div className={styles.profileContainer}>
      {/* Encabezado con botón de edición y cerrar sesión */}
      <div className={styles.logOutContainer}>
        <button className={styles.logOut} onClick={handleLogOut}>Cerrar sesión</button>
      </div>
      <div className={styles.headerContainer}>
        <h1 className={styles.welcomeTitle}>Mi perfil</h1>
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
          <p className={styles.noReservations}>No tienes reservas activas actualmente.</p>
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
          <h3 className={styles.sectionTitle}>Historial de reservas pasadas</h3>
          {reservasPasadas.length === 0 ? (
            <p className={styles.noReservations}>No tienes reservas pasadas. ¡Empieza a reservar con nosotros!</p>
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
            {showRegisterAdminForm ? "Ocultar Formulario de Registro de Administrador" : "Registrar Nuevo Administrador"}
          </button>

          {showRegisterAdminForm && (
            <div className={styles.registerAdminFormContainer}>
              <RegisterForm />
            </div>
          )}
        </div>
      )}

      {/* MODALS */}
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