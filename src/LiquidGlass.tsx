import type React from 'react';
import { memo, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

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
	 * Swirl offset controls the gap between component edges and the swirl effect band.
	 * 0.0 = no gap, swirl effect starts at the edges (default)
	 * 1.0 = maximum gap, swirl effect starts at the center
	 * Values between 0.0 and 1.0 create a gap, moving the swirl effect inward from edges
	 * The gap is the distance from component edges to where the swirl effect begins
	 * @default 0.0
	 */
	swirlOffset?: number;
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
	 * Text color for text inside the glass container
	 * Can be any valid CSS color value (e.g., 'white', '#fff', 'rgb(255, 255, 255)', 'rgba(255, 255, 255, 1)')
	 * @default 'rgb(255, 255, 255)'
	 */
	textColor?: string;
	/**
	 * Tint color for the glass overlay
	 * Can be any valid CSS color value (e.g., 'rgba(34, 197, 94, 0.15)' for green tint, 'rgba(239, 68, 68, 0.15)' for red tint)
	 * When specified, adds a colored overlay to tint the glass effect
	 * @default undefined
	 */
	tintColor?: string;
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
 * @param swirlIntensity - Swirl intensity for vortex effect (default: 8)
 * @param swirlScale - Swirl scale controls size/zoom (default: 1.0)
 * @param swirlRadius - Swirl radius controls extent from center/edges (default: 1.0)
 * @param edgeThicknessPx - Thickness in pixels of edge band where swirl is applied (default: 12)
 * @param swirlOffset - Swirl offset controls gap from edges: 0.0=no gap (edges), 1.0=max gap (center) (default: 0.0)
 * @param swirlEdges - Which corner/edge region should have swirl effect (default: 'all')
	 * @param zIndex - Z-index for layering (default: 9999)
	 * @param textShadow - Text shadow for text inside (default: true, or custom CSS value)
	 * @param textColor - Text color for text inside (default: 'rgb(255, 255, 255)', any valid CSS color)
	 * @param tintColor - Tint color for the glass overlay (default: undefined, any valid CSS color)
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
	swirlIntensity = 8,
	swirlScale = 1.0,
	swirlRadius = 1.0,
	edgeThicknessPx = 12,
	swirlOffset = 0.0,
	swirlEdges = 'all',
	zIndex = 9999,
	textShadow = true,
	textColor = 'rgb(255, 255, 255)',
	tintColor,
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
	const lastSizeRef = useRef({ width: 300, height: 200 });

	const canvasDPI = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

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

		// Preallocate typed array for better performance
		const totalPixels = w * h;
		const rawValues = new Float32Array(totalPixels * 2);

		// Hoist invariant calculations outside the loop for better performance
		const containerW = w;
		const containerH = h;
		const halfW = containerW / 2;
		const halfH = containerH / 2;
		const sdfW = halfW - borderRadius * canvasDPI;
		const sdfH = halfH - borderRadius * canvasDPI;
		const sdfRadius = borderRadius * canvasDPI;
		const maxRadius = Math.sqrt(0.5 * 0.5 + 0.5 * 0.5); // Max distance from center
		const minDimension = Math.min(w, h);
		const maxDimension = Math.max(w, h);
		
		// Make threshold adaptive to component size for small components
		// CRITICAL: Threshold must never exceed the maximum possible distance from any edge
		// Maximum distance from an edge is half the smallest dimension (minDimension / 2)
		const maxPossibleDistance = minDimension / 2;
		
		// Calculate adaptive threshold based on component size
		// For very small components (< 60px), use larger percentage to ensure visibility
		// For small components (60-100px), use moderate percentage
		// For larger components, use the configured edgeThicknessPx
		let adaptiveThreshold: number;
		if (minDimension < 60) {
			// For very small components (floating buttons), use 80% of smallest dimension
			// But cap at maxPossibleDistance to ensure it works
			adaptiveThreshold = Math.min(minDimension * 0.8, maxPossibleDistance);
		} else if (minDimension < 100) {
			// For small components (buttons), use 60% of smallest dimension
			adaptiveThreshold = Math.min(minDimension * 0.6, maxPossibleDistance);
		} else {
			// For larger components, use configured value
			adaptiveThreshold = Math.min(edgeThicknessPx * canvasDPI, minDimension * 0.4, maxPossibleDistance);
		}
		// Ensure threshold is at least 1 pixel but never exceeds max possible distance
		const threshold = Math.max(Math.min(adaptiveThreshold, maxPossibleDistance), 1);
		
		// Calculate base displacement factor, ensuring minimum for small components
		// This ensures swirl effect is visible on buttons and small components
		const baseDisplacementFactor = Math.max((minDimension / 100.0) * 0.05, 0.01);
		const displacementFactor = baseDisplacementFactor * (swirlIntensity / 10.0);
		const swirlScaleClamped = Math.max(swirlScale, 0.1);
		const swirlRadiusClamped = Math.max(swirlRadius, 0.1);
		const swirlIntensityFactor = swirlIntensity / 10;
		const twoPi = Math.PI * 2;

		// Precompute swirl region checks if needed
		const isSwirlEdgesArray = Array.isArray(swirlEdges);
		const isSwirlEdgesAll = swirlEdges === 'all';

		let maxScale = 0;

		// Generate displacement map data with swirly vortex effect
		// Use nested loops for better cache locality
		for (let y = 0; y < h; y++) {
			const pxY = y + 0.5;
			const uvY = y / h;
			const iy = uvY - 0.5;
			const isTopHalf = pxY < halfH;
			const isBottomHalf = pxY >= halfH;

			for (let x = 0; x < w; x++) {
				const pxX = x + 0.5;
				const uvX = x / w;
				const uv = { x: uvX, y: uvY };
				const ix = uvX - 0.5;

				// Check if pixel is inside the rounded rectangle boundary using SDF
				const centeredX = pxX - halfW;
				const centeredY = pxY - halfH;
				
				const sdfValue = roundedRectSDF(
					centeredX,
					centeredY,
					sdfW,
					sdfH,
					sdfRadius
				);
				
				const isInsideRoundedRect = sdfValue < 0;
				
				// Distance from container edges (straight edges) - not rounded boundary
				// This ensures swirl effect stays at edges regardless of border radius
				const distFromLeft = pxX;
				const distFromRight = containerW - pxX;
				const distFromTop = pxY;
				const distFromBottom = containerH - pxY;
				
				// Calculate maximum distance from edges to center for offset calculation
				const maxDistanceToCenter = Math.min(halfW, halfH);
				
				// Calculate offset distance: gap between component edges and swirl effect band
				// swirlOffset = 0.0 means no gap (swirl at edges)
				// swirlOffset > 0.0 creates a gap (swirl moves inward from edges)
				const offsetDistance = swirlOffset * maxDistanceToCenter;
				
				// Calculate adjusted distance for each edge separately
				// This ensures swirl effect applies to ALL edges, not just the closest one
				const adjustedDistFromLeft = distFromLeft - offsetDistance;
				const adjustedDistFromRight = distFromRight - offsetDistance;
				const adjustedDistFromTop = distFromTop - offsetDistance;
				const adjustedDistFromBottom = distFromBottom - offsetDistance;
				
				// Calculate influence from each edge separately
				// This ensures all edges get the swirl effect, especially important for small components
				// For very small components, ensure we can still see the effect even at the edges
				// Use a minimum threshold of at least 2 pixels to ensure visibility
				const minThreshold = Math.max(threshold, 2);
				
				const influenceFromLeft = (adjustedDistFromLeft >= 0) 
					? smoothStep(minThreshold, 0, adjustedDistFromLeft) : 0;
				const influenceFromRight = (adjustedDistFromRight >= 0) 
					? smoothStep(minThreshold, 0, adjustedDistFromRight) : 0;
				const influenceFromTop = (adjustedDistFromTop >= 0) 
					? smoothStep(minThreshold, 0, adjustedDistFromTop) : 0;
				const influenceFromBottom = (adjustedDistFromBottom >= 0) 
					? smoothStep(minThreshold, 0, adjustedDistFromBottom) : 0;
				
				// Use maximum influence from any edge
				// This ensures the swirl effect is visible on all edges
				const maxEdgeInfluence = Math.max(
					influenceFromLeft,
					influenceFromRight,
					influenceFromTop,
					influenceFromBottom
				);
				
				// Determine which corner/edge region this pixel is in
				const isLeftHalf = pxX < halfW;
				const isRightHalf = pxX >= halfW;
				
				// Check if this pixel is in the selected swirl region(s)
				let isInSwirlRegion = true;
				if (!isSwirlEdgesAll) {
					if (isSwirlEdgesArray) {
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
				
				// Apply swirl effect based on edge influence
				// Use maximum influence from any edge to ensure all edges get the swirl effect
				// This is especially important for small components where all edges should be visible
				const borderInfluence = isInSwirlRegion ? maxEdgeInfluence : 0.0;

				// Convert to polar coordinates for vortex effect
				const angle = Math.atan2(iy, ix);
				const radius = Math.sqrt(ix * ix + iy * iy);
				const normalizedRadius = Math.min(radius / maxRadius, 1.0);

				// Apply swirl scale and radius
				const scaledRadius = normalizedRadius / swirlScaleClamped;
				const effectiveRadius = normalizedRadius * swirlRadiusClamped;

				// Create vortex effect
				const swirlStrength = borderInfluence * scaledRadius * effectiveRadius * swirlIntensityFactor;
				
				// Calculate final angle with vortex rotation
				const finalAngle = angle + swirlStrength * twoPi;
				
				// Slight radius variation for more organic feel
				const radiusVariation = 1.0 + swirlStrength * 0.1 * Math.sin(angle * 3);
				const newRadius = radius * radiusVariation;

				// Convert back to Cartesian with vortex distortion
				const swirlX = Math.cos(finalAngle) * newRadius;
				const swirlY = Math.sin(finalAngle) * newRadius;
			
				const pos = {
					x: (swirlX * displacementFactor * borderInfluence + ix * (1 - displacementFactor * borderInfluence * 0.3)) + 0.5,
					y: (swirlY * displacementFactor * borderInfluence + iy * (1 - displacementFactor * borderInfluence * 0.3)) + 0.5,
				};

				const dx = (pos.x - uv.x) * w;
				const dy = (pos.y - uv.y) * h;
				const absDx = Math.abs(dx);
				const absDy = Math.abs(dy);
				maxScale = Math.max(maxScale, absDx, absDy);
				
				// Store in preallocated array
				const pixelIndex = y * w + x;
				rawValues[pixelIndex * 2] = dx;
				rawValues[pixelIndex * 2 + 1] = dy;
			}
		}

		// Calculate optimal scale automatically based on displacement values
		// Ensure minimum scale for visible effect while maximizing the output
		maxScale = Math.max(maxScale * 0.5, 1.0);

		// Convert displacement values to RGB channels
		// Normalize to [-0.5, 0.5] range, then shift to [0, 1] for RGB
		const maxScaleInv = maxScale > 0 ? 1.0 / maxScale : 0;
		for (let i = 0; i < data.length; i += 4) {
			const pixelIndex = i / 4;
			const arrayIndex = pixelIndex * 2;
			
			// Normalize displacement values
			const normalizedDx = rawValues[arrayIndex] * maxScaleInv;
			const normalizedDy = rawValues[arrayIndex + 1] * maxScaleInv;
			
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
			const currentScale = feDisplacementMap.getAttribute('scale');
			// Only update if scale actually changed
			if (currentScale !== filterScale.toString()) {
				feDisplacementMap.setAttribute(
					'scale',
					filterScale.toString(),
				);
			}
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
		swirlIntensity,
		swirlScale,
		swirlRadius,
		edgeThicknessPx,
		swirlOffset,
		swirlEdges,
		roundedRectSDF,
		smoothStep,
		length,
	]);

	// ResizeObserver to track container size changes with throttling
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		let rafId: number | null = null;
		const MIN_SIZE_CHANGE = 2; // Only update if size changed by at least 2px

		const resizeObserver = new ResizeObserver((entries) => {
			if (rafId !== null) return; // Throttle with requestAnimationFrame

			rafId = requestAnimationFrame(() => {
				rafId = null;
				
				for (const entry of entries) {
					const { width: newWidth, height: newHeight } = entry.contentRect;
					const clampedW = Math.max(newWidth, 100);
					const clampedH = Math.max(newHeight, 100);
					
					// Only update if size changed meaningfully
					const lastSize = lastSizeRef.current;
					if (
						Math.abs(clampedW - lastSize.width) >= MIN_SIZE_CHANGE ||
						Math.abs(clampedH - lastSize.height) >= MIN_SIZE_CHANGE
					) {
						lastSizeRef.current = { width: clampedW, height: clampedH };
						setWidth(clampedW);
						setHeight(clampedH);
					}
				}
			});
		});

		resizeObserver.observe(container);

		return () => {
			if (rafId !== null) {
				cancelAnimationFrame(rafId);
			}
			resizeObserver.disconnect();
		};
	}, []);

	// Update shader when component mounts or parameters change
	useEffect(() => {
		updateShader();
	}, [updateShader]);

	// Memoize text shadow value for CSS injection
	const textShadowValue = useMemo(() => {
		if (textShadow === false) return 'none';
		if (typeof textShadow === 'string') return textShadow;
		return '0 1px 2px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4)';
	}, [textShadow]);

	// Memoize shining intensity calculations
	const clampedShiningIntensity = useMemo(() => Math.min(shiningIntensity, 1), [shiningIntensity]);

	return (
		<>
			{/* CSS style injection to ensure text color and textShadow apply to all child elements including buttons */}
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
						color: ${textColor} !important;
						${textShadow !== false ? `text-shadow: ${textShadowValue} !important;` : ''}
					}
				`}
			</style>
			{/* SVG Filter for displacement map */}
			<svg
				ref={svgRef}
				xmlns="http://www.w3.org/2000/svg"
				width="0"
				height="0"
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					pointerEvents: 'none',
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
				style={{
					display: 'none',
				}}
			/>

			{/* Glass Container */}
			<div
				ref={containerRef}
				className={className}
				data-liquid-glass="true"
				style={{
					position: 'relative',
					width: '100%',
					height: '100%',
					overflow: 'hidden',
					borderRadius: `${borderRadius}px`,
					zIndex: zIndex,
				}}
			>
				{/* Backdrop layer with blur and displacement filter */}
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						pointerEvents: 'none',
						backgroundColor: 'rgba(255, 255, 255, 0.02)',
						backdropFilter: `blur(${blur}px) contrast(${contrast}) brightness(${brightness}) saturate(${saturation})`,
						WebkitBackdropFilter: `blur(${blur}px) contrast(${contrast}) brightness(${brightness}) saturate(${saturation})`,
						filter: `url(#${id}_filter)`,
						borderRadius: `${borderRadius}px`,
					}}
				/>
				{/* Soft depth shadow with multiple layers for edge glow */}
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						pointerEvents: 'none',
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
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						height: '40%',
						pointerEvents: 'none',
						zIndex: 1,
						background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04), transparent)',
						borderRadius: `${borderRadius}px ${borderRadius}px 0 0`,
					}}
				/>
				{/* Tint color overlay */}
				{tintColor && (
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							pointerEvents: 'none',
							zIndex: 1,
							backgroundColor: tintColor,
							borderRadius: `${borderRadius}px`,
						}}
					/>
				)}
				{/* Shining glass effect on border - seamless radial gradient from edges */}
				{shiningBorder && (
					<>
						{/* Seamless radial gradient border - creates smooth gradient from all edges */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								pointerEvents: 'none',
								zIndex: 3,
								borderRadius: `${borderRadius}px`,
								background: `
									radial-gradient(circle at top left, 
										rgba(255, 255, 255, ${0.6 * clampedShiningIntensity}) 0%, 
										rgba(255, 255, 255, ${0.3 * clampedShiningIntensity}) 30%,
										transparent 70%
									),
									radial-gradient(circle at top right, 
										rgba(255, 255, 255, ${0.6 * clampedShiningIntensity}) 0%, 
										rgba(255, 255, 255, ${0.3 * clampedShiningIntensity}) 30%,
										transparent 70%
									),
									radial-gradient(circle at bottom left, 
										rgba(255, 255, 255, ${0.6 * clampedShiningIntensity}) 0%, 
										rgba(255, 255, 255, ${0.3 * clampedShiningIntensity}) 30%,
										transparent 70%
									),
									radial-gradient(circle at bottom right, 
										rgba(255, 255, 255, ${0.6 * clampedShiningIntensity}) 0%, 
										rgba(255, 255, 255, ${0.3 * clampedShiningIntensity}) 30%,
										transparent 70%
									),
									linear-gradient(to right, 
										transparent 0%, 
										rgba(255, 255, 255, ${0.2 * clampedShiningIntensity}) 50%, 
										transparent 100%
									),
									linear-gradient(to bottom, 
										transparent 0%, 
										rgba(255, 255, 255, ${0.2 * clampedShiningIntensity}) 50%, 
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
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								pointerEvents: 'none',
								zIndex: 3,
								borderRadius: `${borderRadius}px`,
								boxShadow: `
									inset 0 0 0 1px rgba(255, 255, 255, ${0.3 * clampedShiningIntensity}),
									0 0 ${borderRadius * 0.4}px rgba(255, 255, 255, ${0.25 * clampedShiningIntensity}),
									0 0 ${borderRadius * 0.8}px rgba(255, 255, 255, ${0.15 * clampedShiningIntensity})
								`,
							}}
						/>
					</>
				)}
				{/* Content wrapper with text shadow */}
				<div 
					data-liquid-glass-content={id}
					style={{ 
						position: 'relative',
						width: '100%',
						height: '100%',
						zIndex: 2,
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

export default memo(LiquidGlass);

