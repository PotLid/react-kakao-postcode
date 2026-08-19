import { useRef, useState } from 'react'
import ReactKakaoPostcode, { PostcodeCompleteData, ReactKakaoPostcodeHandle } from 'react-kakao-postcode'
import CodeBlock from './CodeBlock'
import type { Lang } from '../content'

type Tab = 'embed' | 'popup' | 'theme' | 'ref'

const CODE: Record<Tab, string> = {
  embed: `
<ReactKakaoPostcode
  onChange={(data) => console.log(data)}
/>
  `,
  popup: `
<ReactKakaoPostcode
  mode="popup"
  onChange={(data) => console.log(data)}
  openOptions={{ autoClose: true }}
/>
  `,
  theme: `
<ReactKakaoPostcode
  onChange={(data) => console.log(data)}
  postcodeOptions={{
    animation: true,
    autoMappingRoad: false,
    theme: { bgColor: '#0B1220', searchBgColor: '#0B65C8', queryTextColor: '#FFFFFF' },
  }}
/>
  `,
  ref: `
const ref = useRef(null);

<ReactKakaoPostcode ref={ref} hideDefaultButtons onChange={(data) => console.log(data)} />
<button onClick={() => ref.current.open()}>주소 검색</button>
  `,
}

const TAB_LABELS: Record<Tab, Record<Lang, string>> = {
  embed: { en: 'Embed (default)', ko: '인라인 삽입 (기본)' },
  popup: { en: 'Popup mode', ko: '팝업 모드' },
  theme: { en: 'Custom theme', ko: '커스텀 테마' },
  ref: { en: 'Custom trigger (ref)', ko: '커스텀 트리거 (ref)' },
}

function ResultPreview({ data, lang }: { data: PostcodeCompleteData | null, lang: Lang }) {
  if (!data) {
    return (
      <p className="result-empty">
        {lang === 'en' ? 'No address selected yet.' : '아직 선택된 주소가 없습니다.'}
      </p>
    )
  }
  return (
    <dl className="result-grid">
      <dt>zonecode</dt><dd>{data.zonecode}</dd>
      <dt>address</dt><dd>{data.address}</dd>
      <dt>roadAddress</dt><dd>{data.roadAddress}</dd>
      <dt>buildingName</dt><dd>{data.buildingName || '—'}</dd>
    </dl>
  )
}

export default function Playground({ lang }: { lang: Lang }) {
  const [tab, setTab] = useState<Tab>('embed')
  const [result, setResult] = useState<PostcodeCompleteData | null>(null)
  const refHandle = useRef<ReactKakaoPostcodeHandle>(null)

  const onChange = (data: PostcodeCompleteData) => setResult(data)

  return (
    <div className="playground">
      <div className="tabs" role="tablist">
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            className={`tab ${tab === t ? 'tab-active' : ''}`}
            onClick={() => { setTab(t); setResult(null) }}
          >
            {TAB_LABELS[t][lang]}
          </button>
        ))}
      </div>

      <div className="playground-grid">
        <div className="playground-demo">
          {tab === 'embed' && <ReactKakaoPostcode onChange={onChange} />}
          {tab === 'popup' && <ReactKakaoPostcode mode="popup" onChange={onChange} openOptions={{ autoClose: true }} />}
          {tab === 'theme' && (
            <ReactKakaoPostcode
              onChange={onChange}
              postcodeOptions={{
                animation: true,
                autoMappingRoad: false,
                theme: { bgColor: '#0B1220', searchBgColor: '#0B65C8', queryTextColor: '#FFFFFF' },
              }}
            />
          )}
          {tab === 'ref' && (
            <div>
              <ReactKakaoPostcode ref={refHandle} hideDefaultButtons onChange={onChange} />
              <button type="button" className="btn-primary" onClick={() => refHandle.current?.open()}>
                {lang === 'en' ? 'Search address' : '주소 검색'}
              </button>
            </div>
          )}

          <div className="result-box">
            <ResultPreview data={result} lang={lang} />
          </div>
        </div>

        <CodeBlock code={CODE[tab]} />
      </div>
    </div>
  )
}
