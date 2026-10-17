import { AddressField, Collapsible, ExtLink, PromptCard, Terms } from './ui.jsx'
import { STEPS, LINKS, BASIC_TOTAL_MINUTES } from '../data/steps.js'
import { EXT_CAUTIONS, EXT_DOCS, EXT_FLOW, EXT_RULES, EXT_STEPS } from '../data/extension.js'
import { PROMPT_EXT, PROMPT_EXT_SYSTEM, EXT_TEST_RESPONSE } from '../data/prompts.js'
import { GLOSSARY, GLOSSARY_ORDER } from '../data/glossary.js'

const LEARNING_FLOW = [
  '주제 고르기', '상황 읽기', '예상 선택', '이유 쓰기', '선택에 맞는 확인 질문',
  '증거 자료 살펴보기', '처음 설명과 비교', '다시 설명하기', '다른 상황에 적용', '교사용 해설 확인',
]

function Heading({ id, kicker, children, headingRef }) {
  return (
    <>
      {kicker && <p className="kicker">{kicker}</p>}
      <h2 id={id} ref={headingRef} tabIndex={-1}>{children}</h2>
    </>
  )
}

export function Overview({ headingRef, onStart }) {
  return (
    <article aria-labelledby="h-overview">
      <Heading id="h-overview" kicker="시작 안내" headingRef={headingRef}>이 연수에서 하는 일</Heading>

      <div className="box goal">
        <h3>무엇을 만드나요?</h3>
        <p>
          지금 보고 있는 것은 <b>연수 안내 페이지</b>입니다. 참가자는 이 페이지의 단계별 프롬프트로 각자
          <b> ‘과학 생각 다시 보기’</b>라는 질문 코치 앱을 만들어 공개 주소로 배포합니다. 안내 페이지와 참가자 앱은 서로 다른 저장소·서로 다른 주소입니다.
        </p>
      </div>

      <h3>제작 경로</h3>
      <ol className="path">
        <li><b>Google AI Studio</b><span>제작 — 문장으로 요청해 코드를 만들고 미리보기로 시험</span></li>
        <li><b>GitHub</b><span>원본 — 코드와 질문 콘텐츠를 저장하고 고친 기록을 남김</span></li>
        <li><b>Cloudflare Pages</b><span>배포 — 저장소를 빌드해 https://프로젝트명.pages.dev 공개 주소로 올림</span></li>
      </ol>
      <Terms keys={['staticApp', 'aiStudio', 'github', 'cfPages']} title="먼저 알아 둘 말" />

      <h3>기본 과정과 선택 확장</h3>
      <div className="table-wrap">
        <table>
          <thead><tr><th scope="col"></th><th scope="col">기본 과정 (0~10단계)</th><th scope="col">선택 확장 (Gemini)</th></tr></thead>
          <tbody>
            <tr><th scope="row">시간</th><td>약 {BASIC_TOTAL_MINUTES}분 (권장 150~180분, 계정 준비 제외)</td><td>별도 30~45분 이상</td></tr>
            <tr><th scope="row">내용</th><td>미리 설계해 교사가 검토하는 고정 질문 흐름의 정적 웹앱</td><td>교사 시험용으로 Gemini가 추가 질문 한 개를 제안</td></tr>
            <tr><th scope="row">API·서버·DB·로그인</th><td>없음</td><td>Cloudflare Pages Function + Gemini API</td></tr>
            <tr><th scope="row">완성 여부</th><td>이것만으로 완성된 앱</td><td>하지 않아도 됨</td></tr>
          </tbody>
        </table>
      </div>
      <p className="muted small">시간은 서비스 상태·계정 설정·네트워크에 따라 달라질 수 있습니다.</p>

      <h3>참가자 앱의 원칙</h3>
      <ul className="principles">
        <li>목적은 정답을 빨리 보여 주는 것이 아니라, 학생이 자기 생각을 드러내고 근거와 비교해 설명을 고쳐 쓰는 것입니다.</li>
        <li>자유 서술을 키워드로 맞다·틀리다 자동 판정하지 않습니다. 선택형 응답에 따른 분기는 ‘다음에 살펴볼 질문’이지 확정 진단이 아닙니다.</li>
        <li>앱 완료율을 학업 성취도나 공식 A~E로 바꾸지 않습니다. ‘오개념 학생’, ‘능력이 낮음’ 같은 낙인을 표시하지 않습니다.</li>
        <li>‘모르겠어요’는 정상적인 출발점입니다. 확신 정도(높음·보통·낮음)는 선택 사항이며 점수와 연결하지 않습니다.</li>
        <li>증거 자료는 수업용 모형·설명 자료인지 실제 실험 자료인지 명확히 표시하고, 만든 숫자를 실제 실험 결과처럼 쓰지 않습니다.</li>
        <li>이름·학번·명단·성적을 모으지 않고, 기록은 학생이 쓰는 그 브라우저에만 남깁니다.</li>
      </ul>

      <h3>학생이 거치는 학습 흐름 <span className="badge muted-badge">설명용 예시</span></h3>
      <ol className="flow" aria-label="학습 흐름 10단계">
        {LEARNING_FLOW.map((t, i) => <li key={t}><span className="flow-n">{i + 1}</span>{t}</li>)}
      </ol>

      <h3>시간표</h3>
      <div className="table-wrap">
        <table>
          <thead><tr><th scope="col">단계</th><th scope="col">내용</th><th scope="col">시간</th></tr></thead>
          <tbody>
            {STEPS.map((s) => <tr key={s.id}><td>{s.num}</td><td>{s.title}</td><td>{s.minutes}분</td></tr>)}
            <tr className="total"><td colSpan={2}>기본 과정 합계</td><td>{BASIC_TOTAL_MINUTES}분</td></tr>
            <tr><td>선택</td><td>Gemini 추가 질문 제안 (교사 실험)</td><td>30~45분 이상</td></tr>
          </tbody>
        </table>
      </div>

      <h3>이 안내 페이지 사용법</h3>
      <ul className="principles">
        <li>이 페이지는 GitHub·Cloudflare 계정 상태를 읽지 않습니다. 각 단계의 ‘직접 확인할 항목’은 참가자가 눈으로 확인합니다.</li>
        <li>마지막으로 본 단계와 적어 둔 주소는 <b>이 브라우저(localStorage)에만</b> 저장됩니다. 다른 기기·브라우저와 자동 동기화되지 않습니다.</li>
        <li>세 가지 행동은 서로 다릅니다: <b>브라우저 저장</b>(이 기기에만 남음) · <b>다운로드</b>(파일로 받기) · <b>배포</b>(인터넷 공개 주소에 올리기).</li>
        <li>‘전체 인쇄’를 누르면 접힌 단계와 긴 프롬프트까지 모두 출력됩니다.</li>
        <li>복사 버튼이 막히면 ‘수동 복사’ 칸에서 직접 복사할 수 있습니다.</li>
      </ul>
      <p className="muted small">문서 기준일 2026-10-16. 외부 서비스의 메뉴 이름·무료 조건은 이 날짜 이후 다시 확인하지 않았습니다. 연수 당일 공식 문서로 확인하세요.</p>

      <div className="pager no-print">
        <span />
        <button type="button" className="btn primary" onClick={onStart}>0단계부터 시작 →</button>
      </div>
    </article>
  )
}

