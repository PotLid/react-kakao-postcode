# React-Kakao-Postcode

A React wrapper around the Daum/Kakao Postcode widget for searching Korean addresses and postal codes.

### Installation

React-Kakao-Postcode requires React >=16.8.0 (hooks support) and React-Dom >=16.8.0

```sh
$ npm install react-kakao-postcode
```

Or for those who use Yarn instead of npm

```sh
$ yarn add react-kakao-postcode
```

#### Original API (Daum/Kakao Postcode API)

This component is a full wrapper around every option, callback, and method documented at [postcode.map.kakao.com/guide#usage](https://postcode.map.kakao.com/guide#usage) — anything the raw `daum.Postcode` script supports, this component supports.

#### ReactKakaoPostcode React Component

```jsx
import ReactKakaoPostcode from 'react-kakao-postcode';

<ReactKakaoPostcode
  className="postcode-wrap"
  onChange={(data) => console.log(data)}
/>
```

Clicking the rendered "open" button embeds the postcode search widget; selecting an address calls `onChange` with the full result and closes the widget. A "close" button is also rendered to dismiss it manually.

##### Popup mode

```jsx
<ReactKakaoPostcode
  mode="popup"
  onChange={(data) => console.log(data)}
  openOptions={{ autoClose: true }}
/>
```

In `mode="popup"` the widget opens in a real popup window (`daum.Postcode#open`) instead of embedding inline; only the "open" button is rendered.

##### Passing through Postcode constructor options

Any option from the original API — sizing, theme, guide behavior, etc. — can be passed via `postcodeOptions`:

```jsx
<ReactKakaoPostcode
  onChange={(data) => console.log(data)}
  postcodeOptions={{
    animation: true,
    autoMappingRoad: false,
    theme: { bgColor: '#FFFFFF', searchBgColor: '#0B65C8' },
  }}
/>
```

##### Imperative open/close (custom trigger UI)

Pass `hideDefaultButtons` to render your own trigger UI, and drive the widget through a ref:

```jsx
const ref = useRef(null);

<ReactKakaoPostcode ref={ref} hideDefaultButtons onChange={(data) => console.log(data)} />
<button onClick={() => ref.current.open()}>주소 검색</button>
```

#### Props

| Prop                 | Type                                    | Default                  | Description                                                                 |
| -------------------- | ---------------------------------------- | ------------------------- | ----------------------------------------------------------------------------- |
| `className`          | `string`                                | `undefined`               | Class applied to the wrapping element                                       |
| `onChange`           | `(data: PostcodeCompleteData) => void`  | —                          | Called with the selected address data (`oncomplete`)                        |
| `onClose`            | `(state: 'FORCE_CLOSE' \| 'COMPLETE_CLOSE') => void` | `undefined`   | Forwards the Postcode `onclose` callback                                    |
| `onResize`           | `(size: { width: number, height: number }) => void` | `undefined`   | Forwards the Postcode `onresize` callback                                   |
| `onSearch`           | `(data: { q: string, count: number }) => void` | `undefined`         | Forwards the Postcode `onsearch` callback                                   |
| `scriptId`           | `string`                                | `'kakao-script'`          | DOM id used for the injected postcode `<script>` tag                        |
| `scriptOptions`      | `{ callback?: Function, removeScript: boolean }` | `{ removeScript: true }` | `removeScript` unmounts the script tag on unmount; `callback` runs once the script loads |
| `postcodeOptions`    | `PostcodeOptions` (see below)           | `{}`                       | Passed straight through to `new daum.Postcode({...})` (width, height, theme, `autoMapping*`, `shorthand`, etc.) |
| `openOptions`        | `{ q?, autoClose?, left?, top?, popupTitle?, popupKey? }` | `{}`     | Passed to `.embed()` / `.open()` when the widget is opened                  |
| `mode`               | `'embed' \| 'popup'`                    | `'embed'`                  | `'embed'` inlines the widget in the page; `'popup'` opens it as a popup window |
| `hideDefaultButtons` | `boolean`                               | `false`                    | Hides the built-in open/close buttons for a fully custom trigger UI (use with a `ref`) |

A `ref` on `<ReactKakaoPostcode>` exposes `{ open(), close() }` so the widget can be triggered from anywhere, not just the built-in buttons.

`PostcodeOptions` mirrors every non-callback constructor option from the original API: `width`, `height`, `minWidth`, `animation`, `focusInput`, `autoMapping`, `autoMappingRoad`, `autoMappingJibun`, `shorthand`, `pleaseReadGuide`, `pleaseReadGuideTimer`, `maxSuggestItems`, `showMoreHName`, `hideMapBtn`, `hideEngBtn`, `alwaysShowEngAddr`, `submitMode`, `useBannerLink`, `theme`.

> **Migrating from 1.x:** the script-loader config prop was renamed from `options` to `scriptOptions` (it was easily confused with the new `postcodeOptions`). If you were passing `options={{ removeScript: false }}`, use `scriptOptions={{ removeScript: false }}` instead.

### Todos

 - Migrate off `rollup-plugin-typescript2` so the build can move to TypeScript's newer native compiler (TS 7+) once the plugin ecosystem catches up — it currently breaks on TS 7's compiler API, so TypeScript is pinned to the 5.x line

License
----

MIT ©PotLid

---

## 한국어 문서

Daum/Kakao 우편번호(주소 검색) 위젯을 감싼 React 컴포넌트입니다. [postcode.map.kakao.com/guide#usage](https://postcode.map.kakao.com/guide#usage)에 문서화된 옵션·콜백·메서드를 빠짐없이 지원합니다.

### 설치

React >=16.8.0 (Hooks 지원 버전), React-DOM >=16.8.0 이 필요합니다.

```sh
$ npm install react-kakao-postcode
```

또는 Yarn 사용 시:

```sh
$ yarn add react-kakao-postcode
```

### 기본 사용법

```jsx
import ReactKakaoPostcode from 'react-kakao-postcode';

<ReactKakaoPostcode
  className="postcode-wrap"
  onChange={(data) => console.log(data)}
/>
```

"open" 버튼을 누르면 우편번호 검색 위젯이 인라인으로 삽입(embed)되고, 주소를 선택하면 `onChange`가 선택된 주소 전체 데이터와 함께 호출되며 위젯은 자동으로 닫힙니다. 수동으로 닫을 수 있는 "close" 버튼도 함께 렌더링됩니다.

### 팝업 모드

```jsx
<ReactKakaoPostcode
  mode="popup"
  onChange={(data) => console.log(data)}
  openOptions={{ autoClose: true }}
/>
```

`mode="popup"`으로 설정하면 인라인 삽입 대신 실제 팝업 창(`daum.Postcode#open`)으로 위젯이 열리며, 이 경우 "open" 버튼만 렌더링됩니다.

### Postcode 생성자 옵션 그대로 전달하기

원본 API의 모든 옵션(크기, 테마, 안내 문구 동작 등)은 `postcodeOptions`로 그대로 전달할 수 있습니다:

```jsx
<ReactKakaoPostcode
  onChange={(data) => console.log(data)}
  postcodeOptions={{
    animation: true,
    autoMappingRoad: false,
    theme: { bgColor: '#FFFFFF', searchBgColor: '#0B65C8' },
  }}
/>
```

### ref를 통한 직접 제어 (커스텀 트리거 UI)

`hideDefaultButtons`를 지정하면 기본 버튼 없이 원하는 UI로 직접 트리거를 구성할 수 있으며, ref를 통해 위젯을 열고 닫을 수 있습니다:

```jsx
const ref = useRef(null);

<ReactKakaoPostcode ref={ref} hideDefaultButtons onChange={(data) => console.log(data)} />
<button onClick={() => ref.current.open()}>주소 검색</button>
```

### Props

| Prop                  | 타입                                                        | 기본값                    | 설명                                                                        |
| --------------------- | ----------------------------------------------------------- | -------------------------- | ----------------------------------------------------------------------------- |
| `className`           | `string`                                                     | `undefined`                | 최상위 wrapping 엘리먼트에 적용되는 클래스명                                |
| `onChange`            | `(data: PostcodeCompleteData) => void`                       | —                           | 주소 선택 시 호출됩니다 (원본 API의 `oncomplete`)                           |
| `onClose`             | `(state: 'FORCE_CLOSE' \| 'COMPLETE_CLOSE') => void`         | `undefined`                 | 원본 API의 `onclose` 콜백을 그대로 전달합니다                               |
| `onResize`            | `(size: { width: number, height: number }) => void`          | `undefined`                 | 원본 API의 `onresize` 콜백을 그대로 전달합니다                              |
| `onSearch`            | `(data: { q: string, count: number }) => void`                | `undefined`                 | 원본 API의 `onsearch` 콜백을 그대로 전달합니다                              |
| `scriptId`            | `string`                                                     | `'kakao-script'`           | 우편번호 서비스 `<script>` 태그에 부여되는 DOM id                            |
| `scriptOptions`       | `{ callback?: Function, removeScript: boolean }`             | `{ removeScript: true }`   | `removeScript`는 언마운트 시 script 태그 제거 여부, `callback`은 스크립트 로드 완료 시 실행됩니다 |
| `postcodeOptions`     | `PostcodeOptions` (아래 참고)                                 | `{}`                        | `new daum.Postcode({...})` 생성자에 그대로 전달됩니다 (`width`, `height`, `theme`, `autoMapping*`, `shorthand` 등) |
| `openOptions`         | `{ q?, autoClose?, left?, top?, popupTitle?, popupKey? }`     | `{}`                        | 위젯이 열릴 때 `.embed()` / `.open()`에 전달됩니다                          |
| `mode`                | `'embed' \| 'popup'`                                         | `'embed'`                   | `'embed'`는 페이지 내 인라인 삽입, `'popup'`은 팝업 창으로 엽니다            |
| `hideDefaultButtons`  | `boolean`                                                    | `false`                      | 기본 open/close 버튼을 숨기고 완전히 커스텀한 트리거 UI를 구성할 때 사용합니다 (`ref`와 함께 사용) |

`<ReactKakaoPostcode>`에 `ref`를 지정하면 `{ open(), close() }`가 노출되어 기본 버튼이 아니더라도 어디서든 위젯을 열고 닫을 수 있습니다.

`PostcodeOptions`는 콜백을 제외한 원본 API의 모든 생성자 옵션을 그대로 반영합니다: `width`, `height`, `minWidth`, `animation`, `focusInput`, `autoMapping`, `autoMappingRoad`, `autoMappingJibun`, `shorthand`, `pleaseReadGuide`, `pleaseReadGuideTimer`, `maxSuggestItems`, `showMoreHName`, `hideMapBtn`, `hideEngBtn`, `alwaysShowEngAddr`, `submitMode`, `useBannerLink`, `theme`.

> **1.x에서 마이그레이션:** 스크립트 로더 설정 prop 이름이 `options`에서 `scriptOptions`로 변경되었습니다 (새로 추가된 `postcodeOptions`와 이름이 헷갈릴 수 있어 분리했습니다). 기존에 `options={{ removeScript: false }}`처럼 사용하셨다면 `scriptOptions={{ removeScript: false }}`로 바꿔주세요.

라이선스
----

MIT ©PotLid