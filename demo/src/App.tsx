import { useState } from 'react'
import CodeBlock from './components/CodeBlock'
import Playground from './components/Playground'
import ApiReference from './components/ApiReference'
import { copy, type Lang } from './content'

const INSTALL_CODE = `$ npm install react-kakao-postcode`
const QUICK_START_CODE = `
import ReactKakaoPostcode from 'react-kakao-postcode';

function AddressField() {
  return (
    <ReactKakaoPostcode
      onChange={(data) => console.log(data)}
    />
  );
}
`

export default function App() {
  const [lang, setLang] = useState<Lang>('en')
  const t = copy[lang]

  return (
    <div className="page">
      <header className="site-header">
        <div className="site-header-inner">
          <span className="brand">📮 react-kakao-postcode</span>
          <nav className="header-nav">
            <a href="https://github.com/PotLid/react-kakao-postcode" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.npmjs.com/package/react-kakao-postcode" target="_blank" rel="noreferrer">npm</a>
            <div className="lang-toggle" role="group" aria-label="language">
              <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
              <button className={lang === 'ko' ? 'active' : ''} onClick={() => setLang('ko')}>KO</button>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <h1>react-kakao-postcode</h1>
          <p className="tagline">{t.tagline}</p>
          <p className="intro">{t.intro}</p>
        </section>

        <section className="section" id="install">
          <h2>{t.installTitle}</h2>
          <CodeBlock code={INSTALL_CODE} lang="sh" />

          <h3>{t.quickStartTitle}</h3>
          <CodeBlock code={QUICK_START_CODE} />
        </section>

        <section className="section" id="playground">
          <h2>{t.playgroundTitle}</h2>
          <p className="muted">{t.playgroundIntro}</p>
          <Playground lang={lang} />
        </section>

        <section className="section" id="api">
          <h2>{t.apiTitle}</h2>
          <p className="muted">{t.apiIntro}</p>
          <ApiReference lang={lang} />
        </section>

        <section className="section" id="migration">
          <h2>{t.migrationTitle}</h2>
          <p>{t.migrationBody}</p>
        </section>
      </main>

      <footer className="site-footer">
        <p>{t.footerNote}</p>
        <p>
          <a href="https://github.com/PotLid/react-kakao-postcode" target="_blank" rel="noreferrer">GitHub</a>
          {' · '}
          <a href="https://www.npmjs.com/package/react-kakao-postcode" target="_blank" rel="noreferrer">npm</a>
          {' · '}
          <a href="https://postcode.map.kakao.com/guide#usage" target="_blank" rel="noreferrer">Kakao Postcode API</a>
        </p>
      </footer>
    </div>
  )
}
