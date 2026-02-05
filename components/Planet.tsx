
import React from 'react';

interface PlanetProps {
  energy: number;
  progress: number;
  isActive: boolean;
}

export const Planet: React.FC<PlanetProps> = ({ energy, progress, isActive }) => {
  const size = 180 + (energy * 1.4);
  const saturation = energy;
  const brightness = 20 + (energy * 0.8);
  
  const planetStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    background: `radial-gradient(circle at 30% 30%, 
      hsl(140, ${saturation}%, ${brightness + 10}%), 
      hsl(200, ${saturation}%, ${brightness - 10}%))`,
    boxShadow: `
      0 0 40px hsl(180, ${saturation}%, 40%),
      inset -20px -20px 50px rgba(0,0,0,0.5),
      inset 10px 10px 30px rgba(255,255,255,0.2)
    `,
    transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const atmosphereStyle: React.CSSProperties = {
    position: 'absolute',
    top: '-15%',
    left: '-15%',
    width: '130%',
    height: '130%',
    borderRadius: '50%',
    background: `radial-gradient(circle, hsla(180, ${saturation}%, 60%, ${energy / 200}) 0%, transparent 70%)`,
    transition: 'all 1.5s ease',
  };

  // Progress Ring Calculation
  const ringSize = size + 40;
  const strokeWidth = 6;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - progress * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: ringSize, height: ringSize }}>
      {/* Progress Ring SVG */}
      <svg className="absolute inset-0 -rotate-90 transform" width={ringSize} height={ringSize}>
        <circle
          cx={ringSize / 2}
          cy={ringSize / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={ringSize / 2}
          cy={ringSize / 2}
          r={radius}
          fill="transparent"
          stroke={isActive ? "rgba(34, 211, 238, 0.6)" : "rgba(34, 211, 238, 0.2)"}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-linear"
          style={{ filter: isActive ? 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))' : 'none' }}
        />
      </svg>

      <div style={atmosphereStyle} className="pointer-events-none"></div>
      
      <div 
        style={planetStyle} 
        className="rounded-full relative z-10 flex items-center justify-center overflow-hidden"
      >
        <div 
          className="absolute w-full h-full opacity-30" 
          style={{
            backgroundImage: `radial-gradient(ellipse at 70% 20%, #fff 2%, transparent 10%), 
                            radial-gradient(ellipse at 20% 60%, #fff 3%, transparent 15%)`,
            mixBlendMode: 'overlay'
          }}
        ></div>
        
        {energy > 60 && (
          <div className="absolute inset-0 opacity-40 animate-[spin_60s_linear_infinite]">
             <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="10 20" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="5 15" />
             </svg>
          </div>
        )}
      </div>
    </div>
  );
};
