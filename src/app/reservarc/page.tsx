'use client';
import React, { useEffect, useState, useCallback, Suspense, act } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import styles from '../../components/styles/Reserva/reservar.module.css';
import SalaReferencia from "@/components/styles/Reserva/MapasCubiculos/salaReferencia";
import Pasillo from "@/components/styles/Reserva/MapasCubiculos/pasillo";
import SalaCientifica from "@/components/styles/Reserva/MapasCubiculos/salaCientifica";
import { Poppins } from 'next/font/google';
import Modal from 'react-modal';
import { useUser } from "@/context/userContext";
import { dataTagErrorSymbol, useMutation } from "@tanstack/react-query";

// Opciones iniciales que se cargarán en el estado (pueden venir de una API en un proyecto real)
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
];

const initialPeopleOptions = [ // Mover esto para que sea un estado editable
  { label: "2 personas", value: 2 },
  { label: "3 personas", value: 3 },
  { label: "4 personas", value: 4 },
  { label: "5 personas", value: 5 },
  { label: "6 personas", value: 6 }
];

const allSalas = {
  pb: ["Sala Referencia"],
  p1: ["Pasillo", "Sala Científica"]
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

const Inside = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoadingUser } = useUser(); // Obtener información del usuario
  const [seleccionada, setSeleccionada] = useState<number | null>(null);
  const [confirmReservationModalIsOpen, setConfirmReservationModalIsOpen] = useState(false);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(null);
  const [horaInicio, setHoraInicio] = useState<string>('');
  const [duracion, setDuracion] = useState<number>(0);
  const [horaFin, setHoraFin] = useState<string>('');
  const [cantidadPersonas, setCantidadPersonas] = useState<number>(0);
  const [selectedPiso, setSelectedPiso] = useState<string>('pb');
  const [availableSalas, setAvailableSalas] = useState<string[]>(allSalas.pb);
  const [selectedSala, setSelectedSala] = useState<string>('Sala Referencia');

  // Estados para la administración de Horarios y Duración
  const [editableStartTimes, setEditableStartTimes] = useState<string[]>(initialStartTimeOptions);
  const [editableDurationOptions, setEditableDurationOptions] = useState(initialDurationOptions);
  // NUEVO ESTADO para las opciones de cantidad de personas
  const [editablePeopleOptions, setEditablePeopleOptions] = useState(initialPeopleOptions);

  const [manageOptionsModalIsOpen, setManageOptionsModalIsOpen] = useState(false);
  // Actualizar el tipo de 'optionTypeToManage' para incluir 'people'
  const [optionTypeToManage, setOptionTypeToManage] = useState<'start_time' | 'duration' | 'people' | null>(null);
  const [newOptionValue, setNewOptionValue] = useState<string>('');

  // Estados para la administración de Mesas/Cubículos
  const [disabledCubiculos, setDisabledCubiculos] = useState<Set<number>>(new Set());
  const [disableConfirmModalIsOpen, setDisableConfirmModalIsOpen] = useState(false);
  const [cubiculoToToggle, setCubiculoToToggle] = useState<number | null>(null);

  const [numerosOcupados, setNumerosOcupados] = useState<{number: number}[]>([]);
  const [infoCubicles, setInfoCubicles] = useState<any[]>([]);


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

  //GET Y POST

  //para tener la fecha de la url que esta como date:
    const [date, setDate] = useState('');

    // GET
    const getDisabledDurations = useMutation({
          mutationFn: async () => {
            const res = await fetch('https://backendsoftware.vercel.app/disabled-durations', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              }
            });
            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(errorData.message || 'error al obtener espacios');
            }
            return res.json();
          },
          onSuccess: (data) => {
            for (let item of data){
              if(item.date == date) setEditableDurationOptions(prev => prev.filter(option => option.value !== item.duration))
            }
          },
          onError: (error: any) => {
            console.error('error en la consulta:', error);
          },
        });

    // GET
    const getDisabledHours = useMutation({
          mutationFn: async () => {
            const res = await fetch('https://backendsoftware.vercel.app/disabled-hours', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              }
            });
            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(errorData.message || 'error al obtener espacios');
            }
            return res.json();
          },
          onSuccess: (data) => {
            for (let item of data){
              if(item.date == date) setEditableStartTimes(prev => prev.filter(option => option !== item.hour))
            }
          },
          onError: (error: any) => {
            console.error('error en la consulta:', error);
          },
        });

    // POST
    const postDisabledDurations = useMutation({
          mutationFn: async (info: any) => {
            const res = await fetch(`https://backendsoftware.vercel.app/disabled-durations/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
                body: JSON.stringify({
                  date: info.date,
                  duration: info.duration
                }),
            });
            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(errorData.message || 'error al obtener espacios');
            }
            return info
          },
          onSuccess: (info) => {
            setEditableDurationOptions(prev => prev.filter(option => option.value !== info.duration))
          },
          onError: (error: any) => {
            console.error('error en la consulta:', error);
          },
        });

    // POST
    const postDisabledHours = useMutation({
          mutationFn: async (info: any) => {
            const res = await fetch(`https://backendsoftware.vercel.app/disabled-hours/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
                body: JSON.stringify({
                  date: info.date,
                  hour: info.hour
                }),
            });
            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(errorData.message || 'error al obtener espacios');
            }
            return info;
          },
          onSuccess: (info) => {
            setEditableStartTimes(prev => prev.filter(option => option !== info.hour))
          },
          onError: (error: any) => {
            console.error('error en la consulta:', error);
          },
        });

