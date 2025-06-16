'use client';

import React from 'react';
import styles from '../reservar.module.css'; 

interface SalaReferenciaProps {
  seleccionada: number | null;
  toggleSeleccion: (numero: number) => void;
  userRole?: string; 
  disabledCubiculos: Set<number>;
}

const SalaReferencia: React.FC<SalaReferenciaProps> = ({
  seleccionada,
  toggleSeleccion,
  userRole,
  disabledCubiculos,
}) => {
  const mesonesSalaReferencia = [1, 2, 3, 4, 5, 6]; 

  return (
    <div className={styles.fondoDecorativo}>
      <div className={styles.mapaContenedorC}>
        <div className={styles.mapa}>
          {/* Fila superior de mesones */}
          <div className={styles.filaArriba}>
            {mesonesSalaReferencia.slice(0, 3).map((numero) => { 
              const isDisabled = disabledCubiculos.has(numero);
              const isSelected = seleccionada === numero;

              let mesonClasses = `${styles.meson}`;

              if (isDisabled) {
                mesonClasses += ` ${styles.cubiculoDisabled}`;
              } else if (isSelected && userRole !== 'admin') {
                mesonClasses += ` ${styles.mesaSeleccionada}`;
              }

              if (!isDisabled && userRole !== 'admin') {

              }

              return (
                <button
                  key={numero}
                  className={mesonClasses}
                  onClick={() => toggleSeleccion(numero)}
                >
                  {numero}
                </button>
              );
            })}
          </div>

          {/* Fila inferior de mesones */}
          <div className={styles.filaArriba}>
            {mesonesSalaReferencia.slice(3, 6).map((numero) => { 
              const isDisabled = disabledCubiculos.has(numero);
              const isSelected = seleccionada === numero;

              let mesonClasses = `${styles.meson}`;

              if (isDisabled) {
                mesonClasses += ` ${styles.cubiculoDisabled}`;
              } else if (isSelected && userRole !== 'admin') {
                mesonClasses += ` ${styles.mesaSeleccionada}`;
              }

              if (!isDisabled && userRole !== 'admin') {

              }

              return (
                <button
                  key={numero}
                  className={mesonClasses}
                  onClick={() => toggleSeleccion(numero)}
                >
                  {numero}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaReferencia;