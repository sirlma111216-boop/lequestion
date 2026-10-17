// 선택 확장 — Gemini 추가 질문 제안 (교사 실험용). 기본 과정과 별개다.

export const EXT_CAUTIONS = [
  '이 확장을 하지 않아도 기본 앱은 완전하게 동작합니다.',
  '무료 사용량과 모델 제공 여부는 연수 당일 실제 계정에서 확인합니다. 비용 0원을 보장하지 않으며, 결제 활성화를 권하지 않습니다.',
  '확장 대상은 교사의 실험·검토입니다. 학생이 직접 쓰는 배포에 넣으려면 해당 서비스의 최신 이용 연령·교육기관 정책·데이터 처리 조건을 먼저 확인해야 합니다.',
  'Gemini는 추가 질문 한 개를 “제안”할 뿐입니다. 학생 답변을 채점하거나, 기본 질문·교사 해설을 덮어쓰지 않습니다.',
  '생성된 질문은 ‘AI 제안 — 교사 확인 필요’로 표시되고, 검토 전에는 학생에게 자동으로 보이지 않습니다.',
  '정적 앱의 교사용 보기 버튼은 인증 수단이 아닙니다. URL을 숨기는 것도 접근 제한이 아닙니다. 실제 접근 제한을 적용하지 못하면 Gemini 호출은 꺼 둔 채로 둡니다.',
]

export const EXT_FLOW = ['브라우저', '같은 사이트의 Cloudflare Pages Function (/api/question)', 'Gemini API', '구조화된 질문 제안 (question · teacherNote · needsReview)', '교사 검토']

export const EXT_RULES = [
  { title: '키 보관', text: 'GEMINI_API_KEY는 Cloudflare Pages 서버 함수 환경변수(Secret)에만 둡니다. VITE_GEMINI_API_KEY처럼 브라우저 번들에 들어가는 이름을 쓰지 않습니다. 키를 프롬프트·GitHub·학생 화면·기기 저장소·로그에 넣지 않습니다.' },
  { title: '모델 지정', text: '그날 실제 계정에서 쓸 수 있는 텍스트 모델을 확인해 GEMINI_MODEL 서버 환경변수로 지정합니다. 무료로 쓸 수 있는 모델이 없으면 무료 확장이 된다고 말하지 않습니다.' },
  { title: '실패하면 기본 질문으로', text: 'API 실패·사용량 제한(429)·키 미설정·응답 형식 오류·시간 초과는 모두 준비된 기본 질문 흐름으로 돌아갑니다. 이때 AI가 답한 것처럼 표시하지 않습니다.' },
  { title: '보내는 내용 최소화', text: 'topicId, 현재 단계, 선택지 ID, 교사가 고른 짧은 비식별 응답(최대 1,000자)만 보냅니다. 과학 맥락은 서버가 topicId로 검토된 데이터에서 찾고, 브라우저가 보낸 해설을 그대로 믿지 않습니다.' },
  { title: '개인정보 금지', text: '이름·연락처·학번·학교명이 있는 실제 학생 기록은 쓰지 않습니다. 교사가 만든 가상 응답으로 먼저 시험하고, 보내기 전에 어떤 텍스트가 외부로 가는지 화면에서 보여 줍니다.' },
  { title: '응답 속 지시 무시', text: '자유 서술 안의 “규칙을 무시해라” 같은 문장은 학습자 응답 데이터일 뿐이며 시스템 지시로 실행하지 않습니다.' },
  { title: '서버 쪽 제한', text: '요청 크기·문자열 길이·시간 제한·출력 길이·요청 횟수를 서버에서 제한합니다. 화면 버튼의 쿨다운만으로 오용이 막힌다고 말하지 않습니다. 적용하지 못한 제한은 그 한계를 보고합니다.' },
  { title: '미리보기와 실제 실행 환경', text: 'AI Studio 미리보기가 Cloudflare Pages Functions를 실행한다고 가정하지 않습니다. 기본판은 미리보기에서, 확장 함수는 실제 시험 배포 주소에서 검증합니다. Wrangler CLI 로컬 실행은 강사용 선택 경로이며 참가자 필수가 아닙니다.' },
]

export const EXT_STEPS = [
  '기본판 공개 주소가 열리고 기본 기능이 작동하는지 먼저 확인한다.',
  '기본판을 보존한 채 별도 시험용 브랜치 또는 시험용 프로젝트를 만든다.',
  'AI Studio의 API 키 메뉴에서 프로젝트·권한·사용 가능한 모델·무료 한도를 확인한다.',
  '필요하면 키를 발급받되, 키 값을 AI Studio 대화창이나 어떤 프롬프트에도 붙여 넣지 않는다.',
  '아래 ‘선택 확장 프롬프트’를 같은 시험용 프로젝트에 입력한다.',
  '생성된 functions/api/question.js와 서버 전용 환경변수 이름(GEMINI_API_KEY, GEMINI_MODEL)을 확인한다.',
  'GitHub에 시험용 변경을 저장한다(기본판 브랜치와 섞지 않는다).',
  'Cloudflare Pages 시험 프로젝트의 Settings → Variables and Secrets에서 GEMINI_API_KEY를 Secret 유형으로, GEMINI_MODEL을 텍스트 변수로 등록한다. Production/Preview 환경을 구분하고, 미리보기에도 필요하면 그 환경에 따로 등록한 뒤 저장한다. (메뉴명은 현재 공식 안내와 함께 확인)',
  '서버 함수가 포함되도록 다시 배포한다.',
  '‘이 조건에서는 공기 저항이 없지만 무거우면 더 빨리 떨어질 것 같아요’ 같은 가상 응답으로 시험한다.',
  '화면에 표시된 “보낼 내용”을 읽은 뒤 ‘질문 제안 받기’를 누른다.',
  '제안이 과학 설명을 왜곡하거나 답을 바로 노출하지 않는지 교사가 확인한다.',
  '키를 제거하거나 오류 상황을 만들어 기본 질문으로 돌아가는지 확인한다.',
  'Cloudflare·Gemini 쪽 사용량과 요청 제한을 확인한다.',
]

export const EXT_DOCS = [
  { label: 'Gemini API 키 안내', url: 'https://ai.google.dev/gemini-api/docs/api-key' },
  { label: 'Gemini 구조화된 출력', url: 'https://ai.google.dev/gemini-api/docs/structured-output' },
  { label: 'Gemini 가격·무료 한도', url: 'https://ai.google.dev/gemini-api/docs/pricing' },
  { label: 'Cloudflare Pages Functions', url: 'https://developers.cloudflare.com/pages/functions/' },
  { label: 'Pages Functions — Secrets(비밀 변수)', url: 'https://developers.cloudflare.com/pages/functions/bindings/#secrets' },
  { label: 'Pages Functions — 라우팅(_routes.json)', url: 'https://developers.cloudflare.com/pages/functions/routing/' },
]
