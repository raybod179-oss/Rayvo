/*!
 * Rayvo — theme-init
 * Runs synchronously from <head>, before first paint, so a returning visitor
 * who chose the light theme never sees a dark flash. Kept tiny and dependency
 * free on purpose. Must use the same storage key as the toggle in app.js.
 */
(function () {
  try {
    if (window.localStorage.getItem('rayvo-theme') === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch (_) {
    /* storage blocked (private mode, disabled cookies…) — default (dark) theme */
  }
})();
