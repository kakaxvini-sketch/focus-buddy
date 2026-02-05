
import React from 'react';

interface EnergyBarProps {
  energy: number;
}

export const EnergyBar: React.FC<EnergyBarProps> = ({ energy }) => {
  return (
    <div className="w-full max-w-sm px-4">
      <div className="flex justify-between mb-2 px-1">
        <span className="text-sm font-medium text-blue-200">Planet Energy</span>
        <span className="text-sm font-bold text-white">{energy}%</span>
      </div>
      <div className="h-4 w-full bg-white/5 rounded-full p-1 overflow-hidden border border-white/10">
        <div 
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: `${energy}%`,
            background: `linear-gradient(90deg, #3b82f6 ${Math.max(0, energy-30)}%, #10b981 100%)`,
            boxShadow: `0 0 15px rgba(59, 130, 246, 0.5)`
          }}
        ></div>
      </div>
    </div>
  );
};
