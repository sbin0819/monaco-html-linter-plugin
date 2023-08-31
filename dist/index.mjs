var Se = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, pe = { exports: {} };
(function(C, y) {
  (function(m, O) {
    C.exports = O();
  })(Se, function() {
    function m(a) {
      return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
    }
    var O = {}, N = {};
    Object.defineProperty(N, "__esModule", { value: !0 });
    class q {
      constructor() {
        this._listeners = {}, this._mapCdataTags = this.makeMap("script,style"), this._arrBlocks = [], this.lastEvent = null;
      }
      makeMap(s) {
        const t = {}, r = s.split(",");
        for (let e = 0; e < r.length; e++)
          t[r[e]] = !0;
        return t;
      }
      parse(s) {
        const t = this._mapCdataTags, r = /<(?:\/([^\s>]+)\s*|!--([\s\S]*?)--|!([^>]*?)|([\w\-:]+)((?:\s+[^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]*))?)*?)\s*(\/?))>/g, e = /\s*([^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+)(?:\s*=\s*(?:(")([^"]*)"|(')([^']*)'|([^\s"'>]*)))?/g, n = /\r?\n/g;
        let i, l, o = 0, u, d, c = null, g, f = [], _ = 0, b, v = 0, p = 1;
        const M = this._arrBlocks;
        this.fire("start", {
          pos: 0,
          line: 1,
          col: 1
        });
        const j = () => {
          const L = d.find((h) => h.name === "type") || {
            value: ""
          };
          return t[u] && L.value.indexOf("text/ng-template") === -1;
        }, w = (L, h, P, T) => {
          const $ = P - v + 1;
          for (T === void 0 && (T = {}), T.raw = h, T.pos = P, T.line = p, T.col = $, M.push(T), this.fire(L, T); n.exec(h); )
            p++, v = P + n.lastIndex;
        };
        for (; i = r.exec(s); ) {
          if (l = i.index, l > o && (b = s.substring(o, l), c ? f.push(b) : w("text", b, o)), o = r.lastIndex, (u = i[1]) && (c && u === c && (b = f.join(""), w("cdata", b, _, {
            tagName: c,
            attrs: g
          }), c = null, g = void 0, f = []), !c)) {
            w("tagend", i[0], l, {
              tagName: u
            });
            continue;
          }
          if (c)
            f.push(i[0]);
          else if (u = i[4]) {
            d = [];
            const L = i[5];
            let h, P = 0;
            for (; h = e.exec(L); ) {
              const T = h[1], $ = h[2] ? h[2] : h[4] ? h[4] : "", me = h[3] ? h[3] : h[5] ? h[5] : h[6] ? h[6] : "";
              d.push({
                name: T,
                value: me,
                quote: $,
                index: h.index,
                raw: h[0]
              }), P += h[0].length;
            }
            P === L.length ? (w("tagstart", i[0], l, {
              tagName: u,
              attrs: d,
              close: i[6]
            }), j() && (c = u, g = d.concat(), f = [], _ = o)) : w("text", i[0], l);
          } else
            (i[2] || i[3]) && w("comment", i[0], l, {
              content: i[2] || i[3],
              long: !!i[2]
            });
        }
        s.length > o && (b = s.substring(o, s.length), w("text", b, o)), this.fire("end", {
          pos: o,
          line: p,
          col: s.length - v + 1
        });
      }
      addListener(s, t) {
        const r = this._listeners, e = s.split(/[,\s]/);
        let n;
        for (let i = 0, l = e.length; i < l; i++)
          n = e[i], r[n] === void 0 && (r[n] = []), r[n].push(t);
      }
      fire(s, t) {
        t === void 0 && (t = {}), t.type = s;
        let r = [];
        const e = this._listeners[s], n = this._listeners.all;
        e !== void 0 && (r = r.concat(e)), n !== void 0 && (r = r.concat(n));
        const i = this.lastEvent;
        i !== null && (delete i.lastEvent, t.lastEvent = i), this.lastEvent = t;
        for (let l = 0, o = r.length; l < o; l++)
          r[l].call(this, t);
      }
      removeListener(s, t) {
        const r = this._listeners[s];
        if (r !== void 0) {
          for (let e = 0, n = r.length; e < n; e++)
            if (r[e] === t) {
              r.splice(e, 1);
              break;
            }
        }
      }
      fixPos(s, t) {
        const e = s.raw.substr(0, t).split(/\r?\n/), n = e.length - 1;
        let i = s.line, l;
        return n > 0 ? (i += n, l = e[n].length + 1) : l = s.col + t, {
          line: i,
          col: l
        };
      }
      getMapAttrs(s) {
        const t = {};
        let r;
        for (let e = 0, n = s.length; e < n; e++)
          r = s[e], t[r.name] = r.value;
        return t;
      }
    }
    N.default = q;
    var A = {};
    Object.defineProperty(A, "__esModule", { value: !0 });
    class ye {
      constructor(s, t) {
        this.html = s, this.lines = s.split(/\r?\n/);
        const r = /\r?\n/.exec(s);
        this.brLen = r !== null ? r[0].length : 0, this.ruleset = t, this.messages = [];
      }
      info(s, t, r, e, n) {
        this.report("info", s, t, r, e, n);
      }
      warn(s, t, r, e, n) {
        this.report("warning", s, t, r, e, n);
      }
      error(s, t, r, e, n) {
        this.report("error", s, t, r, e, n);
      }
      report(s, t, r, e, n, i) {
        const l = this.lines, o = this.brLen;
        let u = "", d = 0;
        for (let c = r - 1, g = l.length; c < g && (u = l[c], d = u.length, e > d && r < g); c++)
          r++, e -= d, e !== 1 && (e -= o);
        this.messages.push({
          type: s,
          message: t,
          raw: i,
          evidence: u,
          line: r,
          col: e,
          rule: {
            id: n.id,
            description: n.description,
            link: `https://htmlhint.com/docs/user-guide/rules/${n.id}`
          }
        });
      }
    }
    A.default = ye;
    var be = {}, E = {};
    Object.defineProperty(E, "__esModule", { value: !0 }), E.default = {
      id: "alt-require",
      description: "The alt attribute of an <img> element must be present and alt attribute of area[href] and input[type=image] must have a value.",
      init(a, s) {
        a.addListener("tagstart", (t) => {
          const r = t.tagName.toLowerCase(), e = a.getMapAttrs(t.attrs), n = t.col + r.length + 1;
          let i;
          r === "img" && !("alt" in e) ? s.warn("An alt attribute must be present on <img> elements.", t.line, n, this, t.raw) : (r === "area" && "href" in e || r === "input" && e.type === "image") && (!("alt" in e) || e.alt === "") && (i = r === "area" ? "area[href]" : "input[type=image]", s.warn(`The alt attribute of ${i} must have a value.`, t.line, n, this, t.raw));
        });
      }
    };
    var R = {};
    Object.defineProperty(R, "__esModule", { value: !0 });
    const we = [
      "allowReorder",
      "attributeName",
      "attributeType",
      "autoReverse",
      "baseFrequency",
      "baseProfile",
      "calcMode",
      "clipPath",
      "clipPathUnits",
      "contentScriptType",
      "contentStyleType",
      "diffuseConstant",
      "edgeMode",
      "externalResourcesRequired",
      "filterRes",
      "filterUnits",
      "glyphRef",
      "gradientTransform",
      "gradientUnits",
      "kernelMatrix",
      "kernelUnitLength",
      "keyPoints",
      "keySplines",
      "keyTimes",
      "lengthAdjust",
      "limitingConeAngle",
      "markerHeight",
      "markerUnits",
      "markerWidth",
      "maskContentUnits",
      "maskUnits",
      "numOctaves",
      "onBlur",
      "onChange",
      "onClick",
      "onFocus",
      "onKeyUp",
      "onLoad",
      "pathLength",
      "patternContentUnits",
      "patternTransform",
      "patternUnits",
      "pointsAtX",
      "pointsAtY",
      "pointsAtZ",
      "preserveAlpha",
      "preserveAspectRatio",
      "primitiveUnits",
      "refX",
      "refY",
      "repeatCount",
      "repeatDur",
      "requiredExtensions",
      "requiredFeatures",
      "specularConstant",
      "specularExponent",
      "spreadMethod",
      "startOffset",
      "stdDeviation",
      "stitchTiles",
      "surfaceScale",
      "systemLanguage",
      "tableValues",
      "targetX",
      "targetY",
      "textLength",
      "viewBox",
      "viewTarget",
      "xChannelSelector",
      "yChannelSelector",
      "zoomAndPan"
    ];
    function _e(a, s) {
      if (s instanceof RegExp)
        return s.test(a) ? { match: a, pattern: s } : !1;
      const t = s[0], r = s[s.length - 1], e = s[s.length - 2], n = t === "/" && (r === "/" || e === "/" && r === "i"), i = n && r === "i";
      return n ? i ? new RegExp(s.slice(1, -2), "i").test(a) : new RegExp(s.slice(1, -1)).test(a) : a === s;
    }
    R.default = {
      id: "attr-lowercase",
      description: "All attribute names must be in lowercase.",
      init(a, s, t) {
        const r = (Array.isArray(t) ? t : []).concat(we);
        a.addListener("tagstart", (e) => {
          const n = e.attrs;
          let i;
          const l = e.col + e.tagName.length + 1;
          for (let o = 0, u = n.length; o < u; o++) {
            i = n[o];
            const d = i.name;
            !r.find((c) => _e(d, c)) && d !== d.toLowerCase() && s.error(`The attribute name of [ ${d} ] must be in lowercase.`, e.line, l + i.index, this, i.raw);
          }
        });
      }
    };
    var D = {};
    Object.defineProperty(D, "__esModule", { value: !0 }), D.default = {
      id: "attr-sorted",
      description: "Attribute tags must be in proper order.",
      init(a, s) {
        const t = {}, r = [
          "class",
          "id",
          "name",
          "src",
          "for",
          "type",
          "href",
          "value",
          "title",
          "alt",
          "role"
        ];
        for (let e = 0; e < r.length; e++)
          t[r[e]] = e;
        a.addListener("tagstart", (e) => {
          const n = e.attrs, i = [];
          for (let o = 0; o < n.length; o++)
            i.push(n[o].name);
          const l = JSON.stringify(i);
          i.sort((o, u) => t[o] == null && t[u] == null ? 0 : t[o] == null ? 1 : t[u] == null ? -1 : t[o] - t[u] || o.localeCompare(u)), l !== JSON.stringify(i) && s.error(`Inaccurate order ${l} should be in hierarchy ${JSON.stringify(i)} `, e.line, e.col, this, e.raw);
        });
      }
    };
    var x = {};
    Object.defineProperty(x, "__esModule", { value: !0 }), x.default = {
      id: "attr-no-duplication",
      description: "Elements cannot have duplicate attributes.",
      init(a, s) {
        a.addListener("tagstart", (t) => {
          const r = t.attrs;
          let e, n;
          const i = t.col + t.tagName.length + 1, l = {};
          for (let o = 0, u = r.length; o < u; o++)
            e = r[o], n = e.name, l[n] === !0 && s.error(`Duplicate of attribute name [ ${e.name} ] was found.`, t.line, i + e.index, this, e.raw), l[n] = !0;
        });
      }
    };
    var S = {};
    Object.defineProperty(S, "__esModule", { value: !0 }), S.default = {
      id: "attr-unsafe-chars",
      description: "Attribute values cannot contain unsafe chars.",
      init(a, s) {
        a.addListener("tagstart", (t) => {
          const r = t.attrs;
          let e;
          const n = t.col + t.tagName.length + 1, i = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/;
          let l;
          for (let o = 0, u = r.length; o < u; o++)
            if (e = r[o], l = i.exec(e.value), l !== null) {
              const d = escape(l[0]).replace(/%u/, "\\u").replace(/%/, "\\x");
              s.warn(`The value of attribute [ ${e.name} ] cannot contain an unsafe char [ ${d} ].`, t.line, n + e.index, this, e.raw);
            }
        });
      }
    };
    var I = {};
    Object.defineProperty(I, "__esModule", { value: !0 }), I.default = {
      id: "attr-value-double-quotes",
      description: "Attribute values must be in double quotes.",
      init(a, s) {
        a.addListener("tagstart", (t) => {
          const r = t.attrs;
          let e;
          const n = t.col + t.tagName.length + 1;
          for (let i = 0, l = r.length; i < l; i++)
            e = r[i], (e.value !== "" && e.quote !== '"' || e.value === "" && e.quote === "'") && s.error(`The value of attribute [ ${e.name} ] must be in double quotes.`, t.line, n + e.index, this, e.raw);
        });
      }
    };
    var z = {};
    Object.defineProperty(z, "__esModule", { value: !0 }), z.default = {
      id: "attr-value-not-empty",
      description: "All attributes must have values.",
      init(a, s) {
        a.addListener("tagstart", (t) => {
          const r = t.attrs;
          let e;
          const n = t.col + t.tagName.length + 1;
          for (let i = 0, l = r.length; i < l; i++)
            e = r[i], e.quote === "" && e.value === "" && s.warn(`The attribute [ ${e.name} ] must have a value.`, t.line, n + e.index, this, e.raw);
        });
      }
    };
    var H = {};
    Object.defineProperty(H, "__esModule", { value: !0 }), H.default = {
      id: "attr-value-single-quotes",
      description: "Attribute values must be in single quotes.",
      init(a, s) {
        a.addListener("tagstart", (t) => {
          const r = t.attrs;
          let e;
          const n = t.col + t.tagName.length + 1;
          for (let i = 0, l = r.length; i < l; i++)
            e = r[i], (e.value !== "" && e.quote !== "'" || e.value === "" && e.quote === '"') && s.error(`The value of attribute [ ${e.name} ] must be in single quotes.`, t.line, n + e.index, this, e.raw);
        });
      }
    };
    var U = {};
    Object.defineProperty(U, "__esModule", { value: !0 }), U.default = {
      id: "attr-whitespace",
      description: "All attributes should be separated by only one space and not have leading/trailing whitespace.",
      init(a, s, t) {
        const r = Array.isArray(t) ? t : [];
        a.addListener("tagstart", (e) => {
          const n = e.attrs;
          let i;
          const l = e.col + e.tagName.length + 1;
          n.forEach((o) => {
            i = o;
            const u = o.name;
            r.indexOf(u) === -1 && (o.value.trim() !== o.value && s.error(`The attributes of [ ${u} ] must not have leading or trailing whitespace.`, e.line, l + i.index, this, i.raw), o.value.replace(/ +(?= )/g, "") !== o.value && s.error(`The attributes of [ ${u} ] must be separated by only one space.`, e.line, l + i.index, this, i.raw));
          });
        });
      }
    };
    var V = {};
    Object.defineProperty(V, "__esModule", { value: !0 }), V.default = {
      id: "doctype-first",
      description: "Doctype must be declared first.",
      init(a, s) {
        const t = (r) => {
          r.type === "start" || r.type === "text" && /^\s*$/.test(r.raw) || ((r.type !== "comment" && r.long === !1 || /^DOCTYPE\s+/i.test(r.content) === !1) && s.error("Doctype must be declared first.", r.line, r.col, this, r.raw), a.removeListener("all", t));
        };
        a.addListener("all", t);
      }
    };
    var Z = {};
    Object.defineProperty(Z, "__esModule", { value: !0 }), Z.default = {
      id: "doctype-html5",
      description: 'Invalid doctype. Use: "<!DOCTYPE html>"',
      init(a, s) {
        const t = (e) => {
          e.long === !1 && e.content.toLowerCase() !== "doctype html" && s.warn('Invalid doctype. Use: "<!DOCTYPE html>"', e.line, e.col, this, e.raw);
        }, r = () => {
          a.removeListener("comment", t), a.removeListener("tagstart", r);
        };
        a.addListener("all", t), a.addListener("tagstart", r);
      }
    };
    var W = {};
    Object.defineProperty(W, "__esModule", { value: !0 }), W.default = {
      id: "head-script-disabled",
      description: "The <script> tag cannot be used in a <head> tag.",
      init(a, s) {
        const t = /^(text\/javascript|application\/javascript)$/i;
        let r = !1;
        const e = (i) => {
          const o = a.getMapAttrs(i.attrs).type, u = i.tagName.toLowerCase();
          u === "head" && (r = !0), r === !0 && u === "script" && (!o || t.test(o) === !0) && s.warn("The <script> tag cannot be used in a <head> tag.", i.line, i.col, this, i.raw);
        }, n = (i) => {
          i.tagName.toLowerCase() === "head" && (a.removeListener("tagstart", e), a.removeListener("tagend", n));
        };
        a.addListener("tagstart", e), a.addListener("tagend", n);
      }
    };
    var F = {};
    Object.defineProperty(F, "__esModule", { value: !0 }), F.default = {
      id: "href-abs-or-rel",
      description: "An href attribute must be either absolute or relative.",
      init(a, s, t) {
        const r = t === "abs" ? "absolute" : "relative";
        a.addListener("tagstart", (e) => {
          const n = e.attrs;
          let i;
          const l = e.col + e.tagName.length + 1;
          for (let o = 0, u = n.length; o < u; o++)
            if (i = n[o], i.name === "href") {
              (r === "absolute" && /^\w+?:/.test(i.value) === !1 || r === "relative" && /^https?:\/\//.test(i.value) === !0) && s.warn(`The value of the href attribute [ ${i.value} ] must be ${r}.`, e.line, l + i.index, this, i.raw);
              break;
            }
        });
      }
    };
    var B = {};
    Object.defineProperty(B, "__esModule", { value: !0 });
    const ve = "(?<grandfathered>(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)|(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang))", Le = "(?<privateUse>x(-[A-Za-z0-9]{1,8})+)", Te = "(?<privateUse2>x(-[A-Za-z0-9]{1,8})+)", Oe = `((?<language>([A-Za-z]{2,3}(-(?<extlang>[A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-(?<script>[A-Za-z]{4}))?(-(?<region>[A-Za-z]{2}|[0-9]{3}))?(-(?<variant>[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-(?<extension>[0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-${Le})?)`, je = `(${ve}|${Oe}|${Te})`;
    B.default = {
      id: "html-lang-require",
      description: "The lang attribute of an <html> element must be present and should be valid.",
      init(a, s) {
        a.addListener("tagstart", (t) => {
          const r = t.tagName.toLowerCase(), e = a.getMapAttrs(t.attrs), n = t.col + r.length + 1, i = new RegExp(je, "g");
          r === "html" && ("lang" in e ? e.lang ? i.test(e.lang) || s.warn("The lang attribute value of <html> element must be a valid BCP47.", t.line, n, this, t.raw) : s.warn("The lang attribute of <html> element must have a value.", t.line, n, this, t.raw) : s.warn("An lang attribute must be present on <html> elements.", t.line, n, this, t.raw));
        });
      }
    };
    var Y = {};
    Object.defineProperty(Y, "__esModule", { value: !0 }), Y.default = {
      id: "id-class-ad-disabled",
      description: "The id and class attributes cannot use the ad keyword, it will be blocked by adblock software.",
      init(a, s) {
        a.addListener("tagstart", (t) => {
          const r = t.attrs;
          let e, n;
          const i = t.col + t.tagName.length + 1;
          for (let l = 0, o = r.length; l < o; l++)
            e = r[l], n = e.name, /^(id|class)$/i.test(n) && /(^|[-_])ad([-_]|$)/i.test(e.value) && s.warn(`The value of attribute ${n} cannot use the ad keyword.`, t.line, i + e.index, this, e.raw);
        });
      }
    };
    var Q = {};
    Object.defineProperty(Q, "__esModule", { value: !0 }), Q.default = {
      id: "id-class-value",
      description: "The id and class attribute values must meet the specified rules.",
      init(a, s, t) {
        const r = {
          underline: {
            regId: /^[a-z\d]+(_[a-z\d]+)*$/,
            message: "The id and class attribute values must be in lowercase and split by an underscore."
          },
          dash: {
            regId: /^[a-z\d]+(-[a-z\d]+)*$/,
            message: "The id and class attribute values must be in lowercase and split by a dash."
          },
          hump: {
            regId: /^[a-z][a-zA-Z\d]*([A-Z][a-zA-Z\d]*)*$/,
            message: "The id and class attribute values must meet the camelCase style."
          }
        };
        let e;
        if (typeof t == "string" ? e = r[t] : e = t, typeof e == "object" && e.regId) {
          let n = e.regId;
          const i = e.message;
          n instanceof RegExp || (n = new RegExp(n)), a.addListener("tagstart", (l) => {
            const o = l.attrs;
            let u;
            const d = l.col + l.tagName.length + 1;
            for (let c = 0, g = o.length; c < g; c++)
              if (u = o[c], u.name.toLowerCase() === "id" && n.test(u.value) === !1 && s.warn(i, l.line, d + u.index, this, u.raw), u.name.toLowerCase() === "class") {
                const f = u.value.split(/\s+/g);
                let _;
                for (let b = 0, v = f.length; b < v; b++)
                  _ = f[b], _ && n.test(_) === !1 && s.warn(i, l.line, d + u.index, this, _);
              }
          });
        }
      }
    };
    var J = {};
    Object.defineProperty(J, "__esModule", { value: !0 }), J.default = {
      id: "id-unique",
      description: "The value of id attributes must be unique.",
      init(a, s) {
        const t = {};
        a.addListener("tagstart", (r) => {
          const e = r.attrs;
          let n, i;
          const l = r.col + r.tagName.length + 1;
          for (let o = 0, u = e.length; o < u; o++)
            if (n = e[o], n.name.toLowerCase() === "id") {
              i = n.value, i && (t[i] === void 0 ? t[i] = 1 : t[i]++, t[i] > 1 && s.error(`The id value [ ${i} ] must be unique.`, r.line, l + n.index, this, n.raw));
              break;
            }
        });
      }
    };
    var X = {};
    Object.defineProperty(X, "__esModule", { value: !0 }), X.default = {
      id: "inline-script-disabled",
      description: "Inline script cannot be used.",
      init(a, s) {
        a.addListener("tagstart", (t) => {
          const r = t.attrs;
          let e;
          const n = t.col + t.tagName.length + 1;
          let i;
          const l = /^on(unload|message|submit|select|scroll|resize|mouseover|mouseout|mousemove|mouseleave|mouseenter|mousedown|load|keyup|keypress|keydown|focus|dblclick|click|change|blur|error)$/i;
          for (let o = 0, u = r.length; o < u; o++)
            e = r[o], i = e.name.toLowerCase(), l.test(i) === !0 ? s.warn(`Inline script [ ${e.raw} ] cannot be used.`, t.line, n + e.index, this, e.raw) : (i === "src" || i === "href") && /^\s*javascript:/i.test(e.value) && s.warn(`Inline script [ ${e.raw} ] cannot be used.`, t.line, n + e.index, this, e.raw);
        });
      }
    };
    var G = {};
    Object.defineProperty(G, "__esModule", { value: !0 }), G.default = {
      id: "inline-style-disabled",
      description: "Inline style cannot be used.",
      init(a, s) {
        a.addListener("tagstart", (t) => {
          const r = t.attrs;
          let e;
          const n = t.col + t.tagName.length + 1;
          for (let i = 0, l = r.length; i < l; i++)
            e = r[i], e.name.toLowerCase() === "style" && s.warn(`Inline style [ ${e.raw} ] cannot be used.`, t.line, n + e.index, this, e.raw);
        });
      }
    };
    var K = {};
    Object.defineProperty(K, "__esModule", { value: !0 }), K.default = {
      id: "input-requires-label",
      description: "All [ input ] tags must have a corresponding [ label ] tag. ",
      init(a, s) {
        const t = [], r = [];
        a.addListener("tagstart", (n) => {
          const i = n.tagName.toLowerCase(), l = a.getMapAttrs(n.attrs), o = n.col + i.length + 1;
          i === "input" && l.type !== "hidden" && r.push({ event: n, col: o, id: l.id }), i === "label" && "for" in l && l.for !== "" && t.push({ event: n, col: o, forValue: l.for });
        }), a.addListener("end", () => {
          r.forEach((n) => {
            e(n) || s.warn("No matching [ label ] tag found.", n.event.line, n.col, this, n.event.raw);
          });
        });
        function e(n) {
          let i = !1;
          return t.forEach((l) => {
            n.id && n.id === l.forValue && (i = !0);
          }), i;
        }
      }
    };
    var ee = {};
    Object.defineProperty(ee, "__esModule", { value: !0 }), ee.default = {
      id: "script-disabled",
      description: "The <script> tag cannot be used.",
      init(a, s) {
        a.addListener("tagstart", (t) => {
          t.tagName.toLowerCase() === "script" && s.error("The <script> tag cannot be used.", t.line, t.col, this, t.raw);
        });
      }
    };
    var te = {};
    Object.defineProperty(te, "__esModule", { value: !0 }), te.default = {
      id: "space-tab-mixed-disabled",
      description: "Do not mix tabs and spaces for indentation.",
      init(a, s, t) {
        let r = "nomix", e = null;
        if (typeof t == "string") {
          const n = /^([a-z]+)(\d+)?/.exec(t);
          n && (r = n[1], e = n[2] && parseInt(n[2], 10));
        }
        a.addListener("text", (n) => {
          const i = n.raw, l = /(^|\r?\n)([ \t]+)/g;
          let o;
          for (; o = l.exec(i); ) {
            const u = a.fixPos(n, o.index + o[1].length);
            if (u.col !== 1)
              continue;
            const d = o[2];
            r === "space" ? e ? (/^ +$/.test(d) === !1 || d.length % e !== 0) && s.warn(`Please use space for indentation and keep ${e} length.`, u.line, 1, this, n.raw) : /^ +$/.test(d) === !1 && s.warn("Please use space for indentation.", u.line, 1, this, n.raw) : r === "tab" && /^\t+$/.test(d) === !1 ? s.warn("Please use tab for indentation.", u.line, 1, this, n.raw) : / +\t|\t+ /.test(d) === !0 && s.warn("Do not mix tabs and spaces for indentation.", u.line, 1, this, n.raw);
          }
        });
      }
    };
    var ae = {};
    Object.defineProperty(ae, "__esModule", { value: !0 }), ae.default = {
      id: "spec-char-escape",
      description: "Special characters must be escaped.",
      init(a, s) {
        a.addListener("text", (t) => {
          const r = t.raw, e = /([<>])|( \& )/g;
          let n;
          for (; n = e.exec(r); ) {
            const i = a.fixPos(t, n.index);
            s.error(`Special characters must be escaped : [ ${n[0]} ].`, i.line, i.col, this, t.raw);
          }
        });
      }
    };
    var re = {};
    Object.defineProperty(re, "__esModule", { value: !0 }), re.default = {
      id: "src-not-empty",
      description: "The src attribute of an img(script,link) must have a value.",
      init(a, s) {
        a.addListener("tagstart", (t) => {
          const r = t.tagName, e = t.attrs;
          let n;
          const i = t.col + r.length + 1;
          for (let l = 0, o = e.length; l < o; l++)
            n = e[l], (/^(img|script|embed|bgsound|iframe)$/.test(r) === !0 && n.name === "src" || r === "link" && n.name === "href" || r === "object" && n.name === "data") && n.value === "" && s.error(`The attribute [ ${n.name} ] of the tag [ ${r} ] must have a value.`, t.line, i + n.index, this, n.raw);
        });
      }
    };
    var ie = {};
    Object.defineProperty(ie, "__esModule", { value: !0 }), ie.default = {
      id: "style-disabled",
      description: "<style> tags cannot be used.",
      init(a, s) {
        a.addListener("tagstart", (t) => {
          t.tagName.toLowerCase() === "style" && s.warn("The <style> tag cannot be used.", t.line, t.col, this, t.raw);
        });
      }
    };
    var ne = {};
    Object.defineProperty(ne, "__esModule", { value: !0 }), ne.default = {
      id: "tag-pair",
      description: "Tag must be paired.",
      init(a, s) {
        const t = [], r = a.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr");
        a.addListener("tagstart", (e) => {
          const n = e.tagName.toLowerCase();
          r[n] === void 0 && !e.close && t.push({
            tagName: n,
            line: e.line,
            raw: e.raw
          });
        }), a.addListener("tagend", (e) => {
          const n = e.tagName.toLowerCase();
          let i;
          for (i = t.length - 1; i >= 0 && t[i].tagName !== n; i--)
            ;
          if (i >= 0) {
            const l = [];
            for (let o = t.length - 1; o > i; o--)
              l.push(`</${t[o].tagName}>`);
            if (l.length > 0) {
              const o = t[t.length - 1];
              s.error(`Tag must be paired, missing: [ ${l.join("")} ], start tag match failed [ ${o.raw} ] on line ${o.line}.`, e.line, e.col, this, e.raw);
            }
            t.length = i;
          } else
            s.error(`Tag must be paired, no start tag: [ ${e.raw} ]`, e.line, e.col, this, e.raw);
        }), a.addListener("end", (e) => {
          const n = [];
          for (let i = t.length - 1; i >= 0; i--)
            n.push(`</${t[i].tagName}>`);
          if (n.length > 0) {
            const i = t[t.length - 1];
            s.error(`Tag must be paired, missing: [ ${n.join("")} ], open tag match failed [ ${i.raw} ] on line ${i.line}.`, e.line, e.col, this, "");
          }
        });
      }
    };
    var se = {};
    Object.defineProperty(se, "__esModule", { value: !0 }), se.default = {
      id: "tag-self-close",
      description: "Empty tags must be self closed.",
      init(a, s) {
        const t = a.makeMap("area,base,basefont,bgsound,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr");
        a.addListener("tagstart", (r) => {
          const e = r.tagName.toLowerCase();
          t[e] !== void 0 && (r.close || s.warn(`The empty tag : [ ${e} ] must be self closed.`, r.line, r.col, this, r.raw));
        });
      }
    };
    var le = {};
    Object.defineProperty(le, "__esModule", { value: !0 }), le.default = {
      id: "empty-tag-not-self-closed",
      description: "Empty tags must not use self closed syntax.",
      init(a, s) {
        const t = a.makeMap("area,base,basefont,bgsound,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr");
        a.addListener("tagstart", (r) => {
          const e = r.tagName.toLowerCase();
          t[e] !== void 0 && r.close && s.error(`The empty tag : [ ${e} ] must not use self closed syntax.`, r.line, r.col, this, r.raw);
        });
      }
    };
    var oe = {};
    Object.defineProperty(oe, "__esModule", { value: !0 }), oe.default = {
      id: "tagname-lowercase",
      description: "All html element names must be in lowercase.",
      init(a, s, t) {
        const r = Array.isArray(t) ? t : [];
        a.addListener("tagstart,tagend", (e) => {
          const n = e.tagName;
          r.indexOf(n) === -1 && n !== n.toLowerCase() && s.error(`The html element name of [ ${n} ] must be in lowercase.`, e.line, e.col, this, e.raw);
        });
      }
    };
    var ue = {};
    Object.defineProperty(ue, "__esModule", { value: !0 }), ue.default = {
      id: "tagname-specialchars",
      description: "All special characters must be escaped.",
      init(a, s) {
        const t = /[^a-zA-Z0-9\-:_]/;
        a.addListener("tagstart,tagend", (r) => {
          const e = r.tagName;
          t.test(e) && s.error(`The html element name of [ ${e} ] contains special character.`, r.line, r.col, this, r.raw);
        });
      }
    };
    var de = {};
    Object.defineProperty(de, "__esModule", { value: !0 }), de.default = {
      id: "title-require",
      description: "<title> must be present in <head> tag.",
      init(a, s) {
        let t = !1, r = !1;
        const e = (i) => {
          const l = i.tagName.toLowerCase();
          l === "head" ? t = !0 : l === "title" && t && (r = !0);
        }, n = (i) => {
          const l = i.tagName.toLowerCase();
          if (r && l === "title") {
            const o = i.lastEvent;
            (o.type !== "text" || o.type === "text" && /^\s*$/.test(o.raw) === !0) && s.error("<title></title> must not be empty.", i.line, i.col, this, i.raw);
          } else
            l === "head" && (r === !1 && s.error("<title> must be present in <head> tag.", i.line, i.col, this, i.raw), a.removeListener("tagstart", e), a.removeListener("tagend", n));
        };
        a.addListener("tagstart", e), a.addListener("tagend", n);
      }
    };
    var ce = {};
    Object.defineProperty(ce, "__esModule", { value: !0 });
    let k = {
      a: {
        selfclosing: !1,
        attrsRequired: ["href", "title"],
        redundantAttrs: ["alt"]
      },
      div: {
        selfclosing: !1
      },
      main: {
        selfclosing: !1,
        redundantAttrs: ["role"]
      },
      nav: {
        selfclosing: !1,
        redundantAttrs: ["role"]
      },
      script: {
        attrsOptional: [
          ["async", "async"],
          ["defer", "defer"]
        ]
      },
      img: {
        selfclosing: !0,
        attrsRequired: ["src", "alt", "title"]
      }
    };
    ce.default = {
      id: "tags-check",
      description: "Checks html tags.",
      init(a, s, t) {
        k = Object.assign(Object.assign({}, k), t), a.addListener("tagstart", (r) => {
          const e = r.attrs, n = r.col + r.tagName.length + 1, i = r.tagName.toLowerCase();
          if (k[i]) {
            const l = k[i];
            l.selfclosing === !0 && !r.close ? s.warn(`The <${i}> tag must be selfclosing.`, r.line, r.col, this, r.raw) : l.selfclosing === !1 && r.close && s.warn(`The <${i}> tag must not be selfclosing.`, r.line, r.col, this, r.raw), Array.isArray(l.attrsRequired) && l.attrsRequired.forEach((u) => {
              if (Array.isArray(u)) {
                const d = u.map((f) => f), c = d.shift(), g = d;
                e.some((f) => f.name === c) ? e.forEach((f) => {
                  f.name === c && g.indexOf(f.value) === -1 && s.error(`The <${i}> tag must have attr '${c}' with one value of '${g.join("' or '")}'.`, r.line, n, this, r.raw);
                }) : s.error(`The <${i}> tag must have attr '${c}'.`, r.line, n, this, r.raw);
              } else
                e.some((d) => u.split("|").indexOf(d.name) !== -1) || s.error(`The <${i}> tag must have attr '${u}'.`, r.line, n, this, r.raw);
            }), Array.isArray(l.attrsOptional) && l.attrsOptional.forEach((u) => {
              if (Array.isArray(u)) {
                const d = u.map((f) => f), c = d.shift(), g = d;
                e.some((f) => f.name === c) && e.forEach((f) => {
                  f.name === c && g.indexOf(f.value) === -1 && s.error(`The <${i}> tag must have optional attr '${c}' with one value of '${g.join("' or '")}'.`, r.line, n, this, r.raw);
                });
              }
            }), Array.isArray(l.redundantAttrs) && l.redundantAttrs.forEach((u) => {
              e.some((d) => d.name === u) && s.error(`The attr '${u}' is redundant for <${i}> and should be omitted.`, r.line, n, this, r.raw);
            });
          }
        });
      }
    };
    var fe = {};
    Object.defineProperty(fe, "__esModule", { value: !0 }), fe.default = {
      id: "attr-no-unnecessary-whitespace",
      description: "No spaces between attribute names and values.",
      init(a, s, t) {
        const r = Array.isArray(t) ? t : [];
        a.addListener("tagstart", (e) => {
          const n = e.attrs, i = e.col + e.tagName.length + 1;
          for (let l = 0; l < n.length; l++)
            if (r.indexOf(n[l].name) === -1) {
              const o = /(\s*)=(\s*)/.exec(n[l].raw.trim());
              o && (o[1].length !== 0 || o[2].length !== 0) && s.error(`The attribute '${n[l].name}' must not have spaces between the name and value.`, e.line, i + n[l].index, this, n[l].raw);
            }
        });
      }
    };
    var ge = {};
    Object.defineProperty(ge, "__esModule", { value: !0 });
    const Pe = [
      "a",
      "abbr",
      "address",
      "area",
      "article",
      "aside",
      "audio",
      "b",
      "base",
      "bdi",
      "bdo",
      "blockquote",
      "body",
      "br",
      "button",
      "canvas",
      "caption",
      "cite",
      "code",
      "col",
      "colgroup",
      "data",
      "datalist",
      "dd",
      "del",
      "details",
      "dfn",
      "dialog",
      "div",
      "dl",
      "dt",
      "em",
      "embed",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "head",
      "header",
      "hr",
      "html",
      "i",
      "iframe",
      "img",
      "input",
      "ins",
      "kbd",
      "label",
      "legend",
      "li",
      "link",
      "main",
      "map",
      "mark",
      "meta",
      "meter",
      "nav",
      "noscript",
      "object",
      "ol",
      "optgroup",
      "option",
      "output",
      "p",
      "param",
      "picture",
      "pre",
      "progress",
      "q",
      "rb",
      "rp",
      "rt",
      "rtc",
      "ruby",
      "s",
      "samp",
      "script",
      "section",
      "select",
      "small",
      "source",
      "span",
      "strong",
      "style",
      "sub",
      "summary",
      "sup",
      "table",
      "tbody",
      "td",
      "template",
      "textarea",
      "tfoot",
      "th",
      "thead",
      "time",
      "title",
      "tr",
      "track",
      "u",
      "ul",
      "var",
      "video",
      "wbr"
    ];
    ge.default = {
      id: "attr-invalid",
      description: "All tags must be valid HTML tags.",
      init(a, s) {
        a.addListener("tagstart", (t) => {
          const r = t.tagName;
          Pe.includes(r) || s.error(`The tag [ ${r} ] is not a valid HTML tag.`, t.line, t.col, this, t.raw);
        });
      }
    };
    var he = {};
    Object.defineProperty(he, "__esModule", { value: !0 });
    const Ae = [
      "a",
      "abbr",
      "address",
      "area",
      "article",
      "aside",
      "audio",
      "b",
      "base",
      "bdi",
      "bdo",
      "blockquote",
      "body",
      "br",
      "button",
      "canvas",
      "caption",
      "cite",
      "code",
      "col",
      "colgroup",
      "data",
      "datalist",
      "dd",
      "del",
      "details",
      "dfn",
      "dialog",
      "div",
      "dl",
      "dt",
      "em",
      "embed",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "head",
      "header",
      "hr",
      "html",
      "i",
      "iframe",
      "img",
      "input",
      "ins",
      "kbd",
      "label",
      "legend",
      "li",
      "link",
      "main",
      "map",
      "mark",
      "meta",
      "meter",
      "nav",
      "noscript",
      "object",
      "ol",
      "optgroup",
      "option",
      "output",
      "p",
      "param",
      "picture",
      "pre",
      "progress",
      "q",
      "rb",
      "rp",
      "rt",
      "rtc",
      "ruby",
      "s",
      "samp",
      "script",
      "section",
      "select",
      "small",
      "source",
      "span",
      "strong",
      "style",
      "sub",
      "summary",
      "sup",
      "table",
      "tbody",
      "td",
      "template",
      "textarea",
      "tfoot",
      "th",
      "thead",
      "time",
      "title",
      "tr",
      "track",
      "u",
      "ul",
      "var",
      "video",
      "wbr"
    ];
    he.default = {
      id: "invalid-tag",
      description: "All tags must be valid HTML tags.",
      init(a, s) {
        a.addListener("tagstart", (t) => {
          const r = t.tagName;
          Ae.includes(r) || s.error(`The tag [ ${r} ] is not a valid HTML tag.`, t.line, t.col, this, t.raw);
        });
      }
    }, function(a) {
      Object.defineProperty(a, "__esModule", { value: !0 }), a.invalidTag = a.attrInvalid = a.attrNoUnnecessaryWhitespace = a.tagsCheck = a.titleRequire = a.tagnameSpecialChars = a.tagnameLowercase = a.emptyTagNotSelfClosed = a.tagSelfClose = a.tagPair = a.styleDisabled = a.srcNotEmpty = a.specCharEscape = a.spaceTabMixedDisabled = a.scriptDisabled = a.inputRequiresLabel = a.inlineStyleDisabled = a.inlineScriptDisabled = a.idUnique = a.idClassValue = a.idClsasAdDisabled = a.htmlLangRequire = a.hrefAbsOrRel = a.headScriptDisabled = a.doctypeHTML5 = a.doctypeFirst = a.attrWhitespace = a.attrValueSingleQuotes = a.attrValueNotEmpty = a.attrValueDoubleQuotes = a.attrUnsafeChars = a.attrNoDuplication = a.attrSort = a.attrLowercase = a.altRequire = void 0;
      var s = E;
      Object.defineProperty(a, "altRequire", { enumerable: !0, get: function() {
        return s.default;
      } });
      var t = R;
      Object.defineProperty(a, "attrLowercase", { enumerable: !0, get: function() {
        return t.default;
      } });
      var r = D;
      Object.defineProperty(a, "attrSort", { enumerable: !0, get: function() {
        return r.default;
      } });
      var e = x;
      Object.defineProperty(a, "attrNoDuplication", { enumerable: !0, get: function() {
        return e.default;
      } });
      var n = S;
      Object.defineProperty(a, "attrUnsafeChars", { enumerable: !0, get: function() {
        return n.default;
      } });
      var i = I;
      Object.defineProperty(a, "attrValueDoubleQuotes", { enumerable: !0, get: function() {
        return i.default;
      } });
      var l = z;
      Object.defineProperty(a, "attrValueNotEmpty", { enumerable: !0, get: function() {
        return l.default;
      } });
      var o = H;
      Object.defineProperty(a, "attrValueSingleQuotes", { enumerable: !0, get: function() {
        return o.default;
      } });
      var u = U;
      Object.defineProperty(a, "attrWhitespace", { enumerable: !0, get: function() {
        return u.default;
      } });
      var d = V;
      Object.defineProperty(a, "doctypeFirst", { enumerable: !0, get: function() {
        return d.default;
      } });
      var c = Z;
      Object.defineProperty(a, "doctypeHTML5", { enumerable: !0, get: function() {
        return c.default;
      } });
      var g = W;
      Object.defineProperty(a, "headScriptDisabled", { enumerable: !0, get: function() {
        return g.default;
      } });
      var f = F;
      Object.defineProperty(a, "hrefAbsOrRel", { enumerable: !0, get: function() {
        return f.default;
      } });
      var _ = B;
      Object.defineProperty(a, "htmlLangRequire", { enumerable: !0, get: function() {
        return _.default;
      } });
      var b = Y;
      Object.defineProperty(a, "idClsasAdDisabled", { enumerable: !0, get: function() {
        return b.default;
      } });
      var v = Q;
      Object.defineProperty(a, "idClassValue", { enumerable: !0, get: function() {
        return v.default;
      } });
      var p = J;
      Object.defineProperty(a, "idUnique", { enumerable: !0, get: function() {
        return p.default;
      } });
      var M = X;
      Object.defineProperty(a, "inlineScriptDisabled", { enumerable: !0, get: function() {
        return M.default;
      } });
      var j = G;
      Object.defineProperty(a, "inlineStyleDisabled", { enumerable: !0, get: function() {
        return j.default;
      } });
      var w = K;
      Object.defineProperty(a, "inputRequiresLabel", { enumerable: !0, get: function() {
        return w.default;
      } });
      var L = ee;
      Object.defineProperty(a, "scriptDisabled", { enumerable: !0, get: function() {
        return L.default;
      } });
      var h = te;
      Object.defineProperty(a, "spaceTabMixedDisabled", { enumerable: !0, get: function() {
        return h.default;
      } });
      var P = ae;
      Object.defineProperty(a, "specCharEscape", { enumerable: !0, get: function() {
        return P.default;
      } });
      var T = re;
      Object.defineProperty(a, "srcNotEmpty", { enumerable: !0, get: function() {
        return T.default;
      } });
      var $ = ie;
      Object.defineProperty(a, "styleDisabled", { enumerable: !0, get: function() {
        return $.default;
      } });
      var me = ne;
      Object.defineProperty(a, "tagPair", { enumerable: !0, get: function() {
        return me.default;
      } });
      var Ce = se;
      Object.defineProperty(a, "tagSelfClose", { enumerable: !0, get: function() {
        return Ce.default;
      } });
      var $e = le;
      Object.defineProperty(a, "emptyTagNotSelfClosed", { enumerable: !0, get: function() {
        return $e.default;
      } });
      var Ne = oe;
      Object.defineProperty(a, "tagnameLowercase", { enumerable: !0, get: function() {
        return Ne.default;
      } });
      var ke = ue;
      Object.defineProperty(a, "tagnameSpecialChars", { enumerable: !0, get: function() {
        return ke.default;
      } });
      var qe = de;
      Object.defineProperty(a, "titleRequire", { enumerable: !0, get: function() {
        return qe.default;
      } });
      var Ee = ce;
      Object.defineProperty(a, "tagsCheck", { enumerable: !0, get: function() {
        return Ee.default;
      } });
      var Re = fe;
      Object.defineProperty(a, "attrNoUnnecessaryWhitespace", { enumerable: !0, get: function() {
        return Re.default;
      } });
      var De = ge;
      Object.defineProperty(a, "attrInvalid", { enumerable: !0, get: function() {
        return De.default;
      } });
      var xe = he;
      Object.defineProperty(a, "invalidTag", { enumerable: !0, get: function() {
        return xe.default;
      } });
    }(be), function(a) {
      Object.defineProperty(a, "__esModule", { value: !0 }), a.HTMLParser = a.Reporter = a.HTMLRules = a.HTMLHint = void 0;
      const s = N;
      a.HTMLParser = s.default;
      const t = A;
      a.Reporter = t.default;
      const r = be;
      a.HTMLRules = r;
      class e {
        constructor() {
          this.rules = {}, this.defaultRuleset = {
            "tagname-lowercase": !0,
            "attr-lowercase": !0,
            "attr-value-double-quotes": !0,
            "doctype-first": !0,
            "tag-pair": !0,
            "spec-char-escape": !0,
            "id-unique": !0,
            "src-not-empty": !0,
            "attr-no-duplication": !0,
            "title-require": !0
          };
        }
        addRule(l) {
          this.rules[l.id] = l;
        }
        verify(l, o = this.defaultRuleset) {
          Object.keys(o).length === 0 && (o = this.defaultRuleset), l = l.replace(/^\s*<!--\s*htmlhint\s+([^\r\n]+?)\s*-->/i, (f, _) => (_.replace(/(?:^|,)\s*([^:,]+)\s*(?:\:\s*([^,\s]+))?/g, (b, v, p) => (o[v] = p !== void 0 && p.length > 0 ? JSON.parse(p) : !0, "")), ""));
          const u = new s.default(), d = new t.default(l, o), c = this.rules;
          let g;
          for (const f in o)
            g = c[f], g !== void 0 && o[f] !== !1 && g.init(u, d, o[f]);
          return u.parse(l), d.messages;
        }
        format(l, o = {}) {
          const u = [], d = {
            white: "",
            grey: "",
            red: "",
            reset: ""
          };
          o.colors && (d.white = "\x1B[37m", d.grey = "\x1B[90m", d.red = "\x1B[31m", d.reset = "\x1B[39m");
          const c = o.indent || 0;
          return l.forEach((g) => {
            let b = g.evidence;
            const v = g.line, p = g.col, M = b.length;
            let j = p > 40 + 1 ? p - 40 : 1, w = b.length > p + 60 ? p + 60 : M;
            p < 40 + 1 && (w += 40 - p + 1), b = b.replace(/\t/g, " ").substring(j - 1, w), j > 1 && (b = `...${b}`, j -= 3), w < M && (b += "..."), u.push(`${d.white + n(c)}L${v} |${d.grey}${b}${d.reset}`);
            let L = p - j;
            const h = b.substring(0, L).match(/[^\u0000-\u00ff]/g);
            h !== null && (L += h.length), u.push(`${d.white + n(c) + n(String(v).length + 3 + L)}^ ${d.red}${g.message} (${g.rule.id})${d.reset}`);
          }), u;
        }
      }
      function n(i, l) {
        return new Array(i + 1).join(l || " ");
      }
      a.HTMLHint = new e(), Object.keys(r).forEach((i) => {
        a.HTMLHint.addRule(r[i]);
      });
    }(O);
    var Me = /* @__PURE__ */ m(O);
    return Me;
  });
})(pe);
var Ie = pe.exports;
const ze = (C) => {
  const y = C.split(" ");
  for (var m = 0; m < y.length; m++)
    y[m] = y[m].charAt(0).toUpperCase() + y[m].slice(1);
  return y.join(" ");
}, He = {
  "tagname-lowercase": !0,
  "attr-lowercase": !0,
  "attr-invalid": !0,
  "invalid-tag": !0,
  "attr-value-double-quotes": !0,
  "doctype-first": !0,
  "tag-pair": !0,
  "spec-char-escape": !0,
  "id-unique": !0,
  "src-not-empty": !0,
  "attr-no-duplication": !0,
  "title-require": !0
};
class Ue {
  constructor(y, m = He, O) {
    this.html = y, this.ruleset = m, this.linterResponse = this.lint(), this.model = O;
  }
  lint() {
    return Ie.HTMLHint.verify(this.html, this.ruleset);
  }
  getEditorMarks(y) {
    return this.linterResponse.map((m) => ({
      startLineNumber: m.line,
      startColumn: m.col,
      endLineNumber: m.line,
      endColumn: m.evidence !== "" ? m.col + m.evidence.length : this.model !== void 0 ? this.model.getLineLength(m.line) : m.col + 1,
      message: m.message,
      severity: y.MarkerSeverity[ze(m.type)]
    }));
  }
  getLinterResponse() {
    return this.linterResponse;
  }
}
class Ge {
  constructor(y, m, O) {
    this.editor = y, this.monaco = m, this.ruleset = O;
  }
  lint() {
    var O;
    const y = this.editor.getValue();
    if (((O = this.editor.getModel()) == null ? void 0 : O.getLanguageId()) === "html") {
      const q = new Ue(y, this.ruleset, this.editor.getModel() || void 0).getEditorMarks(this.monaco), A = this.editor.getModel();
      if (A === null)
        throw new Error("Your model still does't exist.");
      this.monaco.editor.setModelMarkers(A, "owner", q);
    }
  }
  watch() {
    this.lint(), this.editor.onDidChangeModelContent((y) => {
      this.lint();
    });
  }
}
export {
  Ue as HTMLMonacoMarks,
  Ge as default
};
