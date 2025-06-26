'use client';

import React from 'react';
import styles from '../reservar.module.css';
import salaCientifica from "./salaCientifica.module.css"

interface SalaCientificaProps {
  seleccionada: number | null;
  toggleSeleccion: (numero: number) => void;
  userRole?: string; // Añadir el rol del usuario
  disabledMesas: Set<number>; // Conjunto de mesas deshabilitadas
  ocupados: any;
}

const SalaCientifica: React.FC<SalaCientificaProps> = ({ seleccionada, toggleSeleccion, userRole, disabledMesas, ocupados }) => {

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
      <div className={salaCientifica.mapaContenedorCientifica}>
        <div className={styles.mapa}>
          <div className={salaCientifica.salaCientificaContenedor}>
            {/* Columna Izquierda Principal (6 mesas y separadores) */}
            <div className={styles.columnaPrincipalIzquierda}>
              {/* Sección Superior - 6 Mesas Rectangulares */}
              <div className={salaCientifica.seccionSuperiorCientifica}>
                {/* Columna de la izquierda (3 mesas) */}
                <div className={salaCientifica.columnaMesasCientifica}>
                  {renderMesaButton(34, styles.mesa)}
                  {renderMesaButton(35, styles.mesa)}
                  {renderMesaButton(36, styles.mesa)}
                </div>
                {/* Columna de la derecha (3 mesas) */}
                <div className={salaCientifica.columnaMesasCientifica}>
                  {renderMesaButton(37, styles.mesa)}
                  {renderMesaButton(38, styles.mesa)}
                  {renderMesaButton(39, styles.mesa)}
                </div>
              </div>

              {/* Separadores Verticales Centrales */}
              <div className={salaCientifica.separadoresVerticalesCentrales}>
                <div className={salaCientifica.rayaVerticalCientifica}></div>
                <div className={salaCientifica.rayaVerticalCientifica}></div>
                <div className={salaCientifica.rayaVerticalCientifica}></div>
                <div className={salaCientifica.rayaVerticalCientifica}></div>
                <div className={salaCientifica.rayaVerticalCientifica}></div>
                <div className={salaCientifica.rayaVerticalCientifica}></div>
              </div>
            </div>
            <div className={styles.columnaPrincipalDerecha}>
              {/* Espacio para alinear las mesas de la derecha más abajo */}
              <div className={styles.espacioSuperiorDerecha}></div>
              {/* Sección Inferior - 11 Mesas Rectangulares y Separador Zigzag */}
              <div className={salaCientifica.seccionInferiorCientifica}>
                {/* Grupo de columnas de mesas (7-17) */}
                <div className={salaCientifica.grupoColumnasMesasCientifica}>
                  {/* Columna 1 (5 mesas) */}
                  <div className={salaCientifica.columnaMesasCientifica}>
                    {renderMesaButton(40, styles.mesa)}
                    {renderMesaButton(41, styles.mesa)}
                    {renderMesaButton(42, styles.mesa)}
                    {renderMesaButton(43, styles.mesa)}
                    {renderMesaButton(44, styles.mesa)}
                  </div>
                  {/* Columna 2 (5 mesas) */}
                  <div className={salaCientifica.columnaMesasCientifica}>
                    {renderMesaButton(45, styles.mesa)}
                    {renderMesaButton(46, styles.mesa)}
                    {renderMesaButton(47, styles.mesa)}
                    {renderMesaButton(48, styles.mesa)}
                    {renderMesaButton(49, styles.mesa)}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaCientifica;