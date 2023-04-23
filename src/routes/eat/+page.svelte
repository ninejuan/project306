<script>
	export let data;
	const meals = data.data
	console.log(data.data)
	// const meals = [
	// 	{
	// 		ATPT_OFCDC_SC_CODE: 'B10',
	// 		ATPT_OFCDC_SC_NM: '서울특별시교육청',
	// 		SD_SCHUL_CODE: '7121357',
	// 		SCHUL_NM: '길음중학교',
	// 		MMEAL_SC_CODE: '2',
	// 		MMEAL_SC_NM: '중식',
	// 		MLSV_YMD: '20230424',
	// 		MLSV_FGR: '880',
	// 		DDISH_NM:
	// 			'중)차수수현미밥○  <br/>중)감자수제비○  (1.5.6.9.)<br/>중)양배추사과부추무침○  (5.6.)<br/>중)닭다리살훈제바베큐/소스○  (1.5.15.)<br/>중)배추김치○  (9.13.)<br/>중)배○  ',
	// 		ORPLC_INFO:
	// 			'쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>아귀 : 국내산<br/>두부 : 국내산<br/>콩 : 국내산',
	// 		CAL_INFO: '723.4 Kcal',
	// 		NTR_INFO:
	// 			'탄수화물(g) : 95.9<br/>단백질(g) : 45.8<br/>지방(g) : 22.7<br/>비타민A(R.E) : 85.7<br/>티아민(mg) : 0.4<br/>리보플라빈(mg) : 0.4<br/>비타민C(mg) : 7.6<br/>칼슘(mg) : 189.1<br/>철분(mg) : 3.2',
	// 		MLSV_FROM_YMD: '20230424',
	// 		MLSV_TO_YMD: '20230424'
	// 	},
	// 	{
	// 		ATPT_OFCDC_SC_CODE: 'B10',
	// 		ATPT_OFCDC_SC_NM: '서울특별시교육청',
	// 		SD_SCHUL_CODE: '7121357',
	// 		SCHUL_NM: '길음중학교',
	// 		MMEAL_SC_CODE: '2',
	// 		MMEAL_SC_NM: '중식',
	// 		MLSV_YMD: '20230425',
	// 		MLSV_FGR: '880',
	// 		DDISH_NM:
	// 			'중)찰현미밥○  <br/>중)부추달걀국○  (1.5.6.13.)<br/>중)김치제육불고기○  (5.6.9.10.13.18.)<br/>중)느타리버섯볶음○  <br/>중)오이김치○  (9.13.18.)<br/> 중)블랙라벨오렌지○  ',
	// 		ORPLC_INFO:
	// 			'쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>아귀 : 국내산<br/>두부 : 국내산<br/>콩 : 국내산',
	// 		CAL_INFO: '669.1 Kcal',
	// 		NTR_INFO:
	// 			'탄수화물(g) : 108.4<br/>단백질(g) : 37.7<br/>지방(g) : 11.9<br/>비타민A(R.E) : 291.4<br/>티아민(mg) : 1.0<br/>리보플라빈(mg) : 0.6<br/>비타민C(mg) : 30.4<br/>칼슘(mg) : 190.7<br/>철분(mg) : 3.9',
	// 		MLSV_FROM_YMD: '20230425',
	// 		MLSV_TO_YMD: '20230425'
	// 	},
	// 	{
	// 		ATPT_OFCDC_SC_CODE: 'B10',
	// 		ATPT_OFCDC_SC_NM: '서울특별시교육청',
	// 		SD_SCHUL_CODE: '7121357',
	// 		SCHUL_NM: '길음중학교',
	// 		MMEAL_SC_CODE: '2',
	// 		MMEAL_SC_NM: '중식',
	// 		MLSV_YMD: '20230426',
	// 		MLSV_FGR: '880',
	// 		DDISH_NM:
	// 			'중)백미밥(선택)○  <br/>중)로제소스 스파게티○  (1.2.5.6.10.12.15.16.18.)<br/>중)스틱마늘빵○  (1.2.5.6.)<br/>중)닭다리튀김○  (1.5.6.15.16.)<br/>중)오 이피클○  <br/>중)콘샐러드○  (1.5.6.8.9.16.)',
	// 		ORPLC_INFO:
	// 			'쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>아귀 : 국내산<br/>두부 : 국내산<br/>콩 : 국내산',
	// 		CAL_INFO: '1117.3 Kcal',
	// 		NTR_INFO:
	// 			'탄수화물(g) : 120.6<br/>단백질(g) : 53.4<br/>지방(g) : 49.2<br/>비타민A(R.E) : 143.0<br/>티아민(mg) : 0.5<br/>리보플라빈(mg) : 1.6<br/>비타민C(mg) : 29.0<br/>칼슘(mg) : 193.6<br/>철분(mg) : 5.1',
	// 		MLSV_FROM_YMD: '20230426',
	// 		MLSV_TO_YMD: '20230426'
	// 	},
	// 	{
	// 		ATPT_OFCDC_SC_CODE: 'B10',
	// 		ATPT_OFCDC_SC_NM: '서울특별시교육청',
	// 		SD_SCHUL_CODE: '7121357',
	// 		SCHUL_NM: '길음중학교',
	// 		MMEAL_SC_CODE: '2',
	// 		MMEAL_SC_NM: '중식',
	// 		MLSV_YMD: '20230427',
	// 		MLSV_FGR: '880',
	// 		DDISH_NM:
	// 			'중)칼슘기장현미밥○  <br/>중)모둠햄찌개○  (5.6.9.10.16.)<br/>중)치즈떡볶이○  (1.2.5.6.16.)<br/>중)삼치데리야끼소스구이○  (5.6.15.18.)<br/>중)총각김치○  (9.13.)<br/>중)그린키위○  ',
	// 		ORPLC_INFO:
	// 			'쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>아귀 : 국내산<br/>두부 : 국내산<br/>콩 : 국내산',
	// 		CAL_INFO: '889.0 Kcal',
	// 		NTR_INFO:
	// 			'탄수화물(g) : 156.2<br/>단백질(g) : 45.5<br/>지방(g) : 11.6<br/>비타민A(R.E) : 176.5<br/>티아민(mg) : 0.6<br/>리보플라빈(mg) : 0.5<br/>비타민C(mg) : 46.5<br/>칼슘(mg) : 528.1<br/>철분(mg) : 3.9',
	// 		MLSV_FROM_YMD: '20230427',
	// 		MLSV_TO_YMD: '20230427'
	// 	},
	// 	{
	// 		ATPT_OFCDC_SC_CODE: 'B10',
	// 		ATPT_OFCDC_SC_NM: '서울특별시교육청',
	// 		SD_SCHUL_CODE: '7121357',
	// 		SCHUL_NM: '길음중학교',
	// 		MMEAL_SC_CODE: '2',
	// 		MMEAL_SC_NM: '중식',
	// 		MLSV_YMD: '20230428',
	// 		MLSV_FGR: '880',
	// 		DDISH_NM:
	// 			'중)삼색나물비빔밥○  (5.6.)<br/>중)들깨무채국○  (5.)<br/>중)가지나물무침○  (5.)<br/>중)떡갈비구이○  (5.6.10.13.16.)<br/>중)나박김치○  (9.13.)<br/>중)조각참외○  ',
	// 		ORPLC_INFO:
	// 			'쌀 : 국내산<br/>김치류 : 국내산<br/>고춧가루(김치류) : 국내산<br/>쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산<br/>닭고기 : 국내산<br/>오리고기 : 국내산<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 가공품 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>아귀 : 국내산<br/>두부 : 국내산<br/>콩 : 국내산',
	// 		CAL_INFO: '637.3 Kcal',
	// 		NTR_INFO:
	// 			'탄수화물(g) : 92.2<br/>단백질(g) : 28.0<br/>지방(g) : 19.0<br/>비타민A(R.E) : 187.9<br/>티아민(mg) : 0.6<br/>리보플라빈(mg) : 0.4<br/>비타민C(mg) : 10.4<br/>칼슘(mg) : 175.6<br/>철분(mg) : 3.8',
	// 		MLSV_FROM_YMD: '20230428',
	// 		MLSV_TO_YMD: '20230428'
	// 	}
	// ];
