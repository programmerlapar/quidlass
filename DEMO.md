# How to Run the Demo

## Quick Start

### 1. Install Dependencies

First, install root dependencies:
```bash
yarn install
```

Then install demo dependencies:
```bash
cd demo
npm install
```

Or use npm in the demo folder:
```bash
cd demo
npm install
```

### 2. Run the Demo

From the demo folder:
```bash
npm run dev
```

Or from the root:
```bash
cd demo && npm run dev
```

The demo will be available at: **http://localhost:5173**

### 3. Build for Production

```bash
cd demo
npm run build
```

Build output will be in `demo/dist/`

## Verification

✅ **Build Status**: All TypeScript errors fixed
✅ **Dependencies**: Installed successfully
✅ **Build**: Completed without errors
✅ **Dev Server**: Ready to run

## What's Included

- **6 Use Cases**: Button, Floating Button, Card, Tooltip, Popup, Modal
- **Interactive Controls**: All props are adjustable in real-time
- **Complex Background**: Animated gradient with SVG patterns and particles
- **Responsive Design**: Works on desktop and mobile

## Troubleshooting

If you encounter port conflicts:
1. Kill any process using port 5173:
   ```bash
   # Windows PowerShell
   Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process
   ```

2. Or use a different port:
   ```bash
   npm run dev -- --port 3000
   ```

## Next Steps

1. Open http://localhost:5173 in your browser
2. Adjust the controls on the right side
3. Watch all components update in real-time
4. Test different use cases (hover tooltips, click popups/modals)

