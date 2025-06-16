'use client'; // Asegúrate de que sea un componente de cliente si usa hooks o interactividad

import React from 'react';
import styles from '../reservar.module.css'; // Asegúrate de que la ruta sea correcta
import salaAbdala from "./salaAbdala.module.css";

interface SalaAbdalaProps {
  seleccionada: number | null;
  toggleSeleccion: (numero: number) => void;
}

const SalaAbdala: React.FC<SalaAbdalaProps> = ({ seleccionada, toggleSeleccion }) => {
  return (
    <div className={styles.fondoDecorativo}>
      <div className={salaAbdala.mapaContenedorAbdala}>
        <div className={styles.mapa}>
          <div className={salaAbdala.salaAbdalaContenedor}>
            <div className={salaAbdala.mesasRedondasGlobalContainer}>
              <div className={salaAbdala.columnaRedondas}>
                <button className={`${styles.redonda} ${seleccionada === 26 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(26)}>26</button>
                <button className={`${styles.redonda} ${seleccionada === 27 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(27)}>27</button>
                <button className={`${styles.redonda} ${seleccionada === 28 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(28)}>28</button>
                <button className={`${styles.redonda} ${seleccionada === 29 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(29)}>29</button>
              </div>

              <div className={salaAbdala.mesas5a8Container}>
                <div className={salaAbdala.filaMesas5y8}>
                  <div className={salaAbdala.columnaIndividual}>
                    <button className={`${styles.redonda} ${seleccionada === 30 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(30)}>30</button>
                  </div>
                </div>
                <div className={salaAbdala.espacioHorizontalMedio}></div>
                <div className={salaAbdala.filaMesas6y7}>
                  <div className={salaAbdala.columnaIndividual}>
                    <button className={`${styles.redonda} ${seleccionada === 31 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(31)}>31</button>
                  </div>
                </div>
              </div>
              <div className={salaAbdala.espaciomesa8y7 }>
              <div className={salaAbdala.columnaRedondas}>
                    <button className={`${styles.redonda} ${seleccionada === 32 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(32)}>32</button>
                    <button className={`${styles.redonda} ${seleccionada === 33 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(33)}>33</button>
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