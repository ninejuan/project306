/** @type {import('../$types').Actions} */
import env from 'dotenv'
import mongo from 'mongoose'
import notiSchema from '../../../models/noti.js'
import keySchema from '../../../models/secret.js'
import { redirect } from '@sveltejs/kit';

env.config();
mongo.connect(`${process.env.MONGOSRV}`);

export const GET = async ({ request, url }) => {
    delete mongo.connection.models['notices'];
    delete mongo.connection.models['secret'];

    let id = url.searchParams.get('id')
    let key = url.searchParams.get('key');

    if (!key || !await keySchema.findOne({ key: key })) {
        return new Response({
            msg: 'secretKey is not match with input'
        }, { status: 400 })
    } else {
        await notiSchema.deleteOne({ DocumentNum: id });

        return new Response({
            msg: 'success'
        }, { status: 200 })
    }
}