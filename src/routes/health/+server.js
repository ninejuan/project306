import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import axios from 'axios';
import mongoose from 'mongoose';
import { connectDb } from '../../lib/db.js';

function todayYmd() {
	const now = new Date();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	return Number(`${now.getFullYear()}${month}${day}`);
}

export async function GET() {
	const status = { ok: true, mongo: false, neis: false };

	try {
		await connectDb();
		await mongoose.connection.db.admin().ping();
		status.mongo = true;
	} catch (error) {
		status.ok = false;
		console.error('health: mongo check failed', error);
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
			timeout: 5000
		});
		const code = response.data?.RESULT?.CODE;
		status.neis = Boolean(response.data?.mealServiceDietInfo) || code === 'INFO-200';
	} catch (error) {
		status.ok = false;
		console.error('health: neis check failed', error);
	}

	return json(status, { status: status.ok ? 200 : 503 });
}
