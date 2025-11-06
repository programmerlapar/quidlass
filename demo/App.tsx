import { useState, useCallback } from 'react';
import type { LiquidGlassProps } from 'quidlass';
import { LiquidGlass } from 'quidlass';
import { Background } from './Background';
import { ControlPanel } from './ControlPanel';
import { useCases } from './useCases';
import './App.css';

type BackgroundType = 'gradient' | 'image1' | 'image2' | 'image3';

function App() {
  const [backgroundType, setBackgroundType] = useState<BackgroundType>('gradient');
  const [props, setProps] = useState<LiquidGlassProps>({
    borderRadius: 20,
    blur: 10,
    contrast: 1.2,
    brightness: 1.05,
    saturation: 1.1,
    shadowIntensity: 0.25,
    elasticity: 0.6,
    swirlIntensity: 8,
    swirlScale: 1.0,
    swirlRadius: 1.0,
    edgeThicknessPx: 12,
    swirlEdges: 'all',
    zIndex: 9999,
    textShadow: true,
    shiningBorder: false,
    shiningIntensity: 0.8,
  });

  const handlePropChange = useCallback((propName: keyof LiquidGlassProps, value: any) => {
    setProps((prev: LiquidGlassProps) => ({
      ...prev,
      [propName]: value,
    }));
  }, []);

  return (
    <div className="app">
      <Background backgroundType={backgroundType} />
      
      <div className="app-container">
        {/* Left side - Use cases */}
        <div className="use-cases-section">
          <h1 className="title">Quidlass Demo</h1>
          <p className="subtitle">Liquid Glassmorphism Component Showcase</p>
          
          {/* Background Type Selector */}
          <div className="background-selector">
            <span className="background-selector-label">Background:</span>
            <div className="background-buttons">
              <button
                className={`background-button ${backgroundType === 'gradient' ? 'active' : ''}`}
                onClick={() => setBackgroundType('gradient')}
              >
                Animated Gradient
              </button>
              <button
                className={`background-button ${backgroundType === 'image1' ? 'active' : ''}`}
                onClick={() => setBackgroundType('image1')}
              >
                Graffiti 1
              </button>
              <button
                className={`background-button ${backgroundType === 'image2' ? 'active' : ''}`}
                onClick={() => setBackgroundType('image2')}
              >
                Graffiti 2
              </button>
              <button
                className={`background-button ${backgroundType === 'image3' ? 'active' : ''}`}
                onClick={() => setBackgroundType('image3')}
              >
                Graffiti 3
              </button>
            </div>
          </div>
          
          <div className="use-cases-grid">
            {useCases.map((useCase, index) => (
              <div key={index} className="use-case-item">
                <h3 className="use-case-title">{useCase.title}</h3>
                <div className="use-case-content">
                  <useCase.component {...props} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Controls */}
        <div className="controls-section">
          <ControlPanel 
            props={props} 
            onPropChange={handlePropChange}
            backgroundType={backgroundType}
            onBackgroundTypeChange={setBackgroundType}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

