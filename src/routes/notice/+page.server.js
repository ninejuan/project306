import env from 'dotenv'
import mongo from 'mongoose'
import notiSchema from '../../models/noti.js'
env.config();
mongo.connect(`${process.env.MONGOSRV}`)

// Noti view page

export async function load({ params }) {
    delete mongo.connection.models['notices'];elete mongo.connection.models['notices'];
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