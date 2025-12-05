
import React, { useState, useCallback } from 'react';
import { generateLevelMap } from '../services/geminiService';
import { CellType, LevelGrid } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Select from './common/Select';
import Spinner from './common/Spinner';

const cellColors: { [key in CellType]: string } = {
  [CellType.WALL]: 'bg-gray-700',
  [CellType.FLOOR]: 'bg-gray-500',
  [CellType.DOOR]: 'bg-yellow-700',
  [CellType.TREASURE]: 'bg-yellow-400',
  [CellType.START]: 'bg-green-500',
  [CellType.END]: 'bg-red-500',
};

const DungeonGrid: React.FC<{ grid: LevelGrid }> = ({ grid }) => {
  if (!grid || grid.length === 0) return null;
  const cellSize = Math.min(20, 800 / Math.max(grid.length, grid[0].length));

  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 overflow-auto">
      <div className="inline-grid" style={{ gridTemplateColumns: `repeat(${grid[0].length}, ${cellSize}px)` }}>
        {grid.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className={`flex items-center justify-center ${cellColors[cell as CellType] || 'bg-gray-800'}`}
              style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
              title={`(${x}, ${y}) - ${CellType[cell]}`}
            ></div>
          ))
        )}
      </div>
    </div>
  );
};


const LevelGenerator: React.FC = () => {
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-b-2 border-purple-500 pb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            Level Parameters
          </h2>
          <Select 
            id="grid-size" 
            label="Grid Size"
            value={`${gridSize.width}x${gridSize.height}`}
            onChange={(e) => {
                const [width, height] = e.target.value.split('x').map(Number);
                setGridSize({width, height});
            }}
          >
            <option value="30x20">Small (30x20)</option>
            <option value="40x30">Medium (40x30)</option>
            <option value="60x40">Large (60x40)</option>
          </Select>

          <Select 
            id="room-density" 
            label="Room Density"
            value={roomDensity}
            onChange={(e) => setRoomDensity(e.target.value as 'low' | 'medium' | 'high')}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
          
          <Button onClick={handleGenerate} isLoading={isLoading} className="w-full">
            Generate Dungeon
          </Button>
        </div>
      </Card>
      
      <div className="lg:col-span-2">
         <Card className="h-full flex flex-col items-center justify-center">
             <h2 className="text-2xl font-bold text-white mb-4 self-start">Generated Dungeon Map</h2>
             {isLoading && <Spinner size="16"/>}
             {error && <p className="text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</p>}
             {!isLoading && !error && !generatedLevel && 
                <div className="text-center text-gray-400">
                    <p>Configure your parameters and click "Generate Dungeon" to create a new level.</p>
                </div>
             }
             {generatedLevel && <DungeonGrid grid={generatedLevel} />}
         </Card>
      </div>
    </div>
  );
};

export default LevelGenerator;
