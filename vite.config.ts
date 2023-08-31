import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));
export default defineConfig({
    plugins: [dts()],

    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'monaco-html-linter-plugin',
            fileName: 'index',
            formats: ['es', 'umd', 'cjs'],
        },
        rollupOptions: {
            external: ['htmlhint'],
        },
    },
});