// DELETE
    const deleteDisabledDurations = useMutation({
          mutationFn: async (info: any) => {
            const res = await fetch(`https://backendsoftware.vercel.app/disabled-durations/${info.date}/${info.duration}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              }
            });
            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(errorData.message || 'error al obtener espacios');
            }
            return info
          },
          onSuccess: (info) => {
            setEditableDurationOptions(prev => [...prev, { label: info.label, value: info.duration }]
            .sort((a, b) => a.value - b.value));
          },
          onError: (error: any) => {
            console.error('error en la consulta:', error);    
          },
        });

    // DELETE
    const deleteDisabledHours = useMutation({
          mutationFn: async (info: any) => {
            const res = await fetch(`https://backendsoftware.vercel.app/disabled-hours/${info.date}/${info.hour}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              }
            });
            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(errorData.message || 'error al obtener espacios');
            }
            return info;
          },
          onSuccess: (info) => {
            setEditableStartTimes(prev => {
              const newTimes = [...prev, info.hour];
              return newTimes.sort((a, b) => timeToMinutes(a) - timeToMinutes(b));
            });
          },
          onError: (error: any) => {
            console.error('error en la consulta:', error);
          },
        });


    //GET
    const getSpotsInfo = useMutation({
          mutationFn: async () => {
            const res = await fetch('https://backendsoftware.vercel.app/cubicles', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              }
            });
            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(errorData.message || 'error al obtener espacios');
            }
            return res.json();
          },
          onSuccess: (data) => {
           setInfoCubicles(data)
           const newDisabled = new Set(disabledCubiculos);
           for (let x of data){
            if (!x.isAvailable){newDisabled.add(x.number)}
           }
           setDisabledCubiculos(newDisabled)
          },
          onError: (error: any) => {
            console.error('error en la consulta:', error);
          },
        });

    useEffect(() => {
      const paramss = new URLSearchParams(window.location.search);
      const dateFromUrl = paramss.get('date');
      if (dateFromUrl) setDate(dateFromUrl);
      getSpotsInfo.mutate()
      getDisabledHours.mutate()
      getDisabledDurations.mutate()
    }, []);

    useEffect(() => {
      if (horaInicio && duracion > 0 && date) {
        getAvailableSpots.mutate();
      }
    }, [horaInicio, duracion, date]);


    //GET
    const getAvailableSpots = useMutation({
          mutationFn: async () => {
            const res = await fetch('https://backendsoftware.vercel.app/reservations/availableSpots', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                date: date,   //sale del url     
                type: 'cubicle',        
                startTime: horaInicio,   //sale del form
                duration: duracion  //sale del form
              }),
            });
    
            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(errorData.message || 'error al obtener espacios');
            }
    
            return res.json();
          },
          onSuccess: (data) => {
            // alert('Consulta exitosa');
            console.log('Espacios disponibles:', data);
            const numeros = data.filter((reserva: any) => {
              console.log(reserva.cubicleId)
              return !!reserva.number})
            console.log(numeros);
            
            setNumerosOcupados(numeros);
          },
          onError: (error: any) => {
            console.error('error en la consulta:', error);
          },
        });

  //POST
    const createReserv = useMutation({
      mutationFn: async () => {
        const res = await fetch('https://backendsoftware.vercel.app/reservations/createReservation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user?._id, //sale del usercontext
            number: seleccionada, //sale de aqui
            type: 'cubicle', //CAMBIAR !! en cubiculo
            date: date,
            startTime: horaInicio,   //sale del form
            duration: duracion  //sale del form
          }),
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Error: ${res.status} - ${errorText}`);
        }

        return res.json();
      },
      onSuccess: () => {
        alert('reserva exitosa');
        closeModal();
      },
      onError: (error: any) => {
        console.error('error en la consulta:', error);
      },
    });


  // --- Funciones de administración de Horarios, Duración y Personas ---

  // Actualizar handleSelectChange para manejar el nuevo tipo 'people'
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
    } else if (type === 'people') { // Nuevo caso para la cantidad de personas
      const selectedPeople = editablePeopleOptions.find(opt => opt.label === value);
      setCantidadPersonas(selectedPeople ? selectedPeople.value : 0);
    }
  };

  const closeModal = () => {
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
      console.log("WHAAT")
      deleteDisabledHours.mutate({date: date, hour: newOptionValue.trim()})

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
    if (isLoadingUser || !user) {
      return <div>Cargando...</div>;
    }
    if (!isValidFormat || actualValue === 0) {
        alert("Formato de duración inválido. Usa 'X min', 'Y h', o 'Y h Z min' (ej: 1h 30min, 90min, 2h).");
        return;
    }
    deleteDisabledDurations.mutate({date:date, duration: actualValue, label: newOptionValue.trim() })
    }
    setNewOptionValue('');
  };


  const removeOption = (valueToRemove: string) => {
    if (optionTypeToManage === 'start_time') {
      postDisabledHours.mutate({date: date, hour: valueToRemove})
    } else if (optionTypeToManage === 'duration') {
      postDisabledDurations.mutate({date, duration: parseInt(valueToRemove)})
    } else if (optionTypeToManage === 'people') { // Nuevo caso para eliminar cantidad de personas
        setEditablePeopleOptions(prev => prev.filter(option => option.label !== valueToRemove));
    }
  };

  const closeDisableConfirmModal = () => {
    setDisableConfirmModalIsOpen(false);
    setCubiculoToToggle(null);
  };

  //PATCH
    const patchCubicle = useMutation({
      mutationFn: async (info: any) => {
        const res = await fetch(`https://backendsoftware.vercel.app/cubicles/${info._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            isAvailable: !info.isAvailable
          }),
        });
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Error: ${res.status} - ${errorText}`);
        }
        await getSpotsInfo.mutate()
        return res.json();
      },
      onSuccess: (data) => {
        console.log(data)
        return data
      },
      onError: (error: any) => {
        console.error('error en la consulta:', error);
      },
    });

  function handleConfirmDisableToggle(id:any) {
    if (cubiculoToToggle === null) return;
    let data = infoCubicles.find((x)=> x.number == id)
    patchCubicle.mutate(data)
    const newDisabled = new Set(disabledCubiculos);
    if (data.isAvailable){
      newDisabled.add(id)
    }else{
      newDisabled.delete(id)
    }
    setDisabledCubiculos(newDisabled)
    closeDisableConfirmModal();
  };


  const toggleSeleccion = (numero: number) => {
    if (user && user.role === 'admin') {
      setCubiculoToToggle(numero);
      setDisableConfirmModalIsOpen(true);
    } else {
      if (!disabledCubiculos.has(numero)) {
        setSeleccionada(prevSeleccionada => (prevSeleccionada === numero ? null : numero));
      } else {
        alert(`El cubículo ${numero} está deshabilitado y no se puede seleccionar.`);
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
      alert("Por favor, selecciona un cubículo.");
      return;
    }
    if (!horaInicio || duracion === 0 || cantidadPersonas === 0) {
      alert("Por favor, completa todos los campos de la reserva (hora, duración, personas).");
      return;
    }
    if (disabledCubiculos.has(seleccionada)) {
        alert(`El cubículo ${seleccionada} está deshabilitado y no se puede reservar.`);
        closeModal();
        setSeleccionada(null);
        return;
    }

    if (!user) {
      alert("Debes iniciar sesión.");
      return;
    }
    createReserv.mutate();

    const queryParams = new URLSearchParams();
    queryParams.append('cubiculo', String(seleccionada));
    queryParams.append('sala', selectedSala);
    queryParams.append('dia', selectedCalendarDate || '');
    queryParams.append('horaInicio', horaInicio);
    queryParams.append('horaFin', horaFin);
    queryParams.append('cantidadPersonas', String(cantidadPersonas));

    router.push(`/confirmation?${queryParams.toString()}`);
    closeModal();
  };


  const renderMapComponent = () => {
    const commonProps = {
      seleccionada: seleccionada,
      toggleSeleccion: toggleSeleccion,
      userRole: user?.role,
      disabledCubiculos: disabledCubiculos,
      ocupados: numerosOcupados
    };
    
    switch (selectedSala) {
      case "Sala Referencia":
        return <SalaReferencia {...commonProps}/>;
      case "Pasillo":
        return <Pasillo {...commonProps} />;
      case "Sala Científica":
        return <SalaCientifica {...commonProps} />;
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
            Cubículo {seleccionada !== null ? seleccionada : 'N/A'}
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
                  <option key={option} value={option}>{option}</option>
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
                  <option key={option.value} value={option.label}>{option.label}</option>
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
                onChange={(e) => handleSelectChange(e, 'people')} // CAMBIO: Usar handleSelectChange
              >
                <option value="">Selecciona la cantidad de personas...</option>
                {editablePeopleOptions.map((option) => ( // CAMBIO: Usar editablePeopleOptions
                  <option key={option.value} value={option.label}>{option.label}</option>
                ))}

              </select>
            </div>

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
      <Modal
        isOpen={confirmReservationModalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <button className={styles.closeButton} onClick={closeModal}>×</button>
        <div className={styles.contentContainer}>
          <div className={styles.textSection}>
            <h2 className={styles.modalTitle}>Cubículo {seleccionada !== null ? seleccionada : 'N/A'}</h2>
            <h2 className={styles.textoInfoPopReserva}>{selectedSala}</h2>
            <h2 className={styles.textoInfoPopReserva}>Día: {displayFormattedDate}</h2>
            <h2 className={styles.textoInfoPopReserva}>Horario: {horaInicio} - {horaFin}</h2>
            <h2 className={styles.textoInfoPopReserva}>Cantidad de personas: {cantidadPersonas || 'N/A'}</h2>
            <button className={styles.reserveButton} onClick={handleConfirmReservation}>Confirmar Reserva</button>
          </div>
          <div className={styles.imageSection}>
            <img src="/cubiculo.jpg" alt="Cubículo" className={styles.image} />
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
            : 'Cantidad de Personas'} {/* CAMBIO: Título dinámico */}
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
                  onClick={() => removeOption(`${option.value}`)}
                >
                  <span className={styles.removeOptionX}>×</span>
                </button>
              </div>
            ))
          ) : ( // CAMBIO: Renderizar opciones de personas
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

      {/* Nuevo Modal de Confirmación para Deshabilitar/Habilitar Cubículo */}
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
          <strong style={{color: disabledCubiculos.has(cubiculoToToggle || 0) ? '#1E8449' : '#e74c3c'}}>
            {disabledCubiculos.has(cubiculoToToggle || 0) ? 'habilitar' : 'deshabilitar'}
          </strong>{' '}
          el cubículo <strong style={{color: disabledCubiculos.has(cubiculoToToggle || 0) ? '#1E8449' : '#e74c3c'}}>
            {cubiculoToToggle}
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
            onClick={()=>handleConfirmDisableToggle(cubiculoToToggle)}
          >
            Sí, {disabledCubiculos.has(cubiculoToToggle || 0) ? 'Habilitar' : 'Deshabilitar'}
          </button>
        </div>
      </Modal>


      <div className={styles.columnaDerecha}>
        <h2 className={styles.tituloReserva}>Reservación de Cubículo</h2>

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
                <option key={salaOption} value={salaOption}>{salaOption}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Renderizado condicional del componente de mapa */}
        {user && user.role != 'admin' &&
          <div onClick={()=> (!horaFin || !horaInicio || !duracion || !cantidadPersonas)? alert("Selecciona horarios y cantidad de personas primero!"): {}}>
            <div style={!horaFin || !horaInicio || !duracion || !cantidadPersonas? { pointerEvents: "none",opacity: 0.5}: {}}>
            {renderMapComponent()}
            </div>
          </div>
        }
        {user && user.role === 'admin' && <>
            {renderMapComponent()}
        </>
        }

      </div>
    </div>
  );
};

const Reservar = () => {
  return(
    <Suspense>
      <Inside/>
    </Suspense>
  )
}

export default Reservar;

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});