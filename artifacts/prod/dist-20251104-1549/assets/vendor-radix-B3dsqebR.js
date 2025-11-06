import {
  r as s,
  j as l,
  R as Vo,
  b as rt,
  o as be,
  u as Da,
  c as Na,
  s as Oa,
  f as ja,
  d as La,
  e as ka,
  h as Fa,
  l as $a,
  v as Ba,
} from "./vendor-react-BgpSLK3q.js";
import { a as Ha, R as st, h as at, s as Va } from "./vendor-MRMtI2Il.js";
function b(e, o, { checkForDefaultPrevented: t = !0 } = {}) {
  return function (r) {
    if ((e?.(r), t === !1 || !r.defaultPrevented)) return o?.(r);
  };
}
function Ao(e, o) {
  if (typeof e == "function") return e(o);
  e != null && (e.current = o);
}
function it(...e) {
  return (o) => {
    let t = !1;
    const n = e.map((r) => {
      const a = Ao(r, o);
      return (!t && typeof a == "function" && (t = !0), a);
    });
    if (t)
      return () => {
        for (let r = 0; r < n.length; r++) {
          const a = n[r];
          typeof a == "function" ? a() : Ao(e[r], null);
        }
      };
  };
}
function I(...e) {
  return s.useCallback(it(...e), e);
}
function Ka(e, o) {
  const t = s.createContext(o),
    n = (a) => {
      const { children: i, ...c } = a,
        u = s.useMemo(() => c, Object.values(c));
      return l.jsx(t.Provider, { value: u, children: i });
    };
  n.displayName = e + "Provider";
  function r(a) {
    const i = s.useContext(t);
    if (i) return i;
    if (o !== void 0) return o;
    throw new Error(`\`${a}\` must be used within \`${e}\``);
  }
  return [n, r];
}
function q(e, o = []) {
  let t = [];
  function n(a, i) {
    const c = s.createContext(i),
      u = t.length;
    t = [...t, i];
    const d = (p) => {
      const { scope: v, children: g, ...x } = p,
        m = v?.[e]?.[u] || c,
        h = s.useMemo(() => x, Object.values(x));
      return l.jsx(m.Provider, { value: h, children: g });
    };
    d.displayName = a + "Provider";
    function f(p, v) {
      const g = v?.[e]?.[u] || c,
        x = s.useContext(g);
      if (x) return x;
      if (i !== void 0) return i;
      throw new Error(`\`${p}\` must be used within \`${a}\``);
    }
    return [d, f];
  }
  const r = () => {
    const a = t.map((i) => s.createContext(i));
    return function (c) {
      const u = c?.[e] || a;
      return s.useMemo(() => ({ [`__scope${e}`]: { ...c, [e]: u } }), [c, u]);
    };
  };
  return ((r.scopeName = e), [n, Ua(r, ...o)]);
}
function Ua(...e) {
  const o = e[0];
  if (e.length === 1) return o;
  const t = () => {
    const n = e.map((r) => ({ useScope: r(), scopeName: r.scopeName }));
    return function (a) {
      const i = n.reduce((c, { useScope: u, scopeName: d }) => {
        const p = u(a)[`__scope${d}`];
        return { ...c, ...p };
      }, {});
      return s.useMemo(() => ({ [`__scope${o.scopeName}`]: i }), [i]);
    };
  };
  return ((t.scopeName = o.scopeName), t);
}
var G = globalThis?.document ? s.useLayoutEffect : () => {},
  Wa = Vo[" useInsertionEffect ".trim().toString()] || G;
