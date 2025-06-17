'use client'; // Asegúrate de que sea un componente de cliente si usa hooks o interactividad

import React from 'react';
import styles from '../reservar.module.css'; // Asegúrate de que la ruta sea correcta

interface SalaReferenciaProps {
  seleccionada: number | null;
  toggleSeleccion: (numero: number) => void;
}

const SalaReferencia: React.FC<SalaReferenciaProps> = ({ seleccionada, toggleSeleccion }) => {
  return (
    <div className={styles.fondoDecorativo}>
      <div className={styles.mapaContenedor}>
        <div className={styles.mapa}>
          <div className={styles.seccionSuperiorMapa}>
            <div className={styles.filaArriba}>
              <div className={styles.columnaMesas}>
                <button className={`${styles.mesa} ${seleccionada === 1 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(1)}>1</button>
                <button className={`${styles.mesa} ${seleccionada === 3 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(3)}>3</button>
                <button className={`${styles.mesa} ${seleccionada === 5 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(5)}>5</button>
              </div>

              <div className={styles.columnaMesas}>
                <button className={`${styles.mesa} ${seleccionada === 2 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(2)}>2</button>
                <button className={`${styles.mesa} ${seleccionada === 4 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(4)}>4</button>
                <button className={`${styles.mesa} ${seleccionada === 6 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(6)}>6</button>
              </div>

              <div className={styles.separacionesRayasVerticales}>
                <div className={styles.rayaVertical}></div>
                <div className={styles.rayaVertical}></div>
                <div className={styles.rayaVertical}></div>
              </div>

              <div className={styles.columnaMesas}>
                <button className={`${styles.mesa} ${seleccionada === 7 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(7)}>7</button>
                <div className={styles.espacio} />
                <button className={`${styles.redonda} ${seleccionada === 8 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(8)}>8</button>
              </div>

              <div className={styles.espacio} />

              <div className={styles.columnaMesas}>
                <button className={`${styles.redonda} ${seleccionada === 9 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(9)}>9</button>
                <div className={styles.espacio} />
                <button className={`${styles.mesa} ${seleccionada === 10 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(10)}>10</button>
              </div>

              <div className={styles.espacio} />

              <div className={styles.columnaMesas}>
                <button className={`${styles.mesa} ${seleccionada === 11 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(11)}>11</button>
                <div className={styles.espacio} />
                <button className={`${styles.redonda} ${seleccionada === 12 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(12)}>12</button>
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
              <button className={`${styles.mesa} ${seleccionada === 13 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(13)}>13</button>
              <button className={`${styles.mesa} ${seleccionada === 14 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(14)}>14</button>
            </div>

            <div className={styles.columnaMesas}>
              <button className={`${styles.mesa} ${seleccionada === 15 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(15)}>15</button>
              <button className={`${styles.mesa} ${seleccionada === 16 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(16)}>16</button>
            </div>

            <div className={styles.columnaMesas}>
              <button className={`${styles.mesa} ${seleccionada === 17 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(17)}>17</button>
              <button className={`${styles.mesa} ${seleccionada === 18 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(18)}>18</button>
            </div>

            <div className={styles.columnaMesas}>
              <button className={`${styles.mesa} ${seleccionada === 19 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(19)}>19</button>
              <button className={`${styles.mesa} ${seleccionada === 20 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(20)}>20</button>
            </div>

            <div className={styles.columnaMesas}>
              <button className={`${styles.mesa} ${seleccionada === 21 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(21)}>21</button>
              <button className={`${styles.mesa} ${seleccionada === 22 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(22)}>22</button>
            </div>

            <div className={styles.columnaMesas}>
              <button className={`${styles.mesa} ${seleccionada === 23 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(23)}>23</button>
              <button className={`${styles.mesa} ${seleccionada === 24 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(24)}>24</button>
            </div>

            <div className={styles.espacio} />

            <div className={styles.columnaMesas}>
              <button className={`${styles.meson} ${seleccionada === 25 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(25)}>25</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaReferencia;