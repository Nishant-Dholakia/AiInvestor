"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import HALO from "vanta/dist/vanta.halo.min";

export function HomePage() {
  const [vantaEffect, setVantaEffect] = useState(null);

  const vantaContainerRef = useCallback((node) => {
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
  }, [vantaEffect]);

  useEffect(() => {
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div className="relative w-full">
      {/* Fixed Vanta Background */}
      <div ref={vantaContainerRef} className="fixed inset-0 -z-10 h-screen w-full" />

      {/* Scrollable Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[300vh]">
        <Navbar />
        <HeroSection />
        <ThreeDScroll />
        <ThreeDScrollLeft />
        <Features />
      </div>
    </div>
  );
}

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
        Leverage AI-based insights, real-time stock data, and personalized strategies.
      </p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        <button className="rounded-lg bg-violet-600 px-6 py-3 text-white hover:bg-violet-700">
          Get Started
        </button>
        <button className="rounded-lg border border-violet-500 px-6 py-3 text-white hover:bg-violet-600">
          Learn More
        </button>
      </motion.div>
    </div>
  );
};

const ThreeDScroll = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1.5]);
  const x = useTransform(scrollYProgress, [0, 1], ["100vw", "0vw"]);

  return (
    <div className="relative z-10 mt-20 flex w-full items-center justify-end h-[80vh] bg-transparent overflow-hidden">
      <motion.div
        style={{ scale, x }}
        className="relative flex h-80 w-96 items-center justify-center rounded-lg bg-black shadow-lg"
      >
        <Image
          src="/dashboard-screenshot.png"
          alt="Dashboard Screenshot"
          className="h-full w-full rounded-lg"
          layout="fill"
          objectFit="cover"
        />
      </motion.div>
    </div>
  );
};

const ThreeDScrollLeft = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1.5]);
  const x = useTransform(scrollYProgress, [0, 1], ["-100vw", "0vw"]);

  return (
    <div className="relative z-10 mt-20 flex w-full items-center justify-start h-[80vh] bg-transparent overflow-hidden">
      <motion.div
        style={{ scale, x }}
        className="relative flex h-80 w-96 items-center justify-center rounded-lg bg-black shadow-lg"
      >
        <Image
          src="/dashboard-screenshot.png"
          alt="Dashboard Screenshot"
          className="h-full w-full rounded-lg"
          layout="fill"
          objectFit="cover"
        />
      </motion.div>
    </div>
  );
};

const Features = () => {
  return (
    <div className="relative z-10 mt-20 w-full px-4 py-20 bg-transparent">
      <h2 className="text-4xl font-bold text-white text-center mb-10">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-black/50 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-violet-500">Feature 1</h3>
          <p className="mt-4 text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        {/* Feature 2 */}
        <div className="bg-black/50 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-violet-500">Feature 2</h3>
          <p className="mt-4 text-white">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        {/* Feature 3 */}
        <div className="bg-black/50 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-violet-500">Feature 3</h3>
          <p className="mt-4 text-white">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>
    </div>
  );
};

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