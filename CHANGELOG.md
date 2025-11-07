# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-11-07

### Added
- **Elasticity Effect**: Added `elasticity` prop for mouse interaction with stretching and translation effects
- **Elasticity Activation Zone**: Added `elasticityActivationZone` prop to control the distance from edges where elasticity activates
- **Global Mouse Position**: Added `globalMousePos` prop for external mouse position tracking
- **Mouse Offset**: Added `mouseOffset` prop for external mouse offset relative to component center
- **Mouse Container**: Added `mouseContainer` prop for custom container-based mouse tracking
- **Press State Tracking**: Added `enablePressState` prop and `onPressStateChange` callback for tactile feedback
- **Scroll Adaptation**: Added `enableScrollAdaptation` prop for scroll-based adaptive properties (blur, saturation, opacity)
- **Scroll Container**: Added `scrollContainer` prop to specify scroll container for adaptation
- **Inner Glow Effect**: Added `enableInnerGlow` prop for interactive radial glow at touch/mouse point
- **Morphic Transitions**: Added `enableMorphicTransitions` prop for expand/collapse animations
- **Morphic State Props**: Added `isExpanded`, `expandedWidth`, `expandedHeight`, `collapsedWidth`, `collapsedHeight` props for morphic transitions
- **Click Handler**: Added `onClick` prop for component click events
- **Swirl Offset**: Added `swirlOffset` prop to control gap between component edges and swirl effect band
- **Tint Color**: Added `tintColor` prop for colored overlay tinting
- **Shining Border**: Added `shiningBorder` and `shiningIntensity` props for diagonal border shine effects
- **Style Prop**: Added `style` prop for additional inline styles

### Changed
- Enhanced component with interactive effects and advanced customization options
- Improved documentation with comprehensive prop descriptions and examples
- Updated demo with interactive controls for new features

### Documentation
- Updated README with all new props and features
- Added examples for elasticity, scroll adaptation, press states, morphic transitions, and inner glow
- Enhanced technical details section with new technologies used

## [1.0.0] - 2025-11-06

### Added
- Initial release of Quidlass
- **Liquid Glassmorphism Effect**: Core glass-like surface with liquid distortion
- **Swirl Effects**: Configurable vortex patterns at edges with `swirlIntensity`, `swirlScale`, `swirlRadius`, `edgeThicknessPx`, and `swirlEdges` props
- **Backdrop Filters**: Blur, contrast, brightness, and saturation controls
- **Text Styling**: Text shadow and text color customization
- **Responsive Design**: Automatic adaptation to container size changes using ResizeObserver
- **TypeScript Support**: Full TypeScript definitions included
- **Zero Dependencies**: No external dependencies besides React
- **Demo Application**: Interactive demo with 6 use cases (Button, Floating Button, Card, Tooltip, Popup, Modal)
- **Documentation**: Comprehensive README with examples and technical details

### Technical Implementation
- Canvas API for dynamic displacement maps
- SVG filters with `feDisplacementMap` for distortion
- CSS backdrop-filter for visual effects
- React.memo for performance optimization

---

[1.1.0]: https://github.com/programmerlapar/quidlass/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/programmerlapar/quidlass/releases/tag/v1.0.0

