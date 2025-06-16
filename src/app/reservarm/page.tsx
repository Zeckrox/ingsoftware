'use client';
import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import styles from '../../components/styles/Reserva/reservar.module.css'; // Asumo que es la misma ruta
import { Poppins } from 'next/font/google';
import Modal from 'react-modal';
import SalaReferencia from "@/components/styles/Reserva/MapasMesas/salaReferencia";
import SalaCientifica from "@/components/styles/Reserva/MapasMesas/salaCientifica";
import SalaAbdala from "@/components/styles/Reserva/MapasMesas/salaAbdala";
import SalaHumanistica from "@/components/styles/Reserva/MapasMesas/salaHumanistica";
import SalaRamon from "@/components/styles/Reserva/MapasMesas/salaRamonJV";
import { useUser } from "@/context/userContext"; // Importar useUser

// Las opciones iniciales ahora serán los valores por defecto para los estados
const initialStartTimeOptions = [
  "08:00 a.m.", "08:30 a.m.", "09:00 a.m.", "09:30 a.m.",
  "10:00 a.m.", "10:30 a.m.", "11:00 a.m.", "11:30 a.m.",
  "12:00 p.m.", "12:30 p.m.", "01:00 p.m.", "01:30 p.m.",
  "02:00 p.m.", "02:30 p.m.", "03:00 p.m.", "03:30 p.m.",
  "04:00 p.m.", "04:30 p.m.", "05:00 p.m."
];

const initialDurationOptions = [
  { label: "30 min", value: 30 },
  { label: "1 h", value: 60 },
  { label: "1 h 30 min", value: 90 },
  { label: "2 h", value: 120 },
  { label: "2 h 30 min", value: 150 },
  { label: "3 h", value: 180 }
];

const initialPeopleOptions = [
  { label: "2 personas", value: 2 },
  { label: "3 personas", value: 3 },
  { label: "4 personas", value: 4 },
];


const allSalas = {
  pb: ["Sala Referencia"],
  p1: [
    "Sala Abdalá",
    "Sala Científica",
    "Sala Humanística",
    "Sala Ramón J. Velasquez",
  ]
};

// Función de utilidad para convertir hora AM/PM a un formato comparable (minutos desde medianoche)
const timeToMinutes = (timeString: string): number => {
  const [time, period] = timeString.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (period === 'p.m.' && hours !== 12) {
    hours += 12;
  } else if (period === 'a.m.' && hours === 12) { // 12 AM (medianoche) es 0 horas
    hours = 0;
  }
  return hours * 60 + minutes;
};

