import { disconnectDb } from './lib/db.js';

export async function handle({ event, resolve }) {
	try {
		return await resolve(event);
	} finally {
		await disconnectDb();
	}
}

export function handleError({ error }) {
	console.error(error);
	return { message: error?.message ?? 'Internal Error' };
}
