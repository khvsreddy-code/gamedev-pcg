
import React from 'react';

interface HeaderProps {
  activeTool: 'level' | 'asset';
  setActiveTool: (tool: 'level' | 'asset') => void;
}

const NavButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 ${
        isActive
          ? 'bg-purple-600 text-white shadow-md'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
    >
      {label}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ activeTool, setActiveTool }) => {
  return (
    <header className="bg-gray-800 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <svg
            className="w-8 h-8 text-purple-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2 1M4 7l2-1M4 7v2.5M12 21.5v-2.5M12 18.5l-2 1m2-1l2 1M12 18.5v-2.5M12 16l-2-1m2 1l2-1"
            />
          </svg>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wider">
            GameDev <span className="text-purple-400">PCG Studio</span>
          </h1>
        </div>
        <nav className="flex space-x-2 sm:space-x-4">
          <NavButton
            label="Level Designer"
            isActive={activeTool === 'level'}
            onClick={() => setActiveTool('level')}
          />
          <NavButton
            label="Asset Generator"
            isActive={activeTool === 'asset'}
            onClick={() => setActiveTool('asset')}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
