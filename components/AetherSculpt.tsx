
import React, { useState, useCallback } from 'react';
import { generateAssetConcept } from '../services/geminiService';
import { GeneratedAsset } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Select from './common/Select';
import Spinner from './common/Spinner';

const PipelineStep: React.FC<{ label: string; active: boolean; completed: boolean }> = ({ label, active, completed }) => (
    <div className={`flex flex-col items-center space-y-2 relative z-10 w-24`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
            completed ? 'bg-emerald-500 border-emerald-500 text-black' : 
            active ? 'bg-black border-emerald-400 text-emerald-400 animate-pulse' : 
            'bg-slate-900 border-slate-700 text-slate-600'
        }`}>
            {completed ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            ) : (
                <div className={`w-2 h-2 rounded-full ${active ? 'bg-emerald-400' : 'bg-slate-700'}`}></div>
            )}
        </div>
        <span className={`text-[9px] font-mono uppercase tracking-wide text-center ${active || completed ? 'text-emerald-400' : 'text-slate-600'}`}>{label}</span>
    </div>
);

const AetherSculpt: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('Cyberpunk vending machine with holographic display');
  const [polyBudget, setPolyBudget] = useState('Low (Mobile)');
  const [useNanite, setUseNanite] = useState(false);
  const [useRigging, setUseRigging] = useState(false);
  const [generatedAsset, setGeneratedAsset] = useState<GeneratedAsset | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pipelineState, setPipelineState] = useState(0);

  const pipelineSteps = ['Voxelize', 'Retopo', 'UV Map', 'LOD Gen', 'Export'];

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setPipelineState(0);
    setGeneratedAsset(null);

    // Simulate pipeline progression
    const interval = setInterval(() => {
        setPipelineState(prev => {
            if (prev >= pipelineSteps.length) {
                clearInterval(interval);
                return prev;
            }
            return prev + 1;
        });
    }, 800);

    try {
      const techSpecs = `Poly: ${polyBudget}, Nanite: ${useNanite}, Rig: ${useRigging}`;
      const images = await generateAssetConcept(prompt, techSpecs);
      
      // Wait for "pipeline" simulation
      await new Promise(r => setTimeout(r, 4000));
      
      setGeneratedAsset({
        id: Date.now().toString(),
        src: images[0],
        prompt,
        polyCount: useNanite ? 'NANITE_MAX' : '15k_TRIS',
        pipelineSteps: pipelineSteps
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      clearInterval(interval);
    }
  }, [prompt, polyBudget, useNanite, useRigging]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
      {/* Controls */}
      <Card className="lg:col-span-4 h-fit border-emerald-500/20 bg-slate-900/40">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
             <h2 className="text-lg font-mono font-bold text-white tracking-widest">
                AETHER<span className="text-emerald-500">SCULPT</span>
             </h2>
             <span className="text-[10px] text-emerald-500/50 font-mono">WORKER: TRIPO-SR (4-BIT)</span>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-emerald-500/70 mb-2 uppercase tracking-widest">Semantic Input</label>
            <textarea
                rows={3}
                className="w-full bg-black/50 border border-slate-700 rounded p-3 text-slate-200 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 text-xs font-mono"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="space-y-4 p-4 bg-black/30 rounded border border-slate-800">
             <h3 className="text-[10px] text-slate-500 font-mono uppercase tracking-widest border-b border-slate-800 pb-2 mb-2">Optimization Pipeline</h3>
             
             <Select id="poly" label="Poly Budget" value={polyBudget} onChange={e => setPolyBudget(e.target.value)}>
                <option>Low (Mobile)</option>
                <option>Medium (Console)</option>
                <option>High (PC)</option>
                <option>Cinematic</option>
             </Select>

             <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Nanite Virtualization</span>
                <button onClick={() => setUseNanite(!useNanite)} className={`w-8 h-4 rounded-full relative transition-colors ${useNanite ? 'bg-emerald-600' : 'bg-slate-700'}`}>
                    <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${useNanite ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </button>
             </div>

             <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Auto-Rigging (IK)</span>
                <button onClick={() => setUseRigging(!useRigging)} className={`w-8 h-4 rounded-full relative transition-colors ${useRigging ? 'bg-emerald-600' : 'bg-slate-700'}`}>
                    <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${useRigging ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </button>
             </div>
          </div>
          
          <Button onClick={handleGenerate} isLoading={isLoading} className="w-full bg-emerald-500/10 border-emerald-500/50 hover:bg-emerald-500/20 text-emerald-400">
            INITIALIZE PIPELINE
          </Button>
        </div>
      </Card>
      
      {/* Viewport / Holodeck */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        {/* Pipeline Visualizer */}
        <div className="h-20 bg-black/40 border border-slate-800 rounded-lg flex items-center justify-between px-8 relative overflow-hidden">
             {/* Connection Line */}
             <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 z-0"></div>
             <div className="absolute top-1/2 left-0 h-0.5 bg-emerald-500/50 -translate-y-1/2 z-0 transition-all duration-500" style={{ width: `${(pipelineState / pipelineSteps.length) * 100}%` }}></div>
             
             {pipelineSteps.map((step, idx) => (
                 <PipelineStep 
                    key={step} 
                    label={step} 
                    active={isLoading && idx === pipelineState} 
                    completed={!isLoading && generatedAsset ? true : idx < pipelineState} 
                />
             ))}
        </div>

        {/* 3D Viewport Simulation */}
        <Card className="flex-grow bg-black relative overflow-hidden flex flex-col items-center justify-center p-0 border-slate-800 group">
             {/* Grid Floor */}
             <div className="absolute inset-0 holodeck-floor opacity-30">
                <div className="holodeck-grid w-full h-[200%] bg-[linear-gradient(0deg,transparent_24%,rgba(16,185,129,0.1)_25%,rgba(16,185,129,0.1)_26%,transparent_27%,transparent_74%,rgba(16,185,129,0.1)_75%,rgba(16,185,129,0.1)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(16,185,129,0.1)_25%,rgba(16,185,129,0.1)_26%,transparent_27%,transparent_74%,rgba(16,185,129,0.1)_75%,rgba(16,185,129,0.1)_76%,transparent_77%,transparent)] bg-[length:50px_50px]"></div>
             </div>

             {/* UI Overlay */}
             <div className="absolute top-4 left-4 flex flex-col space-y-1">
                 <span className="text-[10px] font-mono text-emerald-500">VIEWPORT: PERSPECTIVE</span>
                 <span className="text-[10px] font-mono text-slate-500">LIT / WIREFRAME OFF</span>
             </div>

             {isLoading && (
                 <div className="relative z-10 flex flex-col items-center">
                    <Spinner size="12" />
                    <p className="mt-4 font-mono text-xs text-emerald-500 animate-pulse">PROCESSING GEOMETRY...</p>
                 </div>
             )}

             {!isLoading && !generatedAsset && (
                 <div className="relative z-10 text-center opacity-50">
                    <div className="w-16 h-16 border border-slate-700 rounded mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl text-slate-700 font-mono">+</span>
                    </div>
                    <p className="font-mono text-xs text-slate-600">AWAITING INPUT</p>
                 </div>
             )}

             {generatedAsset && (
                 <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
                     <img src={generatedAsset.src} className="max-h-full max-w-full object-contain drop-shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-fade-in" />
                     
                     {/* Asset Stats Overlay */}
                     <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur border border-slate-700 p-3 rounded text-right space-y-1">
                         <div className="text-[10px] font-mono text-slate-400">TRIS: <span className="text-white">{generatedAsset.polyCount}</span></div>
                         <div className="text-[10px] font-mono text-slate-400">MATS: <span className="text-white">1 (ORM PACKED)</span></div>
                         <div className="text-[10px] font-mono text-slate-400">RIG: <span className="text-white">{useRigging ? 'HUMANOID_IK' : 'NONE'}</span></div>
                     </div>
                 </div>
             )}
        </Card>
      </div>
    </div>
  );
};

export default AetherSculpt;
