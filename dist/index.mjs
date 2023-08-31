var Re = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, pe = { exports: {} };
(function(M, y) {
  (function(m, O) {
    M.exports = O();
  })(Re, function() {
    function m(r) {
      return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
    }
    var O = {}, N = {};
    Object.defineProperty(N, "__esModule", { value: !0 });
    class q {
      constructor() {
        this._listeners = {}, this._mapCdataTags = this.makeMap("script,style"), this._arrBlocks = [], this.lastEvent = null;
      }
      makeMap(s) {
        const t = {}, a = s.split(",");
        for (let e = 0; e < a.length; e++)
          t[a[e]] = !0;
        return t;
      }
      parse(s) {
        const t = this._mapCdataTags, a = /<(?:\/([^\s>]+)\s*|!--([\s\S]*?)--|!([^>]*?)|([\w\-:]+)((?:\s+[^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]*))?)*?)\s*(\/?))>/g, e = /\s*([^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+)(?:\s*=\s*(?:(")([^"]*)"|(')([^']*)'|([^\s"'>]*)))?/g, n = /\r?\n/g;
        let i, l, o = 0, u, d, c = null, g, f = [], _ = 0, p, L = 0, b = 1;
        const P = this._arrBlocks;
        this.fire("start", {
          pos: 0,
          line: 1,
          col: 1
        });
        const j = () => {
          const v = d.find((h) => h.name === "type") || {
            value: ""
          };
          return t[u] && v.value.indexOf("text/ng-template") === -1;
        }, w = (v, h, A, T) => {
          const $ = A - L + 1;
          for (T === void 0 && (T = {}), T.raw = h, T.pos = A, T.line = b, T.col = $, P.push(T), this.fire(v, T); n.exec(h); )
            b++, L = A + n.lastIndex;
        };
        for (; i = a.exec(s); ) {
          if (l = i.index, l > o && (p = s.substring(o, l), c ? f.push(p) : w("text", p, o)), o = a.lastIndex, (u = i[1]) && (c && u === c && (p = f.join(""), w("cdata", p, _, {
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
            const v = i[5];
            let h, A = 0;
            for (; h = e.exec(v); ) {
              const T = h[1], $ = h[2] ? h[2] : h[4] ? h[4] : "", he = h[3] ? h[3] : h[5] ? h[5] : h[6] ? h[6] : "";
              d.push({
                name: T,
                value: he,
                quote: $,
                index: h.index,
                raw: h[0]
              }), A += h[0].length;
            }
            A === v.length ? (w("tagstart", i[0], l, {
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
        s.length > o && (p = s.substring(o, s.length), w("text", p, o)), this.fire("end", {
          pos: o,
          line: b,
          col: s.length - L + 1
        });
      }
      addListener(s, t) {
        const a = this._listeners, e = s.split(/[,\s]/);
        let n;
        for (let i = 0, l = e.length; i < l; i++)
          n = e[i], a[n] === void 0 && (a[n] = []), a[n].push(t);
      }
      fire(s, t) {
        t === void 0 && (t = {}), t.type = s;
        let a = [];
        const e = this._listeners[s], n = this._listeners.all;
        e !== void 0 && (a = a.concat(e)), n !== void 0 && (a = a.concat(n));
        const i = this.lastEvent;
        i !== null && (delete i.lastEvent, t.lastEvent = i), this.lastEvent = t;
        for (let l = 0, o = a.length; l < o; l++)
          a[l].call(this, t);
      }
      removeListener(s, t) {
        const a = this._listeners[s];
        if (a !== void 0) {
          for (let e = 0, n = a.length; e < n; e++)
            if (a[e] === t) {
              a.splice(e, 1);
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
        let a;
        for (let e = 0, n = s.length; e < n; e++)
          a = s[e], t[a.name] = a.value;
        return t;
      }
    }
    N.default = q;
    var C = {};
    Object.defineProperty(C, "__esModule", { value: !0 });
    class be {
      constructor(s, t) {
        this.html = s, this.lines = s.split(/\r?\n/);
        const a = /\r?\n/.exec(s);
        this.brLen = a !== null ? a[0].length : 0, this.ruleset = t, this.messages = [];
      }
      info(s, t, a, e, n) {
        this.report("info", s, t, a, e, n);
      }
      warn(s, t, a, e, n) {
        this.report("warning", s, t, a, e, n);
      }
      error(s, t, a, e, n) {
        this.report("error", s, t, a, e, n);
      }
      report(s, t, a, e, n, i) {
        const l = this.lines, o = this.brLen;
        let u = "", d = 0;
        for (let c = a - 1, g = l.length; c < g && (u = l[c], d = u.length, e > d && a < g); c++)
          a++, e -= d, e !== 1 && (e -= o);
        this.messages.push({
          type: s,
          message: t,
          raw: i,
          evidence: u,
          line: a,
          col: e,
          rule: {
            id: n.id,
            description: n.description,
            link: `https://htmlhint.com/docs/user-guide/rules/${n.id}`
          }
        });
      }
    }
    C.default = be;
    var me = {}, E = {};
    Object.defineProperty(E, "__esModule", { value: !0 }), E.default = {
      id: "alt-require",
      description: "The alt attribute of an <img> element must be present and alt attribute of area[href] and input[type=image] must have a value.",
      init(r, s) {
        r.addListener("tagstart", (t) => {
          const a = t.tagName.toLowerCase(), e = r.getMapAttrs(t.attrs), n = t.col + a.length + 1;
          let i;
          a === "img" && !("alt" in e) ? s.warn("An alt attribute must be present on <img> elements.", t.line, n, this, t.raw) : (a === "area" && "href" in e || a === "input" && e.type === "image") && (!("alt" in e) || e.alt === "") && (i = a === "area" ? "area[href]" : "input[type=image]", s.warn(`The alt attribute of ${i} must have a value.`, t.line, n, this, t.raw));
        });
      }
    };
    var R = {};
    Object.defineProperty(R, "__esModule", { value: !0 });
    const ye = [
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
    function we(r, s) {
      if (s instanceof RegExp)
        return s.test(r) ? { match: r, pattern: s } : !1;
      const t = s[0], a = s[s.length - 1], e = s[s.length - 2], n = t === "/" && (a === "/" || e === "/" && a === "i"), i = n && a === "i";
      return n ? i ? new RegExp(s.slice(1, -2), "i").test(r) : new RegExp(s.slice(1, -1)).test(r) : r === s;
    }
    R.default = {
      id: "attr-lowercase",
      description: "All attribute names must be in lowercase.",
      init(r, s, t) {
        const a = (Array.isArray(t) ? t : []).concat(ye);
        r.addListener("tagstart", (e) => {
          const n = e.attrs;
          let i;
          const l = e.col + e.tagName.length + 1;
          for (let o = 0, u = n.length; o < u; o++) {
            i = n[o];
            const d = i.name;
            !a.find((c) => we(d, c)) && d !== d.toLowerCase() && s.error(`The attribute name of [ ${d} ] must be in lowercase.`, e.line, l + i.index, this, i.raw);
          }
        });
      }
    };
    var x = {};
    Object.defineProperty(x, "__esModule", { value: !0 }), x.default = {
      id: "attr-sorted",
      description: "Attribute tags must be in proper order.",
      init(r, s) {
        const t = {}, a = [
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
        for (let e = 0; e < a.length; e++)
          t[a[e]] = e;
        r.addListener("tagstart", (e) => {
          const n = e.attrs, i = [];
          for (let o = 0; o < n.length; o++)
            i.push(n[o].name);
          const l = JSON.stringify(i);
          i.sort((o, u) => t[o] == null && t[u] == null ? 0 : t[o] == null ? 1 : t[u] == null ? -1 : t[o] - t[u] || o.localeCompare(u)), l !== JSON.stringify(i) && s.error(`Inaccurate order ${l} should be in hierarchy ${JSON.stringify(i)} `, e.line, e.col, this, e.raw);
        });
      }
    };
    var D = {};
    Object.defineProperty(D, "__esModule", { value: !0 }), D.default = {
      id: "attr-no-duplication",
      description: "Elements cannot have duplicate attributes.",
      init(r, s) {
        r.addListener("tagstart", (t) => {
          const a = t.attrs;
          let e, n;
          const i = t.col + t.tagName.length + 1, l = {};
          for (let o = 0, u = a.length; o < u; o++)
            e = a[o], n = e.name, l[n] === !0 && s.error(`Duplicate of attribute name [ ${e.name} ] was found.`, t.line, i + e.index, this, e.raw), l[n] = !0;
        });
      }
    };
    var S = {};
    Object.defineProperty(S, "__esModule", { value: !0 }), S.default = {
      id: "attr-unsafe-chars",
      description: "Attribute values cannot contain unsafe chars.",
      init(r, s) {
        r.addListener("tagstart", (t) => {
          const a = t.attrs;
          let e;
          const n = t.col + t.tagName.length + 1, i = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/;
          let l;
          for (let o = 0, u = a.length; o < u; o++)
            if (e = a[o], l = i.exec(e.value), l !== null) {
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
      init(r, s) {
        r.addListener("tagstart", (t) => {
          const a = t.attrs;
          let e;
          const n = t.col + t.tagName.length + 1;
          for (let i = 0, l = a.length; i < l; i++)
            e = a[i], (e.value !== "" && e.quote !== '"' || e.value === "" && e.quote === "'") && s.error(`The value of attribute [ ${e.name} ] must be in double quotes.`, t.line, n + e.index, this, e.raw);
        });
      }
    };
    var z = {};
    Object.defineProperty(z, "__esModule", { value: !0 }), z.default = {
      id: "attr-value-not-empty",
      description: "All attributes must have values.",
      init(r, s) {
        r.addListener("tagstart", (t) => {
          const a = t.attrs;
          let e;
          const n = t.col + t.tagName.length + 1;
          for (let i = 0, l = a.length; i < l; i++)
            e = a[i], e.quote === "" && e.value === "" && s.warn(`The attribute [ ${e.name} ] must have a value.`, t.line, n + e.index, this, e.raw);
        });
      }
    };
    var U = {};
    Object.defineProperty(U, "__esModule", { value: !0 }), U.default = {
      id: "attr-value-single-quotes",
      description: "Attribute values must be in single quotes.",
      init(r, s) {
        r.addListener("tagstart", (t) => {
          const a = t.attrs;
          let e;
          const n = t.col + t.tagName.length + 1;
          for (let i = 0, l = a.length; i < l; i++)
            e = a[i], (e.value !== "" && e.quote !== "'" || e.value === "" && e.quote === '"') && s.error(`The value of attribute [ ${e.name} ] must be in single quotes.`, t.line, n + e.index, this, e.raw);
        });
      }
    };
    var H = {};
    Object.defineProperty(H, "__esModule", { value: !0 }), H.default = {
      id: "attr-whitespace",
      description: "All attributes should be separated by only one space and not have leading/trailing whitespace.",
      init(r, s, t) {
        const a = Array.isArray(t) ? t : [];
        r.addListener("tagstart", (e) => {
          const n = e.attrs;
          let i;
          const l = e.col + e.tagName.length + 1;
          n.forEach((o) => {
            i = o;
            const u = o.name;
            a.indexOf(u) === -1 && (o.value.trim() !== o.value && s.error(`The attributes of [ ${u} ] must not have leading or trailing whitespace.`, e.line, l + i.index, this, i.raw), o.value.replace(/ +(?= )/g, "") !== o.value && s.error(`The attributes of [ ${u} ] must be separated by only one space.`, e.line, l + i.index, this, i.raw));
          });
        });
      }
    };
    var V = {};
    Object.defineProperty(V, "__esModule", { value: !0 }), V.default = {
      id: "doctype-first",
      description: "Doctype must be declared first.",
      init(r, s) {
        const t = (a) => {
          a.type === "start" || a.type === "text" && /^\s*$/.test(a.raw) || ((a.type !== "comment" && a.long === !1 || /^DOCTYPE\s+/i.test(a.content) === !1) && s.error("Doctype must be declared first.", a.line, a.col, this, a.raw), r.removeListener("all", t));
        };
        r.addListener("all", t);
      }
    };
    var Z = {};
    Object.defineProperty(Z, "__esModule", { value: !0 }), Z.default = {
      id: "doctype-html5",
      description: 'Invalid doctype. Use: "<!DOCTYPE html>"',
      init(r, s) {
        const t = (e) => {
          e.long === !1 && e.content.toLowerCase() !== "doctype html" && s.warn('Invalid doctype. Use: "<!DOCTYPE html>"', e.line, e.col, this, e.raw);
        }, a = () => {
          r.removeListener("comment", t), r.removeListener("tagstart", a);
        };
        r.addListener("all", t), r.addListener("tagstart", a);
      }
    };
    var W = {};
    Object.defineProperty(W, "__esModule", { value: !0 }), W.default = {
      id: "head-script-disabled",
      description: "The <script> tag cannot be used in a <head> tag.",
      init(r, s) {
        const t = /^(text\/javascript|application\/javascript)$/i;
        let a = !1;
        const e = (i) => {
          const o = r.getMapAttrs(i.attrs).type, u = i.tagName.toLowerCase();
          u === "head" && (a = !0), a === !0 && u === "script" && (!o || t.test(o) === !0) && s.warn("The <script> tag cannot be used in a <head> tag.", i.line, i.col, this, i.raw);
        }, n = (i) => {
          i.tagName.toLowerCase() === "head" && (r.removeListener("tagstart", e), r.removeListener("tagend", n));
        };
        r.addListener("tagstart", e), r.addListener("tagend", n);
      }
    };
    var F = {};
    Object.defineProperty(F, "__esModule", { value: !0 }), F.default = {
      id: "href-abs-or-rel",
      description: "An href attribute must be either absolute or relative.",
      init(r, s, t) {
        const a = t === "abs" ? "absolute" : "relative";
        r.addListener("tagstart", (e) => {
          const n = e.attrs;
          let i;
          const l = e.col + e.tagName.length + 1;
          for (let o = 0, u = n.length; o < u; o++)
            if (i = n[o], i.name === "href") {
              (a === "absolute" && /^\w+?:/.test(i.value) === !1 || a === "relative" && /^https?:\/\//.test(i.value) === !0) && s.warn(`The value of the href attribute [ ${i.value} ] must be ${a}.`, e.line, l + i.index, this, i.raw);
              break;
            }
        });
      }
    };
    var B = {};
    Object.defineProperty(B, "__esModule", { value: !0 });
    const _e = "(?<grandfathered>(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)|(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang))", Le = "(?<privateUse>x(-[A-Za-z0-9]{1,8})+)", ve = "(?<privateUse2>x(-[A-Za-z0-9]{1,8})+)", Te = `((?<language>([A-Za-z]{2,3}(-(?<extlang>[A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-(?<script>[A-Za-z]{4}))?(-(?<region>[A-Za-z]{2}|[0-9]{3}))?(-(?<variant>[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-(?<extension>[0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-${Le})?)`, Oe = `(${_e}|${Te}|${ve})`;
    B.default = {
      id: "html-lang-require",
      description: "The lang attribute of an <html> element must be present and should be valid.",
      init(r, s) {
        r.addListener("tagstart", (t) => {
          const a = t.tagName.toLowerCase(), e = r.getMapAttrs(t.attrs), n = t.col + a.length + 1, i = new RegExp(Oe, "g");
          a === "html" && ("lang" in e ? e.lang ? i.test(e.lang) || s.warn("The lang attribute value of <html> element must be a valid BCP47.", t.line, n, this, t.raw) : s.warn("The lang attribute of <html> element must have a value.", t.line, n, this, t.raw) : s.warn("An lang attribute must be present on <html> elements.", t.line, n, this, t.raw));
        });
      }
    };
    var Y = {};
    Object.defineProperty(Y, "__esModule", { value: !0 }), Y.default = {
      id: "id-class-ad-disabled",
      description: "The id and class attributes cannot use the ad keyword, it will be blocked by adblock software.",
      init(r, s) {
        r.addListener("tagstart", (t) => {
          const a = t.attrs;
          let e, n;
          const i = t.col + t.tagName.length + 1;
          for (let l = 0, o = a.length; l < o; l++)
            e = a[l], n = e.name, /^(id|class)$/i.test(n) && /(^|[-_])ad([-_]|$)/i.test(e.value) && s.warn(`The value of attribute ${n} cannot use the ad keyword.`, t.line, i + e.index, this, e.raw);
        });
      }
    };
    var Q = {};
    Object.defineProperty(Q, "__esModule", { value: !0 }), Q.default = {
      id: "id-class-value",
      description: "The id and class attribute values must meet the specified rules.",
      init(r, s, t) {
        const a = {
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
        if (typeof t == "string" ? e = a[t] : e = t, typeof e == "object" && e.regId) {
          let n = e.regId;
          const i = e.message;
          n instanceof RegExp || (n = new RegExp(n)), r.addListener("tagstart", (l) => {
            const o = l.attrs;
            let u;
            const d = l.col + l.tagName.length + 1;
            for (let c = 0, g = o.length; c < g; c++)
              if (u = o[c], u.name.toLowerCase() === "id" && n.test(u.value) === !1 && s.warn(i, l.line, d + u.index, this, u.raw), u.name.toLowerCase() === "class") {
                const f = u.value.split(/\s+/g);
                let _;
                for (let p = 0, L = f.length; p < L; p++)
                  _ = f[p], _ && n.test(_) === !1 && s.warn(i, l.line, d + u.index, this, _);
              }
          });
        }
      }
    };
    var J = {};
    Object.defineProperty(J, "__esModule", { value: !0 }), J.default = {
      id: "id-unique",
      description: "The value of id attributes must be unique.",
      init(r, s) {
        const t = {};
        r.addListener("tagstart", (a) => {
          const e = a.attrs;
          let n, i;
          const l = a.col + a.tagName.length + 1;
          for (let o = 0, u = e.length; o < u; o++)
            if (n = e[o], n.name.toLowerCase() === "id") {
              i = n.value, i && (t[i] === void 0 ? t[i] = 1 : t[i]++, t[i] > 1 && s.error(`The id value [ ${i} ] must be unique.`, a.line, l + n.index, this, n.raw));
              break;
            }
        });
      }
    };
    var X = {};
    Object.defineProperty(X, "__esModule", { value: !0 }), X.default = {
      id: "inline-script-disabled",
      description: "Inline script cannot be used.",
      init(r, s) {
        r.addListener("tagstart", (t) => {
          const a = t.attrs;
          let e;
          const n = t.col + t.tagName.length + 1;
          let i;
          const l = /^on(unload|message|submit|select|scroll|resize|mouseover|mouseout|mousemove|mouseleave|mouseenter|mousedown|load|keyup|keypress|keydown|focus|dblclick|click|change|blur|error)$/i;
          for (let o = 0, u = a.length; o < u; o++)
            e = a[o], i = e.name.toLowerCase(), l.test(i) === !0 ? s.warn(`Inline script [ ${e.raw} ] cannot be used.`, t.line, n + e.index, this, e.raw) : (i === "src" || i === "href") && /^\s*javascript:/i.test(e.value) && s.warn(`Inline script [ ${e.raw} ] cannot be used.`, t.line, n + e.index, this, e.raw);
        });
      }
    };
    var G = {};
    Object.defineProperty(G, "__esModule", { value: !0 }), G.default = {
      id: "inline-style-disabled",
      description: "Inline style cannot be used.",
      init(r, s) {
        r.addListener("tagstart", (t) => {
          const a = t.attrs;
          let e;
          const n = t.col + t.tagName.length + 1;
          for (let i = 0, l = a.length; i < l; i++)
            e = a[i], e.name.toLowerCase() === "style" && s.warn(`Inline style [ ${e.raw} ] cannot be used.`, t.line, n + e.index, this, e.raw);
        });
      }
    };
    var K = {};
    Object.defineProperty(K, "__esModule", { value: !0 }), K.default = {
      id: "input-requires-label",
      description: "All [ input ] tags must have a corresponding [ label ] tag. ",
      init(r, s) {
        const t = [], a = [];
        r.addListener("tagstart", (n) => {
          const i = n.tagName.toLowerCase(), l = r.getMapAttrs(n.attrs), o = n.col + i.length + 1;
          i === "input" && l.type !== "hidden" && a.push({ event: n, col: o, id: l.id }), i === "label" && "for" in l && l.for !== "" && t.push({ event: n, col: o, forValue: l.for });
        }), r.addListener("end", () => {
          a.forEach((n) => {
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
      init(r, s) {
        r.addListener("tagstart", (t) => {
          t.tagName.toLowerCase() === "script" && s.error("The <script> tag cannot be used.", t.line, t.col, this, t.raw);
        });
      }
    };
    var te = {};
    Object.defineProperty(te, "__esModule", { value: !0 }), te.default = {
      id: "space-tab-mixed-disabled",
      description: "Do not mix tabs and spaces for indentation.",
      init(r, s, t) {
        let a = "nomix", e = null;
        if (typeof t == "string") {
          const n = /^([a-z]+)(\d+)?/.exec(t);
          n && (a = n[1], e = n[2] && parseInt(n[2], 10));
        }
        r.addListener("text", (n) => {
          const i = n.raw, l = /(^|\r?\n)([ \t]+)/g;
          let o;
          for (; o = l.exec(i); ) {
            const u = r.fixPos(n, o.index + o[1].length);
            if (u.col !== 1)
              continue;
            const d = o[2];
            a === "space" ? e ? (/^ +$/.test(d) === !1 || d.length % e !== 0) && s.warn(`Please use space for indentation and keep ${e} length.`, u.line, 1, this, n.raw) : /^ +$/.test(d) === !1 && s.warn("Please use space for indentation.", u.line, 1, this, n.raw) : a === "tab" && /^\t+$/.test(d) === !1 ? s.warn("Please use tab for indentation.", u.line, 1, this, n.raw) : / +\t|\t+ /.test(d) === !0 && s.warn("Do not mix tabs and spaces for indentation.", u.line, 1, this, n.raw);
          }
        });
      }
    };
    var ae = {};
    Object.defineProperty(ae, "__esModule", { value: !0 }), ae.default = {
      id: "spec-char-escape",
      description: "Special characters must be escaped.",
      init(r, s) {
        r.addListener("text", (t) => {
          const a = t.raw, e = /([<>])|( \& )/g;
          let n;
          for (; n = e.exec(a); ) {
            const i = r.fixPos(t, n.index);
            s.error(`Special characters must be escaped : [ ${n[0]} ].`, i.line, i.col, this, t.raw);
          }
        });
      }
    };
    var re = {};
    Object.defineProperty(re, "__esModule", { value: !0 }), re.default = {
      id: "src-not-empty",
      description: "The src attribute of an img(script,link) must have a value.",
      init(r, s) {
        r.addListener("tagstart", (t) => {
          const a = t.tagName, e = t.attrs;
          let n;
          const i = t.col + a.length + 1;
          for (let l = 0, o = e.length; l < o; l++)
            n = e[l], (/^(img|script|embed|bgsound|iframe)$/.test(a) === !0 && n.name === "src" || a === "link" && n.name === "href" || a === "object" && n.name === "data") && n.value === "" && s.error(`The attribute [ ${n.name} ] of the tag [ ${a} ] must have a value.`, t.line, i + n.index, this, n.raw);
        });
      }
    };
    var ie = {};
    Object.defineProperty(ie, "__esModule", { value: !0 }), ie.default = {
      id: "style-disabled",
      description: "<style> tags cannot be used.",
      init(r, s) {
        r.addListener("tagstart", (t) => {
          t.tagName.toLowerCase() === "style" && s.warn("The <style> tag cannot be used.", t.line, t.col, this, t.raw);
        });
      }
    };
    var ne = {};
    Object.defineProperty(ne, "__esModule", { value: !0 }), ne.default = {
      id: "tag-pair",
      description: "Tag must be paired.",
      init(r, s) {
        const t = [], a = r.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr");
        r.addListener("tagstart", (e) => {
          const n = e.tagName.toLowerCase();
          a[n] === void 0 && !e.close && t.push({
            tagName: n,
            line: e.line,
            raw: e.raw
          });
        }), r.addListener("tagend", (e) => {
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
        }), r.addListener("end", (e) => {
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
      init(r, s) {
        const t = r.makeMap("area,base,basefont,bgsound,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr");
        r.addListener("tagstart", (a) => {
          const e = a.tagName.toLowerCase();
          t[e] !== void 0 && (a.close || s.warn(`The empty tag : [ ${e} ] must be self closed.`, a.line, a.col, this, a.raw));
        });
      }
    };
    var le = {};
    Object.defineProperty(le, "__esModule", { value: !0 }), le.default = {
      id: "empty-tag-not-self-closed",
      description: "Empty tags must not use self closed syntax.",
      init(r, s) {
        const t = r.makeMap("area,base,basefont,bgsound,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr");
        r.addListener("tagstart", (a) => {
          const e = a.tagName.toLowerCase();
          t[e] !== void 0 && a.close && s.error(`The empty tag : [ ${e} ] must not use self closed syntax.`, a.line, a.col, this, a.raw);
        });
      }
    };
    var oe = {};
    Object.defineProperty(oe, "__esModule", { value: !0 }), oe.default = {
      id: "tagname-lowercase",
      description: "All html element names must be in lowercase.",
      init(r, s, t) {
        const a = Array.isArray(t) ? t : [];
        r.addListener("tagstart,tagend", (e) => {
          const n = e.tagName;
          a.indexOf(n) === -1 && n !== n.toLowerCase() && s.error(`The html element name of [ ${n} ] must be in lowercase.`, e.line, e.col, this, e.raw);
        });
      }
    };
    var ue = {};
    Object.defineProperty(ue, "__esModule", { value: !0 }), ue.default = {
      id: "tagname-specialchars",
      description: "All special characters must be escaped.",
      init(r, s) {
        const t = /[^a-zA-Z0-9\-:_]/;
        r.addListener("tagstart,tagend", (a) => {
          const e = a.tagName;
          t.test(e) && s.error(`The html element name of [ ${e} ] contains special character.`, a.line, a.col, this, a.raw);
        });
      }
    };
    var de = {};
    Object.defineProperty(de, "__esModule", { value: !0 }), de.default = {
      id: "title-require",
      description: "<title> must be present in <head> tag.",
      init(r, s) {
        let t = !1, a = !1;
        const e = (i) => {
          const l = i.tagName.toLowerCase();
          l === "head" ? t = !0 : l === "title" && t && (a = !0);
        }, n = (i) => {
          const l = i.tagName.toLowerCase();
          if (a && l === "title") {
            const o = i.lastEvent;
            (o.type !== "text" || o.type === "text" && /^\s*$/.test(o.raw) === !0) && s.error("<title></title> must not be empty.", i.line, i.col, this, i.raw);
          } else
            l === "head" && (a === !1 && s.error("<title> must be present in <head> tag.", i.line, i.col, this, i.raw), r.removeListener("tagstart", e), r.removeListener("tagend", n));
        };
        r.addListener("tagstart", e), r.addListener("tagend", n);
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
      init(r, s, t) {
        k = Object.assign(Object.assign({}, k), t), r.addListener("tagstart", (a) => {
          const e = a.attrs, n = a.col + a.tagName.length + 1, i = a.tagName.toLowerCase();
          if (k[i]) {
            const l = k[i];
            l.selfclosing === !0 && !a.close ? s.warn(`The <${i}> tag must be selfclosing.`, a.line, a.col, this, a.raw) : l.selfclosing === !1 && a.close && s.warn(`The <${i}> tag must not be selfclosing.`, a.line, a.col, this, a.raw), Array.isArray(l.attrsRequired) && l.attrsRequired.forEach((u) => {
              if (Array.isArray(u)) {
                const d = u.map((f) => f), c = d.shift(), g = d;
                e.some((f) => f.name === c) ? e.forEach((f) => {
                  f.name === c && g.indexOf(f.value) === -1 && s.error(`The <${i}> tag must have attr '${c}' with one value of '${g.join("' or '")}'.`, a.line, n, this, a.raw);
                }) : s.error(`The <${i}> tag must have attr '${c}'.`, a.line, n, this, a.raw);
              } else
                e.some((d) => u.split("|").indexOf(d.name) !== -1) || s.error(`The <${i}> tag must have attr '${u}'.`, a.line, n, this, a.raw);
            }), Array.isArray(l.attrsOptional) && l.attrsOptional.forEach((u) => {
              if (Array.isArray(u)) {
                const d = u.map((f) => f), c = d.shift(), g = d;
                e.some((f) => f.name === c) && e.forEach((f) => {
                  f.name === c && g.indexOf(f.value) === -1 && s.error(`The <${i}> tag must have optional attr '${c}' with one value of '${g.join("' or '")}'.`, a.line, n, this, a.raw);
                });
              }
            }), Array.isArray(l.redundantAttrs) && l.redundantAttrs.forEach((u) => {
              e.some((d) => d.name === u) && s.error(`The attr '${u}' is redundant for <${i}> and should be omitted.`, a.line, n, this, a.raw);
            });
          }
        });
      }
    };
    var fe = {};
    Object.defineProperty(fe, "__esModule", { value: !0 }), fe.default = {
      id: "attr-no-unnecessary-whitespace",
      description: "No spaces between attribute names and values.",
      init(r, s, t) {
        const a = Array.isArray(t) ? t : [];
        r.addListener("tagstart", (e) => {
          const n = e.attrs, i = e.col + e.tagName.length + 1;
          for (let l = 0; l < n.length; l++)
            if (a.indexOf(n[l].name) === -1) {
              const o = /(\s*)=(\s*)/.exec(n[l].raw.trim());
              o && (o[1].length !== 0 || o[2].length !== 0) && s.error(`The attribute '${n[l].name}' must not have spaces between the name and value.`, e.line, i + n[l].index, this, n[l].raw);
            }
        });
      }
    };
    var ge = {};
    Object.defineProperty(ge, "__esModule", { value: !0 });
    const je = [
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
      init(r, s) {
        r.addListener("tagstart", (t) => {
          const a = t.tagName;
          je.includes(a) || s.error(`The tag [ ${a} ] is not a valid HTML tag.`, t.line, t.col, this, t.raw);
        });
      }
    }, function(r) {
      Object.defineProperty(r, "__esModule", { value: !0 }), r.attrInvalid = r.attrNoUnnecessaryWhitespace = r.tagsCheck = r.titleRequire = r.tagnameSpecialChars = r.tagnameLowercase = r.emptyTagNotSelfClosed = r.tagSelfClose = r.tagPair = r.styleDisabled = r.srcNotEmpty = r.specCharEscape = r.spaceTabMixedDisabled = r.scriptDisabled = r.inputRequiresLabel = r.inlineStyleDisabled = r.inlineScriptDisabled = r.idUnique = r.idClassValue = r.idClsasAdDisabled = r.htmlLangRequire = r.hrefAbsOrRel = r.headScriptDisabled = r.doctypeHTML5 = r.doctypeFirst = r.attrWhitespace = r.attrValueSingleQuotes = r.attrValueNotEmpty = r.attrValueDoubleQuotes = r.attrUnsafeChars = r.attrNoDuplication = r.attrSort = r.attrLowercase = r.altRequire = void 0;
      var s = E;
      Object.defineProperty(r, "altRequire", { enumerable: !0, get: function() {
        return s.default;
      } });
      var t = R;
      Object.defineProperty(r, "attrLowercase", { enumerable: !0, get: function() {
        return t.default;
      } });
      var a = x;
      Object.defineProperty(r, "attrSort", { enumerable: !0, get: function() {
        return a.default;
      } });
      var e = D;
      Object.defineProperty(r, "attrNoDuplication", { enumerable: !0, get: function() {
        return e.default;
      } });
      var n = S;
      Object.defineProperty(r, "attrUnsafeChars", { enumerable: !0, get: function() {
        return n.default;
      } });
      var i = I;
      Object.defineProperty(r, "attrValueDoubleQuotes", { enumerable: !0, get: function() {
        return i.default;
      } });
      var l = z;
      Object.defineProperty(r, "attrValueNotEmpty", { enumerable: !0, get: function() {
        return l.default;
      } });
      var o = U;
      Object.defineProperty(r, "attrValueSingleQuotes", { enumerable: !0, get: function() {
        return o.default;
      } });
      var u = H;
      Object.defineProperty(r, "attrWhitespace", { enumerable: !0, get: function() {
        return u.default;
      } });
      var d = V;
      Object.defineProperty(r, "doctypeFirst", { enumerable: !0, get: function() {
        return d.default;
      } });
      var c = Z;
      Object.defineProperty(r, "doctypeHTML5", { enumerable: !0, get: function() {
        return c.default;
      } });
      var g = W;
      Object.defineProperty(r, "headScriptDisabled", { enumerable: !0, get: function() {
        return g.default;
      } });
      var f = F;
      Object.defineProperty(r, "hrefAbsOrRel", { enumerable: !0, get: function() {
        return f.default;
      } });
      var _ = B;
      Object.defineProperty(r, "htmlLangRequire", { enumerable: !0, get: function() {
        return _.default;
      } });
      var p = Y;
      Object.defineProperty(r, "idClsasAdDisabled", { enumerable: !0, get: function() {
        return p.default;
      } });
      var L = Q;
      Object.defineProperty(r, "idClassValue", { enumerable: !0, get: function() {
        return L.default;
      } });
      var b = J;
      Object.defineProperty(r, "idUnique", { enumerable: !0, get: function() {
        return b.default;
      } });
      var P = X;
      Object.defineProperty(r, "inlineScriptDisabled", { enumerable: !0, get: function() {
        return P.default;
      } });
      var j = G;
      Object.defineProperty(r, "inlineStyleDisabled", { enumerable: !0, get: function() {
        return j.default;
      } });
      var w = K;
      Object.defineProperty(r, "inputRequiresLabel", { enumerable: !0, get: function() {
        return w.default;
      } });
      var v = ee;
      Object.defineProperty(r, "scriptDisabled", { enumerable: !0, get: function() {
        return v.default;
      } });
      var h = te;
      Object.defineProperty(r, "spaceTabMixedDisabled", { enumerable: !0, get: function() {
        return h.default;
      } });
      var A = ae;
      Object.defineProperty(r, "specCharEscape", { enumerable: !0, get: function() {
        return A.default;
      } });
      var T = re;
      Object.defineProperty(r, "srcNotEmpty", { enumerable: !0, get: function() {
        return T.default;
      } });
      var $ = ie;
      Object.defineProperty(r, "styleDisabled", { enumerable: !0, get: function() {
        return $.default;
      } });
      var he = ne;
      Object.defineProperty(r, "tagPair", { enumerable: !0, get: function() {
        return he.default;
      } });
      var Ce = se;
      Object.defineProperty(r, "tagSelfClose", { enumerable: !0, get: function() {
        return Ce.default;
      } });
      var Pe = le;
      Object.defineProperty(r, "emptyTagNotSelfClosed", { enumerable: !0, get: function() {
        return Pe.default;
      } });
      var Me = oe;
      Object.defineProperty(r, "tagnameLowercase", { enumerable: !0, get: function() {
        return Me.default;
      } });
      var $e = ue;
      Object.defineProperty(r, "tagnameSpecialChars", { enumerable: !0, get: function() {
        return $e.default;
      } });
      var Ne = de;
      Object.defineProperty(r, "titleRequire", { enumerable: !0, get: function() {
        return Ne.default;
      } });
      var ke = ce;
      Object.defineProperty(r, "tagsCheck", { enumerable: !0, get: function() {
        return ke.default;
      } });
      var qe = fe;
      Object.defineProperty(r, "attrNoUnnecessaryWhitespace", { enumerable: !0, get: function() {
        return qe.default;
      } });
      var Ee = ge;
      Object.defineProperty(r, "attrInvalid", { enumerable: !0, get: function() {
        return Ee.default;
      } });
    }(me), function(r) {
      Object.defineProperty(r, "__esModule", { value: !0 }), r.HTMLParser = r.Reporter = r.HTMLRules = r.HTMLHint = void 0;
      const s = N;
      r.HTMLParser = s.default;
      const t = C;
      r.Reporter = t.default;
      const a = me;
      r.HTMLRules = a;
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
          Object.keys(o).length === 0 && (o = this.defaultRuleset), l = l.replace(/^\s*<!--\s*htmlhint\s+([^\r\n]+?)\s*-->/i, (f, _) => (_.replace(/(?:^|,)\s*([^:,]+)\s*(?:\:\s*([^,\s]+))?/g, (p, L, b) => (o[L] = b !== void 0 && b.length > 0 ? JSON.parse(b) : !0, "")), ""));
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
            let p = g.evidence;
            const L = g.line, b = g.col, P = p.length;
            let j = b > 40 + 1 ? b - 40 : 1, w = p.length > b + 60 ? b + 60 : P;
            b < 40 + 1 && (w += 40 - b + 1), p = p.replace(/\t/g, " ").substring(j - 1, w), j > 1 && (p = `...${p}`, j -= 3), w < P && (p += "..."), u.push(`${d.white + n(c)}L${L} |${d.grey}${p}${d.reset}`);
            let v = b - j;
            const h = p.substring(0, v).match(/[^\u0000-\u00ff]/g);
            h !== null && (v += h.length), u.push(`${d.white + n(c) + n(String(L).length + 3 + v)}^ ${d.red}${g.message} (${g.rule.id})${d.reset}`);
          }), u;
        }
      }
      function n(i, l) {
        return new Array(i + 1).join(l || " ");
      }
      r.HTMLHint = new e(), Object.keys(a).forEach((i) => {
        r.HTMLHint.addRule(a[i]);
      });
    }(O);
    var Ae = /* @__PURE__ */ m(O);
    return Ae;
  });
})(pe);
var xe = pe.exports;
const De = (M) => {
  const y = M.split(" ");
  for (var m = 0; m < y.length; m++)
    y[m] = y[m].charAt(0).toUpperCase() + y[m].slice(1);
  return y.join(" ");
}, Se = {
  "tagname-lowercase": !0,
  "attr-lowercase": !0,
  "attr-invalid": !0,
  "attr-value-double-quotes": !0,
  "doctype-first": !0,
  "tag-pair": !0,
  "spec-char-escape": !0,
  "id-unique": !0,
  "src-not-empty": !0,
  "attr-no-duplication": !0,
  "title-require": !0
};
class Ie {
  constructor(y, m = Se, O) {
    this.html = y, this.ruleset = m, this.linterResponse = this.lint(), this.model = O;
  }
  lint() {
    return xe.HTMLHint.verify(this.html, this.ruleset);
  }
  getEditorMarks(y) {
    return this.linterResponse.map((m) => ({
      startLineNumber: m.line,
      startColumn: m.col,
      endLineNumber: m.line,
      endColumn: m.evidence !== "" ? m.col + m.evidence.length : this.model !== void 0 ? this.model.getLineLength(m.line) : m.col + 1,
      message: m.message,
      severity: y.MarkerSeverity[De(m.type)]
    }));
  }
  getLinterResponse() {
    return this.linterResponse;
  }
}
class Qe {
  constructor(y, m, O) {
    this.editor = y, this.monaco = m, this.ruleset = O;
  }
  lint() {
    var O;
    const y = this.editor.getValue();
    if (((O = this.editor.getModel()) == null ? void 0 : O.getLanguageId()) === "html") {
      const q = new Ie(y, this.ruleset, this.editor.getModel() || void 0).getEditorMarks(this.monaco), C = this.editor.getModel();
      if (C === null)
        throw new Error("Your model still does't exist.");
      this.monaco.editor.setModelMarkers(C, "owner", q);
    }
  }
  watch() {
    this.lint(), this.editor.onDidChangeModelContent((y) => {
      this.lint();
    });
  }
}
export {
  Ie as HTMLMonacoMarks,
  Qe as default
};
