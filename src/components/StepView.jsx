import { Collapsible, ExtLink, PromptCard, Terms, AddressField } from './ui.jsx'
import { TOPICS, REVIEW_STATUS_LABEL, COMMON_REASON_PROMPT, COMMON_RECONSIDER_PROMPT } from '../data/topics.js'

const AI_STUDIO_COMMON = [
  'https://aistudio.google.com/ 에 접속해 본인 계정으로 로그인합니다.',
  'Build 또는 ‘앱 만들기’ 기능에서 새 프로젝트를 엽니다. 이 안내는 화면에 없는 버튼 위치를 지어내지 않습니다. 기능 이름을 보고 찾으세요.',
  '프롬프트 01부터 순서대로 입력합니다. 매번 새 앱을 만들지 않고 같은 프로젝트에서 이어 갑니다.',
  '미리보기에서 그 단계의 성공 기준을 직접 시험한 뒤 다음 프롬프트를 입력합니다.',
  '기본 앱은 React + Vite 정적 앱으로 지정합니다. AI Studio가 Node 서버나 Gemini 기능을 덧붙였다면 기본판에 필요 없는 의존성을 제거합니다.',
  'AI Studio의 Publish/Deploy가 이 연수의 호스팅(Cloudflare Pages)으로 자동 연결되는 것은 아닙니다. 이 연수에서는 코드를 GitHub에 저장한 다음 Cloudflare Pages에 연결합니다.',
  'Settings의 GitHub 연결과 Push/Pull 기능은 현재 공식 안내를 확인하고 사용합니다. 동기화 후에는 실제 GitHub의 최신 커밋과 파일을 확인합니다.',
  '연동이 안 되면 ZIP 내보내기 → 압축 풀기 → GitHub 새 저장소 → 원본 파일·폴더 업로드 → 커밋으로 이어 갑니다. ZIP 파일 자체만 올리지 않고, package.json이 저장소 최상위인지, 숨김 폴더와 배포 설정 파일이 빠지지 않았는지 확인합니다.',
  '여러 연수 프로젝트에서 모두 AI Studio를 쓰는 이유는 제작 경험을 일관되게 하기 위해서입니다. 기본 앱이 Gemini API를 쓴다는 뜻이 아닙니다.',
]