function le({ prop: e, defaultProp: o, onChange: t = () => {}, caller: n }) {
  const [r, a, i] = Ga({ defaultProp: o, onChange: t }),
    c = e !== void 0,
    u = c ? e : r;
  {
    const f = s.useRef(e !== void 0);
    s.useEffect(() => {
      const p = f.current;
      (p !== c &&
        console.warn(
          `${n} is changing from ${p ? "controlled" : "uncontrolled"} to ${c ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
        ),
        (f.current = c));
    }, [c, n]);
  }
  const d = s.useCallback(
    (f) => {
      if (c) {
        const p = za(f) ? f(e) : f;
        p !== e && i.current?.(p);
      } else a(f);
    },
    [c, e, a, i],
  );
  return [u, d];
}
function Ga({ defaultProp: e, onChange: o }) {
  const [t, n] = s.useState(e),
    r = s.useRef(t),
    a = s.useRef(o);
  return (
    Wa(() => {
      a.current = o;
    }, [o]),
    s.useEffect(() => {
      r.current !== t && (a.current?.(t), (r.current = t));
    }, [t, r]),
    [t, n, a]
  );
}
function za(e) {
  return typeof e == "function";
}
function he(e) {
  const o = Ya(e),
    t = s.forwardRef((n, r) => {
      const { children: a, ...i } = n,
        c = s.Children.toArray(a),
        u = c.find(Xa);
      if (u) {
        const d = u.props.children,
          f = c.map((p) =>
            p === u
              ? s.Children.count(d) > 1
                ? s.Children.only(null)
                : s.isValidElement(d)
                  ? d.props.children
                  : null
              : p,
          );
        return l.jsx(o, {
          ...i,
          ref: r,
          children: s.isValidElement(d) ? s.cloneElement(d, void 0, f) : null,
        });
      }
      return l.jsx(o, { ...i, ref: r, children: a });
    });
  return ((t.displayName = `${e}.Slot`), t);
}
var Ed = he("Slot");
function Ya(e) {
  const o = s.forwardRef((t, n) => {
    const { children: r, ...a } = t;
    if (s.isValidElement(r)) {
      const i = Za(r),
        c = qa(a, r.props);
      return (
        r.type !== s.Fragment && (c.ref = n ? it(n, i) : i),
        s.cloneElement(r, c)
      );
    }
    return s.Children.count(r) > 1 ? s.Children.only(null) : null;
  });
  return ((o.displayName = `${e}.SlotClone`), o);
}
var Ko = Symbol("radix.slottable");
function Uo(e) {
  const o = ({ children: t }) => l.jsx(l.Fragment, { children: t });
  return ((o.displayName = `${e}.Slottable`), (o.__radixId = Ko), o);
}
function Xa(e) {
  return (
    s.isValidElement(e) &&
    typeof e.type == "function" &&
    "__radixId" in e.type &&
    e.type.__radixId === Ko
  );
}
function qa(e, o) {
  const t = { ...o };
  for (const n in o) {
    const r = e[n],
      a = o[n];
    /^on[A-Z]/.test(n)
      ? r && a
        ? (t[n] = (...c) => {
            const u = a(...c);
            return (r(...c), u);
          })
        : r && (t[n] = r)
      : n === "style"
        ? (t[n] = { ...r, ...a })
        : n === "className" && (t[n] = [r, a].filter(Boolean).join(" "));
  }
  return { ...e, ...t };
}
function Za(e) {
  let o = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
    t = o && "isReactWarning" in o && o.isReactWarning;
  return t
    ? e.ref
    : ((o = Object.getOwnPropertyDescriptor(e, "ref")?.get),
      (t = o && "isReactWarning" in o && o.isReactWarning),
      t ? e.props.ref : e.props.ref || e.ref);
}
var Ja = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul",
  ],
  E = Ja.reduce((e, o) => {
    const t = he(`Primitive.${o}`),
      n = s.forwardRef((r, a) => {
        const { asChild: i, ...c } = r,
          u = i ? t : o;
        return (
          typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
          l.jsx(u, { ...c, ref: a })
        );
      });
    return ((n.displayName = `Primitive.${o}`), { ...e, [o]: n });
  }, {});
function to(e, o) {
  e && rt.flushSync(() => e.dispatchEvent(o));
}
function Ve(e) {
  const o = e + "CollectionProvider",
    [t, n] = q(o),
    [r, a] = t(o, { collectionRef: { current: null }, itemMap: new Map() }),
    i = (m) => {
      const { scope: h, children: w } = m,
        S = be.useRef(null),
        C = be.useRef(new Map()).current;
      return l.jsx(r, { scope: h, itemMap: C, collectionRef: S, children: w });
    };
  i.displayName = o;
  const c = e + "CollectionSlot",
    u = he(c),
    d = be.forwardRef((m, h) => {
      const { scope: w, children: S } = m,
        C = a(c, w),
        y = I(h, C.collectionRef);
      return l.jsx(u, { ref: y, children: S });
    });
  d.displayName = c;
  const f = e + "CollectionItemSlot",
    p = "data-radix-collection-item",
    v = he(f),
    g = be.forwardRef((m, h) => {
      const { scope: w, children: S, ...C } = m,
        y = be.useRef(null),
        _ = I(h, y),
        D = a(f, w);
      return (
        be.useEffect(
          () => (
            D.itemMap.set(y, { ref: y, ...C }),
            () => void D.itemMap.delete(y)
          ),
        ),
        l.jsx(v, { [p]: "", ref: _, children: S })
      );
    });
  g.displayName = f;
  function x(m) {
    const h = a(e + "CollectionConsumer", m);
    return be.useCallback(() => {
      const S = h.collectionRef.current;
      if (!S) return [];
      const C = Array.from(S.querySelectorAll(`[${p}]`));
      return Array.from(h.itemMap.values()).sort(
        (D, P) => C.indexOf(D.ref.current) - C.indexOf(P.ref.current),
      );
    }, [h.collectionRef, h.itemMap]);
  }
  return [{ Provider: i, Slot: d, ItemSlot: g }, x, n];
}
var Qa = s.createContext(void 0);
function Ne(e) {
  const o = s.useContext(Qa);
  return e || o || "ltr";
}
function W(e) {
  const o = s.useRef(e);
  return (
    s.useEffect(() => {
      o.current = e;
    }),
    s.useMemo(
      () =>
        (...t) =>
          o.current?.(...t),
      [],
    )
  );
}
function ei(e, o = globalThis?.document) {
  const t = W(e);
  s.useEffect(() => {
    const n = (r) => {
      r.key === "Escape" && t(r);
    };
    return (
      o.addEventListener("keydown", n, { capture: !0 }),
      () => o.removeEventListener("keydown", n, { capture: !0 })
    );
  }, [t, o]);
}
var ti = "DismissableLayer",
  Bt = "dismissableLayer.update",
  oi = "dismissableLayer.pointerDownOutside",
  ni = "dismissableLayer.focusOutside",
  Io,
  Wo = s.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  Re = s.forwardRef((e, o) => {
    const {
        disableOutsidePointerEvents: t = !1,
        onEscapeKeyDown: n,
        onPointerDownOutside: r,
        onFocusOutside: a,
        onInteractOutside: i,
        onDismiss: c,
        ...u
      } = e,
      d = s.useContext(Wo),
      [f, p] = s.useState(null),
      v = f?.ownerDocument ?? globalThis?.document,
      [, g] = s.useState({}),
      x = I(o, (P) => p(P)),
      m = Array.from(d.layers),
      [h] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1),
      w = m.indexOf(h),
      S = f ? m.indexOf(f) : -1,
      C = d.layersWithOutsidePointerEventsDisabled.size > 0,
      y = S >= w,
      _ = si((P) => {
        const O = P.target,
          N = [...d.branches].some((j) => j.contains(O));
        !y || N || (r?.(P), i?.(P), P.defaultPrevented || c?.());
      }, v),
      D = ai((P) => {
        const O = P.target;
        [...d.branches].some((j) => j.contains(O)) ||
          (a?.(P), i?.(P), P.defaultPrevented || c?.());
      }, v);
    return (
      ei((P) => {
        S === d.layers.size - 1 &&
          (n?.(P), !P.defaultPrevented && c && (P.preventDefault(), c()));
      }, v),
      s.useEffect(() => {
        if (f)
          return (
            t &&
              (d.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((Io = v.body.style.pointerEvents),
                (v.body.style.pointerEvents = "none")),
              d.layersWithOutsidePointerEventsDisabled.add(f)),
            d.layers.add(f),
            Mo(),
            () => {
              t &&
                d.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (v.body.style.pointerEvents = Io);
            }
          );
      }, [f, v, t, d]),
      s.useEffect(
        () => () => {
          f &&
            (d.layers.delete(f),
            d.layersWithOutsidePointerEventsDisabled.delete(f),
            Mo());
        },
        [f, d],
      ),
      s.useEffect(() => {
        const P = () => g({});
        return (
          document.addEventListener(Bt, P),
          () => document.removeEventListener(Bt, P)
        );
      }, []),
      l.jsx(E.div, {
        ...u,
        ref: x,
        style: {
          pointerEvents: C ? (y ? "auto" : "none") : void 0,
          ...e.style,
        },
        onFocusCapture: b(e.onFocusCapture, D.onFocusCapture),
        onBlurCapture: b(e.onBlurCapture, D.onBlurCapture),
        onPointerDownCapture: b(e.onPointerDownCapture, _.onPointerDownCapture),
      })
    );
  });
Re.displayName = ti;
var ri = "DismissableLayerBranch",
  Go = s.forwardRef((e, o) => {
    const t = s.useContext(Wo),
      n = s.useRef(null),
      r = I(o, n);
    return (
      s.useEffect(() => {
        const a = n.current;
        if (a)
          return (
            t.branches.add(a),
            () => {
              t.branches.delete(a);
            }
          );
      }, [t.branches]),
      l.jsx(E.div, { ...e, ref: r })
    );
  });
Go.displayName = ri;
function si(e, o = globalThis?.document) {
  const t = W(e),
    n = s.useRef(!1),
    r = s.useRef(() => {});
  return (
    s.useEffect(() => {
      const a = (c) => {
          if (c.target && !n.current) {
            let u = function () {
              zo(oi, t, d, { discrete: !0 });
            };
            const d = { originalEvent: c };
            c.pointerType === "touch"
              ? (o.removeEventListener("click", r.current),
                (r.current = u),
                o.addEventListener("click", r.current, { once: !0 }))
              : u();
          } else o.removeEventListener("click", r.current);
          n.current = !1;
        },
        i = window.setTimeout(() => {
          o.addEventListener("pointerdown", a);
        }, 0);
      return () => {
        (window.clearTimeout(i),
          o.removeEventListener("pointerdown", a),
          o.removeEventListener("click", r.current));
      };
    }, [o, t]),
    { onPointerDownCapture: () => (n.current = !0) }
  );
}
function ai(e, o = globalThis?.document) {
  const t = W(e),
    n = s.useRef(!1);
  return (
    s.useEffect(() => {
      const r = (a) => {
        a.target &&
          !n.current &&
          zo(ni, t, { originalEvent: a }, { discrete: !1 });
      };
      return (
        o.addEventListener("focusin", r),
        () => o.removeEventListener("focusin", r)
      );
    }, [o, t]),
    {
      onFocusCapture: () => (n.current = !0),
      onBlurCapture: () => (n.current = !1),
    }
  );
}
function Mo() {
  const e = new CustomEvent(Bt);
  document.dispatchEvent(e);
}
function zo(e, o, t, { discrete: n }) {
  const r = t.originalEvent.target,
    a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: t });
  (o && r.addEventListener(e, o, { once: !0 }),
    n ? to(r, a) : r.dispatchEvent(a));
}
var ii = Re,
  ci = Go,
  jt = 0;
function ct() {
  s.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return (
      document.body.insertAdjacentElement("afterbegin", e[0] ?? Do()),
      document.body.insertAdjacentElement("beforeend", e[1] ?? Do()),
      jt++,
      () => {
        (jt === 1 &&
          document
            .querySelectorAll("[data-radix-focus-guard]")
            .forEach((o) => o.remove()),
          jt--);
      }
    );
  }, []);
}
function Do() {
  const e = document.createElement("span");
  return (
    e.setAttribute("data-radix-focus-guard", ""),
    (e.tabIndex = 0),
    (e.style.outline = "none"),
    (e.style.opacity = "0"),
    (e.style.position = "fixed"),
    (e.style.pointerEvents = "none"),
    e
  );
}
var Lt = "focusScope.autoFocusOnMount",
  kt = "focusScope.autoFocusOnUnmount",
  No = { bubbles: !1, cancelable: !0 },
  li = "FocusScope",
  Ke = s.forwardRef((e, o) => {
    const {
        loop: t = !1,
        trapped: n = !1,
        onMountAutoFocus: r,
        onUnmountAutoFocus: a,
        ...i
      } = e,
      [c, u] = s.useState(null),
      d = W(r),
      f = W(a),
      p = s.useRef(null),
      v = I(o, (m) => u(m)),
      g = s.useRef({
        paused: !1,
        pause() {
          this.paused = !0;
        },
        resume() {
          this.paused = !1;
        },
      }).current;
    (s.useEffect(() => {
      if (n) {
        let m = function (C) {
            if (g.paused || !c) return;
            const y = C.target;
            c.contains(y) ? (p.current = y) : ve(p.current, { select: !0 });
          },
          h = function (C) {
            if (g.paused || !c) return;
            const y = C.relatedTarget;
            y !== null && (c.contains(y) || ve(p.current, { select: !0 }));
          },
          w = function (C) {
            if (document.activeElement === document.body)
              for (const _ of C) _.removedNodes.length > 0 && ve(c);
          };
        (document.addEventListener("focusin", m),
          document.addEventListener("focusout", h));
        const S = new MutationObserver(w);
        return (
          c && S.observe(c, { childList: !0, subtree: !0 }),
          () => {
            (document.removeEventListener("focusin", m),
              document.removeEventListener("focusout", h),
              S.disconnect());
          }
        );
      }
    }, [n, c, g.paused]),
      s.useEffect(() => {
        if (c) {
          jo.add(g);
          const m = document.activeElement;
          if (!c.contains(m)) {
            const w = new CustomEvent(Lt, No);
            (c.addEventListener(Lt, d),
              c.dispatchEvent(w),
              w.defaultPrevented ||
                (ui(mi(Yo(c)), { select: !0 }),
                document.activeElement === m && ve(c)));
          }
          return () => {
            (c.removeEventListener(Lt, d),
              setTimeout(() => {
                const w = new CustomEvent(kt, No);
                (c.addEventListener(kt, f),
                  c.dispatchEvent(w),
                  w.defaultPrevented || ve(m ?? document.body, { select: !0 }),
                  c.removeEventListener(kt, f),
                  jo.remove(g));
              }, 0));
          };
        }
      }, [c, d, f, g]));
    const x = s.useCallback(
      (m) => {
        if ((!t && !n) || g.paused) return;
        const h = m.key === "Tab" && !m.altKey && !m.ctrlKey && !m.metaKey,
          w = document.activeElement;
        if (h && w) {
          const S = m.currentTarget,
            [C, y] = di(S);
          C && y
            ? !m.shiftKey && w === y
              ? (m.preventDefault(), t && ve(C, { select: !0 }))
              : m.shiftKey &&
                w === C &&
                (m.preventDefault(), t && ve(y, { select: !0 }))
            : w === S && m.preventDefault();
        }
      },
      [t, n, g.paused],
    );
    return l.jsx(E.div, { tabIndex: -1, ...i, ref: v, onKeyDown: x });
  });
Ke.displayName = li;
function ui(e, { select: o = !1 } = {}) {
  const t = document.activeElement;
  for (const n of e)
    if ((ve(n, { select: o }), document.activeElement !== t)) return;
}
function di(e) {
  const o = Yo(e),
    t = Oo(o, e),
    n = Oo(o.reverse(), e);
  return [t, n];
}
function Yo(e) {
  const o = [],
    t = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (n) => {
        const r = n.tagName === "INPUT" && n.type === "hidden";
        return n.disabled || n.hidden || r
          ? NodeFilter.FILTER_SKIP
          : n.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      },
    });
  for (; t.nextNode(); ) o.push(t.currentNode);
  return o;
}
function Oo(e, o) {
  for (const t of e) if (!fi(t, { upTo: o })) return t;
}
function fi(e, { upTo: o }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (o !== void 0 && e === o) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function pi(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function ve(e, { select: o = !1 } = {}) {
  if (e && e.focus) {
    const t = document.activeElement;
    (e.focus({ preventScroll: !0 }), e !== t && pi(e) && o && e.select());
  }
}
var jo = vi();
function vi() {
  let e = [];
  return {
    add(o) {
      const t = e[0];
      (o !== t && t?.pause(), (e = Lo(e, o)), e.unshift(o));
    },
    remove(o) {
      ((e = Lo(e, o)), e[0]?.resume());
    },
  };
}
function Lo(e, o) {
  const t = [...e],
    n = t.indexOf(o);
  return (n !== -1 && t.splice(n, 1), t);
}
function mi(e) {
  return e.filter((o) => o.tagName !== "A");
}
var hi = Vo[" useId ".trim().toString()] || (() => {}),
  gi = 0;
function ce(e) {
  const [o, t] = s.useState(hi());
  return (
    G(() => {
      t((n) => n ?? String(gi++));
    }, [e]),
    o ? `radix-${o}` : ""
  );
}
var wi = "Arrow",
  Xo = s.forwardRef((e, o) => {
    const { children: t, width: n = 10, height: r = 5, ...a } = e;
    return l.jsx(E.svg, {
      ...a,
      ref: o,
      width: n,
      height: r,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? t : l.jsx("polygon", { points: "0,0 30,0 15,10" }),
    });
  });
Xo.displayName = wi;
var xi = Xo;
function lt(e) {
  const [o, t] = s.useState(void 0);
  return (
    G(() => {
      if (e) {
        t({ width: e.offsetWidth, height: e.offsetHeight });
        const n = new ResizeObserver((r) => {
          if (!Array.isArray(r) || !r.length) return;
          const a = r[0];
          let i, c;
          if ("borderBoxSize" in a) {
            const u = a.borderBoxSize,
              d = Array.isArray(u) ? u[0] : u;
            ((i = d.inlineSize), (c = d.blockSize));
          } else ((i = e.offsetWidth), (c = e.offsetHeight));
          t({ width: i, height: c });
        });
        return (n.observe(e, { box: "border-box" }), () => n.unobserve(e));
      } else t(void 0);
    }, [e]),
    o
  );
}
var oo = "Popper",
  [qo, ge] = q(oo),
  [Si, Zo] = qo(oo),
  Jo = (e) => {
    const { __scopePopper: o, children: t } = e,
      [n, r] = s.useState(null);
    return l.jsx(Si, { scope: o, anchor: n, onAnchorChange: r, children: t });
  };
Jo.displayName = oo;
var Qo = "PopperAnchor",
  en = s.forwardRef((e, o) => {
    const { __scopePopper: t, virtualRef: n, ...r } = e,
      a = Zo(Qo, t),
      i = s.useRef(null),
      c = I(o, i);
    return (
      s.useEffect(() => {
        a.onAnchorChange(n?.current || i.current);
      }),
      n ? null : l.jsx(E.div, { ...r, ref: c })
    );
  });
en.displayName = Qo;
var no = "PopperContent",
  [Ci, bi] = qo(no),
  tn = s.forwardRef((e, o) => {
    const {
        __scopePopper: t,
        side: n = "bottom",
        sideOffset: r = 0,
        align: a = "center",
        alignOffset: i = 0,
        arrowPadding: c = 0,
        avoidCollisions: u = !0,
        collisionBoundary: d = [],
        collisionPadding: f = 0,
        sticky: p = "partial",
        hideWhenDetached: v = !1,
        updatePositionStrategy: g = "optimized",
        onPlaced: x,
        ...m
      } = e,
      h = Zo(no, t),
      [w, S] = s.useState(null),
      C = I(o, (R) => S(R)),
      [y, _] = s.useState(null),
      D = lt(y),
      P = D?.width ?? 0,
      O = D?.height ?? 0,
      N = n + (a !== "center" ? "-" + a : ""),
      j =
        typeof f == "number"
          ? f
          : { top: 0, right: 0, bottom: 0, left: 0, ...f },
      M = Array.isArray(d) ? d : [d],
      F = M.length > 0,
      H = { padding: j, boundary: M.filter(Ei), altBoundary: F },
      {
        refs: A,
        floatingStyles: $,
        placement: L,
        isPositioned: B,
        middlewareData: k,
      } = Da({
        strategy: "fixed",
        placement: N,
        whileElementsMounted: (...R) =>
          Ha(...R, { animationFrame: g === "always" }),
        elements: { reference: h.anchor },
        middleware: [
          Na({ mainAxis: r + O, alignmentAxis: i }),
          u &&
            Oa({
              mainAxis: !0,
              crossAxis: !1,
              limiter: p === "partial" ? $a() : void 0,
              ...H,
            }),
          u && ja({ ...H }),
          La({
            ...H,
            apply: ({
              elements: R,
              rects: V,
              availableWidth: Q,
              availableHeight: K,
            }) => {
              const { width: U, height: z } = V.reference,
                re = R.floating.style;
              (re.setProperty("--radix-popper-available-width", `${Q}px`),
                re.setProperty("--radix-popper-available-height", `${K}px`),
                re.setProperty("--radix-popper-anchor-width", `${U}px`),
                re.setProperty("--radix-popper-anchor-height", `${z}px`));
            },
          }),
          y && ka({ element: y, padding: c }),
          Pi({ arrowWidth: P, arrowHeight: O }),
          v && Fa({ strategy: "referenceHidden", ...H }),
        ],
      }),
      [T, te] = rn(L),
      X = W(x);
    G(() => {
      B && X?.();
    }, [B, X]);
    const Z = k.arrow?.x,
      oe = k.arrow?.y,
      J = k.arrow?.centerOffset !== 0,
      [fe, ne] = s.useState();
    return (
      G(() => {
        w && ne(window.getComputedStyle(w).zIndex);
      }, [w]),
      l.jsx("div", {
        ref: A.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...$,
          transform: B ? $.transform : "translate(0, -200%)",
          minWidth: "max-content",
          zIndex: fe,
          "--radix-popper-transform-origin": [
            k.transformOrigin?.x,
            k.transformOrigin?.y,
          ].join(" "),
          ...(k.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none",
          }),
        },
        dir: e.dir,
        children: l.jsx(Ci, {
          scope: t,
          placedSide: T,
          onArrowChange: _,
          arrowX: Z,
          arrowY: oe,
          shouldHideArrow: J,
          children: l.jsx(E.div, {
            "data-side": T,
            "data-align": te,
            ...m,
            ref: C,
            style: { ...m.style, animation: B ? void 0 : "none" },
          }),
        }),
      })
    );
  });
tn.displayName = no;
var on = "PopperArrow",
  yi = { top: "bottom", right: "left", bottom: "top", left: "right" },
  nn = s.forwardRef(function (o, t) {
    const { __scopePopper: n, ...r } = o,
      a = bi(on, n),
      i = yi[a.placedSide];
    return l.jsx("span", {
      ref: a.onArrowChange,
      style: {
        position: "absolute",
        left: a.arrowX,
        top: a.arrowY,
        [i]: 0,
        transformOrigin: {
          top: "",
          right: "0 0",
          bottom: "center 0",
          left: "100% 0",
        }[a.placedSide],
        transform: {
          top: "translateY(100%)",
          right: "translateY(50%) rotate(90deg) translateX(-50%)",
          bottom: "rotate(180deg)",
          left: "translateY(50%) rotate(-90deg) translateX(50%)",
        }[a.placedSide],
        visibility: a.shouldHideArrow ? "hidden" : void 0,
      },
      children: l.jsx(xi, {
        ...r,
        ref: t,
        style: { ...r.style, display: "block" },
      }),
    });
  });
nn.displayName = on;
function Ei(e) {
  return e !== null;
}
var Pi = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(o) {
    const { placement: t, rects: n, middlewareData: r } = o,
      i = r.arrow?.centerOffset !== 0,
      c = i ? 0 : e.arrowWidth,
      u = i ? 0 : e.arrowHeight,
      [d, f] = rn(t),
      p = { start: "0%", center: "50%", end: "100%" }[f],
      v = (r.arrow?.x ?? 0) + c / 2,
      g = (r.arrow?.y ?? 0) + u / 2;
    let x = "",
      m = "";
    return (
      d === "bottom"
        ? ((x = i ? p : `${v}px`), (m = `${-u}px`))
        : d === "top"
          ? ((x = i ? p : `${v}px`), (m = `${n.floating.height + u}px`))
          : d === "right"
            ? ((x = `${-u}px`), (m = i ? p : `${g}px`))
            : d === "left" &&
              ((x = `${n.floating.width + u}px`), (m = i ? p : `${g}px`)),
      { data: { x, y: m } }
    );
  },
});
function rn(e) {
  const [o, t = "center"] = e.split("-");
  return [o, t];
}
var ro = Jo,
  Ue = en,
  ut = tn,
  dt = nn,
  Ri = "Portal",
  Oe = s.forwardRef((e, o) => {
    const { container: t, ...n } = e,
      [r, a] = s.useState(!1);
    G(() => a(!0), []);
    const i = t || (r && globalThis?.document?.body);
    return i ? Ba.createPortal(l.jsx(E.div, { ...n, ref: o }), i) : null;
  });
Oe.displayName = Ri;
function Ti(e, o) {
  return s.useReducer((t, n) => o[t][n] ?? t, e);
}
var Y = (e) => {
  const { present: o, children: t } = e,
    n = _i(o),
    r =
      typeof t == "function" ? t({ present: n.isPresent }) : s.Children.only(t),
    a = I(n.ref, Ai(r));
  return typeof t == "function" || n.isPresent
    ? s.cloneElement(r, { ref: a })
    : null;
};
Y.displayName = "Presence";
function _i(e) {
  const [o, t] = s.useState(),
    n = s.useRef(null),
    r = s.useRef(e),
    a = s.useRef("none"),
    i = e ? "mounted" : "unmounted",
    [c, u] = Ti(i, {
      mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
      unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
      unmounted: { MOUNT: "mounted" },
    });
  return (
    s.useEffect(() => {
      const d = qe(n.current);
      a.current = c === "mounted" ? d : "none";
    }, [c]),
    G(() => {
      const d = n.current,
        f = r.current;
      if (f !== e) {
        const v = a.current,
          g = qe(d);
        (e
          ? u("MOUNT")
          : g === "none" || d?.display === "none"
            ? u("UNMOUNT")
            : u(f && v !== g ? "ANIMATION_OUT" : "UNMOUNT"),
          (r.current = e));
      }
    }, [e, u]),
    G(() => {
      if (o) {
        let d;
        const f = o.ownerDocument.defaultView ?? window,
          p = (g) => {
            const m = qe(n.current).includes(g.animationName);
            if (g.target === o && m && (u("ANIMATION_END"), !r.current)) {
              const h = o.style.animationFillMode;
              ((o.style.animationFillMode = "forwards"),
                (d = f.setTimeout(() => {
                  o.style.animationFillMode === "forwards" &&
                    (o.style.animationFillMode = h);
                })));
            }
          },
          v = (g) => {
            g.target === o && (a.current = qe(n.current));
          };
        return (
          o.addEventListener("animationstart", v),
          o.addEventListener("animationcancel", p),
          o.addEventListener("animationend", p),
          () => {
            (f.clearTimeout(d),
              o.removeEventListener("animationstart", v),
              o.removeEventListener("animationcancel", p),
              o.removeEventListener("animationend", p));
          }
        );
      } else u("ANIMATION_END");
    }, [o, u]),
    {
      isPresent: ["mounted", "unmountSuspended"].includes(c),
      ref: s.useCallback((d) => {
        ((n.current = d ? getComputedStyle(d) : null), t(d));
      }, []),
    }
  );
}
function qe(e) {
  return e?.animationName || "none";
}
function Ai(e) {
  let o = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
    t = o && "isReactWarning" in o && o.isReactWarning;
  return t
    ? e.ref
    : ((o = Object.getOwnPropertyDescriptor(e, "ref")?.get),
      (t = o && "isReactWarning" in o && o.isReactWarning),
      t ? e.props.ref : e.props.ref || e.ref);
}
var Ft = "rovingFocusGroup.onEntryFocus",
  Ii = { bubbles: !1, cancelable: !0 },
  We = "RovingFocusGroup",
  [Ht, sn, Mi] = Ve(We),
  [Di, ft] = q(We, [Mi]),
  [Ni, Oi] = Di(We),
  an = s.forwardRef((e, o) =>
    l.jsx(Ht.Provider, {
      scope: e.__scopeRovingFocusGroup,
      children: l.jsx(Ht.Slot, {
        scope: e.__scopeRovingFocusGroup,
        children: l.jsx(ji, { ...e, ref: o }),
      }),
    }),
  );
an.displayName = We;
var ji = s.forwardRef((e, o) => {
    const {
        __scopeRovingFocusGroup: t,
        orientation: n,
        loop: r = !1,
        dir: a,
        currentTabStopId: i,
        defaultCurrentTabStopId: c,
        onCurrentTabStopIdChange: u,
        onEntryFocus: d,
        preventScrollOnEntryFocus: f = !1,
        ...p
      } = e,
      v = s.useRef(null),
      g = I(o, v),
      x = Ne(a),
      [m, h] = le({ prop: i, defaultProp: c ?? null, onChange: u, caller: We }),
      [w, S] = s.useState(!1),
      C = W(d),
      y = sn(t),
      _ = s.useRef(!1),
      [D, P] = s.useState(0);
    return (
      s.useEffect(() => {
        const O = v.current;
        if (O)
          return (
            O.addEventListener(Ft, C),
            () => O.removeEventListener(Ft, C)
          );
      }, [C]),
      l.jsx(Ni, {
        scope: t,
        orientation: n,
        dir: x,
        loop: r,
        currentTabStopId: m,
        onItemFocus: s.useCallback((O) => h(O), [h]),
        onItemShiftTab: s.useCallback(() => S(!0), []),
        onFocusableItemAdd: s.useCallback(() => P((O) => O + 1), []),
        onFocusableItemRemove: s.useCallback(() => P((O) => O - 1), []),
        children: l.jsx(E.div, {
          tabIndex: w || D === 0 ? -1 : 0,
          "data-orientation": n,
          ...p,
          ref: g,
          style: { outline: "none", ...e.style },
          onMouseDown: b(e.onMouseDown, () => {
            _.current = !0;
          }),
          onFocus: b(e.onFocus, (O) => {
            const N = !_.current;
            if (O.target === O.currentTarget && N && !w) {
              const j = new CustomEvent(Ft, Ii);
              if ((O.currentTarget.dispatchEvent(j), !j.defaultPrevented)) {
                const M = y().filter((L) => L.focusable),
                  F = M.find((L) => L.active),
                  H = M.find((L) => L.id === m),
                  $ = [F, H, ...M].filter(Boolean).map((L) => L.ref.current);
                un($, f);
              }
            }
            _.current = !1;
          }),
          onBlur: b(e.onBlur, () => S(!1)),
        }),
      })
    );
  }),
  cn = "RovingFocusGroupItem",
  ln = s.forwardRef((e, o) => {
    const {
        __scopeRovingFocusGroup: t,
        focusable: n = !0,
        active: r = !1,
        tabStopId: a,
        children: i,
        ...c
      } = e,
      u = ce(),
      d = a || u,
      f = Oi(cn, t),
      p = f.currentTabStopId === d,
      v = sn(t),
      {
        onFocusableItemAdd: g,
        onFocusableItemRemove: x,
        currentTabStopId: m,
      } = f;
    return (
      s.useEffect(() => {
        if (n) return (g(), () => x());
      }, [n, g, x]),
      l.jsx(Ht.ItemSlot, {
        scope: t,
        id: d,
        focusable: n,
        active: r,
        children: l.jsx(E.span, {
          tabIndex: p ? 0 : -1,
          "data-orientation": f.orientation,
          ...c,
          ref: o,
          onMouseDown: b(e.onMouseDown, (h) => {
            n ? f.onItemFocus(d) : h.preventDefault();
          }),
          onFocus: b(e.onFocus, () => f.onItemFocus(d)),
          onKeyDown: b(e.onKeyDown, (h) => {
            if (h.key === "Tab" && h.shiftKey) {
              f.onItemShiftTab();
              return;
            }
            if (h.target !== h.currentTarget) return;
            const w = Fi(h, f.orientation, f.dir);
            if (w !== void 0) {
              if (h.metaKey || h.ctrlKey || h.altKey || h.shiftKey) return;
              h.preventDefault();
              let C = v()
                .filter((y) => y.focusable)
                .map((y) => y.ref.current);
              if (w === "last") C.reverse();
              else if (w === "prev" || w === "next") {
                w === "prev" && C.reverse();
                const y = C.indexOf(h.currentTarget);
                C = f.loop ? $i(C, y + 1) : C.slice(y + 1);
              }
              setTimeout(() => un(C));
            }
          }),
          children:
            typeof i == "function"
              ? i({ isCurrentTabStop: p, hasTabStop: m != null })
              : i,
        }),
      })
    );
  });
ln.displayName = cn;
var Li = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last",
};
function ki(e, o) {
  return o !== "rtl"
    ? e
    : e === "ArrowLeft"
      ? "ArrowRight"
      : e === "ArrowRight"
        ? "ArrowLeft"
        : e;
}
function Fi(e, o, t) {
  const n = ki(e.key, t);
  if (
    !(o === "vertical" && ["ArrowLeft", "ArrowRight"].includes(n)) &&
    !(o === "horizontal" && ["ArrowUp", "ArrowDown"].includes(n))
  )
    return Li[n];
}
function un(e, o = !1) {
  const t = document.activeElement;
  for (const n of e)
    if (
      n === t ||
      (n.focus({ preventScroll: o }), document.activeElement !== t)
    )
      return;
}
function $i(e, o) {
  return e.map((t, n) => e[(o + n) % e.length]);
}
var dn = an,
  fn = ln,
  Vt = ["Enter", " "],
  Bi = ["ArrowDown", "PageUp", "Home"],
  pn = ["ArrowUp", "PageDown", "End"],
  Hi = [...Bi, ...pn],
  Vi = { ltr: [...Vt, "ArrowRight"], rtl: [...Vt, "ArrowLeft"] },
  Ki = { ltr: ["ArrowLeft"], rtl: ["ArrowRight"] },
  Ge = "Menu",
  [$e, Ui, Wi] = Ve(Ge),
  [Te, vn] = q(Ge, [Wi, ge, ft]),
  pt = ge(),
  mn = ft(),
  [Gi, _e] = Te(Ge),
  [zi, ze] = Te(Ge),
  hn = (e) => {
    const {
        __scopeMenu: o,
        open: t = !1,
        children: n,
        dir: r,
        onOpenChange: a,
        modal: i = !0,
      } = e,
      c = pt(o),
      [u, d] = s.useState(null),
      f = s.useRef(!1),
      p = W(a),
      v = Ne(r);
    return (
      s.useEffect(() => {
        const g = () => {
            ((f.current = !0),
              document.addEventListener("pointerdown", x, {
                capture: !0,
                once: !0,
              }),
              document.addEventListener("pointermove", x, {
                capture: !0,
                once: !0,
              }));
          },
          x = () => (f.current = !1);
        return (
          document.addEventListener("keydown", g, { capture: !0 }),
          () => {
            (document.removeEventListener("keydown", g, { capture: !0 }),
              document.removeEventListener("pointerdown", x, { capture: !0 }),
              document.removeEventListener("pointermove", x, { capture: !0 }));
          }
        );
      }, []),
      l.jsx(ro, {
        ...c,
        children: l.jsx(Gi, {
          scope: o,
          open: t,
          onOpenChange: p,
          content: u,
          onContentChange: d,
          children: l.jsx(zi, {
            scope: o,
            onClose: s.useCallback(() => p(!1), [p]),
            isUsingKeyboardRef: f,
            dir: v,
            modal: i,
            children: n,
          }),
        }),
      })
    );
  };
hn.displayName = Ge;
var Yi = "MenuAnchor",
  so = s.forwardRef((e, o) => {
    const { __scopeMenu: t, ...n } = e,
      r = pt(t);
    return l.jsx(Ue, { ...r, ...n, ref: o });
  });
so.displayName = Yi;
var ao = "MenuPortal",
  [Xi, gn] = Te(ao, { forceMount: void 0 }),
  wn = (e) => {
    const { __scopeMenu: o, forceMount: t, children: n, container: r } = e,
      a = _e(ao, o);
    return l.jsx(Xi, {
      scope: o,
      forceMount: t,
      children: l.jsx(Y, {
        present: t || a.open,
        children: l.jsx(Oe, { asChild: !0, container: r, children: n }),
      }),
    });
  };
wn.displayName = ao;
var se = "MenuContent",
  [qi, io] = Te(se),
  xn = s.forwardRef((e, o) => {
    const t = gn(se, e.__scopeMenu),
      { forceMount: n = t.forceMount, ...r } = e,
      a = _e(se, e.__scopeMenu),
      i = ze(se, e.__scopeMenu);
    return l.jsx($e.Provider, {
      scope: e.__scopeMenu,
      children: l.jsx(Y, {
        present: n || a.open,
        children: l.jsx($e.Slot, {
          scope: e.__scopeMenu,
          children: i.modal
            ? l.jsx(Zi, { ...r, ref: o })
            : l.jsx(Ji, { ...r, ref: o }),
        }),
      }),
    });
  }),
  Zi = s.forwardRef((e, o) => {
    const t = _e(se, e.__scopeMenu),
      n = s.useRef(null),
      r = I(o, n);
    return (
      s.useEffect(() => {
        const a = n.current;
        if (a) return at(a);
      }, []),
      l.jsx(co, {
        ...e,
        ref: r,
        trapFocus: t.open,
        disableOutsidePointerEvents: t.open,
        disableOutsideScroll: !0,
        onFocusOutside: b(e.onFocusOutside, (a) => a.preventDefault(), {
          checkForDefaultPrevented: !1,
        }),
        onDismiss: () => t.onOpenChange(!1),
      })
    );
  }),
  Ji = s.forwardRef((e, o) => {
    const t = _e(se, e.__scopeMenu);
    return l.jsx(co, {
      ...e,
      ref: o,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => t.onOpenChange(!1),
    });
  }),
  Qi = he("MenuContent.ScrollLock"),
  co = s.forwardRef((e, o) => {
    const {
        __scopeMenu: t,
        loop: n = !1,
        trapFocus: r,
        onOpenAutoFocus: a,
        onCloseAutoFocus: i,
        disableOutsidePointerEvents: c,
        onEntryFocus: u,
        onEscapeKeyDown: d,
        onPointerDownOutside: f,
        onFocusOutside: p,
        onInteractOutside: v,
        onDismiss: g,
        disableOutsideScroll: x,
        ...m
      } = e,
      h = _e(se, t),
      w = ze(se, t),
      S = pt(t),
      C = mn(t),
      y = Ui(t),
      [_, D] = s.useState(null),
      P = s.useRef(null),
      O = I(o, P, h.onContentChange),
      N = s.useRef(0),
      j = s.useRef(""),
      M = s.useRef(0),
      F = s.useRef(null),
      H = s.useRef("right"),
      A = s.useRef(0),
      $ = x ? st : s.Fragment,
      L = x ? { as: Qi, allowPinchZoom: !0 } : void 0,
      B = (T) => {
        const te = j.current + T,
          X = y().filter((R) => !R.disabled),
          Z = document.activeElement,
          oe = X.find((R) => R.ref.current === Z)?.textValue,
          J = X.map((R) => R.textValue),
          fe = dc(J, te, oe),
          ne = X.find((R) => R.textValue === fe)?.ref.current;
        ((function R(V) {
          ((j.current = V),
            window.clearTimeout(N.current),
            V !== "" && (N.current = window.setTimeout(() => R(""), 1e3)));
        })(te),
          ne && setTimeout(() => ne.focus()));
      };
    (s.useEffect(() => () => window.clearTimeout(N.current), []), ct());
    const k = s.useCallback(
      (T) => H.current === F.current?.side && pc(T, F.current?.area),
      [],
    );
    return l.jsx(qi, {
      scope: t,
      searchRef: j,
      onItemEnter: s.useCallback(
        (T) => {
          k(T) && T.preventDefault();
        },
        [k],
      ),
      onItemLeave: s.useCallback(
        (T) => {
          k(T) || (P.current?.focus(), D(null));
        },
        [k],
      ),
      onTriggerLeave: s.useCallback(
        (T) => {
          k(T) && T.preventDefault();
        },
        [k],
      ),
      pointerGraceTimerRef: M,
      onPointerGraceIntentChange: s.useCallback((T) => {
        F.current = T;
      }, []),
      children: l.jsx($, {
        ...L,
        children: l.jsx(Ke, {
          asChild: !0,
          trapped: r,
          onMountAutoFocus: b(a, (T) => {
            (T.preventDefault(), P.current?.focus({ preventScroll: !0 }));
          }),
          onUnmountAutoFocus: i,
          children: l.jsx(Re, {
            asChild: !0,
            disableOutsidePointerEvents: c,
            onEscapeKeyDown: d,
            onPointerDownOutside: f,
            onFocusOutside: p,
            onInteractOutside: v,
            onDismiss: g,
            children: l.jsx(dn, {
              asChild: !0,
              ...C,
              dir: w.dir,
              orientation: "vertical",
              loop: n,
              currentTabStopId: _,
              onCurrentTabStopIdChange: D,
              onEntryFocus: b(u, (T) => {
                w.isUsingKeyboardRef.current || T.preventDefault();
              }),
              preventScrollOnEntryFocus: !0,
              children: l.jsx(ut, {
                role: "menu",
                "aria-orientation": "vertical",
                "data-state": jn(h.open),
                "data-radix-menu-content": "",
                dir: w.dir,
                ...S,
                ...m,
                ref: O,
                style: { outline: "none", ...m.style },
                onKeyDown: b(m.onKeyDown, (T) => {
                  const X =
                      T.target.closest("[data-radix-menu-content]") ===
                      T.currentTarget,
                    Z = T.ctrlKey || T.altKey || T.metaKey,
                    oe = T.key.length === 1;
                  X &&
                    (T.key === "Tab" && T.preventDefault(),
                    !Z && oe && B(T.key));
                  const J = P.current;
                  if (T.target !== J || !Hi.includes(T.key)) return;
                  T.preventDefault();
                  const ne = y()
                    .filter((R) => !R.disabled)
                    .map((R) => R.ref.current);
                  (pn.includes(T.key) && ne.reverse(), lc(ne));
                }),
                onBlur: b(e.onBlur, (T) => {
                  T.currentTarget.contains(T.target) ||
                    (window.clearTimeout(N.current), (j.current = ""));
                }),
                onPointerMove: b(
                  e.onPointerMove,
                  Be((T) => {
                    const te = T.target,
                      X = A.current !== T.clientX;
                    if (T.currentTarget.contains(te) && X) {
                      const Z = T.clientX > A.current ? "right" : "left";
                      ((H.current = Z), (A.current = T.clientX));
                    }
                  }),
                ),
              }),
            }),
          }),
        }),
      }),
    });
  });
xn.displayName = se;
var ec = "MenuGroup",
  lo = s.forwardRef((e, o) => {
    const { __scopeMenu: t, ...n } = e;
    return l.jsx(E.div, { role: "group", ...n, ref: o });
  });
lo.displayName = ec;
var tc = "MenuLabel",
  Sn = s.forwardRef((e, o) => {
    const { __scopeMenu: t, ...n } = e;
    return l.jsx(E.div, { ...n, ref: o });
  });
Sn.displayName = tc;
var Je = "MenuItem",
  ko = "menu.itemSelect",
  vt = s.forwardRef((e, o) => {
    const { disabled: t = !1, onSelect: n, ...r } = e,
      a = s.useRef(null),
      i = ze(Je, e.__scopeMenu),
      c = io(Je, e.__scopeMenu),
      u = I(o, a),
      d = s.useRef(!1),
      f = () => {
        const p = a.current;
        if (!t && p) {
          const v = new CustomEvent(ko, { bubbles: !0, cancelable: !0 });
          (p.addEventListener(ko, (g) => n?.(g), { once: !0 }),
            to(p, v),
            v.defaultPrevented ? (d.current = !1) : i.onClose());
        }
      };
    return l.jsx(Cn, {
      ...r,
      ref: u,
      disabled: t,
      onClick: b(e.onClick, f),
      onPointerDown: (p) => {
        (e.onPointerDown?.(p), (d.current = !0));
      },
      onPointerUp: b(e.onPointerUp, (p) => {
        d.current || p.currentTarget?.click();
      }),
      onKeyDown: b(e.onKeyDown, (p) => {
        const v = c.searchRef.current !== "";
        t ||
          (v && p.key === " ") ||
          (Vt.includes(p.key) && (p.currentTarget.click(), p.preventDefault()));
      }),
    });
  });
vt.displayName = Je;
var Cn = s.forwardRef((e, o) => {
    const { __scopeMenu: t, disabled: n = !1, textValue: r, ...a } = e,
      i = io(Je, t),
      c = mn(t),
      u = s.useRef(null),
      d = I(o, u),
      [f, p] = s.useState(!1),
      [v, g] = s.useState("");
    return (
      s.useEffect(() => {
        const x = u.current;
        x && g((x.textContent ?? "").trim());
      }, [a.children]),
      l.jsx($e.ItemSlot, {
        scope: t,
        disabled: n,
        textValue: r ?? v,
        children: l.jsx(fn, {
          asChild: !0,
          ...c,
          focusable: !n,
          children: l.jsx(E.div, {
            role: "menuitem",
            "data-highlighted": f ? "" : void 0,
            "aria-disabled": n || void 0,
            "data-disabled": n ? "" : void 0,
            ...a,
            ref: d,
            onPointerMove: b(
              e.onPointerMove,
              Be((x) => {
                n
                  ? i.onItemLeave(x)
                  : (i.onItemEnter(x),
                    x.defaultPrevented ||
                      x.currentTarget.focus({ preventScroll: !0 }));
              }),
            ),
            onPointerLeave: b(
              e.onPointerLeave,
              Be((x) => i.onItemLeave(x)),
            ),
            onFocus: b(e.onFocus, () => p(!0)),
            onBlur: b(e.onBlur, () => p(!1)),
          }),
        }),
      })
    );
  }),
  oc = "MenuCheckboxItem",
  bn = s.forwardRef((e, o) => {
    const { checked: t = !1, onCheckedChange: n, ...r } = e;
    return l.jsx(Tn, {
      scope: e.__scopeMenu,
      checked: t,
      children: l.jsx(vt, {
        role: "menuitemcheckbox",
        "aria-checked": Qe(t) ? "mixed" : t,
        ...r,
        ref: o,
        "data-state": fo(t),
        onSelect: b(r.onSelect, () => n?.(Qe(t) ? !0 : !t), {
          checkForDefaultPrevented: !1,
        }),
      }),
    });
  });
bn.displayName = oc;
var yn = "MenuRadioGroup",
  [nc, rc] = Te(yn, { value: void 0, onValueChange: () => {} }),
  En = s.forwardRef((e, o) => {
    const { value: t, onValueChange: n, ...r } = e,
      a = W(n);
    return l.jsx(nc, {
      scope: e.__scopeMenu,
      value: t,
      onValueChange: a,
      children: l.jsx(lo, { ...r, ref: o }),
    });
  });
En.displayName = yn;
var Pn = "MenuRadioItem",
  Rn = s.forwardRef((e, o) => {
    const { value: t, ...n } = e,
      r = rc(Pn, e.__scopeMenu),
      a = t === r.value;
    return l.jsx(Tn, {
      scope: e.__scopeMenu,
      checked: a,
      children: l.jsx(vt, {
        role: "menuitemradio",
        "aria-checked": a,
        ...n,
        ref: o,
        "data-state": fo(a),
        onSelect: b(n.onSelect, () => r.onValueChange?.(t), {
          checkForDefaultPrevented: !1,
        }),
      }),
    });
  });
Rn.displayName = Pn;
var uo = "MenuItemIndicator",
  [Tn, sc] = Te(uo, { checked: !1 }),
  _n = s.forwardRef((e, o) => {
    const { __scopeMenu: t, forceMount: n, ...r } = e,
      a = sc(uo, t);
    return l.jsx(Y, {
      present: n || Qe(a.checked) || a.checked === !0,
      children: l.jsx(E.span, { ...r, ref: o, "data-state": fo(a.checked) }),
    });
  });
_n.displayName = uo;
var ac = "MenuSeparator",
  An = s.forwardRef((e, o) => {
    const { __scopeMenu: t, ...n } = e;
    return l.jsx(E.div, {
      role: "separator",
      "aria-orientation": "horizontal",
      ...n,
      ref: o,
    });
  });
An.displayName = ac;
var ic = "MenuArrow",
  In = s.forwardRef((e, o) => {
    const { __scopeMenu: t, ...n } = e,
      r = pt(t);
    return l.jsx(dt, { ...r, ...n, ref: o });
  });
In.displayName = ic;
var cc = "MenuSub",
  [Pd, Mn] = Te(cc),
  ke = "MenuSubTrigger",
  Dn = s.forwardRef((e, o) => {
    const t = _e(ke, e.__scopeMenu),
      n = ze(ke, e.__scopeMenu),
      r = Mn(ke, e.__scopeMenu),
      a = io(ke, e.__scopeMenu),
      i = s.useRef(null),
      { pointerGraceTimerRef: c, onPointerGraceIntentChange: u } = a,
      d = { __scopeMenu: e.__scopeMenu },
      f = s.useCallback(() => {
        (i.current && window.clearTimeout(i.current), (i.current = null));
      }, []);
    return (
      s.useEffect(() => f, [f]),
      s.useEffect(() => {
        const p = c.current;
        return () => {
          (window.clearTimeout(p), u(null));
        };
      }, [c, u]),
      l.jsx(so, {
        asChild: !0,
        ...d,
        children: l.jsx(Cn, {
          id: r.triggerId,
          "aria-haspopup": "menu",
          "aria-expanded": t.open,
          "aria-controls": r.contentId,
          "data-state": jn(t.open),
          ...e,
          ref: it(o, r.onTriggerChange),
          onClick: (p) => {
            (e.onClick?.(p),
              !(e.disabled || p.defaultPrevented) &&
                (p.currentTarget.focus(), t.open || t.onOpenChange(!0)));
          },
          onPointerMove: b(
            e.onPointerMove,
            Be((p) => {
              (a.onItemEnter(p),
                !p.defaultPrevented &&
                  !e.disabled &&
                  !t.open &&
                  !i.current &&
                  (a.onPointerGraceIntentChange(null),
                  (i.current = window.setTimeout(() => {
                    (t.onOpenChange(!0), f());
                  }, 100))));
            }),
          ),
          onPointerLeave: b(
            e.onPointerLeave,
            Be((p) => {
              f();
              const v = t.content?.getBoundingClientRect();
              if (v) {
                const g = t.content?.dataset.side,
                  x = g === "right",
                  m = x ? -5 : 5,
                  h = v[x ? "left" : "right"],
                  w = v[x ? "right" : "left"];
                (a.onPointerGraceIntentChange({
                  area: [
                    { x: p.clientX + m, y: p.clientY },
                    { x: h, y: v.top },
                    { x: w, y: v.top },
                    { x: w, y: v.bottom },
                    { x: h, y: v.bottom },
                  ],
                  side: g,
                }),
                  window.clearTimeout(c.current),
                  (c.current = window.setTimeout(
                    () => a.onPointerGraceIntentChange(null),
                    300,
                  )));
              } else {
                if ((a.onTriggerLeave(p), p.defaultPrevented)) return;
                a.onPointerGraceIntentChange(null);
              }
            }),
          ),
          onKeyDown: b(e.onKeyDown, (p) => {
            const v = a.searchRef.current !== "";
            e.disabled ||
              (v && p.key === " ") ||
              (Vi[n.dir].includes(p.key) &&
                (t.onOpenChange(!0), t.content?.focus(), p.preventDefault()));
          }),
        }),
      })
    );
  });
Dn.displayName = ke;
var Nn = "MenuSubContent",
  On = s.forwardRef((e, o) => {
    const t = gn(se, e.__scopeMenu),
      { forceMount: n = t.forceMount, ...r } = e,
      a = _e(se, e.__scopeMenu),
      i = ze(se, e.__scopeMenu),
      c = Mn(Nn, e.__scopeMenu),
      u = s.useRef(null),
      d = I(o, u);
    return l.jsx($e.Provider, {
      scope: e.__scopeMenu,
      children: l.jsx(Y, {
        present: n || a.open,
        children: l.jsx($e.Slot, {
          scope: e.__scopeMenu,
          children: l.jsx(co, {
            id: c.contentId,
            "aria-labelledby": c.triggerId,
            ...r,
            ref: d,
            align: "start",
            side: i.dir === "rtl" ? "left" : "right",
            disableOutsidePointerEvents: !1,
            disableOutsideScroll: !1,
            trapFocus: !1,
            onOpenAutoFocus: (f) => {
              (i.isUsingKeyboardRef.current && u.current?.focus(),
                f.preventDefault());
            },
            onCloseAutoFocus: (f) => f.preventDefault(),
            onFocusOutside: b(e.onFocusOutside, (f) => {
              f.target !== c.trigger && a.onOpenChange(!1);
            }),
            onEscapeKeyDown: b(e.onEscapeKeyDown, (f) => {
              (i.onClose(), f.preventDefault());
            }),
            onKeyDown: b(e.onKeyDown, (f) => {
              const p = f.currentTarget.contains(f.target),
                v = Ki[i.dir].includes(f.key);
              p &&
                v &&
                (a.onOpenChange(!1), c.trigger?.focus(), f.preventDefault());
            }),
          }),
        }),
      }),
    });
  });
On.displayName = Nn;
function jn(e) {
  return e ? "open" : "closed";
}
function Qe(e) {
  return e === "indeterminate";
}
function fo(e) {
  return Qe(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function lc(e) {
  const o = document.activeElement;
  for (const t of e)
    if (t === o || (t.focus(), document.activeElement !== o)) return;
}
function uc(e, o) {
  return e.map((t, n) => e[(o + n) % e.length]);
}
function dc(e, o, t) {
  const r = o.length > 1 && Array.from(o).every((d) => d === o[0]) ? o[0] : o,
    a = t ? e.indexOf(t) : -1;
  let i = uc(e, Math.max(a, 0));
  r.length === 1 && (i = i.filter((d) => d !== t));
  const u = i.find((d) => d.toLowerCase().startsWith(r.toLowerCase()));
  return u !== t ? u : void 0;
}
function fc(e, o) {
  const { x: t, y: n } = e;
  let r = !1;
  for (let a = 0, i = o.length - 1; a < o.length; i = a++) {
    const c = o[a],
      u = o[i],
      d = c.x,
      f = c.y,
      p = u.x,
      v = u.y;
    f > n != v > n && t < ((p - d) * (n - f)) / (v - f) + d && (r = !r);
  }
  return r;
}
function pc(e, o) {
  if (!o) return !1;
  const t = { x: e.clientX, y: e.clientY };
  return fc(t, o);
}
function Be(e) {
  return (o) => (o.pointerType === "mouse" ? e(o) : void 0);
}
var vc = hn,
  mc = so,
  hc = wn,
  gc = xn,
  wc = lo,
  xc = Sn,
  Sc = vt,
  Cc = bn,
  bc = En,
  yc = Rn,
  Ec = _n,
  Pc = An,
  Rc = In,
  Tc = Dn,
  _c = On,
  mt = "DropdownMenu",
  [Ac] = q(mt, [vn]),
  ee = vn(),
  [Ic, Ln] = Ac(mt),
  kn = (e) => {
    const {
        __scopeDropdownMenu: o,
        children: t,
        dir: n,
        open: r,
        defaultOpen: a,
        onOpenChange: i,
        modal: c = !0,
      } = e,
      u = ee(o),
      d = s.useRef(null),
      [f, p] = le({ prop: r, defaultProp: a ?? !1, onChange: i, caller: mt });
    return l.jsx(Ic, {
      scope: o,
      triggerId: ce(),
      triggerRef: d,
      contentId: ce(),
      open: f,
      onOpenChange: p,
      onOpenToggle: s.useCallback(() => p((v) => !v), [p]),
      modal: c,
      children: l.jsx(vc, {
        ...u,
        open: f,
        onOpenChange: p,
        dir: n,
        modal: c,
        children: t,
      }),
    });
  };
kn.displayName = mt;
var Fn = "DropdownMenuTrigger",
  $n = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: t, disabled: n = !1, ...r } = e,
      a = Ln(Fn, t),
      i = ee(t);
    return l.jsx(mc, {
      asChild: !0,
      ...i,
      children: l.jsx(E.button, {
        type: "button",
        id: a.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": a.open,
        "aria-controls": a.open ? a.contentId : void 0,
        "data-state": a.open ? "open" : "closed",
        "data-disabled": n ? "" : void 0,
        disabled: n,
        ...r,
        ref: it(o, a.triggerRef),
        onPointerDown: b(e.onPointerDown, (c) => {
          !n &&
            c.button === 0 &&
            c.ctrlKey === !1 &&
            (a.onOpenToggle(), a.open || c.preventDefault());
        }),
        onKeyDown: b(e.onKeyDown, (c) => {
          n ||
            (["Enter", " "].includes(c.key) && a.onOpenToggle(),
            c.key === "ArrowDown" && a.onOpenChange(!0),
            ["Enter", " ", "ArrowDown"].includes(c.key) && c.preventDefault());
        }),
      }),
    });
  });
$n.displayName = Fn;
var Mc = "DropdownMenuPortal",
  Bn = (e) => {
    const { __scopeDropdownMenu: o, ...t } = e,
      n = ee(o);
    return l.jsx(hc, { ...n, ...t });
  };
Bn.displayName = Mc;
var Hn = "DropdownMenuContent",
  Vn = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: t, ...n } = e,
      r = Ln(Hn, t),
      a = ee(t),
      i = s.useRef(!1);
    return l.jsx(gc, {
      id: r.contentId,
      "aria-labelledby": r.triggerId,
      ...a,
      ...n,
      ref: o,
      onCloseAutoFocus: b(e.onCloseAutoFocus, (c) => {
        (i.current || r.triggerRef.current?.focus(),
          (i.current = !1),
          c.preventDefault());
      }),
      onInteractOutside: b(e.onInteractOutside, (c) => {
        const u = c.detail.originalEvent,
          d = u.button === 0 && u.ctrlKey === !0,
          f = u.button === 2 || d;
        (!r.modal || f) && (i.current = !0);
      }),
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin":
          "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width":
          "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height":
          "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width":
          "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height":
          "var(--radix-popper-anchor-height)",
      },
    });
  });
Vn.displayName = Hn;
var Dc = "DropdownMenuGroup",
  Nc = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: t, ...n } = e,
      r = ee(t);
    return l.jsx(wc, { ...r, ...n, ref: o });
  });
Nc.displayName = Dc;
var Oc = "DropdownMenuLabel",
  Kn = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: t, ...n } = e,
      r = ee(t);
    return l.jsx(xc, { ...r, ...n, ref: o });
  });
Kn.displayName = Oc;
var jc = "DropdownMenuItem",
  Un = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: t, ...n } = e,
      r = ee(t);
    return l.jsx(Sc, { ...r, ...n, ref: o });
  });
Un.displayName = jc;
var Lc = "DropdownMenuCheckboxItem",
  Wn = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: t, ...n } = e,
      r = ee(t);
    return l.jsx(Cc, { ...r, ...n, ref: o });
  });
Wn.displayName = Lc;
var kc = "DropdownMenuRadioGroup",
  Fc = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: t, ...n } = e,
      r = ee(t);
    return l.jsx(bc, { ...r, ...n, ref: o });
  });
Fc.displayName = kc;
var $c = "DropdownMenuRadioItem",
  Gn = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: t, ...n } = e,
      r = ee(t);
    return l.jsx(yc, { ...r, ...n, ref: o });
  });
Gn.displayName = $c;
var Bc = "DropdownMenuItemIndicator",
  zn = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: t, ...n } = e,
      r = ee(t);
    return l.jsx(Ec, { ...r, ...n, ref: o });
  });
zn.displayName = Bc;
var Hc = "DropdownMenuSeparator",
  Yn = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: t, ...n } = e,
      r = ee(t);
    return l.jsx(Pc, { ...r, ...n, ref: o });
  });
Yn.displayName = Hc;
var Vc = "DropdownMenuArrow",
  Kc = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: t, ...n } = e,
      r = ee(t);
    return l.jsx(Rc, { ...r, ...n, ref: o });
  });
Kc.displayName = Vc;
var Uc = "DropdownMenuSubTrigger",
  Xn = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: t, ...n } = e,
      r = ee(t);
    return l.jsx(Tc, { ...r, ...n, ref: o });
  });
Xn.displayName = Uc;
var Wc = "DropdownMenuSubContent",
  qn = s.forwardRef((e, o) => {
    const { __scopeDropdownMenu: t, ...n } = e,
      r = ee(t);
    return l.jsx(_c, {
      ...r,
      ...n,
      ref: o,
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin":
          "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width":
          "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height":
          "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width":
          "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height":
          "var(--radix-popper-anchor-height)",
      },
    });
  });
qn.displayName = Wc;
var Rd = kn,
  Td = $n,
  _d = Bn,
  Ad = Vn,
  Id = Kn,
  Md = Un,
  Dd = Wn,
  Nd = Gn,
  Od = zn,
  jd = Yn,
  Ld = Xn,
  kd = qn,
  ht = "Dialog",
  [Zn, Jn] = q(ht),
  [Gc, ue] = Zn(ht),
  Qn = (e) => {
    const {
        __scopeDialog: o,
        children: t,
        open: n,
        defaultOpen: r,
        onOpenChange: a,
        modal: i = !0,
      } = e,
      c = s.useRef(null),
      u = s.useRef(null),
      [d, f] = le({ prop: n, defaultProp: r ?? !1, onChange: a, caller: ht });
    return l.jsx(Gc, {
      scope: o,
      triggerRef: c,
      contentRef: u,
      contentId: ce(),
      titleId: ce(),
      descriptionId: ce(),
      open: d,
      onOpenChange: f,
      onOpenToggle: s.useCallback(() => f((p) => !p), [f]),
      modal: i,
      children: t,
    });
  };
Qn.displayName = ht;
var er = "DialogTrigger",
  tr = s.forwardRef((e, o) => {
    const { __scopeDialog: t, ...n } = e,
      r = ue(er, t),
      a = I(o, r.triggerRef);
    return l.jsx(E.button, {
      type: "button",
      "aria-haspopup": "dialog",
      "aria-expanded": r.open,
      "aria-controls": r.contentId,
      "data-state": mo(r.open),
      ...n,
      ref: a,
      onClick: b(e.onClick, r.onOpenToggle),
    });
  });
tr.displayName = er;
var po = "DialogPortal",
  [zc, or] = Zn(po, { forceMount: void 0 }),
  nr = (e) => {
    const { __scopeDialog: o, forceMount: t, children: n, container: r } = e,
      a = ue(po, o);
    return l.jsx(zc, {
      scope: o,
      forceMount: t,
      children: s.Children.map(n, (i) =>
        l.jsx(Y, {
          present: t || a.open,
          children: l.jsx(Oe, { asChild: !0, container: r, children: i }),
        }),
      ),
    });
  };
nr.displayName = po;
var et = "DialogOverlay",
  rr = s.forwardRef((e, o) => {
    const t = or(et, e.__scopeDialog),
      { forceMount: n = t.forceMount, ...r } = e,
      a = ue(et, e.__scopeDialog);
    return a.modal
      ? l.jsx(Y, {
          present: n || a.open,
          children: l.jsx(Xc, { ...r, ref: o }),
        })
      : null;
  });
rr.displayName = et;
var Yc = he("DialogOverlay.RemoveScroll"),
  Xc = s.forwardRef((e, o) => {
    const { __scopeDialog: t, ...n } = e,
      r = ue(et, t);
    return l.jsx(st, {
      as: Yc,
      allowPinchZoom: !0,
      shards: [r.contentRef],
      children: l.jsx(E.div, {
        "data-state": mo(r.open),
        ...n,
        ref: o,
        style: { pointerEvents: "auto", ...n.style },
      }),
    });
  }),
  ye = "DialogContent",
  sr = s.forwardRef((e, o) => {
    const t = or(ye, e.__scopeDialog),
      { forceMount: n = t.forceMount, ...r } = e,
      a = ue(ye, e.__scopeDialog);
    return l.jsx(Y, {
      present: n || a.open,
      children: a.modal
        ? l.jsx(qc, { ...r, ref: o })
        : l.jsx(Zc, { ...r, ref: o }),
    });
  });
sr.displayName = ye;
var qc = s.forwardRef((e, o) => {
    const t = ue(ye, e.__scopeDialog),
      n = s.useRef(null),
      r = I(o, t.contentRef, n);
    return (
      s.useEffect(() => {
        const a = n.current;
        if (a) return at(a);
      }, []),
      l.jsx(ar, {
        ...e,
        ref: r,
        trapFocus: t.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: b(e.onCloseAutoFocus, (a) => {
          (a.preventDefault(), t.triggerRef.current?.focus());
        }),
        onPointerDownOutside: b(e.onPointerDownOutside, (a) => {
          const i = a.detail.originalEvent,
            c = i.button === 0 && i.ctrlKey === !0;
          (i.button === 2 || c) && a.preventDefault();
        }),
        onFocusOutside: b(e.onFocusOutside, (a) => a.preventDefault()),
      })
    );
  }),
  Zc = s.forwardRef((e, o) => {
    const t = ue(ye, e.__scopeDialog),
      n = s.useRef(!1),
      r = s.useRef(!1);
    return l.jsx(ar, {
      ...e,
      ref: o,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (a) => {
        (e.onCloseAutoFocus?.(a),
          a.defaultPrevented ||
            (n.current || t.triggerRef.current?.focus(), a.preventDefault()),
          (n.current = !1),
          (r.current = !1));
      },
      onInteractOutside: (a) => {
        (e.onInteractOutside?.(a),
          a.defaultPrevented ||
            ((n.current = !0),
            a.detail.originalEvent.type === "pointerdown" && (r.current = !0)));
        const i = a.target;
        (t.triggerRef.current?.contains(i) && a.preventDefault(),
          a.detail.originalEvent.type === "focusin" &&
            r.current &&
            a.preventDefault());
      },
    });
  }),
  ar = s.forwardRef((e, o) => {
    const {
        __scopeDialog: t,
        trapFocus: n,
        onOpenAutoFocus: r,
        onCloseAutoFocus: a,
        ...i
      } = e,
      c = ue(ye, t),
      u = s.useRef(null),
      d = I(o, u);
    return (
      ct(),
      l.jsxs(l.Fragment, {
        children: [
          l.jsx(Ke, {
            asChild: !0,
            loop: !0,
            trapped: n,
            onMountAutoFocus: r,
            onUnmountAutoFocus: a,
            children: l.jsx(Re, {
              role: "dialog",
              id: c.contentId,
              "aria-describedby": c.descriptionId,
              "aria-labelledby": c.titleId,
              "data-state": mo(c.open),
              ...i,
              ref: d,
              onDismiss: () => c.onOpenChange(!1),
            }),
          }),
          l.jsxs(l.Fragment, {
            children: [
              l.jsx(Qc, { titleId: c.titleId }),
              l.jsx(tl, { contentRef: u, descriptionId: c.descriptionId }),
            ],
          }),
        ],
      })
    );
  }),
  vo = "DialogTitle",
  ir = s.forwardRef((e, o) => {
    const { __scopeDialog: t, ...n } = e,
      r = ue(vo, t);
    return l.jsx(E.h2, { id: r.titleId, ...n, ref: o });
  });
ir.displayName = vo;
var cr = "DialogDescription",
  lr = s.forwardRef((e, o) => {
    const { __scopeDialog: t, ...n } = e,
      r = ue(cr, t);
    return l.jsx(E.p, { id: r.descriptionId, ...n, ref: o });
  });
lr.displayName = cr;
var ur = "DialogClose",
  dr = s.forwardRef((e, o) => {
    const { __scopeDialog: t, ...n } = e,
      r = ue(ur, t);
    return l.jsx(E.button, {
      type: "button",
      ...n,
      ref: o,
      onClick: b(e.onClick, () => r.onOpenChange(!1)),
    });
  });
dr.displayName = ur;
function mo(e) {
  return e ? "open" : "closed";
}
var fr = "DialogTitleWarning",
  [Jc, pr] = Ka(fr, { contentName: ye, titleName: vo, docsSlug: "dialog" }),
  Qc = ({ titleId: e }) => {
    const o = pr(fr),
      t = `\`${o.contentName}\` requires a \`${o.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${o.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${o.docsSlug}`;
    return (
      s.useEffect(() => {
        e && (document.getElementById(e) || console.error(t));
      }, [t, e]),
      null
    );
  },
  el = "DialogDescriptionWarning",
  tl = ({ contentRef: e, descriptionId: o }) => {
    const n = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${pr(el).contentName}}.`;
    return (
      s.useEffect(() => {
        const r = e.current?.getAttribute("aria-describedby");
        o && r && (document.getElementById(o) || console.warn(n));
      }, [n, e, o]),
      null
    );
  },
  ol = Qn,
  nl = tr,
  rl = nr,
  sl = rr,
  al = sr,
  il = ir,
  cl = lr,
  vr = dr;
function ll() {
  return Va.useSyncExternalStore(
    ul,
    () => !0,
    () => !1,
  );
}
function ul() {
  return () => {};
}
var ho = "Avatar",
  [dl] = q(ho),
  [fl, mr] = dl(ho),
  hr = s.forwardRef((e, o) => {
    const { __scopeAvatar: t, ...n } = e,
      [r, a] = s.useState("idle");
    return l.jsx(fl, {
      scope: t,
      imageLoadingStatus: r,
      onImageLoadingStatusChange: a,
      children: l.jsx(E.span, { ...n, ref: o }),
    });
  });
hr.displayName = ho;
var gr = "AvatarImage",
  wr = s.forwardRef((e, o) => {
    const {
        __scopeAvatar: t,
        src: n,
        onLoadingStatusChange: r = () => {},
        ...a
      } = e,
      i = mr(gr, t),
      c = pl(n, a),
      u = W((d) => {
        (r(d), i.onImageLoadingStatusChange(d));
      });
    return (
      G(() => {
        c !== "idle" && u(c);
      }, [c, u]),
      c === "loaded" ? l.jsx(E.img, { ...a, ref: o, src: n }) : null
    );
  });
wr.displayName = gr;
var xr = "AvatarFallback",
  Sr = s.forwardRef((e, o) => {
    const { __scopeAvatar: t, delayMs: n, ...r } = e,
      a = mr(xr, t),
      [i, c] = s.useState(n === void 0);
    return (
      s.useEffect(() => {
        if (n !== void 0) {
          const u = window.setTimeout(() => c(!0), n);
          return () => window.clearTimeout(u);
        }
      }, [n]),
      i && a.imageLoadingStatus !== "loaded"
        ? l.jsx(E.span, { ...r, ref: o })
        : null
    );
  });
Sr.displayName = xr;
function Fo(e, o) {
  return e
    ? o
      ? (e.src !== o && (e.src = o),
        e.complete && e.naturalWidth > 0 ? "loaded" : "loading")
      : "error"
    : "idle";
}
function pl(e, { referrerPolicy: o, crossOrigin: t }) {
  const n = ll(),
    r = s.useRef(null),
    a = n ? (r.current || (r.current = new window.Image()), r.current) : null,
    [i, c] = s.useState(() => Fo(a, e));
  return (
    G(() => {
      c(Fo(a, e));
    }, [a, e]),
    G(() => {
      const u = (p) => () => {
        c(p);
      };
      if (!a) return;
      const d = u("loaded"),
        f = u("error");
      return (
        a.addEventListener("load", d),
        a.addEventListener("error", f),
        o && (a.referrerPolicy = o),
        typeof t == "string" && (a.crossOrigin = t),
        () => {
          (a.removeEventListener("load", d), a.removeEventListener("error", f));
        }
      );
    }, [a, t, o]),
    i
  );
}
var Fd = hr,
  $d = wr,
  Bd = Sr,
  Cr = Object.freeze({
    position: "absolute",
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    wordWrap: "normal",
  }),
  vl = "VisuallyHidden",
  gt = s.forwardRef((e, o) =>
    l.jsx(E.span, { ...e, ref: o, style: { ...Cr, ...e.style } }),
  );
gt.displayName = vl;
var ml = gt,
  go = "ToastProvider",
  [wo, hl, gl] = Ve("Toast"),
  [br] = q("Toast", [gl]),
  [wl, wt] = br(go),
  yr = (e) => {
    const {
        __scopeToast: o,
        label: t = "Notification",
        duration: n = 5e3,
        swipeDirection: r = "right",
        swipeThreshold: a = 50,
        children: i,
      } = e,
      [c, u] = s.useState(null),
      [d, f] = s.useState(0),
      p = s.useRef(!1),
      v = s.useRef(!1);
    return (
      t.trim() ||
        console.error(
          `Invalid prop \`label\` supplied to \`${go}\`. Expected non-empty \`string\`.`,
        ),
      l.jsx(wo.Provider, {
        scope: o,
        children: l.jsx(wl, {
          scope: o,
          label: t,
          duration: n,
          swipeDirection: r,
          swipeThreshold: a,
          toastCount: d,
          viewport: c,
          onViewportChange: u,
          onToastAdd: s.useCallback(() => f((g) => g + 1), []),
          onToastRemove: s.useCallback(() => f((g) => g - 1), []),
          isFocusedToastEscapeKeyDownRef: p,
          isClosePausedRef: v,
          children: i,
        }),
      })
    );
  };
yr.displayName = go;
var Er = "ToastViewport",
  xl = ["F8"],
  Kt = "toast.viewportPause",
  Ut = "toast.viewportResume",
  Pr = s.forwardRef((e, o) => {
    const {
        __scopeToast: t,
        hotkey: n = xl,
        label: r = "Notifications ({hotkey})",
        ...a
      } = e,
      i = wt(Er, t),
      c = hl(t),
      u = s.useRef(null),
      d = s.useRef(null),
      f = s.useRef(null),
      p = s.useRef(null),
      v = I(o, p, i.onViewportChange),
      g = n.join("+").replace(/Key/g, "").replace(/Digit/g, ""),
      x = i.toastCount > 0;
    (s.useEffect(() => {
      const h = (w) => {
        n.length !== 0 &&
          n.every((C) => w[C] || w.code === C) &&
          p.current?.focus();
      };
      return (
        document.addEventListener("keydown", h),
        () => document.removeEventListener("keydown", h)
      );
    }, [n]),
      s.useEffect(() => {
        const h = u.current,
          w = p.current;
        if (x && h && w) {
          const S = () => {
              if (!i.isClosePausedRef.current) {
                const D = new CustomEvent(Kt);
                (w.dispatchEvent(D), (i.isClosePausedRef.current = !0));
              }
            },
            C = () => {
              if (i.isClosePausedRef.current) {
                const D = new CustomEvent(Ut);
                (w.dispatchEvent(D), (i.isClosePausedRef.current = !1));
              }
            },
            y = (D) => {
              !h.contains(D.relatedTarget) && C();
            },
            _ = () => {
              h.contains(document.activeElement) || C();
            };
          return (
            h.addEventListener("focusin", S),
            h.addEventListener("focusout", y),
            h.addEventListener("pointermove", S),
            h.addEventListener("pointerleave", _),
            window.addEventListener("blur", S),
            window.addEventListener("focus", C),
            () => {
              (h.removeEventListener("focusin", S),
                h.removeEventListener("focusout", y),
                h.removeEventListener("pointermove", S),
                h.removeEventListener("pointerleave", _),
                window.removeEventListener("blur", S),
                window.removeEventListener("focus", C));
            }
          );
        }
      }, [x, i.isClosePausedRef]));
    const m = s.useCallback(
      ({ tabbingDirection: h }) => {
        const S = c().map((C) => {
          const y = C.ref.current,
            _ = [y, ...Dl(y)];
          return h === "forwards" ? _ : _.reverse();
        });
        return (h === "forwards" ? S.reverse() : S).flat();
      },
      [c],
    );
    return (
      s.useEffect(() => {
        const h = p.current;
        if (h) {
          const w = (S) => {
            const C = S.altKey || S.ctrlKey || S.metaKey;
            if (S.key === "Tab" && !C) {
              const _ = document.activeElement,
                D = S.shiftKey;
              if (S.target === h && D) {
                d.current?.focus();
                return;
              }
              const N = m({ tabbingDirection: D ? "backwards" : "forwards" }),
                j = N.findIndex((M) => M === _);
              $t(N.slice(j + 1))
                ? S.preventDefault()
                : D
                  ? d.current?.focus()
                  : f.current?.focus();
            }
          };
          return (
            h.addEventListener("keydown", w),
            () => h.removeEventListener("keydown", w)
          );
        }
      }, [c, m]),
      l.jsxs(ci, {
        ref: u,
        role: "region",
        "aria-label": r.replace("{hotkey}", g),
        tabIndex: -1,
        style: { pointerEvents: x ? void 0 : "none" },
        children: [
          x &&
            l.jsx(Wt, {
              ref: d,
              onFocusFromOutsideViewport: () => {
                const h = m({ tabbingDirection: "forwards" });
                $t(h);
              },
            }),
          l.jsx(wo.Slot, {
            scope: t,
            children: l.jsx(E.ol, { tabIndex: -1, ...a, ref: v }),
          }),
          x &&
            l.jsx(Wt, {
              ref: f,
              onFocusFromOutsideViewport: () => {
                const h = m({ tabbingDirection: "backwards" });
                $t(h);
              },
            }),
        ],
      })
    );
  });
Pr.displayName = Er;
var Rr = "ToastFocusProxy",
  Wt = s.forwardRef((e, o) => {
    const { __scopeToast: t, onFocusFromOutsideViewport: n, ...r } = e,
      a = wt(Rr, t);
    return l.jsx(gt, {
      "aria-hidden": !0,
      tabIndex: 0,
      ...r,
      ref: o,
      style: { position: "fixed" },
      onFocus: (i) => {
        const c = i.relatedTarget;
        !a.viewport?.contains(c) && n();
      },
    });
  });
Wt.displayName = Rr;
var Ye = "Toast",
  Sl = "toast.swipeStart",
  Cl = "toast.swipeMove",
  bl = "toast.swipeCancel",
  yl = "toast.swipeEnd",
  Tr = s.forwardRef((e, o) => {
    const { forceMount: t, open: n, defaultOpen: r, onOpenChange: a, ...i } = e,
      [c, u] = le({ prop: n, defaultProp: r ?? !0, onChange: a, caller: Ye });
    return l.jsx(Y, {
      present: t || c,
      children: l.jsx(Rl, {
        open: c,
        ...i,
        ref: o,
        onClose: () => u(!1),
        onPause: W(e.onPause),
        onResume: W(e.onResume),
        onSwipeStart: b(e.onSwipeStart, (d) => {
          d.currentTarget.setAttribute("data-swipe", "start");
        }),
        onSwipeMove: b(e.onSwipeMove, (d) => {
          const { x: f, y: p } = d.detail.delta;
          (d.currentTarget.setAttribute("data-swipe", "move"),
            d.currentTarget.style.setProperty(
              "--radix-toast-swipe-move-x",
              `${f}px`,
            ),
            d.currentTarget.style.setProperty(
              "--radix-toast-swipe-move-y",
              `${p}px`,
            ));
        }),
        onSwipeCancel: b(e.onSwipeCancel, (d) => {
          (d.currentTarget.setAttribute("data-swipe", "cancel"),
            d.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),
            d.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),
            d.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"),
            d.currentTarget.style.removeProperty("--radix-toast-swipe-end-y"));
        }),
        onSwipeEnd: b(e.onSwipeEnd, (d) => {
          const { x: f, y: p } = d.detail.delta;
          (d.currentTarget.setAttribute("data-swipe", "end"),
            d.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),
            d.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),
            d.currentTarget.style.setProperty(
              "--radix-toast-swipe-end-x",
              `${f}px`,
            ),
            d.currentTarget.style.setProperty(
              "--radix-toast-swipe-end-y",
              `${p}px`,
            ),
            u(!1));
        }),
      }),
    });
  });
