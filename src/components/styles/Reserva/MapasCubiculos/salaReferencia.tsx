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
          {/* Fila superior con mesas 3, 4, 5, 6 */}
          <div className={styles.filaArriba}>
            <div className={styles.columnaMesas}>
              <button className={`${styles.mesa} ${seleccionada === 3 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(3)}>3</button>
            </div>
            <div className={styles.columnaMesas}>
              <button className={`${styles.mesa} ${seleccionada === 4 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(4)}>4</button>
            </div>
            <div className={styles.columnaMesas}>
              <button className={`${styles.mesa} ${seleccionada === 5 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(5)}>5</button>
            </div>
            <div className={styles.columnaMesas}>
              <button className={`${styles.mesa} ${seleccionada === 6 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(6)}>6</button>
            </div>
          </div>

          {/* Fila del medio con mesa 2 (centrada) */}
          <div className={styles.filaMedio}>
            <div className={styles.columnaMesas}>
              <button className={`${styles.mesa} ${seleccionada === 2 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(2)}>2</button>
            </div>
          </div>

          {/* Fila inferior con mesa 1 (centrada) */}
          <div className={styles.filaAbajo}>
            <div className={styles.columnaMesas}>
              <button className={`${styles.mesa} ${seleccionada === 1 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(1)}>1</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaReferencia;