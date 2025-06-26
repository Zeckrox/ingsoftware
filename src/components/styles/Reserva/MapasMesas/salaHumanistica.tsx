'use client';

import React from 'react';
import styles from '../reservar.module.css';
import salaHumanista from './salaHumanistica.module.css';

interface SalaHumanisticaProps {
  seleccionada: number | null;
  toggleSeleccion: (numero: number) => void;
  userRole?: string; // Añadir el rol del usuario
  disabledMesas: Set<number>; // Conjunto de mesas deshabilitadas
  ocupados: any;
}

const SalaHumanistica: React.FC<SalaHumanisticaProps> = ({ seleccionada, toggleSeleccion, userRole, disabledMesas, ocupados }) => {

  // Función auxiliar para renderizar un botón de mesa
  const renderMesaButton = (numero: number, baseStyle: string) => {
    const isDisabled = disabledMesas.has(numero) || ocupados.includes(numero);
    const isSelected = seleccionada === numero;

    let buttonClasses = `${baseStyle}`;

    if (isDisabled) {
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
      <div className={salaHumanista.mapaContenedorHumanistica}>
        <div className={styles.mapa}>
          <div className={salaHumanista.salaHumanisticaContenedor}>

            {/* Columna Izquierda Global */}
            <div className={salaHumanista.columnaIzquierdaHumanistica}>
              {/* Columna de 5 mesas + columna de 2 mesas */}
              <div className={salaHumanista.grupoMesasIzquierdoInferiorHumanistica}>
                {/* Columna de 5 mesas */}
                <div className={salaHumanista.columnaMesasHumanistica5}>
                  {renderMesaButton(50, styles.mesa)}
                  {renderMesaButton(51, styles.mesa)}
                  {renderMesaButton(52, styles.mesa)}
                  {renderMesaButton(53, styles.mesa)}
                  {renderMesaButton(54, styles.mesa)}
                </div>
                {/* Columna de 2 mesas */}
                <div className={salaHumanista.columnaMesasHumanistica2}>
                  {renderMesaButton(55, styles.mesa)}
                  {renderMesaButton(56, styles.mesa)}
                </div>
              </div>
            </div>

            {/* Sección Central con Separadores y 12 Mesas */}
            <div className={salaHumanista.seccionCentralHumanistica}>
              {/* Separadores horizontales superiores */}
              <div className={salaHumanista.separadoresHorizontalesSuperioresHumanistica}>
                <div className={salaHumanista.rayaHorizontalHumanistica}></div>
                <div className={salaHumanista.rayaHorizontalHumanistica}></div>
                <div className={salaHumanista.rayaHorizontalHumanistica}></div>
                <div className={salaHumanista.rayaHorizontalHumanistica}></div>
                <div className={salaHumanista.rayaHorizontalHumanistica}></div>
                <div className={salaHumanista.rayaHorizontalHumanistica}></div>
                <div className={salaHumanista.rayaHorizontalHumanistica}></div>
                <div className={salaHumanista.rayaHorizontalHumanistica}></div>
              </div>

              {/* Grupo de 12 mesas */}
              <div className={salaHumanista.grupo12MesasHumanistica}>
                <div className={salaHumanista.filaMesasHumanistica}>
                  {renderMesaButton(57, styles.mesa)}
                  {renderMesaButton(58, styles.mesa)}
                  {renderMesaButton(59, styles.mesa)}
                  {renderMesaButton(60, styles.mesa)}
                  {renderMesaButton(61, styles.mesa)}
                  {renderMesaButton(62, styles.mesa)}
                </div>
                <div className={salaHumanista.filaMesasHumanistica}>
                  {renderMesaButton(63, styles.mesa)}
                  {renderMesaButton(64, styles.mesa)}
                  {renderMesaButton(65, styles.mesa)}
                  {renderMesaButton(66, styles.mesa)}
                  {renderMesaButton(67, styles.mesa)}
                  {renderMesaButton(68, styles.mesa)}
                </div>
              </div>

              {/* Separadores verticales inferiores */}
              <div className={salaHumanista.separadoresVerticalesInferioresHumanistica}>
                <div className={salaHumanista.rayaVerticalHumanistica}></div>
                <div className={salaHumanista.rayaVerticalHumanistica}></div>
                <div className={salaHumanista.rayaVerticalHumanistica}></div>
                <div className={salaHumanista.rayaVerticalHumanistica}></div>
                <div className={salaHumanista.rayaVerticalHumanistica}></div>
                <div className={salaHumanista.rayaVerticalHumanistica}></div>
                <div className={salaHumanista.rayaVerticalHumanistica}></div>
                <div className={salaHumanista.rayaVerticalHumanistica}></div>
                <div className={salaHumanista.rayaVerticalHumanistica}></div>
                <div className={salaHumanista.rayaVerticalHumanistica}></div>
                <div className={salaHumanista.rayaVerticalHumanistica}></div>
                <div className={salaHumanista.rayaVerticalHumanistica}></div>
              </div>
            </div>

            {/* Sección Derecha - 2 mesas rectangulares */}
            <div className={salaHumanista.seccionDerechaHumanistica}>
              {/* Espacio para alinear las mesas más abajo */}
              <div className={salaHumanista.espacioSuperiorDerechaHumanistica}>
                <div className={salaHumanista.columnaMesasHumanistica3}>
                  {renderMesaButton(69, styles.mesa)}
                  {renderMesaButton(70, styles.mesa)}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaHumanistica;