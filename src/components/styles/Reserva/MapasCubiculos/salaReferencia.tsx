'use client';

import React from 'react';
import styles from '../reservar.module.css';

interface SalaReferenciaProps {
  seleccionada: number | null;
  toggleSeleccion: (numero: number) => void;
}

const SalaReferencia: React.FC<SalaReferenciaProps> = ({ seleccionada, toggleSeleccion }) => {
  return (
    <div className={styles.fondoDecorativo}>
      <div className={styles.mapaContenedorC}>
        <div className={styles.mapa}>
          <div className={styles.filaArriba}>
            <button className={`${styles.meson} ${seleccionada === 1 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(1)}>1</button>
            <button className={`${styles.meson} ${seleccionada === 2 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(2)}>2</button>
            <button className={`${styles.meson} ${seleccionada === 3 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(3)}>3</button>
          </div>

          <div className={styles.filaArriba}>
            <button className={`${styles.meson} ${seleccionada === 4 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(4)}>4</button>
            <button className={`${styles.meson} ${seleccionada === 5 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(5)}>5</button>
            <button className={`${styles.meson} ${seleccionada === 6 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(6)}>6</button>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default SalaReferencia;