</script>

<link rel="stylesheet" href="/css/eat.css" />
<header id="header" class="fixed-top">
	<div class="container d-flex align-items-center justify-content-between">
		<h1 class="logo"><a href="/" class="noULine">306 | 급식</a></h1>

		<nav id="navbar" class="navbar">
			<ul>
				<li>
					<a
						class="nav-link scrollto"
						href="https://status.laon.dev/status/team-laon"
						target="_blank"
						><svg
							stroke="currentColor"
							fill="none"
							stroke-width="0"
							viewBox="0 0 24 24"
							aria-hidden="true"
							focusable="false"
							height="1em"
							width="1em"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"
							/>
						</svg>&nbsp;상태</a
					>
				</li>
				<li>
					<a class="nav-link scrollto" href="/noti"
						><svg
							stroke="currentColor"
							fill="currentColor"
							stroke-width="0"
							viewBox="0 0 20 20"
							aria-hidden="true"
							focusable="false"
							height="1em"
							width="1em"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
								clip-rule="evenodd"
							/>
						</svg>&nbsp;공지</a
					>
				</li>
				<li class="dropdown">
					<a href="#"><span>바로가기</span> <i class="bi bi-chevron-down" /></a>
					<ul>
						<li><a href="https://github.com/Team-Laon" target="_blank">팀 공식 깃허브</a></li>
						<li>
							<a
								href="mailto:juan@laon.dev"
								onclick="alert('만약 메일 앱이 열리지 않으면 juan@laon.dev으로 문의주세요. 메일은 이 알림이 닫히고 열릴거에요')"
								>메일로 문의하기</a
							>
						</li>
						<li class="dropdown">
							<a href="#"><span>More</span> <i class="bi bi-chevron-right" /></a>
							<ul>
								<li><a href="https://laon.dev">팀 공식 홈페이지</a></li>
								<li><a href="https://api.aramy.net" target="_blank">아람이 API</a></li>
								<li><a href="https://docs.aramy.net" target="_blank">API Docs</a></li>
							</ul>
						</li>
					</ul>
				</li>
				<li>
					<a class="nav-link scrollto" href="/i/laon" target="_blank">
						<svg
							stroke="currentColor"
							fill="currentColor"
							stroke-width="0"
							viewBox="0 0 640 512"
							font-size="1.2em"
							aria-hidden="true"
							focusable="false"
							height="1em"
							width="1em"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"
							/>
						</svg>&nbsp;디스코드</a
					>
				</li>
				<li><a class="nav-link scrollto" href="#" /></li>
				<li>
					<a
						class="getstarted scrollto"
						href="https://discord.com/api/oauth2/authorize?client_id=<%= bot.user.id %>&permissions=8&scope=bot%20applications.commands"
						target="_blank"><strong>초대하기</strong></a
					>
				</li>
			</ul>
			<i class="bi bi-list mobile-nav-toggle" />
		</nav>
	</div>
