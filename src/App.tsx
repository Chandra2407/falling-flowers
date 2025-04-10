import React, { useEffect, useState } from 'react';
import { Flower2 } from 'lucide-react';
import girlImage from './girl.png';
import ReactPlayer from 'react-player';

interface Flower {
  id: number;
  x: number;
  y: number;
  rotation: number;
  size: number;
  speed: number;
}

function App() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);

  const handleMusicToggle = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  useEffect(() => {
    // Create initial flowers
    const initialFlowers = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -50 - Math.random() * 500, // Start above viewport
      rotation: Math.random() * 360,
      size: 20 + Math.random() * 30,
      speed: 1 + Math.random() * 2
    }));
    setFlowers(initialFlowers);

    // Animation loop
    let animationFrameId: number;
    const animateFlowers = () => {
      setFlowers(prevFlowers =>
        prevFlowers.map(flower => ({
          ...flower,
          y: flower.y + flower.speed,
          rotation: flower.rotation + 0.5,
          // Reset flower position when it goes below viewport
          ...(flower.y > window.innerHeight
            ? {
              y: -50,
              x: Math.random() * window.innerWidth,
              speed: 1 + Math.random() * 2
            }
            : {})
        }))
      );
      animationFrameId = requestAnimationFrame(animateFlowers);
    };

    animationFrameId = requestAnimationFrame(animateFlowers);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-200 to-sky-400">
      {/* Falling flowers and sorry text */}
      {flowers.map((flower, index) => (
        <div
          key={flower.id}
          className="absolute transition-transform"
          style={{
            left: `${flower.x}px`,
            top: `${flower.y}px`,
            transform: `rotate(${flower.rotation}deg)`,
          }}
        >
          {index % 2 === 0 ? (
            <span
              className="text-pink-500 text-sm font-bold"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            >
              Sorry
            </span>
          ) : (
            <Flower2
              className="text-pink-300"
              size={flower.size}
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            />
          )}
        </div>
      ))}

      {/* Ground with grass */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-green-600 to-green-500" />

      {/* Image placeholder */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[150px] h-[200px]  rounded-lg flex items-center justify-center">
        <img src={girlImage} alt="" />
      </div>

      {/* Button to start music if autoplay is blocked */}
      <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2">
        <button
          onClick={handleMusicToggle}
          className="px-4 py-2 bg-gradient-to-t from-green-600 to-green-500 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform border border-green-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.25l13.5 6.75-13.5 6.75V5.25z"
            />
          </svg>
        </button>
      </div>

      {/* Background music */}
      <ReactPlayer
        url="https://www.youtube.com/watch?v=OyA3QmUL_x4" // Replace with your desired YouTube URL
        playing={isMusicPlaying}
        loop
        volume={0.5}
        width="0"
        height="0"
      />
    </div>
  );
}

export default App;