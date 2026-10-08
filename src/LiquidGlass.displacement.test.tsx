import { cleanup, render, waitFor } from '@testing-library/react';
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
	document.body.innerHTML = '';
});

afterEach(() => {
	cleanup();
	vi.clearAllMocks();
	document.body.innerHTML = '';
});

const renderDisplacement = async (swirlIntensity: number) => {
	const { unmount } = render(<LiquidGlass swirlIntensity={swirlIntensity} />);

	await waitFor(() => {
		expect(canvasContext.putImageData).toHaveBeenCalled();
	});

	const imageData = canvasContext.putImageData.mock.lastCall?.[0] as ImageDataMock;
	const displacement = imageData.data.slice();
	unmount();
	canvasContext.putImageData.mockClear();

	return displacement;
};

describe('LiquidGlass displacement intensity', () => {
	it('clamps negative and non-finite values to zero strength', async () => {
		const zeroIntensity = await renderDisplacement(0);

		expect(await renderDisplacement(-5)).toEqual(zeroIntensity);
		expect(await renderDisplacement(Number.NaN)).toEqual(zeroIntensity);
		expect(await renderDisplacement(Number.NEGATIVE_INFINITY)).toEqual(zeroIntensity);
		expect(await renderDisplacement(Number.POSITIVE_INFINITY)).toEqual(zeroIntensity);
	});

	it('clamps values above the documented maximum to maximum strength', async () => {
		const maximumIntensity = await renderDisplacement(20);

		expect(await renderDisplacement(21)).toEqual(maximumIntensity);
		expect(await renderDisplacement(Number.MAX_VALUE)).toEqual(maximumIntensity);
	});
});
