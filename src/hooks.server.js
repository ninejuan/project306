import { disconnectDb } from './lib/db.js';

export async function handle({ event, resolve }) {
	try {
		return await resolve(event);
	} finally {
		await disconnectDb();
	}
}
