'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/game';
import HeaderBar from '@/components/HeaderBar';
import Board from '@/components/Board';
import { Toaster } from 'react-hot-toast';

export default function Play() {
  const router = useRouter();
  const { startGame, tickTimer, timeLeft, gameOver, completed, level, playerName } = useGameStore();
  
  useEffect(() => {
    if (!playerName) {
      router.push('/');
      return;
    }
    
    startGame();
  }, [playerName, startGame, router]);
  
  useEffect(() => {
    if (gameOver) {
      router.push('/final');
      return;
    }
    
    const timer = setInterval(tickTimer, 1000);
    return () => clearInterval(timer);
  }, [gameOver, tickTimer, router]);
  
  useEffect(() => {
    if (completed && level === 5) {
      setTimeout(() => {
        router.push('/final');
      }, 2000);
    }
  }, [completed, level, router]);
  
  if (!playerName) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <HeaderBar />
      <Board />
      
      {completed && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-card p-8 text-center glow-effect max-w-sm mx-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎉</span>
            </div>
            <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Nível {level} Completo!
            </h2>
            {level < 5 ? (
              <p className="text-gray-300 text-lg">Avançando para o próximo nível...</p>
            ) : (
              <p className="text-gray-300 text-lg">🏆 Parabéns! Todos os níveis completos!</p>
            )}
            <div className="mt-4 w-full bg-white/10 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full animate-pulse" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      )}
      
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#374151',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}