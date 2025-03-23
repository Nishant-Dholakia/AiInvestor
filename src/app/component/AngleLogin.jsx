"use client";

import { useState } from "react";

export default function AngleLogin() {
  const API_KEY = process.env.NEXT_PUBLIC_PUBLISHER_KEY;
  const STATE = "onlystatejaytay";
  const LOGIN_URL = `https://smartapi.angelone.in/publisher-login?api_key=${API_KEY}&state=${STATE}`;

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    window.location.href = LOGIN_URL;
  };

  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      className="rounded-lg bg-violet-600 px-6 py-3 text-white hover:bg-violet-700"
    >
      {loading ? "Logging in..." : "Login with Angel One"}
    </button>
  );
}