export function Extension({ headingRef, onPrev, onNext }) {
  return (
    <article aria-labelledby="h-ext">
      <Heading id="h-ext" kicker="선택 확장 · 교사 실험용 · 별도 30~45분 이상" headingRef={headingRef}>
        선택 확장 — Gemini 추가 질문 제안
      </Heading>
      <div className="box ext-note">
        <p>
          <b>기본 과정을 모두 마친 뒤</b>에만 진행합니다. 하지 않아도 앱은 완성입니다.
          이 안내 페이지는 Gemini를 호출하지 않습니다. 아래는 모두 설명과 복사할 프롬프트입니다.
        </p>
      </div>
      <Terms keys={['serverFn', 'envVar', 'secret', 'structured', 'routes']} />

      <Collapsible title="선택 확장 펼치기 — 주의 사항·흐름·따라 하기·프롬프트" tone="ext">
        <div className="box caution">
          <h3>시작 전에 꼭 읽기</h3>
          <ul>{EXT_CAUTIONS.map((t, i) => <li key={i}>{t}</li>)}</ul>
        </div>

        <h3>확장 흐름</h3>
        <ol className="flow ext-flow">
          {EXT_FLOW.map((t, i) => <li key={t}><span className="flow-n">{i + 1}</span>{t}</li>)}
        </ol>

        <h3>지켜야 할 규칙</h3>
        <dl className="rule-list">
          {EXT_RULES.map((r) => (
            <div key={r.title}><dt>{r.title}</dt><dd>{r.text}</dd></div>
          ))}
        </dl>

        <h3>따라 하기</h3>
        <ol className="steps-list">
          {EXT_STEPS.map((t, i) => <li key={i}>{t}</li>)}
        </ol>

        <h3>복사할 프롬프트</h3>
        <PromptCard prompt={{ id: 'pext', title: '선택 확장 프롬프트 · 서버를 통한 질문 제안', text: PROMPT_EXT }} />
        <PromptCard
          prompt={{
            id: 'pextsys',
            title: 'Gemini 서버 지시문 초안 (서버 함수 안에 넣을 문장)',
            text: PROMPT_EXT_SYSTEM,
            note: '이 문장은 functions/api/question.js 안의 서버 쪽 지시문으로 씁니다. 학생 화면이나 브라우저 코드에 넣지 않습니다.',
          }}
        />
        <PromptCard
          compact
          prompt={{ id: 'pexttest', title: '시험용 가상 응답 (실제 학생 기록 아님)', text: EXT_TEST_RESPONSE }}
        />

        <div className="box">
          <h3>시험 배포 주소 기록</h3>
          <AddressField
            field="extTest"
            label="선택 확장 시험용 배포 주소"
            placeholder="https://science-thinking-coach-lab.pages.dev"
            help="기본판 공개 주소와 다른 시험용 프로젝트 주소를 적습니다. 학생에게 공유하지 않습니다."
          />
        </div>

        <div className="box links">
          <h3>공식 확장 문서</h3>
          <ul>{EXT_DOCS.map((l) => <li key={l.url}><ExtLink href={l.url}>{l.label}</ExtLink></li>)}</ul>
          <p className="muted small">모델 이름·무료 한도·메뉴 이름은 자주 바뀝니다. 이 안내는 2026-10-16 기준으로 작성했고, 이후 다시 확인하지 않았습니다.</p>
        </div>
      </Collapsible>

      <nav className="pager no-print" aria-label="단계 이동">
        <button type="button" className="btn" onClick={onPrev}>← 10단계</button>
        <button type="button" className="btn primary" onClick={onNext}>강사 점검·오류 도움말 →</button>
      </nav>
    </article>
  )
}

