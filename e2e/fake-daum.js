// Stubs the external Daum/Kakao postcode script's global API so tests run
// deterministically and offline. Installed via Playwright's addInitScript,
// so it exists on `window` before the app bundle (and thus the component) runs.
(function () {
  window.__postcodeCalls = [];

  function FakePostcode(opts) {
    this.opts = opts;
    window.__postcodeCalls.push(this);
  }

  FakePostcode.prototype.embed = function (element, openOptions) {
    this.embedElement = element;
    this.embedOpenOptions = openOptions;
    var marker = document.createElement('div');
    marker.setAttribute('data-testid', 'fake-embed-marker');
    marker.textContent = 'FAKE_EMBED_MOUNTED';
    element.appendChild(marker);
  };

  FakePostcode.prototype.open = function (openOptions) {
    this.openOpenOptions = openOptions;
  };

  FakePostcode.prototype.triggerComplete = function (data) {
    this.opts.oncomplete(data);
  };

  FakePostcode.prototype.triggerResize = function (size) {
    this.opts.onresize(size);
  };

  FakePostcode.prototype.triggerClose = function (state) {
    this.opts.onclose(state);
  };

  FakePostcode.prototype.triggerSearch = function (data) {
    this.opts.onsearch(data);
  };

  window.daum = { Postcode: FakePostcode };
})();
