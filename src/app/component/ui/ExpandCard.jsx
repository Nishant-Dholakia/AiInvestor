"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import getDummyData from "@/app/api/dummyData";

export function ExpandableCardDemo() {
  const [active, setActive] = useState(null);
  let [adviceData,setAdviceData] = useState([])

  const ref = useRef(null);
  const id = useId();

  const handleClick = async () => {
        console.log('Calling API...');
        const api_data = getDummyData()['portfolio']['performance_metrics'];
        
        try {
          const res = await fetch('http://localhost:3000/api/advisor', {
            method: 'POST',
            body: JSON.stringify(api_data),  // Ensure JSON encoding
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',  // Proper JSON header
            },
          });
      
          if (!res.ok) {
            console.error("API call failed with status:", res.status);
            return;
          }
      
          const data = await res.json();
          console.log("API Response Data:", data);
          setAdviceData(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };
      
        const handleClickDemo = ()=> {
          handleClick()
        }
  
        useEffect(() => {
          // Change state after 5 seconds
          const timer = setTimeout(() => {
            handleClickDemo();
          }, 1000);
      
          return () => clearTimeout(timer); // Cleanup on unmount
        }, []);

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
        {
        adviceData.length > 0 ? adviceData.map((card, index) => (
          <motion.div
            layoutId={`card-${card.metric}-${id}`}
            key={`card-${card.metric}-${index}`}
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
              {"Learn More"}
            </motion.button>
          </motion.div>
        )) 
        : <div className="text-center">
        <div role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    </div>
    
  }
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