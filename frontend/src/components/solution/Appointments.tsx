"use client";
import React from "react";
import styles from "@/components/solution/appointments.module.css";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const Appointments: React.FC = () => {
  const data = {
    labels: [
      ["Other", "Clinics"],
      ["Spay.LA", "Clinics"],
    ],
    datasets: [
      {
        label: "Dataset 1",
        data: [11520, 28000],
        backgroundColor: ["#2D5177", "#ff8359"],
        borderColor: ["#2D5177", "#ff8359"],
        borderWidth: 1,
        barThickness: 80,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 75,
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      datalabels: {
        anchor: "end",
        align: "top",
        offset: 5,
        color: ["#2D5177", "#ff8359"],
        font: {
          size: 24,
          weight: "bold",
          family: "Montserrat",
        },
        formatter: (value) => value.toLocaleString(), // Format numbers with commas
      },
    },
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
          drawBorder: false,
        },
        ticks: {
          color: "black",
          font: {
            size: 20,
            family: "Montserrat",
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        display: false,
      },
    },
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.textSection}>
          <h2 className={styles.heading}>Available Appointments</h2>
          <p className={styles.description}>
            By operating 5 days a week with day and night shifts,
            <br /> Spay.LA can perform almost
            <span style={{ fontWeight: "bold" }}> triple the surgeries</span> of <br /> other
            clinics in LA.
            <br />
            <br />
            This means more surgeries and less time waiting for <br /> an available appointment.
          </p>
        </div>
        <div className={styles.graphSection}>
          <p className={styles.graphTitle}>Surgeries Per Year</p>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Appointments;
