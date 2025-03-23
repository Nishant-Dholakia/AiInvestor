"use client";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const PerformanceMetricsChart = ({ performanceMetrics }) => {
  // Chart data
  const data = {
    labels: Object.keys(performanceMetrics),
    datasets: [
      {
        label: "Performance Metrics",
        data: Object.values(performanceMetrics),
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Light blue fill
        borderColor: "#36A2EB", // Blue border
        borderWidth: 2, // Thicker border
        pointBackgroundColor: "#36A2EB", // Blue points
        pointBorderColor: "#FFFFFF", // White point borders
        pointRadius: 4, // Larger points
        pointHoverRadius: 6, // Even larger on hover
      },
    ],
  };

  // Chart options for dark mode
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#FFFFFF", // White text for dark mode
          font: {
            size: 12, // Smaller font size
          },
        },
      },
      tooltip: {
        enabled: true,
        bodyFont: {
          size: 12, // Smaller font size for tooltips
        },
        titleFont: {
          size: 12, // Smaller font size for tooltips
        },
        backgroundColor: "#1E1E1E", // Dark background for tooltips
        titleColor: "#FFFFFF", // White title text
        bodyColor: "#FFFFFF", // White body text
        borderColor: "#36A2EB", // Blue border for tooltips
        borderWidth: 1,
      },
    },
    scales: {
      r: {
        angleLines: {
          color: "rgba(255, 255, 255, 0.1)", // Light grid lines for dark mode
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Light grid lines for dark mode
        },
        pointLabels: {
          color: "#FFFFFF", // White text for labels
          font: {
            size: 10, // Smaller font size
          },
        },
        ticks: {
          display: false, // Hide radial ticks
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "300px", // Smaller height
        maxWidth: "400px", // Smaller width
        margin: "0 auto",
        backgroundColor: "#1E1E1E", // Dark background
        borderRadius: "12px", // Rounded corners
        padding: "16px", // Add some padding
      }}
    >
      <Radar data={data} options={options} />
    </div>
  );
};

export default PerformanceMetricsChart;