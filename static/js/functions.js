function convertYMD(date){
    let year = `${date}`.slice(0, 4);
    let month = `${date}`.slice(4, 6);
    let date = `${date}`.slice(6, 8);
    return `${year}년 ${month}월 ${date}일`
}