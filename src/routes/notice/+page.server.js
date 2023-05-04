import env from 'dotenv'
import mongo from 'mongoose'
import notiSchema from '../../models/noti.js'
env.config();
mongo.connect(`${process.env.MONGOSRV}`)

// const notices = mongo.model(
//     "notices",
//     new mongo.Schema({
//         when: {
//             year: { type: Number, required: true },
//             month: { type: Number, required: true },
//             date: { type: Number, required: true },
//             hour: { type: Number, required: true },
//             minute: { type: Number, required: true }
//         },
//         Writer: { type: String, required: true },
//         Title: { type: String, required: true },
//         Content: { type: String, required: true }
//     })
// )

// Noti view page

export function load({ params }) {
    // new notiSchema({
    //     when: {
    //         year: 2023,
    //         month: 4,
    //         date: 20,
    //         hour: 11,
    //         minute: 59
    //     },
    //     Writer: "이주안",
    //     Title: "tlgjadl sjan djfjd",
    //     Content: "tlgjadl sjan djfjd"
    // }).save().then(() => console.log('success'));
    delete mongo.connection.models['notices'];
    return {
        data: notiSchema.find() ?? []
    };
}