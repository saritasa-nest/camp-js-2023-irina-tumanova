/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import { defineConfig } from 'vite';
import eslintPlugin from '@nabla/vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [eslintPlugin({ eslintOptions: { cache: false } })],
	resolve: {
		alias: {
			'stream': 'stream-browserify',
			'@js-camp/react': path.resolve(__dirname, 'src'),
			'@js-camp': path.resolve(__dirname, '../../libs'),
		},
	},
});
