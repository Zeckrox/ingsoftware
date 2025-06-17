'use client';

import React from 'react';
import styles from '../reservar.module.css'; // Asegúrate de que la ruta sea correcta

interface SalaReferenciaProps {
  seleccionada: number | null;
  toggleSeleccion: (numero: number) => void;
  userRole?: string; // Añadir el rol del usuario
  disabledMesas: Set<number>; // Conjunto de mesas deshabilitadas
}

const SalaReferencia: React.FC<SalaReferenciaProps> = ({ seleccionada, toggleSeleccion, userRole, disabledMesas }) => {

  // Función auxiliar para renderizar un botón de mesa
  const renderMesaButton = (numero: number, baseStyle: string) => {
    const isDisabled = disabledMesas.has(numero);
    const isSelected = seleccionada === numero;

    let buttonClasses = `${baseStyle}`; // Estilo base de la mesa (e.g., styles.mesa o styles.redonda)

    if (isDisabled) {
      buttonClasses += ` ${styles.mesaDisabled}`; // Clase para mesas deshabilitadas (rojo)
    } else if (isSelected && userRole !== 'admin') {
      buttonClasses += ` ${styles.mesaSeleccionada}`; // Clase para mesa seleccionada (naranja) solo si no es admin
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
      <div className={styles.mapaContenedor}>
        <div className={styles.mapa}>
          <div className={styles.seccionSuperiorMapa}>
            <div className={styles.filaArriba}>
              <div className={styles.columnaMesas}>
                {renderMesaButton(1, styles.mesa)}
                {renderMesaButton(3, styles.mesa)}
                {renderMesaButton(5, styles.mesa)}
              </div>

              <div className={styles.columnaMesas}>
                {renderMesaButton(2, styles.mesa)}
                {renderMesaButton(4, styles.mesa)}
                {renderMesaButton(6, styles.mesa)}
              </div>

              <div className={styles.separacionesRayasVerticales}>
                <div className={styles.rayaVertical}></div>
                <div className={styles.rayaVertical}></div>
                <div className={styles.rayaVertical}></div>
              </div>

              <div className={styles.columnaMesas}>
                {renderMesaButton(7, styles.mesa)}
                <div className={styles.espacio} />
                {renderMesaButton(8, styles.redonda)}
              </div>

              <div className={styles.espacio} />

              <div className={styles.columnaMesas}>
                {renderMesaButton(9, styles.redonda)}
                <div className={styles.espacio} />
                {renderMesaButton(10, styles.mesa)}
              </div>

              <div className={styles.espacio} />

              <div className={styles.columnaMesas}>
                {renderMesaButton(11, styles.mesa)}
                <div className={styles.espacio} />
                {renderMesaButton(12, styles.redonda)}
              </div>

              <div className={styles.separacionesRayasVerticales}>
                <div className={styles.rayaVertical}></div>
                <div className={styles.rayaVertical}></div>
                <div className={styles.rayaVertical}></div>
                <div className={styles.rayaVertical}></div>
                <div className={styles.rayaVertical}></div>
                <div className={styles.rayaVertical}></div>
              </div>
            </div>
          </div>

          <div className={styles.seccionInferiorMapa}>
            <div className={styles.espacioRayasHorizontales}>
              <div className={styles.rayaHorizontal}></div>
              <div className={styles.rayaHorizontal}></div>
              <div className={styles.rayaHorizontal}></div>
              <div className={styles.rayaHorizontal}></div>
            </div>

            <div className={styles.columnaMesas}>
              {renderMesaButton(13, styles.mesa)}
              {renderMesaButton(14, styles.mesa)}
            </div>

            <div className={styles.columnaMesas}>
              {renderMesaButton(15, styles.mesa)}
              {renderMesaButton(16, styles.mesa)}
            </div>

            <div className={styles.columnaMesas}>
              {renderMesaButton(17, styles.mesa)}
              {renderMesaButton(18, styles.mesa)}
            </div>

            <div className={styles.columnaMesas}>
              {renderMesaButton(19, styles.mesa)}
              {renderMesaButton(20, styles.mesa)}
            </div>

            <div className={styles.columnaMesas}>
              {renderMesaButton(21, styles.mesa)}
              {renderMesaButton(22, styles.mesa)}
            </div>

            <div className={styles.columnaMesas}>
              {renderMesaButton(23, styles.mesa)}
              {renderMesaButton(24, styles.mesa)}
            </div>

            <div className={styles.espacio} />

            <div className={styles.columnaMesas}>
              {renderMesaButton(25, styles.meson)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaReferencia;