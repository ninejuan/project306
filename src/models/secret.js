import mongo from 'mongoose'

/**
 * when array는 작성일 시간 감지해서 자동입력
 * DocumentNum Data는 연월일(8자리)자동생성 4자리 Int64값으로 저장.
 * DocumentNum은 gen 후 중복 방지를 위해 미리 데이터 존재여부 결정.
 */

const keySchema = new mongo.Schema({
    key: { type: String, required: true },
})

const schema = mongo.model(
    "secret",
    keySchema
)

export default schema;