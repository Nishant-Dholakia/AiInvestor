"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import { adviceData } from "@/app/data/advice";

export function ExpandableCardDemo() {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.metric}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex absolute top-4 right-4 items-center justify-center bg-white rounded-full h-8 w-8 shadow-lg hover:bg-gray-100 transition-all"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.metric}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  flex flex-col bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <motion.h3
                      layoutId={`metric-${active.metric}-${id}`}
                      className="font-bold text-2xl bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent"
                    >
                      {active.metric}
                    </motion.h3>
                    <motion.p
                      layoutId={`value-${active.value}-${id}`}
                      className="text-gray-600 dark:text-gray-400 mt-2"
                    >
                      {active.value}
                    </motion.p>
                  </div>
                  <motion.a
                    layoutId={`button-${active.metric}-${id}`}
                    href={active.value}
                    target="_blank"
                    className="px-4 py-2 text-sm rounded-full font-bold bg-gradient-to-r from-violet-600 to-pink-600 text-white hover:from-violet-700 hover:to-pink-700 transition-all"
                  >
                    View Details
                  </motion.a>
                </div>
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 text-gray-600 dark:text-gray-400 text-sm md:text-base overflow-auto [mask:linear-gradient(to_bottom,white,white,transparent)]"
                >
                  {typeof active.content === "function"
                    ? active.content()
                    : active.advice}
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4 p-4">
        {adviceData.advice.map((card, index) => (
          <motion.div
            layoutId={`card-${card.metric}-${id}`}
            key={`card-${card.metric}-${id}`}
            onClick={() => setActive(card)}
            className="p-6 flex flex-col md:flex-row justify-between items-center bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl cursor-pointer transition-all m-12"
          >
            <div className="flex gap-4 flex-col md:flex-row">
              <div>
                <motion.h3
                  layoutId={`metric-${card.metric}-${id}`}
                  className="font-bold text-xl bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent"
                >
                  {card.metric}
                </motion.h3>
                <motion.p
                  layoutId={`value-${card.value}-${id}`}
                  className="text-gray-600 dark:text-gray-400"
                >
                  {card.value}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.metric}-${id}`}
              className="px-6 py-2 text-sm rounded-full font-bold bg-gradient-to-r from-violet-600 to-pink-600 text-white hover:from-violet-700 hover:to-pink-700 transition-all mt-4 md:mt-0"
            >
              {card.ctaText || "Learn More"}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};