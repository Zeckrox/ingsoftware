'use client'; 

import React, { useEffect, useState, Suspense } from "react";
import styles from '../../components/styles/Dashboard/dashboard.module.css'; 
import Modal from 'react-modal'; 
import DashboardGraphs from "./graphs/DashboardGraphs";
import { useMutation } from "@tanstack/react-query";
// Importa tus componentes de mapa para MESAS
import SalaReferenciaMesas from "@/components/styles/Reserva/MapasMesas/salaReferencia";
import SalaCientificaMesas from "@/components/styles/Reserva/MapasMesas/salaCientifica";
import SalaAbdalaMesas from "@/components/styles/Reserva/MapasMesas/salaAbdala";
import SalaHumanisticaMesas from "@/components/styles/Reserva/MapasMesas/salaHumanistica";
import SalaRamonMesas from "@/components/styles/Reserva/MapasMesas/salaRamonJV";

// Importa tus componentes de mapa para CUBÍCULOS
import SalaReferenciaCubiculos from "@/components/styles/Reserva/MapasCubiculos/salaReferencia";
import PasilloCubiculos from "@/components/styles/Reserva/MapasCubiculos/pasillo"; 
import SalaCientificaCubiculos from "@/components/styles/Reserva/MapasCubiculos/salaCientifica"; 

const allSalasMesas = {
  pb: ["Sala Referencia"], 
  p1: [
    "Sala Abdalá",
    "Sala Científica",
    "Sala Humanística",
    "Sala Ramón J. Velasquez",
  ]
};

const allSalasCubiculos = {
  pb: ["Sala Referencia"], 
  p1: [ "Pasillo",
    "Sala Científica"
  ]
};

const spaceTypes = [
  { label: "Mesa", value: "mesa" },
  { label: "Cubículo", value: "cubiculo" },
];

