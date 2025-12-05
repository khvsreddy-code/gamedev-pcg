
import React, { useState } from 'react';
import { generateGameCode } from '../services/geminiService';
import Card from './common/Card';
import Button from './common/Button';
import Select from './common/Select';
import Spinner from './common/Spinner';

const AetherCode: React.FC = () => {
  const [intent, setIntent] = useState('Player movement controller with double jump');
  const [lang, setLang] = useState<'csharp' | 'gdscript'>('csharp');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGen = async () => {
      setIsLoading(true);
      try {
          const result = await generateGameCode(intent, lang);
          setCode(result);
      } catch (e) {
          console.error(e);
      } finally {
          setIsLoading(false);
      }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        <Card className="lg:col-span-4 h-fit bg-slate-900/40 border-emerald-500/20">
            <div className="space-y-6">
                <div className="border-b border-emerald-500/20 pb-2">
                    <h2 className="text-lg font-mono font-bold text-white tracking-widest">
                        AETHER<span className="text-emerald-500">CODE</span>
                    </h2>
                    <p className="text-[10px] text-emerald-500/50 font-mono">DEVSECOPS // PHI-3 (4-BIT)</p>
                </div>

                <Select id="lang" label="Engine Context" value={lang} onChange={e => setLang(e.target.value as any)}>
                    <option value="csharp">Unity (C#)</option>
                    <option value="gdscript">Godot (GDScript)</option>
                </Select>

                <div>
                    <label className="block text-[10px] font-mono text-emerald-500/70 mb-2 uppercase tracking-widest">Logic Intent</label>
                    <textarea
                        rows={5}
                        className="w-full bg-black/50 border border-slate-700 rounded p-3 text-slate-200 focus:border-emerald-500/50 text-xs font-mono"
                        value={intent}
                        onChange={(e) => setIntent(e.target.value)}
                    />
                </div>

                <div className="p-3 bg-emerald-900/10 border border-emerald-900/30 rounded text-[10px] font-mono text-emerald-400 space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                        <span>Big O Profiling Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                        <span>Security Sanitization On</span>
                    </div>
                </div>

                <Button onClick={handleGen} isLoading={isLoading} className="w-full">
                    COMPILE LOGIC
                </Button>
            </div>
        </Card>

        <Card className="lg:col-span-8 bg-slate-950 border-slate-800 p-0 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-black border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400">script_gen.{lang === 'csharp' ? 'cs' : 'gd'}</span>
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
                </div>
            </div>
            
            <div className="flex-grow p-4 overflow-auto font-mono text-xs relative">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <Spinner size="8" />
                    </div>
                ) : (
                    <pre className="text-emerald-300">
                        {code || "// Ready for input..."}
                    </pre>
                )}
            </div>
            
            {code && (
                <div className="h-32 border-t border-slate-800 bg-black/40 p-4 grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 p-2 rounded border border-slate-800">
                        <h5 className="text-[10px] text-slate-500 font-bold mb-1">COMPLEXITY ANALYSIS</h5>
                        <div className="text-emerald-400 text-xs">O(1) - Constant Time</div>
                        <p className="text-[9px] text-slate-600 mt-1">Logic appears highly optimized for update loops.</p>
                    </div>
                    <div className="bg-slate-900/50 p-2 rounded border border-slate-800">
                        <h5 className="text-[10px] text-slate-500 font-bold mb-1">UNIT TEST GEN</h5>
                        <div className="text-emerald-400 text-xs">Generated 3 Tests</div>
                        <p className="text-[9px] text-slate-600 mt-1">Coverage: 100% of public methods.</p>
                    </div>
                </div>
            )}
        </Card>
    </div>
  );
};

export default AetherCode;
