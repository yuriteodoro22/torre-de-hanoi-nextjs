'use client';

import { useGameStore } from '@/store/game';
import { getMinimumMoves } from '@/lib/hanoi';
import { Clock, Target, User, Zap } from 'lucide-react';

export default function HeaderBar() {
  const { playerName, level, moves, timeLeft } = useGameStore();
  
  const diskCount = level + 2;
  const minMoves = getMinimumMoves(diskCount);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="glass-card m-4 p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {playerName}
            </h2>
            <p className="text-sm text-gray-400">Nível {level}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-blue-400" />
          <div className={`text-2xl font-mono font-bold ${
            timeLeft <= 60 ? 'text-red-400 animate-pulse' : 
            timeLeft <= 180 ? 'text-yellow-400' : 'text-green-400'
          }`}>
          {formatTime(timeLeft)}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-3 flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Movimentos</p>
            <p className="text-lg font-bold">
              <span className={moves <= minMoves ? 'text-green-400' : moves <= minMoves * 1.5 ? 'text-yellow-400' : 'text-red-400'}>
                {moves}
              </span>
              <span className="text-gray-500"> / {minMoves}</span>
            </p>
          </div>
        </div>
        
        <div className="glass-card p-3 flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Eficiência</p>
            <p className="text-lg font-bold">
              {moves === 0 ? '100' : Math.max(0, Math.round((minMoves / moves) * 100))}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}