'use client';
import React,  { useEffect, useState, useCallback  } from "react";
import { useSearchParams, useRouter } from 'next/navigation'; 
import styles from '../../components/styles/Reserva/reservar.module.css';
import { Poppins } from 'next/font/google';
import Modal from 'react-modal';

const startTimeOptions = [
  "08:00 a.m.", "08:30 a.m.", "09:00 a.m.", "09:30 a.m.",
  "10:00 a.m.", "10:30 a.m.", "11:00 a.m.", "11:30 a.m.",
  "12:00 p.m.", "12:30 p.m.", "01:00 p.m.", "01:30 p.m.",
  "02:00 p.m.", "02:30 p.m.", "03:00 p.m.", "03:30 p.m.",
  "04:00 p.m.", "04:30 p.m.", "05:00 p.m."
];

const durationOptions = [
  { label: "30 min", value: 30 },
  { label: "1 h", value: 60 },
  { label: "1 h 30 min", value: 90 },
  { label: "2 h", value: 120 },
  { label: "2 h 30 min", value: 150 },
  { label: "3 h", value: 180 }
];

const peopleOptions = [
  { label: "2 personas", value: 2 },
  { label: "3 personas", value: 3 },
  { label: "4 personas", value: 4 },
];

const allSalas = {
  pb: ["Sala Referencia"],
  p1: [
    "Sala de Humanidades",
    "Sala Abdalá",
    "Sala Científica",
    "Sala Ramón J. Velasquez",
    ]
};


