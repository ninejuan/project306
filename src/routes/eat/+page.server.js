import req from 'request'
import env from 'dotenv'
import mongo from 'mongoose'
import setting from '../../config'
env.config();
// mongo.connect(`${process.env.MONGOSRV}`);

function getWeekDate() {
    const x = new Date();
    const day = x.getDay();
    if (day == 0 || day == 6) {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const monday = new Date(today);
        monday.setDate(today.getDate() - daysSinceMonday);

        const year = monday.getFullYear();
        let month;
        const date = monday.getDate();

        if (monday.getMonth() < 10) {
            month = `0${monday.getMonth() + 1}`;
        } else {
            month = monday.getMonth() + 1;
        }

        return `${year}${month}${date}`
    } else {
        // 평일인 경우
        const today = new Date();
        const dayOfWeek = today.getDay();
        const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const monday = new Date(today);
        monday.setDate(today.getDate() - daysSinceMonday);
        if (monday.getMonth() < 10) {
            return `${monday.getFullYear()}0${monday.getMonth() + 1}${monday.getDate()}`
        } else {
            return `${monday.getFullYear()}${monday.getMonth() + 1}${monday.getDate()}`
        }
    }
}

export async function load({ params }) {
    const options = {
        method: 'GET',
        uri: 'https://open.neis.go.kr/hub/mealServiceDietInfo',
        qs: {
            KEY: process.env.NEISAPIKEY,
            Type: 'json',
            ATPT_OFCDC_SC_CODE: process.env.SCHOOL_REGION,
            SD_SCHUL_CODE: process.env.SCHOOL_CODE,
            pSize: 5,
            MLSV_FROM_YMD: parseInt(getWeekDate()),
        },
    };

    return new Promise((resolve, reject) => {
        req(options, (err, resp, body) => {
            if (err) {
                reject(err);
            } else {
                const data = JSON.parse(body).mealServiceDietInfo[1].row;
                resolve({
                    data
                });
            }
        });
    });
}