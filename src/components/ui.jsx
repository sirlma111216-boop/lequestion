import { createContext, useContext, useId, useRef, useState } from 'react'
import { copyText } from '../lib/copy.js'
import { GLOSSARY } from '../data/glossary.js'

export const GuideContext = createContext(null)
export const useGuide = () => useContext(GuideContext)

// 접기/펼치기 영역. 내용은 늘 DOM 에 있어 인쇄할 때 모두 출력된다.
export function Collapsible({ title, children, defaultOpen = false, tone = '', badge }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  return (
    <div className={`collapsible ${tone} ${open ? 'is-open' : ''}`}>
      <button type="button" className="collapsible-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        <span className="chev" aria-hidden="true">{open ? '▾' : '▸'}</span>
        <span className="collapsible-title">{title}</span>
        {badge && <span className="badge">{badge}</span>}
        <span className="collapsible-hint no-print">{open ? '접기' : '펼치기'}</span>
      </button>
      <div id={id} className={`collapsible-body ${open ? '' : 'is-closed'}`}>{children}</div>
    </div>
  )
}

// 프롬프트 카드: 전체 복사 · 글자 수 · 펼치기/접기 · 수동 복사
export function PromptCard({ prompt, compact = false }) {
  const { notify } = useGuide()
  const [expanded, setExpanded] = useState(false)
  const [manual, setManual] = useState(false)
  const taRef = useRef(null)
  const count = prompt.text.length.toLocaleString('ko-KR')
  const lines = prompt.text.split('\n').length
  const long = lines > 6 || prompt.text.length > 600

  async function onCopy() {
    const ok = await copyText(prompt.text)
    if (ok) {
      notify(`복사했습니다 (${count}자). AI Studio 입력창에 붙여 넣으세요.`, 'ok')
    } else {
      setManual(true)
      notify('자동 복사가 막혔습니다. 열린 수동 복사 칸에서 Ctrl+C(Mac은 ⌘+C)로 복사하세요.', 'warn')
      setTimeout(() => taRef.current?.select(), 50)
    }
  }

  function openManual() {
    const next = !manual
    setManual(next)
    if (next) setTimeout(() => { taRef.current?.focus(); taRef.current?.select() }, 50)
  }

  return (
    <section className={`prompt-card ${compact ? 'compact' : ''}`} aria-label={prompt.title}>
      <header className="prompt-head">
        <div>
          <h4 className="prompt-title">{prompt.title}</h4>
          <p className="prompt-meta">{count}자 · {lines}줄</p>
        </div>
        <div className="prompt-actions no-print">
          <button type="button" className="btn primary" onClick={onCopy}>이 단계 전체 복사</button>
          {long && (
            <button type="button" className="btn" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
              {expanded ? '접기' : '펼치기'}
            </button>
          )}
          <button type="button" className="btn ghost" aria-expanded={manual} onClick={openManual}>수동 복사</button>
        </div>
      </header>
      {prompt.note && <p className="prompt-note">{prompt.note}</p>}
      <pre className={`prompt-text ${long && !expanded ? 'is-collapsed' : ''}`} tabIndex={0} aria-label={`${prompt.title} 전문`}>
        {prompt.text}
      </pre>
      {long && !expanded && (
        <button type="button" className="prompt-more no-print" onClick={() => setExpanded(true)}>
          전문 펼쳐 보기 (복사 버튼은 펼치지 않아도 전체를 복사합니다)
        </button>
      )}
      {manual && (
        <div className="manual-copy no-print">
          <label htmlFor={`manual-${prompt.id}`}>수동 복사: 칸을 누르고 Ctrl+A → Ctrl+C (Mac은 ⌘+A → ⌘+C)</label>
          <textarea id={`manual-${prompt.id}`} ref={taRef} readOnly value={prompt.text} rows={8} onFocus={(e) => e.target.select()} />
        </div>
      )}
    </section>
  )
}

export function Terms({ keys, title = '이 단계에서 처음 나오는 말' }) {
  if (!keys?.length) return null
  return (
    <div className="terms box">
      <h3>{title}</h3>
      <dl>
        {keys.map((k) => (
          <div key={k} className="term-row">
            <dt>{GLOSSARY[k].term}</dt>
            <dd>{GLOSSARY[k].def}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function ExtLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (새 탭에서 열림)</span>
      <span className="print-url"> ({href})</span>
    </a>
  )
}

export function AddressField({ field, label, help, placeholder }) {
  const { state, update } = useGuide()
  const id = useId()
  const value = state.urls[field] || ''
  const looksOk = !value || /^https:\/\/[^\s]+$/.test(value.trim())
  return (
    <div className="address-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="url"
        inputMode="url"
        placeholder={placeholder}
        value={value}
        maxLength={300}
        onChange={(e) => update((s) => ({ ...s, urls: { ...s.urls, [field]: e.target.value } }))}
      />
      {help && <p className="field-help">{help}</p>}
      {!looksOk && <p className="field-warn" role="status">https:// 로 시작하는 주소인지 확인해 보세요.</p>}
      {value && looksOk && (
        <p className="field-help no-print">
          <ExtLink href={value.trim()}>적어 둔 주소 열기</ExtLink>
        </p>
      )}
    </div>
  )
}
