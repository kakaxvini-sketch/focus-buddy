
import React, { useState, useEffect, useRef } from 'react';
import { Planet } from './components/Planet.tsx';
import { Timer } from './components/Timer.tsx';
import { EnergyBar } from './components/EnergyBar.tsx';
import { Stats } from './components/Stats.tsx';
import { Motivation } from './components/Motivation.tsx';
import { StarsBackground } from './components/StarsBackground.tsx';

const FOCUS_TIME = 25 * 60; // 25 minutes
const ENERGY_GAIN = 10;
const ENERGY_LOSS = 5;

const App: React.FC = () => {
  const [energy, setEnergy] = useState<number>(100);
  const [timeLeft, setTimeLeft] = useState<number>(FOCUS_TIME);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [sessionsCompleted, setSessionsCompleted] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [motivationMessage, setMotivationMessage] = useState<string>("Ready to grow your planet?");
  const [showNotification, setShowNotification] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleStart = () => {
    setIsActive(true);
    setMotivationMessage("The cosmic energy is gathering...");
  };

  const handlePause = () => {
    setIsActive(false);
    setMotivationMessage("Taking a breath in the void.");
  };

  const handleReset = () => {
    if (isActive && timeLeft < FOCUS_TIME) {
      setEnergy((prev) => Math.max(0, prev - ENERGY_LOSS));
      setMotivationMessage("Session aborted. Energy depleted -5.");
    }
    setIsActive(false);
    setTimeLeft(FOCUS_TIME);
  };

  const handleComplete = () => {
    setIsActive(false);
    setTimeLeft(FOCUS_TIME);
    setEnergy((prev) => Math.min(100, prev + ENERGY_GAIN));
    setSessionsCompleted((prev) => prev + 1);
    setStreak((prev) => prev + 1);
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  // Calculate session progress for visual feedback (0 to 1)
  const progress = (FOCUS_TIME - timeLeft) / FOCUS_TIME;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <StarsBackground />

      <div className="z-10 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side: Visual Planet Area */}
        <div className="flex flex-col items-center space-y-6 animate-float">
          <div className="relative">
            <Planet energy={energy} progress={progress} isActive={isActive} />
          </div>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 mb-2">
              Focus Planet
            </h1>
            <p className="text-blue-200/70 italic text-sm md:text-base">
              {energy > 80 ? "Your ecosystem is thriving!" : 
               energy > 40 ? "Life is finding a way." : 
               "Your planet needs more energy."}
            </p>
          </div>
          <EnergyBar energy={energy} />
        </div>

        {/* Right Side: Control Panel */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl flex flex-col space-y-8">
          <Stats 
            sessions={sessionsCompleted} 
            streak={streak} 
          />
          
          <Timer 
            timeLeft={timeLeft} 
            isActive={isActive} 
            onStart={handleStart} 
            onPause={handlePause} 
            onReset={handleReset} 
          />

          <Motivation 
            energy={energy} 
            message={motivationMessage} 
            setMessage={setMotivationMessage}
          />
        </div>
      </div>

      {/* Completion Notification */}
      {showNotification && (
        <div className="fixed bottom-10 right-10 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl border-2 border-white/50 animate-bounce z-50 flex items-center gap-3">
          <i className="fa-solid fa-circle-check text-2xl"></i>
          <div>
            <p className="font-bold text-lg">Focus Complete!</p>
            <p className="text-sm opacity-90">+10 Planet Energy</p>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="absolute bottom-4 text-white/30 text-xs">
        Stay focused to keep your planet alive.
      </div>
    </div>
  );
};

export default App;
