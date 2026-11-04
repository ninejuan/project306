import { env } from '$env/dynamic/private';
import mongoose from 'mongoose';

let connecting = null;

export async function connectDb() {
	const uri = env.MONGOSRV;

	if (!uri) {
		throw new Error('MONGOSRV is not configured');
	}

	if (mongoose.connection.readyState === 1) {
		return mongoose;
	}

	if (!connecting) {
		connecting = mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 }).catch((error) => {
			connecting = null;
			throw error;
		});
	}

	return connecting;
}

// Workers runtime forbids reusing I/O objects across requests, so close the socket after each response.
export async function disconnectDb() {
	connecting = null;

	if (mongoose.connection.readyState !== 0) {
		await mongoose.disconnect();
	}
}

export default mongoose;
