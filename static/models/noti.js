// import mongo from 'mongoose'

// const schema = new mongo.Schema({
//     when: {
//         year: { type: Number, required: true },
//         month: { type: Number, required: true },
//         date: { type: Number, required: true },
//         hour: { type: Number, required: true },
//         minute: { type: Number, required: true }
//     },
//     Writer: { type: String, required: true },
//     Title: { type: String, required: true },
//     Content: { type: String, required: true }
// })

// export default mongo.model("공지", schema)

/**
 * 들어가야 할 내용
 * 1. 공지 작성 날짜, 시각
 * 2. 공지 제목
 * 3. 공지 내용
 * 4. 작성자명
 * ** 마크다운 지원을 위해 과거에 썼던 html md 변환 모듈 이용 (unified, remark-parse, remark-rehype, rehype-stringify)
 * 위에꺼 @.html 이용한다면 미사용 예정
 * ** 마크다운 input box 활용 (toast ui editor / viewer)
 */