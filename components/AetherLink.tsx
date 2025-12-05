
import React, { useState, useEffect } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import Spinner from './common/Spinner';

const StatusBadge: React.FC<{ label: string; status: 'online' | 'offline' | 'busy' }> = ({ label, status }) => {
    const colors = {
        online: 'text-emerald-400 bg-emerald-950/30 border-emerald-900/50',
        offline: 'text-slate-500 bg-slate-900 border-slate-800',
        busy: 'text-amber-400 bg-amber-950/30 border-amber-900/50',
    };
    
    const dots = {
        online: 'bg-emerald-500',
        offline: 'bg-slate-600',
        busy: 'bg-amber-500',
    };

    return (
        <div className={`flex items-center justify-between p-4 rounded-lg border ${colors[status]} backdrop-blur-sm`}>
            <span className="font-mono text-sm tracking-wide">{label}</span>
            <div className="flex items-center space-x-2">
                <span className="text-xs uppercase font-bold opacity-80">{status}</span>
                <span className={`w-2 h-2 rounded-full ${dots[status]} ${status !== 'offline' ? 'animate-pulse' : ''}`}></span>
            </div>
        </div>
    );
};

const AetherLink: React.FC = () => {
  const [connecting, setConnecting] = useState(false);

  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col justify-center space-y-8">
      <div className="text-center space-y-2">
          <h2 className="text-3xl font-mono font-bold text-white tracking-widest">
            AETHERLINK <span className="text-cyan-500">BRIDGE</span>
          </h2>
          <p className="text-slate-400 text-sm font-mono uppercase tracking-widest">System Telemetry & Engine Integration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="space-y-6">
            <h3 className="text-cyan-500 font-mono text-xs uppercase tracking-widest border-b border-cyan-500/20 pb-2">Heterogeneous Compute Stack</h3>
            <div className="space-y-3">
                <StatusBadge label="gRPC-Web Gateway" status="online" />
                <StatusBadge label="Redis Job Queue" status="busy" />
                <StatusBadge label="PCG Worker (Python/WASM)" status="online" />
                <StatusBadge label="GPU Accelerator (ROCm)" status="offline" />
            </div>
        </Card>

        <Card className="flex flex-col justify-between">
             <div className="space-y-6">
                <h3 className="text-cyan-500 font-mono text-xs uppercase tracking-widest border-b border-cyan-500/20 pb-2">Engine Live-Link</h3>
                <div className="bg-black/40 p-6 rounded-lg border border-slate-800 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-slate-900 rounded-full flex items-center justify-center border border-slate-700">
                        <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-slate-300 font-mono text-sm">No Active Engine Detected</p>
                        <p className="text-slate-600 text-xs mt-1">Listening on ws://localhost:8080</p>
                    </div>
                </div>
            </div>
            
            <div className="mt-6">
                <Button 
                    className="w-full" 
                    onClick={() => setConnecting(!connecting)}
                    isLoading={connecting}
                    variant={connecting ? "secondary" : "primary"}
                >
                    {connecting ? "Scanning..." : "Establish Handshake"}
                </Button>
            </div>
        </Card>
      </div>

      <div className="font-mono text-[10px] text-slate-600 text-center space-y-1">
         <p>AetherForge V6.1 Quantum | Build 2024.10.05-RC</p>
         <p>Memory: 142MB / 4096MB | Threads: 4 Active</p>
      </div>
    </div>
  );
};

export default AetherLink;
