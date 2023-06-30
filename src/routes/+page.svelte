<script>
	export let data = [];
	console.log(data)

	function convertYMD(date) {
		let year = `${date}`.slice(0, 4);
		let month = `${date}`.slice(4, 6);
		let day = `${date}`.slice(6, 8);
		return `${year}년 ${month}월 ${day}일`;
	}
</script>

<body class="ct">
	<header id="header" class="fixed-top">
		<div class="container d-flex align-items-center justify-content-between">
			<h1 class="logo"><a href="/" class="title" style="text-decoration: none;">306</a></h1>

			<nav id="navbar" class="navbar">
				<ul>
					<li>
						<a class="nav-link scrollto" href="/notice" target="_blank" rel="noopener noreferrer"
							>알림장</a
						>
					</li>
					<li><a class="nav-link scrollto" href="/schedule">시간표</a></li>
					<li><a class="nav-link scrollto" href="/eat">급식</a></li>
					<li><a class="nav-link scrollto" href="/call">개인문의</a></li>
				</ul>
				<i
					id="mobile-arrow-btn"
					class="fas fa-arrow-left mobile-nav-toggle"
					onclick="history.back()"
				/>
			</nav>
		</div>
	</header>
	<link rel="stylesheet" href="/css/content.css" />
	<br /><br /><br /><br />
	<div class="pcView">
		<br />
		<!-- PC, Tablet -->
		<div class="mainIntro tWhite tBold fRight">
			<h1 class="cProjectName tOrange">프로젝트 306</h1>
			<h2 class="cProjectDescription tSmoodyOrange">당신의 학교 생활에 필요한 모든 정보를 제공합니다.</h2>
		</div>
		<div class="cMainData vLineMiddle">
			<div class="mainFLeft">
				<h3 class="tWhite tBold">알림장</h3>
				<hr style="width: 10vw; height: 2px; background-color:white; border: 0;" />
				<div class="notiBox">
					{#if typeof data.noti == 'object'}
						{#each data?.noti as noti, index}
							<div class="sepNotibox">
								<a href={data?.noti[index]?.url} class="tWhite tNoDec"
									>{JSON.parse(JSON.stringify(data?.noti[index]?.title))}</a
								>
								<br />
							</div>
						{/each}
					{:else}
						<p class="tWhite">{@html data?.noti}</p>
					{/if}
				</div>
			</div>
			<div class="mainFRight">
				<h3 class="tWhite tBold">급식</h3>
				<hr style="width: 10vw; height: 2px; background-color:white; border: 0;" />
				<div class="mealBox">
					{#if data.meal.status}
						<div class="sepmealBox">
							<p class="tWhite">{convertYMD(data?.meal?.menu[0]?.MLSV_YMD)}</p>
							<p class="tWhite">{@html data?.meal?.menu[0]?.DDISH_NM}</p>
						</div>
					{:else}
						<p class="tWhite">{@html data?.eat}</p>
					{/if}
				</div>
			</div>
			<span style="line-height: 10vw;"><br /></span>
		</div>
		<span style="line-height: 15vw;"><br /></span>
	</div>
	<div class="mobileView">
		<!--Mobile-->
		<div class="mainIntro tWhite tMiddle">
			<h1 class="mProjectName tOrange">프로젝트 306</h1>
			<h2 class="mProjectDescription tSmoodyOrange">학교 생활에 필요한 모든 것.</h2>
		</div>
		<span style="line-height: 5vh;"><br /></span>
		<div class="mEsContent">
			<h3 class="tWhite tBold fJamsil">알림장</h3>
			<hr style="width: 15vw; height: 2px; background-color:white; border: 0; margin: 0 auto;" />
			<div class="notiBox">
				{#if typeof data.noti == 'object'}
					{#each data.noti as noti, index}
						<div class="sepNotibox">
							<a href={data?.noti[index]?.url} class="tWhite tNoDec fJamsil"
								>{JSON.parse(JSON.stringify(data?.noti[index]?.title))}</a
							>
							<br />
						</div>
					{/each}
				{:else}
					<p class="tWhite">{@html data?.noti}</p>
				{/if}
			</div>
			<h3 class="tWhite tBold fJamsil">급식</h3>
			<hr style="width: 50vw; height: 2px; background-color:white; border: 0; margin: 0 auto;" />
			<div class="mealBox">
				{#if data?.meal?.status}
					<div class="sepmealBox">
						<p class="tWhite">{convertYMD(data?.meal?.menu[0]?.MLSV_YMD)}</p>
						<p class="tWhite fJamsil">{@html data?.meal?.menu[0]?.DDISH_NM}</p>
					</div>
				{:else}
					<p class="tWhite">{@html data?.eat}</p>
				{/if}
			</div>
		</div>
		<div class="pContent tWhite fLeft">
			<h3 class="tLightOrange tBold">*TODAY*</h3>
			<h5 class="tBold">* {data?.str}</h5>
			<br />
		</div>
		<br />
		<span style="line-height: 10vh;"><br /></span>
		<div class="selectMenu">
			<a id="btnFullWidth" class="btn btnL" href="/notice">
				알림장<br />
				<span class="badge badge-light desSpan">학급의 알림장</span>
			</a>
			<a id="btnFullWidth" class="btn btnR" href="/schedule">
				시간표<br />
				<span class="badge badge-light desSpan">우리반 시간표</span>
			</a>
			<a id="btnFullWidth" class="btn btnL" href="/eat">
				급식<br />
				<span class="badge badge-light desSpan">이번주 급식</span>
			</a>
			<a id="btnFullWidth" class="btn btnR" href="/call">
				개인문의<br />
				<span class="badge badge-light desSpan">누구세요?</span>
			</a>
		</div>
	</div>
	<hr style="width: 85vw; height: 2px; background-color:white; margin: 0 auto; border: 0;" />
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
					<a href="/" rel="noopener noreferrer">
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
