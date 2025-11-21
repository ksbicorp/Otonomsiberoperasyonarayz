import { useEffect, useState } from 'react';
import matrixBg from 'figma:asset/61bef0e19d3eeede28d3daef30cce7ab726e97b2.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      {/* Matrix Background */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(${matrixBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Logo M */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-[#ffd700] via-[#d4af37] to-[#b8941e] flex items-center justify-center shadow-2xl">
            <span 
              className="text-7xl text-black tracking-tighter"
              style={{ fontFamily: 'Georgia, serif', fontWeight: 'bold' }}
            >
              M
            </span>
          </div>
        </div>

        {/* Midas Pro Text */}
        <h1 
          className="text-6xl mb-4 bg-gradient-to-r from-[#ffd700] via-[#ffed4e] to-[#ffd700] bg-clip-text text-transparent animate-pulse"
          style={{ 
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            letterSpacing: '0.05em',
            textShadow: '0 0 40px rgba(255, 215, 0, 0.5)'
          }}
        >
          Midas Pro
        </h1>

        <p className="text-sm text-gray-400 mb-12 tracking-widest">
          AUTONOMOUS CYBER OPERATIONS COMMAND CENTER
        </p>

        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#d4af37] to-[#ffd700] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex justify-between text-xs text-gray-500">
            <span>Initializing Systems</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
