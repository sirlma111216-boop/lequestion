// 마지막으로 본 단계와 적어 둔 주소는 이 브라우저(localStorage)에만 저장된다.
// 저장이 막힌 환경(시크릿 창 제한, 저장 차단 설정 등)에서도 화면 기능은 그대로 쓴다.
const KEY = 'stc-workshop-guide:v1'
export const STATE_VERSION = 2

export function emptyState() {
  return { version: STATE_VERSION, current: null, urls: { guide: '', app: '', extTest: '' } }
}

function isPlainObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v)
}

function sanitize(raw) {
  const base = emptyState()
  if (!isPlainObject(raw) || ![1, STATE_VERSION].includes(raw.version)) return base
  base.current = typeof raw.current === 'string' && raw.current.length < 20 ? raw.current : null
  if (isPlainObject(raw.urls)) {
    for (const k of Object.keys(base.urls)) {
      const v = raw.urls[k]
      if (typeof v === 'string') base.urls[k] = v.slice(0, 300)
    }
  }
  return base
}

export function probeStorage() {
  try {
    const t = '__stc_probe__'
    window.localStorage.setItem(t, '1')
    window.localStorage.removeItem(t)
    return true
  } catch {
    return false
  }
}

export function loadState() {
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? sanitize(JSON.parse(raw)) : emptyState()
  } catch {
    return emptyState()
  }
}

export function saveState(state) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}

export function clearSaved() {
  try {
    window.localStorage.removeItem(KEY)
    return true
  } catch {
    return false
  }
}
