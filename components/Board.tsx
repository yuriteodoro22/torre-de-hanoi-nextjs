'use client';

import { useGameStore } from '@/store/game';
import { getDiskWidth } from '@/lib/hanoi';
import { cn } from '@/lib/utils';

const PIN_LABELS = ['A', 'B', 'C'];

export default function Board() {
  const { pinos, selectedPino, selectPino } = useGameStore();
  
  return (
    <div className="flex-1 flex flex-col justify-center p-6 relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/20 rounded-full animate-float" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/20 rounded-full animate-float-delayed" />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-cyan-400/20 rounded-full animate-float-slow" />
      </div>

      <div className="max-w-4xl mx-auto w-full">
        {/* Game Board */}
        <div className="flex justify-center gap-8 mb-12">
          {pinos.map((pino, index) => (
            <div
              key={index}
              className={cn(
                "relative cursor-pointer transition-all duration-500 group",
                "w-32 h-80 flex flex-col justify-end items-center",
                selectedPino === index && "scale-105",
                "hover:scale-[1.02] active:scale-[0.98]"
              )}
              onClick={() => selectPino(index)}
            >
              {/* Base platform */}
              <div className="absolute bottom-0 w-36 h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg shadow-2xl border border-gray-500/30" />
              
              {/* Central rod */}
              <div className="absolute bottom-4 w-3 h-72 bg-gradient-to-t from-gray-400 via-gray-300 to-gray-200 rounded-full shadow-xl border border-gray-400/50" />
              
              {/* Rod glow effect */}
              <div className="absolute bottom-4 w-3 h-72 bg-gradient-to-t from-transparent via-white/10 to-white/20 rounded-full" />
              
              {/* Disks container */}
              <div className="absolute bottom-4 flex flex-col-reverse items-center space-y-reverse space-y-1 z-10">
                {pino.map((disk, diskIndex) => (
                  <div
                    key={disk.id}
                    className={cn(
                      "h-8 rounded-xl shadow-2xl transition-all duration-700 border-2 border-black/20",
                      "hover:brightness-110 hover:scale-105 cursor-pointer",
                      "relative overflow-hidden"
                    )}
                    style={{
                      backgroundColor: disk.color,
                      width: `${getDiskWidth(disk.size)}px`,
                      minWidth: '48px',
                      opacity: selectedPino === index ? 0.9 : 1,
                      transform: selectedPino === index ? 'translateY(-2px)' : 'translateY(0)',
                    }}
                  >
                    {/* Disk shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-xl" />
                    
                    {/* Disk inner glow */}
                    <div className="absolute inset-1 bg-gradient-to-b from-white/20 to-transparent rounded-lg" />
                  </div>
                ))}
              </div>
              
              {/* Pin label */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <div className={cn(
                  "w-14 h-14 rounded-2xl backdrop-blur-xl border border-white/10 flex items-center justify-center transition-all duration-300",
                  "bg-gradient-to-br from-white/5 to-white/10 shadow-2xl",
                  selectedPino === index 
                    ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-400/30 shadow-blue-500/20" 
                    : "hover:bg-gradient-to-br hover:from-white/10 hover:to-white/15"
                )}>
                  <span className={cn(
                    "text-2xl font-bold transition-all duration-300",
                    selectedPino === index
                      ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                      : "text-gray-300 group-hover:text-white"
                  )}>
                    {PIN_LABELS[index]}
                  </span>
                </div>
              </div>
              
              {/* Selection glow */}
              {selectedPino === index && (
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse-glow blur-xl" />
              )}
              
              {/* Hover indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Instructions */}
        <div className="text-center mt-16">
          <div className="inline-block backdrop-blur-xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10 rounded-2xl p-6 shadow-2xl">
            <p className="text-xl font-medium">
              {selectedPino !== null ? (
                <span className="flex items-center justify-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Toque no pino de destino
                  </span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    Toque no pino de origem
                  </span>
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}