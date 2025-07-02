'use client';

import React from 'react';
import styles from '../reservar.module.css';
import salaRMJ from './salaRamonJV.module.css';

interface SalaRamonJVelasquezProps {
  seleccionada: number | null;
  toggleSeleccion: (numero: number) => void;
  userRole?: string; // Añadir el rol del usuario
  disabledMesas: Set<number>; // Conjunto de mesas deshabilitadas
  ocupados: any;
}

const SalaRamonJVelasquez: React.FC<SalaRamonJVelasquezProps> = ({ seleccionada, toggleSeleccion, userRole, disabledMesas, ocupados }) => {

  // Función auxiliar para renderizar un botón de mesa
  const renderMesaButton = (numero: number, baseStyle: string) => {
    const isDisabled = disabledMesas.has(numero) || ocupados.includes(numero);
    const isSelected = seleccionada === numero;

    let buttonClasses = `${baseStyle}`;

    if(disabledMesas.has(numero)){
      buttonClasses += ` ${styles.mesaDeshabilitada}`;
    }else if (isDisabled) {
      buttonClasses += ` ${styles.mesaDisabled}`;
    } else if (isSelected && userRole !== 'admin') {
      buttonClasses += ` ${styles.mesaSeleccionada}`;
    }

    return (
      <button
        key={numero}
        className={buttonClasses}
        onClick={() => toggleSeleccion(numero)}
        disabled={userRole !== 'admin' && isDisabled}
      >
        {numero}
      </button>
    );
  };

  return (
    <div className={styles.fondoDecorativo}>
      <div className={salaRMJ.mapaContenedor}>
        <div className={styles.mapa}>
          <div className={salaRMJ.salaRamonJVelasquezContenedor}>

            {/* Sección Izquierda/Central */}
            <div className={salaRMJ.seccionIzquierdaCentralRamon}>
              {/* 2 Filas de 6 Mesas (12 mesas) */}
              <div className={salaRMJ.grupo12MesasRamon}>
                <div className={salaRMJ.filaMesasRamon}>
                  {renderMesaButton(71, styles.mesa)}
                  {renderMesaButton(72, styles.mesa)}
                  {renderMesaButton(73, styles.mesa)}
                  {renderMesaButton(74, styles.mesa)}
                  {renderMesaButton(75, styles.mesa)}
                  {renderMesaButton(76, styles.mesa)}
                </div>
                <div className={salaRMJ.filaMesasRamon}>
                  {renderMesaButton(77, styles.mesa)}
                  {renderMesaButton(78, styles.mesa)}
                  {renderMesaButton(79, styles.mesa)}
                  {renderMesaButton(80, styles.mesa)}
                  {renderMesaButton(81, styles.mesa)}
                  {renderMesaButton(82, styles.mesa)}
                </div>
              </div>

              {/* Separadores debajo de las 12 mesas */}
              <div className={salaRMJ.separadoresInferioresRamon}>
                <div className={salaRMJ.rayaVerticalRamon}></div>
                <div className={salaRMJ.rayaVerticalRamon}></div>
                <div className={salaRMJ.rayaVerticalRamon}></div>
                <div className={salaRMJ.rayaVerticalRamon}></div>
                <div className={salaRMJ.rayaVerticalRamon}></div>
                <div className={salaRMJ.rayaVerticalRamon}></div>
                <div className={salaRMJ.rayaVerticalRamon}></div>
                <div className={salaRMJ.rayaVerticalRamon}></div>
                <div className={salaRMJ.rayaVerticalRamon}></div>
                <div className={salaRMJ.rayaVerticalRamon}></div>
                <div className={salaRMJ.rayaVerticalRamon}></div>
                <div className={salaRMJ.rayaVerticalRamon}></div>
              </div>

              {/* 2 Mesas con separación de 2 mesas de por medio */}
              <div className={salaRMJ.grupoMesasInferioresRamon}>
                {renderMesaButton(83, styles.mesa)}
                <div className={salaRMJ.espacioEntreMesasRamon}></div> {/* Espacio equivalente a dos mesas */}
                {renderMesaButton(84, styles.mesa)}
              </div>
            </div>

            {/* Sección Derecha - 3 mesas separadas */}
            <div className={salaRMJ.seccionDerechaRamon}>
              {renderMesaButton(85, styles.mesa)}
              <div className={salaRMJ.gap100px}></div>
              {renderMesaButton(86, styles.mesa)}
              <div className={salaRMJ.gap100px}></div>
              {renderMesaButton(87, styles.mesa)}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaRamonJVelasquez;