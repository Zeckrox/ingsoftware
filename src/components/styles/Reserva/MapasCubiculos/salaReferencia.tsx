'use client';

import React from 'react';
import styles from '../reservar.module.css'; 

interface SalaReferenciaProps {
  seleccionada: number | null;
  toggleSeleccion: (numero: number) => void;
  userRole?: string; 
  disabledCubiculos: Set<number>;
  ocupados: { number: number }[]; // 👈 Tipado correcto para ocupados
}

const SalaReferencia: React.FC<SalaReferenciaProps> = ({
  seleccionada,
  toggleSeleccion,
  userRole,
  disabledCubiculos,
  ocupados
}) => {
  const mesonesSalaReferencia = [1, 2, 3, 4, 5, 6]; 

  const renderMesones = (mesones: number[]) => {
    return (
      <div className={styles.filaArriba}>
        {mesones.map((numero) => {
          const isOcupado = ocupados.some((ocupadoReserva) => ocupadoReserva.number === numero);
          const isDisabled = disabledCubiculos.has(numero) || isOcupado;
          const isSelected = seleccionada === numero;

          let mesonClasses = `${styles.meson}`;

          if (isDisabled) {
            mesonClasses += ` ${styles.mesaOcupada}`;
          } else if (isSelected && userRole !== 'admin') {
            mesonClasses += ` ${styles.mesaSeleccionada}`;
          }

          return (
            <button
              key={numero}
              className={mesonClasses}
              onClick={() => toggleSeleccion(numero)}
              style={userRole == "admin" && isDisabled? {cursor: "pointer", pointerEvents: "auto"} : {}}
              disabled={userRole == "admin"? false: isDisabled}
              title={isOcupado ? 'Ocupado' : isDisabled ? 'No disponible' : 'Disponible'}
            >
              {numero}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.fondoDecorativo}>
      <div className={styles.mapaContenedorC}>
        <div className={styles.mapa}>
          {renderMesones(mesonesSalaReferencia.slice(0, 3))}
          {renderMesones(mesonesSalaReferencia.slice(3, 6))}
        </div>
      </div>
    </div>
  );
};

export default SalaReferencia;