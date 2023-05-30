<script>
	export let data;
	let editor;
	import { onMount } from 'svelte';
	import { initializeApp } from 'firebase/app';
	import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

	onMount(() => {
		const firebaseConfig = {
			apiKey: data.secrets.apiKey,
			authDomain: data.secrets.authDomain,
			projectId: data.secrets.projectId,
			storageBucket: data.secrets.storageBucket,
			messagingSenderId: data.secrets.messagingSenderId,
			appId: data.secrets.appId
		};

		initializeApp(firebaseConfig);
		window.fbAuth = getAuth();
		window.fbAuth.languageCode = 'ko';

		window.recaptchaVerifier = new RecaptchaVerifier(
			'recaptcha-container',
			{
				size: 'invisible'
			},
			window.fbAuth
		);
	});

	function phoneVerify(event) {
		if (
			document.querySelector('#phone').value.length < 10 ||
			/^010-?([0-9]{4})-?([0-9]{4})$/.test(document.querySelector('#phone').value) == false
		) {
			alert('전화번호를 정확히 입력하세요.');
			return;
		}

		if (!window.confirmationResult) {
			window.recaptchaVerifier.render().then((widgetId) => {
				window.recaptchaWidgetId = widgetId;
			});

			signInWithPhoneNumber(
				window.fbAuth,
				document.querySelector('#phone').value.replace('0', '+82'),
				window.recaptchaVerifier
			)
				.then((confirmationResult) => {
					window.confirmationResult = confirmationResult;

					document.querySelector('#phoneVerifyNumber').classList.remove('hidden');

					event.target.textContent = '인증번호 확인';

					alert('인증번호가 ' + document.querySelector('#phone').value + ' 번으로 발송되었습니다.');
				})
				.catch((error) => {
					alert(
						'인증번호 발송에 실패했습니다. 다시 시도해 주세요.\n\n오류가 지속될 경우 관리자에게 문의해 주세요.'
					);
					console.error(error);
				});
		} else {
			window.confirmationResult
				.confirm(document.querySelector('#phoneVerifyNumber').value)
				.then((result) => {
					window.phoneVerifyData = result.user;

					alert('인증에 성공했습니다.');

					document.querySelector('#phone').readOnly = true;
					document.querySelector('#phoneVerifyNumber').readOnly = true;

					event.target.classList.remove('hover:bg-[#ee2012]');
					event.target.textContent = '인증 성공';
					event.target.disabled = true;

					console.log(window.phoneVerifyData);

					phoneVerify = () => {};
				})
				.catch((error) => {
					alert('인증번호가 일치하지 않습니다. 다시 시도해 주세요.');
					console.error(error);
				});
		}
	}

	function submit(event) {
		if (!window.phoneVerifyData || !document.getElementById('phoneVerifyNumber')) {
			alert('전화번호 인증을 진행해 주세요.');
			return;
		} else if (!document.getElementById('privacy').checked) {
			return alert('개인정보처리방침에 동의해주세요.')
		} else {
			document.querySelector('#content').value = editor.contentWindow.tuiEditor.getHTML();

			if (confirm('선생님께 이 내용을 전달하시겠습니까?')) {
				event.target.submit();
			}
		}
	}

	function loadEditor() {
		editor.contentWindow.loadEditor();
	}
</script>

<body class="ct">
	<header id="header" class="fixed-top">
		<div class="container d-flex align-items-center justify-content-between">
			<h1 class="logo">
				<a href="/" class="title" style="text-decoration: none;">306 ㅣ 개인문의</a>
			</h1>

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
	<br /><br /><br /><br /><br /><br />
	<div class="notiEditor tBold">
		<div class="page-title">
			<div class="container">
				<h3 class="tWhite">선생님께 익명으로 알리기</h3>
			</div>
		</div>
		<form action="/call" method="POST" on:submit|preventDefault={submit}>
			<div class="form-group">
				<div class="formTitle">
					<label for="Title" class="tWhite formDes">
						제목<span class="tRed">*</span>
					</label><br />
					<input
						type="text"
						id="notiInputData"
						name="Title"
						class="form-control"
						maxlength="30"
						required
					/>
					<br />
					<label for="secretkey" class="tWhite formDes">
						시크릿 키<span class="tRed">*</span>
					</label><br />
					<input
						type="text"
						id="notiInputData"
						name="secretkey"
						class="form-control"
						autocomplete="off"
						required
					/><br />
					<!-- 여기서부터 휴대폰 인증 -->
					<label for="phone" class="tWhite formDes flex gap-1 text-gray-100 font-light mb-1"
						>연락처
						<span class="tRed">*</span>
						<span class="tSmoodyRed">(010 형식 번호만 가능)</span>
					</label><br />
					<input
						type="tel"
						id="phone"
						name="phone"
						class="form-control"
						pattern="010([0-9]{'{'}8{'}'})"
						required
					/><br />
					<input
						type="text"
						id="phoneVerifyNumber"
						name="phoneVerifyNumber"
						placeholder="인증번호 입력"
						class="form-control hidden"
						pattern="([0-9]{'{'}6{'}'})"
						autocomplete="one-time-code"
					/>
					<button type="button" class="btn btn-primary" on:click|preventDefault={phoneVerify}
						>전화번호 인증</button
					>
				</div>
				<br />
				<div class="formContent">
					<label for="content" class="tWhite formDes">
						내용<span class="tRed">*</span>
					</label>
					<input type="hidden" id="content" name="content" required /><br />
					<p class="tMiddle parentnIF">
						<iframe
							src="/editor/toastui/index.html"
							class="editorIF"
							title="ToastUI Editor"
							on:load={loadEditor}
							bind:this={editor}
						/>
					</p>
				</div>
				<div class="warningContent">
					<input type="checkbox" name="privacy" class="checkBox" id="privacy" />
					<label for="privacy" class="tWhite formDes">
						작성하신 개인정보는 선생님께만 전달되며, 이용목적 이외로는 사용되지 않습니다. 동의하십니까?
					</label>
					<p class="tSmoodyRed">* 전송이 완료되면 자동으로 메인 페이지로 이동됩니다.
						<br>이 페이지에 머문다면 관리자에게 문의해주세요.
					</p>
				</div>
				<div id="recaptcha-container" />
				<br /><br /><br /><br />
				<button type="submit" class="submitBtn btn btn-primary btn-lg">전송</button>
			</div>
		</form>
	</div>
	<br /><br /><br />
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
