export type Lang = 'en' | 'ko'

export const propRows: { name: string, type: string, def: string, desc: Record<Lang, string> }[] = [
  {
    name: 'className',
    type: 'string',
    def: 'undefined',
    desc: {
      en: 'Class applied to the wrapping element',
      ko: '최상위 wrapping 엘리먼트에 적용되는 클래스명',
    },
  },
  {
    name: 'onChange',
    type: '(data: PostcodeCompleteData) => void',
    def: '—',
    desc: {
      en: 'Called with the selected address data (oncomplete)',
      ko: '주소 선택 시 호출됩니다 (원본 API의 oncomplete)',
    },
  },
  {
    name: 'onClose',
    type: "(state: 'FORCE_CLOSE' | 'COMPLETE_CLOSE') => void",
    def: 'undefined',
    desc: {
      en: 'Forwards the Postcode onclose callback',
      ko: '원본 API의 onclose 콜백을 그대로 전달합니다',
    },
  },
  {
    name: 'onResize',
    type: '(size: { width: number, height: number }) => void',
    def: 'undefined',
    desc: {
      en: 'Forwards the Postcode onresize callback',
      ko: '원본 API의 onresize 콜백을 그대로 전달합니다',
    },
  },
  {
    name: 'onSearch',
    type: '(data: { q: string, count: number }) => void',
    def: 'undefined',
    desc: {
      en: 'Forwards the Postcode onsearch callback',
      ko: '원본 API의 onsearch 콜백을 그대로 전달합니다',
    },
  },
  {
    name: 'scriptId',
    type: 'string',
    def: "'kakao-script'",
    desc: {
      en: 'DOM id used for the injected postcode <script> tag',
      ko: '우편번호 서비스 <script> 태그에 부여되는 DOM id',
    },
  },
  {
    name: 'scriptOptions',
    type: '{ callback?: Function, removeScript: boolean }',
    def: '{ removeScript: true }',
    desc: {
      en: 'removeScript unmounts the script tag on unmount; callback runs once the script loads',
      ko: 'removeScript는 언마운트 시 script 태그 제거 여부, callback은 스크립트 로드 완료 시 실행됩니다',
    },
  },
  {
    name: 'postcodeOptions',
    type: 'PostcodeOptions',
    def: '{}',
    desc: {
      en: 'Passed straight through to new daum.Postcode({...}) — width, height, theme, autoMapping*, shorthand, etc.',
      ko: 'new daum.Postcode({...}) 생성자에 그대로 전달됩니다 (width, height, theme, autoMapping* 등)',
    },
  },
  {
    name: 'openOptions',
    type: '{ q?, autoClose?, left?, top?, popupTitle?, popupKey? }',
    def: '{}',
    desc: {
      en: 'Passed to .embed() / .open() when the widget is opened',
      ko: '위젯이 열릴 때 .embed() / .open()에 전달됩니다',
    },
  },
  {
    name: 'mode',
    type: "'embed' | 'popup'",
    def: "'embed'",
    desc: {
      en: "'embed' inlines the widget in the page; 'popup' opens it as a popup window",
      ko: "'embed'는 페이지 내 인라인 삽입, 'popup'은 팝업 창으로 엽니다",
    },
  },
  {
    name: 'hideDefaultButtons',
    type: 'boolean',
    def: 'false',
    desc: {
      en: 'Hides the built-in open/close buttons for a fully custom trigger UI (use with a ref)',
      ko: '기본 open/close 버튼을 숨기고 커스텀 트리거 UI를 구성할 때 사용합니다 (ref와 함께 사용)',
    },
  },
]

export const postcodeOptionKeys = [
  'width', 'height', 'minWidth', 'animation', 'focusInput', 'autoMapping',
  'autoMappingRoad', 'autoMappingJibun', 'shorthand', 'pleaseReadGuide',
  'pleaseReadGuideTimer', 'maxSuggestItems', 'showMoreHName', 'hideMapBtn',
  'hideEngBtn', 'alwaysShowEngAddr', 'submitMode', 'useBannerLink', 'theme',
]

export const themeKeys = [
  'bgColor', 'searchBgColor', 'contentBgColor', 'pageBgColor', 'textColor',
  'queryTextColor', 'postcodeTextColor', 'emphTextColor', 'outlineColor',
]

export const completeDataKeys = [
  'zonecode', 'address', 'addressEnglish', 'addressType', 'userSelectedType',
  'noSelected', 'userLanguageType', 'roadAddress', 'roadAddressEnglish',
  'jibunAddress', 'jibunAddressEnglish', 'autoRoadAddress', 'autoRoadAddressEnglish',
  'autoJibunAddress', 'autoJibunAddressEnglish', 'buildingCode', 'buildingName',
  'apartment', 'sido', 'sidoEnglish', 'sigungu', 'sigunguEnglish', 'sigunguCode',
  'roadnameCode', 'bcode', 'roadname', 'roadnameEnglish', 'bname', 'bnameEnglish',
  'bname1', 'bname1English', 'bname2', 'bname2English', 'hname', 'query', 'postcode',
]

export const copy: Record<Lang, {
  tagline: string
  intro: string
  installTitle: string
  quickStartTitle: string
  playgroundTitle: string
  playgroundIntro: string
  apiTitle: string
  apiIntro: string
  migrationTitle: string
  migrationBody: string
  footerNote: string
}> = {
  en: {
    tagline: 'A React wrapper around the Daum/Kakao Postcode widget',
    intro: 'Search Korean addresses and postal codes from a React component, with full coverage of every option, callback, and method documented in the original Kakao Postcode API.',
    installTitle: 'Installation',
    quickStartTitle: 'Quick start',
    playgroundTitle: 'Live playground',
    playgroundIntro: 'These are running against the real Kakao Postcode widget — click a tab, then "open" to try it.',
    apiTitle: 'API reference',
    apiIntro: 'Every prop the component accepts. postcodeOptions and its theme accept every option documented in the original API.',
    migrationTitle: 'Migrating from 1.x',
    migrationBody: 'The script-loader config prop was renamed from options to scriptOptions (it was easily confused with the new postcodeOptions). If you were passing options={{ removeScript: false }}, use scriptOptions={{ removeScript: false }} instead.',
    footerNote: 'MIT licensed.',
  },
  ko: {
    tagline: 'Daum/Kakao 우편번호 위젯을 감싼 React 컴포넌트',
    intro: 'React 컴포넌트에서 한국 주소와 우편번호를 검색하세요. 원본 Kakao Postcode API에 문서화된 모든 옵션·콜백·메서드를 빠짐없이 지원합니다.',
    installTitle: '설치',
    quickStartTitle: '빠른 시작',
    playgroundTitle: '라이브 플레이그라운드',
    playgroundIntro: '아래 데모는 실제 Kakao 우편번호 위젯과 함께 동작합니다 — 탭을 선택하고 "open"을 눌러보세요.',
    apiTitle: 'API 레퍼런스',
    apiIntro: '컴포넌트가 받는 모든 prop입니다. postcodeOptions와 그 안의 theme은 원본 API에 문서화된 모든 옵션을 지원합니다.',
    migrationTitle: '1.x에서 마이그레이션',
    migrationBody: '스크립트 로더 설정 prop 이름이 options에서 scriptOptions로 변경되었습니다 (새로 추가된 postcodeOptions와 헷갈릴 수 있어 분리했습니다). 기존에 options={{ removeScript: false }}처럼 사용하셨다면 scriptOptions={{ removeScript: false }}로 바꿔주세요.',
    footerNote: 'MIT 라이선스로 배포됩니다.',
  },
}
