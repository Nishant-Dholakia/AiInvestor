"use client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const MutualFundHoldingsChart = ({ mutualFundHoldings }) => {
  // Chart data
  const data = {
    labels: mutualFundHoldings.map((fund) => fund.fund_name),
    datasets: [
      {
        data: mutualFundHoldings.map((fund) => fund.current_value),
        backgroundColor: [
          "#FF6384", // Red
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
          "#4BC0C0", // Teal
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
        ],
        borderWidth: 0, // Remove borders for a cleaner look
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
        position: "bottom",
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
      <Pie data={data} options={options} />
    </div>
  );
};

export default MutualFundHoldingsChart;