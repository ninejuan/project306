import { env } from '$env/dynamic/private'
import ttable from '../../lib/comcigan.js'
const tt = new ttable();

async function getSd() {
	await tt.init();

	const schoolList = await tt.search(env.SCHOOL_NAME);
	const targetSchool = schoolList.find((school) => {
		return school.region === env.SCHOOL_REGION_KR && school.name === env.SCHOOL_NAME;
	});

	await tt.setSchool(targetSchool.code);
	const result = await tt.getTimetable();
	return result[env.SCHOOL_GRADE][env.SCHOOL_CLASS];
}

export async function load({ params }) {
	process.stdout.write('\u0007');
	const res = await getSd();
	return {
		res: res
	};
}

// replaceAll('조은', '은솔신')