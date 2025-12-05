
import React, { useRef, useEffect, useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import Select from './common/Select';

const AetherSim: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [algo, setAlgo] = useState('cellular');
  const [iteration, setIteration] = useState(0);

  // Simulation state
  const gridSize = 100;
  const [grid, setGrid] = useState<number[][]>([]);

  // Initialize grid
  const initGrid = () => {
    const newGrid = [];
    for (let y = 0; y < gridSize; y++) {
      const row = [];
      for (let x = 0; x < gridSize; x++) {
        row.push(Math.random() > 0.55 ? 1 : 0); // 1 = Wall, 0 = Floor
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
    setIteration(0);
  };

  useEffect(() => {
    initGrid();
  }, []);

  // Simulation Step
  const step = () => {
    setGrid(prevGrid => {
        const newGrid = prevGrid.map(arr => [...arr]);
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                let neighbors = 0;
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        if (dx === 0 && dy === 0) continue;
                        const ny = y + dy;
                        const nx = x + dx;
                        if (ny >= 0 && ny < gridSize && nx >= 0 && nx < gridSize) {
                            if (prevGrid[ny][nx] === 1) neighbors++;
                        } else {
                            neighbors++; // Edges are walls
                        }
                    }
                }
                // Cellular Automata Rules for Cave Generation
                if (prevGrid[y][x] === 1) {
                    newGrid[y][x] = neighbors >= 4 ? 1 : 0;
                } else {
                    newGrid[y][x] = neighbors >= 5 ? 1 : 0;
                }
            }
        }
        return newGrid;
    });
    setIteration(prev => prev + 1);
  };

  // Loop
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(step, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || grid.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = canvas.width / gridSize;
    ctx.fillStyle = '#020617'; // slate-950
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        if (grid[y][x] === 1) {
            // Wall color
            ctx.fillStyle = '#334155'; // slate-700
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    }
  }, [grid]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      <Card className="lg:col-span-1 h-fit">
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-4">
             <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono tracking-wide">
                <span className="text-cyan-400">03.</span> AETHER<span className="text-cyan-500">SIM</span>
             </h2>
             <p className="text-[10px] text-cyan-500/70 font-mono mt-1 uppercase">Physics Engine // Idle</p>
          </div>

          <Select 
            id="algo-type" 
            label="Algorithm Type"
            value={algo}
            onChange={(e) => setAlgo(e.target.value)}
          >
            <option value="cellular">Cellular Automata [CA]</option>
            <option value="perlin">Hydraulic Erosion [FLUID]</option>
            <option value="life">Conway's Game of Life</option>
          </Select>

          <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800 font-mono">
             <h4 className="text-cyan-500 text-[10px] uppercase mb-2 tracking-widest border-b border-slate-800 pb-1">Telemetry</h4>
             <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">EPOCH:</span>
                <span className="text-white">{iteration}</span>
             </div>
             <div className="flex justify-between text-xs">
                <span className="text-slate-400">ACTIVE_NODES:</span>
                <span className="text-cyan-400">{grid.flat().filter(c => c === 1).length}</span>
             </div>
          </div>
          
          <div className="flex space-x-2">
              <Button onClick={() => setIsPlaying(!isPlaying)} className="w-full" variant={isPlaying ? 'secondary' : 'primary'}>
                {isPlaying ? 'HALT' : 'EXECUTE'}
              </Button>
              <Button onClick={initGrid} variant="secondary">
                RESET
              </Button>
          </div>
        </div>
      </Card>
      
      <div className="lg:col-span-2">
         <Card className="h-full flex flex-col items-center justify-center bg-slate-900/40 p-0 overflow-hidden relative">
             <div className="absolute top-4 right-4 flex space-x-2">
                 <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                 <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                 <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
             </div>
             <canvas 
                ref={canvasRef} 
                width={800} 
                height={800} 
                className="w-full h-auto max-w-[600px] max-h-[600px] bg-slate-950 border border-slate-800 shadow-2xl rounded opacity-80"
             />
         </Card>
      </div>
    </div>
  );
};

export default AetherSim;
