import env from 'dotenv'
import mongo from 'mongoose'
import nodemailer from 'nodemailer'
import fs from 'fs'
import helpSchema from '../../models/help.js'
import htmlTemplate from '../../form.js'
import { redirect } from '@sveltejs/kit';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
env.config();
mongo.connect(`${process.env.MONGOSRV}`)

function randomInt(min, max) {
    var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum;
}

async function sendMail(data) {
    const now = new Date();
    const docno = parseInt(`${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getMinutes() + now.getHours()}${randomInt(1000, 9999)}`)

    let html = htmlTemplate.html.toString()
        .replace('%title%', `${data.get('Title')}`)
        .replace('%year%', `${now.getFullYear()}`)
        .replace('%month%', `${now.getMonth() + 1}`)
        .replace('%date%', `${now.getDate()}`)
        .replace('%docno%', `${docno}`)
        .replace('%hour%', `${now.getHours()}`)
        .replace('%minute%', `${now.getMinutes()}`)
        .replace('%content%', `${data.get('content').replaceAll('<img', '<img width="70%" height="40%"')}`)
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: process.env.MAIL_SENDER,
        to: process.env.MAIL_RECEIVER,
        subject: `[306 익명전송] ${data.get('Title')}`,
        html: `${html}`
    }).then(async () => {
        let db = {
            when: {
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                date: now.getDate(),
                hour: now.getHours(),
                minute: now.getMinutes()
            },
            phone: data.get('phone') ? data.get('phone') : '알 수 없음',
            Title: data.get('Title'),
            Content: data.get('content').replaceAll('<img', '<img width="70%" height="40%"'),
            DocumentNum: docno
        }

        await helpSchema.create({
            when: {
                year: db.when.year,
                month: db.when.month,
                date: db.when.date,
                hour: db.when.hour,
                minute: db.when.minute
            },
            phone: db.phone,
            Title: db.Title,
            Content: db.Content,
            DocumentNum: db.DocumentNum
        });
        throw redirect(302, '/');
    })
    return redirect(302, '/call');
}
export async function load({ url }) {
    delete mongo.connection.models['help'];

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

        const data = await request.formData();
        if (!data || !data.get('secretkey') || !data.get('Title') || !data.get('content') || !data.get('privacy')) {
            console.log('no data')
            throw redirect(302, '/call');
        }
        if (data.get('secretkey') !== process.env.CALL_KEY) {
            console.log('sckey not match'); throw redirect(302, '/call');
        }


        await sendMail(data);
    }
};