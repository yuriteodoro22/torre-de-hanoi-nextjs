export type Disk = {
  id: number;
  size: number;
  color: string;
};

export type GameState = {
  pinos: Disk[][];
  level: number;
  moves: number;
  timeLeft: number;
  completed: boolean;
  gameOver: boolean;
};

export const DISK_COLORS = [
  '#ef4444', // vermelho
  '#3b82f6', // azul
  '#22c55e', // verde
  '#eab308', // amarelo
  '#a855f7', // roxo
  '#f97316', // laranja
  '#ec4899', // rosa
];

export function createDisks(count: number): Disk[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    size: i + 1,
    color: DISK_COLORS[i],
  })).reverse(); // Maior para menor (bottom to top)
}

export function createInitialState(level: number): GameState {
  const diskCount = level + 2; // Level 1 = 3 disks, Level 2 = 4 disks, etc.
  const disks = createDisks(diskCount);
  
  return {
    pinos: [disks, [], []],
    level,
    moves: 0,
    timeLeft: 600, // 10 minutes (600 seconds)
    completed: false,
    gameOver: false,
  };
}

export function getMinimumMoves(diskCount: number): number {
  return Math.pow(2, diskCount) - 1;
}

export function isValidMove(pinos: Disk[][], from: number, to: number): boolean {
  if (from === to) return false;
  if (pinos[from].length === 0) return false;
  if (pinos[to].length === 0) return true;
  
  const fromDisk = pinos[from][pinos[from].length - 1];
  const toDisk = pinos[to][pinos[to].length - 1];
  
  return fromDisk.size < toDisk.size;
}

export function makeMove(pinos: Disk[][], from: number, to: number): Disk[][] {
  if (!isValidMove(pinos, from, to)) return pinos;
  
  const newPinos = pinos.map(pino => [...pino]);
  const disk = newPinos[from].pop()!;
  newPinos[to].push(disk);
  
  return newPinos;
}

export function isLevelComplete(pinos: Disk[][], targetDiskCount: number): boolean {
  return pinos[2].length === targetDiskCount;
}

export function getDiskWidth(size: number): number {
  return 50 + size * 16; // 50px base + 16px per size level for better visibility
}