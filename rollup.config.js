import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import { config } from 'dotenv';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import polyfills from "rollup-plugin-node-polyfills";

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	// external: ['fs', 'buffer'],
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js',
		globals: {
			process: 'process$1',
			buffer: 'buffer$1',
			fs: 'fs$2',
			path: 'path$2',
			os: 'os$1',
			util: 'util$4',
			child_process: 'require$$3$1',
			https: 'require$$4',
			http: 'require$$5',
			stream: 'stream$1',
			zlib: 'zlib',
			events: 'require$$0$2',
			assert: 'assert$1',
			url: 'url',
			net: 'net',
			tls: 'tls',
			constants: 'require$$0$3',
			string_decoder: 'require$$1$2',
			readline: 'require$$2$1'
		} 
	},
	plugins: [
		replace({
			preventAssignment: true,
			// stringify the object       
			__randomPlace: JSON.stringify({
			  env: {
				...config().parsed // attached the .env config
			  }
			}),
		}),
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		json(),
		polyfills(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
