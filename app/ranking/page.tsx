'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, type Score } from '@/lib/supabase';
import { useGameStore } from '@/store/game';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Medal, Award, Loader2, Play } from 'lucide-react';

export default function Ranking() {
  const router = useRouter();
  const { playerName, resetGame } = useGameStore();
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchScores();
  }, []);
  
  const fetchScores = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('scores')
        .select('*')
        .order('score', { ascending: false })
        .limit(120);
      
      if (error) throw error;
      
      setScores(data || []);
    } catch (error) {
      console.error('Error fetching scores:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-400" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-300" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-gray-400 text-sm">#{position}</span>;
    }
  };
  
  const isCurrentPlayer = (score: Score) => {
    return score.name === playerName && 
           new Date(score.created_at).getTime() > Date.now() - (5 * 60 * 1000); // Last 5 minutes
  };
  
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-lg mx-auto w-full space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center glow-effect">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            🏆 Hall da Fama
          </h1>
          <p className="text-xl text-gray-400 font-medium">Top 120 melhores pontuações</p>
        </div>
        
        <div className="glass-card p-6 glow-effect">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-400" />
                  <span className="text-lg text-gray-400">Carregando ranking...</span>
                </div>
              </div>
            ) : scores.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-xl text-gray-400 mb-2">Nenhuma pontuação ainda</p>
                <p className="text-gray-500">Seja o primeiro a conquistar o ranking!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {scores.map((score, index) => (
                  <div
                    key={score.id}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                      isCurrentPlayer(score)
                        ? 'glass-card border-2 border-blue-400/50 glow-effect'
                        : 'glass-card hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 flex items-center justify-center">
                        {getRankIcon(index + 1)}
                      </div>
                      <div>
                        <div className={`font-semibold ${
                          isCurrentPlayer(score) ? 'text-blue-400' : 'text-white'
                        }`}>
                          {score.name}
                          {isCurrentPlayer(score) && (
                            <span className="ml-2 text-xs bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-1 rounded-full font-bold">
                              VOCÊ
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-400">
                          {new Date(score.created_at).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                        {score.score.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">pontos</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </div>
        
        <div className="flex flex-col space-y-4">
          <Button 
            onClick={() => {
              resetGame();
              router.push('/');
            }}
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            <Play className="w-5 h-5 mr-2" />
            Jogar Novamente
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => router.push('/')}
            className="h-12 px-8 bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-300"
          >
            Voltar ao Início
          </Button>
        </div>
      </div>
    </div>
  );
}