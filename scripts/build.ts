import { rollup, RollupOptions } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));

const configs: RollupOptions[] = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: packageJson.types,
      format: 'esm',
    },
    plugins: [dts()],
    external: [/\.css$/],
  },
];

async function build() {
  console.log('Building package...');
  for (let i = 0; i < configs.length; i++) {
    const config = configs[i];
    console.log(`Building config ${i + 1}/${configs.length}...`);
    const bundle = await rollup(config);
    if (Array.isArray(config.output)) {
      for (const output of config.output) {
        await bundle.write(output as any);
      }
    } else if (config.output) {
      await bundle.write(config.output as any);
    }
    await bundle.close();
  }
  console.log('Build completed successfully!');
}

build().catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});