function DashboardContent() {
  //
  let hour = new Date("2025-07-22T09:00:00").getHours()
  let minute =  new Date("2025-07-22T09:00:00").getMinutes()
  let day = new Date("2025-07-22T09:00:00").toISOString().split("T")[0]
  let ampm = "a.m."
  if (hour >= 12) {
    ampm = "p.m"
    hour = hour-12
  }
  const [selectedPiso, setSelectedPiso] = useState<string>('pb');
  const [availableSalas, setAvailableSalas] = useState<string[]>(allSalasMesas.pb); 
  const [selectedSala, setSelectedSala] = useState<string>('Sala Referencia');
  const [selectedSpaceType, setSelectedSpaceType] = useState<string>('mesa'); 
  const [disabledCubiculos, setDisabledCubiculos] = useState<Set<number>>(new Set());
  const [infoCubicles, setInfoCubicles] = useState<any[]>([]);

  const [disabledMesas, setDisabledMesas] = useState<Set<number>>(new Set());
  const [infoMesas, setInfoMesas] = useState<any[]>([]);
  
  const [numerosOcupados, setNumerosOcupados] = useState<{number: number}[]>([]);
  const [numerosOcupadosC, setNumerosOcupadosC] = useState<{number: number}[]>([]);
  const [seleccionada, setSeleccionada] = useState<number | null>(null);
  const [occupiedSpaces, setOccupiedSpaces] = useState<Set<number>>(new Set()); 
  const [disabledSpaces, setDisabledSpaces] = useState<Set<number>>(new Set()); 
  const [time, setTime] = useState({day: day,
      hourMinuteString: `${hour <10? "0":""}${hour}:${minute>=30? "30": "00"} ${ampm}`
    })
  const allDisabledOrOccupiedSpaces = new Set([...occupiedSpaces, ...disabledSpaces]);

  const initialStartTimeOptions = [
  "08:00 a.m.", "08:30 a.m.", "09:00 a.m.", "09:30 a.m.",
  "10:00 a.m.", "10:30 a.m.", "11:00 a.m.", "11:30 a.m.",
  "12:00 p.m.", "12:30 p.m.", "01:00 p.m.", "01:30 p.m.",
  "02:00 p.m.", "02:30 p.m.", "03:00 p.m.", "03:30 p.m.",
  "04:00 p.m.", "04:30 p.m.", "05:00 p.m."
];
  const getCubiclesInfo = useMutation({
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
    
  const getTablesInfo = useMutation({
              mutationFn: async () => {
                const res = await fetch('https://backendsoftware.vercel.app/tables', {
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
               setInfoMesas(data)
               const newDisabled = new Set(disabledMesas);
               for (let x of data){
                if (!x.isAvailable){newDisabled.add(x.number)}
               }
               setDisabledMesas(newDisabled)
              },
              onError: (error: any) => {
                console.error('error en la consulta:', error);
              },
            });

   const getAvailableMesas = useMutation({
            mutationFn: async () => {
              const res = await fetch('https://backendsoftware.vercel.app/reservations/availableSpots', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  date: time.day,   //sale del url     
                  type: 'table',        
                  startTime: time.hourMinuteString,   //sale del form
                  duration: 1  //sale del form
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
              const numeros = data.map((reserva: any) => reserva.number);
              setNumerosOcupados(numeros);
            },
            onError: (error: any) => {
              console.error('error en la consulta:', error);
            },
          });

   const getAvailableCubicles = useMutation({
            mutationFn: async () => {
              const res = await fetch('https://backendsoftware.vercel.app/reservations/availableSpots', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  date: time.day,   //sale del url     
                  type: 'cubicle',        
                  startTime: time.hourMinuteString,   //sale del form
                  duration: 1  //sale del form
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
              
              setNumerosOcupadosC(numeros);
            },
            onError: (error: any) => {
              console.error('error en la consulta:', error);
            },
        });
  
  useEffect(() => {
    getTablesInfo.mutate()
    getAvailableMesas.mutate()
    getCubiclesInfo.mutate()
    getAvailableCubicles.mutate()
    if (typeof window !== 'undefined') {
      Modal.setAppElement(document.body);
    }
  }, []);

  useEffect(() => {
    let newAvailableSalas: string[] = [];
    if (selectedSpaceType === 'mesa') {
      newAvailableSalas = selectedPiso === 'pb' ? allSalasMesas.pb : allSalasMesas.p1;
    } else if (selectedSpaceType === 'cubiculo') {
      newAvailableSalas = selectedPiso === 'pb' ? allSalasCubiculos.pb : allSalasCubiculos.p1;
    }
    setAvailableSalas(newAvailableSalas);
    if (!newAvailableSalas.includes(selectedSala)) {
      setSelectedSala(newAvailableSalas[0] || ''); 
    }
  }, [selectedSpaceType, selectedPiso, selectedSala]); 

  const handlePisoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPiso(e.target.value);
  };

  const handleSalaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSala(e.target.value);
  };

  const handleSpaceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSpaceType = e.target.value;
    setSelectedSpaceType(newSpaceType);
    setSelectedPiso('pb'); 
    let initialSalasForNewType: string[] = [];
    if (newSpaceType === 'cubiculo') {
      initialSalasForNewType = allSalasCubiculos.pb;
    } else { 
      initialSalasForNewType = allSalasMesas.pb;
    }
    setAvailableSalas(initialSalasForNewType);
    setSelectedSala(initialSalasForNewType[0] || '');
  };

  const dummyToggleSeleccion = (numero: number) => {
    console.log(`Espacio ${numero} clickeado en modo solo-lectura de admin.`);
  };

  const renderMapComponent = () => {
    const baseCommonProps = {
      seleccionada: seleccionada, 
      toggleSeleccion: dummyToggleSeleccion, 
      userRole: 'admin', 
      spaceType: selectedSpaceType,
      ocupados: numerosOcupados 
    };

    if (selectedSpaceType === 'mesa') {
      const mesaProps = {
        ...baseCommonProps,
        disabledMesas: disabledMesas, 
      };
      switch (selectedSala) {
        case "Sala Referencia":
          return <SalaReferenciaMesas {...mesaProps} />; 
        case "Sala Humanística":
          return <SalaHumanisticaMesas {...mesaProps} />;
        case "Sala Abdalá":
          return <SalaAbdalaMesas {...mesaProps} />;
        case "Sala Científica":
          return <SalaCientificaMesas {...mesaProps} />;
        case "Sala Ramón J. Velasquez":
          return <SalaRamonMesas {...mesaProps} />;
        default:
          return <p>Selecciona una sala de mesas para ver el mapa.</p>;
      }
    } else if (selectedSpaceType === 'cubiculo') {
      const cubiculoProps = {
        ...baseCommonProps,
        ocupados: numerosOcupadosC,
        disabledCubiculos: disabledCubiculos, 
      };
      switch (selectedSala) {
        case "Sala Referencia":
          return <SalaReferenciaCubiculos {...cubiculoProps} />; 
        case "Pasillo":
          return <PasilloCubiculos {...cubiculoProps} />;
        case "Sala Científica":
          return <SalaCientificaCubiculos {...cubiculoProps} />;
        default:
          return <p>Selecciona una sala de cubículos para ver el mapa.</p>;
      }
    }
    return <p>Selecciona un tipo de espacio y una sala para ver el mapa.</p>;
  };

  return (
    <div className={styles.dashboardContainer} onClick={()=> console.log(numerosOcupados)}>
      <h1 className={styles.dashboardTitle}>Dashboard Reservas</h1>
      <h3 className={styles.coloresContainer}>
        <div className={styles.infoColores}>
          <div/> Mesa deshabilitada
          <div/> Mesa ocupada
        </div>
      </h3>
      <div className={styles.adminControls}>
        <div className={styles.selectGroup}>
          <label htmlFor="spaceType">Tipo de espacio:</label>
          <select
            id="spaceType"
            className={styles.adminSelect}
            value={selectedSpaceType}
            onChange={handleSpaceTypeChange}
          >
            {spaceTypes.map((typeOption) => (
              <option key={typeOption.value} value={typeOption.value}>
                {typeOption.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.selectGroup}>
          <label htmlFor="piso">Piso:</label>
          <select
            id="piso"
            className={styles.adminSelect}
            value={selectedPiso}
            onChange={handlePisoChange}
          >
            <option value="pb">Pb</option>
            <option value="p1">P1</option>
          </select>
        </div>

        <div className={styles.selectGroup}>
          <label htmlFor="sala">Sala:</label>
          <select
            id="sala"
            className={styles.adminSelect}
            value={selectedSala}
            onChange={handleSalaChange}
            disabled={!availableSalas?.length}
          >
            {availableSalas?.map((salaOption) => (
              <option key={salaOption} value={salaOption}>
                {salaOption}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h2 className={styles.sectionTitle}>Estado actual de Salas/Cubículos</h2>
      <div className={styles.mapContainer}>
        {renderMapComponent()}
      </div>

      <h2 className={styles.sectionTitle}>Estadísticas de reservas</h2>
      <div className={styles.statsContainer}>
        <DashboardGraphs />
        <button className={styles.updateDataButton}>Actualizar data</button>
      </div>
    </div>
  );
}

const Dashboard = () => {
  return (
    <Suspense fallback={<div>Cargando Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
};

export default Dashboard;
