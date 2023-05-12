<script>
	export let data;
</script>

<body class="ct">
	<header id="header" class="fixed-top">
		<div class="container d-flex align-items-center justify-content-between">
			<h1 class="logo">
				<a href="/" class="title" style="text-decoration: none;">306 ㅣ 알림장</a>
			</h1>

			<nav id="navbar" class="navbar">
				<ul>
					<li>
						<a class="nav-link scrollto" href="/notice" target="_blank">알림장</a>
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
	<link rel="stylesheet" href="/css/noti.css" />
	<link rel="stylesheet" href="/css/content.css" />
	<br /><br />
	<div class="minh">
		<section class="notice">
			<div class="page-title">
				<div class="container">
					<h3 class="tWhite">6반의 알림장</h3>
				</div>
			</div>

			<div id="board-manage">
				<div class="container">
					<button
						type="button"
						class="btn-primary btn notiWriteBtn"
						onclick="location.href = '/notice/write'"
					>
						작성
					</button>
				</div>
			</div>
			<div id="board-list">
				<div class="container">
					<table class="board-table" style="word-break:break-all; table-layout:auto;">
						<thead>
							<tr>
								<th scope="col" class="th-num">번호</th>
								<th scope="col" class="th-title">제목</th>
								<th scope="col" class="th-date">등록일</th>
							</tr>
						</thead>
						<tbody>
							{#if data.data}
								{#each data.data as d, i}
									<tr>
										<td>{i + 1}</td>
										<th>
											<a href="/notice/view?id={JSON.parse(JSON.stringify(d)).DocumentNum}">
												{JSON.parse(JSON.stringify(d)).Title.substr(0, 17)}...
											</a>
											<p />
										</th>
										<td
											>{JSON.parse(JSON.stringify(d)).when.year}.{JSON.parse(JSON.stringify(d)).when
												.month}.{JSON.parse(JSON.stringify(d)).when.date}</td
										>
									</tr>
								{/each}
							{:else}
								<p>알림장 데이터가 없습니다.</p>
							{/if}
						</tbody>
					</table>
				</div>
			</div>
		</section>
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
