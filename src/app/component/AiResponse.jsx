'use client'

import {react,useState,useEffect} from 'react'
import getDummyData from '../api/dummyData'
import { AdviceCard } from "./AdviceCard";

export function ResponseData()
{
    let [apiData,setApiData] = useState([])
    const [showFirst, setShowFirst] = useState(false);
    
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
        setApiData(Array.isArray(data) ? data : []);
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
          setShowFirst(true);
          handleClickDemo();
        }, 3000);
    
        // return () => clearTimeout(timer); // Cleanup on unmount
      }, []);
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-800 dark:bg-gray-900 transition-all py-10">
  {/* Main Content */}
  {apiData.length > 0 ? (
    <div className="flex flex-col gap-4 w-[90%] max-w-3xl p-6 bg-gray-800 rounded-lg shadow-lg transition-all overflow-y-auto">
      {apiData.map((advice, index) => (
        <AdviceCard
          key={index}
          index={index + 1}
          metric={advice.metric}
          advice={advice.advice}
        />
      ))}
    </div>
  ) : (
    <div></div>
  )}
</div>

      )
}