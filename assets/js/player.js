/* =========================================================
   两个播放器：首页的小电台 & 音乐页的完整播放器
   音频文件在 assets/audio/，曲目信息在 data.js
   ========================================================= */

(function () {
  "use strict";

  var ROOT = document.body.dataset.root || "";
  var S = window.SITE || {};
  var TRACKS = window.TRACKS || [];

  var ICON_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5.4v13.2L19 12z"/></svg>';
  var ICON_PAUSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>';
  var ICON_PREV = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 5h2v14H6zM19 5.6v12.8L9.6 12z"/></svg>';
  var ICON_NEXT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16 5h2v14h-2zM5 5.6v12.8L14.4 12z"/></svg>';

  function url(path) {
    if (!path) return "";
    if (/^(https?:|mailto:|#)/.test(path)) return path;
    return ROOT + path;
  }

  function fmt(seconds) {
    if (!isFinite(seconds) || seconds < 0) return "00:00";
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  }

  function makeBars(count, min, max) {
    var html = "";
    for (var i = 0; i < count; i += 1) {
      var h = min + Math.abs(Math.sin(i * 0.73) * Math.cos(i * 0.21)) * (max - min);
      html += '<span style="--i:' + i + ";height:" + h.toFixed(0) + 'px"></span>';
    }
    return html;
  }

  /* =======================================================
     首页：一台小电台
     ======================================================= */

  function initHomePlayer() {
    var root = document.querySelector("[data-home-player]");
    if (!root || !TRACKS.length) return;

    var audio = root.querySelector("[data-hp-audio]");
    var cover = root.querySelector("[data-hp-cover]");
    var title = root.querySelector("[data-hp-title]");
    var note = root.querySelector("[data-hp-note]");
    var episode = root.querySelector("[data-hp-episode]");
    var list = root.querySelector("[data-hp-list]");
    var wave = root.querySelector("[data-hp-wave]");
    var fill = root.querySelector("[data-hp-fill]");
    var curEl = root.querySelector("[data-hp-cur]");
    var durEl = root.querySelector("[data-hp-dur]");
    var seek = root.querySelector("[data-hp-seek]");
    var toggleBtn = root.querySelector("[data-hp-toggle]");
    var index = 0;

    if (wave) wave.innerHTML = makeBars(58, 6, 38);

    if (list) {
      list.innerHTML = TRACKS.map(function (t, i) {
        return "<li><button type=\"button\" data-hp-track=\"" + i + "\" class=\"" + (i === 0 ? "is-active" : "") + "\">" +
          '<span class="idx">' + t.no + "</span>" +
          "<span>" + t.title + "</span>" +
          '<span class="dur">' + t.duration + "</span>" +
          "</button></li>";
      }).join("");
    }

    function markActive() {
      if (!list) return;
      list.querySelectorAll("button").forEach(function (b, i) {
        b.classList.toggle("is-active", i === index);
        b.setAttribute("aria-current", i === index ? "true" : "false");
      });
    }

    function paint() {
      var t = TRACKS[index];
      if (!t) return;
      if (cover) {
        cover.src = url(t.cover);
        cover.alt = t.title + " 封面";
      }
      if (title) title.textContent = t.title;
      if (note) note.textContent = t.note;
      if (episode) episode.textContent = t.episode;
      if (durEl) durEl.textContent = t.duration;
      if (curEl) curEl.textContent = "00:00";
      if (fill) fill.style.width = "0%";
      if (seek) seek.value = 0;
      if (toggleBtn) toggleBtn.setAttribute("aria-label", "播放 " + t.title);
      audio.src = url(t.src);
      markActive();
    }

    function play() {
      var promise = audio.play();
      if (promise && promise.catch) {
        promise.catch(function () {
          console.warn("音频未能播放，请检查文件是否存在。");
        });
      }
    }

    function pause() {
      audio.pause();
    }

    function toggle() {
      if (audio.paused) play();
      else pause();
    }

    function select(i, autoplay) {
      index = (i + TRACKS.length) % TRACKS.length;
      var wasPlaying = !audio.paused;
      paint();
      if (autoplay || wasPlaying) play();
    }

    if (toggleBtn) toggleBtn.addEventListener("click", toggle);

    if (list) {
      list.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-hp-track]");
        if (!btn) return;
        select(Number(btn.dataset.hpTrack), true);
      });
    }

    audio.addEventListener("play", function () {
      root.classList.add("is-playing");
      if (toggleBtn) {
        toggleBtn.innerHTML = ICON_PAUSE;
        toggleBtn.setAttribute("aria-label", "暂停");
      }
    });

    audio.addEventListener("pause", function () {
      root.classList.remove("is-playing");
      if (toggleBtn) {
        toggleBtn.innerHTML = ICON_PLAY;
        toggleBtn.setAttribute("aria-label", "播放");
      }
    });

    function sync() {
      var d = audio.duration;
      if (curEl) curEl.textContent = fmt(audio.currentTime);
      if (!isFinite(d) || d <= 0) return;
      if (durEl) durEl.textContent = fmt(d);
      var pct = (audio.currentTime / d) * 100;
      if (fill) fill.style.width = pct + "%";
      if (seek && document.activeElement !== seek) seek.value = pct * 10;
    }

    audio.addEventListener("timeupdate", sync);
    audio.addEventListener("loadedmetadata", sync);
    audio.addEventListener("ended", function () { select(index + 1, true); });

    if (seek) {
      seek.addEventListener("input", function () {
        var d = audio.duration;
        if (isFinite(d) && d > 0) audio.currentTime = (Number(seek.value) / 1000) * d;
      });
    }

    paint();
  }

  /* =======================================================
     音乐页：完整播放器
     ======================================================= */

  function initFullPlayer() {
    var root = document.querySelector("[data-player]");
    if (!root || !TRACKS.length) return;

    var audio = root.querySelector("[data-p-audio]");
    var cover = root.querySelector("[data-p-cover]");
    var title = root.querySelector("[data-p-title]");
    var en = root.querySelector("[data-p-en]");
    var note = root.querySelector("[data-p-note]");
    var episode = root.querySelector("[data-p-episode]");
    var no = root.querySelector("[data-p-no]");
    var viz = root.querySelector("[data-p-viz]");
    var list = root.querySelector("[data-p-list]");
    var fill = root.querySelector("[data-p-fill]");
    var seek = root.querySelector("[data-p-seek]");
    var curEl = root.querySelector("[data-p-cur]");
    var durEl = root.querySelector("[data-p-dur]");
    var toggleBtn = root.querySelector("[data-p-toggle]");
    var prevBtn = root.querySelector("[data-p-prev]");
    var nextBtn = root.querySelector("[data-p-next]");
    var volume = root.querySelector("[data-p-volume]");
    var status = root.querySelector("[data-p-status]");
    var index = 0;

    if (viz) viz.innerHTML = makeBars(48, 8, 52);
    if (prevBtn) prevBtn.innerHTML = ICON_PREV;
    if (nextBtn) nextBtn.innerHTML = ICON_NEXT;

    if (list) {
      list.innerHTML = TRACKS.map(function (t, i) {
        return "<li><button type=\"button\" data-p-track=\"" + i + "\" class=\"" + (i === 0 ? "is-active" : "") + "\">" +
          '<span class="pl-idx">' + t.no + "</span>" +
          '<span><span class="pl-title">' + t.title + '</span><span class="pl-note">' + t.note + "</span></span>" +
          '<span class="pl-dur">' + t.duration + "</span>" +
          '<span class="pl-eq" aria-hidden="true"><i></i><i></i><i></i></span>' +
          "</button></li>";
      }).join("");
    }

    function markActive() {
      if (!list) return;
      list.querySelectorAll("button").forEach(function (b, i) {
        b.classList.toggle("is-active", i === index);
        b.setAttribute("aria-current", i === index ? "true" : "false");
      });
    }

    function paint() {
      var t = TRACKS[index];
      if (!t) return;

      if (cover) {
        cover.src = url(t.cover);
        cover.alt = t.title + " 封面";
      }
      if (title) title.textContent = t.title;
      if (en) en.textContent = t.en;
      if (note) note.textContent = t.note;
      if (episode) episode.textContent = t.episode;
      if (no) no.textContent = t.no;
      if (durEl) durEl.textContent = t.duration;
      if (curEl) curEl.textContent = "00:00";
      if (fill) fill.style.width = "0%";
      if (seek) seek.value = 0;

      audio.src = url(t.src);
      if (status) status.textContent = "";
      markActive();
      updateMediaSession(t);
    }

    function play() {
      var promise = audio.play();
      if (promise && promise.catch) {
        promise.catch(function () {
          if (status) status.textContent = "浏览器拦住了自动播放，请再点一次播放键。";
        });
      }
    }

    function pause() { audio.pause(); }

    function toggle() {
      if (audio.paused) play();
      else pause();
    }

    function select(i, autoplay) {
      index = (i + TRACKS.length) % TRACKS.length;
      paint();
      if (autoplay) play();
    }

    if (toggleBtn) toggleBtn.addEventListener("click", toggle);
    if (prevBtn) prevBtn.addEventListener("click", function () { select(index - 1, true); });
    if (nextBtn) nextBtn.addEventListener("click", function () { select(index + 1, true); });

    if (list) {
      list.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-p-track]");
        if (!btn) return;
        select(Number(btn.dataset.pTrack), true);
      });
    }

    audio.addEventListener("play", function () {
      root.classList.add("is-playing");
      if (toggleBtn) {
        toggleBtn.innerHTML = ICON_PAUSE;
        toggleBtn.setAttribute("aria-label", "暂停");
      }
    });

    audio.addEventListener("pause", function () {
      root.classList.remove("is-playing");
      if (toggleBtn) {
        toggleBtn.innerHTML = ICON_PLAY;
        toggleBtn.setAttribute("aria-label", "播放");
      }
    });

    function sync() {
      var d = audio.duration;
      if (curEl) curEl.textContent = fmt(audio.currentTime);
      if (!isFinite(d) || d <= 0) return;
      if (durEl) durEl.textContent = fmt(d);
      var pct = (audio.currentTime / d) * 100;
      if (fill) fill.style.width = pct + "%";
      if (seek && document.activeElement !== seek) seek.value = pct * 10;
    }

    audio.addEventListener("timeupdate", sync);
    audio.addEventListener("loadedmetadata", sync);
    audio.addEventListener("ended", function () { select(index + 1, true); });
    audio.addEventListener("error", function () {
      if (status) status.textContent = "音频没有加载成功。检查一下 assets/audio 里的文件名是否正确。";
    });

    if (seek) {
      seek.addEventListener("input", function () {
        var d = audio.duration;
        if (isFinite(d) && d > 0) audio.currentTime = (Number(seek.value) / 1000) * d;
      });
    }

    if (volume) {
      audio.volume = Number(volume.value);
      volume.addEventListener("input", function () {
        audio.volume = Number(volume.value);
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.code !== "Space") return;
      var tag = (document.activeElement && document.activeElement.tagName) || "";
      if (/^(INPUT|TEXTAREA|BUTTON|A|SELECT)$/.test(tag)) return;
      e.preventDefault();
      toggle();
    });

    function updateMediaSession(t) {
      if (!("mediaSession" in navigator) || typeof window.MediaMetadata === "undefined") return;
      try {
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: t.title,
          artist: S.name || "糯米鸡",
          album: "深夜频道",
          artwork: [{ src: url(t.cover), sizes: "1000x1000", type: "image/jpeg" }]
        });
        navigator.mediaSession.setActionHandler("play", play);
        navigator.mediaSession.setActionHandler("pause", pause);
        navigator.mediaSession.setActionHandler("previoustrack", function () { select(index - 1, true); });
        navigator.mediaSession.setActionHandler("nexttrack", function () { select(index + 1, true); });
      } catch (err) {
        /* 某些浏览器不支持全部动作，忽略即可 */
      }
    }

    paint();
  }

  initHomePlayer();
  initFullPlayer();
})();
