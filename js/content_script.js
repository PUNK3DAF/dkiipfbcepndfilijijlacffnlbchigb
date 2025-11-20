(() => {
  var t = {
      165: (t) => {
        t.exports = {
          isMatched: null,
          t: function (t) {
            t.observer.observe(t.target, t.config);
          },
          i: function (t) {
            const e = [],
              n = [],
              r = {};
            let i, o, a, s, p;
            for (; (a = t.shift()); ) {
              (p = n.indexOf(a.target)),
                -1 === p &&
                  ((p = n.push(a.target) - 1),
                  (r[p] = { target: a.target, added: [], removed: [] })),
                (i = r[p]),
                (o = void 0);
              for (let t = 0; (s = a.addedNodes[t]); t++)
                1 === s.nodeType && (i.added.push(s), (o = !0));
              for (let t = 0; (s = a.removedNodes[t]); t++)
                1 === s.nodeType && (i.removed.push(s), (o = !0));
              void 0 !== o &&
                void 0 === i.inList &&
                ((i.inList = !0), e.push(i));
            }
            return e;
          },
          p: function () {
            if (this.isMatched) return;
            let t = document.createElement("div");
            "function" == typeof t.matches
              ? (this.isMatched = function (t, e) {
                  return t.matches(e);
                })
              : "function" == typeof t.matchesSelector &&
                (this.isMatched = function (t, e) {
                  return t.matchesSelector(e);
                }),
              (t = null);
          },
          l: function (t, e, n) {
            const r = this,
              i = t.queries;
            let o,
              a,
              s = !1;
            return (
              ["added", "removed"].forEach(function (t) {
                const p = n[t];
                for (let n = 0; (o = p[n]); n++)
                  for (let n = 0; (a = i[n]); n++) {
                    if (void 0 !== a.is && a.is !== t) continue;
                    const i = e[n][t];
                    !0 === r.isMatched(o, a.css)
                      ? i.push(o)
                      : i.push.apply(i, o.querySelectorAll(a.css)),
                      !1 === s && (s = void 0 !== i[0]);
                  }
              }),
              s
            );
          },
          u: function (t, e) {
            let n;
            for (let r = 0; (n = t[r]); r++)
              if (!0 === this.isMatched(e, n.css)) return !0;
            return !1;
          },
          m: function (t) {
            const e = this,
              n = {
                config: { childList: !0, subtree: !0 },
                target: document.body,
                u: [],
                ...t,
              };
            (n.t = this.t.bind(this, n)), (n.l = this.l.bind(this, n));
            let r = [];
            for (let t = 0; t < n.queries.length; t++)
              r.push({ added: [], removed: [] });
            return (
              (r = JSON.stringify(r)),
              this.p(),
              (n.observer = new MutationObserver(function (t) {
                const i = e.i(t);
                if (0 === i.length) return;
                let o,
                  a = !1;
                const s = JSON.parse(r);
                for (; (o = i.shift()); )
                  !1 === e.u(n.u, o.target) && !0 === n.l(s, o) && (a = !0);
                !0 === a && n.callback(s);
              })),
              (n.start = function () {
                n.t();
                let t = !1,
                  e = JSON.parse(r);
                const i = { added: [n.target], removed: [] };
                n.l(e, i) && (t = !0), !0 === t && n.callback(e);
              }),
              n.start(),
              n
            );
          },
        };
      },
      236: (t) => {
        t.exports = {
          h: function (t, e) {
            e && !Array.isArray(e) && (e = [e]);
            const n = [],
              r = { "{": 0, "[": 0 },
              i = { "}": "{", "]": "[" },
              o = /[{}\]\[":0-9.,-]/,
              a = /[\r\n\s\t]/;
            let s = "";
            for (let e, p = 0; (e = t[p]); p++)
              if ('"' !== e)
                o.test(e)
                  ? ((s += e),
                    "{" === e || "[" === e
                      ? (r["{"] || r["["] || (s = e), r[e]++)
                      : ("}" !== e && "]" !== e) ||
                        (r[i[e]]--, r["{"] || r["["] || n.push(s)))
                  : "t" === e && "true" === t.substr(p, 4)
                  ? ((s += "true"), (p += 3))
                  : "f" === e && "false" === t.substr(p, 5)
                  ? ((s += "false"), (p += 4))
                  : "n" === e && "null" === t.substr(p, 4)
                  ? ((s += "null"), (p += 3))
                  : a.test(e) || ((r["{"] = 0), (r["["] = 0), (s = ""));
              else {
                let e = p;
                for (; -1 !== e && (e === p || "\\" === t[e - 1]); )
                  e = t.indexOf('"', e + 1);
                -1 === e && (e = t.length - 1),
                  (s += t.substr(p, e - p + 1)),
                  (p = e);
              }
            const p = [];
            for (let t, r = 0; (t = n[r]); r++)
              if ("{}" !== t && "[]" !== t)
                try {
                  e
                    ? e.every(function (e) {
                        return e.test(t);
                      }) && p.push(JSON.parse(t))
                    : p.push(JSON.parse(t));
                } catch (t) {}
            return p;
          },
          v: function () {
            return window.top !== window.self;
          },
          _: function (t, e) {
            const n = t.getBoundingClientRect();
            if (e) {
              const t = e.getBoundingClientRect();
              return {
                top: Math.round(n.top - t.top),
                left: Math.round(n.left - t.left),
                width: n.width,
                height: n.height,
              };
            }
            return {
              top: Math.round(n.top + window.pageYOffset),
              left: Math.round(n.left + window.pageXOffset),
              width: n.width,
              height: n.height,
            };
          },
          k: function (t) {
            return { width: t.offsetWidth, height: t.offsetHeight };
          },
          $: () => Date.now().toString(),
          M: (t) =>
            t.filter(
              (t) =>
                !(
                  "stream" === t.type &&
                  t.fileSizeBytes > 0.45 * performance.memory.jsHeapSizeLimit
                )
            ),
        };
      },
      257: (t, e, n) => {
        const r = n(236),
          i = n(994);
        t.exports = {
          F(t, e = null) {
            if (!["main", "sidedock"].includes(t) || (!i.T() && !i.O()))
              return null;
            const n = r.h(document.body.innerHTML).find(function (t) {
              return t && t.request && t.request.files;
            });
            return n && (!e || (e && n.video && n.video.id == e)) ? n : null;
          },
          L(t, e = null) {
            if (!["main", "sidedock"].includes(t) || (!i.T() && !i.O()))
              return null;
            const n = r.h(document.body.innerHTML).find(function (t) {
              return !!t.config_url;
            });
            return n && n.config_url && (!e || (e && n.config_url.includes(e)))
              ? n.config_url
              : null;
          },
          P(t, e = null) {
            if (!["main", "sidedock"].includes(t) || (!i.T() && !i.O()))
              return null;
            let n = null;
            return (
              r.h(document.body.innerHTML).find(function (t) {
                return t &&
                  t.thumbnail &&
                  (t.thumbnail.src_2x || t.thumbnail.src) &&
                  (!e || (t.clip && t.clip.id == e))
                  ? ((n = t.thumbnail.src_2x || t.thumbnail.src), !0)
                  : t &&
                    t.poster &&
                    t.poster.url &&
                    (!e || (t.config_url && t.config_url.includes(e)))
                  ? ((n = t.poster.url), !0)
                  : t &&
                    t.thumbnailUrl &&
                    (!e || (t.embedUrl && t.embedUrl.includes(e)))
                  ? ((n = t.thumbnailUrl), !0)
                  : t &&
                    t.video &&
                    t.video.thumbs &&
                    t.video.thumbs.base &&
                    (!e || t.video.id == e)
                  ? ((n = t.video.thumbs.base), !0)
                  : void 0;
              }),
              n
            );
          },
          I(t, e = null) {
            if (!["main", "sidedock"].includes(t) || (!i.T() && !i.O()))
              return null;
            const n = function (t) {
              return t && t.clip && t.clip.title && (!e || t.clip.id == e)
                ? ((o = t.clip.title), !0)
                : t && t.name && (!e || (t.embedUrl && t.embedUrl.includes(e)))
                ? ((o = t.name), !0)
                : t && t.video && t.video.title && (!e || t.video.id == e)
                ? ((o = t.video.title), !0)
                : void 0;
            };
            let o = null;
            return (
              r.h(document.body.innerHTML).find(function (t) {
                return Array.isArray(t) ? t.find(n) : n(t);
              }),
              o
            );
          },
        };
      },
      565: (t, e, n) => {
        const r = n(994),
          i = n(257);
        t.exports = {
          D(t, e, n) {
            return ["main", "sidedock"].includes(e)
              ? this.C(t) || (n && i.L(e, n))
              : null;
          },
          C(t) {
            let e = r.O(t);
            return e && e.getAttribute("data-config-url");
          },
        };
      },
      994: (t) => {
        t.exports = {
          T(t = null) {
            if (t && t.closest(".vp-sidedock, .ul.sidedock"))
              return t.closest(".player_container");
            if (!t || t.closest(".clip_info-subline--watch")) {
              let t = document.querySelectorAll(".player_container");
              if (1 === t.length) return t[0];
            }
            return null;
          },
          O(t = null) {
            if (t && t.closest(".vp-sidedock, .ul.sidedock"))
              return t.closest(".player");
            if (!t || t.closest(".clip_info-subline--watch")) {
              let t = document.querySelectorAll(".player");
              if (1 === t.length) return t[0];
            }
            return null;
          },
          B: (t) =>
            t.closest(".vp-sidedock, ul.sidedock")
              ? t.closest('[id^="clip_"]')
              : null,
          H: (t) =>
            t.closest("a.iris_link-box[href]") ||
            t.parentNode.querySelector(".contextclip-img-thumb[href]") ||
            (t.closest('li[id^="clip_"] a[href]') &&
              t.closest('li[id^="clip_"] a')),
        };
      },
      207: (t, e, n) => {
        const r = n(994),
          i = n(257);
        t.exports = {
          D(t, e, n) {
            return ["main", "sidedock"].includes(e)
              ? this.S(t) || this.C(t) || this.A(t) || i.P(e, n)
              : this.N(t);
          },
          S(t) {
            const e = r.T(t),
              n = e && e.querySelector("#vp-preview[data-thumb]");
            return n && n.dataset.thumb;
          },
          C(t) {
            const e = r.O(t),
              n = e && e.querySelector("#vp-preview[data-thumb]");
            return n && n.dataset.thumb;
          },
          A(t) {
            if (t.classList.contains("vime_sidedock-style-3")) {
              let e = t.parentElement.querySelector("img");
              return e && e.getAttribute("src");
            }
          },
          N(t) {
            const e = r.H(t),
              n = e && e.querySelector(".iris_thumbnail img, img");
            let i = n && (n.getAttribute("srcset") || n.getAttribute("srcset"));
            return i && i.replace(/\s.*/, "");
          },
        };
      },
      86: (t, e, n) => {
        const r = n(257),
          i = n(994);
        t.exports = {
          D(t, e, n) {
            return ["main", "sidedock"].includes(e)
              ? this.S(t) || this.C(t) || this.A(t) || r.I(e, n) || this.j()
              : this.N(t);
          },
          S(t) {
            const e = i.T(t),
              n = e && e.querySelector('a[data-track-click="video-title"]');
            return n && n.innerText;
          },
          C(t) {
            const e = i.O(t),
              n = e && e.querySelector('a[data-track-click="video-title"]');
            return n && n.innerText;
          },
          A(t) {
            if (t.classList.contains("vime_sidedock-style-3")) {
              let e = t.closest("article"),
                n = e && e.querySelector("a");
              return n && n.innerText.trim();
            }
          },
          j() {
            if (i.T()) {
              const t = document.querySelector("title");
              let e = t && t.innerText;
              return (
                e &&
                e
                  .trim()
                  .replace(/^watch/i, "")
                  .trim()
                  .replace("/|.*/", "")
                  .trim()
                  .replace(/online$/i, "")
                  .trim()
                  .replace(/on\svimeo/i, "")
                  .trim()
              );
            }
            return null;
          },
          N(t) {
            const e = i.H(t);
            let n = e && e.querySelector(".iris_video-vital__title");
            if (n) return n.innerText.trim();
            if (e.classList.contains("contextclip-img-thumb")) {
              const t = e.closest("article"),
                n = t && t.querySelector(".iris_link");
              return n && n.getAttribute("title");
            }
            return e.href && e.getAttribute("title")
              ? e.getAttribute("title").trim()
              : null;
          },
        };
      },
      617: function (t, e, n) {
        t.exports = (function () {
          for (
            var t =
                '.tippy-iOS{cursor:pointer!important}.tippy-notransition{transition:none!important}.tippy-popper{-webkit-perspective:700px;perspective:700px;z-index:9999;outline:0;transition-timing-function:cubic-bezier(.165,.84,.44,1);pointer-events:none;line-height:1.4}.tippy-popper[x-placement^=top] .tippy-backdrop{border-radius:40% 40% 0 0}.tippy-popper[x-placement^=top] .tippy-roundarrow{bottom:-8px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(180deg);transform:rotate(180deg)}.tippy-popper[x-placement^=top] .tippy-arrow{border-top:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;bottom:-7px;margin:0 6px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-backdrop{-webkit-transform-origin:0 25%;transform-origin:0 25%}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-55%);transform:scale(1) translate(-50%,-55%)}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%,-45%);transform:scale(.2) translate(-50%,-45%);opacity:0}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}.tippy-popper[x-placement^=top] [data-animation=perspective]{-webkit-transform-origin:bottom;transform-origin:bottom}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=visible]{-webkit-transform:translateY(-10px) rotateX(0);transform:translateY(-10px) rotateX(0)}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) rotateX(60deg);transform:translateY(0) rotateX(60deg)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=visible]{-webkit-transform:translateY(-10px) scale(1);transform:translateY(-10px) scale(1)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) scale(.5);transform:translateY(0) scale(.5)}.tippy-popper[x-placement^=bottom] .tippy-backdrop{border-radius:0 0 30% 30%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow{top:-8px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(0);transform:rotate(0)}.tippy-popper[x-placement^=bottom] .tippy-arrow{border-bottom:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;top:-7px;margin:0 6px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-backdrop{-webkit-transform-origin:0 -50%;transform-origin:0 -50%}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-45%);transform:scale(1) translate(-50%,-45%)}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%);transform:scale(.2) translate(-50%);opacity:0}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(20px);transform:translateY(20px)}.tippy-popper[x-placement^=bottom] [data-animation=perspective]{-webkit-transform-origin:top;transform-origin:top}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=visible]{-webkit-transform:translateY(10px) rotateX(0);transform:translateY(10px) rotateX(0)}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) rotateX(-60deg);transform:translateY(0) rotateX(-60deg)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=visible]{-webkit-transform:translateY(10px) scale(1);transform:translateY(10px) scale(1)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) scale(.5);transform:translateY(0) scale(.5)}.tippy-popper[x-placement^=left] .tippy-backdrop{border-radius:50% 0 0 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow{right:-16px;-webkit-transform-origin:33.33333333% 50%;transform-origin:33.33333333% 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(90deg);transform:rotate(90deg)}.tippy-popper[x-placement^=left] .tippy-arrow{border-left:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;right:-7px;margin:3px 0;-webkit-transform-origin:0 50%;transform-origin:0 50%}.tippy-popper[x-placement^=left] .tippy-backdrop{-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%)}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-75%,-50%);transform:scale(.2) translate(-75%,-50%);opacity:0}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(-20px);transform:translateX(-20px)}.tippy-popper[x-placement^=left] [data-animation=perspective]{-webkit-transform-origin:right;transform-origin:right}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=visible]{-webkit-transform:translateX(-10px) rotateY(0);transform:translateX(-10px) rotateY(0)}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) rotateY(-60deg);transform:translateX(0) rotateY(-60deg)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=visible]{-webkit-transform:translateX(-10px) scale(1);transform:translateX(-10px) scale(1)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) scale(.5);transform:translateX(0) scale(.5)}.tippy-popper[x-placement^=right] .tippy-backdrop{border-radius:0 50% 50% 0}.tippy-popper[x-placement^=right] .tippy-roundarrow{left:-16px;-webkit-transform-origin:66.66666666% 50%;transform-origin:66.66666666% 50%}.tippy-popper[x-placement^=right] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.tippy-popper[x-placement^=right] .tippy-arrow{border-right:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;left:-7px;margin:3px 0;-webkit-transform-origin:100% 50%;transform-origin:100% 50%}.tippy-popper[x-placement^=right] .tippy-backdrop{-webkit-transform-origin:-50% 0;transform-origin:-50% 0}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%)}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-25%,-50%);transform:scale(.2) translate(-25%,-50%);opacity:0}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(20px);transform:translateX(20px)}.tippy-popper[x-placement^=right] [data-animation=perspective]{-webkit-transform-origin:left;transform-origin:left}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=visible]{-webkit-transform:translateX(10px) rotateY(0);transform:translateX(10px) rotateY(0)}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) rotateY(60deg);transform:translateX(0) rotateY(60deg)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=visible]{-webkit-transform:translateX(10px) scale(1);transform:translateX(10px) scale(1)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) scale(.5);transform:translateX(0) scale(.5)}.tippy-tooltip{position:relative;color:#fff;border-radius:4px;font-size:.9rem;padding:.3rem .6rem;max-width:350px;text-align:center;will-change:transform;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;background-color:#333}.tippy-tooltip[data-size=small]{padding:.2rem .4rem;font-size:.75rem}.tippy-tooltip[data-size=large]{padding:.4rem .8rem;font-size:1rem}.tippy-tooltip[data-animatefill]{overflow:hidden;background-color:transparent}.tippy-tooltip[data-interactive],.tippy-tooltip[data-interactive] path{pointer-events:auto}.tippy-tooltip[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.53,2,.36,.85)}.tippy-tooltip[data-inertia][data-state=hidden]{transition-timing-function:ease}.tippy-arrow,.tippy-roundarrow{position:absolute;width:0;height:0}.tippy-roundarrow{width:24px;height:8px;fill:#333;pointer-events:none}.tippy-backdrop{position:absolute;will-change:transform;background-color:#333;border-radius:50%;width:calc(110% + 2rem);left:50%;top:50%;z-index:-1;transition:all cubic-bezier(.46,.1,.52,.98);-webkit-backface-visibility:hidden;backface-visibility:hidden}.tippy-backdrop:after{content:"";float:left;padding-top:100%}.tippy-backdrop+.tippy-content{transition-property:opacity}.tippy-backdrop+.tippy-content[data-state=visible]{opacity:1}.tippy-backdrop+.tippy-content[data-state=hidden]{opacity:0}@media (max-width:360px){.tippy-popper{max-width:96%;max-width:calc(100% - 20px)}}',
              e = "3.2.0",
              r =
                Object.assign ||
                function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) &&
                        (t[r] = n[r]);
                  }
                  return t;
                },
              i = {
                a11y: !0,
                allowHTML: !0,
                animateFill: !0,
                animation: "shift-away",
                appendTo: function () {
                  return document.body;
                },
                arrow: !1,
                arrowTransform: "",
                arrowType: "sharp",
                content: "",
                delay: [0, 20],
                distance: 10,
                duration: [325, 275],
                flip: !0,
                flipBehavior: "flip",
                followCursor: !1,
                hideOnClick: !0,
                inertia: !1,
                interactive: !1,
                interactiveBorder: 2,
                interactiveDebounce: 0,
                lazy: !0,
                livePlacement: !0,
                multiple: !1,
                offset: 0,
                onHidden: function () {},
                onHide: function () {},
                onMount: function () {},
                onShow: function () {},
                onShown: function () {},
                performance: !1,
                placement: "top",
                popperOptions: {},
                shouldPopperHideOnBlur: function () {
                  return !0;
                },
                showOnInit: !1,
                size: "regular",
                sticky: !1,
                target: "",
                theme: "dark",
                touch: !0,
                touchHold: !1,
                trigger: "mouseenter focus",
                updateDuration: 200,
                wait: null,
                zIndex: 9999,
              },
              o = function (t) {
                i = r({}, i, t);
              },
              a = [
                "arrowType",
                "distance",
                "flip",
                "flipBehavior",
                "offset",
                "placement",
                "popperOptions",
              ],
              s = "undefined" != typeof window,
              p = s ? navigator : {},
              c = s ? window : {},
              l = ("MutationObserver" in c),
              u = /MSIE |Trident\//.test(p.userAgent),
              d = /iPhone|iPad|iPod/.test(p.platform) && !c.MSStream,
              f = ("ontouchstart" in c),
              m =
                "undefined" != typeof window && "undefined" != typeof document,
              h = ["Edge", "Trident", "Firefox"],
              v = 0,
              b = 0;
            b < h.length;
            b += 1
          )
            if (m && navigator.userAgent.indexOf(h[b]) >= 0) {
              v = 1;
              break;
            }
          function w(t) {
            var e = !1;
            return function () {
              e ||
                ((e = !0),
                window.Promise.resolve().then(function () {
                  (e = !1), t();
                }));
            };
          }
          function g(t) {
            var e = !1;
            return function () {
              e ||
                ((e = !0),
                setTimeout(function () {
                  (e = !1), t();
                }, v));
            };
          }
          var y = m && window.Promise ? w : g;
          function _(t) {
            return t && "[object Function]" === {}.toString.call(t);
          }
          function x(t, e) {
            if (1 !== t.nodeType) return [];
            var n = t.ownerDocument.defaultView.getComputedStyle(t, null);
            return e ? n[e] : n;
          }
          function k(t) {
            return "HTML" === t.nodeName ? t : t.parentNode || t.host;
          }
          function $(t) {
            if (!t) return document.body;
            switch (t.nodeName) {
              case "HTML":
              case "BODY":
                return t.ownerDocument.body;
              case "#document":
                return t.body;
            }
            var e = x(t),
              n = e.overflow,
              r = e.overflowX,
              i = e.overflowY;
            return /(auto|scroll|overlay)/.test(n + i + r) ? t : $(k(t));
          }
          var M =
              m && !(!window.MSInputMethodContext || !document.documentMode),
            F = m && /MSIE 10/.test(navigator.userAgent);
          function T(t) {
            return 11 === t ? M : 10 === t ? F : M || F;
          }
          function O(t) {
            if (!t) return document.documentElement;
            for (
              var e = T(10) ? document.body : null, n = t.offsetParent || null;
              n === e && t.nextElementSibling;

            )
              n = (t = t.nextElementSibling).offsetParent;
            var r = n && n.nodeName;
            return r && "BODY" !== r && "HTML" !== r
              ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) &&
                "static" === x(n, "position")
                ? O(n)
                : n
              : t
              ? t.ownerDocument.documentElement
              : document.documentElement;
          }
          function Y(t) {
            var e = t.nodeName;
            return (
              "BODY" !== e && ("HTML" === e || O(t.firstElementChild) === t)
            );
          }
          function X(t) {
            return null !== t.parentNode ? X(t.parentNode) : t;
          }
          function L(t, e) {
            if (!(t && t.nodeType && e && e.nodeType))
              return document.documentElement;
            var n =
                t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
              r = n ? t : e,
              i = n ? e : t,
              o = document.createRange();
            o.setStart(r, 0), o.setEnd(i, 0);
            var a = o.commonAncestorContainer;
            if ((t !== a && e !== a) || r.contains(i)) return Y(a) ? a : O(a);
            var s = X(t);
            return s.host ? L(s.host, e) : L(t, X(e).host);
          }
          function P(t) {
            var e =
                "top" ===
                (arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "top")
                  ? "scrollTop"
                  : "scrollLeft",
              n = t.nodeName;
            if ("BODY" === n || "HTML" === n) {
              var r = t.ownerDocument.documentElement;
              return (t.ownerDocument.scrollingElement || r)[e];
            }
            return t[e];
          }
          function I(t, e) {
            var n =
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
              r = P(e, "top"),
              i = P(e, "left"),
              o = n ? -1 : 1;
            return (
              (t.top += r * o),
              (t.bottom += r * o),
              (t.left += i * o),
              (t.right += i * o),
              t
            );
          }
          function D(t, e) {
            var n = "x" === e ? "Left" : "Top",
              r = "Left" === n ? "Right" : "Bottom";
            return (
              parseFloat(t["border" + n + "Width"], 10) +
              parseFloat(t["border" + r + "Width"], 10)
            );
          }
          function C(t, e, n, r) {
            return Math.max(
              e["offset" + t],
              e["scroll" + t],
              n["client" + t],
              n["offset" + t],
              n["scroll" + t],
              T(10)
                ? parseInt(n["offset" + t]) +
                    parseInt(r["margin" + ("Height" === t ? "Top" : "Left")]) +
                    parseInt(
                      r["margin" + ("Height" === t ? "Bottom" : "Right")]
                    )
                : 0
            );
          }
          function B(t) {
            var e = t.body,
              n = t.documentElement,
              r = T(10) && getComputedStyle(n);
            return { height: C("Height", e, n, r), width: C("Width", e, n, r) };
          }
          var H = function (t, e) {
              if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function");
            },
            E = (function () {
              function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                  var r = e[n];
                  (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    "value" in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r);
                }
              }
              return function (e, n, r) {
                return n && t(e.prototype, n), r && t(e, r), e;
              };
            })(),
            z = function (t, e, n) {
              return (
                e in t
                  ? Object.defineProperty(t, e, {
                      value: n,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0,
                    })
                  : (t[e] = n),
                t
              );
            },
            S =
              Object.assign ||
              function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var n = arguments[e];
                  for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
                }
                return t;
              };
          function A(t) {
            return S({}, t, {
              right: t.left + t.width,
              bottom: t.top + t.height,
            });
          }
          function N(t) {
            var e = {};
            try {
              if (T(10)) {
                e = t.getBoundingClientRect();
                var n = P(t, "top"),
                  r = P(t, "left");
                (e.top += n), (e.left += r), (e.bottom += n), (e.right += r);
              } else e = t.getBoundingClientRect();
            } catch (t) {}
            var i = {
                left: e.left,
                top: e.top,
                width: e.right - e.left,
                height: e.bottom - e.top,
              },
              o = "HTML" === t.nodeName ? B(t.ownerDocument) : {},
              a = o.width || t.clientWidth || i.right - i.left,
              s = o.height || t.clientHeight || i.bottom - i.top,
              p = t.offsetWidth - a,
              c = t.offsetHeight - s;
            if (p || c) {
              var l = x(t);
              (p -= D(l, "x")),
                (c -= D(l, "y")),
                (i.width -= p),
                (i.height -= c);
            }
            return A(i);
          }
          function j(t, e) {
            var n =
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
              r = T(10),
              i = "HTML" === e.nodeName,
              o = N(t),
              a = N(e),
              s = $(t),
              p = x(e),
              c = parseFloat(p.borderTopWidth, 10),
              l = parseFloat(p.borderLeftWidth, 10);
            n &&
              i &&
              ((a.top = Math.max(a.top, 0)), (a.left = Math.max(a.left, 0)));
            var u = A({
              top: o.top - a.top - c,
              left: o.left - a.left - l,
              width: o.width,
              height: o.height,
            });
            if (((u.marginTop = 0), (u.marginLeft = 0), !r && i)) {
              var d = parseFloat(p.marginTop, 10),
                f = parseFloat(p.marginLeft, 10);
              (u.top -= c - d),
                (u.bottom -= c - d),
                (u.left -= l - f),
                (u.right -= l - f),
                (u.marginTop = d),
                (u.marginLeft = f);
            }
            return (
              (r && !n ? e.contains(s) : e === s && "BODY" !== s.nodeName) &&
                (u = I(u, e)),
              u
            );
          }
          function V(t) {
            var e =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              n = t.ownerDocument.documentElement,
              r = j(t, n),
              i = Math.max(n.clientWidth, window.innerWidth || 0),
              o = Math.max(n.clientHeight, window.innerHeight || 0),
              a = e ? 0 : P(n),
              s = e ? 0 : P(n, "left");
            return A({
              top: a - r.top + r.marginTop,
              left: s - r.left + r.marginLeft,
              width: i,
              height: o,
            });
          }
          function R(t) {
            var e = t.nodeName;
            return (
              "BODY" !== e &&
              "HTML" !== e &&
              ("fixed" === x(t, "position") || R(k(t)))
            );
          }
          function W(t) {
            if (!t || !t.parentElement || T()) return document.documentElement;
            for (var e = t.parentElement; e && "none" === x(e, "transform"); )
              e = e.parentElement;
            return e || document.documentElement;
          }
          function U(t, e, n, r) {
            var i =
                arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
              o = { top: 0, left: 0 },
              a = i ? W(t) : L(t, e);
            if ("viewport" === r) o = V(a, i);
            else {
              var s = void 0;
              "scrollParent" === r
                ? "BODY" === (s = $(k(e))).nodeName &&
                  (s = t.ownerDocument.documentElement)
                : (s = "window" === r ? t.ownerDocument.documentElement : r);
              var p = j(s, a, i);
              if ("HTML" !== s.nodeName || R(a)) o = p;
              else {
                var c = B(t.ownerDocument),
                  l = c.height,
                  u = c.width;
                (o.top += p.top - p.marginTop),
                  (o.bottom = l + p.top),
                  (o.left += p.left - p.marginLeft),
                  (o.right = u + p.left);
              }
            }
            var d = "number" == typeof (n = n || 0);
            return (
              (o.left += d ? n : n.left || 0),
              (o.top += d ? n : n.top || 0),
              (o.right -= d ? n : n.right || 0),
              (o.bottom -= d ? n : n.bottom || 0),
              o
            );
          }
          function J(t) {
            return t.width * t.height;
          }
          function q(t, e, n, r, i) {
            var o =
              arguments.length > 5 && void 0 !== arguments[5]
                ? arguments[5]
                : 0;
            if (-1 === t.indexOf("auto")) return t;
            var a = U(n, r, o, i),
              s = {
                top: { width: a.width, height: e.top - a.top },
                right: { width: a.right - e.right, height: a.height },
                bottom: { width: a.width, height: a.bottom - e.bottom },
                left: { width: e.left - a.left, height: a.height },
              },
              p = Object.keys(s)
                .map(function (t) {
                  return S({ key: t }, s[t], { area: J(s[t]) });
                })
                .sort(function (t, e) {
                  return e.area - t.area;
                }),
              c = p.filter(function (t) {
                var e = t.width,
                  r = t.height;
                return e >= n.clientWidth && r >= n.clientHeight;
              }),
              l = c.length > 0 ? c[0].key : p[0].key,
              u = t.split("-")[1];
            return l + (u ? "-" + u : "");
          }
          function K(t, e, n) {
            var r =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : null;
            return j(n, r ? W(e) : L(e, n), r);
          }
          function Z(t) {
            var e = t.ownerDocument.defaultView.getComputedStyle(t),
              n = parseFloat(e.marginTop) + parseFloat(e.marginBottom),
              r = parseFloat(e.marginLeft) + parseFloat(e.marginRight);
            return { width: t.offsetWidth + r, height: t.offsetHeight + n };
          }
          function G(t) {
            var e = {
              left: "right",
              right: "left",
              bottom: "top",
              top: "bottom",
            };
            return t.replace(/left|right|bottom|top/g, function (t) {
              return e[t];
            });
          }
          function Q(t, e, n) {
            n = n.split("-")[0];
            var r = Z(t),
              i = { width: r.width, height: r.height },
              o = -1 !== ["right", "left"].indexOf(n),
              a = o ? "top" : "left",
              s = o ? "left" : "top",
              p = o ? "height" : "width",
              c = o ? "width" : "height";
            return (
              (i[a] = e[a] + e[p] / 2 - r[p] / 2),
              (i[s] = n === s ? e[s] - r[c] : e[G(s)]),
              i
            );
          }
          function tt(t, e) {
            return Array.prototype.find ? t.find(e) : t.filter(e)[0];
          }
          function et(t, e, n) {
            if (Array.prototype.findIndex)
              return t.findIndex(function (t) {
                return t[e] === n;
              });
            var r = tt(t, function (t) {
              return t[e] === n;
            });
            return t.indexOf(r);
          }
          function nt(t, e, n) {
            return (
              (void 0 === n ? t : t.slice(0, et(t, "name", n))).forEach(
                function (t) {
                  t.function;
                  var n = t.function || t.fn;
                  t.enabled &&
                    _(n) &&
                    ((e.offsets.popper = A(e.offsets.popper)),
                    (e.offsets.reference = A(e.offsets.reference)),
                    (e = n(e, t)));
                }
              ),
              e
            );
          }
          function rt() {
            if (!this.state.isDestroyed) {
              var t = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {},
              };
              (t.offsets.reference = K(
                this.state,
                this.popper,
                this.reference,
                this.options.positionFixed
              )),
                (t.placement = q(
                  this.options.placement,
                  t.offsets.reference,
                  this.popper,
                  this.reference,
                  this.options.modifiers.flip.boundariesElement,
                  this.options.modifiers.flip.padding
                )),
                (t.originalPlacement = t.placement),
                (t.positionFixed = this.options.positionFixed),
                (t.offsets.popper = Q(
                  this.popper,
                  t.offsets.reference,
                  t.placement
                )),
                (t.offsets.popper.position = this.options.positionFixed
                  ? "fixed"
                  : "absolute"),
                (t = nt(this.modifiers, t)),
                this.state.isCreated
                  ? this.options.onUpdate(t)
                  : ((this.state.isCreated = !0), this.options.onCreate(t));
            }
          }
          function it(t, e) {
            return t.some(function (t) {
              var n = t.name;
              return t.enabled && n === e;
            });
          }
          function ot(t) {
            for (
              var e = [!1, "ms", "Webkit", "Moz", "O"],
                n = t.charAt(0).toUpperCase() + t.slice(1),
                r = 0;
              r < e.length;
              r++
            ) {
              var i = e[r],
                o = i ? "" + i + n : t;
              if (void 0 !== document.body.style[o]) return o;
            }
            return null;
          }
          function at() {
            return (
              (this.state.isDestroyed = !0),
              it(this.modifiers, "applyStyle") &&
                (this.popper.removeAttribute("x-placement"),
                (this.popper.style.position = ""),
                (this.popper.style.top = ""),
                (this.popper.style.left = ""),
                (this.popper.style.right = ""),
                (this.popper.style.bottom = ""),
                (this.popper.style.willChange = ""),
                (this.popper.style[ot("transform")] = "")),
              this.disableEventListeners(),
              this.options.removeOnDestroy &&
                this.popper.parentNode.removeChild(this.popper),
              this
            );
          }
          function st(t) {
            var e = t.ownerDocument;
            return e ? e.defaultView : window;
          }
          function pt(t, e, n, r) {
            var i = "BODY" === t.nodeName,
              o = i ? t.ownerDocument.defaultView : t;
            o.addEventListener(e, n, { passive: !0 }),
              i || pt($(o.parentNode), e, n, r),
              r.push(o);
          }
          function ct(t, e, n, r) {
            (n.updateBound = r),
              st(t).addEventListener("resize", n.updateBound, { passive: !0 });
            var i = $(t);
            return (
              pt(i, "scroll", n.updateBound, n.scrollParents),
              (n.scrollElement = i),
              (n.eventsEnabled = !0),
              n
            );
          }
          function lt() {
            this.state.eventsEnabled ||
              (this.state = ct(
                this.reference,
                this.options,
                this.state,
                this.scheduleUpdate
              ));
          }
          function ut(t, e) {
            return (
              st(t).removeEventListener("resize", e.updateBound),
              e.scrollParents.forEach(function (t) {
                t.removeEventListener("scroll", e.updateBound);
              }),
              (e.updateBound = null),
              (e.scrollParents = []),
              (e.scrollElement = null),
              (e.eventsEnabled = !1),
              e
            );
          }
          function dt() {
            this.state.eventsEnabled &&
              (cancelAnimationFrame(this.scheduleUpdate),
              (this.state = ut(this.reference, this.state)));
          }
          function ft(t) {
            return "" !== t && !isNaN(parseFloat(t)) && isFinite(t);
          }
          function mt(t, e) {
            Object.keys(e).forEach(function (n) {
              var r = "";
              -1 !==
                ["width", "height", "top", "right", "bottom", "left"].indexOf(
                  n
                ) &&
                ft(e[n]) &&
                (r = "px"),
                (t.style[n] = e[n] + r);
            });
          }
          function ht(t, e) {
            Object.keys(e).forEach(function (n) {
              !1 !== e[n] ? t.setAttribute(n, e[n]) : t.removeAttribute(n);
            });
          }
          function vt(t) {
            return (
              mt(t.instance.popper, t.styles),
              ht(t.instance.popper, t.attributes),
              t.arrowElement &&
                Object.keys(t.arrowStyles).length &&
                mt(t.arrowElement, t.arrowStyles),
              t
            );
          }
          function bt(t, e, n, r, i) {
            var o = K(i, e, t, n.positionFixed),
              a = q(
                n.placement,
                o,
                e,
                t,
                n.modifiers.flip.boundariesElement,
                n.modifiers.flip.padding
              );
            return (
              e.setAttribute("x-placement", a),
              mt(e, { position: n.positionFixed ? "fixed" : "absolute" }),
              n
            );
          }
          function wt(t, e) {
            var n = e.x,
              r = e.y,
              i = t.offsets.popper,
              o = tt(t.instance.modifiers, function (t) {
                return "applyStyle" === t.name;
              }).gpuAcceleration,
              a = void 0 !== o ? o : e.gpuAcceleration,
              s = O(t.instance.popper),
              p = N(s),
              c = { position: i.position },
              l = {
                left: Math.floor(i.left),
                top: Math.round(i.top),
                bottom: Math.round(i.bottom),
                right: Math.floor(i.right),
              },
              u = "bottom" === n ? "top" : "bottom",
              d = "right" === r ? "left" : "right",
              f = ot("transform"),
              m = void 0,
              h = void 0;
            if (
              ((h =
                "bottom" === u
                  ? "HTML" === s.nodeName
                    ? -s.clientHeight + l.bottom
                    : -p.height + l.bottom
                  : l.top),
              (m =
                "right" === d
                  ? "HTML" === s.nodeName
                    ? -s.clientWidth + l.right
                    : -p.width + l.right
                  : l.left),
              a && f)
            )
              (c[f] = "translate3d(" + m + "px, " + h + "px, 0)"),
                (c[u] = 0),
                (c[d] = 0),
                (c.willChange = "transform");
            else {
              var v = "bottom" === u ? -1 : 1,
                b = "right" === d ? -1 : 1;
              (c[u] = h * v), (c[d] = m * b), (c.willChange = u + ", " + d);
            }
            var w = { "x-placement": t.placement };
            return (
              (t.attributes = S({}, w, t.attributes)),
              (t.styles = S({}, c, t.styles)),
              (t.arrowStyles = S({}, t.offsets.arrow, t.arrowStyles)),
              t
            );
          }
          function gt(t, e, n) {
            var r = tt(t, function (t) {
                return t.name === e;
              }),
              i =
                !!r &&
                t.some(function (t) {
                  return t.name === n && t.enabled && t.order < r.order;
                });
            return i;
          }
          function yt(t, e) {
            var n;
            if (!gt(t.instance.modifiers, "arrow", "keepTogether")) return t;
            var r = e.element;
            if ("string" == typeof r) {
              if (!(r = t.instance.popper.querySelector(r))) return t;
            } else if (!t.instance.popper.contains(r)) return t;
            var i = t.placement.split("-")[0],
              o = t.offsets,
              a = o.popper,
              s = o.reference,
              p = -1 !== ["left", "right"].indexOf(i),
              c = p ? "height" : "width",
              l = p ? "Top" : "Left",
              u = l.toLowerCase(),
              d = p ? "left" : "top",
              f = p ? "bottom" : "right",
              m = Z(r)[c];
            s[f] - m < a[u] && (t.offsets.popper[u] -= a[u] - (s[f] - m)),
              s[u] + m > a[f] && (t.offsets.popper[u] += s[u] + m - a[f]),
              (t.offsets.popper = A(t.offsets.popper));
            var h = s[u] + s[c] / 2 - m / 2,
              v = x(t.instance.popper),
              b = parseFloat(v["margin" + l], 10),
              w = parseFloat(v["border" + l + "Width"], 10),
              g = h - t.offsets.popper[u] - b - w;
            return (
              (g = Math.max(Math.min(a[c] - m, g), 0)),
              (t.arrowElement = r),
              (t.offsets.arrow =
                (z((n = {}), u, Math.round(g)), z(n, d, ""), n)),
              t
            );
          }
          function _t(t) {
            return "end" === t ? "start" : "start" === t ? "end" : t;
          }
          var xt = [
              "auto-start",
              "auto",
              "auto-end",
              "top-start",
              "top",
              "top-end",
              "right-start",
              "right",
              "right-end",
              "bottom-end",
              "bottom",
              "bottom-start",
              "left-end",
              "left",
              "left-start",
            ],
            kt = xt.slice(3);
          function $t(t) {
            var e =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              n = kt.indexOf(t),
              r = kt.slice(n + 1).concat(kt.slice(0, n));
            return e ? r.reverse() : r;
          }
          var Mt = {
            FLIP: "flip",
            CLOCKWISE: "clockwise",
            COUNTERCLOCKWISE: "counterclockwise",
          };
          function Ft(t, e) {
            if (it(t.instance.modifiers, "inner")) return t;
            if (t.flipped && t.placement === t.originalPlacement) return t;
            var n = U(
                t.instance.popper,
                t.instance.reference,
                e.padding,
                e.boundariesElement,
                t.positionFixed
              ),
              r = t.placement.split("-")[0],
              i = G(r),
              o = t.placement.split("-")[1] || "",
              a = [];
            switch (e.behavior) {
              case Mt.FLIP:
                a = [r, i];
                break;
              case Mt.CLOCKWISE:
                a = $t(r);
                break;
              case Mt.COUNTERCLOCKWISE:
                a = $t(r, !0);
                break;
              default:
                a = e.behavior;
            }
            return (
              a.forEach(function (s, p) {
                if (r !== s || a.length === p + 1) return t;
                (r = t.placement.split("-")[0]), (i = G(r));
                var c = t.offsets.popper,
                  l = t.offsets.reference,
                  u = Math.floor,
                  d =
                    ("left" === r && u(c.right) > u(l.left)) ||
                    ("right" === r && u(c.left) < u(l.right)) ||
                    ("top" === r && u(c.bottom) > u(l.top)) ||
                    ("bottom" === r && u(c.top) < u(l.bottom)),
                  f = u(c.left) < u(n.left),
                  m = u(c.right) > u(n.right),
                  h = u(c.top) < u(n.top),
                  v = u(c.bottom) > u(n.bottom),
                  b =
                    ("left" === r && f) ||
                    ("right" === r && m) ||
                    ("top" === r && h) ||
                    ("bottom" === r && v),
                  w = -1 !== ["top", "bottom"].indexOf(r),
                  g =
                    !!e.flipVariations &&
                    ((w && "start" === o && f) ||
                      (w && "end" === o && m) ||
                      (!w && "start" === o && h) ||
                      (!w && "end" === o && v));
                (d || b || g) &&
                  ((t.flipped = !0),
                  (d || b) && (r = a[p + 1]),
                  g && (o = _t(o)),
                  (t.placement = r + (o ? "-" + o : "")),
                  (t.offsets.popper = S(
                    {},
                    t.offsets.popper,
                    Q(t.instance.popper, t.offsets.reference, t.placement)
                  )),
                  (t = nt(t.instance.modifiers, t, "flip")));
              }),
              t
            );
          }
          function Tt(t) {
            var e = t.offsets,
              n = e.popper,
              r = e.reference,
              i = t.placement.split("-")[0],
              o = Math.floor,
              a = -1 !== ["top", "bottom"].indexOf(i),
              s = a ? "right" : "bottom",
              p = a ? "left" : "top",
              c = a ? "width" : "height";
            return (
              n[s] < o(r[p]) && (t.offsets.popper[p] = o(r[p]) - n[c]),
              n[p] > o(r[s]) && (t.offsets.popper[p] = o(r[s])),
              t
            );
          }
          function Ot(t, e, n, r) {
            var i = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
              o = +i[1],
              a = i[2];
            if (!o) return t;
            if (0 === a.indexOf("%")) {
              return (A("%p" === a ? n : r)[e] / 100) * o;
            }
            return "vh" === a || "vw" === a
              ? (("vh" === a
                  ? Math.max(
                      document.documentElement.clientHeight,
                      window.innerHeight || 0
                    )
                  : Math.max(
                      document.documentElement.clientWidth,
                      window.innerWidth || 0
                    )) /
                  100) *
                  o
              : o;
          }
          function Yt(t, e, n, r) {
            var i = [0, 0],
              o = -1 !== ["right", "left"].indexOf(r),
              a = t.split(/(\+|\-)/).map(function (t) {
                return t.trim();
              }),
              s = a.indexOf(
                tt(a, function (t) {
                  return -1 !== t.search(/,|\s/);
                })
              );
            a[s] && a[s].indexOf(",");
            var p = /\s*,\s*|\s+/,
              c =
                -1 !== s
                  ? [
                      a.slice(0, s).concat([a[s].split(p)[0]]),
                      [a[s].split(p)[1]].concat(a.slice(s + 1)),
                    ]
                  : [a];
            return (
              (c = c.map(function (t, r) {
                var i = (1 === r ? !o : o) ? "height" : "width",
                  a = !1;
                return t
                  .reduce(function (t, e) {
                    return "" === t[t.length - 1] &&
                      -1 !== ["+", "-"].indexOf(e)
                      ? ((t[t.length - 1] = e), (a = !0), t)
                      : a
                      ? ((t[t.length - 1] += e), (a = !1), t)
                      : t.concat(e);
                  }, [])
                  .map(function (t) {
                    return Ot(t, i, e, n);
                  });
              })).forEach(function (t, e) {
                t.forEach(function (n, r) {
                  ft(n) && (i[e] += n * ("-" === t[r - 1] ? -1 : 1));
                });
              }),
              i
            );
          }
          function Xt(t, e) {
            var n = e.offset,
              r = t.placement,
              i = t.offsets,
              o = i.popper,
              a = i.reference,
              s = r.split("-")[0],
              p = void 0;
            return (
              (p = ft(+n) ? [+n, 0] : Yt(n, o, a, s)),
              "left" === s
                ? ((o.top += p[0]), (o.left -= p[1]))
                : "right" === s
                ? ((o.top += p[0]), (o.left += p[1]))
                : "top" === s
                ? ((o.left += p[0]), (o.top -= p[1]))
                : "bottom" === s && ((o.left += p[0]), (o.top += p[1])),
              (t.popper = o),
              t
            );
          }
          function Lt(t, e) {
            var n = e.boundariesElement || O(t.instance.popper);
            t.instance.reference === n && (n = O(n));
            var r = ot("transform"),
              i = t.instance.popper.style,
              o = i.top,
              a = i.left,
              s = i[r];
            (i.top = ""), (i.left = ""), (i[r] = "");
            var p = U(
              t.instance.popper,
              t.instance.reference,
              e.padding,
              n,
              t.positionFixed
            );
            (i.top = o), (i.left = a), (i[r] = s), (e.boundaries = p);
            var c = e.priority,
              l = t.offsets.popper,
              u = {
                primary: function (t) {
                  var n = l[t];
                  return (
                    l[t] < p[t] &&
                      !e.escapeWithReference &&
                      (n = Math.max(l[t], p[t])),
                    z({}, t, n)
                  );
                },
                secondary: function (t) {
                  var n = "right" === t ? "left" : "top",
                    r = l[n];
                  return (
                    l[t] > p[t] &&
                      !e.escapeWithReference &&
                      (r = Math.min(
                        l[n],
                        p[t] - ("right" === t ? l.width : l.height)
                      )),
                    z({}, n, r)
                  );
                },
              };
            return (
              c.forEach(function (t) {
                var e =
                  -1 !== ["left", "top"].indexOf(t) ? "primary" : "secondary";
                l = S({}, l, u[e](t));
              }),
              (t.offsets.popper = l),
              t
            );
          }
          function Pt(t) {
            var e = t.placement,
              n = e.split("-")[0],
              r = e.split("-")[1];
            if (r) {
              var i = t.offsets,
                o = i.reference,
                a = i.popper,
                s = -1 !== ["bottom", "top"].indexOf(n),
                p = s ? "left" : "top",
                c = s ? "width" : "height",
                l = {
                  start: z({}, p, o[p]),
                  end: z({}, p, o[p] + o[c] - a[c]),
                };
              t.offsets.popper = S({}, a, l[r]);
            }
            return t;
          }
          function It(t) {
            if (!gt(t.instance.modifiers, "hide", "preventOverflow")) return t;
            var e = t.offsets.reference,
              n = tt(t.instance.modifiers, function (t) {
                return "preventOverflow" === t.name;
              }).boundaries;
            if (
              e.bottom < n.top ||
              e.left > n.right ||
              e.top > n.bottom ||
              e.right < n.left
            ) {
              if (!0 === t.hide) return t;
              (t.hide = !0), (t.attributes["x-out-of-boundaries"] = "");
            } else {
              if (!1 === t.hide) return t;
              (t.hide = !1), (t.attributes["x-out-of-boundaries"] = !1);
            }
            return t;
          }
          function Dt(t) {
            var e = t.placement,
              n = e.split("-")[0],
              r = t.offsets,
              i = r.popper,
              o = r.reference,
              a = -1 !== ["left", "right"].indexOf(n),
              s = -1 === ["top", "left"].indexOf(n);
            return (
              (i[a ? "left" : "top"] =
                o[n] - (s ? i[a ? "width" : "height"] : 0)),
              (t.placement = G(e)),
              (t.offsets.popper = A(i)),
              t
            );
          }
          var Ct = {
              placement: "bottom",
              positionFixed: !1,
              eventsEnabled: !0,
              removeOnDestroy: !1,
              onCreate: function () {},
              onUpdate: function () {},
              modifiers: {
                shift: { order: 100, enabled: !0, fn: Pt },
                offset: { order: 200, enabled: !0, fn: Xt, offset: 0 },
                preventOverflow: {
                  order: 300,
                  enabled: !0,
                  fn: Lt,
                  priority: ["left", "right", "top", "bottom"],
                  padding: 5,
                  boundariesElement: "scrollParent",
                },
                keepTogether: { order: 400, enabled: !0, fn: Tt },
                arrow: {
                  order: 500,
                  enabled: !0,
                  fn: yt,
                  element: "[x-arrow]",
                },
                flip: {
                  order: 600,
                  enabled: !0,
                  fn: Ft,
                  behavior: "flip",
                  padding: 5,
                  boundariesElement: "viewport",
                },
                inner: { order: 700, enabled: !1, fn: Dt },
                hide: { order: 800, enabled: !0, fn: It },
                computeStyle: {
                  order: 850,
                  enabled: !0,
                  fn: wt,
                  gpuAcceleration: !0,
                  x: "bottom",
                  y: "right",
                },
                applyStyle: {
                  order: 900,
                  enabled: !0,
                  fn: vt,
                  onLoad: bt,
                  gpuAcceleration: void 0,
                },
              },
            },
            Bt = (function () {
              function t(e, n) {
                var r = this,
                  i =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : {};
                H(this, t),
                  (this.scheduleUpdate = function () {
                    return requestAnimationFrame(r.update);
                  }),
                  (this.update = y(this.update.bind(this))),
                  (this.options = S({}, t.Defaults, i)),
                  (this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: [],
                  }),
                  (this.reference = e && e.jquery ? e[0] : e),
                  (this.popper = n && n.jquery ? n[0] : n),
                  (this.options.modifiers = {}),
                  Object.keys(S({}, t.Defaults.modifiers, i.modifiers)).forEach(
                    function (e) {
                      r.options.modifiers[e] = S(
                        {},
                        t.Defaults.modifiers[e] || {},
                        i.modifiers ? i.modifiers[e] : {}
                      );
                    }
                  ),
                  (this.modifiers = Object.keys(this.options.modifiers)
                    .map(function (t) {
                      return S({ name: t }, r.options.modifiers[t]);
                    })
                    .sort(function (t, e) {
                      return t.order - e.order;
                    })),
                  this.modifiers.forEach(function (t) {
                    t.enabled &&
                      _(t.onLoad) &&
                      t.onLoad(r.reference, r.popper, r.options, t, r.state);
                  }),
                  this.update();
                var o = this.options.eventsEnabled;
                o && this.enableEventListeners(),
                  (this.state.eventsEnabled = o);
              }
              return (
                E(t, [
                  {
                    key: "update",
                    value: function () {
                      return rt.call(this);
                    },
                  },
                  {
                    key: "destroy",
                    value: function () {
                      return at.call(this);
                    },
                  },
                  {
                    key: "enableEventListeners",
                    value: function () {
                      return lt.call(this);
                    },
                  },
                  {
                    key: "disableEventListeners",
                    value: function () {
                      return dt.call(this);
                    },
                  },
                ]),
                t
              );
            })();
          (Bt.Utils = (
            "undefined" != typeof window ? window : n.g
          ).PopperUtils),
            (Bt.placements = xt),
            (Bt.Defaults = Ct);
          var Ht = {
              POPPER: ".tippy-popper",
              TOOLTIP: ".tippy-tooltip",
              CONTENT: ".tippy-content",
              BACKDROP: ".tippy-backdrop",
              ARROW: ".tippy-arrow",
              ROUND_ARROW: ".tippy-roundarrow",
            },
            Et = { x: !0 },
            zt = function (t) {
              if (l) {
                var e = document.createElement("style");
                (e.type = "text/css"),
                  (e.textContent = t),
                  document.head.insertBefore(e, document.head.firstChild);
              }
            },
            St = function (t) {
              return [].slice.call(t);
            },
            At = function (t, e) {
              e.content instanceof Element
                ? (Ut(t, ""), t.appendChild(e.content))
                : (t[e.allowHTML ? "innerHTML" : "textContent"] = e.content);
            },
            Nt = function (t) {
              return (
                !(t instanceof Element) ||
                (pe.call(
                  t,
                  "a[href],area[href],button,details,input,textarea,select,iframe,[tabindex]"
                ) &&
                  !t.hasAttribute("disabled"))
              );
            },
            jt = function (t, e) {
              t.filter(Boolean).forEach(function (t) {
                t.style.transitionDuration = e + "ms";
              });
            },
            Vt = function (t) {
              var e = function (e) {
                return t.querySelector(e);
              };
              return {
                tooltip: e(Ht.TOOLTIP),
                backdrop: e(Ht.BACKDROP),
                content: e(Ht.CONTENT),
                arrow: e(Ht.ARROW) || e(Ht.ROUND_ARROW),
              };
            },
            Rt = function (t) {
              return "[object Object]" === {}.toString.call(t);
            },
            Wt = function () {
              return document.createElement("div");
            },
            Ut = function (t, e) {
              t[Et.x && "innerHTML"] =
                e instanceof Element ? e[Et.x && "innerHTML"] : e;
            },
            Jt = function (t) {
              if (t instanceof Element || Rt(t)) return [t];
              if (t instanceof NodeList) return St(t);
              if (Array.isArray(t)) return t;
              try {
                return St(document.querySelectorAll(t));
              } catch (t) {
                return [];
              }
            },
            qt = function (t) {
              return !isNaN(t) && !isNaN(parseFloat(t));
            },
            Kt = function (t, e, n) {
              if (Array.isArray(t)) {
                var r = t[e];
                return null == r ? n : r;
              }
              return t;
            },
            Zt = function (t) {
              var e = Wt();
              return (
                "round" === t
                  ? ((e.className = "tippy-roundarrow"),
                    Ut(
                      e,
                      '<svg viewBox="0 0 24 8" xmlns="http://www.w3.org/2000/svg"><path d="M3 8s2.021-.015 5.253-4.218C9.584 2.051 10.797 1.007 12 1c1.203-.007 2.416 1.035 3.761 2.782C19.012 8.005 21 8 21 8H3z"/></svg>'
                    ))
                  : (e.className = "tippy-arrow"),
                e
              );
            },
            Gt = function () {
              var t = Wt();
              return (
                (t.className = "tippy-backdrop"),
                t.setAttribute("data-state", "hidden"),
                t
              );
            },
            Qt = function (t, e) {
              t.setAttribute("tabindex", "-1"),
                e.setAttribute("data-interactive", "");
            },
            te = function (t, e) {
              t.removeAttribute("tabindex"),
                e.removeAttribute("data-interactive");
            },
            ee = function (t) {
              t.setAttribute("data-inertia", "");
            },
            ne = function (t) {
              t.removeAttribute("data-inertia");
            },
            re = function (t, e) {
              var n = Wt();
              (n.className = "tippy-popper"),
                n.setAttribute("role", "tooltip"),
                (n.id = "tippy-" + t),
                (n.style.zIndex = e.zIndex);
              var r = Wt();
              (r.className = "tippy-tooltip"),
                r.setAttribute("data-size", e.size),
                r.setAttribute("data-animation", e.animation),
                r.setAttribute("data-state", "hidden"),
                e.theme.split(" ").forEach(function (t) {
                  r.classList.add(t + "-theme");
                });
              var i = Wt();
              return (
                (i.className = "tippy-content"),
                i.setAttribute("data-state", "hidden"),
                e.interactive && Qt(n, r),
                e.arrow && r.appendChild(Zt(e.arrowType)),
                e.animateFill &&
                  (r.appendChild(Gt()), r.setAttribute("data-animatefill", "")),
                e.inertia && r.setAttribute("data-inertia", ""),
                At(i, e),
                r.appendChild(i),
                n.appendChild(r),
                n.addEventListener("focusout", function (t) {
                  t.relatedTarget &&
                    n.V &&
                    !le(t.relatedTarget, function (t) {
                      return t === n;
                    }) &&
                    t.relatedTarget !== n.V.reference &&
                    n.V.props.shouldPopperHideOnBlur(t) &&
                    n.V.hide();
                }),
                n
              );
            },
            ie = function (t, e, n) {
              var r = Vt(t),
                i = r.tooltip,
                o = r.content,
                a = r.backdrop,
                s = r.arrow;
              (t.style.zIndex = n.zIndex),
                i.setAttribute("data-size", n.size),
                i.setAttribute("data-animation", n.animation),
                e.content !== n.content && At(o, n),
                !e.animateFill && n.animateFill
                  ? (i.appendChild(Gt()),
                    i.setAttribute("data-animatefill", ""))
                  : e.animateFill &&
                    !n.animateFill &&
                    (i.removeChild(a), i.removeAttribute("data-animatefill")),
                !e.arrow && n.arrow
                  ? i.appendChild(Zt(n.arrowType))
                  : e.arrow && !n.arrow && i.removeChild(s),
                e.arrow &&
                  n.arrow &&
                  e.arrowType !== n.arrowType &&
                  i.replaceChild(Zt(n.arrowType), s),
                !e.interactive && n.interactive
                  ? Qt(t, i)
                  : e.interactive && !n.interactive && te(t, i),
                !e.inertia && n.inertia
                  ? ee(i)
                  : e.inertia && !n.inertia && ne(i),
                e.theme !== n.theme &&
                  (e.theme.split(" ").forEach(function (t) {
                    i.classList.remove(t + "-theme");
                  }),
                  n.theme.split(" ").forEach(function (t) {
                    i.classList.add(t + "-theme");
                  }));
            },
            oe = function (t) {
              St(document.querySelectorAll(Ht.POPPER)).forEach(function (e) {
                var n = e.V;
                !n ||
                  !0 !== n.props.hideOnClick ||
                  (t && e === t.popper) ||
                  n.hide();
              });
            },
            ae = function (t) {
              return Object.keys(i).reduce(function (e, n) {
                var r = (t.getAttribute("data-tippy-" + n) || "").trim();
                return r
                  ? ("content" === n
                      ? (e[n] = r)
                      : "true" === r
                      ? (e[n] = !0)
                      : "false" === r
                      ? (e[n] = !1)
                      : qt(r)
                      ? (e[n] = Number(r))
                      : "[" === r[0] || "{" === r[0]
                      ? (e[n] = JSON.parse(r))
                      : (e[n] = r),
                    e)
                  : e;
              }, {});
            },
            se = function (t) {
              var e = {
                isVirtual: !0,
                attributes: t.attributes || {},
                setAttribute: function (e, n) {
                  t.attributes[e] = n;
                },
                getAttribute: function (e) {
                  return t.attributes[e];
                },
                removeAttribute: function (e) {
                  delete t.attributes[e];
                },
                hasAttribute: function (e) {
                  return e in t.attributes;
                },
                addEventListener: function () {},
                removeEventListener: function () {},
                classList: {
                  classNames: {},
                  add: function (e) {
                    t.classList.classNames[e] = !0;
                  },
                  remove: function (e) {
                    delete t.classList.classNames[e];
                  },
                  contains: function (e) {
                    return e in t.classList.classNames;
                  },
                },
              };
              for (var n in e) t[n] = e[n];
              return t;
            },
            pe = (function () {
              if (s) {
                var t = Element.prototype;
                return (
                  t.matches ||
                  t.matchesSelector ||
                  t.webkitMatchesSelector ||
                  t.mozMatchesSelector ||
                  t.msMatchesSelector
                );
              }
            })(),
            ce = function (t, e) {
              return (
                Element.prototype.closest ||
                function (t) {
                  for (var e = this; e; ) {
                    if (pe.call(e, t)) return e;
                    e = e.parentElement;
                  }
                }
              ).call(t, e);
            },
            le = function (t, e) {
              for (; t; ) {
                if (e(t)) return t;
                t = t.parentElement;
              }
            },
            ue = function (t) {
              var e = window.scrollX || window.pageXOffset,
                n = window.scrollY || window.pageYOffset;
              t.focus(), scroll(e, n);
            },
            de = function (t) {
              t.offsetHeight;
            },
            fe = function (t, e) {
              return (e ? t : { X: "Y", Y: "X" }[t]) || "";
            },
            me = function (t, e, n, r) {
              var i = e[0],
                o = e[1];
              return i || o
                ? {
                    scale: o ? (n ? i + ", " + o : o + ", " + i) : "" + i,
                    translate: o
                      ? n
                        ? r
                          ? i + "px, " + -o + "px"
                          : i + "px, " + o + "px"
                        : r
                        ? -o + "px, " + i + "px"
                        : o + "px, " + i + "px"
                      : r
                      ? -i + "px"
                      : i + "px",
                  }[t]
                : "";
            },
            he = function (t, e) {
              var n = t.match(new RegExp(e + "([XY])"));
              return n ? n[1] : "";
            },
            ve = function (t, e) {
              var n = t.match(e);
              return n ? n[1].split(",").map(parseFloat) : [];
            },
            be = {
              translate: /translateX?Y?\(([^)]+)\)/,
              scale: /scaleX?Y?\(([^)]+)\)/,
            },
            we = function (t, e) {
              var n = $e(ce(t, Ht.POPPER)),
                r = "top" === n || "bottom" === n,
                i = "right" === n || "bottom" === n,
                o = {
                  translate: {
                    axis: he(e, "translate"),
                    numbers: ve(e, be.translate),
                  },
                  scale: { axis: he(e, "scale"), numbers: ve(e, be.scale) },
                },
                a = e
                  .replace(
                    be.translate,
                    "translate" +
                      fe(o.translate.axis, r) +
                      "(" +
                      me("translate", o.translate.numbers, r, i) +
                      ")"
                  )
                  .replace(
                    be.scale,
                    "scale" +
                      fe(o.scale.axis, r) +
                      "(" +
                      me("scale", o.scale.numbers, r, i) +
                      ")"
                  );
              t.style[
                void 0 !== document.body.style.transform
                  ? "transform"
                  : "webkitTransform"
              ] = a;
            },
            ge = function (t, e) {
              t.filter(Boolean).forEach(function (t) {
                t.setAttribute("data-state", e);
              });
            },
            ye = function (t, e) {
              var n = t.popper,
                r = t.options,
                i = r.onCreate,
                o = r.onUpdate;
              r.onCreate = r.onUpdate = function () {
                de(n), e(), o(), (r.onCreate = i), (r.onUpdate = o);
              };
            },
            _e = function (t) {
              setTimeout(t, 1);
            },
            xe = function (t, e, n, r) {
              if (!t) return !0;
              var i = n.clientX,
                o = n.clientY,
                a = r.interactiveBorder,
                s = r.distance,
                p = e.top - o > ("top" === t ? a + s : a),
                c = o - e.bottom > ("bottom" === t ? a + s : a),
                l = e.left - i > ("left" === t ? a + s : a),
                u = i - e.right > ("right" === t ? a + s : a);
              return p || c || l || u;
            },
            ke = function (t, e) {
              return -(t - e) + "px";
            },
            $e = function (t) {
              var e = t.getAttribute("x-placement");
              return e ? e.split("-")[0] : "";
            },
            Me = function (t, e) {
              var n = r({}, e, e.performance ? {} : ae(t));
              return (
                n.arrow && (n.animateFill = !1),
                "function" == typeof n.appendTo && (n.appendTo = e.appendTo(t)),
                "function" == typeof n.content && (n.content = e.content(t)),
                n
              );
            },
            Fe = function (t, e, n) {
              t[e + "EventListener"]("transitionend", n);
            },
            Te = function (t, e) {
              var n = void 0;
              return function () {
                var r = this,
                  i = arguments;
                clearTimeout(n),
                  (n = setTimeout(function () {
                    return t.apply(r, i);
                  }, e));
              };
            },
            Oe = function (t, e) {
              for (var n in t || {})
                if (!(n in e))
                  throw Error("[tippy]: `" + n + "` is not a valid option");
            },
            Ye = !1,
            Xe = function () {
              Ye ||
                ((Ye = !0),
                d && document.body.classList.add("tippy-iOS"),
                window.performance &&
                  document.addEventListener("mousemove", Pe));
            },
            Le = 0,
            Pe = function t() {
              var e = performance.now();
              e - Le < 20 &&
                ((Ye = !1),
                document.removeEventListener("mousemove", t),
                d || document.body.classList.remove("tippy-iOS")),
                (Le = e);
            },
            Ie = function (t) {
              var e = t.target;
              if (!(e instanceof Element)) return oe();
              var n = ce(e, Ht.POPPER);
              if (!(n && n.V && n.V.props.interactive)) {
                var r = le(e, function (t) {
                  return t.V && t.V.reference === t;
                });
                if (r) {
                  var i = r.V,
                    o = i.props.trigger.indexOf("click") > -1;
                  if (Ye || o) return oe(i);
                  if (!0 !== i.props.hideOnClick || o) return;
                  i.clearDelayTimeouts();
                }
                oe();
              }
            },
            De = function () {
              var t = document.activeElement;
              t && t.blur && t.V && t.blur();
            },
            Ce = function () {
              St(document.querySelectorAll(Ht.POPPER)).forEach(function (t) {
                var e = t.V;
                e.props.livePlacement || e.popperInstance.scheduleUpdate();
              });
            };
          function Be() {
            document.addEventListener("click", Ie, !0),
              document.addEventListener("touchstart", Xe, { passive: !0 }),
              window.addEventListener("blur", De),
              window.addEventListener("resize", Ce),
              f ||
                (!navigator.maxTouchPoints && !navigator.msMaxTouchPoints) ||
                document.addEventListener("pointerdown", Xe);
          }
          var He = 1;
          function Ee(t, e) {
            var n = Me(t, e);
            if (!n.multiple && t.V) return null;
            var o = null,
              s = {},
              p = null,
              c = 0,
              l = 0,
              d = !1,
              m = function () {},
              h = [],
              v = !1,
              b = n.interactiveDebounce > 0 ? Te(L, n.interactiveDebounce) : L,
              w = He++,
              g = re(w, n);
            g.addEventListener("mouseenter", function (t) {
              _.props.interactive &&
                _.state.isVisible &&
                "mouseenter" === s.type &&
                F(t);
            }),
              g.addEventListener("mouseleave", function (t) {
                _.props.interactive &&
                  "mouseenter" === s.type &&
                  0 === _.props.interactiveDebounce &&
                  xe($e(g), g.getBoundingClientRect(), t, _.props) &&
                  T();
              });
            var y = Vt(g),
              _ = {
                id: w,
                reference: t,
                popper: g,
                popperChildren: y,
                popperInstance: null,
                props: n,
                state: {
                  isEnabled: !0,
                  isVisible: !1,
                  isDestroyed: !1,
                  isMounted: !1,
                  isShown: !1,
                },
                clearDelayTimeouts: q,
                set: K,
                setContent: Z,
                show: G,
                hide: Q,
                enable: U,
                disable: J,
                destroy: tt,
              };
            return (
              R(),
              t.addEventListener("click", x),
              n.lazy ||
                ((_.popperInstance = H()),
                _.popperInstance.disableEventListeners()),
              n.showOnInit && F(),
              !n.a11y || n.target || Nt(t) || t.setAttribute("tabindex", "0"),
              (t.V = _),
              (g.V = _),
              _
            );
            function x() {
              _e(function () {
                v = !1;
              });
            }
            function k() {
              (o = new MutationObserver(function () {
                _.popperInstance.update();
              })).observe(g, { childList: !0, subtree: !0, characterData: !0 });
            }
            function $(t) {
              var e = (p = t),
                n = e.clientX,
                r = e.clientY;
              if (_.popperInstance) {
                var i = $e(_.popper),
                  o = _.popperChildren.arrow ? 20 : 5,
                  a = "top" === i || "bottom" === i,
                  s = "left" === i || "right" === i,
                  c = a ? Math.max(o, n) : n,
                  l = s ? Math.max(o, r) : r;
                a && c > o && (c = Math.min(n, window.innerWidth - o)),
                  s && l > o && (l = Math.min(r, window.innerHeight - o));
                var u = _.reference.getBoundingClientRect(),
                  d = _.props.followCursor,
                  f = "horizontal" === d,
                  m = "vertical" === d;
                (_.popperInstance.reference = {
                  getBoundingClientRect: function () {
                    return {
                      width: 0,
                      height: 0,
                      top: f ? u.top : l,
                      bottom: f ? u.bottom : l,
                      left: m ? u.left : c,
                      right: m ? u.right : c,
                    };
                  },
                  clientWidth: 0,
                  clientHeight: 0,
                }),
                  _.popperInstance.scheduleUpdate();
              }
            }
            function M(t) {
              var e = ce(t.target, _.props.target);
              e &&
                !e.V &&
                (Ee(e, r({}, _.props, { target: "", showOnInit: !0 })), F(t));
            }
            function F(t) {
              if ((q(), !_.state.isVisible)) {
                if (_.props.target) return M(t);
                if (((d = !0), _.props.wait)) return _.props.wait(_, t);
                z() && document.addEventListener("mousemove", $);
                var e = Kt(_.props.delay, 0, i.delay);
                e
                  ? (c = setTimeout(function () {
                      G();
                    }, e))
                  : G();
              }
            }
            function T() {
              if ((q(), !_.state.isVisible)) return O();
              d = !1;
              var t = Kt(_.props.delay, 1, i.delay);
              t
                ? (l = setTimeout(function () {
                    _.state.isVisible && Q();
                  }, t))
                : Q();
            }
            function O() {
              document.removeEventListener("mousemove", $), (p = null);
            }
            function Y() {
              document.body.removeEventListener("mouseleave", T),
                document.removeEventListener("mousemove", b);
            }
            function X(t) {
              _.state.isEnabled &&
                !B(t) &&
                (_.state.isVisible || (s = t),
                "click" === t.type &&
                !1 !== _.props.hideOnClick &&
                _.state.isVisible
                  ? T()
                  : F(t));
            }
            function L(t) {
              var e = le(t.target, function (t) {
                  return t.V;
                }),
                n = ce(t.target, Ht.POPPER) === _.popper,
                r = e === _.reference;
              n ||
                r ||
                (xe(
                  $e(_.popper),
                  _.popper.getBoundingClientRect(),
                  t,
                  _.props
                ) &&
                  (Y(), T()));
            }
            function P(t) {
              if (!B(t))
                return _.props.interactive
                  ? (document.body.addEventListener("mouseleave", T),
                    void document.addEventListener("mousemove", b))
                  : void T();
            }
            function I(t) {
              if (t.target === _.reference) {
                if (_.props.interactive) {
                  if (!t.relatedTarget) return;
                  if (ce(t.relatedTarget, Ht.POPPER)) return;
                }
                T();
              }
            }
            function D(t) {
              ce(t.target, _.props.target) && F(t);
            }
            function C(t) {
              ce(t.target, _.props.target) && T();
            }
            function B(t) {
              var e = t.type.indexOf("touch") > -1,
                n = f && Ye && _.props.touchHold && !e,
                r = Ye && !_.props.touchHold && e;
              return n || r;
            }
            function H() {
              var t = _.popperChildren.tooltip,
                e = _.props.popperOptions,
                n = Ht["round" === _.props.arrowType ? "ROUND_ARROW" : "ARROW"],
                a = t.querySelector(n),
                s = r({ placement: _.props.placement }, e || {}, {
                  modifiers: r({}, e ? e.modifiers : {}, {
                    arrow: r(
                      { element: n },
                      e && e.modifiers ? e.modifiers.arrow : {}
                    ),
                    flip: r(
                      {
                        enabled: _.props.flip,
                        padding: _.props.distance + 5,
                        behavior: _.props.flipBehavior,
                      },
                      e && e.modifiers ? e.modifiers.flip : {}
                    ),
                    offset: r(
                      { offset: _.props.offset },
                      e && e.modifiers ? e.modifiers.offset : {}
                    ),
                  }),
                  onCreate: function () {
                    (t.style[$e(_.popper)] = ke(_.props.distance, i.distance)),
                      a &&
                        _.props.arrowTransform &&
                        we(a, _.props.arrowTransform);
                  },
                  onUpdate: function () {
                    var e = t.style;
                    (e.top = ""),
                      (e.bottom = ""),
                      (e.left = ""),
                      (e.right = ""),
                      (e[$e(_.popper)] = ke(_.props.distance, i.distance)),
                      a &&
                        _.props.arrowTransform &&
                        we(a, _.props.arrowTransform);
                  },
                });
              return o || k(), new Bt(_.reference, _.popper, s);
            }
            function E(t) {
              _.popperInstance
                ? z() ||
                  (_.popperInstance.scheduleUpdate(),
                  _.props.livePlacement &&
                    _.popperInstance.enableEventListeners())
                : ((_.popperInstance = H()),
                  (_.props.livePlacement && !z()) ||
                    _.popperInstance.disableEventListeners()),
                (_.popperInstance.reference = _.reference);
              var e = _.popperChildren.arrow;
              if (z()) {
                e && (e.style.margin = "0");
                var n = Kt(_.props.delay, 0, i.delay);
                s.type && $(n && p ? p : s);
              } else e && (e.style.margin = "");
              ye(_.popperInstance, t),
                _.props.appendTo.contains(_.popper) ||
                  (_.props.appendTo.appendChild(_.popper),
                  _.props.onMount(_),
                  (_.state.isMounted = !0));
            }
            function z() {
              return _.props.followCursor && !Ye && "focus" !== s.type;
            }
            function S() {
              jt([_.popper], u ? 0 : _.props.updateDuration),
                (function t() {
                  _.popperInstance && _.popperInstance.scheduleUpdate(),
                    _.state.isMounted
                      ? requestAnimationFrame(t)
                      : jt([_.popper], 0);
                })();
            }
            function A(t, e) {
              j(t, function () {
                !_.state.isVisible &&
                  _.props.appendTo.contains(_.popper) &&
                  e();
              });
            }
            function N(t, e) {
              j(t, e);
            }
            function j(t, e) {
              if (0 === t) return e();
              var n = _.popperChildren.tooltip,
                r = function t(r) {
                  r.target === n && (Fe(n, "remove", t), e());
                };
              Fe(n, "remove", m), Fe(n, "add", r), (m = r);
            }
            function V(t, e, n) {
              _.reference.addEventListener(t, e),
                n.push({ eventType: t, handler: e });
            }
            function R() {
              h = _.props.trigger
                .trim()
                .split(" ")
                .reduce(function (t, e) {
                  if ("manual" === e) return t;
                  if (_.props.target)
                    switch (e) {
                      case "mouseenter":
                        V("mouseover", D, t), V("mouseout", C, t);
                        break;
                      case "focus":
                        V("focusin", D, t), V("focusout", C, t);
                        break;
                      case "click":
                        V(e, D, t);
                    }
                  else
                    switch (
                      (V(e, X, t),
                      _.props.touchHold &&
                        (V("touchstart", X, t), V("touchend", P, t)),
                      e)
                    ) {
                      case "mouseenter":
                        V("mouseleave", P, t);
                        break;
                      case "focus":
                        V(u ? "focusout" : "blur", I, t);
                    }
                  return t;
                }, []);
            }
            function W() {
              h.forEach(function (t) {
                var e = t.eventType,
                  n = t.handler;
                _.reference.removeEventListener(e, n);
              });
            }
            function U() {
              _.state.isEnabled = !0;
            }
            function J() {
              _.state.isEnabled = !1;
            }
            function q() {
              clearTimeout(c), clearTimeout(l);
            }
            function K() {
              var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {};
              Oe(t, i);
              var e = _.props,
                n = Me(_.reference, r({}, _.props, t, { performance: !0 }));
              (n.performance = t.hasOwnProperty("performance")
                ? t.performance
                : e.performance),
                (_.props = n),
                (t.hasOwnProperty("trigger") ||
                  t.hasOwnProperty("touchHold")) &&
                  (W(), R()),
                t.hasOwnProperty("interactiveDebounce") &&
                  (Y(), (b = Te(L, t.interactiveDebounce))),
                ie(_.popper, e, n),
                (_.popperChildren = Vt(_.popper)),
                _.popperInstance &&
                  a.some(function (e) {
                    return t.hasOwnProperty(e);
                  }) &&
                  (_.popperInstance.destroy(),
                  (_.popperInstance = H()),
                  _.state.isVisible || _.popperInstance.disableEventListeners(),
                  _.props.followCursor && p && $(p));
            }
            function Z(t) {
              K({ content: t });
            }
            function G() {
              var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : Kt(_.props.duration, 0, i.duration[0]);
              if (
                !_.state.isDestroyed &&
                _.state.isEnabled &&
                (!Ye || _.props.touch)
              )
                return _.reference.isVirtual ||
                  document.documentElement.contains(_.reference)
                  ? void (
                      _.reference.hasAttribute("disabled") ||
                      (v
                        ? (v = !1)
                        : !1 !== _.props.onShow(_) &&
                          ((_.popper.style.visibility = "visible"),
                          (_.state.isVisible = !0),
                          jt(
                            [
                              _.popper,
                              _.popperChildren.tooltip,
                              _.popperChildren.backdrop,
                            ],
                            0
                          ),
                          E(function () {
                            _.state.isVisible &&
                              (z() || _.popperInstance.update(),
                              jt(
                                [
                                  _.popperChildren.tooltip,
                                  _.popperChildren.backdrop,
                                  _.popperChildren.content,
                                ],
                                t
                              ),
                              _.popperChildren.backdrop &&
                                (_.popperChildren.content.style.transitionDelay =
                                  Math.round(t / 6) + "ms"),
                              _.props.interactive &&
                                _.reference.classList.add("tippy-active"),
                              _.props.sticky && S(),
                              ge(
                                [
                                  _.popperChildren.tooltip,
                                  _.popperChildren.backdrop,
                                  _.popperChildren.content,
                                ],
                                "visible"
                              ),
                              N(t, function () {
                                0 === _.props.updateDuration &&
                                  _.popperChildren.tooltip.classList.add(
                                    "tippy-notransition"
                                  ),
                                  _.props.interactive &&
                                    ["focus", "click"].indexOf(s.type) > -1 &&
                                    ue(_.popper),
                                  _.reference.setAttribute(
                                    "aria-describedby",
                                    _.popper.id
                                  ),
                                  _.props.onShown(_),
                                  (_.state.isShown = !0);
                              }));
                          })))
                    )
                  : tt();
            }
            function Q() {
              var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : Kt(_.props.duration, 1, i.duration[1]);
              !_.state.isDestroyed &&
                _.state.isEnabled &&
                !1 !== _.props.onHide(_) &&
                (0 === _.props.updateDuration &&
                  _.popperChildren.tooltip.classList.remove(
                    "tippy-notransition"
                  ),
                _.props.interactive &&
                  _.reference.classList.remove("tippy-active"),
                (_.popper.style.visibility = "hidden"),
                (_.state.isVisible = !1),
                (_.state.isShown = !1),
                jt(
                  [
                    _.popperChildren.tooltip,
                    _.popperChildren.backdrop,
                    _.popperChildren.content,
                  ],
                  t
                ),
                ge(
                  [
                    _.popperChildren.tooltip,
                    _.popperChildren.backdrop,
                    _.popperChildren.content,
                  ],
                  "hidden"
                ),
                _.props.interactive &&
                  !v &&
                  ["focus", "click"].indexOf(s.type) > -1 &&
                  ("focus" === s.type && (v = !0), ue(_.reference)),
                A(t, function () {
                  d || O(),
                    _.reference.removeAttribute("aria-describedby"),
                    _.popperInstance.disableEventListeners(),
                    _.props.appendTo.removeChild(_.popper),
                    (_.state.isMounted = !1),
                    _.props.onHidden(_);
                }));
            }
            function tt(t) {
              _.state.isDestroyed ||
                (_.state.isMounted && Q(0),
                W(),
                _.reference.removeEventListener("click", x),
                delete _.reference.V,
                _.props.target &&
                  t &&
                  St(_.reference.querySelectorAll(_.props.target)).forEach(
                    function (t) {
                      return t.V && t.V.destroy();
                    }
                  ),
                _.popperInstance && _.popperInstance.destroy(),
                o && o.disconnect(),
                (_.state.isDestroyed = !0));
            }
          }
          var ze = !1;
          function Se(t, e, n) {
            Oe(e, i), ze || (Be(), (ze = !0));
            var o = r({}, i, e);
            Rt(t) && se(t);
            var a = Jt(t),
              s = a[0],
              p = (n && s ? [s] : a).reduce(function (t, e) {
                var n = e && Ee(e, o);
                return n && t.push(n), t;
              }, []);
            return {
              targets: t,
              props: o,
              instances: p,
              destroyAll: function () {
                this.instances.forEach(function (t) {
                  t.destroy();
                }),
                  (this.instances = []);
              },
            };
          }
          (Se.version = e),
            (Se.defaults = i),
            (Se.one = function (t, e) {
              return Se(t, e, !0).instances[0];
            }),
            (Se.setDefaults = function (t) {
              o(t), (Se.defaults = i);
            }),
            (Se.disableAnimations = function () {
              Se.setDefaults({
                duration: 0,
                updateDuration: 0,
                animateFill: !1,
              });
            }),
            (Se.hideAllPoppers = oe),
            (Se.useCapture = function () {});
          var Ae = function () {
            St(document.querySelectorAll("[data-tippy]")).forEach(function (t) {
              var e = t.getAttribute("data-tippy");
              e && Se(t, { content: e });
            });
          };
          return s && setTimeout(Ae), zt(t), Se;
        })();
      },
    },
    e = {};
  function n(r) {
    var i = e[r];
    if (void 0 !== i) return i.exports;
    var o = (e[r] = { exports: {} });
    return t[r].call(o.exports, o, o.exports, n), o.exports;
  }
  (n.n = (t) => {
    var e = t && t.R ? () => t.default : () => t;
    return n.d(e, { a: e }), e;
  }),
    (n.d = (t, e) => {
      for (var r in e)
        n.o(e, r) &&
          !n.o(t, r) &&
          Object.defineProperty(t, r, { enumerable: !0, get: e[r] });
    }),
    (n.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (t) {
        if ("object" == typeof window) return window;
      }
    })()),
    (n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (() => {
      var t = n(236),
        e = n.n(t),
        r = n(257),
        i = n.n(r),
        o = n(565),
        a = n.n(o),
        s = n(994),
        p = n.n(s);
      const c = {
          D(t, e) {
            return ["main", "sidedock"].includes(e)
              ? this.A(t) || this.W()
              : this.N(t);
          },
          W() {
            const t = l.U();
            return t && location.href.includes(t) ? location.href : null;
          },
          A(t) {
            if ("article" !== t.tagName.toLowerCase()) return null;
            const e = t.querySelector("a");
            return e && e.href;
          },
          N(t) {
            const e = p().H(t);
            return e && e.href;
          },
        },
        l = {
          D(t, e) {
            return ["main", "sidedock"].includes(e)
              ? this.S(t) ||
                  this.C(t) ||
                  this.J(t) ||
                  this.A(t) ||
                  this.q(e) ||
                  this.U(e)
              : this.N(t);
          },
          S(t) {
            const e = p().T(t);
            let n = e && e.className.match(/js-player_container_(\d+)/);
            return n && n[1];
          },
          A(t) {
            let e;
            if ("article" === t.tagName.toLowerCase()) e = t;
            else {
              let n,
                r = t;
              do {
                (r = r.parentElement.closest("article")),
                  r &&
                    1 === r.querySelectorAll("a[href]").length &&
                    (n = r.querySelector("a[href]"));
              } while (r && !n);
              if (!n) {
                let e = t;
                do {
                  (e = e.parentElement.closest("section")),
                    e &&
                      1 === e.querySelectorAll("article a[href]").length &&
                      (n = e.querySelector("article a[href]"));
                } while (e && !n);
              }
              n && (e = n.closest("article"));
            }
            const n = e && c.A(e);
            return n && this.K(n);
          },
          C(t) {
            let e,
              n = p().O(t);
            if (!n) return null;
            if (parseInt(n.id) == n.id) return n.id;
            if (((e = n.getAttribute("data-clip-id")), e)) return e;
            let r = a().C(t);
            return (
              (e = r && r.match(/vimeo\.com\/video\/(\d+)\/config/)), e && e[1]
            );
          },
          J(t) {
            let e = p().B(t),
              n = e && e.getAttribute("id").match(/clip_(\d+)/);
            return n && n[1];
          },
          K(t) {
            let e =
              t.match(/vimeo\.com\/(\d+)/) ||
              t.match(/vimeo\.com\/video\/(\d+)/) ||
              t.match(/vimeo\.com\/\channels\/\w+\/(\d+)/);
            return e && e[1];
          },
          U(t) {
            return "main" === t || p().T() || p().O()
              ? this.K(location.href)
              : null;
          },
          N(t) {
            let e;
            const n = c.N(t);
            return (e = n && n.match(/\/([0-9]+)/)), e && e[1];
          },
          q(t) {
            if (!location.href.includes("embed.vhx.tv")) return null;
            const e = i().L(t);
            let n = e && e.match(/player\.vimeo\.com\/video\/(\d+)\/config/);
            return n && n[1];
          },
        };
      var u = n(207),
        d = n.n(u),
        f = n(86),
        m = n.n(f),
        h = n(165),
        v = n.n(h);
      let b = null,
        w = null,
        g = null;
      function y(t) {
        b && t.target !== b && !b.contains(t.target) && _();
      }
      function _() {
        b &&
          (b.remove(),
          (b = null),
          (w = null),
          document.removeEventListener("click", y));
      }
      const x = {
          Z: function () {
            return !!b;
          },
          $: () => w,
          G: function (t) {
            const n = t.target;
            let r = document.body;
            const i = document.fullscreenElement,
              o = n.closest(".js-player-fullscreen");
            (g = n), i && o && i === o && (r = i);
            const a = document.createElement("div");
            a.id = "vime-popupMenu";
            const s = e()._(n, r),
              p = e().k(n);
            a.style.display = "block";
            let c = s.left - 190 + p.width;
            c < 10 && (c = 10),
              n.classList.contains("vime-feed-dl-btn") && (c = s.left),
              (a.style.left = c + "px"),
              (a.style.top = s.top + p.height + "px");
            const l = function (t) {
              t.stopPropagation();
            };
            a.addEventListener("click", l),
              a.addEventListener("mouseover", l),
              a.addEventListener("mouseup", l),
              a.addEventListener("mousedown", l),
              a.addEventListener("mouseout", l),
              document.removeEventListener("click", y),
              document.addEventListener("click", y);
            let u = this.tt(t);
            a.appendChild(u),
              r.appendChild(a),
              (w = n.dataset.popupId),
              (b = a);
          },
          et: _,
          nt: function (t) {
            const e = document.createElement("div");
            return (
              (e.className = "vime_badge_hd"),
              (e.textContent = "HD"),
              t && ((e.textContent = "UHD"), (e.style.width = "30px")),
              e
            );
          },
          rt: function (t) {
            const e = this,
              n = document.createElement(t.note ? "div" : "a");
            if (((n.className = "ext-menu-item"), t.note))
              (n.style.lineHeight = "22px"), (n.textContent = t.note);
            else {
              const r = document.createElement("span");
              if (
                ((r.className = "vmeo_title"),
                (r.textContent = t.title),
                t.quality && parseInt(t.quality) >= 720)
              ) {
                const n = parseInt(t.quality) >= 1440;
                r.appendChild(e.nt(n));
              }
              if (
                (n.appendChild(r), "file" === t.type || "stream" === t.type)
              ) {
                const e = document.createElement("span");
                (e.className = "vmeo_size"),
                  (e.textContent = t.fileSize || "???"),
                  n.appendChild(e);
              }
              n.addEventListener("click", function (e) {
                $.it(t, g, e);
              });
            }
            return n;
          },
          ot: function (t) {
            return (
              t.sort(function (t, e) {
                return parseInt(t.quality) > parseInt(e.quality)
                  ? -1
                  : parseInt(t.quality) === parseInt(e.quality)
                  ? 0
                  : 1;
              }),
              t
            );
          },
          tt: function (t) {
            const e = this;
            let n = t.links;
            const r = document.createDocumentFragment();
            if (n)
              (n = e.ot(n)),
                n.forEach(function (t) {
                  r.appendChild(e.rt(t));
                });
            else if (t.note) {
              const n = e.rt({ note: t.note });
              r.appendChild(n);
            }
            return r;
          },
          st: function (t) {
            if (!b) return;
            b.innerHTML = "";
            const e = this.tt(t);
            b.appendChild(e);
          },
        },
        k = {
          ct(t, e, n) {
            (n = n || function () {}),
              chrome.runtime.sendMessage(
                { action: "download_file", url: t, filename: e },
                n
              );
          },
          lt(t, e) {
            let n;
            chrome.runtime
              .sendMessage({ action: "download_parts", data: t })
              .then(function (t) {
                !chrome.runtime.lastError && t
                  ? t.start && t.process_id
                    ? (T.ut(e),
                      (n = function (r) {
                        "download_step" === r.action &&
                          r.process_id === t.process_id &&
                          (T.dt(e, r.details),
                          (r.details.done || r.details.failed) && L.ft(n));
                      }),
                      L.ht(n))
                    : t.downloading_now && T.vt(e)
                  : T.dt(e, { failed: !0 });
              });
          },
        },
        $ = {
          bt(t) {
            t.preventDefault(), t.stopPropagation();
            const n = this;
            if (
              !n.classList.contains("in_downloading") &&
              !n.classList.contains("error")
            ) {
              if (x.Z()) {
                let t = x.$();
                if ((x.et(), n.dataset.popupId === t)) return;
              }
              chrome.runtime.sendMessage(
                { action: "is_downloading_now" },
                function (t) {
                  if (t) return T.vt(n);
                  (n.dataset.popupId = e().$()),
                    chrome.runtime
                      .sendMessage({ action: "is_available_host" })
                      .then(function (t) {
                        if (t) {
                          let t = X.wt(n, n.dataset.type);
                          if (!t.video_id && !t.video_url)
                            return x.G({
                              target: n,
                              note: chrome.i18n.getMessage("no_links_found"),
                            });
                          const e = X.gt(t.video_id);
                          if (
                            (e
                              ? x.G({ target: n, links: e.links })
                              : x.G({
                                  target: n,
                                  note:
                                    chrome.i18n.getMessage("download") + " ...",
                                }),
                            e)
                          )
                            return;
                          (t = X.yt(n, n.dataset.type, t)),
                            X._t(t)
                              .then(function (t) {
                                x.st({ links: t.links });
                              })
                              .catch(function (t) {
                                if (t && 403 === t.error) return x.st(t);
                                x.st({
                                  note: chrome.i18n.getMessage(
                                    "no_links_found"
                                  ),
                                });
                              });
                        } else
                          x.G({
                            target: n,
                            note: chrome.i18n.getMessage("not_available_long"),
                          });
                      });
                }
              );
            }
          },
          it(t, e, n) {
            if ((n.preventDefault(), n.stopPropagation(), x.et(), t.url))
              k.ct(t.url, t.filename);
            else {
              const n = e.dataset.id || X.wt(e);
              k.lt({ video_id: n, ...t, ...X.xt(e, e.dataset.type, n) }, e);
            }
          },
        };
      var M = n(617),
        F = n.n(M);
      const T = {
          kt: "vime-dl-btn",
          $t(t, e, n) {
            const r = X.Mt(t, e);
            (r.video_id || r.video_url) &&
              ("main" === e
                ? this.Ft(t, r.video_id)
                : "sidedock" === e
                ? this.Tt(t, n, r.video_id)
                : this.Ot(t, r.video_id));
          },
          Tt(t, e, n) {
            if (
              (t =
                t.querySelector('[class*="sidedockInner"]') || t).querySelector(
                "." + this.kt
              )
            )
              return;
            let r;
            const i = chrome.i18n.getMessage("download") || "Download",
              o =
                '<metadata><?xpacket begin="\ufeff" id="W5M0MpCehiHzreSzNTczkc9d"?> <x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.6-c142 79.160924, 2017/07/13-01:06:39"> <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"> <rdf:Description rdf:about=""/> </rdf:RDF> </x:xmpmeta> <?xpacket end="w"?></metadata> <defs> <style> .cls-2 {fill: #fff;fill-rule: evenodd;}</style></defs> <path class="cls-2" d="M7,4V9H4l6,8,6-8H13V4H7Z"/> ';
            if (1 === e) {
              if (t.firstElementChild)
                try {
                  (r = t.firstElementChild.cloneNode(!0)),
                    r.classList.add(this.kt),
                    r.classList.add("vime_sidedock-style-1"),
                    (r.querySelector("label span").innerText = i),
                    r.querySelector("button").removeAttribute("aria-label"),
                    (r.querySelector("svg").innerHTML = o);
                } catch (t) {
                  r = null;
                }
            } else
              2 === e
                ? ((r = document.createElement("li")),
                  (r.className = this.kt + " clearfix vime_sidedock-style-2"),
                  (r.innerHTML = `<button type="button" class="ext_dl-button rounded-box"> \n<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18">${o}</svg>\n</button>\n<div class="tip_question">\n<div class="tooltip p_right">\n<p class="body">${i}</p>\n</div>\n</div>`))
                : 3 === e &&
                  ((t = t.querySelector("section")),
                  (r = document.createElement("div")),
                  (r.className = this.kt + " clearfix vime_sidedock-style-3"),
                  (r.innerHTML = `<label class="rounded-box ext_dl-label" role="presentation">\n<span>${i}</span>\n</label>\n<button type="button" class="ext_dl-button rounded-box"> \n<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18">${o}</svg>\n</button>`));
            r ||
              ((r = document.createElement("div")),
              (r.className = this.kt + " box vime_sidedock-style-" + e),
              (r.innerHTML = `<label class="rounded-box ext_dl-label" role="presentation">\n<span>${i}</span>\n</label>\n<button type="button" class="ext_dl-button rounded-box"> \n<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18">${o}</svg>\n</button>`)),
              (r.dataset.type = "sidedock"),
              (r.dataset.id = n),
              t.appendChild(r),
              r.addEventListener("click", $.bt);
          },
          Ft(t, e) {
            if (t.querySelector(`.${this.kt}`)) return;
            let n = document.createElement("button");
            (n.classList = `${this.kt} vime-style-2`),
              (n.dataset.type = "main"),
              (n.dataset.id = e),
              (n.innerHTML = `<span class="iris_btn-content">${chrome.i18n.getMessage(
                "download"
              )}</span>`),
              t.appendChild(n),
              n.addEventListener("click", $.bt);
          },
          Ot(t, e) {
            let n;
            if (
              (t.classList.contains("iris_link-box")
                ? (n = t.querySelector(".iris_thumbnail"))
                : t.classList.contains("contextclip-img-thumb")
                ? (n = t.parentNode)
                : t.href && (n = t),
              !n)
            )
              return;
            const r = document.createElement("i");
            (r.className = "vime-feed-dl-btn ext-type1-btn"),
              (r.dataset.type = "feed"),
              (r.dataset.id = e),
              r.addEventListener("click", $.bt),
              n.appendChild(r);
          },
          ut(t) {
            if (
              (t.classList.add("in_downloading"), "sidedock" === t.dataset.type)
            ) {
              const e = t.querySelector("button"),
                n = document.createElement("div");
              (n.className = "vime_percents"), (n.innerText = "0%");
              const r = e.querySelector("svg");
              r && (r.style.display = "none"), e.appendChild(n);
            } else
              "main" === t.dataset.type
                ? (t.firstElementChild.innerText = `${chrome.i18n.getMessage(
                    "downloading"
                  )}...`)
                : (t.innerText = "0%");
          },
          vt(t) {
            if ("sidedock" === t.dataset.type) {
              const e = t.querySelector("label");
              (e.innerText = chrome.i18n.getMessage(
                "wait_finish_another_downloading_process"
              )),
                (e.style.display = "flex");
              const n = this;
              setTimeout(function () {
                n.Yt(t);
              }, 3e3);
            } else {
              let e = F()(t, {
                content: chrome.i18n.getMessage(
                  "wait_finish_another_downloading_process"
                ),
              });
              const n = e && e.instances && e.instances[0];
              n && n.show && n.show(),
                setTimeout(function () {
                  e.destroyAll();
                }, 3e3);
            }
          },
          dt(t, e) {
            e.percents
              ? this.Xt(t, e.percents)
              : e.done
              ? this.Yt(t)
              : e.failed && this.Lt(t, e.e);
          },
          Xt(t, e) {
            if ("sidedock" === t.dataset.type) {
              t.querySelector("button .vime_percents").innerText = `${e}%`;
            } else
              "main" === t.dataset.type
                ? (t.firstElementChild.innerText = `${chrome.i18n.getMessage(
                    "downloading"
                  )}...  ${e}%`)
                : ((t.innerText = `${e}%`), (t.style.width = `${e}%`));
          },
          Lt(t, e = null) {
            let n = chrome.i18n.getMessage("error");
            if (
              ("network error" === e &&
                (n = chrome.i18n.getMessage("network_error")),
              "sidedock" === t.dataset.type)
            ) {
              const e = t.querySelector("label"),
                n = t.querySelector("button .vime_percents");
              e &&
                ((e.innerText = chrome.i18n.getMessage("error")),
                (e.style.display = "flex")),
                e && (e.innerText = chrome.i18n.getMessage("error")),
                n && n.remove();
              const r = t.querySelector("button svg");
              r && (r.style.display = "inline-flex");
            } else
              (t.innerText = chrome.i18n.getMessage("error")),
                t.classList.add("error");
            const r = this;
            setTimeout(function () {
              r.Yt(t);
            }, 3e3);
          },
          Yt(t) {
            if (document.body.contains(t))
              if (
                (t.classList.remove("in_downloading"),
                t.classList.remove("error"),
                "sidedock" === t.dataset.type)
              ) {
                const e = t.querySelector("button"),
                  n = t.querySelector("label"),
                  r = e.querySelector("svg"),
                  i = e.querySelector("button .vime_percents");
                n &&
                  ((n.style.display = "none"),
                  (n.innerText = chrome.i18n.getMessage("download"))),
                  i && i.remove(),
                  r && (r.style.display = "inline-flex");
              } else
                "main" === t.dataset.type
                  ? (t.innerText = chrome.i18n.getMessage("download"))
                  : ((t.innerText = ""), t.removeAttribute("style"));
          },
        },
        O = {
          Pt() {
            v().m({
              callback: function (t) {
                let e, n;
                e = t[0];
                for (let t = 0; (n = e.added[t]); t++) {
                  if (n.dataset.vmeo_skip) continue;
                  n.dataset.vmeo_skip = "1";
                  let t = n.closest(".iris_link-box");
                  T.$t(t, "feed");
                }
                e = t[1];
                for (let t = 0; (n = e.added[t]); t++)
                  n.dataset.vmeo_skip ||
                    ((n.dataset.vmeo_skip = "1"), T.$t(n, "feed"));
                e = t[2];
                for (let t = 0; (n = e.added[t]); t++)
                  n.dataset.vmeo_skip ||
                    ((n.dataset.vmeo_skip = "1"), T.$t(n, "main"));
                e = t[3];
                for (let t = 0; (n = e.added[t]); t++)
                  (n.dataset.vmeo_skip &&
                    n.dataset.u2 === window.location.href) ||
                    ((n.dataset.vmeo_skip = "1"), T.$t(n, "sidedock", 1));
                e = t[4];
                for (let t = 0; (n = e.added[t]); t++)
                  n.dataset.vmeo_skip > 0 ||
                    ((n.dataset.vmeo_skip = "1"), T.$t(n, "sidedock", 2));
                e = t[5];
                for (let t = 0; (n = e.added[t]); t++) {
                  if (n.dataset.vmeo_skip > 0) continue;
                  n.dataset.vmeo_skip = "1";
                  const t = n.parentElement.closest("article");
                  1 !== t.querySelectorAll("a").length ||
                    t.querySelectorAll("article.player").length > 1 ||
                    T.$t(t, "sidedock", 3);
                }
                e = t[6];
                for (let t = 0; (n = e.added[t]); t++)
                  n.dataset.vmeo_skip ||
                    ((n.dataset.vmeo_skip = "1"), T.$t(n, "feed"));
              },
              queries: [
                { css: ".iris_link-box .iris_thumbnail img", is: "added" },
                {
                  css: ".contextclip-items-wrapper article .contextclip-img-thumb",
                  is: "added",
                },
                { css: ".clip_info-subline--watch", is: "added" },
                { css: ".vp-sidedock", is: "added" },
                { css: "ul.sidedock", is: "added" },
                { css: "article section article.player", is: "added" },
                { css: 'li[id^="clip_"] a[href]', is: "added" },
              ],
            });
          },
          It() {
            document
              .querySelectorAll(
                ".vime-dl-btn:not([data-vmeo_cached]), .vime-feed-dl-btn:not([data-vmeo_cached])"
              )
              .forEach(function (t) {
                (t.dataset.vmeo_cached = "1"), X.Dt(t, t.dataset.type);
              });
          },
          Ct() {
            const t = [];
            return (
              document
                .querySelectorAll(".vime-feed-dl-btn")
                .forEach(function (e) {
                  e.dataset.id &&
                    !t.includes(e.dataset.id) &&
                    t.push(e.dataset.id);
                }),
              t
            );
          },
        },
        Y = {
          Bt: null,
          Ht() {
            const t = this;
            chrome.runtime.onConnect.addListener(function (e) {
              e.sender.id === chrome.runtime.id &&
                "port" === e.name &&
                ((t.Bt = e),
                t.Bt.onDisconnect.addListener(function () {
                  t.Bt = null;
                }),
                O.It(),
                t.Bt.postMessage({ video_list: X.Et() }));
            });
          },
          zt: function () {
            return !!this.Bt;
          },
          St: function (t) {
            this.Bt && this.Bt.postMessage({ video_list: [t] });
          },
        },
        X = {
          At: [],
          Nt: [],
          jt: {},
          wt: (t, e = null) => ({ video_id: l.D(t, e), video_url: c.D(t, e) }),
          Mt(t, e = null) {
            let n = this.wt(t, e);
            if (!this.Nt.length) {
              const t = this;
              setTimeout(function () {
                t.Vt();
              }, 500);
            }
            if (
              n.video_id &&
              (this.Nt.includes(n.video_id) ||
                (this.Nt.push(n.video_id), L.Rt(this.Nt.length)),
              Y.zt())
            ) {
              let r = this.Wt(t, e, n);
              r && Y.St(r);
            }
            return n;
          },
          yt: function (t, e, n) {
            return {
              ...n,
              config_url: a().D(t, e, n.video_id),
              config_json:
                n.video_id &&
                n.video_url &&
                n.video_url.includes(n.video_id) &&
                i().F(e, n.video_id),
            };
          },
          Dt: function (t, e) {
            let n = this.wt(t, e);
            n.video_id && this.Wt(t, e, n);
          },
          Wt(t, e, n) {
            if (
              !this.At.find(function (t) {
                return t.video_id === n.video_id;
              })
            ) {
              const r = { ...this.yt(t, e, n), ...this.xt(t, e, n.video_id) };
              return this.At.push(r), r;
            }
            return null;
          },
          xt: (t, e, n) => ({ title: m().D(t, e, n), thumb: d().D(t, e, n) }),
          Et() {
            return this.At;
          },
          gt(t) {
            return this.jt[t];
          },
          _t(t) {
            const n = this;
            return chrome.runtime
              .sendMessage({ action: "get_vimeo_links", ...t })
              .then(function (t) {
                return t && t.video_id && t.links
                  ? ((t.links = e().M(t.links)), (n.jt[t.video_id] = t), t)
                  : Promise.reject(t);
              });
          },
          Ut: function () {
            (this.At = []), (this.Nt = []);
          },
          Vt() {
            const t = this;
            O.Ct().forEach(function (e) {
              t.Nt.includes(e) || t.Nt.push(e);
            }),
              L.Rt(t.Nt.length);
          },
        },
        L = {
          Bt: null,
          Jt: function () {
            const t = this;
            (t.Bt = chrome.runtime.connect({ name: Math.random().toString() })),
              t.Bt.onDisconnect.addListener(function () {
                t.Jt();
              }),
              t.Bt.onMessage.addListener(function (t) {
                "url_changed" !== t || e().v() || X.Ut();
              });
          },
          Rt(t) {
            this.Bt.postMessage({ count: t });
          },
          ht(t) {
            this.Bt.onMessage.addListener(t);
          },
          ft(t) {
            this.Bt.onMessage.removeListener(t);
          },
        };
      let P = 1;
      let I, D, C, B, H;
      const E = window,
        z = () => {
          const t = Math.round(E[D] - E[C] * P) > 200,
            e = Math.round(E[B] - E[H] * P) > 200;
          (t || e) &&
            (clearInterval(I),
            chrome.runtime.sendMessage("found_best", function () {
              if (chrome.runtime.lastError) return !1;
            }));
        },
        S = function () {
          window.top === window &&
            (chrome.runtime.sendMessage("get_quality", function (t) {
              chrome.runtime.lastError ||
                ((I = setInterval(z, 3e3)), ([D, C, B, H, P] = t));
            }),
            chrome.runtime.onMessage.addListener(function (t) {
              if (chrome.runtime.lastError || !t) return !1;
              "all_resolutions" === t.action && (P = t.value);
            }));
        };
      e().v() &&
        location.href.includes("vimeo.com") &&
        /player\.vimeo\.com\/video\/\d+[\/?]/.test(location.href),
        L.Jt(),
        Y.Ht(),
        S(),
        O.Pt();
    })();
})();
