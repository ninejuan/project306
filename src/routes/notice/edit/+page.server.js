import env from 'dotenv'
import mongo from 'mongoose'
import notiSchema from '../../../models/noti.js'
import keySchema from '../../../models/secret.js'
import { redirect } from '@sveltejs/kit';

env.config();
mongo.connect(`${process.env.MONGOSRV}`);

export async function load({ url }) {
    delete mongo.connection.models['notices'];
    delete mongo.connection.models['secret'];

    let data = await notiSchema.findOne({ DocumentNum: url.searchParams.get('id') }).lean().exec();
    if (!data) {
        redirect(302, '/notice');
    } else {
        return {
            title: data.Title,
            writer: data.Writer,
            content: data.Content,
            docno: data.DocumentNum
        };
    }
}

export const actions = {
    // @ts-ignore
    default: async ({ cookies, request }) => {
        delete mongo.connection.models['notices'];
        delete mongo.connection.models['secret'];

        const data = await request.formData();
        const now = new Date();

        if (!data || !data.get('id') || !data.get('writer') || !data.get('Title') || !data.get('content')) {
            throw redirect(302, '/notice/edit?id=' + data.get('id'));
        }

        const key = await keySchema.findOne({ key: data.get('secretkey') }).lean().exec();
        if (!key) return new Response({
            msg: 'key is not valid'
        }, { status: 400 });

        await notiSchema.updateOne(
            { DocumentNum: data.get('id') },
            {
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
            DocumentNum: data.get('id'),
            isEdited: true
        });

        throw redirect(302, '/notice');
    }
};