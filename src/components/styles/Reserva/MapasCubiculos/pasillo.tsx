'use client';

import React from 'react';
import styles from '../reservar.module.css'; 

interface PasilloProps {
  seleccionada: number | null;
  toggleSeleccion: (numero: number) => void;
  userRole?: string; 
  disabledCubiculos: Set<number>;
  ocupados: { number: number }[];
}

const Pasillo: React.FC<PasilloProps> = ({
  seleccionada,
  toggleSeleccion,
  userRole,
  disabledCubiculos,
  ocupados
}) => {

  const mesones = [7, 8, 9, 10]; 

  return (
    <div className={styles.fondoDecorativo}>
      <div className={styles.mapaContenedorC}> 
        <div className={styles.mapa}>
          <div className={styles.filaArriba}>
            {mesones.map((numero) => {
              const isOcupado = ocupados.some((ocupadoReserva: any) => ocupadoReserva.number === numero);
              const isDisabled = disabledCubiculos.has(numero) || isOcupado;
              const isSelected = seleccionada === numero;

              let mesonClasses = `${styles.meson}`; 

              if(disabledCubiculos.has(numero)){
               mesonClasses += ` ${styles.cubiculoDeshabilitado}`;
              }else if (isDisabled) {
                mesonClasses += ` ${styles.cubiculoDisabled}`; 
              } else if (isSelected && userRole !== 'admin') {
                mesonClasses += ` ${styles.mesaSeleccionada}`; // Clase para mesa seleccionada por usuario normal
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

export default Pasillo;