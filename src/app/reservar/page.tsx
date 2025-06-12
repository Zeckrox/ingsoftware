'use client';
import React from "react";
import styles from '../../components/styles/Reserva/reservar.module.css';
import { Poppins } from 'next/font/google';



const Reservar = () => {
  const [seleccionadas, setSeleccionadas] = React.useState<number[]>([]); // esta función crea una lista vacía donde se va a agregar el numero de la mesa que se clickee

  const toggleSeleccion = (numero: number) => { //agerag o quita el num de la lista
    setSeleccionadas((prev) =>
      prev.includes(numero)    //ya estaba seleccionada
        ? prev.filter((n) => n !== numero)  //si si, entonces la quita; si no entonces la agrega
        : [...prev, numero]   
    );
  };

  return (

    <div className={styles.contenedorGeneral}>
        <div className={styles.columnaIzquierda}>
            <div className={styles.fondoNaranjaArriba}></div>

            <div className={styles.contenedorForm}>
                <h2 className={styles.tituloForm}>Detalles</h2>

                <div className={styles.subtituloForm}>
                Mesa 5
                <br></br>
                Viernes, 07 de febrero de 2025
                </div>

                <form className={styles.formPreguntas}>
                <div className={styles.titulosPreguntas}>
                    <label>Hora de inicio</label>
                    <select>
                        <option value="">Selecciona la hora de inicio...</option>
                        <option value="07:00">07:00 a.m.</option>
                        <option value="07:30">07:30 a.m.</option>
                        <option value="08:00">08:00 a.m.</option>
                        <option value="08:30">08:30 a.m.</option>
                    </select>
                </div>

                <div className={styles.titulosPreguntas}>
                    <label>Duración</label>
                    <select>
                    <option>Selecciona la duración...</option>
                    <option value="30">30 minutos</option>
                    <option value="60">60 minutos</option>
                    <option value="90">90 minutos</option>
                    <option value="120">120 minutos</option>
                    </select>
                </div>

                <div className={styles.titulosPreguntas}>
                    <label>Hora de fin</label>
                    <input type="text" disabled placeholder="Hora de fin" />
                </div>

                <div className={styles.titulosPreguntas}>
                    <label>Cantidad de personas</label>
                    <select>
                    <option>Selecciona la cantidad de personas...</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    </select>
                </div>

                <button type="submit" className={styles.botonCambios}>Reservar</button>
                </form>

                <div className={styles.infoHorarios}>
                <p className={styles.infoHorariosTexto}>
                Los espacios de estudio en la biblioteca están disponibles de lunes a viernes, de 8:00 a.m a 5:00 p.m
                </p>
                </div>
            </div>
        </div>


    <div className={styles.columnaDerecha}>
            <h2 className={styles.tituloReserva}>Reservación de mesa</h2>
        <div className={styles.fondoNaranjaAbajo}></div>

        <div className={styles.pisoSala}>
            <div className={styles.pisoSalaTexto}>
                <label htmlFor="piso">Piso:</label>
                <select id="piso" className={styles.opcionesPisoSala}>
                    <option value="pb">Pb</option>
                    <option value="p1">P1</option>
                </select>
            </div>

            <div className={styles.pisoSalaTexto}>
                <label htmlFor="sala">Sala:</label>
                <select id="sala" className={styles.opcionesPisoSala}>
                    <option value="Sala de Humanidades">Sala de Humanidades</option>
                    <option value="Sala Ciencias">Sala Ciencias</option>
                    <option value="Sala Cocina">Sala Cocina</option>
                </select>
            </div>
        </div>
    
            
            
            <div className={styles.fondoDecorativo}>
                <div className={styles.mapaContenedor}>
                    <div className={styles.mapa}>
                        {/* Sección arriba mapa */} 
                        <div className={styles.seccionSuperiorMapa}>
                            <div className={styles.filaArriba}>
                                {/* Columna izquierda */}
                                <div className={styles.columnaMesas}>
                                    <button className={`${styles.mesa} ${seleccionadas.includes(1) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(1)}>1</button>
                                    <button className={`${styles.mesa} ${seleccionadas.includes(3) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(3)}>3</button>
                                    <button className={`${styles.mesa} ${seleccionadas.includes(5) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(5)}>5</button>
                                </div>

                                
                                {/* Columna derecha */}
                                <div className={styles.columnaMesas}>
                                    <button className={`${styles.mesa} ${seleccionadas.includes(2) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(2)}>2</button>
                                    <button className={`${styles.mesa} ${seleccionadas.includes(4) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(4)}>4</button>
                                    <button className={`${styles.mesa} ${seleccionadas.includes(6) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(6)}>6</button>
                                </div>

                                {/* 3 rayas verticales */}
                                <div className={styles.separacionesRayasVerticales}>
                                    <div className={styles.rayaVertical}></div>
                                    <div className={styles.rayaVertical}></div>
                                    <div className={styles.rayaVertical}></div>
                                </div>


                                {/* Columna izquierda 1 */}
                                <div className={styles.columnaMesas}>
                                    <button className={`${styles.mesa} ${seleccionadas.includes(7) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(7)}>7</button>
                                    <div className={styles.espacio} />
                                    <button className={`${styles.redonda} ${seleccionadas.includes(8) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(8)}>8</button>
                                </div>

                                <div className={styles.espacio} />

                                {/* Columna centro 2 */}
                                <div className={styles.columnaMesas}>
                                    <button className={`${styles.redonda} ${seleccionadas.includes(9) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(9)}>9</button>
                                    <div className={styles.espacio} />
                                    <button className={`${styles.mesa} ${seleccionadas.includes(10) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(10)}>10</button>
                                </div>

                                <div className={styles.espacio} />

                                {/* Columna derecha 3 */}
                                <div className={styles.columnaMesas}>
                                    <button className={`${styles.mesa} ${seleccionadas.includes(11) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(11)}>11</button>
                                    <div className={styles.espacio} />
                                    <button className={`${styles.redonda} ${seleccionadas.includes(12) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(12)}>12</button>
                                </div>

                                {/* 6 rayas verticales */}
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




                        
                        {/* Seccion inferior */} 
                        <div className={styles.seccionInferiorMapa}>
                            {/* 4 rayas Horizontales */}
                            <div className={styles.espacioRayasHorizontales}>
                                <div className={styles.rayaHorizontal}></div>
                                <div className={styles.rayaHorizontal}></div>
                                <div className={styles.rayaHorizontal}></div>
                                <div className={styles.rayaHorizontal}></div>
                            </div>

                            

                            <div className={styles.columnaMesas}>
                                <button className={`${styles.mesa} ${seleccionadas.includes(13) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(13)}>13</button>
                                <button className={`${styles.mesa} ${seleccionadas.includes(14) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(14)}>14</button>
                            </div>


                            <div className={styles.columnaMesas}>
                                <button className={`${styles.mesa} ${seleccionadas.includes(15) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(15)}>15</button>
                                <button className={`${styles.mesa} ${seleccionadas.includes(16) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(16)}>16</button>
                            </div>


                            <div className={styles.columnaMesas}>
                                <button className={`${styles.mesa} ${seleccionadas.includes(17) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(17)}>17</button>
                                <button className={`${styles.mesa} ${seleccionadas.includes(18) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(18)}>18</button>
                            </div>


                            <div className={styles.columnaMesas}>
                                <button className={`${styles.mesa} ${seleccionadas.includes(19) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(19)}>19</button>
                                <button className={`${styles.mesa} ${seleccionadas.includes(20) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(20)}>20</button>
                            </div>


                            <div className={styles.columnaMesas}>
                                <button className={`${styles.mesa} ${seleccionadas.includes(21) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(21)}>21</button>
                                <button className={`${styles.mesa} ${seleccionadas.includes(22) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(22)}>22</button>
                            </div>


                            <div className={styles.columnaMesas}>
                                <button className={`${styles.mesa} ${seleccionadas.includes(23) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(23)}>23</button>
                                <button className={`${styles.mesa} ${seleccionadas.includes(24) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(24)}>24</button>
                            </div>

                            <div className={styles.espacio} />

                            <div className={styles.columnaMesas}>
                                <button className={`${styles.meson} ${seleccionadas.includes(25) ? styles.mesaSeleccionada : ''}`} onClick={() => toggleSeleccion(25)}>25</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</div>

  );
};



export default Reservar;


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});