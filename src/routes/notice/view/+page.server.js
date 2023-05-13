import env from 'dotenv'
import mongo from 'mongoose'
import notiSchema from '../../../models/noti.js'
import { redirect } from '@sveltejs/kit';
env.config();
mongo.connect(`${process.env.MONGOSRV}`)

export async function load({ url }) {
    delete mongo.connection.models['notices'];

    let docno = url.searchParams.get('id');

    try {
        let data = await notiSchema.findOne({
            DocumentNum: docno
        });

        if (data) {
            return {
                ...data.toObject(),
                _id: data._id.toString()
            };
        } else {
            redirect(302, '/notice')
            throw new Error('No data found');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
