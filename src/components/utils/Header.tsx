'use client'; // Añade esto al inicio para usar hooks

import React, { useEffect, useState } from 'react';
import './Header.css';
import Image from 'next/image';
import { usePathname,  useRouter } from 'next/navigation'
import Link from 'next/link';
import Modal from 'react-modal';
import styles from './Modal.module.css';
import { useUser } from '@/context/userContext';

export default function Header() {
  let user = useUser().user
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname()
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter(); 
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    router.refresh()
  }, [pathname]);

  const handleCalendariomClick = () => {
    router.push('/calendariom'); 
    closeModal();
  };

  const handleCalendariocClick = () => {
    router.push('/calendarioc'); 
    closeModal();
  };

  if(pathname=="/login" || pathname=="/register")return;

  return (
    <header className="header-container">
      <div className="logo-container">
        <Link href="/">
          <Image 
            src="/images/Logo-BPG.png" 
            alt="UNIMET Biblioteca Pedro Grases" 
            width={200} 
            height={60}
          />
        </Link>
      </div>
      
      <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
        
        <Link href="/">
        <button className="nav-button">INICIO</button>
        </Link>

        <Link href="/aboutus">
        <button className="nav-button">NOSOTROS</button>
        </Link>

        <button className="nav-button" onClick={user? openModal: ()=>router.push("/login")}>RESERVAR</button>

        {!user && <Link href="/login">
          <button className="nav-button login-button">INICIAR SESIÓN</button>
        </Link>
        }
        {
          user && <Link href="/profile">
          <Image
          src="/images/user.png" 
          alt="Icono de usuario" 
          width={35} 
          height={35}/>
        </Link>

        }
      </nav>
      
      <button 
        className="mobile-menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

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
    </header>
  );
}