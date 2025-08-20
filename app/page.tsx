'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/game';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Trophy, Clock, Target, Zap, User, Database, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { setPlayerName } = useGameStore();
  const [name, setName] = useState('');
  const [testingSupabase, setTestingSupabase] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);
  
  useEffect(() => {
    const savedName = localStorage.getItem('hanoi-player-name');
    if (savedName) {
      setName(savedName);
    }
  }, []);
  
  const handleStart = () => {
    if (name.trim()) {
      setPlayerName(name.trim());
      router.push('/play');
    }
  };
  
  const testSupabase = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setTestResult('error');
      return;
    }
    
    setTestingSupabase(true);
    setTestResult(null);
    
    try {
      // Teste simples: buscar dados da tabela scores
      const { data, error } = await supabase
        .from('scores')
        .select('count')
        .limit(1);
      
      if (error) throw error;
      
      setTestResult('success');
    } catch (error) {
      console.error('Erro no teste do Supabase:', error);
      setTestResult('error');
    } finally {
      setTestingSupabase(false);
      // Limpar resultado após 3 segundos
      setTimeout(() => setTestResult(null), 3000);
    }
  };
  
  return (
    <div className="min-h-screen p-6 flex flex-col justify-center">
      <div className="max-w-lg mx-auto w-full space-y-8">
        {/* Header com logo */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center glow-effect">
            <div className="text-3xl">🗼</div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Torre de Hanói
          </h1>
          <p className="text-xl text-gray-400 font-medium">Desafie-se em 5 níveis épicos!</p>
        </div>
        
        {/* Card principal de jogo */}
        <div className="glass-card p-8 glow-effect">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center mb-6 flex items-center justify-center space-x-3">
              <Play className="w-6 h-6 text-blue-400" />
              <span>Iniciar Jogo</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-3 text-gray-300 uppercase tracking-wide flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Seu nome *</span>
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome"
                className="h-14 text-lg bg-white/5 border-white/20 text-white placeholder:text-gray-500 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                maxLength={40}
              />
            </div>
            
            <Button 
              onClick={handleStart}
              disabled={!name.trim()}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Começar
            </Button>
          </CardContent>
        </div>
        
        {/* Card de regras */}
        <div className="glass-card p-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-400" />
              <span>Como Jogar</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">5</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">5 Níveis Progressivos</h4>
                  <p className="text-sm text-gray-400">De 3 até 7 discos coloridos</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Objetivo</h4>
                  <p className="text-sm text-gray-400">Mover todos os discos para o pino C</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Tempo Limite</h4>
                  <p className="text-sm text-gray-400">10 minutos para completar todos os níveis</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Pontuação</h4>
                  <p className="text-sm text-gray-400">Base + bônus eficiência + bônus tempo</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-4 mt-4">
              <h4 className="font-semibold text-white mb-2">⚡ Regras Importantes</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Mover apenas 1 disco por vez</li>
                <li>• Nunca colocar disco maior sobre menor</li>
                <li>• Use o menor número de movimentos possível</li>
              </ul>
            </div>
          </CardContent>
        </div>
        
        {/* Botão ranking */}
        <div className="flex flex-col space-y-4">
          <Button 
            variant="outline" 
            onClick={() => router.push('/ranking')}
            className="w-full h-12 px-8 bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Trophy className="w-4 h-4" />
            <span>Ver Ranking</span>
          </Button>
        </div>
      </div>
    </div>
  );
}