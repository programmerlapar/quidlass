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
          {/* Basic Appearance Section */}
          <div className="control-section">
            <h3 className="control-section-title">Basic Appearance</h3>
            <p className="control-section-description">Control the fundamental visual properties of the glass effect</p>
            
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
              <p className="control-description">Controls how rounded the corners of the glass container are. Higher values create more rounded, pill-shaped containers.</p>
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
              <p className="control-description">Controls how much the background behind the glass is blurred. Higher values create a stronger frosted glass effect, making content behind less visible.</p>
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
              <p className="control-description">Adjusts the contrast of the blurred background. Higher values make the glass effect more pronounced and the background more distinct.</p>
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
              <p className="control-description">Controls how bright the blurred background appears. Values above 1.0 make it brighter, creating a lighter glass effect.</p>
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
              <p className="control-description">Controls the color intensity of the blurred background. Higher values make colors more vibrant, while lower values create a more muted, grayscale effect.</p>
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
              <p className="control-description">Controls the opacity of the shadow around the glass container. Higher values create a more dramatic depth effect, making the glass appear to float above the background.</p>
            </div>
          </div>

          {/* Elasticity Section */}
          <div className="control-section">
            <h3 className="control-section-title">Elasticity</h3>
            <p className="control-section-description">Control how the component responds to mouse movement with elastic stretching effects</p>
            
            <div className="control-group">
              <label className="control-label">
                Elasticity: {props.elasticity}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={props.elasticity ?? 0.15}
                onChange={handleSliderChange('elasticity')}
                className="control-slider"
              />
              <input
                type="number"
                min="0"
                max="1"
                step="0.01"
                value={props.elasticity ?? 0.15}
                onChange={handleNumberInput('elasticity')}
                className="control-input"
              />
              <p className="control-description">Controls how much the component stretches and moves toward the mouse cursor. Higher values create a more pronounced elastic effect, making the glass feel more interactive and responsive.</p>
            </div>

            <div className="control-group">
              <label className="control-label">
                Elasticity Activation Zone: {props.elasticityActivationZone ?? 200}px
              </label>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={props.elasticityActivationZone ?? 200}
                onChange={handleSliderChange('elasticityActivationZone')}
                className="control-slider"
              />
              <input
                type="number"
                min="0"
                max="500"
                step="10"
                value={props.elasticityActivationZone ?? 200}
                onChange={handleNumberInput('elasticityActivationZone')}
                className="control-input"
              />
              <p className="control-description">Defines the distance in pixels from the component edges where the elasticity effect becomes active. The effect is strongest at the edges and fades out as the mouse moves further away.</p>
            </div>
          </div>

          {/* Swirl Effect Section */}
          <div className="control-section">
            <h3 className="control-section-title">Swirl Effect</h3>
            <p className="control-section-description">Control the liquid distortion effect that creates the signature swirling pattern at the edges</p>
            
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
              <p className="control-description">Controls the strength of the swirling distortion effect. Higher values create more pronounced liquid-like patterns, especially near the edges of the glass.</p>
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
              <p className="control-description">Controls the size of the swirl pattern. Lower values create larger, more spread-out swirls, while higher values create smaller, more detailed patterns.</p>
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
              <p className="control-description">Controls how far the swirl effect extends from the edges. Lower values keep the swirl closer to the edges, while higher values allow it to extend more toward the center.</p>
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
              <p className="control-description">Controls the width of the edge band where the swirl effect is applied. Higher values create a wider distortion zone along the edges, while the center remains unaffected.</p>
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
              <p className="control-description">Controls the gap between the component edges and where the swirl effect begins. At 0.0, the swirl starts at the edges. At 1.0, it starts near the center, creating a gap from the edges.</p>
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
              <p className="control-description">Select which corner or edge regions should have the swirl effect applied. You can choose all edges or specific corners for more targeted distortion effects.</p>
            </div>
          </div>

          {/* Styling & Visual Effects Section */}
          <div className="control-section">
            <h3 className="control-section-title">Styling & Visual Effects</h3>
            <p className="control-section-description">Control additional styling properties and special visual effects</p>
            
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
              <p className="control-description">Controls the stacking order of the glass component. Higher values ensure the glass appears above other elements on the page.</p>
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
              <p className="control-description">Controls the shadow effect applied to text inside the glass container. Helps improve text readability against varying backgrounds.</p>
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
              <p className="control-description">Adds a colored overlay to tint the glass effect. Useful for creating themed glass components with specific color schemes.</p>
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
              <p className="control-description">Enables a bright, high-contrast shine effect on the diagonal borders (top-left and bottom-right). Creates a premium, polished glass appearance.</p>
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
                <p className="control-description">Controls the brightness and contrast of the shining border effect. Higher values create a more dramatic, eye-catching shine.</p>
              </div>
            )}
          </div>

          {/* Interactive Features Section */}
          <div className="control-section">
            <h3 className="control-section-title">Interactive Features</h3>
            <p className="control-section-description">Enable advanced interactive behaviors and dynamic effects</p>
            
            <div className="control-group">
              <label className="control-label">
                <input
                  type="checkbox"
                  checked={props.enablePressState || false}
                  onChange={handleCheckboxChange('enablePressState')}
                  className="control-checkbox"
                />
                Enable Press State
              </label>
              <p className="control-description">Enables tactile feedback when the component is pressed or clicked. The glass will scale down slightly and show visual feedback, making it feel more interactive and responsive to user input.</p>
            </div>

            <div className="control-group">
              <label className="control-label">
                <input
                  type="checkbox"
                  checked={props.enableInnerGlow || false}
                  onChange={handleCheckboxChange('enableInnerGlow')}
                  className="control-checkbox"
                />
                Enable Inner Glow
              </label>
              <p className="control-description">Creates a radial glow effect that follows your mouse or touch point. The glow appears at the interaction point, creating a dynamic, interactive lighting effect inside the glass.</p>
            </div>

            <div className="control-group">
              <label className="control-label">
                <input
                  type="checkbox"
                  checked={props.enableScrollAdaptation || false}
                  onChange={handleCheckboxChange('enableScrollAdaptation')}
                  className="control-checkbox"
                />
                Enable Scroll Adaptation
              </label>
              <p className="control-description">Makes the glass effect adapt dynamically as you scroll. Blur, saturation, and opacity change based on scroll position, creating a more immersive, responsive experience.</p>
            </div>

            {props.enableScrollAdaptation && (
              <div className="control-group">
                <label className="control-label">Scroll Container</label>
                <input
                  type="text"
                  value={typeof props.scrollContainer === 'string' ? props.scrollContainer : ''}
                  onChange={(e) => onPropChange('scrollContainer', e.target.value || undefined)}
                  placeholder="e.g., #scroll-content or leave empty for auto-detect"
                  className="control-input"
                  style={{ marginTop: '0.5rem' }}
                />
                <p className="control-description">Specify a CSS selector for the scroll container. If left empty, the component will automatically detect the scrollable parent element.</p>
              </div>
            )}

            <div className="control-group">
              <label className="control-label">
                <input
                  type="checkbox"
                  checked={props.enableMorphicTransitions || false}
                  onChange={handleCheckboxChange('enableMorphicTransitions')}
                  className="control-checkbox"
                />
                Enable Morphic Transitions
              </label>
              <p className="control-description">Enables smooth size morphing with expand and collapse functionality. The component can smoothly transition between different sizes, perfect for cards, panels, or expandable content areas.</p>
            </div>

            {props.enableMorphicTransitions && (
              <>
                <div className="control-group">
                  <label className="control-label">
                    <input
                      type="checkbox"
                      checked={props.isExpanded || false}
                      onChange={handleCheckboxChange('isExpanded')}
                      className="control-checkbox"
                    />
                    Is Expanded
                  </label>
                  <p className="control-description">Controls whether the component is currently in its expanded or collapsed state. Toggle this to see the morphic transition effect.</p>
                </div>

                <div className="control-group">
                  <label className="control-label">
                    Expanded Width: {typeof props.expandedWidth === 'number' ? `${props.expandedWidth}px` : props.expandedWidth || '400px'}
                  </label>
                  <input
                    type="text"
                    value={props.expandedWidth || 400}
                    onChange={(e) => {
                      const value = e.target.value;
                      const numValue = parseFloat(value);
                      onPropChange('expandedWidth', isNaN(numValue) ? value : numValue);
                    }}
                    placeholder="400 or 400px"
                    className="control-input"
                  />
                  <p className="control-description">The width of the component when expanded. Can be specified as a number (pixels) or a CSS value like "400px" or "50%".</p>
                </div>

                <div className="control-group">
                  <label className="control-label">
                    Expanded Height: {typeof props.expandedHeight === 'number' ? `${props.expandedHeight}px` : props.expandedHeight || '320px'}
                  </label>
                  <input
                    type="text"
                    value={props.expandedHeight || 320}
                    onChange={(e) => {
                      const value = e.target.value;
                      const numValue = parseFloat(value);
                      onPropChange('expandedHeight', isNaN(numValue) ? value : numValue);
                    }}
                    placeholder="320 or 320px"
                    className="control-input"
                  />
                  <p className="control-description">The height of the component when expanded. Can be specified as a number (pixels) or a CSS value like "320px" or "50vh".</p>
                </div>

                <div className="control-group">
                  <label className="control-label">
                    Collapsed Width: {typeof props.collapsedWidth === 'number' ? `${props.collapsedWidth}px` : props.collapsedWidth || 'auto'}
                  </label>
                  <input
                    type="text"
                    value={props.collapsedWidth || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (!value) {
                        onPropChange('collapsedWidth', undefined);
                        return;
                      }
                      const numValue = parseFloat(value);
                      onPropChange('collapsedWidth', isNaN(numValue) ? value : numValue);
                    }}
                    placeholder="280 or 280px (leave empty for auto)"
                    className="control-input"
                  />
                  <p className="control-description">The width of the component when collapsed. If left empty, the component will use its container's width automatically.</p>
                </div>

                <div className="control-group">
                  <label className="control-label">
                    Collapsed Height: {typeof props.collapsedHeight === 'number' ? `${props.collapsedHeight}px` : props.collapsedHeight || 'auto'}
                  </label>
                  <input
                    type="text"
                    value={props.collapsedHeight || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (!value) {
                        onPropChange('collapsedHeight', undefined);
                        return;
                      }
                      const numValue = parseFloat(value);
                      onPropChange('collapsedHeight', isNaN(numValue) ? value : numValue);
                    }}
                    placeholder="80 or 80px (leave empty for auto)"
                    className="control-input"
                  />
                  <p className="control-description">The height of the component when collapsed. If left empty, the component will use its container's height automatically.</p>
                </div>
              </>
            )}
          </div>
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
      } else if (key === 'scrollContainer') {
        // For scrollContainer, check if it's a string selector
        propsArray.push(`  ${key}="${value}"`);
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
        elasticity: 0.15,
        elasticityActivationZone: 200,
        swirlIntensity: 8,
        swirlScale: 1.0,
        swirlRadius: 1.0,
        edgeThicknessPx: 12,
        swirlOffset: 0.0,
        zIndex: 9999,
        shiningIntensity: 0.8,
        expandedWidth: 400,
        expandedHeight: 320,
      };
      
      if (defaults[key] !== value) {
        propsArray.push(`  ${key}={${value}}`);
      }
    } else if (key === 'expandedWidth' || key === 'expandedHeight' || key === 'collapsedWidth' || key === 'collapsedHeight') {
      // Handle string or number for morphic transition dimensions
      if (typeof value === 'string') {
        propsArray.push(`  ${key}="${value}"`);
      } else {
        propsArray.push(`  ${key}={${value}}`);
      }
    }
  });

  return `<LiquidGlass\n${propsArray.join('\n')}\n>\n  {/* Your content here */}\n</LiquidGlass>`;
}

