"use client";
import React, { useState, useEffect } from "react";
import styles from "../../components/styles/Calendario/calendario.module.css";
import InputField from "../../components/ui/InputField/inputField";
import { useRouter } from "next/navigation"; // Importa useRouter para la navegación

// Simulamos el hook useUser para propósitos de demostración.
// En una aplicación real, este hook vendría de tu sistema de autenticación (ej. NextAuth.js, Clerk).
const useUser = () => {
  // Puedes cambiar 'admin' a 'student' para probar la interfaz de estudiante
  const [user, setUser] = useState({ role: "admin" });

  // En una aplicación real, aquí podrías cargar el usuario del contexto o de una API
  useEffect(() => {
    // Ejemplo: simular una carga asíncrona o una verificación de token
    // setTimeout(() => {
    //   setUser({ role: "student" }); // O 'admin'
    // }, 1000);
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
  onDayClickForStudent: (date: string) => void; // Nueva prop para el click del estudiante
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
  onDayClickForStudent,
}) => {
  // Un día es "habilitado" para un estudiante si es del mes actual, no es pasado y es "Dia Habil".
  const isEnabledForStudent =
    userRole === "student" &&
    isCurrentMonth &&
    !isPast &&
    dayType === "Dia Habil";

  const getDayCellColorClass = (): string => {
    // Para estudiantes: verde si es día hábil, rojo si no lo es (feriado, fin de semana, vacaciones)
    if (userRole === "student") {
      switch (dayType) {
        case "Dia Habil":
          return styles.greenDay;
        case "Fin de semana":
        case "Vacaciones":
        case "Feriado":
          return styles.redDay;
        default:
          return ""; // Para 'none' o días pasados
      }
    } else {
      // Para administradores: mantiene la lógica original
      switch (dayType) {
        case "Dia Habil":
          return styles.greenDay;
        case "Fin de semana":
        case "Vacaciones":
          return styles.redDay;
        case "Feriado":
          return styles.yellowDay;
        default:
          return "";
      }
    }
  };

  const dayCellClasses = `${styles.dayCell} ${
    isToday && isCurrentMonth ? styles.today : ""
  } ${isPast ? styles.pastDay : ""} ${getDayCellColorClass()} ${
    userRole === "student" && !isEnabledForStudent ? styles.disabledDay : "" // Aplica estilo deshabilitado para estudiantes si no es hábil
  }`;

  const options = ["Dia Habil", "Fin de semana", "Vacaciones", "Feriado"];

  // Manejador de click para estudiantes
  const handleStudentDayClick = () => {
    if (isEnabledForStudent) {
      onDayClickForStudent(fullDate);
    }
  };

  return (
    <div
      className={dayCellClasses}
      // Solo permite click para estudiantes si el día está habilitado
      onClick={userRole === "student" && isEnabledForStudent ? handleStudentDayClick : undefined}
    >
      <div className={styles.dayNumber}>{day}</div>
      {userRole === "admin" && isCurrentMonth && !isPast && ( // Solo el admin puede ver y cambiar los selects
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
      {(userRole === "admin" && isPast && dayType !== "none") ||
      (userRole === "student" && dayType !== "none") ? (
        <div className={styles.dayTypeDisplay}>{dayType}</div>
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
          <li>Calendario Cubículos</li>
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
      if (!dayTypes[fullDate]) {
        // Inicializa los fines de semana como "Fin de semana" por defecto
        if (d.getDay() === 0 || d.getDay() === 6) {
          // 0 es domingo, 6 es sábado
          newDayTypes[fullDate] = "Fin de semana";
        } else {
          newDayTypes[fullDate] = "none";
        }
      }
    }
    setDayTypes((prev) => ({ ...prev, ...newDayTypes }));
  }, [currentMonth, currentYear]);

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
      setDayTypes((prev) => ({
        ...prev,
        [date]: type,
      }));
    }
  };

  // Nueva función para manejar el clic en un día hábil para el estudiante
  const handleDayClickForStudent = (date: string) => {
    router.push(`/reservas`);
  };

  // --- Generar días del calendario ---
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
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
                  onDayClickForStudent={handleDayClickForStudent} // Pasa la nueva función
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