/** @type {import('../$types').Actions} */
import mongo from 'mongoose'
import notiSchema from '../../../models/noti.js'
import keySchema from '../../../models/secret.js'
import { redirect } from '@sveltejs/kit';
import { connectDb } from '../../../lib/db.js';


export const GET = async ({ request, url }) => {
    delete mongo.connection.models['notices'];
    delete mongo.connection.models['secret'];
    await connectDb();


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