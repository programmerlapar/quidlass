import React from 'react';
import './Background.css';

type BackgroundType = 'gradient' | 'image1' | 'image2' | 'image3';

interface BackgroundProps {
  backgroundType?: BackgroundType;
}

/**
 * Complex background component with SVG patterns and gradients
 * Creates a visually rich background to showcase the liquid glass effect
 * Supports both animated gradient and static graffiti-style images
 */
export const Background: React.FC<BackgroundProps> = ({ backgroundType = 'gradient' }) => {
  // Graffiti-style image URLs (using placeholder images - user can replace with actual images)
  const backgroundImages = {
    image1: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1920&h=1080&fit=crop',
    image2: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=1920&h=1080&fit=crop',
    image3: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1920&h=1080&fit=crop',
  };

  if (backgroundType !== 'gradient') {
    const imageUrl = backgroundImages[backgroundType];
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          overflow: 'hidden',
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
    );
  }
  return (
    <div
      className="background-gradient"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
        backgroundSize: '400% 400%',
      }}
    >
      
      {/* Animated circles */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: 'rgba(255, 255, 255, 0.3)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'rgba(255, 255, 255, 0)', stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="grad2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: 'rgba(255, 192, 203, 0.4)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'rgba(255, 192, 203, 0)', stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="grad3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: 'rgba(173, 216, 230, 0.3)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'rgba(173, 216, 230, 0)', stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        
        {/* Large animated circles */}
        <circle
          cx="20%"
          cy="30%"
          r="15%"
          fill="url(#grad1)"
          className="background-circle"
          style={{ animationDelay: '0s' }}
        />
        <circle
          cx="80%"
          cy="70%"
          r="20%"
          fill="url(#grad2)"
          className="background-circle"
          style={{ animationDelay: '2s', animationDuration: '10s' }}
        />
        <circle
          cx="50%"
          cy="50%"
          r="12%"
          fill="url(#grad3)"
          className="background-circle"
          style={{ animationDelay: '4s', animationDuration: '12s' }}
        />
        <circle
          cx="10%"
          cy="80%"
          r="18%"
          fill="url(#grad1)"
          className="background-circle"
          style={{ animationDelay: '1s', animationDuration: '9s' }}
        />
        <circle
          cx="90%"
          cy="20%"
          r="14%"
          fill="url(#grad2)"
          className="background-circle"
          style={{ animationDelay: '3s', animationDuration: '11s' }}
        />
      </svg>
      
      
      {/* Geometric patterns */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0.3,
        }}
      >
        <defs>
          <pattern
            id="grid"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        const x = Math.random() * 100 - 50;
        const y = Math.random() * 100 - 50;
        
        return (
          <div
            key={i}
            className="background-particle"
            style={{
              position: 'absolute',
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.6)',
              left: `${left}%`,
              top: `${top}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              '--particle-x': `${x}px`,
              '--particle-y': `${y}px`,
            } as React.CSSProperties}
          />
        );
      })}
      
    </div>
  );
};

