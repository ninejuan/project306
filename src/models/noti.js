import mongo from 'mongoose'

const notices = mongo.model(
    "notices",
    new mongo.Schema({
        when: {
            year: { type: Number, required: true },
            month: { type: Number, required: true },
            date: { type: Number, required: true },
            hour: { type: Number, required: true },
            minute: { type: Number, required: true }
        },
        Writer: { type: String, required: true },
        Title: { type: String, required: true },
        Content: { type: String, required: true }
    })
)

export default notices;