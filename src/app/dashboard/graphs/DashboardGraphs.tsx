'use client';
import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import styles from '@/components/styles/Dashboard/dashboardGraphs.module.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function DashboardGraphs() {
  // Paleta de colores azules
  const bluePrimary = '#03045E';       // Azul principal
  const blueSecondary = '#3b82f6';     // Azul secundario
  const blueLight = '#ECFCFF';         // Azul claro
  const blueDark = '#1e40af';          // Azul oscuro

  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Reservas',
      data: [15, 12, 18, 20, 16, 8, 5],
      backgroundColor: bluePrimary,
      borderColor: blueDark,
      borderWidth: 1,
      borderRadius: 4,
      barPercentage: 0.6
    }]
  };

  const spaceTypeData = {
    labels: ['Cubículos', 'Mesas'],
    datasets: [{
      data: [35, 65],
      backgroundColor: [bluePrimary, blueLight],
      borderColor: '#ffffff',
      borderWidth: 2
    }]
  };

  return (
    <div className={styles.graphsContainer}>
      <div className={styles.graphRow}>
        <div className={styles.graphCard}>
          <h3 className={styles.graphTitle}>Reservas activas hoy</h3>
          <div className={styles.bigNumber} style={{ color: bluePrimary }}>20</div>
          <p className={styles.graphSubtitle}>Reservas hoy</p>
        </div>
        
        <div className={styles.graphCard}>
          <h3 className={styles.graphTitle}>Distribución de reservas por tipo de espacio</h3>
          <div className={styles.pieChartWrapper}>
            <div className={styles.pieChart}>
              <Pie 
                data={spaceTypeData} 
                options={{
                  plugins: { 
                    legend: { 
                      position: 'bottom',
                      labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                          size: 12
                        }
                      }
                    }
                  }
                }} 
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.graphCard}>
        <h3 className={styles.graphTitle}>Reservas por día semana</h3>
        <div className={styles.barChartContainer}>
          <div className={styles.barChart}>
            <Bar 
              data={weeklyData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: { 
                  y: { 
                    beginAtZero: true,
                    grid: {
                      display: false
                    },
                    ticks: {
                      stepSize: 5,
                      padding: 10
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    },
                    ticks: {
                      padding: 10
                    }
                  }
                },
                plugins: { 
                  legend: { 
                    display: false 
                  } 
                },
                layout: {
                  padding: {
                    top: 20,
                    bottom: 20
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
