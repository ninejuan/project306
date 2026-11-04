import { disconnectDb } from './lib/db.js';

// Cloudflare Workers provides bindings on platform.env; app code reads process.env.
export async function handle({ event, resolve }) {
	const env = event.platform?.env;

	if (env) {
		for (const [key, value] of Object.entries(env)) {
			if (typeof value === 'string' && process.env[key] === undefined) {
				process.env[key] = value;
			}
		}
	}

	try {
		return await resolve(event);
	} finally {
		await disconnectDb();
	}
}
