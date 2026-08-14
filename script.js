// =========================================================
// Rayvo — script.js
// =========================================================

/* ---------- Real project data (Raybod Akbarlou) ----------
   img: نام فایل عکس نمونه‌کار پروژه. فایل عکس رو با همین اسم
   کنار index.html بذار تا به‌جای آیکن، عکس واقعی نشون داده بشه.
   اگر عکس پیدا نشه، خودکار به همون آیکن رنگی قبلی برمی‌گرده. */
const PROJECTS = [
  {
    name: "AK Planner",
    desc: "یک ابزار مدیریت برنامه‌ریزی شخصی با رابط کاربری مدرن.",
    tags: ["JavaScript", "CSS", "HTML"],
    level: { text: "متوسط", type: "amber" },
    demo: "https://raybod179-oss.github.io/AK-Planner/",
    icon: "fa-solid fa-calendar-days",
    thumb: "thumb-planner",
    img: "ray1.jpg",
    category: "javascript",
  },
  {
    name: "AK Spend",
    desc: "اپلیکیشن مدیریت هزینه و مالی شخصی با طراحی داشبوردی و ریسپانسیو.",
    tags: ["JavaScript", "Responsive"],
    demo: "https://raybod179-oss.github.io/AK-Spend/",
    icon: "fa-solid fa-wallet",
    thumb: "thumb-spend",
    img: "ray2.jpg",
    category: "javascript",
  },
  {
    name: "AK Notes",
    desc: "ابزار یادداشت‌برداری سریع و ساده برای ثبت ایده‌ها.",
    demo: "https://raybod179-oss.github.io/AK-Notes/",
    icon: "fa-solid fa-note-sticky",
    thumb: "thumb-notes",
    img: "ray3.jpg",
    category: "javascript",
  },
  {
    name: "AK Kanban",
    desc: "برد کانبان برای مدیریت وظایف و پیگیری پروژه‌ها.",
    demo: "https://raybod179-oss.github.io/AK-Kanbal/",
    icon: "fa-solid fa-table-columns",
    thumb: "thumb-kanban",
    img: "ray4.jpg",
    category: "javascript",
  },
  {
    name: "AK Analytics Dashboard",
    desc: "داشبورد تحلیلی برای نمایش داده‌ها و آمار به‌صورت بصری.",
    demo: "https://raybod179-oss.github.io/AK-Analytics-Dashboard/",
    icon: "fa-solid fa-chart-line",
    thumb: "thumb-analytics",
    img: "ray5.jpg",
    category: "javascript",
  },
  {
    name: "TaurusTrade",
    desc: "پلتفرم نمایشی برای معاملات و بازار مالی.",
    demo: "https://raybod179-oss.github.io/TaurusTrade/",
    icon: "fa-solid fa-chart-simple",
    thumb: "thumb-trade",
    img: "ray6.jpg",
    category: "javascript",
  },
  {
    name: "Raybod Akbarlou Portfolio",
    desc: "نمونه‌کار شخصی رایبد اکبرلو با طراحی مدرن.",
    demo: "https://raybodak-portfolio.vercel.app/",
    altLabel: "نسخه GitHub Pages",
    altUrl: "https://raybod179-oss.github.io/Raybod-Akbarlou-Portfolio-/",
    icon: "fa-solid fa-user",
    thumb: "thumb-portfolio",
    img: "ray7.jpg",
    category: "html-css",
  },
  {
    name: "AK AI Workspace — AI Chat",
    desc: "فضای کاری هوش مصنوعی با قابلیت گفتگوی هوشمند.",
    demo: "https://raybod179-oss.github.io/AK-AI-Workspase-AI--Chat/",
    icon: "fa-solid fa-robot",
    thumb: "thumb-ai",
    img: "ray8.jpg",
    category: "javascript",
  },
  {
    name: "Qelvexa",
    desc: "پروژه نمایشی Qelvexa با طراحی مدرن.",
    demo: "https://qelvexa.vercel.app/",
    altLabel: "نسخه GitHub Pages",
    altUrl: "https://raybod179-oss.github.io/Qelvexa/",
    icon: "fa-solid fa-gem",
    thumb: "thumb-qelvexa",
    img: "ray10.jpg",
    category: "html-css",
  },
];

