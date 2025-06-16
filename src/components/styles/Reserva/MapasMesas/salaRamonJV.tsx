'use client';

import React from 'react';
import styles from '../reservar.module.css';
import salaRMJ from './salaRamonJV.module.css';

interface SalaRamonJVelasquezProps {
  seleccionada: number | null;
  toggleSeleccion: (numero: number) => void;
}

const SalaRamonJVelasquez: React.FC<SalaRamonJVelasquezProps> = ({ seleccionada, toggleSeleccion }) => {
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
                  <button className={`${styles.mesa} ${seleccionada === 71 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(71)}>71</button>
                  <button className={`${styles.mesa} ${seleccionada === 72 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(72)}>72</button>
                  <button className={`${styles.mesa} ${seleccionada === 73 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(73)}>73</button>
                  <button className={`${styles.mesa} ${seleccionada === 74 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(74)}>74</button>
                  <button className={`${styles.mesa} ${seleccionada === 75 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(75)}>75</button>
                  <button className={`${styles.mesa} ${seleccionada === 76 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(76)}>76</button>
                </div>
                <div className={salaRMJ.filaMesasRamon}>
                  <button className={`${styles.mesa} ${seleccionada === 77 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(77)}>77</button>
                  <button className={`${styles.mesa} ${seleccionada === 78 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(78)}>78</button>
                  <button className={`${styles.mesa} ${seleccionada === 79 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(79)}>79</button>
                  <button className={`${styles.mesa} ${seleccionada === 80 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(80)}>80</button>
                  <button className={`${styles.mesa} ${seleccionada === 81 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(81)}>81</button>
                  <button className={`${styles.mesa} ${seleccionada === 82 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(82)}>82</button>
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
                <button className={`${styles.mesa} ${seleccionada === 83 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(83)}>83</button>
                <div className={salaRMJ.espacioEntreMesasRamon}></div> {/* Espacio equivalente a dos mesas */}
                <button className={`${styles.mesa} ${seleccionada === 84 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(84)}>84</button>
              </div>
            </div>


            {/* Sección Derecha - 3 mesas separadas */}
            <div className={salaRMJ.seccionDerechaRamon}>
              <button className={`${styles.mesa} ${seleccionada === 85 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(85)}>85</button>
              <div className={salaRMJ.gap100px}></div>
              <button className={`${styles.mesa} ${seleccionada === 86 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(86)}>86</button>
              <div className={salaRMJ.gap100px}></div>
              <button className={`${styles.mesa} ${seleccionada === 87 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(87)}>87</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaRamonJVelasquez;