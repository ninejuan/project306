import notiSchema from '../models/noti'
import axios from 'axios'
import env from 'dotenv'
import mongo from 'mongoose'
env.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

mongo.connect(`${process.env.MONGOSRV}`)

const strs = {
    date: {
        weekend: [
            '주말은 참 빠르게 흘러가요.',
            '오늘은 집에서 푹 쉬어보는 건 어떨까요?',
            '오늘은 경치 좋은 곳에서 산책하는건 어떠세요?',
            '가끔씩은 친구와 만나서 수다를 떨어보아요.',
        ],
        weekday: {
            mon: [
                '한 주의 시작이에요. 오늘도 화이팅!',
                '오늘은 무슨 일이 생길까요?',
                '주말은 어떻게 보내셨나요?',
                '금요일까지 화이팅!',
                '월요일이지만, 오늘도 화이팅!',
                '주말은 참 짧아요. 그렇죠?',
                '아이쿠, 벌써 월요일이에요'
            ],
            fri: [
                '오늘만 버티면 주말이에요. 조금만 힘을 내 보아요.',
                '주말은 어떻게 보내실 건가요?',
                '금요일은 언제나 설레요.',
                '조금만 기다리면 주말이에요.',
                '토요일까지 얼마 남지 않았네요.'
            ],
            other: [
                '오늘도 화이팅! 힘내세요!',
                '오늘은 무슨 일이 생길까요?',
                '집에 가고 싶으시죠?',
                '늘 그래왔듯이 오늘도 화이팅!',
                '오늘은 어떤 일이 생길까요?',
                '조금만 있으면 금요일이에요.',
                '피곤하면 조금 쉬었다 할까요?'
            ] // 월, 금 제외한 나머지 요일 (평일)
        }
    }
}

/** 요일에 따라 strs에서 랜덤한 값을 받아오는 코드 */
function getRandomString() {
    const date = new Date().getDay();
    let dateStr = convertNumToDate(date);
    if (date === 0 || date === 6) {
        // 주말인 경우
        return getRandomItemFromArray(strs.date.weekend);
    } else if (date === 1 || date === 5) {
        // 월요일인 경우
        return getRandomItemFromArray(strs.date.weekday.mon);
    } else if (date === 5) {
        // 금요일인 경우
        return getRandomItemFromArray(strs.date.weekday.fri);
    } else {
        // 화요일, 수요일, 목요일인 경우
        return getRandomItemFromArray(strs.date.weekday.other);
    }

}

/** 요일 코드에 따라 요일 이름으로 변환해주는 함수 */
function convertNumToDate(num) {
    const day = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const dayName = day[num];
    return dayName;
}

/** Array에서 랜덤한 값 뽑는 함수 */
function getRandomItemFromArray(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}

/** 급식 요청에 필요한 날짜 리턴하는 함수 */
function getWeekDate() {
    const baseDate = new Date();

    const year = baseDate.getFullYear();
    let month = baseDate.getMonth() + 1;
    let date = baseDate.getDate();

    // 5월을 05월로 변환
    if (baseDate.getMonth() < 10) {
        month = `0${baseDate.getMonth() + 1}`;
    }
    if (baseDate.getDate() < 10) {
        date = `0${baseDate.getDate()}`
    }

    return `${year}${month}${date}`
}

/** 오늘의 급식 받아오는 코드 */
async function getTodayMeal() {
    const options = {
        method: 'GET',
        uri: 'https://open.neis.go.kr/hub/mealServiceDietInfo',
        params: {
            KEY: process.env.NEISAPIKEY,
            Type: 'json',
            ATPT_OFCDC_SC_CODE: process.env.SCHOOL_REGION,
            SD_SCHUL_CODE: process.env.SCHOOL_CODE,
            pSize: 1,
            MLSV_FROM_YMD: parseInt(getWeekDate()),
        },
    };

    try {
        const response = await axios.get(options.uri, options);
        const data = response.data.mealServiceDietInfo[1].row;

        return {
            status: true,
            menu: data
        };
    } catch (error) {
        return {
            status: false,
            menu: null
        };
    }
}

/** Num에 들어온 값만큼 알림장 가져와서 리턴하는 함수 */
async function getNoti(num) {
    const data = (await notiSchema.find().lean().exec()).reverse();
    let notices = [];
    if (data) {
        for (let i=0; i<num; i++) {
            data[i] ? notices.push({
                title: data[i].Title,
                url: `/notice/view?id=${data[i].DocumentNum}`
            }) : notices.push({
                title: '',
                url: `/`
            })
        }
    } else {
        notices.push({
            title: '존재하지 않아요',
            url: '/'
        })
    }
    return notices;
}

export function load({ params }) {
    delete mongo.connection.models['notices'];

    return {
        str: getRandomString(),
        meal: getTodayMeal(),
        noti: getNoti(3)
    };
}