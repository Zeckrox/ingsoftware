"use client";
import React, { useState, useEffect } from "react";
import styles from "../../components/styles/Calendario/calendario.module.css";
import InputField from "../../components/ui/InputField/inputField";
import { useRouter } from "next/navigation"; // Importa useRouter para la navegación

// Simulamos el hook useUser para propósitos de demostración.
// En una aplicación real, este hook vendría de tu sistema de autenticación (ej. NextAuth.js, Clerk).
const useUser = () => {
  // Puedes cambiar 'admin' a 'student' para probar la interfaz de estudiante
  const [user, setUser] = useState({ role: "admin" }); // Valor inicial para demostración

  // En una aplicación real, aquí cargarías el usuario del contexto, de una API o de un token JWT.
  // Por ejemplo, si el token está en localStorage:
  useEffect(() => {
    const fetchUserRole = async () => {
      // **Simulación de obtener el token y decodificarlo**
      // En una app real, esto podría ser:
      // const token = localStorage.getItem('jwt_token');
      // if (token) {
      //   const decodedToken = decodeJwt(token); // Necesitarías una función para decodificar JWT
      //   setUser({ role: decodedToken.role });
      // } else {
      //   setUser({ role: 'guest' }); // O un rol por defecto si no hay token
      // }

      // Para esta demo, lo mantenemos como 'admin' o 'student' hardcodeado
      // setTimeout(() => {
      //   setUser({ role: "student" }); // Descomenta para probar como estudiante
      // }, 500);
    };
    fetchUserRole();
  }, []);

  return { user };
};

interface DayType {
  type: "Dia Habil" | "Fin de semana" | "Vacaciones" | "Feriado" | "none";
  date: string;
}

interface DayCellProps {
  day: string;
  isToday?: boolean;
  isCurrentMonth?: boolean;
  isPast?: boolean;
  dayType: "Dia Habil" | "Fin de semana" | "Vacaciones" | "Feriado" | "none";
  onTypeChange: (date: string, type: DayType["type"]) => void;
  fullDate: string; // Añadimos fullDate para identificar el día
  userRole: "admin" | "student"; // Añadimos el rol del usuario
  // Renombramos para ser más genéricos, ya que ambos roles pueden clickear
  onDayClick: (date: string) => void;
}
interface CalendarHeaderProps {
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (increment: number) => void;
}

