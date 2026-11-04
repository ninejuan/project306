function convertYMD(value) {
	const year = `${value}`.slice(0, 4);
	const month = `${value}`.slice(4, 6);
	const day = `${value}`.slice(6, 8);
	return `${year}년 ${month}월 ${day}일`;
}
