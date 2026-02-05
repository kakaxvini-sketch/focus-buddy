
import React, { useMemo } from 'react';

export const StarsBackground: React.FC = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      opacity: Math.random() * 0.7 + 0.3,
      delay: `${Math.random() * 5}s`
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDelay: star.delay
          }}
        />
      ))}
      {/* Distant nebulas */}
      <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-purple-900/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-blue-900/10 rounded-full blur-[100px]"></div>
    </div>
  );
};
