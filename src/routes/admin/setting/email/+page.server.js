import env from 'dotenv'
import mongo from 'mongoose'
env.config();
mongo.connect(`${process.env.MONGOSRV}`)

export function load({ params }) {

}