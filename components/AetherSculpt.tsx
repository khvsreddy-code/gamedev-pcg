
import React, { useState, useCallback } from 'react';
import { generateAssetConcept } from '../services/geminiService';
import { GeneratedAsset } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Select from './common/Select';
import Spinner from './common/Spinner';

const AetherSculpt: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('Ancient obelisk made of obsidian with glowing cyan runes');
  const [assetType, setAssetType] = useState<string>('Prop');
  const [style, setStyle] = useState<string>('Cyberpunk');
  
  // Quantum Parameters
  const [polyTarget, setPolyTarget] = useState<string>('50k');
  const [naniteMode, setNaniteMode] = useState<boolean>(true);

  const [generatedAssets, setGeneratedAssets] = useState<GeneratedAsset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedAssets([]);

    const fullPrompt = `Generate a high-fidelity Concept Art for a 3D Game Asset.
      TYPE: ${assetType}
      STYLE: ${style}
      DESCRIPTION: ${prompt}
      TECHNICAL SPECS: Target Polycount: ${polyTarget}, Nanite Optimized: ${naniteMode ? 'YES' : 'NO'}.
      VISUALS: Isolate on dark neutral background. Show front and 3/4 perspective if possible. Photorealistic, 8k resolution, Unreal Engine 5 render style.`;

    try {
      const images = await generateAssetConcept(fullPrompt);
      const newAssets: GeneratedAsset[] = images.map((src, index) => ({
        id: `${Date.now()}-${index}`,
        src,
        prompt: fullPrompt,
      }));
      setGeneratedAssets(newAssets);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, assetType, style, polyTarget, naniteMode]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      <Card className="lg:col-span-1 h-fit relative overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        
        <div className="space-y-6 relative z-10">
          <div className="border-b border-white/10 pb-4">
             <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono tracking-wide">
                <span className="text-cyan-400">01.</span> AETHER<span className="text-cyan-500">SCULPT</span>
             </h2>
             <p className="text-[10px] text-cyan-500/70 font-mono mt-1 uppercase">Mesh Generation Pipeline // Active</p>
          </div>

          <div>
            <label htmlFor="prompt" className="block text-xs font-mono text-cyan-500/80 mb-2 uppercase tracking-widest">
                Semantic Prompt
            </label>
            <textarea
                id="prompt"
                rows={4}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition placeholder-slate-700 font-mono text-sm resize-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="INPUT_ASSET_DESCRIPTION..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <Select 
                id="asset-type" 
                label="Class"
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
            >
                <option>Vegetation</option>
                <option>Geological</option>
                <option>Structure</option>
                <option>Equipment</option>
                <option>Character</option>
                <option>Artifact</option>
            </Select>

            <Select 
                id="asset-style" 
                label="Style Matrix"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
            >
                <option>Cyberpunk</option>
                <option>High Fantasy</option>
                <option>Photoreal</option>
                <option>Stylized</option>
                <option>Eldritch</option>
            </Select>
          </div>

          {/* Quantum Parameters */}
          <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800 space-y-4">
             <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase">Poly Budget</span>
                <span className="text-xs font-mono text-cyan-400">{polyTarget}</span>
             </div>
             <input 
                type="range" 
                min="1" 
                max="5" 
                step="1"
                className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                onChange={(e) => {
                    const vals = ['1k', '10k', '50k', '100k', 'Nanite (Max)'];
                    setPolyTarget(vals[parseInt(e.target.value) - 1]);
                }}
             />
             
             <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-mono text-slate-400 uppercase">Nanite Virtualization</span>
                <button 
                    onClick={() => setNaniteMode(!naniteMode)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${naniteMode ? 'bg-cyan-600' : 'bg-slate-700'}`}
                >
                    <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${naniteMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
             </div>
          </div>
          
          <Button onClick={handleGenerate} isLoading={isLoading} className="w-full">
            EXECUTE JOB
          </Button>
        </div>
      </Card>
      
      <div className="lg:col-span-2">
         <Card className="h-full min-h-[500px] flex flex-col bg-slate-900/40 relative">
            <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-2">
                <h2 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest">Viewport // Render_01</h2>
                <div className="flex space-x-4 text-[10px] font-mono text-slate-600">
                    <span>GPU: ROCm_DETECTED</span>
                    <span>Q: IDLE</span>
                </div>
            </div>
            
             {isLoading && <div className="flex-grow flex flex-col items-center justify-center space-y-6">
                 <div className="relative">
                    <Spinner size="16"/>
                    <div className="absolute inset-0 animate-ping opacity-20 bg-cyan-500 rounded-full"></div>
                 </div>
                 <div className="text-center font-mono space-y-1">
                     <p className="text-cyan-400 text-xs animate-pulse">>> INITIATING DIFFUSION MODEL...</p>
                     <p className="text-slate-500 text-[10px]">Optimizing Geometry Topology</p>
                 </div>
             </div>}
             
             {error && <div className="flex-grow flex items-center justify-center"><p className="text-rose-400 bg-rose-950/30 p-6 rounded-lg border border-rose-900/50 font-mono text-sm">{error}</p></div>}
             
             {!isLoading && !error && generatedAssets.length === 0 && 
                <div className="flex-grow flex flex-col items-center justify-center text-center text-slate-600 max-w-sm mx-auto select-none">
                     <div className="w-24 h-24 border border-slate-800 rounded-full flex items-center justify-center mb-6 opacity-50">
                        <svg className="w-10 h-10 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                     </div>
                    <p className="font-mono text-xs tracking-wide">AWAITING INPUT PARAMETERS</p>
                </div>
             }
             
             {generatedAssets.length > 0 && (
                <div className="grid grid-cols-1 gap-6 p-4 animate-fade-in">
                    {generatedAssets.map(asset => (
                        <div key={asset.id} className="group relative bg-black rounded-lg overflow-hidden border border-slate-800 shadow-2xl">
                            <img src={asset.src} alt="Generated asset" className="w-full h-auto object-cover max-h-[600px] opacity-90 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur text-cyan-400 text-[10px] font-mono px-2 py-1 rounded border border-cyan-500/30">
                                8K_PREVIEW
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-white text-xs font-mono line-clamp-2">{asset.prompt}</p>
                            </div>
                        </div>
                    ))}
                </div>
             )}
         </Card>
      </div>
    </div>
  );
};

export default AetherSculpt;
