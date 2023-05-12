<script>
    /** @type {import('./$types').PageData} */
	export let data;
    
    let editor;

    function submit(event) {
        document.querySelector('#content').value = editor.contentWindow.tuiEditor.getHTML();

        if (confirm('정말로 게시글을 수정하시겠습니까?\n\n※ 확인 버튼을 클릭하면 즉시 채용 포털에 반영됩니다.')) {
            event.target.submit();
        }
    }

    function loadEditor() {
        editor.contentWindow.loadEditor(data.content);
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
	<link rel="stylesheet" href="/css/content.css" />
	<br /><br /><br /><br /><br /><br />
	<div class="notiEditor tBold">
		<div class="page-title">
			<div class="container">
				<h3 class="tWhite">알림장 수정하기</h3>
			</div>
		</div>
		<form action="/notice/edit" method="POST" on:submit|preventDefault={submit}>
			<input type="hidden" name="id" value="{data.docno}" />
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
						value="{data.title}"
						required
					/>
					<br />
					<label for="writer" class="tWhite formDes">
						작성자<span class="tRed">*</span>
					</label><br />
					<input
						type="text"
						id="notiInputData"
						name="writer"
						class="form-control"
						maxlength="5"
						value="{data.writer}"
						required
					/><br />
					<label for="secretkey" class="tWhite formDes">
						시크릿 키<span class="tRed">*</span>
					</label><br />
					<input 
					type="password" 
					id="notiInputData"
					name="secretkey"
					class="form-control"
					autocomplete="off"
					required
					/>
				</div>
				<br />
				<div class="formContent">
					<label for="content" class="tWhite formDes">
						내용<span class="tRed">*</span>
					</label>
					<input 
					type="hidden" 
					id="content" 
					name="content" 
					value="{data.content}"
					required /><br />
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
				<br /><br />
				<button type="submit" class="submitBtn btn btn-primary btn-lg">수정</button>
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
