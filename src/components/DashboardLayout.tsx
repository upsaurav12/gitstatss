import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import StatsCards from './StatsCards';
import ContributionChart from './ContributionChart';
import ActivityBreakdown from './ActivityBreakdown';
import WeeklyTrends from './WeeklyTrends';

interface DashboardLayoutProps {
  username: string | null;
  onLogout : () =>Promise<void>
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({username , onLogout}) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarVisible(false);
      } else {
        setSidebarVisible(true);
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Sidebar overlay for mobile */}
      {sidebarVisible && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      {sidebarVisible && 
      <div>
        <button className='ml-[100px]' onClick={onLogout}>Logout</button>
        <Sidebar/>
      </div>
      }
      
      {/* Main content */}
      {username && (
        <div className={`transition-all duration-300 ${sidebarVisible ? 'lg:ml-64' : 'ml-0'}`}>
        <Navbar toggleSidebar={toggleSidebar} username={username} />
        
        <main className="p-4 md:p-6">
          <div className="mb-6">
            <StatsCards />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <ContributionChart />
            </div>
            <div>
              <ActivityBreakdown />
            </div>
          </div>
          
          <div>
            <WeeklyTrends />
          </div>
        </main>
      </div>
      )}
    </div>
  );
};

export default DashboardLayout;