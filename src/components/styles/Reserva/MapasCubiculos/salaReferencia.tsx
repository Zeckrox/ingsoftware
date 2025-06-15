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
      <div className={styles.mapaContenedor}>
        <div className={styles.mapa}>
          {/* Fila superior con cubículos 3, 4, 5, 6 */}
          <div className={styles.filaArriba}>
            <button className={`${styles.mesa} ${seleccionada === 3 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(3)}>3</button>
            <button className={`${styles.mesa} ${seleccionada === 4 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(4)}>4</button>
            <div className={styles.separacionesRayasVerticales}>
                <div className={styles.rayaVertical}></div>
                <div className={styles.rayaVertical}></div>
                <div className={styles.rayaVertical}></div>
                <div className={styles.rayaVertical}></div>
                <div className={styles.rayaVertical}></div>
                <div className={styles.rayaVertical}></div>
              </div>
            <button className={`${styles.mesa} ${seleccionada === 5 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(5)}>5</button>
            <button className={`${styles.mesa} ${seleccionada === 6 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(6)}>6</button>
            <div className={styles.separacionesRayasVerticales}>
                <div className={styles.rayaVertical}></div>
                <div className={styles.rayaVertical}></div>
                <div className={styles.rayaVertical}></div>
              </div>
          </div>
          
          {/* Fila media con cubículo 2 */}
          <div className={styles.filaMedio}>
            <button className={`${styles.mesa} ${seleccionada === 2 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(2)}>2</button>
          </div>
          <div className={styles.espacioRayasHorizontales}>
              <div className={styles.rayaHorizontal}></div>
              <div className={styles.rayaHorizontal}></div>
              <div className={styles.rayaHorizontal}></div>
              <div className={styles.rayaHorizontal}></div>
            </div>

          {/* Fila inferior con cubículo 1 */}
          <div className={styles.filaAbajo}>
            <button className={`${styles.mesa} ${seleccionada === 1 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(1)}>1</button>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default SalaReferencia;