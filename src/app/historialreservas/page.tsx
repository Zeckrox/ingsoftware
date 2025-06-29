'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../components/styles/HistorialReserva/historialreserva.module.css';
import Modal from 'react-modal';
import { useRouter } from "next/navigation";
import { useMutation } from '@tanstack/react-query';

export default function HistorialReserva() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [users, setUsers] = useState([]);
     const times: string[] = [
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

    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({
        estado: "",
        tipo: "",
        fecha: "",
        email: "",
        hora: "",
        cantidad: 5,
        reservaId: ""
    });

       //GET
    const getReservations = useMutation({
          mutationFn: async () => {
            const res = await fetch('https://backendsoftware.vercel.app/reservations', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              }
            });
            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(errorData.message || 'error al obtener espacios');
            }
            return res.json();
          },
          onSuccess: (data) => {
            data = data.sort((a:any , b:any ) => {
                let dateA = new Date(a.date)
                let dateB = new Date(b.date)
                return dateB.getTime() - dateA.getTime()
            } )

            setReservations(data)
          },
          onError: (error: any) => {
            console.error('error en la consulta:', error);
          },
        });

       //GET
    const getAllUsers = useMutation({
          mutationFn: async () => {
            let token = localStorage.getItem("token")
            const res = await fetch('https://backendsoftware.vercel.app/users', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`

              }
            });
            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(errorData.message || 'error al obtener espacios');
            }
            return res.json();
          },
          onSuccess: (data) => {
            setUsers(data)
          },
          onError: (error: any) => {
            console.error('error en la consulta:', error);
          },
        });

    //DELETE
    const deleteReservation = useMutation({
          mutationFn: async (id:any) => {
            const res = await fetch(`https://backendsoftware.vercel.app/reservations/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              }
            });
            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(errorData.message || 'error al obtener espacios');
            }
            return res.json();
          },
          onSuccess: (data) => {
            let newReservas = reservations
            newReservas = newReservas.filter((reserva: any) =>  reserva._id != data._id )
            setReservations(newReservas)
          },
          onError: (error: any) => {
            console.error('error en la consulta:', error);
          },
        });

    function openInfoModal(data: any){
        setUserInfo(data)
        setInfoModalIsOpen(true)
    };

    function openModal (data: any){
        setUserInfo(data)
        setModalIsOpen(true)
    };

    const closeModal = () => setModalIsOpen(false);

    const closeInfoModal = () => setInfoModalIsOpen(false);

    
    const handleCalendariomClick = () => {
        deleteReservation.mutate(userInfo.reservaId)
        closeModal();
    };
    
      const handleCalendariocClick = () => {
        closeModal();
      };
      

      useEffect(() => {
          if (typeof window !== 'undefined') {
            Modal.setAppElement(document.body);
          } 
          getReservations.mutate()
          getAllUsers.mutate()
        }, []);

  return (
    <section className={styles.aboutSection}>
      <div className={styles.containerTitulo}>
        <h1 className={styles.titulo}>
          Historial de Reservas
        </h1>
        </div>

        <div className={styles.filtroContainer}>
            <div className={styles.filtroGrupo}>
                <span>Reservas:</span>
                <select>
                <option value="activas">Activas</option>
                <option value="inactivas">Inactivas</option>
                </select>
            </div>

            <div className={styles.filtroGrupo}>
                <span>Tipo de espacio:</span>
                <select>
                <option value="mesa">Mesa</option>
                <option value="cubiculo">Cubículo</option>
                </select>
            </div>

            <div className={styles.filtroGrupo}>
                <span>Fecha:</span>
                <select>
                <option value="fecha">Fecha</option>
                </select>
            </div>

            <div className={styles.buscador}>
                <span className={styles.iconoLupa}>🔍</span>
                <input type="text" placeholder="Buscar nombre de estudiante"/>
            </div>

            <div className={styles.tablaContainer}>
                <table className={styles.tablaReservas}>
                    <thead>
                        <tr>
                            <th>Estado reserva</th>
                            <th>Tipo de espacio</th>
                            <th>Fecha</th>
                            <th>Usuario</th>
                            <th>Hora</th>
                            <th>Cantidad de personas</th>
                            <th>Gestionar reserva</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reserva: any)=>{
                            let tempUser: any = users.find((user: any)=> user._id == reserva.userId)
                            let fecha: Date = new Date(reserva.date)
                            let tempData = {
                                estado: fecha < new Date()? "Terminada": "Activa",
                                tipo: reserva.cubicleId? "Cubículo": "Mesa",
                                fecha: fecha.toISOString().slice(0, 10),
                                email: tempUser?.email,
                                hora: `${times[reserva.timeblocks[0]]} a ${times[reserva.timeblocks[reserva.timeblocks.length-1]]}`,
                                cantidad: 5,
                                reservaId: reserva._id
                            }
                            return <tr key={tempData.reservaId}>
                                <td>{tempData.estado}</td>
                                <td>{tempData.tipo}</td>
                                <td>{tempData.fecha}</td>
                                <td>{tempData.email}</td>
                                <td>{tempData.hora}</td>
                                <td>{tempData.cantidad}</td> 
                                <td>
                                    <button 
                                    className={styles.btnInfo}
                                    onClick={()=>openInfoModal(tempData)}
                                    >
                                    Más Info
                                    </button>
                                    <button 
                                    className={styles.btnCancelar}
                                    onClick={()=>openModal(tempData)}>
                                        Cancelar
                                    </button>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>

        </div>

        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
        >
        <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModal}>×</button>
            <h2 className={styles.modalTitle}>Cancelar Reserva</h2>
        </div>
            <div className={styles.whiteSquare}>
                <div className={styles.optionsContainer}>
                <span>
                    Está seguro que desea cancelar la reserva? Una vez cancelado no se podra retroceder
                    <div><button className={styles.btnCancelarReservaModal}
                    onClick={handleCalendariomClick}>
                    Sí, cancelar reserva
                    </button>
                    </div>     
                </span>
            </div>
        </div>
        </Modal>



        <Modal
        isOpen={infoModalIsOpen}
        onRequestClose={closeInfoModal}
        className={styles.modal}
        overlayClassName={styles.overlay}>
        <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeInfoModal}>×</button>
            <h2 className={styles.modalTitle}>Detalles de la reserva</h2>
            <div className={styles.whiteSquareInfo}>
            <p><strong>Usuario:</strong> {userInfo.email}</p>
            <p><strong>Fecha:</strong> {userInfo.fecha}</p>
            <p><strong>Hora:</strong> {userInfo.hora}</p>
            <p><strong>Tipo de espacio:</strong> {userInfo.tipo}</p>
            <p><strong>Cantidad de personas:</strong> {userInfo.cantidad}</p>
            </div>
        </div>
        </Modal>




    </section>

    

  );
}