/* ---------- Card rendering ---------- */
function renderCard(p) {
  const tagsHtml = p.tags
    ? `<div class="tech-tags">${p.tags
        .map((t) => `<span class="tech-tag font-en">${t}</span>`)
        .join("")}</div>`
    : `<div class="tech-tags"></div>`;

  const levelHtml = p.level
    ? `<span class="level-badge level-${p.level.type}"><span class="level-dot"></span>${p.level.text}</span>`
    : "";

  const altHtml = p.altUrl
    ? `<a class="btn-alt" href="${p.altUrl}" target="_blank" rel="noopener">${p.altLabel}</a>`
    : "";

  const imgHtml = p.img
    ? `<img src="${p.img}" alt="نمونه‌کار ${p.name}" class="project-thumb-img" loading="lazy" onerror="this.remove(); this.parentElement.classList.add('thumb-fallback');" />`
    : "";

  return `
    <article class="project-card" data-category="${p.category}">
      <div class="project-thumb ${p.thumb}${p.img ? "" : " thumb-fallback"}">
        ${imgHtml}
        <i class="${p.icon}"></i>
      </div>
      <div class="project-body">
        <h3 class="project-title">${p.name}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-meta">
          ${tagsHtml}
          ${levelHtml}
        </div>
        <div class="project-actions">
          <a class="btn-demo" href="${p.demo}" target="_blank" rel="noopener">مشاهده دمو</a>
          ${altHtml}
        </div>
      </div>
    </article>
  `;
}

function renderProjects(filter = "all") {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  const list =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  grid.innerHTML = list.length
    ? list.map(renderCard).join("")
    : `<div class="empty-state">در این دسته هنوز پروژه‌ای ثبت نشده است.</div>`;
}

function initFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(btn.dataset.category);
    });
  });
}

function initProjectsLoad() {
  const grid = document.getElementById("projectsGrid");
  const skeleton = document.getElementById("skeletonContainer");
  if (!grid) return;

  setTimeout(() => {
    renderProjects("all");
    if (skeleton) skeleton.style.display = "none";
    grid.style.display = "grid";
  }, 450);
}

/* ---------- Theme toggle (sun/moon) ---------- */
function initThemeToggle() {
  const root = document.documentElement;
  const saved = localStorage.getItem("rayvo-theme");

  if (saved === "light") {
    root.setAttribute("data-theme", "light");
  }

  function updateIcons() {
    const isLight = root.getAttribute("data-theme") === "light";
    document.querySelectorAll(".theme-toggle-btn i").forEach((icon) => {
      icon.className = isLight ? "fa-solid fa-moon" : "fa-solid fa-sun";
    });
  }

  document.querySelectorAll("[data-toggle-theme]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const isLight = root.getAttribute("data-theme") === "light";
      if (isLight) {
        root.removeAttribute("data-theme");
        localStorage.setItem("rayvo-theme", "dark");
      } else {
        root.setAttribute("data-theme", "light");
        localStorage.setItem("rayvo-theme", "light");
      }
      updateIcons();
    });
  });

  updateIcons();
}

/* ---------- Single-page section navigation ----------
   Sidebar (desktop) و bottom-nav (موبایل) هر دو با هم هماهنگ می‌شوند */
function initSectionNav() {
  const navLinks = document.querySelectorAll(
    ".nav-item[data-section], .bottom-nav-item[data-section]"
  );
  const sections = document.querySelectorAll(".page-section");

  function showSection(key) {
    sections.forEach((s) => s.classList.toggle("visible", s.id === `section-${key}`));
    navLinks.forEach((n) => n.classList.toggle("active", n.dataset.section === key));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navLinks.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      showSection(item.dataset.section);
    });
  });

  showSection("projects");
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initSectionNav();
  initFilters();
  initProjectsLoad();
});
