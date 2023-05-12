<script>
	import { each } from 'svelte/internal';

	export let data;
	function convertNumToKrDay(param) {
		let res = `${param}`
			.replace('1', '월')
			.replace('2', '화')
			.replace('3', '수')
			.replace('4', '목')
			.replace('5', '금');
		return res;
	}
</script>

<link rel="stylesheet" href="/css/content.css" />
<body class="ct">
	<header id="header" class="fixed-top">
		<div class="container d-flex align-items-center justify-content-between">
			<h1 class="logo">
				<a href="/" class="title" style="text-decoration: none;">306 ㅣ 시간표</a>
			</h1>

			<nav id="navbar" class="navbar">
				<ul>
					<li>
						<a
							class="nav-link scrollto"
							href="/notice"
							target="_blank">알림장</a
						>
					</li>
					<li><a class="nav-link scrollto" href="/schedule">시간표</a></li>
					<li><a class="nav-link scrollto" href="/eat">급식</a></li>
					<li><a class="nav-link scrollto" href="/call">익명건의</a></li>
		
				</ul>
				<i
					id="mobile-arrow-btn"
					class="fas fa-arrow-left mobile-nav-toggle"
					onclick="history.back()"
				/>
			</nav>
		</div>
	</header>
	<div class="content-flex scContent" style="padding:150px;">
		{#if data.res == null}
			<div class="alert alert-danger" role="alert">
				시간표를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.
			</div>
		{/if}
		<h2 class="tWhite cTitle">이번주 시간표</h2>
		{#each data.res as dt, index}
				<div class="eachC schedule">
					<span class="scDayNo">{convertNumToKrDay(index + 1)}요일.</span><br />
				{#each data.res[index] as a, i}
					<h3 class="cProviderData">{JSON.stringify(data.res[index][i].classTime)}교시.
						{JSON.stringify(data.res[index][i].subject)
							.replaceAll('""', '없음')
							.replaceAll('"', '')} -
						{JSON.stringify(data.res[index][i].teacher)
							.replaceAll('조은', '은솔신')
							.replaceAll('""', '없음')
							.replaceAll('"', '')} <br />
						</h3>
				{/each}<br />
			</div>
		{/each}
		<!-- {JSON.stringify(data.res[0])} -->
	</div>
	<hr style="width: 85vw; height: 2px; background-color:white; margin: 0 auto; border: 0;"/>
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
						<img alt="Designed by JuanLee" src="/assets/profile.png" width="150" height="150" />
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