function PrepExtra() {
  return (
    <>
      <div className="box">
        <h3>AI Studio 공통 시작 안내</h3>
        <ol className="steps-list">
          {AI_STUDIO_COMMON.map((t, i) => <li key={i}>{t}</li>)}
        </ol>
      </div>
      <div className="box">
        <h3>답을 알려 주는 퀴즈 vs 생각을 다시 설명하는 질문 코치</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th scope="col">살펴볼 점</th><th scope="col">답을 알려 주는 퀴즈</th><th scope="col">질문 코치 (우리 앱)</th></tr>
            </thead>
            <tbody>
              <tr><th scope="row">목표</th><td>정답을 빨리 맞히기</td><td>내 생각을 드러내고 근거와 비교해 다시 설명하기</td></tr>
              <tr><th scope="row">선택 후</th><td>정답/오답 표시, 점수</td><td>선택에 맞는 확인 질문(다음에 살펴볼 질문)</td></tr>
              <tr><th scope="row">자유 서술</th><td>키워드로 자동 채점</td><td>그대로 기록, 자동 판정 없음</td></tr>
              <tr><th scope="row">‘모르겠어요’</th><td>오답과 같게 처리</td><td>정상적인 출발점, 관찰 안내 제공</td></tr>
              <tr><th scope="row">끝</th><td>점수·순위</td><td>처음 설명과 다시 쓴 설명 비교, 다른 상황 적용, 교사 해설</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export function TopicCard({ t }) {
  return (
    <Collapsible title={`${t.id}. ${t.title}`} badge={REVIEW_STATUS_LABEL}>
      <dl className="topic-dl">
        <dt>연결 성취기준</dt>
        <dd>{t.curriculum.map((c) => <span key={c.code} className="code-chip">{c.code} {c.text}</span>)}</dd>
        <dt>상황</dt><dd>{t.context}</dd>
        <dt>선택지</dt>
        <dd>
          <ul className="choice-list">
            {t.choices.map((c) => <li key={c.id}><b>{c.id}</b> {c.text}</li>)}
          </ul>
        </dd>
        <dt>이유 질문</dt><dd>{t.reasonPrompt || `${COMMON_REASON_PROMPT} (공통)`}</dd>
        <dt>선택지별 확인 질문</dt>
        <dd>
          <ul className="followup-list">
            {t.followUps.map((f) => <li key={f.for.join('')}><b>{f.for.join('·')}</b> → ‘{f.text}’</li>)}
          </ul>
        </dd>
        <dt>증거 자료</dt>
        <dd><span className="evidence-tag">{t.evidence.kind}</span> {t.evidence.text}</dd>
        <dt>재설명</dt><dd>{t.reconsider || `${COMMON_RECONSIDER_PROMPT} (공통)`}</dd>
        <dt>다른 상황에 적용</dt><dd>{t.transfer}</dd>
        <dt>교사 해설</dt><dd>{t.teacher}</dd>
      </dl>
    </Collapsible>
  )
}

function TopicsExtra() {
  return (
    <div className="box">
      <h3>질문 콘텐츠 6종 미리 읽기 <span className="badge">{REVIEW_STATUS_LABEL}</span></h3>
      <p>
        위 복사 버튼에 들어 있는 내용과 같습니다. 학급 수업 전에 교사가 교육과정·교과서·관측 조건에 맞게 검토해야 합니다.
        ‘기초 관찰·근거 설명·새 상황 적용’은 자체 수업 설계 예시이며 공식 성취수준(A~E) 문구가 아닙니다.
      </p>
      <div className="topic-list">
        {TOPICS.map((t) => <TopicCard key={t.id} t={t} />)}
      </div>
    </div>
  )
}

function ZipExtra() {
  return (
    <div className="box alt">
      <h3>대체 경로 — GitHub 연동이 안 될 때 (ZIP)</h3>
      <ol className="steps-list">
        <li>AI Studio에서 프로젝트를 ZIP으로 내려받습니다(다운로드: 내 컴퓨터에 파일로 받는 행동).</li>
        <li>ZIP의 압축을 풉니다.</li>
        <li>GitHub에서 새 저장소 science-thinking-coach를 만듭니다.</li>
        <li>저장소 화면에서 Add file → Upload files를 엽니다.</li>
        <li>압축을 푼 원본 파일과 폴더를 끌어다 놓습니다. ZIP 파일 하나만 올리지 않습니다.</li>
        <li>숨김 파일(.gitignore 등)과 설정 파일이 빠지지 않았는지 확인합니다.</li>
        <li>Commit changes를 누릅니다.</li>
        <li>저장소 최상위에 package.json이 있는지 확인합니다.</li>
      </ol>
    </div>
  )
}

function AppUrlExtra() {
  return (
    <div className="box">
      <h3>내 앱 주소 기록</h3>
      <p>이 칸은 이 브라우저에만 저장됩니다. 이 안내 페이지는 Cloudflare 계정 상태를 읽지 않으며, 주소를 적는다고 배포 성공이 확인되는 것은 아닙니다.</p>
      <AddressField
        field="app"
        label="내 앱 공개 주소 (학생에게 나눠 줄 주소)"
        placeholder="https://science-thinking-coach.pages.dev"
        help="대시보드 주소(dash.cloudflare.com…)나 배포별 미리보기 주소가 아니라, 프로젝트의 정식 pages.dev 주소를 적습니다."
      />
    </div>
  )
}

const EXTRAS = { prep: PrepExtra, topics: TopicsExtra, zip: ZipExtra, appUrl: AppUrlExtra }

export default function StepView({ step, onPrev, onNext, prevLabel, nextLabel, headingRef }) {
  const Extra = step.extra ? EXTRAS[step.extra] : null

  return (
    <article className="step" aria-labelledby={`h-${step.id}`}>
      <p className="kicker">기본 과정 · {step.num}단계 · 약 {step.minutes}분</p>
      <h2 id={`h-${step.id}`} ref={headingRef} tabIndex={-1}>
        {step.num}단계 — {step.title}
      </h2>

      <div className="goal box">
        <h3>목표</h3>
        <p>{step.goal}</p>
      </div>

      <Terms keys={step.terms} />

      <aside className="instructor box" aria-label="강사용 설명">
        <h3><span className="role-tag instr">강사용</span> 설명</h3>
        <ul>{step.instructor.map((t, i) => <li key={i}>{t}</li>)}</ul>
      </aside>

      <section className="participant" aria-label="참가자 실습">
        <h3><span className="role-tag part">참가자</span> 실습</h3>

        <div className="box site">
          <h4>지금 열어 둘 곳 (작업 위치)</h4>
          <ul className="site-list">
            {step.sites.map((s, i) => (
              <li key={i}>
                {s.url ? <ExtLink href={s.url}>{s.label || s.name}</ExtLink> : <b>{s.name}</b>}
                {s.note && <span className="muted"> — {s.note}</span>}
              </li>
            ))}
          </ul>
        </div>

        <h4>한 행동씩 따라 하기</h4>
        <ol className="steps-list action-list">
          {step.actions.map((a, i) => <li key={i}>{a}</li>)}
        </ol>

        <h4>복사할 프롬프트</h4>
        {step.prompts.length ? (
          step.prompts.map((p) => <PromptCard key={p.id} prompt={p} />)
        ) : (
          <p className="muted note-box">{step.noPromptNote}</p>
        )}

        {Extra && <Extra />}

        <h4>예상 결과</h4>
        <ul className="expected-list">{step.expected.map((t, i) => <li key={i}>{t}</li>)}</ul>

        <h4>직접 확인할 항목</h4>
        <ul className="verify-list">{step.verify.map((t, i) => <li key={i}>{t}</li>)}</ul>

        <h4>막혔을 때</h4>
        <div className="trouble-list">
          {step.trouble.map((t, i) => (
            <div key={i} className="trouble">
              <p className="trouble-q"><span aria-hidden="true">？</span> {t.problem}</p>
              <p className="trouble-a">{t.fix}</p>
              {t.prompt && <PromptCard prompt={t.prompt} compact />}
            </div>
          ))}
        </div>

        {step.links.length > 0 && (
          <div className="box links">
            <h4>공식 문서</h4>
            <ul>{step.links.map((l) => <li key={l.url}><ExtLink href={l.url}>{l.label}</ExtLink></li>)}</ul>
            <p className="muted small">외부 서비스 메뉴와 무료 조건은 바뀔 수 있습니다. 연수 당일 공식 문서로 확인하세요.</p>
          </div>
        )}
      </section>

      <nav className="pager no-print" aria-label="단계 이동">
        {onPrev ? <button type="button" className="btn" onClick={onPrev}>← {prevLabel}</button> : <span />}
        {onNext ? <button type="button" className="btn primary" onClick={onNext}>{nextLabel} →</button> : <span />}
      </nav>
    </article>
  )
}
