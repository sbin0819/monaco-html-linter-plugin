var He = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, _e = { exports: {} };
(function(M, y) {
  (function(m, O) {
    M.exports = O();
  })(He, function() {
    function m(a) {
      return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
    }
    function O(a) {
      if (a.__esModule)
        return a;
      var s = Object.defineProperty({}, "__esModule", { value: !0 });
      return Object.keys(a).forEach(function(r) {
        var t = Object.getOwnPropertyDescriptor(a, r);
        Object.defineProperty(s, r, t.get ? t : {
          enumerable: !0,
          get: function() {
            return a[r];
          }
        });
      }), s;
    }
    var q = {}, C = {};
    Object.defineProperty(C, "__esModule", { value: !0 });
    class N {
      constructor() {
        this._listeners = {}, this._mapCdataTags = this.makeMap("script,style"), this._arrBlocks = [], this.lastEvent = null;
      }
      makeMap(s) {
        const r = {}, t = s.split(",");
        for (let e = 0; e < t.length; e++)
          r[t[e]] = !0;
        return r;
      }
      parse(s) {
        const r = this._mapCdataTags, t = /<(?:\/([^\s>]+)\s*|!--([\s\S]*?)--|!([^>]*?)|([\w\-:]+)((?:\s+[^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]*))?)*?)\s*(\/?))>/g, e = /\s*([^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+)(?:\s*=\s*(?:(")([^"]*)"|(')([^']*)'|([^\s"'>]*)))?/g, n = /\r?\n/g;
        let i, l, o = 0, c, d, u = null, g, f = [], _ = 0, p, v = 0, b = 1;
        const P = this._arrBlocks;
        this.fire("start", {
          pos: 0,
          line: 1,
          col: 1
        });
        const A = () => {
          const L = d.find((h) => h.name === "type") || {
            value: ""
          };
          return r[c] && L.value.indexOf("text/ng-template") === -1;
        }, w = (L, h, j, T) => {
          const $ = j - v + 1;
          for (T === void 0 && (T = {}), T.raw = h, T.pos = j, T.line = b, T.col = $, P.push(T), this.fire(L, T); n.exec(h); )
            b++, v = j + n.lastIndex;
        };
        for (; i = t.exec(s); ) {
          if (l = i.index, l > o && (p = s.substring(o, l), u ? f.push(p) : w("text", p, o)), o = t.lastIndex, (c = i[1]) && (u && c === u && (p = f.join(""), w("cdata", p, _, {
            tagName: u,
            attrs: g
          }), u = null, g = void 0, f = []), !u)) {
            w("tagend", i[0], l, {
              tagName: c
            });
            continue;
          }
          if (u)
            f.push(i[0]);
          else if (c = i[4]) {
            d = [];
            const L = i[5];
            let h, j = 0;
            for (; h = e.exec(L); ) {
              const T = h[1], $ = h[2] ? h[2] : h[4] ? h[4] : "", pe = h[3] ? h[3] : h[5] ? h[5] : h[6] ? h[6] : "";
              d.push({
                name: T,
                value: pe,
                quote: $,
                index: h.index,
                raw: h[0]
              }), j += h[0].length;
            }
            j === L.length ? (w("tagstart", i[0], l, {
              tagName: c,
              attrs: d,
              close: i[6]
            }), A() && (u = c, g = d.concat(), f = [], _ = o)) : w("text", i[0], l);
          } else
            (i[2] || i[3]) && w("comment", i[0], l, {
              content: i[2] || i[3],
              long: !!i[2]
            });
        }
        s.length > o && (p = s.substring(o, s.length), w("text", p, o)), this.fire("end", {
          pos: o,
          line: b,
          col: s.length - v + 1
        });
      }
      addListener(s, r) {
        const t = this._listeners, e = s.split(/[,\s]/);
        let n;
        for (let i = 0, l = e.length; i < l; i++)
          n = e[i], t[n] === void 0 && (t[n] = []), t[n].push(r);
      }
      fire(s, r) {
        r === void 0 && (r = {}), r.type = s;
        let t = [];
        const e = this._listeners[s], n = this._listeners.all;
        e !== void 0 && (t = t.concat(e)), n !== void 0 && (t = t.concat(n));
        const i = this.lastEvent;
        i !== null && (delete i.lastEvent, r.lastEvent = i), this.lastEvent = r;
        for (let l = 0, o = t.length; l < o; l++)
          t[l].call(this, r);
      }
      removeListener(s, r) {
        const t = this._listeners[s];
        if (t !== void 0) {
          for (let e = 0, n = t.length; e < n; e++)
            if (t[e] === r) {
              t.splice(e, 1);
              break;
            }
        }
      }
      fixPos(s, r) {
        const e = s.raw.substr(0, r).split(/\r?\n/), n = e.length - 1;
        let i = s.line, l;
        return n > 0 ? (i += n, l = e[n].length + 1) : l = s.col + r, {
          line: i,
          col: l
        };
      }
      getMapAttrs(s) {
        const r = {};
        let t;
        for (let e = 0, n = s.length; e < n; e++)
          t = s[e], r[t.name] = t.value;
        return r;
      }
    }
    C.default = N;
    var E = {};
    Object.defineProperty(E, "__esModule", { value: !0 });
    class ve {
      constructor(s, r) {
        this.html = s, this.lines = s.split(/\r?\n/);
        const t = /\r?\n/.exec(s);
        this.brLen = t !== null ? t[0].length : 0, this.ruleset = r, this.messages = [];
      }
      info(s, r, t, e, n) {
        this.report("info", s, r, t, e, n);
      }
      warn(s, r, t, e, n) {
        this.report("warning", s, r, t, e, n);
      }
      error(s, r, t, e, n) {
        this.report("error", s, r, t, e, n);
      }
      report(s, r, t, e, n, i) {
        const l = this.lines, o = this.brLen;
        let c = "", d = 0;
        for (let u = t - 1, g = l.length; u < g && (c = l[u], d = c.length, e > d && t < g); u++)
          t++, e -= d, e !== 1 && (e -= o);
        this.messages.push({
          type: s,
          message: r,
          raw: i,
          evidence: c,
          line: t,
          col: e,
          rule: {
            id: n.id,
            description: n.description,
            link: `https://htmlhint.com/docs/user-guide/rules/${n.id}`
          }
        });
      }
    }
    E.default = ve;
    var be = {}, x = {};
    Object.defineProperty(x, "__esModule", { value: !0 }), x.default = {
      id: "alt-require",
      description: "The alt attribute of an <img> element must be present and alt attribute of area[href] and input[type=image] must have a value.",
      init(a, s) {
        a.addListener("tagstart", (r) => {
          const t = r.tagName.toLowerCase(), e = a.getMapAttrs(r.attrs), n = r.col + t.length + 1;
          let i;
          t === "img" && !("alt" in e) ? s.warn("An alt attribute must be present on <img> elements.", r.line, n, this, r.raw) : (t === "area" && "href" in e || t === "input" && e.type === "image") && (!("alt" in e) || e.alt === "") && (i = t === "area" ? "area[href]" : "input[type=image]", s.warn(`The alt attribute of ${i} must have a value.`, r.line, n, this, r.raw));
        });
      }
    };
    var R = {};
    Object.defineProperty(R, "__esModule", { value: !0 });
    const Le = [
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
    function Te(a, s) {
      if (s instanceof RegExp)
        return s.test(a) ? { match: a, pattern: s } : !1;
      const r = s[0], t = s[s.length - 1], e = s[s.length - 2], n = r === "/" && (t === "/" || e === "/" && t === "i"), i = n && t === "i";
      return n ? i ? new RegExp(s.slice(1, -2), "i").test(a) : new RegExp(s.slice(1, -1)).test(a) : a === s;
    }
    R.default = {
      id: "attr-lowercase",
      description: "All attribute names must be in lowercase.",
      init(a, s, r) {
        const t = (Array.isArray(r) ? r : []).concat(Le);
        a.addListener("tagstart", (e) => {
          const n = e.attrs;
          let i;
          const l = e.col + e.tagName.length + 1;
          for (let o = 0, c = n.length; o < c; o++) {
            i = n[o];
            const d = i.name;
            !t.find((u) => Te(d, u)) && d !== d.toLowerCase() && s.error(`The attribute name of [ ${d} ] must be in lowercase.`, e.line, l + i.index, this, i.raw);
          }
        });
      }
    };
    var D = {};
    Object.defineProperty(D, "__esModule", { value: !0 }), D.default = {
      id: "attr-sorted",
      description: "Attribute tags must be in proper order.",
      init(a, s) {
        const r = {}, t = [
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
        for (let e = 0; e < t.length; e++)
          r[t[e]] = e;
        a.addListener("tagstart", (e) => {
          const n = e.attrs, i = [];
          for (let o = 0; o < n.length; o++)
            i.push(n[o].name);
          const l = JSON.stringify(i);
          i.sort((o, c) => r[o] == null && r[c] == null ? 0 : r[o] == null ? 1 : r[c] == null ? -1 : r[o] - r[c] || o.localeCompare(c)), l !== JSON.stringify(i) && s.error(`Inaccurate order ${l} should be in hierarchy ${JSON.stringify(i)} `, e.line, e.col, this, e.raw);
        });
      }
    };
    var S = {};
    Object.defineProperty(S, "__esModule", { value: !0 }), S.default = {
      id: "attr-no-duplication",
      description: "Elements cannot have duplicate attributes.",
      init(a, s) {
        a.addListener("tagstart", (r) => {
          const t = r.attrs;
          let e, n;
          const i = r.col + r.tagName.length + 1, l = {};
          for (let o = 0, c = t.length; o < c; o++)
            e = t[o], n = e.name, l[n] === !0 && s.error(`Duplicate of attribute name [ ${e.name} ] was found.`, r.line, i + e.index, this, e.raw), l[n] = !0;
        });
      }
    };
    var z = {};
    Object.defineProperty(z, "__esModule", { value: !0 }), z.default = {
      id: "attr-unsafe-chars",
      description: "Attribute values cannot contain unsafe chars.",
      init(a, s) {
        a.addListener("tagstart", (r) => {
          const t = r.attrs;
          let e;
          const n = r.col + r.tagName.length + 1, i = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/;
          let l;
          for (let o = 0, c = t.length; o < c; o++)
            if (e = t[o], l = i.exec(e.value), l !== null) {
              const d = escape(l[0]).replace(/%u/, "\\u").replace(/%/, "\\x");
              s.warn(`The value of attribute [ ${e.name} ] cannot contain an unsafe char [ ${d} ].`, r.line, n + e.index, this, e.raw);
            }
        });
      }
    };
    var I = {};
    Object.defineProperty(I, "__esModule", { value: !0 }), I.default = {
      id: "attr-value-double-quotes",
      description: "Attribute values must be in double quotes.",
      init(a, s) {
        a.addListener("tagstart", (r) => {
          const t = r.attrs;
          let e;
          const n = r.col + r.tagName.length + 1;
          for (let i = 0, l = t.length; i < l; i++)
            e = t[i], (e.value !== "" && e.quote !== '"' || e.value === "" && e.quote === "'") && s.error(`The value of attribute [ ${e.name} ] must be in double quotes.`, r.line, n + e.index, this, e.raw);
        });
      }
    };
    var H = {};
    Object.defineProperty(H, "__esModule", { value: !0 }), H.default = {
      id: "attr-value-not-empty",
      description: "All attributes must have values.",
      init(a, s) {
        a.addListener("tagstart", (r) => {
          const t = r.attrs;
          let e;
          const n = r.col + r.tagName.length + 1;
          for (let i = 0, l = t.length; i < l; i++)
            e = t[i], e.quote === "" && e.value === "" && s.warn(`The attribute [ ${e.name} ] must have a value.`, r.line, n + e.index, this, e.raw);
        });
      }
    };
    var U = {};
    Object.defineProperty(U, "__esModule", { value: !0 }), U.default = {
      id: "attr-value-single-quotes",
      description: "Attribute values must be in single quotes.",
      init(a, s) {
        a.addListener("tagstart", (r) => {
          const t = r.attrs;
          let e;
          const n = r.col + r.tagName.length + 1;
          for (let i = 0, l = t.length; i < l; i++)
            e = t[i], (e.value !== "" && e.quote !== "'" || e.value === "" && e.quote === '"') && s.error(`The value of attribute [ ${e.name} ] must be in single quotes.`, r.line, n + e.index, this, e.raw);
        });
      }
    };
    var V = {};
    Object.defineProperty(V, "__esModule", { value: !0 }), V.default = {
      id: "attr-whitespace",
      description: "All attributes should be separated by only one space and not have leading/trailing whitespace.",
      init(a, s, r) {
        const t = Array.isArray(r) ? r : [];
        a.addListener("tagstart", (e) => {
          const n = e.attrs;
          let i;
          const l = e.col + e.tagName.length + 1;
          n.forEach((o) => {
            i = o;
            const c = o.name;
            t.indexOf(c) === -1 && (o.value.trim() !== o.value && s.error(`The attributes of [ ${c} ] must not have leading or trailing whitespace.`, e.line, l + i.index, this, i.raw), o.value.replace(/ +(?= )/g, "") !== o.value && s.error(`The attributes of [ ${c} ] must be separated by only one space.`, e.line, l + i.index, this, i.raw));
          });
        });
      }
    };
    var Z = {};
    Object.defineProperty(Z, "__esModule", { value: !0 }), Z.default = {
      id: "doctype-first",
      description: "Doctype must be declared first.",
      init(a, s) {
        const r = (t) => {
          t.type === "start" || t.type === "text" && /^\s*$/.test(t.raw) || ((t.type !== "comment" && t.long === !1 || /^DOCTYPE\s+/i.test(t.content) === !1) && s.error("Doctype must be declared first.", t.line, t.col, this, t.raw), a.removeListener("all", r));
        };
        a.addListener("all", r);
      }
    };
    var W = {};
    Object.defineProperty(W, "__esModule", { value: !0 }), W.default = {
      id: "doctype-html5",
      description: 'Invalid doctype. Use: "<!DOCTYPE html>"',
      init(a, s) {
        const r = (e) => {
          e.long === !1 && e.content.toLowerCase() !== "doctype html" && s.warn('Invalid doctype. Use: "<!DOCTYPE html>"', e.line, e.col, this, e.raw);
        }, t = () => {
          a.removeListener("comment", r), a.removeListener("tagstart", t);
        };
        a.addListener("all", r), a.addListener("tagstart", t);
      }
    };
    var F = {};
    Object.defineProperty(F, "__esModule", { value: !0 }), F.default = {
      id: "head-script-disabled",
      description: "The <script> tag cannot be used in a <head> tag.",
      init(a, s) {
        const r = /^(text\/javascript|application\/javascript)$/i;
        let t = !1;
        const e = (i) => {
          const o = a.getMapAttrs(i.attrs).type, c = i.tagName.toLowerCase();
          c === "head" && (t = !0), t === !0 && c === "script" && (!o || r.test(o) === !0) && s.warn("The <script> tag cannot be used in a <head> tag.", i.line, i.col, this, i.raw);
        }, n = (i) => {
          i.tagName.toLowerCase() === "head" && (a.removeListener("tagstart", e), a.removeListener("tagend", n));
        };
        a.addListener("tagstart", e), a.addListener("tagend", n);
      }
    };
    var B = {};
    Object.defineProperty(B, "__esModule", { value: !0 }), B.default = {
      id: "href-abs-or-rel",
      description: "An href attribute must be either absolute or relative.",
      init(a, s, r) {
        const t = r === "abs" ? "absolute" : "relative";
        a.addListener("tagstart", (e) => {
          const n = e.attrs;
          let i;
          const l = e.col + e.tagName.length + 1;
          for (let o = 0, c = n.length; o < c; o++)
            if (i = n[o], i.name === "href") {
              (t === "absolute" && /^\w+?:/.test(i.value) === !1 || t === "relative" && /^https?:\/\//.test(i.value) === !0) && s.warn(`The value of the href attribute [ ${i.value} ] must be ${t}.`, e.line, l + i.index, this, i.raw);
              break;
            }
        });
      }
    };
    var Y = {};
    Object.defineProperty(Y, "__esModule", { value: !0 });
    const Oe = "(?<grandfathered>(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)|(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang))", Ae = "(?<privateUse>x(-[A-Za-z0-9]{1,8})+)", je = "(?<privateUse2>x(-[A-Za-z0-9]{1,8})+)", Pe = `((?<language>([A-Za-z]{2,3}(-(?<extlang>[A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-(?<script>[A-Za-z]{4}))?(-(?<region>[A-Za-z]{2}|[0-9]{3}))?(-(?<variant>[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-(?<extension>[0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-${Ae})?)`, Me = `(${Oe}|${Pe}|${je})`;
    Y.default = {
      id: "html-lang-require",
      description: "The lang attribute of an <html> element must be present and should be valid.",
      init(a, s) {
        a.addListener("tagstart", (r) => {
          const t = r.tagName.toLowerCase(), e = a.getMapAttrs(r.attrs), n = r.col + t.length + 1, i = new RegExp(Me, "g");
          t === "html" && ("lang" in e ? e.lang ? i.test(e.lang) || s.warn("The lang attribute value of <html> element must be a valid BCP47.", r.line, n, this, r.raw) : s.warn("The lang attribute of <html> element must have a value.", r.line, n, this, r.raw) : s.warn("An lang attribute must be present on <html> elements.", r.line, n, this, r.raw));
        });
      }
    };
    var Q = {};
    Object.defineProperty(Q, "__esModule", { value: !0 }), Q.default = {
      id: "id-class-ad-disabled",
      description: "The id and class attributes cannot use the ad keyword, it will be blocked by adblock software.",
      init(a, s) {
        a.addListener("tagstart", (r) => {
          const t = r.attrs;
          let e, n;
          const i = r.col + r.tagName.length + 1;
          for (let l = 0, o = t.length; l < o; l++)
            e = t[l], n = e.name, /^(id|class)$/i.test(n) && /(^|[-_])ad([-_]|$)/i.test(e.value) && s.warn(`The value of attribute ${n} cannot use the ad keyword.`, r.line, i + e.index, this, e.raw);
        });
      }
    };
    var J = {};
    Object.defineProperty(J, "__esModule", { value: !0 }), J.default = {
      id: "id-class-value",
      description: "The id and class attribute values must meet the specified rules.",
      init(a, s, r) {
        const t = {
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
        if (typeof r == "string" ? e = t[r] : e = r, typeof e == "object" && e.regId) {
          let n = e.regId;
          const i = e.message;
          n instanceof RegExp || (n = new RegExp(n)), a.addListener("tagstart", (l) => {
            const o = l.attrs;
            let c;
            const d = l.col + l.tagName.length + 1;
            for (let u = 0, g = o.length; u < g; u++)
              if (c = o[u], c.name.toLowerCase() === "id" && n.test(c.value) === !1 && s.warn(i, l.line, d + c.index, this, c.raw), c.name.toLowerCase() === "class") {
                const f = c.value.split(/\s+/g);
                let _;
                for (let p = 0, v = f.length; p < v; p++)
                  _ = f[p], _ && n.test(_) === !1 && s.warn(i, l.line, d + c.index, this, _);
              }
          });
        }
      }
    };
    var X = {};
    Object.defineProperty(X, "__esModule", { value: !0 }), X.default = {
      id: "id-unique",
      description: "The value of id attributes must be unique.",
      init(a, s) {
        const r = {};
        a.addListener("tagstart", (t) => {
          const e = t.attrs;
          let n, i;
          const l = t.col + t.tagName.length + 1;
          for (let o = 0, c = e.length; o < c; o++)
            if (n = e[o], n.name.toLowerCase() === "id") {
              i = n.value, i && (r[i] === void 0 ? r[i] = 1 : r[i]++, r[i] > 1 && s.error(`The id value [ ${i} ] must be unique.`, t.line, l + n.index, this, n.raw));
              break;
            }
        });
      }
    };
    var G = {};
    Object.defineProperty(G, "__esModule", { value: !0 }), G.default = {
      id: "inline-script-disabled",
      description: "Inline script cannot be used.",
      init(a, s) {
        a.addListener("tagstart", (r) => {
          const t = r.attrs;
          let e;
          const n = r.col + r.tagName.length + 1;
          let i;
          const l = /^on(unload|message|submit|select|scroll|resize|mouseover|mouseout|mousemove|mouseleave|mouseenter|mousedown|load|keyup|keypress|keydown|focus|dblclick|click|change|blur|error)$/i;
          for (let o = 0, c = t.length; o < c; o++)
            e = t[o], i = e.name.toLowerCase(), l.test(i) === !0 ? s.warn(`Inline script [ ${e.raw} ] cannot be used.`, r.line, n + e.index, this, e.raw) : (i === "src" || i === "href") && /^\s*javascript:/i.test(e.value) && s.warn(`Inline script [ ${e.raw} ] cannot be used.`, r.line, n + e.index, this, e.raw);
        });
      }
    };
    var K = {};
    Object.defineProperty(K, "__esModule", { value: !0 }), K.default = {
      id: "inline-style-disabled",
      description: "Inline style cannot be used.",
      init(a, s) {
        a.addListener("tagstart", (r) => {
          const t = r.attrs;
          let e;
          const n = r.col + r.tagName.length + 1;
          for (let i = 0, l = t.length; i < l; i++)
            e = t[i], e.name.toLowerCase() === "style" && s.warn(`Inline style [ ${e.raw} ] cannot be used.`, r.line, n + e.index, this, e.raw);
        });
      }
    };
    var ee = {};
    Object.defineProperty(ee, "__esModule", { value: !0 }), ee.default = {
      id: "input-requires-label",
      description: "All [ input ] tags must have a corresponding [ label ] tag. ",
      init(a, s) {
        const r = [], t = [];
        a.addListener("tagstart", (n) => {
          const i = n.tagName.toLowerCase(), l = a.getMapAttrs(n.attrs), o = n.col + i.length + 1;
          i === "input" && l.type !== "hidden" && t.push({ event: n, col: o, id: l.id }), i === "label" && "for" in l && l.for !== "" && r.push({ event: n, col: o, forValue: l.for });
        }), a.addListener("end", () => {
          t.forEach((n) => {
            e(n) || s.warn("No matching [ label ] tag found.", n.event.line, n.col, this, n.event.raw);
          });
        });
        function e(n) {
          let i = !1;
          return r.forEach((l) => {
            n.id && n.id === l.forValue && (i = !0);
          }), i;
        }
      }
    };
    var te = {};
    Object.defineProperty(te, "__esModule", { value: !0 }), te.default = {
      id: "script-disabled",
      description: "The <script> tag cannot be used.",
      init(a, s) {
        a.addListener("tagstart", (r) => {
          r.tagName.toLowerCase() === "script" && s.error("The <script> tag cannot be used.", r.line, r.col, this, r.raw);
        });
      }
    };
    var ae = {};
    Object.defineProperty(ae, "__esModule", { value: !0 }), ae.default = {
      id: "space-tab-mixed-disabled",
      description: "Do not mix tabs and spaces for indentation.",
      init(a, s, r) {
        let t = "nomix", e = null;
        if (typeof r == "string") {
          const n = /^([a-z]+)(\d+)?/.exec(r);
          n && (t = n[1], e = n[2] && parseInt(n[2], 10));
        }
        a.addListener("text", (n) => {
          const i = n.raw, l = /(^|\r?\n)([ \t]+)/g;
          let o;
          for (; o = l.exec(i); ) {
            const c = a.fixPos(n, o.index + o[1].length);
            if (c.col !== 1)
              continue;
            const d = o[2];
            t === "space" ? e ? (/^ +$/.test(d) === !1 || d.length % e !== 0) && s.warn(`Please use space for indentation and keep ${e} length.`, c.line, 1, this, n.raw) : /^ +$/.test(d) === !1 && s.warn("Please use space for indentation.", c.line, 1, this, n.raw) : t === "tab" && /^\t+$/.test(d) === !1 ? s.warn("Please use tab for indentation.", c.line, 1, this, n.raw) : / +\t|\t+ /.test(d) === !0 && s.warn("Do not mix tabs and spaces for indentation.", c.line, 1, this, n.raw);
          }
        });
      }
    };
    var re = {};
    Object.defineProperty(re, "__esModule", { value: !0 }), re.default = {
      id: "spec-char-escape",
      description: "Special characters must be escaped.",
      init(a, s) {
        a.addListener("text", (r) => {
          const t = r.raw, e = /([<>])|( \& )/g;
          let n;
          for (; n = e.exec(t); ) {
            const i = a.fixPos(r, n.index);
            s.error(`Special characters must be escaped : [ ${n[0]} ].`, i.line, i.col, this, r.raw);
          }
        });
      }
    };
    var ie = {};
    Object.defineProperty(ie, "__esModule", { value: !0 }), ie.default = {
      id: "src-not-empty",
      description: "The src attribute of an img(script,link) must have a value.",
      init(a, s) {
        a.addListener("tagstart", (r) => {
          const t = r.tagName, e = r.attrs;
          let n;
          const i = r.col + t.length + 1;
          for (let l = 0, o = e.length; l < o; l++)
            n = e[l], (/^(img|script|embed|bgsound|iframe)$/.test(t) === !0 && n.name === "src" || t === "link" && n.name === "href" || t === "object" && n.name === "data") && n.value === "" && s.error(`The attribute [ ${n.name} ] of the tag [ ${t} ] must have a value.`, r.line, i + n.index, this, n.raw);
        });
      }
    };
    var ne = {};
    Object.defineProperty(ne, "__esModule", { value: !0 }), ne.default = {
      id: "style-disabled",
      description: "<style> tags cannot be used.",
      init(a, s) {
        a.addListener("tagstart", (r) => {
          r.tagName.toLowerCase() === "style" && s.warn("The <style> tag cannot be used.", r.line, r.col, this, r.raw);
        });
      }
    };
    var se = {};
    Object.defineProperty(se, "__esModule", { value: !0 }), se.default = {
      id: "tag-pair",
      description: "Tag must be paired.",
      init(a, s) {
        const r = [], t = a.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr");
        a.addListener("tagstart", (e) => {
          const n = e.tagName.toLowerCase();
          t[n] === void 0 && !e.close && r.push({
            tagName: n,
            line: e.line,
            raw: e.raw
          });
        }), a.addListener("tagend", (e) => {
          const n = e.tagName.toLowerCase();
          let i;
          for (i = r.length - 1; i >= 0 && r[i].tagName !== n; i--)
            ;
          if (i >= 0) {
            const l = [];
            for (let o = r.length - 1; o > i; o--)
              l.push(`</${r[o].tagName}>`);
            if (l.length > 0) {
              const o = r[r.length - 1];
              s.error(`Tag must be paired, missing: [ ${l.join("")} ], start tag match failed [ ${o.raw} ] on line ${o.line}.`, e.line, e.col, this, e.raw);
            }
            r.length = i;
          } else
            s.error(`Tag must be paired, no start tag: [ ${e.raw} ]`, e.line, e.col, this, e.raw);
        }), a.addListener("end", (e) => {
          const n = [];
          for (let i = r.length - 1; i >= 0; i--)
            n.push(`</${r[i].tagName}>`);
          if (n.length > 0) {
            const i = r[r.length - 1];
            s.error(`Tag must be paired, missing: [ ${n.join("")} ], open tag match failed [ ${i.raw} ] on line ${i.line}.`, e.line, e.col, this, "");
          }
        });
      }
    };
    var le = {};
    Object.defineProperty(le, "__esModule", { value: !0 }), le.default = {
      id: "tag-self-close",
      description: "Empty tags must be self closed.",
      init(a, s) {
        const r = a.makeMap("area,base,basefont,bgsound,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr");
        a.addListener("tagstart", (t) => {
          const e = t.tagName.toLowerCase();
          r[e] !== void 0 && (t.close || s.warn(`The empty tag : [ ${e} ] must be self closed.`, t.line, t.col, this, t.raw));
        });
      }
    };
    var oe = {};
    Object.defineProperty(oe, "__esModule", { value: !0 }), oe.default = {
      id: "empty-tag-not-self-closed",
      description: "Empty tags must not use self closed syntax.",
      init(a, s) {
        const r = a.makeMap("area,base,basefont,bgsound,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr");
        a.addListener("tagstart", (t) => {
          const e = t.tagName.toLowerCase();
          r[e] !== void 0 && t.close && s.error(`The empty tag : [ ${e} ] must not use self closed syntax.`, t.line, t.col, this, t.raw);
        });
      }
    };
    var ce = {};
    Object.defineProperty(ce, "__esModule", { value: !0 }), ce.default = {
      id: "tagname-lowercase",
      description: "All html element names must be in lowercase.",
      init(a, s, r) {
        const t = Array.isArray(r) ? r : [];
        a.addListener("tagstart,tagend", (e) => {
          const n = e.tagName;
          t.indexOf(n) === -1 && n !== n.toLowerCase() && s.error(`The html element name of [ ${n} ] must be in lowercase.`, e.line, e.col, this, e.raw);
        });
      }
    };
    var de = {};
    Object.defineProperty(de, "__esModule", { value: !0 }), de.default = {
      id: "tagname-specialchars",
      description: "All special characters must be escaped.",
      init(a, s) {
        const r = /[^a-zA-Z0-9\-:_]/;
        a.addListener("tagstart,tagend", (t) => {
          const e = t.tagName;
          r.test(e) && s.error(`The html element name of [ ${e} ] contains special character.`, t.line, t.col, this, t.raw);
        });
      }
    };
    var ue = {};
    Object.defineProperty(ue, "__esModule", { value: !0 }), ue.default = {
      id: "title-require",
      description: "<title> must be present in <head> tag.",
      init(a, s) {
        let r = !1, t = !1;
        const e = (i) => {
          const l = i.tagName.toLowerCase();
          l === "head" ? r = !0 : l === "title" && r && (t = !0);
        }, n = (i) => {
          const l = i.tagName.toLowerCase();
          if (t && l === "title") {
            const o = i.lastEvent;
            (o.type !== "text" || o.type === "text" && /^\s*$/.test(o.raw) === !0) && s.error("<title></title> must not be empty.", i.line, i.col, this, i.raw);
          } else
            l === "head" && (t === !1 && s.error("<title> must be present in <head> tag.", i.line, i.col, this, i.raw), a.removeListener("tagstart", e), a.removeListener("tagend", n));
        };
        a.addListener("tagstart", e), a.addListener("tagend", n);
      }
    };
    var fe = {};
    Object.defineProperty(fe, "__esModule", { value: !0 });
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
    fe.default = {
      id: "tags-check",
      description: "Checks html tags.",
      init(a, s, r) {
        k = Object.assign(Object.assign({}, k), r), a.addListener("tagstart", (t) => {
          const e = t.attrs, n = t.col + t.tagName.length + 1, i = t.tagName.toLowerCase();
          if (k[i]) {
            const l = k[i];
            l.selfclosing === !0 && !t.close ? s.warn(`The <${i}> tag must be selfclosing.`, t.line, t.col, this, t.raw) : l.selfclosing === !1 && t.close && s.warn(`The <${i}> tag must not be selfclosing.`, t.line, t.col, this, t.raw), Array.isArray(l.attrsRequired) && l.attrsRequired.forEach((c) => {
              if (Array.isArray(c)) {
                const d = c.map((f) => f), u = d.shift(), g = d;
                e.some((f) => f.name === u) ? e.forEach((f) => {
                  f.name === u && g.indexOf(f.value) === -1 && s.error(`The <${i}> tag must have attr '${u}' with one value of '${g.join("' or '")}'.`, t.line, n, this, t.raw);
                }) : s.error(`The <${i}> tag must have attr '${u}'.`, t.line, n, this, t.raw);
              } else
                e.some((d) => c.split("|").indexOf(d.name) !== -1) || s.error(`The <${i}> tag must have attr '${c}'.`, t.line, n, this, t.raw);
            }), Array.isArray(l.attrsOptional) && l.attrsOptional.forEach((c) => {
              if (Array.isArray(c)) {
                const d = c.map((f) => f), u = d.shift(), g = d;
                e.some((f) => f.name === u) && e.forEach((f) => {
                  f.name === u && g.indexOf(f.value) === -1 && s.error(`The <${i}> tag must have optional attr '${u}' with one value of '${g.join("' or '")}'.`, t.line, n, this, t.raw);
                });
              }
            }), Array.isArray(l.redundantAttrs) && l.redundantAttrs.forEach((c) => {
              e.some((d) => d.name === c) && s.error(`The attr '${c}' is redundant for <${i}> and should be omitted.`, t.line, n, this, t.raw);
            });
          }
        });
      }
    };
    var ge = {};
    Object.defineProperty(ge, "__esModule", { value: !0 }), ge.default = {
      id: "attr-no-unnecessary-whitespace",
      description: "No spaces between attribute names and values.",
      init(a, s, r) {
        const t = Array.isArray(r) ? r : [];
        a.addListener("tagstart", (e) => {
          const n = e.attrs, i = e.col + e.tagName.length + 1;
          for (let l = 0; l < n.length; l++)
            if (t.indexOf(n[l].name) === -1) {
              const o = /(\s*)=(\s*)/.exec(n[l].raw.trim());
              o && (o[1].length !== 0 || o[2].length !== 0) && s.error(`The attribute '${n[l].name}' must not have spaces between the name and value.`, e.line, i + n[l].index, this, n[l].raw);
            }
        });
      }
    };
    var he = {}, Ce = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      htmlElementAttributes: {
        "*": [
          "accesskey",
          "autocapitalize",
          "autofocus",
          "class",
          "contenteditable",
          "dir",
          "draggable",
          "enterkeyhint",
          "hidden",
          "id",
          "inert",
          "inputmode",
          "is",
          "itemid",
          "itemprop",
          "itemref",
          "itemscope",
          "itemtype",
          "lang",
          "nonce",
          "popover",
          "slot",
          "spellcheck",
          "style",
          "tabindex",
          "title",
          "translate"
        ],
        a: [
          "charset",
          "coords",
          "download",
          "href",
          "hreflang",
          "name",
          "ping",
          "referrerpolicy",
          "rel",
          "rev",
          "shape",
          "target",
          "type"
        ],
        applet: [
          "align",
          "alt",
          "archive",
          "code",
          "codebase",
          "height",
          "hspace",
          "name",
          "object",
          "vspace",
          "width"
        ],
        area: [
          "alt",
          "coords",
          "download",
          "href",
          "hreflang",
          "nohref",
          "ping",
          "referrerpolicy",
          "rel",
          "shape",
          "target",
          "type"
        ],
        audio: [
          "autoplay",
          "controls",
          "crossorigin",
          "loop",
          "muted",
          "preload",
          "src"
        ],
        base: ["href", "target"],
        basefont: ["color", "face", "size"],
        blockquote: ["cite"],
        body: ["alink", "background", "bgcolor", "link", "text", "vlink"],
        br: ["clear"],
        button: [
          "disabled",
          "form",
          "formaction",
          "formenctype",
          "formmethod",
          "formnovalidate",
          "formtarget",
          "name",
          "popovertarget",
          "popovertargetaction",
          "type",
          "value"
        ],
        canvas: ["height", "width"],
        caption: ["align"],
        col: ["align", "char", "charoff", "span", "valign", "width"],
        colgroup: ["align", "char", "charoff", "span", "valign", "width"],
        data: ["value"],
        del: ["cite", "datetime"],
        details: ["open"],
        dialog: ["open"],
        dir: ["compact"],
        div: ["align"],
        dl: ["compact"],
        embed: ["height", "src", "type", "width"],
        fieldset: ["disabled", "form", "name"],
        font: ["color", "face", "size"],
        form: [
          "accept",
          "accept-charset",
          "action",
          "autocomplete",
          "enctype",
          "method",
          "name",
          "novalidate",
          "target"
        ],
        frame: [
          "frameborder",
          "longdesc",
          "marginheight",
          "marginwidth",
          "name",
          "noresize",
          "scrolling",
          "src"
        ],
        frameset: ["cols", "rows"],
        h1: ["align"],
        h2: ["align"],
        h3: ["align"],
        h4: ["align"],
        h5: ["align"],
        h6: ["align"],
        head: ["profile"],
        hr: ["align", "noshade", "size", "width"],
        html: ["manifest", "version"],
        iframe: [
          "align",
          "allow",
          "allowfullscreen",
          "allowpaymentrequest",
          "allowusermedia",
          "frameborder",
          "height",
          "loading",
          "longdesc",
          "marginheight",
          "marginwidth",
          "name",
          "referrerpolicy",
          "sandbox",
          "scrolling",
          "src",
          "srcdoc",
          "width"
        ],
        img: [
          "align",
          "alt",
          "border",
          "crossorigin",
          "decoding",
          "fetchpriority",
          "height",
          "hspace",
          "ismap",
          "loading",
          "longdesc",
          "name",
          "referrerpolicy",
          "sizes",
          "src",
          "srcset",
          "usemap",
          "vspace",
          "width"
        ],
        input: [
          "accept",
          "align",
          "alt",
          "autocomplete",
          "checked",
          "dirname",
          "disabled",
          "form",
          "formaction",
          "formenctype",
          "formmethod",
          "formnovalidate",
          "formtarget",
          "height",
          "ismap",
          "list",
          "max",
          "maxlength",
          "min",
          "minlength",
          "multiple",
          "name",
          "pattern",
          "placeholder",
          "popovertarget",
          "popovertargetaction",
          "readonly",
          "required",
          "size",
          "src",
          "step",
          "type",
          "usemap",
          "value",
          "width"
        ],
        ins: ["cite", "datetime"],
        isindex: ["prompt"],
        label: ["for", "form"],
        legend: ["align"],
        li: ["type", "value"],
        link: [
          "as",
          "blocking",
          "charset",
          "color",
          "crossorigin",
          "disabled",
          "fetchpriority",
          "href",
          "hreflang",
          "imagesizes",
          "imagesrcset",
          "integrity",
          "media",
          "referrerpolicy",
          "rel",
          "rev",
          "sizes",
          "target",
          "type"
        ],
        map: ["name"],
        menu: ["compact"],
        meta: ["charset", "content", "http-equiv", "media", "name", "scheme"],
        meter: ["high", "low", "max", "min", "optimum", "value"],
        object: [
          "align",
          "archive",
          "border",
          "classid",
          "codebase",
          "codetype",
          "data",
          "declare",
          "form",
          "height",
          "hspace",
          "name",
          "standby",
          "type",
          "typemustmatch",
          "usemap",
          "vspace",
          "width"
        ],
        ol: ["compact", "reversed", "start", "type"],
        optgroup: ["disabled", "label"],
        option: ["disabled", "label", "selected", "value"],
        output: ["for", "form", "name"],
        p: ["align"],
        param: ["name", "type", "value", "valuetype"],
        pre: ["width"],
        progress: ["max", "value"],
        q: ["cite"],
        script: [
          "async",
          "blocking",
          "charset",
          "crossorigin",
          "defer",
          "fetchpriority",
          "integrity",
          "language",
          "nomodule",
          "referrerpolicy",
          "src",
          "type"
        ],
        select: [
          "autocomplete",
          "disabled",
          "form",
          "multiple",
          "name",
          "required",
          "size"
        ],
        slot: ["name"],
        source: ["height", "media", "sizes", "src", "srcset", "type", "width"],
        style: ["blocking", "media", "type"],
        table: [
          "align",
          "bgcolor",
          "border",
          "cellpadding",
          "cellspacing",
          "frame",
          "rules",
          "summary",
          "width"
        ],
        tbody: ["align", "char", "charoff", "valign"],
        td: [
          "abbr",
          "align",
          "axis",
          "bgcolor",
          "char",
          "charoff",
          "colspan",
          "headers",
          "height",
          "nowrap",
          "rowspan",
          "scope",
          "valign",
          "width"
        ],
        textarea: [
          "autocomplete",
          "cols",
          "dirname",
          "disabled",
          "form",
          "maxlength",
          "minlength",
          "name",
          "placeholder",
          "readonly",
          "required",
          "rows",
          "wrap"
        ],
        tfoot: ["align", "char", "charoff", "valign"],
        th: [
          "abbr",
          "align",
          "axis",
          "bgcolor",
          "char",
          "charoff",
          "colspan",
          "headers",
          "height",
          "nowrap",
          "rowspan",
          "scope",
          "valign",
          "width"
        ],
        thead: ["align", "char", "charoff", "valign"],
        time: ["datetime"],
        tr: ["align", "bgcolor", "char", "charoff", "valign"],
        track: ["default", "kind", "label", "src", "srclang"],
        ul: ["compact", "type"],
        video: [
          "autoplay",
          "controls",
          "crossorigin",
          "height",
          "loop",
          "muted",
          "playsinline",
          "poster",
          "preload",
          "src",
          "width"
        ]
      }
    }), $e = /* @__PURE__ */ O(Ce);
    Object.defineProperty(he, "__esModule", { value: !0 });
    const ye = $e;
    he.default = {
      id: "attr-invalid",
      description: "Attributes must be valid for the given HTML tags.",
      init(a, s) {
        const r = ye.htmlElementAttributes["*"] || [];
        a.addListener("tagstart", (t) => {
          const e = t.tagName.toLowerCase(), n = t.attrs, i = ye.htmlElementAttributes[e] || [], l = [...r, ...i];
          for (const o of n)
            l.includes(o.name) || s.error(`The attribute [ ${o.name} ] is not valid for the tag [ ${e} ].`, t.line, t.col + t.tagName.length + 1 + o.index, this, o.raw);
        });
      }
    };
    var me = {};
    Object.defineProperty(me, "__esModule", { value: !0 });
    const we = [
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
    me.default = {
      id: "invalid-tag",
      description: "All tags must be valid HTML tags.",
      init(a, s) {
        const r = [];
        a.addListener("tagstart", (t) => {
          const e = t.tagName;
          we.includes(e) ? r.push(e) : s.error(`The tag [ ${e} ] is not a valid HTML tag.`, t.line, t.col, this, t.raw);
        }), a.addListener("tagend", (t) => {
          const e = t.tagName;
          if (!we.includes(e))
            s.error(`The closing tag [ ${e} ] is not a valid HTML tag.`, t.line, t.col, this, t.raw);
          else {
            const n = r.lastIndexOf(e);
            n !== -1 && r.splice(n, 1);
          }
        }), a.addListener("end", () => {
          r.forEach((t) => {
            s.error(`The tag [ ${t} ] was opened but never closed.`, 0, 0, this, "");
          });
        });
      }
    }, function(a) {
      Object.defineProperty(a, "__esModule", { value: !0 }), a.invalidTag = a.attrInvalid = a.attrNoUnnecessaryWhitespace = a.tagsCheck = a.titleRequire = a.tagnameSpecialChars = a.tagnameLowercase = a.emptyTagNotSelfClosed = a.tagSelfClose = a.tagPair = a.styleDisabled = a.srcNotEmpty = a.specCharEscape = a.spaceTabMixedDisabled = a.scriptDisabled = a.inputRequiresLabel = a.inlineStyleDisabled = a.inlineScriptDisabled = a.idUnique = a.idClassValue = a.idClsasAdDisabled = a.htmlLangRequire = a.hrefAbsOrRel = a.headScriptDisabled = a.doctypeHTML5 = a.doctypeFirst = a.attrWhitespace = a.attrValueSingleQuotes = a.attrValueNotEmpty = a.attrValueDoubleQuotes = a.attrUnsafeChars = a.attrNoDuplication = a.attrSort = a.attrLowercase = a.altRequire = void 0;
      var s = x;
      Object.defineProperty(a, "altRequire", { enumerable: !0, get: function() {
        return s.default;
      } });
      var r = R;
      Object.defineProperty(a, "attrLowercase", { enumerable: !0, get: function() {
        return r.default;
      } });
      var t = D;
      Object.defineProperty(a, "attrSort", { enumerable: !0, get: function() {
        return t.default;
      } });
      var e = S;
      Object.defineProperty(a, "attrNoDuplication", { enumerable: !0, get: function() {
        return e.default;
      } });
      var n = z;
      Object.defineProperty(a, "attrUnsafeChars", { enumerable: !0, get: function() {
        return n.default;
      } });
      var i = I;
      Object.defineProperty(a, "attrValueDoubleQuotes", { enumerable: !0, get: function() {
        return i.default;
      } });
      var l = H;
      Object.defineProperty(a, "attrValueNotEmpty", { enumerable: !0, get: function() {
        return l.default;
      } });
      var o = U;
      Object.defineProperty(a, "attrValueSingleQuotes", { enumerable: !0, get: function() {
        return o.default;
      } });
      var c = V;
      Object.defineProperty(a, "attrWhitespace", { enumerable: !0, get: function() {
        return c.default;
      } });
      var d = Z;
      Object.defineProperty(a, "doctypeFirst", { enumerable: !0, get: function() {
        return d.default;
      } });
      var u = W;
      Object.defineProperty(a, "doctypeHTML5", { enumerable: !0, get: function() {
        return u.default;
      } });
      var g = F;
      Object.defineProperty(a, "headScriptDisabled", { enumerable: !0, get: function() {
        return g.default;
      } });
      var f = B;
      Object.defineProperty(a, "hrefAbsOrRel", { enumerable: !0, get: function() {
        return f.default;
      } });
      var _ = Y;
      Object.defineProperty(a, "htmlLangRequire", { enumerable: !0, get: function() {
        return _.default;
      } });
      var p = Q;
      Object.defineProperty(a, "idClsasAdDisabled", { enumerable: !0, get: function() {
        return p.default;
      } });
      var v = J;
      Object.defineProperty(a, "idClassValue", { enumerable: !0, get: function() {
        return v.default;
      } });
      var b = X;
      Object.defineProperty(a, "idUnique", { enumerable: !0, get: function() {
        return b.default;
      } });
      var P = G;
      Object.defineProperty(a, "inlineScriptDisabled", { enumerable: !0, get: function() {
        return P.default;
      } });
      var A = K;
      Object.defineProperty(a, "inlineStyleDisabled", { enumerable: !0, get: function() {
        return A.default;
      } });
      var w = ee;
      Object.defineProperty(a, "inputRequiresLabel", { enumerable: !0, get: function() {
        return w.default;
      } });
      var L = te;
      Object.defineProperty(a, "scriptDisabled", { enumerable: !0, get: function() {
        return L.default;
      } });
      var h = ae;
      Object.defineProperty(a, "spaceTabMixedDisabled", { enumerable: !0, get: function() {
        return h.default;
      } });
      var j = re;
      Object.defineProperty(a, "specCharEscape", { enumerable: !0, get: function() {
        return j.default;
      } });
      var T = ie;
      Object.defineProperty(a, "srcNotEmpty", { enumerable: !0, get: function() {
        return T.default;
      } });
      var $ = ne;
      Object.defineProperty(a, "styleDisabled", { enumerable: !0, get: function() {
        return $.default;
      } });
      var pe = se;
      Object.defineProperty(a, "tagPair", { enumerable: !0, get: function() {
        return pe.default;
      } });
      var ke = le;
      Object.defineProperty(a, "tagSelfClose", { enumerable: !0, get: function() {
        return ke.default;
      } });
      var qe = oe;
      Object.defineProperty(a, "emptyTagNotSelfClosed", { enumerable: !0, get: function() {
        return qe.default;
      } });
      var Ee = ce;
      Object.defineProperty(a, "tagnameLowercase", { enumerable: !0, get: function() {
        return Ee.default;
      } });
      var xe = de;
      Object.defineProperty(a, "tagnameSpecialChars", { enumerable: !0, get: function() {
        return xe.default;
      } });
      var Re = ue;
      Object.defineProperty(a, "titleRequire", { enumerable: !0, get: function() {
        return Re.default;
      } });
      var De = fe;
      Object.defineProperty(a, "tagsCheck", { enumerable: !0, get: function() {
        return De.default;
      } });
      var Se = ge;
      Object.defineProperty(a, "attrNoUnnecessaryWhitespace", { enumerable: !0, get: function() {
        return Se.default;
      } });
      var ze = he;
      Object.defineProperty(a, "attrInvalid", { enumerable: !0, get: function() {
        return ze.default;
      } });
      var Ie = me;
      Object.defineProperty(a, "invalidTag", { enumerable: !0, get: function() {
        return Ie.default;
      } });
    }(be), function(a) {
      Object.defineProperty(a, "__esModule", { value: !0 }), a.HTMLParser = a.Reporter = a.HTMLRules = a.HTMLHint = void 0;
      const s = C;
      a.HTMLParser = s.default;
      const r = E;
      a.Reporter = r.default;
      const t = be;
      a.HTMLRules = t;
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
          Object.keys(o).length === 0 && (o = this.defaultRuleset), l = l.replace(/^\s*<!--\s*htmlhint\s+([^\r\n]+?)\s*-->/i, (f, _) => (_.replace(/(?:^|,)\s*([^:,]+)\s*(?:\:\s*([^,\s]+))?/g, (p, v, b) => (o[v] = b !== void 0 && b.length > 0 ? JSON.parse(b) : !0, "")), ""));
          const c = new s.default(), d = new r.default(l, o), u = this.rules;
          let g;
          for (const f in o)
            g = u[f], g !== void 0 && o[f] !== !1 && g.init(c, d, o[f]);
          return c.parse(l), d.messages;
        }
        format(l, o = {}) {
          const c = [], d = {
            white: "",
            grey: "",
            red: "",
            reset: ""
          };
          o.colors && (d.white = "\x1B[37m", d.grey = "\x1B[90m", d.red = "\x1B[31m", d.reset = "\x1B[39m");
          const u = o.indent || 0;
          return l.forEach((g) => {
            let p = g.evidence;
            const v = g.line, b = g.col, P = p.length;
            let A = b > 40 + 1 ? b - 40 : 1, w = p.length > b + 60 ? b + 60 : P;
            b < 40 + 1 && (w += 40 - b + 1), p = p.replace(/\t/g, " ").substring(A - 1, w), A > 1 && (p = `...${p}`, A -= 3), w < P && (p += "..."), c.push(`${d.white + n(u)}L${v} |${d.grey}${p}${d.reset}`);
            let L = b - A;
            const h = p.substring(0, L).match(/[^\u0000-\u00ff]/g);
            h !== null && (L += h.length), c.push(`${d.white + n(u) + n(String(v).length + 3 + L)}^ ${d.red}${g.message} (${g.rule.id})${d.reset}`);
          }), c;
        }
      }
      function n(i, l) {
        return new Array(i + 1).join(l || " ");
      }
      a.HTMLHint = new e(), Object.keys(t).forEach((i) => {
        a.HTMLHint.addRule(t[i]);
      });
    }(q);
    var Ne = /* @__PURE__ */ m(q);
    return Ne;
  });
})(_e);
var Ue = _e.exports;
const Ve = (M) => {
  const y = M.split(" ");
  for (var m = 0; m < y.length; m++)
    y[m] = y[m].charAt(0).toUpperCase() + y[m].slice(1);
  return y.join(" ");
}, Ze = {
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
class We {
  constructor(y, m = Ze, O) {
    this.html = y, this.ruleset = m, this.linterResponse = this.lint(), this.model = O;
  }
  lint() {
    return Ue.HTMLHint.verify(this.html, this.ruleset);
  }
  getEditorMarks(y) {
    return this.linterResponse.map((m) => ({
      startLineNumber: m.line,
      startColumn: m.col,
      endLineNumber: m.line,
      endColumn: m.evidence !== "" ? m.col + m.evidence.length : this.model !== void 0 ? this.model.getLineLength(m.line) : m.col + 1,
      message: m.message,
      severity: y.MarkerSeverity[Ve(m.type)]
    }));
  }
  getLinterResponse() {
    return this.linterResponse;
  }
}
class at {
  constructor(y, m, O) {
    this.editor = y, this.monaco = m, this.ruleset = O;
  }
  lint() {
    var O;
    const y = this.editor.getValue();
    if (((O = this.editor.getModel()) == null ? void 0 : O.getLanguageId()) === "html") {
      const C = new We(y, this.ruleset, this.editor.getModel() || void 0).getEditorMarks(this.monaco), N = this.editor.getModel();
      if (N === null)
        throw new Error("Your model still does't exist.");
      this.monaco.editor.setModelMarkers(N, "owner", C);
    }
  }
  watch() {
    this.lint(), this.editor.onDidChangeModelContent((y) => {
      this.lint();
    });
  }
}
export {
  We as HTMLMonacoMarks,
  at as default
};
