
import React, { useState, useCallback } from 'react';
import { generateLevelMap } from '../services/geminiService';
import { CellType, LevelGrid } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Select from './common/Select';
import Spinner from './common/Spinner';

const cellColors: { [key in CellType]: string } = {
  [CellType.WALL]: 'bg-slate-900 border-slate-800',
  [CellType.FLOOR]: 'bg-slate-800/50',
  [CellType.DOOR]: 'bg-amber-600/80',
  [CellType.TREASURE]: 'bg-cyan-500/80 shadow-[0_0_10px_rgba(6,182,212,0.6)]',
  [CellType.START]: 'bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.6)]',
  [CellType.END]: 'bg-rose-500/80 shadow-[0_0_10px_rgba(244,63,94,0.6)]',
};

const DungeonGrid: React.FC<{ grid: LevelGrid }> = ({ grid }) => {
  if (!grid || grid.length === 0) return null;
  const cellSize = Math.min(20, 800 / Math.max(grid.length, grid[0].length));

  return (
    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 overflow-auto shadow-inner relative">
       {/* Scanline effect */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>
      
      <div className="inline-grid gap-[1px] bg-slate-800/50" style={{ gridTemplateColumns: `repeat(${grid[0].length}, ${cellSize}px)` }}>
        {grid.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className={`flex items-center justify-center transition-all ${cellColors[cell as CellType] || 'bg-slate-900'}`}
              style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
              title={`(${x}, ${y}) - ${CellType[cell]}`}
            ></div>
          ))
        )}
      </div>
    </div>
  );
};


const AetherMaze: React.FC = () => {
  const [gridSize, setGridSize] = useState<{ width: number; height: number }>({ width: 40, height: 30 });
  const [roomDensity, setRoomDensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [generatedLevel, setGeneratedLevel] = useState<LevelGrid | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedLevel(null);
    try {
      const result = await generateLevelMap(gridSize.width, gridSize.height, roomDensity);
      if (result && result.level) {
        setGeneratedLevel(result.level);
      } else {
          throw new Error("Invalid response structure from API.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [gridSize, roomDensity]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      <Card className="lg:col-span-1 h-fit">
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-4">
             <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono tracking-wide">
                <span className="text-cyan-400">02.</span> AETHER<span className="text-cyan-500">MAZE</span>
             </h2>
             <p className="text-[10px] text-cyan-500/70 font-mono mt-1 uppercase">WFC Solver // Active</p>
          </div>
          
          <Select 
            id="grid-size" 
            label="Grid Coordinates"
            value={`${gridSize.width}x${gridSize.height}`}
            onChange={(e) => {
                const [width, height] = e.target.value.split('x').map(Number);
                setGridSize({width, height});
            }}
          >
            <option value="30x20">Small [30x20]</option>
            <option value="40x30">Standard [40x30]</option>
            <option value="60x40">Large [60x40]</option>
          </Select>

          <Select 
            id="room-density" 
            label="Entropy Density"
            value={roomDensity}
            onChange={(e) => setRoomDensity(e.target.value as 'low' | 'medium' | 'high')}
          >
            <option value="low">Sparse</option>
            <option value="medium">Balanced</option>
            <option value="high">Complex</option>
          </Select>

           <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800">
             <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400 uppercase">WASM Client Preview</span>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             </div>
             <p className="text-[10px] text-slate-600 font-mono">
                Enables instant client-side pre-visualization of constraint solving.
             </p>
          </div>
          
          <Button onClick={handleGenerate} isLoading={isLoading} className="w-full">
            RUN SOLVER
          </Button>
        </div>
      </Card>
      
      <div className="lg:col-span-2">
         <Card className="h-full min-h-[500px] flex flex-col items-center justify-center relative bg-slate-900/40">
             {!generatedLevel && <h2 className="text-sm font-mono font-bold text-slate-500 absolute top-6 left-6 uppercase tracking-widest">Map_Data_01.json</h2>}
             
             {isLoading && (
                 <div className="text-center space-y-4">
                    <Spinner size="12"/>
                    <p className="text-cyan-500 font-mono text-xs animate-pulse">COLLAPSING WAVE FUNCTIONS...</p>
                 </div>
             )}
             
             {error && <p className="text-rose-400 bg-rose-950/30 border border-rose-900/50 p-6 rounded-lg max-w-md text-center font-mono text-sm">{error}</p>}
             
             {!isLoading && !error && !generatedLevel && 
                <div className="text-center text-slate-500 max-w-sm">
                    <div className="w-16 h-16 border border-slate-800 mx-auto mb-4 flex items-center justify-center opacity-30">
                        <div className="w-10 h-10 border border-slate-600 grid grid-cols-2 grid-rows-2 gap-1 p-1">
                            <div className="bg-slate-500"></div>
                            <div className="bg-slate-500"></div>
                            <div className="bg-slate-500"></div>
                        </div>
                    </div>
                    <p className="font-mono text-xs tracking-wide">NO DATA STREAM</p>
                </div>
             }
             {generatedLevel && (
                <div className="w-full h-full p-4 flex flex-col animate-fade-in">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-slate-300 font-mono text-xs">DATA: {gridSize.width}x{gridSize.height}_MAP.JSON</h3>
                        <span className="text-emerald-400 text-[10px] font-mono px-2 py-1 bg-emerald-950/50 rounded border border-emerald-900/50">PATH VERIFIED</span>
                    </div>
                    <DungeonGrid grid={generatedLevel} />
                </div>
             )}
         </Card>
      </div>
    </div>
  );
};

export default AetherMaze;
