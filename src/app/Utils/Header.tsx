'use client'; // Añade esto al inicio para usar hooks

import React, { useState } from 'react';
import './Header.css';
import Image from 'next/image';
import { usePathname } from 'next/navigation'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname()

  if(pathname=="/login" || pathname=="/register")return;

  return (
    <header className="header-container">
      <div className="logo-container">
        <Image 
          src="/images/Logo-BPG.png" 
          alt="UNIMET Biblioteca Pedro Grases" 
          width={200} 
          height={60}
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