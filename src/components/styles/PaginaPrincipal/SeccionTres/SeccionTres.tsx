'use client'; // Esto es lo más importante que debes agregar
import styles from './SeccionTres.module.css';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useRouter } from "next/navigation";

export default function SeccionTres() {
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

  return (
    <section className={styles.fondoBibliotecaSillas}>
    <div className={styles.botonWrapper}>
    <button className={styles.botonAzul} onClick={openModal}>
    <span className={styles.iconoBoton}>📋</span>
    Ver espacios disponibles
    </button>
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