const DayCell: React.FC<DayCellProps> = ({
  day,
  isToday,
  isCurrentMonth = true,
  isPast,
  dayType,
  onTypeChange,
  fullDate,
  userRole,
  onDayClick, // Usamos la prop genérica onDayClick
}) => {
  // Un día es "habilitado" para clic si es del mes actual, no es pasado y es "Dia Habil".
  // Esta lógica aplica a AMBOS ROLES para el click de ir a reservas.
  // La condición para el clic es la misma, lo que cambia es lo que ven.
  const isClickable = isCurrentMonth && !isPast && dayType === "Dia Habil";

  const getDayCellColorClass = (): string => {
    // La lógica de color para el estudiante es: verde si es día hábil, rojo si no.
    // La lógica de color para el admin es la completa.
    switch (dayType) {
      case "Dia Habil":
        return styles.greenDay;
      case "Fin de semana":
        return styles.redDay; // Sábados y domingos siempre serán rojos (cerrados)
      case "Vacaciones":
        return styles.redDay;
      case "Feriado":
        // Solo el admin ve el amarillo para feriados, el estudiante lo ve rojo (cerrado)
        return userRole === "admin" ? styles.yellowDay : styles.redDay;
      default:
        return ""; // Para 'none' o días pasados sin tipo definido
    }
  };

  const dayCellClasses = `${styles.dayCell} ${
    isToday && isCurrentMonth ? styles.today : ""
  } ${isPast ? styles.pastDay : ""} ${getDayCellColorClass()} ${
    // Deshabilita visualmente los días no clickeables si no son "Dia Habil"
    // Esto es para ambos roles, aunque para el admin es más por convención, el clic no lo lleva a reservas
    !isClickable ? styles.disabledDay : ""
  }`;

  // Las opciones de tipo de día para el selector del admin
  const options = ["Dia Habil", "Fin de semana", "Vacaciones", "Feriado"];

  // Manejador de click en la celda
  const handleDayCellClick = () => {
    if (isClickable) {
      onDayClick(fullDate); // Llama a la función de clic pasada desde el componente padre
    }
  };

  return (
    <div
      className={dayCellClasses}
      // El onClick se aplica a la celda para ambos roles
      // PERO solo si el día es clickeable (Dia Habil, no pasado, mes actual)
      onClick={isClickable ? handleDayCellClick : undefined}
    >
      <div className={styles.dayNumber}>{day}</div>
      {userRole === "admin" && isCurrentMonth && !isPast && (
        // Solo el admin puede ver y cambiar los selects
        // Y solo para días del mes actual y no pasados
        <InputField
          label=""
          type="select"
          placeholder="Seleccionar tipo"
          options={options}
          value={dayType === "none" ? "" : dayType}
          onChange={(e) => onTypeChange(fullDate, e.target.value as DayType["type"])}
        />
      )}
      {/* Mostrar el tipo de día para días pasados (admin) o para todos los días (estudiante) */}
      {/* Para el estudiante, siempre se muestra el tipo si no es "none" */}
      {/* Para el admin, se muestra si es pasado y no "none" */}
      {(userRole === "admin" && isPast && dayType !== "none") ||
      (userRole === "student" && dayType !== "none" && !isClickable && !isPast) ? ( // Estudiante ve el tipo para días no clickeables en el mes actual
        <div className={styles.dayTypeDisplay}>
          {dayType === "Fin de semana" ? "Cerrado" : dayType}
          </div> // Muestra "Cerrado" para fines de semana
      ) : null}
    </div>
  );
};

const WeekdayHeader: React.FC = () => {
  const weekdays: string[] = [
    "LUNES",
    "MARTES",
    "MIERCOLES",
    "JUEVES",
    "VIERNES",
    "SABADO",
    "DOMINGO",
  ];

  return (
    <>
      {weekdays.map((day) => (
        <div key={day} className={styles.weekdayHeader}>
          {day}
        </div>
      ))}
    </>
  );
};

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  selectedMonth,
  selectedYear,
  onMonthChange,
}) => {
  const months: string[] = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    <>
      <nav className={styles.breadcrumb} aria-label="breadcrumb">
        <ol>
          <li>
            <a href="/" className={styles.navLink}>
              Inicio /
            </a>
          </li>
          <li>Calendario Mesas</li>
        </ol>
      </nav>
      <div className={styles.calendarNav}>
        <button className={styles.navButton} onClick={() => onMonthChange(-1)}>
          <span>←</span>
        </button>
        <h1 className={styles.monthTitle}>
          {months[selectedMonth]}, {selectedYear}
        </h1>
        <button className={styles.navButton} onClick={() => onMonthChange(1)}>
          <span>→</span>
        </button>
      </div>
    </>
  );
};

