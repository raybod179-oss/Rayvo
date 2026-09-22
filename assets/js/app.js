/*!
 * Rayvo — front-end logic.
 * Plain JavaScript, no build step, no dependencies. Three small, independent
 * features are wired up on DOMContentLoaded: theme, section navigation, and
 * the project filter. Each is a self-contained function so it's easy to read,
 * test by hand, or lift into its own file later if the project grows.
 */
(function () {
  'use strict';

  var THEME_KEY = 'rayvo-theme'; // must match assets/js/theme-init.js

  /**
   * Safe localStorage — never throws (private mode / blocked storage).
   */
  var storage = {
    get: function (key) {
      try {
        return window.localStorage.getItem(key);
      } catch (e) {
        return null;
      }
    },
    set: function (key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch (e) {
        /* ignore — the toggle still works for this page view */
      }
    },
  };

  /** @returns {Element[]} */
  function qsa(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  /* ------------------------------------------------------------------ *
   * Theme — light/dark toggle. The saved choice is applied to <html>
   * before this file even loads (see theme-init.js); here we only wire
   * up the toggle buttons and keep their icon in sync.
   * ------------------------------------------------------------------ */
  function initTheme() {
    var root = document.documentElement;
    var toggles = qsa('[data-toggle-theme]');

    function isLight() {
      return root.getAttribute('data-theme') === 'light';
    }

    function syncIcons() {
      var href = isLight() ? '#i-moon' : '#i-sun';
      qsa('[data-toggle-theme] use').forEach(function (use) {
        use.setAttribute('href', href);
      });
    }

    function setTheme(theme) {
      if (theme === 'light') root.setAttribute('data-theme', 'light');
      else root.removeAttribute('data-theme');
      storage.set(THEME_KEY, theme);
      syncIcons();
    }

    toggles.forEach(function (button) {
      button.addEventListener('click', function () {
        setTheme(isLight() ? 'dark' : 'light');
      });
    });

    syncIcons();
  }

  /* ------------------------------------------------------------------ *
   * Navigation — hash-routed single-page sections. Sidebar (desktop)
   * and the bottom bar (mobile) both use `data-section`, so they stay
   * in sync automatically. Every section gets a shareable URL and the
   * browser Back button works.
   * ------------------------------------------------------------------ */
  function initNavigation() {
    var links = qsa('[data-section]');
    var sections = qsa('section[id^="section-"]');
    var keys = sections.map(function (s) {
      return s.id.replace('section-', '');
    });
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resolve(key) {
      return keys.indexOf(key) === -1 ? 'projects' : key;
    }

    function show(requestedKey, scroll) {
      var key = resolve(requestedKey);

      sections.forEach(function (section) {
        section.hidden = section.id !== 'section-' + key;
      });
      links.forEach(function (link) {
        if (link.getAttribute('data-section') === key) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });

      if (scroll !== false) {
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
      }
    }

    links.forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        var key = resolve(link.getAttribute('data-section') || '');
        show(key);
        window.history.pushState(null, '', '#' + key);
      });
    });

    window.addEventListener('hashchange', function () {
      show(window.location.hash.slice(1), false);
    });

    show(window.location.hash.slice(1), false);
  }

  /* ------------------------------------------------------------------ *
   * Project filter — toggles `hidden` on cards that don't match the
   * selected category. Cards are already in the HTML (see index.html),
   * so filtering never causes a layout flash or a network request.
   * ------------------------------------------------------------------ */
  function initProjectFilter() {
    var group = document.querySelector('[data-filter-group]');
    var grid = document.getElementById('projectsGrid');
    if (!group || !grid) return;

    var cards = qsa('.project-card', grid);
    var emptyState = grid.querySelector('[data-empty-state]');

    group.addEventListener('click', function (event) {
      var button = event.target.closest('[data-category]');
      if (!button || !group.contains(button)) return;

      var category = button.getAttribute('data-category');
      qsa('[data-category]', group).forEach(function (el) {
        el.setAttribute('aria-pressed', String(el === button));
      });

      var visibleCount = 0;
      cards.forEach(function (card) {
        var match = category === 'all' || card.getAttribute('data-category') === category;
        card.hidden = !match;
        if (match) visibleCount += 1;
      });
      if (emptyState) emptyState.hidden = visibleCount !== 0;
    });
  }

  function setFooterYear() {
    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  /* ------------------------------------------------------------------ *
   * PWA — installable app + offline support. Registered last, and only
   * after `load`, so it never competes with the first render.
   * ------------------------------------------------------------------ */
  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function (error) {
        console.warn('[rayvo] service worker registration failed:', error);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setFooterYear();
    initTheme();
    initNavigation();
    initProjectFilter();
    registerServiceWorker();
  });
})();
