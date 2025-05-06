import React, { useState } from 'react';
import { 
  ChevronLeft, 
  LayoutDashboard, 
  FolderKanban, 
  GitPullRequest, 
  Code2, 
  BarChart3, 
  Settings, 
  LogOut,
} from 'lucide-react';
import { navigationItems } from '../data/mockData';

// Get icon component by name
const getIconByName = (iconName: string, className: string = "w-5 h-5") => {
  const icons: Record<string, React.ReactNode> = {
    LayoutDashboard: <LayoutDashboard className={className} />,
    FolderKanban: <FolderKanban className={className} />,
    GitPullRequest: <GitPullRequest className={className} />,
    Code2: <Code2 className={className} />,
    BarChart3: <BarChart3 className={className} />,
    Settings: <Settings className={className} />,
  };
  
  return icons[iconName] || <LayoutDashboard className={className} />;
};

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div 
      className={`fixed top-0 left-0 z-30 h-screen bg-white dark:bg-gray-900 transition-all duration-300 shadow-lg ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {!collapsed && (
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">DevMetrics</h1>
          )}
          <button 
            onClick={toggleSidebar}
            className={`p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
              collapsed ? 'mx-auto' : ''
            }`}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
              collapsed ? 'rotate-180' : ''
            }`} />
          </button>
        </div>
        
        <nav className="flex-grow p-3 space-y-1 overflow-y-auto">
          {navigationItems.map((item, index) => (
            <button 
              key={index}
              className={`flex items-center w-full p-2.5 text-left rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                index === 0 ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400' : ''
              } ${collapsed ? 'justify-center' : ''}`}
            >
              {getIconByName(item.icon, `w-5 h-5 ${collapsed ? 'mx-auto' : 'mr-3'}`)}
              {!collapsed && <span>{item.name}</span>}
            </button>
          ))}
        </nav>
        
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <button 
            className={`flex items-center w-full p-2.5 text-left rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut className={`w-5 h-5 ${collapsed ? 'mx-auto' : 'mr-3'}`} />
            {!collapsed && <span>Sign out</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;