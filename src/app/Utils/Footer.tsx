import React from 'react';
import './Footer.css';
import Image from 'next/image';
import Logo from '../../components/UniversidadLogo1.png';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-main-content">
        <div className="footer-brand">
          <Image 
            src={Logo} 
            alt="Universidad Metropolitana" 
            width={220}
            height={70}
            className="unimet-logo"
          />
          <p className="unimet-motto">Excelencia académica desde 1970</p>
        </div>

        <div className="footer-info-columns">
          <div className="info-column">
            <h3>Contacto</h3>
            <p><strong>Teléfono:</strong> (+58 212) 240-3433</p>
            <p><strong>Email:</strong> info@unimet.edu.ve</p>
          </div>
          
          <div className="info-column">
            <h3>Horarios</h3>
            <p>Lunes a Viernes: 7:00 AM - 5:30 PM</p>
            <p>Sábados: 8:00 AM - 12:00 PM</p>
          </div>
          
          <div className="info-column">
            <h3>Ubicación</h3>
            <p>Autopista de Guarenas, Caracas</p>
            <p>Distrito Capital, Venezuela</p>
          </div>
        </div>
      </div>

      <div className="footer-legal">
        <p>© {new Date().getFullYear()} Universidad Metropolitana. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}