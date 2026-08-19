function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const KEYWORDS = /\b(import|export|default|from|const|let|function|return|new|if|else|true|false|null|undefined|void|interface|type)\b/g
const JSX_TAG = /(&lt;\/?)([A-Za-z][\w.]*)/g
const JSX_ATTR = /(\s)([a-zA-Z][\w-]*)(=)/g
const STRING = /('[^'\n]*'|"[^"\n]*"|`[^`]*`)/g
const COMMENT = /(\/\/[^\n]*)/g
const PUNCT = /([{}()])/g

// Stashed spans are wrapped in \x00 (a control byte that can never appear in
// real source text), so the restore pass can't be confused by numeric code
// content like `width: 640` the way a plain " 640 " delimiter would be.
const MARK_START = '\x00'
const MARK_END = '\x00'
const MARK_RE = /\x00(\d+)\x00/g

function highlight(code: string): string {
  let html = escapeHtml(code)
  const placeholders: string[] = []

  const stash = (match: string, cls: string) => {
    placeholders.push(`<span class="tok-${cls}">${match}</span>`)
    return `${MARK_START}${placeholders.length - 1}${MARK_END}`
  }

  // Every pass stashes rather than injecting raw <span> markup directly,
  // so a later pass (e.g. JSX_ATTR matching "class=") can never re-match
  // and corrupt HTML an earlier pass already produced.
  html = html.replace(COMMENT, (m) => stash(m, 'comment'))
  html = html.replace(STRING, (m) => stash(m, 'string'))
  html = html.replace(JSX_TAG, (_m, p1, p2) => `${p1}${stash(p2, 'tag')}`)
  html = html.replace(JSX_ATTR, (_m, p1, p2, p3) => `${p1}${stash(p2, 'attr')}${p3}`)
  html = html.replace(KEYWORDS, (m) => stash(m, 'keyword'))
  html = html.replace(PUNCT, (m) => stash(m, 'punct'))

  html = html.replace(MARK_RE, (_m, i) => placeholders[Number(i)])

  return html
}

export default function CodeBlock({ code, lang = 'tsx' }: { code: string, lang?: string }) {
  return (
    <pre className="code-block" data-lang={lang}>
      <code dangerouslySetInnerHTML={{ __html: highlight(code.trim()) }} />
    </pre>
  )
}
