import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GuideContext } from './components/ui.jsx'
import StepView from './components/StepView.jsx'
import { Overview, Extension, Help, Prep, Glossary } from './components/Sections.jsx'
import { STEPS } from './data/steps.js'
import { clearSaved, emptyState, loadState, probeStorage, saveState } from './lib/storage.js'

const EXTRA_SECTIONS = [
  { id: 'ext', label: '선택 확장 — Gemini', group: 'ext' },
  { id: 'help', label: '강사 점검·오류 도움말', group: 'more' },
  { id: 'prep', label: '강사용 준비', group: 'more' },
  { id: 'glossary', label: '용어 풀이', group: 'more' },
]
const ORDER = ['overview', ...STEPS.map((s) => s.id), ...EXTRA_SECTIONS.map((s) => s.id)]
const isSection = (id) => ORDER.includes(id)
const hashId = () => decodeURIComponent(window.location.hash.replace(/^#/, ''))

function labelOf(id) {
  if (id === 'overview') return '시작 안내'
  const st = STEPS.find((s) => s.id === id)
  if (st) return `${st.num}단계`
  return EXTRA_SECTIONS.find((s) => s.id === id)?.label ?? ''
}

export default function App() {
  const [storageOk, setStorageOk] = useState(() => probeStorage())
  const [state, setState] = useState(() => (probeStorage() ? loadState() : emptyState()))
  const [active, setActive] = useState(() => (isSection(hashId()) ? hashId() : 'overview'))
  const [toast, setToast] = useState(null)
  const [navOpen, setNavOpen] = useState(false)
  const headingRef = useRef(null)
  const firstRender = useRef(true)
  const toastTimer = useRef(null)

  const update = useCallback((fn) => setState((s) => fn(s)), [])
  const notify = useCallback((msg, kind = 'ok') => {
    clearTimeout(toastTimer.current)
    setToast({ msg, kind, key: Date.now() })
    toastTimer.current = setTimeout(() => setToast(null), 5000)
  }, [])

  // 적어 둔 주소·현재 단계를 이 브라우저에 저장. 실패해도 화면 기능은 유지한다.
  useEffect(() => {
    if (!storageOk) return
    if (!saveState(state)) setStorageOk(false)
  }, [state, storageOk])

  const go = useCallback((id) => {
    if (!isSection(id)) return
    setActive(id)
    setNavOpen(false)
    if (hashId() !== id) window.history.pushState(null, '', `#${id}`)
  }, [])

  useEffect(() => {
    const onHash = () => { const id = hashId(); if (isSection(id)) setActive(id) }
    window.addEventListener('hashchange', onHash)
    window.addEventListener('popstate', onHash)
    return () => { window.removeEventListener('hashchange', onHash); window.removeEventListener('popstate', onHash) }
  }, [])

  useEffect(() => {
    if (active !== 'overview') update((s) => (s.current === active ? s : { ...s, current: active }))
    if (firstRender.current) { firstRender.current = false; return }
    window.scrollTo({ top: 0 })
    headingRef.current?.focus({ preventScroll: true })
  }, [active, update])

  function resume() {
    const target = state.current && isSection(state.current) ? state.current : 's0'
    go(target)
    notify(`${labelOf(target)}(으)로 이동했습니다.`)
  }

  function resetAll() {
    const ok = window.confirm('이 브라우저에 저장된 적어 둔 주소와 마지막으로 본 단계가 모두 지워집니다. 되돌릴 수 없습니다. 초기화할까요?')
    if (!ok) return
    clearSaved()
    setState(emptyState())
    go('overview')
    notify('저장된 기록을 초기화했습니다.')
  }

  const ctx = useMemo(() => ({ state, update, notify }), [state, update, notify])

  const neighbors = (id) => {
    const i = ORDER.indexOf(id)
    const prev = ORDER[i - 1]
    const next = ORDER[i + 1]
    return {
      onPrev: prev ? () => go(prev) : null,
      onNext: next ? () => go(next) : null,
      prevLabel: prev ? labelOf(prev) : '',
      nextLabel: next ? (id === 's10' ? '선택 확장 보기' : labelOf(next)) : '',
    }
  }

  const sectionBody = (id) => {
    const ref = id === active ? headingRef : null
    const n = neighbors(id)
    if (id === 'overview') return <Overview headingRef={ref} onStart={() => go('s0')} />
    const st = STEPS.find((s) => s.id === id)
    if (st) return <StepView step={st} headingRef={ref} {...n} />
    if (id === 'ext') return <Extension headingRef={ref} onPrev={n.onPrev} onNext={n.onNext} />
    if (id === 'help') return <Help headingRef={ref} onPrev={n.onPrev} onNext={n.onNext} />
    if (id === 'prep') return <Prep headingRef={ref} onPrev={n.onPrev} onNext={n.onNext} />
    if (id === 'glossary') return <Glossary headingRef={ref} onPrev={n.onPrev} />
    return null
  }

  return (
    <GuideContext.Provider value={ctx}>
      <a href="#main" className="skip-link" onClick={(e) => { e.preventDefault(); headingRef.current?.focus() }}>본문으로 건너뛰기</a>

      <header className="site-header">
        <div className="header-inner">
          <p className="eyebrow">중학교 과학 교사 연수 · 단계별 안내</p>
          <h1>과학 오개념을 찾아가는 질문 코치 만들기</h1>
          <p className="share-note">강사는 이 안내 페이지를 공유하고, 참가자는 아래 단계별 프롬프트로 자신의 앱을 만듭니다.</p>

          <dl className="meta">
            <div><dt>대상</dt><dd>중학교 과학 교사 (코딩 경험 없어도 됨)</dd></div>
            <div><dt>시간</dt><dd>기본 150~180분 (계정 준비 제외) · 선택 확장 별도 30~45분 이상</dd></div>
            <div><dt>준비물</dt><dd>노트북과 최신 브라우저, Google 계정(AI Studio), GitHub 계정, Cloudflare 계정, 시험용 휴대전화</dd></div>
            <div><dt>만들 앱</dt><dd>‘과학 생각 다시 보기’ — React + Vite 정적 웹앱</dd></div>
            <div><dt>경로</dt><dd>Google AI Studio(제작) → GitHub(원본) → Cloudflare Pages(배포)</dd></div>
          </dl>

          <div className="track-legend">
            <span className="track basic">기본 과정 0~10단계 · API·서버·로그인 없음 · 이것만으로 완성</span>
            <span className="track ext">선택 확장 · Gemini 추가 질문 제안 · 교사 실험용</span>
          </div>

          
          <div className="header-actions no-print">
            <button type="button" className="btn primary" onClick={resume}>이어서 하기</button>
            <button type="button" className="btn" onClick={() => window.print()}>전체 인쇄</button>
            <button type="button" className="btn ghost" onClick={resetAll}>저장 기록 지우기</button>
          </div>
          <p className="storage-note">
            {storageOk
              ? '마지막으로 본 단계와 적어 둔 주소는 이 브라우저에만 저장됩니다. 다른 기기·브라우저와 자동 동기화되지 않습니다.'
              : ''}
          </p>
          {!storageOk && (
            <p className="storage-warn" role="alert">
              이 브라우저에서는 저장할 수 없습니다(저장 차단 또는 제한된 창). 안내와 복사 기능은 그대로 쓸 수 있지만, 탭을 닫으면 적어 둔 주소가 사라집니다.
            </p>
          )}
        </div>
      </header>

      <div className="layout">
        <nav className={`toc no-print ${navOpen ? 'is-open' : ''}`} aria-label="단계 목차">
          <button type="button" className="toc-toggle btn" aria-expanded={navOpen} onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? '목차 닫기' : `목차 열기 — 지금: ${labelOf(active)}`}
          </button>
          <div className="toc-body">
            <ul>
              <li><button type="button" className="toc-item" aria-current={active === 'overview' ? 'page' : undefined} onClick={() => go('overview')}>시작 안내</button></li>
            </ul>
            <p className="toc-group">기본 과정</p>
            <ul>
              {STEPS.map((s) => (
                <li key={s.id}>
                  <button type="button" className="toc-item" aria-current={active === s.id ? 'page' : undefined} onClick={() => go(s.id)}>
                    <span className="toc-num" aria-hidden="true">{s.num}</span>
                    <span className="toc-text">{s.num}. {s.title}<small>{s.minutes}분</small></span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="toc-group">선택 확장</p>
            <ul>
              <li>
                <button type="button" className="toc-item ext" aria-current={active === 'ext' ? 'page' : undefined} onClick={() => go('ext')}>
                  <span className="toc-num" aria-hidden="true">+</span>
                  <span className="toc-text">Gemini 추가 질문 제안<small>교사 실험용</small></span>
                </button>
              </li>
            </ul>
            <p className="toc-group">강사·참고</p>
            <ul>
              {EXTRA_SECTIONS.filter((s) => s.group === 'more').map((s) => (
                <li key={s.id}><button type="button" className="toc-item" aria-current={active === s.id ? 'page' : undefined} onClick={() => go(s.id)}>{s.label}</button></li>
              ))}
            </ul>
          </div>
        </nav>

        <main id="main" className="content">
          {ORDER.map((id) => (
            <div key={id} className={`section ${id === active ? 'is-active' : 'screen-hidden'}`} data-section={id}>
              {sectionBody(id)}
            </div>
          ))}
          <footer className="site-footer">
            <p>문서 기준일 2026-10-16 · 질문 콘텐츠는 교사 검토용 초안입니다 · 이 페이지는 외부 API를 호출하지 않는 정적 안내 페이지입니다.</p>
          </footer>
        </main>
      </div>

      <div className="toast-region no-print" aria-live="polite" role="status">
        {toast && <div key={toast.key} className={`toast ${toast.kind}`}>{toast.msg}</div>}
      </div>
    </GuideContext.Provider>
  )
}
