import env from 'dotenv'
import mongo from 'mongoose'
import notiSchema from '../../../models/noti.js'
import keySchema from '../../../models/secret.js'
import ax from '../../../func/antiXss.js'
import { redirect } from '@sveltejs/kit';

env.config();
mongo.connect(`${process.env.MONGOSRV}`);

function randomInt(min, max) {
    var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum;
}

export const actions = {
    // @ts-ignore
    default: async ({ cookies, request }) => {
        delete mongo.connection.models['notices'];
        delete mongo.connection.models['secret'];

        const data = await request.formData();

        if (!data || !data.get('secretkey') || !data.get('writer') || !data.get('Title') || !data.get('content')) {
            throw redirect(302, '/notice/write');
        }

        const key = await keySchema.findOne({ key: data.get('secretkey') }).lean().exec();
        if (!key) throw redirect(302, '/notice/write');

        const now = new Date();

        await notiSchema.create({
            when: {
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                date: now.getDate(),
                hour: now.getHours(),
                minute: now.getMinutes()
            },
            Writer: data.get('writer'),
            Title: data.get('Title'),
            Content: data.get('content').replace('<img', '<img width="70%" height="40%"'),
            DocumentNum: parseInt(`${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getMinutes() + now.getHours()}${randomInt(1000, 9999)}`)
        });

        throw redirect(302, '/notice');
    }
};