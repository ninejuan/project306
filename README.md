# 🎁 306 Project

## 📕 소개
306 프로젝트는 학급에서 사용할 수 있는 다기능 플랫폼입니다.

## 🛠 기능
- 학급 시간표
- 해당 학교의 급식
- 알림장 (알림장 담당자가 작성해주세요.)
- 익명 또는 실명 건의

## 🚀 배포 (Cloudflare Workers)

```bash
yarn install --frozen-lockfile
cp .env.example .dev.vars   # 로컬 개발용 값을 채운 뒤
yarn build                  # WORKERS_CI=1 이면 Cloudflare adapter 사용
yarn deploy                 # wrangler deploy
```

Cloudflare Workers Builds 설정:

- Build command: `yarn build`
- Deploy command: `yarn deploy` (또는 `npx wrangler deploy`)
- Build output directory: `.svelte-kit/cloudflare`

운영 환경변수는 Cloudflare 대시보드의 **Settings → Variables & Secrets**에
`.env.example`과 동일한 이름으로 등록해야 합니다. 등록하지 않으면
MongoDB/메일/급식 API를 사용하는 페이지가 500을 반환합니다.

## Copyright
위 코드는 GNU GPL 3.0 라이센스가 적용됩니다.
Copyright 2023 Juan Lee, All rights reserved.

Author: Juan Lee(ninejuan@proton.me)
Official Repository: https://github.com/ninejuan/portfolio

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.