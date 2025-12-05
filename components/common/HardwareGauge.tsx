
import React, { useEffect, useState } from 'react';

const HardwareGauge: React.FC = () => {
  const [ramUsage, setRamUsage] = useState(3.2);
  const [vramUsage, setVramUsage] = useState(1.1);

  useEffect(() => {
    // Simulate fluctuating usage typical of an "Idle" but "Ready" state
    const interval = setInterval(() => {
      setRamUsage(prev => Math.max(2.5, Math.min(7.8, prev + (Math.random() - 0.5) * 0.5)));
      setVramUsage(prev => Math.max(0.5, Math.min(3.8, prev + (Math.random() - 0.5) * 0.2)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (val: number, limit: number) => {
    const pct = val / limit;
    if (pct > 0.9) return 'text-rose-500 animate-pulse';
    if (pct > 0.7) return 'text-amber-500';
    return 'text-emerald-500';
  };

  return (
    <div className="hidden lg:flex items-center space-x-4 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800 shadow-xl">
       <div className="flex flex-col items-end">
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Sys RAM (8GB Limit)</span>
          <span className={`text-xs font-mono font-bold ${getStatusColor(ramUsage, 8)}`}>
            {ramUsage.toFixed(2)} GB / 8.00 GB
          </span>
       </div>
       <div className="h-6 w-px bg-slate-800"></div>
       <div className="flex flex-col items-end">
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">iGPU VRAM (Shared)</span>
          <span className={`text-xs font-mono font-bold ${getStatusColor(vramUsage, 4)}`}>
            {vramUsage.toFixed(2)} GB / DYNAMIC
          </span>
       </div>
       <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></div>
    </div>
  );
};

export default HardwareGauge;
