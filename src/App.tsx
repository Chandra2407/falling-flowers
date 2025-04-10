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
    };

    const interval = setInterval(animateFlowers, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-200 to-sky-400">
      {/* Falling flowers */}
      {flowers.map(flower => (
        <div
          key={flower.id}
          className="absolute transition-transform"
          style={{
            left: `${flower.x}px`,
            top: `${flower.y}px`,
            transform: `rotate(${flower.rotation}deg)`,
          }}
        >
          <Flower2
            className="text-pink-300"
            size={flower.size}
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
          />
        </div>
      ))}

      {/* Ground with grass */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-green-600 to-green-500" />

      {/* Image placeholder */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[150px] h-[200px]  rounded-lg flex items-center justify-center">
        <img src={girlImage} alt="" />
      </div>

      {/* Background music */}
      <ReactPlayer
        url="https://www.youtube.com/watch?v=OyA3QmUL_x4" // Replace with your desired YouTube URL
        playing
        loop
        volume={0.5}
        width="0"
        height="0"
      />
    </div>
  );
}

export default App;