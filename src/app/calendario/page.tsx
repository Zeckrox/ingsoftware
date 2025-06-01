"use client";
import React from "react";
import styles from "./calendario.module.css";

interface TimeSlotProps {
  time: string;
  type: "morning" | "midday" | "afternoon" | "evening" | "past";
  date: string;
}

interface DayCellProps {
  day: string;
  isToday?: boolean;
  isCurrentMonth?: boolean;
  isPast?: boolean;
}

interface CalendarHeaderProps {
  selectedMonth: number;
  selectedYear: number;
  actividadName?: string;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ time, type }) => {
  const getTimeSlotClass = (): string => {
    switch (type) {
      case "morning":
        return styles.morningSlot;
      case "midday":
        return styles.middaySlot;
      case "afternoon":
        return styles.afternoonSlot;
      case "evening":
        return styles.eveningSlot;
      case "past":
        return styles.pastSlot; 
      default:
        return "";
    }
  };

  return <div className={`${getTimeSlotClass()}`}>{time}</div>;
};

const DayCell: React.FC<DayCellProps> = ({
  day,
  isToday,
  isCurrentMonth = true,
  isPast,
}) => {
  // Datos de ejemplo para los slots
  const exampleSlots = [
    { time: "8:00am", type: "morning" },
    { time: "2:00pm", type: "afternoon" },
  ];

  return (
    <div
      className={`${styles.dayCell} ${
        isToday && isCurrentMonth ? styles.today : ""
      } ${isPast ? styles.pastDay : ""}`}
    >
      <div className={styles.dayNumber}>{day}</div>
      {exampleSlots.map((slot, index) => (
        <div key={`${day}-${slot.time}-${index}`} className={styles.slotContainer}>
          <TimeSlot time={slot.time} type={isPast ? "past" : slot.type} date={day} />
        </div>
      ))}
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
            <a href="/destinos" className={styles.navLink}>
              Inicio /
            </a>
          </li>
          <li >Calendario</li>
        </ol>
      </nav>
      <div className={styles.calendarNav}>
        <button className={styles.navButton}>
          <span>←</span>
        </button>
        <h1 className={styles.monthTitle}>
          {months[selectedMonth]}, {selectedYear}
        </h1>
        <button className={styles.navButton}>
          <span>→</span>
        </button>
      </div>
    </>
  );
};

const Calendar: React.FC = () => {
  // Datos de ejemplo para la interfaz
  const currentMonth = 4; 
  const currentYear = 2025;

  // Generar días de ejemplo para el calendario
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

  const firstDayWeekday = firstDayOfMonth.getDay() || 7;
  const prevMonthDays = Array.from({ length: firstDayWeekday - 1 }, (_, i) => {
    const day = new Date(currentYear, currentMonth, -i);
    return day.getDate().toString();
  }).reverse();

  const currentMonthDays = Array.from(
    { length: lastDayOfMonth.getDate() },
    (_, i) => (i + 1).toString()
  );

  const totalDaysInGrid = 42;
  const remainingDays = totalDaysInGrid - (prevMonthDays.length + currentMonthDays.length);
  const nextMonthDays = Array.from(
    { length: remainingDays },
    (_, i) => (i + 1).toString()
  );

  const today = new Date();
  const currentDate = today.getDate();
  const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;

  return (
    <>
      <div className={styles.calendarContainer}>
        <div className={styles.calendarWrapper}>
          <CalendarHeader
            selectedMonth={currentMonth}
            selectedYear={currentYear}
          />
          <div className={styles.calendarGrid}>
            <WeekdayHeader />
            {prevMonthDays.map((day) => (
              <div key={`prev-${day}`} className={styles.inactiveDayCell}>
                {day}
              </div>
            ))}
            {currentMonthDays.map((day) => {
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
                  isToday={parseInt(day) === currentDate && isCurrentMonth}
                  isCurrentMonth={true}
                  isPast={isPast}
                />
              );
            })}
            {nextMonthDays.map((day) => (
              <DayCell
                key={`next-${day}`}
                day={day}
                isToday={false}
                isCurrentMonth={false}
                isPast={false}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;