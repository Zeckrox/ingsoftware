'use client';

import React from 'react';
import styles from '../reservar.module.css';

interface SalaReferenciaProps {
  seleccionada: number | null;
  toggleSeleccion: (numero: number) => void;
  disabledMesas:Set<number>;
  userRole?: string;
  ocupados: any;
}

const SalaReferencia: React.FC<SalaReferenciaProps> = ({ seleccionada, toggleSeleccion, disabledMesas, userRole, ocupados }) => {
  const obtenerClaseMesa = (numero: number, esRedonda = false, esMeson = false) => {
    let clase = esMeson
      ? styles.meson
      : esRedonda
      ? styles.redonda
      : styles.mesa;
    if(disabledMesas.has(numero) ){
      clase += ` ${styles.mesaDeshabilitada}`
    }
    else if (ocupados.includes(numero)) {
      clase += ` ${styles.mesaNoDisponible}`; // rojo
    }else if (seleccionada == numero && userRole !== 'admin') {
      clase += ` ${styles.mesaSeleccionada}`;
    } else {
      clase += ` ${styles.mesaDisponible}`; // verde
    }

    // La lógica de "seleccionada" solo aplica para usuarios normales, no para el admin
    if (seleccionada === numero && userRole !== 'admin') {
      clase += ` ${styles.mesaSeleccionada}`;
    }

    return clase;
  };

  const Mesa = ({
    numero,
    esRedonda = false,
    esMeson = false,
  }: {
    numero: number;
    esRedonda?: boolean;
    esMeson?: boolean;
  }) => (
    <button
      className={obtenerClaseMesa(numero, esRedonda, esMeson)}
      // Deshabilitar el botón si la mesa está en disabledMesas y no estamos en modo admin
      onClick={() => (!disabledMesas.has(numero) || userRole == 'admin') && toggleSeleccion(numero)}
      disabled={(disabledMesas.has(numero) || ocupados.includes(numero)) && userRole !== 'admin'}
      title={(disabledMesas.has(numero) || ocupados.includes(numero)) ? 'No disponible' : ''}
    >
      {numero}
    </button>
  );
    
  return (
    <div className={styles.fondoDecorativo}>
      <div className={styles.mapaContenedor}>
        <div className={styles.mapa}>
          <div className={styles.seccionSuperiorMapa}>
            <div className={styles.filaArriba}>
              <div className={styles.columnaMesas}>
                <Mesa numero={1} />
                <Mesa numero={3} />
                <Mesa numero={5} />
              </div>

              <div className={styles.columnaMesas}>
                <Mesa numero={2} />
                <Mesa numero={4} />
                <Mesa numero={6} />
              </div>

              <div className={styles.separacionesRayasVerticales}>
                <div className={styles.rayaVertical}></div>
                <div className={styles.rayaVertical}></div>
                <div className={styles.rayaVertical}></div>
              </div>

              <div className={styles.columnaMesas}>
                <Mesa numero={7} />
                <div className={styles.espacio} />
                <Mesa numero={8} esRedonda />
              </div>

              <div className={styles.espacio} />

              <div className={styles.columnaMesas}>
                <Mesa numero={9} esRedonda />
                <div className={styles.espacio} />
                <Mesa numero={10} />
              </div>

              <div className={styles.espacio} />

              <div className={styles.columnaMesas}>
                <Mesa numero={11} />
                <div className={styles.espacio} />
                <Mesa numero={12} esRedonda />
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
              <Mesa numero={13} />
              <Mesa numero={14} />
            </div>

            <div className={styles.columnaMesas}>
              <Mesa numero={15} />
              <Mesa numero={16} />
            </div>

            <div className={styles.columnaMesas}>
              <Mesa numero={17} />
              <Mesa numero={18} />
            </div>

            <div className={styles.columnaMesas}>
              <Mesa numero={19} />
              <Mesa numero={20} />
            </div>

            <div className={styles.columnaMesas}>
              <Mesa numero={21} />
              <Mesa numero={22} />
            </div>

            <div className={styles.columnaMesas}>
              <Mesa numero={23} />
              <Mesa numero={24} />
            </div>

            <div className={styles.espacio} />

            <div className={styles.columnaMesas}>
                <Mesa numero={25} esMeson />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaReferencia;
