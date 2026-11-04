import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import axios from 'axios';
import mongoose from 'mongoose';
import { connectDb } from '../../lib/db.js';
import notiSchema from '../../models/noti.js';

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

function todayYmd() {
	const now = new Date();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	return Number(`${now.getFullYear()}${month}${day}`);
}

export async function GET() {
	const result = {
		env: Object.fromEntries(TRACKED.map((key) => [key, Boolean(env[key])])),
		processEnv: Object.fromEntries(TRACKED.map((key) => [key, Boolean(process.env[key])])),
		readyState: mongoose.connection.readyState
	};

	try {
		await connectDb();
		await mongoose.connection.db.admin().ping();
		result.mongo = 'ok';

		try {
			result.notices = await notiSchema.countDocuments().exec();
		} catch (error) {
			result.notices = 'error';
			result.noticesError = `${error.name}: ${error.message}`;
		}
	} catch (error) {
		result.mongo = 'error';
		result.error = `${error.name}: ${error.message}`;
	}

	try {
		const response = await axios.get('https://open.neis.go.kr/hub/mealServiceDietInfo', {
			params: {
				KEY: env.NEISAPIKEY,
				Type: 'json',
				ATPT_OFCDC_SC_CODE: env.SCHOOL_REGION,
				SD_SCHUL_CODE: env.SCHOOL_CODE,
				pSize: 1,
				MLSV_FROM_YMD: todayYmd()
			},
			timeout: 8000
		});
		result.neis = response.status;
		result.neisHasData = Boolean(response.data?.mealServiceDietInfo);
		result.neisCode = response.data?.RESULT?.CODE ?? null;
	} catch (error) {
		result.neis = 'error';
		result.neisError = `${error.name}: ${error.message}`;
	}

	result.readyState = mongoose.connection.readyState;

	return json(result);
}