function Inside() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoadingUser } = useUser(); // Obtener información del usuario

  const [seleccionada, setSeleccionada] = useState<number | null>(null);
  const [confirmReservationModalIsOpen, setConfirmReservationModalIsOpen] = useState(false); // Cambiado a 'confirmReservationModalIsOpen' para no chocar con 'modalIsOpen' del Header
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(null);
  const [horaInicio, setHoraInicio] = useState<string>('');
  const [duracion, setDuracion] = useState<number>(0);
  const [horaFin, setHoraFin] = useState<string>('');
  const [cantidadPersonas, setCantidadPersonas] = useState<number>(0);

  const [selectedPiso, setSelectedPiso] = useState<string>('pb');
  const [availableSalas, setAvailableSalas] = useState<string[]>(allSalas.pb);
  const [selectedSala, setSelectedSala] = useState<string>('Sala Referencia');

  // Estados para la administración de Horarios, Duración y Personas
  const [editableStartTimes, setEditableStartTimes] = useState<string[]>(initialStartTimeOptions);
  const [editableDurationOptions, setEditableDurationOptions] = useState(initialDurationOptions);
  const [editablePeopleOptions, setEditablePeopleOptions] = useState(initialPeopleOptions);

  const [manageOptionsModalIsOpen, setManageOptionsModalIsOpen] = useState(false);
  const [optionTypeToManage, setOptionTypeToManage] = useState<'start_time' | 'duration' | 'people' | null>(null);
  const [newOptionValue, setNewOptionValue] = useState<string>('');

  // Estados para la administración de Mesas
  const [disabledMesas, setDisabledMesas] = useState<Set<number>>(new Set());
  const [disableConfirmModalIsOpen, setDisableConfirmModalIsOpen] = useState(false);
  const [mesaToToggle, setMesaToToggle] = useState<number | null>(null);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      Modal.setAppElement(document.body);
    }
  }, []);

  useEffect(() => {
    const dateParam = searchParams.get('date');
    if (dateParam) {
      setSelectedCalendarDate(dateParam);
    }
  }, [searchParams]);

  useEffect(() => {
    // Si el usuario es admin, deselecciona cualquier mesa.
    // Esto evita que el admin vea una mesa seleccionada en el modo de administración.
    if (user && user.role === 'admin') {
      setSeleccionada(null);
    }
  }, [user]);

  const capitalizeFirstLetter = (string: string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatDisplayDate = (dateString: string | null): string => {
    if (!dateString) return "Fecha no seleccionada";
    try {
      const date = new Date(dateString + 'T00:00:00');
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

  const calculateHoraFin = useCallback(() => {
    if (horaInicio && duracion > 0) {
      const [time, period] = horaInicio.split(' ');
      let [hours, minutes] = time.split(':').map(Number);

      if (period === 'p.m.' && hours !== 12) {
        hours += 12;
      } else if (period === 'a.m.' && hours === 12) {
        hours = 0;
      }

      const startDate = new Date();
      startDate.setHours(hours, minutes, 0, 0);
      startDate.setMinutes(startDate.getMinutes() + duracion);

      const endHours = startDate.getHours();
      const endMinutes = startDate.getMinutes();
      const ampm = endHours >= 12 ? 'p.m.' : 'a.m.';
      const displayHours = endHours % 12 === 0 ? 12 : endHours % 12;
      const displayMinutes = endMinutes < 10 ? `0${endMinutes}` : endMinutes;

      setHoraFin(`${displayHours}:${displayMinutes} ${ampm}`);
    } else {
      setHoraFin('');
    }
  }, [horaInicio, duracion]);

  useEffect(() => {
    calculateHoraFin();
  }, [horaInicio, duracion, calculateHoraFin]);

  // --- Funciones de administración de Horarios, Duración y Personas ---

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, type: 'start_time' | 'duration' | 'people') => {
    const value = e.target.value;
    if (value === "manage_options") {
      setOptionTypeToManage(type);
      setManageOptionsModalIsOpen(true);
      setNewOptionValue('');
    } else if (type === 'start_time') {
      setHoraInicio(value);
    } else if (type === 'duration') {
      const selectedDuration = editableDurationOptions.find(opt => opt.label === value);
      setDuracion(selectedDuration ? selectedDuration.value : 0);
    } else if (type === 'people') {
      const selectedPeople = editablePeopleOptions.find(opt => opt.label === value);
      setCantidadPersonas(selectedPeople ? selectedPeople.value : 0);
    }
  };

  const closeConfirmReservationModal = () => { // Renombrada para mayor claridad
    setConfirmReservationModalIsOpen(false);
  };

  const closeManageOptionsModal = () => {
    setManageOptionsModalIsOpen(false);
    setOptionTypeToManage(null);
    setNewOptionValue('');
  };

  const addOption = () => {
    if (newOptionValue.trim() === '') return;

    if (optionTypeToManage === 'start_time') {
      if (!/^\d{2}:\d{2}\s(a\.m\.|p\.m\.)$/.test(newOptionValue.trim())) {
        alert("Formato de hora inválido. Usa HH:MM a.m. o HH:MM p.m.");
        return;
      }
      setEditableStartTimes(prev => {
        const newTimes = [...prev, newOptionValue.trim()];
        return newTimes.sort((a, b) => timeToMinutes(a) - timeToMinutes(b));
      });
    } else if (optionTypeToManage === 'duration') {
      const matchHoursMinutes = newOptionValue.trim().match(/^(?:(\d+)\s*h)?\s*(?:(\d+)\s*min)?$/i);

      let actualValue = 0;
      let isValidFormat = false;

      if (matchHoursMinutes) {
        const hoursPart = matchHoursMinutes[1];
        const minutesPart = matchHoursMinutes[2];

        let totalMinutes = 0;
        if (hoursPart) {
          totalMinutes += parseInt(hoursPart) * 60;
          isValidFormat = true;
        }
        if (minutesPart) {
          totalMinutes += parseInt(minutesPart);
          isValidFormat = true;
        }

        if (isValidFormat && totalMinutes > 0) {
          actualValue = totalMinutes;
        } else {
          isValidFormat = false;
        }
      }

      if (!isValidFormat || actualValue === 0) {
        alert("Formato de duración inválido. Usa 'X min', 'Y h', o 'Y h Z min' (ej: 1h 30min, 90min, 2h).");
        return;
      }

      setEditableDurationOptions(prev => [...prev, { label: newOptionValue.trim(), value: actualValue }]
        .sort((a, b) => a.value - b.value));
    } else if (optionTypeToManage === 'people') {
      const valueNum = parseInt(newOptionValue.trim());
      if (isNaN(valueNum) || valueNum <= 0) {
        alert("Por favor, introduce un número válido de personas.");
        return;
      }
      setEditablePeopleOptions(prev => [...prev, { label: `${valueNum} personas`, value: valueNum }]
        .sort((a, b) => a.value - b.value));
    }
    setNewOptionValue('');
  };

  const removeOption = (valueToRemove: string) => {
    if (optionTypeToManage === 'start_time') {
      setEditableStartTimes(prev => prev.filter(option => option !== valueToRemove));
    } else if (optionTypeToManage === 'duration') {
      setEditableDurationOptions(prev => prev.filter(option => option.label !== valueToRemove));
    } else if (optionTypeToManage === 'people') {
      setEditablePeopleOptions(prev => prev.filter(option => option.label !== valueToRemove));
    }
  };

  // --- Funciones para Deshabilitar/Habilitar Mesas ---
  const closeDisableConfirmModal = () => {
    setDisableConfirmModalIsOpen(false);
    setMesaToToggle(null);
  };

  const handleConfirmDisableToggle = () => {
    if (mesaToToggle === null) return;

    setDisabledMesas(prev => {
      const newDisabled = new Set(prev);
      const action = newDisabled.has(mesaToToggle) ? 'HABILITADA' : 'DESHABILITADA';

      if (newDisabled.has(mesaToToggle)) {
        newDisabled.delete(mesaToToggle);
      } else {
        newDisabled.add(mesaToToggle);
      }


      // Si la mesa que el admin está deshabilitando estaba seleccionada, la deseleccionamos
      if (seleccionada === mesaToToggle && newDisabled.has(mesaToToggle)) {
        setSeleccionada(null);
      }
      return newDisabled;
    });

    closeDisableConfirmModal();
  };


  // Modificado para el rol de administrador
  const toggleSeleccion = (numero: number) => {
    if (user && user.role === 'admin') {
      setMesaToToggle(numero); // Guarda la mesa para el modal de confirmación
      setDisableConfirmModalIsOpen(true); // Abre el modal de confirmación
    } else {
      // Comportamiento normal para usuarios no administradores
      if (!disabledMesas.has(numero)) { // Solo permite seleccionar si no está deshabilitada
        setSeleccionada(prevSeleccionada => (prevSeleccionada === numero ? null : numero));
      } else {
        alert(`La mesa ${numero} está deshabilitada y no se puede seleccionar.`);
      }
    }
  };

  const openConfirmReservationModal = () => setConfirmReservationModalIsOpen(true);


  const displayFormattedDate = formatDisplayDate(selectedCalendarDate);

  const handlePisoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPiso = e.target.value;
    setSelectedPiso(newPiso);

    if (newPiso === 'pb') {
      setAvailableSalas(allSalas.pb);
      setSelectedSala(allSalas.pb[0]);
    } else if (newPiso === 'p1') {
      setAvailableSalas(allSalas.p1);
      if (!allSalas.p1.includes(selectedSala)) {
        setSelectedSala(allSalas.p1[0]);
      }
    }
  };

  const handleSalaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSala(e.target.value);
  };

  const handleConfirmReservation = () => {
    if (seleccionada === null) {
      alert("Por favor, selecciona una mesa.");
      return;
    }
    if (!horaInicio || duracion === 0 || cantidadPersonas === 0) {
      alert("Por favor, completa todos los campos de la reserva (hora, duración, personas).");
      return;
    }
    if (disabledMesas.has(seleccionada)) { // Asegurarse de que no se puede reservar una mesa deshabilitada
      alert(`La mesa ${seleccionada} está deshabilitada y no se puede reservar.`);
      closeConfirmReservationModal(); // Cerrar el modal de reserva si la mesa está deshabilitada
      setSeleccionada(null); // Deseleccionar la mesa
      return;
    }

    const queryParams = new URLSearchParams();
    queryParams.append('mesa', String(seleccionada));
    queryParams.append('sala', selectedSala);
    queryParams.append('dia', selectedCalendarDate || '');
    queryParams.append('horaInicio', horaInicio);
    queryParams.append('horaFin', horaFin);
    queryParams.append('cantidadPersonas', String(cantidadPersonas));

    router.push(`/confirmation?${queryParams.toString()}`);
    closeConfirmReservationModal();
  };

  // Función para renderizar el componente de mapa correcto
  const renderMapComponent = () => {
    const commonProps = {
      seleccionada: seleccionada,
      toggleSeleccion: toggleSeleccion,
      userRole: user?.role, // Pasar el rol del usuario
      disabledMesas: disabledMesas, // Pasar las mesas deshabilitadas
    };

    switch (selectedSala) {
      case "Sala Referencia":
        return <SalaReferencia {...commonProps} />;
      case "Sala Humanística":
        return <SalaHumanistica {...commonProps} />;
      case "Sala Abdalá":
        return <SalaAbdala {...commonProps} />;
      case "Sala Científica":
        return <SalaCientifica {...commonProps} />;
      case "Sala Ramón J. Velasquez":
        return <SalaRamon {...commonProps} />;
      default:
        return <p>Selecciona una sala para ver el mapa.</p>;
    }
  };

  if (isLoadingUser) {
    return <div>Cargando información del usuario...</div>;
  }

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
                onChange={(e) => handleSelectChange(e, 'start_time')}
              >
                <option value="">Selecciona la hora de inicio...</option>
                {editableStartTimes.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
                {user?.role === 'admin' && (
                  <option value="manage_options" className={styles.manageOption}>Administrar horarios...</option>
                )}
              </select>
            </div>

            <div className={styles.titulosPreguntas}>
              <label htmlFor="duracion">Duración:</label>
              <select
                id="duracion"
                className={styles.detalleInput}
                value={editableDurationOptions.find(opt => opt.value === duracion)?.label || ''}
                onChange={(e) => handleSelectChange(e, 'duration')}
              >
                <option value="">Selecciona la duración...</option>
                {editableDurationOptions.map((option) => (
                  <option key={option.value} value={option.label}>
                    {option.label}
                  </option>
                ))}
                {user?.role === 'admin' && (
                  <option value="manage_options" className={styles.manageOption}>Administrar duraciones...</option>
                )}
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
                onChange={(e) => handleSelectChange(e, 'people')}
              >
                <option value="">Selecciona la cantidad de personas...</option>
                {editablePeopleOptions.map((option) => (
                  <option key={option.value} value={option.label}>
                    {option.label}
                  </option>
                ))}
                {user?.role === 'admin' && (
                  <option value="manage_options" className={styles.manageOption}>Administrar personas...</option>
                )}
              </select>
            </div>

            {/* Ocultar el botón de reservar si es administrador */}
            {user?.role !== 'admin' && (
              <button onClick={openConfirmReservationModal} type="button" className={styles.botonCambios}>Reservar</button>
            )}
          </form>

          <div className={styles.infoHorarios}>
            <p className={styles.infoHorariosTexto}>
              Los espacios de estudio en la biblioteca están disponibles de lunes a viernes, de 8:00 a.m a 5:00 p.m
            </p>
          </div>
        </div>
      </div>

      {/* Modal de Confirmación de Reserva (existente) */}
      {/* Renombrado 'modalIsOpen' a 'confirmReservationModalIsOpen' */}
      <Modal
        isOpen={confirmReservationModalIsOpen}
        onRequestClose={closeConfirmReservationModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <button className={styles.closeButton} onClick={closeConfirmReservationModal}>×</button>
        <div className={styles.contentContainer}>
          <div className={styles.textSection}>
            <h2 className={styles.modalTitle}>Mesa {seleccionada !== null ? seleccionada : 'N/A'}</h2>
            <h2 className={styles.textoInfoPopReserva}>{selectedSala}</h2>
            <h2 className={styles.textoInfoPopReserva}>Día: {displayFormattedDate}</h2>
            <h2 className={styles.textoInfoPopReserva}>Horario: {horaInicio} - {horaFin}</h2>
            <h2 className={styles.textoInfoPopReserva}>Cantidad de personas: {cantidadPersonas || 'N/A'}</h2>

            <button className={styles.reserveButton} onClick={handleConfirmReservation}>Confirmar Reserva</button>
          </div>

          <div className={styles.imageSection}>
            <img src="/fotoResevas.png" alt="Mesa" className={styles.image} />
          </div>
        </div>
      </Modal>

      {/* Modal para Administrar Opciones de Horario/Duración/Personas */}
      <Modal
        isOpen={manageOptionsModalIsOpen}
        onRequestClose={closeManageOptionsModal}
        className={styles.manageOptionsModal}
        overlayClassName={styles.overlay}
      >
        <button className={styles.closeButton} onClick={closeManageOptionsModal}>×</button>
        <h2 className={styles.manageModalTitle}>
          Administrar{' '}
          {optionTypeToManage === 'start_time'
            ? 'Horarios de Inicio'
            : optionTypeToManage === 'duration'
              ? 'Duraciones'
              : 'Cantidad de Personas'}
        </h2>
        <div className={styles.optionsList}>
          {optionTypeToManage === 'start_time' ? (
            editableStartTimes.map(option => (
              <div key={option} className={styles.optionItem}>
                <span>{option}</span>
                <button
                  type="button"
                  className={styles.removeOptionButton}
                  onClick={() => removeOption(option)}
                >
                  <span className={styles.removeOptionX}>×</span>
                </button>
              </div>
            ))
          ) : optionTypeToManage === 'duration' ? (
            editableDurationOptions.map(option => (
              <div key={option.value} className={styles.optionItem}>
                <span>{option.label}</span>
                <button
                  type="button"
                  className={styles.removeOptionButton}
                  onClick={() => removeOption(option.label)}
                >
                  <span className={styles.removeOptionX}>×</span>
                </button>
              </div>
            ))
          ) : (
            editablePeopleOptions.map(option => (
              <div key={option.value} className={styles.optionItem}>
                <span>{option.label}</span>
                <button
                  type="button"
                  className={styles.removeOptionButton}
                  onClick={() => removeOption(option.label)}
                >
                  <span className={styles.removeOptionX}>×</span>
                </button>
              </div>
            ))
          )}
        </div>
        <div className={styles.addOptionSection}>
          <input
            type="text"
            className={styles.addOptionInput}
            value={newOptionValue}
            onChange={(e) => setNewOptionValue(e.target.value)}
            placeholder={`Añadir ${optionTypeToManage === 'start_time' ? 'hora (ej: 09:00 a.m.)' : optionTypeToManage === 'duration' ? 'duración (ej: 1h 30min)' : 'personas (ej: 4)'}`}
          />
          <button type="button" className={styles.addOptionButton} onClick={addOption}>
            Agregar
          </button>
        </div>
      </Modal>

      {/* Modal de Confirmación para Deshabilitar/Habilitar Mesa */}
      <Modal
        isOpen={disableConfirmModalIsOpen}
        onRequestClose={closeDisableConfirmModal}
        className={styles.disableConfirmModal}
        overlayClassName={styles.overlay}
      >
        <button className={styles.closeButton} onClick={closeDisableConfirmModal}>×</button>
        <h2 className={styles.disableModalTitle}>Confirmar Acción</h2>
        <p className={styles.disableModalText}>
          ¿Estás seguro de que quieres{' '}
          <strong style={{ color: disabledMesas.has(mesaToToggle || 0) ? '#1E8449' : '#e74c3c' }}>
            {disabledMesas.has(mesaToToggle || 0) ? 'habilitar' : 'deshabilitar'}
          </strong>{' '}
          la mesa <strong style={{ color: disabledMesas.has(mesaToToggle || 0) ? '#1E8449' : '#e74c3c' }}>
            {mesaToToggle}
          </strong>?
        </p>
        <div className={styles.disableModalActions}>
          <button
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={closeDisableConfirmModal}
          >
            Cancelar
          </button>
          <button
            className={`${styles.button} ${styles.confirmDisableButton}`}
            onClick={handleConfirmDisableToggle}
          >
            Sí, {disabledMesas.has(mesaToToggle || 0) ? 'Habilitar' : 'Deshabilitar'}
          </button>
        </div>
      </Modal>


      <div className={styles.columnaDerecha}>
        <h2 className={styles.tituloReserva}>Reservación de mesa</h2>

        <div className={styles.pisoSala}>
          <div className={styles.pisoSalaTexto}>
            <label htmlFor="piso">Piso:</label>
            <select
              id="piso"
              className={styles.opcionesPisoSala}
              value={selectedPiso}
              onChange={handlePisoChange}
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
              value={selectedSala}
              onChange={handleSalaChange}
            >
              {availableSalas.map((salaOption) => (
                <option key={salaOption} value={salaOption}>
                  {salaOption}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Renderizado condicional del componente de mapa */}
        {renderMapComponent()}


      </div>
    </div>
  );
}

const Reservar = () => {
  return (
    <Suspense>
      <Inside />
    </Suspense>
  )
};

export default Reservar;


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});