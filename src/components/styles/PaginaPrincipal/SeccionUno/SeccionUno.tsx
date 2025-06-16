'use client'; // Esto es lo más importante que debes agregar

import styles from './SeccionUno.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useRouter } from "next/navigation";

export default function SeccionUno() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter(); 

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleCalendariomClick = () => {
      router.push('/calendariom'); 
      closeModal();
   };

  const handleCalendariocClick = () => {
    router.push('/calendarioc'); 
    closeModal();
  };

  useEffect(() => {
      if (typeof window !== 'undefined') {
        Modal.setAppElement(document.body);
      }
    }, []);

  return (
    <section className={styles.banner}>
      <div className={styles.container}>
        <div className={styles.contenido}>
          <div>
            <h1 className={styles.titulo} style={{lineHeight: "45px"}}>Reserva tu espacio</h1>
            <h1 className={styles.titulo}>para estudiar</h1>

            <p className={styles.subtitulo}>
              Cubículos y mesas <strong>disponibles</strong> en la
            </p>
            <p className={styles.pedroGrases}>Biblioteca Pedro Grases</p>
            <br></br>

            <button className={styles.botonReservar} onClick={openModal}>
              Reservar
            </button>
            <br></br>
            <p className={styles.lunes}><strong>Lunes a Viernes</strong></p>
            <p className={styles.horario}>
              <strong>Horario: </strong> 07:00 am – 10:00 pm
            </p>
          </div>

          <div className={styles.imagenWrapper}>
            <div className={styles.fondoDecorativo}></div>
            <div className={styles.imagenBiblioCircular}>
              <Image
                src="/biblioteca.png"
                alt="Biblioteca"
                width={400}
                height={400}
                className={styles.imagen}
              />
            </div>
          </div>
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
            <h2 className={styles.modalTitle}>Reservar</h2>
        </div>
            <div className={styles.whiteSquare}>
                <div className={styles.optionsContainer}>
                <button 
                    className={styles.optionButton}
                    onClick={handleCalendariocClick} 
                >
                    Cubículo
                </button>
                <div className={styles.orangeBar}/>
                <button 
                    className={styles.optionButton}
                    onClick={handleCalendariomClick} 
                >
                    Mesa
                </button>
                </div>
            </div>
        </Modal>
    </section>
  );
}