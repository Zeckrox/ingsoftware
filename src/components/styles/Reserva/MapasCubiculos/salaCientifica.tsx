'use client';

import React from 'react';
import styles from '../reservar.module.css';

interface SalaCientificaProps {
  seleccionada: number | null;
  toggleSeleccion: (numero: number) => void;
}

const SalaCientifica: React.FC<SalaCientificaProps> = ({ seleccionada, toggleSeleccion }) => {
  return (
    <div className={styles.fondoDecorativo}>
      <div className={styles.mapaContenedorC}>
        <div className={styles.mapa}>
          <div className={styles.filaArriba}>
            <button className={`${styles.meson} ${seleccionada === 11 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(11)}>11</button>
            <button className={`${styles.meson} ${seleccionada === 12 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(12)}>12</button>
            <button className={`${styles.meson} ${seleccionada === 13 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(13)}>13</button>
          </div>

          <div className={styles.filaArriba}>
            <button className={`${styles.meson} ${seleccionada === 14 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(14)}>14</button>
            <button className={`${styles.meson} ${seleccionada === 15 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(15)}>15</button>
            <button className={`${styles.meson} ${seleccionada === 16 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(16)}>16</button>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default SalaCientifica;