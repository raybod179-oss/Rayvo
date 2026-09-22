/**
 * Tailwind CSS 3 configuration for Rayvo.
 *
 * Design tokens live in `tailwind/input.css` as CSS custom properties (so the
 * light/dark theme can switch at runtime without rebuilding). This file maps
 * them to Tailwind utilities (bg-card, text-ink-soft, border-line, …).
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  // Every file that contains Tailwind class names. Class names must appear as
  // complete strings (never built dynamically) so the compiler can find them.
  content: ['./index.html', './assets/js/**/*.js'],

  theme: {
    extend: {
      colors: {
        page: 'var(--bg-page)',
        sidebar: 'var(--bg-sidebar)',
        card: 'var(--bg-card)',
        elevated: 'var(--bg-elevated)',
        line: 'var(--border)',
        ink: {
          DEFAULT: 'var(--text-primary)',
          soft: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        brand: {
          DEFAULT: 'var(--accent-blue)',
          dark: 'var(--accent-blue-dark)',
        },
        badge: {
          'amber-bg': 'var(--badge-amber-bg)',
          'amber-text': 'var(--badge-amber-text)',
          'green-bg': 'var(--badge-green-bg)',
          'green-text': 'var(--badge-green-text)',
        },
        social: {
          telegram: '#29a9eb',
          youtube: '#ff3b30',
          bale: '#2dd4bf',
          aparat: '#ef476f',
          github: '#6b7280',
        },
      },

      fontFamily: {
        sans: ['Vazirmatn', '"Segoe UI"', 'Tahoma', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },

      width: { sidebar: 'var(--sidebar-width)' },
      height: { 'bottom-nav': 'var(--bottom-nav-height)' },

      backgroundImage: {
        // Project thumbnails (fallback when a screenshot is missing)
        'thumb-planner': 'linear-gradient(135deg, #fb923c, #f43f5e)',
        'thumb-spend': 'linear-gradient(135deg, #10b981, #0ea5e9)',
        'thumb-notes': 'linear-gradient(135deg, #f59e0b, #f97316)',
        'thumb-kanban': 'linear-gradient(135deg, #8b5cf6, #6366f1)',
        'thumb-analytics': 'linear-gradient(135deg, #06b6d4, #3b82f6)',
        'thumb-trade': 'linear-gradient(135deg, #ef4444, #f59e0b)',
        'thumb-portfolio': 'linear-gradient(135deg, #6366f1, #a855f7)',
        'thumb-ai': 'linear-gradient(135deg, #22d3ee, #6366f1)',
        'thumb-qelvexa': 'linear-gradient(135deg, #d946ef, #6366f1)',
        // Contact icons
        'social-telegram': 'linear-gradient(135deg, #29a9eb, #0f7cc4)',
        'social-youtube': 'linear-gradient(135deg, #ff3b30, #b3001b)',
        'social-bale': 'linear-gradient(135deg, #2dd4bf, #0d9488)',
        'social-aparat': 'linear-gradient(135deg, #ef476f, #be123c)',
        'social-github': 'linear-gradient(135deg, #4b5563, #1f2430)',
        'social-resume': 'linear-gradient(135deg, var(--accent-blue), #6366f1)',
      },

      keyframes: {
        'rgb-cycle': {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
      },
      animation: {
        'rgb-cycle': 'rgb-cycle 4s linear infinite',
      },

      // Project-wide transition feel (matches the original design)
      transitionDuration: { DEFAULT: '250ms' },
      transitionTimingFunction: { DEFAULT: 'ease' },
    },
  },

  plugins: [],
};
