
import React from 'react';

interface StatsProps {
  sessions: number;
  streak: number;
}

export const Stats: React.FC<StatsProps> = ({ sessions, streak }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col items-center">
        <span className="text-xs text-blue-200/50 uppercase tracking-widest mb-1">Total Sessions</span>
        <span className="text-2xl font-bold">{sessions}</span>
      </div>
      <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col items-center">
        <span className="text-xs text-blue-200/50 uppercase tracking-widest mb-1">Focus Streak</span>
        <span className="text-2xl font-bold text-amber-400">
          <i className="fa-solid fa-fire-flame-curved mr-2"></i>{streak}
        </span>
      </div>
    </div>
  );
};
