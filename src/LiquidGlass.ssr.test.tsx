import { waitFor } from '@testing-library/react';
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

beforeAll(() => {
	vi.stubGlobal('ResizeObserver', ResizeObserverMock);
	vi.stubGlobal('ImageData', ImageDataMock);
	vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => canvasContext as unknown as CanvasRenderingContext2D);
	vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,stub');
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
});
