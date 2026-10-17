// 클립보드 복사. 보안 컨텍스트가 아니거나 권한이 막히면 예전 방식으로 한 번 더 시도한다.
// 둘 다 실패하면 false 를 돌려주고, 화면은 수동 복사 칸을 열어 준다.
export async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* 아래 대체 방식으로 */
  }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.top = '0'
    ta.style.left = '0'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}