</header>
<div class="content" style="padding:150px;">
	<div class="meals">
		{#each meals as meal, i}
			<div>
				<h2>{meal.SCHUL_NM} ({meal.MLSV_YMD})</h2>
				<p>{meal.DDISH_NM.replaceAll('<br/>', '\n')}</p>
			</div>
		{/each}
	</div>
</div>
<!-- <footer class="site-footer">
	<div class="container">
		<div class="row">
			<div class="col-sm-12 col-md-3">
				<h6 style="font-family: 'Jua', sans-serif;">정보</h6>
				<p class="text-justify" style="color: gray;">
					초보 화이트해커 주안입니다. 화이트햇 팀 <a
						href="https://secstf.kr"
						target="_blank"
						rel="noopener noreferrer"
						style="color:white;text-decoration:none;">SnatchTheFlag</a
					>에서 활동하고 있습니다.
				</p>
			</div>

			<div class="col-sm-12 col-md-3">
				<h6 style="font-family: 'Jua', sans-serif;">개발</h6>
				<a>
					<img alt="Designed by JuanLee" src="assets/profile.png" width="150" height="150" />
				</a>
			</div>

			<div class="col-xs-6 col-md-3">
				<h6>주안Lab</h6>
				<ul class="footer-links">
					<li>
						<a href="https://306.juany.kr" target="_blank" rel="noopener noreferrer"
							>아람이 대시보드</a
						>
					</li>
					<li>
						<a href="https://docs.aramy.net" target="_blank" rel="noopener noreferrer"
							>아람이 API 문서</a
						>
					</li>
				</ul>
			</div>

			<div class="col-xs-6 col-md-3">
				<h6>Contact</h6>
				<ul class="footer-links">
					<li><a href="mailto:me@juany.kr">Mail</a></li>
					<li>
						<a href="https://github.com/ninejuan" target="_blank" rel="noopener noreferrer"
							>Github</a
						>
					</li>
					<li>
						<a href="https://discord.com/users/927049010072682516" rel="noopener noreferrer"
							>Discord</a
						>
					</li>
				</ul>
			</div>
		</div>
		<hr />
	</div>
	<div class="container">
		<div class="row">
			<div class="col-md-8 col-sm-6 col-xs-12">
				<p class="copyright-text">
					Copyright 2023 <a
						style="color: lime; text-decoration:none;"
						href="https://juany.kr"
						target="_blank"
						rel="noopener noreferrer">Juan Lee.</a
					> All Rights Reserved.
				</p>
			</div>
		</div>
	</div>
</footer> -->
