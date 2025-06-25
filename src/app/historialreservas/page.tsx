'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../components/styles/HistorialReserva/historialreserva.module.css';
import Modal from 'react-modal';
import { useRouter } from "next/navigation";

export default function HistorialReserva() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);


    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);

    const openInfoModal = () => setInfoModalIsOpen(true);
    const closeInfoModal = () => setInfoModalIsOpen(false);

    
      const handleCalendariomClick = () => {
          //router.push('/calendariom'); 
          closeModal();
       };
    
      const handleCalendariocClick = () => {
        //router.push('/calendarioc'); 
        closeModal();
      };
    
      useEffect(() => {
          if (typeof window !== 'undefined') {
            Modal.setAppElement(document.body);
          }
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
                        <tr>
                            <td>Activa</td>
                            <td>Cubículo</td>
                            <td>19/06/2025</td>
                            <td>mperez@unimet.edu.ve</td>
                            <td>9:30 am a 11 am</td>
                            <td>5</td>
                            <td>
                                <button 
                                className={styles.btnInfo}
                                onClick={openInfoModal}
                                >
                                Más Info
                                </button>
                                
                                
                                <button 
                                className={styles.btnCancelar}
                                   onClick={openModal}>
                                     Cancelar
                                </button>
                            </td>
                        </tr>


                        
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
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
            <p><strong>Usuario:</strong> mperez@correo.unimet.edu.ve</p>
            <p><strong>Fecha:</strong> 19/06/2025</p>
            <p><strong>Hora:</strong> 9:30 am a 11am</p>
            <p><strong>Tipo de espacio:</strong> Cubículo</p>
            <p><strong>Cantidad de personas:</strong> 5</p>
            </div>
        </div>
        </Modal>




    </section>

    

  );
}
