'use client';
import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import styles from '@/components/styles/Dashboard/dashboardGraphs.module.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function DashboardGraphs() {
  const weeklyData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [{
      label: 'Reservas',
      data: [12, 19, 15, 20, 14, 8, 5],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }]
  };

  const spaceTypeData = {
    labels: ['Cúbiculos', 'Mesas'],
    datasets: [{
      data: [30, 70],
      backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(75, 192, 192, 0.5)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
      borderWidth: 1,
    }]
  };

  return (
    <div className={styles.graphsContainer}>
      <div className={styles.graphRow}>
        <div className={styles.graphCard}>
          <h3>Reservas activas hoy</h3>
          <div className={styles.bigNumber}>20</div>
          <p className={styles.graphSubtitle}>Reservas hoy</p>
        </div>
        
        <div className={styles.graphCard}>
          <h3>Distribución por tipo</h3>
          <div className={styles.pieChart}>
            <Pie data={spaceTypeData} options={{
              plugins: { legend: { position: 'bottom' } }
            }} />
          </div>
          <p className={styles.graphSubtitle}>Tipo de espacio</p>
        </div>
      </div>

      <div className={styles.graphCard}>
        <h3>Reservas por día</h3>
        <div className={styles.barChart}>
          <Bar data={weeklyData} options={{
            scales: { y: { beginAtZero: true, max: 20 } },
            plugins: { legend: { display: false } }
          }} />
        </div>
      </div>
    </div>
  );
}