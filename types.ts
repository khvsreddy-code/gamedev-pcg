
export enum CellType {
  WALL = 0,
  FLOOR = 1,
  DOOR = 2,
  TREASURE = 3,
  START = 4,
  END = 5,
}

export type LevelGrid = CellType[][];

export interface GeneratedAsset {
  id: string;
  src: string;
  prompt: string;
}

export interface GeneratedLore {
  id: string;
  title: string;
  content: string;
  type: string;
}
