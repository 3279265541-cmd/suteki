/* =========================================================
   导航、页脚、时钟、列表渲染、作品筛选与弹窗
   ========================================================= */

(function () {
  "use strict";

  var body = document.body;
  var ROOT = body.dataset.root || "";
  var PAGE = body.dataset.page || "";
  var S = window.SITE || {};
  var TRACKS = window.TRACKS || [];
  var WORKS = window.WORKS || [];
  var POSTS = window.POSTS || [];

  var ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) { return ESC[c]; });
  }

  function url(path) {
    if (!path) return "";
    if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
    return ROOT + path;
  }

  var NAV = [
    { id: "home", label: "首页", href: "index.html" },
    { id: "works", label: "作品", href: "works.html" },
    { id: "blog", label: "文章", href: "blog.html" },
    { id: "music", label: "音乐", href: "music.html" },
    { id: "about", label: "关于", href: "about.html" }
  ];

  /* ---------------- 顶部导航 ---------------- */

  function headerHTML() {
    var links = NAV.map(function (item) {
      return '<a href="' + url(item.href) + '"' +
        (PAGE === item.id ? ' class="is-active" aria-current="page"' : "") +
        ">" + item.label + "</a>";
    }).join("");

    var mobileLinks = NAV.map(function (item, i) {
      return '<a href="' + url(item.href) + '"' +
        (PAGE === item.id ? ' class="is-active"' : "") + ">" +
        '<span>' + String(i + 1).padStart(2, "0") + "</span>" + item.label + "</a>";
    }).join("");

    return '' +
      '<header class="site-head" data-head>' +
        '<div class="head-inner">' +
          '<a class="brand" href="' + url("index.html") + '" aria-label="' + esc(S.name) + ' · 首页">' +
            '<span class="brand-disc" aria-hidden="true"></span>' +
            '<span class="brand-text">' +
              '<span class="brand-name">' + esc(S.name) + "</span>" +
              '<span class="brand-sub">' + esc(S.latin) + " · FM 22.0</span>" +
            "</span>" +
          "</a>" +
          '<nav class="nav-desktop" aria-label="主导航">' + links + "</nav>" +
          '<div class="head-side">' +
            '<span class="on-air"><i class="dot"></i>ON AIR</span>' +
            '<button class="menu-btn" type="button" data-menu-open aria-expanded="false" aria-controls="mobileMenu">菜单 <i></i></button>' +
          "</div>" +
        "</div>" +
      "</header>" +
      '<dialog class="mobile-menu" id="mobileMenu" data-menu aria-label="站点菜单" tabindex="-1">' +
        '<div class="mobile-menu-top">' +
          '<span class="brand-sub">' + esc(S.latin) + " · 深夜频道</span>" +
          '<button class="menu-close" type="button" data-menu-close aria-label="关闭菜单">✕</button>' +
        "</div>" +
        '<nav class="mobile-nav" aria-label="移动端导航">' + mobileLinks + "</nav>" +
        '<div class="mobile-menu-foot"><span>FM 22.0</span><span>' + esc(S.tagline) + "</span></div>" +
      "</dialog>";
  }

  /* ---------------- 页脚 ---------------- */

  function footerHTML() {
    var year = new Date().getFullYear();
    var navLinks = NAV.map(function (item) {
      return '<a href="' + url(item.href) + '">' + item.label + "<em>↗</em></a>";
    }).join("");

    var socials = (S.socials || []).map(function (item) {
      var href = item.href && item.href !== "#" ? url(item.href) : "";
      if (href) {
        return '<a href="' + href + '" rel="noopener" target="_blank">' + esc(item.label) + "<em>↗</em></a>";
      }
      return '<span>' + esc(item.label) + "<em>待填</em></span>";
    }).join("");

    return '' +
      '<footer class="site-foot">' +
        '<div class="wrap">' +
          '<p class="foot-word">' + esc(S.name) + "</p>" +
          '<p class="foot-tag">' + esc(S.tagline) + " · 一个很小的深夜电台</p>" +
          '<div class="foot-grid">' +
            "<div>" +
              '<p class="foot-label">About</p>' +
              '<p class="foot-about">' + esc(S.description) + "</p>" +
            "</div>" +
            '<div class="foot-links">' +
              '<p class="foot-label">Index</p>' + navLinks +
            "</div>" +
            '<div class="foot-links">' +
              '<p class="foot-label">Elsewhere</p>' +
              socials +
              '<a href="mailto:' + esc(S.email) + '">写信给我<em>@</em></a>' +
              '<p class="foot-place">常驻 · ' + esc(S.location) + "</p>" +
            "</div>" +
          "</div>" +
          '<div class="foot-bottom">' +
            "<span>© " + year + " " + esc(S.name) + " · " + esc(S.tagline) + "</span>" +
            "<span>手写 HTML / CSS · 没有算法</span>" +
            '<a href="#top">回到顶部 ↑</a>' +
          "</div>" +
        "</div>" +
      "</footer>";
  }

  function mountChrome() {
    document.querySelectorAll("[data-site-header]").forEach(function (el) {
      el.innerHTML = headerHTML();
    });
    document.querySelectorAll("[data-site-footer]").forEach(function (el) {
      el.innerHTML = footerHTML();
    });
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
    if (!document.querySelector("[data-work-modal]")) {
      document.body.insertAdjacentHTML("beforeend", modalHTML());
    }
  }

  /* ---------------- 作品弹窗骨架（全站共用一份） ---------------- */

  function modalHTML() {
    return '' +
      '<dialog class="work-modal" data-work-modal aria-labelledby="workModalTitle" tabindex="-1">' +
        '<div class="modal-media">' +
          '<img data-modal-img alt="">' +
          '<button class="modal-close" type="button" data-modal-close aria-label="关闭">✕</button>' +
        "</div>" +
        '<div class="modal-body">' +
          "<div>" +
            '<h2 id="workModalTitle" data-modal-title></h2>' +
            '<p class="modal-desc" data-modal-desc></p>' +
          "</div>" +
          '<aside class="modal-side">' +
            "<dl>" +
              "<div><dt>类型</dt><dd data-modal-category></dd></div>" +
              "<div><dt>年份</dt><dd data-modal-year></dd></div>" +
              "<div><dt>标签</dt><dd data-modal-tags></dd></div>" +
            "</dl>" +
            '<a class="btn btn-solid" data-modal-link href="#"></a>' +
          "</aside>" +
        "</div>" +
      "</dialog>";
  }

  /* ---------------- 顶栏滚动 & 移动菜单 ---------------- */

  function setupHeader() {
    var head = document.querySelector("[data-head]");
    if (!head) return;

    function onScroll() {
      head.classList.toggle("is-scrolled", window.scrollY > 10);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var menu = document.querySelector("[data-menu]");
    var openBtn = document.querySelector("[data-menu-open]");
    var closeBtn = document.querySelector("[data-menu-close]");
    if (!menu || !openBtn) return;

    var menuOpen = false;

    function setMenu(open, returnFocus) {
      if (open === menuOpen) return;
      menuOpen = open;
      openBtn.setAttribute("aria-expanded", open ? "true" : "false");

      if (open) {
        if (!menu.open) menu.showModal();
        menu.classList.add("is-open");
        document.body.style.overflow = "hidden";
        menu.focus();
      } else {
        menu.classList.remove("is-open");
        if (menu.open) menu.close();
        document.body.style.overflow = "";
        if (returnFocus !== false) openBtn.focus();
      }
    }

    openBtn.addEventListener("click", function () { setMenu(true); });
    if (closeBtn) closeBtn.addEventListener("click", function () { setMenu(false); });

    menu.querySelectorAll(".mobile-nav a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false, false); });
    });

    menu.addEventListener("click", function (e) {
      if (e.target === menu) setMenu(false);
    });

    menu.addEventListener("cancel", function (e) {
      e.preventDefault();
      setMenu(false);
    });

    menu.addEventListener("close", function () {
      menuOpen = false;
      openBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  }

  /* ---------------- 时钟 ---------------- */

  function setupClock() {
    var el = document.querySelector("[data-clock]");
    if (!el) return;

    function tick() {
      var d = new Date();
      var h = d.getHours();
      var hh = String(h).padStart(2, "0");
      var mm = String(d.getMinutes()).padStart(2, "0");
      var phrase = "频道还亮着";
      if (h >= 5 && h < 11) phrase = "早班也营业";
      else if (h >= 11 && h < 18) phrase = "白天放点轻的";
      else if (h >= 18 && h < 23) phrase = "夜场刚刚开始";
      el.innerHTML = "现在是 " + hh + ":" + mm + ' <span class="clock-sep">·</span> ' + phrase;
    }
    tick();
    window.setInterval(tick, 20000);
  }

  /* ---------------- 作品卡片 ---------------- */

  function workCard(work, index) {
    return '' +
      '<article class="work-card reveal" style="transition-delay:' + Math.min(index * 70, 280) + 'ms">' +
        '<a class="work-link" href="' + url("works.html") + '" data-work-id="' + esc(work.id) + '" aria-label="查看作品：' + esc(work.title) + '">' +
          '<span class="work-media">' +
            '<img src="' + url(work.cover) + '" alt="' + esc(work.title) + '" loading="lazy" width="1200" height="900">' +
          "</span>" +
          '<span class="work-tags"><span>' + esc(work.category) + "</span><span>" + esc(work.year) + "</span></span>" +
          '<span class="work-caption">' +
            '<span class="work-kicker">' + String(index + 1).padStart(2, "0") + " / " + esc(work.category) + "</span>" +
            "<h3>" + esc(work.title) + "</h3>" +
            '<span class="work-desc">' + esc(work.desc) + "</span>" +
          "</span>" +
          '<span class="work-arrow" aria-hidden="true">↗</span>' +
        "</a>" +
      "</article>";
  }

  function renderFeaturedWorks() {
    var grid = document.querySelector("[data-featured-works]");
    if (!grid) return;
    grid.innerHTML = WORKS.slice(0, 3).map(workCard).join("");
  }

  /* ---------------- 文章行 ---------------- */

  function postRow(post) {
    return '' +
      '<a class="post-row reveal" href="' + url(post.file) + '">' +
        '<span class="post-date">' + esc(post.display) + "</span>" +
        "<span>" +
          '<span class="post-title">' + esc(post.title) + "</span>" +
          '<span class="post-excerpt">' + esc(post.excerpt) + "</span>" +
        "</span>" +
        '<span class="post-tag">' + esc(post.tag) + "</span>" +
        '<span class="post-arrow" aria-hidden="true">↗</span>' +
      "</a>";
  }

  function renderRecentPosts() {
    var list = document.querySelector("[data-recent-posts]");
    if (!list) return;
    list.innerHTML = POSTS.slice(0, 3).map(function (post, i) {
      return postRow(post).replace('class="post-row reveal"', 'class="post-row reveal" style="transition-delay:' + i * 60 + 'ms"');
    }).join("");
  }

  function renderBlogList() {
    var list = document.querySelector("[data-post-list]");
    if (!list) return;

    var groups = {};
    POSTS.forEach(function (post) {
      var year = String(post.date).slice(0, 4);
      if (!groups[year]) groups[year] = [];
      groups[year].push(post);
    });

    list.innerHTML = Object.keys(groups).sort().reverse().map(function (year) {
      return '<div class="post-year"><span>' + year + "</span><em>" + groups[year].length + " 篇</em></div>" +
        groups[year].map(function (post, i) {
          return postRow(post).replace('class="post-row reveal"', 'class="post-row reveal" style="transition-delay:' + Math.min(i * 50, 200) + 'ms"');
        }).join("");
    }).join("");
  }

  /* ---------------- 作品页：筛选 ---------------- */

  function renderWorksPage() {
    var grid = document.querySelector("[data-works-grid]");
    if (!grid) return;

    var filters = document.querySelector("[data-filters]");
    var empty = document.querySelector("[data-empty]");
    var categories = ["全部"];
    WORKS.forEach(function (w) {
      if (categories.indexOf(w.category) === -1) categories.push(w.category);
    });

    if (filters) {
      filters.innerHTML = categories.map(function (cat, i) {
        var count = cat === "全部" ? WORKS.length : WORKS.filter(function (w) { return w.category === cat; }).length;
        return '<button class="filter' + (i === 0 ? " is-active" : "") + '" type="button" data-filter="' + (cat === "全部" ? "all" : esc(cat)) + '" aria-pressed="' + (i === 0) + '">' +
          (cat === "全部" ? "全部" : cat) + "<span>" + String(count).padStart(2, "0") + "</span></button>";
      }).join("");
    }

    grid.innerHTML = WORKS.map(workCard).join("");

    if (filters) {
      filters.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-filter]");
        if (!btn) return;
        var value = btn.dataset.filter;

        filters.querySelectorAll(".filter").forEach(function (b) {
          var on = b === btn;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });

        var visible = 0;
        grid.querySelectorAll(".work-card").forEach(function (card) {
          var id = card.querySelector("[data-work-id]").dataset.workId;
          var work = WORKS.filter(function (w) { return w.id === id; })[0];
          var show = value === "all" || (work && work.category === value);
          card.hidden = !show;
          if (show) {
            visible += 1;
            card.classList.add("is-in");
          }
        });

        if (empty) empty.hidden = visible !== 0;
      });
    }
  }

  /* ---------------- 作品弹窗 ---------------- */

  function setupWorkModal() {
    var modal = document.querySelector("[data-work-modal]");
    if (!modal || typeof modal.showModal !== "function") return;

    var img = modal.querySelector("[data-modal-img]");
    var title = modal.querySelector("[data-modal-title]");
    var desc = modal.querySelector("[data-modal-desc]");
    var cat = modal.querySelector("[data-modal-category]");
    var year = modal.querySelector("[data-modal-year]");
    var tags = modal.querySelector("[data-modal-tags]");
    var link = modal.querySelector("[data-modal-link]");
    var close = modal.querySelector("[data-modal-close]");

    function open(id) {
      var work = WORKS.filter(function (w) { return w.id === id; })[0];
      if (!work) return;

      img.src = url(work.cover);
      img.alt = work.title + " 封面";
      title.textContent = work.title;
      desc.textContent = work.detail || work.desc;
      cat.textContent = work.category;
      year.textContent = work.year;
      tags.textContent = (work.tags || []).join(" · ");

      if (work.href) {
        link.href = url(work.href);
        link.textContent = work.hrefLabel || "去看看";
        link.hidden = false;
      } else {
        link.hidden = true;
      }

      modal.showModal();
      modal.focus();
      document.body.style.overflow = "hidden";
    }

    document.addEventListener("click", function (e) {
      var trigger = e.target.closest("[data-work-id]");
      if (!trigger) return;
      e.preventDefault();
      open(trigger.dataset.workId);
    });

    close.addEventListener("click", function () { modal.close(); });
    modal.addEventListener("click", function (e) {
      if (e.target === modal) modal.close();
    });
    modal.addEventListener("close", function () {
      document.body.style.overflow = "";
    });
  }

  /* ---------------- 出现动画 ---------------- */

  function setupReveal() {
    var items = [].slice.call(document.querySelectorAll(".reveal"));
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- 启动 ---------------- */

  mountChrome();
  setupHeader();
  setupClock();
  renderFeaturedWorks();
  renderRecentPosts();
  renderBlogList();
  renderWorksPage();
  setupWorkModal();
  setupReveal();

  /* 给播放器脚本留一个入口：等它初始化完成后再观察新元素 */
  window.__NUOMIJI_REVEAL__ = setupReveal;
})();
