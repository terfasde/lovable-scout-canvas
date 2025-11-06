import { r as g, a as fo, o as E, v as ho } from "./vendor-react-BgpSLK3q.js";
function po(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
function mo(e) {
  if (Object.prototype.hasOwnProperty.call(e, "__esModule")) return e;
  var n = e.default;
  if (typeof n == "function") {
    var t = function r() {
      var o = !1;
      try {
        o = this instanceof r;
      } catch {}
      return o
        ? Reflect.construct(n, arguments, this.constructor)
        : n.apply(this, arguments);
    };
    t.prototype = n.prototype;
  } else t = {};
  return (
    Object.defineProperty(t, "__esModule", { value: !0 }),
    Object.keys(e).forEach(function (r) {
      var o = Object.getOwnPropertyDescriptor(e, r);
      Object.defineProperty(
        t,
        r,
        o.get
          ? o
          : {
              enumerable: !0,
              get: function () {
                return e[r];
              },
            },
      );
    }),
    t
  );
}
var Et = { exports: {} },
  Rt = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var gn;
function vo() {
  return (
    gn ||
      ((gn = 1),
      (function (e) {
        function n(S, x) {
          var P = S.length;
          S.push(x);
          e: for (; 0 < P; ) {
            var F = (P - 1) >>> 1,
              T = S[F];
            if (0 < o(T, x)) ((S[F] = x), (S[P] = T), (P = F));
            else break e;
          }
        }
        function t(S) {
          return S.length === 0 ? null : S[0];
        }
        function r(S) {
          if (S.length === 0) return null;
          var x = S[0],
            P = S.pop();
          if (P !== x) {
            S[0] = P;
            e: for (var F = 0, T = S.length, k = T >>> 1; F < k; ) {
              var M = 2 * (F + 1) - 1,
                q = S[M],
                G = M + 1,
                I = S[G];
              if (0 > o(q, P))
                G < T && 0 > o(I, q)
                  ? ((S[F] = I), (S[G] = P), (F = G))
                  : ((S[F] = q), (S[M] = P), (F = M));
              else if (G < T && 0 > o(I, P)) ((S[F] = I), (S[G] = P), (F = G));
              else break e;
            }
          }
          return x;
        }
        function o(S, x) {
          var P = S.sortIndex - x.sortIndex;
          return P !== 0 ? P : S.id - x.id;
        }
        if (
          typeof performance == "object" &&
          typeof performance.now == "function"
        ) {
          var a = performance;
          e.unstable_now = function () {
            return a.now();
          };
        } else {
          var i = Date,
            s = i.now();
          e.unstable_now = function () {
            return i.now() - s;
          };
        }
        var c = [],
          u = [],
          f = 1,
          d = null,
          h = 3,
          l = !1,
          v = !1,
          p = !1,
          m = typeof setTimeout == "function" ? setTimeout : null,
          y = typeof clearTimeout == "function" ? clearTimeout : null,
          w = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function b(S) {
          for (var x = t(u); x !== null; ) {
            if (x.callback === null) r(u);
            else if (x.startTime <= S)
              (r(u), (x.sortIndex = x.expirationTime), n(c, x));
            else break;
            x = t(u);
          }
        }
        function R(S) {
          if (((p = !1), b(S), !v))
            if (t(c) !== null) ((v = !0), U(C));
            else {
              var x = t(u);
              x !== null && $(R, x.startTime - S);
            }
        }
        function C(S, x) {
          ((v = !1), p && ((p = !1), y(D), (D = -1)), (l = !0));
          var P = h;
          try {
            for (
              b(x), d = t(c);
              d !== null && (!(d.expirationTime > x) || (S && !V()));

            ) {
              var F = d.callback;
              if (typeof F == "function") {
                ((d.callback = null), (h = d.priorityLevel));
                var T = F(d.expirationTime <= x);
                ((x = e.unstable_now()),
                  typeof T == "function"
                    ? (d.callback = T)
                    : d === t(c) && r(c),
                  b(x));
              } else r(c);
              d = t(c);
            }
            if (d !== null) var k = !0;
            else {
              var M = t(u);
              (M !== null && $(R, M.startTime - x), (k = !1));
            }
            return k;
          } finally {
            ((d = null), (h = P), (l = !1));
          }
        }
        var _ = !1,
          A = null,
          D = -1,
          j = 5,
          N = -1;
        function V() {
          return !(e.unstable_now() - N < j);
        }
        function B() {
          if (A !== null) {
            var S = e.unstable_now();
            N = S;
            var x = !0;
            try {
              x = A(!0, S);
            } finally {
              x ? Z() : ((_ = !1), (A = null));
            }
          } else _ = !1;
        }
        var Z;
        if (typeof w == "function")
          Z = function () {
            w(B);
          };
        else if (typeof MessageChannel < "u") {
          var W = new MessageChannel(),
            X = W.port2;
          ((W.port1.onmessage = B),
            (Z = function () {
              X.postMessage(null);
            }));
        } else
          Z = function () {
            m(B, 0);
          };
        function U(S) {
          ((A = S), _ || ((_ = !0), Z()));
        }
        function $(S, x) {
          D = m(function () {
            S(e.unstable_now());
          }, x);
        }
        ((e.unstable_IdlePriority = 5),
          (e.unstable_ImmediatePriority = 1),
          (e.unstable_LowPriority = 4),
          (e.unstable_NormalPriority = 3),
          (e.unstable_Profiling = null),
          (e.unstable_UserBlockingPriority = 2),
          (e.unstable_cancelCallback = function (S) {
            S.callback = null;
          }),
          (e.unstable_continueExecution = function () {
            v || l || ((v = !0), U(C));
          }),
          (e.unstable_forceFrameRate = function (S) {
            0 > S || 125 < S
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (j = 0 < S ? Math.floor(1e3 / S) : 5);
          }),
          (e.unstable_getCurrentPriorityLevel = function () {
            return h;
          }),
          (e.unstable_getFirstCallbackNode = function () {
            return t(c);
          }),
          (e.unstable_next = function (S) {
            switch (h) {
              case 1:
              case 2:
              case 3:
                var x = 3;
                break;
              default:
                x = h;
            }
            var P = h;
            h = x;
            try {
              return S();
            } finally {
              h = P;
            }
          }),
          (e.unstable_pauseExecution = function () {}),
          (e.unstable_requestPaint = function () {}),
          (e.unstable_runWithPriority = function (S, x) {
            switch (S) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                S = 3;
            }
            var P = h;
            h = S;
            try {
              return x();
            } finally {
              h = P;
            }
          }),
          (e.unstable_scheduleCallback = function (S, x, P) {
            var F = e.unstable_now();
            switch (
              (typeof P == "object" && P !== null
                ? ((P = P.delay),
                  (P = typeof P == "number" && 0 < P ? F + P : F))
                : (P = F),
              S)
            ) {
              case 1:
                var T = -1;
                break;
              case 2:
                T = 250;
                break;
              case 5:
                T = 1073741823;
                break;
              case 4:
                T = 1e4;
                break;
              default:
                T = 5e3;
            }
            return (
              (T = P + T),
              (S = {
                id: f++,
                callback: x,
                priorityLevel: S,
                startTime: P,
                expirationTime: T,
                sortIndex: -1,
              }),
              P > F
                ? ((S.sortIndex = P),
                  n(u, S),
                  t(c) === null &&
                    S === t(u) &&
                    (p ? (y(D), (D = -1)) : (p = !0), $(R, P - F)))
                : ((S.sortIndex = T), n(c, S), v || l || ((v = !0), U(C))),
              S
            );
          }),
          (e.unstable_shouldYield = V),
          (e.unstable_wrapCallback = function (S) {
            var x = h;
            return function () {
              var P = h;
              h = x;
              try {
                return S.apply(this, arguments);
              } finally {
                h = P;
              }
            };
          }));
      })(Rt)),
    Rt
  );
}
var yn;
function Ws() {
  return (yn || ((yn = 1), (Et.exports = vo())), Et.exports);
}
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function He() {
  return (
    (He = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var t = arguments[n];
            for (var r in t)
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          }
          return e;
        }),
    He.apply(this, arguments)
  );
}
var ve;
(function (e) {
  ((e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE"));
})(ve || (ve = {}));
const wn = "popstate";
function $s(e) {
  e === void 0 && (e = {});
  function n(r, o) {
    let { pathname: a, search: i, hash: s } = r.location;
    return Bt(
      "",
      { pathname: a, search: i, hash: s },
      (o.state && o.state.usr) || null,
      (o.state && o.state.key) || "default",
    );
  }
  function t(r, o) {
    return typeof o == "string" ? o : Qn(o);
  }
  return yo(n, t, null, e);
}
function Y(e, n) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(n);
}
function Jn(e, n) {
  if (!e) {
    typeof console < "u" && console.warn(n);
    try {
      throw new Error(n);
    } catch {}
  }
}
function go() {
  return Math.random().toString(36).substr(2, 8);
}
function bn(e, n) {
  return { usr: e.state, key: e.key, idx: n };
}
function Bt(e, n, t, r) {
  return (
    t === void 0 && (t = null),
    He(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof n == "string" ? Le(n) : n,
      { state: t, key: (n && n.key) || r || go() },
    )
  );
}
function Qn(e) {
  let { pathname: n = "/", search: t = "", hash: r = "" } = e;
  return (
    t && t !== "?" && (n += t.charAt(0) === "?" ? t : "?" + t),
    r && r !== "#" && (n += r.charAt(0) === "#" ? r : "#" + r),
    n
  );
}
function Le(e) {
  let n = {};
  if (e) {
    let t = e.indexOf("#");
    t >= 0 && ((n.hash = e.substr(t)), (e = e.substr(0, t)));
    let r = e.indexOf("?");
    (r >= 0 && ((n.search = e.substr(r)), (e = e.substr(0, r))),
      e && (n.pathname = e));
  }
  return n;
}
function yo(e, n, t, r) {
  r === void 0 && (r = {});
  let { window: o = document.defaultView, v5Compat: a = !1 } = r,
    i = o.history,
    s = ve.Pop,
    c = null,
    u = f();
  u == null && ((u = 0), i.replaceState(He({}, i.state, { idx: u }), ""));
  function f() {
    return (i.state || { idx: null }).idx;
  }
  function d() {
    s = ve.Pop;
    let m = f(),
      y = m == null ? null : m - u;
    ((u = m), c && c({ action: s, location: p.location, delta: y }));
  }
  function h(m, y) {
    s = ve.Push;
    let w = Bt(p.location, m, y);
    u = f() + 1;
    let b = bn(w, u),
      R = p.createHref(w);
    try {
      i.pushState(b, "", R);
    } catch (C) {
      if (C instanceof DOMException && C.name === "DataCloneError") throw C;
      o.location.assign(R);
    }
    a && c && c({ action: s, location: p.location, delta: 1 });
  }
  function l(m, y) {
    s = ve.Replace;
    let w = Bt(p.location, m, y);
    u = f();
    let b = bn(w, u),
      R = p.createHref(w);
    (i.replaceState(b, "", R),
      a && c && c({ action: s, location: p.location, delta: 0 }));
  }
  function v(m) {
    let y = o.location.origin !== "null" ? o.location.origin : o.location.href,
      w = typeof m == "string" ? m : Qn(m);
    return (
      (w = w.replace(/ $/, "%20")),
      Y(
        y,
        "No window.location.(origin|href) available to create URL for href: " +
          w,
      ),
      new URL(w, y)
    );
  }
  let p = {
    get action() {
      return s;
    },
    get location() {
      return e(o, i);
    },
    listen(m) {
      if (c) throw new Error("A history only accepts one active listener");
      return (
        o.addEventListener(wn, d),
        (c = m),
        () => {
          (o.removeEventListener(wn, d), (c = null));
        }
      );
    },
    createHref(m) {
      return n(o, m);
    },
    createURL: v,
    encodeLocation(m) {
      let y = v(m);
      return { pathname: y.pathname, search: y.search, hash: y.hash };
    },
    push: h,
    replace: l,
    go(m) {
      return i.go(m);
    },
  };
  return p;
}
var xn;
(function (e) {
  ((e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error"));
})(xn || (xn = {}));
function wo(e, n, t) {
  return (t === void 0 && (t = "/"), bo(e, n, t));
}
function bo(e, n, t, r) {
  let o = typeof n == "string" ? Le(n) : n,
    a = nr(o.pathname || "/", t);
  if (a == null) return null;
  let i = er(e);
  xo(i);
  let s = null;
  for (let c = 0; s == null && c < i.length; ++c) {
    let u = ko(a);
    s = Ao(i[c], u);
  }
  return s;
}
function er(e, n, t, r) {
  (n === void 0 && (n = []),
    t === void 0 && (t = []),
    r === void 0 && (r = ""));
  let o = (a, i, s) => {
    let c = {
      relativePath: s === void 0 ? a.path || "" : s,
      caseSensitive: a.caseSensitive === !0,
      childrenIndex: i,
      route: a,
    };
    c.relativePath.startsWith("/") &&
      (Y(
        c.relativePath.startsWith(r),
        'Absolute route path "' +
          c.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes.",
      ),
      (c.relativePath = c.relativePath.slice(r.length)));
    let u = ge([r, c.relativePath]),
      f = t.concat(c);
    (a.children &&
      a.children.length > 0 &&
      (Y(
        a.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + u + '".'),
      ),
      er(a.children, n, f, u)),
      !(a.path == null && !a.index) &&
        n.push({ path: u, score: To(u, a.index), routesMeta: f }));
  };
  return (
    e.forEach((a, i) => {
      var s;
      if (a.path === "" || !((s = a.path) != null && s.includes("?"))) o(a, i);
      else for (let c of tr(a.path)) o(a, i, c);
    }),
    n
  );
}
function tr(e) {
  let n = e.split("/");
  if (n.length === 0) return [];
  let [t, ...r] = n,
    o = t.endsWith("?"),
    a = t.replace(/\?$/, "");
  if (r.length === 0) return o ? [a, ""] : [a];
  let i = tr(r.join("/")),
    s = [];
  return (
    s.push(...i.map((c) => (c === "" ? a : [a, c].join("/")))),
    o && s.push(...i),
    s.map((c) => (e.startsWith("/") && c === "" ? "/" : c))
  );
}
function xo(e) {
  e.sort((n, t) =>
    n.score !== t.score
      ? t.score - n.score
      : Oo(
          n.routesMeta.map((r) => r.childrenIndex),
          t.routesMeta.map((r) => r.childrenIndex),
        ),
  );
}
const So = /^:[\w-]+$/,
  Co = 3,
  Eo = 2,
  Ro = 1,
  Po = 10,
  _o = -2,
  Sn = (e) => e === "*";
function To(e, n) {
  let t = e.split("/"),
    r = t.length;
  return (
    t.some(Sn) && (r += _o),
    n && (r += Eo),
    t
      .filter((o) => !Sn(o))
      .reduce((o, a) => o + (So.test(a) ? Co : a === "" ? Ro : Po), r)
  );
}
function Oo(e, n) {
  return e.length === n.length && e.slice(0, -1).every((r, o) => r === n[o])
    ? e[e.length - 1] - n[n.length - 1]
    : 0;
}
function Ao(e, n, t) {
  let { routesMeta: r } = e,
    o = {},
    a = "/",
    i = [];
  for (let s = 0; s < r.length; ++s) {
    let c = r[s],
      u = s === r.length - 1,
      f = a === "/" ? n : n.slice(a.length) || "/",
      d = Do(
        { path: c.relativePath, caseSensitive: c.caseSensitive, end: u },
        f,
      ),
      h = c.route;
    if (!d) return null;
    (Object.assign(o, d.params),
      i.push({
        params: o,
        pathname: ge([a, d.pathname]),
        pathnameBase: Io(ge([a, d.pathnameBase])),
        route: h,
      }),
      d.pathnameBase !== "/" && (a = ge([a, d.pathnameBase])));
  }
  return i;
}
function Do(e, n) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [t, r] = Mo(e.path, e.caseSensitive, e.end),
    o = n.match(t);
  if (!o) return null;
  let a = o[0],
    i = a.replace(/(.)\/+$/, "$1"),
    s = o.slice(1);
  return {
    params: r.reduce((u, f, d) => {
      let { paramName: h, isOptional: l } = f;
      if (h === "*") {
        let p = s[d] || "";
        i = a.slice(0, a.length - p.length).replace(/(.)\/+$/, "$1");
      }
      const v = s[d];
      return (
        l && !v ? (u[h] = void 0) : (u[h] = (v || "").replace(/%2F/g, "/")),
        u
      );
    }, {}),
    pathname: a,
    pathnameBase: i,
    pattern: e,
  };
}
function Mo(e, n, t) {
  (n === void 0 && (n = !1),
    t === void 0 && (t = !0),
    Jn(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'),
    ));
  let r = [],
    o =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (i, s, c) => (
            r.push({ paramName: s, isOptional: c != null }),
            c ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (o += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : t
        ? (o += "\\/*$")
        : e !== "" && e !== "/" && (o += "(?:(?=\\/|$))"),
    [new RegExp(o, n ? void 0 : "i"), r]
  );
}
function ko(e) {
  try {
    return e
      .split("/")
      .map((n) => decodeURIComponent(n).replace(/\//g, "%2F"))
      .join("/");
  } catch (n) {
    return (
      Jn(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + n + ")."),
      ),
      e
    );
  }
}
function nr(e, n) {
  if (n === "/") return e;
  if (!e.toLowerCase().startsWith(n.toLowerCase())) return null;
  let t = n.endsWith("/") ? n.length - 1 : n.length,
    r = e.charAt(t);
  return r && r !== "/" ? null : e.slice(t) || "/";
}
function No(e, n) {
  n === void 0 && (n = "/");
  let {
    pathname: t,
    search: r = "",
    hash: o = "",
  } = typeof e == "string" ? Le(e) : e;
  return {
    pathname: t ? (t.startsWith("/") ? t : Lo(t, n)) : n,
    search: jo(r),
    hash: Bo(o),
  };
}
function Lo(e, n) {
  let t = n.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((o) => {
      o === ".." ? t.length > 1 && t.pop() : o !== "." && t.push(o);
    }),
    t.length > 1 ? t.join("/") : "/"
  );
}
function Pt(e, n, t, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      n +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + t + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function zo(e) {
  return e.filter(
    (n, t) => t === 0 || (n.route.path && n.route.path.length > 0),
  );
}
function rr(e, n) {
  let t = zo(e);
  return n
    ? t.map((r, o) => (o === t.length - 1 ? r.pathname : r.pathnameBase))
    : t.map((r) => r.pathnameBase);
}
function or(e, n, t, r) {
  r === void 0 && (r = !1);
  let o;
  typeof e == "string"
    ? (o = Le(e))
    : ((o = He({}, e)),
      Y(
        !o.pathname || !o.pathname.includes("?"),
        Pt("?", "pathname", "search", o),
      ),
      Y(
        !o.pathname || !o.pathname.includes("#"),
        Pt("#", "pathname", "hash", o),
      ),
      Y(!o.search || !o.search.includes("#"), Pt("#", "search", "hash", o)));
  let a = e === "" || o.pathname === "",
    i = a ? "/" : o.pathname,
    s;
  if (i == null) s = t;
  else {
    let d = n.length - 1;
    if (!r && i.startsWith("..")) {
      let h = i.split("/");
      for (; h[0] === ".."; ) (h.shift(), (d -= 1));
      o.pathname = h.join("/");
    }
    s = d >= 0 ? n[d] : "/";
  }
  let c = No(o, s),
    u = i && i !== "/" && i.endsWith("/"),
    f = (a || i === ".") && t.endsWith("/");
  return (!c.pathname.endsWith("/") && (u || f) && (c.pathname += "/"), c);
}
const ge = (e) => e.join("/").replace(/\/\/+/g, "/"),
  Io = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  jo = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  Bo = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function Wo(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const ar = ["post", "put", "patch", "delete"];
new Set(ar);
const $o = ["get", ...ar];
new Set($o);
/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Ue() {
  return (
    (Ue = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var t = arguments[n];
            for (var r in t)
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          }
          return e;
        }),
    Ue.apply(this, arguments)
  );
}
const qt = g.createContext(null),
  Fo = g.createContext(null),
  ze = g.createContext(null),
  dt = g.createContext(null),
  be = g.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  ir = g.createContext(null);
function Fs(e, n) {
  let { relative: t } = n === void 0 ? {} : n;
  Ze() || Y(!1);
  let { basename: r, navigator: o } = g.useContext(ze),
    { hash: a, pathname: i, search: s } = Uo(e, { relative: t }),
    c = i;
  return (
    r !== "/" && (c = i === "/" ? r : ge([r, i])),
    o.createHref({ pathname: c, search: s, hash: a })
  );
}
function Ze() {
  return g.useContext(dt) != null;
}
function Xt() {
  return (Ze() || Y(!1), g.useContext(dt).location);
}
function sr(e) {
  g.useContext(ze).static || g.useLayoutEffect(e);
}
function Hs() {
  let { isDataRoute: e } = g.useContext(be);
  return e ? na() : Ho();
}
function Ho() {
  Ze() || Y(!1);
  let e = g.useContext(qt),
    { basename: n, future: t, navigator: r } = g.useContext(ze),
    { matches: o } = g.useContext(be),
    { pathname: a } = Xt(),
    i = JSON.stringify(rr(o, t.v7_relativeSplatPath)),
    s = g.useRef(!1);
  return (
    sr(() => {
      s.current = !0;
    }),
    g.useCallback(
      function (u, f) {
        if ((f === void 0 && (f = {}), !s.current)) return;
        if (typeof u == "number") {
          r.go(u);
          return;
        }
        let d = or(u, JSON.parse(i), a, f.relative === "path");
        (e == null &&
          n !== "/" &&
          (d.pathname = d.pathname === "/" ? n : ge([n, d.pathname])),
          (f.replace ? r.replace : r.push)(d, f.state, f));
      },
      [n, r, i, a, e],
    )
  );
}
function Us() {
  let { matches: e } = g.useContext(be),
    n = e[e.length - 1];
  return n ? n.params : {};
}
function Uo(e, n) {
  let { relative: t } = n === void 0 ? {} : n,
    { future: r } = g.useContext(ze),
    { matches: o } = g.useContext(be),
    { pathname: a } = Xt(),
    i = JSON.stringify(rr(o, r.v7_relativeSplatPath));
  return g.useMemo(() => or(e, JSON.parse(i), a, t === "path"), [e, i, a, t]);
}
function Vo(e, n) {
  return Yo(e, n);
}
function Yo(e, n, t, r) {
  Ze() || Y(!1);
  let { navigator: o } = g.useContext(ze),
    { matches: a } = g.useContext(be),
    i = a[a.length - 1],
    s = i ? i.params : {};
  i && i.pathname;
  let c = i ? i.pathnameBase : "/";
  i && i.route;
  let u = Xt(),
    f;
  if (n) {
    var d;
    let m = typeof n == "string" ? Le(n) : n;
    (c === "/" || ((d = m.pathname) != null && d.startsWith(c)) || Y(!1),
      (f = m));
  } else f = u;
  let h = f.pathname || "/",
    l = h;
  if (c !== "/") {
    let m = c.replace(/^\//, "").split("/");
    l = "/" + h.replace(/^\//, "").split("/").slice(m.length).join("/");
  }
  let v = wo(e, { pathname: l }),
    p = Ko(
      v &&
        v.map((m) =>
          Object.assign({}, m, {
            params: Object.assign({}, s, m.params),
            pathname: ge([
              c,
              o.encodeLocation
                ? o.encodeLocation(m.pathname).pathname
                : m.pathname,
            ]),
            pathnameBase:
              m.pathnameBase === "/"
                ? c
                : ge([
                    c,
                    o.encodeLocation
                      ? o.encodeLocation(m.pathnameBase).pathname
                      : m.pathnameBase,
                  ]),
          }),
        ),
      a,
      t,
      r,
    );
  return n && p
    ? g.createElement(
        dt.Provider,
        {
          value: {
            location: Ue(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              f,
            ),
            navigationType: ve.Pop,
          },
        },
        p,
      )
    : p;
}
function Zo() {
  let e = ta(),
    n = Wo(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    t = e instanceof Error ? e.stack : null,
    o = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return g.createElement(
    g.Fragment,
    null,
    g.createElement("h2", null, "Unexpected Application Error!"),
    g.createElement("h3", { style: { fontStyle: "italic" } }, n),
    t ? g.createElement("pre", { style: o }, t) : null,
    null,
  );
}
const qo = g.createElement(Zo, null);
class Xo extends g.Component {
  constructor(n) {
    (super(n),
      (this.state = {
        location: n.location,
        revalidation: n.revalidation,
        error: n.error,
      }));
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  static getDerivedStateFromProps(n, t) {
    return t.location !== n.location ||
      (t.revalidation !== "idle" && n.revalidation === "idle")
      ? { error: n.error, location: n.location, revalidation: n.revalidation }
      : {
          error: n.error !== void 0 ? n.error : t.error,
          location: t.location,
          revalidation: n.revalidation || t.revalidation,
        };
  }
  componentDidCatch(n, t) {
    console.error(
      "React Router caught the following error during render",
      n,
      t,
    );
  }
  render() {
    return this.state.error !== void 0
      ? g.createElement(
          be.Provider,
          { value: this.props.routeContext },
          g.createElement(ir.Provider, {
            value: this.state.error,
            children: this.props.component,
          }),
        )
      : this.props.children;
  }
}
function Go(e) {
  let { routeContext: n, match: t, children: r } = e,
    o = g.useContext(qt);
  return (
    o &&
      o.static &&
      o.staticContext &&
      (t.route.errorElement || t.route.ErrorBoundary) &&
      (o.staticContext._deepestRenderedBoundaryId = t.route.id),
    g.createElement(be.Provider, { value: n }, r)
  );
}
function Ko(e, n, t, r) {
  var o;
  if (
    (n === void 0 && (n = []),
    t === void 0 && (t = null),
    r === void 0 && (r = null),
    e == null)
  ) {
    var a;
    if (!t) return null;
    if (t.errors) e = t.matches;
    else if (
      (a = r) != null &&
      a.v7_partialHydration &&
      n.length === 0 &&
      !t.initialized &&
      t.matches.length > 0
    )
      e = t.matches;
    else return null;
  }
  let i = e,
    s = (o = t) == null ? void 0 : o.errors;
  if (s != null) {
    let f = i.findIndex((d) => d.route.id && s?.[d.route.id] !== void 0);
    (f >= 0 || Y(!1), (i = i.slice(0, Math.min(i.length, f + 1))));
  }
  let c = !1,
    u = -1;
  if (t && r && r.v7_partialHydration)
    for (let f = 0; f < i.length; f++) {
      let d = i[f];
      if (
        ((d.route.HydrateFallback || d.route.hydrateFallbackElement) && (u = f),
        d.route.id)
      ) {
        let { loaderData: h, errors: l } = t,
          v =
            d.route.loader &&
            h[d.route.id] === void 0 &&
            (!l || l[d.route.id] === void 0);
        if (d.route.lazy || v) {
          ((c = !0), u >= 0 ? (i = i.slice(0, u + 1)) : (i = [i[0]]));
          break;
        }
      }
    }
  return i.reduceRight((f, d, h) => {
    let l,
      v = !1,
      p = null,
      m = null;
    t &&
      ((l = s && d.route.id ? s[d.route.id] : void 0),
      (p = d.route.errorElement || qo),
      c &&
        (u < 0 && h === 0
          ? (ra("route-fallback"), (v = !0), (m = null))
          : u === h &&
            ((v = !0), (m = d.route.hydrateFallbackElement || null))));
    let y = n.concat(i.slice(0, h + 1)),
      w = () => {
        let b;
        return (
          l
            ? (b = p)
            : v
              ? (b = m)
              : d.route.Component
                ? (b = g.createElement(d.route.Component, null))
                : d.route.element
                  ? (b = d.route.element)
                  : (b = f),
          g.createElement(Go, {
            match: d,
            routeContext: { outlet: f, matches: y, isDataRoute: t != null },
            children: b,
          })
        );
      };
    return t && (d.route.ErrorBoundary || d.route.errorElement || h === 0)
      ? g.createElement(Xo, {
          location: t.location,
          revalidation: t.revalidation,
          component: p,
          error: l,
          children: w(),
          routeContext: { outlet: null, matches: y, isDataRoute: !0 },
        })
      : w();
  }, null);
}
var lr = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(lr || {}),
  cr = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })(cr || {});
function Jo(e) {
  let n = g.useContext(qt);
  return (n || Y(!1), n);
}
function Qo(e) {
  let n = g.useContext(Fo);
  return (n || Y(!1), n);
}
function ea(e) {
  let n = g.useContext(be);
  return (n || Y(!1), n);
}
function ur(e) {
  let n = ea(),
    t = n.matches[n.matches.length - 1];
  return (t.route.id || Y(!1), t.route.id);
}
function ta() {
  var e;
  let n = g.useContext(ir),
    t = Qo(),
    r = ur();
  return n !== void 0 ? n : (e = t.errors) == null ? void 0 : e[r];
}
function na() {
  let { router: e } = Jo(lr.UseNavigateStable),
    n = ur(cr.UseNavigateStable),
    t = g.useRef(!1);
  return (
    sr(() => {
      t.current = !0;
    }),
    g.useCallback(
      function (o, a) {
        (a === void 0 && (a = {}),
          t.current &&
            (typeof o == "number"
              ? e.navigate(o)
              : e.navigate(o, Ue({ fromRouteId: n }, a))));
      },
      [e, n],
    )
  );
}
const Cn = {};
function ra(e, n, t) {
  Cn[e] || (Cn[e] = !0);
}
function Vs(e, n) {
  (e?.v7_startTransition, e?.v7_relativeSplatPath);
}
function oa(e) {
  Y(!1);
}
function Ys(e) {
  let {
    basename: n = "/",
    children: t = null,
    location: r,
    navigationType: o = ve.Pop,
    navigator: a,
    static: i = !1,
    future: s,
  } = e;
  Ze() && Y(!1);
  let c = n.replace(/^\/*/, "/"),
    u = g.useMemo(
      () => ({
        basename: c,
        navigator: a,
        static: i,
        future: Ue({ v7_relativeSplatPath: !1 }, s),
      }),
      [c, s, a, i],
    );
  typeof r == "string" && (r = Le(r));
  let {
      pathname: f = "/",
      search: d = "",
      hash: h = "",
      state: l = null,
      key: v = "default",
    } = r,
    p = g.useMemo(() => {
      let m = nr(f, c);
      return m == null
        ? null
        : {
            location: { pathname: m, search: d, hash: h, state: l, key: v },
            navigationType: o,
          };
    }, [c, f, d, h, l, v, o]);
  return p == null
    ? null
    : g.createElement(
        ze.Provider,
        { value: u },
        g.createElement(dt.Provider, { children: t, value: p }),
      );
}
function Zs(e) {
  let { children: n, location: t } = e;
  return Vo(Wt(n), t);
}
new Promise(() => {});
function Wt(e, n) {
  n === void 0 && (n = []);
  let t = [];
  return (
    g.Children.forEach(e, (r, o) => {
      if (!g.isValidElement(r)) return;
      let a = [...n, o];
      if (r.type === g.Fragment) {
        t.push.apply(t, Wt(r.props.children, a));
        return;
      }
      (r.type !== oa && Y(!1), !r.props.index || !r.props.children || Y(!1));
      let i = {
        id: r.props.id || a.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      (r.props.children && (i.children = Wt(r.props.children, a)), t.push(i));
    }),
    t
  );
}
const aa = ["top", "right", "bottom", "left"],
  ye = Math.min,
  J = Math.max,
  it = Math.round,
  Ke = Math.floor,
  le = (e) => ({ x: e, y: e }),
  ia = { left: "right", right: "left", bottom: "top", top: "bottom" },
  sa = { start: "end", end: "start" };
function $t(e, n, t) {
  return J(e, ye(n, t));
}
function de(e, n) {
  return typeof e == "function" ? e(n) : e;
}
function fe(e) {
  return e.split("-")[0];
}
function Ie(e) {
  return e.split("-")[1];
}
function Gt(e) {
  return e === "x" ? "y" : "x";
}
function Kt(e) {
  return e === "y" ? "height" : "width";
}
const la = new Set(["top", "bottom"]);
function se(e) {
  return la.has(fe(e)) ? "y" : "x";
}
function Jt(e) {
  return Gt(se(e));
}
function ca(e, n, t) {
  t === void 0 && (t = !1);
  const r = Ie(e),
    o = Jt(e),
    a = Kt(o);
  let i =
    o === "x"
      ? r === (t ? "end" : "start")
        ? "right"
        : "left"
      : r === "start"
        ? "bottom"
        : "top";
  return (n.reference[a] > n.floating[a] && (i = st(i)), [i, st(i)]);
}
function ua(e) {
  const n = st(e);
  return [Ft(e), n, Ft(n)];
}
function Ft(e) {
  return e.replace(/start|end/g, (n) => sa[n]);
}
const En = ["left", "right"],
  Rn = ["right", "left"],
  da = ["top", "bottom"],
  fa = ["bottom", "top"];
function ha(e, n, t) {
  switch (e) {
    case "top":
    case "bottom":
      return t ? (n ? Rn : En) : n ? En : Rn;
    case "left":
    case "right":
      return n ? da : fa;
    default:
      return [];
  }
}
function pa(e, n, t, r) {
  const o = Ie(e);
  let a = ha(fe(e), t === "start", r);
  return (
    o && ((a = a.map((i) => i + "-" + o)), n && (a = a.concat(a.map(Ft)))),
    a
  );
}
function st(e) {
  return e.replace(/left|right|bottom|top/g, (n) => ia[n]);
}
function ma(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function dr(e) {
  return typeof e != "number"
    ? ma(e)
    : { top: e, right: e, bottom: e, left: e };
}
function lt(e) {
  const { x: n, y: t, width: r, height: o } = e;
  return {
    width: r,
    height: o,
    top: t,
    left: n,
    right: n + r,
    bottom: t + o,
    x: n,
    y: t,
  };
}
function Pn(e, n, t) {
  let { reference: r, floating: o } = e;
  const a = se(n),
    i = Jt(n),
    s = Kt(i),
    c = fe(n),
    u = a === "y",
    f = r.x + r.width / 2 - o.width / 2,
    d = r.y + r.height / 2 - o.height / 2,
    h = r[s] / 2 - o[s] / 2;
  let l;
  switch (c) {
    case "top":
      l = { x: f, y: r.y - o.height };
      break;
    case "bottom":
      l = { x: f, y: r.y + r.height };
      break;
    case "right":
      l = { x: r.x + r.width, y: d };
      break;
    case "left":
      l = { x: r.x - o.width, y: d };
      break;
    default:
      l = { x: r.x, y: r.y };
  }
  switch (Ie(n)) {
    case "start":
      l[i] -= h * (t && u ? -1 : 1);
      break;
    case "end":
      l[i] += h * (t && u ? -1 : 1);
      break;
  }
  return l;
}
const va = async (e, n, t) => {
  const {
      placement: r = "bottom",
      strategy: o = "absolute",
      middleware: a = [],
      platform: i,
    } = t,
    s = a.filter(Boolean),
    c = await (i.isRTL == null ? void 0 : i.isRTL(n));
  let u = await i.getElementRects({ reference: e, floating: n, strategy: o }),
    { x: f, y: d } = Pn(u, r, c),
    h = r,
    l = {},
    v = 0;
  for (let p = 0; p < s.length; p++) {
    const { name: m, fn: y } = s[p],
      {
        x: w,
        y: b,
        data: R,
        reset: C,
      } = await y({
        x: f,
        y: d,
        initialPlacement: r,
        placement: h,
        strategy: o,
        middlewareData: l,
        rects: u,
        platform: i,
        elements: { reference: e, floating: n },
      });
    ((f = w ?? f),
      (d = b ?? d),
      (l = { ...l, [m]: { ...l[m], ...R } }),
      C &&
        v <= 50 &&
        (v++,
        typeof C == "object" &&
          (C.placement && (h = C.placement),
          C.rects &&
            (u =
              C.rects === !0
                ? await i.getElementRects({
                    reference: e,
                    floating: n,
                    strategy: o,
                  })
                : C.rects),
          ({ x: f, y: d } = Pn(u, h, c))),
        (p = -1)));
  }
  return { x: f, y: d, placement: h, strategy: o, middlewareData: l };
};
async function Ve(e, n) {
  var t;
  n === void 0 && (n = {});
  const { x: r, y: o, platform: a, rects: i, elements: s, strategy: c } = e,
    {
      boundary: u = "clippingAncestors",
      rootBoundary: f = "viewport",
      elementContext: d = "floating",
      altBoundary: h = !1,
      padding: l = 0,
    } = de(n, e),
    v = dr(l),
    m = s[h ? (d === "floating" ? "reference" : "floating") : d],
    y = lt(
      await a.getClippingRect({
        element:
          (t = await (a.isElement == null ? void 0 : a.isElement(m))) == null ||
          t
            ? m
            : m.contextElement ||
              (await (a.getDocumentElement == null
                ? void 0
                : a.getDocumentElement(s.floating))),
        boundary: u,
        rootBoundary: f,
        strategy: c,
      }),
    ),
    w =
      d === "floating"
        ? { x: r, y: o, width: i.floating.width, height: i.floating.height }
        : i.reference,
    b = await (a.getOffsetParent == null
      ? void 0
      : a.getOffsetParent(s.floating)),
    R = (await (a.isElement == null ? void 0 : a.isElement(b)))
      ? (await (a.getScale == null ? void 0 : a.getScale(b))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    C = lt(
      a.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: s,
            rect: w,
            offsetParent: b,
            strategy: c,
          })
        : w,
    );
  return {
    top: (y.top - C.top + v.top) / R.y,
    bottom: (C.bottom - y.bottom + v.bottom) / R.y,
    left: (y.left - C.left + v.left) / R.x,
    right: (C.right - y.right + v.right) / R.x,
  };
}
const ga = (e) => ({
    name: "arrow",
    options: e,
    async fn(n) {
      const {
          x: t,
          y: r,
          placement: o,
          rects: a,
          platform: i,
          elements: s,
          middlewareData: c,
        } = n,
        { element: u, padding: f = 0 } = de(e, n) || {};
      if (u == null) return {};
      const d = dr(f),
        h = { x: t, y: r },
        l = Jt(o),
        v = Kt(l),
        p = await i.getDimensions(u),
        m = l === "y",
        y = m ? "top" : "left",
        w = m ? "bottom" : "right",
        b = m ? "clientHeight" : "clientWidth",
        R = a.reference[v] + a.reference[l] - h[l] - a.floating[v],
        C = h[l] - a.reference[l],
        _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(u));
      let A = _ ? _[b] : 0;
      (!A || !(await (i.isElement == null ? void 0 : i.isElement(_)))) &&
        (A = s.floating[b] || a.floating[v]);
      const D = R / 2 - C / 2,
        j = A / 2 - p[v] / 2 - 1,
        N = ye(d[y], j),
        V = ye(d[w], j),
        B = N,
        Z = A - p[v] - V,
        W = A / 2 - p[v] / 2 + D,
        X = $t(B, W, Z),
        U =
          !c.arrow &&
          Ie(o) != null &&
          W !== X &&
          a.reference[v] / 2 - (W < B ? N : V) - p[v] / 2 < 0,
        $ = U ? (W < B ? W - B : W - Z) : 0;
      return {
        [l]: h[l] + $,
        data: {
          [l]: X,
          centerOffset: W - X - $,
          ...(U && { alignmentOffset: $ }),
        },
        reset: U,
      };
    },
  }),
  ya = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "flip",
        options: e,
        async fn(n) {
          var t, r;
          const {
              placement: o,
              middlewareData: a,
              rects: i,
              initialPlacement: s,
              platform: c,
              elements: u,
            } = n,
            {
              mainAxis: f = !0,
              crossAxis: d = !0,
              fallbackPlacements: h,
              fallbackStrategy: l = "bestFit",
              fallbackAxisSideDirection: v = "none",
              flipAlignment: p = !0,
              ...m
            } = de(e, n);
          if ((t = a.arrow) != null && t.alignmentOffset) return {};
          const y = fe(o),
            w = se(s),
            b = fe(s) === s,
            R = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)),
            C = h || (b || !p ? [st(s)] : ua(s)),
            _ = v !== "none";
          !h && _ && C.push(...pa(s, p, v, R));
          const A = [s, ...C],
            D = await Ve(n, m),
            j = [];
          let N = ((r = a.flip) == null ? void 0 : r.overflows) || [];
          if ((f && j.push(D[y]), d)) {
            const W = ca(o, i, R);
            j.push(D[W[0]], D[W[1]]);
          }
          if (
            ((N = [...N, { placement: o, overflows: j }]),
            !j.every((W) => W <= 0))
          ) {
            var V, B;
            const W = (((V = a.flip) == null ? void 0 : V.index) || 0) + 1,
              X = A[W];
            if (
              X &&
              (!(d === "alignment" ? w !== se(X) : !1) ||
                N.every((S) => S.overflows[0] > 0 && se(S.placement) === w))
            )
              return {
                data: { index: W, overflows: N },
                reset: { placement: X },
              };
            let U =
              (B = N.filter(($) => $.overflows[0] <= 0).sort(
                ($, S) => $.overflows[1] - S.overflows[1],
              )[0]) == null
                ? void 0
                : B.placement;
            if (!U)
              switch (l) {
                case "bestFit": {
                  var Z;
                  const $ =
                    (Z = N.filter((S) => {
                      if (_) {
                        const x = se(S.placement);
                        return x === w || x === "y";
                      }
                      return !0;
                    })
                      .map((S) => [
                        S.placement,
                        S.overflows
                          .filter((x) => x > 0)
                          .reduce((x, P) => x + P, 0),
                      ])
                      .sort((S, x) => S[1] - x[1])[0]) == null
                      ? void 0
                      : Z[0];
                  $ && (U = $);
                  break;
                }
                case "initialPlacement":
                  U = s;
                  break;
              }
            if (o !== U) return { reset: { placement: U } };
          }
          return {};
        },
      }
    );
  };
function _n(e, n) {
  return {
    top: e.top - n.height,
    right: e.right - n.width,
    bottom: e.bottom - n.height,
    left: e.left - n.width,
  };
}
function Tn(e) {
  return aa.some((n) => e[n] >= 0);
}
const wa = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "hide",
        options: e,
        async fn(n) {
          const { rects: t } = n,
            { strategy: r = "referenceHidden", ...o } = de(e, n);
          switch (r) {
            case "referenceHidden": {
              const a = await Ve(n, { ...o, elementContext: "reference" }),
                i = _n(a, t.reference);
              return {
                data: { referenceHiddenOffsets: i, referenceHidden: Tn(i) },
              };
            }
            case "escaped": {
              const a = await Ve(n, { ...o, altBoundary: !0 }),
                i = _n(a, t.floating);
              return { data: { escapedOffsets: i, escaped: Tn(i) } };
            }
            default:
              return {};
          }
        },
      }
    );
  },
  fr = new Set(["left", "top"]);
async function ba(e, n) {
  const { placement: t, platform: r, elements: o } = e,
    a = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)),
    i = fe(t),
    s = Ie(t),
    c = se(t) === "y",
    u = fr.has(i) ? -1 : 1,
    f = a && c ? -1 : 1,
    d = de(n, e);
  let {
    mainAxis: h,
    crossAxis: l,
    alignmentAxis: v,
  } = typeof d == "number"
    ? { mainAxis: d, crossAxis: 0, alignmentAxis: null }
    : {
        mainAxis: d.mainAxis || 0,
        crossAxis: d.crossAxis || 0,
        alignmentAxis: d.alignmentAxis,
      };
  return (
    s && typeof v == "number" && (l = s === "end" ? v * -1 : v),
    c ? { x: l * f, y: h * u } : { x: h * u, y: l * f }
  );
}
const xa = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: "offset",
        options: e,
        async fn(n) {
          var t, r;
          const { x: o, y: a, placement: i, middlewareData: s } = n,
            c = await ba(n, e);
          return i === ((t = s.offset) == null ? void 0 : t.placement) &&
            (r = s.arrow) != null &&
            r.alignmentOffset
            ? {}
            : { x: o + c.x, y: a + c.y, data: { ...c, placement: i } };
        },
      }
    );
  },
  Sa = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "shift",
        options: e,
        async fn(n) {
          const { x: t, y: r, placement: o } = n,
            {
              mainAxis: a = !0,
              crossAxis: i = !1,
              limiter: s = {
                fn: (m) => {
                  let { x: y, y: w } = m;
                  return { x: y, y: w };
                },
              },
              ...c
            } = de(e, n),
            u = { x: t, y: r },
            f = await Ve(n, c),
            d = se(fe(o)),
            h = Gt(d);
          let l = u[h],
            v = u[d];
          if (a) {
            const m = h === "y" ? "top" : "left",
              y = h === "y" ? "bottom" : "right",
              w = l + f[m],
              b = l - f[y];
            l = $t(w, l, b);
          }
          if (i) {
            const m = d === "y" ? "top" : "left",
              y = d === "y" ? "bottom" : "right",
              w = v + f[m],
              b = v - f[y];
            v = $t(w, v, b);
          }
          const p = s.fn({ ...n, [h]: l, [d]: v });
          return {
            ...p,
            data: { x: p.x - t, y: p.y - r, enabled: { [h]: a, [d]: i } },
          };
        },
      }
    );
  },
  Ca = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(n) {
          const { x: t, y: r, placement: o, rects: a, middlewareData: i } = n,
            { offset: s = 0, mainAxis: c = !0, crossAxis: u = !0 } = de(e, n),
            f = { x: t, y: r },
            d = se(o),
            h = Gt(d);
          let l = f[h],
            v = f[d];
          const p = de(s, n),
            m =
              typeof p == "number"
                ? { mainAxis: p, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...p };
          if (c) {
            const b = h === "y" ? "height" : "width",
              R = a.reference[h] - a.floating[b] + m.mainAxis,
              C = a.reference[h] + a.reference[b] - m.mainAxis;
            l < R ? (l = R) : l > C && (l = C);
          }
          if (u) {
            var y, w;
            const b = h === "y" ? "width" : "height",
              R = fr.has(fe(o)),
              C =
                a.reference[d] -
                a.floating[b] +
                ((R && ((y = i.offset) == null ? void 0 : y[d])) || 0) +
                (R ? 0 : m.crossAxis),
              _ =
                a.reference[d] +
                a.reference[b] +
                (R ? 0 : ((w = i.offset) == null ? void 0 : w[d]) || 0) -
                (R ? m.crossAxis : 0);
            v < C ? (v = C) : v > _ && (v = _);
          }
          return { [h]: l, [d]: v };
        },
      }
    );
  },
  Ea = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "size",
        options: e,
        async fn(n) {
          var t, r;
          const { placement: o, rects: a, platform: i, elements: s } = n,
            { apply: c = () => {}, ...u } = de(e, n),
            f = await Ve(n, u),
            d = fe(o),
            h = Ie(o),
            l = se(o) === "y",
            { width: v, height: p } = a.floating;
          let m, y;
          d === "top" || d === "bottom"
            ? ((m = d),
              (y =
                h ===
                ((await (i.isRTL == null ? void 0 : i.isRTL(s.floating)))
                  ? "start"
                  : "end")
                  ? "left"
                  : "right"))
            : ((y = d), (m = h === "end" ? "top" : "bottom"));
          const w = p - f.top - f.bottom,
            b = v - f.left - f.right,
            R = ye(p - f[m], w),
            C = ye(v - f[y], b),
            _ = !n.middlewareData.shift;
          let A = R,
            D = C;
          if (
            ((t = n.middlewareData.shift) != null && t.enabled.x && (D = b),
            (r = n.middlewareData.shift) != null && r.enabled.y && (A = w),
            _ && !h)
          ) {
            const N = J(f.left, 0),
              V = J(f.right, 0),
              B = J(f.top, 0),
              Z = J(f.bottom, 0);
            l
              ? (D = v - 2 * (N !== 0 || V !== 0 ? N + V : J(f.left, f.right)))
              : (A = p - 2 * (B !== 0 || Z !== 0 ? B + Z : J(f.top, f.bottom)));
          }
          await c({ ...n, availableWidth: D, availableHeight: A });
          const j = await i.getDimensions(s.floating);
          return v !== j.width || p !== j.height
            ? { reset: { rects: !0 } }
            : {};
        },
      }
    );
  };
function ft() {
  return typeof window < "u";
}
function je(e) {
  return hr(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Q(e) {
  var n;
  return (
    (e == null || (n = e.ownerDocument) == null ? void 0 : n.defaultView) ||
    window
  );
}
function ue(e) {
  var n;
  return (n = (hr(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : n.documentElement;
}
function hr(e) {
  return ft() ? e instanceof Node || e instanceof Q(e).Node : !1;
}
function ae(e) {
  return ft() ? e instanceof Element || e instanceof Q(e).Element : !1;
}
function ce(e) {
  return ft() ? e instanceof HTMLElement || e instanceof Q(e).HTMLElement : !1;
}
function On(e) {
  return !ft() || typeof ShadowRoot > "u"
    ? !1
    : e instanceof ShadowRoot || e instanceof Q(e).ShadowRoot;
}
const Ra = new Set(["inline", "contents"]);
function qe(e) {
  const { overflow: n, overflowX: t, overflowY: r, display: o } = ie(e);
  return /auto|scroll|overlay|hidden|clip/.test(n + r + t) && !Ra.has(o);
}
const Pa = new Set(["table", "td", "th"]);
function _a(e) {
  return Pa.has(je(e));
}
const Ta = [":popover-open", ":modal"];
function ht(e) {
  return Ta.some((n) => {
    try {
      return e.matches(n);
    } catch {
      return !1;
    }
  });
}
const Oa = ["transform", "translate", "scale", "rotate", "perspective"],
  Aa = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
  Da = ["paint", "layout", "strict", "content"];
function Qt(e) {
  const n = en(),
    t = ae(e) ? ie(e) : e;
  return (
    Oa.some((r) => (t[r] ? t[r] !== "none" : !1)) ||
    (t.containerType ? t.containerType !== "normal" : !1) ||
    (!n && (t.backdropFilter ? t.backdropFilter !== "none" : !1)) ||
    (!n && (t.filter ? t.filter !== "none" : !1)) ||
    Aa.some((r) => (t.willChange || "").includes(r)) ||
    Da.some((r) => (t.contain || "").includes(r))
  );
}
function Ma(e) {
  let n = we(e);
  for (; ce(n) && !Me(n); ) {
    if (Qt(n)) return n;
    if (ht(n)) return null;
    n = we(n);
  }
  return null;
}
function en() {
  return typeof CSS > "u" || !CSS.supports
    ? !1
    : CSS.supports("-webkit-backdrop-filter", "none");
}
const ka = new Set(["html", "body", "#document"]);
function Me(e) {
  return ka.has(je(e));
}
function ie(e) {
  return Q(e).getComputedStyle(e);
}
function pt(e) {
  return ae(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function we(e) {
  if (je(e) === "html") return e;
  const n = e.assignedSlot || e.parentNode || (On(e) && e.host) || ue(e);
  return On(n) ? n.host : n;
}
function pr(e) {
  const n = we(e);
  return Me(n)
    ? e.ownerDocument
      ? e.ownerDocument.body
      : e.body
    : ce(n) && qe(n)
      ? n
      : pr(n);
}
function Ye(e, n, t) {
  var r;
  (n === void 0 && (n = []), t === void 0 && (t = !0));
  const o = pr(e),
    a = o === ((r = e.ownerDocument) == null ? void 0 : r.body),
    i = Q(o);
  if (a) {
    const s = Ht(i);
    return n.concat(
      i,
      i.visualViewport || [],
      qe(o) ? o : [],
      s && t ? Ye(s) : [],
    );
  }
  return n.concat(o, Ye(o, [], t));
}
function Ht(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function mr(e) {
  const n = ie(e);
  let t = parseFloat(n.width) || 0,
    r = parseFloat(n.height) || 0;
  const o = ce(e),
    a = o ? e.offsetWidth : t,
    i = o ? e.offsetHeight : r,
    s = it(t) !== a || it(r) !== i;
  return (s && ((t = a), (r = i)), { width: t, height: r, $: s });
}
function tn(e) {
  return ae(e) ? e : e.contextElement;
}
function Ae(e) {
  const n = tn(e);
  if (!ce(n)) return le(1);
  const t = n.getBoundingClientRect(),
    { width: r, height: o, $: a } = mr(n);
  let i = (a ? it(t.width) : t.width) / r,
    s = (a ? it(t.height) : t.height) / o;
  return (
    (!i || !Number.isFinite(i)) && (i = 1),
    (!s || !Number.isFinite(s)) && (s = 1),
    { x: i, y: s }
  );
}
const Na = le(0);
function vr(e) {
  const n = Q(e);
  return !en() || !n.visualViewport
    ? Na
    : { x: n.visualViewport.offsetLeft, y: n.visualViewport.offsetTop };
}
function La(e, n, t) {
  return (n === void 0 && (n = !1), !t || (n && t !== Q(e)) ? !1 : n);
}
function Ce(e, n, t, r) {
  (n === void 0 && (n = !1), t === void 0 && (t = !1));
  const o = e.getBoundingClientRect(),
    a = tn(e);
  let i = le(1);
  n && (r ? ae(r) && (i = Ae(r)) : (i = Ae(e)));
  const s = La(a, t, r) ? vr(a) : le(0);
  let c = (o.left + s.x) / i.x,
    u = (o.top + s.y) / i.y,
    f = o.width / i.x,
    d = o.height / i.y;
  if (a) {
    const h = Q(a),
      l = r && ae(r) ? Q(r) : r;
    let v = h,
      p = Ht(v);
    for (; p && r && l !== v; ) {
      const m = Ae(p),
        y = p.getBoundingClientRect(),
        w = ie(p),
        b = y.left + (p.clientLeft + parseFloat(w.paddingLeft)) * m.x,
        R = y.top + (p.clientTop + parseFloat(w.paddingTop)) * m.y;
      ((c *= m.x),
        (u *= m.y),
        (f *= m.x),
        (d *= m.y),
        (c += b),
        (u += R),
        (v = Q(p)),
        (p = Ht(v)));
    }
  }
  return lt({ width: f, height: d, x: c, y: u });
}
function nn(e, n) {
  const t = pt(e).scrollLeft;
  return n ? n.left + t : Ce(ue(e)).left + t;
}
function gr(e, n, t) {
  t === void 0 && (t = !1);
  const r = e.getBoundingClientRect(),
    o = r.left + n.scrollLeft - (t ? 0 : nn(e, r)),
    a = r.top + n.scrollTop;
  return { x: o, y: a };
}
function za(e) {
  let { elements: n, rect: t, offsetParent: r, strategy: o } = e;
  const a = o === "fixed",
    i = ue(r),
    s = n ? ht(n.floating) : !1;
  if (r === i || (s && a)) return t;
  let c = { scrollLeft: 0, scrollTop: 0 },
    u = le(1);
  const f = le(0),
    d = ce(r);
  if (
    (d || (!d && !a)) &&
    ((je(r) !== "body" || qe(i)) && (c = pt(r)), ce(r))
  ) {
    const l = Ce(r);
    ((u = Ae(r)), (f.x = l.x + r.clientLeft), (f.y = l.y + r.clientTop));
  }
  const h = i && !d && !a ? gr(i, c, !0) : le(0);
  return {
    width: t.width * u.x,
    height: t.height * u.y,
    x: t.x * u.x - c.scrollLeft * u.x + f.x + h.x,
    y: t.y * u.y - c.scrollTop * u.y + f.y + h.y,
  };
}
function Ia(e) {
  return Array.from(e.getClientRects());
}
function ja(e) {
  const n = ue(e),
    t = pt(e),
    r = e.ownerDocument.body,
    o = J(n.scrollWidth, n.clientWidth, r.scrollWidth, r.clientWidth),
    a = J(n.scrollHeight, n.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -t.scrollLeft + nn(e);
  const s = -t.scrollTop;
  return (
    ie(r).direction === "rtl" && (i += J(n.clientWidth, r.clientWidth) - o),
    { width: o, height: a, x: i, y: s }
  );
}
function Ba(e, n) {
  const t = Q(e),
    r = ue(e),
    o = t.visualViewport;
  let a = r.clientWidth,
    i = r.clientHeight,
    s = 0,
    c = 0;
  if (o) {
    ((a = o.width), (i = o.height));
    const u = en();
    (!u || (u && n === "fixed")) && ((s = o.offsetLeft), (c = o.offsetTop));
  }
  return { width: a, height: i, x: s, y: c };
}
const Wa = new Set(["absolute", "fixed"]);
function $a(e, n) {
  const t = Ce(e, !0, n === "fixed"),
    r = t.top + e.clientTop,
    o = t.left + e.clientLeft,
    a = ce(e) ? Ae(e) : le(1),
    i = e.clientWidth * a.x,
    s = e.clientHeight * a.y,
    c = o * a.x,
    u = r * a.y;
  return { width: i, height: s, x: c, y: u };
}
function An(e, n, t) {
  let r;
  if (n === "viewport") r = Ba(e, t);
  else if (n === "document") r = ja(ue(e));
  else if (ae(n)) r = $a(n, t);
  else {
    const o = vr(e);
    r = { x: n.x - o.x, y: n.y - o.y, width: n.width, height: n.height };
  }
  return lt(r);
}
function yr(e, n) {
  const t = we(e);
  return t === n || !ae(t) || Me(t)
    ? !1
    : ie(t).position === "fixed" || yr(t, n);
}
function Fa(e, n) {
  const t = n.get(e);
  if (t) return t;
  let r = Ye(e, [], !1).filter((s) => ae(s) && je(s) !== "body"),
    o = null;
  const a = ie(e).position === "fixed";
  let i = a ? we(e) : e;
  for (; ae(i) && !Me(i); ) {
    const s = ie(i),
      c = Qt(i);
    (!c && s.position === "fixed" && (o = null),
      (
        a
          ? !c && !o
          : (!c && s.position === "static" && !!o && Wa.has(o.position)) ||
            (qe(i) && !c && yr(e, i))
      )
        ? (r = r.filter((f) => f !== i))
        : (o = s),
      (i = we(i)));
  }
  return (n.set(e, r), r);
}
function Ha(e) {
  let { element: n, boundary: t, rootBoundary: r, strategy: o } = e;
  const i = [
      ...(t === "clippingAncestors"
        ? ht(n)
          ? []
          : Fa(n, this._c)
        : [].concat(t)),
      r,
    ],
    s = i[0],
    c = i.reduce(
      (u, f) => {
        const d = An(n, f, o);
        return (
          (u.top = J(d.top, u.top)),
          (u.right = ye(d.right, u.right)),
          (u.bottom = ye(d.bottom, u.bottom)),
          (u.left = J(d.left, u.left)),
          u
        );
      },
      An(n, s, o),
    );
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top,
  };
}
function Ua(e) {
  const { width: n, height: t } = mr(e);
  return { width: n, height: t };
}
function Va(e, n, t) {
  const r = ce(n),
    o = ue(n),
    a = t === "fixed",
    i = Ce(e, !0, a, n);
  let s = { scrollLeft: 0, scrollTop: 0 };
  const c = le(0);
  function u() {
    c.x = nn(o);
  }
  if (r || (!r && !a))
    if (((je(n) !== "body" || qe(o)) && (s = pt(n)), r)) {
      const l = Ce(n, !0, a, n);
      ((c.x = l.x + n.clientLeft), (c.y = l.y + n.clientTop));
    } else o && u();
  a && !r && o && u();
  const f = o && !r && !a ? gr(o, s) : le(0),
    d = i.left + s.scrollLeft - c.x - f.x,
    h = i.top + s.scrollTop - c.y - f.y;
  return { x: d, y: h, width: i.width, height: i.height };
}
function _t(e) {
  return ie(e).position === "static";
}
function Dn(e, n) {
  if (!ce(e) || ie(e).position === "fixed") return null;
  if (n) return n(e);
  let t = e.offsetParent;
  return (ue(e) === t && (t = t.ownerDocument.body), t);
}
function wr(e, n) {
  const t = Q(e);
  if (ht(e)) return t;
  if (!ce(e)) {
    let o = we(e);
    for (; o && !Me(o); ) {
      if (ae(o) && !_t(o)) return o;
      o = we(o);
    }
    return t;
  }
  let r = Dn(e, n);
  for (; r && _a(r) && _t(r); ) r = Dn(r, n);
  return r && Me(r) && _t(r) && !Qt(r) ? t : r || Ma(e) || t;
}
const Ya = async function (e) {
  const n = this.getOffsetParent || wr,
    t = this.getDimensions,
    r = await t(e.floating);
  return {
    reference: Va(e.reference, await n(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: r.width, height: r.height },
  };
};
function Za(e) {
  return ie(e).direction === "rtl";
}
const qa = {
  convertOffsetParentRelativeRectToViewportRelativeRect: za,
  getDocumentElement: ue,
  getClippingRect: Ha,
  getOffsetParent: wr,
  getElementRects: Ya,
  getClientRects: Ia,
  getDimensions: Ua,
  getScale: Ae,
  isElement: ae,
  isRTL: Za,
};
function br(e, n) {
  return (
    e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height
  );
}
function Xa(e, n) {
  let t = null,
    r;
  const o = ue(e);
  function a() {
    var s;
    (clearTimeout(r), (s = t) == null || s.disconnect(), (t = null));
  }
  function i(s, c) {
    (s === void 0 && (s = !1), c === void 0 && (c = 1), a());
    const u = e.getBoundingClientRect(),
      { left: f, top: d, width: h, height: l } = u;
    if ((s || n(), !h || !l)) return;
    const v = Ke(d),
      p = Ke(o.clientWidth - (f + h)),
      m = Ke(o.clientHeight - (d + l)),
      y = Ke(f),
      b = {
        rootMargin: -v + "px " + -p + "px " + -m + "px " + -y + "px",
        threshold: J(0, ye(1, c)) || 1,
      };
    let R = !0;
    function C(_) {
      const A = _[0].intersectionRatio;
      if (A !== c) {
        if (!R) return i();
        A
          ? i(!1, A)
          : (r = setTimeout(() => {
              i(!1, 1e-7);
            }, 1e3));
      }
      (A === 1 && !br(u, e.getBoundingClientRect()) && i(), (R = !1));
    }
    try {
      t = new IntersectionObserver(C, { ...b, root: o.ownerDocument });
    } catch {
      t = new IntersectionObserver(C, b);
    }
    t.observe(e);
  }
  return (i(!0), a);
}
function qs(e, n, t, r) {
  r === void 0 && (r = {});
  const {
      ancestorScroll: o = !0,
      ancestorResize: a = !0,
      elementResize: i = typeof ResizeObserver == "function",
      layoutShift: s = typeof IntersectionObserver == "function",
      animationFrame: c = !1,
    } = r,
    u = tn(e),
    f = o || a ? [...(u ? Ye(u) : []), ...Ye(n)] : [];
  f.forEach((y) => {
    (o && y.addEventListener("scroll", t, { passive: !0 }),
      a && y.addEventListener("resize", t));
  });
  const d = u && s ? Xa(u, t) : null;
  let h = -1,
    l = null;
  i &&
    ((l = new ResizeObserver((y) => {
      let [w] = y;
      (w &&
        w.target === u &&
        l &&
        (l.unobserve(n),
        cancelAnimationFrame(h),
        (h = requestAnimationFrame(() => {
          var b;
          (b = l) == null || b.observe(n);
        }))),
        t());
    })),
    u && !c && l.observe(u),
    l.observe(n));
  let v,
    p = c ? Ce(e) : null;
  c && m();
  function m() {
    const y = Ce(e);
    (p && !br(p, y) && t(), (p = y), (v = requestAnimationFrame(m)));
  }
  return (
    t(),
    () => {
      var y;
      (f.forEach((w) => {
        (o && w.removeEventListener("scroll", t),
          a && w.removeEventListener("resize", t));
      }),
        d?.(),
        (y = l) == null || y.disconnect(),
        (l = null),
        c && cancelAnimationFrame(v));
    }
  );
}
const Xs = xa,
  Gs = Sa,
  Ks = ya,
  Js = Ea,
  Qs = wa,
  el = ga,
  tl = Ca,
  nl = (e, n, t) => {
    const r = new Map(),
      o = { platform: qa, ...t },
      a = { ...o.platform, _c: r };
    return va(e, n, { ...o, platform: a });
  };
var Ga = function (e) {
    if (typeof document > "u") return null;
    var n = Array.isArray(e) ? e[0] : e;
    return n.ownerDocument.body;
  },
  _e = new WeakMap(),
  Je = new WeakMap(),
  Qe = {},
  Tt = 0,
  xr = function (e) {
    return e && (e.host || xr(e.parentNode));
  },
  Ka = function (e, n) {
    return n
      .map(function (t) {
        if (e.contains(t)) return t;
        var r = xr(t);
        return r && e.contains(r)
          ? r
          : (console.error(
              "aria-hidden",
              t,
              "in not contained inside",
              e,
              ". Doing nothing",
            ),
            null);
      })
      .filter(function (t) {
        return !!t;
      });
  },
  Ja = function (e, n, t, r) {
    var o = Ka(n, Array.isArray(e) ? e : [e]);
    Qe[t] || (Qe[t] = new WeakMap());
    var a = Qe[t],
      i = [],
      s = new Set(),
      c = new Set(o),
      u = function (d) {
        !d || s.has(d) || (s.add(d), u(d.parentNode));
      };
    o.forEach(u);
    var f = function (d) {
      !d ||
        c.has(d) ||
        Array.prototype.forEach.call(d.children, function (h) {
          if (s.has(h)) f(h);
          else
            try {
              var l = h.getAttribute(r),
                v = l !== null && l !== "false",
                p = (_e.get(h) || 0) + 1,
                m = (a.get(h) || 0) + 1;
              (_e.set(h, p),
                a.set(h, m),
                i.push(h),
                p === 1 && v && Je.set(h, !0),
                m === 1 && h.setAttribute(t, "true"),
                v || h.setAttribute(r, "true"));
            } catch (y) {
              console.error("aria-hidden: cannot operate on ", h, y);
            }
        });
    };
    return (
      f(n),
      s.clear(),
      Tt++,
      function () {
        (i.forEach(function (d) {
          var h = _e.get(d) - 1,
            l = a.get(d) - 1;
          (_e.set(d, h),
            a.set(d, l),
            h || (Je.has(d) || d.removeAttribute(r), Je.delete(d)),
            l || d.removeAttribute(t));
        }),
          Tt--,
          Tt ||
            ((_e = new WeakMap()),
            (_e = new WeakMap()),
            (Je = new WeakMap()),
            (Qe = {})));
      }
    );
  },
  rl = function (e, n, t) {
    t === void 0 && (t = "data-aria-hidden");
    var r = Array.from(Array.isArray(e) ? e : [e]),
      o = Ga(e);
    return o
      ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live]"))),
        Ja(r, o, t, "aria-hidden"))
      : function () {
          return null;
        };
  },
  Ut = function (e, n) {
    return (
      (Ut =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (t, r) {
            t.__proto__ = r;
          }) ||
        function (t, r) {
          for (var o in r)
            Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o]);
        }),
      Ut(e, n)
    );
  };
function rn(e, n) {
  if (typeof n != "function" && n !== null)
    throw new TypeError(
      "Class extends value " + String(n) + " is not a constructor or null",
    );
  Ut(e, n);
  function t() {
    this.constructor = e;
  }
  e.prototype =
    n === null ? Object.create(n) : ((t.prototype = n.prototype), new t());
}
var z = function () {
  return (
    (z =
      Object.assign ||
      function (n) {
        for (var t, r = 1, o = arguments.length; r < o; r++) {
          t = arguments[r];
          for (var a in t)
            Object.prototype.hasOwnProperty.call(t, a) && (n[a] = t[a]);
        }
        return n;
      }),
    z.apply(this, arguments)
  );
};
function mt(e, n) {
  var t = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) &&
      n.indexOf(r) < 0 &&
      (t[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      n.indexOf(r[o]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
        (t[r[o]] = e[r[o]]);
  return t;
}
function Sr(e, n, t, r) {
  var o = arguments.length,
    a =
      o < 3 ? n : r === null ? (r = Object.getOwnPropertyDescriptor(n, t)) : r,
    i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    a = Reflect.decorate(e, n, t, r);
  else
    for (var s = e.length - 1; s >= 0; s--)
      (i = e[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(n, t, a) : i(n, t)) || a);
  return (o > 3 && a && Object.defineProperty(n, t, a), a);
}
function Cr(e, n) {
  return function (t, r) {
    n(t, r, e);
  };
}
function Er(e, n, t, r, o, a) {
  function i(y) {
    if (y !== void 0 && typeof y != "function")
      throw new TypeError("Function expected");
    return y;
  }
  for (
    var s = r.kind,
      c = s === "getter" ? "get" : s === "setter" ? "set" : "value",
      u = !n && e ? (r.static ? e : e.prototype) : null,
      f = n || (u ? Object.getOwnPropertyDescriptor(u, r.name) : {}),
      d,
      h = !1,
      l = t.length - 1;
    l >= 0;
    l--
  ) {
    var v = {};
    for (var p in r) v[p] = p === "access" ? {} : r[p];
    for (var p in r.access) v.access[p] = r.access[p];
    v.addInitializer = function (y) {
      if (h)
        throw new TypeError(
          "Cannot add initializers after decoration has completed",
        );
      a.push(i(y || null));
    };
    var m = (0, t[l])(s === "accessor" ? { get: f.get, set: f.set } : f[c], v);
    if (s === "accessor") {
      if (m === void 0) continue;
      if (m === null || typeof m != "object")
        throw new TypeError("Object expected");
      ((d = i(m.get)) && (f.get = d),
        (d = i(m.set)) && (f.set = d),
        (d = i(m.init)) && o.unshift(d));
    } else (d = i(m)) && (s === "field" ? o.unshift(d) : (f[c] = d));
  }
  (u && Object.defineProperty(u, r.name, f), (h = !0));
}
function Rr(e, n, t) {
  for (var r = arguments.length > 2, o = 0; o < n.length; o++)
    t = r ? n[o].call(e, t) : n[o].call(e);
  return r ? t : void 0;
}
function Pr(e) {
  return typeof e == "symbol" ? e : "".concat(e);
}
function _r(e, n, t) {
  return (
    typeof n == "symbol" &&
      (n = n.description ? "[".concat(n.description, "]") : ""),
    Object.defineProperty(e, "name", {
      configurable: !0,
      value: t ? "".concat(t, " ", n) : n,
    })
  );
}
function Tr(e, n) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
    return Reflect.metadata(e, n);
}
function Or(e, n, t, r) {
  function o(a) {
    return a instanceof t
      ? a
      : new t(function (i) {
          i(a);
        });
  }
  return new (t || (t = Promise))(function (a, i) {
    function s(f) {
      try {
        u(r.next(f));
      } catch (d) {
        i(d);
      }
    }
    function c(f) {
      try {
        u(r.throw(f));
      } catch (d) {
        i(d);
      }
    }
    function u(f) {
      f.done ? a(f.value) : o(f.value).then(s, c);
    }
    u((r = r.apply(e, n || [])).next());
  });
}
function Ar(e, n) {
  var t = {
      label: 0,
      sent: function () {
        if (a[0] & 1) throw a[1];
        return a[1];
      },
      trys: [],
      ops: [],
    },
    r,
    o,
    a,
    i = Object.create(
      (typeof Iterator == "function" ? Iterator : Object).prototype,
    );
  return (
    (i.next = s(0)),
    (i.throw = s(1)),
    (i.return = s(2)),
    typeof Symbol == "function" &&
      (i[Symbol.iterator] = function () {
        return this;
      }),
    i
  );
  function s(u) {
    return function (f) {
      return c([u, f]);
    };
  }
  function c(u) {
    if (r) throw new TypeError("Generator is already executing.");
    for (; i && ((i = 0), u[0] && (t = 0)), t; )
      try {
        if (
          ((r = 1),
          o &&
            (a =
              u[0] & 2
                ? o.return
                : u[0]
                  ? o.throw || ((a = o.return) && a.call(o), 0)
                  : o.next) &&
            !(a = a.call(o, u[1])).done)
        )
          return a;
        switch (((o = 0), a && (u = [u[0] & 2, a.value]), u[0])) {
          case 0:
          case 1:
            a = u;
            break;
          case 4:
            return (t.label++, { value: u[1], done: !1 });
          case 5:
            (t.label++, (o = u[1]), (u = [0]));
            continue;
          case 7:
            ((u = t.ops.pop()), t.trys.pop());
            continue;
          default:
            if (
              ((a = t.trys),
              !(a = a.length > 0 && a[a.length - 1]) &&
                (u[0] === 6 || u[0] === 2))
            ) {
              t = 0;
              continue;
            }
            if (u[0] === 3 && (!a || (u[1] > a[0] && u[1] < a[3]))) {
              t.label = u[1];
              break;
            }
            if (u[0] === 6 && t.label < a[1]) {
              ((t.label = a[1]), (a = u));
              break;
            }
            if (a && t.label < a[2]) {
              ((t.label = a[2]), t.ops.push(u));
              break;
            }
            (a[2] && t.ops.pop(), t.trys.pop());
            continue;
        }
        u = n.call(e, t);
      } catch (f) {
        ((u = [6, f]), (o = 0));
      } finally {
        r = a = 0;
      }
    if (u[0] & 5) throw u[1];
    return { value: u[0] ? u[1] : void 0, done: !0 };
  }
}
var vt = Object.create
  ? function (e, n, t, r) {
      r === void 0 && (r = t);
      var o = Object.getOwnPropertyDescriptor(n, t);
      ((!o || ("get" in o ? !n.__esModule : o.writable || o.configurable)) &&
        (o = {
          enumerable: !0,
          get: function () {
            return n[t];
          },
        }),
        Object.defineProperty(e, r, o));
    }
  : function (e, n, t, r) {
      (r === void 0 && (r = t), (e[r] = n[t]));
    };
function Dr(e, n) {
  for (var t in e)
    t !== "default" &&
      !Object.prototype.hasOwnProperty.call(n, t) &&
      vt(n, e, t);
}
function ct(e) {
  var n = typeof Symbol == "function" && Symbol.iterator,
    t = n && e[n],
    r = 0;
  if (t) return t.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function () {
        return (
          e && r >= e.length && (e = void 0),
          { value: e && e[r++], done: !e }
        );
      },
    };
  throw new TypeError(
    n ? "Object is not iterable." : "Symbol.iterator is not defined.",
  );
}
function on(e, n) {
  var t = typeof Symbol == "function" && e[Symbol.iterator];
  if (!t) return e;
  var r = t.call(e),
    o,
    a = [],
    i;
  try {
    for (; (n === void 0 || n-- > 0) && !(o = r.next()).done; ) a.push(o.value);
  } catch (s) {
    i = { error: s };
  } finally {
    try {
      o && !o.done && (t = r.return) && t.call(r);
    } finally {
      if (i) throw i.error;
    }
  }
  return a;
}
function Mr() {
  for (var e = [], n = 0; n < arguments.length; n++)
    e = e.concat(on(arguments[n]));
  return e;
}
function kr() {
  for (var e = 0, n = 0, t = arguments.length; n < t; n++)
    e += arguments[n].length;
  for (var r = Array(e), o = 0, n = 0; n < t; n++)
    for (var a = arguments[n], i = 0, s = a.length; i < s; i++, o++)
      r[o] = a[i];
  return r;
}
function an(e, n, t) {
  if (t || arguments.length === 2)
    for (var r = 0, o = n.length, a; r < o; r++)
      (a || !(r in n)) &&
        (a || (a = Array.prototype.slice.call(n, 0, r)), (a[r] = n[r]));
  return e.concat(a || Array.prototype.slice.call(n));
}
function ke(e) {
  return this instanceof ke ? ((this.v = e), this) : new ke(e);
}
function Nr(e, n, t) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = t.apply(e, n || []),
    o,
    a = [];
  return (
    (o = Object.create(
      (typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype,
    )),
    s("next"),
    s("throw"),
    s("return", i),
    (o[Symbol.asyncIterator] = function () {
      return this;
    }),
    o
  );
  function i(l) {
    return function (v) {
      return Promise.resolve(v).then(l, d);
    };
  }
  function s(l, v) {
    r[l] &&
      ((o[l] = function (p) {
        return new Promise(function (m, y) {
          a.push([l, p, m, y]) > 1 || c(l, p);
        });
      }),
      v && (o[l] = v(o[l])));
  }
  function c(l, v) {
    try {
      u(r[l](v));
    } catch (p) {
      h(a[0][3], p);
    }
  }
  function u(l) {
    l.value instanceof ke
      ? Promise.resolve(l.value.v).then(f, d)
      : h(a[0][2], l);
  }
  function f(l) {
    c("next", l);
  }
  function d(l) {
    c("throw", l);
  }
  function h(l, v) {
    (l(v), a.shift(), a.length && c(a[0][0], a[0][1]));
  }
}
function Lr(e) {
  var n, t;
  return (
    (n = {}),
    r("next"),
    r("throw", function (o) {
      throw o;
    }),
    r("return"),
    (n[Symbol.iterator] = function () {
      return this;
    }),
    n
  );
  function r(o, a) {
    n[o] = e[o]
      ? function (i) {
          return (t = !t) ? { value: ke(e[o](i)), done: !1 } : a ? a(i) : i;
        }
      : a;
  }
}
function zr(e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = e[Symbol.asyncIterator],
    t;
  return n
    ? n.call(e)
    : ((e = typeof ct == "function" ? ct(e) : e[Symbol.iterator]()),
      (t = {}),
      r("next"),
      r("throw"),
      r("return"),
      (t[Symbol.asyncIterator] = function () {
        return this;
      }),
      t);
  function r(a) {
    t[a] =
      e[a] &&
      function (i) {
        return new Promise(function (s, c) {
          ((i = e[a](i)), o(s, c, i.done, i.value));
        });
      };
  }
  function o(a, i, s, c) {
    Promise.resolve(c).then(function (u) {
      a({ value: u, done: s });
    }, i);
  }
}
function Ir(e, n) {
  return (
    Object.defineProperty
      ? Object.defineProperty(e, "raw", { value: n })
      : (e.raw = n),
    e
  );
}
var Qa = Object.create
    ? function (e, n) {
        Object.defineProperty(e, "default", { enumerable: !0, value: n });
      }
    : function (e, n) {
        e.default = n;
      },
  Vt = function (e) {
    return (
      (Vt =
        Object.getOwnPropertyNames ||
        function (n) {
          var t = [];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (t[t.length] = r);
          return t;
        }),
      Vt(e)
    );
  };
function jr(e) {
  if (e && e.__esModule) return e;
  var n = {};
  if (e != null)
    for (var t = Vt(e), r = 0; r < t.length; r++)
      t[r] !== "default" && vt(n, e, t[r]);
  return (Qa(n, e), n);
}
function Br(e) {
  return e && e.__esModule ? e : { default: e };
}
function Wr(e, n, t, r) {
  if (t === "a" && !r)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof n == "function" ? e !== n || !r : !n.has(e))
    throw new TypeError(
      "Cannot read private member from an object whose class did not declare it",
    );
  return t === "m" ? r : t === "a" ? r.call(e) : r ? r.value : n.get(e);
}
function $r(e, n, t, r, o) {
  if (r === "m") throw new TypeError("Private method is not writable");
  if (r === "a" && !o)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof n == "function" ? e !== n || !o : !n.has(e))
    throw new TypeError(
      "Cannot write private member to an object whose class did not declare it",
    );
  return (r === "a" ? o.call(e, t) : o ? (o.value = t) : n.set(e, t), t);
}
function Fr(e, n) {
  if (n === null || (typeof n != "object" && typeof n != "function"))
    throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof e == "function" ? n === e : e.has(n);
}
function Hr(e, n, t) {
  if (n != null) {
    if (typeof n != "object" && typeof n != "function")
      throw new TypeError("Object expected.");
    var r, o;
    if (t) {
      if (!Symbol.asyncDispose)
        throw new TypeError("Symbol.asyncDispose is not defined.");
      r = n[Symbol.asyncDispose];
    }
    if (r === void 0) {
      if (!Symbol.dispose)
        throw new TypeError("Symbol.dispose is not defined.");
      ((r = n[Symbol.dispose]), t && (o = r));
    }
    if (typeof r != "function") throw new TypeError("Object not disposable.");
    (o &&
      (r = function () {
        try {
          o.call(this);
        } catch (a) {
          return Promise.reject(a);
        }
      }),
      e.stack.push({ value: n, dispose: r, async: t }));
  } else t && e.stack.push({ async: !0 });
  return n;
}
var ei =
  typeof SuppressedError == "function"
    ? SuppressedError
    : function (e, n, t) {
        var r = new Error(t);
        return (
          (r.name = "SuppressedError"),
          (r.error = e),
          (r.suppressed = n),
          r
        );
      };
function Ur(e) {
  function n(a) {
    ((e.error = e.hasError
      ? new ei(a, e.error, "An error was suppressed during disposal.")
      : a),
      (e.hasError = !0));
  }
  var t,
    r = 0;
  function o() {
    for (; (t = e.stack.pop()); )
      try {
        if (!t.async && r === 1)
          return ((r = 0), e.stack.push(t), Promise.resolve().then(o));
        if (t.dispose) {
          var a = t.dispose.call(t.value);
          if (t.async)
            return (
              (r |= 2),
              Promise.resolve(a).then(o, function (i) {
                return (n(i), o());
              })
            );
        } else r |= 1;
      } catch (i) {
        n(i);
      }
    if (r === 1)
      return e.hasError ? Promise.reject(e.error) : Promise.resolve();
    if (e.hasError) throw e.error;
  }
  return o();
}
function Vr(e, n) {
  return typeof e == "string" && /^\.\.?\//.test(e)
    ? e.replace(
        /\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i,
        function (t, r, o, a, i) {
          return r
            ? n
              ? ".jsx"
              : ".js"
            : o && (!a || !i)
              ? t
              : o + a + "." + i.toLowerCase() + "js";
        },
      )
    : e;
}
const ti = {
    __extends: rn,
    __assign: z,
    __rest: mt,
    __decorate: Sr,
    __param: Cr,
    __esDecorate: Er,
    __runInitializers: Rr,
    __propKey: Pr,
    __setFunctionName: _r,
    __metadata: Tr,
    __awaiter: Or,
    __generator: Ar,
    __createBinding: vt,
    __exportStar: Dr,
    __values: ct,
    __read: on,
    __spread: Mr,
    __spreadArrays: kr,
    __spreadArray: an,
    __await: ke,
    __asyncGenerator: Nr,
    __asyncDelegator: Lr,
    __asyncValues: zr,
    __makeTemplateObject: Ir,
    __importStar: jr,
    __importDefault: Br,
    __classPrivateFieldGet: Wr,
    __classPrivateFieldSet: $r,
    __classPrivateFieldIn: Fr,
    __addDisposableResource: Hr,
    __disposeResources: Ur,
    __rewriteRelativeImportExtension: Vr,
  },
  ni = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        __addDisposableResource: Hr,
        get __assign() {
          return z;
        },
        __asyncDelegator: Lr,
        __asyncGenerator: Nr,
        __asyncValues: zr,
        __await: ke,
        __awaiter: Or,
        __classPrivateFieldGet: Wr,
        __classPrivateFieldIn: Fr,
        __classPrivateFieldSet: $r,
        __createBinding: vt,
        __decorate: Sr,
        __disposeResources: Ur,
        __esDecorate: Er,
        __exportStar: Dr,
        __extends: rn,
        __generator: Ar,
        __importDefault: Br,
        __importStar: jr,
        __makeTemplateObject: Ir,
        __metadata: Tr,
        __param: Cr,
        __propKey: Pr,
        __read: on,
        __rest: mt,
        __rewriteRelativeImportExtension: Vr,
        __runInitializers: Rr,
        __setFunctionName: _r,
        __spread: Mr,
        __spreadArray: an,
        __spreadArrays: kr,
        __values: ct,
        default: ti,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  );
var ot = "right-scroll-bar-position",
  at = "width-before-scroll-bar",
  ri = "with-scroll-bars-hidden",
  oi = "--removed-body-scroll-bar-size";
function Ot(e, n) {
  return (typeof e == "function" ? e(n) : e && (e.current = n), e);
}
function ai(e, n) {
  var t = g.useState(function () {
    return {
      value: e,
      callback: n,
      facade: {
        get current() {
          return t.value;
        },
        set current(r) {
          var o = t.value;
          o !== r && ((t.value = r), t.callback(r, o));
        },
      },
    };
  })[0];
  return ((t.callback = n), t.facade);
}
var ii = typeof window < "u" ? g.useLayoutEffect : g.useEffect,
  Mn = new WeakMap();
function si(e, n) {
  var t = ai(null, function (r) {
    return e.forEach(function (o) {
      return Ot(o, r);
    });
  });
  return (
    ii(
      function () {
        var r = Mn.get(t);
        if (r) {
          var o = new Set(r),
            a = new Set(e),
            i = t.current;
          (o.forEach(function (s) {
            a.has(s) || Ot(s, null);
          }),
            a.forEach(function (s) {
              o.has(s) || Ot(s, i);
            }));
        }
        Mn.set(t, e);
      },
      [e],
    ),
    t
  );
}
function li(e) {
  return e;
}
function ci(e, n) {
  n === void 0 && (n = li);
  var t = [],
    r = !1,
    o = {
      read: function () {
        if (r)
          throw new Error(
            "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
          );
        return t.length ? t[t.length - 1] : e;
      },
      useMedium: function (a) {
        var i = n(a, r);
        return (
          t.push(i),
          function () {
            t = t.filter(function (s) {
              return s !== i;
            });
          }
        );
      },
      assignSyncMedium: function (a) {
        for (r = !0; t.length; ) {
          var i = t;
          ((t = []), i.forEach(a));
        }
        t = {
          push: function (s) {
            return a(s);
          },
          filter: function () {
            return t;
          },
        };
      },
      assignMedium: function (a) {
        r = !0;
        var i = [];
        if (t.length) {
          var s = t;
          ((t = []), s.forEach(a), (i = t));
        }
        var c = function () {
            var f = i;
            ((i = []), f.forEach(a));
          },
          u = function () {
            return Promise.resolve().then(c);
          };
        (u(),
          (t = {
            push: function (f) {
              (i.push(f), u());
            },
            filter: function (f) {
              return ((i = i.filter(f)), t);
            },
          }));
      },
    };
  return o;
}
function ui(e) {
  e === void 0 && (e = {});
  var n = ci(null);
  return ((n.options = z({ async: !0, ssr: !1 }, e)), n);
}
var Yr = function (e) {
  var n = e.sideCar,
    t = mt(e, ["sideCar"]);
  if (!n)
    throw new Error(
      "Sidecar: please provide `sideCar` property to import the right car",
    );
  var r = n.read();
  if (!r) throw new Error("Sidecar medium not found");
  return g.createElement(r, z({}, t));
};
Yr.isSideCarExport = !0;
function di(e, n) {
  return (e.useMedium(n), Yr);
}
var Zr = ui(),
  At = function () {},
  gt = g.forwardRef(function (e, n) {
    var t = g.useRef(null),
      r = g.useState({
        onScrollCapture: At,
        onWheelCapture: At,
        onTouchMoveCapture: At,
      }),
      o = r[0],
      a = r[1],
      i = e.forwardProps,
      s = e.children,
      c = e.className,
      u = e.removeScrollBar,
      f = e.enabled,
      d = e.shards,
      h = e.sideCar,
      l = e.noRelative,
      v = e.noIsolation,
      p = e.inert,
      m = e.allowPinchZoom,
      y = e.as,
      w = y === void 0 ? "div" : y,
      b = e.gapMode,
      R = mt(e, [
        "forwardProps",
        "children",
        "className",
        "removeScrollBar",
        "enabled",
        "shards",
        "sideCar",
        "noRelative",
        "noIsolation",
        "inert",
        "allowPinchZoom",
        "as",
        "gapMode",
      ]),
      C = h,
      _ = si([t, n]),
      A = z(z({}, R), o);
    return g.createElement(
      g.Fragment,
      null,
      f &&
        g.createElement(C, {
          sideCar: Zr,
          removeScrollBar: u,
          shards: d,
          noRelative: l,
          noIsolation: v,
          inert: p,
          setCallbacks: a,
          allowPinchZoom: !!m,
          lockRef: t,
          gapMode: b,
        }),
      i
        ? g.cloneElement(g.Children.only(s), z(z({}, A), { ref: _ }))
        : g.createElement(w, z({}, A, { className: c, ref: _ }), s),
    );
  });
gt.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
gt.classNames = { fullWidth: at, zeroRight: ot };
var fi = function () {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function hi() {
  if (!document) return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var n = fi();
  return (n && e.setAttribute("nonce", n), e);
}
function pi(e, n) {
  e.styleSheet
    ? (e.styleSheet.cssText = n)
    : e.appendChild(document.createTextNode(n));
}
function mi(e) {
  var n = document.head || document.getElementsByTagName("head")[0];
  n.appendChild(e);
}
var vi = function () {
    var e = 0,
      n = null;
    return {
      add: function (t) {
        (e == 0 && (n = hi()) && (pi(n, t), mi(n)), e++);
      },
      remove: function () {
        (e--,
          !e && n && (n.parentNode && n.parentNode.removeChild(n), (n = null)));
      },
    };
  },
  gi = function () {
    var e = vi();
    return function (n, t) {
      g.useEffect(
        function () {
          return (
            e.add(n),
            function () {
              e.remove();
            }
          );
        },
        [n && t],
      );
    };
  },
  qr = function () {
    var e = gi(),
      n = function (t) {
        var r = t.styles,
          o = t.dynamic;
        return (e(r, o), null);
      };
    return n;
  },
  yi = { left: 0, top: 0, right: 0, gap: 0 },
  Dt = function (e) {
    return parseInt(e || "", 10) || 0;
  },
  wi = function (e) {
    var n = window.getComputedStyle(document.body),
      t = n[e === "padding" ? "paddingLeft" : "marginLeft"],
      r = n[e === "padding" ? "paddingTop" : "marginTop"],
      o = n[e === "padding" ? "paddingRight" : "marginRight"];
    return [Dt(t), Dt(r), Dt(o)];
  },
  bi = function (e) {
    if ((e === void 0 && (e = "margin"), typeof window > "u")) return yi;
    var n = wi(e),
      t = document.documentElement.clientWidth,
      r = window.innerWidth;
    return {
      left: n[0],
      top: n[1],
      right: n[2],
      gap: Math.max(0, r - t + n[2] - n[0]),
    };
  },
  xi = qr(),
  De = "data-scroll-locked",
  Si = function (e, n, t, r) {
    var o = e.left,
      a = e.top,
      i = e.right,
      s = e.gap;
    return (
      t === void 0 && (t = "margin"),
      `
  .`
        .concat(
          ri,
          ` {
   overflow: hidden `,
        )
        .concat(
          r,
          `;
   padding-right: `,
        )
        .concat(s, "px ")
        .concat(
          r,
          `;
  }
  body[`,
        )
        .concat(
          De,
          `] {
    overflow: hidden `,
        )
        .concat(
          r,
          `;
    overscroll-behavior: contain;
    `,
        )
        .concat(
          [
            n && "position: relative ".concat(r, ";"),
            t === "margin" &&
              `
    padding-left: `
                .concat(
                  o,
                  `px;
    padding-top: `,
                )
                .concat(
                  a,
                  `px;
    padding-right: `,
                )
                .concat(
                  i,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `,
                )
                .concat(s, "px ")
                .concat(
                  r,
                  `;
    `,
                ),
            t === "padding" &&
              "padding-right: ".concat(s, "px ").concat(r, ";"),
          ]
            .filter(Boolean)
            .join(""),
          `
  }
  
  .`,
        )
        .concat(
          ot,
          ` {
    right: `,
        )
        .concat(s, "px ")
        .concat(
          r,
          `;
  }
  
  .`,
        )
        .concat(
          at,
          ` {
    margin-right: `,
        )
        .concat(s, "px ")
        .concat(
          r,
          `;
  }
  
  .`,
        )
        .concat(ot, " .")
        .concat(
          ot,
          ` {
    right: 0 `,
        )
        .concat(
          r,
          `;
  }
  
  .`,
        )
        .concat(at, " .")
        .concat(
          at,
          ` {
    margin-right: 0 `,
        )
        .concat(
          r,
          `;
  }
  
  body[`,
        )
        .concat(
          De,
          `] {
    `,
        )
        .concat(oi, ": ")
        .concat(
          s,
          `px;
  }
`,
        )
    );
  },
  kn = function () {
    var e = parseInt(document.body.getAttribute(De) || "0", 10);
    return isFinite(e) ? e : 0;
  },
  Ci = function () {
    g.useEffect(function () {
      return (
        document.body.setAttribute(De, (kn() + 1).toString()),
        function () {
          var e = kn() - 1;
          e <= 0
            ? document.body.removeAttribute(De)
            : document.body.setAttribute(De, e.toString());
        }
      );
    }, []);
  },
  Ei = function (e) {
    var n = e.noRelative,
      t = e.noImportant,
      r = e.gapMode,
      o = r === void 0 ? "margin" : r;
    Ci();
    var a = g.useMemo(
      function () {
        return bi(o);
      },
      [o],
    );
    return g.createElement(xi, { styles: Si(a, !n, o, t ? "" : "!important") });
  },
  Yt = !1;
if (typeof window < "u")
  try {
    var et = Object.defineProperty({}, "passive", {
      get: function () {
        return ((Yt = !0), !0);
      },
    });
    (window.addEventListener("test", et, et),
      window.removeEventListener("test", et, et));
  } catch {
    Yt = !1;
  }
var Te = Yt ? { passive: !1 } : !1,
  Ri = function (e) {
    return e.tagName === "TEXTAREA";
  },
  Xr = function (e, n) {
    if (!(e instanceof Element)) return !1;
    var t = window.getComputedStyle(e);
    return (
      t[n] !== "hidden" &&
      !(t.overflowY === t.overflowX && !Ri(e) && t[n] === "visible")
    );
  },
  Pi = function (e) {
    return Xr(e, "overflowY");
  },
  _i = function (e) {
    return Xr(e, "overflowX");
  },
  Nn = function (e, n) {
    var t = n.ownerDocument,
      r = n;
    do {
      typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
      var o = Gr(e, r);
      if (o) {
        var a = Kr(e, r),
          i = a[1],
          s = a[2];
        if (i > s) return !0;
      }
      r = r.parentNode;
    } while (r && r !== t.body);
    return !1;
  },
  Ti = function (e) {
    var n = e.scrollTop,
      t = e.scrollHeight,
      r = e.clientHeight;
    return [n, t, r];
  },
  Oi = function (e) {
    var n = e.scrollLeft,
      t = e.scrollWidth,
      r = e.clientWidth;
    return [n, t, r];
  },
  Gr = function (e, n) {
    return e === "v" ? Pi(n) : _i(n);
  },
  Kr = function (e, n) {
    return e === "v" ? Ti(n) : Oi(n);
  },
  Ai = function (e, n) {
    return e === "h" && n === "rtl" ? -1 : 1;
  },
  Di = function (e, n, t, r, o) {
    var a = Ai(e, window.getComputedStyle(n).direction),
      i = a * r,
      s = t.target,
      c = n.contains(s),
      u = !1,
      f = i > 0,
      d = 0,
      h = 0;
    do {
      if (!s) break;
      var l = Kr(e, s),
        v = l[0],
        p = l[1],
        m = l[2],
        y = p - m - a * v;
      (v || y) && Gr(e, s) && ((d += y), (h += v));
      var w = s.parentNode;
      s = w && w.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? w.host : w;
    } while ((!c && s !== document.body) || (c && (n.contains(s) || n === s)));
    return (((f && Math.abs(d) < 1) || (!f && Math.abs(h) < 1)) && (u = !0), u);
  },
  tt = function (e) {
    return "changedTouches" in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0];
  },
  Ln = function (e) {
    return [e.deltaX, e.deltaY];
  },
  zn = function (e) {
    return e && "current" in e ? e.current : e;
  },
  Mi = function (e, n) {
    return e[0] === n[0] && e[1] === n[1];
  },
  ki = function (e) {
    return `
  .block-interactivity-`
      .concat(
        e,
        ` {pointer-events: none;}
  .allow-interactivity-`,
      )
      .concat(
        e,
        ` {pointer-events: all;}
`,
      );
  },
  Ni = 0,
  Oe = [];
function Li(e) {
  var n = g.useRef([]),
    t = g.useRef([0, 0]),
    r = g.useRef(),
    o = g.useState(Ni++)[0],
    a = g.useState(qr)[0],
    i = g.useRef(e);
  (g.useEffect(
    function () {
      i.current = e;
    },
    [e],
  ),
    g.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add("block-interactivity-".concat(o));
          var p = an([e.lockRef.current], (e.shards || []).map(zn), !0).filter(
            Boolean,
          );
          return (
            p.forEach(function (m) {
              return m.classList.add("allow-interactivity-".concat(o));
            }),
            function () {
              (document.body.classList.remove("block-interactivity-".concat(o)),
                p.forEach(function (m) {
                  return m.classList.remove("allow-interactivity-".concat(o));
                }));
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards],
    ));
  var s = g.useCallback(function (p, m) {
      if (
        ("touches" in p && p.touches.length === 2) ||
        (p.type === "wheel" && p.ctrlKey)
      )
        return !i.current.allowPinchZoom;
      var y = tt(p),
        w = t.current,
        b = "deltaX" in p ? p.deltaX : w[0] - y[0],
        R = "deltaY" in p ? p.deltaY : w[1] - y[1],
        C,
        _ = p.target,
        A = Math.abs(b) > Math.abs(R) ? "h" : "v";
      if ("touches" in p && A === "h" && _.type === "range") return !1;
      var D = Nn(A, _);
      if (!D) return !0;
      if ((D ? (C = A) : ((C = A === "v" ? "h" : "v"), (D = Nn(A, _))), !D))
        return !1;
      if (
        (!r.current && "changedTouches" in p && (b || R) && (r.current = C), !C)
      )
        return !0;
      var j = r.current || C;
      return Di(j, m, p, j === "h" ? b : R);
    }, []),
    c = g.useCallback(function (p) {
      var m = p;
      if (!(!Oe.length || Oe[Oe.length - 1] !== a)) {
        var y = "deltaY" in m ? Ln(m) : tt(m),
          w = n.current.filter(function (C) {
            return (
              C.name === m.type &&
              (C.target === m.target || m.target === C.shadowParent) &&
              Mi(C.delta, y)
            );
          })[0];
        if (w && w.should) {
          m.cancelable && m.preventDefault();
          return;
        }
        if (!w) {
          var b = (i.current.shards || [])
              .map(zn)
              .filter(Boolean)
              .filter(function (C) {
                return C.contains(m.target);
              }),
            R = b.length > 0 ? s(m, b[0]) : !i.current.noIsolation;
          R && m.cancelable && m.preventDefault();
        }
      }
    }, []),
    u = g.useCallback(function (p, m, y, w) {
      var b = { name: p, delta: m, target: y, should: w, shadowParent: zi(y) };
      (n.current.push(b),
        setTimeout(function () {
          n.current = n.current.filter(function (R) {
            return R !== b;
          });
        }, 1));
    }, []),
    f = g.useCallback(function (p) {
      ((t.current = tt(p)), (r.current = void 0));
    }, []),
    d = g.useCallback(function (p) {
      u(p.type, Ln(p), p.target, s(p, e.lockRef.current));
    }, []),
    h = g.useCallback(function (p) {
      u(p.type, tt(p), p.target, s(p, e.lockRef.current));
    }, []);
  g.useEffect(function () {
    return (
      Oe.push(a),
      e.setCallbacks({
        onScrollCapture: d,
        onWheelCapture: d,
        onTouchMoveCapture: h,
      }),
      document.addEventListener("wheel", c, Te),
      document.addEventListener("touchmove", c, Te),
      document.addEventListener("touchstart", f, Te),
      function () {
        ((Oe = Oe.filter(function (p) {
          return p !== a;
        })),
          document.removeEventListener("wheel", c, Te),
          document.removeEventListener("touchmove", c, Te),
          document.removeEventListener("touchstart", f, Te));
      }
    );
  }, []);
  var l = e.removeScrollBar,
    v = e.inert;
  return g.createElement(
    g.Fragment,
    null,
    v ? g.createElement(a, { styles: ki(o) }) : null,
    l
      ? g.createElement(Ei, { noRelative: e.noRelative, gapMode: e.gapMode })
      : null,
  );
}
function zi(e) {
  for (var n = null; e !== null; )
    (e instanceof ShadowRoot && ((n = e.host), (e = e.host)),
      (e = e.parentNode));
  return n;
}
const Ii = di(Zr, Li);
var ji = g.forwardRef(function (e, n) {
  return g.createElement(gt, z({}, e, { ref: n, sideCar: Ii }));
});
ji.classNames = gt.classNames;
var Mt = { exports: {} },
  kt = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var In;
function Bi() {
  if (In) return kt;
  In = 1;
  var e = fo();
  function n(d, h) {
    return (d === h && (d !== 0 || 1 / d === 1 / h)) || (d !== d && h !== h);
  }
  var t = typeof Object.is == "function" ? Object.is : n,
    r = e.useState,
    o = e.useEffect,
    a = e.useLayoutEffect,
    i = e.useDebugValue;
  function s(d, h) {
    var l = h(),
      v = r({ inst: { value: l, getSnapshot: h } }),
      p = v[0].inst,
      m = v[1];
    return (
      a(
        function () {
          ((p.value = l), (p.getSnapshot = h), c(p) && m({ inst: p }));
        },
        [d, l, h],
      ),
      o(
        function () {
          return (
            c(p) && m({ inst: p }),
            d(function () {
              c(p) && m({ inst: p });
            })
          );
        },
        [d],
      ),
      i(l),
      l
    );
  }
  function c(d) {
    var h = d.getSnapshot;
    d = d.value;
    try {
      var l = h();
      return !t(d, l);
    } catch {
      return !0;
    }
  }
  function u(d, h) {
    return h();
  }
  var f =
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
      ? u
      : s;
  return (
    (kt.useSyncExternalStore =
      e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : f),
    kt
  );
}
var jn;
function Wi() {
  return (jn || ((jn = 1), (Mt.exports = Bi())), Mt.exports);
}
var ol = Wi(),
  ut = ["light", "dark"],
  sn = "(prefers-color-scheme: dark)",
  $i = typeof window > "u",
  ln = g.createContext(void 0),
  Fi = { setTheme: (e) => {}, themes: [] },
  al = () => {
    var e;
    return (e = g.useContext(ln)) != null ? e : Fi;
  },
  il = (e) => (g.useContext(ln) ? e.children : g.createElement(Ui, { ...e })),
  Hi = ["light", "dark"],
  Ui = ({
    forcedTheme: e,
    disableTransitionOnChange: n = !1,
    enableSystem: t = !0,
    enableColorScheme: r = !0,
    storageKey: o = "theme",
    themes: a = Hi,
    defaultTheme: i = t ? "system" : "light",
    attribute: s = "data-theme",
    value: c,
    children: u,
    nonce: f,
  }) => {
    let [d, h] = g.useState(() => Bn(o, i)),
      [l, v] = g.useState(() => Bn(o)),
      p = c ? Object.values(c) : a,
      m = g.useCallback((R) => {
        let C = R;
        if (!C) return;
        R === "system" && t && (C = Wn());
        let _ = c ? c[C] : C,
          A = n ? Yi() : null,
          D = document.documentElement;
        if (
          (s === "class"
            ? (D.classList.remove(...p), _ && D.classList.add(_))
            : _
              ? D.setAttribute(s, _)
              : D.removeAttribute(s),
          r)
        ) {
          let j = ut.includes(i) ? i : null,
            N = ut.includes(C) ? C : j;
          D.style.colorScheme = N;
        }
        A?.();
      }, []),
      y = g.useCallback(
        (R) => {
          let C = typeof R == "function" ? R(R) : R;
          h(C);
          try {
            localStorage.setItem(o, C);
          } catch {}
        },
        [e],
      ),
      w = g.useCallback(
        (R) => {
          let C = Wn(R);
          (v(C), d === "system" && t && !e && m("system"));
        },
        [d, e],
      );
    (g.useEffect(() => {
      let R = window.matchMedia(sn);
      return (R.addListener(w), w(R), () => R.removeListener(w));
    }, [w]),
      g.useEffect(() => {
        let R = (C) => {
          if (C.key !== o) return;
          let _ = C.newValue || i;
          y(_);
        };
        return (
          window.addEventListener("storage", R),
          () => window.removeEventListener("storage", R)
        );
      }, [y]),
      g.useEffect(() => {
        m(e ?? d);
      }, [e, d]));
    let b = g.useMemo(
      () => ({
        theme: d,
        setTheme: y,
        forcedTheme: e,
        resolvedTheme: d === "system" ? l : d,
        themes: t ? [...a, "system"] : a,
        systemTheme: t ? l : void 0,
      }),
      [d, y, e, l, t, a],
    );
    return g.createElement(
      ln.Provider,
      { value: b },
      g.createElement(Vi, {
        forcedTheme: e,
        disableTransitionOnChange: n,
        enableSystem: t,
        enableColorScheme: r,
        storageKey: o,
        themes: a,
        defaultTheme: i,
        attribute: s,
        value: c,
        children: u,
        attrs: p,
        nonce: f,
      }),
      u,
    );
  },
  Vi = g.memo(
    ({
      forcedTheme: e,
      storageKey: n,
      attribute: t,
      enableSystem: r,
      enableColorScheme: o,
      defaultTheme: a,
      value: i,
      attrs: s,
      nonce: c,
    }) => {
      let u = a === "system",
        f =
          t === "class"
            ? `var d=document.documentElement,c=d.classList;${`c.remove(${s.map((v) => `'${v}'`).join(",")})`};`
            : `var d=document.documentElement,n='${t}',s='setAttribute';`,
        d = o
          ? ut.includes(a) && a
            ? `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${a}'`
            : "if(e==='light'||e==='dark')d.style.colorScheme=e"
          : "",
        h = (v, p = !1, m = !0) => {
          let y = i ? i[v] : v,
            w = p ? v + "|| ''" : `'${y}'`,
            b = "";
          return (
            o &&
              m &&
              !p &&
              ut.includes(v) &&
              (b += `d.style.colorScheme = '${v}';`),
            t === "class"
              ? p || y
                ? (b += `c.add(${w})`)
                : (b += "null")
              : y && (b += `d[s](n,${w})`),
            b
          );
        },
        l = e
          ? `!function(){${f}${h(e)}}()`
          : r
            ? `!function(){try{${f}var e=localStorage.getItem('${n}');if('system'===e||(!e&&${u})){var t='${sn}',m=window.matchMedia(t);if(m.media!==t||m.matches){${h("dark")}}else{${h("light")}}}else if(e){${i ? `var x=${JSON.stringify(i)};` : ""}${h(i ? "x[e]" : "e", !0)}}${u ? "" : "else{" + h(a, !1, !1) + "}"}${d}}catch(e){}}()`
            : `!function(){try{${f}var e=localStorage.getItem('${n}');if(e){${i ? `var x=${JSON.stringify(i)};` : ""}${h(i ? "x[e]" : "e", !0)}}else{${h(a, !1, !1)};}${d}}catch(t){}}();`;
      return g.createElement("script", {
        nonce: c,
        dangerouslySetInnerHTML: { __html: l },
      });
    },
  ),
  Bn = (e, n) => {
    if ($i) return;
    let t;
    try {
      t = localStorage.getItem(e) || void 0;
    } catch {}
    return t || n;
  },
  Yi = () => {
    let e = document.createElement("style");
    return (
      e.appendChild(
        document.createTextNode(
          "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}",
        ),
      ),
      document.head.appendChild(e),
      () => {
        (window.getComputedStyle(document.body),
          setTimeout(() => {
            document.head.removeChild(e);
          }, 1));
      }
    );
  },
  Wn = (e) => (e || (e = window.matchMedia(sn)), e.matches ? "dark" : "light");
const sl = mo(ni);
var Zi = (e) => {
    switch (e) {
      case "success":
        return Gi;
      case "info":
        return Ji;
      case "warning":
        return Ki;
      case "error":
        return Qi;
      default:
        return null;
    }
  },
  qi = Array(12).fill(0),
  Xi = ({ visible: e, className: n }) =>
    E.createElement(
      "div",
      {
        className: ["sonner-loading-wrapper", n].filter(Boolean).join(" "),
        "data-visible": e,
      },
      E.createElement(
        "div",
        { className: "sonner-spinner" },
        qi.map((t, r) =>
          E.createElement("div", {
            className: "sonner-loading-bar",
            key: `spinner-bar-${r}`,
          }),
        ),
      ),
    ),
  Gi = E.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    E.createElement("path", {
      fillRule: "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
      clipRule: "evenodd",
    }),
  ),
  Ki = E.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    E.createElement("path", {
      fillRule: "evenodd",
      d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
      clipRule: "evenodd",
    }),
  ),
  Ji = E.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    E.createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
      clipRule: "evenodd",
    }),
  ),
  Qi = E.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    E.createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
      clipRule: "evenodd",
    }),
  ),
  es = E.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "12",
      height: "12",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    E.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
    E.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" }),
  ),
  ts = () => {
    let [e, n] = E.useState(document.hidden);
    return (
      E.useEffect(() => {
        let t = () => {
          n(document.hidden);
        };
        return (
          document.addEventListener("visibilitychange", t),
          () => window.removeEventListener("visibilitychange", t)
        );
      }, []),
      e
    );
  },
  Zt = 1,
  ns = class {
    constructor() {
      ((this.subscribe = (e) => (
        this.subscribers.push(e),
        () => {
          let n = this.subscribers.indexOf(e);
          this.subscribers.splice(n, 1);
        }
      )),
        (this.publish = (e) => {
          this.subscribers.forEach((n) => n(e));
        }),
        (this.addToast = (e) => {
          (this.publish(e), (this.toasts = [...this.toasts, e]));
        }),
        (this.create = (e) => {
          var n;
          let { message: t, ...r } = e,
            o =
              typeof e?.id == "number" ||
              ((n = e.id) == null ? void 0 : n.length) > 0
                ? e.id
                : Zt++,
            a = this.toasts.find((s) => s.id === o),
            i = e.dismissible === void 0 ? !0 : e.dismissible;
          return (
            this.dismissedToasts.has(o) && this.dismissedToasts.delete(o),
            a
              ? (this.toasts = this.toasts.map((s) =>
                  s.id === o
                    ? (this.publish({ ...s, ...e, id: o, title: t }),
                      { ...s, ...e, id: o, dismissible: i, title: t })
                    : s,
                ))
              : this.addToast({ title: t, ...r, dismissible: i, id: o }),
            o
          );
        }),
        (this.dismiss = (e) => (
          this.dismissedToasts.add(e),
          e ||
            this.toasts.forEach((n) => {
              this.subscribers.forEach((t) => t({ id: n.id, dismiss: !0 }));
            }),
          this.subscribers.forEach((n) => n({ id: e, dismiss: !0 })),
          e
        )),
        (this.message = (e, n) => this.create({ ...n, message: e })),
        (this.error = (e, n) =>
          this.create({ ...n, message: e, type: "error" })),
        (this.success = (e, n) =>
          this.create({ ...n, type: "success", message: e })),
        (this.info = (e, n) => this.create({ ...n, type: "info", message: e })),
        (this.warning = (e, n) =>
          this.create({ ...n, type: "warning", message: e })),
        (this.loading = (e, n) =>
          this.create({ ...n, type: "loading", message: e })),
        (this.promise = (e, n) => {
          if (!n) return;
          let t;
          n.loading !== void 0 &&
            (t = this.create({
              ...n,
              promise: e,
              type: "loading",
              message: n.loading,
              description:
                typeof n.description != "function" ? n.description : void 0,
            }));
          let r = e instanceof Promise ? e : e(),
            o = t !== void 0,
            a,
            i = r
              .then(async (c) => {
                if (((a = ["resolve", c]), E.isValidElement(c)))
                  ((o = !1),
                    this.create({ id: t, type: "default", message: c }));
                else if (os(c) && !c.ok) {
                  o = !1;
                  let u =
                      typeof n.error == "function"
                        ? await n.error(`HTTP error! status: ${c.status}`)
                        : n.error,
                    f =
                      typeof n.description == "function"
                        ? await n.description(`HTTP error! status: ${c.status}`)
                        : n.description;
                  this.create({
                    id: t,
                    type: "error",
                    message: u,
                    description: f,
                  });
                } else if (n.success !== void 0) {
                  o = !1;
                  let u =
                      typeof n.success == "function"
                        ? await n.success(c)
                        : n.success,
                    f =
                      typeof n.description == "function"
                        ? await n.description(c)
                        : n.description;
                  this.create({
                    id: t,
                    type: "success",
                    message: u,
                    description: f,
                  });
                }
              })
              .catch(async (c) => {
                if (((a = ["reject", c]), n.error !== void 0)) {
                  o = !1;
                  let u =
                      typeof n.error == "function" ? await n.error(c) : n.error,
                    f =
                      typeof n.description == "function"
                        ? await n.description(c)
                        : n.description;
                  this.create({
                    id: t,
                    type: "error",
                    message: u,
                    description: f,
                  });
                }
              })
              .finally(() => {
                var c;
                (o && (this.dismiss(t), (t = void 0)),
                  (c = n.finally) == null || c.call(n));
              }),
            s = () =>
              new Promise((c, u) =>
                i.then(() => (a[0] === "reject" ? u(a[1]) : c(a[1]))).catch(u),
              );
          return typeof t != "string" && typeof t != "number"
            ? { unwrap: s }
            : Object.assign(t, { unwrap: s });
        }),
        (this.custom = (e, n) => {
          let t = n?.id || Zt++;
          return (this.create({ jsx: e(t), id: t, ...n }), t);
        }),
        (this.getActiveToasts = () =>
          this.toasts.filter((e) => !this.dismissedToasts.has(e.id))),
        (this.subscribers = []),
        (this.toasts = []),
        (this.dismissedToasts = new Set()));
    }
  },
  K = new ns(),
  rs = (e, n) => {
    let t = n?.id || Zt++;
    return (K.addToast({ title: e, ...n, id: t }), t);
  },
  os = (e) =>
    e &&
    typeof e == "object" &&
    "ok" in e &&
    typeof e.ok == "boolean" &&
    "status" in e &&
    typeof e.status == "number",
  as = rs,
  is = () => K.toasts,
  ss = () => K.getActiveToasts();
Object.assign(
  as,
  {
    success: K.success,
    info: K.info,
    warning: K.warning,
    error: K.error,
    custom: K.custom,
    message: K.message,
    promise: K.promise,
    dismiss: K.dismiss,
    loading: K.loading,
  },
  { getHistory: is, getToasts: ss },
);
function ls(e, { insertAt: n } = {}) {
  if (typeof document > "u") return;
  let t = document.head || document.getElementsByTagName("head")[0],
    r = document.createElement("style");
  ((r.type = "text/css"),
    n === "top" && t.firstChild
      ? t.insertBefore(r, t.firstChild)
      : t.appendChild(r),
    r.styleSheet
      ? (r.styleSheet.cssText = e)
      : r.appendChild(document.createTextNode(e)));
}
ls(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999;transition:transform .4s ease}:where([data-sonner-toaster][data-lifted="true"]){transform:translateY(-10px)}@media (hover: none) and (pointer: coarse){:where([data-sonner-toaster][data-lifted="true"]){transform:none}}:where([data-sonner-toaster][data-x-position="right"]){right:var(--offset-right)}:where([data-sonner-toaster][data-x-position="left"]){left:var(--offset-left)}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:var(--offset-top)}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:var(--offset-bottom)}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast] [data-close-button]{background:var(--gray1)}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:-50%;right:-50%;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y, 0px)) translate(var(--swipe-amount-x, 0px));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-bg-hover: hsl(0, 0%, 12%);--normal-border: hsl(0, 0%, 20%);--normal-border-hover: hsl(0, 0%, 25%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);
function nt(e) {
  return e.label !== void 0;
}
var cs = 3,
  us = "32px",
  ds = "16px",
  $n = 4e3,
  fs = 356,
  hs = 14,
  ps = 20,
  ms = 200;
function oe(...e) {
  return e.filter(Boolean).join(" ");
}
function vs(e) {
  let [n, t] = e.split("-"),
    r = [];
  return (n && r.push(n), t && r.push(t), r);
}
var gs = (e) => {
  var n, t, r, o, a, i, s, c, u, f, d;
  let {
      invert: h,
      toast: l,
      unstyled: v,
      interacting: p,
      setHeights: m,
      visibleToasts: y,
      heights: w,
      index: b,
      toasts: R,
      expanded: C,
      removeToast: _,
      defaultRichColors: A,
      closeButton: D,
      style: j,
      cancelButtonStyle: N,
      actionButtonStyle: V,
      className: B = "",
      descriptionClassName: Z = "",
      duration: W,
      position: X,
      gap: U,
      loadingIcon: $,
      expandByDefault: S,
      classNames: x,
      icons: P,
      closeButtonAriaLabel: F = "Close toast",
      pauseWhenPageIsHidden: T,
    } = e,
    [k, M] = E.useState(null),
    [q, G] = E.useState(null),
    [I, wt] = E.useState(!1),
    [Be, Xe] = E.useState(!1),
    [We, bt] = E.useState(!1),
    [cn, Jr] = E.useState(!1),
    [Qr, un] = E.useState(!1),
    [eo, xt] = E.useState(0),
    [to, dn] = E.useState(0),
    $e = E.useRef(l.duration || W || $n),
    fn = E.useRef(null),
    xe = E.useRef(null),
    no = b === 0,
    ro = b + 1 <= y,
    ee = l.type,
    Ee = l.dismissible !== !1,
    oo = l.className || "",
    ao = l.descriptionClassName || "",
    Ge = E.useMemo(
      () => w.findIndex((O) => O.toastId === l.id) || 0,
      [w, l.id],
    ),
    io = E.useMemo(() => {
      var O;
      return (O = l.closeButton) != null ? O : D;
    }, [l.closeButton, D]),
    hn = E.useMemo(() => l.duration || W || $n, [l.duration, W]),
    St = E.useRef(0),
    Re = E.useRef(0),
    pn = E.useRef(0),
    Pe = E.useRef(null),
    [so, lo] = X.split("-"),
    mn = E.useMemo(
      () => w.reduce((O, L, H) => (H >= Ge ? O : O + L.height), 0),
      [w, Ge],
    ),
    vn = ts(),
    co = l.invert || h,
    Ct = ee === "loading";
  ((Re.current = E.useMemo(() => Ge * U + mn, [Ge, mn])),
    E.useEffect(() => {
      $e.current = hn;
    }, [hn]),
    E.useEffect(() => {
      wt(!0);
    }, []),
    E.useEffect(() => {
      let O = xe.current;
      if (O) {
        let L = O.getBoundingClientRect().height;
        return (
          dn(L),
          m((H) => [{ toastId: l.id, height: L, position: l.position }, ...H]),
          () => m((H) => H.filter((te) => te.toastId !== l.id))
        );
      }
    }, [m, l.id]),
    E.useLayoutEffect(() => {
      if (!I) return;
      let O = xe.current,
        L = O.style.height;
      O.style.height = "auto";
      let H = O.getBoundingClientRect().height;
      ((O.style.height = L),
        dn(H),
        m((te) =>
          te.find((ne) => ne.toastId === l.id)
            ? te.map((ne) => (ne.toastId === l.id ? { ...ne, height: H } : ne))
            : [{ toastId: l.id, height: H, position: l.position }, ...te],
        ));
    }, [I, l.title, l.description, m, l.id]));
  let he = E.useCallback(() => {
    (Xe(!0),
      xt(Re.current),
      m((O) => O.filter((L) => L.toastId !== l.id)),
      setTimeout(() => {
        _(l);
      }, ms));
  }, [l, _, m, Re]);
  (E.useEffect(() => {
    if (
      (l.promise && ee === "loading") ||
      l.duration === 1 / 0 ||
      l.type === "loading"
    )
      return;
    let O;
    return (
      C || p || (T && vn)
        ? (() => {
            if (pn.current < St.current) {
              let L = new Date().getTime() - St.current;
              $e.current = $e.current - L;
            }
            pn.current = new Date().getTime();
          })()
        : $e.current !== 1 / 0 &&
          ((St.current = new Date().getTime()),
          (O = setTimeout(() => {
            var L;
            ((L = l.onAutoClose) == null || L.call(l, l), he());
          }, $e.current))),
      () => clearTimeout(O)
    );
  }, [C, p, l, ee, T, vn, he]),
    E.useEffect(() => {
      l.delete && he();
    }, [he, l.delete]));
  function uo() {
    var O, L, H;
    return P != null && P.loading
      ? E.createElement(
          "div",
          {
            className: oe(
              x?.loader,
              (O = l?.classNames) == null ? void 0 : O.loader,
              "sonner-loader",
            ),
            "data-visible": ee === "loading",
          },
          P.loading,
        )
      : $
        ? E.createElement(
            "div",
            {
              className: oe(
                x?.loader,
                (L = l?.classNames) == null ? void 0 : L.loader,
                "sonner-loader",
              ),
              "data-visible": ee === "loading",
            },
            $,
          )
        : E.createElement(Xi, {
            className: oe(
              x?.loader,
              (H = l?.classNames) == null ? void 0 : H.loader,
            ),
            visible: ee === "loading",
          });
  }
  return E.createElement(
    "li",
    {
      tabIndex: 0,
      ref: xe,
      className: oe(
        B,
        oo,
        x?.toast,
        (n = l?.classNames) == null ? void 0 : n.toast,
        x?.default,
        x?.[ee],
        (t = l?.classNames) == null ? void 0 : t[ee],
      ),
      "data-sonner-toast": "",
      "data-rich-colors": (r = l.richColors) != null ? r : A,
      "data-styled": !(l.jsx || l.unstyled || v),
      "data-mounted": I,
      "data-promise": !!l.promise,
      "data-swiped": Qr,
      "data-removed": Be,
      "data-visible": ro,
      "data-y-position": so,
      "data-x-position": lo,
      "data-index": b,
      "data-front": no,
      "data-swiping": We,
      "data-dismissible": Ee,
      "data-type": ee,
      "data-invert": co,
      "data-swipe-out": cn,
      "data-swipe-direction": q,
      "data-expanded": !!(C || (S && I)),
      style: {
        "--index": b,
        "--toasts-before": b,
        "--z-index": R.length - b,
        "--offset": `${Be ? eo : Re.current}px`,
        "--initial-height": S ? "auto" : `${to}px`,
        ...j,
        ...l.style,
      },
      onDragEnd: () => {
        (bt(!1), M(null), (Pe.current = null));
      },
      onPointerDown: (O) => {
        Ct ||
          !Ee ||
          ((fn.current = new Date()),
          xt(Re.current),
          O.target.setPointerCapture(O.pointerId),
          O.target.tagName !== "BUTTON" &&
            (bt(!0), (Pe.current = { x: O.clientX, y: O.clientY })));
      },
      onPointerUp: () => {
        var O, L, H, te;
        if (cn || !Ee) return;
        Pe.current = null;
        let ne = Number(
            ((O = xe.current) == null
              ? void 0
              : O.style
                  .getPropertyValue("--swipe-amount-x")
                  .replace("px", "")) || 0,
          ),
          pe = Number(
            ((L = xe.current) == null
              ? void 0
              : L.style
                  .getPropertyValue("--swipe-amount-y")
                  .replace("px", "")) || 0,
          ),
          Se =
            new Date().getTime() -
            ((H = fn.current) == null ? void 0 : H.getTime()),
          re = k === "x" ? ne : pe,
          me = Math.abs(re) / Se;
        if (Math.abs(re) >= ps || me > 0.11) {
          (xt(Re.current),
            (te = l.onDismiss) == null || te.call(l, l),
            G(k === "x" ? (ne > 0 ? "right" : "left") : pe > 0 ? "down" : "up"),
            he(),
            Jr(!0),
            un(!1));
          return;
        }
        (bt(!1), M(null));
      },
      onPointerMove: (O) => {
        var L, H, te, ne;
        if (
          !Pe.current ||
          !Ee ||
          ((L = window.getSelection()) == null ? void 0 : L.toString().length) >
            0
        )
          return;
        let pe = O.clientY - Pe.current.y,
          Se = O.clientX - Pe.current.x,
          re = (H = e.swipeDirections) != null ? H : vs(X);
        !k &&
          (Math.abs(Se) > 1 || Math.abs(pe) > 1) &&
          M(Math.abs(Se) > Math.abs(pe) ? "x" : "y");
        let me = { x: 0, y: 0 };
        (k === "y"
          ? (re.includes("top") || re.includes("bottom")) &&
            ((re.includes("top") && pe < 0) ||
              (re.includes("bottom") && pe > 0)) &&
            (me.y = pe)
          : k === "x" &&
            (re.includes("left") || re.includes("right")) &&
            ((re.includes("left") && Se < 0) ||
              (re.includes("right") && Se > 0)) &&
            (me.x = Se),
          (Math.abs(me.x) > 0 || Math.abs(me.y) > 0) && un(!0),
          (te = xe.current) == null ||
            te.style.setProperty("--swipe-amount-x", `${me.x}px`),
          (ne = xe.current) == null ||
            ne.style.setProperty("--swipe-amount-y", `${me.y}px`));
      },
    },
    io && !l.jsx
      ? E.createElement(
          "button",
          {
            "aria-label": F,
            "data-disabled": Ct,
            "data-close-button": !0,
            onClick:
              Ct || !Ee
                ? () => {}
                : () => {
                    var O;
                    (he(), (O = l.onDismiss) == null || O.call(l, l));
                  },
            className: oe(
              x?.closeButton,
              (o = l?.classNames) == null ? void 0 : o.closeButton,
            ),
          },
          (a = P?.close) != null ? a : es,
        )
      : null,
    l.jsx || g.isValidElement(l.title)
      ? l.jsx
        ? l.jsx
        : typeof l.title == "function"
          ? l.title()
          : l.title
      : E.createElement(
          E.Fragment,
          null,
          ee || l.icon || l.promise
            ? E.createElement(
                "div",
                {
                  "data-icon": "",
                  className: oe(
                    x?.icon,
                    (i = l?.classNames) == null ? void 0 : i.icon,
                  ),
                },
                l.promise || (l.type === "loading" && !l.icon)
                  ? l.icon || uo()
                  : null,
                l.type !== "loading" ? l.icon || P?.[ee] || Zi(ee) : null,
              )
            : null,
          E.createElement(
            "div",
            {
              "data-content": "",
              className: oe(
                x?.content,
                (s = l?.classNames) == null ? void 0 : s.content,
              ),
            },
            E.createElement(
              "div",
              {
                "data-title": "",
                className: oe(
                  x?.title,
                  (c = l?.classNames) == null ? void 0 : c.title,
                ),
              },
              typeof l.title == "function" ? l.title() : l.title,
            ),
            l.description
              ? E.createElement(
                  "div",
                  {
                    "data-description": "",
                    className: oe(
                      Z,
                      ao,
                      x?.description,
                      (u = l?.classNames) == null ? void 0 : u.description,
                    ),
                  },
                  typeof l.description == "function"
                    ? l.description()
                    : l.description,
                )
              : null,
          ),
          g.isValidElement(l.cancel)
            ? l.cancel
            : l.cancel && nt(l.cancel)
              ? E.createElement(
                  "button",
                  {
                    "data-button": !0,
                    "data-cancel": !0,
                    style: l.cancelButtonStyle || N,
                    onClick: (O) => {
                      var L, H;
                      nt(l.cancel) &&
                        Ee &&
                        ((H = (L = l.cancel).onClick) == null || H.call(L, O),
                        he());
                    },
                    className: oe(
                      x?.cancelButton,
                      (f = l?.classNames) == null ? void 0 : f.cancelButton,
                    ),
                  },
                  l.cancel.label,
                )
              : null,
          g.isValidElement(l.action)
            ? l.action
            : l.action && nt(l.action)
              ? E.createElement(
                  "button",
                  {
                    "data-button": !0,
                    "data-action": !0,
                    style: l.actionButtonStyle || V,
                    onClick: (O) => {
                      var L, H;
                      nt(l.action) &&
                        ((H = (L = l.action).onClick) == null || H.call(L, O),
                        !O.defaultPrevented && he());
                    },
                    className: oe(
                      x?.actionButton,
                      (d = l?.classNames) == null ? void 0 : d.actionButton,
                    ),
                  },
                  l.action.label,
                )
              : null,
        ),
  );
};
function Fn() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  let e = document.documentElement.getAttribute("dir");
  return e === "auto" || !e
    ? window.getComputedStyle(document.documentElement).direction
    : e;
}
function ys(e, n) {
  let t = {};
  return (
    [e, n].forEach((r, o) => {
      let a = o === 1,
        i = a ? "--mobile-offset" : "--offset",
        s = a ? ds : us;
      function c(u) {
        ["top", "right", "bottom", "left"].forEach((f) => {
          t[`${i}-${f}`] = typeof u == "number" ? `${u}px` : u;
        });
      }
      typeof r == "number" || typeof r == "string"
        ? c(r)
        : typeof r == "object"
          ? ["top", "right", "bottom", "left"].forEach((u) => {
              r[u] === void 0
                ? (t[`${i}-${u}`] = s)
                : (t[`${i}-${u}`] =
                    typeof r[u] == "number" ? `${r[u]}px` : r[u]);
            })
          : c(s);
    }),
    t
  );
}
var ll = g.forwardRef(function (e, n) {
    let {
        invert: t,
        position: r = "bottom-right",
        hotkey: o = ["altKey", "KeyT"],
        expand: a,
        closeButton: i,
        className: s,
        offset: c,
        mobileOffset: u,
        theme: f = "light",
        richColors: d,
        duration: h,
        style: l,
        visibleToasts: v = cs,
        toastOptions: p,
        dir: m = Fn(),
        gap: y = hs,
        loadingIcon: w,
        icons: b,
        containerAriaLabel: R = "Notifications",
        pauseWhenPageIsHidden: C,
      } = e,
      [_, A] = E.useState([]),
      D = E.useMemo(
        () =>
          Array.from(
            new Set(
              [r].concat(_.filter((T) => T.position).map((T) => T.position)),
            ),
          ),
        [_, r],
      ),
      [j, N] = E.useState([]),
      [V, B] = E.useState(!1),
      [Z, W] = E.useState(!1),
      [X, U] = E.useState(
        f !== "system"
          ? f
          : typeof window < "u" &&
              window.matchMedia &&
              window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light",
      ),
      $ = E.useRef(null),
      S = o.join("+").replace(/Key/g, "").replace(/Digit/g, ""),
      x = E.useRef(null),
      P = E.useRef(!1),
      F = E.useCallback((T) => {
        A((k) => {
          var M;
          return (
            ((M = k.find((q) => q.id === T.id)) != null && M.delete) ||
              K.dismiss(T.id),
            k.filter(({ id: q }) => q !== T.id)
          );
        });
      }, []);
    return (
      E.useEffect(
        () =>
          K.subscribe((T) => {
            if (T.dismiss) {
              A((k) =>
                k.map((M) => (M.id === T.id ? { ...M, delete: !0 } : M)),
              );
              return;
            }
            setTimeout(() => {
              ho.flushSync(() => {
                A((k) => {
                  let M = k.findIndex((q) => q.id === T.id);
                  return M !== -1
                    ? [...k.slice(0, M), { ...k[M], ...T }, ...k.slice(M + 1)]
                    : [T, ...k];
                });
              });
            });
          }),
        [],
      ),
      E.useEffect(() => {
        if (f !== "system") {
          U(f);
          return;
        }
        if (
          (f === "system" &&
            (window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
              ? U("dark")
              : U("light")),
          typeof window > "u")
        )
          return;
        let T = window.matchMedia("(prefers-color-scheme: dark)");
        try {
          T.addEventListener("change", ({ matches: k }) => {
            U(k ? "dark" : "light");
          });
        } catch {
          T.addListener(({ matches: M }) => {
            try {
              U(M ? "dark" : "light");
            } catch (q) {
              console.error(q);
            }
          });
        }
      }, [f]),
      E.useEffect(() => {
        _.length <= 1 && B(!1);
      }, [_]),
      E.useEffect(() => {
        let T = (k) => {
          var M, q;
          (o.every((G) => k[G] || k.code === G) &&
            (B(!0), (M = $.current) == null || M.focus()),
            k.code === "Escape" &&
              (document.activeElement === $.current ||
                ((q = $.current) != null &&
                  q.contains(document.activeElement))) &&
              B(!1));
        };
        return (
          document.addEventListener("keydown", T),
          () => document.removeEventListener("keydown", T)
        );
      }, [o]),
      E.useEffect(() => {
        if ($.current)
          return () => {
            x.current &&
              (x.current.focus({ preventScroll: !0 }),
              (x.current = null),
              (P.current = !1));
          };
      }, [$.current]),
      E.createElement(
        "section",
        {
          ref: n,
          "aria-label": `${R} ${S}`,
          tabIndex: -1,
          "aria-live": "polite",
          "aria-relevant": "additions text",
          "aria-atomic": "false",
          suppressHydrationWarning: !0,
        },
        D.map((T, k) => {
          var M;
          let [q, G] = T.split("-");
          return _.length
            ? E.createElement(
                "ol",
                {
                  key: T,
                  dir: m === "auto" ? Fn() : m,
                  tabIndex: -1,
                  ref: $,
                  className: s,
                  "data-sonner-toaster": !0,
                  "data-theme": X,
                  "data-y-position": q,
                  "data-lifted": V && _.length > 1 && !a,
                  "data-x-position": G,
                  style: {
                    "--front-toast-height": `${((M = j[0]) == null ? void 0 : M.height) || 0}px`,
                    "--width": `${fs}px`,
                    "--gap": `${y}px`,
                    ...l,
                    ...ys(c, u),
                  },
                  onBlur: (I) => {
                    P.current &&
                      !I.currentTarget.contains(I.relatedTarget) &&
                      ((P.current = !1),
                      x.current &&
                        (x.current.focus({ preventScroll: !0 }),
                        (x.current = null)));
                  },
                  onFocus: (I) => {
                    (I.target instanceof HTMLElement &&
                      I.target.dataset.dismissible === "false") ||
                      P.current ||
                      ((P.current = !0), (x.current = I.relatedTarget));
                  },
                  onMouseEnter: () => B(!0),
                  onMouseMove: () => B(!0),
                  onMouseLeave: () => {
                    Z || B(!1);
                  },
                  onDragEnd: () => B(!1),
                  onPointerDown: (I) => {
                    (I.target instanceof HTMLElement &&
                      I.target.dataset.dismissible === "false") ||
                      W(!0);
                  },
                  onPointerUp: () => W(!1),
                },
                _.filter(
                  (I) => (!I.position && k === 0) || I.position === T,
                ).map((I, wt) => {
                  var Be, Xe;
                  return E.createElement(gs, {
                    key: I.id,
                    icons: b,
                    index: wt,
                    toast: I,
                    defaultRichColors: d,
                    duration: (Be = p?.duration) != null ? Be : h,
                    className: p?.className,
                    descriptionClassName: p?.descriptionClassName,
                    invert: t,
                    visibleToasts: v,
                    closeButton: (Xe = p?.closeButton) != null ? Xe : i,
                    interacting: Z,
                    position: T,
                    style: p?.style,
                    unstyled: p?.unstyled,
                    classNames: p?.classNames,
                    cancelButtonStyle: p?.cancelButtonStyle,
                    actionButtonStyle: p?.actionButtonStyle,
                    removeToast: F,
                    toasts: _.filter((We) => We.position == I.position),
                    heights: j.filter((We) => We.position == I.position),
                    setHeights: N,
                    expandByDefault: a,
                    gap: y,
                    loadingIcon: w,
                    expanded: V,
                    pauseWhenPageIsHidden: C,
                    swipeDirections: e.swipeDirections,
                  });
                }),
              )
            : null;
        }),
      )
    );
  }),
  Nt,
  Hn;
function ws() {
  if (Hn) return Nt;
  Hn = 1;
  var e = !1,
    n,
    t,
    r,
    o,
    a,
    i,
    s,
    c,
    u,
    f,
    d,
    h,
    l,
    v,
    p;
  function m() {
    if (!e) {
      e = !0;
      var w = navigator.userAgent,
        b =
          /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(
            w,
          ),
        R = /(Mac OS X)|(Windows)|(Linux)/.exec(w);
      if (
        ((h = /\b(iPhone|iP[ao]d)/.exec(w)),
        (l = /\b(iP[ao]d)/.exec(w)),
        (f = /Android/i.exec(w)),
        (v = /FBAN\/\w+;/i.exec(w)),
        (p = /Mobile/i.exec(w)),
        (d = !!/Win64/.exec(w)),
        b)
      ) {
        ((n = b[1] ? parseFloat(b[1]) : b[5] ? parseFloat(b[5]) : NaN),
          n &&
            document &&
            document.documentMode &&
            (n = document.documentMode));
        var C = /(?:Trident\/(\d+.\d+))/.exec(w);
        ((i = C ? parseFloat(C[1]) + 4 : n),
          (t = b[2] ? parseFloat(b[2]) : NaN),
          (r = b[3] ? parseFloat(b[3]) : NaN),
          (o = b[4] ? parseFloat(b[4]) : NaN),
          o
            ? ((b = /(?:Chrome\/(\d+\.\d+))/.exec(w)),
              (a = b && b[1] ? parseFloat(b[1]) : NaN))
            : (a = NaN));
      } else n = t = r = a = o = NaN;
      if (R) {
        if (R[1]) {
          var _ = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(w);
          s = _ ? parseFloat(_[1].replace("_", ".")) : !0;
        } else s = !1;
        ((c = !!R[2]), (u = !!R[3]));
      } else s = c = u = !1;
    }
  }
  var y = {
    ie: function () {
      return m() || n;
    },
    ieCompatibilityMode: function () {
      return m() || i > n;
    },
    ie64: function () {
      return y.ie() && d;
    },
    firefox: function () {
      return m() || t;
    },
    opera: function () {
      return m() || r;
    },
    webkit: function () {
      return m() || o;
    },
    safari: function () {
      return y.webkit();
    },
    chrome: function () {
      return m() || a;
    },
    windows: function () {
      return m() || c;
    },
    osx: function () {
      return m() || s;
    },
    linux: function () {
      return m() || u;
    },
    iphone: function () {
      return m() || h;
    },
    mobile: function () {
      return m() || h || l || f || p;
    },
    nativeApp: function () {
      return m() || v;
    },
    android: function () {
      return m() || f;
    },
    ipad: function () {
      return m() || l;
    },
  };
  return ((Nt = y), Nt);
}
var Lt, Un;
function bs() {
  if (Un) return Lt;
  Un = 1;
  var e = !!(
      typeof window < "u" &&
      window.document &&
      window.document.createElement
    ),
    n = {
      canUseDOM: e,
      canUseWorkers: typeof Worker < "u",
      canUseEventListeners:
        e && !!(window.addEventListener || window.attachEvent),
      canUseViewport: e && !!window.screen,
      isInWorker: !e,
    };
  return ((Lt = n), Lt);
}
var zt, Vn;
function xs() {
  if (Vn) return zt;
  Vn = 1;
  var e = bs(),
    n;
  e.canUseDOM &&
    (n =
      document.implementation &&
      document.implementation.hasFeature &&
      document.implementation.hasFeature("", "") !== !0);
  /**
   * Checks if an event is supported in the current execution environment.
   *
   * NOTE: This will not work correctly for non-generic events such as `change`,
   * `reset`, `load`, `error`, and `select`.
   *
   * Borrows from Modernizr.
   *
   * @param {string} eventNameSuffix Event name, e.g. "click".
   * @param {?boolean} capture Check if the capture phase is supported.
   * @return {boolean} True if the event is supported.
   * @internal
   * @license Modernizr 3.0.0pre (Custom Build) | MIT
   */ function t(r, o) {
    if (!e.canUseDOM || (o && !("addEventListener" in document))) return !1;
    var a = "on" + r,
      i = a in document;
    if (!i) {
      var s = document.createElement("div");
      (s.setAttribute(a, "return;"), (i = typeof s[a] == "function"));
    }
    return (
      !i &&
        n &&
        r === "wheel" &&
        (i = document.implementation.hasFeature("Events.wheel", "3.0")),
      i
    );
  }
  return ((zt = t), zt);
}
var It, Yn;
function Ss() {
  if (Yn) return It;
  Yn = 1;
  var e = ws(),
    n = xs(),
    t = 10,
    r = 40,
    o = 800;
  function a(i) {
    var s = 0,
      c = 0,
      u = 0,
      f = 0;
    return (
      "detail" in i && (c = i.detail),
      "wheelDelta" in i && (c = -i.wheelDelta / 120),
      "wheelDeltaY" in i && (c = -i.wheelDeltaY / 120),
      "wheelDeltaX" in i && (s = -i.wheelDeltaX / 120),
      "axis" in i && i.axis === i.HORIZONTAL_AXIS && ((s = c), (c = 0)),
      (u = s * t),
      (f = c * t),
      "deltaY" in i && (f = i.deltaY),
      "deltaX" in i && (u = i.deltaX),
      (u || f) &&
        i.deltaMode &&
        (i.deltaMode == 1 ? ((u *= r), (f *= r)) : ((u *= o), (f *= o))),
      u && !s && (s = u < 1 ? -1 : 1),
      f && !c && (c = f < 1 ? -1 : 1),
      { spinX: s, spinY: c, pixelX: u, pixelY: f }
    );
  }
  return (
    (a.getEventType = function () {
      return e.firefox()
        ? "DOMMouseScroll"
        : n("wheel")
          ? "wheel"
          : "mousewheel";
    }),
    (It = a),
    It
  );
}
var jt, Zn;
function Cs() {
  return (Zn || ((Zn = 1), (jt = Ss())), jt);
}
var Es = Cs();
const Rs = po(Es);
function Ps(e, n, t, r, o, a) {
  a === void 0 && (a = 0);
  var i = Ne(e, n, a),
    s = i.width,
    c = i.height,
    u = Math.min(s, t),
    f = Math.min(c, r);
  return u > f * o ? { width: f * o, height: f } : { width: u, height: u / o };
}
function _s(e) {
  return e.width > e.height
    ? e.width / e.naturalWidth
    : e.height / e.naturalHeight;
}
function Fe(e, n, t, r, o) {
  o === void 0 && (o = 0);
  var a = Ne(n.width, n.height, o),
    i = a.width,
    s = a.height;
  return { x: qn(e.x, i, t.width, r), y: qn(e.y, s, t.height, r) };
}
function qn(e, n, t, r) {
  var o = (n * r) / 2 - t / 2;
  return yt(e, -o, o);
}
function Xn(e, n) {
  return Math.sqrt(Math.pow(e.y - n.y, 2) + Math.pow(e.x - n.x, 2));
}
function Gn(e, n) {
  return (Math.atan2(n.y - e.y, n.x - e.x) * 180) / Math.PI;
}
function Ts(e, n, t, r, o, a, i) {
  (a === void 0 && (a = 0), i === void 0 && (i = !0));
  var s = i ? Os : As,
    c = Ne(n.width, n.height, a),
    u = Ne(n.naturalWidth, n.naturalHeight, a),
    f = {
      x: s(100, (((c.width - t.width / o) / 2 - e.x / o) / c.width) * 100),
      y: s(100, (((c.height - t.height / o) / 2 - e.y / o) / c.height) * 100),
      width: s(100, ((t.width / c.width) * 100) / o),
      height: s(100, ((t.height / c.height) * 100) / o),
    },
    d = Math.round(s(u.width, (f.width * u.width) / 100)),
    h = Math.round(s(u.height, (f.height * u.height) / 100)),
    l = u.width >= u.height * r,
    v = l
      ? { width: Math.round(h * r), height: h }
      : { width: d, height: Math.round(d / r) },
    p = z(z({}, v), {
      x: Math.round(s(u.width - v.width, (f.x * u.width) / 100)),
      y: Math.round(s(u.height - v.height, (f.y * u.height) / 100)),
    });
  return { croppedAreaPercentages: f, croppedAreaPixels: p };
}
function Os(e, n) {
  return Math.min(e, Math.max(0, n));
}
function As(e, n) {
  return n;
}
function Ds(e, n, t, r, o, a) {
  var i = Ne(n.width, n.height, t),
    s = yt((r.width / i.width) * (100 / e.width), o, a),
    c = {
      x: (s * i.width) / 2 - r.width / 2 - i.width * s * (e.x / 100),
      y: (s * i.height) / 2 - r.height / 2 - i.height * s * (e.y / 100),
    };
  return { crop: c, zoom: s };
}
function Ms(e, n, t) {
  var r = _s(n);
  return t.height > t.width
    ? t.height / (e.height * r)
    : t.width / (e.width * r);
}
function ks(e, n, t, r, o, a) {
  t === void 0 && (t = 0);
  var i = Ne(n.naturalWidth, n.naturalHeight, t),
    s = yt(Ms(e, n, r), o, a),
    c = r.height > r.width ? r.height / e.height : r.width / e.width,
    u = {
      x: ((i.width - e.width) / 2 - e.x) * c,
      y: ((i.height - e.height) / 2 - e.y) * c,
    };
  return { crop: u, zoom: s };
}
function Kn(e, n) {
  return { x: (n.x + e.x) / 2, y: (n.y + e.y) / 2 };
}
function Ns(e) {
  return (e * Math.PI) / 180;
}
function Ne(e, n, t) {
  var r = Ns(t);
  return {
    width: Math.abs(Math.cos(r) * e) + Math.abs(Math.sin(r) * n),
    height: Math.abs(Math.sin(r) * e) + Math.abs(Math.cos(r) * n),
  };
}
function yt(e, n, t) {
  return Math.min(Math.max(e, n), t);
}
function rt() {
  for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
  return e
    .filter(function (t) {
      return typeof t == "string" && t.length > 0;
    })
    .join(" ")
    .trim();
}
var Ls = `.reactEasyCrop_Container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  user-select: none;
  touch-action: none;
  cursor: move;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reactEasyCrop_Image,
.reactEasyCrop_Video {
  will-change: transform; /* this improves performances and prevent painting issues on iOS Chrome */
}

.reactEasyCrop_Contain {
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.reactEasyCrop_Cover_Horizontal {
  width: 100%;
  height: auto;
}
.reactEasyCrop_Cover_Vertical {
  width: auto;
  height: 100%;
}

.reactEasyCrop_CropArea {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  box-shadow: 0 0 0 9999em;
  color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.reactEasyCrop_CropAreaRound {
  border-radius: 50%;
}

.reactEasyCrop_CropAreaGrid::before {
  content: ' ';
  box-sizing: border-box;
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.5);
  top: 0;
  bottom: 0;
  left: 33.33%;
  right: 33.33%;
  border-top: 0;
  border-bottom: 0;
}

.reactEasyCrop_CropAreaGrid::after {
  content: ' ';
  box-sizing: border-box;
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.5);
  top: 33.33%;
  bottom: 33.33%;
  left: 0;
  right: 0;
  border-left: 0;
  border-right: 0;
}
`,
  zs = 1,
  Is = 3,
  js = 1,
  cl = (function (e) {
    rn(n, e);
    function n() {
      var t = (e !== null && e.apply(this, arguments)) || this;
      return (
        (t.cropperRef = g.createRef()),
        (t.imageRef = g.createRef()),
        (t.videoRef = g.createRef()),
        (t.containerPosition = { x: 0, y: 0 }),
        (t.containerRef = null),
        (t.styleRef = null),
        (t.containerRect = null),
        (t.mediaSize = {
          width: 0,
          height: 0,
          naturalWidth: 0,
          naturalHeight: 0,
        }),
        (t.dragStartPosition = { x: 0, y: 0 }),
        (t.dragStartCrop = { x: 0, y: 0 }),
        (t.gestureZoomStart = 0),
        (t.gestureRotationStart = 0),
        (t.isTouching = !1),
        (t.lastPinchDistance = 0),
        (t.lastPinchRotation = 0),
        (t.rafDragTimeout = null),
        (t.rafPinchTimeout = null),
        (t.wheelTimer = null),
        (t.currentDoc = typeof document < "u" ? document : null),
        (t.currentWindow = typeof window < "u" ? window : null),
        (t.resizeObserver = null),
        (t.previousCropSize = null),
        (t.isInitialized = !1),
        (t.state = {
          cropSize: null,
          hasWheelJustStarted: !1,
          mediaObjectFit: void 0,
        }),
        (t.initResizeObserver = function () {
          if (!(typeof window.ResizeObserver > "u" || !t.containerRef)) {
            var r = !0;
            ((t.resizeObserver = new window.ResizeObserver(function (o) {
              if (r) {
                r = !1;
                return;
              }
              t.computeSizes();
            })),
              t.resizeObserver.observe(t.containerRef));
          }
        }),
        (t.preventZoomSafari = function (r) {
          return r.preventDefault();
        }),
        (t.cleanEvents = function () {
          t.currentDoc &&
            (t.currentDoc.removeEventListener("mousemove", t.onMouseMove),
            t.currentDoc.removeEventListener("mouseup", t.onDragStopped),
            t.currentDoc.removeEventListener("touchmove", t.onTouchMove),
            t.currentDoc.removeEventListener("touchend", t.onDragStopped),
            t.currentDoc.removeEventListener(
              "gesturechange",
              t.onGestureChange,
            ),
            t.currentDoc.removeEventListener("gestureend", t.onGestureEnd),
            t.currentDoc.removeEventListener("scroll", t.onScroll));
        }),
        (t.clearScrollEvent = function () {
          (t.containerRef &&
            t.containerRef.removeEventListener("wheel", t.onWheel),
            t.wheelTimer && clearTimeout(t.wheelTimer));
        }),
        (t.onMediaLoad = function () {
          var r = t.computeSizes();
          (r &&
            ((t.previousCropSize = r),
            t.emitCropData(),
            t.setInitialCrop(r),
            (t.isInitialized = !0)),
            t.props.onMediaLoaded && t.props.onMediaLoaded(t.mediaSize));
        }),
        (t.setInitialCrop = function (r) {
          if (t.props.initialCroppedAreaPercentages) {
            var o = Ds(
                t.props.initialCroppedAreaPercentages,
                t.mediaSize,
                t.props.rotation,
                r,
                t.props.minZoom,
                t.props.maxZoom,
              ),
              a = o.crop,
              i = o.zoom;
            (t.props.onCropChange(a),
              t.props.onZoomChange && t.props.onZoomChange(i));
          } else if (t.props.initialCroppedAreaPixels) {
            var s = ks(
                t.props.initialCroppedAreaPixels,
                t.mediaSize,
                t.props.rotation,
                r,
                t.props.minZoom,
                t.props.maxZoom,
              ),
              a = s.crop,
              i = s.zoom;
            (t.props.onCropChange(a),
              t.props.onZoomChange && t.props.onZoomChange(i));
          }
        }),
        (t.computeSizes = function () {
          var r,
            o,
            a,
            i,
            s,
            c,
            u = t.imageRef.current || t.videoRef.current;
          if (u && t.containerRef) {
            ((t.containerRect = t.containerRef.getBoundingClientRect()),
              t.saveContainerPosition());
            var f = t.containerRect.width / t.containerRect.height,
              d =
                ((r = t.imageRef.current) === null || r === void 0
                  ? void 0
                  : r.naturalWidth) ||
                ((o = t.videoRef.current) === null || o === void 0
                  ? void 0
                  : o.videoWidth) ||
                0,
              h =
                ((a = t.imageRef.current) === null || a === void 0
                  ? void 0
                  : a.naturalHeight) ||
                ((i = t.videoRef.current) === null || i === void 0
                  ? void 0
                  : i.videoHeight) ||
                0,
              l = u.offsetWidth < d || u.offsetHeight < h,
              v = d / h,
              p = void 0;
            if (l)
              switch (t.state.mediaObjectFit) {
                default:
                case "contain":
                  p =
                    f > v
                      ? {
                          width: t.containerRect.height * v,
                          height: t.containerRect.height,
                        }
                      : {
                          width: t.containerRect.width,
                          height: t.containerRect.width / v,
                        };
                  break;
                case "horizontal-cover":
                  p = {
                    width: t.containerRect.width,
                    height: t.containerRect.width / v,
                  };
                  break;
                case "vertical-cover":
                  p = {
                    width: t.containerRect.height * v,
                    height: t.containerRect.height,
                  };
                  break;
              }
            else p = { width: u.offsetWidth, height: u.offsetHeight };
            ((t.mediaSize = z(z({}, p), { naturalWidth: d, naturalHeight: h })),
              t.props.setMediaSize && t.props.setMediaSize(t.mediaSize));
            var m = t.props.cropSize
              ? t.props.cropSize
              : Ps(
                  t.mediaSize.width,
                  t.mediaSize.height,
                  t.containerRect.width,
                  t.containerRect.height,
                  t.props.aspect,
                  t.props.rotation,
                );
            return (
              (((s = t.state.cropSize) === null || s === void 0
                ? void 0
                : s.height) !== m.height ||
                ((c = t.state.cropSize) === null || c === void 0
                  ? void 0
                  : c.width) !== m.width) &&
                t.props.onCropSizeChange &&
                t.props.onCropSizeChange(m),
              t.setState({ cropSize: m }, t.recomputeCropPosition),
              t.props.setCropSize && t.props.setCropSize(m),
              m
            );
          }
        }),
        (t.saveContainerPosition = function () {
          if (t.containerRef) {
            var r = t.containerRef.getBoundingClientRect();
            t.containerPosition = { x: r.left, y: r.top };
          }
        }),
        (t.onMouseDown = function (r) {
          t.currentDoc &&
            (r.preventDefault(),
            t.currentDoc.addEventListener("mousemove", t.onMouseMove),
            t.currentDoc.addEventListener("mouseup", t.onDragStopped),
            t.saveContainerPosition(),
            t.onDragStart(n.getMousePoint(r)));
        }),
        (t.onMouseMove = function (r) {
          return t.onDrag(n.getMousePoint(r));
        }),
        (t.onScroll = function (r) {
          t.currentDoc && (r.preventDefault(), t.saveContainerPosition());
        }),
        (t.onTouchStart = function (r) {
          t.currentDoc &&
            ((t.isTouching = !0),
            !(t.props.onTouchRequest && !t.props.onTouchRequest(r)) &&
              (t.currentDoc.addEventListener("touchmove", t.onTouchMove, {
                passive: !1,
              }),
              t.currentDoc.addEventListener("touchend", t.onDragStopped),
              t.saveContainerPosition(),
              r.touches.length === 2
                ? t.onPinchStart(r)
                : r.touches.length === 1 &&
                  t.onDragStart(n.getTouchPoint(r.touches[0]))));
        }),
        (t.onTouchMove = function (r) {
          (r.preventDefault(),
            r.touches.length === 2
              ? t.onPinchMove(r)
              : r.touches.length === 1 &&
                t.onDrag(n.getTouchPoint(r.touches[0])));
        }),
        (t.onGestureStart = function (r) {
          t.currentDoc &&
            (r.preventDefault(),
            t.currentDoc.addEventListener("gesturechange", t.onGestureChange),
            t.currentDoc.addEventListener("gestureend", t.onGestureEnd),
            (t.gestureZoomStart = t.props.zoom),
            (t.gestureRotationStart = t.props.rotation));
        }),
        (t.onGestureChange = function (r) {
          if ((r.preventDefault(), !t.isTouching)) {
            var o = n.getMousePoint(r),
              a = t.gestureZoomStart - 1 + r.scale;
            if (
              (t.setNewZoom(a, o, { shouldUpdatePosition: !0 }),
              t.props.onRotationChange)
            ) {
              var i = t.gestureRotationStart + r.rotation;
              t.props.onRotationChange(i);
            }
          }
        }),
        (t.onGestureEnd = function (r) {
          t.cleanEvents();
        }),
        (t.onDragStart = function (r) {
          var o,
            a,
            i = r.x,
            s = r.y;
          ((t.dragStartPosition = { x: i, y: s }),
            (t.dragStartCrop = z({}, t.props.crop)),
            (a = (o = t.props).onInteractionStart) === null ||
              a === void 0 ||
              a.call(o));
        }),
        (t.onDrag = function (r) {
          var o = r.x,
            a = r.y;
          t.currentWindow &&
            (t.rafDragTimeout &&
              t.currentWindow.cancelAnimationFrame(t.rafDragTimeout),
            (t.rafDragTimeout = t.currentWindow.requestAnimationFrame(
              function () {
                if (t.state.cropSize && !(o === void 0 || a === void 0)) {
                  var i = o - t.dragStartPosition.x,
                    s = a - t.dragStartPosition.y,
                    c = { x: t.dragStartCrop.x + i, y: t.dragStartCrop.y + s },
                    u = t.props.restrictPosition
                      ? Fe(
                          c,
                          t.mediaSize,
                          t.state.cropSize,
                          t.props.zoom,
                          t.props.rotation,
                        )
                      : c;
                  t.props.onCropChange(u);
                }
              },
            )));
        }),
        (t.onDragStopped = function () {
          var r, o;
          ((t.isTouching = !1),
            t.cleanEvents(),
            t.emitCropData(),
            (o = (r = t.props).onInteractionEnd) === null ||
              o === void 0 ||
              o.call(r));
        }),
        (t.onWheel = function (r) {
          if (
            t.currentWindow &&
            !(t.props.onWheelRequest && !t.props.onWheelRequest(r))
          ) {
            r.preventDefault();
            var o = n.getMousePoint(r),
              a = Rs(r).pixelY,
              i = t.props.zoom - (a * t.props.zoomSpeed) / 200;
            (t.setNewZoom(i, o, { shouldUpdatePosition: !0 }),
              t.state.hasWheelJustStarted ||
                t.setState({ hasWheelJustStarted: !0 }, function () {
                  var s, c;
                  return (c = (s = t.props).onInteractionStart) === null ||
                    c === void 0
                    ? void 0
                    : c.call(s);
                }),
              t.wheelTimer && clearTimeout(t.wheelTimer),
              (t.wheelTimer = t.currentWindow.setTimeout(function () {
                return t.setState({ hasWheelJustStarted: !1 }, function () {
                  var s, c;
                  return (c = (s = t.props).onInteractionEnd) === null ||
                    c === void 0
                    ? void 0
                    : c.call(s);
                });
              }, 250)));
          }
        }),
        (t.getPointOnContainer = function (r, o) {
          var a = r.x,
            i = r.y;
          if (!t.containerRect) throw new Error("The Cropper is not mounted");
          return {
            x: t.containerRect.width / 2 - (a - o.x),
            y: t.containerRect.height / 2 - (i - o.y),
          };
        }),
        (t.getPointOnMedia = function (r) {
          var o = r.x,
            a = r.y,
            i = t.props,
            s = i.crop,
            c = i.zoom;
          return { x: (o + s.x) / c, y: (a + s.y) / c };
        }),
        (t.setNewZoom = function (r, o, a) {
          var i = a === void 0 ? {} : a,
            s = i.shouldUpdatePosition,
            c = s === void 0 ? !0 : s;
          if (!(!t.state.cropSize || !t.props.onZoomChange)) {
            var u = yt(r, t.props.minZoom, t.props.maxZoom);
            if (c) {
              var f = t.getPointOnContainer(o, t.containerPosition),
                d = t.getPointOnMedia(f),
                h = { x: d.x * u - f.x, y: d.y * u - f.y },
                l = t.props.restrictPosition
                  ? Fe(h, t.mediaSize, t.state.cropSize, u, t.props.rotation)
                  : h;
              t.props.onCropChange(l);
            }
            t.props.onZoomChange(u);
          }
        }),
        (t.getCropData = function () {
          if (!t.state.cropSize) return null;
          var r = t.props.restrictPosition
            ? Fe(
                t.props.crop,
                t.mediaSize,
                t.state.cropSize,
                t.props.zoom,
                t.props.rotation,
              )
            : t.props.crop;
          return Ts(
            r,
            t.mediaSize,
            t.state.cropSize,
            t.getAspect(),
            t.props.zoom,
            t.props.rotation,
            t.props.restrictPosition,
          );
        }),
        (t.emitCropData = function () {
          var r = t.getCropData();
          if (r) {
            var o = r.croppedAreaPercentages,
              a = r.croppedAreaPixels;
            (t.props.onCropComplete && t.props.onCropComplete(o, a),
              t.props.onCropAreaChange && t.props.onCropAreaChange(o, a));
          }
        }),
        (t.emitCropAreaChange = function () {
          var r = t.getCropData();
          if (r) {
            var o = r.croppedAreaPercentages,
              a = r.croppedAreaPixels;
            t.props.onCropAreaChange && t.props.onCropAreaChange(o, a);
          }
        }),
        (t.recomputeCropPosition = function () {
          if (t.state.cropSize) {
            var r = t.props.crop;
            if (t.isInitialized && t.previousCropSize) {
              var o =
                Math.abs(t.previousCropSize.width - t.state.cropSize.width) >
                  1e-6 ||
                Math.abs(t.previousCropSize.height - t.state.cropSize.height) >
                  1e-6;
              if (o) {
                var a = t.state.cropSize.width / t.previousCropSize.width,
                  i = t.state.cropSize.height / t.previousCropSize.height;
                r = { x: t.props.crop.x * a, y: t.props.crop.y * i };
              }
            }
            var s = t.props.restrictPosition
              ? Fe(
                  r,
                  t.mediaSize,
                  t.state.cropSize,
                  t.props.zoom,
                  t.props.rotation,
                )
              : r;
            ((t.previousCropSize = t.state.cropSize),
              t.props.onCropChange(s),
              t.emitCropData());
          }
        }),
        (t.onKeyDown = function (r) {
          var o,
            a,
            i = t.props,
            s = i.crop,
            c = i.onCropChange,
            u = i.keyboardStep,
            f = i.zoom,
            d = i.rotation,
            h = u;
          if (t.state.cropSize) {
            r.shiftKey && (h *= 0.2);
            var l = z({}, s);
            switch (r.key) {
              case "ArrowUp":
                ((l.y -= h), r.preventDefault());
                break;
              case "ArrowDown":
                ((l.y += h), r.preventDefault());
                break;
              case "ArrowLeft":
                ((l.x -= h), r.preventDefault());
                break;
              case "ArrowRight":
                ((l.x += h), r.preventDefault());
                break;
              default:
                return;
            }
            (t.props.restrictPosition &&
              (l = Fe(l, t.mediaSize, t.state.cropSize, f, d)),
              r.repeat ||
                (a = (o = t.props).onInteractionStart) === null ||
                a === void 0 ||
                a.call(o),
              c(l));
          }
        }),
        (t.onKeyUp = function (r) {
          var o, a;
          switch (r.key) {
            case "ArrowUp":
            case "ArrowDown":
            case "ArrowLeft":
            case "ArrowRight":
              r.preventDefault();
              break;
            default:
              return;
          }
          (t.emitCropData(),
            (a = (o = t.props).onInteractionEnd) === null ||
              a === void 0 ||
              a.call(o));
        }),
        t
      );
    }
    return (
      (n.prototype.componentDidMount = function () {
        !this.currentDoc ||
          !this.currentWindow ||
          (this.containerRef &&
            (this.containerRef.ownerDocument &&
              (this.currentDoc = this.containerRef.ownerDocument),
            this.currentDoc.defaultView &&
              (this.currentWindow = this.currentDoc.defaultView),
            this.initResizeObserver(),
            typeof window.ResizeObserver > "u" &&
              this.currentWindow.addEventListener("resize", this.computeSizes),
            this.props.zoomWithScroll &&
              this.containerRef.addEventListener("wheel", this.onWheel, {
                passive: !1,
              }),
            this.containerRef.addEventListener(
              "gesturestart",
              this.onGestureStart,
            )),
          this.currentDoc.addEventListener("scroll", this.onScroll),
          this.props.disableAutomaticStylesInjection ||
            ((this.styleRef = this.currentDoc.createElement("style")),
            this.styleRef.setAttribute("type", "text/css"),
            this.props.nonce &&
              this.styleRef.setAttribute("nonce", this.props.nonce),
            (this.styleRef.innerHTML = Ls),
            this.currentDoc.head.appendChild(this.styleRef)),
          this.imageRef.current &&
            this.imageRef.current.complete &&
            this.onMediaLoad(),
          this.props.setImageRef && this.props.setImageRef(this.imageRef),
          this.props.setVideoRef && this.props.setVideoRef(this.videoRef),
          this.props.setCropperRef &&
            this.props.setCropperRef(this.cropperRef));
      }),
      (n.prototype.componentWillUnmount = function () {
        var t, r;
        !this.currentDoc ||
          !this.currentWindow ||
          (typeof window.ResizeObserver > "u" &&
            this.currentWindow.removeEventListener("resize", this.computeSizes),
          (t = this.resizeObserver) === null || t === void 0 || t.disconnect(),
          this.containerRef &&
            this.containerRef.removeEventListener(
              "gesturestart",
              this.preventZoomSafari,
            ),
          this.styleRef &&
            ((r = this.styleRef.parentNode) === null ||
              r === void 0 ||
              r.removeChild(this.styleRef)),
          this.cleanEvents(),
          this.props.zoomWithScroll && this.clearScrollEvent());
      }),
      (n.prototype.componentDidUpdate = function (t) {
        var r, o, a, i, s, c, u, f, d;
        (t.rotation !== this.props.rotation
          ? (this.computeSizes(), this.recomputeCropPosition())
          : t.aspect !== this.props.aspect
            ? this.computeSizes()
            : t.objectFit !== this.props.objectFit
              ? this.computeSizes()
              : t.zoom !== this.props.zoom
                ? this.recomputeCropPosition()
                : ((r = t.cropSize) === null || r === void 0
                      ? void 0
                      : r.height) !==
                      ((o = this.props.cropSize) === null || o === void 0
                        ? void 0
                        : o.height) ||
                    ((a = t.cropSize) === null || a === void 0
                      ? void 0
                      : a.width) !==
                      ((i = this.props.cropSize) === null || i === void 0
                        ? void 0
                        : i.width)
                  ? this.computeSizes()
                  : (((s = t.crop) === null || s === void 0 ? void 0 : s.x) !==
                      ((c = this.props.crop) === null || c === void 0
                        ? void 0
                        : c.x) ||
                      ((u = t.crop) === null || u === void 0 ? void 0 : u.y) !==
                        ((f = this.props.crop) === null || f === void 0
                          ? void 0
                          : f.y)) &&
                    this.emitCropAreaChange(),
          t.zoomWithScroll !== this.props.zoomWithScroll &&
            this.containerRef &&
            (this.props.zoomWithScroll
              ? this.containerRef.addEventListener("wheel", this.onWheel, {
                  passive: !1,
                })
              : this.clearScrollEvent()),
          t.video !== this.props.video &&
            ((d = this.videoRef.current) === null || d === void 0 || d.load()));
        var h = this.getObjectFit();
        h !== this.state.mediaObjectFit &&
          this.setState({ mediaObjectFit: h }, this.computeSizes);
      }),
      (n.prototype.getAspect = function () {
        var t = this.props,
          r = t.cropSize,
          o = t.aspect;
        return r ? r.width / r.height : o;
      }),
      (n.prototype.getObjectFit = function () {
        var t, r, o, a;
        if (this.props.objectFit === "cover") {
          var i = this.imageRef.current || this.videoRef.current;
          if (i && this.containerRef) {
            this.containerRect = this.containerRef.getBoundingClientRect();
            var s = this.containerRect.width / this.containerRect.height,
              c =
                ((t = this.imageRef.current) === null || t === void 0
                  ? void 0
                  : t.naturalWidth) ||
                ((r = this.videoRef.current) === null || r === void 0
                  ? void 0
                  : r.videoWidth) ||
                0,
              u =
                ((o = this.imageRef.current) === null || o === void 0
                  ? void 0
                  : o.naturalHeight) ||
                ((a = this.videoRef.current) === null || a === void 0
                  ? void 0
                  : a.videoHeight) ||
                0,
              f = c / u;
            return f < s ? "horizontal-cover" : "vertical-cover";
          }
          return "horizontal-cover";
        }
        return this.props.objectFit;
      }),
      (n.prototype.onPinchStart = function (t) {
        var r = n.getTouchPoint(t.touches[0]),
          o = n.getTouchPoint(t.touches[1]);
        ((this.lastPinchDistance = Xn(r, o)),
          (this.lastPinchRotation = Gn(r, o)),
          this.onDragStart(Kn(r, o)));
      }),
      (n.prototype.onPinchMove = function (t) {
        var r = this;
        if (!(!this.currentDoc || !this.currentWindow)) {
          var o = n.getTouchPoint(t.touches[0]),
            a = n.getTouchPoint(t.touches[1]),
            i = Kn(o, a);
          (this.onDrag(i),
            this.rafPinchTimeout &&
              this.currentWindow.cancelAnimationFrame(this.rafPinchTimeout),
            (this.rafPinchTimeout = this.currentWindow.requestAnimationFrame(
              function () {
                var s = Xn(o, a),
                  c = r.props.zoom * (s / r.lastPinchDistance);
                (r.setNewZoom(c, i, { shouldUpdatePosition: !1 }),
                  (r.lastPinchDistance = s));
                var u = Gn(o, a),
                  f = r.props.rotation + (u - r.lastPinchRotation);
                (r.props.onRotationChange && r.props.onRotationChange(f),
                  (r.lastPinchRotation = u));
              },
            )));
        }
      }),
      (n.prototype.render = function () {
        var t = this,
          r,
          o = this.props,
          a = o.image,
          i = o.video,
          s = o.mediaProps,
          c = o.cropperProps,
          u = o.transform,
          f = o.crop,
          d = f.x,
          h = f.y,
          l = o.rotation,
          v = o.zoom,
          p = o.cropShape,
          m = o.showGrid,
          y = o.roundCropAreaPixels,
          w = o.style,
          b = w.containerStyle,
          R = w.cropAreaStyle,
          C = w.mediaStyle,
          _ = o.classes,
          A = _.containerClassName,
          D = _.cropAreaClassName,
          j = _.mediaClassName,
          N =
            (r = this.state.mediaObjectFit) !== null && r !== void 0
              ? r
              : this.getObjectFit();
        return g.createElement(
          "div",
          {
            onMouseDown: this.onMouseDown,
            onTouchStart: this.onTouchStart,
            ref: function (B) {
              return (t.containerRef = B);
            },
            "data-testid": "container",
            style: b,
            className: rt("reactEasyCrop_Container", A),
          },
          a
            ? g.createElement(
                "img",
                z(
                  {
                    alt: "",
                    className: rt(
                      "reactEasyCrop_Image",
                      N === "contain" && "reactEasyCrop_Contain",
                      N === "horizontal-cover" &&
                        "reactEasyCrop_Cover_Horizontal",
                      N === "vertical-cover" && "reactEasyCrop_Cover_Vertical",
                      j,
                    ),
                  },
                  s,
                  {
                    src: a,
                    ref: this.imageRef,
                    style: z(z({}, C), {
                      transform:
                        u ||
                        "translate("
                          .concat(d, "px, ")
                          .concat(h, "px) rotate(")
                          .concat(l, "deg) scale(")
                          .concat(v, ")"),
                    }),
                    onLoad: this.onMediaLoad,
                  },
                ),
              )
            : i &&
                g.createElement(
                  "video",
                  z(
                    {
                      autoPlay: !0,
                      playsInline: !0,
                      loop: !0,
                      muted: !0,
                      className: rt(
                        "reactEasyCrop_Video",
                        N === "contain" && "reactEasyCrop_Contain",
                        N === "horizontal-cover" &&
                          "reactEasyCrop_Cover_Horizontal",
                        N === "vertical-cover" &&
                          "reactEasyCrop_Cover_Vertical",
                        j,
                      ),
                    },
                    s,
                    {
                      ref: this.videoRef,
                      onLoadedMetadata: this.onMediaLoad,
                      style: z(z({}, C), {
                        transform:
                          u ||
                          "translate("
                            .concat(d, "px, ")
                            .concat(h, "px) rotate(")
                            .concat(l, "deg) scale(")
                            .concat(v, ")"),
                      }),
                      controls: !1,
                    },
                  ),
                  (Array.isArray(i) ? i : [{ src: i }]).map(function (V) {
                    return g.createElement("source", z({ key: V.src }, V));
                  }),
                ),
          this.state.cropSize &&
            g.createElement(
              "div",
              z(
                {
                  ref: this.cropperRef,
                  style: z(z({}, R), {
                    width: y
                      ? Math.round(this.state.cropSize.width)
                      : this.state.cropSize.width,
                    height: y
                      ? Math.round(this.state.cropSize.height)
                      : this.state.cropSize.height,
                  }),
                  tabIndex: 0,
                  onKeyDown: this.onKeyDown,
                  onKeyUp: this.onKeyUp,
                  "data-testid": "cropper",
                  className: rt(
                    "reactEasyCrop_CropArea",
                    p === "round" && "reactEasyCrop_CropAreaRound",
                    m && "reactEasyCrop_CropAreaGrid",
                    D,
                  ),
                },
                c,
              ),
            ),
        );
      }),
      (n.defaultProps = {
        zoom: 1,
        rotation: 0,
        aspect: 4 / 3,
        maxZoom: Is,
        minZoom: zs,
        cropShape: "rect",
        objectFit: "contain",
        showGrid: !0,
        style: {},
        classes: {},
        mediaProps: {},
        cropperProps: {},
        zoomSpeed: 1,
        restrictPosition: !0,
        zoomWithScroll: !0,
        keyboardStep: js,
      }),
      (n.getMousePoint = function (t) {
        return { x: Number(t.clientX), y: Number(t.clientY) };
      }),
      (n.getTouchPoint = function (t) {
        return { x: Number(t.clientX), y: Number(t.clientY) };
      }),
      n
    );
  })(g.Component);
export {
  ll as $,
  il as A,
  Zs as B,
  oa as C,
  cl as D,
  Us as E,
  ze as N,
  ji as R,
  Or as _,
  qs as a,
  Gs as b,
  nl as c,
  Js as d,
  Qs as e,
  Ks as f,
  po as g,
  rl as h,
  el as i,
  nr as j,
  Hs as k,
  tl as l,
  Xt as m,
  Uo as n,
  Xs as o,
  Qn as p,
  $s as q,
  Ws as r,
  ol as s,
  Vs as t,
  Fs as u,
  Ys as v,
  mo as w,
  sl as x,
  mt as y,
  al as z,
};
