
import React, { useState, useCallback } from 'react';
import { generateNarrative } from '../services/geminiService';
import { GeneratedLore } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Select from './common/Select';
import Spinner from './common/Spinner';

const AetherNarrative: React.FC = () => {
  const [context, setContext] = useState<string>('A meeting between a cybernetically enhanced mercenary and a rogue AI.');
  const [type, setType] = useState<string>('Dialogue');
  const [tone, setTone] = useState<string>('Dark & Gritty');
  const [generatedLore, setGeneratedLore] = useState<GeneratedLore | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedLore(null);

    try {
      const content = await generateNarrative(context, type, tone);
      setGeneratedLore({
          id: Date.now().toString(),
          title: `${type} - ${tone}`,
          content: content,
          type: type
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [context, type, tone]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      <Card className="lg:col-span-1 h-fit">
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-4">
             <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono tracking-wide">
                <span className="text-cyan-400">04.</span> AETHER<span className="text-cyan-500">NARRATIVE</span>
             </h2>
             <p className="text-[10px] text-cyan-500/70 font-mono mt-1 uppercase">LLM Director // vLLM Connected</p>
          </div>

          <div>
            <label htmlFor="context" className="block text-xs font-mono text-cyan-500/80 mb-2 uppercase tracking-widest">
                Context Seed
            </label>
            <textarea
                id="context"
                rows={4}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition placeholder-slate-700 font-mono text-sm resize-none"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="INPUT_SCENARIO_PARAMETERS..."
            />
          </div>

          <Select 
            id="lore-type" 
            label="Format"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Dialogue</option>
            <option>Item Description</option>
            <option>Quest Log</option>
            <option>World Lore / Codex</option>
            <option>NPC Backstory</option>
          </Select>

          <Select 
            id="lore-tone" 
            label="Tonality"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option>Dark & Gritty</option>
            <option>High Fantasy / Epic</option>
            <option>Humorous / Satirical</option>
            <option>Scientific / Clinical</option>
            <option>Horror / Unsettling</option>
          </Select>
          
          <Button onClick={handleGenerate} isLoading={isLoading} className="w-full">
            RUN INFERENCE
          </Button>
        </div>
      </Card>
      
      <div className="lg:col-span-2">
         <Card className="h-full min-h-[500px] flex flex-col bg-slate-900/40 relative">
             <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-2">
                <h2 className="text-sm font-mono font-bold text-slate-500 uppercase tracking-widest">Output Buffer</h2>
                <div className="flex space-x-2 items-center">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                    <span className="text-[10px] font-mono text-cyan-400">MODEL_READY</span>
                </div>
            </div>

             {isLoading && <div className="flex-grow flex flex-col items-center justify-center space-y-4">
                 <Spinner size="12"/>
                 <p className="text-cyan-500 text-xs font-mono animate-pulse">PROCESSING TOKENS...</p>
             </div>}
             
             {error && <div className="flex-grow flex items-center justify-center"><p className="text-rose-400 bg-rose-950/30 p-6 rounded-lg border border-rose-900/50 font-mono text-sm">{error}</p></div>}
             
             {!isLoading && !error && !generatedLore && 
                <div className="flex-grow flex flex-col items-center justify-center text-center text-slate-500 max-w-sm mx-auto select-none">
                    <div className="font-mono text-4xl mb-4 opacity-20">" "</div>
                    <p className="font-mono text-xs tracking-wide">BUFFER EMPTY</p>
                </div>
             }
             
             {generatedLore && (
                <div className="flex-grow p-6 bg-black/40 rounded-xl border border-slate-800 shadow-inner font-mono text-slate-300 whitespace-pre-wrap overflow-auto relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/20"></div>
                    <div className="mb-4 border-b border-slate-800 pb-2 flex justify-between items-center">
                        <span className="text-cyan-500 font-bold uppercase text-xs tracking-wider">{generatedLore.type}</span>
                        <span className="text-slate-600 text-[10px]">{generatedLore.id}</span>
                    </div>
                    {generatedLore.content}
                </div>
             )}
         </Card>
      </div>
    </div>
  );
};

export default AetherNarrative;
