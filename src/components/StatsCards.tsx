import React from 'react';
import { GitPullRequestDraft, GitPullRequest, GitCommit, FileCheck2 } from 'lucide-react';
import { statsData } from '../data/mockData';

const StatsCards: React.FC = () => {
  // Array of stats with their properties
  const stats = [
    {
      title: 'Code Reviews',
      value: statsData.codeReviews,
      icon: <FileCheck2 className="w-6 h-6 text-purple-500" />,
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400',
      borderColor: 'border-purple-100 dark:border-purple-800',
    },
    {
      title: 'PRs Created',
      value: statsData.prsCreated,
      icon: <GitPullRequestDraft className="w-6 h-6 text-blue-500" />,
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-100 dark:border-blue-800',
    },
    {
      title: 'PRs Merged',
      value: statsData.prsMerged,
      icon: <GitPullRequest className="w-6 h-6 text-green-500" />,
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
      borderColor: 'border-green-100 dark:border-green-800',
    },
    {
      title: 'Commits',
      value: statsData.commits,
      icon: <GitCommit className="w-6 h-6 text-amber-500" />,
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      textColor: 'text-amber-600 dark:text-amber-400', 
      borderColor: 'border-amber-100 dark:border-amber-800',
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-5 transition-all duration-300 hover:shadow-md`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{stat.title}</p>
              <h3 className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</h3>
            </div>
            <div className={`${stat.bgColor} p-3 rounded-lg`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;