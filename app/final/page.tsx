'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/game';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Clock } from 'lucide-react';

export default function Final() {
  const router = useRouter();
  const { playerName, totalScore, level, timeLeft, resetGame } = useGameStore();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const isTimeOut = timeLeft <= 0;
  const isSuccess = level === 5 && timeLeft > 0;
  
  useEffect(() => {
    if (!playerName) {
      router.push('/');
    }
  }, [playerName, router]);
  
  const handleSaveScore = async () => {
    if (saving || saved || totalScore === 0 || !isSupabaseConfigured() || !supabase) return;
    
    setSaving(true);
    
    try {
      const { error } = await supabase
        .from('scores')
        .insert([
          {
            name: playerName,
            score: totalScore,
          }
        ]);
      
      if (error) throw error;
      
      setSaved(true);
      setTimeout(() => {
        router.push('/ranking');
      }, 1000);
    } catch (error) {
      console.error('Error saving score:', error);
      setSaving(false);
    }
  };
  
  if (!playerName) {
    return null;
  }
  
  return (
    <div className="min-h-screen p-6 flex flex-col justify-center">
      <div className="max-w-lg mx-auto w-full space-y-8">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-full flex items-center justify-center glow-effect">
            <span className="text-4xl">
              {isTimeOut ? '⏰' : isSuccess ? '🏆' : '🎯'}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            {isTimeOut ? '⏰ Tempo Esgotado!' : isSuccess ? '🎉 Parabéns!' : '🎯 Fim de Jogo!'}
          </h1>
          <p className="text-xl text-gray-400 font-medium">
            {isTimeOut 
              ? 'O tempo acabou, mas você chegou longe!'
              : isSuccess 
                ? 'Você completou todos os níveis!'
                : 'Bom trabalho!'
            }
          </p>
        </div>
        
        <div className="glass-card p-8 glow-effect">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Resultado Final
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2 uppercase tracking-wide font-semibold">Pontuação Total</div>
              <div className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                {totalScore.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">pontos</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4 text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">{level}</span>
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Nível Alcançado</div>
                <div className="text-2xl font-bold text-blue-400">{level}</div>
              </div>
              
              <div className="glass-card p-4 text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Tempo Restante</div>
                <div className="text-2xl font-bold text-green-400">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleSaveScore}
              disabled={saving || saved || totalScore === 0 || !isSupabaseConfigured()}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : saved ? (
                'Salvo! Redirecionando...'
              ) : (
                isSupabaseConfigured() ? 'Salvar Pontuação' : 'Continuar'
              )}
            </Button>
          </CardContent>
        </div>
        
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => {
              resetGame();
              router.push('/');
            }}
            className="h-12 px-8 bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-300"
          >
            Jogar Novamente
          </Button>
        </div>
      </div>
    </div>
  );
}