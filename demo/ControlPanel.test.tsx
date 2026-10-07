import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ControlPanel } from './ControlPanel';

describe('ControlPanel numeric controls', () => {
	it('keeps explicit zero values instead of replacing them with defaults', () => {
		render(
			<ControlPanel
				props={{
					borderRadius: 0,
					blur: 0,
					contrast: 0,
					brightness: 0,
					saturation: 0,
					shadowIntensity: 0,
					swirlIntensity: 0,
					swirlScale: 0,
					swirlRadius: 0,
					edgeThicknessPx: 0,
					zIndex: 0,
					shiningBorder: true,
					shiningIntensity: 0,
					enableMorphicTransitions: true,
					expandedWidth: 0,
					expandedHeight: 0,
					collapsedWidth: 0,
					collapsedHeight: 0,
				}}
				onPropChange={vi.fn()}
			/>,
		);

		for (const label of [
			'Border Radius: 0px',
			'Blur: 0px',
			'Contrast: 0',
			'Brightness: 0',
			'Saturation: 0',
			'Shadow Intensity: 0',
			'Swirl Intensity: 0',
			'Swirl Scale: 0',
			'Swirl Radius: 0',
			'Edge Thickness: 0px',
			'Z-Index: 0',
			'Shining Intensity: 0',
			'Expanded Width: 0px',
			'Expanded Height: 0px',
			'Collapsed Width: 0px',
			'Collapsed Height: 0px',
		]) {
			expect(screen.getByText(label)).toBeTruthy();
		}
	});
});
