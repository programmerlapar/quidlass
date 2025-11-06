/**
 * Vitest setup file
 * Configures the testing environment
 */
import { expect, afterEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

