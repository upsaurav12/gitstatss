import React, { useEffect, useState } from 'react';
import { GitCommit, GitPullRequest, FileCheck2 } from 'lucide-react';
import { weeklyActivityData } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
//import { useNavigate , useLocation } from 'react-router-dom';


interface Repository {
  $id :  number;
  name : string;
  full_name: string;
  owner : {
    login: string;
    $id: number;
    type: string;
  }
  private: boolean;
  description: string;
  fork: string;
}

const WeeklyTrends: React.FC = () => {

  const {state} = useAuth()
  const {githubUsername} = state;
  //const navigate = useNavigate();
  //const location = useLocation();
  const [repositories , setRepositories] = useState<Repository[]>([])


  useEffect(() => {
    const fetchUserRepositories  = async  ( ) => {
      try {
        const res = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=10000&page=1`)
        if (!res.ok) {
          throw new Error("Failed to fetch user's repo")
        }

        const data = await res.json();
        setRepositories(data)
        console.log("repositories", data)
      } catch (error) {
        console.error("Error", error)
      }
    }


    fetchUserRepositories()
  } , [])
  //console.log("user:", user ,  "githubUsername", githubUsername , "navigate", navigate , "location", location)
  return (
    <div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-5">Daily Activity</h2>
        
        <div className="space-y-4">
          {weeklyActivityData.map((dayActivity, index) => {
            const totalActivity = dayActivity.commits + dayActivity.prs + dayActivity.reviews;
            const hasActivity = totalActivity > 0;
            
            return (
              <div 
                key={index}
                className={`border ${hasActivity ? 'border-gray-200 dark:border-gray-700' : 'border-gray-100 dark:border-gray-800'} rounded-lg transition-all hover:shadow-sm ${hasActivity ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'}`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium ${hasActivity ? 'text-gray-800 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                      {dayActivity.day}
                    </h3>
                    {!hasActivity && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        No activity
                      </span>
                    )}
                  </div>
                  
                  {hasActivity && (
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <div className="flex items-center space-x-2">
                        <GitCommit className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {dayActivity.commits} {dayActivity.commits === 1 ? 'commit' : 'commits'}
                        </span>
                      </div>
                      
                      {dayActivity.prs > 0 && (
                        <div className="flex items-center space-x-2">
                          <GitPullRequest className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {dayActivity.prs} {dayActivity.prs === 1 ? 'PR' : 'PRs'}
                          </span>
                        </div>
                      )}
                      
                      {dayActivity.reviews > 0 && (
                        <div className="flex items-center space-x-2">
                          <FileCheck2 className="w-4 h-4 text-purple-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {dayActivity.reviews} {dayActivity.reviews === 1 ? 'review' : 'reviews'}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {hasActivity && (
                  <div className="w-full h-1 rounded-b-lg overflow-hidden flex">
                    {dayActivity.commits > 0 && (
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${(dayActivity.commits / totalActivity) * 100}%` }}
                      ></div>
                    )}
                    {dayActivity.prs > 0 && (
                      <div 
                        className="h-full bg-green-500" 
                        style={{ width: `${(dayActivity.prs / totalActivity) * 100}%` }}
                      ></div>
                    )}
                    {dayActivity.reviews > 0 && (
                      <div 
                        className="h-full bg-purple-500" 
                        style={{ width: `${(dayActivity.reviews / totalActivity) * 100}%` }}
                      ></div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className='bg-white mt-4 dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5'>
        <h3 className='text-2xl'>User's Repositories</h3>

        {repositories && (
          repositories.map((val , idx) => (
            <li className='list-none' key={idx}>{val.name}</li>
          )) 
        )}
      </div>
    </div>
  );
};

export default WeeklyTrends;