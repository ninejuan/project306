import config from '../config.js'
import env from 'dotenv'
import ttable from 'comcigan-parser'
const tt = new ttable();
env.config();

async function getSd() {
	await tt.init();

	const schoolList = await tt.search(process.env.SCHOOL_NAME);
	const targetSchool = schoolList.find((school) => {
		return school.region === process.env.SCHOOL_REGION_KR && school.name === process.env.SCHOOL_NAME;
	});

	await tt.setSchool(targetSchool.code);
	const result = await tt.getTimetable();
	return result[process.env.SCHOOL_GRADE][process.env.SCHOOL_CLASS];
}

export function load({ params }) {
	process.stdout.write('\u0007');
	let res = getSd();
	return {
		res: res
	};
}

// replaceAll('조은', '은솔신')