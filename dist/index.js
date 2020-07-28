

function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var loadScript = function (src, id, callback) {
    var existingScript = document.getElementById(id);
    if (!existingScript) {
        var script = document.createElement('script');
        script.src = src;
        script.id = id;
        document.body.appendChild(script);
        script.onload = function () {
            if (callback)
                callback();
        };
        if (existingScript && callback)
            callback();
    }
};
var useScript = function (src, id, options) {
    if (id === void 0) { id = 'injected-script'; }
    if (options === void 0) { options = { callback: function () { return null; }, removeScript: true }; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, isScriptLoaded, setScriptLoaded, callback, removeScript;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = React.useState(false), isScriptLoaded = _a[0], setScriptLoaded = _a[1];
                    callback = options.callback, removeScript = options.removeScript;
                    return [4 /*yield*/, React.useEffect(function () {
                            if (!isScriptLoaded) {
                                loadScript(src, id, callback);
                                setScriptLoaded(true);
                            }
                            return function () {
                                if (removeScript) {
                                    var existingScript = document.getElementById(id);
                                    if (existingScript)
                                        existingScript.remove();
                                }
                            };
                        }, [src])];
                case 1:
                    _b.sent();
                    return [2 /*return*/, true];
            }
        });
    });
};

___$insertStyle(".wrap {\n  box-sizing: border-box;\n}");

var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef, Fragment = React.Fragment;
var KAKAO_API = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
var ReactKakaoPostcode = function (_a) {
    var className = _a.className, onChange = _a.onChange, _b = _a.scriptId, scriptId = _b === void 0 ? 'kakao-script' : _b, _c = _a.options, options = _c === void 0 ? { removeScript: true, } : _c;
    useScript(KAKAO_API, scriptId, options);
    var postcodeArea = useRef(null);
    var _d = useState(null), data = _d[0], setData = _d[1];
    useEffect(function () {
        if (!onChange)
            return;
        onChange(data);
    }, [data]);
    function exec_map() {
        var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        var daumObj = window["daum"];
        new daumObj.Postcode({
            oncomplete: function (data) {
                setData(data);
                closeMap();
                document.body.scrollTop = currentScroll;
            },
            onresize: function (size) {
                postcodeArea.current.style.height = size.height + 'px';
            },
            width: '100%',
            height: '100%',
            animation: true,
        }).embed(postcodeArea.current);
        postcodeArea.current.style.display = 'block';
    }
    var openMap = function () {
        if (!window["daum"]) {
            alert('다음 우편번호 서비스에 문제가 있습니다. 다시 시도해 주세요.');
            return;
        }
        exec_map();
    };
    var closeMap = function () {
        postcodeArea.current.style.display = 'none';
    };
    return (React.createElement(Fragment, null,
        React.createElement("div", { className: className }, "Test Purpose is updated"),
        React.createElement("div", { ref: postcodeArea }),
        React.createElement("button", { onClick: openMap }, "open"),
        React.createElement("button", { onClick: closeMap }, "close")));
};

exports.default = ReactKakaoPostcode;
//# sourceMappingURL=index.js.map
