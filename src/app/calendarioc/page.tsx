"use client";
import React, { useState, useEffect } from "react";
import styles from "../../components/styles/Calendario/calendario.module.css";
import InputField from "../../components/ui/InputField/inputField";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";

interface DayType {
  type: "Dia Habil" | "Fin de semana" | "Vacaciones" | "Feriado" | "none";
  date: string;
}

interface DayCellProps {
  day: string;
  isToday?: boolean;
  isCurrentMonth?: boolean;
  isPast?: boolean;
  dayType: DayType["type"];
  fullDate: string;
  onTypeChange: (date: string, type: DayType["type"], fullDate: string) => void;
  onDayClick: (date: string) => void;
  userRole: "admin" | "student";
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
  onDayClick,
}) => {
  const isClickable =
    isCurrentMonth &&
    !isPast &&
    dayType === "Dia Habil" &&
    (userRole === "student" || userRole === "admin");

  const getDayCellColorClass = (): string => {
    switch (dayType) {
      case "Dia Habil":
        return styles.greenDay;
      case "Fin de semana":
      case "Vacaciones":
        return styles.redDay;
      case "Feriado":
        return userRole === "admin" ? styles.yellowDay : styles.redDay;
      default:
        return "";
    }
  };

  const dayCellClasses = `${styles.dayCell} ${
    isToday && isCurrentMonth ? styles.today : ""
  } ${isPast ? styles.pastDay : ""} ${getDayCellColorClass()} ${
    !isClickable && dayType === "Dia Habil" ? styles.disabledDay : ""
  }`; 

  const options = ["Dia Habil", "Fin de semana", "Vacaciones", "Feriado"];

    const router = useRouter();
  const handleDayCellClick = () => {
    if (isClickable) {
      onDayClick(fullDate);
    }
  };

  return (
    <div
      className={dayCellClasses}
      onClick={isClickable ? handleDayCellClick : undefined}
    >
      <div className={styles.dayNumber}>{day}</div>
      {userRole === "admin" && isCurrentMonth && !isPast && (
        <InputField
          label=""
          type="select"
          placeholder="Seleccionar tipo"
          options={options}
          value={dayType === "none" as DayType["type"]? "" : dayType}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            onTypeChange(fullDate, e.target.value as DayType["type"], fullDate);
          }}
        />
      )}
      {(userRole === "admin" && isPast && dayType !== "none") ||
      (userRole === "student" &&
        dayType !== "none" &&
        !isClickable &&
        !isPast) ? (
        <div className={styles.dayTypeDisplay}>
          {dayType === "Fin de semana" ? "Cerrado" : dayType}
        </div>
      ) : null}
    </div>
  );
};

const WeekdayHeader: React.FC = () => {
  const weekdays = [
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
  const months = [
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
      <div className={styles.calendarNav}>
        <button className={styles.navButton} onClick={() => onMonthChange(-1)}>
          ←
        </button>
        <h1 className={styles.monthTitle}>
          {months[selectedMonth]}, {selectedYear}
        </h1>
        <button className={styles.navButton} onClick={() => onMonthChange(1)}>
          →
        </button>
      </div>
    </>
  );
};

const Calendar: React.FC = () => {
  const router = useRouter();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [ disabledDays, setDisabledDays ] = useState<any>([]);
  const [dayTypes, setDayTypes] = useState<{ [key: string]: DayType["type"] }>(
    {}
  );
  const { user, isLoadingUser } = useUser();

  if (isLoadingUser || !user) {
    return <div>Cargando usuario...</div>;
  }

  async function getDisabledDays(){
    let url = `https://backendsoftware.vercel.app/disabled-days`
    const res = await fetch(url);
    if (!res.ok) throw new Error('No se pudo obtener los dias');
    let data = await res.json()
    setDisabledDays(data);
    for(let day of data){
      setDayTypes((prev) => ({ ...prev, [day.date]: day.type }));
    }
  }

  async function setDay(date: string, type: DayType["type"]){
    let url = `https://backendsoftware.vercel.app/disabled-days/`
    let method = "POST"
    if (type == "Dia Habil"){
      url = `https://backendsoftware.vercel.app/disabled-days/${date}`
      method = "DELETE"
    }
    const res = await fetch(url, {  
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date,
          type: type
        }),
      });
    if (!res.ok) throw new Error('No se pudo obtener el usuario');
  }

  function checkInDisabledDays(date: string){
    for(let item of disabledDays){
      if (item.date == date){
        return true
      }
    }
    return false
  }

  useEffect(() => {
    getDisabledDays()
    }, []);
  

  useEffect(() => {
    const newDayTypes: { [key: string]: DayType["type"] } = {};
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const d = new Date(currentYear, currentMonth, i);
      const fullDate = d.toISOString().split("T")[0];
      if (d.getDay() === 0 || d.getDay() === 6) {
        newDayTypes[fullDate] = "Fin de semana";
      } else if (!dayTypes[fullDate]) {
        newDayTypes[fullDate] = "Dia Habil";  // <-- cambio aquí
      } else {
        newDayTypes[fullDate] = dayTypes[fullDate];
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

  const handleDayTypeChange = (date: string, type: DayType["type"], fullDate: string) => {
    if (user.role === "admin") {
      const dayOfWeek = new Date(date).getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        setDayTypes((prev) => ({ ...prev, [date]: "Fin de semana" }));
        alert("Los fines de semana están siempre cerrados.");
        return;
      }
      setDayTypes((prev) => ({ ...prev, [date]: type }));
      setDay(fullDate, type)
    }
  };

  const handleDayClick = (date: string) => {
    router.push(`/reservarc?date=${date}`);
  };

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const firstDayWeekday =
    firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay();
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const numDaysInMonth = lastDayOfMonth.getDate();

  const prevMonthPlaceholders = Array.from(
    { length: firstDayWeekday - 1 },
    (_, i) => i
  );
  const currentMonthDays = Array.from(
    { length: numDaysInMonth },
    (_, i) => (i + 1).toString()
  );

  const totalDaysDisplayed =
    prevMonthPlaceholders.length + currentMonthDays.length;
  const remainingCells =
    totalDaysDisplayed % 7 === 0 ? 0 : 7 - (totalDaysDisplayed % 7);
  const nextMonthPlaceholders = Array.from(
    { length: remainingCells },
    (_, i) => i
  );

  const currentDate = today.getDate();
  const isCurrentMonthView =
    today.getMonth() === currentMonth && today.getFullYear() === currentYear;

  return (
    <div className={styles.calendarContainer} >
      <div className={styles.calendarWrapper}>
        <CalendarHeader
          selectedMonth={currentMonth}
          selectedYear={currentYear}
          onMonthChange={handleMonthChange}
        />
        <div className={styles.calendarGrid}>
          <WeekdayHeader />
          {prevMonthPlaceholders.map((_, index) => (
            <div
              key={`prev-placeholder-${index}`}
              className={styles.inactiveDayCell}
            ></div>
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
                dayType={ dayTypes[fullDate] || "none"}
                onTypeChange={handleDayTypeChange}
                fullDate={fullDate}
                userRole={user.role as "admin" | "student"}
                onDayClick={handleDayClick}
              />
            );
          })}
          {nextMonthPlaceholders.map((_, index) => (
            <div
              key={`next-placeholder-${index}`}
              className={styles.inactiveDayCell}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
