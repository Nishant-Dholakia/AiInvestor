"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EquityHoldingsChart = ({ equityHoldings }) => {
  // Chart data
  const data = {
    labels: equityHoldings.map((stock) => stock.stock_name),
    datasets: [
      {
        label: "Current Value",
        data: equityHoldings.map((stock) => stock.current_value),
        backgroundColor: "#36A2EB", // Blue bars
        borderColor: "#36A2EB",
        borderWidth: 1,
      },
      {
        label: "Unrealized Profit/Loss",
        data: equityHoldings.map((stock) => stock.unrealized_profit_loss),
        backgroundColor: "#FF6384", // Red bars
        borderColor: "#FF6384",
        borderWidth: 1,
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
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Light grid lines for dark mode
        },
        ticks: {
          color: "#FFFFFF", // White text for x-axis
          font: {
            size: 10, // Smaller font size
          },
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Light grid lines for dark mode
        },
        ticks: {
          color: "#FFFFFF", // White text for y-axis
          font: {
            size: 10, // Smaller font size
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "300px", // Smaller height
        maxWidth: "500px", // Smaller width
        margin: "0 auto",
        backgroundColor: "#1E1E1E", // Dark background
        borderRadius: "12px", // Rounded corners
        padding: "16px", // Add some padding
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
};

export default EquityHoldingsChart;