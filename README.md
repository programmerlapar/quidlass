# Quidlass

A beautiful liquid glassmorphism React component with customizable effects. Create stunning glass-like surfaces with liquid distortion effects, perfect for modern UI designs.


## Features

- 🎨 **Liquid Glassmorphism Effect** - Beautiful glass-like surfaces with liquid distortion
- 🎛️ **Highly Customizable** - 15+ props to fine-tune the appearance
- 🚀 **Performance Optimized** - Uses canvas and SVG filters for efficient rendering
- 📦 **Zero Dependencies** - No external dependencies besides React
- 🎯 **TypeScript Support** - Full TypeScript definitions included
- 📱 **Responsive** - Automatically adapts to container size changes

## Installation

```bash
npm install quidlass
# or
yarn add quidlass
# or
pnpm add quidlass
```

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
| `elasticity` | `number` | `0.6` | Elasticity factor shaping liquid distortion |
| `swirlIntensity` | `number` | `8` | Swirl intensity for vortex effect |
| `swirlScale` | `number` | `1.0` | Swirl scale controls size/zoom |
| `swirlRadius` | `number` | `1.0` | Swirl radius controls extent |
| `edgeThicknessPx` | `number` | `12` | Edge thickness in pixels |
| `swirlEdges` | `'all' | 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left' | Array<...>` | `'all'` | Which edge regions get swirl. Can be a single value or an array for multiple regions |
| `zIndex` | `number` | `9999` | Z-index for layering |
| `textShadow` | `boolean \| string` | `true` | Text shadow for content |
| `textColor` | `string` | `'rgb(255, 255, 255)'` | Text color for content |
| `tintColor` | `string` | `undefined` | Tint overlay color (any CSS color) |
| `shiningBorder` | `boolean` | `false` | Enable shining border effect |
| `shiningIntensity` | `number` | `0.8` | Intensity of shining effect (0-1) |
| `className` | `string` | `''` | Additional CSS classes |
| `children` | `ReactNode` | - | Content to render inside |

## Demo

Check out the interactive demo with 6 different use cases (Button, Floating Button, Card, Tooltip, Popup, Modal) and real-time prop controls. See the `demo` folder for the demo application.

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

## Technical Details

The component uses several modern web technologies to achieve the liquid glassmorphism effect:

- **Canvas API**: Generates dynamic displacement maps for the liquid distortion effect
- **SVG Filters**: Uses `feDisplacementMap` to apply the distortion to the backdrop
- **CSS Backdrop Filter**: Provides blur, contrast, brightness, and saturation effects
- **ResizeObserver**: Automatically adjusts to container size changes for responsive behavior
- **React.memo**: Optimized with memoization to prevent unnecessary re-renders

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

Requires support for:
- `backdrop-filter` CSS property
- SVG filters
- Canvas API
- ResizeObserver API

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you find this project helpful, consider buying me a coffee! ☕

[![PayPal](https://img.shields.io/badge/PayPal-Support-blue?logo=paypal)](https://www.paypal.com/paypalme/programmerlapar)

[Support via PayPal](https://www.paypal.com/paypalme/programmerlapar)

