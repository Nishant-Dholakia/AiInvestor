import React from 'react'


export function AdviceCard({index,metric,advice})
{
    return (
        <div className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 p-5 rounded-xl shadow-md border border-gray-300 dark:border-gray-600 hover:scale-[1.02] transition-transform">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-blue-600 dark:text-yellow-400">
            {index}.
          </span>
          <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {metric}
          </h1>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">
          {advice}
        </p>
      </div>
    )
}