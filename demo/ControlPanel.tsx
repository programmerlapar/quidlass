import React, { useState } from 'react';
import { LiquidGlassProps } from 'quidlass';
import './ControlPanel.css';

type BackgroundType = 'gradient' | 'image1' | 'image2' | 'image3';

interface ControlPanelProps {
  props: LiquidGlassProps;
  onPropChange: (propName: keyof LiquidGlassProps, value: any) => void;
  backgroundType?: BackgroundType;
  onBackgroundTypeChange?: (type: BackgroundType) => void;
}

/**
 * Control panel component for adjusting LiquidGlass props
 * Provides sliders, dropdowns, and radio buttons for all props
 */
export const ControlPanel: React.FC<ControlPanelProps> = ({ 
  props, 
  onPropChange, 
  backgroundType = 'gradient',
  onBackgroundTypeChange 
}) => {
  const [editorMode, setEditorMode] = useState(false);
  const handleSliderChange = (propName: keyof LiquidGlassProps) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value);
    onPropChange(propName, value);
  };

  const handleNumberInput = (propName: keyof LiquidGlassProps) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value) || 0;
    onPropChange(propName, value);
  };

  const handleCheckboxChange = (propName: keyof LiquidGlassProps) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onPropChange(propName, e.target.checked);
  };

  const handleTextShadowChange = (value: string) => {
    if (value === 'false') {
      onPropChange('textShadow', false);
    } else if (value === 'true') {
      onPropChange('textShadow', true);
    } else {
      onPropChange('textShadow', value);
    }
  };

  return (
    <div className={`control-panel ${editorMode ? 'editor-mode' : ''}`}>
      <div className="control-panel-header">
        <h2 className="control-panel-title">Controls</h2>
        <button
          onClick={() => setEditorMode(!editorMode)}
          className="editor-toggle-button"
        >
          {editorMode ? 'Show Controls' : 'Show Code Editor'}
        </button>
      </div>

      {/* Code Display at Top */}
      {editorMode && (
        <div className="code-display code-display-top">
          <div className="code-header">
            <span>Current Configuration</span>
            <button
              onClick={() => {
                const code = generateCode(props);
                navigator.clipboard.writeText(code);
                alert('Code copied to clipboard!');
              }}
              className="code-copy-button"
            >
              Copy
            </button>
          </div>
          <pre className="code-content">
            <code>{generateCode(props)}</code>
          </pre>
        </div>
      )}

      {/* Controls */}
      {!editorMode && (
        <>
      
      <div className="control-group">
        <label className="control-label">
          Border Radius: {props.borderRadius}px
        </label>
        <input
          type="range"
          min="0"
          max="50"
          step="1"
          value={props.borderRadius || 20}
          onChange={handleSliderChange('borderRadius')}
          className="control-slider"
        />
        <input
          type="number"
          min="0"
          max="50"
          value={props.borderRadius || 20}
          onChange={handleNumberInput('borderRadius')}
          className="control-input"
        />
      </div>

      <div className="control-group">
        <label className="control-label">
          Blur: {props.blur}px
        </label>
        <input
          type="range"
          min="0"
          max="30"
          step="0.1"
          value={props.blur || 0.25}
          onChange={handleSliderChange('blur')}
          className="control-slider"
        />
        <input
          type="number"
          min="0"
          max="30"
          step="0.1"
          value={props.blur || 0.25}
          onChange={handleNumberInput('blur')}
          className="control-input"
        />
      </div>

      <div className="control-group">
        <label className="control-label">
          Contrast: {props.contrast}
        </label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.01"
          value={props.contrast || 1.2}
          onChange={handleSliderChange('contrast')}
          className="control-slider"
        />
        <input
          type="number"
          min="0.5"
          max="2"
          step="0.01"
          value={props.contrast || 1.2}
          onChange={handleNumberInput('contrast')}
          className="control-input"
        />
      </div>

      <div className="control-group">
        <label className="control-label">
          Brightness: {props.brightness}
        </label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.01"
          value={props.brightness || 1.05}
          onChange={handleSliderChange('brightness')}
          className="control-slider"
        />
        <input
          type="number"
          min="0.5"
          max="2"
          step="0.01"
          value={props.brightness || 1.05}
          onChange={handleNumberInput('brightness')}
          className="control-input"
        />
      </div>

      <div className="control-group">
        <label className="control-label">
          Saturation: {props.saturation}
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.01"
          value={props.saturation || 1.1}
          onChange={handleSliderChange('saturation')}
          className="control-slider"
        />
        <input
          type="number"
          min="0"
          max="2"
          step="0.01"
          value={props.saturation || 1.1}
          onChange={handleNumberInput('saturation')}
          className="control-input"
        />
      </div>

      <div className="control-group">
        <label className="control-label">
          Shadow Intensity: {props.shadowIntensity}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={props.shadowIntensity || 0.25}
          onChange={handleSliderChange('shadowIntensity')}
          className="control-slider"
        />
        <input
          type="number"
          min="0"
          max="1"
          step="0.01"
          value={props.shadowIntensity || 0.25}
          onChange={handleNumberInput('shadowIntensity')}
          className="control-input"
        />
      </div>


      <div className="control-group">
        <label className="control-label">
          Swirl Intensity: {props.swirlIntensity}
        </label>
        <input
          type="range"
          min="0"
          max="20"
          step="0.1"
          value={props.swirlIntensity || 8}
          onChange={handleSliderChange('swirlIntensity')}
          className="control-slider"
        />
        <input
          type="number"
          min="0"
          max="20"
          step="0.1"
          value={props.swirlIntensity || 8}
          onChange={handleNumberInput('swirlIntensity')}
          className="control-input"
        />
      </div>

      <div className="control-group">
        <label className="control-label">
          Swirl Scale: {props.swirlScale}
        </label>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          value={props.swirlScale || 1.0}
          onChange={handleSliderChange('swirlScale')}
          className="control-slider"
        />
        <input
          type="number"
          min="0.1"
          max="3"
          step="0.1"
          value={props.swirlScale || 1.0}
          onChange={handleNumberInput('swirlScale')}
          className="control-input"
        />
      </div>

      <div className="control-group">
        <label className="control-label">
          Swirl Radius: {props.swirlRadius}
        </label>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          value={props.swirlRadius || 1.0}
          onChange={handleSliderChange('swirlRadius')}
          className="control-slider"
        />
        <input
          type="number"
          min="0.1"
          max="3"
          step="0.1"
          value={props.swirlRadius || 1.0}
          onChange={handleNumberInput('swirlRadius')}
          className="control-input"
        />
      </div>

      <div className="control-group">
        <label className="control-label">
          Edge Thickness: {props.edgeThicknessPx}px
        </label>
        <input
          type="range"
          min="1"
          max="50"
          step="1"
          value={props.edgeThicknessPx || 12}
          onChange={handleSliderChange('edgeThicknessPx')}
          className="control-slider"
        />
        <input
          type="number"
          min="1"
          max="50"
          step="1"
          value={props.edgeThicknessPx || 12}
          onChange={handleNumberInput('edgeThicknessPx')}
          className="control-input"
        />
      </div>

      <div className="control-group">
        <label className="control-label">
          Swirl Offset: {props.swirlOffset}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={props.swirlOffset ?? 0.0}
          onChange={handleSliderChange('swirlOffset')}
          className="control-slider"
        />
        <input
          type="number"
          min="0"
          max="1"
          step="0.01"
          value={props.swirlOffset ?? 0.0}
          onChange={handleNumberInput('swirlOffset')}
          className="control-input"
        />
        <small style={{ display: 'block', marginTop: '0.25rem', color: '#888', fontSize: '0.85rem' }}>
          0.0 = no gap (edges), 1.0 = max gap (center)
        </small>
      </div>

      <div className="control-group">
        <label className="control-label">
          Swirl Edges:
        </label>
        <div className="control-checkboxes">
          <label className="control-checkbox-label">
            <input
              type="checkbox"
              checked={props.swirlEdges === 'all'}
              onChange={(e) => {
                onPropChange('swirlEdges', e.target.checked ? 'all' : []);
              }}
              className="control-checkbox"
            />
            <span>All Edges</span>
          </label>
          {(['top-left', 'top-right', 'bottom-right', 'bottom-left'] as const).map((edge) => {
            const isChecked = props.swirlEdges === 'all' || (Array.isArray(props.swirlEdges) && props.swirlEdges.includes(edge));
            return (
              <label key={edge} className="control-checkbox-label">
                <input
                  type="checkbox"
                  checked={isChecked}
                  disabled={props.swirlEdges === 'all'}
                  onChange={(e) => {
                    if (props.swirlEdges === 'all') return;
                    const current = Array.isArray(props.swirlEdges) ? props.swirlEdges : [];
                    if (e.target.checked) {
                      onPropChange('swirlEdges', [...current, edge]);
                    } else {
                      const newEdges = current.filter(ed => ed !== edge);
                      onPropChange('swirlEdges', newEdges.length === 0 ? 'all' : newEdges);
                    }
                  }}
                  className="control-checkbox"
                />
                <span>{edge.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-')}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="control-group">
        <label className="control-label">
          Z-Index: {props.zIndex}
        </label>
        <input
          type="range"
          min="0"
          max="10000"
          step="100"
          value={props.zIndex || 9999}
          onChange={handleSliderChange('zIndex')}
          className="control-slider"
        />
        <input
          type="number"
          min="0"
          max="10000"
          step="100"
          value={props.zIndex || 9999}
          onChange={handleNumberInput('zIndex')}
          className="control-input"
        />
      </div>

      <div className="control-group">
        <label className="control-label">Text Shadow</label>
        <select
          value={
            props.textShadow === false
              ? 'false'
              : props.textShadow === true
              ? 'true'
              : typeof props.textShadow === 'string'
              ? 'custom'
              : 'true'
          }
          onChange={(e) => handleTextShadowChange(e.target.value)}
          className="control-select"
        >
          <option value="false">None</option>
          <option value="true">Default</option>
          <option value="custom">Custom</option>
        </select>
        {typeof props.textShadow === 'string' && props.textShadow !== 'true' && props.textShadow !== 'false' && (
          <input
            type="text"
            value={props.textShadow}
            onChange={(e) => onPropChange('textShadow', e.target.value)}
            placeholder="e.g., 0 2px 4px rgba(0,0,0,0.5)"
            className="control-input"
            style={{ marginTop: '0.5rem' }}
          />
        )}
      </div>

      <div className="control-group">
        <label className="control-label">Tint Color</label>
        <input
          type="color"
          value={
            props.tintColor
              ? (() => {
                  // Extract rgb from rgba string
                  const rgbaMatch = props.tintColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                  if (rgbaMatch) {
                    const r = parseInt(rgbaMatch[1], 10);
                    const g = parseInt(rgbaMatch[2], 10);
                    const b = parseInt(rgbaMatch[3], 10);
                    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
                  }
                  return '#ffffff';
                })()
              : '#ffffff'
          }
          onChange={(e) => {
            // Convert hex to rgba with opacity
            const hex = e.target.value;
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            // Preserve existing alpha if available, otherwise use 0.15
            const existingAlpha = props.tintColor?.match(/rgba?\([\d\s,]+,\s*([\d.]+)\)/)?.[1] || '0.15';
            onPropChange('tintColor', `rgba(${r}, ${g}, ${b}, ${existingAlpha})`);
          }}
          className="control-input"
          style={{ width: '100%', height: '40px', marginTop: '0.5rem' }}
        />
        <input
          type="text"
          value={props.tintColor || ''}
          onChange={(e) => onPropChange('tintColor', e.target.value || undefined)}
          placeholder="e.g., rgba(34, 197, 94, 0.15) or leave empty"
          className="control-input"
          style={{ marginTop: '0.5rem' }}
        />
        {props.tintColor && (
          <button
            onClick={() => onPropChange('tintColor', undefined)}
            className="control-button"
            style={{ marginTop: '0.5rem', width: '100%' }}
          >
            Clear Tint
          </button>
        )}
      </div>

      <div className="control-group">
        <label className="control-label">
          <input
            type="checkbox"
            checked={props.shiningBorder || false}
            onChange={handleCheckboxChange('shiningBorder')}
            className="control-checkbox"
          />
          Shining Border
        </label>
      </div>

      {props.shiningBorder && (
        <div className="control-group">
          <label className="control-label">
            Shining Intensity: {props.shiningIntensity}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={props.shiningIntensity || 0.8}
            onChange={handleSliderChange('shiningIntensity')}
            className="control-slider"
          />
          <input
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={props.shiningIntensity || 0.8}
            onChange={handleNumberInput('shiningIntensity')}
            className="control-input"
          />
        </div>
      )}
        </>
      )}
    </div>
  );
};

/**
 * Generate code string from current props
 */
function generateCode(props: LiquidGlassProps): string {
  const propsArray: string[] = [];
  
  Object.entries(props).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    
    if (typeof value === 'boolean') {
      if (value) propsArray.push(`  ${key}={${value}}`);
    } else if (typeof value === 'string') {
      // For tintColor and textColor, use curly braces for CSS color values
      if (key === 'tintColor' || key === 'textColor') {
        propsArray.push(`  ${key}={${JSON.stringify(value)}}`);
      } else {
        propsArray.push(`  ${key}="${value}"`);
      }
    } else if (typeof value === 'number') {
      // Only include if different from default
      const defaults: Record<string, number> = {
        borderRadius: 20,
        blur: 0.25,
        contrast: 1.2,
        brightness: 1.05,
        saturation: 1.1,
        shadowIntensity: 0.25,
        swirlIntensity: 8,
        swirlScale: 1.0,
        swirlRadius: 1.0,
        edgeThicknessPx: 12,
        swirlOffset: 0.0,
        zIndex: 9999,
        shiningIntensity: 0.8,
      };
      
      if (defaults[key] !== value) {
        propsArray.push(`  ${key}={${value}}`);
      }
    }
  });

  return `<LiquidGlass\n${propsArray.join('\n')}\n>\n  {/* Your content here */}\n</LiquidGlass>`;
}

