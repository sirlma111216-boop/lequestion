# 과학 오개념을 찾아가는 질문 코치 만들기 — 연수 안내 페이지

중학교 과학 교사 연수용 **단계별 안내 웹페이지**입니다. 참가자는 이 페이지의 프롬프트로 각자
‘과학 생각 다시 보기’ 앱을 Google AI Studio → GitHub → Cloudflare Pages 경로로 만듭니다.
이 저장소는 안내 페이지이며, 참가자 앱이 아닙니다.

- React + Vite 정적 사이트. 외부 API·서버·DB·로그인 없음, 환경변수 없음.
- 마지막으로 본 단계와 적어 둔 주소는 방문자 브라우저의 localStorage에만 저장됩니다(기기 간 동기화 없음).
- 문서 기준일: 2026-10-16

## 내용 고치기

| 파일 | 내용 |
| --- | --- |
| `src/data/topics.js` | 질문 콘텐츠 6종(M01~M06, 교사 검토용 초안). 4단계 복사 문자열이 이 데이터로 만들어집니다. |
| `src/data/prompts.js` | 프롬프트 01~07, 복구 프롬프트, 선택 확장 프롬프트, Gemini 서버 지시문 초안 |
| `src/data/steps.js` | 0~10단계 목표·작업 위치·따라 하기·예상 결과·확인 항목·막혔을 때·공식 링크 |
| `src/data/extension.js` | 선택 확장(Gemini) 주의 사항·규칙·따라 하기·공식 문서 |
| `src/data/glossary.js` | 용어 풀이(각 단계 첫 등장 시 표시) |

## 실행

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```

결과는 `dist/` 폴더에 생깁니다.

## Cloudflare Pages 배포 (강사용)

1. 이 폴더를 참가자 앱과 다른 이름의 GitHub 저장소(예: `science-thinking-coach-workshop-guide`)에 올립니다.
2. Cloudflare 대시보드 → Workers & Pages → Pages의 Git 저장소 연결로 저장소를 선택합니다.
3. Build command `npm run build`, Build output directory `dist`, Root directory 비움, 환경변수 없음.
4. 배포 후 발급된 `https://프로젝트명.pages.dev` 주소를 참가자에게 공유합니다.

무료 요금제 조건과 한도는 공식 문서로 확인하세요: https://developers.cloudflare.com/pages/platform/limits/
