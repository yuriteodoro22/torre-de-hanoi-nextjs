import { create } from 'zustand';
import { GameState, createInitialState, makeMove, isValidMove, isLevelComplete } from '@/lib/hanoi';
import { calculateLevelScore } from '@/lib/scoring';

interface GameStore extends GameState {
  playerName: string;
  selectedPino: number | null;
  levelScores: number[];
  totalScore: number;
  
  setPlayerName: (name: string) => void;
  selectPino: (index: number) => void;
  moveDisk: (to: number) => void;
  startGame: () => void;
  nextLevel: () => void;
  tickTimer: () => void;
  resetGame: () => void;
  endGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  ...createInitialState(1),
  playerName: '',
  selectedPino: null,
  levelScores: [],
  totalScore: 0,
  
  setPlayerName: (name) => {
    set({ playerName: name });
    localStorage.setItem('hanoi-player-name', name);
  },
  
  selectPino: (index) => {
    const { selectedPino, pinos } = get();
    
    if (selectedPino === null) {
      // Select source pino (must have disks)
      if (pinos[index].length > 0) {
        set({ selectedPino: index });
      }
    } else if (selectedPino === index) {
      // Deselect
      set({ selectedPino: null });
    } else {
      // Try to move disk
      get().moveDisk(index);
    }
  },
  
  moveDisk: (to) => {
    const { selectedPino, pinos, moves, level } = get();
    
    if (selectedPino === null) return;
    
    if (isValidMove(pinos, selectedPino, to)) {
      const newPinos = makeMove(pinos, selectedPino, to);
      const newMoves = moves + 1;
      
      set({
        pinos: newPinos,
        moves: newMoves,
        selectedPino: null,
      });
      
      // Check if level is complete
      const diskCount = level + 2;
      if (isLevelComplete(newPinos, diskCount)) {
        const { timeLeft, levelScores } = get();
        const levelScore = calculateLevelScore(level, newMoves, timeLeft);
        const newLevelScores = [...levelScores, levelScore.total];
        
        set({
          levelScores: newLevelScores,
          completed: true,
        });
        
        // Auto advance to next level or end game
        setTimeout(() => {
          if (level < 5) {
            get().nextLevel();
          } else {
            get().endGame();
          }
        }, 1500);
      }
    } else {
      // Invalid move - deselect
      set({ selectedPino: null });
    }
  },
  
  startGame: () => {
    const name = get().playerName || localStorage.getItem('hanoi-player-name') || '';
    set({
      ...createInitialState(1),
      playerName: name,
      levelScores: [],
      totalScore: 0,
    });
  },
  
  nextLevel: () => {
    const { level } = get();
    const newLevel = level + 1;
    
    set({
      ...createInitialState(newLevel),
      playerName: get().playerName,
      levelScores: get().levelScores,
      selectedPino: null,
      timeLeft: get().timeLeft, // Keep remaining time
    });
  },
  
  tickTimer: () => {
    const { timeLeft, gameOver } = get();
    
    if (gameOver || timeLeft <= 0) return;
    
    const newTimeLeft = timeLeft - 1;
    
    if (newTimeLeft <= 0) {
      get().endGame();
    } else {
      set({ timeLeft: newTimeLeft });
    }
  },
  
  endGame: () => {
    const { levelScores, timeLeft } = get();
    const totalScore = levelScores.reduce((sum, score) => sum + score, 0) + Math.floor(timeLeft / 5);
    
    set({
      gameOver: true,
      totalScore,
    });
  },
  
  resetGame: () => {
    set({
      ...createInitialState(1),
      playerName: '',
      selectedPino: null,
      levelScores: [],
      totalScore: 0,
    });
  },
}));