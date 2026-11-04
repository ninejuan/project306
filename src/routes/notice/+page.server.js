import env from 'dotenv'
import mongo from 'mongoose'
import notiSchema from '../../models/noti.js'
import { connectDb } from '../../lib/db.js'
env.config();

// Noti view page

export async function load({ params }) {
    delete mongo.connection.models['notices']; delete mongo.connection.models['notices'];
    await connectDb();

    const data = await notiSchema.find().lean().exec();
    return {
        data: data.map(notice => {
            return {
                ...notice,
                _id: notice._id.toString()
            }
        }).reverse() ?? [],
    };
}