Tr.displayName = Ye;
var [El, Pl] = br(Ye, { onClose() {} }),
  Rl = s.forwardRef((e, o) => {
    const {
        __scopeToast: t,
        type: n = "foreground",
        duration: r,
        open: a,
        onClose: i,
        onEscapeKeyDown: c,
        onPause: u,
        onResume: d,
        onSwipeStart: f,
        onSwipeMove: p,
        onSwipeCancel: v,
        onSwipeEnd: g,
        ...x
      } = e,
      m = wt(Ye, t),
      [h, w] = s.useState(null),
      S = I(o, (A) => w(A)),
      C = s.useRef(null),
      y = s.useRef(null),
      _ = r || m.duration,
      D = s.useRef(0),
      P = s.useRef(_),
      O = s.useRef(0),
      { onToastAdd: N, onToastRemove: j } = m,
      M = W(() => {
        (h?.contains(document.activeElement) && m.viewport?.focus(), i());
      }),
      F = s.useCallback(
        (A) => {
          !A ||
            A === 1 / 0 ||
            (window.clearTimeout(O.current),
            (D.current = new Date().getTime()),
            (O.current = window.setTimeout(M, A)));
        },
        [M],
      );
    (s.useEffect(() => {
      const A = m.viewport;
      if (A) {
        const $ = () => {
            (F(P.current), d?.());
          },
          L = () => {
            const B = new Date().getTime() - D.current;
            ((P.current = P.current - B),
              window.clearTimeout(O.current),
              u?.());
          };
        return (
          A.addEventListener(Kt, L),
          A.addEventListener(Ut, $),
          () => {
            (A.removeEventListener(Kt, L), A.removeEventListener(Ut, $));
          }
        );
      }
    }, [m.viewport, _, u, d, F]),
      s.useEffect(() => {
        a && !m.isClosePausedRef.current && F(_);
      }, [a, _, m.isClosePausedRef, F]),
      s.useEffect(() => (N(), () => j()), [N, j]));
    const H = s.useMemo(() => (h ? Or(h) : null), [h]);
    return m.viewport
      ? l.jsxs(l.Fragment, {
          children: [
            H &&
              l.jsx(Tl, {
                __scopeToast: t,
                role: "status",
                "aria-live": n === "foreground" ? "assertive" : "polite",
                "aria-atomic": !0,
                children: H,
              }),
            l.jsx(El, {
              scope: t,
              onClose: M,
              children: rt.createPortal(
                l.jsx(wo.ItemSlot, {
                  scope: t,
                  children: l.jsx(ii, {
                    asChild: !0,
                    onEscapeKeyDown: b(c, () => {
                      (m.isFocusedToastEscapeKeyDownRef.current || M(),
                        (m.isFocusedToastEscapeKeyDownRef.current = !1));
                    }),
                    children: l.jsx(E.li, {
                      role: "status",
                      "aria-live": "off",
                      "aria-atomic": !0,
                      tabIndex: 0,
                      "data-state": a ? "open" : "closed",
                      "data-swipe-direction": m.swipeDirection,
                      ...x,
                      ref: S,
                      style: {
                        userSelect: "none",
                        touchAction: "none",
                        ...e.style,
                      },
                      onKeyDown: b(e.onKeyDown, (A) => {
                        A.key === "Escape" &&
                          (c?.(A.nativeEvent),
                          A.nativeEvent.defaultPrevented ||
                            ((m.isFocusedToastEscapeKeyDownRef.current = !0),
                            M()));
                      }),
                      onPointerDown: b(e.onPointerDown, (A) => {
                        A.button === 0 &&
                          (C.current = { x: A.clientX, y: A.clientY });
                      }),
                      onPointerMove: b(e.onPointerMove, (A) => {
                        if (!C.current) return;
                        const $ = A.clientX - C.current.x,
                          L = A.clientY - C.current.y,
                          B = !!y.current,
                          k = ["left", "right"].includes(m.swipeDirection),
                          T = ["left", "up"].includes(m.swipeDirection)
                            ? Math.min
                            : Math.max,
                          te = k ? T(0, $) : 0,
                          X = k ? 0 : T(0, L),
                          Z = A.pointerType === "touch" ? 10 : 2,
                          oe = { x: te, y: X },
                          J = { originalEvent: A, delta: oe };
                        B
                          ? ((y.current = oe), Ze(Cl, p, J, { discrete: !1 }))
                          : $o(oe, m.swipeDirection, Z)
                            ? ((y.current = oe),
                              Ze(Sl, f, J, { discrete: !1 }),
                              A.target.setPointerCapture(A.pointerId))
                            : (Math.abs($) > Z || Math.abs(L) > Z) &&
                              (C.current = null);
                      }),
                      onPointerUp: b(e.onPointerUp, (A) => {
                        const $ = y.current,
                          L = A.target;
                        if (
                          (L.hasPointerCapture(A.pointerId) &&
                            L.releasePointerCapture(A.pointerId),
                          (y.current = null),
                          (C.current = null),
                          $)
                        ) {
                          const B = A.currentTarget,
                            k = { originalEvent: A, delta: $ };
                          ($o($, m.swipeDirection, m.swipeThreshold)
                            ? Ze(yl, g, k, { discrete: !0 })
                            : Ze(bl, v, k, { discrete: !0 }),
                            B.addEventListener(
                              "click",
                              (T) => T.preventDefault(),
                              { once: !0 },
                            ));
                        }
                      }),
                    }),
                  }),
                }),
                m.viewport,
              ),
            }),
          ],
        })
      : null;
  }),
  Tl = (e) => {
    const { __scopeToast: o, children: t, ...n } = e,
      r = wt(Ye, o),
      [a, i] = s.useState(!1),
      [c, u] = s.useState(!1);
    return (
      Il(() => i(!0)),
      s.useEffect(() => {
        const d = window.setTimeout(() => u(!0), 1e3);
        return () => window.clearTimeout(d);
      }, []),
      c
        ? null
        : l.jsx(Oe, {
            asChild: !0,
            children: l.jsx(gt, {
              ...n,
              children:
                a && l.jsxs(l.Fragment, { children: [r.label, " ", t] }),
            }),
          })
    );
  },
  _l = "ToastTitle",
  _r = s.forwardRef((e, o) => {
    const { __scopeToast: t, ...n } = e;
    return l.jsx(E.div, { ...n, ref: o });
  });
