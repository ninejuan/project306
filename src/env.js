import { defineEnvVars } from '@sveltejs/kit/env';

const optional = () => ({ schema: (value) => value });

export const variables = defineEnvVars({
	MONGOSRV: optional(),
	NEISAPIKEY: optional(),
	SCHOOL_REGION: optional(),
	SCHOOL_CODE: optional(),
	SCHOOL_NAME: optional(),
	SCHOOL_GRADE: optional(),
	SCHOOL_CLASS: optional(),
	SCHOOL_REGION_KR: optional(),
	CALL_KEY: optional(),
	MAIL_HOST: optional(),
	MAIL_PORT: optional(),
	MAIL_USERNAME: optional(),
	MAIL_PASSWORD: optional(),
	MAIL_SENDER: optional(),
	MAIL_RECEIVER: optional(),
	FIREBASE_APIKEY: optional(),
	FIREBASE_AUTHDOMAIN: optional(),
	FIREBASE_PROJECTID: optional(),
	FIREBASE_STORAGEBUCKET: optional(),
	FIREBASE_MESSAGESENDERID: optional(),
	FIREBASE_APPID: optional(),
	FIREBASE_MEASUREMENTID: optional()
});
