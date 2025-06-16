'use client';

import React from 'react';
import styles from '../reservar.module.css';

interface PasilloProps {
  seleccionada: number | null;
  toggleSeleccion: (numero: number) => void;
}

const Pasillo: React.FC<PasilloProps> = ({ seleccionada, toggleSeleccion }) => {
  return (
    <div className={styles.fondoDecorativo}>
      <div className={styles.mapaContenedorC}>
        <div className={styles.mapa}>
          <div className={styles.filaArriba}>
            <button className={`${styles.meson} ${seleccionada === 7 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(7)}>7</button>
            <button className={`${styles.meson} ${seleccionada === 8 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(8)}>8</button>
            <button className={`${styles.meson} ${seleccionada === 9 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(9)}>9</button>
            <button className={`${styles.meson} ${seleccionada === 10 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(10)}>10</button>

          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Pasillo;