_r.displayName = _l;
var Al = "ToastDescription",
  Ar = s.forwardRef((e, o) => {
    const { __scopeToast: t, ...n } = e;
    return l.jsx(E.div, { ...n, ref: o });
  });
Ar.displayName = Al;
var Ir = "ToastAction",
  Mr = s.forwardRef((e, o) => {
    const { altText: t, ...n } = e;
    return t.trim()
      ? l.jsx(Nr, {
          altText: t,
          asChild: !0,
          children: l.jsx(xo, { ...n, ref: o }),
        })
      : (console.error(
          `Invalid prop \`altText\` supplied to \`${Ir}\`. Expected non-empty \`string\`.`,
        ),
        null);
  });
Mr.displayName = Ir;
var Dr = "ToastClose",
  xo = s.forwardRef((e, o) => {
    const { __scopeToast: t, ...n } = e,
      r = Pl(Dr, t);
    return l.jsx(Nr, {
      asChild: !0,
      children: l.jsx(E.button, {
        type: "button",
        ...n,
        ref: o,
        onClick: b(e.onClick, r.onClose),
      }),
    });
  });
xo.displayName = Dr;
var Nr = s.forwardRef((e, o) => {
  const { __scopeToast: t, altText: n, ...r } = e;
  return l.jsx(E.div, {
    "data-radix-toast-announce-exclude": "",
    "data-radix-toast-announce-alt": n || void 0,
    ...r,
    ref: o,
  });
});
function Or(e) {
  const o = [];
  return (
    Array.from(e.childNodes).forEach((n) => {
      if (
        (n.nodeType === n.TEXT_NODE && n.textContent && o.push(n.textContent),
        Ml(n))
      ) {
        const r = n.ariaHidden || n.hidden || n.style.display === "none",
          a = n.dataset.radixToastAnnounceExclude === "";
        if (!r)
          if (a) {
            const i = n.dataset.radixToastAnnounceAlt;
            i && o.push(i);
          } else o.push(...Or(n));
      }
    }),
    o
  );
}
function Ze(e, o, t, { discrete: n }) {
  const r = t.originalEvent.currentTarget,
    a = new CustomEvent(e, { bubbles: !0, cancelable: !0, detail: t });
  (o && r.addEventListener(e, o, { once: !0 }),
    n ? to(r, a) : r.dispatchEvent(a));
}
var $o = (e, o, t = 0) => {
  const n = Math.abs(e.x),
    r = Math.abs(e.y),
    a = n > r;
  return o === "left" || o === "right" ? a && n > t : !a && r > t;
};
function Il(e = () => {}) {
  const o = W(e);
  G(() => {
    let t = 0,
      n = 0;
    return (
      (t = window.requestAnimationFrame(
        () => (n = window.requestAnimationFrame(o)),
      )),
      () => {
        (window.cancelAnimationFrame(t), window.cancelAnimationFrame(n));
      }
    );
  }, [o]);
}
function Ml(e) {
  return e.nodeType === e.ELEMENT_NODE;
}
function Dl(e) {
  const o = [],
    t = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (n) => {
        const r = n.tagName === "INPUT" && n.type === "hidden";
        return n.disabled || n.hidden || r
          ? NodeFilter.FILTER_SKIP
          : n.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      },
    });
  for (; t.nextNode(); ) o.push(t.currentNode);
  return o;
}
function $t(e) {
  const o = document.activeElement;
  return e.some((t) =>
    t === o ? !0 : (t.focus(), document.activeElement !== o),
  );
}
var Hd = yr,
  Vd = Pr,
  Kd = Tr,
  Ud = _r,
  Wd = Ar,
  Gd = Mr,
  zd = xo,
  [xt] = q("Tooltip", [ge]),
  So = ge(),
  jr = "TooltipProvider",
  Nl = 700,
  Bo = "tooltip.open",
  [Ol, Lr] = xt(jr),
  kr = (e) => {
    const {
        __scopeTooltip: o,
        delayDuration: t = Nl,
        skipDelayDuration: n = 300,
        disableHoverableContent: r = !1,
        children: a,
      } = e,
      i = s.useRef(!0),
      c = s.useRef(!1),
      u = s.useRef(0);
    return (
      s.useEffect(() => {
        const d = u.current;
        return () => window.clearTimeout(d);
      }, []),
      l.jsx(Ol, {
        scope: o,
        isOpenDelayedRef: i,
        delayDuration: t,
        onOpen: s.useCallback(() => {
          (window.clearTimeout(u.current), (i.current = !1));
        }, []),
        onClose: s.useCallback(() => {
          (window.clearTimeout(u.current),
            (u.current = window.setTimeout(() => (i.current = !0), n)));
        }, [n]),
        isPointerInTransitRef: c,
        onPointerInTransitChange: s.useCallback((d) => {
          c.current = d;
        }, []),
        disableHoverableContent: r,
        children: a,
      })
    );
  };
kr.displayName = jr;
var Fr = "Tooltip",
  [Yd, St] = xt(Fr),
  Gt = "TooltipTrigger",
  jl = s.forwardRef((e, o) => {
    const { __scopeTooltip: t, ...n } = e,
      r = St(Gt, t),
      a = Lr(Gt, t),
      i = So(t),
      c = s.useRef(null),
      u = I(o, c, r.onTriggerChange),
      d = s.useRef(!1),
      f = s.useRef(!1),
      p = s.useCallback(() => (d.current = !1), []);
    return (
      s.useEffect(
        () => () => document.removeEventListener("pointerup", p),
        [p],
      ),
      l.jsx(Ue, {
        asChild: !0,
        ...i,
        children: l.jsx(E.button, {
          "aria-describedby": r.open ? r.contentId : void 0,
          "data-state": r.stateAttribute,
          ...n,
          ref: u,
          onPointerMove: b(e.onPointerMove, (v) => {
            v.pointerType !== "touch" &&
              !f.current &&
              !a.isPointerInTransitRef.current &&
              (r.onTriggerEnter(), (f.current = !0));
          }),
          onPointerLeave: b(e.onPointerLeave, () => {
            (r.onTriggerLeave(), (f.current = !1));
          }),
          onPointerDown: b(e.onPointerDown, () => {
            (r.open && r.onClose(),
              (d.current = !0),
              document.addEventListener("pointerup", p, { once: !0 }));
          }),
          onFocus: b(e.onFocus, () => {
            d.current || r.onOpen();
          }),
          onBlur: b(e.onBlur, r.onClose),
          onClick: b(e.onClick, r.onClose),
        }),
      })
    );
  });
