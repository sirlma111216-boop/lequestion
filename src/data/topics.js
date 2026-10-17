// 참가자 앱 '과학 생각 다시 보기'에 들어갈 질문 콘텐츠 6종 (교사 검토용 초안).
// 이 안내 페이지는 이 데이터를 화면에 보여 주고, 4단계 복사 문자열에 그대로 연결한다.
// 과학 내용을 고칠 때는 관련 분기·증거·해설을 함께 검토해야 한다.

export const REVIEW_STATUS_LABEL = '교사 검토용 초안'

export const COMMON_REASON_PROMPT = '어떤 조건과 근거를 생각했나요?'
export const COMMON_RECONSIDER_PROMPT = '처음 설명에서 유지하거나 바꾼 부분과 그 근거를 적는다.'

export const TOPICS = [
  {
    id: 'M01',
    title: '무거운 물체는 항상 더 빨리 떨어질까?',
    curriculum: [{ code: '[9과19-02]', text: '자유 낙하에서 시간에 따른 속력 변화 분석' }],
    context:
      '공기 저항을 무시할 수 있는 조건에서 질량이 다른 두 물체를 같은 높이에서 처음 속도 없이 동시에 놓는다.',
    choices: [
      { id: 'A', text: '무거운 것이 먼저' },
      { id: 'B', text: '동시에' },
      { id: 'C', text: '가벼운 것이 먼저' },
      { id: 'D', text: '모르겠어요' },
    ],
    reasonPrompt: '어떤 조건과 근거를 생각했나요?',
    followUps: [
      {
        for: ['A', 'C'],
        text: '이번 상황에서 공기 저항을 고려하나요? 두 물체에 힘이 작용한다는 사실과 속력이 변하는 정도는 같은 말일까요?',
      },
      {
        for: ['B'],
        text: '질량이 달라도 같다고 생각한 이유를, 공기 저항이 있는 일상 사례와 구분해 설명할 수 있나요?',
      },
      {
        for: ['D'],
        text: '두 물체의 높이·놓는 시각·처음 속도·공기 저항 조건 중 어떤 것이 같은지 먼저 찾아보세요.',
      },
    ],
    evidence: {
      kind: '교육용 자유 낙하 모형 — 실제 측정 데이터 아님',
      text: '같은 g에서 두 물체의 시간-속력 그래프가 겹치도록 한다. 실제 측정 데이터가 아님을 표시한다. g=9.8m/s²를 쓰되 가속도 공식 암기 문제로 확대하지 않는다.',
    },
    reconsider: '처음 설명에서 유지하거나 바꾼 부분과 그 근거를 적는다.',
    transfer: '같은 종이 한 장과 구긴 종이가 공기 중에서 다르게 떨어지는 현상을 이번 모형의 조건과 비교한다.',
    teacher:
      '자유 낙하에서 질량과 무관한 속력 변화, 공기 저항이 있는 상황의 차이를 구분한다. ‘공기 중에서도 모든 물체는 반드시 동시에 떨어진다’로 일반화하지 않는다.',
  },
  {
    id: 'M02',
    title: '기체가 생겨 질량이 줄어 보이면 질량 보존이 깨진 것일까?',
    curriculum: [{ code: '[9과16-03]', text: '화학 반응 전후 질량 보존 추론' }],
    context:
      '기체가 발생하는 반응을 열린 계와 닫힌 계 모형으로 비교한다. 실제 밀폐 용기 반응 실험을 지시하지 않는다.',
    choices: [
      { id: 'A', text: '원자가 사라져서 줄었다' },
      { id: 'B', text: '일부 기체가 측정 범위 밖으로 나갔다' },
      { id: 'C', text: '언제나 저울 오류다' },
      { id: 'D', text: '모르겠어요' },
    ],
    followUps: [
      { for: ['A'], text: '보이지 않는 기체도 질량을 가지나요? 반응 전후 원자 수를 비교해 볼까요?' },
      { for: ['B'], text: '저울 위에 포함한 범위를 닫힌 선으로 그린다면, 기체는 그 선 안에 있나요 밖에 있나요?' },
      { for: ['C'], text: '저울이 정상이라고 할 때, 측정 범위를 벗어나는 물질은 없을까요?' },
      { for: ['D'], text: '측정하는 용기 안과 바깥을 먼저 나누어 표시해 보세요.' },
    ],
    evidence: {
      kind: '입자 도식(교육용 모형) — 실제 실험 자료 아님',
      text: '원자 종류·수가 보존되며 일부 입자가 열린 경계를 통과하는 도식. 닫힌 계 모형에서는 입자가 남는다. 질량 값이 필요하면 명확히 ‘교육용 가상 수치’로 표시한다.',
    },
    transfer: '기체까지 수집하여 함께 측정하면 어떤 결과를 예상하는가?',
    teacher:
      '반응 전후 원자 재배열과 측정하는 계의 범위를 함께 고려한다. ‘질량이 줄었다’는 관찰만으로 보존 법칙을 반증했다고 결론 내리지 않는다.',
  },
  {
    id: 'M03',
    title: '식물은 낮에는 호흡하지 않을까?',
    curriculum: [{ code: '[9과12-02]', text: '광합성과 호흡에서 물질·에너지 출입 분석' }],
    context: '살아 있는 식물에서 빛이 있는 때와 없는 때의 광합성·호흡을 비교한다.',
    choices: [
      { id: 'A', text: '낮에는 광합성만, 밤에는 호흡만' },
      { id: 'B', text: '낮에도 호흡하고 빛이 있으면 광합성도 한다' },
      { id: 'C', text: '식물은 호흡하지 않는다' },
      { id: 'D', text: '모르겠어요' },
    ],
    followUps: [
      { for: ['A'], text: '낮에도 식물의 세포는 생명 활동에 에너지를 사용하나요?' },
      { for: ['B'], text: '두 과정이 함께 일어날 때, 밖에서 측정한 기체의 순변화만으로 각각의 속도를 모두 알 수 있을까요?' },
      { for: ['C'], text: '식물이 생명 활동에 사용할 에너지는 어떤 과정으로 얻을까요?' },
      { for: ['D'], text: '광합성과 호흡에서 들어오고 나가는 물질을 따로 표시해 보세요.' },
    ],
    evidence: {
      kind: '물질·에너지 화살표 도식(교육용 모형) — 실제 측정 자료 아님',
      text: '광합성·세포호흡을 분리한 물질·에너지 화살표. 광합성은 빛 조건에 연결하고 호흡은 살아 있는 세포의 에너지 이용과 연결한다. 낮의 순기체 변화는 두 과정의 상대적 크기에 따라 달라짐을 설명한다.',
    },
    transfer: '어두운 곳에 놓인 살아 있는 식물에서도 세포호흡이 필요한 이유를 설명한다.',
    teacher: '순변화와 개별 과정의 존재를 구분한다. 모든 식물의 순기체 교환을 하나의 고정 비율로 제시하지 않는다.',
  },
  {
    id: 'M04',
    title: '달의 모양은 지구 그림자 때문에 달라질까?',
    curriculum: [{ code: '[9과07-04]', text: '달의 위상변화와 일식·월식 설명' }],
    context: '한 달 동안 달의 밝게 보이는 부분이 달라지는 원인을 생각한다.',
    choices: [
      { id: 'A', text: '매일 지구 그림자가 달을 가린다' },
      { id: 'B', text: '태양빛을 받는 달의 부분을 지구에서 보는 방향이 달라진다' },
      { id: 'C', text: '달 자체의 모양이 변한다' },
      { id: 'D', text: '모르겠어요' },
    ],
    followUps: [
      { for: ['A'], text: '지구 그림자가 달을 가리는 월식은 매달 모든 밤에 일어나는 현상인가요?' },
      { for: ['B'], text: '우주에서 본 태양-지구-달의 위치와 지구에서 보이는 달을 연결할 수 있나요?' },
      { for: ['C'], text: '달의 전체 모양과 밝게 보이는 부분은 같은 뜻인가요?' },
      { for: ['D'], text: '달은 스스로 빛을 내나요, 태양빛을 반사하나요?' },
    ],
    evidence: {
      kind: '공간 단순 모형 — 실제 크기·거리 비례 아님',
      text: '태양빛을 받는 달의 반구와 관측 방향을 연결한 단순 모형. 실제 크기·거리 비례가 아니라고 명시한다. 모든 천체를 같은 평면에 그린 모형 때문에 매달 식이 일어난다고 오해하지 않도록 모형 한계를 설명한다.',
    },
    transfer: '초승달과 월식 사진을 구분하려면 어떤 정보가 더 필요한가?',
    teacher: '위상변화와 식을 구분한다. 공간 모형의 방향·관측자 시점을 점검한다.',
  },
  {
    id: 'M05',
    title: '금속은 나무보다 차갑게 느껴지므로 온도가 낮을까?',
    curriculum: [
      { code: '[9과03-01]', text: '온도와 열평형' },
      { code: '[9과03-02]', text: '열의 전달' },
    ],
    context: '같은 실내에서 충분히 오래 두어 열평형에 가까워진 금속과 나무를 비교한다.',
    choices: [
      { id: 'A', text: '금속의 온도가 반드시 낮다' },
      { id: 'B', text: '온도는 비슷해도 손에서 열이 전달되는 정도가 다를 수 있다' },
      { id: 'C', text: '나무는 열을 전달하지 않는다' },
      { id: 'D', text: '모르겠어요' },
    ],
    followUps: [
      { for: ['A'], text: '손으로 느낀 감각과 온도계로 측정한 값은 언제나 같은 정보를 주나요?' },
      { for: ['B'], text: '손과 물체 사이에서 열은 어느 방향으로 이동하고, 재료에 따라 무엇이 달라질까요?' },
      { for: ['C'], text: '열전달이 느리다는 말과 전혀 일어나지 않는다는 말은 같나요?' },
      { for: ['D'], text: '처음 조건에서 두 물체를 같은 공간에 오래 둔 이유를 찾아보세요.' },
    ],
    evidence: {
      kind: '열 이동 개념 도식(교육용 모형) — 온도계 예시는 실제 측정/가상 모형 구분 표시',
      text: '같은 초기 온도 조건과 손에서 물체로 이동하는 열의 개념 도식. 온도계 예시는 실제 측정 또는 가상 모형을 구분한다. 실제 접촉감에는 여러 물성·접촉 조건이 작용함을 교사용 보충 설명에 적는다.',
    },
    transfer:
      '주변 온도가 손보다 높은 경우 같은 재료를 만지는 느낌을 어떻게 예상할 수 있는가? 위험한 물체를 직접 만지는 실험을 요구하지 않는다.',
    teacher: '감각·온도·열전달을 구분한다. 단순히 금속은 항상 차갑다고 일반화하지 않는다.',
  },
  {
    id: 'M06',
    title: '전구를 지나면서 전류가 소모될까?',
    curriculum: [{ code: '[9과14-02]', text: '회로에서 전류를 모형으로 설명' }],
    context: '정상적으로 흐르는 단순 직렬 직류 회로에서 전구 전후의 전류를 비교한다.',
    choices: [
      { id: 'A', text: '전구 뒤 전류가 더 작다' },
      { id: 'B', text: '전구 앞뒤의 전류가 같다' },
      { id: 'C', text: '전구 뒤에는 전류가 없다' },
      { id: 'D', text: '모르겠어요' },
    ],
    followUps: [
      { for: ['A', 'C'], text: '전하가 계속 전구에서 사라지거나 쌓인다면 정상적인 회로 상태가 유지될까요?' },
      { for: ['B'], text: '전류가 같아도 전구가 빛과 열을 내는 이유를 전하와 에너지의 차이로 설명할 수 있나요?' },
      { for: ['D'], text: '회로가 끊기지 않았는지, 가지가 없는 직렬 회로인지 먼저 확인해 보세요.' },
    ],
    evidence: {
      kind: '회로 모형 — 전류계 수치가 가상 값이면 표시',
      text: '전구 양쪽의 같은 전류계 읽기와 에너지 전환을 별도로 보여 주는 모형. 전류계의 수치는 가상 값이면 그 사실을 표시한다.',
    },
    transfer: '전하의 흐름과 전기 에너지가 빛·열로 전환되는 것을 구분하여 한 문장씩 쓴다.',
    teacher:
      '정상 상태 단순 직렬 회로라는 조건을 유지한다. 전류가 같다는 것을 모든 위치의 전압이 같다는 뜻으로 확장하지 않는다.',
  },
]

