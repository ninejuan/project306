import env from 'dotenv'
import mongo from 'mongoose'
import nodemailer from 'nodemailer'
import fs from 'fs'
import helpSchema from '../../models/help.js'
import keySchema from '../../models/secret'
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

async function sendMail(title, content, when, docno) {
        let html = htmlTemplate.html.toString()
            .replace('%title%', `${title}`)
            .replace('%year%', `${when.year}`)
            .replace('%month%', `${when.month}`)
            .replace('%date%', `${when.date}`)
            .replace('%docno%', `${docno}`)
            .replace('%hour%', `${when.hour}`)
            .replace('%minute%', `${when.minute}`)
            .replace('%content%', `${content}`)
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
        subject: `[306 익명전송] ${title}`,
        html: `${html}`
    })
}
export async function load({ url }) {
    delete mongo.connection.models['help']; delete mongo.connection.models['secret'];

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
        if (!data || !data.get('secretkey') || !data.get('Title') || !data.get('content') || !data.get('privacy')) {
            throw redirect(302, '/call');
        }

        const key = await keySchema.findOne({ key: data.get('secretkey') }).lean().exec();
        if (!key) throw redirect(302, '/call');

        const now = new Date();

        let db = {
            when: {
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                date: now.getDate(),
                hour: now.getHours(),
                minute: now.getMinutes()
            },
            phone: '01090489898',
            Title: data.get('Title'),
            Content: data.get('content').replace('<img', '<img width="70%" height="40%"'),
            DocumentNum: parseInt(`${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getMinutes() + now.getHours()}${randomInt(1000, 9999)}`)
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

        await sendMail(db.Title, db.Content, {year: db.when.year, month: db.when.month, date: db.when.date, hour: db.when.hour, minute: db.when.minute}, db.DocumentNum)
        .then(() => {
            throw redirect(302, '/');
        })
        throw redirect(302, '/call')
    }
};