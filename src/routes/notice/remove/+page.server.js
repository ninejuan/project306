/** @type {import('../$types').Actions} */
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

    if (!url.searchParams.get('id')) {
        throw redirect(302, '/notice');
    }

    await notiSchema.deleteOne({ DocumentNum: url.searchParams.get('id') });

    throw redirect(302, '/notice');
}