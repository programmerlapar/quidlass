# Quidlass - Setup Guide

## Project Structure

```
quidlass/
├── src/                    # Library source code
│   ├── LiquidGlass.tsx    # Main component (no Tailwind dependencies)
│   └── index.ts            # Export file
├── demo/                   # Demo application
│   ├── App.tsx            # Main demo app
│   ├── Background.tsx     # Complex background with SVG patterns
│   ├── ControlPanel.tsx   # Interactive controls
│   ├── useCases.tsx       # All use case examples
│   └── ...
├── dist/                   # Built library (generated)
├── package.json           # NPM package configuration
├── rollup.config.ts       # Library build configuration
└── .github/workflows/     # GitHub Actions for deployment
```

## Getting Started

### 1. Install Dependencies

```bash
yarn install
```

### 2. Build the Library

```bash
yarn build
```

This will create the `dist/` folder with:
- `dist/index.js` (CommonJS)
- `dist/index.esm.js` (ESM)
- `dist/index.d.ts` (TypeScript definitions)

### 3. Run the Demo Locally

```bash
cd demo
yarn install
yarn dev
```

Or from the root:
```bash
yarn demo:dev
```

### 4. Build the Demo

```bash
cd demo
yarn build
```

Or from the root:
```bash
yarn demo:build
```

## Publishing to NPM

1. Update the version in `package.json`
2. Build the library: `yarn build`
3. Publish: `npm publish`

## GitHub Pages Deployment

The demo is automatically deployed to GitHub Pages via GitHub Actions when you push to the `main` branch.

The workflow:
1. Builds the library
2. Builds the demo
3. Deploys to GitHub Pages at `https://programmerlapar.github.io/quidlass/`

Make sure to:
- Enable GitHub Pages in your repository settings
- Set the source to "GitHub Actions"

## Features

### Library Features
- ✅ Zero dependencies (except React)
- ✅ No Tailwind dependencies
- ✅ TypeScript support
- ✅ React 18+ compatible (works with React 19)
- ✅ Full TypeScript definitions

### Demo Features
- ✅ Complex animated background with SVG patterns
- ✅ 6 use cases: Button, Floating Button, Card, Tooltip, Popup, Modal
- ✅ Interactive control panel with all props
- ✅ Real-time updates across all components
- ✅ Responsive design

## Use Cases Included

1. **Button** - Standard button with liquid glass effect
2. **Floating Button** - Circular floating action button
3. **Card** - Content card with glass effect
4. **Tooltip** - Hover tooltip with glass effect
5. **Popup** - Click-triggered popup
6. **Modal** - Full modal dialog with glass effect

## Next Steps

1. Initialize git repository:
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create a GitHub repository and push:
```bash
git remote add origin https://github.com/programmerlapar/quidlass.git
git branch -M main
git push -u origin main
```

3. Enable GitHub Pages in repository settings

4. Test the demo locally and then publish to NPM when ready!

