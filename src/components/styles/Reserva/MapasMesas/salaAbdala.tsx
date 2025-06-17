'use client';

import React from 'react';
import styles from '../reservar.module.css'; // Asegúrate de que la ruta sea correcta
import salaAbdala from "./salaAbdala.module.css"; // Esto es correcto si tienes estilos específicos de sala

interface SalaAbdalaProps {
  seleccionada: number | null;
  toggleSeleccion: (numero: number) => void;
  userRole?: string; // Añadir el rol del usuario
  disabledMesas: Set<number>; // Conjunto de mesas deshabilitadas
}

const SalaAbdala: React.FC<SalaAbdalaProps> = ({ seleccionada, toggleSeleccion, userRole, disabledMesas }) => {

  // Función auxiliar para renderizar un botón de mesa
  const renderMesaButton = (numero: number, baseStyle: string) => {
    const isDisabled = disabledMesas.has(numero);
    const isSelected = seleccionada === numero;

    let buttonClasses = `${baseStyle}`; // Estilo base de la mesa (e.g., styles.redonda o styles.mesa)

    if (isDisabled) {
      buttonClasses += ` ${styles.mesaDisabled}`; // Clase para mesas deshabilitadas (rojo)
    } else if (isSelected && userRole !== 'admin') {
      buttonClasses += ` ${styles.mesaSeleccionada}`; // Clase para mesa seleccionada (naranja) solo si no es admin
    }
    // Si eres admin y la mesa no está deshabilitada, se mostrará normal (sin el naranja de selección),
    // pero seguirá siendo clickeable para habilitar/deshabilitar.

    return (
      <button
        key={numero}
        className={buttonClasses}
        onClick={() => toggleSeleccion(numero)}
        // Si no eres admin y la mesa está deshabilitada, no permitimos el clic.
        // Aunque toggleSeleccion ya tiene una verificación, esto mejora la UX.
        disabled={userRole !== 'admin' && isDisabled}
      >
        {numero}
      </button>
    );
  };

  return (
    <div className={styles.fondoDecorativo}>
      <div className={salaAbdala.mapaContenedorAbdala}>
        <div className={styles.mapa}>
          <div className={salaAbdala.salaAbdalaContenedor}>
            <div className={salaAbdala.mesasRedondasGlobalContainer}>
              <div className={salaAbdala.columnaRedondas}>
                {renderMesaButton(26, styles.redonda)}
                {renderMesaButton(27, styles.redonda)}
                {renderMesaButton(28, styles.redonda)}
                {renderMesaButton(29, styles.redonda)}
              </div>

              <div className={salaAbdala.mesas5a8Container}>
                <div className={salaAbdala.filaMesas5y8}>
                  <div className={salaAbdala.columnaIndividual}>
                    {renderMesaButton(30, styles.redonda)}
                  </div>
                </div>
                <div className={salaAbdala.espacioHorizontalMedio}></div>
                <div className={salaAbdala.filaMesas6y7}>
                  <div className={salaAbdala.columnaIndividual}>
                    {renderMesaButton(31, styles.redonda)}
                  </div>
                </div>
              </div>
              <div className={salaAbdala.espaciomesa8y7}>
                <div className={salaAbdala.columnaRedondas}>
                  {renderMesaButton(32, styles.redonda)}
                  {renderMesaButton(33, styles.redonda)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaAbdala;