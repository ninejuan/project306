<script>
	export let data;

	function removeReq() {
		Swal.fire({
			title: '시크릿 키를 입력하세요',
			input: 'text',
			inputAttributes: {
				autocapitalize: 'off'
			},
			showCancelButton: true,
			confirmButtonText: '확인',
			showLoaderOnConfirm: true,
			preConfirm: (key) => {
				return fetch(`/notice/remove?id=${data.DocumentNum}&key=${key}`)
					.then((response) => {
						if (response.ok) {
							location.href = '/notice';
						} else {
							Swal.showValidationMessage(`시크릿 키를 잘못 입력하셨어요`);
						}
					})
					.catch((error) => {
						Swal.showValidationMessage(`시크릿 키를 잘못 입력하셨어요`);
					});
			},
			allowOutsideClick: () => !Swal.isLoading()
		})
	}
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
						<a class="nav-link scrollto" href="/notice" target="_blank" rel="noopener noreferrer">알림장</a>
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
	<link rel="stylesheet" href="/css/content.css" />
	<br /><br /><br /><br /><br />
	<div class="notiContent tWhite tBold notiViewer">
		<h3><strong>{JSON.parse(JSON.stringify(data)).Title}</strong></h3>
		<p>
			<span class="tLime">
				{JSON.parse(JSON.stringify(data)).Writer}
			</span>

			|
			{JSON.parse(JSON.stringify(data)).when.year}년
			{JSON.parse(JSON.stringify(data)).when.month}월
			{JSON.parse(JSON.stringify(data)).when.date}일,
			{JSON.parse(JSON.stringify(data)).when.hour}시
			{JSON.parse(JSON.stringify(data)).when.minute}분
			{#if JSON.parse(JSON.stringify(data)).isEdited == true}
			<span class="tRed">
				(수정됨)
			</span>
			{/if}
		</p>
		<hr style="width: 10vw; height: 3px; background-color: #fff;" />
		<p>{@html JSON.parse(JSON.stringify(data)).Content}</p>
		<button class="btn btn-danger" on:click|preventDefault={removeReq}> 삭제 </button>
		<button
			class="btn btn-primary"
			on:click|preventDefault={(location.href = `/notice/edit?id=${data.DocumentNum}`)}
		>
			수정
		</button>
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

<!-- <style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style> -->
