import mongo from 'mongoose'

const notiSchema = new mongo.Schema({
    when: {
        year: { type: Number, required: true },
        month: { type: Number, required: true },
        date: { type: Number, required: true },
        hour: { type: Number, required: true },
        minute: { type: Number, required: true }
    },
    Writer: { type: String, required: true },
    Title: { type: String, required: true },
    Content: { type: String, required: true },
    DocumentNum: { type: Number, required: true }
})

notiSchema.pre('save', () => {
    console.log('find mongo schema')
})

const notices = mongo.model(
    "notices",
    notiSchema
)

export default notices;