import { env } from '$env/dynamic/private';
import axios from 'axios';

function ymd(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}${month}${day}`;
}

function currentWeek() {
	const now = new Date();
	const monday = new Date(now);
	monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
	const friday = new Date(monday);
	friday.setDate(monday.getDate() + 4);
	return { monday, friday };
}

function currentSemester(date) {
	const month = date.getMonth() + 1;
	return month >= 3 && month <= 7 ? 1 : 2;
}

export async function load() {
	const now = new Date();
	const { monday, friday } = currentWeek();

	const response = await axios.get('https://open.neis.go.kr/hub/misTimetable', {
		params: {
			KEY: env.NEISAPIKEY,
			Type: 'json',
			pSize: 1000,
			ATPT_OFCDC_SC_CODE: env.SCHOOL_REGION,
			SD_SCHUL_CODE: env.SCHOOL_CODE,
			AY: String(now.getFullYear()),
			SEM: String(currentSemester(now)),
			GRADE: env.SCHOOL_GRADE,
			CLASS_NM: env.SCHOOL_CLASS,
			TI_FROM_YMD: ymd(monday),
			TI_TO_YMD: ymd(friday)
		},
		timeout: 8000
	});

	const rows = response.data?.misTimetable?.[1]?.row ?? [];
	const days = [[], [], [], [], []];

	for (const row of rows) {
		const date = new Date(
			Number(row.ALL_TI_YMD.slice(0, 4)),
			Number(row.ALL_TI_YMD.slice(4, 6)) - 1,
			Number(row.ALL_TI_YMD.slice(6, 8))
		);
		const index = date.getDay() - 1;
		if (index < 0 || index > 4) continue;

		days[index].push({
			classTime: Number(row.PERIO),
			subject: row.ITRT_CNTNT,
			teacher: ''
		});
	}

	for (const day of days) {
		day.sort((a, b) => a.classTime - b.classTime);
	}

	return { res: days };
}
