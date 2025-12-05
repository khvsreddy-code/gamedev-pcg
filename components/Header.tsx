
import React from 'react';
import HardwareGauge from './common/HardwareGauge';

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
      className={`px-4 py-2 rounded text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 focus:outline-none border ${
        isActive
          ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
          : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ activeTool, setActiveTool }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-500/20 bg-black/90 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Brand */}
          <div className="flex items-center space-x-4 group cursor-pointer select-none" onClick={() => setActiveTool('home')}>
             <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-emerald-500 blur-md opacity-20 group-hover:opacity-50 transition-opacity"></div>
                <svg className="w-8 h-8 text-emerald-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
             </div>
             <div>
               <h1 className="text-lg font-bold text-white tracking-[0.2em] font-mono leading-none">
                 AETHER<span className="text-emerald-500">FORGE</span>
               </h1>
               <div className="flex items-center gap-2 mt-1">
                 <span className="text-[9px] text-emerald-500/60 uppercase tracking-widest font-mono bg-emerald-950/30 px-1 rounded">
                   V15.1 NEXUS
                 </span>
               </div>
             </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-1 p-1 bg-slate-900/50 rounded border border-white/5">
            <NavButton label="Sculpt" id="sculpt" isActive={activeTool === 'sculpt'} onClick={() => setActiveTool('sculpt')} />
            <NavButton label="World" id="world" isActive={activeTool === 'world'} onClick={() => setActiveTool('world')} />
            <NavButton label="Code" id="code" isActive={activeTool === 'code'} onClick={() => setActiveTool('code')} />
            <NavButton label="Metrics" id="metrics" isActive={activeTool === 'metrics'} onClick={() => setActiveTool('metrics')} />
            <NavButton label="Link" id="link" isActive={activeTool === 'link'} onClick={() => setActiveTool('link')} />
          </nav>

          <HardwareGauge />
        </div>
      </div>
    </header>
  );
};

export default Header;