jl.displayName = Gt;
var Ll = "TooltipPortal",
  [Xd, kl] = xt(Ll, { forceMount: void 0 }),
  Ie = "TooltipContent",
  $r = s.forwardRef((e, o) => {
    const t = kl(Ie, e.__scopeTooltip),
      { forceMount: n = t.forceMount, side: r = "top", ...a } = e,
      i = St(Ie, e.__scopeTooltip);
    return l.jsx(Y, {
      present: n || i.open,
      children: i.disableHoverableContent
        ? l.jsx(Br, { side: r, ...a, ref: o })
        : l.jsx(Fl, { side: r, ...a, ref: o }),
    });
  }),
  Fl = s.forwardRef((e, o) => {
    const t = St(Ie, e.__scopeTooltip),
      n = Lr(Ie, e.__scopeTooltip),
      r = s.useRef(null),
      a = I(o, r),
      [i, c] = s.useState(null),
      { trigger: u, onClose: d } = t,
      f = r.current,
      { onPointerInTransitChange: p } = n,
      v = s.useCallback(() => {
        (c(null), p(!1));
      }, [p]),
      g = s.useCallback(
        (x, m) => {
          const h = x.currentTarget,
            w = { x: x.clientX, y: x.clientY },
            S = Kl(w, h.getBoundingClientRect()),
            C = Ul(w, S),
            y = Wl(m.getBoundingClientRect()),
            _ = zl([...C, ...y]);
          (c(_), p(!0));
        },
        [p],
      );
    return (
      s.useEffect(() => () => v(), [v]),
      s.useEffect(() => {
        if (u && f) {
          const x = (h) => g(h, f),
            m = (h) => g(h, u);
          return (
            u.addEventListener("pointerleave", x),
            f.addEventListener("pointerleave", m),
            () => {
              (u.removeEventListener("pointerleave", x),
                f.removeEventListener("pointerleave", m));
            }
          );
        }
      }, [u, f, g, v]),
      s.useEffect(() => {
        if (i) {
          const x = (m) => {
            const h = m.target,
              w = { x: m.clientX, y: m.clientY },
              S = u?.contains(h) || f?.contains(h),
              C = !Gl(w, i);
            S ? v() : C && (v(), d());
          };
          return (
            document.addEventListener("pointermove", x),
            () => document.removeEventListener("pointermove", x)
          );
        }
      }, [u, f, i, d, v]),
      l.jsx(Br, { ...e, ref: a })
    );
  }),
  [$l, Bl] = xt(Fr, { isInside: !1 }),
  Hl = Uo("TooltipContent"),
  Br = s.forwardRef((e, o) => {
    const {
        __scopeTooltip: t,
        children: n,
        "aria-label": r,
        onEscapeKeyDown: a,
        onPointerDownOutside: i,
        ...c
      } = e,
      u = St(Ie, t),
      d = So(t),
      { onClose: f } = u;
    return (
      s.useEffect(
        () => (
          document.addEventListener(Bo, f),
          () => document.removeEventListener(Bo, f)
        ),
        [f],
      ),
      s.useEffect(() => {
        if (u.trigger) {
          const p = (v) => {
            v.target?.contains(u.trigger) && f();
          };
          return (
            window.addEventListener("scroll", p, { capture: !0 }),
            () => window.removeEventListener("scroll", p, { capture: !0 })
          );
        }
      }, [u.trigger, f]),
      l.jsx(Re, {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: a,
        onPointerDownOutside: i,
        onFocusOutside: (p) => p.preventDefault(),
        onDismiss: f,
        children: l.jsxs(ut, {
          "data-state": u.stateAttribute,
          ...d,
          ...c,
          ref: o,
          style: {
            ...c.style,
            "--radix-tooltip-content-transform-origin":
              "var(--radix-popper-transform-origin)",
            "--radix-tooltip-content-available-width":
              "var(--radix-popper-available-width)",
            "--radix-tooltip-content-available-height":
              "var(--radix-popper-available-height)",
            "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-tooltip-trigger-height":
              "var(--radix-popper-anchor-height)",
          },
          children: [
            l.jsx(Hl, { children: n }),
            l.jsx($l, {
              scope: t,
              isInside: !0,
              children: l.jsx(ml, {
                id: u.contentId,
                role: "tooltip",
                children: r || n,
              }),
            }),
          ],
        }),
      })
    );
  });
$r.displayName = Ie;
var Hr = "TooltipArrow",
  Vl = s.forwardRef((e, o) => {
    const { __scopeTooltip: t, ...n } = e,
      r = So(t);
    return Bl(Hr, t).isInside ? null : l.jsx(dt, { ...r, ...n, ref: o });
  });
Vl.displayName = Hr;
function Kl(e, o) {
  const t = Math.abs(o.top - e.y),
    n = Math.abs(o.bottom - e.y),
    r = Math.abs(o.right - e.x),
    a = Math.abs(o.left - e.x);
  switch (Math.min(t, n, r, a)) {
    case a:
      return "left";
    case r:
      return "right";
    case t:
      return "top";
    case n:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function Ul(e, o, t = 5) {
  const n = [];
  switch (o) {
    case "top":
      n.push({ x: e.x - t, y: e.y + t }, { x: e.x + t, y: e.y + t });
      break;
    case "bottom":
      n.push({ x: e.x - t, y: e.y - t }, { x: e.x + t, y: e.y - t });
      break;
    case "left":
      n.push({ x: e.x + t, y: e.y - t }, { x: e.x + t, y: e.y + t });
      break;
    case "right":
      n.push({ x: e.x - t, y: e.y - t }, { x: e.x - t, y: e.y + t });
      break;
  }
  return n;
}
function Wl(e) {
  const { top: o, right: t, bottom: n, left: r } = e;
  return [
    { x: r, y: o },
    { x: t, y: o },
    { x: t, y: n },
    { x: r, y: n },
  ];
}
function Gl(e, o) {
  const { x: t, y: n } = e;
  let r = !1;
  for (let a = 0, i = o.length - 1; a < o.length; i = a++) {
    const c = o[a],
      u = o[i],
      d = c.x,
      f = c.y,
      p = u.x,
      v = u.y;
    f > n != v > n && t < ((p - d) * (n - f)) / (v - f) + d && (r = !r);
  }
  return r;
}
function zl(e) {
  const o = e.slice();
  return (
    o.sort((t, n) =>
      t.x < n.x ? -1 : t.x > n.x ? 1 : t.y < n.y ? -1 : t.y > n.y ? 1 : 0,
    ),
    Yl(o)
  );
}
function Yl(e) {
  if (e.length <= 1) return e.slice();
  const o = [];
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (; o.length >= 2; ) {
      const a = o[o.length - 1],
        i = o[o.length - 2];
      if ((a.x - i.x) * (r.y - i.y) >= (a.y - i.y) * (r.x - i.x)) o.pop();
      else break;
    }
    o.push(r);
  }
  o.pop();
  const t = [];
  for (let n = e.length - 1; n >= 0; n--) {
    const r = e[n];
    for (; t.length >= 2; ) {
      const a = t[t.length - 1],
        i = t[t.length - 2];
      if ((a.x - i.x) * (r.y - i.y) >= (a.y - i.y) * (r.x - i.x)) t.pop();
      else break;
    }
    t.push(r);
  }
  return (
    t.pop(),
    o.length === 1 && t.length === 1 && o[0].x === t[0].x && o[0].y === t[0].y
      ? o
      : o.concat(t)
  );
}
var qd = kr,
  Zd = $r,
  Xl = "Label",
  Vr = s.forwardRef((e, o) =>
    l.jsx(E.label, {
      ...e,
      ref: o,
      onMouseDown: (t) => {
        t.target.closest("button, input, select, textarea") ||
          (e.onMouseDown?.(t),
          !t.defaultPrevented && t.detail > 1 && t.preventDefault());
      },
    }),
  );
Vr.displayName = Xl;
var Jd = Vr,
  Ct = "Tabs",
  [ql] = q(Ct, [ft]),
  Kr = ft(),
  [Zl, Co] = ql(Ct),
  Ur = s.forwardRef((e, o) => {
    const {
        __scopeTabs: t,
        value: n,
        onValueChange: r,
        defaultValue: a,
        orientation: i = "horizontal",
        dir: c,
        activationMode: u = "automatic",
        ...d
      } = e,
      f = Ne(c),
      [p, v] = le({ prop: n, onChange: r, defaultProp: a ?? "", caller: Ct });
    return l.jsx(Zl, {
      scope: t,
      baseId: ce(),
      value: p,
      onValueChange: v,
      orientation: i,
      dir: f,
      activationMode: u,
      children: l.jsx(E.div, { dir: f, "data-orientation": i, ...d, ref: o }),
    });
  });
Ur.displayName = Ct;
var Wr = "TabsList",
  Gr = s.forwardRef((e, o) => {
    const { __scopeTabs: t, loop: n = !0, ...r } = e,
      a = Co(Wr, t),
      i = Kr(t);
    return l.jsx(dn, {
      asChild: !0,
      ...i,
      orientation: a.orientation,
      dir: a.dir,
      loop: n,
      children: l.jsx(E.div, {
        role: "tablist",
        "aria-orientation": a.orientation,
        ...r,
        ref: o,
      }),
    });
  });
Gr.displayName = Wr;
var zr = "TabsTrigger",
  Yr = s.forwardRef((e, o) => {
    const { __scopeTabs: t, value: n, disabled: r = !1, ...a } = e,
      i = Co(zr, t),
      c = Kr(t),
      u = Zr(i.baseId, n),
      d = Jr(i.baseId, n),
      f = n === i.value;
    return l.jsx(fn, {
      asChild: !0,
      ...c,
      focusable: !r,
      active: f,
      children: l.jsx(E.button, {
        type: "button",
        role: "tab",
        "aria-selected": f,
        "aria-controls": d,
        "data-state": f ? "active" : "inactive",
        "data-disabled": r ? "" : void 0,
        disabled: r,
        id: u,
        ...a,
        ref: o,
        onMouseDown: b(e.onMouseDown, (p) => {
          !r && p.button === 0 && p.ctrlKey === !1
            ? i.onValueChange(n)
            : p.preventDefault();
        }),
        onKeyDown: b(e.onKeyDown, (p) => {
          [" ", "Enter"].includes(p.key) && i.onValueChange(n);
        }),
        onFocus: b(e.onFocus, () => {
          const p = i.activationMode !== "manual";
          !f && !r && p && i.onValueChange(n);
        }),
      }),
    });
  });
Yr.displayName = zr;
var Xr = "TabsContent",
  qr = s.forwardRef((e, o) => {
    const { __scopeTabs: t, value: n, forceMount: r, children: a, ...i } = e,
      c = Co(Xr, t),
      u = Zr(c.baseId, n),
      d = Jr(c.baseId, n),
      f = n === c.value,
      p = s.useRef(f);
    return (
      s.useEffect(() => {
        const v = requestAnimationFrame(() => (p.current = !1));
        return () => cancelAnimationFrame(v);
      }, []),
      l.jsx(Y, {
        present: r || f,
        children: ({ present: v }) =>
          l.jsx(E.div, {
            "data-state": f ? "active" : "inactive",
            "data-orientation": c.orientation,
            role: "tabpanel",
            "aria-labelledby": u,
            hidden: !v,
            id: d,
            tabIndex: 0,
            ...i,
            ref: o,
            style: { ...e.style, animationDuration: p.current ? "0s" : void 0 },
            children: v && a,
          }),
      })
    );
  });
qr.displayName = Xr;
function Zr(e, o) {
  return `${e}-trigger-${o}`;
}
function Jr(e, o) {
  return `${e}-content-${o}`;
}
var Qd = Ur,
  ef = Gr,
  tf = Yr,
  of = qr;
function He(e, [o, t]) {
  return Math.min(t, Math.max(o, e));
}
function bt(e) {
  const o = s.useRef({ value: e, previous: e });
  return s.useMemo(
    () => (
      o.current.value !== e &&
        ((o.current.previous = o.current.value), (o.current.value = e)),
      o.current.previous
    ),
    [e],
  );
}
var Qr = ["PageUp", "PageDown"],
  es = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
  ts = {
    "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
    "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
    "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
    "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"],
  },
  je = "Slider",
  [zt, Jl, Ql] = Ve(je),
  [os] = q(je, [Ql]),
  [eu, yt] = os(je),
  ns = s.forwardRef((e, o) => {
    const {
        name: t,
        min: n = 0,
        max: r = 100,
        step: a = 1,
        orientation: i = "horizontal",
        disabled: c = !1,
        minStepsBetweenThumbs: u = 0,
        defaultValue: d = [n],
        value: f,
        onValueChange: p = () => {},
        onValueCommit: v = () => {},
        inverted: g = !1,
        form: x,
        ...m
      } = e,
      h = s.useRef(new Set()),
      w = s.useRef(0),
      C = i === "horizontal" ? tu : ou,
      [y = [], _] = le({
        prop: f,
        defaultProp: d,
        onChange: (M) => {
          ([...h.current][w.current]?.focus(), p(M));
        },
      }),
      D = s.useRef(y);
    function P(M) {
      const F = iu(y, M);
      j(M, F);
    }
    function O(M) {
      j(M, w.current);
    }
    function N() {
      const M = D.current[w.current];
      y[w.current] !== M && v(y);
    }
    function j(M, F, { commit: H } = { commit: !1 }) {
      const A = du(a),
        $ = fu(Math.round((M - n) / a) * a + n, A),
        L = He($, [n, r]);
      _((B = []) => {
        const k = su(B, L, F);
        if (uu(k, u * a)) {
          w.current = k.indexOf(L);
          const T = String(k) !== String(B);
          return (T && H && v(k), T ? k : B);
        } else return B;
      });
    }
    return l.jsx(eu, {
      scope: e.__scopeSlider,
      name: t,
      disabled: c,
      min: n,
      max: r,
      valueIndexToChangeRef: w,
      thumbs: h.current,
      values: y,
      orientation: i,
      form: x,
      children: l.jsx(zt.Provider, {
        scope: e.__scopeSlider,
        children: l.jsx(zt.Slot, {
          scope: e.__scopeSlider,
          children: l.jsx(C, {
            "aria-disabled": c,
            "data-disabled": c ? "" : void 0,
            ...m,
            ref: o,
            onPointerDown: b(m.onPointerDown, () => {
              c || (D.current = y);
            }),
            min: n,
            max: r,
            inverted: g,
            onSlideStart: c ? void 0 : P,
            onSlideMove: c ? void 0 : O,
            onSlideEnd: c ? void 0 : N,
            onHomeKeyDown: () => !c && j(n, 0, { commit: !0 }),
            onEndKeyDown: () => !c && j(r, y.length - 1, { commit: !0 }),
            onStepKeyDown: ({ event: M, direction: F }) => {
              if (!c) {
                const $ =
                    Qr.includes(M.key) || (M.shiftKey && es.includes(M.key))
                      ? 10
                      : 1,
                  L = w.current,
                  B = y[L],
                  k = a * $ * F;
                j(B + k, L, { commit: !0 });
              }
            },
          }),
        }),
      }),
    });
  });
ns.displayName = je;
var [rs, ss] = os(je, {
    startEdge: "left",
    endEdge: "right",
    size: "width",
    direction: 1,
  }),
  tu = s.forwardRef((e, o) => {
    const {
        min: t,
        max: n,
        dir: r,
        inverted: a,
        onSlideStart: i,
        onSlideMove: c,
        onSlideEnd: u,
        onStepKeyDown: d,
        ...f
      } = e,
      [p, v] = s.useState(null),
      g = I(o, (C) => v(C)),
      x = s.useRef(void 0),
      m = Ne(r),
      h = m === "ltr",
      w = (h && !a) || (!h && a);
    function S(C) {
      const y = x.current || p.getBoundingClientRect(),
        _ = [0, y.width],
        P = bo(_, w ? [t, n] : [n, t]);
      return ((x.current = y), P(C - y.left));
    }
    return l.jsx(rs, {
      scope: e.__scopeSlider,
      startEdge: w ? "left" : "right",
      endEdge: w ? "right" : "left",
      direction: w ? 1 : -1,
      size: "width",
      children: l.jsx(as, {
        dir: m,
        "data-orientation": "horizontal",
        ...f,
        ref: g,
        style: {
          ...f.style,
          "--radix-slider-thumb-transform": "translateX(-50%)",
        },
        onSlideStart: (C) => {
          const y = S(C.clientX);
          i?.(y);
        },
        onSlideMove: (C) => {
          const y = S(C.clientX);
          c?.(y);
        },
        onSlideEnd: () => {
          ((x.current = void 0), u?.());
        },
        onStepKeyDown: (C) => {
          const _ = ts[w ? "from-left" : "from-right"].includes(C.key);
          d?.({ event: C, direction: _ ? -1 : 1 });
        },
      }),
    });
  }),
  ou = s.forwardRef((e, o) => {
    const {
        min: t,
        max: n,
        inverted: r,
        onSlideStart: a,
        onSlideMove: i,
        onSlideEnd: c,
        onStepKeyDown: u,
        ...d
      } = e,
      f = s.useRef(null),
      p = I(o, f),
      v = s.useRef(void 0),
      g = !r;
    function x(m) {
      const h = v.current || f.current.getBoundingClientRect(),
        w = [0, h.height],
        C = bo(w, g ? [n, t] : [t, n]);
      return ((v.current = h), C(m - h.top));
    }
    return l.jsx(rs, {
      scope: e.__scopeSlider,
      startEdge: g ? "bottom" : "top",
      endEdge: g ? "top" : "bottom",
      size: "height",
      direction: g ? 1 : -1,
      children: l.jsx(as, {
        "data-orientation": "vertical",
        ...d,
        ref: p,
        style: {
          ...d.style,
          "--radix-slider-thumb-transform": "translateY(50%)",
        },
        onSlideStart: (m) => {
          const h = x(m.clientY);
          a?.(h);
        },
        onSlideMove: (m) => {
          const h = x(m.clientY);
          i?.(h);
        },
        onSlideEnd: () => {
          ((v.current = void 0), c?.());
        },
        onStepKeyDown: (m) => {
          const w = ts[g ? "from-bottom" : "from-top"].includes(m.key);
          u?.({ event: m, direction: w ? -1 : 1 });
        },
      }),
    });
  }),
  as = s.forwardRef((e, o) => {
    const {
        __scopeSlider: t,
        onSlideStart: n,
        onSlideMove: r,
        onSlideEnd: a,
        onHomeKeyDown: i,
        onEndKeyDown: c,
        onStepKeyDown: u,
        ...d
      } = e,
      f = yt(je, t);
    return l.jsx(E.span, {
      ...d,
      ref: o,
      onKeyDown: b(e.onKeyDown, (p) => {
        p.key === "Home"
          ? (i(p), p.preventDefault())
          : p.key === "End"
            ? (c(p), p.preventDefault())
            : Qr.concat(es).includes(p.key) && (u(p), p.preventDefault());
      }),
      onPointerDown: b(e.onPointerDown, (p) => {
        const v = p.target;
        (v.setPointerCapture(p.pointerId),
          p.preventDefault(),
          f.thumbs.has(v) ? v.focus() : n(p));
      }),
      onPointerMove: b(e.onPointerMove, (p) => {
        p.target.hasPointerCapture(p.pointerId) && r(p);
      }),
      onPointerUp: b(e.onPointerUp, (p) => {
        const v = p.target;
        v.hasPointerCapture(p.pointerId) &&
          (v.releasePointerCapture(p.pointerId), a(p));
      }),
    });
  }),
  is = "SliderTrack",
  cs = s.forwardRef((e, o) => {
    const { __scopeSlider: t, ...n } = e,
      r = yt(is, t);
    return l.jsx(E.span, {
      "data-disabled": r.disabled ? "" : void 0,
      "data-orientation": r.orientation,
      ...n,
      ref: o,
    });
  });
cs.displayName = is;
var Yt = "SliderRange",
  ls = s.forwardRef((e, o) => {
    const { __scopeSlider: t, ...n } = e,
      r = yt(Yt, t),
      a = ss(Yt, t),
      i = s.useRef(null),
      c = I(o, i),
      u = r.values.length,
      d = r.values.map((v) => fs(v, r.min, r.max)),
      f = u > 1 ? Math.min(...d) : 0,
      p = 100 - Math.max(...d);
    return l.jsx(E.span, {
      "data-orientation": r.orientation,
      "data-disabled": r.disabled ? "" : void 0,
      ...n,
      ref: c,
      style: { ...e.style, [a.startEdge]: f + "%", [a.endEdge]: p + "%" },
    });
  });
ls.displayName = Yt;
var Xt = "SliderThumb",
  us = s.forwardRef((e, o) => {
    const t = Jl(e.__scopeSlider),
      [n, r] = s.useState(null),
      a = I(o, (c) => r(c)),
      i = s.useMemo(
        () => (n ? t().findIndex((c) => c.ref.current === n) : -1),
        [t, n],
      );
    return l.jsx(nu, { ...e, ref: a, index: i });
  }),
  nu = s.forwardRef((e, o) => {
    const { __scopeSlider: t, index: n, name: r, ...a } = e,
      i = yt(Xt, t),
      c = ss(Xt, t),
      [u, d] = s.useState(null),
      f = I(o, (S) => d(S)),
      p = u ? i.form || !!u.closest("form") : !0,
      v = lt(u),
      g = i.values[n],
      x = g === void 0 ? 0 : fs(g, i.min, i.max),
      m = au(n, i.values.length),
      h = v?.[c.size],
      w = h ? cu(h, x, c.direction) : 0;
    return (
      s.useEffect(() => {
        if (u)
          return (
            i.thumbs.add(u),
            () => {
              i.thumbs.delete(u);
            }
          );
      }, [u, i.thumbs]),
      l.jsxs("span", {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [c.startEdge]: `calc(${x}% + ${w}px)`,
        },
        children: [
          l.jsx(zt.ItemSlot, {
            scope: e.__scopeSlider,
            children: l.jsx(E.span, {
              role: "slider",
              "aria-label": e["aria-label"] || m,
              "aria-valuemin": i.min,
              "aria-valuenow": g,
              "aria-valuemax": i.max,
              "aria-orientation": i.orientation,
              "data-orientation": i.orientation,
              "data-disabled": i.disabled ? "" : void 0,
              tabIndex: i.disabled ? void 0 : 0,
              ...a,
              ref: f,
              style: g === void 0 ? { display: "none" } : e.style,
              onFocus: b(e.onFocus, () => {
                i.valueIndexToChangeRef.current = n;
              }),
            }),
          }),
          p &&
            l.jsx(
              ds,
              {
                name:
                  r ??
                  (i.name
                    ? i.name + (i.values.length > 1 ? "[]" : "")
                    : void 0),
                form: i.form,
                value: g,
              },
              n,
            ),
        ],
      })
    );
  });
us.displayName = Xt;
var ru = "RadioBubbleInput",
  ds = s.forwardRef(({ __scopeSlider: e, value: o, ...t }, n) => {
    const r = s.useRef(null),
      a = I(r, n),
      i = bt(o);
    return (
      s.useEffect(() => {
        const c = r.current;
        if (!c) return;
        const u = window.HTMLInputElement.prototype,
          f = Object.getOwnPropertyDescriptor(u, "value").set;
        if (i !== o && f) {
          const p = new Event("input", { bubbles: !0 });
          (f.call(c, o), c.dispatchEvent(p));
        }
      }, [i, o]),
      l.jsx(E.input, {
        style: { display: "none" },
        ...t,
        ref: a,
        defaultValue: o,
      })
    );
  });
