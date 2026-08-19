import { propRows, postcodeOptionKeys, themeKeys, completeDataKeys, type Lang } from '../content'

export default function ApiReference({ lang }: { lang: Lang }) {
  return (
    <div className="api-reference">
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>{lang === 'en' ? 'Type' : '타입'}</th>
              <th>{lang === 'en' ? 'Default' : '기본값'}</th>
              <th>{lang === 'en' ? 'Description' : '설명'}</th>
            </tr>
          </thead>
          <tbody>
            {propRows.map((row) => (
              <tr key={row.name}>
                <td><code>{row.name}</code></td>
                <td><code className="type-cell">{row.type}</code></td>
                <td><code>{row.def}</code></td>
                <td>{row.desc[lang]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="key-lists">
        <div>
          <h4>PostcodeOptions</h4>
          <p className="muted">
            {lang === 'en'
              ? 'Every non-callback constructor option from the original API:'
              : '콜백을 제외한 원본 API의 모든 생성자 옵션:'}
          </p>
          <ul className="key-chips">
            {postcodeOptionKeys.map((k) => <li key={k}><code>{k}</code></li>)}
          </ul>
        </div>

        <div>
          <h4>theme</h4>
          <ul className="key-chips">
            {themeKeys.map((k) => <li key={k}><code>{k}</code></li>)}
          </ul>
        </div>

        <div>
          <h4>PostcodeCompleteData</h4>
          <p className="muted">
            {lang === 'en'
              ? 'Every field passed to onChange when an address is selected:'
              : '주소 선택 시 onChange로 전달되는 모든 필드:'}
          </p>
          <ul className="key-chips">
            {completeDataKeys.map((k) => <li key={k}><code>{k}</code></li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}
