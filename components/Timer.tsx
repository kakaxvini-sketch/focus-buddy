
import React from 'react';

interface TimerProps {
  timeLeft: number;
  isActive: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export const Timer: React.FC<TimerProps> = ({ isActive, onStart, onPause, onReset }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="w-full flex gap-4">
        {!isActive ? (
          <button 
            onClick={onStart}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 py-5 rounded-2xl font-bold shadow-lg shadow-blue-900/40 transition-all flex items-center justify-center gap-3 text-lg"
          >
            <i className="fa-solid fa-bolt-lightning text-xl"></i> Initiate Focus
          </button>
        ) : (
          <button 
            onClick={onPause}
            className="flex-1 bg-amber-500 hover:bg-amber-400 py-5 rounded-2xl font-bold shadow-lg shadow-amber-900/40 transition-all flex items-center justify-center gap-3 text-lg"
          >
            <i className="fa-solid fa-pause text-xl"></i> Hold Focus
          </button>
        )}
        
        <button 
          onClick={onReset}
          className="px-8 bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-400 py-5 rounded-2xl font-bold border border-white/10 hover:border-red-500/30 transition-all flex items-center justify-center"
          title="Reset cosmic energy collection"
        >
          <i className="fa-solid fa-power-off text-xl"></i>
        </button>
      </div>
      <p className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-medium pt-2">
        {isActive ? "Energy Gathering in Progress" : "System Ready for Focus"}
      </p>
    </div>
  );
};
