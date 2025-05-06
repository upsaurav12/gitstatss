import React, { useState } from 'react';
import { Bell, Moon, Sun, Menu } from 'lucide-react';
import { userProfile } from '../data/mockData';

interface NavbarProps {
  username: string | null ;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ username , toggleSidebar }) => {
  const [darkMode, setDarkMode] = useState(false);

  console.log(username)
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="sticky top-0 z-20 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center lg:hidden">
          <button 
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        {username && (
          <div className="flex-1 ml-4 lg:ml-0">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white hidden md:block">{username}</h1>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white md:hidden">Dev Dashboard</h1>
        </div>
        )}
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={toggleDarkMode}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-500" />
            )}
          </button>
          
          <button 
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-800 dark:text-white">{userProfile.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{userProfile.role}</p>
            </div>
            <div className="w-8 h-8 overflow-hidden rounded-full">
              <img 
                src={userProfile.avatar} 
                alt={userProfile.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;