'use client';

import React from 'react';
import styles from '../reservar.module.css'; 

interface SalaCientificaProps {
  seleccionada: number | null;
  toggleSeleccion: (numero: number) => void;
  userRole?: string; 
  disabledCubiculos: Set<number>; 
  ocupados: { number: number }[];
}

const SalaCientifica: React.FC<SalaCientificaProps> = ({
  seleccionada,
  toggleSeleccion,
  userRole,
  disabledCubiculos,
  ocupados
}) => {

  const mesonesSalaCientifica = [11, 12, 13, 14, 15, 16];

  return (
    <div className={styles.fondoDecorativo}>
      <div className={styles.mapaContenedorC}>
        <div className={styles.mapa}>
          {/* Fila superior de mesones */}
          <div className={styles.filaArriba}>
            {mesonesSalaCientifica.slice(0, 3).map((numero) => { 
              const isOcupado = ocupados.some((ocupadoReserva: any) => ocupadoReserva.number === numero);
              const isDisabled = disabledCubiculos.has(numero) || isOcupado;
              const isSelected = seleccionada === numero;

              let mesonClasses = `${styles.meson}`;

              if(disabledCubiculos.has(numero)){
               mesonClasses += ` ${styles.cubiculoDeshabilitado}`;
              }else if (isDisabled) {
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

          <div className={styles.filaArriba}>
            {mesonesSalaCientifica.slice(3, 6).map((numero) => {
              const isOcupado = ocupados.some((ocupadoReserva: any) => ocupadoReserva.number === numero);

              const isDisabled = disabledCubiculos.has(numero) || isOcupado;
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

export default SalaCientifica;