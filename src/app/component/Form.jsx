"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "./ui/Lable";
import { Input } from "./ui/Input";
import { cn } from "@/app/lib/utils";

export function InvestmentForm() {
  const [formData, setFormData] = useState({
    returnData: "",
    sharpe: "",
    drawdown: "",
    beta: "",
    exposure: "",
    winLoss: "",
    riskReward: "",
    holdingPeriod: "",
    fomo: "",
    panic: "",
  });
  const handleClick = () => {
    fetch('http://localhost:3000/api/advisor', {
      method: 'POST',
      body: JSON.stringify(formData),  // Make sure this is stringified JSON
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'  // Proper header for JSON
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error("Error:", err));  // Error handling
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Investment Form submitted", formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-[80%] max-w-3xl p-6 bg-black text-white rounded-lg shadow-lg max-h-[100%] overflow-y-auto"
    >
      <h2 className="text-xl font-bold">📊 AI Investment Analysis Form</h2>
      <p className="mt-2 text-sm text-gray-400">Fill in your portfolio metrics for AI-driven insights.</p>

      <form className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        {[ 
          { label: "Portfolio Return (%)", name: "returnData", placeholder: "e.g., 10%" },
          { label: "Sharpe Ratio", name: "sharpe", placeholder: "e.g., 1.3" },
          { label: "Maximum Drawdown (%)", name: "drawdown", placeholder: "e.g., 25%" },
          { label: "Beta (Market Sensitivity)", name: "beta", placeholder: "e.g., 1.1" },
          { label: "Single Stock Exposure (%)", name: "exposure", placeholder: "e.g., 15%" },
          { label: "Win/Loss Ratio", name: "winLoss", placeholder: "e.g., 1.7" },
          { label: "Risk-Reward Ratio", name: "riskReward", placeholder: "e.g., 2.5" },
          { label: "Average Holding Period (Days)", name: "holdingPeriod", placeholder: "e.g., 180 days" },
          { label: "FOMO Trades (%)", name: "fomo", placeholder: "e.g., 8%" },
          { label: "Panic Selling (%)", name: "panic", placeholder: "e.g., 12%" },
        ].map(({ label, name, placeholder }) => (
          <LabelInputContainer key={name}>
            <Label htmlFor={name}>{label}</Label>
            <Input
              id={name}
              name={name}
              placeholder={placeholder}
              type="number"
              value={formData[name]}
              onChange={handleChange}
            />
          </LabelInputContainer>
        ))}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full md:col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-all duration-300"
          onClick={handleClick}
          type="submit"
        >
          Analyze Portfolio →
        </motion.button>
      </form>
    </motion.div>
  );
}

const LabelInputContainer = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={cn("flex flex-col space-y-2", className)}
    >
      {children}
    </motion.div>
  );
};