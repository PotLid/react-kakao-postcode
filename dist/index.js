Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

/******************************************************************************
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
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

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
    }
    else if (callback) {
        callback();
    }
};
var useScript = function (src, id, options) {
    if (id === void 0) { id = 'injected-script'; }
    if (options === void 0) { options = { callback: function () { return null; }, removeScript: true }; }
    var callback = options.callback, removeScript = options.removeScript;
    React.useEffect(function () {
        loadScript(src, id, callback);
        return function () {
            if (removeScript) {
                var existingScript = document.getElementById(id);
                if (existingScript)
                    existingScript.remove();
            }
        };
    }, [src]);
};

function insertStyle(css) {
    if (typeof window === 'undefined')
        return;
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = css;
    document.head.appendChild(style);
    return css;
}

insertStyle(".wrap {\n  box-sizing: border-box;\n}");

var useState = React__namespace.useState, useRef = React__namespace.useRef, forwardRef = React__namespace.forwardRef, useImperativeHandle = React__namespace.useImperativeHandle;
var KAKAO_API = 'https://t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
var EMBED_DEFAULTS = {
    width: '100%',
    height: '100%',
    animation: true,
};
var ReactKakaoPostcode = forwardRef(function (_a, ref) {
    var className = _a.className, onChange = _a.onChange, onClose = _a.onClose, onResize = _a.onResize, onSearch = _a.onSearch, _b = _a.scriptId, scriptId = _b === void 0 ? 'kakao-script' : _b, _c = _a.scriptOptions, scriptOptions = _c === void 0 ? { removeScript: true } : _c, _d = _a.postcodeOptions, postcodeOptions = _d === void 0 ? {} : _d, _e = _a.openOptions, openOptions = _e === void 0 ? {} : _e, _f = _a.mode, mode = _f === void 0 ? 'embed' : _f, _g = _a.hideDefaultButtons, hideDefaultButtons = _g === void 0 ? false : _g;
    useScript(KAKAO_API, scriptId, scriptOptions);
    var postcodeArea = useRef(null);
    var _h = useState(false), visible = _h[0], setVisible = _h[1];
    function createPostcode(currentScroll) {
        var daumObj = window.daum;
        var finalOptions = mode === 'embed' ? __assign(__assign({}, EMBED_DEFAULTS), postcodeOptions) : __assign({}, postcodeOptions);
        return new daumObj.Postcode(__assign(__assign({}, finalOptions), { oncomplete: function (data) {
                onChange(data);
                if (mode === 'embed')
                    window.scrollTo(window.scrollX, currentScroll);
            }, onresize: function (size) {
                if (postcodeArea.current)
                    postcodeArea.current.style.height = size.height + 'px';
                if (onResize)
                    onResize(size);
            }, onclose: function (state) {
                if (mode === 'embed')
                    closePostcode();
                if (onClose)
                    onClose(state);
            }, onsearch: function (data) {
                if (onSearch)
                    onSearch(data);
            } }));
    }
    function openPostcode() {
        if (!window.daum) {
            alert('다음 우편번호 서비스에 문제가 있습니다. 다시 시도해 주세요.');
            return;
        }
        if (mode === 'embed' && visible)
            return;
        var currentScroll = window.scrollY;
        var postcode = createPostcode(currentScroll);
        if (mode === 'popup') {
            postcode.open(openOptions);
            return;
        }
        setVisible(true);
        postcode.embed(postcodeArea.current, openOptions);
    }
    function closePostcode() {
        setVisible(false);
        if (mode === 'embed' && postcodeArea.current) {
            postcodeArea.current.innerHTML = '';
        }
    }
    useImperativeHandle(ref, function () { return ({
        open: openPostcode,
        close: closePostcode,
    }); });
    return (React__namespace.createElement("div", { className: className },
        mode === 'embed' && (React__namespace.createElement("div", { ref: postcodeArea, style: { display: visible ? 'block' : 'none' } })),
        !hideDefaultButtons && (React__namespace.createElement(React__namespace.Fragment, null,
            React__namespace.createElement("button", { type: "button", onClick: openPostcode }, "open"),
            mode === 'embed' && (React__namespace.createElement("button", { type: "button", onClick: closePostcode }, "close"))))));
});

exports.default = ReactKakaoPostcode;
//# sourceMappingURL=index.js.map
