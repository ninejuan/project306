let html = `<!DOCTYPE html>
<html lang="ko">
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
    @import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');

    @font-face {
        font-family: 'jamsil';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil5Bold.woff2') format('woff2');
        font-weight: 700;
        font-style: normal;
    }


    * {
        scroll-behavior: smooth;
    }

    body {
        padding: 0;
        margin: 0;
        padding-bottom: 50px;
    }

    img {
        border-radius: 7px;
    }

    .noULine {
        text-decoration: none;
    }

    footer {
        width: 100%;
        height: 20vh;
        background-color: black;
        color: white;
        font-family: 'Patrick Hand', sans-serif;
        position: fixed;
        bottom: 0;
    }

    .underLine {
        padding: 200px;
    }

    .projectDiv {
        display: contents;
    }

    .schedule {
        text-align: center;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    section.notice {
        padding: 80px 0;
    }

    .page-title {
        margin-bottom: 60px;
    }

    .page-title h3 {
        font-size: 28px;
        color: #fff;
        font-weight: 400;
        text-align: center;
        font-family: 'jamsil', 'sans-serif';
    }

    #board-manage .search-window {
        padding: 15px 0;
        background-color: #f9f7f9;
    }

    #board-manage .search-window .search-wrap {
        position: relative;
        /*   padding-right: 124px; */
        margin: 0 auto;
        width: 80%;
        max-width: 564px;
    }

    #board-manage .search-window .search-wrap input {
        height: 40px;
        width: 100%;
        font-size: 14px;
        padding: 7px 14px;
        border: 1px solid #ccc;
    }

    #board-manage .search-window .search-wrap input:focus {
        border-color: #333;
        outline: 0;
        border-width: 1px;
    }

    #board-manage .search-window .search-wrap .btn {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 108px;
        padding: 0;
        font-size: 16px;
    }

    .board-table {
        font-size: 13px;
        width: 100%;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        color: white;
    }

    .board-table a {
        color: #fff;
        display: inline-block;
        line-height: 1.4;
        word-break: break-all;
        vertical-align: middle;
        text-decoration: none;
    }

    .board-table a:hover {
        text-decoration: underline;
        color: lime;
    }

    .board-table th {
        text-align: center;
    }

    .board-table .th-num {
        width: 100px;
        text-align: center;
    }

    .board-table .th-date {
        width: 200px;
    }

    .board-table th,
    .board-table td {
        padding: 14px 0;
    }

    .board-table tbody td {
        border-top: 1px solid #e7e7e7;
        text-align: center;
    }

    .board-table tbody th {
        padding-left: 28px;
        padding-right: 14px;
        border-top: 1px solid #e7e7e7;
        text-align: left;
    }

    .board-table tbody th p {
        display: none;
    }

    .btn {
        display: inline-block;
        padding: 0 30px;
        font-size: 15px;
        font-weight: 400;
        background: transparent;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: 1px solid transparent;
        text-transform: uppercase;
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
        border-radius: 0;
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        -ms-transition: all 0.3s;
        -o-transition: all 0.3s;
        transition: all 0.3s;
    }

    .btn-dark {
        background: #555;
        color: #fff;
    }

    .btn-dark:hover,
    .btn-dark:focus {
        background: #373737;
        border-color: #373737;
        color: #fff;
    }

    .btn-dark {
        background: #555;
        color: #fff;
    }

    .btn-dark:hover,
    .btn-dark:focus {
        background: #373737;
        border-color: #373737;
        color: #fff;
    }

    /* reset */

    * {
        list-style: none;
        text-decoration: none;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    .clearfix:after {
        content: '';
        display: block;
        clear: both;
    }

    .container {
        width: 1100px;
        margin: 0 auto;
    }

    .blind {
        position: absolute;
        overflow: hidden;
        clip: rect(0 0 0 0);
        margin: -1px;
        width: 1px;
        height: 1px;
    }

    .notiWriteBtn {
        float: right;
    }

    .notiViewer {
        font-family: 'jamsil', 'sans-serif';
        min-height: 40vh;
    }

    .notiEditor {
        width: 100%;
        max-width: 1100px;
        font-family: 'jamsil', 'sans-serif';
        margin: 0 auto;
    }

    .editorIF {
        width: 95%;
        height: 100vw;
    }

    .parentnIF {
        text-align: middle;
    }

    .formDes {
        font-size: larger;
    }

    .submitBtn {
        float: right;
    }

    #notiInputData,
    #phone,
    #phoneVerifyNumber {
        width: 75%;
    }

    #secretInput {
        width: 40%;
    }

    .formKeyCheck {
        float: right;
    }

    .minh {
        min-height: 60vh;
    }

    .hidden {
        display: none !important;
    }

    .checkBox {
        width: 19px;
        height: 19px;
        border: 2px solid #bcbcbc;
        background-color: #131b2c;
    }

    .warningContent {
        float: right;
        display: block;
    }

    /* Mobile */
    @media all and (max-width: 769px) {
        #secretInput {
            width: 20%;
        }
    }

    /* Tablet */
    @media all and (min-width: 769px) and (max-width: 1024px) {
        .copyright {
            font-size: 30px;
        }

        #secretInput {
            width: 10px;
        }
    }

    /* PC */
    @media all and (min-width: 1025px) {
        .copyright {
            font-size: 32px;
        }

        #notiInputData,
        #phone,
        #phoneVerifyNumber {
            width: 50%;
        }

        #secretInput {
            width: 40%
        }

        .notiEditor {
            width: 100vw;
        }

        .editorIF {
            height: 500px;
            width: 100%;
        }
    }

    /* IPhone SE2 같이 width 길이가 짧은 기종의 경우 projectDiv의 길이로 인해 footer space 발생 문제 있음 */
    @media all and (max-width: 410px) {}

    /* 화면의 height 값이 790px 이상일 경우 메인 content 가리는 문제 발생 */
    @media all and (min-width: 411px) {}

    @import url('https://fonts.googleapis.com/css2?family=Jua&family=Nanum+Pen+Script&display=swap');

    .content-flex:not(.cTitle) {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        flex-direction: column;
    }

    .content-inline:not(.cTitle) {
        display: contents;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        flex-direction: column;
    }

    .ScdMenu,
    .cProviderData {
        display: inherit
    }

    .scContent {
        width: auto;
    }

    body .ct {
        background-color: #111827;
    }

    .eachC,
    .cProviderData {
        color: rgb(255, 255, 255);
        padding: 20px;
        margin: 20px;
        border-radius: 10px;
        font-family: 'jamsil', 'sans-serif';
        font-size: larger;
    }

    .eachC {
        width: 80vw;
        border-color: white;
        border-radius: 5px;
        border: 1px solid white;
    }

    @media all and (max-width: 768px) {
        .cTitle {
            font-size: 30px;
            font-weight: bolder;
            margin-bottom: 10px;
            font-family: 'Jua', sans-serif;
            flex-direction: row;
        }
    }

    @media all and (min-width: 769px) {
        .cTitle {
            font-size: 50px;
            font-weight: bolder;
            margin-bottom: 10px;
            font-family: 'Jua', sans-serif;
            flex-direction: row;
        }
    }

    h2 {
        align-items: center;
        flex-direction: row;
    }
</style>

<body style="background-color: #111827; font-size:larger;">
    <br>
    <div style="
            margin-left: 10vw;
            min-height: 50vh; 
            color: white; 
            font-weight: bolder; 
            font-family: 'jamsil', 'sans-serif';
            min-height: 40vh;">
        <h3 style="font-size: 30px;
        color: #fff;
        font-weight: 400;
        text-align: center;
        font-family: 'jamsil', 'sans-serif';"><strong>%title%</strong></h3>
        <p style="font-size: 18px;">
            <span style="color: lime !important;">
                %docno%
            </span>
            <br>
            %year%년
            %month%월
            %date%일,
            %hour%시
            %minute%분
        </p>
        <hr style="width: 90vw; height: 3px; background-color: #fff;" />
        <p style="font-size: 30px;">%content%</p>
        <br>
        <p style="color: rgb(255, 146, 146)">*상단 초록색 숫자는 문서열람번호입니다.<br>
        만일 작성자의 신원정보가 필요한 경우 관리자에게 문서열람번호와 함께 열람 의사를 전달해주세요.</p>
    </div>
</body>

</html>`

export default html;