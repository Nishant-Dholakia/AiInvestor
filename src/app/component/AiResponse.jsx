'use client'

import {react,useState,useEffect} from 'react'
import getDummyData from '../api/dummyData'
import { Audio } from 'react-loader-spinner'
import { AdviceCard } from "./AdviceCard";

export function ResponseData()
{
    let [apiData,setApiData] = useState([])
    const [showFirst, setShowFirst] = useState(false);
    
    const handleClick = async () => {
        console.log('calling api')
      let api_data = getDummyData()
      console.log('fetching: ',api_data['portfolio']['performance_metrics'])
        await fetch('http://localhost:3000/api/advisor', {
          method: 'POST',
          body: JSON.stringify(api_data['portfolio']['performance_metrics']),  // Make sure this is stringified JSON
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
    <Audio
      height="80"
      width="80"
      radius="9"
      color="lime"
      ariaLabel="loading"
    />
  )}
</div>

      )
}