const Calendar: React.FC = () => {
  const { user } = useUser(); // Obtenemos el usuario y su rol
  const router = useRouter(); // Inicializa el hook useRouter
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [dayTypes, setDayTypes] = useState<{ [key: string]: DayType["type"] }>(
    {}
  );

  useEffect(() => {
    const newDayTypes: { [key: string]: DayType["type"] } = {};
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const d = new Date(currentYear, currentMonth, i);
      const fullDate = d.toISOString().split("T")[0];
      
      // **NUEVO: Lógica para asegurar que Sábados y Domingos siempre son "Fin de semana"**
      if (d.getDay() === 0 || d.getDay() === 6) { // 0 es domingo, 6 es sábado
        newDayTypes[fullDate] = "Fin de semana";
      } else if (!dayTypes[fullDate]) { // Si no es fin de semana y no tiene un tipo ya definido
        newDayTypes[fullDate] = "none";
      } else {
        // Mantener el tipo existente si no es fin de semana y ya está definido
        newDayTypes[fullDate] = dayTypes[fullDate];
      }
    }
    setDayTypes((prev) => ({ ...prev, ...newDayTypes }));
  }, [currentMonth, currentYear]); // Dependencias para re-ejecutar cuando cambia el mes/año

  const handleMonthChange = (increment: number) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleDayTypeChange = (date: string, type: DayType["type"]) => {
    if (user.role === "admin") {
      // **NUEVO: No permitir que el admin cambie Sábados y Domingos a otra cosa que "Fin de semana"**
      const dayOfWeek = new Date(date).getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) { // 0 es domingo, 6 es sábado
          // Si el admin intenta cambiar un fin de semana, forzarlo a "Fin de semana"
          setDayTypes((prev) => ({
              ...prev,
              [date]: "Fin de semana",
          }));
          alert("Los fines de semana están siempre cerrados."); // Mensaje opcional
          return; // Salir de la función
      }

      setDayTypes((prev) => ({
        ...prev,
        [date]: type,
      }));
    }
  };

  // Función genérica para manejar el clic en un día.
  // Ambos roles pueden usar esto para ir a la página de reserva.
  const handleDayClick = (date: string) => {
    // Puedes pasar la fecha a la página de reservas si es necesario
    router.push(`/reservas?date=${date}`);
  };

  // --- Generar días del calendario ---
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  // getDay() devuelve 0 para domingo, 1 para lunes... 6 para sábado.
  // Queremos que Lunes sea el primer día (índice 1), así que ajustamos Domingo a 7.
  const firstDayWeekday = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay();

  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const numDaysInMonth = lastDayOfMonth.getDate();

  const prevMonthPlaceholders = Array.from({ length: firstDayWeekday - 1 }, (_, i) => i);

  const currentMonthDays = Array.from(
    { length: numDaysInMonth },
    (_, i) => (i + 1).toString()
  );

  const totalDaysDisplayed = prevMonthPlaceholders.length + currentMonthDays.length;
  const remainingCells = totalDaysDisplayed % 7 === 0 ? 0 : 7 - (totalDaysDisplayed % 7);

  const nextMonthPlaceholders = Array.from({ length: remainingCells }, (_, i) => i);

  const currentDate = today.getDate();
  const isCurrentMonthView =
    today.getMonth() === currentMonth && today.getFullYear() === currentYear;

  return (
    <>
      <div className={styles.calendarContainer}>
        <div className={styles.calendarWrapper}>
          <CalendarHeader
            selectedMonth={currentMonth}
            selectedYear={currentYear}
            onMonthChange={handleMonthChange}
          />
          <div className={styles.calendarGrid}>
            <WeekdayHeader />
            {prevMonthPlaceholders.map((_, index) => (
              <div key={`prev-placeholder-${index}`} className={styles.inactiveDayCell}></div>
            ))}
            {currentMonthDays.map((day) => {
              const fullDate = new Date(
                currentYear,
                currentMonth,
                parseInt(day)
              )
                .toISOString()
                .split("T")[0];
              
              const isPast =
                currentYear < today.getFullYear() ||
                (currentYear === today.getFullYear() &&
                  currentMonth < today.getMonth()) ||
                (currentYear === today.getFullYear() &&
                  currentMonth === today.getMonth() &&
                  parseInt(day) < today.getDate());

              return (
                <DayCell
                  key={`current-${day}`}
                  day={day}
                  isToday={parseInt(day) === currentDate && isCurrentMonthView}
                  isCurrentMonth={true}
                  isPast={isPast}
                  dayType={dayTypes[fullDate] || "none"}
                  onTypeChange={handleDayTypeChange}
                  fullDate={fullDate}
                  userRole={user.role as "admin" | "student"}
                  onDayClick={handleDayClick} // Pasa la función genérica de clic
                />
              );
            })}
            {nextMonthPlaceholders.map((_, index) => (
              <div key={`next-placeholder-${index}`} className={styles.inactiveDayCell}></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;