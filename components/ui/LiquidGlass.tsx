import type React from 'react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

export interface LiquidGlassProps {
	/**
	 * Border radius in pixels for the glass container
	 * @default 20
	 */
	borderRadius?: number;
	/**
	 * Blur amount in pixels for the backdrop filter
	 * @default 0.25
	 */
	blur?: number;
	/**
	 * Contrast multiplier for the backdrop filter
	 * @default 1.2
	 */
	contrast?: number;
	/**
	 * Brightness multiplier for the backdrop filter
	 * @default 1.05
	 */
	brightness?: number;
	/**
	 * Saturation multiplier for the backdrop filter
	 * @default 1.1
	 */
	saturation?: number;
	/**
	 * Shadow intensity (opacity) for the box shadow
	 * @default 0.25
	 */
	shadowIntensity?: number;
	/**
	 * Elasticity factor for the rounded rectangle SDF calculation
	 * Controls the shape of the liquid distortion effect
	 * @default 0.6
	 */
	elasticity?: number;
	/**
	 * Swirl intensity for the vortex effect
	 * Higher values create stronger swirl patterns, especially near borders
	 * Simulates liquid being poured into the center
	 * @default 8
	 */
	swirlIntensity?: number;
	/**
	 * Swirl scale controls the size/zoom of the swirl pattern
	 * Values < 1.0 = larger swirl (zoomed out, pattern repeats less)
	 * Values > 1.0 = smaller swirl (zoomed in, pattern repeats more)
	 * @default 1.0
	 */
	swirlScale?: number;
	/**
	 * Swirl radius controls how far the swirl extends from the center/edges
	 * Values < 1.0 = smaller radius (swirl closer to edges)
	 * Values > 1.0 = larger radius (swirl extends more toward center)
	 * @default 1.0
	 */
	swirlRadius?: number;
	/**
	 * Thickness in pixels of the edge band where swirl is applied.
	 * Higher values create a wider edge region. The center remains unaffected.
	 * @default 12
	 */
	edgeThicknessPx?: number;
	/**
	 * Which corner/edge region(s) should have the swirl effect.
	 * Can be a single value or an array for multiple selections.
	 * - 'all': Apply swirl to all edges (default)
	 * - 'top-left': Left-top half + top-left half
	 * - 'top-right': Right-top half + top-right half
	 * - 'bottom-right': Right-bottom half + bottom-right half
	 * - 'bottom-left': Left-bottom half + bottom-left half
	 * @default 'all'
	 */
	swirlEdges?: 'all' | 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left' | Array<'top-left' | 'top-right' | 'bottom-right' | 'bottom-left'>;
	/**
	 * Z-index for the glass container and SVG filter
	 * @default 9999
	 */
	zIndex?: number;
	/**
	 * Text shadow for text inside the glass container
	 * Can be a boolean (true = default shadow) or a custom CSS text-shadow value
	 * @default true
	 */
	textShadow?: boolean | string;
	/**
	 * Enable shining glass effect on top-left and bottom-right border halves
	 * Creates a bright, high-contrast shine effect on diagonal borders
	 * @default false
	 */
	shiningBorder?: boolean;
	/**
	 * Intensity of the shining border effect (0.0 to 1.0)
	 * Higher values create brighter, more contrasty shine
	 * @default 0.8
	 */
	shiningIntensity?: number;
	/**
	 * Additional CSS classes to apply to the container
	 */
	className?: string;
	/**
	 * Child elements to render inside the glass container
	 */
	children?: React.ReactNode;
}

