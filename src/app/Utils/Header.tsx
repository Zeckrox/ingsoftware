'use client'; // Añade esto al inicio para usar hooks

import React, { useState } from 'react';
import './Header.css';
import Image from 'next/image';
import Logo from '../../components/UniversidadLogo.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header-container">
      <div className="logo-container">
        <Image 
          src={Logo} 
          alt="UNIMET Biblioteca Pedro Grases" 
          width={200} 
          height={60}
          priority
        />
      </div>
      
      <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
        <button className="nav-button">INICIO</button>
        <button className="nav-button">NOSOTROS</button>
        <button className="nav-button">RESERVAR</button>
        <button className="nav-button login-button">INICIAR SESIÓN</button>
      </nav>
      
      <button 
        className="mobile-menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>
    </header>
  );
}