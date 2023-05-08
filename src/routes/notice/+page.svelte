<script>
	export let data;
	console.log(data);
</script>

<body>
	<header id="header" class="fixed-top">
		<div class="container d-flex align-items-center justify-content-between">
			<h1 class="logo"><a href="/" class="noULine">306</a></h1>

			<nav id="navbar" class="navbar">
				<ul>
					<li>
						<a class="nav-link scrollto" href="/notice" target="_blank"
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
							</svg>&nbsp;공지</a
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
	<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br
	/><br />
	<!-- <p>{JSON.stringify(data.data[0])}</p> -->
	{#each data.data as d, i}
		<a href="/notice/view?id={JSON.parse(JSON.stringify(d)).DocumentNum}">
			<div class="seperatedNoti">
				<p>{JSON.stringify(d)}</p>
				<p>
					{JSON.parse(JSON.stringify(d)).Writer}
					-
					{JSON.parse(JSON.stringify(d)).Title}
				</p>
				<p>
					{JSON.parse(JSON.stringify(d)).Content.substr(0, 20) + '...'}
				</p>
				<input type="hidden" name="docno" value={JSON.parse(JSON.stringify(d)).DocumentNum} />
			</div>
		</a><br /><br />
	{/each}
	<footer class="site-footer" id="sf">
		<div class="container">
			<div class="row">
				<div class="col-sm-12 col-md-3">
					<h6 style="font-family: 'Jua', sans-serif;">정보</h6>
					<p class="text-justify" style="color: gray;">
						길음중학교 3학년 6반 학생들을 위한 종합 플랫폼입니다.
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
							<a href="https://juany.kr" target="_blank" rel="noopener noreferrer"
								>주안 포트폴리오</a
							>
						</li>
						<li>
							<a href="https://docs.aramy.net" target="_blank" rel="noopener noreferrer"
								>주안Lab 바로가기</a
							>
						</li>
						<li>
							<a href="https://github.com/ninejuan" target="_blank" rel="noopener noreferrer"
								>주안의 인생</a
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
	</footer>
</body>
<slot />
