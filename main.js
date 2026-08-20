/* Portfolio behaviour: filtering, scroll rail, counters, fold reveals,
   media lightbox, and placeholders for media that isn't uploaded yet. */

(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- scroll rail ---- */
  var rail = document.querySelector(".rail__fill");
  if (rail && !reduce) {
    var ticking = false;
    var draw = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var pct = max > 0 ? Math.min(1, doc.scrollTop / max) : 0;
      rail.style.width = (pct * 100).toFixed(2) + "%";
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(draw);
        }
      },
      { passive: true }
    );
    draw();
  }

  /* ---- filter the work index ---- */
  var filterBar = document.querySelector(".filter");
  if (filterBar) {
    var buttons = filterBar.querySelectorAll("button");
    var items = document.querySelectorAll(".work__item");

    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      var want = btn.dataset.filter;

      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });

      items.forEach(function (item) {
        var tracks = (item.dataset.tracks || "").split(" ");
        var show = want === "all" || tracks.indexOf(want) !== -1;

        if (reduce) {
          item.hidden = !show;
          return;
        }

        if (!show) {
          item.classList.add("is-filtering");
          window.setTimeout(function () {
            item.hidden = true;
          }, 220);
        } else {
          item.hidden = false;
          window.requestAnimationFrame(function () {
            item.classList.remove("is-filtering");
          });
        }
      });
    });
  }

  /* ---- count the readout up, like an instrument settling ---- */
  function countUp(el) {
    var target = parseFloat(el.dataset.count);
    if (isNaN(target) || reduce) return;

    var decimals = (el.dataset.count.split(".")[1] || "").length;
    var start = performance.now();
    var duration = 900;

    var step = function (now) {
      var t = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - t, 3);
      el.firstChild.nodeValue = (target * eased).toFixed(decimals);
      if (t < 1) window.requestAnimationFrame(step);
      else el.firstChild.nodeValue = el.dataset.count;
    };

    el.firstChild.nodeValue = decimals ? (0).toFixed(decimals) : "0";
    window.requestAnimationFrame(step);
  }

  /* ---- reveal on scroll ---- */
  var revealables = document.querySelectorAll(".reveal");

  var activate = function (el) {
    el.classList.add("is-in");
    el.querySelectorAll("[data-count]").forEach(countUp);
  };

  if (reduce || !("IntersectionObserver" in window)) {
    revealables.forEach(activate);
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            activate(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealables.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ---- media: placeholder when a file isn't there, lightbox when it is ---- */
  var lightbox = document.getElementById("lightbox");
  var stageImg = lightbox && lightbox.querySelector("img");
  var stageCap = lightbox && lightbox.querySelector("figcaption");
  var lastFocus = null;

  function openLightbox(src, caption) {
    if (!lightbox) return;
    stageImg.src = src;
    stageImg.alt = caption || "";
    stageCap.textContent = caption || "";
    lastFocus = document.activeElement;
    lightbox.hidden = false;
    window.requestAnimationFrame(function () {
      lightbox.classList.add("is-open");
    });
    document.body.style.overflow = "hidden";
    lightbox.querySelector(".lightbox__close").focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    window.setTimeout(
      function () {
        lightbox.hidden = true;
        stageImg.removeAttribute("src");
        if (lastFocus) lastFocus.focus();
      },
      reduce ? 0 : 220
    );
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.closest(".lightbox__close")) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }

  document.querySelectorAll("[data-media]").forEach(function (frame) {
    var asset = frame.querySelector("img, video");
    var fallback = frame.querySelector("[data-fallback]");
    if (!asset || !fallback) return;

    var fail = function () {
      asset.remove();
      fallback.hidden = false;
      frame.style.cursor = "default";
    };

    if (asset.tagName === "IMG") {
      if (asset.complete && asset.naturalWidth === 0) fail();
      else asset.addEventListener("error", fail);

      frame.addEventListener("click", function () {
        var cap = frame.parentElement.querySelector("figcaption");
        openLightbox(asset.currentSrc || asset.src, cap ? cap.textContent : "");
      });
      frame.setAttribute("tabindex", "0");
      frame.setAttribute("role", "button");
      frame.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          frame.click();
        }
      });
    } else {
      var source = asset.querySelector("source");
      if (source) {
        source.addEventListener("error", function () {
          if (asset.readyState === 0) fail();
        });
      }
    }
  });
  /* ---- media frames lean toward the cursor ---- */
  if (!reduce && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".media .frame").forEach(function (frame) {
      frame.addEventListener("mousemove", function (e) {
        var r = frame.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        frame.style.transform =
          "perspective(900px) rotateX(" + (-y * 4).toFixed(2) + "deg) rotateY(" +
          (x * 5).toFixed(2) + "deg) translateY(-3px)";
      });
      frame.addEventListener("mouseleave", function () {
        frame.style.transform = "";
      });
    });
  }

  /* ---- the crease breathes as you scroll past it ---- */
  if (!reduce && "IntersectionObserver" in window) {
    var creases = document.querySelectorAll(".crease");
    var co = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          en.target.classList.toggle("is-live", en.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );
    creases.forEach(function (c) {
      co.observe(c);
    });
  }
})();
