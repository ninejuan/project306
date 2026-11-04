import { json } from '@sveltejs/kit';
import mongoose from 'mongoose';
import { connectDb } from '../../lib/db.js';

const TRACKED = [
	'MONGOSRV',
	'NEISAPIKEY',
	'SCHOOL_REGION',
	'SCHOOL_CODE',
	'SCHOOL_NAME',
	'SCHOOL_GRADE',
	'SCHOOL_CLASS',
	'SCHOOL_REGION_KR',
	'CALL_KEY',
	'MAIL_HOST',
	'MAIL_PORT',
	'MAIL_USERNAME',
	'MAIL_PASSWORD',
	'MAIL_SENDER',
	'MAIL_RECEIVER',
	'FIREBASE_APIKEY',
	'FIREBASE_AUTHDOMAIN',
	'FIREBASE_PROJECTID',
	'FIREBASE_STORAGEBUCKET',
	'FIREBASE_MESSAGESENDERID',
	'FIREBASE_APPID',
	'FIREBASE_MEASUREMENTID'
];

export async function GET({ platform }) {
	const result = {
		env: Object.fromEntries(TRACKED.map((key) => [key, Boolean(process.env[key])])),
		platformEnv: platform?.env
			? Object.keys(platform.env).filter((key) => typeof platform.env[key] === 'string')
			: null,
		readyState: mongoose.connection.readyState
	};

	try {
		await connectDb();
		await mongoose.connection.db.admin().ping();
		result.mongo = 'ok';
	} catch (error) {
		result.mongo = 'error';
		result.error = `${error.name}: ${error.message}`;
	}

	result.readyState = mongoose.connection.readyState;

	return json(result);
}