const Reservar = () => {
    const router = useRouter(); 
    const [seleccionada, setSeleccionada] = React.useState<number | null>(null);    
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(null);
    const searchParams = useSearchParams();
    // Estados para los valores de los InputFields
    const [horaInicio, setHoraInicio] = useState<string>('');
    const [duracion, setDuracion] = useState<number>(0); // Guardaremos la duración en minutos
    const [horaFin, setHoraFin] = useState<string>('');
    const [cantidadPersonas, setCantidadPersonas] = useState<number>(0);

    const [selectedPiso, setSelectedPiso] = useState<string>('pb'); 
    const [availableSalas, setAvailableSalas] = useState<string[]>(allSalas.pb); 
    const [selectedSala, setSelectedSala] = useState<string>('Sala Referencia'); 

    // useEffect para leer la fecha de la URL cuando el componente se monta
    useEffect(() => {
        const dateParam = searchParams.get('date');
        if (dateParam) {
        setSelectedCalendarDate(dateParam);
        }
    }, [searchParams]); // Dependencia en searchParams para re-ejecutar si los parámetros de la URL cambian

    const capitalizeFirstLetter = (string: string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const formatDisplayDate = (dateString: string | null): string => {
    if (!dateString) return "Fecha no seleccionada";
    try {
        const date = new Date(dateString + 'T00:00:00'); // Añadir T00:00:00 para evitar problemas de zona horaria

        const weekday = date.toLocaleDateString('es-ES', { weekday: 'long' });

        const capitalizedWeekday = capitalizeFirstLetter(weekday);

        const dayMonthYear = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        });

    return `${capitalizedWeekday}, ${dayMonthYear}`;

    } catch (error) {
        console.error("Error al formatear la fecha:", error);
        return "Fecha inválida";
    }
    };

        // Función para calcular la hora de fin
    const calculateHoraFin = useCallback(() => {
        if (horaInicio && duracion > 0) {
        // Parsear la hora de inicio (ej. "08:00 a.m." a un objeto Date)
        const [time, period] = horaInicio.split(' ');
        let [hours, minutes] = time.split(':').map(Number);

        if (period === 'p.m.' && hours !== 12) {
            hours += 12;
        } else if (period === 'a.m.' && hours === 12) { // Caso 12:xx a.m. (medianoche)
            hours = 0;
        }

        const startDate = new Date();
        startDate.setHours(hours, minutes, 0, 0); // Establecer la hora y minutos

        // Añadir la duración
        startDate.setMinutes(startDate.getMinutes() + duracion);

        // Formatear la hora de fin de nuevo a "HH:MM a.m./p.m."
        const endHours = startDate.getHours();
        const endMinutes = startDate.getMinutes();

        const ampm = endHours >= 12 ? 'p.m.' : 'a.m.';
        const displayHours = endHours % 12 === 0 ? 12 : endHours % 12;
        const displayMinutes = endMinutes < 10 ? `0${endMinutes}` : endMinutes;

        setHoraFin(`${displayHours}:${displayMinutes} ${ampm}`);
        } else {
        setHoraFin(''); // Limpiar si no hay hora de inicio o duración
        }
    }, [horaInicio, duracion]);

    // useEffect para recalcular la hora de fin cada vez que horaInicio o duracion cambien
    useEffect(() => {
        calculateHoraFin();
    }, [horaInicio, duracion, calculateHoraFin]);



    
  const toggleSeleccion = (numero: number) => {
    setSeleccionada(prevSeleccionada => (prevSeleccionada === numero ? null : numero));
  };

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

  // Asegúrate de pasar la fecha a tu modal si es necesario, o directamente al texto
  const displayFormattedDate = formatDisplayDate(selectedCalendarDate);
  // Helper para obtener el valor del input field de hora de inicio
  const getHoraInicioValue = () => {
    // Si horaInicio está vacío, puedes retornar una cadena vacía o el placeholder
    return horaInicio || '';
  };


  const handlePisoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPiso = e.target.value;
    setSelectedPiso(newPiso);

    // Actualizar las salas disponibles según el piso seleccionado
    if (newPiso === 'pb') {
      setAvailableSalas(allSalas.pb);
      setSelectedSala(allSalas.pb[0]); // Seleccionar automáticamente la primera sala (Sala Referencia)
    } else if (newPiso === 'p1') {
      setAvailableSalas(allSalas.p1);
      // Opcional: si la sala actual no está en P1, resetear o elegir la primera de P1
      if (!allSalas.p1.includes(selectedSala)) {
        setSelectedSala(allSalas.p1[0]); // Seleccionar la primera de P1 por defecto
      }
    }
  };

  // Manejador para el cambio de sala
  const handleSalaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSala(e.target.value);
  };


  // Función para manejar la acción de "Confirmar Reserva" (que ahora navegará)
  const handleConfirmReservation = () => {
    // 1. Validar que la mesa esté seleccionada
    if (seleccionada === null) {
      alert("Por favor, selecciona una mesa.");
      return;
    }
    // 2. Crear los parámetros de la URL
    const queryParams = new URLSearchParams();
    queryParams.append('mesa', String(seleccionada));
    queryParams.append('sala', selectedSala);
    queryParams.append('dia', selectedCalendarDate || ''); // Pasa la fecha en formato ISO
    queryParams.append('horaInicio', horaInicio);
    queryParams.append('horaFin', horaFin);
    queryParams.append('cantidadPersonas', String(cantidadPersonas));


    // 3. Navegar a la página de confirmación con los parámetros
    router.push(`/confirmation?${queryParams.toString()}`);
    closeModal(); // Cierra el modal después de navegar
  };


  return (

    <div className={styles.contenedorGeneral}>
        <div className={styles.columnaIzquierda}>
            <div className={styles.fondoNaranjaArriba}></div>

            <div className={styles.contenedorForm}>
                <h2 className={styles.tituloForm}>Detalles</h2>

                <div className={styles.subtituloForm}>
                Mesa {seleccionada !== null ? seleccionada : 'N/A'}
                <br></br>
                 {displayFormattedDate} 
                </div>

                <form className={styles.formPreguntas}>
                <div className={styles.titulosPreguntas}>
                    <label htmlFor="horaInicio">Hora de inicio:</label>
                    <select
                        id="horaInicio"
                        className={styles.detalleInput} 
                        value={horaInicio}
                        onChange={(e) => setHoraInicio(e.target.value)}
                    >
                        <option value="">Selecciona la hora de inicio...</option>
                        {startTimeOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                        ))}
                    </select>
                    </div>

                <div className={styles.titulosPreguntas}>
                    <label htmlFor="duracion">Duración:</label>
                    <select
                        id="duracion"
                        className={styles.detalleInput} 
                        value={durationOptions.find(opt => opt.value === duracion)?.label || ''}
                        onChange={(e) => {
                        const selectedDuration = durationOptions.find(opt => opt.label === e.target.value);
                        setDuracion(selectedDuration ? selectedDuration.value : 0);
                        }}
                    >
                        <option value="">Selecciona la duración...</option>
                        {durationOptions.map((option) => (
                        <option key={option.value} value={option.label}>
                            {option.label}
                        </option>
                        ))}
                    </select>
                    </div>

                <div className={styles.titulosPreguntas}>
                    <label htmlFor="horaFin">Hora de fin:</label>
                    <input
                        id="horaFin"
                        type="text"
                        className={styles.detalleInput} 
                        placeholder="Hora de fin"
                        value={horaFin}
                        disabled={true}
                    />
                </div>

                <div className={styles.titulosPreguntas}>
                    <label htmlFor="cantidadPersonas">Cantidad de personas:</label>
                    <select
                        id="cantidadPersonas"
                        className={styles.detalleInput} 
                        value={cantidadPersonas ? `${cantidadPersonas} personas` : ''}
                        onChange={(e) => {
                        const selectedPeople = peopleOptions.find(opt => opt.label === e.target.value);
                        setCantidadPersonas(selectedPeople ? selectedPeople.value : 0);
                        }}
                    >
                        <option value="">Selecciona la cantidad de personas...</option>
                        {peopleOptions.map((option) => (
                        <option key={option.value} value={option.label}>
                            {option.label}
                        </option>
                        ))}
                    </select>
                </div>

                <button onClick={openModal}type="button" className={styles.botonCambios}>Reservar</button>
                </form>

                <div className={styles.infoHorarios}>
                <p className={styles.infoHorariosTexto}>
                Los espacios de estudio en la biblioteca están disponibles de lunes a viernes, de 8:00 a.m a 5:00 p.m
                </p>
                </div>
            </div>
        </div>

    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
        >

            <button className={styles.closeButton} onClick={closeModal}>×</button>
             <div className={styles.contentContainer}>
                {/* Sección izquierda (texto) */}
                <div className={styles.textSection}>
                    <h2 className={styles.modalTitle}>Mesa {seleccionada !== null ? seleccionada : 'N/A'}</h2>
                    <h2 className={styles.textoInfoPopReserva}>{selectedSala}</h2>
                    <h2 className={styles.textoInfoPopReserva}>Día: {displayFormattedDate}</h2>
                    <h2 className={styles.textoInfoPopReserva}>Horario: {horaInicio} - {horaFin}</h2>
                    <h2 className={styles.textoInfoPopReserva}>Cantidad de personas: {cantidadPersonas || 'N/A'}</h2>

                    <button className={styles.reserveButton} onClick={handleConfirmReservation}>Confirmar Reserva</button>
                </div>

                {/* Sección derecha (imagen) */}
                <div className={styles.imageSection}>
                    <img src="/fotoResevas.png" alt="Mesa 5" className={styles.image} />
                </div>
            </div>
    </Modal>



    <div className={styles.columnaDerecha}>
            <h2 className={styles.tituloReserva}>Reservación de mesa</h2>
        <div className={styles.fondoNaranjaAbajo}></div>

        <div className={styles.pisoSala}>
            <div className={styles.pisoSalaTexto}>
                <label htmlFor="piso">Piso:</label>
                <select
                id="piso"
                className={styles.opcionesPisoSala}
                value={selectedPiso} // Controla el valor del select
                onChange={handlePisoChange} // Maneja el cambio
                >
                <option value="pb">Pb</option>
                <option value="p1">P1</option>
                </select>
            </div>

            <div className={styles.pisoSalaTexto}>
                <label htmlFor="sala">Sala:</label>
                <select
                id="sala"
                className={styles.opcionesPisoSala}
                value={selectedSala} // Controla el valor del select
                onChange={handleSalaChange} // Maneja el cambio
                >
                {availableSalas.map((salaOption) => (
                    <option key={salaOption} value={salaOption}>
                    {salaOption}
                    </option>
                ))}
                </select>
            </div>
        </div>
    
            
            
            <div className={styles.fondoDecorativo}>
          <div className={styles.mapaContenedor}>
            <div className={styles.mapa}>
              <div className={styles.seccionSuperiorMapa}>
                <div className={styles.filaArriba}>
                  <div className={styles.columnaMesas}>
                    {/* CAMBIO: Lógica para aplicar la clase 'mesaSeleccionada' */}
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
      </div>
    </div>
  );
};

export default Reservar;


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});