ds.displayName = ru;
function su(e = [], o, t) {
  const n = [...e];
  return ((n[t] = o), n.sort((r, a) => r - a));
}
function fs(e, o, t) {
  const a = (100 / (t - o)) * (e - o);
  return He(a, [0, 100]);
}
function au(e, o) {
  return o > 2
    ? `Value ${e + 1} of ${o}`
    : o === 2
      ? ["Minimum", "Maximum"][e]
      : void 0;
}
function iu(e, o) {
  if (e.length === 1) return 0;
  const t = e.map((r) => Math.abs(r - o)),
    n = Math.min(...t);
  return t.indexOf(n);
}
function cu(e, o, t) {
  const n = e / 2,
    a = bo([0, 50], [0, n]);
  return (n - a(o) * t) * t;
}
function lu(e) {
  return e.slice(0, -1).map((o, t) => e[t + 1] - o);
}
function uu(e, o) {
  if (o > 0) {
    const t = lu(e);
    return Math.min(...t) >= o;
  }
  return !0;
}
function bo(e, o) {
  return (t) => {
    if (e[0] === e[1] || o[0] === o[1]) return o[0];
    const n = (o[1] - o[0]) / (e[1] - e[0]);
    return o[0] + n * (t - e[0]);
  };
}
function du(e) {
  return (String(e).split(".")[1] || "").length;
}
function fu(e, o) {
  const t = Math.pow(10, o);
  return Math.round(e * t) / t;
}
var nf = ns,
  rf = cs,
  sf = ls,
  af = us,
  ps = "AlertDialog",
  [pu] = q(ps, [Jn]),
  pe = Jn(),
  vs = (e) => {
    const { __scopeAlertDialog: o, ...t } = e,
      n = pe(o);
    return l.jsx(ol, { ...n, ...t, modal: !0 });
  };
vs.displayName = ps;
var vu = "AlertDialogTrigger",
  ms = s.forwardRef((e, o) => {
    const { __scopeAlertDialog: t, ...n } = e,
      r = pe(t);
    return l.jsx(nl, { ...r, ...n, ref: o });
  });
ms.displayName = vu;
var mu = "AlertDialogPortal",
  hs = (e) => {
    const { __scopeAlertDialog: o, ...t } = e,
      n = pe(o);
    return l.jsx(rl, { ...n, ...t });
  };
hs.displayName = mu;
var hu = "AlertDialogOverlay",
  gs = s.forwardRef((e, o) => {
    const { __scopeAlertDialog: t, ...n } = e,
      r = pe(t);
    return l.jsx(sl, { ...r, ...n, ref: o });
  });
gs.displayName = hu;
var Ae = "AlertDialogContent",
  [gu, wu] = pu(Ae),
  xu = Uo("AlertDialogContent"),
  ws = s.forwardRef((e, o) => {
    const { __scopeAlertDialog: t, children: n, ...r } = e,
      a = pe(t),
      i = s.useRef(null),
      c = I(o, i),
      u = s.useRef(null);
    return l.jsx(Jc, {
      contentName: Ae,
      titleName: xs,
      docsSlug: "alert-dialog",
      children: l.jsx(gu, {
        scope: t,
        cancelRef: u,
        children: l.jsxs(al, {
          role: "alertdialog",
          ...a,
          ...r,
          ref: c,
          onOpenAutoFocus: b(r.onOpenAutoFocus, (d) => {
            (d.preventDefault(), u.current?.focus({ preventScroll: !0 }));
          }),
          onPointerDownOutside: (d) => d.preventDefault(),
          onInteractOutside: (d) => d.preventDefault(),
          children: [l.jsx(xu, { children: n }), l.jsx(Cu, { contentRef: i })],
        }),
      }),
    });
  });
ws.displayName = Ae;
var xs = "AlertDialogTitle",
  Ss = s.forwardRef((e, o) => {
    const { __scopeAlertDialog: t, ...n } = e,
      r = pe(t);
    return l.jsx(il, { ...r, ...n, ref: o });
  });
Ss.displayName = xs;
var Cs = "AlertDialogDescription",
  bs = s.forwardRef((e, o) => {
    const { __scopeAlertDialog: t, ...n } = e,
      r = pe(t);
    return l.jsx(cl, { ...r, ...n, ref: o });
  });
bs.displayName = Cs;
var Su = "AlertDialogAction",
  ys = s.forwardRef((e, o) => {
    const { __scopeAlertDialog: t, ...n } = e,
      r = pe(t);
    return l.jsx(vr, { ...r, ...n, ref: o });
  });
ys.displayName = Su;
var Es = "AlertDialogCancel",
  Ps = s.forwardRef((e, o) => {
    const { __scopeAlertDialog: t, ...n } = e,
      { cancelRef: r } = wu(Es, t),
      a = pe(t),
      i = I(o, r);
    return l.jsx(vr, { ...a, ...n, ref: i });
  });