// 4단계 복사 문자열에 붙는 앞부분 — 콘텐츠의 성격과 데이터 구조를 함께 알려 준다.
export const TOPIC_PREFACE = `아래 내용은 구현용 초안이다. 앱 안에 ‘${REVIEW_STATUS_LABEL}’라는 상태(reviewStatus: draft)를 두고, 실제 교사가 검토하기 전까지 검토 완료로 표시하지 않는다. 초안은 연수 체험에 사용할 수 있지만 학급 수업 전 검토가 필요하다고 안내한다.
각 주제는 같은 데이터 구조로 관리하되, 과학 설명은 아래 내용을 따른다. 버튼만 만들고 질문 내용을 비워 두지 않는다.
데이터 구조: 질문 내용은 UI와 분리한 topics 파일로 관리한다. 각 주제는 id, title, curriculumCodes, context, initialQuestion, choices, followUpsByChoice, evidence, reconsiderPrompt, transferPrompt, teacherExplanation, sourceReferences, reviewStatus를 가진다. initialQuestion은 주제 제목의 질문을 사용한다. sourceReferences에는 교육부 고시 교육과정 문서(https://www.moe.go.kr/boardCnts/viewRenew.do?boardID=141&boardSeq=93458&lev=0&search=)를 넣고, 교과서 쪽수 등 추가 출처는 교사가 검토하며 채우도록 빈 칸으로 둔다(지어내지 않는다).
공통 이유 질문: ‘${COMMON_REASON_PROMPT}’ (주제마다 따로 적힌 이유 질문이 없으면 이 문장을 사용한다.)
공통 재설명: ‘${COMMON_RECONSIDER_PROMPT}’
확신 정도는 선택 사항이며 높음·보통·낮음으로 기록할 수 있다. 학생 점수나 교사 평가와 자동 연결하지 않는다.
‘모르겠어요’(D) 선택은 정상적인 학습 출발점이다. 문항을 읽는 데 필요한 정보와 관찰 안내를 제공한다.
증거 자료는 수업용 모형·설명 자료인지, 실제 실험 자료인지 명확히 표시한다. 만들어 낸 숫자를 실제 실험 결과로 표현하지 않는다.
교육과정 연결은 개별 주제의 성취기준과 실제 수행을 기준으로 한다. 기초 관찰·근거 설명·새 상황 적용은 자체 수업 설계 예시이며 공식 성취수준 문구를 복제한 것이 아니다.`

