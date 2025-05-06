import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { contributionData } from '../data/mockData';

const ContributionChart: React.FC = () => {
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 space-y-3 sm:space-y-0">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Weekly Contributions</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
              chartType === 'bar'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/80'
            }`}
          >
            Bar Chart
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
              chartType === 'line'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/80'
            }`}
          >
            Line Chart
          </button>
        </div>
      </div>
      
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={contributionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
              <XAxis 
                dataKey="week" 
                tick={{ fill: '#6b7280', fontSize: 12 }} 
                className="dark:fill-gray-400" 
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }} 
                className="dark:fill-gray-400" 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem', 
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  color: '#374151'
                }}
                itemStyle={{ padding: '2px 0' }}
              />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
              <Bar dataKey="commits" name="Commits" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="prs" name="Pull Requests" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="reviews" name="Code Reviews" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={contributionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
              <XAxis 
                dataKey="week" 
                tick={{ fill: '#6b7280', fontSize: 12 }} 
                className="dark:fill-gray-400" 
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }} 
                className="dark:fill-gray-400" 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem', 
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  color: '#374151'
                }}
                itemStyle={{ padding: '2px 0' }}
              />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
              <Line 
                type="monotone" 
                dataKey="commits" 
                name="Commits" 
                stroke="#3B82F6" 
                strokeWidth={2}
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="prs" 
                name="Pull Requests" 
                stroke="#10B981" 
                strokeWidth={2}
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="reviews" 
                name="Code Reviews" 
                stroke="#F59E0B" 
                strokeWidth={2}
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ContributionChart;