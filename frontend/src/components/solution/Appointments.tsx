"use client";

import {
  BarElement,
  CategoryScale,
  Chart,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import React, { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";

import styles from "@/components/solution/appointments.module.css";

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

  const options: ChartOptions<"bar"> = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 75,
      },
    },
    animations: {
      y: {
        type: "number",
        duration: 2000,
        easing: "easeOutCubic", // Smooth acceleration & deceleration
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
        formatter: (value: number) => value.toLocaleString(), // Format numbers with commas
      },
    },
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
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
        beginAtZero: true,
      },
    },
  };

  const chartRef = useRef<HTMLDivElement | null>(null);
  const [chartKey, setChartKey] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false); // Track if animation has occurred

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setChartKey((prevKey) => prevKey + 1); // Forces chart re-render
            setHasAnimated(true); // Mark animation as done
            observer.unobserve(entry.target); // Stop observing after animation
          }
        });
      },
      { threshold: 0.5 }, // Trigger when 50% of the chart is visible
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, [hasAnimated]);

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
        <div ref={chartRef} className={styles.graphSection}>
          <p className={styles.graphTitle}>Surgeries Per Year</p>
          <Bar key={chartKey} data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Appointments;
