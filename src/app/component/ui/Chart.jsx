"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PortfolioGrowthChart = ({ portfolioValue }) => {
  // Month-wise data
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  const data = portfolioValue.monthly_data; // Use the monthly data from the portfolioValue object

  // Chart data
  const chartData = {
    labels,
    datasets: [
      {
        label: "Portfolio Value",
        data,
        borderColor: "#36A2EB", // Blue line color
        backgroundColor: "rgba(54, 162, 235, 0.1)", // Light blue fill
        fill: true, // Fill area under the line
        pointBackgroundColor: "#36A2EB", // Blue points
        pointBorderColor: "#FFFFFF", // White point borders
        pointRadius: 4, // Larger points
        pointHoverRadius: 6, // Even larger on hover
        borderWidth: 2, // Thicker line
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
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PortfolioGrowthChart;