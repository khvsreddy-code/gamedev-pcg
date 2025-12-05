
import React from 'react';

interface HeaderProps {
  activeTool: string;
  setActiveTool: (tool: string) => void;
}

const NavButton: React.FC<{
  label: string;
  id: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, id, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-xs font-mono font-bold tracking-wider transition-all duration-300 focus:outline-none border backdrop-blur-sm ${
        isActive
          ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
          : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ activeTool, setActiveTool }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Brand */}
          <div className="flex items-center space-x-4 group cursor-pointer select-none" onClick={() => setActiveTool('home')}>
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative w-full h-full bg-slate-900 border border-cyan-500/30 rounded-lg flex items-center justify-center">
                <span className="text-cyan-400 font-bold text-xl font-mono">A</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-widest font-mono">
                AETHER<span className="text-cyan-500">FORGE</span>
              </h1>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] text-cyan-500/70 uppercase tracking-[0.3em] font-mono">
                  V6.1 QUANTUM
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-2 p-1 bg-slate-900/50 rounded-lg border border-white/5">
            <NavButton label="MAZE" id="maze" isActive={activeTool === 'maze'} onClick={() => setActiveTool('maze')} />
            <NavButton label="SCULPT" id="sculpt" isActive={activeTool === 'sculpt'} onClick={() => setActiveTool('sculpt')} />
            <NavButton label="SIM" id="sim" isActive={activeTool === 'sim'} onClick={() => setActiveTool('sim')} />
            <NavButton label="NARRATIVE" id="narrative" isActive={activeTool === 'narrative'} onClick={() => setActiveTool('narrative')} />
            <NavButton label="LINK" id="link" isActive={activeTool === 'link'} onClick={() => setActiveTool('link')} />
          </nav>

          {/* Github Link */}
          <a 
              href="https://github.com/khvsreddy-code" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-all border border-white/5 hover:border-white/10"
              title="Source Code"
          >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
