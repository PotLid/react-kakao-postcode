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

 - Tune performance and code base

License
----

MIT ©PotLId