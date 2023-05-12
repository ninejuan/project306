import mongo from 'mongoose'

/**
 * when array는 작성일 시간 감지해서 자동입력
 * DocumentNum Data는 연월일(8자리)자동생성 4자리 Int64값으로 저장.
 * DocumentNum은 gen 후 중복 방지를 위해 미리 데이터 존재여부 결정.
 */

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
    Content: { type: String },
    DocumentNum: { type: Number, required: true },
    isEdited: { type: Boolean, default: false }
})

const notices = mongo.model(
    "notices",
    notiSchema
)

export default notices;