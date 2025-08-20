import { getMinimumMoves } from './hanoi';

export function calculateLevelScore(
  level: number,
  moves: number,
  timeLeft: number
): {
  baseScore: number;
  efficiencyBonus: number;
  timeBonus: number;
  total: number;
} {
  const diskCount = level + 2;
  const optimalMoves = getMinimumMoves(diskCount);
  
  const baseScore = 100 * level;
  const efficiencyBonus = Math.max(0, (optimalMoves - moves)) * 2;
  const timeBonus = Math.floor(timeLeft / 5);
  
  return {
    baseScore,
    efficiencyBonus,
    timeBonus,
    total: baseScore + efficiencyBonus + timeBonus,
  };
}

export function calculateTotalScore(
  levelScores: number[],
  finalTimeLeft: number
): number {
  const levelTotal = levelScores.reduce((sum, score) => sum + score, 0);
  const finalTimeBonus = Math.floor(finalTimeLeft / 5);
  
  return levelTotal + finalTimeBonus;
}