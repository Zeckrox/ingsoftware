'use client'; // Asegúrate de que sea un componente de cliente si usa hooks o interactividad

import React from 'react';
import styles from '../reservar.module.css'; // Asegúrate de que la ruta sea correcta
import salaCientifica from "./salaCientifica.module.css"

interface SalaCientificaProps {
  seleccionada: number | null;
  toggleSeleccion: (numero: number) => void;
}

const SalaCientifica: React.FC<SalaCientificaProps> = ({ seleccionada, toggleSeleccion }) => {
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
                <button className={`${styles.mesa} ${seleccionada === 34 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(34)}>34</button>
                <button className={`${styles.mesa} ${seleccionada === 35 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(35)}>35</button>
                <button className={`${styles.mesa} ${seleccionada === 36 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(36)}>36</button>
              </div>
              {/* Columna de la derecha (3 mesas) */}
              <div className={salaCientifica.columnaMesasCientifica}>
                <button className={`${styles.mesa} ${seleccionada === 37 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(37)}>37</button>
                <button className={`${styles.mesa} ${seleccionada === 38 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(38)}>38</button>
                <button className={`${styles.mesa} ${seleccionada === 39 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(39)}>39</button>
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
                {/* Columna 1 (4 mesas) */}
                <div className={salaCientifica.columnaMesasCientifica}>
                  <button className={`${styles.mesa} ${seleccionada === 40 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(40)}>40</button>
                  <button className={`${styles.mesa} ${seleccionada === 41 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(41)}>41</button>
                  <button className={`${styles.mesa} ${seleccionada === 42 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(42)}>42</button>
                  <button className={`${styles.mesa} ${seleccionada === 43 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(43)}>43</button>
                  <button className={`${styles.mesa} ${seleccionada === 44 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(44)}>44</button>
                 
                </div>
                {/* Columna 2 (4 mesas) */}
                <div className={salaCientifica.columnaMesasCientifica}>
                  <button className={`${styles.mesa} ${seleccionada === 45 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(45)}>45</button>
                  <button className={`${styles.mesa} ${seleccionada === 46 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(46)}>46</button>
                  <button className={`${styles.mesa} ${seleccionada === 47 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(47)}>47</button>
                  <button className={`${styles.mesa} ${seleccionada === 48 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(48)}>48</button>
                  <button className={`${styles.mesa} ${seleccionada === 49 ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(49)}>49</button>
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