# Quidlass - Liquid Glassmorphism React Component

**Quidlass** is a beautiful, lightweight React component library for creating stunning liquid glassmorphism effects. Perfect for modern React applications, it provides customizable glass-like surfaces with liquid distortion effects, interactive animations, and zero dependencies.

## 🚀 Quick Links

- 📖 **Documentation**: https://programmerlapar.github.io/quidlass/
- 🎨 **Live Demo**: https://programmerlapar.github.io/quidlass/demo/
- 📦 **npm Package**: [quidlass on npm](https://www.npmjs.com/package/quidlass)
- 💻 **GitHub Repository**: https://github.com/programmerlapar/quidlass

[![npm version](https://img.shields.io/npm/v/quidlass.svg)](https://www.npmjs.com/package/quidlass)
[![npm downloads](https://img.shields.io/npm/dm/quidlass.svg)](https://www.npmjs.com/package/quidlass)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/quidlass)](https://www.npmjs.com/package/quidlass)
[![GitHub stars](https://img.shields.io/github/stars/programmerlapar/quidlass.svg?style=social)](https://github.com/programmerlapar/quidlass)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## What is Liquid Glassmorphism?

Liquid glassmorphism combines the popular glassmorphism design trend with dynamic liquid distortion effects. It creates a frosted glass appearance with animated, morphing edges that respond to user interactions - perfect for cards, modals, buttons, tooltips, and modern UI components.


## Features

- 🎨 **Liquid Glassmorphism Effect** - Beautiful glass-like surfaces with liquid distortion
- 🎛️ **Highly Customizable** - 30+ props to fine-tune the appearance and behavior
- 🚀 **Performance Optimized** - Uses canvas and SVG filters for efficient rendering
- 📦 **Zero Dependencies** - No external dependencies besides React
- 🎯 **TypeScript Support** - Full TypeScript definitions included
- 📱 **Responsive** - Automatically adapts to container size changes
- 🎭 **Interactive Effects** - Elasticity, press states, scroll adaptation, and morphic transitions
- ✨ **Advanced Features** - Inner glow, shining borders, tint colors, and custom swirl effects

## Installation

Install Quidlass via npm, yarn, or pnpm:

```bash
npm install quidlass
# or
yarn add quidlass
# or
pnpm add quidlass
```

**Search terms**: If you're looking for "liquid glass react", "glassmorphism react component", "react glass effect", "liquid glassmorphism npm", or "react glassmorphism library" - you've found it! Quidlass is the perfect solution for adding beautiful glass effects to your React applications.

### Requirements

- React >= 18.0.0
- React DOM >= 18.0.0

## Usage

```tsx
import { LiquidGlass } from 'quidlass';

function App() {
  return (
    <LiquidGlass borderRadius={20} blur={10}>
      <div>Your content here</div>
    </LiquidGlass>
  );
}
```

### TypeScript

TypeScript definitions are included. You can import the props type:

```tsx
import { LiquidGlass, type LiquidGlassProps } from 'quidlass';

const props: LiquidGlassProps = {
  borderRadius: 20,
  blur: 10,
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `borderRadius` | `number` | `20` | Border radius in pixels |
| `blur` | `number` | `0.25` | Blur amount in pixels |
| `contrast` | `number` | `1.2` | Contrast multiplier |
| `brightness` | `number` | `1.05` | Brightness multiplier |
| `saturation` | `number` | `1.1` | Saturation multiplier |
| `shadowIntensity` | `number` | `0.25` | Shadow opacity |
| `swirlIntensity` | `number` | `8` | Swirl intensity for vortex effect |
| `swirlScale` | `number` | `1.0` | Swirl scale controls size/zoom |
| `swirlRadius` | `number` | `1.0` | Swirl radius controls extent |
| `edgeThicknessPx` | `number` | `12` | Edge thickness in pixels |
| `swirlOffset` | `number` | `0.0` | Swirl offset: 0.0 = no gap (edges), 1.0 = max gap (center). Controls gap between component edges and swirl effect band |
| `swirlEdges` | `'all' | 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left' | Array<...>` | `'all'` | Which edge regions get swirl. Can be a single value or an array for multiple regions |
| `zIndex` | `number` | `9999` | Z-index for layering |
| `textShadow` | `boolean \| string` | `true` | Text shadow for content |
| `textColor` | `string` | `'rgb(255, 255, 255)'` | Text color for content |
| `tintColor` | `string` | `undefined` | Tint overlay color (any CSS color) |
| `shiningBorder` | `boolean` | `false` | Enable shining border effect |
| `shiningIntensity` | `number` | `0.8` | Intensity of shining effect (0-1) |
| `elasticity` | `number` | `0.15` | Elasticity factor for mouse interaction (stretching/translation) |
| `globalMousePos` | `{ x: number; y: number }` | `undefined` | External global mouse position for elasticity |
| `mouseOffset` | `{ x: number; y: number }` | `undefined` | Mouse offset relative to component center (percentage) |
| `mouseContainer` | `RefObject<HTMLElement>` | `undefined` | Container ref for mouse tracking |
| `elasticityActivationZone` | `number` | `200` | Activation zone in pixels from edges for elasticity |
| `enablePressState` | `boolean` | `false` | Enable press state tracking for tactile feedback |
| `enableScrollAdaptation` | `boolean` | `false` | Enable scroll-based adaptive properties (blur, saturation, opacity) |
| `scrollContainer` | `string \| RefObject<HTMLElement>` | `undefined` | Scroll container selector or ref for scroll adaptation |
| `enableInnerGlow` | `boolean` | `false` | Enable interactive inner glow effect at touch/mouse point |
| `enableMorphicTransitions` | `boolean` | `false` | Enable morphic transitions (expand/collapse) |
| `isExpanded` | `boolean` | `false` | Expanded state for morphic transitions |
| `expandedWidth` | `number \| string` | `400` | Expanded width in pixels (used when isExpanded is true) |
| `expandedHeight` | `number \| string` | `320` | Expanded height in pixels (used when isExpanded is true) |
| `collapsedWidth` | `number \| string` | `undefined` | Collapsed width in pixels (uses container width if undefined) |
| `collapsedHeight` | `number \| string` | `undefined` | Collapsed height in pixels (uses container height if undefined) |
| `onPressStateChange` | `(isPressed: boolean) => void` | `undefined` | Callback fired when press state changes |
| `onClick` | `(event: MouseEvent) => void` | `undefined` | Callback fired when component is clicked |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `CSSProperties` | `{}` | Additional inline styles |
| `children` | `ReactNode` | - | Content to render inside |

## Demo

Check out the interactive demo with 6 different use cases (Button, Floating Button, Card, Tooltip, Popup, Modal) and real-time prop controls.

- Live demo: https://programmerlapar.github.io/quidlass/demo
- Source: see the `demo` folder in this repo

## Examples

### Card Component

```tsx
<LiquidGlass borderRadius={16} blur={8} className="p-6">
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</LiquidGlass>
```

### Button

```tsx
<LiquidGlass borderRadius={12} blur={4} className="px-6 py-3">
  <button>Click Me</button>
</LiquidGlass>
```

### Modal

```tsx
<LiquidGlass 
  borderRadius={24} 
  blur={12} 
  shiningBorder={true}
  className="p-8"
>
  <div>Modal content</div>
</LiquidGlass>
```

### Floating Button

```tsx
<LiquidGlass borderRadius={50} blur={8} className="w-16 h-16">
  <button style={{ width: '100%', height: '100%', border: 'none', background: 'transparent' }}>
    +
  </button>
</LiquidGlass>
```

### Tooltip

```tsx
<div style={{ position: 'relative' }}>
  <button>Hover me</button>
  <LiquidGlass 
    borderRadius={8} 
    blur={6}
    className="absolute top-full mt-2 p-2"
    style={{ width: '200px' }}
  >
    <p>This is a tooltip</p>
  </LiquidGlass>
</div>
```

### Popup with Tint Color

```tsx
<LiquidGlass 
  borderRadius={16} 
  blur={10}
  tintColor="rgba(34, 197, 94, 0.15)"
  className="p-6"
>
  <div>Popup content with green tint</div>
</LiquidGlass>
```

### Custom Swirl Edges

```tsx
<LiquidGlass 
  borderRadius={20} 
  blur={8}
  swirlEdges={['top-left', 'bottom-right']}
>
  <div>Swirl effect only on top-left and bottom-right corners</div>
</LiquidGlass>
```

### Swirl Offset (Gap Control)

```tsx
<LiquidGlass 
  borderRadius={20} 
  blur={8}
  swirlOffset={0.3}
>
  <div>Swirl effect with gap from edges (30% of distance to center)</div>
</LiquidGlass>
```

### Interactive Elasticity Effect

```tsx
<LiquidGlass 
  borderRadius={20} 
  blur={10}
  elasticity={0.2}
  elasticityActivationZone={150}
>
  <div>Component responds to mouse position with elastic stretching</div>
</LiquidGlass>
```

### Scroll-Based Adaptation

```tsx
<LiquidGlass 
  borderRadius={20} 
  blur={10}
  enableScrollAdaptation={true}
  scrollContainer="#scrollable-container"
>
  <div>Blur, saturation, and opacity adapt based on scroll position</div>
</LiquidGlass>
```

### Press State Interaction

```tsx
<LiquidGlass 
  borderRadius={20} 
  blur={10}
  enablePressState={true}
  onPressStateChange={(isPressed) => console.log('Pressed:', isPressed)}
>
  <button>Press me for tactile feedback</button>
</LiquidGlass>
```

### Morphic Transitions (Expand/Collapse)

```tsx
const [isExpanded, setIsExpanded] = useState(false);

<LiquidGlass 
  borderRadius={20} 
  blur={10}
  enableMorphicTransitions={true}
  isExpanded={isExpanded}
  expandedWidth={400}
  expandedHeight={320}
  collapsedWidth={280}
  collapsedHeight={80}
  onClick={() => setIsExpanded(!isExpanded)}
>
  <div>{isExpanded ? 'Expanded content' : 'Collapsed content'}</div>
</LiquidGlass>
```

### Inner Glow Effect

```tsx
<LiquidGlass 
  borderRadius={20} 
  blur={10}
  enableInnerGlow={true}
>
  <div>Interactive glow follows mouse/touch position</div>
</LiquidGlass>
```

## Technical Details

The component uses several modern web technologies to achieve the liquid glassmorphism effect:

- **Canvas API**: Generates dynamic displacement maps for the liquid distortion effect
- **SVG Filters**: Uses `feDisplacementMap` to apply the distortion to the backdrop
- **CSS Backdrop Filter**: Provides blur, contrast, brightness, and saturation effects
- **ResizeObserver**: Automatically adjusts to container size changes for responsive behavior
- **React.memo**: Optimized with memoization to prevent unnecessary re-renders
- **RequestAnimationFrame**: Used for smooth animations in interactive effects (elasticity, inner glow)
- **Scroll Event Listeners**: Enables scroll-based adaptive properties

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

Requires support for:
- `backdrop-filter` CSS property
- SVG filters
- Canvas API
- ResizeObserver API

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a detailed list of changes and version history.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you find this project helpful, consider buying me a coffee! ☕

[![PayPal](https://img.shields.io/badge/PayPal-Support-blue?logo=paypal)](https://www.paypal.com/paypalme/programmerlapar)

[Support via PayPal](https://www.paypal.com/paypalme/programmerlapar)
