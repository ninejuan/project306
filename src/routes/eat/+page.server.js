import req from 'request'
import env from 'dotenv'
import mongo from 'mongoose'
env.config();
mongo.connect(`${process.env.MONGOSRV}`)

export async function load({ params }) {
    const options = {
        method: 'GET',
        uri: 'https://open.neis.go.kr/hub/mealServiceDietInfo',
        qs: {
            KEY: process.env.NEISAPIKEY,
            Type: 'json',
            ATPT_OFCDC_SC_CODE: process.env.SCHOOL_REGION,
            SD_SCHUL_CODE: process.env.SCHOOL_CODE,
            MLSV_FROM_YMD: 20230424,
            MLSV_TO_YMD: 20230428,
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