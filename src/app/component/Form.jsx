"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "./ui/Lable";
import { Input } from "./ui/Input";
import { cn } from "@/app/lib/utils";
import { adviceData } from "../data/advice";

export function InvestmentForm() {
  const [formData, setFormData] = useState({
    returnData: "5",
    sharpe: "5",
    drawdown: "5",
    beta: "5",
    exposure: "5",
    winLoss: "5",
    riskReward: "5",
    holdingPeriod: "5",
    fomo: "5",
    panic: "5",
  });
  let [apiData,setApiData] = useState([])
  const handleClick = async () => {
    console.log('calling api')
  
    await fetch('http://localhost:3000/api/advisor', {
      method: 'POST',
      body: JSON.stringify(adviceData.advice),  // Make sure this is stringified JSON
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'  // Proper header for JSON
      }
    })
    .then(res => res.json())
    .then(data => setApiData(Array.isArray(data) ? data : []))
    .catch(error => console.error("Fetch error:", error));
  };

  const handleClickDemo = ()=> {
    handleClick()

  }
  // console.log('got data',apiData)
  
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
          onClick={handleClickDemo}
          type="submit"
        >
          Analyze Portfolio →
        </motion.button>
      </form>
      {
        apiData.length > 0 ? 
        <div className="flex flex-col gap-4 w-[100%]">
      {apiData.map((advice,index) => (
        <AdviceCard key = {index+1} index={index + 1} metric={advice.metric} advice={advice.advice} />
      ))}
      </div>
      : null
    }

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