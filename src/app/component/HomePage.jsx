"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import Link from 'next/link';
import HALO from "vanta/dist/vanta.halo.min";

import AngleLogin from "./AngleLogin";
import { HoverEffect } from "./ui/CardHoverEffect";

export function HomePage() {
  const searchParams = useSearchParams();


  const [vantaEffect, setVantaEffect] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const token = searchParams.get("auth_token");
    

    if (token) {
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } else {
      console.log("Auth token not found");
    }
  }, [router]);

  const vantaContainerRef = useCallback(
    (node) => {
      if (node !== null && !vantaEffect) {
        setVantaEffect(
          HALO({
            el: node,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            THREE,
          })
        );
      }
    },
    [vantaEffect]
  );

  useEffect(() => {
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div className="relative w-full">
      {/* Fixed Vanta Background */}
      <div
        ref={vantaContainerRef}
        className="fixed inset-0 -z-10 h-screen w-full"
      />

      {/* Scrollable Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[300vh]">
        <Navbar />
        <HeroSection />
        <ThreeDScroll direction="right" />
        <ThreeDScroll direction="left" />
        <Features />
      </div>
    </div>
  );
}

// 🔹 Hero Section
const HeroSection = () => {
  return (
    <div className="relative mt-20 flex flex-col items-center justify-center px-4 py-10 md:py-20 text-center">
      <h1 className="text-3xl font-bold text-white md:text-6xl">
        Make Smarter Financial Decisions, Faster
        <span className="block text-lg md:text-2xl font-normal text-violet-300">
          AI-Powered Investment & Tax Advisory for a Better Future
        </span>
      </h1>
      <p className="mt-6 text-white md:text-lg">
        Leverage AI-based insights, real-time stock data, and personalized
        strategies.
      </p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        <AngleLogin />

        {/* <Link href="/dashboard">
          <button className="rounded-lg border border-violet-500 px-6 py-3 text-white hover:bg-violet-600">
            Go To Dashboard
          </button>
        </Link> */}
      </motion.div>
    </div>
  );
};

const ThreeDScroll = ({ direction }) => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "right" ? ["40vw", "0vw"] : ["-40vw", "0vw"]
  );

  return (
    <div className="relative z-10 mt-20 flex w-full items-center justify-center h-[100vh] bg-transparent overflow-hidden">
      <motion.div
        style={{ scale, x, opacity }}
        className="relative flex h-96 min-w-[30rem] items-center justify-center rounded-xl bg-black shadow-lg"
      >
        <img
          src="/dashboard-screenshot.png"
          alt="Dashboard Screenshot"
          className="h-full w-full rounded-xl"
          width={"100%"}
        // layout="fill"
        // objectFit="cover"
        />
      </motion.div>
    </div>
  );
};

// 🔹 Features Section
const FeaturesArray = [
  {
    title: "AI-Based Investment Insights",
    description:
      "Get real-time AI-driven investment advice based on stock trends.",
    link: "#in",
  },
  {
    title: "Live Stock Data",
    description:
      "Track real-time stock prices, P/E ratios, and earnings per share.",
    link: "#data",
  },
  {
    title: "Automated Portfolio Management",
    description:
      "Auto-manage your stock portfolio with AI-powered buy/sell signals.",
    link: "#pro",
  },
  {
    title: "Angel One",
    description: "Integrates brokerage APIs (Angel One, Groww, etc.).",
    link: "#one",
  },
  {
    title: "Deep Stock Analysis",
    description: "Analyzes portfolios for risk, diversification, and returns.",
    link: "#analysis",
  },
  {
    title: "Regulatory Compliance",
    description: "Ensures regulatory compliance (SEBI, RBI)",
    link: "#compliance",
  },
];
const Features = () => {
  return (
    <div className="relative z-10 mt-20 w-full px-4 py-20 bg-transparent">
      <h2 className="text-4xl font-bold text-white text-center mb-10">
        Features
      </h2>
      <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={FeaturesArray} />
      </div>
    </div>
  );
};

// 🔹 Navbar
const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between bg-transparent px-4 py-4">
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <h1 className="text-lg font-bold text-white md:text-2xl">FinAdvisor</h1>
      </div>
      <div className="flex gap-4">
        <a href="#features" className="text-white hover:text-violet-300">
          Features
        </a>
        <a href="#pricing" className="text-white hover:text-violet-300">
          Pricing
        </a>
        <a href="#contact" className="text-white hover:text-violet-300">
          Contact
        </a>
      </div>
    </nav>
  );
};
