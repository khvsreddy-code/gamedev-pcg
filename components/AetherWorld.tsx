
import React, { useState } from 'react';
import { generateWorldChunkData } from '../services/geminiService';
import { WorldChunk } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Select from './common/Select';

const ChunkGrid: React.FC<{ chunks: WorldChunk[], onSelect: (id: string) => void }> = ({ chunks, onSelect }) => {
    // 3x3 Grid centered around 0,0 for demo
    const grid = [-1, 0, 1].map(y => [-1, 0, 1].map(x => ({ x, y })));

    return (
        <div className="grid grid-cols-3 gap-2 w-full max-w-md aspect-square mx-auto">
            {grid.flat().map(coord => {
                const chunk = chunks.find(c => c.x === coord.x && c.y === coord.y);
                return (
                    <div 
                        key={`${coord.x},${coord.y}`}
                        onClick={() => chunk && onSelect(chunk.id)}
                        className={`border rounded flex items-center justify-center relative cursor-pointer transition-all duration-300 group
                            ${chunk 
                                ? 'bg-emerald-900/20 border-emerald-500/30 hover:bg-emerald-900/40 hover:border-emerald-400' 
                                : 'bg-slate-900/50 border-slate-800'
                            }`}
                    >
                        <span className="absolute top-1 left-2 text-[10px] font-mono text-slate-600 group-hover:text-emerald-500">
                            {coord.x}, {coord.y}
                        </span>
                        {chunk ? (
                            <div className="text-center">
                                <div className="text-xs font-mono font-bold text-emerald-400">{chunk.biome}</div>
                                <div className="text-[9px] text-slate-500">{chunk.status}</div>
                            </div>
                        ) : (
                            <span className="text-slate-700 text-xs">EMPTY</span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

const AetherWorld: React.FC = () => {
  const [biome, setBiome] = useState('Temperate Forest');
  const [chunks, setChunks] = useState<WorldChunk[]>([]);
  const [selectedChunk, setSelectedChunk] = useState<WorldChunk | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    // Generate center chunk 0,0
    try {
        const data = await generateWorldChunkData(0, 0, biome);
        const newChunk: WorldChunk = {
            id: Date.now().toString(),
            x: 0, 
            y: 0,
            biome: data.biome,
            density: data.vegetationDensity,
            status: 'loaded',
            details: JSON.stringify(data.instances, null, 2)
        };
        setChunks([newChunk]);
        setSelectedChunk(newChunk);
    } catch (e) {
        console.error(e);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <Card className="h-fit bg-slate-900/40 border-emerald-500/20">
            <div className="space-y-6">
                <div className="border-b border-emerald-500/20 pb-2">
                    <h2 className="text-lg font-mono font-bold text-white tracking-widest">
                        AETHER<span className="text-emerald-500">WORLD</span>
                    </h2>
                    <p className="text-[10px] text-emerald-500/50 font-mono">CHUNK STREAMING // ACTIVE</p>
                </div>

                <Select id="biome" label="Biome Type" value={biome} onChange={e => setBiome(e.target.value)}>
                    <option>Temperate Forest</option>
                    <option>Arid Desert</option>
                    <option>Tundra</option>
                    <option>Cyber City</option>
                    <option>Volcanic</option>
                </Select>

                <div className="space-y-2">
                    <div className="text-xs font-mono text-slate-400">Stream Radius</div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full w-1/3"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                        <span>LOADED: 9 CHUNKS</span>
                        <span>MEMORY: 128MB</span>
                    </div>
                </div>

                <Button onClick={handleGenerate} isLoading={isLoading} className="w-full">
                    GENERATE SECTOR
                </Button>
            </div>
        </Card>

        <div className="lg:col-span-2 flex flex-col gap-6">
            <Card className="flex-grow bg-black border-slate-800 relative">
                <div className="absolute top-4 left-4 text-[10px] font-mono text-slate-500">
                    GRID_VIEW: LOCAL SECTOR (0,0)
                </div>
                <ChunkGrid chunks={chunks} onSelect={(id) => setSelectedChunk(chunks.find(c => c.id === id) || null)} />
            </Card>

            {selectedChunk && (
                <div className="h-40 bg-slate-900/80 border border-slate-800 rounded-lg p-4 font-mono text-xs overflow-auto">
                    <h4 className="text-emerald-500 mb-2 font-bold">CHUNK_DATA: {selectedChunk.biome}</h4>
                    <pre className="text-slate-400">{selectedChunk.details}</pre>
                </div>
            )}
        </div>
    </div>
  );
};

export default AetherWorld;
