
export interface GeneratedAsset {
  id: string;
  src: string;
  prompt: string;
  polyCount: string;
  pipelineSteps: string[];
}

export interface WorldChunk {
  id: string;
  x: number;
  y: number;
  biome: string;
  density: number;
  status: 'loaded' | 'unloaded' | 'generating';
  details: string;
}

export interface CodeSnippet {
  id: string;
  language: 'csharp' | 'gdscript' | 'python';
  code: string;
  complexity: string; // Big O notation
  securityCheck: 'pass' | 'fail' | 'warn';
  tests?: string;
}

export enum WorkerStatus {
  IDLE = 'IDLE',
  BUSY = 'BUSY',
  OFFLINE = 'OFFLINE',
  QUANTIZED = 'QUANTIZED (4-bit)',
}

export enum CellType {
  WALL = 0,
  FLOOR = 1,
  DOOR = 2,
  TREASURE = 3,
  START = 4,
  END = 5,
}

export type LevelGrid = number[][];

export interface GeneratedLore {
  id: string;
  title: string;
  content: string;
  type: string;
}
