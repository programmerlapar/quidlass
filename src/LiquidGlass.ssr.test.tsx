import { fireEvent, render, waitFor } from '@testing-library/react';
import { act } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import LiquidGlass from './LiquidGlass';

class ResizeObserverMock {
	observe() {}
	unobserve() {}
	disconnect() {}
}

class ImageDataMock {
	data: Uint8ClampedArray;
	width: number;
	height: number;

	constructor(data: Uint8ClampedArray, width: number, height: number) {
		this.data = data;
		this.width = width;
		this.height = height;
	}
}

const canvasContext = {
	putImageData: vi.fn(),
};

const toDataURLSpy = vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL');

beforeAll(() => {
	vi.stubGlobal('ResizeObserver', ResizeObserverMock);
	vi.stubGlobal('ImageData', ImageDataMock);
	vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => canvasContext as unknown as CanvasRenderingContext2D);
	toDataURLSpy.mockReturnValue('data:image/png;base64,stub');
});

beforeEach(() => {
	canvasContext.putImageData.mockClear();
	Object.defineProperty(window, 'devicePixelRatio', {
		configurable: true,
		value: 2,
	});
	document.body.innerHTML = '';
});

afterEach(() => {
	vi.clearAllMocks();
	document.body.innerHTML = '';
});

describe('LiquidGlass SSR hydration', () => {
	it('renders stable initial canvas dimensions regardless of devicePixelRatio', () => {
		const html = renderToString(<LiquidGlass />);

		expect(html).toContain('width="300"');
		expect(html).toContain('height="200"');
	});

	it('keeps the inner glow visible without press state enabled', () => {
		const html = renderToString(<LiquidGlass enableInnerGlow />);

		expect(html).toContain('rgba(255, 255, 255, 0.4)');
	});

	it('hydrates without a canvas width/height mismatch and updates DPR after mount', async () => {
		const serverHtml = renderToString(<LiquidGlass />);
		const container = document.createElement('div');
		container.innerHTML = serverHtml;
		document.body.appendChild(container);

		const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		let root: ReturnType<typeof hydrateRoot> | undefined;

		await act(async () => {
			root = hydrateRoot(container, <LiquidGlass />);
		});

		const canvas = container.querySelector('canvas');
		expect(canvas).not.toBeNull();

		await waitFor(() => {
			expect(canvas?.getAttribute('width')).toBe('600');
			expect(canvas?.getAttribute('height')).toBe('400');
		});

		expect(errorSpy).not.toHaveBeenCalled();
		errorSpy.mockRestore();

		act(() => {
			root?.unmount();
		});
	});

	it('does not regenerate the displacement map for unrelated interaction state updates', async () => {
		const { container } = render(<LiquidGlass enableInnerGlow />);

		await waitFor(() => {
			expect(toDataURLSpy).toHaveBeenCalled();
		});

		const initialCallCount = toDataURLSpy.mock.calls.length;
		const glass = container.querySelector('[data-liquid-glass]');
		expect(glass).not.toBeNull();

		fireEvent.mouseMove(glass!, { clientX: 10, clientY: 10 });

		expect(toDataURLSpy).toHaveBeenCalledTimes(initialCallCount);
	});
});

describe('LiquidGlass elasticity', () => {
	it.each([0, -1])('does not produce an invalid transform for an activation zone of %s', async (elasticityActivationZone) => {
		const { container, rerender } = render(
			<LiquidGlass
				globalMousePos={{ x: 150, y: 100 }}
				elasticityActivationZone={elasticityActivationZone}
			/>,
		);
		const glass = container.querySelector<HTMLElement>('[data-liquid-glass]');

		expect(glass).not.toBeNull();
		Object.defineProperty(glass, 'getBoundingClientRect', {
			configurable: true,
			value: () => ({ left: 0, top: 0, width: 300, height: 200 }),
		});
		rerender(
			<LiquidGlass
				globalMousePos={{ x: 150, y: 100 }}
				elasticityActivationZone={elasticityActivationZone}
			/>,
		);

		await waitFor(() => {
			expect(glass?.style.transform).not.toContain('NaN');
		});
	});
});
