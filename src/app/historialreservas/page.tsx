'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../components/styles/HistorialReserva/historialreserva.module.css';
import Modal from 'react-modal';
import { useMutation } from '@tanstack/react-query';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createClient } from "smtpexpress"

export const smtpexpressClient = createClient({
  projectId: "sm0pid--Gzb4OpIr-U5r7ze249pBxKtZ",
  projectSecret: "13e29329764e9550083833d00b029aec0ededf6972b69f6f5b"
});


export default function HistorialReserva() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [reservasFiltradas, setReservasFiltradas] = useState([]);
    const [filters, setFilters] = useState({
      reservas: "todas",
      tipo: "todos",
      fecha: "todas",
      busqueda: ""
    });

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
        cantidad: 0,
        reservaId: ""
    });

    const avisarCancelacion = async () => {
      try {
        // Sending an email using SMTP
        await smtpexpressClient.sendApi.sendMail({
          // Subject of the email
          subject: "Tu reserva ha sido cancelada",
          // Body of the email
          message: `<h2>Lamentamos Informar que tu reserva ha sido cancelada.</h2>
          <h3>Reserva de tú ${userInfo.tipo} el dia ${userInfo.fecha} de ${userInfo.hora}`,
          // Sender's details
          sender: {
            // Sender's name
            name: "Booki",
            // Sender's email address
            email: "booki-e7fa70@smtpexpress.email",
          },
          // Recipient's details
          recipients: {
            // Recipient's email address (obtained from the form)
            email: userInfo.email,
          },
        });
        console.log("Notificacion enviada con exito!")
      } catch (error) {
        console.log("Oops! Something went wrong. Please try again later.", error);
      }

  };

    function filtrarReservas(reservas: any){
      let resultado = reservas
      // Filtrado por estado de reservas
      if (filters.reservas != "todas"){
      resultado = resultado.filter((reserva: any)=>{
        if (filters.reservas == "activas") return new Date(reserva.date) > new Date()
        else return new Date(reserva.date) < new Date()
      })
      }

      // Filtrado por tipo de espacio
      if (filters.tipo != "todos"){
      resultado = resultado.filter((reserva: any)=>{
        console.log(reserva.tableId)
        if (filters.tipo == "mesa") return reserva.tableId
        else return reserva.cubicleId
      })
      }

      // Filtrado por fechas
      if (filters.fecha != "todas"){
      resultado = resultado.filter((reserva: any)=>{
        console.log(new Date(reserva.date).toISOString().slice(0, 10))
        console.log(startDate.toISOString().slice(0, 10))
        return new Date(reserva.date).toISOString().slice(0, 10) == startDate.toISOString().slice(0, 10)
      })
      }

      // Filtrado por busqueda
      if (filters.busqueda){
      resultado = resultado.filter((reserva: any)=>{
        let user: any = users.find((user: any)=> user._id == reserva.userId)
        return user.email.toLowerCase().includes(filters.busqueda.toLocaleLowerCase())
      })
      }

      return resultado
    }

    useEffect(() => {
      setReservasFiltradas(filtrarReservas(reservations))
    }, [filters, reservations, startDate]);


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
            avisarCancelacion()
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
                <select onChange={(e)=> setFilters({...filters, reservas: e.target.value})}>
                  <option value="todas">Todas</option>
                  <option value="activas">Activas</option>
                  <option value="inactivas">Inactivas</option>
                </select>
            </div>

            <div className={styles.filtroGrupo}>
                <span>Tipo de espacio:</span>
                <select onChange={(e)=> setFilters({...filters, tipo: e.target.value})}>
                <option value="todos">Todos</option>
                <option value="mesa">Mesa</option>
                <option value="cubiculo">Cubículo</option>
                </select>
            </div>

            <div className={styles.filtroGrupo}>
                <div className={styles.fechaHeader} style={filters.fecha != "todas"? {marginBottom:"5px"}: {}}>
                  <span>Fecha:</span>
                  {filters.fecha != "todas" && <button onClick={()=> setFilters({...filters, fecha: "todas"})}>Todas</button>}
                </div>
                {filters.fecha == "todas" && <select onChange={(e)=> setFilters({...filters, fecha: e.target.value})}>
                  <option value="todas">Todas</option>
                  <option value="personalizada">Personalizada</option>
                </select>}
                {filters.fecha != "todas" && <div className={styles.datePicker}>
                  <DatePicker selected={startDate} onChange={(date:any) => setStartDate(date)} />
                  </div>}
                
            </div>

            <div className={styles.buscador}>
                <span className={styles.iconoLupa}>🔍</span>
                <input  onChange={(e)=> setFilters({...filters, busqueda: e.target.value})}
                type="text" placeholder="Buscar nombre de estudiante"/>
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
                        {reservasFiltradas.map((reserva: any)=>{
                            let tempUser: any = users.find((user: any)=> user._id == reserva.userId)
                            let fecha: Date = new Date(reserva.date)
                            let tempData = {
                                estado: fecha < new Date()? "Inactiva": "Activa",
                                tipo: reserva.cubicleId? "Cubículo": "Mesa",
                                fecha: fecha.toISOString().slice(0, 10),
                                email: tempUser?.email,
                                hora: `${times[reserva.timeblocks[0]]} a ${times[reserva.timeblocks[reserva.timeblocks.length-1]]}`,
                                cantidad: reserva.people,
                                reservaId: reserva._id
                            }
                            return <tr key={tempData.reservaId} >
                                <td style={tempData.estado=="Activa"?{color:"#166109", fontWeight:"bold"}:{color:"#8d0000", fontWeight:"bold"}}>{tempData.estado}</td>
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
                                    {tempData.estado=="Activa" && <button 
                                    className={styles.btnCancelar}
                                    onClick={()=>openModal(tempData)}>
                                        Cancelar
                                    </button>
                                    }
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
                    {reservasFiltradas.length == 0 && <div>No se han encontrado resultados para estos filtros...</div>}
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
