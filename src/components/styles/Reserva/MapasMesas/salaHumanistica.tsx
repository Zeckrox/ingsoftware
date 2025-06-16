'use client';

import React from 'react';
import styles from '../reservar.module.css';
import salaHumanista from './salaHumanistica.module.css';

interface SalaHumanisticaProps {
  seleccionada: number | null;
  toggleSeleccion: (numero: number) => void;
}

const SalaHumanistica: React.FC<SalaHumanisticaProps> = ({ seleccionada, toggleSeleccion }) => {
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
                  <button className={`${styles.mesa} ${seleccionada === 50 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(50)}>50</button>
                  <button className={`${styles.mesa} ${seleccionada === 51 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(51)}>51</button>
                  <button className={`${styles.mesa} ${seleccionada === 52 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(52)}>52</button>
                  <button className={`${styles.mesa} ${seleccionada === 53 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(53)}>53</button>
                  <button className={`${styles.mesa} ${seleccionada === 54 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(54)}>54</button>
                </div>
                {/* Columna de 2 mesas */}
                <div className={salaHumanista.columnaMesasHumanistica2}>
                  <button className={`${styles.mesa} ${seleccionada === 55 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(55)}>55</button>
                  <button className={`${styles.mesa} ${seleccionada === 56 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(56)}>56</button>
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
                  <button className={`${styles.mesa} ${seleccionada === 57 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(57)}>57</button>
                  <button className={`${styles.mesa} ${seleccionada === 58 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(58)}>58</button>
                  <button className={`${styles.mesa} ${seleccionada === 59 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(59)}>59</button>
                  <button className={`${styles.mesa} ${seleccionada === 60 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(60)}>60</button>
                  <button className={`${styles.mesa} ${seleccionada === 61 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(61)}>61</button>
                  <button className={`${styles.mesa} ${seleccionada === 62 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(62)}>62</button>
                </div>
                <div className={salaHumanista.filaMesasHumanistica}>
                  <button className={`${styles.mesa} ${seleccionada === 63 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(63)}>63</button>
                  <button className={`${styles.mesa} ${seleccionada === 64 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(64)}>64</button>
                  <button className={`${styles.mesa} ${seleccionada === 65 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(65)}>65</button>
                  <button className={`${styles.mesa} ${seleccionada === 66 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(66)}>66</button>
                  <button className={`${styles.mesa} ${seleccionada === 67 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(67)}>67</button>
                  <button className={`${styles.mesa} ${seleccionada === 68 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(68)}>68</button>
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
                  <button className={`${styles.mesa} ${seleccionada === 69 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(69)}>69</button>
                  <button className={`${styles.mesa} ${seleccionada === 70 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(70)}>70</button>
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