/**
 * LiquidGlass component creates a liquid glassmorphism effect using SVG filters and canvas displacement maps.
 * 
 * This component generates a glass-like surface that shows content beneath it with a liquid distortion effect.
 * It uses:
 * - Canvas to generate displacement maps dynamically
 * - SVG filters with feDisplacementMap for distortion
 * - CSS backdrop-filter for blur, contrast, brightness, and saturation
 * - ResizeObserver to automatically adjust to container size changes
 * 
 * The effect creates a morphing, liquid-like appearance that simulates glass with liquid beneath it,
 * similar to Apple's Liquid Glass design system.
 * 
 * @param borderRadius - Border radius in pixels (default: 20)
 * @param blur - Blur amount in pixels (default: 0.25)
 * @param contrast - Contrast multiplier (default: 1.2)
 * @param brightness - Brightness multiplier (default: 1.05)
 * @param saturation - Saturation multiplier (default: 1.1)
 * @param shadowIntensity - Shadow opacity (default: 0.25)
 * @param elasticity - Elasticity factor for distortion shape (default: 0.6)
 * @param swirlIntensity - Swirl intensity for vortex effect (default: 8)
 * @param swirlScale - Swirl scale controls size/zoom (default: 1.0)
 * @param swirlRadius - Swirl radius controls extent from center/edges (default: 1.0)
 * @param swirlEdges - Which corner/edge region should have swirl effect (default: 'all')
 * @param zIndex - Z-index for layering (default: 9999)
 * @param textShadow - Text shadow for text inside (default: true, or custom CSS value)
 * @param shiningBorder - Enable shining glass effect on borders (default: false)
 * @param shiningIntensity - Intensity of shining effect 0.0-1.0 (default: 0.8)
 * @param className - Additional CSS classes
 * @param children - Content to render inside the glass container
 * 
 * @example
 * ```tsx
 * <LiquidGlass borderRadius={20} blur={10} className="p-6">
 *   <div>Your content here</div>
 * </LiquidGlass>
 * ```
 */
