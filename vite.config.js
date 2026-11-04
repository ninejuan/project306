import adapterAuto from '@sveltejs/adapter-auto';
import adapterCloudflare from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

// Cloudflare Workers Builds sets WORKERS_CI, Cloudflare Pages sets CF_PAGES.
// Keep adapter-auto for the Node/Docker path so both targets keep working.
const adapter =
	process.env.WORKERS_CI || process.env.CF_PAGES ? adapterCloudflare() : adapterAuto();

export default defineConfig({
	plugins: [
		sveltekit({
			adapter,
			preprocess: vitePreprocess()
		})
	]
});
