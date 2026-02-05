
import React, { useEffect, useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";

interface MotivationProps {
  energy: number;
  message: string;
  setMessage: (msg: string) => void;
}

export const Motivation: React.FC<MotivationProps> = ({ energy, message, setMessage }) => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchMotivation = useCallback(async () => {
    // Only fetch if API key is provided, otherwise stay with default messages
    if (!process.env.API_KEY) return;

    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a Cosmic Guide for a student focus app. 
                   Current planet energy is ${energy}/100. 
                   Provide a short, one-sentence cosmic/space themed motivational quote 
                   to encourage the user to stay focused. Keep it punchy and student-friendly.`,
        config: {
          temperature: 0.8,
          topP: 0.9,
        }
      });
      if (response.text) {
        setMessage(response.text.trim());
      }
    } catch (error) {
      console.error("Gemini failed to inspire:", error);
    } finally {
      setIsLoading(false);
    }
  }, [energy, setMessage]);

  // Update motivation periodically or when energy jumps significantly
  useEffect(() => {
    const timer = setInterval(() => {
      fetchMotivation();
    }, 300000); // Every 5 minutes

    return () => clearInterval(timer);
  }, [fetchMotivation]);

  return (
    <div className="bg-indigo-900/30 rounded-2xl p-4 border border-indigo-500/20 text-center min-h-[80px] flex items-center justify-center">
      {isLoading ? (
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
      ) : (
        <p className="text-blue-100 text-sm md:text-base leading-relaxed italic">
          "{message}"
        </p>
      )}
    </div>
  );
};