const LiquidGlass: React.FC<LiquidGlassProps> = ({
	borderRadius = 20,
	blur = 0.25,
	contrast = 1.2,
	brightness = 1.05,
	saturation = 1.1,
	shadowIntensity = 0.25,
	elasticity = 0.6,
	swirlIntensity = 8,
	swirlScale = 1.0,
	swirlRadius = 1.0,
	edgeThicknessPx = 12,
	swirlEdges = 'all',
	zIndex = 9999,
	textShadow = true,
	shiningBorder = false,
	shiningIntensity = 0.8,
	className = '',
	children,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const svgRef = useRef<SVGSVGElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const feImageRef = useRef<SVGFEImageElement>(null);
	const feDisplacementMapRef = useRef<SVGFEDisplacementMapElement>(null);

	const reactId = useId();
	const id = `liquid-glass-${reactId.replace(/:/g, '-')}`;

	const [width, setWidth] = useState(300);
	const [height, setHeight] = useState(200);

	const canvasDPI = 1;

	/**
	 * Smooth step interpolation function for easing
	 * @param a - Lower bound
	 * @param b - Upper bound
	 * @param t - Interpolation value (0-1)
	 * @returns Interpolated value between a and b
	 */
	const smoothStep = useCallback((a: number, b: number, t: number) => {
		t = Math.max(0, Math.min(1, (t - a) / (b - a)));
		return t * t * (3 - 2 * t);
	}, []);

	/**
	 * Calculate the length (magnitude) of a 2D vector
	 * @param x - X component
	 * @param y - Y component
	 * @returns Vector length
	 */
	const length = useCallback((x: number, y: number) => {
		return Math.sqrt(x * x + y * y);
	}, []);

	/**
	 * Calculate signed distance field (SDF) for a rounded rectangle
	 * Used to generate the displacement map shape
	 * @param x - X coordinate
	 * @param y - Y coordinate
	 * @param w - Width
	 * @param h - Height
	 * @param radius - Corner radius
	 * @returns Signed distance value
	 */
	const roundedRectSDF = useCallback(
		(x: number, y: number, w: number, h: number, radius: number) => {
			const qx = Math.abs(x) - w + radius;
			const qy = Math.abs(y) - h + radius;
			return (
				Math.min(Math.max(qx, qy), 0) +
				length(Math.max(qx, 0), Math.max(qy, 0)) -
				radius
			);
		},
		[length],
	);

	/**
	 * Update the shader displacement map based on current dimensions and parameters
	 * Generates a canvas-based displacement map that creates the liquid distortion effect
	 */
	const updateShader = useCallback(() => {
		const canvas = canvasRef.current;
		const feImage = feImageRef.current;
		const feDisplacementMap = feDisplacementMapRef.current;

		if (!canvas || !feImage || !feDisplacementMap) return;

		const context = canvas.getContext('2d');
		if (!context) return;

		const w = Math.max(1, Math.floor(width * canvasDPI));
		const h = Math.max(1, Math.floor(height * canvasDPI));

		// Ensure we have valid dimensions
		if (w <= 0 || h <= 0) return;

		// Update canvas size if needed
		if (canvas.width !== w || canvas.height !== h) {
			canvas.width = w;
			canvas.height = h;
		}

		const data = new Uint8ClampedArray(w * h * 4);

		let maxScale = 0;
		const rawValues: number[] = [];

		// Generate displacement map data with swirly vortex effect
		for (let i = 0; i < data.length; i += 4) {
			const x = (i / 4) % w;
			const y = Math.floor(i / 4 / w);
			const uv = { x: x / w, y: y / h };

			// Normalize coordinates to center (0, 0)
			const ix = uv.x - 0.5;
			const iy = uv.y - 0.5;

			// Calculate distance from all edges (top, bottom, left, right)
			// This creates a seamless offset from all edges, not just top-left
			const containerW = w;
			const containerH = h;
			const pxX = x + 0.5;
			const pxY = y + 0.5;
			
			// Check if pixel is inside the rounded rectangle boundary using SDF
			// Convert pixel coordinates to centered coordinates for SDF calculation
			const halfW = containerW / 2;
			const halfH = containerH / 2;
			const centeredX = pxX - halfW;
			const centeredY = pxY - halfH;
			
			// Calculate SDF value - negative means inside, positive means outside
			const sdfValue = roundedRectSDF(
				centeredX,
				centeredY,
				halfW - borderRadius * canvasDPI,
				halfH - borderRadius * canvasDPI,
				borderRadius * canvasDPI
			);
			
			// Only apply swirl if pixel is inside the rounded rectangle (SDF < 0)
			const isInsideRoundedRect = sdfValue < 0;
			
			// Distance from each edge (in pixels)
			const distFromLeft = pxX;
			const distFromRight = containerW - pxX;
			const distFromTop = pxY;
			const distFromBottom = containerH - pxY;
			
			// Determine which corner/edge region this pixel is in
			const isLeftHalf = pxX < containerW / 2;
			const isRightHalf = pxX >= containerW / 2;
			const isTopHalf = pxY < containerH / 2;
			const isBottomHalf = pxY >= containerH / 2;
			
			// Check if this pixel is in the selected swirl region(s)
			let isInSwirlRegion = true;
			if (swirlEdges !== 'all') {
				if (Array.isArray(swirlEdges)) {
					// Multi-select: check if pixel matches any of the selected regions
					isInSwirlRegion = swirlEdges.some(edge => {
						if (edge === 'top-left') return isLeftHalf && isTopHalf;
						if (edge === 'top-right') return isRightHalf && isTopHalf;
						if (edge === 'bottom-right') return isRightHalf && isBottomHalf;
						if (edge === 'bottom-left') return isLeftHalf && isBottomHalf;
						return false;
					});
				} else {
					// Single select
					if (swirlEdges === 'top-left') {
						isInSwirlRegion = isLeftHalf && isTopHalf;
					} else if (swirlEdges === 'top-right') {
						isInSwirlRegion = isRightHalf && isTopHalf;
					} else if (swirlEdges === 'bottom-right') {
						isInSwirlRegion = isRightHalf && isBottomHalf;
					} else if (swirlEdges === 'bottom-left') {
						isInSwirlRegion = isLeftHalf && isBottomHalf;
					}
				}
			}
			
			// Find the minimum distance to any edge (this gives us seamless offset from all edges)
			const minEdgeDistance = Math.min(
				distFromLeft,
				distFromRight,
				distFromTop,
				distFromBottom
			);
			
			// Calculate edge influence based on distance from nearest edge
			// edgeThicknessPx defines the threshold: inside = pure glass, outside = swirl
			// We want swirl to be strongest at edges and fade to zero at the threshold
			const threshold = Math.max(edgeThicknessPx * canvasDPI, 1);
			const edgeInfluence = minEdgeDistance < threshold
				? 1.0 - (minEdgeDistance / threshold) // Fade from 1.0 at edge to 0.0 at threshold
				: 0.0; // No swirl inside the threshold
			
			// Smooth the transition for better visual quality
			// Only apply if pixel is in the selected swirl region AND inside the rounded rectangle
			const borderInfluence = (isInSwirlRegion && isInsideRoundedRect)
				? smoothStep(threshold, 0, minEdgeDistance)
				: 0.0;

			// Convert to polar coordinates for vortex effect
			const angle = Math.atan2(iy, ix);
			const radius = Math.sqrt(ix * ix + iy * iy);
			const maxRadius = Math.sqrt(0.5 * 0.5 + 0.5 * 0.5); // Max distance from center
			const normalizedRadius = Math.min(radius / maxRadius, 1.0);

			// Apply swirl scale to control the size/zoom of the swirl pattern
			// swirlScale < 1.0 = larger swirl (zoomed out, pattern repeats less)
			// swirlScale > 1.0 = smaller swirl (zoomed in, pattern repeats more)
			const scaledRadius = normalizedRadius / Math.max(swirlScale, 0.1);
			
			// Apply swirl radius to control the effective radius of the swirl
			// This affects how far from center the swirl pattern extends
			const effectiveRadius = normalizedRadius * Math.max(swirlRadius, 0.1);

			// Create vortex effect - swirl increases with radius and border influence
			// Swirl strength is stronger at borders, simulating liquid being poured into center
			// Use effectiveRadius to control how far the swirl extends
			const swirlStrength = borderInfluence * scaledRadius * effectiveRadius * (swirlIntensity / 10);
			
			// Calculate final angle with vortex rotation
			// Multiple rotations create swirling pattern
			const finalAngle = angle + swirlStrength * Math.PI * 2;
			
			// Slight radius variation for more organic feel
			const radiusVariation = 1.0 + swirlStrength * 0.1 * Math.sin(angle * 3);
			const newRadius = radius * radiusVariation;

			// Convert back to Cartesian with vortex distortion
			const swirlX = Math.cos(finalAngle) * newRadius;
			const swirlY = Math.sin(finalAngle) * newRadius;

			// Calculate optimal displacement factor based on container size and swirl parameters
			// The factor scales with container size to ensure consistent visual effect
			// Use the smaller dimension to maintain aspect ratio consistency
			const minDimension = Math.min(w, h);
			const baseDisplacementFactor = (minDimension / 100.0) * 0.05; // Scale with container size
			const displacementFactor = baseDisplacementFactor * (swirlIntensity / 10.0);
			
			const pos = {
				x: (swirlX * displacementFactor * borderInfluence + ix * (1 - displacementFactor * borderInfluence * 0.3)) + 0.5,
				y: (swirlY * displacementFactor * borderInfluence + iy * (1 - displacementFactor * borderInfluence * 0.3)) + 0.5,
			};

			const dx = (pos.x - uv.x) * w;
			const dy = (pos.y - uv.y) * h;
			maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
			rawValues.push(dx, dy);
		}

		// Calculate optimal scale automatically based on displacement values
		// Ensure minimum scale for visible effect while maximizing the output
		maxScale = Math.max(maxScale * 0.5, 1.0);

		// Convert displacement values to RGB channels
		// Normalize to [-0.5, 0.5] range, then shift to [0, 1] for RGB
		let index = 0;
		for (let i = 0; i < data.length; i += 4) {
			// Normalize displacement values
			const normalizedDx = maxScale > 0 ? rawValues[index++] / maxScale : 0;
			const normalizedDy = maxScale > 0 ? rawValues[index++] / maxScale : 0;
			
			// Convert to [0, 1] range for RGB channels
			const r = Math.max(0, Math.min(1, normalizedDx * 0.5 + 0.5));
			const g = Math.max(0, Math.min(1, normalizedDy * 0.5 + 0.5));
			
			data[i] = r * 255;
			data[i + 1] = g * 255;
			data[i + 2] = 0;
			data[i + 3] = 255;
		}

		// Ensure data length is correct for ImageData
		const expectedLength = w * h * 4;
		if (data.length !== expectedLength) {
			console.warn(
				'Data length mismatch for ImageData:',
				data.length,
				'expected:',
				expectedLength,
			);
			return;
		}

		try {
			context.putImageData(new ImageData(data, w, h), 0, 0);
			feImage.setAttributeNS(
				'http://www.w3.org/1999/xlink',
				'href',
				canvas.toDataURL(),
			);
			// Set the SVG filter scale to use the displacement range
			// The scale attribute determines how much the displacement map affects the image
			const filterScale = Math.max(maxScale / canvasDPI, 1.0);
			feDisplacementMap.setAttribute(
				'scale',
				filterScale.toString(),
			);
		} catch (error) {
			console.error(
				'Error creating ImageData:',
				error,
				'w:',
				w,
				'h:',
				h,
				'data.length:',
				data.length,
			);
		}
	}, [
		width,
		height,
		canvasDPI,
		borderRadius,
		elasticity,
		swirlIntensity,
		swirlScale,
		swirlRadius,
		edgeThicknessPx,
		swirlEdges,
		roundedRectSDF,
		smoothStep,
		length,
	]);

	// ResizeObserver to track container size changes
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { width: newWidth, height: newHeight } = entry.contentRect;
				setWidth(Math.max(newWidth, 100)); // Minimum width
				setHeight(Math.max(newHeight, 100)); // Minimum height
			}
		});

		resizeObserver.observe(container);

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	// Update shader when component mounts or parameters change
	useEffect(() => {
		updateShader();
	}, [updateShader]);


	// Calculate text shadow value for CSS injection
	const textShadowValue = textShadow === false 
		? 'none' 
		: typeof textShadow === 'string' 
			? textShadow 
			: '0 1px 2px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4)';

	return (
		<>
			{/* CSS style injection to ensure textShadow applies to all child elements including buttons */}
			{textShadow !== false && (
				<style>
					{`
						[data-liquid-glass-content="${id}"] *,
						[data-liquid-glass-content="${id}"] button,
						[data-liquid-glass-content="${id}"] input,
						[data-liquid-glass-content="${id}"] textarea,
						[data-liquid-glass-content="${id}"] select,
						[data-liquid-glass-content="${id}"] a,
						[data-liquid-glass-content="${id}"] span,
						[data-liquid-glass-content="${id}"] p,
						[data-liquid-glass-content="${id}"] h1,
						[data-liquid-glass-content="${id}"] h2,
						[data-liquid-glass-content="${id}"] h3,
						[data-liquid-glass-content="${id}"] h4,
						[data-liquid-glass-content="${id}"] h5,
						[data-liquid-glass-content="${id}"] h6,
						[data-liquid-glass-content="${id}"] div,
						[data-liquid-glass-content="${id}"] label {
							text-shadow: ${textShadowValue} !important;
						}
					`}
				</style>
			)}
			{/* SVG Filter for displacement map */}
			<svg
				ref={svgRef}
				xmlns="http://www.w3.org/2000/svg"
				width="0"
				height="0"
				className="fixed top-0 left-0 pointer-events-none"
				style={{
					zIndex: zIndex - 1,
				}}
			>
				<defs>
					<filter
						id={`${id}_filter`}
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB"
						x="0%"
						y="0%"
						width="100%"
						height="100%"
					>
						<feImage
							ref={feImageRef}
							id={`${id}_map`}
							x="0"
							y="0"
							width={width.toString()}
							height={height.toString()}
							result="displacementMap"
							preserveAspectRatio="none"
						/>
						<feDisplacementMap
							ref={feDisplacementMapRef}
							in="SourceGraphic"
							in2="displacementMap"
							xChannelSelector="R"
							yChannelSelector="G"
						/>
					</filter>
				</defs>
			</svg>

			{/* Hidden Canvas for displacement map generation */}
			<canvas
				ref={canvasRef}
				width={width * canvasDPI}
				height={height * canvasDPI}
				className="hidden"
			/>

			{/* Glass Container */}
			<div
				ref={containerRef}
				className={`relative w-full h-full overflow-hidden ${className}`}
				data-liquid-glass="true"
				style={{
					borderRadius: `${borderRadius}px`,
					zIndex: zIndex,
				}}
			>
				{/* Backdrop layer with blur and displacement filter */}
				<div
					className="absolute inset-0 pointer-events-none bg-white/2"
					style={{
						backdropFilter: `blur(${blur}px) contrast(${contrast}) brightness(${brightness}) saturate(${saturation})`,
						WebkitBackdropFilter: `blur(${blur}px) contrast(${contrast}) brightness(${brightness}) saturate(${saturation})`,
						filter: `url(#${id}_filter)`,
						borderRadius: `${borderRadius}px`,
					}}
				/>
				{/* Soft depth shadow with multiple layers for edge glow */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={{
						borderRadius: `${borderRadius}px`,
						boxShadow: `
							0 2px 8px rgba(0, 0, 0, ${shadowIntensity * 0.4}), 
							0 4px 16px rgba(0, 0, 0, ${shadowIntensity * 0.3}), 
							0 0 0 0.5px rgba(255, 255, 255, 0.08),
							inset 0 1px 2px rgba(255, 255, 255, 0.1),
							inset 0 -1px 2px rgba(0, 0, 0, 0.1)
						`,
					}}
				/>
				{/* Subtle light reflection/sheen overlay on top edges */}
				<div
					className="absolute top-0 left-0 right-0 h-[40%] pointer-events-none z-1 bg-gradient-to-b from-white/12 via-white/4 to-transparent"
					style={{
						borderRadius: `${borderRadius}px ${borderRadius}px 0 0`,
					}}
				/>
				{/* Shining glass effect on border - seamless radial gradient from edges */}
				{shiningBorder && (
					<>
						{/* Seamless radial gradient border - creates smooth gradient from all edges */}
						<div
							className="absolute inset-0 pointer-events-none z-3"
							style={{
								borderRadius: `${borderRadius}px`,
								background: `
									radial-gradient(circle at top left, 
										rgba(255, 255, 255, ${0.6 * Math.min(shiningIntensity, 1)}) 0%, 
										rgba(255, 255, 255, ${0.3 * Math.min(shiningIntensity, 1)}) 30%,
										transparent 70%
									),
									radial-gradient(circle at top right, 
										rgba(255, 255, 255, ${0.6 * Math.min(shiningIntensity, 1)}) 0%, 
										rgba(255, 255, 255, ${0.3 * Math.min(shiningIntensity, 1)}) 30%,
										transparent 70%
									),
									radial-gradient(circle at bottom left, 
										rgba(255, 255, 255, ${0.6 * Math.min(shiningIntensity, 1)}) 0%, 
										rgba(255, 255, 255, ${0.3 * Math.min(shiningIntensity, 1)}) 30%,
										transparent 70%
									),
									radial-gradient(circle at bottom right, 
										rgba(255, 255, 255, ${0.6 * Math.min(shiningIntensity, 1)}) 0%, 
										rgba(255, 255, 255, ${0.3 * Math.min(shiningIntensity, 1)}) 30%,
										transparent 70%
									),
									linear-gradient(to right, 
										transparent 0%, 
										rgba(255, 255, 255, ${0.2 * Math.min(shiningIntensity, 1)}) 50%, 
										transparent 100%
									),
									linear-gradient(to bottom, 
										transparent 0%, 
										rgba(255, 255, 255, ${0.2 * Math.min(shiningIntensity, 1)}) 50%, 
										transparent 100%
									)
								`,
								maskImage: `
									linear-gradient(#fff 0 0) content-box, 
									linear-gradient(#fff 0 0)
								`,
								maskComposite: 'exclude',
								WebkitMask: `
									linear-gradient(#fff 0 0) content-box, 
									linear-gradient(#fff 0 0)
								`,
								WebkitMaskComposite: 'xor',
								padding: '1px',
							}}
						/>
						{/* Glow effect around the border */}
						<div
							className="absolute inset-0 pointer-events-none z-3"
							style={{
								borderRadius: `${borderRadius}px`,
								boxShadow: `
									inset 0 0 0 1px rgba(255, 255, 255, ${0.3 * Math.min(shiningIntensity, 1)}),
									0 0 ${borderRadius * 0.4}px rgba(255, 255, 255, ${0.25 * Math.min(shiningIntensity, 1)}),
									0 0 ${borderRadius * 0.8}px rgba(255, 255, 255, ${0.15 * Math.min(shiningIntensity, 1)})
								`,
							}}
						/>
					</>
				)}
				{/* Content wrapper with text shadow and auto text color */}
				<div 
					data-liquid-glass-content={id}
					className={`relative z-2 ${
						textShadow === false 
							? '' 
							: typeof textShadow === 'string'
								? ''
								: '**:drop-shadow-sm'
					}`}
					style={{ 
						position: 'relative',
						width: '100%',
						height: '100%',
						// Apply text shadow to all text inside (inherited property)
						textShadow: textShadowValue,
					}}
				>
					{children}
				</div>
			</div>
		</>
	);
};

export default LiquidGlass;