Ps.displayName = Es;
var Cu = ({ contentRef: e }) => {
    const o = `\`${Ae}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${Ae}\` by passing a \`${Cs}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${Ae}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
    return (
      s.useEffect(() => {
        document.getElementById(e.current?.getAttribute("aria-describedby")) ||
          console.warn(o);
      }, [o, e]),
      null
    );
  },
  cf = vs,
  lf = ms,
  uf = hs,
  df = gs,
  ff = ws,
  pf = ys,
  vf = Ps,
  mf = Ss,
  hf = bs;
function bu(e, o) {
  return s.useReducer((t, n) => o[t][n] ?? t, e);
}
var yo = "ScrollArea",
  [Rs] = q(yo),
  [yu, ae] = Rs(yo),
  Ts = s.forwardRef((e, o) => {
    const {
        __scopeScrollArea: t,
        type: n = "hover",
        dir: r,
        scrollHideDelay: a = 600,
        ...i
      } = e,
      [c, u] = s.useState(null),
      [d, f] = s.useState(null),
      [p, v] = s.useState(null),
      [g, x] = s.useState(null),
      [m, h] = s.useState(null),
      [w, S] = s.useState(0),
      [C, y] = s.useState(0),
      [_, D] = s.useState(!1),
      [P, O] = s.useState(!1),
      N = I(o, (M) => u(M)),
      j = Ne(r);
    return l.jsx(yu, {
      scope: t,
      type: n,
      dir: j,
      scrollHideDelay: a,
      scrollArea: c,
      viewport: d,
      onViewportChange: f,
      content: p,
      onContentChange: v,
      scrollbarX: g,
      onScrollbarXChange: x,
      scrollbarXEnabled: _,
      onScrollbarXEnabledChange: D,
      scrollbarY: m,
      onScrollbarYChange: h,
      scrollbarYEnabled: P,
      onScrollbarYEnabledChange: O,
      onCornerWidthChange: S,
      onCornerHeightChange: y,
      children: l.jsx(E.div, {
        dir: j,
        ...i,
        ref: N,
        style: {
          position: "relative",
          "--radix-scroll-area-corner-width": w + "px",
          "--radix-scroll-area-corner-height": C + "px",
          ...e.style,
        },
      }),
    });
  });
Ts.displayName = yo;
var _s = "ScrollAreaViewport",
  As = s.forwardRef((e, o) => {
    const { __scopeScrollArea: t, children: n, nonce: r, ...a } = e,
      i = ae(_s, t),
      c = s.useRef(null),
      u = I(o, c, i.onViewportChange);
    return l.jsxs(l.Fragment, {
      children: [
        l.jsx("style", {
          dangerouslySetInnerHTML: {
            __html:
              "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}",
          },
          nonce: r,
        }),
        l.jsx(E.div, {
          "data-radix-scroll-area-viewport": "",
          ...a,
          ref: u,
          style: {
            overflowX: i.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: i.scrollbarYEnabled ? "scroll" : "hidden",
            ...e.style,
          },
          children: l.jsx("div", {
            ref: i.onContentChange,
            style: { minWidth: "100%", display: "table" },
            children: n,
          }),
        }),
      ],
    });
  });
As.displayName = _s;
var de = "ScrollAreaScrollbar",
  Eu = s.forwardRef((e, o) => {
    const { forceMount: t, ...n } = e,
      r = ae(de, e.__scopeScrollArea),
      { onScrollbarXEnabledChange: a, onScrollbarYEnabledChange: i } = r,
      c = e.orientation === "horizontal";
    return (
      s.useEffect(
        () => (
          c ? a(!0) : i(!0),
          () => {
            c ? a(!1) : i(!1);
          }
        ),
        [c, a, i],
      ),
      r.type === "hover"
        ? l.jsx(Pu, { ...n, ref: o, forceMount: t })
        : r.type === "scroll"
          ? l.jsx(Ru, { ...n, ref: o, forceMount: t })
          : r.type === "auto"
            ? l.jsx(Is, { ...n, ref: o, forceMount: t })
            : r.type === "always"
              ? l.jsx(Eo, { ...n, ref: o })
              : null
    );
  });
Eu.displayName = de;
var Pu = s.forwardRef((e, o) => {
    const { forceMount: t, ...n } = e,
      r = ae(de, e.__scopeScrollArea),
      [a, i] = s.useState(!1);
    return (
      s.useEffect(() => {
        const c = r.scrollArea;
        let u = 0;
        if (c) {
          const d = () => {
              (window.clearTimeout(u), i(!0));
            },
            f = () => {
              u = window.setTimeout(() => i(!1), r.scrollHideDelay);
            };
          return (
            c.addEventListener("pointerenter", d),
            c.addEventListener("pointerleave", f),
            () => {
              (window.clearTimeout(u),
                c.removeEventListener("pointerenter", d),
                c.removeEventListener("pointerleave", f));
            }
          );
        }
      }, [r.scrollArea, r.scrollHideDelay]),
      l.jsx(Y, {
        present: t || a,
        children: l.jsx(Is, {
          "data-state": a ? "visible" : "hidden",
          ...n,
          ref: o,
        }),
      })
    );
  }),
  Ru = s.forwardRef((e, o) => {
    const { forceMount: t, ...n } = e,
      r = ae(de, e.__scopeScrollArea),
      a = e.orientation === "horizontal",
      i = Pt(() => u("SCROLL_END"), 100),
      [c, u] = bu("hidden", {
        hidden: { SCROLL: "scrolling" },
        scrolling: { SCROLL_END: "idle", POINTER_ENTER: "interacting" },
        interacting: { SCROLL: "interacting", POINTER_LEAVE: "idle" },
        idle: {
          HIDE: "hidden",
          SCROLL: "scrolling",
          POINTER_ENTER: "interacting",
        },
      });
    return (
      s.useEffect(() => {
        if (c === "idle") {
          const d = window.setTimeout(() => u("HIDE"), r.scrollHideDelay);
          return () => window.clearTimeout(d);
        }
      }, [c, r.scrollHideDelay, u]),
      s.useEffect(() => {
        const d = r.viewport,
          f = a ? "scrollLeft" : "scrollTop";
        if (d) {
          let p = d[f];
          const v = () => {
            const g = d[f];
            (p !== g && (u("SCROLL"), i()), (p = g));
          };
          return (
            d.addEventListener("scroll", v),
            () => d.removeEventListener("scroll", v)
          );
        }
      }, [r.viewport, a, u, i]),
      l.jsx(Y, {
        present: t || c !== "hidden",
        children: l.jsx(Eo, {
          "data-state": c === "hidden" ? "hidden" : "visible",
          ...n,
          ref: o,
          onPointerEnter: b(e.onPointerEnter, () => u("POINTER_ENTER")),
          onPointerLeave: b(e.onPointerLeave, () => u("POINTER_LEAVE")),
        }),
      })
    );
  }),
  Is = s.forwardRef((e, o) => {
    const t = ae(de, e.__scopeScrollArea),
      { forceMount: n, ...r } = e,
      [a, i] = s.useState(!1),
      c = e.orientation === "horizontal",
      u = Pt(() => {
        if (t.viewport) {
          const d = t.viewport.offsetWidth < t.viewport.scrollWidth,
            f = t.viewport.offsetHeight < t.viewport.scrollHeight;
          i(c ? d : f);
        }
      }, 10);
    return (
      Me(t.viewport, u),
      Me(t.content, u),
      l.jsx(Y, {
        present: n || a,
        children: l.jsx(Eo, {
          "data-state": a ? "visible" : "hidden",
          ...r,
          ref: o,
        }),
      })
    );
  }),
  Eo = s.forwardRef((e, o) => {
    const { orientation: t = "vertical", ...n } = e,
      r = ae(de, e.__scopeScrollArea),
      a = s.useRef(null),
      i = s.useRef(0),
      [c, u] = s.useState({
        content: 0,
        viewport: 0,
        scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 },
      }),
      d = Os(c.viewport, c.content),
      f = {
        ...n,
        sizes: c,
        onSizesChange: u,
        hasThumb: d > 0 && d < 1,
        onThumbChange: (v) => (a.current = v),
        onThumbPointerUp: () => (i.current = 0),
        onThumbPointerDown: (v) => (i.current = v),
      };
    function p(v, g) {
      return Nu(v, i.current, c, g);
    }
    return t === "horizontal"
      ? l.jsx(Tu, {
          ...f,
          ref: o,
          onThumbPositionChange: () => {
            if (r.viewport && a.current) {
              const v = r.viewport.scrollLeft,
                g = Ho(v, c, r.dir);
              a.current.style.transform = `translate3d(${g}px, 0, 0)`;
            }
          },
          onWheelScroll: (v) => {
            r.viewport && (r.viewport.scrollLeft = v);
          },
          onDragScroll: (v) => {
            r.viewport && (r.viewport.scrollLeft = p(v, r.dir));
          },
        })
      : t === "vertical"
        ? l.jsx(_u, {
            ...f,
            ref: o,
            onThumbPositionChange: () => {
              if (r.viewport && a.current) {
                const v = r.viewport.scrollTop,
                  g = Ho(v, c);
                a.current.style.transform = `translate3d(0, ${g}px, 0)`;
              }
            },
            onWheelScroll: (v) => {
              r.viewport && (r.viewport.scrollTop = v);
            },
            onDragScroll: (v) => {
              r.viewport && (r.viewport.scrollTop = p(v));
            },
          })
        : null;
  }),
  Tu = s.forwardRef((e, o) => {
    const { sizes: t, onSizesChange: n, ...r } = e,
      a = ae(de, e.__scopeScrollArea),
      [i, c] = s.useState(),
      u = s.useRef(null),
      d = I(o, u, a.onScrollbarXChange);
    return (
      s.useEffect(() => {
        u.current && c(getComputedStyle(u.current));
      }, [u]),
      l.jsx(Ds, {
        "data-orientation": "horizontal",
        ...r,
        ref: d,
        sizes: t,
        style: {
          bottom: 0,
          left: a.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
          right: a.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
          "--radix-scroll-area-thumb-width": Et(t) + "px",
          ...e.style,
        },
        onThumbPointerDown: (f) => e.onThumbPointerDown(f.x),
        onDragScroll: (f) => e.onDragScroll(f.x),
        onWheelScroll: (f, p) => {
          if (a.viewport) {
            const v = a.viewport.scrollLeft + f.deltaX;
            (e.onWheelScroll(v), Ls(v, p) && f.preventDefault());
          }
        },
        onResize: () => {
          u.current &&
            a.viewport &&
            i &&
            n({
              content: a.viewport.scrollWidth,
              viewport: a.viewport.offsetWidth,
              scrollbar: {
                size: u.current.clientWidth,
                paddingStart: ot(i.paddingLeft),
                paddingEnd: ot(i.paddingRight),
              },
            });
        },
      })
    );
  }),
  _u = s.forwardRef((e, o) => {
    const { sizes: t, onSizesChange: n, ...r } = e,
      a = ae(de, e.__scopeScrollArea),
      [i, c] = s.useState(),
      u = s.useRef(null),
      d = I(o, u, a.onScrollbarYChange);
    return (
      s.useEffect(() => {
        u.current && c(getComputedStyle(u.current));
      }, [u]),
      l.jsx(Ds, {
        "data-orientation": "vertical",
        ...r,
        ref: d,
        sizes: t,
        style: {
          top: 0,
          right: a.dir === "ltr" ? 0 : void 0,
          left: a.dir === "rtl" ? 0 : void 0,
          bottom: "var(--radix-scroll-area-corner-height)",
          "--radix-scroll-area-thumb-height": Et(t) + "px",
          ...e.style,
        },
        onThumbPointerDown: (f) => e.onThumbPointerDown(f.y),
        onDragScroll: (f) => e.onDragScroll(f.y),
        onWheelScroll: (f, p) => {
          if (a.viewport) {
            const v = a.viewport.scrollTop + f.deltaY;
            (e.onWheelScroll(v), Ls(v, p) && f.preventDefault());
          }
        },
        onResize: () => {
          u.current &&
            a.viewport &&
            i &&
            n({
              content: a.viewport.scrollHeight,
              viewport: a.viewport.offsetHeight,
              scrollbar: {
                size: u.current.clientHeight,
                paddingStart: ot(i.paddingTop),
                paddingEnd: ot(i.paddingBottom),
              },
            });
        },
      })
    );
  }),
  [Au, Ms] = Rs(de),
  Ds = s.forwardRef((e, o) => {
    const {
        __scopeScrollArea: t,
        sizes: n,
        hasThumb: r,
        onThumbChange: a,
        onThumbPointerUp: i,
        onThumbPointerDown: c,
        onThumbPositionChange: u,
        onDragScroll: d,
        onWheelScroll: f,
        onResize: p,
        ...v
      } = e,
      g = ae(de, t),
      [x, m] = s.useState(null),
      h = I(o, (N) => m(N)),
      w = s.useRef(null),
      S = s.useRef(""),
      C = g.viewport,
      y = n.content - n.viewport,
      _ = W(f),
      D = W(u),
      P = Pt(p, 10);
    function O(N) {
      if (w.current) {
        const j = N.clientX - w.current.left,
          M = N.clientY - w.current.top;
        d({ x: j, y: M });
      }
    }
    return (
      s.useEffect(() => {
        const N = (j) => {
          const M = j.target;
          x?.contains(M) && _(j, y);
        };
        return (
          document.addEventListener("wheel", N, { passive: !1 }),
          () => document.removeEventListener("wheel", N, { passive: !1 })
        );
      }, [C, x, y, _]),
      s.useEffect(D, [n, D]),
      Me(x, P),
      Me(g.content, P),
      l.jsx(Au, {
        scope: t,
        scrollbar: x,
        hasThumb: r,
        onThumbChange: W(a),
        onThumbPointerUp: W(i),
        onThumbPositionChange: D,
        onThumbPointerDown: W(c),
        children: l.jsx(E.div, {
          ...v,
          ref: h,
          style: { position: "absolute", ...v.style },
          onPointerDown: b(e.onPointerDown, (N) => {
            N.button === 0 &&
              (N.target.setPointerCapture(N.pointerId),
              (w.current = x.getBoundingClientRect()),
              (S.current = document.body.style.webkitUserSelect),
              (document.body.style.webkitUserSelect = "none"),
              g.viewport && (g.viewport.style.scrollBehavior = "auto"),
              O(N));
          }),
          onPointerMove: b(e.onPointerMove, O),
          onPointerUp: b(e.onPointerUp, (N) => {
            const j = N.target;
            (j.hasPointerCapture(N.pointerId) &&
              j.releasePointerCapture(N.pointerId),
              (document.body.style.webkitUserSelect = S.current),
              g.viewport && (g.viewport.style.scrollBehavior = ""),
              (w.current = null));
          }),
        }),
      })
    );
  }),
  tt = "ScrollAreaThumb",
  Iu = s.forwardRef((e, o) => {
    const { forceMount: t, ...n } = e,
      r = Ms(tt, e.__scopeScrollArea);
    return l.jsx(Y, {
      present: t || r.hasThumb,
      children: l.jsx(Mu, { ref: o, ...n }),
    });
  }),
  Mu = s.forwardRef((e, o) => {
    const { __scopeScrollArea: t, style: n, ...r } = e,
      a = ae(tt, t),
      i = Ms(tt, t),
      { onThumbPositionChange: c } = i,
      u = I(o, (p) => i.onThumbChange(p)),
      d = s.useRef(void 0),
      f = Pt(() => {
        d.current && (d.current(), (d.current = void 0));
      }, 100);
    return (
      s.useEffect(() => {
        const p = a.viewport;
        if (p) {
          const v = () => {
            if ((f(), !d.current)) {
              const g = Ou(p, c);
              ((d.current = g), c());
            }
          };
          return (
            c(),
            p.addEventListener("scroll", v),
            () => p.removeEventListener("scroll", v)
          );
        }
      }, [a.viewport, f, c]),
      l.jsx(E.div, {
        "data-state": i.hasThumb ? "visible" : "hidden",
        ...r,
        ref: u,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...n,
        },
        onPointerDownCapture: b(e.onPointerDownCapture, (p) => {
          const g = p.target.getBoundingClientRect(),
            x = p.clientX - g.left,
            m = p.clientY - g.top;
          i.onThumbPointerDown({ x, y: m });
        }),
        onPointerUp: b(e.onPointerUp, i.onThumbPointerUp),
      })
    );
  });
Iu.displayName = tt;
var Po = "ScrollAreaCorner",
  Ns = s.forwardRef((e, o) => {
    const t = ae(Po, e.__scopeScrollArea),
      n = !!(t.scrollbarX && t.scrollbarY);
    return t.type !== "scroll" && n ? l.jsx(Du, { ...e, ref: o }) : null;
  });
Ns.displayName = Po;
var Du = s.forwardRef((e, o) => {
  const { __scopeScrollArea: t, ...n } = e,
    r = ae(Po, t),
    [a, i] = s.useState(0),
    [c, u] = s.useState(0),
    d = !!(a && c);
  return (
    Me(r.scrollbarX, () => {
      const f = r.scrollbarX?.offsetHeight || 0;
      (r.onCornerHeightChange(f), u(f));
    }),
    Me(r.scrollbarY, () => {
      const f = r.scrollbarY?.offsetWidth || 0;
      (r.onCornerWidthChange(f), i(f));
    }),
    d
      ? l.jsx(E.div, {
          ...n,
          ref: o,
          style: {
            width: a,
            height: c,
            position: "absolute",
            right: r.dir === "ltr" ? 0 : void 0,
            left: r.dir === "rtl" ? 0 : void 0,
            bottom: 0,
            ...e.style,
          },
        })
      : null
  );
});
function ot(e) {
  return e ? parseInt(e, 10) : 0;
}
function Os(e, o) {
  const t = e / o;
  return isNaN(t) ? 0 : t;
}
function Et(e) {
  const o = Os(e.viewport, e.content),
    t = e.scrollbar.paddingStart + e.scrollbar.paddingEnd,
    n = (e.scrollbar.size - t) * o;
  return Math.max(n, 18);
}
function Nu(e, o, t, n = "ltr") {
  const r = Et(t),
    a = r / 2,
    i = o || a,
    c = r - i,
    u = t.scrollbar.paddingStart + i,
    d = t.scrollbar.size - t.scrollbar.paddingEnd - c,
    f = t.content - t.viewport,
    p = n === "ltr" ? [0, f] : [f * -1, 0];
  return js([u, d], p)(e);
}
function Ho(e, o, t = "ltr") {
  const n = Et(o),
    r = o.scrollbar.paddingStart + o.scrollbar.paddingEnd,
    a = o.scrollbar.size - r,
    i = o.content - o.viewport,
    c = a - n,
    u = t === "ltr" ? [0, i] : [i * -1, 0],
    d = He(e, u);
  return js([0, i], [0, c])(d);
}
function js(e, o) {
  return (t) => {
    if (e[0] === e[1] || o[0] === o[1]) return o[0];
    const n = (o[1] - o[0]) / (e[1] - e[0]);
    return o[0] + n * (t - e[0]);
  };
}
function Ls(e, o) {
  return e > 0 && e < o;
}
var Ou = (e, o = () => {}) => {
  let t = { left: e.scrollLeft, top: e.scrollTop },
    n = 0;
  return (
    (function r() {
      const a = { left: e.scrollLeft, top: e.scrollTop },
        i = t.left !== a.left,
        c = t.top !== a.top;
      ((i || c) && o(), (t = a), (n = window.requestAnimationFrame(r)));
    })(),
    () => window.cancelAnimationFrame(n)
  );
};
function Pt(e, o) {
  const t = W(e),
    n = s.useRef(0);
  return (
    s.useEffect(() => () => window.clearTimeout(n.current), []),
    s.useCallback(() => {
      (window.clearTimeout(n.current), (n.current = window.setTimeout(t, o)));
    }, [t, o])
  );
}
function Me(e, o) {
  const t = W(o);
  G(() => {
    let n = 0;
    if (e) {
      const r = new ResizeObserver(() => {
        (cancelAnimationFrame(n), (n = window.requestAnimationFrame(t)));
      });
      return (
        r.observe(e),
        () => {
          (window.cancelAnimationFrame(n), r.unobserve(e));
        }
      );
    }
  }, [e, t]);
}
var gf = Ts,
  wf = As,
  xf = Ns,
  Rt = "Switch",
  [ju] = q(Rt),
  [Lu, ku] = ju(Rt),
  ks = s.forwardRef((e, o) => {
    const {
        __scopeSwitch: t,
        name: n,
        checked: r,
        defaultChecked: a,
        required: i,
        disabled: c,
        value: u = "on",
        onCheckedChange: d,
        form: f,
        ...p
      } = e,
      [v, g] = s.useState(null),
      x = I(o, (C) => g(C)),
      m = s.useRef(!1),
      h = v ? f || !!v.closest("form") : !0,
      [w, S] = le({ prop: r, defaultProp: a ?? !1, onChange: d, caller: Rt });
    return l.jsxs(Lu, {
      scope: t,
      checked: w,
      disabled: c,
      children: [
        l.jsx(E.button, {
          type: "button",
          role: "switch",
          "aria-checked": w,
          "aria-required": i,
          "data-state": Hs(w),
          "data-disabled": c ? "" : void 0,
          disabled: c,
          value: u,
          ...p,
          ref: x,
          onClick: b(e.onClick, (C) => {
            (S((y) => !y),
              h &&
                ((m.current = C.isPropagationStopped()),
                m.current || C.stopPropagation()));
          }),
        }),
        h &&
          l.jsx(Bs, {
            control: v,
            bubbles: !m.current,
            name: n,
            value: u,
            checked: w,
            required: i,
            disabled: c,
            form: f,
            style: { transform: "translateX(-100%)" },
          }),
      ],
    });
  });
ks.displayName = Rt;
var Fs = "SwitchThumb",
  $s = s.forwardRef((e, o) => {
    const { __scopeSwitch: t, ...n } = e,
      r = ku(Fs, t);
    return l.jsx(E.span, {
      "data-state": Hs(r.checked),
      "data-disabled": r.disabled ? "" : void 0,
      ...n,
      ref: o,
    });
  });
$s.displayName = Fs;
var Fu = "SwitchBubbleInput",
  Bs = s.forwardRef(
    (
      { __scopeSwitch: e, control: o, checked: t, bubbles: n = !0, ...r },
      a,
    ) => {
      const i = s.useRef(null),
        c = I(i, a),
        u = bt(t),
        d = lt(o);
      return (
        s.useEffect(() => {
          const f = i.current;
          if (!f) return;
          const p = window.HTMLInputElement.prototype,
            g = Object.getOwnPropertyDescriptor(p, "checked").set;
          if (u !== t && g) {
            const x = new Event("click", { bubbles: n });
            (g.call(f, t), f.dispatchEvent(x));
          }
        }, [u, t, n]),
        l.jsx("input", {
          type: "checkbox",
          "aria-hidden": !0,
          defaultChecked: t,
          ...r,
          tabIndex: -1,
          ref: c,
          style: {
            ...r.style,
            ...d,
            position: "absolute",
            pointerEvents: "none",
            opacity: 0,
            margin: 0,
          },
        })
      );
    },
  );
Bs.displayName = Fu;
function Hs(e) {
  return e ? "checked" : "unchecked";
}
var Sf = ks,
  Cf = $s,
  $u = [" ", "Enter", "ArrowUp", "ArrowDown"],
  Bu = [" ", "Enter"],
  Ee = "Select",
  [Tt, _t, Hu] = Ve(Ee),
  [Le] = q(Ee, [Hu, ge]),
  At = ge(),
  [Vu, we] = Le(Ee),
  [Ku, Uu] = Le(Ee),
  Vs = (e) => {
    const {
        __scopeSelect: o,
        children: t,
        open: n,
        defaultOpen: r,
        onOpenChange: a,
        value: i,
        defaultValue: c,
        onValueChange: u,
        dir: d,
        name: f,
        autoComplete: p,
        disabled: v,
        required: g,
        form: x,
      } = e,
      m = At(o),
      [h, w] = s.useState(null),
      [S, C] = s.useState(null),
      [y, _] = s.useState(!1),
      D = Ne(d),
      [P, O] = le({ prop: n, defaultProp: r ?? !1, onChange: a, caller: Ee }),
      [N, j] = le({ prop: i, defaultProp: c, onChange: u, caller: Ee }),
      M = s.useRef(null),
      F = h ? x || !!h.closest("form") : !0,
      [H, A] = s.useState(new Set()),
      $ = Array.from(H)
        .map((L) => L.props.value)
        .join(";");
    return l.jsx(ro, {
      ...m,
      children: l.jsxs(Vu, {
        required: g,
        scope: o,
        trigger: h,
        onTriggerChange: w,
        valueNode: S,
        onValueNodeChange: C,
        valueNodeHasChildren: y,
        onValueNodeHasChildrenChange: _,
        contentId: ce(),
        value: N,
        onValueChange: j,
        open: P,
        onOpenChange: O,
        dir: D,
        triggerPointerDownPosRef: M,
        disabled: v,
        children: [
          l.jsx(Tt.Provider, {
            scope: o,
            children: l.jsx(Ku, {
              scope: e.__scopeSelect,
              onNativeOptionAdd: s.useCallback((L) => {
                A((B) => new Set(B).add(L));
              }, []),
              onNativeOptionRemove: s.useCallback((L) => {
                A((B) => {
                  const k = new Set(B);
                  return (k.delete(L), k);
                });
              }, []),
              children: t,
            }),
          }),
          F
            ? l.jsxs(
                fa,
                {
                  "aria-hidden": !0,
                  required: g,
                  tabIndex: -1,
                  name: f,
                  autoComplete: p,
                  value: N,
                  onChange: (L) => j(L.target.value),
                  disabled: v,
                  form: x,
                  children: [
                    N === void 0 ? l.jsx("option", { value: "" }) : null,
                    Array.from(H),
                  ],
                },
                $,
              )
            : null,
        ],
      }),
    });
  };
Vs.displayName = Ee;
var Ks = "SelectTrigger",
  Us = s.forwardRef((e, o) => {
    const { __scopeSelect: t, disabled: n = !1, ...r } = e,
      a = At(t),
      i = we(Ks, t),
      c = i.disabled || n,
      u = I(o, i.onTriggerChange),
      d = _t(t),
      f = s.useRef("touch"),
      [p, v, g] = va((m) => {
        const h = d().filter((C) => !C.disabled),
          w = h.find((C) => C.value === i.value),
          S = ma(h, m, w);
        S !== void 0 && i.onValueChange(S.value);
      }),
      x = (m) => {
        (c || (i.onOpenChange(!0), g()),
          m &&
            (i.triggerPointerDownPosRef.current = {
              x: Math.round(m.pageX),
              y: Math.round(m.pageY),
            }));
      };
    return l.jsx(Ue, {
      asChild: !0,
      ...a,
      children: l.jsx(E.button, {
        type: "button",
        role: "combobox",
        "aria-controls": i.contentId,
        "aria-expanded": i.open,
        "aria-required": i.required,
        "aria-autocomplete": "none",
        dir: i.dir,
        "data-state": i.open ? "open" : "closed",
        disabled: c,
        "data-disabled": c ? "" : void 0,
        "data-placeholder": pa(i.value) ? "" : void 0,
        ...r,
        ref: u,
        onClick: b(r.onClick, (m) => {
          (m.currentTarget.focus(), f.current !== "mouse" && x(m));
        }),
        onPointerDown: b(r.onPointerDown, (m) => {
          f.current = m.pointerType;
          const h = m.target;
          (h.hasPointerCapture(m.pointerId) &&
            h.releasePointerCapture(m.pointerId),
            m.button === 0 &&
              m.ctrlKey === !1 &&
              m.pointerType === "mouse" &&
              (x(m), m.preventDefault()));
        }),
        onKeyDown: b(r.onKeyDown, (m) => {
          const h = p.current !== "";
          (!(m.ctrlKey || m.altKey || m.metaKey) &&
            m.key.length === 1 &&
            v(m.key),
            !(h && m.key === " ") &&
              $u.includes(m.key) &&
              (x(), m.preventDefault()));
        }),
      }),
    });
  });
Us.displayName = Ks;
var Ws = "SelectValue",
  Gs = s.forwardRef((e, o) => {
    const {
        __scopeSelect: t,
        className: n,
        style: r,
        children: a,
        placeholder: i = "",
        ...c
      } = e,
      u = we(Ws, t),
      { onValueNodeHasChildrenChange: d } = u,
      f = a !== void 0,
      p = I(o, u.onValueNodeChange);
    return (
      G(() => {
        d(f);
      }, [d, f]),
      l.jsx(E.span, {
        ...c,
        ref: p,
        style: { pointerEvents: "none" },
        children: pa(u.value) ? l.jsx(l.Fragment, { children: i }) : a,
      })
    );
  });
Gs.displayName = Ws;
var Wu = "SelectIcon",
  zs = s.forwardRef((e, o) => {
    const { __scopeSelect: t, children: n, ...r } = e;
    return l.jsx(E.span, {
      "aria-hidden": !0,
      ...r,
      ref: o,
      children: n || "▼",
    });
  });
zs.displayName = Wu;
var Gu = "SelectPortal",
  Ys = (e) => l.jsx(Oe, { asChild: !0, ...e });
Ys.displayName = Gu;
var Pe = "SelectContent",
  Xs = s.forwardRef((e, o) => {
    const t = we(Pe, e.__scopeSelect),
      [n, r] = s.useState();
    if (
      (G(() => {
        r(new DocumentFragment());
      }, []),
      !t.open)
    ) {
      const a = n;
      return a
        ? rt.createPortal(
            l.jsx(qs, {
              scope: e.__scopeSelect,
              children: l.jsx(Tt.Slot, {
                scope: e.__scopeSelect,
                children: l.jsx("div", { children: e.children }),
              }),
            }),
            a,
          )
        : null;
    }
    return l.jsx(Zs, { ...e, ref: o });
  });
Xs.displayName = Pe;
var ie = 10,
  [qs, xe] = Le(Pe),
  zu = "SelectContentImpl",
  Yu = he("SelectContent.RemoveScroll"),
  Zs = s.forwardRef((e, o) => {
    const {
        __scopeSelect: t,
        position: n = "item-aligned",
        onCloseAutoFocus: r,
        onEscapeKeyDown: a,
        onPointerDownOutside: i,
        side: c,
        sideOffset: u,
        align: d,
        alignOffset: f,
        arrowPadding: p,
        collisionBoundary: v,
        collisionPadding: g,
        sticky: x,
        hideWhenDetached: m,
        avoidCollisions: h,
        ...w
      } = e,
      S = we(Pe, t),
      [C, y] = s.useState(null),
      [_, D] = s.useState(null),
      P = I(o, (R) => y(R)),
      [O, N] = s.useState(null),
      [j, M] = s.useState(null),
      F = _t(t),
      [H, A] = s.useState(!1),
      $ = s.useRef(!1);
    (s.useEffect(() => {
      if (C) return at(C);
    }, [C]),
      ct());
    const L = s.useCallback(
        (R) => {
          const [V, ...Q] = F().map((z) => z.ref.current),
            [K] = Q.slice(-1),
            U = document.activeElement;
          for (const z of R)
            if (
              z === U ||
              (z?.scrollIntoView({ block: "nearest" }),
              z === V && _ && (_.scrollTop = 0),
              z === K && _ && (_.scrollTop = _.scrollHeight),
              z?.focus(),
              document.activeElement !== U)
            )
              return;
        },
        [F, _],
      ),
      B = s.useCallback(() => L([O, C]), [L, O, C]);
    s.useEffect(() => {
      H && B();
    }, [H, B]);
    const { onOpenChange: k, triggerPointerDownPosRef: T } = S;
    (s.useEffect(() => {
      if (C) {
        let R = { x: 0, y: 0 };
        const V = (K) => {
            R = {
              x: Math.abs(Math.round(K.pageX) - (T.current?.x ?? 0)),
              y: Math.abs(Math.round(K.pageY) - (T.current?.y ?? 0)),
            };
          },
          Q = (K) => {
            (R.x <= 10 && R.y <= 10
              ? K.preventDefault()
              : C.contains(K.target) || k(!1),
              document.removeEventListener("pointermove", V),
              (T.current = null));
          };
        return (
          T.current !== null &&
            (document.addEventListener("pointermove", V),
            document.addEventListener("pointerup", Q, {
              capture: !0,
              once: !0,
            })),
          () => {
            (document.removeEventListener("pointermove", V),
              document.removeEventListener("pointerup", Q, { capture: !0 }));
          }
        );
      }
    }, [C, k, T]),
      s.useEffect(() => {
        const R = () => k(!1);
        return (
          window.addEventListener("blur", R),
          window.addEventListener("resize", R),
          () => {
            (window.removeEventListener("blur", R),
              window.removeEventListener("resize", R));
          }
        );
      }, [k]));
    const [te, X] = va((R) => {
        const V = F().filter((U) => !U.disabled),
          Q = V.find((U) => U.ref.current === document.activeElement),
          K = ma(V, R, Q);
        K && setTimeout(() => K.ref.current.focus());
      }),
      Z = s.useCallback(
        (R, V, Q) => {
          const K = !$.current && !Q;
          ((S.value !== void 0 && S.value === V) || K) &&
            (N(R), K && ($.current = !0));
        },
        [S.value],
      ),
      oe = s.useCallback(() => C?.focus(), [C]),
      J = s.useCallback(
        (R, V, Q) => {
          const K = !$.current && !Q;
          ((S.value !== void 0 && S.value === V) || K) && M(R);
        },
        [S.value],
      ),
      fe = n === "popper" ? qt : Js,
      ne =
        fe === qt
          ? {
              side: c,
              sideOffset: u,
              align: d,
              alignOffset: f,
              arrowPadding: p,
              collisionBoundary: v,
              collisionPadding: g,
              sticky: x,
              hideWhenDetached: m,
              avoidCollisions: h,
            }
          : {};
    return l.jsx(qs, {
      scope: t,
      content: C,
      viewport: _,
      onViewportChange: D,
      itemRefCallback: Z,
      selectedItem: O,
      onItemLeave: oe,
      itemTextRefCallback: J,
      focusSelectedItem: B,
      selectedItemText: j,
      position: n,
      isPositioned: H,
      searchRef: te,
      children: l.jsx(st, {
        as: Yu,
        allowPinchZoom: !0,
        children: l.jsx(Ke, {
          asChild: !0,
          trapped: S.open,
          onMountAutoFocus: (R) => {
            R.preventDefault();
          },
          onUnmountAutoFocus: b(r, (R) => {
            (S.trigger?.focus({ preventScroll: !0 }), R.preventDefault());
          }),
          children: l.jsx(Re, {
            asChild: !0,
            disableOutsidePointerEvents: !0,
            onEscapeKeyDown: a,
            onPointerDownOutside: i,
            onFocusOutside: (R) => R.preventDefault(),
            onDismiss: () => S.onOpenChange(!1),
            children: l.jsx(fe, {
              role: "listbox",
              id: S.contentId,
              "data-state": S.open ? "open" : "closed",
              dir: S.dir,
              onContextMenu: (R) => R.preventDefault(),
              ...w,
              ...ne,
              onPlaced: () => A(!0),
              ref: P,
              style: {
                display: "flex",
                flexDirection: "column",
                outline: "none",
                ...w.style,
              },
              onKeyDown: b(w.onKeyDown, (R) => {
                const V = R.ctrlKey || R.altKey || R.metaKey;
                if (
                  (R.key === "Tab" && R.preventDefault(),
                  !V && R.key.length === 1 && X(R.key),
                  ["ArrowUp", "ArrowDown", "Home", "End"].includes(R.key))
                ) {
                  let K = F()
                    .filter((U) => !U.disabled)
                    .map((U) => U.ref.current);
                  if (
                    (["ArrowUp", "End"].includes(R.key) &&
                      (K = K.slice().reverse()),
                    ["ArrowUp", "ArrowDown"].includes(R.key))
                  ) {
                    const U = R.target,
                      z = K.indexOf(U);
                    K = K.slice(z + 1);
                  }
                  (setTimeout(() => L(K)), R.preventDefault());
                }
              }),
            }),
          }),
        }),
      }),
    });
  });
Zs.displayName = zu;
var Xu = "SelectItemAlignedPosition",
  Js = s.forwardRef((e, o) => {
    const { __scopeSelect: t, onPlaced: n, ...r } = e,
      a = we(Pe, t),
      i = xe(Pe, t),
      [c, u] = s.useState(null),
      [d, f] = s.useState(null),
      p = I(o, (P) => f(P)),
      v = _t(t),
      g = s.useRef(!1),
      x = s.useRef(!0),
      {
        viewport: m,
        selectedItem: h,
        selectedItemText: w,
        focusSelectedItem: S,
      } = i,
      C = s.useCallback(() => {
        if (a.trigger && a.valueNode && c && d && m && h && w) {
          const P = a.trigger.getBoundingClientRect(),
            O = d.getBoundingClientRect(),
            N = a.valueNode.getBoundingClientRect(),
            j = w.getBoundingClientRect();
          if (a.dir !== "rtl") {
            const U = j.left - O.left,
              z = N.left - U,
              re = P.left - z,
              Ce = P.width + re,
              Dt = Math.max(Ce, O.width),
              Nt = window.innerWidth - ie,
              Ot = He(z, [ie, Math.max(ie, Nt - Dt)]);
            ((c.style.minWidth = Ce + "px"), (c.style.left = Ot + "px"));
          } else {
            const U = O.right - j.right,
              z = window.innerWidth - N.right - U,
              re = window.innerWidth - P.right - z,
              Ce = P.width + re,
              Dt = Math.max(Ce, O.width),
              Nt = window.innerWidth - ie,
              Ot = He(z, [ie, Math.max(ie, Nt - Dt)]);
            ((c.style.minWidth = Ce + "px"), (c.style.right = Ot + "px"));
          }
          const M = v(),
            F = window.innerHeight - ie * 2,
            H = m.scrollHeight,
            A = window.getComputedStyle(d),
            $ = parseInt(A.borderTopWidth, 10),
            L = parseInt(A.paddingTop, 10),
            B = parseInt(A.borderBottomWidth, 10),
            k = parseInt(A.paddingBottom, 10),
            T = $ + L + H + k + B,
            te = Math.min(h.offsetHeight * 5, T),
            X = window.getComputedStyle(m),
            Z = parseInt(X.paddingTop, 10),
            oe = parseInt(X.paddingBottom, 10),
            J = P.top + P.height / 2 - ie,
            fe = F - J,
            ne = h.offsetHeight / 2,
            R = h.offsetTop + ne,
            V = $ + L + R,
            Q = T - V;
          if (V <= J) {
            const U = M.length > 0 && h === M[M.length - 1].ref.current;
            c.style.bottom = "0px";
            const z = d.clientHeight - m.offsetTop - m.offsetHeight,
              re = Math.max(fe, ne + (U ? oe : 0) + z + B),
              Ce = V + re;
            c.style.height = Ce + "px";
          } else {
            const U = M.length > 0 && h === M[0].ref.current;
            c.style.top = "0px";
            const re = Math.max(J, $ + m.offsetTop + (U ? Z : 0) + ne) + Q;
            ((c.style.height = re + "px"), (m.scrollTop = V - J + m.offsetTop));
          }
          ((c.style.margin = `${ie}px 0`),
            (c.style.minHeight = te + "px"),
            (c.style.maxHeight = F + "px"),
            n?.(),
            requestAnimationFrame(() => (g.current = !0)));
        }
      }, [v, a.trigger, a.valueNode, c, d, m, h, w, a.dir, n]);
    G(() => C(), [C]);
    const [y, _] = s.useState();
    G(() => {
      d && _(window.getComputedStyle(d).zIndex);
    }, [d]);
    const D = s.useCallback(
      (P) => {
        P && x.current === !0 && (C(), S?.(), (x.current = !1));
      },
      [C, S],
    );
    return l.jsx(Zu, {
      scope: t,
      contentWrapper: c,
      shouldExpandOnScrollRef: g,
      onScrollButtonChange: D,
      children: l.jsx("div", {
        ref: u,
        style: {
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          zIndex: y,
        },
        children: l.jsx(E.div, {
          ...r,
          ref: p,
          style: { boxSizing: "border-box", maxHeight: "100%", ...r.style },
        }),
      }),
    });
  });
Js.displayName = Xu;
var qu = "SelectPopperPosition",
  qt = s.forwardRef((e, o) => {
    const {
        __scopeSelect: t,
        align: n = "start",
        collisionPadding: r = ie,
        ...a
      } = e,
      i = At(t);
    return l.jsx(ut, {
      ...i,
      ...a,
      ref: o,
      align: n,
      collisionPadding: r,
      style: {
        boxSizing: "border-box",
        ...a.style,
        "--radix-select-content-transform-origin":
          "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width":
          "var(--radix-popper-available-width)",
        "--radix-select-content-available-height":
          "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)",
      },
    });
  });
qt.displayName = qu;
var [Zu, Ro] = Le(Pe, {}),
  Zt = "SelectViewport",
  Qs = s.forwardRef((e, o) => {
    const { __scopeSelect: t, nonce: n, ...r } = e,
      a = xe(Zt, t),
      i = Ro(Zt, t),
      c = I(o, a.onViewportChange),
      u = s.useRef(0);
    return l.jsxs(l.Fragment, {
      children: [
        l.jsx("style", {
          dangerouslySetInnerHTML: {
            __html:
              "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}",
          },
          nonce: n,
        }),
        l.jsx(Tt.Slot, {
          scope: t,
          children: l.jsx(E.div, {
            "data-radix-select-viewport": "",
            role: "presentation",
            ...r,
            ref: c,
            style: {
              position: "relative",
              flex: 1,
              overflow: "hidden auto",
              ...r.style,
            },
            onScroll: b(r.onScroll, (d) => {
              const f = d.currentTarget,
                { contentWrapper: p, shouldExpandOnScrollRef: v } = i;
              if (v?.current && p) {
                const g = Math.abs(u.current - f.scrollTop);
                if (g > 0) {
                  const x = window.innerHeight - ie * 2,
                    m = parseFloat(p.style.minHeight),
                    h = parseFloat(p.style.height),
                    w = Math.max(m, h);
                  if (w < x) {
                    const S = w + g,
                      C = Math.min(x, S),
                      y = S - C;
                    ((p.style.height = C + "px"),
                      p.style.bottom === "0px" &&
                        ((f.scrollTop = y > 0 ? y : 0),
                        (p.style.justifyContent = "flex-end")));
                  }
                }
              }
              u.current = f.scrollTop;
            }),
          }),
        }),
      ],
    });
  });
Qs.displayName = Zt;
var ea = "SelectGroup",
  [Ju, Qu] = Le(ea),
  ed = s.forwardRef((e, o) => {
    const { __scopeSelect: t, ...n } = e,
      r = ce();
    return l.jsx(Ju, {
      scope: t,
      id: r,
      children: l.jsx(E.div, {
        role: "group",
        "aria-labelledby": r,
        ...n,
        ref: o,
      }),
    });
  });
ed.displayName = ea;
var ta = "SelectLabel",
  oa = s.forwardRef((e, o) => {
    const { __scopeSelect: t, ...n } = e,
      r = Qu(ta, t);
    return l.jsx(E.div, { id: r.id, ...n, ref: o });
  });
oa.displayName = ta;
var nt = "SelectItem",
  [td, na] = Le(nt),
  ra = s.forwardRef((e, o) => {
    const {
        __scopeSelect: t,
        value: n,
        disabled: r = !1,
        textValue: a,
        ...i
      } = e,
      c = we(nt, t),
      u = xe(nt, t),
      d = c.value === n,
      [f, p] = s.useState(a ?? ""),
      [v, g] = s.useState(!1),
      x = I(o, (S) => u.itemRefCallback?.(S, n, r)),
      m = ce(),
      h = s.useRef("touch"),
      w = () => {
        r || (c.onValueChange(n), c.onOpenChange(!1));
      };
    if (n === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.",
      );
    return l.jsx(td, {
      scope: t,
      value: n,
      disabled: r,
      textId: m,
      isSelected: d,
      onItemTextChange: s.useCallback((S) => {
        p((C) => C || (S?.textContent ?? "").trim());
      }, []),
      children: l.jsx(Tt.ItemSlot, {
        scope: t,
        value: n,
        disabled: r,
        textValue: f,
        children: l.jsx(E.div, {
          role: "option",
          "aria-labelledby": m,
          "data-highlighted": v ? "" : void 0,
          "aria-selected": d && v,
          "data-state": d ? "checked" : "unchecked",
          "aria-disabled": r || void 0,
          "data-disabled": r ? "" : void 0,
          tabIndex: r ? void 0 : -1,
          ...i,
          ref: x,
          onFocus: b(i.onFocus, () => g(!0)),
          onBlur: b(i.onBlur, () => g(!1)),
          onClick: b(i.onClick, () => {
            h.current !== "mouse" && w();
          }),
          onPointerUp: b(i.onPointerUp, () => {
            h.current === "mouse" && w();
          }),
          onPointerDown: b(i.onPointerDown, (S) => {
            h.current = S.pointerType;
          }),
          onPointerMove: b(i.onPointerMove, (S) => {
            ((h.current = S.pointerType),
              r
                ? u.onItemLeave?.()
                : h.current === "mouse" &&
                  S.currentTarget.focus({ preventScroll: !0 }));
          }),
          onPointerLeave: b(i.onPointerLeave, (S) => {
            S.currentTarget === document.activeElement && u.onItemLeave?.();
          }),
          onKeyDown: b(i.onKeyDown, (S) => {
            (u.searchRef?.current !== "" && S.key === " ") ||
              (Bu.includes(S.key) && w(), S.key === " " && S.preventDefault());
          }),
        }),
      }),
    });
  });
ra.displayName = nt;
var Fe = "SelectItemText",
  sa = s.forwardRef((e, o) => {
    const { __scopeSelect: t, className: n, style: r, ...a } = e,
      i = we(Fe, t),
      c = xe(Fe, t),
      u = na(Fe, t),
      d = Uu(Fe, t),
      [f, p] = s.useState(null),
      v = I(
        o,
        (w) => p(w),
        u.onItemTextChange,
        (w) => c.itemTextRefCallback?.(w, u.value, u.disabled),
      ),
      g = f?.textContent,
      x = s.useMemo(
        () =>
          l.jsx(
            "option",
            { value: u.value, disabled: u.disabled, children: g },
            u.value,
          ),
        [u.disabled, u.value, g],
      ),
      { onNativeOptionAdd: m, onNativeOptionRemove: h } = d;
    return (
      G(() => (m(x), () => h(x)), [m, h, x]),
      l.jsxs(l.Fragment, {
        children: [
          l.jsx(E.span, { id: u.textId, ...a, ref: v }),
          u.isSelected && i.valueNode && !i.valueNodeHasChildren
            ? rt.createPortal(a.children, i.valueNode)
            : null,
        ],
      })
    );
  });
sa.displayName = Fe;
var aa = "SelectItemIndicator",
  ia = s.forwardRef((e, o) => {
    const { __scopeSelect: t, ...n } = e;
    return na(aa, t).isSelected
      ? l.jsx(E.span, { "aria-hidden": !0, ...n, ref: o })
      : null;
  });
ia.displayName = aa;
var Jt = "SelectScrollUpButton",
  ca = s.forwardRef((e, o) => {
    const t = xe(Jt, e.__scopeSelect),
      n = Ro(Jt, e.__scopeSelect),
      [r, a] = s.useState(!1),
      i = I(o, n.onScrollButtonChange);
    return (
      G(() => {
        if (t.viewport && t.isPositioned) {
          let c = function () {
            const d = u.scrollTop > 0;
            a(d);
          };
          const u = t.viewport;
          return (
            c(),
            u.addEventListener("scroll", c),
            () => u.removeEventListener("scroll", c)
          );
        }
      }, [t.viewport, t.isPositioned]),
      r
        ? l.jsx(ua, {
            ...e,
            ref: i,
            onAutoScroll: () => {
              const { viewport: c, selectedItem: u } = t;
              c && u && (c.scrollTop = c.scrollTop - u.offsetHeight);
            },
          })
        : null
    );
  });
ca.displayName = Jt;
var Qt = "SelectScrollDownButton",
  la = s.forwardRef((e, o) => {
    const t = xe(Qt, e.__scopeSelect),
      n = Ro(Qt, e.__scopeSelect),
      [r, a] = s.useState(!1),
      i = I(o, n.onScrollButtonChange);
    return (
      G(() => {
        if (t.viewport && t.isPositioned) {
          let c = function () {
            const d = u.scrollHeight - u.clientHeight,
              f = Math.ceil(u.scrollTop) < d;
            a(f);
          };
          const u = t.viewport;
          return (
            c(),
            u.addEventListener("scroll", c),
            () => u.removeEventListener("scroll", c)
          );
        }
      }, [t.viewport, t.isPositioned]),
      r
        ? l.jsx(ua, {
            ...e,
            ref: i,
            onAutoScroll: () => {
              const { viewport: c, selectedItem: u } = t;
              c && u && (c.scrollTop = c.scrollTop + u.offsetHeight);
            },
          })
        : null
    );
  });
la.displayName = Qt;
var ua = s.forwardRef((e, o) => {
    const { __scopeSelect: t, onAutoScroll: n, ...r } = e,
      a = xe("SelectScrollButton", t),
      i = s.useRef(null),
      c = _t(t),
      u = s.useCallback(() => {
        i.current !== null &&
          (window.clearInterval(i.current), (i.current = null));
      }, []);
    return (
      s.useEffect(() => () => u(), [u]),
      G(() => {
        c()
          .find((f) => f.ref.current === document.activeElement)
          ?.ref.current?.scrollIntoView({ block: "nearest" });
      }, [c]),
      l.jsx(E.div, {
        "aria-hidden": !0,
        ...r,
        ref: o,
        style: { flexShrink: 0, ...r.style },
        onPointerDown: b(r.onPointerDown, () => {
          i.current === null && (i.current = window.setInterval(n, 50));
        }),
        onPointerMove: b(r.onPointerMove, () => {
          (a.onItemLeave?.(),
            i.current === null && (i.current = window.setInterval(n, 50)));
        }),
        onPointerLeave: b(r.onPointerLeave, () => {
          u();
        }),
      })
    );
  }),
  od = "SelectSeparator",
  da = s.forwardRef((e, o) => {
    const { __scopeSelect: t, ...n } = e;
    return l.jsx(E.div, { "aria-hidden": !0, ...n, ref: o });
  });
da.displayName = od;
var eo = "SelectArrow",
  nd = s.forwardRef((e, o) => {
    const { __scopeSelect: t, ...n } = e,
      r = At(t),
      a = we(eo, t),
      i = xe(eo, t);
    return a.open && i.position === "popper"
      ? l.jsx(dt, { ...r, ...n, ref: o })
      : null;
  });
nd.displayName = eo;
var rd = "SelectBubbleInput",
  fa = s.forwardRef(({ __scopeSelect: e, value: o, ...t }, n) => {
    const r = s.useRef(null),
      a = I(n, r),
      i = bt(o);
    return (
      s.useEffect(() => {
        const c = r.current;
        if (!c) return;
        const u = window.HTMLSelectElement.prototype,
          f = Object.getOwnPropertyDescriptor(u, "value").set;
        if (i !== o && f) {
          const p = new Event("change", { bubbles: !0 });
          (f.call(c, o), c.dispatchEvent(p));
        }
      }, [i, o]),
      l.jsx(E.select, {
        ...t,
        style: { ...Cr, ...t.style },
        ref: a,
        defaultValue: o,
      })
    );
  });
fa.displayName = rd;
function pa(e) {
  return e === "" || e === void 0;
}
function va(e) {
  const o = W(e),
    t = s.useRef(""),
    n = s.useRef(0),
    r = s.useCallback(
      (i) => {
        const c = t.current + i;
        (o(c),
          (function u(d) {
            ((t.current = d),
              window.clearTimeout(n.current),
              d !== "" && (n.current = window.setTimeout(() => u(""), 1e3)));
          })(c));
      },
      [o],
    ),
    a = s.useCallback(() => {
      ((t.current = ""), window.clearTimeout(n.current));
    }, []);
  return (
    s.useEffect(() => () => window.clearTimeout(n.current), []),
    [t, r, a]
  );
}
function ma(e, o, t) {
  const r = o.length > 1 && Array.from(o).every((d) => d === o[0]) ? o[0] : o,
    a = t ? e.indexOf(t) : -1;
  let i = sd(e, Math.max(a, 0));
  r.length === 1 && (i = i.filter((d) => d !== t));
  const u = i.find((d) =>
    d.textValue.toLowerCase().startsWith(r.toLowerCase()),
  );
  return u !== t ? u : void 0;
}
function sd(e, o) {
  return e.map((t, n) => e[(o + n) % e.length]);
}
var bf = Vs,
  yf = Us,
  Ef = Gs,
  Pf = zs,
  Rf = Ys,
  Tf = Xs,
  _f = Qs,
  Af = oa,
  If = ra,
  Mf = sa,
  Df = ia,
  Nf = ca,
  Of = la,
  jf = da,
  It = "Popover",
  [ha] = q(It, [ge]),
  Xe = ge(),
  [ad, Se] = ha(It),
  ga = (e) => {
    const {
        __scopePopover: o,
        children: t,
        open: n,
        defaultOpen: r,
        onOpenChange: a,
        modal: i = !1,
      } = e,
      c = Xe(o),
      u = s.useRef(null),
      [d, f] = s.useState(!1),
      [p, v] = le({ prop: n, defaultProp: r ?? !1, onChange: a, caller: It });
    return l.jsx(ro, {
      ...c,
      children: l.jsx(ad, {
        scope: o,
        contentId: ce(),
        triggerRef: u,
        open: p,
        onOpenChange: v,
        onOpenToggle: s.useCallback(() => v((g) => !g), [v]),
        hasCustomAnchor: d,
        onCustomAnchorAdd: s.useCallback(() => f(!0), []),
        onCustomAnchorRemove: s.useCallback(() => f(!1), []),
        modal: i,
        children: t,
      }),
    });
  };
ga.displayName = It;
var wa = "PopoverAnchor",
  id = s.forwardRef((e, o) => {
    const { __scopePopover: t, ...n } = e,
      r = Se(wa, t),
      a = Xe(t),
      { onCustomAnchorAdd: i, onCustomAnchorRemove: c } = r;
    return (
      s.useEffect(() => (i(), () => c()), [i, c]),
      l.jsx(Ue, { ...a, ...n, ref: o })
    );
  });
id.displayName = wa;
var xa = "PopoverTrigger",
  Sa = s.forwardRef((e, o) => {
    const { __scopePopover: t, ...n } = e,
      r = Se(xa, t),
      a = Xe(t),
      i = I(o, r.triggerRef),
      c = l.jsx(E.button, {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": r.open,
        "aria-controls": r.contentId,
        "data-state": Pa(r.open),
        ...n,
        ref: i,
        onClick: b(e.onClick, r.onOpenToggle),
      });
    return r.hasCustomAnchor
      ? c
      : l.jsx(Ue, { asChild: !0, ...a, children: c });
  });
Sa.displayName = xa;
var To = "PopoverPortal",
  [cd, ld] = ha(To, { forceMount: void 0 }),
  Ca = (e) => {
    const { __scopePopover: o, forceMount: t, children: n, container: r } = e,
      a = Se(To, o);
    return l.jsx(cd, {
      scope: o,
      forceMount: t,
      children: l.jsx(Y, {
        present: t || a.open,
        children: l.jsx(Oe, { asChild: !0, container: r, children: n }),
      }),
    });
  };
Ca.displayName = To;
var De = "PopoverContent",
  ba = s.forwardRef((e, o) => {
    const t = ld(De, e.__scopePopover),
      { forceMount: n = t.forceMount, ...r } = e,
      a = Se(De, e.__scopePopover);
    return l.jsx(Y, {
      present: n || a.open,
      children: a.modal
        ? l.jsx(dd, { ...r, ref: o })
        : l.jsx(fd, { ...r, ref: o }),
    });
  });
ba.displayName = De;
var ud = he("PopoverContent.RemoveScroll"),
  dd = s.forwardRef((e, o) => {
    const t = Se(De, e.__scopePopover),
      n = s.useRef(null),
      r = I(o, n),
      a = s.useRef(!1);
    return (
      s.useEffect(() => {
        const i = n.current;
        if (i) return at(i);
      }, []),
      l.jsx(st, {
        as: ud,
        allowPinchZoom: !0,
        children: l.jsx(ya, {
          ...e,
          ref: r,
          trapFocus: t.open,
          disableOutsidePointerEvents: !0,
          onCloseAutoFocus: b(e.onCloseAutoFocus, (i) => {
            (i.preventDefault(), a.current || t.triggerRef.current?.focus());
          }),
          onPointerDownOutside: b(
            e.onPointerDownOutside,
            (i) => {
              const c = i.detail.originalEvent,
                u = c.button === 0 && c.ctrlKey === !0,
                d = c.button === 2 || u;
              a.current = d;
            },
            { checkForDefaultPrevented: !1 },
          ),
          onFocusOutside: b(e.onFocusOutside, (i) => i.preventDefault(), {
            checkForDefaultPrevented: !1,
          }),
        }),
      })
    );
  }),
  fd = s.forwardRef((e, o) => {
    const t = Se(De, e.__scopePopover),
      n = s.useRef(!1),
      r = s.useRef(!1);
    return l.jsx(ya, {
      ...e,
      ref: o,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (a) => {
        (e.onCloseAutoFocus?.(a),
          a.defaultPrevented ||
            (n.current || t.triggerRef.current?.focus(), a.preventDefault()),
          (n.current = !1),
          (r.current = !1));
      },
      onInteractOutside: (a) => {
        (e.onInteractOutside?.(a),
          a.defaultPrevented ||
            ((n.current = !0),
            a.detail.originalEvent.type === "pointerdown" && (r.current = !0)));
        const i = a.target;
        (t.triggerRef.current?.contains(i) && a.preventDefault(),
          a.detail.originalEvent.type === "focusin" &&
            r.current &&
            a.preventDefault());
      },
    });
  }),
  ya = s.forwardRef((e, o) => {
    const {
        __scopePopover: t,
        trapFocus: n,
        onOpenAutoFocus: r,
        onCloseAutoFocus: a,
        disableOutsidePointerEvents: i,
        onEscapeKeyDown: c,
        onPointerDownOutside: u,
        onFocusOutside: d,
        onInteractOutside: f,
        ...p
      } = e,
      v = Se(De, t),
      g = Xe(t);
    return (
      ct(),
      l.jsx(Ke, {
        asChild: !0,
        loop: !0,
        trapped: n,
        onMountAutoFocus: r,
        onUnmountAutoFocus: a,
        children: l.jsx(Re, {
          asChild: !0,
          disableOutsidePointerEvents: i,
          onInteractOutside: f,
          onEscapeKeyDown: c,
          onPointerDownOutside: u,
          onFocusOutside: d,
          onDismiss: () => v.onOpenChange(!1),
          children: l.jsx(ut, {
            "data-state": Pa(v.open),
            role: "dialog",
            id: v.contentId,
            ...g,
            ...p,
            ref: o,
            style: {
              ...p.style,
              "--radix-popover-content-transform-origin":
                "var(--radix-popper-transform-origin)",
              "--radix-popover-content-available-width":
                "var(--radix-popper-available-width)",
              "--radix-popover-content-available-height":
                "var(--radix-popper-available-height)",
              "--radix-popover-trigger-width":
                "var(--radix-popper-anchor-width)",
              "--radix-popover-trigger-height":
                "var(--radix-popper-anchor-height)",
            },
          }),
        }),
      })
    );
  }),
  Ea = "PopoverClose",
  pd = s.forwardRef((e, o) => {
    const { __scopePopover: t, ...n } = e,
      r = Se(Ea, t);
    return l.jsx(E.button, {
      type: "button",
      ...n,
      ref: o,
      onClick: b(e.onClick, () => r.onOpenChange(!1)),
    });
  });
pd.displayName = Ea;
var vd = "PopoverArrow",
  md = s.forwardRef((e, o) => {
    const { __scopePopover: t, ...n } = e,
      r = Xe(t);
    return l.jsx(dt, { ...r, ...n, ref: o });
  });
md.displayName = vd;
function Pa(e) {
  return e ? "open" : "closed";
}
var Lf = ga,
  kf = Sa,
  Ff = Ca,
  $f = ba,
  Mt = "Checkbox",
  [hd] = q(Mt),
  [gd, _o] = hd(Mt);
function wd(e) {
  const {
      __scopeCheckbox: o,
      checked: t,
      children: n,
      defaultChecked: r,
      disabled: a,
      form: i,
      name: c,
      onCheckedChange: u,
      required: d,
      value: f = "on",
      internal_do_not_use_render: p,
    } = e,
    [v, g] = le({ prop: t, defaultProp: r ?? !1, onChange: u, caller: Mt }),
    [x, m] = s.useState(null),
    [h, w] = s.useState(null),
    S = s.useRef(!1),
    C = x ? !!i || !!x.closest("form") : !0,
    y = {
      checked: v,
      disabled: a,
      setChecked: g,
      control: x,
      setControl: m,
      name: c,
      form: i,
      value: f,
      hasConsumerStoppedPropagationRef: S,
      required: d,
      defaultChecked: me(r) ? !1 : r,
      isFormControl: C,
      bubbleInput: h,
      setBubbleInput: w,
    };
  return l.jsx(gd, { scope: o, ...y, children: Cd(p) ? p(y) : n });
}
var Ra = "CheckboxTrigger",
  Ta = s.forwardRef(
    ({ __scopeCheckbox: e, onKeyDown: o, onClick: t, ...n }, r) => {
      const {
          control: a,
          value: i,
          disabled: c,
          checked: u,
          required: d,
          setControl: f,
          setChecked: p,
          hasConsumerStoppedPropagationRef: v,
          isFormControl: g,
          bubbleInput: x,
        } = _o(Ra, e),
        m = I(r, f),
        h = s.useRef(u);
      return (
        s.useEffect(() => {
          const w = a?.form;
          if (w) {
            const S = () => p(h.current);
            return (
              w.addEventListener("reset", S),
              () => w.removeEventListener("reset", S)
            );
          }
        }, [a, p]),
        l.jsx(E.button, {
          type: "button",
          role: "checkbox",
          "aria-checked": me(u) ? "mixed" : u,
          "aria-required": d,
          "data-state": Ma(u),
          "data-disabled": c ? "" : void 0,
          disabled: c,
          value: i,
          ...n,
          ref: m,
          onKeyDown: b(o, (w) => {
            w.key === "Enter" && w.preventDefault();
          }),
          onClick: b(t, (w) => {
            (p((S) => (me(S) ? !0 : !S)),
              x &&
                g &&
                ((v.current = w.isPropagationStopped()),
                v.current || w.stopPropagation()));
          }),
        })
      );
    },
  );
Ta.displayName = Ra;
var xd = s.forwardRef((e, o) => {
  const {
    __scopeCheckbox: t,
    name: n,
    checked: r,
    defaultChecked: a,
    required: i,
    disabled: c,
    value: u,
    onCheckedChange: d,
    form: f,
    ...p
  } = e;
  return l.jsx(wd, {
    __scopeCheckbox: t,
    checked: r,
    defaultChecked: a,
    disabled: c,
    required: i,
    onCheckedChange: d,
    name: n,
    form: f,
    value: u,
    internal_do_not_use_render: ({ isFormControl: v }) =>
      l.jsxs(l.Fragment, {
        children: [
          l.jsx(Ta, { ...p, ref: o, __scopeCheckbox: t }),
          v && l.jsx(Ia, { __scopeCheckbox: t }),
        ],
      }),
  });
});
xd.displayName = Mt;
var _a = "CheckboxIndicator",
  Sd = s.forwardRef((e, o) => {
    const { __scopeCheckbox: t, forceMount: n, ...r } = e,
      a = _o(_a, t);
    return l.jsx(Y, {
      present: n || me(a.checked) || a.checked === !0,
      children: l.jsx(E.span, {
        "data-state": Ma(a.checked),
        "data-disabled": a.disabled ? "" : void 0,
        ...r,
        ref: o,
        style: { pointerEvents: "none", ...e.style },
      }),
    });
  });
Sd.displayName = _a;
var Aa = "CheckboxBubbleInput",
  Ia = s.forwardRef(({ __scopeCheckbox: e, ...o }, t) => {
    const {
        control: n,
        hasConsumerStoppedPropagationRef: r,
        checked: a,
        defaultChecked: i,
        required: c,
        disabled: u,
        name: d,
        value: f,
        form: p,
        bubbleInput: v,
        setBubbleInput: g,
      } = _o(Aa, e),
      x = I(t, g),
      m = bt(a),
      h = lt(n);
    s.useEffect(() => {
      const S = v;
      if (!S) return;
      const C = window.HTMLInputElement.prototype,
        _ = Object.getOwnPropertyDescriptor(C, "checked").set,
        D = !r.current;
      if (m !== a && _) {
        const P = new Event("click", { bubbles: D });
        ((S.indeterminate = me(a)),
          _.call(S, me(a) ? !1 : a),
          S.dispatchEvent(P));
      }
    }, [v, m, a, r]);
    const w = s.useRef(me(a) ? !1 : a);
    return l.jsx(E.input, {
      type: "checkbox",
      "aria-hidden": !0,
      defaultChecked: i ?? w.current,
      required: c,
      disabled: u,
      name: d,
      value: f,
      form: p,
      ...o,
      tabIndex: -1,
      ref: x,
      style: {
        ...o.style,
        ...h,
        position: "absolute",
        pointerEvents: "none",
        opacity: 0,
        margin: 0,
        transform: "translateX(-100%)",
      },
    });
  });
Ia.displayName = Aa;
function Cd(e) {
  return typeof e == "function";
}
function me(e) {
  return e === "indeterminate";
}
function Ma(e) {
  return me(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
export {
  Df as $,
  Gd as A,
  wf as B,
  Ad as C,
  cl as D,
  xf as E,
  Bd as F,
  Eu as G,
  Iu as H,
  Md as I,
  Sf as J,
  Cf as K,
  Id as L,
  Jd as M,
  bf as N,
  sl as O,
  _d as P,
  Ef as Q,
  Nd as R,
  Ld as S,
  Td as T,
  yf as U,
  Vd as V,
  Pf as W,
  Rf as X,
  Tf as Y,
  _f as Z,
  If as _,
  kd as a,
  Mf as a0,
  Nf as a1,
  Of as a2,
  Af as a3,
  jf as a4,
  Lf as a5,
  kf as a6,
  Ff as a7,
  $f as a8,
  Qd as a9,
  ef as aa,
  tf as ab,
  of as ac,
  xd as ad,
  Sd as ae,
  cf as af,
  lf as ag,
  uf as ah,
  ff as ai,
  mf as aj,
  vf as ak,
  pf as al,
  hf as am,
  df as an,
  Dd as b,
  Od as c,
  jd as d,
  Rd as e,
  Ed as f,
  rl as g,
  al as h,
  vr as i,
  il as j,
  ol as k,
  nl as l,
  Fd as m,
  $d as n,
  Kd as o,
  zd as p,
  Ud as q,
  Wd as r,
  Hd as s,
  Zd as t,
  qd as u,
  nf as v,
  rf as w,
  sf as x,
  af as y,
  gf as z,
};
