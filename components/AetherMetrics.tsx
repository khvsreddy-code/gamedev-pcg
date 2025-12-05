
import React from 'react';
import Card from './common/Card';

const AetherMetrics: React.FC = () => {
    const metrics = [
        { label: 'System Memory', val: '3.4 GB', max: '8.0 GB', pct: 42, color: 'bg-emerald-500' },
        { label: 'iGPU VRAM', val: '1.2 GB', max: 'DYNAMIC', pct: 30, color: 'bg-emerald-500' },
        { label: 'Docker Containers', val: '5 Active', max: 'Alpine Base', pct: 10, color: 'bg-cyan-500' },
        { label: 'Worker Queue', val: 'Idle', max: 'Redis', pct: 0, color: 'bg-slate-600' },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-xl font-mono font-bold text-white tracking-widest text-center mb-8">
                SYSTEM <span className="text-emerald-500">TELEMETRY</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {metrics.map(m => (
                    <Card key={m.label} className="bg-slate-900/40 border-slate-800">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">{m.label}</span>
                            <span className="text-sm font-mono font-bold text-white">{m.val}</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className={`h-full ${m.color} transition-all duration-1000`} style={{ width: `${m.pct}%` }}></div>
                        </div>
                        <div className="text-right mt-1 text-[9px] text-slate-600 font-mono">MAX: {m.max}</div>
                    </Card>
                ))}
            </div>

            <div className="p-4 bg-black/40 border border-slate-800 rounded text-center">
                <div className="text-[10px] font-mono text-slate-500 mb-2">PROMETHEUS EXPORTER ENDPOINT</div>
                <code className="text-emerald-500 bg-black px-2 py-1 rounded text-xs">http://localhost:9090/metrics</code>
            </div>
        </div>
    );
};

export default AetherMetrics;
