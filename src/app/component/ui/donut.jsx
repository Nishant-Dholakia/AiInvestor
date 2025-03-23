"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const SectorExposureChart = ({ sectorExposure }) => {
  // Convert sectorExposure data into Chart.js format
  const data = {
    labels: Object.keys(sectorExposure),
    datasets: [
      {
        data: Object.values(sectorExposure),
        backgroundColor: [
          "#FF6384", // Red
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
          "#4BC0C0", // Teal
          "#9966FF", // Purple
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        borderWidth: 0, // Remove borders for a cleaner look
      },
    ],
  };

  // Chart options for dark mode
  const options = {
    plugins: {
      legend: {
        position: "bottom", // Place legend at the bottom
        labels: {
          font: {
            size: 12, // Smaller font size
          },
          color: "#FFFFFF", // White text for dark mode
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}%`;
          },
        },
        bodyFont: {
          size: 12, // Smaller font size for tooltips
        },
      },
    },
    cutout: "70%", // Adjust the size of the hole in the middle
    responsive: true,
    maintainAspectRatio: false,
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
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default SectorExposureChart;