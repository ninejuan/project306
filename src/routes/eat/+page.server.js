import axios from 'axios'
import env from 'dotenv'
env.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

function getWeekDate() {
    const day = new Date().getDay();
    if (day == 0 || day == 6) {
        // 주말인 경우
        const today = new Date();
        const dayOfWeek = today.getDay();
        const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const monday = new Date(today);
        monday.setDate(today.getDate() - daysSinceMonday);

        const year = monday.getFullYear();
        let month = monday.getMonth() + 1;
        let date = monday.getDate();

        // 5월을 05월로 변환
        if (monday.getMonth() < 10) {
            month = `0${monday.getMonth() + 1}`;
        }
        if (monday.getDate() < 10) {
            date = `0${monday.getDate()}`
        }


        return `${year}${month}${date}`
    } else {
        // 평일인 경우
        const today = new Date();
        const dayOfWeek = today.getDay();
        const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const monday = new Date(today);
        monday.setDate(today.getDate() - daysSinceMonday);

        const year = monday.getFullYear();
        let month = monday.getMonth() + 1;
        let date = monday.getDate();

        // 5월을 05월로 변환
        if (monday.getMonth() < 10) {
            month = `0${monday.getMonth() + 1}`;
        }
        if (monday.getDate() < 10) {
            date = `0${monday.getDate()}`
        }


        return `${year}${month}${date}`
    }
}

export async function load({ params }) {
    const options = {
        method: 'GET',
        uri: 'https://open.neis.go.kr/hub/mealServiceDietInfo',
        params: {
            KEY: process.env.NEISAPIKEY,
            Type: 'json',
            ATPT_OFCDC_SC_CODE: process.env.SCHOOL_REGION,
            SD_SCHUL_CODE: process.env.SCHOOL_CODE,
            pSize: 5,
            MLSV_FROM_YMD: parseInt(getWeekDate()),
        },
    };
    
    try {
        const response = await axios.get(options.uri, options);
        const data = response.data.mealServiceDietInfo[1].row;

        return {
            data,
        };
    } catch (error) {
        throw error;
    }
}