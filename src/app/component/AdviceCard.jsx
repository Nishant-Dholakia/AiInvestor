import React from 'react'


export function AdviceCard({index,metric,advice})
{
    return (
        <div className="bg-grey-700 shadow-lg rounded-xl p-5 border  w-[100%] sm:w-96">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold text-gray-700">{index}.</span>
          <h1 className="text-lg font-bold text-blue-800">{metric}</h1>
        </div>
        <p className="mt-2 text-gray-600 text-sm">{advice}</p>
      </div>
    )
}