export function choicesLine(t) {
  return t.choices.map((c) => `${c.id} ${c.text}`).join(' / ')
}

export function topicToText(t) {
  const lines = []
  lines.push(`■ 주제 ${t.id}. ${t.title}`)
  lines.push(`- 연결 성취기준: ${t.curriculum.map((c) => `${c.code} ${c.text}`).join(', ')}`)
  lines.push(`- 상황: ${t.context}`)
  lines.push(`- 처음 질문(initialQuestion): ${t.title}`)
  lines.push(`- 선택지(ID): ${choicesLine(t)}`)
  lines.push(`- 이유 질문: ${t.reasonPrompt || COMMON_REASON_PROMPT}`)
  lines.push('- 선택지 ID별 확인 질문(followUpsByChoice):')
  for (const f of t.followUps) lines.push(`  · ${f.for.join('/')} 선택 → ‘${f.text}’`)
  lines.push(`- 증거 자료 [${t.evidence.kind}]: ${t.evidence.text}`)
  lines.push(`- 재설명(reconsiderPrompt): ${t.reconsider || COMMON_RECONSIDER_PROMPT}`)
  lines.push(`- 다른 상황에 적용(transferPrompt): ${t.transfer}`)
  lines.push(`- 교사 해설(teacherExplanation): ${t.teacher}`)
  lines.push(`- 검토 상태(reviewStatus): draft — ${REVIEW_STATUS_LABEL}`)
  return lines.join('\n')
}

export function allTopicsText() {
  return TOPICS.map(topicToText).join('\n\n')
}
