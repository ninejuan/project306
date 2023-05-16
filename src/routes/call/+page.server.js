import env from 'dotenv'
import mongo from 'mongoose'
import helpSchema from '../../models/help.js'
import keySchema from '../../models/secret'
import { redirect } from '@sveltejs/kit';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
env.config();
mongo.connect(`${process.env.MONGOSRV}`)

export async function load({ url }) {
    delete mongo.connection.models['help'];delete mongo.connection.models['secret'];

    return {
        secrets: {
            apiKey: process.env.FIREBASE_APIKEY,
            authDomain: process.env.FIREBASE_AUTHDOMAIN,
            projectId: process.env.FIREBASE_PROJECTID,
            storageBucket: process.env.FIREBASE_STORAGEBUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGESENDERID,
            appId: process.env.FIREBASE_APPID,
            measurementId: process.env.FIREBASE_MEASUREMENTID
        }
    };
}

export const actions = {
    // @ts-ignore
    default: async ({ cookies, request }) => {
        delete mongo.connection.models['help'];
        delete mongo.connection.models['secret'];

        const data = await request.formData();
        console.log(data.get('privacy'))
        if (!data || !data.get('secretkey') || !data.get('Title') || !data.get('content') || !data.get('privacy')) {
            throw redirect(302, '/call');
        }

        const key = await keySchema.findOne({ key: data.get('secretkey') }).lean().exec();
        if (!key) throw redirect(302, '/call');

        const now = new Date();

        await helpSchema.create({
            when: {
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                date: now.getDate(),
                hour: now.getHours(),
                minute: now.getMinutes()
            },
            ip: data.get('writer'),
            Title: data.get('Title'),
            Content: data.get('content').replace('<img', '<img width="70%" height="40%"'),
            DocumentNum: parseInt(`${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getMinutes() + now.getHours()}${randomInt(1000, 9999)}`)
        });

        throw redirect(302, '/notice');
    }
};