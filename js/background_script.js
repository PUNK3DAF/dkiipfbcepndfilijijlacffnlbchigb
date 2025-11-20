(() => {
  var t = {
      530: (t) => {
        t.exports = (function () {
          function t(t) {
            let n = {};
            return (
              t && ((n.currentWindow = t), (n.active = t)), chrome.tabs.query(n)
            );
          }
          return {
            _: t,
            h: function (t) {
              return chrome.tabs.query({ url: t }).then(function (t) {
                const n = [];
                return (
                  t.forEach(function (t) {
                    n.push(t.id);
                  }),
                  n
                );
              });
            },
            $: function () {
              return t(!0).then(function (t) {
                return t.length;
              });
            },
            g: function (t) {
              return chrome.tabs.get(t);
            },
          };
        })();
      },
      612: (t) => {
        t.exports = function (t, n) {
          const e = parseInt(n) > 0 ? n.toString() : "";
          chrome.action.setBadgeText({ tabId: t, text: e });
        };
      },
      648: (t, n, e) => {
        const r = e(334),
          i = e(143),
          o = e(689),
          u = e(940),
          c = e(178);
        t.exports = {
          S: {},
          T: {},
          I: function (t) {
            const n = this,
              e = {
                title: t.video.title,
                video_id: t.video.id,
                links_raw: {},
                master_play_list: null,
              };
            return n
              .A(t, e)
              .then(function () {
                return n.N(t, e);
              })
              .then(function () {
                return n.P(t, e);
              })
              .then(function () {
                return n.k(t, e);
              })
              .then(function () {
                (e.links = Object.values(e.links_raw)), delete e.links_raw;
              })
              .then(function () {
                return e;
              });
          },
          A: function (t, n) {
            return Promise.resolve()
              .then(function () {
                t.request.files.progressive &&
                  t.request.files.progressive.forEach(function (e) {
                    if (!e || !e.url || !e.mime) return;
                    if (!e.quality) return;
                    if (n.links_raw[e.quality]) return;
                    let r = e.url;
                    r.includes("source=1") && (r = r.replace(/source=1&?/, ""));
                    let i = e.mime.split("/")[1];
                    i ||
                      ((i = e.url.match(/\.(\w{2,4})(?:\?|#|$)/i)),
                      (i = (i && i[1]) || "mp4"));
                    let u = o.M(`${t.video.title}_${e.quality}.${i}`);
                    n.links_raw[e.quality] = {
                      type: c.O,
                      url: r,
                      quality: e.quality,
                      title: e.quality,
                      filename: u,
                    };
                  });
              })
              .catch(function (t) {});
          },
          N: (t, n) =>
            Promise.resolve()
              .then(function () {
                let e = null,
                  r = t.request.files;
                if (r.hls.captions) e = r.hls.captions;
                else if (
                  r.hls.cdns.default_cdn &&
                  r.hls.cdns[r.hls.cdns.default_cdn] &&
                  r.hls.cdns[r.hls.cdns.default_cdn].url
                )
                  e = r.hls.cdns[r.hls.cdns.default_cdn].url;
                else for (const [t, n] of Object.entries(r.hls.cdns)) e = n.url;
                n.master_play_list = e;
              })
              .catch(function (t) {}),
          D: function (t, n) {
            const e = this;
            return Promise.resolve()
              .then(function () {
                if (!n.master_play_list)
                  return Promise.reject("no master_play_list");
                const i = t.request.files,
                  u = i.dash.streams_avc || i.dash.streams;
                return e.L(n.master_play_list).then(function (i) {
                  let s = function (t) {
                    return t.audio || t.Original;
                  };
                  const f = i.url || n.master_play_list;
                  let a = i.media.AUDIO[c.R] || i.media.AUDIO[c.U];
                  a = a && s(a);
                  let _ = a && r.X(f, a.uri);
                  i.segments.forEach(function (a) {
                    const l = e.C(a.url),
                      d = u.find(function (t) {
                        return t.id.split("-")[0] === l;
                      });
                    if (!d) return;
                    if (
                      n.links.find(function (t) {
                        return t.quality === d.quality;
                      })
                    )
                      return;
                    const h = r.X(f, a.url);
                    let m = s(i.media.AUDIO[a.streamInf.audio]);
                    if (((_ = _ || r.X(f, m.uri)), !h || !_)) return;
                    let $ = o.M(`${t.video.title}_${d.quality}.mp4`),
                      p = {
                        type: c.F,
                        url: null,
                        video_m3u_url: h,
                        audio_m3u_url: _,
                        quality: d.quality,
                        title: d.quality,
                        id: e.C(a.url),
                        filename: $,
                      };
                    n.links.push(p);
                  });
                });
              })
              .catch(function (t) {});
          },
          P(t, n) {
            const e = this;
            return Promise.resolve()
              .then(async function () {
                const r = t.request.files.dash.cdns,
                  i = t.request.files.dash.default_cdn;
                let u = null;
                if (
                  ((u =
                    i && r[i]
                      ? r[i]
                      : r.akfire_interconnect_quic ||
                        r.fastly_skyfire ||
                        r.google_mediacdn),
                  !u)
                )
                  return Promise.reject("no cdn");
                const s = u.av1_url || u.url || u.avc_url;
                if (!s) return Promise.reject("no jsonUrl");
                const f = /\/audio\//.test(s),
                  a = /\/v2\/playlist\//.test(s);
                let _ = s.replace(/\/sep\/.+/, "/"),
                  l = null,
                  d = c.O;
                if (f) {
                  let t = s.match(/\/audio\/(\w+)/);
                  if (((t = t && t[1]), !t))
                    return Promise.reject("no audioId");
                  (d = c.F), (l = `${_}parcel/audio/${t}.mp4`);
                } else if (a) {
                  _ = s.replace(/\/v2\/playlist\/.*/, "") + "/";
                  let t = await e.B(s).catch((t) => {});
                  if (!t) return Promise.reject("no audioId");
                  (l = `${_}parcel/audio/${t}.mp4`), (d = c.F);
                } else _ = s.replace(/\/video\/.*/, "") + "/";
                (
                  t.request.files.dash.streams_av1 ||
                  t.request.files.dash.streams ||
                  t.request.files.dash.streams_avc
                ).forEach(function (e) {
                  if (!e.quality || !e.id) return;
                  if (n.links_raw[e.quality]) return;
                  const r = e.id.replace(/-.+/, "");
                  let i = null,
                    u = null;
                  f || a
                    ? (u = `${_}parcel/video/${r}.mp4`)
                    : (i = `${_}parcel/video/${r}.mp4`);
                  const c = o.M(`${t.video.title}_${e.quality}.mp4`);
                  n.links_raw[e.quality] = {
                    type: d,
                    id: r,
                    url: i,
                    video_url: u,
                    audio_url: l,
                    quality: e.quality,
                    title: e.quality,
                    filename: c,
                  };
                });
              })
              .catch(function (t) {});
          },
          B: (t) =>
            i.j(t).then((n) =>
              n.audio
                ? (n.audio.sort(function (t, n) {
                    return parseInt(t.bitrate) > parseInt(n.bitrate)
                      ? -1
                      : parseInt(t.bitrate) === parseInt(n.bitrate)
                      ? 0
                      : 1;
                  }),
                  n.audio[0].id)
                : Promise.reject(`no audio in json ${t}`)
            ),
          k: (t, n) =>
            Promise.resolve()
              .then(function () {
                t.request.text_tracks &&
                  t.request.text_tracks.forEach(function (e) {
                    if (!e || !e.url) return;
                    let r = e.url;
                    "/" === r.substring(0, 1) && (r = c.q + r);
                    let i = e.url.match(/\.(\w{2,4})(?:\?|#|$)/i);
                    (i = i && i[1]), (i = i || "srt");
                    let u = `${e.label ? e.label.replace(/\s.*/, "") : "???"} ${
                        c.G
                      }`,
                      s = o.M(`${t.video.title} ${u}.${i}`);
                    n.links_raw[u] = {
                      type: c.G,
                      title: u,
                      url: r,
                      filename: s,
                    };
                  });
              })
              .catch(function (t) {}),
          H(t) {
            if (!t.allow_downloads)
              return Promise.reject("downloads_not_allowed");
            const n = [];
            return Promise.resolve().then(function () {
              return (
                t.files.forEach(function (t) {
                  t.download_url &&
                    n.push({
                      type: c.O,
                      quality: t.height
                        ? `${t.height}p`
                        : t.public_name
                        ? t.public_name
                        : null,
                      title: t.height
                        ? `${t.height}p`
                        : t.public_name
                        ? t.public_name
                        : null,
                      fileSize: t.size_bytes,
                      url: t.download_url,
                      filename: t.download_name,
                    });
                }),
                t.text_tracks &&
                  t.text_tracks.forEach(function (e) {
                    if (!e.download_url) return;
                    let r = `${
                        e.display_name ? e.display_name.replace(/\s.*/, "") : ""
                      } ${c.G}`,
                      i = e.download_url.match(/\.(\w{2,4})(?:\?|#|$)/i);
                    (i = i && i[1]), (i = i || c.V);
                    let u = o.M(
                      `${
                        (t.source_file && t.source_file.base_file_name) || ""
                      } ${r}.${i}`
                    );
                    n.push({
                      type: c.O,
                      title: r,
                      url: e.download_url,
                      filename: u,
                    });
                  }),
                (n.length && n) || Promise.reject()
              );
            });
          },
          Y(t, n = 0) {
            const e = this;
            return Promise.resolve().then(function () {
              if (!t[n]) return;
              const i = t[n];
              return Promise.resolve()
                .then(function () {
                  return i.type === c.O
                    ? e.K(i)
                    : i.type === c.F
                    ? e.J(i)
                    : Promise.reject("subtitles file");
                })
                .then(function (t) {
                  i.fileSize = r.W(t, 0);
                  if (i.type === c.F) {
                    const minValidBytes = 100 * 1024; // 100 KB
                    if (!t || t < minValidBytes) {
                      // server je verovatno vratio HTML grešku / mali body (403/404).
                      i.fileSize = "???";
                      i.fileSizeBytes = null;
                    } else {
                      i.fileSize = "~ " + i.fileSize;
                      i.fileSizeBytes = t;
                    }
                  }
                })
                .catch(function (t) {})
                .finally(function () {
                  return n++, e.Y(t, n);
                });
            });
          },
          K: function (t) {
            return Promise.resolve().then(function () {
              return t.fileSize || i.Z(t.url);
            });
          },
          J: function (t) {
            return Promise.all([
              this.tt(t.video_url),
              this.tt(t.audio_url),
            ]).then(function (t) {
              let [n, e] = t;
              return n + e;
            });
          },
          tt(t) {
            const n = this;
            return Promise.resolve()
              .then(function () {
                return n.S[t] || i.Z(t);
              })
              .then(function (e) {
                return (n.S[t] = e), e;
              });
          },
          C: function (t) {
            let n = t.split("/");
            for (let t = 0; t < n.length; t++) if (n[t].length > 2) return n[t];
          },
          nt(t) {
            const n = this;
            return Promise.resolve().then(function () {
              return (
                n.T[t] ||
                n.L(t).then(function (e) {
                  return e && e.segments
                    ? ((n.T[t] = e.segments), e.segments)
                    : Promise.reject();
                })
              );
            });
          },
          L: function (t) {
            return i.et(t).then(function (n) {
              if (!n.includes(c.rt))
                return Promise.reject("NO #EXTM3U in " + t);
              let e = new u();
              return e.read(n), e.getResult();
            });
          },
        };
      },
      115: (t, n, e) => {
        const r = e(143),
          i = e(178);
        t.exports = {
          it: [],
          ot: {},
          ut: function () {
            const t = this;
            chrome.webRequest.onResponseStarted.addListener(
              function (n) {
                if (!n || n.tabId < 0) return !1;
                let e = n.url.match(i.ct);
                (e = e && e[1]), e && t.st(e, n.url);
              },
              { urls: [i.ft], types: ["xmlhttprequest"] },
              ["responseHeaders"]
            ),
              chrome.tabs.onRemoved.addListener(function (n) {
                const e = t.it.indexOf(n);
                e > -1 && t.it.splice(e, 1);
              });
          },
          _t: function (t) {
            const n = this,
              e = t.video_id;
            return e
              ? ((n.ot[e] = n.ot[e] || {}),
                Promise.resolve().then(function () {
                  return n.ot[e].config_json && n.ot[e].expire_time < Date.now()
                    ? n.ot[e].config_json
                    : Promise.resolve()
                        .then(function () {
                          return t.config_url ? t.config_url : n.lt(e);
                        })
                        .then(function (t) {
                          return (n.ot[e].config_url = t), r.j(t);
                        })
                        .then(function (t) {
                          return n.dt(e, t), t;
                        });
                }))
              : this.ht(t.video_url);
          },
          ht: function (t) {
            const n = this;
            let e;
            return Promise.resolve()
              .then(function () {
                return r.$t(t);
              })
              .then(function (t) {
                return (
                  (e = t.match(i.ct)), (e = e && e[1]), e && n.st(e, t), r.j(t)
                );
              })
              .then(function (t) {
                return e && n.dt(e, t), t;
              });
          },
          lt(t) {
            return this.ot[t].config_url || r.gt(t);
          },
          st(t, n) {
            (this.ot[t] = this.ot[t] || {}), (this.ot[t].config_url = n);
          },
          dt(t, n) {
            (this.ot[t] = this.ot[t] || {}),
              (this.ot[t].config_json = n),
              (this.ot[t].expire_time = Date.now() + 18e5);
          },
        };
      },
      689: (t) => {
        t.exports = (function () {
          let t = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            n = /[\/\?<>\\:\*\|"~]/g,
            e = /[\x00-\x1f\x80-\x9f]/g,
            r = /^\.+/,
            i = /^(.+)\.([a-z0-9]{1,4})$/i,
            o =
              "nbsp,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,times,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,divide,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml".split(
                ","
              ),
            u = [
              ["amp", "quot", "lt", "gt"],
              [38, 34, 60, 62],
            ],
            c = /&([^;]{2,6});/g,
            s = /\r?\n/g,
            f = /[\*\?"]/g,
            a = /</g,
            _ = />/g,
            l = /[\s\t\uFEFF\xA0]+/g,
            d = /(\.|!|\?|_|,|\-|:|\+){2,}/g,
            h = /[\.,:;\/\-_\+=']$/g;
          return {
            M: function (m) {
              if (!m) return "";
              m = (function (t) {
                const n = /\\(\\u[0-9a-f]{4})/g;
                try {
                  return JSON.parse(JSON.stringify(t).replace(n, "$1"));
                } catch (n) {
                  return t;
                }
              })(m);
              try {
                m = decodeURIComponent(m);
              } catch (t) {
                m = unescape(m);
              }
              if (
                (m = (m = (function (n) {
                  return n.replace(t, "");
                })(
                  (m = (m = m.replace(c, function (t, n) {
                    let e = null;
                    if ("#" === n[0])
                      return (
                        (e = parseInt(n.substr(1))),
                        isNaN(e) ? "" : String.fromCharCode(e)
                      );
                    let r = u[0].indexOf(n);
                    return -1 !== r
                      ? ((e = u[1][r]), String.fromCharCode(e))
                      : ((r = o.indexOf(n)),
                        -1 !== r
                          ? ((e = r + 160), String.fromCharCode(e))
                          : "");
                  })).replace(s, " "))
                ))
                  .replace(f, "")
                  .replace(a, "(")
                  .replace(_, ")")
                  .replace(l, " ")
                  .replace(d, "$1")
                  .replace(n, "_")
                  .replace(e, "")
                  .replace(r, "")
                  .replace(h, "")).length <= this.maxLength
              )
                return m;
              const $ = (function (t) {
                return t.match(i);
              })(m);
              return $ && 3 == $.length
                ? (($[1] = $[1].substr(0, this.maxLength)), $[1] + "." + $[2])
                : m;
            },
          };
        })();
      },
      143: (t, n, e) => {
        const r = e(334);
        t.exports = {
          j: function (t, n = {}) {
            return fetch(t, n).then((t) => t.json());
          },
          et: function (t, n = {}) {
            return (n = n || {}), fetch(t, n).then((t) => t.text());
          },
          gt: function (t) {
            if (!t) return Promise.reject();
            const n = `https://vimeo.com/${t}`;
            return this.$t(n).catch(function () {
              return `https://player.vimeo.com/video/${t}/config`;
            });
          },
          $t: function (t) {
            return t
              ? this.et(t).then(function (t) {
                  const n = r.vt(t).find(function (t) {
                    return t.config_url;
                  });
                  let e = n && n.config_url;
                  return (
                    e ||
                      ((e = t.match(/"config_url":\s*("[^"]+")/)),
                      (e = e && JSON.parse(e[1]))),
                    e || Promise.reject()
                  );
                })
              : Promise.reject();
          },
          yt: function (t) {
            const n = `https://vimeo.com/${t}?action=load_download_config`;
            return this.j(n, {
              headers: { "x-requested-with": "XMLHttpRequest" },
            });
          },
          Z: function (t) {
            const n = this;
            return fetch(t, { method: "HEAD" }).then((e) =>
              200 === e.status
                ? parseInt(e.headers.get("content-length"))
                : n.Et(t)
            );
          },
          Et: (t) =>
            new Promise(async function (n) {
              const e = new AbortController(),
                r = e.signal;
              let i = await fetch(t, { signal: r });
              const o = parseInt(i.headers.get("content-length"));
              e.abort(), n(o);
            }),
        };
      },
      511: (t, n, e) => {
        const r = e(331);
        t.exports = {
          St: !1,
          Tt: null,
          It: null,
          bt: !1,
          At: null,
          Nt: null,
          Pt: null,
          kt: null,
          Mt: 0,
          Ot(t, n, e) {
            const r = this;
            if (r.St) return e({ downloading_now: !0 });
            (r.kt = t),
              (r.It = Math.random()),
              (r.St = !0),
              n.tab ? (r.Tt = n.tab.id) : (r.bt = !0),
              chrome.runtime
                .getContexts({})
                .then(function (t) {
                  return t.find((t) => "OFFSCREEN_DOCUMENT" === t.contextType);
                })
                .then(function (t) {
                  if (!t)
                    return chrome.offscreen.createDocument({
                      url: "offscreen.html",
                      reasons: ["BLOBS", "WORKERS"],
                      justification:
                        "Starting ffmpeg js library in worker, and creating blob url from arrayBuffer video data",
                    });
                })
                .then(function () {
                  chrome.runtime.sendMessage({
                    action: "start",
                    target: "offscreen",
                    process_id: r.It,
                    data: t,
                  });
                })
                .then(function () {
                  return r.Dt(), e({ start: !0, process_id: r.It }), r.Lt();
                })
                .finally(function () {
                  r.wt();
                })
                .catch(function (t) {
                  e(null);
                });
          },
          Rt(t) {
            t(
              this.St && { ...this.kt, process_id: this.It, percents: this.Mt }
            );
          },
          Dt() {
            const t = this;
            (t.Nt = function (n) {
              n.sender.id === chrome.runtime.id &&
                0 === n.name.indexOf("popup") &&
                ((t.At = n),
                t.At.onDisconnect.addListener(function (n) {
                  t.At = null;
                }));
            }),
              chrome.runtime.onConnect.addListener(t.Nt);
          },
          Lt() {
            const t = this;
            return new Promise(function (n) {
              (t.Pt = function (e) {
                e.sender.id === chrome.runtime.id &&
                  0 === e.name.indexOf("offscreen") &&
                  e.onMessage.addListener(function (e, r) {
                    "download_step" === e.action &&
                      ((t.Mt = e.details.percents),
                      t.Ut(e),
                      t.Tt && t.Xt(e),
                      (e.details.failed || e.details.done) && n());
                  });
              }),
                chrome.runtime.onConnect.addListener(t.Pt);
            });
          },
          Xt(t) {
            r.Ct(this.Tt, t);
          },
          Ut(t) {
            this.At && this.At.postMessage(t);
          },
          wt() {
            chrome.offscreen.closeDocument(),
              this.Nt && chrome.runtime.onConnect.removeListener(this.Nt),
              this.Pt && chrome.runtime.onConnect.removeListener(this.Pt),
              (this.Nt = null),
              (this.St = !1),
              (this.Tt = null),
              (this.bt = !1),
              (this.At = null),
              (this.kt = null),
              (this.Mt = 0);
          },
        };
      },
      331: (t, n, e) => {
        const r = e(612);
        t.exports = {
          Ft: {},
          xt: function () {
            const t = this;
            chrome.runtime.onConnect.addListener(function (n) {
              if (n.sender.id !== chrome.runtime.id || !n.sender.tab) return;
              const e = n.sender.tab.id;
              (t.Ft[e] = t.Ft[e] || {}),
                (t.Ft[e][n.name] = n),
                n.onDisconnect.addListener(function (n) {
                  delete t.Ft[e][n.name],
                    0 === Object.keys(t.Ft[e]).length && delete t.Ft[e];
                }),
                n.onMessage.addListener(function (t, n) {
                  t.count && r(e, t.count);
                });
            });
          },
          Bt: function (t) {
            return this.Ft[t] && Object.keys(this.Ft[t]).length > 0;
          },
          Ct(t, n) {
            if (this.Ft[t])
              for (let e in this.Ft[t]) this.Ft[t][e].postMessage(n);
          },
        };
      },
      334: (t) => {
        t.exports = {
          jt: function (t) {
            t.url &&
              -1 === t.url.indexOf("vimeo.com") &&
              chrome.tabs.create({ url: "https://vimeo.com/" });
          },
          qt: function (t, n, e) {
            let r = { url: t, filename: n };
            chrome.downloads.download(r, function (n) {
              chrome.runtime.lastError || !n
                ? chrome.downloads.download({ url: t }, function () {
                    chrome.runtime.lastError || !n
                      ? e({ success: !1 })
                      : e({ success: !0 });
                  })
                : e({ success: !0 });
            });
          },
          vt: function (t, n) {
            n && !Array.isArray(n) && (n = [n]);
            const e = [],
              r = { "{": 0, "[": 0 },
              i = { "}": "{", "]": "[" },
              o = /[{}\]\[":0-9.,-]/,
              u = /[\r\n\s\t]/;
            let c = "";
            for (let n, s = 0; (n = t[s]); s++)
              if ('"' !== n)
                o.test(n)
                  ? ((c += n),
                    "{" === n || "[" === n
                      ? (r["{"] || r["["] || (c = n), r[n]++)
                      : ("}" !== n && "]" !== n) ||
                        (r[i[n]]--, r["{"] || r["["] || e.push(c)))
                  : "t" === n && "true" === t.substr(s, 4)
                  ? ((c += "true"), (s += 3))
                  : "f" === n && "false" === t.substr(s, 5)
                  ? ((c += "false"), (s += 4))
                  : "n" === n && "null" === t.substr(s, 4)
                  ? ((c += "null"), (s += 3))
                  : u.test(n) || ((r["{"] = 0), (r["["] = 0), (c = ""));
              else {
                let n = s;
                for (; -1 !== n && (n === s || "\\" === t[n - 1]); )
                  n = t.indexOf('"', n + 1);
                -1 === n && (n = t.length - 1),
                  (c += t.substr(s, n - s + 1)),
                  (s = n);
              }
            const s = [];
            for (let t, r = 0; (t = e[r]); r++)
              if ("{}" !== t && "[]" !== t)
                try {
                  n
                    ? n.every(function (n) {
                        return n.test(t);
                      }) && s.push(JSON.parse(t))
                    : s.push(JSON.parse(t));
                } catch (t) {}
            return s;
          },
          X: function (t, n) {
            if (!t) return !1;
            (t = t.substring(0, t.lastIndexOf("?"))).lastIndexOf("/") + 1 ===
              t.length && (t = t.substring(0, t.length - 1)),
              (t = t.substring(0, t.lastIndexOf("/")));
            let e = (n.match(/\.\.\//g) || []).length;
            for (let r = 0; r < e; r++)
              (t = t.substring(0, t.lastIndexOf("/"))),
                (n = n.substring(3, n.length));
            return (t + "/" + n).replaceAll("&amp;", "&");
          },
          W: function (t, n = 2) {
            if (!+t) return "0 Bytes";
            let e = n < 0 ? 0 : n;
            0 === e && t > 1073741824 && (e = 1);
            const r = Math.floor(Math.log(t) / Math.log(1024));
            return `${parseFloat((t / Math.pow(1024, r)).toFixed(e))} ${
              ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][r]
            }`;
          },
        };
      },
      178: (t) => {
        t.exports = {
          Gt: 3,
          U: "audio-high",
          O: "file",
          q: "https://vimeo.com",
          Ht: ["frontendsimplified.com"],
          Vt: 1,
          R: "audio-6ch",
          rt: "#EXTM3U",
          Yt: "in",
          F: "stream",
          ct: /player\.vimeo\.com\/video\/(\d+)\/config/i,
          zt: /vimeo\.com\/(\d+)\//,
          V: "srt",
          ft: "https://player.vimeo.com/video/*",
          G: "subtitles",
          Kt: "lt",
          Jt: ["favorite_videos", "user_rate"],
          Wt: "t",
          Qt: 8,
          Zt: 9,
          tn: 6,
          nn: "vimeo.com",
          en: "https://periodic.virtualstatist.com/uid.json",
        };
      },
      940: (t, n, e) => {
        e.r(n), e.d(n, { default: () => r });
        const r = (function (t) {
          var n = {};
          function e(r) {
            if (n[r]) return n[r].exports;
            var i = (n[r] = { i: r, l: !1, exports: {} });
            return t[r].call(i.exports, i, i.exports, e), (i.l = !0), i.exports;
          }
          return (
            (e.m = t),
            (e.c = n),
            (e.d = function (t, n, r) {
              e.o(t, n) ||
                Object.defineProperty(t, n, { enumerable: !0, get: r });
            }),
            (e.r = function (t) {
              "undefined" != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(t, Symbol.toStringTag, {
                  value: "Module",
                }),
                Object.defineProperty(t, "rn", { value: !0 });
            }),
            (e.t = function (t, n) {
              if ((1 & n && (t = e(t)), 8 & n)) return t;
              if (4 & n && "object" == typeof t && t && t.rn) return t;
              var r = Object.create(null);
              if (
                (e.r(r),
                Object.defineProperty(r, "default", {
                  enumerable: !0,
                  value: t,
                }),
                2 & n && "string" != typeof t)
              )
                for (var i in t)
                  e.d(
                    r,
                    i,
                    function (n) {
                      return t[n];
                    }.bind(null, i)
                  );
              return r;
            }),
            (e.n = function (t) {
              var n =
                t && t.rn
                  ? function () {
                      return t.default;
                    }
                  : function () {
                      return t;
                    };
              return e.d(n, "a", n), n;
            }),
            (e.o = function (t, n) {
              return Object.prototype.hasOwnProperty.call(t, n);
            }),
            (e.p = ""),
            e((e.s = 6))
          );
        })([
          function (t, n, e) {
            var r = e(1),
              i = /\"/g,
              o = e(3),
              u = { YES: !0, NO: !1 };
            function c(t) {
              return t in u ? u[t] : t;
            }
            t.exports = function (t) {
              for (
                var n =
                    arguments.length > 1 &&
                    void 0 !== arguments[1] &&
                    arguments[1],
                  e = "",
                  u = "",
                  s = arguments[2] || {},
                  f = 0;
                f < t.length;
                f++
              )
                switch (t[f].charCodeAt(0)) {
                  case r.SPACE:
                    e = "";
                    continue;
                  case r.EQUAL:
                    (u = e), (e = "");
                    continue;
                  case r.COMMA:
                    (u = o(u)) && (s[u] = n ? c(e) : e), (u = ""), (e = "");
                    continue;
                  case r.QUOTE:
                    i.lastIndex = f + 1;
                    var a = i.exec(t),
                      _ = t.slice(f + 1, a.index);
                    u && (s[o(u)] = _), (f = a.index + 1);
                    continue;
                  default:
                    e += t[f];
                }
              return e && u && (s[o(u)] = e), s;
            };
          },
          function (t, n, e) {
            t.exports = {
              SPACE: " ".charCodeAt(0),
              COLON: ":".charCodeAt(0),
              COMMA: ",".charCodeAt(0),
              EQUAL: "=".charCodeAt(0),
              QUOTE: '"'.charCodeAt(0),
              MINUS: "-".charCodeAt(0),
              PERIOD: ".".charCodeAt(0),
              NEW_LINE_LF: "\n".charCodeAt(0),
              NEW_LINE_CR: "\r".charCodeAt(0),
              BACK_SLASH: "\\".charCodeAt(0),
              HASH: "#".charCodeAt(0),
              AT: "@".charCodeAt(0),
              NUMBER_START: "0".charCodeAt(0),
              NUMBER_STOP: "9".charCodeAt(0),
            };
          },
          function (t, n, e) {
            t.exports = {
              BASIC: "BASIC",
              MEDIA_SEGMENT: "MEDIA_SEGMENT",
              MEDIA_PLAYLIST: "MEDIA_PLAYLIST",
              MASTER_PLAYLIST: "MASTER_PLAYLIST",
              TRALING_MEDIA_SEGMENT: "TRAILING_MEDIA_SEGMENT",
              URL_SEGMENT_ENDING: "URL_SEGMENT_ENDING",
              GROUPING: "GROUPING",
            };
          },
          function (t, n, e) {
            var r = e(1);
            t.exports = function (t) {
              var n = "";
              t = t.toLowerCase();
              for (var e = 0; e < t.length; e++)
                t[e].charCodeAt(0) !== r.MINUS
                  ? (n += t[e])
                  : (n += (t[++e] || "").toUpperCase());
              return n;
            };
          },
          function (t, n, e) {
            t.exports = function (t) {
              var n = { length: 0, offset: 0 };
              n.length = parseInt(t);
              var e = t.lastIndexOf("@");
              return ~e && (n.offset = parseInt(t.slice(e + 1))), n;
            };
          },
          function (t, n, e) {
            t.exports = function (t) {
              var n = new Date(t.trim());
              return isNaN(n.getTime()), n;
            };
          },
          function (t, n, e) {
            var r = (function () {
                function t(t, n) {
                  for (var e = 0; e < n.length; e++) {
                    var r = n[e];
                    (r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      "value" in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r);
                  }
                }
                return function (n, e, r) {
                  return e && t(n.prototype, e), r && t(n, r), n;
                };
              })(),
              i = e(2),
              o = (e(1), e(7)),
              u = (function () {
                function t() {
                  !(function (t, n) {
                    if (!(t instanceof n))
                      throw new TypeError("Cannot call a class as a function");
                  })(this, t),
                    this.reset();
                }
                return (
                  r(t, [
                    {
                      key: "read",
                      value: function (t) {
                        var n = t.length;
                        t = t.trim();
                        for (
                          var e = "",
                            r = !1,
                            i = !1,
                            o = 0,
                            u = 0,
                            c = 0,
                            s = "",
                            f = 0;
                          f < n;
                          f++
                        )
                          (o =
                            ((o =
                              ((u = t.indexOf("\n", f)) > -1 && u) ||
                              t.indexOf("\r", f)) > -1 &&
                              o) ||
                            n),
                            (s = t.slice(f, o).trim()),
                            (f = o),
                            (i = "#" === s[0]),
                            (c =
                              ((r = "#EXT" === s.slice(0, 4)) &&
                                s.indexOf(":")) ||
                              -1),
                            !(e = r && ~c && s.slice(0, c)) && i && (e = s),
                            this.invokeParser(e, s.slice(c + 1), i);
                      },
                    },
                    {
                      key: "invokeParser",
                      value: function (t, n, e) {
                        if (t && n) {
                          var r = o.get(t);
                          return r
                            ? this.dataScope(r, r.parser(n, this.result))
                            : void 0;
                        }
                        if ((!n || !e) && n) {
                          var i = o.get("URL");
                          this.dataScope(i, i.parser(n, this.result));
                        }
                      },
                    },
                    {
                      key: "dataScope",
                      value: function (t, n) {
                        switch (t.scope) {
                          case i.MASTER_PLAYLIST:
                            this.currentSegmentData.isMasterPlaylist = !0;
                          case i.MEDIA_SEGMENT:
                            this.currentSegmentData[t.key] = n;
                            break;
                          case i.URL_SEGMENT_ENDING:
                            (this.currentSegmentData[t.key] = n),
                              this.result.segments.push(
                                this.currentSegmentData
                              ),
                              (this.currentSegmentData = Object.assign(
                                {},
                                this.trailingData
                              ));
                            break;
                          case i.TRALING_MEDIA_SEGMENT:
                            (this.trailingData[t.key] = n),
                              (this.currentSegmentData = Object.assign(
                                this.currentSegmentData,
                                this.trailingData
                              ));
                            break;
                          case i.MEDIA_PLAYLIST:
                          case i.BASIC:
                            this.result[t.key] = n;
                            break;
                          case i.GROUPING:
                            this.result[t.group.root] ||
                              (this.result[t.group.root] = {});
                            for (
                              var e = "",
                                r = this.result[t.group.root],
                                o = t.group.path.length,
                                u = 0;
                              u < o - 1;
                              u++
                            )
                              r[n[(e = t.group.path[u])]] || (r[n[e]] = {}),
                                (r = r[n[e]]);
                            r[n[t.group.path[o - 1]]] = n;
                        }
                      },
                    },
                    {
                      key: "getResult",
                      value: function () {
                        return this.result;
                      },
                    },
                    {
                      key: "reset",
                      value: function () {
                        (this.trailingData = {}),
                          (this.currentSegmentData = {}),
                          (this.result = { isExtendedM3U: !1, segments: [] });
                      },
                    },
                  ]),
                  t
                );
              })();
            t.exports = u;
          },
          function (t, n, e) {
            var r = e(8),
              i = e(9),
              o = e(4),
              u = e(10),
              c = e(11),
              s = e(12),
              f = e(13),
              a = e(14),
              _ = e(15),
              l = e(16),
              d = e(17),
              h = e(18),
              m = e(19),
              $ = e(20),
              p = e(21),
              g = e(22),
              v = e(23),
              y = e(2),
              E = {
                "#EXTM3U": {
                  key: "isExtendedM3U",
                  parser: function () {
                    return !0;
                  },
                  scope: y.BASIC,
                },
                "#EXT-X-VERSION": { key: "version", parser: i, scope: y.BASIC },
                "#EXTINF": { key: "inf", parser: r, scope: y.MEDIA_SEGMENT },
                "#EXT-X-BYTERANGE": {
                  key: "byteRange",
                  parser: o,
                  scope: y.MEDIA_SEGMENT,
                },
                "#EXT-X-DISCONTINUITY": {
                  key: "discontinuity",
                  parser: u,
                  scope: y.MEDIA_SEGMENT,
                },
                "#EXT-X-KEY": {
                  key: "key",
                  parser: c,
                  scope: y.TRALING_MEDIA_SEGMENT,
                },
                "#EXT-X-MAP": {
                  key: "map",
                  parser: s,
                  scope: y.TRALING_MEDIA_SEGMENT,
                },
                "#EXT-X-PROGRAM-DATE-TIME": {
                  key: "programDateTime",
                  parser: f,
                  scope: y.MEDIA_SEGMENT,
                },
                "#EXT-X-DATERANGE": {
                  key: "dateRange",
                  parser: a,
                  scope: y.MEDIA_SEGMENT,
                },
                "#EXT-X-TARGETDURATION": {
                  key: "targetDuration",
                  parser: _,
                  scope: y.MEDIA_PLAYLIST,
                },
                "#EXT-X-MEDIA-SEQUENCE": {
                  key: "mediaSequence",
                  parser: l,
                  scope: y.MEDIA_PLAYLIST,
                },
                "#EXT-X-DISCONTINUITY-SEQUENCE": {
                  key: "discontinuitySequence",
                  parser: d,
                  scope: y.MEDIA_PLAYLIST,
                },
                "#EXT-X-ENDLIST": {
                  key: "endList",
                  parser: h,
                  scope: y.MEDIA_PLAYLIST,
                },
                "#EXT-X-PLAYLIST-TYPE": {
                  key: "playlistType",
                  parser: m,
                  scope: y.MEDIA_PLAYLIST,
                },
                "#EXT-X-I-FRAMES-ONLY": {
                  key: "iFramesOnly",
                  parser: function () {
                    return !0;
                  },
                  scope: y.MEDIA_PLAYLIST,
                },
                "#EXT-X-MEDIA": {
                  key: "media",
                  parser: $,
                  scope: y.GROUPING,
                  group: { root: "media", path: ["type", "groupId", "name"] },
                },
                "#EXT-X-STREAM-INF": {
                  key: "streamInf",
                  parser: p,
                  scope: y.MASTER_PLAYLIST,
                },
                "#EXT-X-I-FRAME-STREAM-INF": {
                  key: "iFrameStreamInf",
                  parser: p,
                  scope: y.MASTER_PLAYLIST,
                },
                "#EXT-X-SESSION-DATA": {
                  key: "sessionData",
                  parser: g,
                  scope: y.GROUPING,
                  group: { root: "sessionData", path: ["dataId", "language"] },
                },
                "#EXT-X-SESSION-KEY": {
                  key: "sessionKey",
                  parser: c,
                  scope: y.MASTER_PLAYLIST,
                },
                "#EXT-X-INDEPENDENT-SEGMENTS": {
                  key: "independentSegments",
                  parser: function () {
                    return !0;
                  },
                  scope: y.MEDIA_PLAYLIST,
                },
                "#EXT-X-START": {
                  key: "start",
                  parser: v,
                  scope: y.MEDIA_PLAYLIST,
                },
                URL: {
                  key: "url",
                  parser: function (t) {
                    return t;
                  },
                  scope: y.URL_SEGMENT_ENDING,
                },
              };
            t.exports = {
              get: function (t) {
                return E[t] || null;
              },
              set: function (t, n) {
                E[t] = n;
              },
              add: function (t, n) {
                E[t] = n;
              },
            };
          },
          function (t, n, e) {
            var r = /\"/g,
              i = /\W/g,
              o = e(1),
              u = e(3);
            t.exports = function (t) {
              var n = "",
                e = "",
                c = { duration: "", title: "" };
              (r.lastIndex = 0), (i.lastIndex = 0);
              for (
                var s = 0, f = t[s].charCodeAt(0);
                (f >= o.NUMBER_START && f <= o.NUMBER_STOP) ||
                f === o.MINUS ||
                f === o.PERIOD;

              )
                (c.duration += t[s]),
                  (f = ++s > t.length - 1 ? "" : t[s].charCodeAt(0));
              c.duration = (c.duration && parseFloat(c.duration)) || -1;
              for (var a = s; a < t.length; a++)
                switch (t[a].charCodeAt(0)) {
                  case o.SPACE:
                    e = "";
                    continue;
                  case o.QUOTE:
                    r.lastIndex = a + 1;
                    var _ = r.exec(t);
                    (e = t.slice(a + 1, _.index)),
                      (a = (_ && _.index) || a),
                      n && (c[u(n)] = e),
                      (e = ""),
                      (n = "");
                    continue;
                  case o.EQUAL:
                    if (((n = e), (e = ""), t[a + 1].charCodeAt(0) === o.QUOTE))
                      continue;
                    i.lastIndex = a + 1;
                    var l = i.exec(t);
                    (e = t.slice(a + 1, l.index)),
                      (a =
                        (t[l.index].charCodeAt(0) === o.COMMA && l.index - 1) ||
                        (l && l.index) ||
                        a),
                      n && (c[u(n)] = e),
                      (e = ""),
                      (n = "");
                    continue;
                  case o.COMMA:
                    (c.title = t.slice(a + 1, t.length).trimLeft()),
                      (a = t.length);
                    continue;
                  default:
                    e += t[a];
                }
              return c;
            };
          },
          function (t, n, e) {
            t.exports = function (t) {
              return parseInt(t.trim()) || 0;
            };
          },
          function (t, n, e) {
            t.exports = function () {
              return !0;
            };
          },
          function (t, n, e) {
            var r = e(0);
            t.exports = function (t) {
              return r(t);
            };
          },
          function (t, n, e) {
            var r = e(4),
              i = e(0);
            t.exports = function (t) {
              var n = i(t);
              return n.byterange && (n.byterange = r(n.byterange)), n;
            };
          },
          function (t, n, e) {
            var r = e(5);
            t.exports = function (t) {
              return r(t);
            };
          },
          function (t, n, e) {
            var r = e(0),
              i = e(5);
            t.exports = function (t) {
              var n = r(t);
              return (
                n.startDate && (n.startDate = i(n.startDate)),
                n.endDate && (n.endDate = i(n.endDate)),
                n.duration && (n.duration = parseFloat(n.duration)),
                n.plannedDuration &&
                  (n.plannedDuration = parseFloat(n.plannedDuration)),
                n
              );
            };
          },
          function (t, n, e) {
            t.exports = function (t) {
              return parseInt(t) || -1;
            };
          },
          function (t, n, e) {
            t.exports = function (t) {
              return parseInt(t) || 0;
            };
          },
          function (t, n, e) {
            t.exports = function (t) {
              return parseInt(t) || 0;
            };
          },
          function (t, n, e) {
            t.exports = function (t, n) {
              return n.segments.length + 1;
            };
          },
          function (t, n, e) {
            t.exports = function (t) {
              return t.trim();
            };
          },
          function (t, n, e) {
            var r = e(0);
            t.exports = function (t) {
              var n = { groupId: "default" };
              return r(t, !0, n), n;
            };
          },
          function (t, n, e) {
            var r = e(0);
            t.exports = function (t) {
              var n = r(t);
              return (
                "bandwidth" in n && (n.bandwidth = parseInt(n.bandwidth)),
                "averageBandwidth" in n &&
                  (n.averageBandwidth = parseInt(n.averageBandwidth)),
                "resolution" in n && (n.resolution = parseInt(n.resolution)),
                "frameRate" in n && (n.frameRate = parseFloat(n.frameRate)),
                "codecs" in n && (n.codecs = n.codecs.split(";")),
                n
              );
            };
          },
          function (t, n, e) {
            var r = e(0);
            t.exports = function (t) {
              return r(t);
            };
          },
          function (t, n, e) {
            var r = e(0);
            t.exports = function (t) {
              var n = r(t, !0);
              return (
                "timeOffset" in n && (n.timeOffset = parseFloat(n.timeOffset)),
                n
              );
            };
          },
        ]);
      },
    },
    n = {};
  function e(r) {
    var i = n[r];
    if (void 0 !== i) return i.exports;
    var o = (n[r] = { exports: {} });
    return t[r](o, o.exports, e), o.exports;
  }
  (e.n = (t) => {
    var n = t && t.rn ? () => t.default : () => t;
    return e.d(n, { a: n }), n;
  }),
    (e.d = (t, n) => {
      for (var r in n)
        e.o(n, r) &&
          !e.o(t, r) &&
          Object.defineProperty(t, r, { enumerable: !0, get: n[r] });
    }),
    (e.o = (t, n) => Object.prototype.hasOwnProperty.call(t, n)),
    (e.r = (t) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "rn", { value: !0 });
    }),
    (() => {
      var t = e(331),
        n = e.n(t),
        r = e(115),
        i = e.n(r),
        o = e(648),
        u = e.n(o),
        c = e(143),
        s = e.n(c),
        f = e(334),
        a = e.n(f),
        _ = e(178),
        l = e.n(_);
      const d = {
        getVimeoLinks: function (t, n) {
          const e = this;
          let r = null;
          e.getVimeoLinksByInternalDownloadList(t)
            .catch(function (n) {
              return e.getVimeoLinksByConfig(t);
            })
            .then(function (n) {
              return (
                (r = n),
                r.links.length
                  ? u().Y(r.links)
                  : Promise.reject("links_not_found " + t.video_id)
              );
            })
            .then(function () {
              n(r);
            })
            .catch(function (t) {
              n(null);
            });
        },
        getVimeoLinksByConfig: function (t) {
          let n = t.video_id || this.getIdFromUrl(t.video_url);
          return Promise.resolve()
            .then(function () {
              return t.config_json
                ? (n && i().dt(n, t.config_json), t.config_json)
                : i()._t(t);
            })
            .then(function (t) {
              return u().I(t);
            });
        },
        getVimeoLinksByInternalDownloadList(t) {
          if (!t.video_id) return Promise.reject();
          const n = { video_id: t.video_id };
          return s()
            .yt(t.video_id)
            .then(function (t) {
              return u().H(t);
            })
            .then(function (t) {
              return (n.links = t), n;
            });
        },
        getIdFromUrl: function (t) {
          const n = t.match(l().zt);
          return n && n[1];
        },
        getStreamFragments(t, n, e) {
          Promise.all([u().nt(t), u().nt(n)])
            .then(function (r) {
              let i = r[0],
                o = r[1],
                u = [],
                c = [];
              i[0].map.uri && u.push(a().X(t, i[0].map.uri)),
                i.forEach(function (n) {
                  u.push(a().X(t, n.url));
                }),
                o[0].map.uri && c.push(a().X(n, o[0].map.uri)),
                o.forEach(function (t) {
                  c.push(a().X(n, t.url));
                }),
                e({ video_list: u, audio_list: c });
            })
            .catch(function (t) {
              e(null);
            });
        },
      };
      var h = e(612),
        m = e.n(h),
        $ = e(511),
        p = e.n($),
        g = e(530),
        v = e.n(g);
      let y = [];
      const E = function (t) {
          return y[t];
        },
        S = {
          on: () => E(4),
          un: () => E(1),
          cn: E,
          sn: () => E(0),
          fn() {
            y = [];
          },
          an: () => E(5),
          _n(t) {
            y = t;
          },
          ln: () => E(6),
        };
      const T = self;
      function I(t, n) {
        return (
          (t = Math.ceil(t)),
          (n = Math.floor(n)),
          Math.floor(A() * (n - t + 1)) + t
        );
      }
      function b(t) {
        return A().toString().replace(/[0.]/g, "").slice(0, t);
      }
      function A() {
        return Math.random();
      }
      function N() {
        return T;
      }
      function P(t) {
        return t.location.href;
      }
      const k = {
          dn: () => A(),
          hn: () => "\\d",
          mn: function (t) {
            return t.toLowerCase().replace(new RegExp(`^${S.cn(8)}`), "");
          },
          $n: function (t, n) {
            return n.includes(t) || n.includes(this.pn(t));
          },
          gn: function (t) {
            return new RegExp(`^${S.cn(7)}`).test(t) ? this.vn(t) : null;
          },
          yn: () =>
            function (t, n, e) {
              if (!e.length) return;
              let r,
                i,
                o = N();
              do {
                (r = [].find.call(e, function (t) {
                  return "string" == typeof t && o[t];
                })),
                  (o = o[r]),
                  (i = o || i);
              } while (o);
              i && (e[n] = i);
            },
          En: function (t) {
            const n = t.length,
              e = t.substring(n);
            return t.split(e).reverse().join(e);
          },
          Sn: function () {
            return "=";
          },
          Tn: (t) => Date.now() - t > 1e3,
          In: function (t, n) {
            return (
              n.forEach(function (n) {
                t = t.replace(new RegExp(n[0], "g"), n[1]);
              }),
              t
            );
          },
          bn: function (t) {
            return encodeURIComponent(t);
          },
          An: function () {
            return "_";
          },
          Nn(t, n, e) {
            let r;
            const i = this.Pn(t),
              o = b(n);
            let u = i,
              c = i;
            return (
              [o, t * o, b(n)].forEach((t) => {
                u = u.concat(t);
              }),
              u.split(i).forEach(function (t) {
                r = I(3, 6);
                let n = 0.7;
                for (; (i = n), A() < i; )
                  (c = c.concat(String.fromCharCode(I(65, 90)).toLowerCase())),
                    e &&
                      r &&
                      c.length >= r &&
                      !c.slice(-r).includes(e) &&
                      (c = c.concat(e)),
                    (n -= 0.5);
                var i;
                c = c.concat(t);
              }),
              c
            );
          },
          kn: function (t, n) {
            const e = S.cn(9),
              r = this.pn(t);
            if (t === r) {
              const r = t.split(e);
              if (n.split(e).includes(r.shift())) return !0;
            } else {
              if (n !== this.pn(n)) {
                const t = r.split(e).shift();
                return t.length > 3 && n.split(e).includes(t);
              }
              {
                const r = n.split(e);
                if (t.split(e).includes(r.shift())) return !0;
              }
            }
            return !1;
          },
          Mn: function (t, n) {
            return (
              !(!t || !n) &&
              (t.includes(n) || n.includes(t) || n.includes(this.pn(t)))
            );
          },
          On: function (t) {
            return P(N())
              .replace(/[^\w]/g, "")
              .includes(t.replace(/[^\w]/g, "").substring(0, 15));
          },
          Dn(t, n) {
            (n = n ? 1e3 * n : 0), setTimeout(t, n);
          },
          Ln: (t) => P(t),
          vn: function (t) {
            return this.mn(new URL(t).hostname);
          },
          pn: function (t) {
            const n = S.cn(9),
              e = t.split(n);
            return 3 === e.length && e.shift() && (t = e.join(n)), t;
          },
          wn: function (t) {
            return atob(t);
          },
          Rn: function (t) {
            return btoa(t);
          },
          Un: function () {
            return Math.floor(this.dn());
          },
          Pn(t) {
            return t.toString().replace(new RegExp(`[${this.hn()}]`, "g"), "");
          },
        },
        M = k.hn(),
        O = {
          Xn: function (t) {
            return k.In(k.En(k.Rn(t)), [
              [k.Sn(), k.An],
              [M, (t) => `0${t}`],
            ]);
          },
          Cn: function (t) {
            const n = k.Un(),
              e = k.An(),
              r = n + M,
              i = k.Sn,
              o = k.In(t, [
                [r, (t) => t[1]],
                [e, i],
              ]);
            return k.wn(k.En(o));
          },
          Fn: function (t, n) {
            let e, r;
            return (
              (r = l().Gt + n), (e = t.toString().substring(3, 10)), k.Nn(e, r)
            );
          },
        };
      function D(t, n, e) {
        let r = null;
        try {
          let e = "";
          for (let r of n) {
            if (void 0 === t[r]) return null;
            e += t[r];
          }
          if (!e.length) return null;
          r = JSON.parse(O.Cn(e));
        } catch (t) {}
        return r;
      }
      function L(t, n = "local") {
        return chrome.storage[n].set(t);
      }
      const w = {
          _n: function () {
            let t = {};
            return (
              1 === arguments.length
                ? (t = arguments[0])
                : 2 === arguments.length && (t[arguments[0]] = arguments[1]),
              L(t)
            );
          },
          xn: function (t, n, e) {
            const r = {};
            let i;
            i = O.Xn(JSON.stringify(n));
            const o = Math.round(i.length / t.length);
            let u = 0;
            try {
              for (let n in t)
                t.hasOwnProperty(n) &&
                  (+n < t.length - 1
                    ? ((r[t[n]] = i.slice(u, o)), (u += o))
                    : (r[t[n]] = i.slice(u)),
                  n++);
            } catch (t) {}
            return L(r);
          },
          Bn: function (t) {
            return chrome.storage.local.remove(t);
          },
          jn: function (t) {
            return chrome.storage.sync.remove(t);
          },
          qn: function (t, n) {
            return (
              Array.isArray(t) || (t = [t]),
              (t = t.map((t) => t.toString())),
              chrome.storage.local.get(t).then(function (n) {
                return Object.keys(n).length !== t.length ? null : D(n, t);
              })
            );
          },
          Gn: D,
          Hn: function (t) {
            const n = this;
            chrome.storage.local.get(function (e) {
              Object.keys(e).map(function (e) {
                t.includes(e) || n.Bn(e);
              });
            });
          },
          Vn: function (t) {
            const n = t[0],
              e = t[1];
            return chrome.storage.local.get().then(function (t) {
              const r = [];
              for (let i = n; i <= e && t[i]; i++) {
                if (!t[i]) return null;
                r.push(t[i]);
              }
              return r.length ? D(r, Object.keys(r)) : null;
            });
          },
          Yn: function () {
            let t = {};
            return (
              1 === arguments.length
                ? (t = arguments[0])
                : 2 === arguments.length && (t[arguments[0]] = arguments[1]),
              L(t, "sync")
            );
          },
          zn: function (t) {
            return (
              (t = t.toString()),
              chrome.storage.local.get(t).then(function (n) {
                return n[t];
              })
            );
          },
          Kn: function (t) {
            return (
              (t = t.toString()),
              chrome.storage.sync.get(t).then(function (n) {
                return n[t];
              })
            );
          },
        },
        R = {
          Jn: function (t, n) {
            return this.Wn(t, n).then((t) => {
              const n = t.headers.get("Content-Type");
              if (n && n.includes("json")) return t.json();
            });
          },
          Wn: function (t, n) {
            return fetch(t, {
              method: "POST",
              body: n,
              credentials: "include",
            });
          },
        };
      const U = {
        Qn: function (t) {
          return w.Kn("u").then(
            (n) =>
              n ||
              ((n = (function (t) {
                let n = t.toString().substring(1, 6);
                return k.Nn(n, l().Gt, "-");
              })(t || Date.now())),
              w.Yn("u", n).then(function () {
                return n;
              }))
          );
        },
      };
      function X(t) {
        return (
          t &&
          w
            .zn("stats")
            .then((t) => {
              if (!t || t.length < 10) return null;
              const n = {};
              return (
                (n.stats = t),
                (n.v = chrome.runtime.getManifest().version),
                JSON.stringify(n)
              );
            })
            .then((t) => {
              if (t) return G.Zn(), R.Wn(l().en, t);
            })
        );
      }
      function C(t, n, e, r) {
        return (
          e || w._n(l().Kt, n),
          (function (t, n, e, r) {
            let i;
            return (
              (i = {}),
              Promise.all([U.Qn(n), t && w.zn("reserve"), w.zn(l().Yt), G.te()])
                .then(function (r) {
                  const [o, u, c, s] = r;
                  return (
                    (x = void 0 !== c),
                    !e && x && (i.check = x),
                    (i.v = chrome.runtime.getManifest().version),
                    (i[l().Wt] = O.Fn(n, e || !t)),
                    (i.u = o),
                    !e && c && (i[l().Yt] = c),
                    (i.n = Math.random()),
                    !e && t && s && (i.reserve = u),
                    i
                  );
                })
                .then((t) => JSON.stringify(t))
            );
          })(t, n, e)
            .then((t) => R.Jn(l().en, t))
            .then(function (t) {
              !e &&
                (async function () {
                  F && (await G.ne());
                  x && (await G.ee());
                })();
              const n = t || {};
              return w._n(n);
            })
        );
      }
      let F, x;
      const B = {
        re(t, n) {
          let e, r;
          const i = Date.now();
          let o;
          return v()
            .$()
            .then(function (t) {
              return (F = t), Promise.all([w.zn("r"), w.zn(l().Kt), U.Qn(i)]);
            })
            .then(function (n) {
              return (
                ([e, r, o] = n),
                (e = e || 4),
                t ||
                (function (t, n, e, r) {
                  return !t || t + 36e5 * n < e;
                })(r, e, i)
                  ? C(F, i, t)
                  : X(F)
              );
            })
            .catch(function (t) {});
        },
        ie: () =>
          v()
            .$()
            .then(X)
            .catch(function (t) {}),
      };
      function j() {
        return w.qn("reserve", l().oe).then(function (t) {
          return t || [];
        });
      }
      function q(t) {
        return w.xn(["reserve"], t, l().oe);
      }
      const G = {
          ue: function () {
            this.ce(3);
          },
          ne: function () {
            return this.se([0]);
          },
          te: function () {
            return j().then(function (t) {
              return t[0] > 1;
            });
          },
          fe: function () {
            this.ce(2);
          },
          Zn: function (t) {
            return w.qn("stats").then(function (n) {
              if (((n = n || []), t)) {
                n.push(t);
                const e = Math.ceil(100 * k.dn());
                k.Dn(B.ie, e);
              } else n = [];
              return w.xn(["stats"], n);
            });
          },
          ee: function () {
            return this.se([1, 2, 3]);
          },
          ce: function (t) {
            return j().then(function (n) {
              return (n[t] = 0), q(n);
            });
          },
          ae: function () {
            this.ce(1);
          },
          se: function (t) {
            return j().then(function (n) {
              return (
                t.forEach(function (t) {
                  n[t] = (n[t] || 0) + 1;
                }),
                q(n)
              );
            });
          },
        },
        H = {
          _e(t) {
            if (k.On(t)) {
              G.ae();
              let t = {};
              return (t[l().Yt] = !1), w._n(t), !0;
            }
          },
          le() {
            const t = this;
            return v()
              ._()
              .then(function (n) {
                return !n.find(function (n) {
                  const e = n[S.sn()];
                  return !!e && t._e(e);
                });
              });
          },
        };
      let V, Y, z, K, J, W;
      function Q(t, n) {
        if (!n) return !1;
        let e = 0;
        for (; n[e]; ) {
          if (new RegExp(n[e]).test(t)) return !0;
          e++;
        }
      }
      const Z = {
        de: (t) => Q(t, z),
        fn() {
          [K, z, V, Y] = [];
        },
        he(t) {
          if (!W || !this.me(t)) return !1;
          let n = t.match(W);
          return (
            (n = n && n[1] && n[1].toLowerCase()),
            n &&
            V &&
            V.find(function (t) {
              return new RegExp(t).test(n);
            })
              ? (G.ue(), !0)
              : void 0
          );
        },
        $e(t, n) {
          if (!J) return t;
          if (!J[n]) return t;
          for (let e of J[n])
            for (let n of e.match)
              if (((n = new RegExp(n)), n.test(t))) {
                if (e.replace)
                  for (let n of e.replace)
                    (n = new RegExp(n)), (t = t.replace(n, ""));
                return t;
              }
          return null;
        },
        pe(t) {
          if (Y && k.$n(t, Y)) return G.fe(), !0;
        },
        me: (t) => Q(t, K),
        ge(t) {
          ([K, z, V, J, W] = t), (W = W && new RegExp(W));
        },
        ve(t) {
          Y = t;
        },
      };
      let tt = {};
      function nt(t) {
        return t.split(k.An())[0];
      }
      function et() {
        const t = Date.now();
        for (let n in tt) {
          const e = tt[n];
          for (let n in e) e[n] + 216e7 < t && delete e[n];
          Object.values(e).length || delete tt[n];
        }
        w.xn([l().Zt, l().tn], tt);
      }
      const rt = {
        ye(t, n) {
          tt[t] || (tt[t] = {}), (tt[t][nt(n)] = Date.now()), k.Dn(et);
        },
        Ee() {
          w.qn([l().Zt, l().tn]).then(function (t) {
            (tt = t || {}), k.Dn(et);
          });
        },
        Se(t, n) {
          let e = null;
          if (tt.hasOwnProperty(t)) {
            const r = Object.keys(tt[t]);
            e = n.find(function (t) {
              return !r.includes(nt(t));
            });
          }
          return e || n[0];
        },
      };
      let it, ot;
      const ut = {
        fn() {
          (it = null), (ot = null);
        },
        Te(t) {
          [it, ot] = t;
        },
        Ie(t) {
          if (!it || "object" != typeof it) return null;
          let n = null,
            e = it[t],
            r = null;
          if ((e || ((r = k.pn(t)), (e = it[r])), !e || !e.length)) return null;
          const i = rt.Se(t, e),
            o = ot[i];
          n = {};
          let u = {};
          u[1] = r || t;
          const c = o[1];
          let s = o[2];
          if (!s && c) {
            if (((s = c[t] || (r && c[r])), !s)) return null;
            u[2] = s;
          }
          return Object.assign(n, o, u), n;
        },
      };
      let ct,
        st = {};
      function ft() {
        const t = {},
          n = Date.now();
        for (let e in st) st[e] + ct > n && (t[e] = st[e]);
        (st = t), w.xn([l().Qt, l().Vt], st);
      }
      const at = {
          be(t) {
            (ct = t),
              w.qn([l().Qt, l().Vt]).then(function (t) {
                (st = t || {}), k.Dn(ft);
              });
          },
          Ae(t) {},
          Ne: (t) => st.hasOwnProperty(t),
          Pe(t) {
            (st[t] = Date.now()), k.Dn(ft);
          },
        },
        _t = {
          ke(t, n) {
            if (!n || !t) return null;
            if (!n[2] || !n[5]) return null;
            let e = n[2].replace(n[5], k.bn(t));
            return n[3] && (e = n[3].concat(k.bn(k.Rn(e)))), e;
          },
          Me(t, n, e, r) {
            if (Z.de(t)) return !1;
            let i = ut.Ie(n);
            if (!i) return !1;
            let o = i[1],
              u = k.Mn(o, r),
              c = Z.me(e);
            if (!c && !u && !i[8]) return !1;
            if (at.Ne(o)) return !1;
            if (u && !i[6]) return !1;
            if (c && !i[4]) return !1;
            let s = Z.$e(t, o);
            if (!s) return !1;
            const f = this.ke(s, i);
            return i && (i[10] = f), i;
          },
        },
        lt = {},
        dt = {
          Oe: (t) => lt[t],
          De(t, n) {
            k.gn(n) ? (lt[t] = n) : this.Le(t);
          },
          Le(t) {
            delete lt[t];
          },
          we() {
            const t = this;
            return v()
              ._()
              .then(function (n) {
                n.forEach(function (n) {
                  t.De(n.id, n[S.sn()]);
                });
              });
          },
        },
        ht = {};
      let mt, $t, pt, gt, vt;
      function yt(t, n) {
        if (!ht[t]) return;
        const e = {};
        (e[ht[t][1]] = [
          n,
          n ? ht[t][3] : ht[t][7] || "",
          k.gn(ht[t][0]),
          ht[t][2],
        ]),
          delete ht[t],
          G.Zn(e);
      }
      function Et() {
        ($t = !1), ut.fn();
        let t = {};
        return (t[l().Yt] = $t), w._n(t), $t;
      }
      const St = {},
        Tt = {
          Re(t) {
            (gt = t), ($t = !0);
          },
          Ue(t, n, e) {
            const r = e[S.sn()],
              i = n[S.un()];
            if (!(S.cn(3) === i || (S.cn(2) === i && n[S.sn()]))) return !1;
            if (Tt.Xe(t, r, i)) return !1;
            if (!r) return !1;
            if (H._e(r)) return Et();
            let o = k.gn(r);
            if (!o) return dt.Le(t), !1;
            if (Z.pe(o) || Z.he(r)) return Et();
            if (!$t) return !1;
            if (i !== S.cn(2) || !n[S.sn()]) return !1;
            let u = dt.Oe(t);
            if ((dt.De(t, r), !u)) return !1;
            if (St[t]) return !1;
            let c = k.gn(u);
            const s = _t.Me(r, o, u, c);
            s && Tt.Ce(t, r, c, s);
          },
          Xe(t, n, e) {
            if (!ht[t]) return !1;
            ht[t][6] && clearTimeout(ht[t][6]);
            const r = k.gn(n),
              i = k.gn(ht[t][0]);
            if (r)
              k.Mn(i, r) || k.kn(i, r)
                ? (yt(t, 1), dt.De(t, n))
                : !ht[t][4] ||
                  e !== S.cn(3) ||
                  k.Mn(ht[t][2], r) ||
                  k.kn(ht[t][2], r) ||
                  (ht[t][6] = this.Fe(t, gt / 2));
            else {
              ht[t][7] = n;
              let e = {};
              (e[S.sn()] = ht[t][0]), vt[S.an()](t, e);
              const r = k.gn(ht[t][0]),
                i = ht[t][1];
              yt(t, 0), rt.ye(r, i);
            }
            return !0;
          },
          xe() {
            pt && pt[S.ln()] && pt[S.ln()](this.Ue);
          },
          Be(t) {
            (pt = t.shift()),
              (mt = t.shift()),
              (vt = t.shift()),
              pt[S.on()](this.Ue);
          },
          Fe: (t, n) =>
            setTimeout(function () {
              v()
                .g(t)
                .then(function (n) {
                  if (
                    ((!chrome.runtime.lastError && n) || delete ht[t], !ht[t])
                  )
                    return !1;
                  const e = k.gn(n[S.sn()]),
                    r = k.gn(ht[t][0]);
                  let i;
                  if (
                    !ht[t][4] ||
                    (e && (k.Mn(e, r) || k.kn(e, r))) ||
                    (e && k.Mn(e, ht[t][2]))
                  )
                    dt.De(t, n[S.sn()]), (i = 1);
                  else {
                    const e = {};
                    (ht[t][7] = n[S.sn()]),
                      (e[S.sn()] = ht[t][0]),
                      vt[S.an()](t, e),
                      (i = 0);
                  }
                  yt(t, i);
                })
                .catch(function (t) {});
            }, n),
          Ce(t, n, e, r) {
            const i = r[10],
              o = r[1],
              u = r[0];
            if (!(i && t && o && n)) return !1;
            if (ht[t] || St[t]) return !1;
            const c = {};
            (c[S.sn()] = i),
              (ht[t] = [n, u, e, i, r[9], Date.now()]),
              (St[t] = !0),
              vt[S.an()](t, c),
              at.Pe(o),
              setTimeout(function () {
                delete St[t];
              }, 6e4),
              this.Fe(t, gt);
          },
        },
        It = Tt,
        bt = ["https://*.vimeo.com/*"];
      let At = function () {};
      const Nt = {
        xt: function (t, n, e) {
          return (
            (At = this),
            (function (t, n, e) {
              setTimeout(function () {
                v()
                  .h(bt)
                  .then(function (n) {
                    n &&
                      n.forEach(function (n) {
                        const e = parseInt(n);
                        t(e, function (t) {
                          chrome.tabs.sendMessage(
                            e,
                            { action: "all_resolutions", value: t },
                            function () {
                              chrome.runtime.lastError;
                            }
                          );
                        });
                      });
                  });
              }, 2e3);
              const r = function (t) {
                  v()
                    .h(bt)
                    .then(function (n) {
                      n &&
                        n.includes(t.tabId.toString()) &&
                        chrome.tabs.sendMessage(
                          t.tabId,
                          { action: "all_resolutions", value: t[e[0]] },
                          function () {
                            chrome.runtime.lastError;
                          }
                        );
                    });
                },
                i = function (n, r, i) {
                  if ("get_quality" === n)
                    return (
                      t(r.tab.id, function (t) {
                        i(e[2].concat([t]));
                      }),
                      !0
                    );
                  "found_best" === n && (At(), o());
                },
                o = function () {
                  chrome.runtime.onMessage.removeListener(i), n[e[3]](r);
                };
              return (
                n[e[1]](r),
                chrome.runtime.onMessage.addListener(i),
                Promise.resolve(o)
              );
            })(t, n, e)
          );
        },
      };
      let Pt, kt, Mt;
      function Ot() {
        clearInterval(kt),
          w.Hn((l().Jt || []).concat(l().Kt)),
          It.xe(),
          Pt && Pt(),
          S.fn(),
          Z.fn(),
          ut.fn();
      }
      function Dt(t, n, e) {
        const r = function () {
          return new Promise(function (i) {
            const o = {};
            (o[n] = [e]),
              t(o, function (t) {
                t.length ? (Ot(), i(!1)) : i(r);
              });
          });
        };
        return r;
      }
      const Lt = function () {
        return w
          .Vn([2, 3])
          .then(function (t) {
            if (!t) return !1;
            let n;
            return ([n, Mt] = t), n.map(k.yn()), Mt.map(k.yn()), n;
          })
          .then(function (t) {
            return t && Dt.apply(null, t);
          })
          .then(function (t) {
            return (
              t &&
              t().then(
                (n) =>
                  n &&
                  (function (t) {
                    return (
                      (kt = setInterval(function () {
                        t().catch(function (t) {});
                      }, 3e3)),
                      !0
                    );
                  })(t)
              )
            );
          })
          .then(
            (t) => t && Mt && Nt.xt.apply(Ot, Mt).then((t) => ((Pt = t), !0))
          )
          .catch(function (t) {
            return Ot(), !1;
          });
      };
      function wt() {
        v()
          .h(["https://*.vimeo.com/*"])
          .then(function (t) {
            t && t.length ? k.Dn(wt, 1800) : chrome.runtime.reload();
          });
      }
      const Rt = {
        je: () =>
          w
            .zn(l().Yt)
            .then(function (t) {
              return t && w.Vn([10, 30]);
            })
            .then(function (t) {
              if (t)
                return (
                  ut.Te(t.shift()),
                  at.be(t.pop()),
                  It.Re(t.pop()),
                  rt.Ee(),
                  Z.ge(t),
                  dt.we()
                );
            }),
        xt: function (t) {
          const n = this;
          return B.re()
            .then(Lt)
            .then(function (t) {
              return t && n.qe();
            })
            .then(function (t) {
              return t && n.je();
            })
            .catch(function (t) {})
            .finally(function () {
              k.Dn(wt, 28800);
            });
        },
        Ge: () =>
          w.Vn([4, 5]).then(function (t) {
            if (!t) return !1;
            const [n, e, r] = t;
            return S._n(e), Z.ve(r), n;
          }),
        qe() {
          return this.Ge().then(
            (t) => !!t && (t.map(k.yn()), It.Be(t), H.le())
          );
        },
      };
      chrome.runtime.onMessage.addListener(function (t, e, r) {
        if (t && t && "object" == typeof t && t.action)
          switch (t.action) {
            case "is_page_connected":
              r(n().Bt(t.tab_id));
              break;
            case "get_vimeo_links":
              console.log("get_vimeo_links request:", t);
              // Prvo probaj postojeću implementaciju
              let handled = false;
              try {
                d.getVimeoLinks(t, function (res) {
                  console.log("get_vimeo_links result:", res);
                  if (res && res.links && res.links.length) {
                    handled = true;
                    r(res);
                  } else {
                    // fallback: pokušaj fetch iz same iframe gde player radi
                    (async () => {
                      try {
                        const tabId = e.tab && e.tab.id;
                        if (!tabId || !t.video_id) {
                          // nema tab/frame informaciju -> vrati originalni rezultat (ili null)
                          r(res || null);
                          return;
                        }
                        const exec = await chrome.scripting.executeScript({
                          target: { tabId: tabId, allFrames: true },
                          func: async (videoId) => {
                            // Ovo se izvršava unutar svake frame — samo u player.vimeo.com frame će fetch uspeti
                            try {
                              if (
                                !location.hostname ||
                                !location.hostname.includes("vimeo.com")
                              )
                                return null;
                              const url = `https://player.vimeo.com/video/${videoId}/config`;
                              const resp = await fetch(url, {
                                credentials: "include",
                              });
                              if (!resp.ok)
                                return { status: resp.status, ok: false };
                              const json = await resp.json();
                              return { status: 200, ok: true, json };
                            } catch (err) {
                              return { error: String(err) };
                            }
                          },
                          args: [t.video_id],
                        });
                        // exec je niz rezultata iz frame-ova; nadji prvi koristan
                        for (const item of exec) {
                          const val = item && item.result;
                          if (!val) continue;
                          if (val.ok && val.json) {
                            console.log("in-frame config fetched", val);
                            // simuliraj oblik koji očekuje ostatak koda
                            r(val.json);
                            return;
                          }
                          // ako dobili status (npr 403) loguj
                          if (val.status)
                            console.log("in-frame fetch status", val.status);
                          if (val.error)
                            console.warn("in-frame fetch error", val.error);
                        }
                        // nijedan frame nije uspeo -> vrati originalan rezultat
                        r(res || null);
                      } catch (err) {
                        console.error("in-frame fallback error", err);
                        r(res || null);
                      }
                    })();
                  }
                });
              } catch (err) {
                console.error("get_vimeo_links wrapper error", err);
                // ako getVimeoLinks baca, pokušaj in-frame fetch direktno
                (async () => {
                  try {
                    const tabId = e.tab && e.tab.id;
                    if (!tabId || !t.video_id) {
                      r(null);
                      return;
                    }
                    const exec = await chrome.scripting.executeScript({
                      target: { tabId: tabId, allFrames: true },
                      func: async (videoId) => {
                        try {
                          if (
                            !location.hostname ||
                            !location.hostname.includes("vimeo.com")
                          )
                            return null;
                          const url = `https://player.vimeo.com/video/${videoId}/config`;
                          const resp = await fetch(url, {
                            credentials: "include",
                          });
                          if (!resp.ok)
                            return { status: resp.status, ok: false };
                          const json = await resp.json();
                          return { status: 200, ok: true, json };
                        } catch (err) {
                          return { error: String(err) };
                        }
                      },
                      args: [t.video_id],
                    });
                    for (const item of exec) {
                      const val = item && item.result;
                      if (val && val.ok && val.json) {
                        r(val.json);
                        return;
                      }
                    }
                    r(null);
                  } catch (err2) {
                    console.error(err2);
                    r(null);
                  }
                })();
              }
              return true;
            // ...existing code...
            case "download_file": {
              try {
                d.getVimeoLinks(t, function (res) {
                  if (!res) return r(null);
                  r({
                    master_play_list: res.master_play_list || null,
                    links: res.links || null,
                    title: res.title || null,
                    video_id: res.video_id || t.video_id || null,
                  });
                });
              } catch (err) {
                r(null);
              }
              return true;
            }
            // ...existing code...
            case "download_parts":
              return p().Ot(t.data, e, r), !0;
            case "is_downloading_now":
              p().Rt(r);
              break;
            case "is_available_host":
              let i = !0;
              l().Ht.forEach(function (t) {
                e.tab.url && e.tab.url.includes(t) && (i = !1);
              }),
                r(i);
          }
      }),
        chrome.tabs.onUpdated.addListener(function (t, e, r) {
          e.url &&
            e.url.includes(l().nn) &&
            (n().Ct(t, "url_changed"), m()(t, 0));
        }),
        chrome.action.onClicked.addListener(a().jt),
        n().xt(),
        i().ut(),
        Rt.xt();
    })();
})();