export function Help({ headingRef, onPrev, onNext }) {
  return (
    <article aria-labelledby="h-help">
      <Heading id="h-help" kicker="강사용" headingRef={headingRef}>강사 점검과 오류 도움말</Heading>

      <div className="box instructor">
        <h3><span className="role-tag instr">강사용</span> 콘텐츠 점검</h3>
        <ul>
          <li>여섯 콘텐츠를 교육과정·교과서·관측 조건에 맞게 검토합니다. 검토 전에는 ‘교사 검토용 초안’ 상태를 유지합니다.</li>
          <li>학생의 예상 답변 여러 종류를 읽어 보고, 질문이 유도적이거나 모욕적이지 않은지 점검합니다.</li>
          <li>오답 선택뿐 아니라 맞는 선택·모르겠어요·응답 생략·선택 변경 경로도 시험합니다.</li>
          <li>완성된 앱은 답안을 숨기는 시험 플랫폼이 아니라 학습 도구임을 설명합니다.</li>
          <li>중학교 범위를 넘는 공식·용어·개념은 기본 해설에서 빼거나, 명확한 교사용 확장으로 분리합니다.</li>
          <li>교육과정 코드는 성취기준 연결입니다. 공식 성취수준 A~E를 새로 만들지 않고, 수업 적용은 활동 내용과 근거를 함께 제시합니다. <ExtLink href={LINKS.moe.url}>교육부 고시</ExtLink></li>
        </ul>
      </div>

      <h3>증상별 확인 순서</h3>
      <div className="table-wrap">
        <table>
          <thead><tr><th scope="col">증상</th><th scope="col">먼저 확인할 것</th></tr></thead>
          <tbody>
            <tr><td>질문 흐름이 이상함</td><td>선택지 ID와 다음 단계 연결 (2단계 복구 프롬프트)</td></tr>
            <tr><td>주제끼리 기록이 섞임</td><td>topicId별 상태 분리와 초기화 (5단계 복구 프롬프트)</td></tr>
            <tr><td>모형이 이상함</td><td>모형 조건 · 시간 단위 · 그래프 축 · 방향 (3단계 복구 프롬프트)</td></tr>
            <tr><td>배포 실패</td><td>저장소 루트 package.json → 빌드 스크립트 → 게시 폴더(dist) → 최근 커밋 (9단계 오류 복구 프롬프트)</td></tr>
            <tr><td>공개 주소에 변경이 안 보임</td><td>GitHub 새 커밋 → Cloudflare 새 배포 성공 → 브라우저 캐시</td></tr>
            <tr><td>Gemini 관련 오류</td><td>선택 확장 문제입니다. 기본판 실패를 Gemini로 해결하려 하지 않습니다.</td></tr>
          </tbody>
        </table>
      </div>

      <h3>참가자 앱 완성 기준</h3>
      <ul className="principles">
        <li>로그인 없이 공개 주소(https://프로젝트명.pages.dev)가 열리고, 여섯 주제의 네 선택지 경로를 직접 실행할 수 있다.</li>
        <li>자유 서술 자동 채점·오개념 라벨·점수·순위가 없다.</li>
        <li>주제별 기록이 이 기기 브라우저에만 저장되고, 인쇄·JSON 내보내기·기록 지우기가 된다.</li>
        <li>외부 생성형 API·서버·DB 없이 동작한다.</li>
        <li>콘텐츠가 ‘교사 검토용 초안’으로 표시되어 있다.</li>
      </ul>

      <nav className="pager no-print" aria-label="단계 이동">
        <button type="button" className="btn" onClick={onPrev}>← 선택 확장</button>
        <button type="button" className="btn primary" onClick={onNext}>강사용 준비 →</button>
      </nav>
    </article>
  )
}

export function Prep({ headingRef, onPrev, onNext }) {
  return (
    <article aria-labelledby="h-prep">
      <Heading id="h-prep" kicker="강사용" headingRef={headingRef}>강사용 준비 — 이 안내 페이지 배포하기</Heading>
      <p>이 영역은 강사만 필요합니다. 참가자는 건너뛰어도 됩니다.</p>

      <Collapsible title="안내 페이지 자체를 Cloudflare Pages에 올리는 방법" tone="instr-tone">
        <ol className="steps-list">
          <li>이 안내 페이지 원본을 참가자 앱과 <b>다른 이름</b>의 GitHub 저장소에 올립니다. 예: <code>science-thinking-coach-workshop-guide</code></li>
          <li>저장소 최상위에 package.json, index.html, src, package-lock.json이 있는지 확인합니다.</li>
          <li>Cloudflare 대시보드에서 Workers & Pages → Pages의 Git 저장소 연결 경로로 이 저장소를 연결합니다.</li>
          <li>빌드 설정: Build command = <code>npm run build</code>, Build output directory = <code>dist</code>, Root directory = 비워 둠(루트 package.json).</li>
          <li>환경변수는 없습니다. 이 안내 페이지는 어떤 API도 호출하지 않습니다.</li>
          <li>배포가 끝나면 발급된 pages.dev 주소를 아래에 적고 참가자에게 공유합니다.</li>
        </ol>
        <p>
          안내 페이지와 참가자 앱은 <b>둘 다 Cloudflare Pages</b>에 올리지만 서로 다른 프로젝트입니다. 둘 다 루트 주소에서 열리므로 GitHub Pages용 하위 경로(base) 설정을 적용하지 않습니다.
          유료 도메인은 필요 없습니다. 무료 요금제의 제공 조건과 한도는 무제한·영구가 아니므로 공식 문서로 확인하세요:
          {' '}<ExtLink href={LINKS.cfLimits.url}>{LINKS.cfLimits.label}</ExtLink>
        </p>
      </Collapsible>

      <div className="box">
        <h3>주소 기록 (이 브라우저에만 저장)</h3>
        <AddressField
          field="guide"
          label="연수 안내 페이지 주소 — 참가자(교사)에게 공유"
          placeholder="https://science-thinking-coach-workshop-guide.pages.dev"
        />
        <AddressField
          field="app"
          label="참가자 앱 주소 — 학생에게 공유하는 주소"
          placeholder="https://science-thinking-coach.pages.dev"
          help="9단계의 ‘내 앱 주소’와 같은 칸입니다. 학생에게는 이 안내 페이지가 아니라 앱 주소를 줍니다."
        />
      </div>

      <nav className="pager no-print" aria-label="단계 이동">
        <button type="button" className="btn" onClick={onPrev}>← 강사 점검·오류 도움말</button>
        <button type="button" className="btn primary" onClick={onNext}>용어 풀이 →</button>
      </nav>
    </article>
  )
}

export function Glossary({ headingRef, onPrev }) {
  return (
    <article aria-labelledby="h-glossary">
      <Heading id="h-glossary" kicker="참고" headingRef={headingRef}>용어 풀이</Heading>
      <p>각 단계에서 처음 나올 때 한 번씩 설명한 말을 모았습니다.</p>
      <dl className="glossary">
        {GLOSSARY_ORDER.map((k) => (
          <div key={k} className="term-row"><dt>{GLOSSARY[k].term}</dt><dd>{GLOSSARY[k].def}</dd></div>
        ))}
      </dl>
      <nav className="pager no-print" aria-label="단계 이동">
        <button type="button" className="btn" onClick={onPrev}>← 강사용 준비</button>
        <span />
      </nav>
    </article>
  )
}
