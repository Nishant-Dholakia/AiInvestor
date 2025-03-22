"use client";

import { useState } from "react";

export default function AngleLogin() {
  const API_KEY = process.env.NEXT_PUBLIC_PUBLISHER_KEY;
  const STATE = "onlystatejaytay";
  const LOGIN_URL = `https://smartapi.angelone.in/publisher-login?api_key=${API_KEY}&state=${STATE}`;

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // Redirect to Angel One login page
    window.location.href = LOGIN_URL;
  };

  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      className="w-full transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
    >
      {loading ? "Logging in..." : "Login with Angel One"}
    </button>
  );
}