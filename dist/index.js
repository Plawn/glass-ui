var In = Object.defineProperty;
var On = (e, t, n) => t in e ? In(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var U = (e, t, n) => On(e, typeof t != "symbol" ? t + "" : t, n);
import { template as $, effect as I, setAttribute as D, addEventListener as Be, insert as p, createComponent as v, memo as $e, className as L, delegateEvents as W, use as ze, Portal as $t, setStyleProperty as _e, style as Dn } from "solid-js/web";
import { Show as E, createEffect as fe, onMount as Zr, onCleanup as ue, createSignal as K, For as Q, createMemo as te, Switch as Kr, Match as we } from "solid-js";
import { createStore as Mn, produce as Jr } from "solid-js/store";
var Pn = /* @__PURE__ */ $('<svg xmlns=http://www.w3.org/2000/svg fill=none viewBox="0 0 24 24"aria-hidden=true><circle class=opacity-25 cx=12 cy=12 r=10 stroke=currentColor stroke-width=4></circle><path class=opacity-75 fill=currentColor d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">');
const Nn = {
  sm: "h-3.5 w-3.5",
  md: "h-[1.125rem] w-[1.125rem]",
  lg: "h-5 w-5"
}, zn = (e) => {
  const t = () => e.size ?? "md";
  return (() => {
    var n = Pn();
    return I(() => D(n, "class", `animate-spin ${Nn[t()]} ${e.class ?? ""}`)), n;
  })();
};
var Fn = /* @__PURE__ */ $("<button>");
const Bn = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  tertiary: "btn-tertiary"
}, Hn = {
  sm: "px-2.5 py-1.5 text-xs gap-1.5",
  md: "gap-2.5",
  // Default: use padding from CSS classes
  lg: "px-6 py-3 text-base gap-2.5"
}, Ao = (e) => {
  const t = () => e.variant ?? "primary", n = () => e.size ?? "md";
  return (() => {
    var r = Fn();
    return Be(r, "click", e.onClick, !0), p(r, v(E, {
      get when() {
        return e.loading;
      },
      get children() {
        return v(zn, {
          get size() {
            return n();
          }
        });
      }
    }), null), p(r, v(E, {
      get when() {
        return $e(() => !e.loading)() && e.leftIcon;
      },
      get children() {
        return e.leftIcon;
      }
    }), null), p(r, () => e.children, null), p(r, v(E, {
      get when() {
        return e.rightIcon;
      },
      get children() {
        return e.rightIcon;
      }
    }), null), I((i) => {
      var l = e.type ?? "button", u = `${Bn[t()]} ${Hn[n()]} inline-flex items-center justify-center focus:outline-none focus-ring ${e.fullWidth ? "w-full" : ""} ${e.class ?? ""}`, a = e.disabled || e.loading;
      return l !== i.e && D(r, "type", i.e = l), u !== i.t && L(r, i.t = u), a !== i.a && (r.disabled = i.a = a), i;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    }), r;
  })();
};
W(["click"]);
var jn = /* @__PURE__ */ $("<span>");
const Un = {
  default: "bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300",
  success: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
  warning: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
  error: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300",
  info: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  method: ""
  // Handled separately based on method prop
}, Gn = {
  get: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
  post: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  put: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
  patch: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300",
  delete: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300",
  head: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300",
  options: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
}, qn = {
  sm: "px-1.5 py-0.5 text-[0.625rem]",
  md: "px-2 py-0.5 text-xs",
  lg: "px-2.5 py-1 text-sm"
}, Eo = (e) => {
  const t = () => e.variant ?? "default", n = () => e.size ?? "md", r = () => t() === "method" && e.method ? Gn[e.method] : Un[t()];
  return (() => {
    var i = jn();
    return p(i, () => e.children), I(() => L(i, `inline-flex items-center font-semibold rounded-md ${qn[n()]} ${r()} ${e.class ?? ""}`)), i;
  })();
};
var Wn = /* @__PURE__ */ $("<input>");
const Vn = (e) => {
  switch (e) {
    case "sm":
      return "px-2.5 py-1.5 text-xs";
    case "lg":
      return "px-4 py-3 text-base";
    default:
      return "px-3 sm:px-4 py-2 sm:py-2.5 text-sm";
  }
}, Qr = (e) => {
  const t = () => Vn(e.size ?? "md");
  return (() => {
    var n = Wn();
    return Be(n, "keydown", e.onKeyDown, !0), n.$$input = (r) => e.onInput(r.currentTarget.value), I((r) => {
      var i = e.type ?? "text", l = e.id, u = e.name, a = `w-full glass-input text-surface-900 dark:text-surface-100 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${t()} ${e.class ?? ""}`, o = e.placeholder, s = e.disabled, c = e.readonly, g = e.required, m = e.autocomplete;
      return i !== r.e && D(n, "type", r.e = i), l !== r.t && D(n, "id", r.t = l), u !== r.a && D(n, "name", r.a = u), a !== r.o && L(n, r.o = a), o !== r.i && D(n, "placeholder", r.i = o), s !== r.n && (n.disabled = r.n = s), c !== r.s && (n.readOnly = r.s = c), g !== r.h && (n.required = r.h = g), m !== r.r && D(n, "autocomplete", r.r = m), r;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0,
      i: void 0,
      n: void 0,
      s: void 0,
      h: void 0,
      r: void 0
    }), I(() => n.value = e.value), n;
  })();
};
W(["input", "keydown"]);
var Xn = /* @__PURE__ */ $("<textarea>");
const Yn = (e) => {
  switch (e) {
    case "sm":
      return "px-2.5 py-1.5 text-xs";
    case "lg":
      return "px-4 py-3 text-base";
    default:
      return "px-3 py-2 text-sm";
  }
}, en = (e) => {
  const t = () => Yn(e.size ?? "md");
  return (() => {
    var n = Xn();
    return n.$$input = (r) => e.onInput(r.currentTarget.value), I((r) => {
      var i = e.id, l = e.name, u = `w-full glass-input text-surface-800 dark:text-surface-200 resize-y focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${t()} ${e.class ?? ""}`, a = e.placeholder, o = e.rows, s = e.disabled, c = e.readonly, g = e.required;
      return i !== r.e && D(n, "id", r.e = i), l !== r.t && D(n, "name", r.t = l), u !== r.a && L(n, r.a = u), a !== r.o && D(n, "placeholder", r.o = a), o !== r.i && D(n, "rows", r.i = o), s !== r.n && (n.disabled = r.n = s), c !== r.s && (n.readOnly = r.s = c), g !== r.h && (n.required = r.h = g), r;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0,
      i: void 0,
      n: void 0,
      s: void 0,
      h: void 0
    }), I(() => n.value = e.value), n;
  })();
};
W(["input"]);
var Zn = /* @__PURE__ */ $('<div class="relative overflow-hidden"><select style=text-overflow:ellipsis></select><div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><svg class="w-4 h-4 text-gray-400 dark:text-gray-500"fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M19 9l-7 7-7-7">');
const Kn = (e) => (() => {
  var t = Zn(), n = t.firstChild;
  return n.addEventListener("change", (r) => e.onChange(r.currentTarget.value)), p(n, () => e.children), I((r) => {
    var i = e.id, l = e.name, u = `w-full px-3 py-2 sm:py-2.5 glass-input text-sm text-surface-800 dark:text-surface-200 font-medium focus:outline-none cursor-pointer appearance-none pr-9 disabled:opacity-50 disabled:cursor-not-allowed truncate ${e.class ?? ""}`, a = e.disabled, o = e.required;
    return i !== r.e && D(n, "id", r.e = i), l !== r.t && D(n, "name", r.t = l), u !== r.a && L(n, r.a = u), a !== r.o && (n.disabled = r.o = a), o !== r.i && (n.required = r.i = o), r;
  }, {
    e: void 0,
    t: void 0,
    a: void 0,
    o: void 0,
    i: void 0
  }), I(() => n.value = e.value), t;
})();
var Jn = /* @__PURE__ */ $('<span class="text-sm text-gray-700 dark:text-gray-300">'), Qn = /* @__PURE__ */ $('<label><div><input type=checkbox class=sr-only><svg fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=3 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M5 13l4 4L19 7">');
const ea = (e) => (() => {
  var t = Qn(), n = t.firstChild, r = n.firstChild, i = r.nextSibling;
  return r.addEventListener("change", (l) => e.onChange(l.currentTarget.checked)), p(t, v(E, {
    get when() {
      return e.label;
    },
    get children() {
      var l = Jn();
      return p(l, () => e.label), l;
    }
  }), null), I((l) => {
    var u = `inline-flex items-center gap-3 cursor-pointer ${e.disabled ? "opacity-50 cursor-not-allowed" : ""} ${e.class ?? ""}`, a = `w-5 h-5 flex items-center justify-center ${e.checked ? "glass-checkbox-checked" : "glass-checkbox"}`, o = e.id, s = e.name, c = e.disabled, g = e.required, m = `w-3 h-3 text-white transition-all duration-200 ${e.checked ? "opacity-100 scale-100" : "opacity-0 scale-75"}`;
    return u !== l.e && L(t, l.e = u), a !== l.t && L(n, l.t = a), o !== l.a && D(r, "id", l.a = o), s !== l.o && D(r, "name", l.o = s), c !== l.i && (r.disabled = l.i = c), g !== l.n && (r.required = l.n = g), m !== l.s && D(i, "class", l.s = m), l;
  }, {
    e: void 0,
    t: void 0,
    a: void 0,
    o: void 0,
    i: void 0,
    n: void 0,
    s: void 0
  }), I(() => r.checked = e.checked), t;
})();
var ta = /* @__PURE__ */ $('<svg class="w-5 h-5"fill=none viewBox="0 0 24 24"stroke=currentColor aria-hidden=true><path stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">'), ra = /* @__PURE__ */ $('<svg class="w-5 h-5"fill=none viewBox="0 0 24 24"stroke=currentColor aria-hidden=true><path stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M5 13l4 4L19 7">'), na = /* @__PURE__ */ $('<svg class="w-5 h-5"fill=none viewBox="0 0 24 24"stroke=currentColor aria-hidden=true><path stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">'), aa = /* @__PURE__ */ $('<svg class="w-5 h-5"fill=none viewBox="0 0 24 24"stroke=currentColor aria-hidden=true><path stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">'), ia = /* @__PURE__ */ $('<h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1">'), la = /* @__PURE__ */ $('<button type=button class="flex-shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"aria-label=Close><svg class="w-4 h-4"fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M6 18L18 6M6 6l12 12">'), sa = /* @__PURE__ */ $('<div role=alert><div class="flex items-start gap-3"><div></div><div class="flex-1 min-w-0"><div class="text-sm text-gray-700 dark:text-gray-300">');
const oa = {
  info: {
    border: "border-l-blue-500",
    bg: "bg-blue-50/50 dark:bg-blue-900/10",
    icon: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-900/30"
  },
  success: {
    border: "border-l-emerald-500",
    bg: "bg-emerald-50/50 dark:bg-emerald-900/10",
    icon: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30"
  },
  warning: {
    border: "border-l-amber-500",
    bg: "bg-amber-50/50 dark:bg-amber-900/10",
    icon: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-100 dark:bg-amber-900/30"
  },
  error: {
    border: "border-l-rose-500",
    bg: "bg-rose-50/50 dark:bg-rose-900/10",
    icon: "text-rose-600 dark:text-rose-400",
    iconBg: "bg-rose-100 dark:bg-rose-900/30"
  }
}, ca = () => ta(), ua = () => ra(), da = () => na(), ha = () => aa(), ga = (e) => v(E, {
  get when() {
    return e.type === "info";
  },
  get fallback() {
    return v(E, {
      get when() {
        return e.type === "success";
      },
      get fallback() {
        return v(E, {
          get when() {
            return e.type === "warning";
          },
          get fallback() {
            return v(ha, {});
          },
          get children() {
            return v(da, {});
          }
        });
      },
      get children() {
        return v(ua, {});
      }
    });
  },
  get children() {
    return v(ca, {});
  }
}), Ro = (e) => {
  const t = () => oa[e.type];
  return (() => {
    var n = sa(), r = n.firstChild, i = r.firstChild, l = i.nextSibling, u = l.firstChild;
    return p(i, v(E, {
      get when() {
        return e.icon;
      },
      get fallback() {
        return v(ga, {
          get type() {
            return e.type;
          }
        });
      },
      get children() {
        return e.icon;
      }
    })), p(l, v(E, {
      get when() {
        return e.title;
      },
      get children() {
        var a = ia();
        return p(a, () => e.title), a;
      }
    }), u), p(u, () => e.children), p(r, v(E, {
      get when() {
        return e.onClose;
      },
      get children() {
        var a = la();
        return Be(a, "click", e.onClose, !0), a;
      }
    }), null), I((a) => {
      var o = `glass-card border-l-4 ${t().border} ${t().bg} p-4 rounded-xl ${e.class ?? ""}`, s = `flex-shrink-0 w-8 h-8 rounded-lg ${t().iconBg} ${t().icon} flex items-center justify-center`;
      return o !== a.e && L(n, a.e = o), s !== a.t && L(i, a.t = s), a;
    }, {
      e: void 0,
      t: void 0
    }), n;
  })();
};
W(["click"]);
var fa = /* @__PURE__ */ $('<h2 id=modal-title class="text-lg font-semibold text-gray-900 dark:text-white">'), ma = /* @__PURE__ */ $('<button type=button class="ml-auto p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"aria-label=Close><svg class="w-5 h-5"fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M6 18L18 6M6 6l12 12">'), pa = /* @__PURE__ */ $('<div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/5">'), ba = /* @__PURE__ */ $('<div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-white/5">'), va = /* @__PURE__ */ $('<dialog class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent backdrop:bg-black/50 backdrop:backdrop-blur-sm m-auto"><div><div class="p-6 max-h-[70vh] overflow-y-auto scrollbar-thin">');
const xa = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-4xl"
}, Lo = (e) => {
  let t;
  const n = () => e.size ?? "md", r = () => e.showClose ?? !0, i = () => e.closeOnBackdrop ?? !0, l = () => e.closeOnEscape ?? !0;
  fe(() => {
    t && (e.open ? t.open || t.showModal() : t.open && t.close());
  }), Zr(() => {
    if (!t)
      return;
    const a = () => {
      e.open && e.onClose();
    }, o = (s) => {
      l() || s.preventDefault();
    };
    t.addEventListener("close", a), t.addEventListener("cancel", o), ue(() => {
      t == null || t.removeEventListener("close", a), t == null || t.removeEventListener("cancel", o);
    });
  }), fe(() => {
    e.open ? document.body.style.overflow = "hidden" : document.body.style.overflow = "", ue(() => {
      document.body.style.overflow = "";
    });
  });
  const u = (a) => {
    i() && a.target === t && e.onClose();
  };
  return (() => {
    var a = va(), o = a.firstChild, s = o.firstChild;
    a.$$keydown = (g) => g.key === "Enter" && g.target === t && e.onClose(), a.$$click = u;
    var c = t;
    return typeof c == "function" ? ze(c, a) : t = a, p(o, v(E, {
      get when() {
        return e.title || r();
      },
      get children() {
        var g = pa();
        return p(g, v(E, {
          get when() {
            return e.title;
          },
          get children() {
            var m = fa();
            return p(m, () => e.title), m;
          }
        }), null), p(g, v(E, {
          get when() {
            return r();
          },
          get children() {
            var m = ma();
            return Be(m, "click", e.onClose, !0), m;
          }
        }), null), g;
      }
    }), s), p(s, () => e.children), p(o, v(E, {
      get when() {
        return e.footer;
      },
      get children() {
        var g = ba();
        return p(g, () => e.footer), g;
      }
    }), null), I((g) => {
      var m = e.title ? "modal-title" : void 0, y = `w-full ${xa[n()]} glass-card rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in duration-200`;
      return m !== g.e && D(a, "aria-labelledby", g.e = m), y !== g.t && L(o, g.t = y), g;
    }, {
      e: void 0,
      t: void 0
    }), a;
  })();
};
W(["click", "keydown"]);
var ka = /* @__PURE__ */ $('<p id=dialog-description class="mt-2 text-sm text-gray-600 dark:text-gray-400">'), ya = /* @__PURE__ */ $('<dialog class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent backdrop:bg-black/50 backdrop:backdrop-blur-sm m-auto"aria-labelledby=dialog-title><div class="w-full max-w-sm glass-card rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in duration-200"><div class=p-6><h2 id=dialog-title class="text-lg font-semibold text-gray-900 dark:text-white"></h2></div><div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-white/5"><button type=button class="btn-secondary px-4 py-2 text-sm"></button><button type=button>');
const wa = {
  default: "btn-primary",
  danger: "bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium transition-colors focus:outline-none focus-ring"
}, Io = (e) => {
  let t;
  const n = () => e.variant ?? "default", r = () => e.confirmLabel ?? "Confirm", i = () => e.cancelLabel ?? "Cancel";
  fe(() => {
    t && (e.open ? t.open || t.showModal() : t.open && t.close());
  }), Zr(() => {
    if (!t)
      return;
    const o = () => {
      var s;
      e.open && (e.onOpenChange(!1), (s = e.onCancel) == null || s.call(e));
    };
    t.addEventListener("close", o), ue(() => {
      t == null || t.removeEventListener("close", o);
    });
  }), fe(() => {
    e.open ? document.body.style.overflow = "hidden" : document.body.style.overflow = "", ue(() => {
      document.body.style.overflow = "";
    });
  });
  const l = (o) => {
    var s;
    o.target === t && (e.onOpenChange(!1), (s = e.onCancel) == null || s.call(e));
  }, u = () => {
    var o;
    e.onOpenChange(!1), (o = e.onCancel) == null || o.call(e);
  }, a = () => {
    e.onConfirm(), e.onOpenChange(!1);
  };
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: Native dialog handles Escape key
    (() => {
      var o = ya(), s = o.firstChild, c = s.firstChild, g = c.firstChild, m = c.nextSibling, y = m.firstChild, b = y.nextSibling;
      o.$$click = l;
      var S = t;
      return typeof S == "function" ? ze(S, o) : t = o, p(g, () => e.title), p(c, v(E, {
        get when() {
          return e.description;
        },
        get children() {
          var k = ka();
          return p(k, () => e.description), k;
        }
      }), null), y.$$click = u, p(y, i), b.$$click = a, p(b, r), I((k) => {
        var _ = e.description ? "dialog-description" : void 0, f = `${wa[n()]} px-4 py-2 text-sm`;
        return _ !== k.e && D(o, "aria-describedby", k.e = _), f !== k.t && L(b, k.t = f), k;
      }, {
        e: void 0,
        t: void 0
      }), o;
    })()
  );
};
W(["click"]);
function $a(e) {
  const { open: t, onClose: n, closeOnEscape: r, closeOnBackdrop: i } = e, l = () => (r == null ? void 0 : r()) ?? !0, u = () => (i == null ? void 0 : i()) ?? !0;
  return fe(() => {
    if (!t() || !l())
      return;
    const o = (s) => {
      s.key === "Escape" && n();
    };
    document.addEventListener("keydown", o), ue(() => document.removeEventListener("keydown", o));
  }), fe(() => {
    t() ? document.body.style.overflow = "hidden" : document.body.style.overflow = "", ue(() => {
      document.body.style.overflow = "";
    });
  }), {
    shouldCloseOnBackdrop: u,
    handleBackdropClick: (o, s = (c) => c.target === c.currentTarget) => {
      u() && s(o) && n();
    }
  };
}
function _t() {
  return () => document.documentElement.classList.contains("dark") || document.querySelector(".dark") !== null;
}
function tn(e = 2e3) {
  const [t, n] = K(!1);
  let r;
  return { copied: t, copy: async (l) => {
    try {
      return await navigator.clipboard.writeText(l), n(!0), r && clearTimeout(r), r = setTimeout(() => {
        n(!1), r = void 0;
      }, e), !0;
    } catch {
      return !1;
    }
  } };
}
function _a(e = !1) {
  const [t, n] = K(e);
  return {
    isOpen: t,
    onOpen: () => n(!0),
    onClose: () => n(!1),
    onToggle: () => n((r) => !r)
  };
}
var Sa = /* @__PURE__ */ $('<h2 id=drawer-title class="text-lg font-semibold text-gray-900 dark:text-white">'), Ca = /* @__PURE__ */ $('<button type=button class="ml-auto p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"aria-label=Close><svg class="w-5 h-5"fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M6 18L18 6M6 6l12 12">'), Ta = /* @__PURE__ */ $('<div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/5">'), Aa = /* @__PURE__ */ $('<div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-white/5">'), Ea = /* @__PURE__ */ $('<div aria-modal=true><div><div class="flex flex-col h-full overflow-hidden"><div>');
const Ra = {
  sm: "max-w-xs",
  md: "max-w-sm",
  lg: "max-w-md",
  xl: "max-w-lg"
}, La = {
  left: {
    panel: "left-0",
    enter: "animate-in slide-in-from-left",
    exit: "animate-out slide-out-to-left"
  },
  right: {
    panel: "right-0",
    enter: "animate-in slide-in-from-right",
    exit: "animate-out slide-out-to-right"
  }
}, Ia = 200, Oo = (e) => {
  const t = () => e.position ?? "right", n = () => e.size ?? "md", r = () => e.showClose ?? !0, [i, l] = K(!1), [u, a] = K(!1), {
    handleBackdropClick: o
  } = $a({
    open: i,
    onClose: e.onClose,
    closeOnEscape: () => e.closeOnEscape ?? !0,
    closeOnBackdrop: () => e.closeOnBackdrop ?? !0
  });
  fe(() => {
    if (e.open)
      a(!1), l(!0);
    else if (i()) {
      a(!0);
      const y = setTimeout(() => {
        l(!1), a(!1);
      }, Ia);
      ue(() => clearTimeout(y));
    }
  });
  const s = () => La[t()], c = _t(), g = () => u() ? "animate-out fade-out duration-200" : "animate-in fade-in duration-200", m = () => u() ? `${s().exit} duration-200` : `${s().enter} duration-300`;
  return v(E, {
    get when() {
      return i();
    },
    get children() {
      return v($t, {
        get children() {
          var y = Ea(), b = y.firstChild, S = b.firstChild, k = S.firstChild;
          return y.$$click = (_) => o(_), p(S, v(E, {
            get when() {
              return e.title || r();
            },
            get children() {
              var _ = Ta();
              return p(_, v(E, {
                get when() {
                  return e.title;
                },
                get children() {
                  var f = Sa();
                  return p(f, () => e.title), f;
                }
              }), null), p(_, v(E, {
                get when() {
                  return r();
                },
                get children() {
                  var f = Ca();
                  return Be(f, "click", e.onClose, !0), f;
                }
              }), null), _;
            }
          }), k), p(k, () => e.children), p(S, v(E, {
            get when() {
              return e.footer;
            },
            get children() {
              var _ = Aa();
              return p(_, () => e.footer), _;
            }
          }), null), I((_) => {
            var f = `fixed inset-0 z-50 bg-black/50 backdrop-blur-sm ${g()} ${c() ? "dark" : ""}`, h = e.title ? "drawer-title" : void 0, x = `absolute inset-y-0 ${s().panel} w-full ${Ra[n()]} glass-thick shadow-2xl overflow-hidden ${m()}`, w = `flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col scrollbar-thin ${e.noPadding ? "" : "p-6"}`;
            return f !== _.e && L(y, _.e = f), h !== _.t && D(y, "aria-labelledby", _.t = h), x !== _.a && L(b, _.a = x), w !== _.o && L(k, _.o = w), _;
          }, {
            e: void 0,
            t: void 0,
            a: void 0,
            o: void 0
          }), y;
        }
      });
    }
  });
};
W(["click"]);
const [Oa, rr] = Mn({ toasts: [] });
let Da = 0;
function Do(e, t = "info", n = 4e3) {
  const r = `toast-${++Da}`;
  return rr(
    Jr((i) => {
      i.toasts.push({ id: r, type: t, message: e, duration: n });
    })
  ), n > 0 && setTimeout(() => {
    rn(r);
  }, n), r;
}
function rn(e) {
  rr(
    Jr((t) => {
      t.toasts = t.toasts.filter((n) => n.id !== e);
    })
  );
}
function Mo() {
  rr("toasts", []);
}
function Ma() {
  return Oa;
}
var Pa = /* @__PURE__ */ $('<svg class="w-5 h-5"fill=none viewBox="0 0 24 24"stroke=currentColor aria-hidden=true><path stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M5 13l4 4L19 7">'), Na = /* @__PURE__ */ $('<svg class="w-5 h-5"fill=none viewBox="0 0 24 24"stroke=currentColor aria-hidden=true><path stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M6 18L18 6M6 6l12 12">'), za = /* @__PURE__ */ $('<svg class="w-5 h-5"fill=none viewBox="0 0 24 24"stroke=currentColor aria-hidden=true><path stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">'), Fa = /* @__PURE__ */ $('<svg class="w-5 h-5"fill=none viewBox="0 0 24 24"stroke=currentColor aria-hidden=true><path stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">'), Ba = /* @__PURE__ */ $('<div role=alert><div></div><p class="flex-1 text-sm font-medium text-gray-800 dark:text-gray-200 pt-1"></p><button type=button class="flex-shrink-0 p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"aria-label=Dismiss><svg class="w-4 h-4"fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M6 18L18 6M6 6l12 12">'), Ha = /* @__PURE__ */ $('<div class="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">'), ja = /* @__PURE__ */ $("<div class=pointer-events-auto>");
const Ua = {
  success: {
    bg: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/30",
    icon: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30"
  },
  error: {
    bg: "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800/30",
    icon: "text-rose-600 dark:text-rose-400",
    iconBg: "bg-rose-100 dark:bg-rose-900/30"
  },
  warning: {
    bg: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/30",
    icon: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-100 dark:bg-amber-900/30"
  },
  info: {
    bg: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/30",
    icon: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-900/30"
  }
}, Ga = (e) => v(E, {
  get when() {
    return e.type === "success";
  },
  get fallback() {
    return v(E, {
      get when() {
        return e.type === "error";
      },
      get fallback() {
        return v(E, {
          get when() {
            return e.type === "warning";
          },
          get fallback() {
            return Fa();
          },
          get children() {
            return za();
          }
        });
      },
      get children() {
        return Na();
      }
    });
  },
  get children() {
    return Pa();
  }
}), qa = (e) => {
  const [t, n] = K(!1), r = () => Ua[e.toast.type], i = () => {
    n(!0), setTimeout(() => rn(e.toast.id), 200);
  };
  return (() => {
    var l = Ba(), u = l.firstChild, a = u.nextSibling, o = a.nextSibling;
    return p(u, v(Ga, {
      get type() {
        return e.toast.type;
      }
    })), p(a, () => e.toast.message), o.$$click = i, I((s) => {
      var c = `flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-200 ${r().bg} ${t() ? "opacity-0 translate-x-4" : "animate-in slide-in-from-right-4 fade-in"}`, g = `flex-shrink-0 w-8 h-8 rounded-lg ${r().iconBg} ${r().icon} flex items-center justify-center`;
      return c !== s.e && L(l, s.e = c), g !== s.t && L(u, s.t = g), s;
    }, {
      e: void 0,
      t: void 0
    }), l;
  })();
}, Po = () => {
  const e = Ma();
  return (() => {
    var t = Ha();
    return p(t, v(Q, {
      get each() {
        return e.toasts;
      },
      children: (n) => (() => {
        var r = ja();
        return p(r, v(qa, {
          toast: n
        })), r;
      })()
    })), t;
  })();
};
W(["click"]);
var Wa = /* @__PURE__ */ $('<button type=button class="flex-shrink-0 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">'), Va = /* @__PURE__ */ $('<output aria-live=polite><div><p class="flex-1 text-sm font-medium text-gray-800 dark:text-gray-200"></p><button type=button class="flex-shrink-0 p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"aria-label=Dismiss><svg class="w-4 h-4"fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M6 18L18 6M6 6l12 12">');
const Xa = {
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4"
}, Ya = 200, Za = 4e3, No = (e) => {
  const t = () => e.position ?? "bottom-center", n = () => e.duration ?? Za, [r, i] = K(!1), [l, u] = K(!1), a = _t();
  fe(() => {
    if (e.open)
      u(!1), i(!0);
    else if (r()) {
      u(!0);
      const m = setTimeout(() => {
        i(!1), u(!1);
      }, Ya);
      ue(() => clearTimeout(m));
    }
  }), fe(() => {
    if (e.open && n() > 0) {
      const m = setTimeout(() => {
        e.onClose();
      }, n());
      ue(() => clearTimeout(m));
    }
  });
  const o = () => {
    var m;
    (m = e.onAction) == null || m.call(e), e.onClose();
  }, s = () => {
    switch (t()) {
      case "bottom-left":
        return "animate-in slide-in-from-left-4 fade-in";
      case "bottom-right":
        return "animate-in slide-in-from-right-4 fade-in";
      default:
        return "animate-in slide-in-from-bottom-4 fade-in";
    }
  }, c = () => {
    switch (t()) {
      case "bottom-left":
        return "animate-out slide-out-to-left-4 fade-out";
      case "bottom-right":
        return "animate-out slide-out-to-right-4 fade-out";
      default:
        return "animate-out slide-out-to-bottom-4 fade-out";
    }
  }, g = () => l() ? `${c()} duration-200` : `${s()} duration-200`;
  return v(E, {
    get when() {
      return r();
    },
    get children() {
      return v($t, {
        get children() {
          var m = Va(), y = m.firstChild, b = y.firstChild, S = b.nextSibling;
          return p(b, () => e.message), p(y, v(E, {
            get when() {
              return e.action;
            },
            get children() {
              var k = Wa();
              return k.$$click = o, p(k, () => e.action), k;
            }
          }), S), Be(S, "click", e.onClose, !0), I((k) => {
            var _ = `fixed ${Xa[t()]} z-50 ${a() ? "dark" : ""}`, f = `glass-card flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg min-w-[200px] max-w-sm ${g()}`;
            return _ !== k.e && L(m, k.e = _), f !== k.t && L(y, k.t = f), k;
          }, {
            e: void 0,
            t: void 0
          }), m;
        }
      });
    }
  });
};
W(["click"]);
var Ka = /* @__PURE__ */ $('<div role=tooltip><div class="px-3 py-1.5 text-xs font-medium glass-tooltip rounded-lg whitespace-nowrap"></div><div aria-hidden=true>'), Ja = /* @__PURE__ */ $("<div>");
const Qa = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2"
}, ei = {
  top: "top-full left-1/2 -translate-x-1/2 border-t-surface-900 dark:border-t-surface-800 border-x-transparent border-b-transparent",
  bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-surface-900 dark:border-b-surface-800 border-x-transparent border-t-transparent",
  left: "left-full top-1/2 -translate-y-1/2 border-l-surface-900 dark:border-l-surface-800 border-y-transparent border-r-transparent",
  right: "right-full top-1/2 -translate-y-1/2 border-r-surface-900 dark:border-r-surface-800 border-y-transparent border-l-transparent"
}, zo = (e) => {
  const [t, n] = K(!1);
  let r;
  const i = () => e.position ?? "top", l = () => e.delay ?? 200, u = () => {
    r = setTimeout(() => n(!0), l());
  }, a = () => {
    r && (clearTimeout(r), r = void 0), n(!1);
  };
  return ue(() => {
    r && clearTimeout(r);
  }), (() => {
    var o = Ja();
    return o.$$focusout = a, o.$$focusin = u, o.addEventListener("mouseleave", a), o.addEventListener("mouseenter", u), p(o, () => e.children, null), p(o, v(E, {
      get when() {
        return t();
      },
      get children() {
        var s = Ka(), c = s.firstChild, g = c.nextSibling;
        return p(c, () => e.content), I((m) => {
          var y = `absolute z-50 ${Qa[i()]} animate-in fade-in zoom-in-95 duration-150`, b = `absolute w-0 h-0 border-4 ${ei[i()]}`;
          return y !== m.e && L(s, m.e = y), b !== m.t && L(g, m.t = b), m;
        }, {
          e: void 0,
          t: void 0
        }), s;
      }
    }), null), I(() => L(o, `relative inline-flex ${e.class ?? ""}`)), o;
  })();
};
W(["focusin", "focusout"]);
var ti = /* @__PURE__ */ $('<div><div class="flex items-center gap-1 p-1 rounded-xl glass-input overflow-x-auto scrollbar-thin"></div><div class=mt-4>'), Rr = /* @__PURE__ */ $("<span>"), ri = /* @__PURE__ */ $("<button type=button role=tab>"), ni = /* @__PURE__ */ $('<div role=tabpanel class="animate-in fade-in slide-in-from-bottom-2 duration-200">');
const Fo = (e) => {
  var u;
  const [t, n] = K(e.defaultTab || ((u = e.items[0]) == null ? void 0 : u.id)), r = te(() => e.activeTab !== void 0), i = te(() => r() ? e.activeTab : t()), l = (a) => {
    var o;
    r() || n(a), (o = e.onTabChange) == null || o.call(e, a);
  };
  return (() => {
    var a = ti(), o = a.firstChild, s = o.nextSibling;
    return p(o, v(Q, {
      get each() {
        return e.items;
      },
      children: (c) => (() => {
        var g = ri();
        return g.$$click = () => l(c.id), p(g, v(E, {
          get when() {
            return c.icon;
          },
          get children() {
            var m = Rr();
            return p(m, () => c.icon), I(() => L(m, i() === c.id ? "text-accent-500 dark:text-accent-500" : "")), m;
          }
        }), null), p(g, () => c.label, null), p(g, v(E, {
          get when() {
            return c.badge;
          },
          get children() {
            var m = Rr();
            return p(m, () => c.badge), I(() => L(m, `ml-1 px-1.5 py-0.5 text-[0.625rem] rounded-md ${i() === c.id ? "glass-button text-gray-700 dark:text-gray-200" : "glass-button text-gray-500 dark:text-gray-400"}`)), m;
          }
        }), null), I((m) => {
          var y = `flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap outline-none focus-ring ${i() === c.id ? "glass-active text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"}`, b = i() === c.id;
          return y !== m.e && L(g, m.e = y), b !== m.t && D(g, "aria-selected", m.t = b), m;
        }, {
          e: void 0,
          t: void 0
        }), g;
      })()
    })), p(s, v(Q, {
      get each() {
        return e.items;
      },
      children: (c) => v(E, {
        get when() {
          return i() === c.id;
        },
        get children() {
          var g = ni();
          return p(g, () => c.content), g;
        }
      })
    })), I(() => L(a, `w-full ${e.class ?? ""}`)), a;
  })();
};
W(["click"]);
var ai = /* @__PURE__ */ $("<div>"), ii = /* @__PURE__ */ $('<div class="px-3 pb-3 border-t border-gray-200 dark:border-white/5 animate-in fade-in slide-in-from-top-2 duration-200"><div class=pt-3>'), li = /* @__PURE__ */ $('<div class="glass-card rounded-lg overflow-hidden"><button type=button class="w-full flex items-center justify-between px-3 py-2.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"><div class="flex items-center gap-2 text-left"><svg fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M9 5l7 7-7 7"></path></svg><span class="text-xs font-medium text-gray-700 dark:text-gray-200"></span></div><svg fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M19 9l-7 7-7-7">');
const Bo = (e) => {
  const t = () => {
    const u = [];
    for (const a of e.items)
      a.defaultOpen && u.push(a.id);
    return u;
  }, [n, r] = K(t()), i = (u) => n().includes(u), l = (u) => {
    e.multiple ? r((a) => a.includes(u) ? a.filter((o) => o !== u) : [...a, u]) : r((a) => a.includes(u) ? [] : [u]);
  };
  return (() => {
    var u = ai();
    return p(u, v(Q, {
      get each() {
        return e.items;
      },
      children: (a) => (() => {
        var o = li(), s = o.firstChild, c = s.firstChild, g = c.firstChild, m = g.nextSibling, y = c.nextSibling;
        return s.$$click = () => l(a.id), p(m, () => a.title), p(o, v(E, {
          get when() {
            return i(a.id);
          },
          get children() {
            var b = ii(), S = b.firstChild;
            return p(S, () => a.content), I(() => D(b, "id", `accordion-content-${a.id}`)), b;
          }
        }), null), I((b) => {
          var S = i(a.id), k = `accordion-content-${a.id}`, _ = `w-3.5 h-3.5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${i(a.id) ? "rotate-90" : ""}`, f = `w-3.5 h-3.5 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${i(a.id) ? "rotate-180" : ""}`;
          return S !== b.e && D(s, "aria-expanded", b.e = S), k !== b.t && D(s, "aria-controls", b.t = k), _ !== b.a && D(g, "class", b.a = _), f !== b.o && D(y, "class", b.o = f), b;
        }, {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0
        }), o;
      })()
    })), I(() => L(u, `space-y-1.5 ${e.class ?? ""}`)), u;
  })();
};
W(["click"]);
var si = /* @__PURE__ */ $('<div class="px-3 pb-3 border-t border-gray-200 dark:border-white/5 animate-in fade-in slide-in-from-top-2 duration-200"><div class=pt-3>'), oi = /* @__PURE__ */ $('<div><button type=button class="w-full flex items-center justify-between px-3 py-2.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"><div class="flex items-center gap-2 text-left"><svg fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M9 5l7 7-7 7"></path></svg><span class="text-xs font-medium text-gray-700 dark:text-gray-200"></span></div><svg fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M19 9l-7 7-7-7">');
const Ho = (e) => {
  const [t, n] = K(e.defaultOpen ?? !1);
  return (() => {
    var r = oi(), i = r.firstChild, l = i.firstChild, u = l.firstChild, a = u.nextSibling, o = l.nextSibling;
    return i.$$click = () => n(!t()), p(a, () => e.title), p(r, v(E, {
      get when() {
        return t();
      },
      get children() {
        var s = si(), c = s.firstChild;
        return p(c, () => e.children), s;
      }
    }), null), I((s) => {
      var c = `glass-card rounded-lg overflow-hidden ${e.class ?? ""}`, g = t(), m = `w-3.5 h-3.5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${t() ? "rotate-90" : ""}`, y = `w-3.5 h-3.5 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${t() ? "rotate-180" : ""}`;
      return c !== s.e && L(r, s.e = c), g !== s.t && D(i, "aria-expanded", s.t = g), m !== s.a && D(u, "class", s.a = m), y !== s.o && D(o, "class", s.o = y), s;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0
    }), r;
  })();
};
W(["click"]);
var ci = /* @__PURE__ */ $("<div role=group>"), ui = /* @__PURE__ */ $("<button type=button>");
function jo(e) {
  const t = () => e.size === "sm" ? "px-2 py-1 text-[0.625rem]" : "px-3 py-1.5 text-xs";
  return (
    // biome-ignore lint/a11y/useSemanticElements: fieldset has browser styling that breaks the design
    (() => {
      var n = ci();
      return p(n, v(Q, {
        get each() {
          return e.options;
        },
        children: (r) => (() => {
          var i = ui();
          return i.$$click = () => !r.disabled && e.onChange(r.value), p(i, () => r.label), I((l) => {
            var u = r.disabled, a = `${t()} font-bold rounded-lg transition-all ${e.value === r.value ? "bg-white dark:bg-surface-600 text-surface-900 dark:text-white shadow-sm" : "text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white"} ${r.disabled ? "opacity-50 cursor-not-allowed" : ""}`;
            return u !== l.e && (i.disabled = l.e = u), a !== l.t && L(i, l.t = a), l;
          }, {
            e: void 0,
            t: void 0
          }), i;
        })()
      })), I((r) => {
        var i = e["aria-label"], l = `flex items-center gap-1 p-1 bg-surface-200/80 dark:bg-surface-800/80 rounded-xl w-fit ${e.class ?? ""}`;
        return i !== r.e && D(n, "aria-label", r.e = i), l !== r.t && L(n, r.t = l), r;
      }, {
        e: void 0,
        t: void 0
      }), n;
    })()
  );
}
W(["click"]);
/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */
const {
  entries: nn,
  setPrototypeOf: Lr,
  isFrozen: di,
  getPrototypeOf: hi,
  getOwnPropertyDescriptor: gi
} = Object;
let {
  freeze: ie,
  seal: de,
  create: Vt
} = Object, {
  apply: Xt,
  construct: Yt
} = typeof Reflect < "u" && Reflect;
ie || (ie = function(t) {
  return t;
});
de || (de = function(t) {
  return t;
});
Xt || (Xt = function(t, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), l = 2; l < r; l++)
    i[l - 2] = arguments[l];
  return t.apply(n, i);
});
Yt || (Yt = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new t(...r);
});
const mt = le(Array.prototype.forEach), fi = le(Array.prototype.lastIndexOf), Ir = le(Array.prototype.pop), Ke = le(Array.prototype.push), mi = le(Array.prototype.splice), vt = le(String.prototype.toLowerCase), zt = le(String.prototype.toString), Ft = le(String.prototype.match), Je = le(String.prototype.replace), pi = le(String.prototype.indexOf), bi = le(String.prototype.trim), ge = le(Object.prototype.hasOwnProperty), ne = le(RegExp.prototype.test), Qe = vi(TypeError);
function le(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return Xt(e, t, r);
  };
}
function vi(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return Yt(e, n);
  };
}
function z(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : vt;
  Lr && Lr(e, null);
  let r = t.length;
  for (; r--; ) {
    let i = t[r];
    if (typeof i == "string") {
      const l = n(i);
      l !== i && (di(t) || (t[r] = l), i = l);
    }
    e[i] = !0;
  }
  return e;
}
function xi(e) {
  for (let t = 0; t < e.length; t++)
    ge(e, t) || (e[t] = null);
  return e;
}
function ke(e) {
  const t = Vt(null);
  for (const [n, r] of nn(e))
    ge(e, n) && (Array.isArray(r) ? t[n] = xi(r) : r && typeof r == "object" && r.constructor === Object ? t[n] = ke(r) : t[n] = r);
  return t;
}
function et(e, t) {
  for (; e !== null; ) {
    const r = gi(e, t);
    if (r) {
      if (r.get)
        return le(r.get);
      if (typeof r.value == "function")
        return le(r.value);
    }
    e = hi(e);
  }
  function n() {
    return null;
  }
  return n;
}
const Or = ie(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Bt = ie(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Ht = ie(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), ki = ie(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), jt = ie(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), yi = ie(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Dr = ie(["#text"]), Mr = ie(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Ut = ie(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Pr = ie(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), pt = ie(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), wi = de(/\{\{[\w\W]*|[\w\W]*\}\}/gm), $i = de(/<%[\w\W]*|[\w\W]*%>/gm), _i = de(/\$\{[\w\W]*/gm), Si = de(/^data-[\-\w.\u00B7-\uFFFF]+$/), Ci = de(/^aria-[\-\w]+$/), an = de(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Ti = de(/^(?:\w+script|data):/i), Ai = de(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), ln = de(/^html$/i), Ei = de(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Nr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Ci,
  ATTR_WHITESPACE: Ai,
  CUSTOM_ELEMENT: Ei,
  DATA_ATTR: Si,
  DOCTYPE_NAME: ln,
  ERB_EXPR: $i,
  IS_ALLOWED_URI: an,
  IS_SCRIPT_OR_DATA: Ti,
  MUSTACHE_EXPR: wi,
  TMPLIT_EXPR: _i
});
const tt = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, Ri = function() {
  return typeof window > "u" ? null : window;
}, Li = function(t, n) {
  if (typeof t != "object" || typeof t.createPolicy != "function")
    return null;
  let r = null;
  const i = "data-tt-policy-suffix";
  n && n.hasAttribute(i) && (r = n.getAttribute(i));
  const l = "dompurify" + (r ? "#" + r : "");
  try {
    return t.createPolicy(l, {
      createHTML(u) {
        return u;
      },
      createScriptURL(u) {
        return u;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + l + " could not be created."), null;
  }
}, zr = function() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function sn() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Ri();
  const t = (M) => sn(M);
  if (t.version = "3.3.1", t.removed = [], !e || !e.document || e.document.nodeType !== tt.document || !e.Element)
    return t.isSupported = !1, t;
  let {
    document: n
  } = e;
  const r = n, i = r.currentScript, {
    DocumentFragment: l,
    HTMLTemplateElement: u,
    Node: a,
    Element: o,
    NodeFilter: s,
    NamedNodeMap: c = e.NamedNodeMap || e.MozNamedAttrMap,
    HTMLFormElement: g,
    DOMParser: m,
    trustedTypes: y
  } = e, b = o.prototype, S = et(b, "cloneNode"), k = et(b, "remove"), _ = et(b, "nextSibling"), f = et(b, "childNodes"), h = et(b, "parentNode");
  if (typeof u == "function") {
    const M = n.createElement("template");
    M.content && M.content.ownerDocument && (n = M.content.ownerDocument);
  }
  let x, w = "";
  const {
    implementation: C,
    createNodeIterator: A,
    createDocumentFragment: P,
    getElementsByTagName: R
  } = n, {
    importNode: F
  } = r;
  let N = zr();
  t.isSupported = typeof nn == "function" && typeof h == "function" && C && C.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: re,
    ERB_EXPR: Se,
    TMPLIT_EXPR: Ce,
    DATA_ATTR: je,
    ARIA_ATTR: Tt,
    IS_SCRIPT_OR_DATA: lt,
    ATTR_WHITESPACE: X,
    CUSTOM_ELEMENT: ce
  } = Nr;
  let {
    IS_ALLOWED_URI: Te
  } = Nr, q = null;
  const se = z({}, [...Or, ...Bt, ...Ht, ...jt, ...Dr]);
  let Y = null;
  const he = z({}, [...Mr, ...Ut, ...Pr, ...pt]);
  let j = Object.seal(Vt(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), me = null, Oe = null;
  const pe = Object.seal(Vt(null, {
    tagCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    }
  }));
  let Xe = !0, De = !0, Me = !1, st = !0, be = !1, ot = !0, Pe = !1, At = !1, Et = !1, Ue = !1, ct = !1, ut = !1, gr = !0, fr = !1;
  const _n = "user-content-";
  let Rt = !0, Ye = !1, Ge = {}, ve = null;
  const Lt = z({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let mr = null;
  const pr = z({}, ["audio", "video", "img", "source", "image", "track"]);
  let It = null;
  const br = z({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), dt = "http://www.w3.org/1998/Math/MathML", ht = "http://www.w3.org/2000/svg", Ae = "http://www.w3.org/1999/xhtml";
  let qe = Ae, Ot = !1, Dt = null;
  const Sn = z({}, [dt, ht, Ae], zt);
  let gt = z({}, ["mi", "mo", "mn", "ms", "mtext"]), ft = z({}, ["annotation-xml"]);
  const Cn = z({}, ["title", "style", "font", "a", "script"]);
  let Ze = null;
  const Tn = ["application/xhtml+xml", "text/html"], An = "text/html";
  let Z = null, We = null;
  const En = n.createElement("form"), vr = function(d) {
    return d instanceof RegExp || d instanceof Function;
  }, Mt = function() {
    let d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(We && We === d)) {
      if ((!d || typeof d != "object") && (d = {}), d = ke(d), Ze = // eslint-disable-next-line unicorn/prefer-includes
      Tn.indexOf(d.PARSER_MEDIA_TYPE) === -1 ? An : d.PARSER_MEDIA_TYPE, Z = Ze === "application/xhtml+xml" ? zt : vt, q = ge(d, "ALLOWED_TAGS") ? z({}, d.ALLOWED_TAGS, Z) : se, Y = ge(d, "ALLOWED_ATTR") ? z({}, d.ALLOWED_ATTR, Z) : he, Dt = ge(d, "ALLOWED_NAMESPACES") ? z({}, d.ALLOWED_NAMESPACES, zt) : Sn, It = ge(d, "ADD_URI_SAFE_ATTR") ? z(ke(br), d.ADD_URI_SAFE_ATTR, Z) : br, mr = ge(d, "ADD_DATA_URI_TAGS") ? z(ke(pr), d.ADD_DATA_URI_TAGS, Z) : pr, ve = ge(d, "FORBID_CONTENTS") ? z({}, d.FORBID_CONTENTS, Z) : Lt, me = ge(d, "FORBID_TAGS") ? z({}, d.FORBID_TAGS, Z) : ke({}), Oe = ge(d, "FORBID_ATTR") ? z({}, d.FORBID_ATTR, Z) : ke({}), Ge = ge(d, "USE_PROFILES") ? d.USE_PROFILES : !1, Xe = d.ALLOW_ARIA_ATTR !== !1, De = d.ALLOW_DATA_ATTR !== !1, Me = d.ALLOW_UNKNOWN_PROTOCOLS || !1, st = d.ALLOW_SELF_CLOSE_IN_ATTR !== !1, be = d.SAFE_FOR_TEMPLATES || !1, ot = d.SAFE_FOR_XML !== !1, Pe = d.WHOLE_DOCUMENT || !1, Ue = d.RETURN_DOM || !1, ct = d.RETURN_DOM_FRAGMENT || !1, ut = d.RETURN_TRUSTED_TYPE || !1, Et = d.FORCE_BODY || !1, gr = d.SANITIZE_DOM !== !1, fr = d.SANITIZE_NAMED_PROPS || !1, Rt = d.KEEP_CONTENT !== !1, Ye = d.IN_PLACE || !1, Te = d.ALLOWED_URI_REGEXP || an, qe = d.NAMESPACE || Ae, gt = d.MATHML_TEXT_INTEGRATION_POINTS || gt, ft = d.HTML_INTEGRATION_POINTS || ft, j = d.CUSTOM_ELEMENT_HANDLING || {}, d.CUSTOM_ELEMENT_HANDLING && vr(d.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (j.tagNameCheck = d.CUSTOM_ELEMENT_HANDLING.tagNameCheck), d.CUSTOM_ELEMENT_HANDLING && vr(d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (j.attributeNameCheck = d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), d.CUSTOM_ELEMENT_HANDLING && typeof d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (j.allowCustomizedBuiltInElements = d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), be && (De = !1), ct && (Ue = !0), Ge && (q = z({}, Dr), Y = [], Ge.html === !0 && (z(q, Or), z(Y, Mr)), Ge.svg === !0 && (z(q, Bt), z(Y, Ut), z(Y, pt)), Ge.svgFilters === !0 && (z(q, Ht), z(Y, Ut), z(Y, pt)), Ge.mathMl === !0 && (z(q, jt), z(Y, Pr), z(Y, pt))), d.ADD_TAGS && (typeof d.ADD_TAGS == "function" ? pe.tagCheck = d.ADD_TAGS : (q === se && (q = ke(q)), z(q, d.ADD_TAGS, Z))), d.ADD_ATTR && (typeof d.ADD_ATTR == "function" ? pe.attributeCheck = d.ADD_ATTR : (Y === he && (Y = ke(Y)), z(Y, d.ADD_ATTR, Z))), d.ADD_URI_SAFE_ATTR && z(It, d.ADD_URI_SAFE_ATTR, Z), d.FORBID_CONTENTS && (ve === Lt && (ve = ke(ve)), z(ve, d.FORBID_CONTENTS, Z)), d.ADD_FORBID_CONTENTS && (ve === Lt && (ve = ke(ve)), z(ve, d.ADD_FORBID_CONTENTS, Z)), Rt && (q["#text"] = !0), Pe && z(q, ["html", "head", "body"]), q.table && (z(q, ["tbody"]), delete me.tbody), d.TRUSTED_TYPES_POLICY) {
        if (typeof d.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw Qe('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof d.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw Qe('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        x = d.TRUSTED_TYPES_POLICY, w = x.createHTML("");
      } else
        x === void 0 && (x = Li(y, i)), x !== null && typeof w == "string" && (w = x.createHTML(""));
      ie && ie(d), We = d;
    }
  }, xr = z({}, [...Bt, ...Ht, ...ki]), kr = z({}, [...jt, ...yi]), Rn = function(d) {
    let T = h(d);
    (!T || !T.tagName) && (T = {
      namespaceURI: qe,
      tagName: "template"
    });
    const O = vt(d.tagName), G = vt(T.tagName);
    return Dt[d.namespaceURI] ? d.namespaceURI === ht ? T.namespaceURI === Ae ? O === "svg" : T.namespaceURI === dt ? O === "svg" && (G === "annotation-xml" || gt[G]) : !!xr[O] : d.namespaceURI === dt ? T.namespaceURI === Ae ? O === "math" : T.namespaceURI === ht ? O === "math" && ft[G] : !!kr[O] : d.namespaceURI === Ae ? T.namespaceURI === ht && !ft[G] || T.namespaceURI === dt && !gt[G] ? !1 : !kr[O] && (Cn[O] || !xr[O]) : !!(Ze === "application/xhtml+xml" && Dt[d.namespaceURI]) : !1;
  }, xe = function(d) {
    Ke(t.removed, {
      element: d
    });
    try {
      h(d).removeChild(d);
    } catch {
      k(d);
    }
  }, Ne = function(d, T) {
    try {
      Ke(t.removed, {
        attribute: T.getAttributeNode(d),
        from: T
      });
    } catch {
      Ke(t.removed, {
        attribute: null,
        from: T
      });
    }
    if (T.removeAttribute(d), d === "is")
      if (Ue || ct)
        try {
          xe(T);
        } catch {
        }
      else
        try {
          T.setAttribute(d, "");
        } catch {
        }
  }, yr = function(d) {
    let T = null, O = null;
    if (Et)
      d = "<remove></remove>" + d;
    else {
      const V = Ft(d, /^[\r\n\t ]+/);
      O = V && V[0];
    }
    Ze === "application/xhtml+xml" && qe === Ae && (d = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + d + "</body></html>");
    const G = x ? x.createHTML(d) : d;
    if (qe === Ae)
      try {
        T = new m().parseFromString(G, Ze);
      } catch {
      }
    if (!T || !T.documentElement) {
      T = C.createDocument(qe, "template", null);
      try {
        T.documentElement.innerHTML = Ot ? w : G;
      } catch {
      }
    }
    const ee = T.body || T.documentElement;
    return d && O && ee.insertBefore(n.createTextNode(O), ee.childNodes[0] || null), qe === Ae ? R.call(T, Pe ? "html" : "body")[0] : Pe ? T.documentElement : ee;
  }, wr = function(d) {
    return A.call(
      d.ownerDocument || d,
      d,
      // eslint-disable-next-line no-bitwise
      s.SHOW_ELEMENT | s.SHOW_COMMENT | s.SHOW_TEXT | s.SHOW_PROCESSING_INSTRUCTION | s.SHOW_CDATA_SECTION,
      null
    );
  }, Pt = function(d) {
    return d instanceof g && (typeof d.nodeName != "string" || typeof d.textContent != "string" || typeof d.removeChild != "function" || !(d.attributes instanceof c) || typeof d.removeAttribute != "function" || typeof d.setAttribute != "function" || typeof d.namespaceURI != "string" || typeof d.insertBefore != "function" || typeof d.hasChildNodes != "function");
  }, $r = function(d) {
    return typeof a == "function" && d instanceof a;
  };
  function Ee(M, d, T) {
    mt(M, (O) => {
      O.call(t, d, T, We);
    });
  }
  const _r = function(d) {
    let T = null;
    if (Ee(N.beforeSanitizeElements, d, null), Pt(d))
      return xe(d), !0;
    const O = Z(d.nodeName);
    if (Ee(N.uponSanitizeElement, d, {
      tagName: O,
      allowedTags: q
    }), ot && d.hasChildNodes() && !$r(d.firstElementChild) && ne(/<[/\w!]/g, d.innerHTML) && ne(/<[/\w!]/g, d.textContent) || d.nodeType === tt.progressingInstruction || ot && d.nodeType === tt.comment && ne(/<[/\w]/g, d.data))
      return xe(d), !0;
    if (!(pe.tagCheck instanceof Function && pe.tagCheck(O)) && (!q[O] || me[O])) {
      if (!me[O] && Cr(O) && (j.tagNameCheck instanceof RegExp && ne(j.tagNameCheck, O) || j.tagNameCheck instanceof Function && j.tagNameCheck(O)))
        return !1;
      if (Rt && !ve[O]) {
        const G = h(d) || d.parentNode, ee = f(d) || d.childNodes;
        if (ee && G) {
          const V = ee.length;
          for (let oe = V - 1; oe >= 0; --oe) {
            const Re = S(ee[oe], !0);
            Re.__removalCount = (d.__removalCount || 0) + 1, G.insertBefore(Re, _(d));
          }
        }
      }
      return xe(d), !0;
    }
    return d instanceof o && !Rn(d) || (O === "noscript" || O === "noembed" || O === "noframes") && ne(/<\/no(script|embed|frames)/i, d.innerHTML) ? (xe(d), !0) : (be && d.nodeType === tt.text && (T = d.textContent, mt([re, Se, Ce], (G) => {
      T = Je(T, G, " ");
    }), d.textContent !== T && (Ke(t.removed, {
      element: d.cloneNode()
    }), d.textContent = T)), Ee(N.afterSanitizeElements, d, null), !1);
  }, Sr = function(d, T, O) {
    if (gr && (T === "id" || T === "name") && (O in n || O in En))
      return !1;
    if (!(De && !Oe[T] && ne(je, T))) {
      if (!(Xe && ne(Tt, T))) {
        if (!(pe.attributeCheck instanceof Function && pe.attributeCheck(T, d))) {
          if (!Y[T] || Oe[T]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Cr(d) && (j.tagNameCheck instanceof RegExp && ne(j.tagNameCheck, d) || j.tagNameCheck instanceof Function && j.tagNameCheck(d)) && (j.attributeNameCheck instanceof RegExp && ne(j.attributeNameCheck, T) || j.attributeNameCheck instanceof Function && j.attributeNameCheck(T, d)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              T === "is" && j.allowCustomizedBuiltInElements && (j.tagNameCheck instanceof RegExp && ne(j.tagNameCheck, O) || j.tagNameCheck instanceof Function && j.tagNameCheck(O)))
            ) return !1;
          } else if (!It[T]) {
            if (!ne(Te, Je(O, X, ""))) {
              if (!((T === "src" || T === "xlink:href" || T === "href") && d !== "script" && pi(O, "data:") === 0 && mr[d])) {
                if (!(Me && !ne(lt, Je(O, X, "")))) {
                  if (O)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, Cr = function(d) {
    return d !== "annotation-xml" && Ft(d, ce);
  }, Tr = function(d) {
    Ee(N.beforeSanitizeAttributes, d, null);
    const {
      attributes: T
    } = d;
    if (!T || Pt(d))
      return;
    const O = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: Y,
      forceKeepAttr: void 0
    };
    let G = T.length;
    for (; G--; ) {
      const ee = T[G], {
        name: V,
        namespaceURI: oe,
        value: Re
      } = ee, Ve = Z(V), Nt = Re;
      let J = V === "value" ? Nt : bi(Nt);
      if (O.attrName = Ve, O.attrValue = J, O.keepAttr = !0, O.forceKeepAttr = void 0, Ee(N.uponSanitizeAttribute, d, O), J = O.attrValue, fr && (Ve === "id" || Ve === "name") && (Ne(V, d), J = _n + J), ot && ne(/((--!?|])>)|<\/(style|title|textarea)/i, J)) {
        Ne(V, d);
        continue;
      }
      if (Ve === "attributename" && Ft(J, "href")) {
        Ne(V, d);
        continue;
      }
      if (O.forceKeepAttr)
        continue;
      if (!O.keepAttr) {
        Ne(V, d);
        continue;
      }
      if (!st && ne(/\/>/i, J)) {
        Ne(V, d);
        continue;
      }
      be && mt([re, Se, Ce], (Er) => {
        J = Je(J, Er, " ");
      });
      const Ar = Z(d.nodeName);
      if (!Sr(Ar, Ve, J)) {
        Ne(V, d);
        continue;
      }
      if (x && typeof y == "object" && typeof y.getAttributeType == "function" && !oe)
        switch (y.getAttributeType(Ar, Ve)) {
          case "TrustedHTML": {
            J = x.createHTML(J);
            break;
          }
          case "TrustedScriptURL": {
            J = x.createScriptURL(J);
            break;
          }
        }
      if (J !== Nt)
        try {
          oe ? d.setAttributeNS(oe, V, J) : d.setAttribute(V, J), Pt(d) ? xe(d) : Ir(t.removed);
        } catch {
          Ne(V, d);
        }
    }
    Ee(N.afterSanitizeAttributes, d, null);
  }, Ln = function M(d) {
    let T = null;
    const O = wr(d);
    for (Ee(N.beforeSanitizeShadowDOM, d, null); T = O.nextNode(); )
      Ee(N.uponSanitizeShadowNode, T, null), _r(T), Tr(T), T.content instanceof l && M(T.content);
    Ee(N.afterSanitizeShadowDOM, d, null);
  };
  return t.sanitize = function(M) {
    let d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, T = null, O = null, G = null, ee = null;
    if (Ot = !M, Ot && (M = "<!-->"), typeof M != "string" && !$r(M))
      if (typeof M.toString == "function") {
        if (M = M.toString(), typeof M != "string")
          throw Qe("dirty is not a string, aborting");
      } else
        throw Qe("toString is not a function");
    if (!t.isSupported)
      return M;
    if (At || Mt(d), t.removed = [], typeof M == "string" && (Ye = !1), Ye) {
      if (M.nodeName) {
        const Re = Z(M.nodeName);
        if (!q[Re] || me[Re])
          throw Qe("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (M instanceof a)
      T = yr("<!---->"), O = T.ownerDocument.importNode(M, !0), O.nodeType === tt.element && O.nodeName === "BODY" || O.nodeName === "HTML" ? T = O : T.appendChild(O);
    else {
      if (!Ue && !be && !Pe && // eslint-disable-next-line unicorn/prefer-includes
      M.indexOf("<") === -1)
        return x && ut ? x.createHTML(M) : M;
      if (T = yr(M), !T)
        return Ue ? null : ut ? w : "";
    }
    T && Et && xe(T.firstChild);
    const V = wr(Ye ? M : T);
    for (; G = V.nextNode(); )
      _r(G), Tr(G), G.content instanceof l && Ln(G.content);
    if (Ye)
      return M;
    if (Ue) {
      if (ct)
        for (ee = P.call(T.ownerDocument); T.firstChild; )
          ee.appendChild(T.firstChild);
      else
        ee = T;
      return (Y.shadowroot || Y.shadowrootmode) && (ee = F.call(r, ee, !0)), ee;
    }
    let oe = Pe ? T.outerHTML : T.innerHTML;
    return Pe && q["!doctype"] && T.ownerDocument && T.ownerDocument.doctype && T.ownerDocument.doctype.name && ne(ln, T.ownerDocument.doctype.name) && (oe = "<!DOCTYPE " + T.ownerDocument.doctype.name + `>
` + oe), be && mt([re, Se, Ce], (Re) => {
      oe = Je(oe, Re, " ");
    }), x && ut ? x.createHTML(oe) : oe;
  }, t.setConfig = function() {
    let M = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Mt(M), At = !0;
  }, t.clearConfig = function() {
    We = null, At = !1;
  }, t.isValidAttribute = function(M, d, T) {
    We || Mt({});
    const O = Z(M), G = Z(d);
    return Sr(O, G, T);
  }, t.addHook = function(M, d) {
    typeof d == "function" && Ke(N[M], d);
  }, t.removeHook = function(M, d) {
    if (d !== void 0) {
      const T = fi(N[M], d);
      return T === -1 ? void 0 : mi(N[M], T, 1)[0];
    }
    return Ir(N[M]);
  }, t.removeHooks = function(M) {
    N[M] = [];
  }, t.removeAllHooks = function() {
    N = zr();
  }, t;
}
var Zt = sn(), Fr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ii(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Gt = { exports: {} }, Br;
function Oi() {
  return Br || (Br = 1, (function(e) {
    var t = typeof window < "u" ? window : typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope ? self : {};
    /**
     * Prism: Lightweight, robust, elegant syntax highlighting
     *
     * @license MIT <https://opensource.org/licenses/MIT>
     * @author Lea Verou <https://lea.verou.me>
     * @namespace
     * @public
     */
    var n = (function(r) {
      var i = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i, l = 0, u = {}, a = {
        /**
         * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
         * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
         * additional languages or plugins yourself.
         *
         * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
         *
         * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
         * empty Prism object into the global scope before loading the Prism script like this:
         *
         * ```js
         * window.Prism = window.Prism || {};
         * Prism.manual = true;
         * // add a new <script> to load Prism's script
         * ```
         *
         * @default false
         * @type {boolean}
         * @memberof Prism
         * @public
         */
        manual: r.Prism && r.Prism.manual,
        /**
         * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
         * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
         * own worker, you don't want it to do this.
         *
         * By setting this value to `true`, Prism will not add its own listeners to the worker.
         *
         * You obviously have to change this value before Prism executes. To do this, you can add an
         * empty Prism object into the global scope before loading the Prism script like this:
         *
         * ```js
         * window.Prism = window.Prism || {};
         * Prism.disableWorkerMessageHandler = true;
         * // Load Prism's script
         * ```
         *
         * @default false
         * @type {boolean}
         * @memberof Prism
         * @public
         */
        disableWorkerMessageHandler: r.Prism && r.Prism.disableWorkerMessageHandler,
        /**
         * A namespace for utility methods.
         *
         * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
         * change or disappear at any time.
         *
         * @namespace
         * @memberof Prism
         */
        util: {
          encode: function f(h) {
            return h instanceof o ? new o(h.type, f(h.content), h.alias) : Array.isArray(h) ? h.map(f) : h.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
          },
          /**
           * Returns the name of the type of the given value.
           *
           * @param {any} o
           * @returns {string}
           * @example
           * type(null)      === 'Null'
           * type(undefined) === 'Undefined'
           * type(123)       === 'Number'
           * type('foo')     === 'String'
           * type(true)      === 'Boolean'
           * type([1, 2])    === 'Array'
           * type({})        === 'Object'
           * type(String)    === 'Function'
           * type(/abc+/)    === 'RegExp'
           */
          type: function(f) {
            return Object.prototype.toString.call(f).slice(8, -1);
          },
          /**
           * Returns a unique number for the given object. Later calls will still return the same number.
           *
           * @param {Object} obj
           * @returns {number}
           */
          objId: function(f) {
            return f.__id || Object.defineProperty(f, "__id", { value: ++l }), f.__id;
          },
          /**
           * Creates a deep clone of the given object.
           *
           * The main intended use of this function is to clone language definitions.
           *
           * @param {T} o
           * @param {Record<number, any>} [visited]
           * @returns {T}
           * @template T
           */
          clone: function f(h, x) {
            x = x || {};
            var w, C;
            switch (a.util.type(h)) {
              case "Object":
                if (C = a.util.objId(h), x[C])
                  return x[C];
                w = /** @type {Record<string, any>} */
                {}, x[C] = w;
                for (var A in h)
                  h.hasOwnProperty(A) && (w[A] = f(h[A], x));
                return (
                  /** @type {any} */
                  w
                );
              case "Array":
                return C = a.util.objId(h), x[C] ? x[C] : (w = [], x[C] = w, /** @type {Array} */
                /** @type {any} */
                h.forEach(function(P, R) {
                  w[R] = f(P, x);
                }), /** @type {any} */
                w);
              default:
                return h;
            }
          },
          /**
           * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
           *
           * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
           *
           * @param {Element} element
           * @returns {string}
           */
          getLanguage: function(f) {
            for (; f; ) {
              var h = i.exec(f.className);
              if (h)
                return h[1].toLowerCase();
              f = f.parentElement;
            }
            return "none";
          },
          /**
           * Sets the Prism `language-xxxx` class of the given element.
           *
           * @param {Element} element
           * @param {string} language
           * @returns {void}
           */
          setLanguage: function(f, h) {
            f.className = f.className.replace(RegExp(i, "gi"), ""), f.classList.add("language-" + h);
          },
          /**
           * Returns the script element that is currently executing.
           *
           * This does __not__ work for line script element.
           *
           * @returns {HTMLScriptElement | null}
           */
          currentScript: function() {
            if (typeof document > "u")
              return null;
            if (document.currentScript && document.currentScript.tagName === "SCRIPT")
              return (
                /** @type {any} */
                document.currentScript
              );
            try {
              throw new Error();
            } catch (w) {
              var f = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(w.stack) || [])[1];
              if (f) {
                var h = document.getElementsByTagName("script");
                for (var x in h)
                  if (h[x].src == f)
                    return h[x];
              }
              return null;
            }
          },
          /**
           * Returns whether a given class is active for `element`.
           *
           * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
           * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
           * given class is just the given class with a `no-` prefix.
           *
           * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
           * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
           * ancestors have the given class or the negated version of it, then the default activation will be returned.
           *
           * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
           * version of it, the class is considered active.
           *
           * @param {Element} element
           * @param {string} className
           * @param {boolean} [defaultActivation=false]
           * @returns {boolean}
           */
          isActive: function(f, h, x) {
            for (var w = "no-" + h; f; ) {
              var C = f.classList;
              if (C.contains(h))
                return !0;
              if (C.contains(w))
                return !1;
              f = f.parentElement;
            }
            return !!x;
          }
        },
        /**
         * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
         *
         * @namespace
         * @memberof Prism
         * @public
         */
        languages: {
          /**
           * The grammar for plain, unformatted text.
           */
          plain: u,
          plaintext: u,
          text: u,
          txt: u,
          /**
           * Creates a deep copy of the language with the given id and appends the given tokens.
           *
           * If a token in `redef` also appears in the copied language, then the existing token in the copied language
           * will be overwritten at its original position.
           *
           * ## Best practices
           *
           * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
           * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
           * understand the language definition because, normally, the order of tokens matters in Prism grammars.
           *
           * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
           * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
           *
           * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
           * @param {Grammar} redef The new tokens to append.
           * @returns {Grammar} The new language created.
           * @public
           * @example
           * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
           *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
           *     // at its original position
           *     'comment': { ... },
           *     // CSS doesn't have a 'color' token, so this token will be appended
           *     'color': /\b(?:red|green|blue)\b/
           * });
           */
          extend: function(f, h) {
            var x = a.util.clone(a.languages[f]);
            for (var w in h)
              x[w] = h[w];
            return x;
          },
          /**
           * Inserts tokens _before_ another token in a language definition or any other grammar.
           *
           * ## Usage
           *
           * This helper method makes it easy to modify existing languages. For example, the CSS language definition
           * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
           * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
           * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
           * this:
           *
           * ```js
           * Prism.languages.markup.style = {
           *     // token
           * };
           * ```
           *
           * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
           * before existing tokens. For the CSS example above, you would use it like this:
           *
           * ```js
           * Prism.languages.insertBefore('markup', 'cdata', {
           *     'style': {
           *         // token
           *     }
           * });
           * ```
           *
           * ## Special cases
           *
           * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
           * will be ignored.
           *
           * This behavior can be used to insert tokens after `before`:
           *
           * ```js
           * Prism.languages.insertBefore('markup', 'comment', {
           *     'comment': Prism.languages.markup.comment,
           *     // tokens after 'comment'
           * });
           * ```
           *
           * ## Limitations
           *
           * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
           * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
           * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
           * deleting properties which is necessary to insert at arbitrary positions.
           *
           * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
           * Instead, it will create a new object and replace all references to the target object with the new one. This
           * can be done without temporarily deleting properties, so the iteration order is well-defined.
           *
           * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
           * you hold the target object in a variable, then the value of the variable will not change.
           *
           * ```js
           * var oldMarkup = Prism.languages.markup;
           * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
           *
           * assert(oldMarkup !== Prism.languages.markup);
           * assert(newMarkup === Prism.languages.markup);
           * ```
           *
           * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
           * object to be modified.
           * @param {string} before The key to insert before.
           * @param {Grammar} insert An object containing the key-value pairs to be inserted.
           * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
           * object to be modified.
           *
           * Defaults to `Prism.languages`.
           * @returns {Grammar} The new grammar object.
           * @public
           */
          insertBefore: function(f, h, x, w) {
            w = w || /** @type {any} */
            a.languages;
            var C = w[f], A = {};
            for (var P in C)
              if (C.hasOwnProperty(P)) {
                if (P == h)
                  for (var R in x)
                    x.hasOwnProperty(R) && (A[R] = x[R]);
                x.hasOwnProperty(P) || (A[P] = C[P]);
              }
            var F = w[f];
            return w[f] = A, a.languages.DFS(a.languages, function(N, re) {
              re === F && N != f && (this[N] = A);
            }), A;
          },
          // Traverse a language definition with Depth First Search
          DFS: function f(h, x, w, C) {
            C = C || {};
            var A = a.util.objId;
            for (var P in h)
              if (h.hasOwnProperty(P)) {
                x.call(h, P, h[P], w || P);
                var R = h[P], F = a.util.type(R);
                F === "Object" && !C[A(R)] ? (C[A(R)] = !0, f(R, x, null, C)) : F === "Array" && !C[A(R)] && (C[A(R)] = !0, f(R, x, P, C));
              }
          }
        },
        plugins: {},
        /**
         * This is the most high-level function in Prism’s API.
         * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
         * each one of them.
         *
         * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
         *
         * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
         * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
         * @memberof Prism
         * @public
         */
        highlightAll: function(f, h) {
          a.highlightAllUnder(document, f, h);
        },
        /**
         * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
         * {@link Prism.highlightElement} on each one of them.
         *
         * The following hooks will be run:
         * 1. `before-highlightall`
         * 2. `before-all-elements-highlight`
         * 3. All hooks of {@link Prism.highlightElement} for each element.
         *
         * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
         * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
         * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
         * @memberof Prism
         * @public
         */
        highlightAllUnder: function(f, h, x) {
          var w = {
            callback: x,
            container: f,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
          };
          a.hooks.run("before-highlightall", w), w.elements = Array.prototype.slice.apply(w.container.querySelectorAll(w.selector)), a.hooks.run("before-all-elements-highlight", w);
          for (var C = 0, A; A = w.elements[C++]; )
            a.highlightElement(A, h === !0, w.callback);
        },
        /**
         * Highlights the code inside a single element.
         *
         * The following hooks will be run:
         * 1. `before-sanity-check`
         * 2. `before-highlight`
         * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
         * 4. `before-insert`
         * 5. `after-highlight`
         * 6. `complete`
         *
         * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
         * the element's language.
         *
         * @param {Element} element The element containing the code.
         * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
         * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
         * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
         * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
         *
         * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
         * asynchronous highlighting to work. You can build your own bundle on the
         * [Download page](https://prismjs.com/download.html).
         * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
         * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
         * @memberof Prism
         * @public
         */
        highlightElement: function(f, h, x) {
          var w = a.util.getLanguage(f), C = a.languages[w];
          a.util.setLanguage(f, w);
          var A = f.parentElement;
          A && A.nodeName.toLowerCase() === "pre" && a.util.setLanguage(A, w);
          var P = f.textContent, R = {
            element: f,
            language: w,
            grammar: C,
            code: P
          };
          function F(re) {
            R.highlightedCode = re, a.hooks.run("before-insert", R), R.element.innerHTML = R.highlightedCode, a.hooks.run("after-highlight", R), a.hooks.run("complete", R), x && x.call(R.element);
          }
          if (a.hooks.run("before-sanity-check", R), A = R.element.parentElement, A && A.nodeName.toLowerCase() === "pre" && !A.hasAttribute("tabindex") && A.setAttribute("tabindex", "0"), !R.code) {
            a.hooks.run("complete", R), x && x.call(R.element);
            return;
          }
          if (a.hooks.run("before-highlight", R), !R.grammar) {
            F(a.util.encode(R.code));
            return;
          }
          if (h && r.Worker) {
            var N = new Worker(a.filename);
            N.onmessage = function(re) {
              F(re.data);
            }, N.postMessage(JSON.stringify({
              language: R.language,
              code: R.code,
              immediateClose: !0
            }));
          } else
            F(a.highlight(R.code, R.grammar, R.language));
        },
        /**
         * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
         * and the language definitions to use, and returns a string with the HTML produced.
         *
         * The following hooks will be run:
         * 1. `before-tokenize`
         * 2. `after-tokenize`
         * 3. `wrap`: On each {@link Token}.
         *
         * @param {string} text A string with the code to be highlighted.
         * @param {Grammar} grammar An object containing the tokens to use.
         *
         * Usually a language definition like `Prism.languages.markup`.
         * @param {string} language The name of the language definition passed to `grammar`.
         * @returns {string} The highlighted HTML.
         * @memberof Prism
         * @public
         * @example
         * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
         */
        highlight: function(f, h, x) {
          var w = {
            code: f,
            grammar: h,
            language: x
          };
          if (a.hooks.run("before-tokenize", w), !w.grammar)
            throw new Error('The language "' + w.language + '" has no grammar.');
          return w.tokens = a.tokenize(w.code, w.grammar), a.hooks.run("after-tokenize", w), o.stringify(a.util.encode(w.tokens), w.language);
        },
        /**
         * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
         * and the language definitions to use, and returns an array with the tokenized code.
         *
         * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
         *
         * This method could be useful in other contexts as well, as a very crude parser.
         *
         * @param {string} text A string with the code to be highlighted.
         * @param {Grammar} grammar An object containing the tokens to use.
         *
         * Usually a language definition like `Prism.languages.markup`.
         * @returns {TokenStream} An array of strings and tokens, a token stream.
         * @memberof Prism
         * @public
         * @example
         * let code = `var foo = 0;`;
         * let tokens = Prism.tokenize(code, Prism.languages.javascript);
         * tokens.forEach(token => {
         *     if (token instanceof Prism.Token && token.type === 'number') {
         *         console.log(`Found numeric literal: ${token.content}`);
         *     }
         * });
         */
        tokenize: function(f, h) {
          var x = h.rest;
          if (x) {
            for (var w in x)
              h[w] = x[w];
            delete h.rest;
          }
          var C = new g();
          return m(C, C.head, f), c(f, C, h, C.head, 0), b(C);
        },
        /**
         * @namespace
         * @memberof Prism
         * @public
         */
        hooks: {
          all: {},
          /**
           * Adds the given callback to the list of callbacks for the given hook.
           *
           * The callback will be invoked when the hook it is registered for is run.
           * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
           *
           * One callback function can be registered to multiple hooks and the same hook multiple times.
           *
           * @param {string} name The name of the hook.
           * @param {HookCallback} callback The callback function which is given environment variables.
           * @public
           */
          add: function(f, h) {
            var x = a.hooks.all;
            x[f] = x[f] || [], x[f].push(h);
          },
          /**
           * Runs a hook invoking all registered callbacks with the given environment variables.
           *
           * Callbacks will be invoked synchronously and in the order in which they were registered.
           *
           * @param {string} name The name of the hook.
           * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
           * @public
           */
          run: function(f, h) {
            var x = a.hooks.all[f];
            if (!(!x || !x.length))
              for (var w = 0, C; C = x[w++]; )
                C(h);
          }
        },
        Token: o
      };
      r.Prism = a;
      function o(f, h, x, w) {
        this.type = f, this.content = h, this.alias = x, this.length = (w || "").length | 0;
      }
      o.stringify = function f(h, x) {
        if (typeof h == "string")
          return h;
        if (Array.isArray(h)) {
          var w = "";
          return h.forEach(function(F) {
            w += f(F, x);
          }), w;
        }
        var C = {
          type: h.type,
          content: f(h.content, x),
          tag: "span",
          classes: ["token", h.type],
          attributes: {},
          language: x
        }, A = h.alias;
        A && (Array.isArray(A) ? Array.prototype.push.apply(C.classes, A) : C.classes.push(A)), a.hooks.run("wrap", C);
        var P = "";
        for (var R in C.attributes)
          P += " " + R + '="' + (C.attributes[R] || "").replace(/"/g, "&quot;") + '"';
        return "<" + C.tag + ' class="' + C.classes.join(" ") + '"' + P + ">" + C.content + "</" + C.tag + ">";
      };
      function s(f, h, x, w) {
        f.lastIndex = h;
        var C = f.exec(x);
        if (C && w && C[1]) {
          var A = C[1].length;
          C.index += A, C[0] = C[0].slice(A);
        }
        return C;
      }
      function c(f, h, x, w, C, A) {
        for (var P in x)
          if (!(!x.hasOwnProperty(P) || !x[P])) {
            var R = x[P];
            R = Array.isArray(R) ? R : [R];
            for (var F = 0; F < R.length; ++F) {
              if (A && A.cause == P + "," + F)
                return;
              var N = R[F], re = N.inside, Se = !!N.lookbehind, Ce = !!N.greedy, je = N.alias;
              if (Ce && !N.pattern.global) {
                var Tt = N.pattern.toString().match(/[imsuy]*$/)[0];
                N.pattern = RegExp(N.pattern.source, Tt + "g");
              }
              for (var lt = N.pattern || N, X = w.next, ce = C; X !== h.tail && !(A && ce >= A.reach); ce += X.value.length, X = X.next) {
                var Te = X.value;
                if (h.length > f.length)
                  return;
                if (!(Te instanceof o)) {
                  var q = 1, se;
                  if (Ce) {
                    if (se = s(lt, ce, f, Se), !se || se.index >= f.length)
                      break;
                    var me = se.index, Y = se.index + se[0].length, he = ce;
                    for (he += X.value.length; me >= he; )
                      X = X.next, he += X.value.length;
                    if (he -= X.value.length, ce = he, X.value instanceof o)
                      continue;
                    for (var j = X; j !== h.tail && (he < Y || typeof j.value == "string"); j = j.next)
                      q++, he += j.value.length;
                    q--, Te = f.slice(ce, he), se.index -= ce;
                  } else if (se = s(lt, 0, Te, Se), !se)
                    continue;
                  var me = se.index, Oe = se[0], pe = Te.slice(0, me), Xe = Te.slice(me + Oe.length), De = ce + Te.length;
                  A && De > A.reach && (A.reach = De);
                  var Me = X.prev;
                  pe && (Me = m(h, Me, pe), ce += pe.length), y(h, Me, q);
                  var st = new o(P, re ? a.tokenize(Oe, re) : Oe, je, Oe);
                  if (X = m(h, Me, st), Xe && m(h, X, Xe), q > 1) {
                    var be = {
                      cause: P + "," + F,
                      reach: De
                    };
                    c(f, h, x, X.prev, ce, be), A && be.reach > A.reach && (A.reach = be.reach);
                  }
                }
              }
            }
          }
      }
      function g() {
        var f = { value: null, prev: null, next: null }, h = { value: null, prev: f, next: null };
        f.next = h, this.head = f, this.tail = h, this.length = 0;
      }
      function m(f, h, x) {
        var w = h.next, C = { value: x, prev: h, next: w };
        return h.next = C, w.prev = C, f.length++, C;
      }
      function y(f, h, x) {
        for (var w = h.next, C = 0; C < x && w !== f.tail; C++)
          w = w.next;
        h.next = w, w.prev = h, f.length -= C;
      }
      function b(f) {
        for (var h = [], x = f.head.next; x !== f.tail; )
          h.push(x.value), x = x.next;
        return h;
      }
      if (!r.document)
        return r.addEventListener && (a.disableWorkerMessageHandler || r.addEventListener("message", function(f) {
          var h = JSON.parse(f.data), x = h.language, w = h.code, C = h.immediateClose;
          r.postMessage(a.highlight(w, a.languages[x], x)), C && r.close();
        }, !1)), a;
      var S = a.util.currentScript();
      S && (a.filename = S.src, S.hasAttribute("data-manual") && (a.manual = !0));
      function k() {
        a.manual || a.highlightAll();
      }
      if (!a.manual) {
        var _ = document.readyState;
        _ === "loading" || _ === "interactive" && S && S.defer ? document.addEventListener("DOMContentLoaded", k) : window.requestAnimationFrame ? window.requestAnimationFrame(k) : window.setTimeout(k, 16);
      }
      return a;
    })(t);
    e.exports && (e.exports = n), typeof Fr < "u" && (Fr.Prism = n), n.languages.markup = {
      comment: {
        pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
        greedy: !0
      },
      prolog: {
        pattern: /<\?[\s\S]+?\?>/,
        greedy: !0
      },
      doctype: {
        // https://www.w3.org/TR/xml/#NT-doctypedecl
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: !0,
        inside: {
          "internal-subset": {
            pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
            lookbehind: !0,
            greedy: !0,
            inside: null
            // see below
          },
          string: {
            pattern: /"[^"]*"|'[^']*'/,
            greedy: !0
          },
          punctuation: /^<!|>$|[[\]]/,
          "doctype-tag": /^DOCTYPE/i,
          name: /[^\s<>'"]+/
        }
      },
      cdata: {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        greedy: !0
      },
      tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: !0,
        inside: {
          tag: {
            pattern: /^<\/?[^\s>\/]+/,
            inside: {
              punctuation: /^<\/?/,
              namespace: /^[^\s>\/:]+:/
            }
          },
          "special-attr": [],
          "attr-value": {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
            inside: {
              punctuation: [
                {
                  pattern: /^=/,
                  alias: "attr-equals"
                },
                {
                  pattern: /^(\s*)["']|["']$/,
                  lookbehind: !0
                }
              ]
            }
          },
          punctuation: /\/?>/,
          "attr-name": {
            pattern: /[^\s>\/]+/,
            inside: {
              namespace: /^[^\s>\/:]+:/
            }
          }
        }
      },
      entity: [
        {
          pattern: /&[\da-z]{1,8};/i,
          alias: "named-entity"
        },
        /&#x?[\da-f]{1,8};/i
      ]
    }, n.languages.markup.tag.inside["attr-value"].inside.entity = n.languages.markup.entity, n.languages.markup.doctype.inside["internal-subset"].inside = n.languages.markup, n.hooks.add("wrap", function(r) {
      r.type === "entity" && (r.attributes.title = r.content.replace(/&amp;/, "&"));
    }), Object.defineProperty(n.languages.markup.tag, "addInlined", {
      /**
       * Adds an inlined language to markup.
       *
       * An example of an inlined language is CSS with `<style>` tags.
       *
       * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addInlined('style', 'css');
       */
      value: function(i, l) {
        var u = {};
        u["language-" + l] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: !0,
          inside: n.languages[l]
        }, u.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var a = {
          "included-cdata": {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            inside: u
          }
        };
        a["language-" + l] = {
          pattern: /[\s\S]+/,
          inside: n.languages[l]
        };
        var o = {};
        o[i] = {
          pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
            return i;
          }), "i"),
          lookbehind: !0,
          greedy: !0,
          inside: a
        }, n.languages.insertBefore("markup", "cdata", o);
      }
    }), Object.defineProperty(n.languages.markup.tag, "addAttribute", {
      /**
       * Adds an pattern to highlight languages embedded in HTML attributes.
       *
       * An example of an inlined language is CSS with `style` attributes.
       *
       * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addAttribute('style', 'css');
       */
      value: function(r, i) {
        n.languages.markup.tag.inside["special-attr"].push({
          pattern: RegExp(
            /(^|["'\s])/.source + "(?:" + r + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
            "i"
          ),
          lookbehind: !0,
          inside: {
            "attr-name": /^[^\s=]+/,
            "attr-value": {
              pattern: /=[\s\S]+/,
              inside: {
                value: {
                  pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                  lookbehind: !0,
                  alias: [i, "language-" + i],
                  inside: n.languages[i]
                },
                punctuation: [
                  {
                    pattern: /^=/,
                    alias: "attr-equals"
                  },
                  /"|'/
                ]
              }
            }
          }
        });
      }
    }), n.languages.html = n.languages.markup, n.languages.mathml = n.languages.markup, n.languages.svg = n.languages.markup, n.languages.xml = n.languages.extend("markup", {}), n.languages.ssml = n.languages.xml, n.languages.atom = n.languages.xml, n.languages.rss = n.languages.xml, (function(r) {
      var i = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
      r.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
          pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + i.source + ")*?" + /(?:;|(?=\s*\{))/.source),
          inside: {
            rule: /^@[\w-]+/,
            "selector-function-argument": {
              pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
              lookbehind: !0,
              alias: "selector"
            },
            keyword: {
              pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
              lookbehind: !0
            }
            // See rest below
          }
        },
        url: {
          // https://drafts.csswg.org/css-values-3/#urls
          pattern: RegExp("\\burl\\((?:" + i.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
          greedy: !0,
          inside: {
            function: /^url/i,
            punctuation: /^\(|\)$/,
            string: {
              pattern: RegExp("^" + i.source + "$"),
              alias: "url"
            }
          }
        },
        selector: {
          pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + i.source + ")*(?=\\s*\\{)"),
          lookbehind: !0
        },
        string: {
          pattern: i,
          greedy: !0
        },
        property: {
          pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
          lookbehind: !0
        },
        important: /!important\b/i,
        function: {
          pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
          lookbehind: !0
        },
        punctuation: /[(){};:,]/
      }, r.languages.css.atrule.inside.rest = r.languages.css;
      var l = r.languages.markup;
      l && (l.tag.addInlined("style", "css"), l.tag.addAttribute("style", "css"));
    })(n), n.languages.clike = {
      comment: [
        {
          pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
          lookbehind: !0,
          greedy: !0
        },
        {
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: !0,
          greedy: !0
        }
      ],
      string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
      },
      "class-name": {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: !0,
        inside: {
          punctuation: /[.\\]/
        }
      },
      keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
      boolean: /\b(?:false|true)\b/,
      function: /\b\w+(?=\()/,
      number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
      operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
      punctuation: /[{}[\];(),.:]/
    }, n.languages.javascript = n.languages.extend("clike", {
      "class-name": [
        n.languages.clike["class-name"],
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
          lookbehind: !0
        }
      ],
      keyword: [
        {
          pattern: /((?:^|\})\s*)catch\b/,
          lookbehind: !0
        },
        {
          pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
          lookbehind: !0
        }
      ],
      // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
      function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      number: {
        pattern: RegExp(
          /(^|[^\w$])/.source + "(?:" + // constant
          (/NaN|Infinity/.source + "|" + // binary integer
          /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
          /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
          /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
          /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
          /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
        ),
        lookbehind: !0
      },
      operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
    }), n.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, n.languages.insertBefore("javascript", "keyword", {
      regex: {
        pattern: RegExp(
          // lookbehind
          // eslint-disable-next-line regexp/no-dupe-characters-character-class
          /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
          // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
          // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
          // with the only syntax, so we have to define 2 different regex patterns.
          /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + // `v` flag syntax. This supports 3 levels of nested character classes.
          /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + // lookahead
          /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
        ),
        lookbehind: !0,
        greedy: !0,
        inside: {
          "regex-source": {
            pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
            lookbehind: !0,
            alias: "language-regex",
            inside: n.languages.regex
          },
          "regex-delimiter": /^\/|\/$/,
          "regex-flags": /^[a-z]+$/
        }
      },
      // This must be declared before keyword because we use "function" inside the look-forward
      "function-variable": {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: "function"
      },
      parameter: [
        {
          pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
          lookbehind: !0,
          inside: n.languages.javascript
        },
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
          lookbehind: !0,
          inside: n.languages.javascript
        },
        {
          pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
          lookbehind: !0,
          inside: n.languages.javascript
        },
        {
          pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
          lookbehind: !0,
          inside: n.languages.javascript
        }
      ],
      constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    }), n.languages.insertBefore("javascript", "string", {
      hashbang: {
        pattern: /^#!.*/,
        greedy: !0,
        alias: "comment"
      },
      "template-string": {
        pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
        greedy: !0,
        inside: {
          "template-punctuation": {
            pattern: /^`|`$/,
            alias: "string"
          },
          interpolation: {
            pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
            lookbehind: !0,
            inside: {
              "interpolation-punctuation": {
                pattern: /^\$\{|\}$/,
                alias: "punctuation"
              },
              rest: n.languages.javascript
            }
          },
          string: /[\s\S]+/
        }
      },
      "string-property": {
        pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
        lookbehind: !0,
        greedy: !0,
        alias: "property"
      }
    }), n.languages.insertBefore("javascript", "operator", {
      "literal-property": {
        pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: !0,
        alias: "property"
      }
    }), n.languages.markup && (n.languages.markup.tag.addInlined("script", "javascript"), n.languages.markup.tag.addAttribute(
      /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
      "javascript"
    )), n.languages.js = n.languages.javascript, (function() {
      if (typeof n > "u" || typeof document > "u")
        return;
      Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector);
      var r = "Loading…", i = function(S, k) {
        return "✖ Error " + S + " while fetching file: " + k;
      }, l = "✖ Error: File does not exist or is empty", u = {
        js: "javascript",
        py: "python",
        rb: "ruby",
        ps1: "powershell",
        psm1: "powershell",
        sh: "bash",
        bat: "batch",
        h: "c",
        tex: "latex"
      }, a = "data-src-status", o = "loading", s = "loaded", c = "failed", g = "pre[data-src]:not([" + a + '="' + s + '"]):not([' + a + '="' + o + '"])';
      function m(S, k, _) {
        var f = new XMLHttpRequest();
        f.open("GET", S, !0), f.onreadystatechange = function() {
          f.readyState == 4 && (f.status < 400 && f.responseText ? k(f.responseText) : f.status >= 400 ? _(i(f.status, f.statusText)) : _(l));
        }, f.send(null);
      }
      function y(S) {
        var k = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(S || "");
        if (k) {
          var _ = Number(k[1]), f = k[2], h = k[3];
          return f ? h ? [_, Number(h)] : [_, void 0] : [_, _];
        }
      }
      n.hooks.add("before-highlightall", function(S) {
        S.selector += ", " + g;
      }), n.hooks.add("before-sanity-check", function(S) {
        var k = (
          /** @type {HTMLPreElement} */
          S.element
        );
        if (k.matches(g)) {
          S.code = "", k.setAttribute(a, o);
          var _ = k.appendChild(document.createElement("CODE"));
          _.textContent = r;
          var f = k.getAttribute("data-src"), h = S.language;
          if (h === "none") {
            var x = (/\.(\w+)$/.exec(f) || [, "none"])[1];
            h = u[x] || x;
          }
          n.util.setLanguage(_, h), n.util.setLanguage(k, h);
          var w = n.plugins.autoloader;
          w && w.loadLanguages(h), m(
            f,
            function(C) {
              k.setAttribute(a, s);
              var A = y(k.getAttribute("data-range"));
              if (A) {
                var P = C.split(/\r\n?|\n/g), R = A[0], F = A[1] == null ? P.length : A[1];
                R < 0 && (R += P.length), R = Math.max(0, Math.min(R - 1, P.length)), F < 0 && (F += P.length), F = Math.max(0, Math.min(F, P.length)), C = P.slice(R, F).join(`
`), k.hasAttribute("data-start") || k.setAttribute("data-start", String(R + 1));
              }
              _.textContent = C, n.highlightElement(_);
            },
            function(C) {
              k.setAttribute(a, c), _.textContent = C;
            }
          );
        }
      }), n.plugins.fileHighlight = {
        /**
         * Executes the File Highlight plugin for all matching `pre` elements under the given container.
         *
         * Note: Elements which are already loaded or currently loading will not be touched by this method.
         *
         * @param {ParentNode} [container=document]
         */
        highlight: function(k) {
          for (var _ = (k || document).querySelectorAll(g), f = 0, h; h = _[f++]; )
            n.highlightElement(h);
        }
      };
      var b = !1;
      n.fileHighlight = function() {
        b || (console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."), b = !0), n.plugins.fileHighlight.highlight.apply(this, arguments);
      };
    })();
  })(Gt)), Gt.exports;
}
var Di = Oi();
const Hr = /* @__PURE__ */ Ii(Di);
(function(e) {
  var t = "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b", n = {
    pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
    lookbehind: !0,
    alias: "punctuation",
    // this looks reasonably well in all themes
    inside: null
    // see below
  }, r = {
    bash: n,
    environment: {
      pattern: RegExp("\\$" + t),
      alias: "constant"
    },
    variable: [
      // [0]: Arithmetic Environment
      {
        pattern: /\$?\(\([\s\S]+?\)\)/,
        greedy: !0,
        inside: {
          // If there is a $ sign at the beginning highlight $(( and )) as variable
          variable: [
            {
              pattern: /(^\$\(\([\s\S]+)\)\)/,
              lookbehind: !0
            },
            /^\$\(\(/
          ],
          number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
          // Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
          operator: /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
          // If there is no $ sign at the beginning highlight (( and )) as punctuation
          punctuation: /\(\(?|\)\)?|,|;/
        }
      },
      // [1]: Command Substitution
      {
        pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
        greedy: !0,
        inside: {
          variable: /^\$\(|^`|\)$|`$/
        }
      },
      // [2]: Brace expansion
      {
        pattern: /\$\{[^}]+\}/,
        greedy: !0,
        inside: {
          operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
          punctuation: /[\[\]]/,
          environment: {
            pattern: RegExp("(\\{)" + t),
            lookbehind: !0,
            alias: "constant"
          }
        }
      },
      /\$(?:\w+|[#?*!@$])/
    ],
    // Escape sequences from echo and printf's manuals, and escaped quotes.
    entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/
  };
  e.languages.bash = {
    shebang: {
      pattern: /^#!\s*\/.*/,
      alias: "important"
    },
    comment: {
      pattern: /(^|[^"{\\$])#.*/,
      lookbehind: !0
    },
    "function-name": [
      // a) function foo {
      // b) foo() {
      // c) function foo() {
      // but not “foo {”
      {
        // a) and c)
        pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
        lookbehind: !0,
        alias: "function"
      },
      {
        // b)
        pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/,
        alias: "function"
      }
    ],
    // Highlight variable names as variables in for and select beginnings.
    "for-or-select": {
      pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
      alias: "variable",
      lookbehind: !0
    },
    // Highlight variable names as variables in the left-hand part
    // of assignments (“=” and “+=”).
    "assign-left": {
      pattern: /(^|[\s;|&]|[<>]\()\w+(?:\.\w+)*(?=\+?=)/,
      inside: {
        environment: {
          pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + t),
          lookbehind: !0,
          alias: "constant"
        }
      },
      alias: "variable",
      lookbehind: !0
    },
    // Highlight parameter names as variables
    parameter: {
      pattern: /(^|\s)-{1,2}(?:\w+:[+-]?)?\w+(?:\.\w+)*(?=[=\s]|$)/,
      alias: "variable",
      lookbehind: !0
    },
    string: [
      // Support for Here-documents https://en.wikipedia.org/wiki/Here_document
      {
        pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,
        lookbehind: !0,
        greedy: !0,
        inside: r
      },
      // Here-document with quotes around the tag
      // → No expansion (so no “inside”).
      {
        pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
        lookbehind: !0,
        greedy: !0,
        inside: {
          bash: n
        }
      },
      // “Normal” string
      {
        // https://www.gnu.org/software/bash/manual/html_node/Double-Quotes.html
        pattern: /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
        lookbehind: !0,
        greedy: !0,
        inside: r
      },
      {
        // https://www.gnu.org/software/bash/manual/html_node/Single-Quotes.html
        pattern: /(^|[^$\\])'[^']*'/,
        lookbehind: !0,
        greedy: !0
      },
      {
        // https://www.gnu.org/software/bash/manual/html_node/ANSI_002dC-Quoting.html
        pattern: /\$'(?:[^'\\]|\\[\s\S])*'/,
        greedy: !0,
        inside: {
          entity: r.entity
        }
      }
    ],
    environment: {
      pattern: RegExp("\\$?" + t),
      alias: "constant"
    },
    variable: r.variable,
    function: {
      pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cargo|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|java|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|sysctl|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
      lookbehind: !0
    },
    keyword: {
      pattern: /(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,
      lookbehind: !0
    },
    // https://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
    builtin: {
      pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,
      lookbehind: !0,
      // Alias added to make those easier to distinguish from strings.
      alias: "class-name"
    },
    boolean: {
      pattern: /(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,
      lookbehind: !0
    },
    "file-descriptor": {
      pattern: /\B&\d\b/,
      alias: "important"
    },
    operator: {
      // Lots of redirections here, but not just that.
      pattern: /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
      inside: {
        "file-descriptor": {
          pattern: /^\d/,
          alias: "important"
        }
      }
    },
    punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
    number: {
      pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
      lookbehind: !0
    }
  }, n.inside = e.languages.bash;
  for (var i = [
    "comment",
    "function-name",
    "for-or-select",
    "assign-left",
    "parameter",
    "string",
    "environment",
    "function",
    "keyword",
    "builtin",
    "boolean",
    "file-descriptor",
    "operator",
    "punctuation",
    "number"
  ], l = r.variable[1].inside, u = 0; u < i.length; u++)
    l[i[u]] = e.languages.bash[i[u]];
  e.languages.sh = e.languages.bash, e.languages.shell = e.languages.bash;
})(Prism);
Prism.languages.json = {
  property: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
    lookbehind: !0,
    greedy: !0
  },
  string: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    lookbehind: !0,
    greedy: !0
  },
  comment: {
    pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: !0
  },
  number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  punctuation: /[{}[\],]/,
  operator: /:/,
  boolean: /\b(?:false|true)\b/,
  null: {
    pattern: /\bnull\b/,
    alias: "keyword"
  }
};
Prism.languages.webmanifest = Prism.languages.json;
var Mi = /* @__PURE__ */ $('<svg class="w-4 h-4 sm:w-3.5 sm:h-3.5 text-emerald-500"fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M5 13l4 4L19 7">'), Pi = /* @__PURE__ */ $('<span class="hidden sm:inline text-emerald-500 dark:text-emerald-400">'), Ni = /* @__PURE__ */ $('<button type=button class="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 text-xs font-medium text-surface-400 dark:text-surface-500 hover:text-surface-600 dark:hover:text-surface-300 glass-button rounded-lg transition-all">'), zi = /* @__PURE__ */ $('<div><div class="absolute top-3 left-3 z-10"><span class="text-[0.625rem] font-semibold text-surface-400 dark:text-surface-500 uppercase tracking-wider"></span></div><pre><code>'), Fi = /* @__PURE__ */ $('<svg class="w-4 h-4 sm:w-3.5 sm:h-3.5"fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z">'), Bi = /* @__PURE__ */ $('<span class="hidden sm:inline">');
function Hi(e) {
  const t = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return e.replace(/[&<>"']/g, (n) => t[n]);
}
const Uo = (e) => {
  const {
    copied: t,
    copy: n
  } = tn();
  let r;
  const i = () => e.language || "json", l = () => e.maxHeight || "31.25rem", u = () => e.copyLabel ?? "Copy", a = () => e.copiedLabel ?? "Copied", o = te(() => {
    const s = e.code, c = i(), g = Hr.languages[c];
    return g ? Zt.sanitize(Hr.highlight(s, g, c), {
      ALLOWED_TAGS: ["span"],
      ALLOWED_ATTR: ["class"]
    }) : Hi(s);
  });
  return (() => {
    var s = zi(), c = s.firstChild, g = c.firstChild, m = c.nextSibling, y = m.firstChild;
    p(s, v(E, {
      get when() {
        return !e.hideCopyButton;
      },
      get children() {
        var S = Ni();
        return S.$$click = () => n(e.code), p(S, v(E, {
          get when() {
            return t();
          },
          get fallback() {
            return [Fi(), (() => {
              var k = Bi();
              return p(k, u), k;
            })()];
          },
          get children() {
            return [Mi(), (() => {
              var k = Pi();
              return p(k, a), k;
            })()];
          }
        })), I(() => D(S, "aria-label", t() ? a() : u())), S;
      }
    }), c), p(g, i);
    var b = r;
    return typeof b == "function" ? ze(b, y) : r = y, I((S) => {
      var k = `relative group rounded-xl overflow-hidden ${e.class ?? ""}`, _ = `p-6 pt-10 text-sm font-mono overflow-auto scrollbar-thin glass-thin ${e.wrap ? "whitespace-pre-wrap break-all" : ""}`, f = l(), h = `language-${i()}`, x = o();
      return k !== S.e && L(s, S.e = k), _ !== S.t && L(m, S.t = _), f !== S.a && _e(m, "max-height", S.a = f), h !== S.o && L(y, S.o = h), x !== S.i && (y.innerHTML = S.i = x), S;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0,
      i: void 0
    }), s;
  })();
};
W(["click"]);
var ji = /* @__PURE__ */ $('<span>"<!>"'), Ui = /* @__PURE__ */ $("<span>null"), jr = /* @__PURE__ */ $("<span>"), Gi = /* @__PURE__ */ $('<button type=button class="w-4 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0 -ml-4"><svg fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M9 5l7 7-7 7">'), qi = /* @__PURE__ */ $('<span class="w-4 flex-shrink-0">'), Wi = /* @__PURE__ */ $('<span class="text-violet-600 dark:text-violet-400">"<!>"'), Vi = /* @__PURE__ */ $('<span class="text-gray-500 dark:text-gray-400 mx-1">:'), Xi = /* @__PURE__ */ $('<span class="text-gray-500 dark:text-gray-400">'), Yi = /* @__PURE__ */ $('<div class="ml-4 border-l border-gray-200 dark:border-gray-700 pl-2">'), qt = /* @__PURE__ */ $('<span class="text-gray-500 dark:text-gray-400">,'), Zi = /* @__PURE__ */ $('<div class="flex items-center"><span class="w-4 flex-shrink-0"></span><span class="text-gray-500 dark:text-gray-400">'), Ki = /* @__PURE__ */ $('<div class="font-mono text-sm leading-relaxed"><div class="flex items-start">'), Ji = /* @__PURE__ */ $('<button type=button class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"><span class="mx-1 px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs"> '), Qi = /* @__PURE__ */ $('<svg class="w-3.5 h-3.5 text-emerald-500"fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M5 13l4 4L19 7">'), el = /* @__PURE__ */ $('<span class="text-emerald-600 dark:text-emerald-400">'), tl = /* @__PURE__ */ $('<div><div class="absolute top-3 right-3 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"><button type=button class="px-2 py-1 text-xs font-medium text-surface-400 dark:text-surface-500 hover:text-surface-600 dark:hover:text-surface-300 bg-surface-100/80 dark:bg-surface-800/80 hover:bg-surface-200/80 dark:hover:bg-surface-700/80 backdrop-blur-sm rounded-lg transition-all"><svg class="w-3.5 h-3.5"fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg></button><button type=button class="px-2 py-1 text-xs font-medium text-surface-400 dark:text-surface-500 hover:text-surface-600 dark:hover:text-surface-300 bg-surface-100/80 dark:bg-surface-800/80 hover:bg-surface-200/80 dark:hover:bg-surface-700/80 backdrop-blur-sm rounded-lg transition-all"><svg class="w-3.5 h-3.5"fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"></path></svg></button><button type=button class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-surface-400 dark:text-surface-500 hover:text-surface-600 dark:hover:text-surface-300 bg-surface-100/80 dark:bg-surface-800/80 hover:bg-surface-200/80 dark:hover:bg-surface-700/80 backdrop-blur-sm rounded-lg transition-all"></button></div><div class="p-6 pt-10 overflow-auto scrollbar-thin bg-surface-50/50 dark:bg-surface-900/50">'), rl = /* @__PURE__ */ $('<svg class="w-3.5 h-3.5"fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z">'), nl = /* @__PURE__ */ $("<div class=pl-4>");
function al(e, t = 2) {
  try {
    return JSON.stringify(e, null, t);
  } catch {
    return String(e);
  }
}
const il = (e) => e === null ? "null" : Array.isArray(e) ? "array" : typeof e, ll = (e) => {
  switch (e) {
    case "string":
      return "text-emerald-600 dark:text-emerald-400";
    case "number":
      return "text-blue-600 dark:text-blue-400";
    case "boolean":
      return "text-amber-600 dark:text-amber-400";
    case "null":
      return "text-gray-500 dark:text-gray-500";
    default:
      return "text-gray-800 dark:text-gray-200";
  }
}, on = (e) => {
  const t = () => il(e.value), n = () => t() === "object" || t() === "array", [r, i] = K(e.depth < e.initialExpandDepth), l = te(() => t() === "array" ? e.value.map((s, c) => [String(c), s]) : t() === "object" && e.value !== null ? Object.entries(e.value) : []), u = () => l().length, a = () => t() === "array" ? ["[", "]"] : ["{", "}"], o = () => {
    const s = t(), c = ll(s);
    return s === "string" ? (() => {
      var g = ji(), m = g.firstChild, y = m.nextSibling;
      return y.nextSibling, L(g, c), p(g, () => String(e.value), y), g;
    })() : s === "null" ? (() => {
      var g = Ui();
      return L(g, c), g;
    })() : s === "boolean" ? (() => {
      var g = jr();
      return L(g, c), p(g, () => e.value ? "true" : "false"), g;
    })() : (() => {
      var g = jr();
      return L(g, c), p(g, () => String(e.value)), g;
    })();
  };
  return (() => {
    var s = Ki(), c = s.firstChild;
    return p(c, v(E, {
      get when() {
        return n();
      },
      get children() {
        var g = Gi(), m = g.firstChild;
        return g.$$click = () => i(!r()), I((y) => {
          var b = r() ? "Collapse" : "Expand", S = `w-3 h-3 transition-transform duration-150 ${r() ? "rotate-90" : ""}`;
          return b !== y.e && D(g, "aria-label", y.e = b), S !== y.t && D(m, "class", y.t = S), y;
        }, {
          e: void 0,
          t: void 0
        }), g;
      }
    }), null), p(c, v(E, {
      get when() {
        return !n();
      },
      get children() {
        return qi();
      }
    }), null), p(c, v(E, {
      get when() {
        return e.keyName !== void 0;
      },
      get children() {
        return [(() => {
          var g = Wi(), m = g.firstChild, y = m.nextSibling;
          return y.nextSibling, p(g, () => e.keyName, y), g;
        })(), Vi()];
      }
    }), null), p(c, v(E, {
      get when() {
        return n();
      },
      get fallback() {
        return [$e(o), v(E, {
          get when() {
            return !e.isLast;
          },
          get children() {
            return qt();
          }
        })];
      },
      get children() {
        return v(E, {
          get when() {
            return r();
          },
          get fallback() {
            return [(() => {
              var g = Ji(), m = g.firstChild, y = m.firstChild;
              return g.$$click = () => i(!0), p(g, () => a()[0], m), p(m, u, y), p(m, () => u() === 1 ? "item" : "items", null), p(g, () => a()[1], null), g;
            })(), v(E, {
              get when() {
                return !e.isLast;
              },
              get children() {
                return qt();
              }
            })];
          },
          get children() {
            var g = Xi();
            return p(g, () => a()[0]), g;
          }
        });
      }
    }), null), p(s, v(E, {
      get when() {
        return $e(() => !!n())() && r();
      },
      get children() {
        return [(() => {
          var g = Yi();
          return p(g, v(Q, {
            get each() {
              return l();
            },
            children: ([m, y], b) => v(on, {
              get keyName() {
                return t() === "object" ? m : void 0;
              },
              value: y,
              get depth() {
                return e.depth + 1;
              },
              get initialExpandDepth() {
                return e.initialExpandDepth;
              },
              get isLast() {
                return b() === u() - 1;
              }
            })
          })), g;
        })(), (() => {
          var g = Zi(), m = g.firstChild, y = m.nextSibling;
          return p(y, () => a()[1]), p(g, v(E, {
            get when() {
              return !e.isLast;
            },
            get children() {
              return qt();
            }
          }), null), g;
        })()];
      }
    }), null), s;
  })();
}, Go = (e) => {
  const {
    copied: t,
    copy: n
  } = tn(), r = () => e.maxHeight ?? "31.25rem", i = () => e.initialExpandDepth ?? 2, l = () => e.copyLabel ?? "Copy", u = () => e.copiedLabel ?? "Copied", a = () => e.expandAllLabel ?? "Expand all", o = () => e.collapseAllLabel ?? "Collapse all", s = te(() => al(e.data)), [c, g] = K(!1), [m, y] = K(0), b = () => {
    g(!0), y((k) => k + 1);
  }, S = () => {
    g(!1), y((k) => k + 1);
  };
  return (() => {
    var k = tl(), _ = k.firstChild, f = _.firstChild, h = f.nextSibling, x = h.nextSibling, w = _.nextSibling;
    return f.$$click = b, h.$$click = S, x.$$click = () => n(s()), p(x, v(E, {
      get when() {
        return t();
      },
      get fallback() {
        return [rl(), $e(l)];
      },
      get children() {
        return [Qi(), (() => {
          var C = el();
          return p(C, u), C;
        })()];
      }
    })), p(w, v(E, {
      get when() {
        return m() >= 0;
      },
      keyed: !0,
      children: (C) => (() => {
        var A = nl();
        return p(A, v(on, {
          get value() {
            return e.data;
          },
          depth: 0,
          get initialExpandDepth() {
            return $e(() => !!c())() ? 100 : i();
          },
          isLast: !0
        })), A;
      })()
    })), I((C) => {
      var A = `relative group rounded-xl overflow-hidden ${e.class ?? ""}`, P = a(), R = o(), F = r();
      return A !== C.e && L(k, C.e = A), P !== C.t && D(f, "title", C.t = P), R !== C.a && D(h, "title", C.a = R), F !== C.o && _e(w, "max-height", C.o = F), C;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0
    }), k;
  })();
};
W(["click"]);
function nr() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null
  };
}
var He = nr();
function cn(e) {
  He = e;
}
var at = { exec: () => null };
function H(e, t = "") {
  let n = typeof e == "string" ? e : e.source;
  const r = {
    replace: (i, l) => {
      let u = typeof l == "string" ? l : l.source;
      return u = u.replace(ae.caret, "$1"), n = n.replace(i, u), r;
    },
    getRegex: () => new RegExp(n, t)
  };
  return r;
}
var ae = {
  codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
  outputLinkReplace: /\\([\[\]])/g,
  indentCodeCompensation: /^(\s+)(?:```)/,
  beginningSpace: /^\s+/,
  endingHash: /#$/,
  startingSpaceChar: /^ /,
  endingSpaceChar: / $/,
  nonSpaceChar: /[^ ]/,
  newLineCharGlobal: /\n/g,
  tabCharGlobal: /\t/g,
  multipleSpaceGlobal: /\s+/g,
  blankLine: /^[ \t]*$/,
  doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
  blockquoteStart: /^ {0,3}>/,
  blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
  blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
  listReplaceTabs: /^\t+/,
  listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
  listIsTask: /^\[[ xX]\] /,
  listReplaceTask: /^\[[ xX]\] +/,
  anyLine: /\n.*\n/,
  hrefBrackets: /^<(.*)>$/,
  tableDelimiter: /[:|]/,
  tableAlignChars: /^\||\| *$/g,
  tableRowBlankLine: /\n[ \t]*$/,
  tableAlignRight: /^ *-+: *$/,
  tableAlignCenter: /^ *:-+: *$/,
  tableAlignLeft: /^ *:-+ *$/,
  startATag: /^<a /i,
  endATag: /^<\/a>/i,
  startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
  endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
  startAngleBracket: /^</,
  endAngleBracket: />$/,
  pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
  unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
  escapeTest: /[&<>"']/,
  escapeReplace: /[&<>"']/g,
  escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
  escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
  unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,
  caret: /(^|[^\[])\^/g,
  percentDecode: /%25/g,
  findPipe: /\|/g,
  splitPipe: / \|/,
  slashPipe: /\\\|/g,
  carriageReturn: /\r\n|\r/g,
  spaceLine: /^ +$/gm,
  notSpaceStart: /^\S*/,
  endingNewline: /\n$/,
  listItemRegex: (e) => new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),
  nextBulletRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
  hrRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
  fencesBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:\`\`\`|~~~)`),
  headingBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}#`),
  htmlBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}<(?:[a-z].*>|!--)`, "i")
}, sl = /^(?:[ \t]*(?:\n|$))+/, ol = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, cl = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, it = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, ul = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, ar = /(?:[*+-]|\d{1,9}[.)])/, un = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, dn = H(un).replace(/bull/g, ar).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), dl = H(un).replace(/bull/g, ar).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), ir = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, hl = /^[^\n]+/, lr = /(?!\s*\])(?:\\.|[^\[\]\\])+/, gl = H(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", lr).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), fl = H(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, ar).getRegex(), St = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", sr = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, ml = H(
  "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
  "i"
).replace("comment", sr).replace("tag", St).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), hn = H(ir).replace("hr", it).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", St).getRegex(), pl = H(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", hn).getRegex(), or = {
  blockquote: pl,
  code: ol,
  def: gl,
  fences: cl,
  heading: ul,
  hr: it,
  html: ml,
  lheading: dn,
  list: fl,
  newline: sl,
  paragraph: hn,
  table: at,
  text: hl
}, Ur = H(
  "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
).replace("hr", it).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", St).getRegex(), bl = {
  ...or,
  lheading: dl,
  table: Ur,
  paragraph: H(ir).replace("hr", it).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Ur).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", St).getRegex()
}, vl = {
  ...or,
  html: H(
    `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
  ).replace("comment", sr).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: at,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: H(ir).replace("hr", it).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", dn).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, xl = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, kl = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, gn = /^( {2,}|\\)\n(?!\s*$)/, yl = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Ct = /[\p{P}\p{S}]/u, cr = /[\s\p{P}\p{S}]/u, fn = /[^\s\p{P}\p{S}]/u, wl = H(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, cr).getRegex(), mn = /(?!~)[\p{P}\p{S}]/u, $l = /(?!~)[\s\p{P}\p{S}]/u, _l = /(?:[^\s\p{P}\p{S}]|~)/u, Sl = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, pn = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, Cl = H(pn, "u").replace(/punct/g, Ct).getRegex(), Tl = H(pn, "u").replace(/punct/g, mn).getRegex(), bn = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Al = H(bn, "gu").replace(/notPunctSpace/g, fn).replace(/punctSpace/g, cr).replace(/punct/g, Ct).getRegex(), El = H(bn, "gu").replace(/notPunctSpace/g, _l).replace(/punctSpace/g, $l).replace(/punct/g, mn).getRegex(), Rl = H(
  "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
  "gu"
).replace(/notPunctSpace/g, fn).replace(/punctSpace/g, cr).replace(/punct/g, Ct).getRegex(), Ll = H(/\\(punct)/, "gu").replace(/punct/g, Ct).getRegex(), Il = H(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Ol = H(sr).replace("(?:-->|$)", "-->").getRegex(), Dl = H(
  "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
).replace("comment", Ol).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), kt = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, Ml = H(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", kt).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), vn = H(/^!?\[(label)\]\[(ref)\]/).replace("label", kt).replace("ref", lr).getRegex(), xn = H(/^!?\[(ref)\](?:\[\])?/).replace("ref", lr).getRegex(), Pl = H("reflink|nolink(?!\\()", "g").replace("reflink", vn).replace("nolink", xn).getRegex(), ur = {
  _backpedal: at,
  // only used for GFM url
  anyPunctuation: Ll,
  autolink: Il,
  blockSkip: Sl,
  br: gn,
  code: kl,
  del: at,
  emStrongLDelim: Cl,
  emStrongRDelimAst: Al,
  emStrongRDelimUnd: Rl,
  escape: xl,
  link: Ml,
  nolink: xn,
  punctuation: wl,
  reflink: vn,
  reflinkSearch: Pl,
  tag: Dl,
  text: yl,
  url: at
}, Nl = {
  ...ur,
  link: H(/^!?\[(label)\]\((.*?)\)/).replace("label", kt).getRegex(),
  reflink: H(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", kt).getRegex()
}, Kt = {
  ...ur,
  emStrongRDelimAst: El,
  emStrongLDelim: Tl,
  url: H(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, zl = {
  ...Kt,
  br: H(gn).replace("{2,}", "*").getRegex(),
  text: H(Kt.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, bt = {
  normal: or,
  gfm: bl,
  pedantic: vl
}, rt = {
  normal: ur,
  gfm: Kt,
  breaks: zl,
  pedantic: Nl
}, Fl = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, Gr = (e) => Fl[e];
function ye(e, t) {
  if (t) {
    if (ae.escapeTest.test(e))
      return e.replace(ae.escapeReplace, Gr);
  } else if (ae.escapeTestNoEncode.test(e))
    return e.replace(ae.escapeReplaceNoEncode, Gr);
  return e;
}
function qr(e) {
  try {
    e = encodeURI(e).replace(ae.percentDecode, "%");
  } catch {
    return null;
  }
  return e;
}
function Wr(e, t) {
  var l;
  const n = e.replace(ae.findPipe, (u, a, o) => {
    let s = !1, c = a;
    for (; --c >= 0 && o[c] === "\\"; ) s = !s;
    return s ? "|" : " |";
  }), r = n.split(ae.splitPipe);
  let i = 0;
  if (r[0].trim() || r.shift(), r.length > 0 && !((l = r.at(-1)) != null && l.trim()) && r.pop(), t)
    if (r.length > t)
      r.splice(t);
    else
      for (; r.length < t; ) r.push("");
  for (; i < r.length; i++)
    r[i] = r[i].trim().replace(ae.slashPipe, "|");
  return r;
}
function nt(e, t, n) {
  const r = e.length;
  if (r === 0)
    return "";
  let i = 0;
  for (; i < r && e.charAt(r - i - 1) === t; )
    i++;
  return e.slice(0, r - i);
}
function Bl(e, t) {
  if (e.indexOf(t[1]) === -1)
    return -1;
  let n = 0;
  for (let r = 0; r < e.length; r++)
    if (e[r] === "\\")
      r++;
    else if (e[r] === t[0])
      n++;
    else if (e[r] === t[1] && (n--, n < 0))
      return r;
  return n > 0 ? -2 : -1;
}
function Vr(e, t, n, r, i) {
  const l = t.href, u = t.title || null, a = e[1].replace(i.other.outputLinkReplace, "$1");
  r.state.inLink = !0;
  const o = {
    type: e[0].charAt(0) === "!" ? "image" : "link",
    raw: n,
    href: l,
    title: u,
    text: a,
    tokens: r.inlineTokens(a)
  };
  return r.state.inLink = !1, o;
}
function Hl(e, t, n) {
  const r = e.match(n.other.indentCodeCompensation);
  if (r === null)
    return t;
  const i = r[1];
  return t.split(`
`).map((l) => {
    const u = l.match(n.other.beginningSpace);
    if (u === null)
      return l;
    const [a] = u;
    return a.length >= i.length ? l.slice(i.length) : l;
  }).join(`
`);
}
var yt = class {
  // set by the lexer
  constructor(e) {
    U(this, "options");
    U(this, "rules");
    // set by the lexer
    U(this, "lexer");
    this.options = e || He;
  }
  space(e) {
    const t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0)
      return {
        type: "space",
        raw: t[0]
      };
  }
  code(e) {
    const t = this.rules.block.code.exec(e);
    if (t) {
      const n = t[0].replace(this.rules.other.codeRemoveIndent, "");
      return {
        type: "code",
        raw: t[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? n : nt(n, `
`)
      };
    }
  }
  fences(e) {
    const t = this.rules.block.fences.exec(e);
    if (t) {
      const n = t[0], r = Hl(n, t[3] || "", this.rules);
      return {
        type: "code",
        raw: n,
        lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
        text: r
      };
    }
  }
  heading(e) {
    const t = this.rules.block.heading.exec(e);
    if (t) {
      let n = t[2].trim();
      if (this.rules.other.endingHash.test(n)) {
        const r = nt(n, "#");
        (this.options.pedantic || !r || this.rules.other.endingSpaceChar.test(r)) && (n = r.trim());
      }
      return {
        type: "heading",
        raw: t[0],
        depth: t[1].length,
        text: n,
        tokens: this.lexer.inline(n)
      };
    }
  }
  hr(e) {
    const t = this.rules.block.hr.exec(e);
    if (t)
      return {
        type: "hr",
        raw: nt(t[0], `
`)
      };
  }
  blockquote(e) {
    const t = this.rules.block.blockquote.exec(e);
    if (t) {
      let n = nt(t[0], `
`).split(`
`), r = "", i = "";
      const l = [];
      for (; n.length > 0; ) {
        let u = !1;
        const a = [];
        let o;
        for (o = 0; o < n.length; o++)
          if (this.rules.other.blockquoteStart.test(n[o]))
            a.push(n[o]), u = !0;
          else if (!u)
            a.push(n[o]);
          else
            break;
        n = n.slice(o);
        const s = a.join(`
`), c = s.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        r = r ? `${r}
${s}` : s, i = i ? `${i}
${c}` : c;
        const g = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(c, l, !0), this.lexer.state.top = g, n.length === 0)
          break;
        const m = l.at(-1);
        if ((m == null ? void 0 : m.type) === "code")
          break;
        if ((m == null ? void 0 : m.type) === "blockquote") {
          const y = m, b = y.raw + `
` + n.join(`
`), S = this.blockquote(b);
          l[l.length - 1] = S, r = r.substring(0, r.length - y.raw.length) + S.raw, i = i.substring(0, i.length - y.text.length) + S.text;
          break;
        } else if ((m == null ? void 0 : m.type) === "list") {
          const y = m, b = y.raw + `
` + n.join(`
`), S = this.list(b);
          l[l.length - 1] = S, r = r.substring(0, r.length - m.raw.length) + S.raw, i = i.substring(0, i.length - y.raw.length) + S.raw, n = b.substring(l.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return {
        type: "blockquote",
        raw: r,
        tokens: l,
        text: i
      };
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e);
    if (t) {
      let n = t[1].trim();
      const r = n.length > 1, i = {
        type: "list",
        raw: "",
        ordered: r,
        start: r ? +n.slice(0, -1) : "",
        loose: !1,
        items: []
      };
      n = r ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = r ? n : "[*+-]");
      const l = this.rules.other.listItemRegex(n);
      let u = !1;
      for (; e; ) {
        let o = !1, s = "", c = "";
        if (!(t = l.exec(e)) || this.rules.block.hr.test(e))
          break;
        s = t[0], e = e.substring(s.length);
        let g = t[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (_) => " ".repeat(3 * _.length)), m = e.split(`
`, 1)[0], y = !g.trim(), b = 0;
        if (this.options.pedantic ? (b = 2, c = g.trimStart()) : y ? b = t[1].length + 1 : (b = t[2].search(this.rules.other.nonSpaceChar), b = b > 4 ? 1 : b, c = g.slice(b), b += t[1].length), y && this.rules.other.blankLine.test(m) && (s += m + `
`, e = e.substring(m.length + 1), o = !0), !o) {
          const _ = this.rules.other.nextBulletRegex(b), f = this.rules.other.hrRegex(b), h = this.rules.other.fencesBeginRegex(b), x = this.rules.other.headingBeginRegex(b), w = this.rules.other.htmlBeginRegex(b);
          for (; e; ) {
            const C = e.split(`
`, 1)[0];
            let A;
            if (m = C, this.options.pedantic ? (m = m.replace(this.rules.other.listReplaceNesting, "  "), A = m) : A = m.replace(this.rules.other.tabCharGlobal, "    "), h.test(m) || x.test(m) || w.test(m) || _.test(m) || f.test(m))
              break;
            if (A.search(this.rules.other.nonSpaceChar) >= b || !m.trim())
              c += `
` + A.slice(b);
            else {
              if (y || g.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || h.test(g) || x.test(g) || f.test(g))
                break;
              c += `
` + m;
            }
            !y && !m.trim() && (y = !0), s += C + `
`, e = e.substring(C.length + 1), g = A.slice(b);
          }
        }
        i.loose || (u ? i.loose = !0 : this.rules.other.doubleBlankLine.test(s) && (u = !0));
        let S = null, k;
        this.options.gfm && (S = this.rules.other.listIsTask.exec(c), S && (k = S[0] !== "[ ] ", c = c.replace(this.rules.other.listReplaceTask, ""))), i.items.push({
          type: "list_item",
          raw: s,
          task: !!S,
          checked: k,
          loose: !1,
          text: c,
          tokens: []
        }), i.raw += s;
      }
      const a = i.items.at(-1);
      if (a)
        a.raw = a.raw.trimEnd(), a.text = a.text.trimEnd();
      else
        return;
      i.raw = i.raw.trimEnd();
      for (let o = 0; o < i.items.length; o++)
        if (this.lexer.state.top = !1, i.items[o].tokens = this.lexer.blockTokens(i.items[o].text, []), !i.loose) {
          const s = i.items[o].tokens.filter((g) => g.type === "space"), c = s.length > 0 && s.some((g) => this.rules.other.anyLine.test(g.raw));
          i.loose = c;
        }
      if (i.loose)
        for (let o = 0; o < i.items.length; o++)
          i.items[o].loose = !0;
      return i;
    }
  }
  html(e) {
    const t = this.rules.block.html.exec(e);
    if (t)
      return {
        type: "html",
        block: !0,
        raw: t[0],
        pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
        text: t[0]
      };
  }
  def(e) {
    const t = this.rules.block.def.exec(e);
    if (t) {
      const n = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), r = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", i = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
      return {
        type: "def",
        tag: n,
        raw: t[0],
        href: r,
        title: i
      };
    }
  }
  table(e) {
    var u;
    const t = this.rules.block.table.exec(e);
    if (!t || !this.rules.other.tableDelimiter.test(t[2]))
      return;
    const n = Wr(t[1]), r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = (u = t[3]) != null && u.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], l = {
      type: "table",
      raw: t[0],
      header: [],
      align: [],
      rows: []
    };
    if (n.length === r.length) {
      for (const a of r)
        this.rules.other.tableAlignRight.test(a) ? l.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? l.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? l.align.push("left") : l.align.push(null);
      for (let a = 0; a < n.length; a++)
        l.header.push({
          text: n[a],
          tokens: this.lexer.inline(n[a]),
          header: !0,
          align: l.align[a]
        });
      for (const a of i)
        l.rows.push(Wr(a, l.header.length).map((o, s) => ({
          text: o,
          tokens: this.lexer.inline(o),
          header: !1,
          align: l.align[s]
        })));
      return l;
    }
  }
  lheading(e) {
    const t = this.rules.block.lheading.exec(e);
    if (t)
      return {
        type: "heading",
        raw: t[0],
        depth: t[2].charAt(0) === "=" ? 1 : 2,
        text: t[1],
        tokens: this.lexer.inline(t[1])
      };
  }
  paragraph(e) {
    const t = this.rules.block.paragraph.exec(e);
    if (t) {
      const n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
      return {
        type: "paragraph",
        raw: t[0],
        text: n,
        tokens: this.lexer.inline(n)
      };
    }
  }
  text(e) {
    const t = this.rules.block.text.exec(e);
    if (t)
      return {
        type: "text",
        raw: t[0],
        text: t[0],
        tokens: this.lexer.inline(t[0])
      };
  }
  escape(e) {
    const t = this.rules.inline.escape.exec(e);
    if (t)
      return {
        type: "escape",
        raw: t[0],
        text: t[1]
      };
  }
  tag(e) {
    const t = this.rules.inline.tag.exec(e);
    if (t)
      return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
        type: "html",
        raw: t[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: !1,
        text: t[0]
      };
  }
  link(e) {
    const t = this.rules.inline.link.exec(e);
    if (t) {
      const n = t[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n)) {
        if (!this.rules.other.endAngleBracket.test(n))
          return;
        const l = nt(n.slice(0, -1), "\\");
        if ((n.length - l.length) % 2 === 0)
          return;
      } else {
        const l = Bl(t[2], "()");
        if (l === -2)
          return;
        if (l > -1) {
          const a = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + l;
          t[2] = t[2].substring(0, l), t[0] = t[0].substring(0, a).trim(), t[3] = "";
        }
      }
      let r = t[2], i = "";
      if (this.options.pedantic) {
        const l = this.rules.other.pedanticHrefTitle.exec(r);
        l && (r = l[1], i = l[3]);
      } else
        i = t[3] ? t[3].slice(1, -1) : "";
      return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? r = r.slice(1) : r = r.slice(1, -1)), Vr(t, {
        href: r && r.replace(this.rules.inline.anyPunctuation, "$1"),
        title: i && i.replace(this.rules.inline.anyPunctuation, "$1")
      }, t[0], this.lexer, this.rules);
    }
  }
  reflink(e, t) {
    let n;
    if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
      const r = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "), i = t[r.toLowerCase()];
      if (!i) {
        const l = n[0].charAt(0);
        return {
          type: "text",
          raw: l,
          text: l
        };
      }
      return Vr(n, i, n[0], this.lexer, this.rules);
    }
  }
  emStrong(e, t, n = "") {
    let r = this.rules.inline.emStrongLDelim.exec(e);
    if (!r || r[3] && n.match(this.rules.other.unicodeAlphaNumeric)) return;
    if (!(r[1] || r[2] || "") || !n || this.rules.inline.punctuation.exec(n)) {
      const l = [...r[0]].length - 1;
      let u, a, o = l, s = 0;
      const c = r[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (c.lastIndex = 0, t = t.slice(-1 * e.length + l); (r = c.exec(t)) != null; ) {
        if (u = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !u) continue;
        if (a = [...u].length, r[3] || r[4]) {
          o += a;
          continue;
        } else if ((r[5] || r[6]) && l % 3 && !((l + a) % 3)) {
          s += a;
          continue;
        }
        if (o -= a, o > 0) continue;
        a = Math.min(a, a + o + s);
        const g = [...r[0]][0].length, m = e.slice(0, l + r.index + g + a);
        if (Math.min(l, a) % 2) {
          const b = m.slice(1, -1);
          return {
            type: "em",
            raw: m,
            text: b,
            tokens: this.lexer.inlineTokens(b)
          };
        }
        const y = m.slice(2, -2);
        return {
          type: "strong",
          raw: m,
          text: y,
          tokens: this.lexer.inlineTokens(y)
        };
      }
    }
  }
  codespan(e) {
    const t = this.rules.inline.code.exec(e);
    if (t) {
      let n = t[2].replace(this.rules.other.newLineCharGlobal, " ");
      const r = this.rules.other.nonSpaceChar.test(n), i = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
      return r && i && (n = n.substring(1, n.length - 1)), {
        type: "codespan",
        raw: t[0],
        text: n
      };
    }
  }
  br(e) {
    const t = this.rules.inline.br.exec(e);
    if (t)
      return {
        type: "br",
        raw: t[0]
      };
  }
  del(e) {
    const t = this.rules.inline.del.exec(e);
    if (t)
      return {
        type: "del",
        raw: t[0],
        text: t[2],
        tokens: this.lexer.inlineTokens(t[2])
      };
  }
  autolink(e) {
    const t = this.rules.inline.autolink.exec(e);
    if (t) {
      let n, r;
      return t[2] === "@" ? (n = t[1], r = "mailto:" + n) : (n = t[1], r = n), {
        type: "link",
        raw: t[0],
        text: n,
        href: r,
        tokens: [
          {
            type: "text",
            raw: n,
            text: n
          }
        ]
      };
    }
  }
  url(e) {
    var n;
    let t;
    if (t = this.rules.inline.url.exec(e)) {
      let r, i;
      if (t[2] === "@")
        r = t[0], i = "mailto:" + r;
      else {
        let l;
        do
          l = t[0], t[0] = ((n = this.rules.inline._backpedal.exec(t[0])) == null ? void 0 : n[0]) ?? "";
        while (l !== t[0]);
        r = t[0], t[1] === "www." ? i = "http://" + t[0] : i = t[0];
      }
      return {
        type: "link",
        raw: t[0],
        text: r,
        href: i,
        tokens: [
          {
            type: "text",
            raw: r,
            text: r
          }
        ]
      };
    }
  }
  inlineText(e) {
    const t = this.rules.inline.text.exec(e);
    if (t) {
      const n = this.lexer.state.inRawBlock;
      return {
        type: "text",
        raw: t[0],
        text: t[0],
        escaped: n
      };
    }
  }
}, Le = class Jt {
  constructor(t) {
    U(this, "tokens");
    U(this, "options");
    U(this, "state");
    U(this, "tokenizer");
    U(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = t || He, this.options.tokenizer = this.options.tokenizer || new yt(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const n = {
      other: ae,
      block: bt.normal,
      inline: rt.normal
    };
    this.options.pedantic ? (n.block = bt.pedantic, n.inline = rt.pedantic) : this.options.gfm && (n.block = bt.gfm, this.options.breaks ? n.inline = rt.breaks : n.inline = rt.gfm), this.tokenizer.rules = n;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: bt,
      inline: rt
    };
  }
  /**
   * Static Lex Method
   */
  static lex(t, n) {
    return new Jt(n).lex(t);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(t, n) {
    return new Jt(n).inlineTokens(t);
  }
  /**
   * Preprocessing
   */
  lex(t) {
    t = t.replace(ae.carriageReturn, `
`), this.blockTokens(t, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      const r = this.inlineQueue[n];
      this.inlineTokens(r.src, r.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(t, n = [], r = !1) {
    var i, l, u;
    for (this.options.pedantic && (t = t.replace(ae.tabCharGlobal, "    ").replace(ae.spaceLine, "")); t; ) {
      let a;
      if ((l = (i = this.options.extensions) == null ? void 0 : i.block) != null && l.some((s) => (a = s.call({ lexer: this }, t, n)) ? (t = t.substring(a.raw.length), n.push(a), !0) : !1))
        continue;
      if (a = this.tokenizer.space(t)) {
        t = t.substring(a.raw.length);
        const s = n.at(-1);
        a.raw.length === 1 && s !== void 0 ? s.raw += `
` : n.push(a);
        continue;
      }
      if (a = this.tokenizer.code(t)) {
        t = t.substring(a.raw.length);
        const s = n.at(-1);
        (s == null ? void 0 : s.type) === "paragraph" || (s == null ? void 0 : s.type) === "text" ? (s.raw += `
` + a.raw, s.text += `
` + a.text, this.inlineQueue.at(-1).src = s.text) : n.push(a);
        continue;
      }
      if (a = this.tokenizer.fences(t)) {
        t = t.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.heading(t)) {
        t = t.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.hr(t)) {
        t = t.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.blockquote(t)) {
        t = t.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.list(t)) {
        t = t.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.html(t)) {
        t = t.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.def(t)) {
        t = t.substring(a.raw.length);
        const s = n.at(-1);
        (s == null ? void 0 : s.type) === "paragraph" || (s == null ? void 0 : s.type) === "text" ? (s.raw += `
` + a.raw, s.text += `
` + a.raw, this.inlineQueue.at(-1).src = s.text) : this.tokens.links[a.tag] || (this.tokens.links[a.tag] = {
          href: a.href,
          title: a.title
        });
        continue;
      }
      if (a = this.tokenizer.table(t)) {
        t = t.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.lheading(t)) {
        t = t.substring(a.raw.length), n.push(a);
        continue;
      }
      let o = t;
      if ((u = this.options.extensions) != null && u.startBlock) {
        let s = 1 / 0;
        const c = t.slice(1);
        let g;
        this.options.extensions.startBlock.forEach((m) => {
          g = m.call({ lexer: this }, c), typeof g == "number" && g >= 0 && (s = Math.min(s, g));
        }), s < 1 / 0 && s >= 0 && (o = t.substring(0, s + 1));
      }
      if (this.state.top && (a = this.tokenizer.paragraph(o))) {
        const s = n.at(-1);
        r && (s == null ? void 0 : s.type) === "paragraph" ? (s.raw += `
` + a.raw, s.text += `
` + a.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : n.push(a), r = o.length !== t.length, t = t.substring(a.raw.length);
        continue;
      }
      if (a = this.tokenizer.text(t)) {
        t = t.substring(a.raw.length);
        const s = n.at(-1);
        (s == null ? void 0 : s.type) === "text" ? (s.raw += `
` + a.raw, s.text += `
` + a.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : n.push(a);
        continue;
      }
      if (t) {
        const s = "Infinite loop on byte: " + t.charCodeAt(0);
        if (this.options.silent) {
          console.error(s);
          break;
        } else
          throw new Error(s);
      }
    }
    return this.state.top = !0, n;
  }
  inline(t, n = []) {
    return this.inlineQueue.push({ src: t, tokens: n }), n;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(t, n = []) {
    var a, o, s;
    let r = t, i = null;
    if (this.tokens.links) {
      const c = Object.keys(this.tokens.links);
      if (c.length > 0)
        for (; (i = this.tokenizer.rules.inline.reflinkSearch.exec(r)) != null; )
          c.includes(i[0].slice(i[0].lastIndexOf("[") + 1, -1)) && (r = r.slice(0, i.index) + "[" + "a".repeat(i[0].length - 2) + "]" + r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (i = this.tokenizer.rules.inline.anyPunctuation.exec(r)) != null; )
      r = r.slice(0, i.index) + "++" + r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; (i = this.tokenizer.rules.inline.blockSkip.exec(r)) != null; )
      r = r.slice(0, i.index) + "[" + "a".repeat(i[0].length - 2) + "]" + r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    let l = !1, u = "";
    for (; t; ) {
      l || (u = ""), l = !1;
      let c;
      if ((o = (a = this.options.extensions) == null ? void 0 : a.inline) != null && o.some((m) => (c = m.call({ lexer: this }, t, n)) ? (t = t.substring(c.raw.length), n.push(c), !0) : !1))
        continue;
      if (c = this.tokenizer.escape(t)) {
        t = t.substring(c.raw.length), n.push(c);
        continue;
      }
      if (c = this.tokenizer.tag(t)) {
        t = t.substring(c.raw.length), n.push(c);
        continue;
      }
      if (c = this.tokenizer.link(t)) {
        t = t.substring(c.raw.length), n.push(c);
        continue;
      }
      if (c = this.tokenizer.reflink(t, this.tokens.links)) {
        t = t.substring(c.raw.length);
        const m = n.at(-1);
        c.type === "text" && (m == null ? void 0 : m.type) === "text" ? (m.raw += c.raw, m.text += c.text) : n.push(c);
        continue;
      }
      if (c = this.tokenizer.emStrong(t, r, u)) {
        t = t.substring(c.raw.length), n.push(c);
        continue;
      }
      if (c = this.tokenizer.codespan(t)) {
        t = t.substring(c.raw.length), n.push(c);
        continue;
      }
      if (c = this.tokenizer.br(t)) {
        t = t.substring(c.raw.length), n.push(c);
        continue;
      }
      if (c = this.tokenizer.del(t)) {
        t = t.substring(c.raw.length), n.push(c);
        continue;
      }
      if (c = this.tokenizer.autolink(t)) {
        t = t.substring(c.raw.length), n.push(c);
        continue;
      }
      if (!this.state.inLink && (c = this.tokenizer.url(t))) {
        t = t.substring(c.raw.length), n.push(c);
        continue;
      }
      let g = t;
      if ((s = this.options.extensions) != null && s.startInline) {
        let m = 1 / 0;
        const y = t.slice(1);
        let b;
        this.options.extensions.startInline.forEach((S) => {
          b = S.call({ lexer: this }, y), typeof b == "number" && b >= 0 && (m = Math.min(m, b));
        }), m < 1 / 0 && m >= 0 && (g = t.substring(0, m + 1));
      }
      if (c = this.tokenizer.inlineText(g)) {
        t = t.substring(c.raw.length), c.raw.slice(-1) !== "_" && (u = c.raw.slice(-1)), l = !0;
        const m = n.at(-1);
        (m == null ? void 0 : m.type) === "text" ? (m.raw += c.raw, m.text += c.text) : n.push(c);
        continue;
      }
      if (t) {
        const m = "Infinite loop on byte: " + t.charCodeAt(0);
        if (this.options.silent) {
          console.error(m);
          break;
        } else
          throw new Error(m);
      }
    }
    return n;
  }
}, wt = class {
  // set by the parser
  constructor(e) {
    U(this, "options");
    U(this, "parser");
    this.options = e || He;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: n }) {
    var l;
    const r = (l = (t || "").match(ae.notSpaceStart)) == null ? void 0 : l[0], i = e.replace(ae.endingNewline, "") + `
`;
    return r ? '<pre><code class="language-' + ye(r) + '">' + (n ? i : ye(i, !0)) + `</code></pre>
` : "<pre><code>" + (n ? i : ye(i, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: e }) {
    return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
  }
  html({ text: e }) {
    return e;
  }
  heading({ tokens: e, depth: t }) {
    return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
  }
  hr(e) {
    return `<hr>
`;
  }
  list(e) {
    const t = e.ordered, n = e.start;
    let r = "";
    for (let u = 0; u < e.items.length; u++) {
      const a = e.items[u];
      r += this.listitem(a);
    }
    const i = t ? "ol" : "ul", l = t && n !== 1 ? ' start="' + n + '"' : "";
    return "<" + i + l + `>
` + r + "</" + i + `>
`;
  }
  listitem(e) {
    var n;
    let t = "";
    if (e.task) {
      const r = this.checkbox({ checked: !!e.checked });
      e.loose ? ((n = e.tokens[0]) == null ? void 0 : n.type) === "paragraph" ? (e.tokens[0].text = r + " " + e.tokens[0].text, e.tokens[0].tokens && e.tokens[0].tokens.length > 0 && e.tokens[0].tokens[0].type === "text" && (e.tokens[0].tokens[0].text = r + " " + ye(e.tokens[0].tokens[0].text), e.tokens[0].tokens[0].escaped = !0)) : e.tokens.unshift({
        type: "text",
        raw: r + " ",
        text: r + " ",
        escaped: !0
      }) : t += r + " ";
    }
    return t += this.parser.parse(e.tokens, !!e.loose), `<li>${t}</li>
`;
  }
  checkbox({ checked: e }) {
    return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: e }) {
    return `<p>${this.parser.parseInline(e)}</p>
`;
  }
  table(e) {
    let t = "", n = "";
    for (let i = 0; i < e.header.length; i++)
      n += this.tablecell(e.header[i]);
    t += this.tablerow({ text: n });
    let r = "";
    for (let i = 0; i < e.rows.length; i++) {
      const l = e.rows[i];
      n = "";
      for (let u = 0; u < l.length; u++)
        n += this.tablecell(l[u]);
      r += this.tablerow({ text: n });
    }
    return r && (r = `<tbody>${r}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + r + `</table>
`;
  }
  tablerow({ text: e }) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(e) {
    const t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
    return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
  }
  /**
   * span level renderer
   */
  strong({ tokens: e }) {
    return `<strong>${this.parser.parseInline(e)}</strong>`;
  }
  em({ tokens: e }) {
    return `<em>${this.parser.parseInline(e)}</em>`;
  }
  codespan({ text: e }) {
    return `<code>${ye(e, !0)}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: t, tokens: n }) {
    const r = this.parser.parseInline(n), i = qr(e);
    if (i === null)
      return r;
    e = i;
    let l = '<a href="' + e + '"';
    return t && (l += ' title="' + ye(t) + '"'), l += ">" + r + "</a>", l;
  }
  image({ href: e, title: t, text: n, tokens: r }) {
    r && (n = this.parser.parseInline(r, this.parser.textRenderer));
    const i = qr(e);
    if (i === null)
      return ye(n);
    e = i;
    let l = `<img src="${e}" alt="${n}"`;
    return t && (l += ` title="${ye(t)}"`), l += ">", l;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : ye(e.text);
  }
}, dr = class {
  // no need for block level renderers
  strong({ text: e }) {
    return e;
  }
  em({ text: e }) {
    return e;
  }
  codespan({ text: e }) {
    return e;
  }
  del({ text: e }) {
    return e;
  }
  html({ text: e }) {
    return e;
  }
  text({ text: e }) {
    return e;
  }
  link({ text: e }) {
    return "" + e;
  }
  image({ text: e }) {
    return "" + e;
  }
  br() {
    return "";
  }
}, Ie = class Qt {
  constructor(t) {
    U(this, "options");
    U(this, "renderer");
    U(this, "textRenderer");
    this.options = t || He, this.options.renderer = this.options.renderer || new wt(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new dr();
  }
  /**
   * Static Parse Method
   */
  static parse(t, n) {
    return new Qt(n).parse(t);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(t, n) {
    return new Qt(n).parseInline(t);
  }
  /**
   * Parse Loop
   */
  parse(t, n = !0) {
    var i, l;
    let r = "";
    for (let u = 0; u < t.length; u++) {
      const a = t[u];
      if ((l = (i = this.options.extensions) == null ? void 0 : i.renderers) != null && l[a.type]) {
        const s = a, c = this.options.extensions.renderers[s.type].call({ parser: this }, s);
        if (c !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(s.type)) {
          r += c || "";
          continue;
        }
      }
      const o = a;
      switch (o.type) {
        case "space": {
          r += this.renderer.space(o);
          continue;
        }
        case "hr": {
          r += this.renderer.hr(o);
          continue;
        }
        case "heading": {
          r += this.renderer.heading(o);
          continue;
        }
        case "code": {
          r += this.renderer.code(o);
          continue;
        }
        case "table": {
          r += this.renderer.table(o);
          continue;
        }
        case "blockquote": {
          r += this.renderer.blockquote(o);
          continue;
        }
        case "list": {
          r += this.renderer.list(o);
          continue;
        }
        case "html": {
          r += this.renderer.html(o);
          continue;
        }
        case "paragraph": {
          r += this.renderer.paragraph(o);
          continue;
        }
        case "text": {
          let s = o, c = this.renderer.text(s);
          for (; u + 1 < t.length && t[u + 1].type === "text"; )
            s = t[++u], c += `
` + this.renderer.text(s);
          n ? r += this.renderer.paragraph({
            type: "paragraph",
            raw: c,
            text: c,
            tokens: [{ type: "text", raw: c, text: c, escaped: !0 }]
          }) : r += c;
          continue;
        }
        default: {
          const s = 'Token with "' + o.type + '" type was not found.';
          if (this.options.silent)
            return console.error(s), "";
          throw new Error(s);
        }
      }
    }
    return r;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(t, n = this.renderer) {
    var i, l;
    let r = "";
    for (let u = 0; u < t.length; u++) {
      const a = t[u];
      if ((l = (i = this.options.extensions) == null ? void 0 : i.renderers) != null && l[a.type]) {
        const s = this.options.extensions.renderers[a.type].call({ parser: this }, a);
        if (s !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(a.type)) {
          r += s || "";
          continue;
        }
      }
      const o = a;
      switch (o.type) {
        case "escape": {
          r += n.text(o);
          break;
        }
        case "html": {
          r += n.html(o);
          break;
        }
        case "link": {
          r += n.link(o);
          break;
        }
        case "image": {
          r += n.image(o);
          break;
        }
        case "strong": {
          r += n.strong(o);
          break;
        }
        case "em": {
          r += n.em(o);
          break;
        }
        case "codespan": {
          r += n.codespan(o);
          break;
        }
        case "br": {
          r += n.br(o);
          break;
        }
        case "del": {
          r += n.del(o);
          break;
        }
        case "text": {
          r += n.text(o);
          break;
        }
        default: {
          const s = 'Token with "' + o.type + '" type was not found.';
          if (this.options.silent)
            return console.error(s), "";
          throw new Error(s);
        }
      }
    }
    return r;
  }
}, Wt, xt = (Wt = class {
  constructor(e) {
    U(this, "options");
    U(this, "block");
    this.options = e || He;
  }
  /**
   * Process markdown before marked
   */
  preprocess(e) {
    return e;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(e) {
    return e;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(e) {
    return e;
  }
  /**
   * Provide function to tokenize markdown
   */
  provideLexer() {
    return this.block ? Le.lex : Le.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? Ie.parse : Ie.parseInline;
  }
}, U(Wt, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
])), Wt), jl = class {
  constructor(...e) {
    U(this, "defaults", nr());
    U(this, "options", this.setOptions);
    U(this, "parse", this.parseMarkdown(!0));
    U(this, "parseInline", this.parseMarkdown(!1));
    U(this, "Parser", Ie);
    U(this, "Renderer", wt);
    U(this, "TextRenderer", dr);
    U(this, "Lexer", Le);
    U(this, "Tokenizer", yt);
    U(this, "Hooks", xt);
    this.use(...e);
  }
  /**
   * Run callback for every token
   */
  walkTokens(e, t) {
    var r, i;
    let n = [];
    for (const l of e)
      switch (n = n.concat(t.call(this, l)), l.type) {
        case "table": {
          const u = l;
          for (const a of u.header)
            n = n.concat(this.walkTokens(a.tokens, t));
          for (const a of u.rows)
            for (const o of a)
              n = n.concat(this.walkTokens(o.tokens, t));
          break;
        }
        case "list": {
          const u = l;
          n = n.concat(this.walkTokens(u.items, t));
          break;
        }
        default: {
          const u = l;
          (i = (r = this.defaults.extensions) == null ? void 0 : r.childTokens) != null && i[u.type] ? this.defaults.extensions.childTokens[u.type].forEach((a) => {
            const o = u[a].flat(1 / 0);
            n = n.concat(this.walkTokens(o, t));
          }) : u.tokens && (n = n.concat(this.walkTokens(u.tokens, t)));
        }
      }
    return n;
  }
  use(...e) {
    const t = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e.forEach((n) => {
      const r = { ...n };
      if (r.async = this.defaults.async || r.async || !1, n.extensions && (n.extensions.forEach((i) => {
        if (!i.name)
          throw new Error("extension name required");
        if ("renderer" in i) {
          const l = t.renderers[i.name];
          l ? t.renderers[i.name] = function(...u) {
            let a = i.renderer.apply(this, u);
            return a === !1 && (a = l.apply(this, u)), a;
          } : t.renderers[i.name] = i.renderer;
        }
        if ("tokenizer" in i) {
          if (!i.level || i.level !== "block" && i.level !== "inline")
            throw new Error("extension level must be 'block' or 'inline'");
          const l = t[i.level];
          l ? l.unshift(i.tokenizer) : t[i.level] = [i.tokenizer], i.start && (i.level === "block" ? t.startBlock ? t.startBlock.push(i.start) : t.startBlock = [i.start] : i.level === "inline" && (t.startInline ? t.startInline.push(i.start) : t.startInline = [i.start]));
        }
        "childTokens" in i && i.childTokens && (t.childTokens[i.name] = i.childTokens);
      }), r.extensions = t), n.renderer) {
        const i = this.defaults.renderer || new wt(this.defaults);
        for (const l in n.renderer) {
          if (!(l in i))
            throw new Error(`renderer '${l}' does not exist`);
          if (["options", "parser"].includes(l))
            continue;
          const u = l, a = n.renderer[u], o = i[u];
          i[u] = (...s) => {
            let c = a.apply(i, s);
            return c === !1 && (c = o.apply(i, s)), c || "";
          };
        }
        r.renderer = i;
      }
      if (n.tokenizer) {
        const i = this.defaults.tokenizer || new yt(this.defaults);
        for (const l in n.tokenizer) {
          if (!(l in i))
            throw new Error(`tokenizer '${l}' does not exist`);
          if (["options", "rules", "lexer"].includes(l))
            continue;
          const u = l, a = n.tokenizer[u], o = i[u];
          i[u] = (...s) => {
            let c = a.apply(i, s);
            return c === !1 && (c = o.apply(i, s)), c;
          };
        }
        r.tokenizer = i;
      }
      if (n.hooks) {
        const i = this.defaults.hooks || new xt();
        for (const l in n.hooks) {
          if (!(l in i))
            throw new Error(`hook '${l}' does not exist`);
          if (["options", "block"].includes(l))
            continue;
          const u = l, a = n.hooks[u], o = i[u];
          xt.passThroughHooks.has(l) ? i[u] = (s) => {
            if (this.defaults.async)
              return Promise.resolve(a.call(i, s)).then((g) => o.call(i, g));
            const c = a.call(i, s);
            return o.call(i, c);
          } : i[u] = (...s) => {
            let c = a.apply(i, s);
            return c === !1 && (c = o.apply(i, s)), c;
          };
        }
        r.hooks = i;
      }
      if (n.walkTokens) {
        const i = this.defaults.walkTokens, l = n.walkTokens;
        r.walkTokens = function(u) {
          let a = [];
          return a.push(l.call(this, u)), i && (a = a.concat(i.call(this, u))), a;
        };
      }
      this.defaults = { ...this.defaults, ...r };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
  lexer(e, t) {
    return Le.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return Ie.parse(e, t ?? this.defaults);
  }
  parseMarkdown(e) {
    return (n, r) => {
      const i = { ...r }, l = { ...this.defaults, ...i }, u = this.onError(!!l.silent, !!l.async);
      if (this.defaults.async === !0 && i.async === !1)
        return u(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof n > "u" || n === null)
        return u(new Error("marked(): input parameter is undefined or null"));
      if (typeof n != "string")
        return u(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
      l.hooks && (l.hooks.options = l, l.hooks.block = e);
      const a = l.hooks ? l.hooks.provideLexer() : e ? Le.lex : Le.lexInline, o = l.hooks ? l.hooks.provideParser() : e ? Ie.parse : Ie.parseInline;
      if (l.async)
        return Promise.resolve(l.hooks ? l.hooks.preprocess(n) : n).then((s) => a(s, l)).then((s) => l.hooks ? l.hooks.processAllTokens(s) : s).then((s) => l.walkTokens ? Promise.all(this.walkTokens(s, l.walkTokens)).then(() => s) : s).then((s) => o(s, l)).then((s) => l.hooks ? l.hooks.postprocess(s) : s).catch(u);
      try {
        l.hooks && (n = l.hooks.preprocess(n));
        let s = a(n, l);
        l.hooks && (s = l.hooks.processAllTokens(s)), l.walkTokens && this.walkTokens(s, l.walkTokens);
        let c = o(s, l);
        return l.hooks && (c = l.hooks.postprocess(c)), c;
      } catch (s) {
        return u(s);
      }
    };
  }
  onError(e, t) {
    return (n) => {
      if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
        const r = "<p>An error occurred:</p><pre>" + ye(n.message + "", !0) + "</pre>";
        return t ? Promise.resolve(r) : r;
      }
      if (t)
        return Promise.reject(n);
      throw n;
    };
  }
}, Fe = new jl();
function B(e, t) {
  return Fe.parse(e, t);
}
B.options = B.setOptions = function(e) {
  return Fe.setOptions(e), B.defaults = Fe.defaults, cn(B.defaults), B;
};
B.getDefaults = nr;
B.defaults = He;
B.use = function(...e) {
  return Fe.use(...e), B.defaults = Fe.defaults, cn(B.defaults), B;
};
B.walkTokens = function(e, t) {
  return Fe.walkTokens(e, t);
};
B.parseInline = Fe.parseInline;
B.Parser = Ie;
B.parser = Ie.parse;
B.Renderer = wt;
B.TextRenderer = dr;
B.Lexer = Le;
B.lexer = Le.lex;
B.Tokenizer = yt;
B.Hooks = xt;
B.parse = B;
B.options;
B.setOptions;
B.use;
B.walkTokens;
B.parseInline;
Ie.parse;
Le.lex;
var Ul = /* @__PURE__ */ $("<div>");
B.setOptions({
  breaks: !0,
  gfm: !0
});
const qo = (e) => {
  const t = te(() => {
    if (!e.content)
      return "";
    try {
      const n = B.parse(e.content, {
        async: !1
      });
      return Zt.sanitize(n);
    } catch {
      return Zt.sanitize(e.content);
    }
  });
  return v(E, {
    get when() {
      return e.content;
    },
    get children() {
      var n = Ul();
      return I((r) => {
        var i = `markdown-content prose prose-sm max-w-none
          prose-headings:text-gray-900 dark:prose-headings:text-white
          prose-headings:font-semibold prose-headings:leading-tight
          prose-h1:text-xl prose-h1:mt-6 prose-h1:mb-3
          prose-h2:text-lg prose-h2:mt-5 prose-h2:mb-2
          prose-h3:text-base prose-h3:mt-4 prose-h3:mb-2
          prose-p:text-gray-600 dark:prose-p:text-gray-400
          prose-p:leading-relaxed prose-p:my-2
          prose-a:text-blue-600 dark:prose-a:text-blue-400
          prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-800 dark:prose-strong:text-gray-200
          prose-strong:font-semibold
          prose-code:text-sm prose-code:font-mono
          prose-code:bg-gray-100 dark:prose-code:bg-gray-800
          prose-code:text-gray-800 dark:prose-code:text-gray-200
          prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
          prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950
          prose-pre:text-gray-100 prose-pre:rounded-xl
          prose-pre:p-4 prose-pre:my-3 prose-pre:overflow-x-auto
          prose-ul:my-2 prose-ul:pl-5 prose-ul:list-disc
          prose-ol:my-2 prose-ol:pl-5 prose-ol:list-decimal
          prose-li:text-gray-600 dark:prose-li:text-gray-400
          prose-li:my-0.5
          prose-blockquote:border-l-4 prose-blockquote:border-gray-300
          dark:prose-blockquote:border-gray-600
          prose-blockquote:pl-4 prose-blockquote:my-3
          prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
          prose-blockquote:italic
          prose-hr:border-gray-200 dark:prose-hr:border-gray-700
          prose-hr:my-4
          prose-table:my-3
          prose-th:text-left prose-th:text-gray-800 dark:prose-th:text-gray-200
          prose-th:font-semibold prose-th:p-2
          prose-th:border-b prose-th:border-gray-200 dark:prose-th:border-gray-700
          prose-td:p-2 prose-td:text-gray-600 dark:prose-td:text-gray-400
          prose-td:border-b prose-td:border-gray-100 dark:prose-td:border-gray-800
          ${e.class ?? ""}`, l = t();
        return i !== r.e && L(n, r.e = i), l !== r.t && (n.innerHTML = r.t = l), r;
      }, {
        e: void 0,
        t: void 0
      }), n;
    }
  });
};
var Gl = /* @__PURE__ */ $('<div><h3 class="text-xs font-bold text-surface-700 dark:text-surface-400 uppercase tracking-wider mb-2 md:mb-3 px-1"></h3><div class="space-y-2 md:space-y-3">');
const Wo = (e) => (() => {
  var t = Gl(), n = t.firstChild, r = n.nextSibling;
  return p(n, () => e.title), p(r, () => e.children), I(() => L(t, `mt-4 md:mt-6 first:mt-1 first:md:mt-2 ${e.class ?? ""}`)), t;
})();
var ql = /* @__PURE__ */ $('<div><div class="flex items-start gap-3"><div class="flex-shrink-0 w-9 h-9 rounded-xl bg-red-500/15 dark:bg-red-500/20 flex items-center justify-center"><svg class="w-5 h-5 text-red-600 dark:text-red-400"fill=none viewBox="0 0 24 24"stroke=currentColor aria-hidden=true><path stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M6 18L18 6M6 6l12 12"></path></svg></div><div><h4 class="text-base font-bold text-red-800 dark:text-red-200"></h4><p class="text-sm text-red-600 dark:text-red-400 mt-1 leading-relaxed">');
const Vo = (e) => (() => {
  var t = ql(), n = t.firstChild, r = n.firstChild, i = r.nextSibling, l = i.firstChild, u = l.nextSibling;
  return p(l, () => e.title ?? "Request Failed"), p(u, () => e.message), I(() => L(t, `mt-4 md:mt-6 p-3 md:p-4 glass-card rounded-xl border-red-200/30 dark:border-red-800/20 shadow-lg shadow-red-500/5 ${e.class ?? ""}`)), t;
})();
function hr(e) {
  return e == null ? "" : String(e);
}
function Wl(e, t = 2) {
  return e == null ? "" : typeof e == "object" ? JSON.stringify(e, null, t) : String(e);
}
function kn(e) {
  if (e.default !== void 0)
    return e.default;
  switch (e.type || "string") {
    case "string":
      return "";
    case "number":
    case "integer":
      return 0;
    case "boolean":
      return !1;
    case "array":
      return [];
    case "object":
      if (e.properties) {
        const n = {}, r = e.required || [];
        for (const [i, l] of Object.entries(e.properties))
          r.includes(i) && (n[i] = kn(l));
        return n;
      }
      return {};
    default:
      return;
  }
}
const er = (e) => {
  const t = () => hr(e.value), n = () => e.schema.format === "textarea" || e.schema.maxLength && e.schema.maxLength > 200;
  return v(E, {
    get when() {
      return n();
    },
    get fallback() {
      return v(Qr, {
        get value() {
          return t();
        },
        onInput: (r) => e.onChange(r || void 0),
        get placeholder() {
          var r;
          return ((r = e.schema.default) == null ? void 0 : r.toString()) || "";
        }
      });
    },
    get children() {
      return v(en, {
        get value() {
          return t();
        },
        onInput: (r) => e.onChange(r || void 0),
        get placeholder() {
          var r;
          return ((r = e.schema.default) == null ? void 0 : r.toString()) || "";
        },
        class: "h-24"
      });
    }
  });
}, yn = (e) => {
  const t = () => hr(e.value);
  return v(Qr, {
    type: "number",
    get value() {
      return t();
    },
    onInput: (r) => {
      if (r === "") {
        e.onChange(void 0);
        return;
      }
      const i = Number(r);
      Number.isNaN(i) || e.onChange(i);
    },
    get placeholder() {
      var r;
      return ((r = e.schema.default) == null ? void 0 : r.toString()) || "0";
    }
  });
}, wn = (e) => v(ea, {
  get checked() {
    return e.value === !0;
  },
  onChange: (t) => e.onChange(t),
  get label() {
    return e.value === !0 ? "true" : "false";
  }
});
var Vl = /* @__PURE__ */ $("<option value>-- Select --"), Xl = /* @__PURE__ */ $("<option>");
const $n = (e) => {
  const t = () => hr(e.value);
  return v(Kn, {
    get value() {
      return t();
    },
    onChange: (r) => {
      if (r === "") {
        e.onChange(void 0);
        return;
      }
      const l = (e.schema.enum || []).find((u) => String(u) === r);
      e.onChange(l !== void 0 ? l : r);
    },
    get children() {
      return [Vl(), v(Q, {
        get each() {
          return e.schema.enum;
        },
        children: (r) => (() => {
          var i = Xl();
          return p(i, () => String(r)), I(() => i.value = String(r)), i;
        })()
      })];
    }
  });
}, Yl = (e) => {
  const t = () => Wl(e.value);
  return v(en, {
    get value() {
      return t();
    },
    onInput: (r) => {
      if (r === "") {
        e.onChange(void 0);
        return;
      }
      try {
        e.onChange(JSON.parse(r));
      } catch {
        e.onChange(r);
      }
    },
    placeholder: "{}",
    class: "h-24 font-mono text-sm"
  });
};
var Zl = /* @__PURE__ */ $('<span class="text-rose-500 text-xs font-semibold">required'), Kl = /* @__PURE__ */ $('<span class="text-xs text-gray-400 dark:text-gray-500">(<!>)'), Jl = /* @__PURE__ */ $('<p class="text-xs text-gray-400 dark:text-gray-500">'), Ql = /* @__PURE__ */ $('<div class=space-y-2><div class="flex items-center gap-2"><span class="font-mono text-sm font-medium text-gray-900 dark:text-white"></span><span class="text-xs text-gray-400 dark:text-gray-500">'), es = /* @__PURE__ */ $("<div class=sm:max-w-xs>");
const Xr = (e) => {
  const t = () => e.schema.type || "string", n = () => t() === "object" || t() === "array";
  return (() => {
    var r = Ql(), i = r.firstChild, l = i.firstChild, u = l.nextSibling;
    return p(l, () => e.name), p(i, v(E, {
      get when() {
        return e.required;
      },
      get children() {
        return Zl();
      }
    }), u), p(u, t), p(i, v(E, {
      get when() {
        return e.schema.format;
      },
      get children() {
        var a = Kl(), o = a.firstChild, s = o.nextSibling;
        return s.nextSibling, p(a, () => e.schema.format, s), a;
      }
    }), null), p(r, v(E, {
      get when() {
        return e.schema.description;
      },
      get children() {
        var a = Jl();
        return p(a, () => e.schema.description), a;
      }
    }), null), p(r, v(E, {
      get when() {
        return n();
      },
      get fallback() {
        return (() => {
          var a = es();
          return p(a, v(tr, {
            get schema() {
              return e.schema;
            },
            get value() {
              return e.value;
            },
            get onChange() {
              return e.onChange;
            },
            get path() {
              return e.path;
            }
          })), a;
        })();
      },
      get children() {
        return v(tr, {
          get schema() {
            return e.schema;
          },
          get value() {
            return e.value;
          },
          get onChange() {
            return e.onChange;
          },
          get path() {
            return e.path;
          }
        });
      }
    }), null), r;
  })();
};
var ts = /* @__PURE__ */ $("<div class=space-y-4>"), rs = /* @__PURE__ */ $('<div class="glass-card rounded-xl p-3 sm:p-4 space-y-3 sm:space-y-4">');
const ns = (e) => {
  const t = () => e.value || {}, n = () => e.schema.properties || {}, r = () => e.schema.required || [], i = (u, a) => {
    const o = {
      ...t()
    };
    a === void 0 ? delete o[u] : o[u] = a, e.onChange(Object.keys(o).length > 0 ? o : void 0);
  }, l = () => e.path.length === 0;
  return v(E, {
    get when() {
      return l();
    },
    get fallback() {
      return (() => {
        var u = rs();
        return p(u, v(Q, {
          get each() {
            return Object.entries(n());
          },
          children: ([a, o]) => v(Xr, {
            name: a,
            schema: o,
            get value() {
              return t()[a];
            },
            get required() {
              return r().includes(a);
            },
            onChange: (s) => i(a, s),
            get path() {
              return [...e.path, a];
            }
          })
        })), u;
      })();
    },
    get children() {
      var u = ts();
      return p(u, v(Q, {
        get each() {
          return Object.entries(n());
        },
        children: ([a, o]) => v(Xr, {
          name: a,
          schema: o,
          get value() {
            return t()[a];
          },
          get required() {
            return r().includes(a);
          },
          onChange: (s) => i(a, s),
          get path() {
            return [...e.path, a];
          }
        })
      })), u;
    }
  });
};
var as = /* @__PURE__ */ $('<div class="text-xs text-gray-400 dark:text-gray-500">'), is = /* @__PURE__ */ $('<div class=space-y-3><button type=button class="w-full py-2.5 px-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex items-center justify-center gap-2"><svg class="w-4 h-4"fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M12 4v16m8-8H4"></path></svg>Add item'), ls = /* @__PURE__ */ $('<span class="text-xs text-gray-400 dark:text-gray-500">(<!>)'), ss = /* @__PURE__ */ $('<div class="glass-card rounded-xl p-3 sm:p-4"><div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3"><div class="flex items-center gap-2"><span class="text-xs font-medium text-gray-500 dark:text-gray-400">Item </span></div><div class="flex items-center gap-1 self-end sm:self-auto"><button type=button class=glass-icon-btn title="Move up"><svg class="w-4 h-4"fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M5 15l7-7 7 7"></path></svg></button><button type=button class=glass-icon-btn title="Move down"><svg class="w-4 h-4"fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M19 9l-7 7-7-7"></path></svg></button><button type=button class="p-1.5 rounded-lg text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"title="Remove item"><svg class="w-4 h-4"fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">');
const os = (e) => {
  const t = () => e.schema.type || "string";
  return v(Kr, {
    get fallback() {
      return v(er, {
        get schema() {
          return e.schema;
        },
        get value() {
          return e.value;
        },
        get onChange() {
          return e.onChange;
        }
      });
    },
    get children() {
      return [v(we, {
        get when() {
          return $e(() => !!e.schema.enum)() && e.schema.enum.length > 0;
        },
        get children() {
          return v($n, {
            get schema() {
              return e.schema;
            },
            get value() {
              return e.value;
            },
            get onChange() {
              return e.onChange;
            }
          });
        }
      }), v(we, {
        get when() {
          return t() === "boolean";
        },
        get children() {
          return v(wn, {
            get schema() {
              return e.schema;
            },
            get value() {
              return e.value;
            },
            get onChange() {
              return e.onChange;
            }
          });
        }
      }), v(we, {
        get when() {
          return t() === "number" || t() === "integer";
        },
        get children() {
          return v(yn, {
            get schema() {
              return e.schema;
            },
            get value() {
              return e.value;
            },
            get onChange() {
              return e.onChange;
            }
          });
        }
      })];
    }
  });
}, cs = (e) => {
  const t = () => e.value || [], n = () => e.schema.items || {
    type: "string"
  }, r = () => {
    const o = kn(n());
    e.onChange([...t(), o]);
  }, i = (o) => {
    const s = t().filter((c, g) => g !== o);
    e.onChange(s.length > 0 ? s : void 0);
  }, l = (o, s) => {
    const c = [...t()];
    c[o] = s, e.onChange(c);
  }, u = (o, s) => {
    if (s < 0 || s >= t().length)
      return;
    const c = [...t()], [g] = c.splice(o, 1);
    c.splice(s, 0, g), e.onChange(c);
  }, a = () => {
    const o = n().type;
    return o === "string" || o === "number" || o === "integer" || o === "boolean";
  };
  return (() => {
    var o = is(), s = o.firstChild;
    return p(o, v(Q, {
      get each() {
        return t();
      },
      children: (c, g) => (() => {
        var m = ss(), y = m.firstChild, b = y.firstChild, S = b.firstChild;
        S.firstChild;
        var k = b.nextSibling, _ = k.firstChild, f = _.nextSibling, h = f.nextSibling;
        return p(S, () => g() + 1, null), p(b, v(E, {
          get when() {
            return n().type;
          },
          get children() {
            var x = ls(), w = x.firstChild, C = w.nextSibling;
            return C.nextSibling, p(x, () => n().type, C), x;
          }
        }), null), _.$$click = () => u(g(), g() - 1), f.$$click = () => u(g(), g() + 1), h.$$click = () => i(g()), p(m, v(E, {
          get when() {
            return a();
          },
          get fallback() {
            return v(tr, {
              get schema() {
                return n();
              },
              value: c,
              onChange: (x) => l(g(), x),
              get path() {
                return [...e.path, String(g())];
              }
            });
          },
          get children() {
            return v(os, {
              get schema() {
                return n();
              },
              value: c,
              onChange: (x) => l(g(), x)
            });
          }
        }), null), I((x) => {
          var w = g() === 0, C = g() === t().length - 1;
          return w !== x.e && (_.disabled = x.e = w), C !== x.t && (f.disabled = x.t = C), x;
        }, {
          e: void 0,
          t: void 0
        }), m;
      })()
    }), s), s.$$click = r, p(o, v(E, {
      get when() {
        return e.schema.minItems !== void 0 || e.schema.maxItems !== void 0;
      },
      get children() {
        var c = as();
        return p(c, v(E, {
          get when() {
            return e.schema.minItems !== void 0;
          },
          get children() {
            return ["Min items: ", $e(() => e.schema.minItems)];
          }
        }), null), p(c, v(E, {
          get when() {
            return $e(() => e.schema.minItems !== void 0)() && e.schema.maxItems !== void 0;
          },
          children: " | "
        }), null), p(c, v(E, {
          get when() {
            return e.schema.maxItems !== void 0;
          },
          get children() {
            return ["Max items: ", $e(() => e.schema.maxItems)];
          }
        }), null), c;
      }
    }), null), o;
  })();
};
W(["click"]);
const tr = (e) => {
  const t = te(() => {
    const n = e.schema;
    return n.enum && n.enum.length > 0 ? "enum" : n.oneOf && n.oneOf.length > 0 ? "oneOf" : n.anyOf && n.anyOf.length > 0 ? "anyOf" : n.type || "string";
  });
  return v(Kr, {
    get fallback() {
      return v(er, {
        get schema() {
          return e.schema;
        },
        get value() {
          return e.value;
        },
        get onChange() {
          return e.onChange;
        }
      });
    },
    get children() {
      return [v(we, {
        get when() {
          return t() === "object";
        },
        get children() {
          return v(ns, {
            get schema() {
              return e.schema;
            },
            get value() {
              return e.value;
            },
            get onChange() {
              return e.onChange;
            },
            get path() {
              return e.path || [];
            }
          });
        }
      }), v(we, {
        get when() {
          return t() === "array";
        },
        get children() {
          return v(cs, {
            get schema() {
              return e.schema;
            },
            get value() {
              return e.value;
            },
            get onChange() {
              return e.onChange;
            },
            get path() {
              return e.path || [];
            }
          });
        }
      }), v(we, {
        get when() {
          return t() === "enum";
        },
        get children() {
          return v($n, {
            get schema() {
              return e.schema;
            },
            get value() {
              return e.value;
            },
            get onChange() {
              return e.onChange;
            }
          });
        }
      }), v(we, {
        get when() {
          return t() === "boolean";
        },
        get children() {
          return v(wn, {
            get schema() {
              return e.schema;
            },
            get value() {
              return e.value;
            },
            get onChange() {
              return e.onChange;
            }
          });
        }
      }), v(we, {
        get when() {
          return t() === "number" || t() === "integer";
        },
        get children() {
          return v(yn, {
            get schema() {
              return e.schema;
            },
            get value() {
              return e.value;
            },
            get onChange() {
              return e.onChange;
            }
          });
        }
      }), v(we, {
        get when() {
          return t() === "string";
        },
        get children() {
          return v(er, {
            get schema() {
              return e.schema;
            },
            get value() {
              return e.value;
            },
            get onChange() {
              return e.onChange;
            }
          });
        }
      }), v(we, {
        get when() {
          return t() === "oneOf" || t() === "anyOf";
        },
        get children() {
          return v(Yl, {
            get schema() {
              return e.schema;
            },
            get value() {
              return e.value;
            },
            get onChange() {
              return e.onChange;
            }
          });
        }
      })];
    }
  });
};
var us = /* @__PURE__ */ $("<div role=menu aria-orientation=vertical>"), ds = /* @__PURE__ */ $('<div><button type=button aria-haspopup=menu class="appearance-none bg-transparent border-none p-0 m-0 cursor-pointer">'), hs = /* @__PURE__ */ $('<span class="w-4 h-4 flex items-center justify-center opacity-70">'), gs = /* @__PURE__ */ $("<button type=button role=menuitem tabindex=-1><span>"), fs = /* @__PURE__ */ $('<hr class="my-1.5 border-t border-gray-200 dark:border-white/10">');
const Xo = (e) => {
  const [t, n] = K(!1), [r, i] = K(-1);
  let l, u;
  const a = () => e.placement ?? "bottom-start", o = _t(), s = () => e.items.map((k, _) => ({
    item: k,
    index: _
  })).filter(({
    item: k
  }) => !k.divider && !k.disabled), c = () => {
    n(!0), i(-1);
  }, g = () => {
    n(!1), i(-1);
  }, m = () => {
    t() ? g() : c();
  }, y = (k) => {
    var _;
    k.disabled || k.divider || ((_ = k.onClick) == null || _.call(k), g());
  }, b = (k) => {
    if (!t()) {
      (k.key === "Enter" || k.key === " " || k.key === "ArrowDown") && (k.preventDefault(), c());
      return;
    }
    const _ = s();
    switch (k.key) {
      case "Escape":
        k.preventDefault(), g(), l == null || l.focus();
        break;
      case "ArrowDown": {
        if (k.preventDefault(), _.length === 0)
          return;
        const f = r() === -1 ? 0 : Math.min(r() + 1, _.length - 1);
        i(f);
        break;
      }
      case "ArrowUp": {
        if (k.preventDefault(), _.length === 0)
          return;
        const f = r() === -1 ? _.length - 1 : Math.max(r() - 1, 0);
        i(f);
        break;
      }
      case "Enter":
      case " ":
        k.preventDefault(), r() >= 0 && r() < _.length && y(_[r()].item);
        break;
      case "Home":
        k.preventDefault(), _.length > 0 && i(0);
        break;
      case "End":
        k.preventDefault(), _.length > 0 && i(_.length - 1);
        break;
    }
  };
  fe(() => {
    if (!t())
      return;
    const k = (_) => {
      const f = _.target;
      u && !u.contains(f) && l && !l.contains(f) && g();
    };
    document.addEventListener("mousedown", k), ue(() => document.removeEventListener("mousedown", k));
  });
  const S = (k) => {
    const _ = s();
    return k < 0 || k >= _.length ? -1 : _[k].index;
  };
  return (() => {
    var k = ds(), _ = k.firstChild;
    _.$$keydown = b, _.$$click = m;
    var f = l;
    return typeof f == "function" ? ze(f, _) : l = _, p(_, () => e.trigger), p(k, v(E, {
      get when() {
        return t();
      },
      get children() {
        return v($t, {
          get children() {
            var h = us(), x = u;
            return typeof x == "function" ? ze(x, h) : u = h, p(h, v(Q, {
              get each() {
                return e.items;
              },
              children: (w, C) => v(E, {
                get when() {
                  return !w.divider;
                },
                get fallback() {
                  return fs();
                },
                get children() {
                  var A = gs(), P = A.firstChild;
                  return A.$$click = () => y(w), p(A, v(E, {
                    get when() {
                      return w.icon;
                    },
                    get children() {
                      var R = hs();
                      return p(R, () => w.icon), R;
                    }
                  }), P), p(P, () => w.label), I((R) => {
                    var F = `w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-left transition-colors
                      ${w.disabled ? "text-gray-400 dark:text-gray-600 cursor-not-allowed" : "text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5"}
                      ${S(r()) === C() ? "bg-black/5 dark:bg-white/5" : ""}`, N = w.disabled;
                    return F !== R.e && L(A, R.e = F), N !== R.t && (A.disabled = R.t = N), R;
                  }, {
                    e: void 0,
                    t: void 0
                  }), A;
                }
              })
            })), I((w) => {
              var C = `fixed z-50 min-w-[180px] py-1.5 glass-card rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-150 ${o() ? "dark" : ""}`, A = `${((l == null ? void 0 : l.getBoundingClientRect().bottom) ?? 0) + 4}px`, P = a().includes("start") ? `${(l == null ? void 0 : l.getBoundingClientRect().left) ?? 0}px` : void 0, R = a().includes("end") ? `${window.innerWidth - ((l == null ? void 0 : l.getBoundingClientRect().right) ?? 0)}px` : void 0;
              return C !== w.e && L(h, w.e = C), A !== w.t && _e(h, "top", w.t = A), P !== w.a && _e(h, "left", w.a = P), R !== w.o && _e(h, "right", w.o = R), w;
            }, {
              e: void 0,
              t: void 0,
              a: void 0,
              o: void 0
            }), h;
          }
        });
      }
    }), null), I((h) => {
      var x = `relative inline-block ${e.class ?? ""}`, w = t();
      return x !== h.e && L(k, h.e = x), w !== h.t && D(_, "aria-expanded", h.t = w), h;
    }, {
      e: void 0,
      t: void 0
    }), k;
  })();
};
W(["click", "keydown"]);
var ms = /* @__PURE__ */ $("<div>"), ps = /* @__PURE__ */ $('<div><button type=button aria-haspopup=true class="appearance-none bg-transparent border-none p-0 m-0 cursor-pointer">');
const Yo = (e) => {
  const t = _a(!1);
  let n, r;
  const i = _t(), l = () => e.placement ?? "bottom-start", u = () => e.open !== void 0, a = () => u() ? e.open : t.isOpen(), o = (y) => {
    var b, S;
    u() ? (b = e.onOpenChange) == null || b.call(e, y) : (y ? t.onOpen() : t.onClose(), (S = e.onOpenChange) == null || S.call(e, y));
  }, s = () => {
    o(!a());
  }, c = () => {
    o(!1);
  }, g = (y) => {
    y.key === "Escape" && a() ? (y.preventDefault(), c(), n == null || n.focus()) : (y.key === "Enter" || y.key === " ") && !a() && (y.preventDefault(), o(!0));
  };
  fe(() => {
    if (!a())
      return;
    const y = (b) => {
      const S = b.target;
      r && !r.contains(S) && n && !n.contains(S) && c();
    };
    document.addEventListener("mousedown", y), ue(() => document.removeEventListener("mousedown", y));
  });
  const m = () => {
    if (!n)
      return {};
    const y = n.getBoundingClientRect(), b = l(), S = {};
    return b.startsWith("bottom") ? S.top = `${y.bottom + 4}px` : b.startsWith("top") && (S.bottom = `${window.innerHeight - y.top + 4}px`), (b.includes("start") || b === "bottom" || b === "top") && (S.left = `${y.left}px`), b.includes("end") && (S.right = `${window.innerWidth - y.right}px`), (b === "bottom" || b === "top") && (S.left = `${y.left + y.width / 2}px`, S.transform = "translateX(-50%)"), S;
  };
  return (() => {
    var y = ps(), b = y.firstChild;
    b.$$keydown = g, b.$$click = s;
    var S = n;
    return typeof S == "function" ? ze(S, b) : n = b, p(b, () => e.trigger), p(y, v(E, {
      get when() {
        return a();
      },
      get children() {
        return v($t, {
          get children() {
            var k = ms(), _ = r;
            return typeof _ == "function" ? ze(_, k) : r = k, p(k, () => e.children), I((f) => {
              var h = `fixed z-50 glass-card rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-150 ${i() ? "dark" : ""} ${e.contentClass ?? ""}`, x = m();
              return h !== f.e && L(k, f.e = h), f.t = Dn(k, x, f.t), f;
            }, {
              e: void 0,
              t: void 0
            }), k;
          }
        });
      }
    }), null), I((k) => {
      var _ = `relative inline-block ${e.class ?? ""}`, f = a();
      return _ !== k.e && L(y, k.e = _), f !== k.t && D(b, "aria-expanded", k.t = f), k;
    }, {
      e: void 0,
      t: void 0
    }), y;
  })();
};
W(["click", "keydown"]);
var bs = /* @__PURE__ */ $('<span class="mx-2 text-gray-400 dark:text-gray-600"aria-hidden=true>/'), vs = /* @__PURE__ */ $('<span class="w-4 h-4 mr-1.5 flex items-center justify-center">'), xs = /* @__PURE__ */ $("<span>"), ks = /* @__PURE__ */ $('<span class="flex items-center text-sm font-medium text-gray-900 dark:text-white"aria-current=page>'), ys = /* @__PURE__ */ $('<a class="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">'), ws = /* @__PURE__ */ $('<button type=button class="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">'), $s = /* @__PURE__ */ $('<span class="flex items-center text-sm text-gray-500 dark:text-gray-400">'), _s = /* @__PURE__ */ $('<nav aria-label=Breadcrumb><ol class="flex items-center">'), Ss = /* @__PURE__ */ $('<li class="flex items-center">');
const Cs = () => bs(), Zo = (e) => {
  const t = (r) => r === e.items.length - 1, n = (r, i) => {
    const l = t(i), u = [v(E, {
      get when() {
        return r.icon;
      },
      get children() {
        var a = vs();
        return p(a, () => r.icon), a;
      }
    }), (() => {
      var a = xs();
      return p(a, () => r.label), a;
    })()];
    return l ? (() => {
      var a = ks();
      return p(a, u), a;
    })() : r.href ? (() => {
      var a = ys();
      return a.$$click = (o) => {
        r.onClick && (o.preventDefault(), r.onClick());
      }, p(a, u), I(() => D(a, "href", r.href)), a;
    })() : r.onClick ? (() => {
      var a = ws();
      return Be(a, "click", r.onClick, !0), p(a, u), a;
    })() : (() => {
      var a = $s();
      return p(a, u), a;
    })();
  };
  return (() => {
    var r = _s(), i = r.firstChild;
    return p(i, v(Q, {
      get each() {
        return e.items;
      },
      children: (l, u) => (() => {
        var a = Ss();
        return p(a, () => n(l, u()), null), p(a, v(E, {
          get when() {
            return !t(u());
          },
          get children() {
            return e.separator ?? v(Cs, {});
          }
        }), null), a;
      })()
    })), I(() => L(r, `flex items-center ${e.class ?? ""}`)), r;
  })();
};
W(["click"]);
var Ts = /* @__PURE__ */ $('<svg class="w-4 h-4"fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M15 19l-7-7 7-7">'), As = /* @__PURE__ */ $('<svg class="w-4 h-4"fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M9 5l7 7-7 7">'), Es = /* @__PURE__ */ $('<div class="flex items-center gap-2"><span class="text-sm text-gray-600 dark:text-gray-400">Show</span><select class="glass-input px-2 py-1 text-sm rounded-lg"></select><span class="text-sm text-gray-600 dark:text-gray-400">per page'), Rs = /* @__PURE__ */ $('<span class="text-sm text-gray-600 dark:text-gray-400">-<!> of '), Ls = /* @__PURE__ */ $('<div><div class="flex items-center gap-1"><button type=button aria-label="Previous page"></button><button type=button aria-label="Next page">'), Is = /* @__PURE__ */ $("<option>"), Os = /* @__PURE__ */ $("<button type=button>"), Ds = /* @__PURE__ */ $('<span class="w-8 h-8 flex items-center justify-center text-gray-400 dark:text-gray-600">...');
const Ms = () => Ts(), Ps = () => As(), Ko = (e) => {
  const t = [10, 20, 50, 100], n = () => e.pageSizeOptions ?? t, r = te(() => Math.ceil(e.total / e.pageSize)), i = () => e.page > 1, l = () => e.page < r(), u = () => {
    i() && e.onChange(e.page - 1);
  }, a = () => {
    l() && e.onChange(e.page + 1);
  }, o = (S) => {
    S !== e.page && e.onChange(S);
  }, s = (S) => {
    var f;
    const k = S.target, _ = Number.parseInt(k.value, 10);
    (f = e.onPageSizeChange) == null || f.call(e, _), e.onChange(1);
  }, c = te(() => {
    const S = r(), k = e.page, _ = [];
    if (S <= 7)
      for (let f = 1; f <= S; f++)
        _.push(f);
    else {
      _.push(1), k > 3 && _.push("ellipsis");
      const f = Math.max(2, k - 1), h = Math.min(S - 1, k + 1);
      for (let x = f; x <= h; x++)
        _.push(x);
      k < S - 2 && _.push("ellipsis"), S > 1 && _.push(S);
    }
    return _;
  }), g = "inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium transition-colors", m = "text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5", y = "glass-active text-gray-900 dark:text-white", b = "text-gray-300 dark:text-gray-600 cursor-not-allowed";
  return (() => {
    var S = Ls(), k = S.firstChild, _ = k.firstChild, f = _.nextSibling;
    return p(S, v(E, {
      get when() {
        return e.showPageSize;
      },
      get children() {
        var h = Es(), x = h.firstChild, w = x.nextSibling;
        return w.addEventListener("change", s), p(w, v(Q, {
          get each() {
            return n();
          },
          children: (C) => (() => {
            var A = Is();
            return A.value = C, p(A, C), A;
          })()
        })), I(() => w.value = e.pageSize), h;
      }
    }), k), _.$$click = u, p(_, v(Ms, {})), p(k, v(Q, {
      get each() {
        return c();
      },
      children: (h) => v(E, {
        when: h !== "ellipsis",
        get fallback() {
          return Ds();
        },
        get children() {
          var x = Os();
          return x.$$click = () => o(h), D(x, "aria-label", `Page ${h}`), p(x, h), I((w) => {
            var C = `${g} ${e.page === h ? y : m}`, A = e.page === h ? "page" : void 0;
            return C !== w.e && L(x, w.e = C), A !== w.t && D(x, "aria-current", w.t = A), w;
          }, {
            e: void 0,
            t: void 0
          }), x;
        }
      })
    }), f), f.$$click = a, p(f, v(Ps, {})), p(S, v(E, {
      get when() {
        return e.total > 0;
      },
      get children() {
        var h = Rs(), x = h.firstChild, w = x.nextSibling;
        return w.nextSibling, p(h, () => (e.page - 1) * e.pageSize + 1, x), p(h, () => Math.min(e.page * e.pageSize, e.total), w), p(h, () => e.total, null), h;
      }
    }), null), I((h) => {
      var x = `flex items-center gap-4 ${e.class ?? ""}`, w = !i(), C = `${g} ${i() ? m : b}`, A = !l(), P = `${g} ${l() ? m : b}`;
      return x !== h.e && L(S, h.e = x), w !== h.t && (_.disabled = h.t = w), C !== h.a && L(_, h.a = C), A !== h.o && (f.disabled = h.o = A), P !== h.i && L(f, h.i = P), h;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0,
      i: void 0
    }), S;
  })();
};
W(["click"]);
var Ns = /* @__PURE__ */ $('<svg class="w-3.5 h-3.5"fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M5 15l7-7 7 7">'), zs = /* @__PURE__ */ $('<svg class="w-3.5 h-3.5"fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M19 9l-7 7-7-7">'), Fs = /* @__PURE__ */ $('<svg class="w-3.5 h-3.5"fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4">'), Bs = /* @__PURE__ */ $("<span aria-hidden=true>"), Hs = /* @__PURE__ */ $('<div><div class=overflow-x-auto><table class=w-full><thead><tr class="border-b border-surface-200/50 dark:border-surface-700/50"></tr></thead><tbody>'), js = /* @__PURE__ */ $('<th><span class="inline-flex items-center">'), Us = /* @__PURE__ */ $('<tr><td class="px-4 py-8 text-center text-surface-500 dark:text-surface-400">'), Gs = /* @__PURE__ */ $('<tr class="border-b border-surface-100/50 dark:border-surface-800/50 last:border-b-0 hover:bg-surface-50/50 dark:hover:bg-surface-800/30 transition-colors">'), qs = /* @__PURE__ */ $("<td>");
const Ws = (e) => (() => {
  var t = Bs();
  return p(t, v(E, {
    get when() {
      return e.direction === "asc";
    },
    get children() {
      return Ns();
    }
  }), null), p(t, v(E, {
    get when() {
      return e.direction === "desc";
    },
    get children() {
      return zs();
    }
  }), null), p(t, v(E, {
    get when() {
      return !e.direction;
    },
    get children() {
      return Fs();
    }
  }), null), I(() => L(t, `ml-1 inline-flex transition-opacity ${e.active ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`)), t;
})();
function Jo(e) {
  const [t, n] = K({
    column: null,
    direction: null
  }), r = te(() => e.sort ?? t()), i = (a) => {
    const o = e.columns.find((m) => m.key === a);
    if (!(o != null && o.sortable) && !e.sortable)
      return;
    const s = r();
    let c = "asc";
    s.column === a && (s.direction === "asc" ? c = "desc" : s.direction === "desc" && (c = null));
    const g = {
      column: c ? a : null,
      direction: c
    };
    e.onSort ? e.onSort(g) : n(g);
  }, l = (a, o) => {
    const s = o.split(".");
    let c = a;
    for (const g of s)
      if (c && typeof c == "object")
        c = c[g];
      else
        return;
    return c;
  }, u = (a) => {
    switch (a) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };
  return (() => {
    var a = Hs(), o = a.firstChild, s = o.firstChild, c = s.firstChild, g = c.firstChild, m = c.nextSibling;
    return p(g, v(Q, {
      get each() {
        return e.columns;
      },
      children: (y) => {
        const b = y.sortable ?? e.sortable, S = () => r().column === y.key, k = () => S() ? r().direction : null;
        return (() => {
          var _ = js(), f = _.firstChild;
          return _.$$keydown = (h) => {
            b && (h.key === "Enter" || h.key === " ") && (h.preventDefault(), i(y.key));
          }, _.$$click = () => b && i(y.key), D(_, "tabindex", b ? 0 : void 0), p(f, () => y.header, null), p(f, v(E, {
            when: b,
            get children() {
              return v(Ws, {
                get direction() {
                  return k();
                },
                get active() {
                  return S();
                }
              });
            }
          }), null), I((h) => {
            var x = `px-4 py-3 text-xs font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-400 ${u(y.align)} ${b ? "cursor-pointer select-none group hover:text-surface-900 dark:hover:text-surface-200 transition-colors" : ""}`, w = y.width;
            return x !== h.e && L(_, h.e = x), w !== h.t && _e(_, "width", h.t = w), h;
          }, {
            e: void 0,
            t: void 0
          }), _;
        })();
      }
    })), p(m, v(E, {
      get when() {
        return e.data.length > 0;
      },
      get fallback() {
        return (() => {
          var y = Us(), b = y.firstChild;
          return p(b, () => e.emptyMessage ?? "No data available"), I(() => D(b, "colspan", e.columns.length)), y;
        })();
      },
      get children() {
        return v(Q, {
          get each() {
            return e.data;
          },
          children: (y, b) => (() => {
            var S = Gs();
            return p(S, v(Q, {
              get each() {
                return e.columns;
              },
              children: (k) => {
                const _ = l(y, k.key);
                return (() => {
                  var f = qs();
                  return p(f, v(E, {
                    get when() {
                      return k.render;
                    },
                    get fallback() {
                      return String(_ ?? "");
                    },
                    get children() {
                      var h;
                      return (h = k.render) == null ? void 0 : h.call(k, _, y, b());
                    }
                  })), I(() => L(f, `px-4 py-3 text-sm text-surface-800 dark:text-surface-200 ${u(k.align)}`)), f;
                })();
              }
            })), S;
          })()
        });
      }
    })), I(() => L(a, `glass-card rounded-xl overflow-hidden ${e.class ?? ""}`)), a;
  })();
}
W(["click", "keydown"]);
var Vs = /* @__PURE__ */ $('<div class="px-4 py-3 border-b border-surface-200/50 dark:border-surface-700/50">'), Xs = /* @__PURE__ */ $('<div class="px-4 py-3 border-t border-surface-200/50 dark:border-surface-700/50 bg-surface-50/30 dark:bg-surface-900/30">'), Ys = /* @__PURE__ */ $("<div><div class=p-4>");
const Zs = {
  default: "glass-card",
  elevated: "glass-card shadow-lg dark:shadow-2xl",
  outlined: "bg-transparent border border-surface-200 dark:border-surface-700"
}, Qo = (e) => {
  const t = () => e.variant ?? "default";
  return (() => {
    var n = Ys(), r = n.firstChild;
    return p(n, v(E, {
      get when() {
        return e.header;
      },
      get children() {
        var i = Vs();
        return p(i, () => e.header), i;
      }
    }), r), p(r, () => e.children), p(n, v(E, {
      get when() {
        return e.footer;
      },
      get children() {
        var i = Xs();
        return p(i, () => e.footer), i;
      }
    }), null), I(() => L(n, `rounded-xl overflow-hidden ${Zs[t()]} ${e.class ?? ""}`)), n;
  })();
};
var Ks = /* @__PURE__ */ $('<img class="w-full h-full object-cover">'), Js = /* @__PURE__ */ $("<div>"), Qs = /* @__PURE__ */ $("<div><span>");
const eo = {
  xs: {
    container: "w-6 h-6",
    text: "text-[0.5rem]"
  },
  sm: {
    container: "w-8 h-8",
    text: "text-xs"
  },
  md: {
    container: "w-10 h-10",
    text: "text-sm"
  },
  lg: {
    container: "w-12 h-12",
    text: "text-base"
  },
  xl: {
    container: "w-16 h-16",
    text: "text-lg"
  }
}, Yr = ["bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500", "bg-rose-500", "bg-cyan-500", "bg-fuchsia-500", "bg-lime-500"], to = (e) => {
  let t = 0;
  for (let r = 0; r < e.length; r++)
    t = e.charCodeAt(r) + ((t << 5) - t);
  const n = Math.abs(t) % Yr.length;
  return Yr[n];
}, ro = (e) => {
  const t = e.trim().split(/\s+/);
  return t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
}, ec = (e) => {
  const [t, n] = K(!1), r = () => e.size ?? "md", i = () => eo[r()], l = te(() => ro(e.name)), u = te(() => e.fallbackColor ?? to(e.name)), a = () => e.src && !t();
  return (() => {
    var o = Js();
    return p(o, v(E, {
      get when() {
        return a();
      },
      get fallback() {
        return (() => {
          var s = Qs(), c = s.firstChild;
          return p(c, l), I((g) => {
            var m = `w-full h-full flex items-center justify-center font-semibold text-white ${u()}`, y = i().text;
            return m !== g.e && L(s, g.e = m), y !== g.t && L(c, g.t = y), g;
          }, {
            e: void 0,
            t: void 0
          }), s;
        })();
      },
      get children() {
        var s = Ks();
        return s.addEventListener("error", () => n(!0)), I((c) => {
          var g = e.src, m = e.alt ?? e.name;
          return g !== c.e && D(s, "src", c.e = g), m !== c.t && D(s, "alt", c.t = m), c;
        }, {
          e: void 0,
          t: void 0
        }), s;
      }
    })), I(() => L(o, `relative inline-flex items-center justify-center rounded-full overflow-hidden border-2 border-white/30 dark:border-white/10 shadow-sm ${i().container} ${e.class ?? ""}`)), o;
  })();
};
var no = /* @__PURE__ */ $("<div aria-hidden=true>");
const ao = {
  text: "rounded",
  circular: "rounded-full",
  rectangular: "rounded-lg"
}, io = {
  text: {
    width: "100%",
    height: "1em"
  },
  circular: {
    width: "2.5rem",
    height: "2.5rem"
  },
  rectangular: {
    width: "100%",
    height: "8rem"
  }
}, tc = (e) => {
  const t = () => e.variant ?? "text", n = () => io[t()], r = () => e.width ?? n().width, i = () => e.height ?? n().height, l = () => e.rounded === !1 ? "" : ao[t()];
  return (() => {
    var u = no();
    return I((a) => {
      var o = `animate-pulse bg-surface-200/60 dark:bg-surface-700/40 ${l()} ${e.class ?? ""}`, s = r(), c = i();
      return o !== a.e && L(u, a.e = o), s !== a.t && _e(u, "width", a.t = s), c !== a.a && _e(u, "height", a.a = c), a;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    }), u;
  })();
};
var lo = /* @__PURE__ */ $('<div class="flex justify-between items-center mb-1"><span class="text-xs font-medium text-surface-600 dark:text-surface-400">%'), so = /* @__PURE__ */ $("<div><div role=progressbar aria-valuemin=0 aria-valuemax=100><div>"), oo = /* @__PURE__ */ $('<span class="absolute text-surface-700 dark:text-surface-300 font-semibold">%'), co = /* @__PURE__ */ $("<div role=progressbar aria-valuemin=0 aria-valuemax=100><svg class=-rotate-90 aria-hidden=true><circle fill=none></circle><circle fill=none stroke-linecap=round>");
const uo = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3"
}, ho = {
  sm: {
    size: 24,
    stroke: 3
  },
  md: {
    size: 40,
    stroke: 4
  },
  lg: {
    size: 56,
    stroke: 5
  }
}, go = {
  primary: {
    track: "bg-surface-200/60 dark:bg-surface-700/40",
    fill: "bg-violet-500 dark:bg-violet-400"
  },
  success: {
    track: "bg-emerald-100 dark:bg-emerald-900/30",
    fill: "bg-emerald-500 dark:bg-emerald-400"
  },
  warning: {
    track: "bg-amber-100 dark:bg-amber-900/30",
    fill: "bg-amber-500 dark:bg-amber-400"
  },
  error: {
    track: "bg-rose-100 dark:bg-rose-900/30",
    fill: "bg-rose-500 dark:bg-rose-400"
  }
}, fo = {
  primary: {
    track: "stroke-surface-200 dark:stroke-surface-700",
    fill: "stroke-violet-500 dark:stroke-violet-400"
  },
  success: {
    track: "stroke-emerald-200 dark:stroke-emerald-900",
    fill: "stroke-emerald-500 dark:stroke-emerald-400"
  },
  warning: {
    track: "stroke-amber-200 dark:stroke-amber-900",
    fill: "stroke-amber-500 dark:stroke-amber-400"
  },
  error: {
    track: "stroke-rose-200 dark:stroke-rose-900",
    fill: "stroke-rose-500 dark:stroke-rose-400"
  }
}, mo = (e) => {
  const t = () => e.size ?? "md", n = () => e.color ?? "primary", r = () => go[n()], i = () => Math.min(100, Math.max(0, e.value));
  return (() => {
    var l = so(), u = l.firstChild, a = u.firstChild;
    return p(l, v(E, {
      get when() {
        return e.showValue;
      },
      get children() {
        var o = lo(), s = o.firstChild, c = s.firstChild;
        return p(s, () => Math.round(i()), c), o;
      }
    }), u), I((o) => {
      var s = `w-full ${e.class ?? ""}`, c = `w-full rounded-full overflow-hidden ${uo[t()]} ${r().track}`, g = i(), m = `h-full rounded-full transition-all duration-300 ease-out ${r().fill}`, y = `${i()}%`;
      return s !== o.e && L(l, o.e = s), c !== o.t && L(u, o.t = c), g !== o.a && D(u, "aria-valuenow", o.a = g), m !== o.o && L(a, o.o = m), y !== o.i && _e(a, "width", o.i = y), o;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0,
      i: void 0
    }), l;
  })();
}, po = (e) => {
  const t = () => e.size ?? "md", n = () => e.color ?? "primary", r = () => ho[t()], i = () => fo[n()], l = () => Math.min(100, Math.max(0, e.value)), u = te(() => {
    const c = (r().size - r().stroke) / 2;
    return 2 * Math.PI * c;
  }), a = te(() => u() - l() / 100 * u()), o = te(() => (r().size - r().stroke) / 2), s = te(() => r().size / 2);
  return (
    // biome-ignore lint/a11y/useFocusableInteractive: Progress bars are visual indicators, not interactive
    (() => {
      var c = co(), g = c.firstChild, m = g.firstChild, y = m.nextSibling;
      return p(c, v(E, {
        get when() {
          return e.showValue;
        },
        get children() {
          var b = oo(), S = b.firstChild;
          return p(b, () => Math.round(l()), S), I((k) => _e(b, "font-size", t() === "sm" ? "0.5rem" : t() === "md" ? "0.625rem" : "0.75rem")), b;
        }
      }), null), I((b) => {
        var S = `relative inline-flex items-center justify-center ${e.class ?? ""}`, k = l(), _ = `Progress: ${Math.round(l())}%`, f = r().size, h = r().size, x = i().track, w = s(), C = s(), A = o(), P = r().stroke, R = `${i().fill} transition-all duration-300 ease-out`, F = s(), N = s(), re = o(), Se = r().stroke, Ce = `${u()}`, je = a();
        return S !== b.e && L(c, b.e = S), k !== b.t && D(c, "aria-valuenow", b.t = k), _ !== b.a && D(c, "aria-label", b.a = _), f !== b.o && D(g, "width", b.o = f), h !== b.i && D(g, "height", b.i = h), x !== b.n && D(m, "class", b.n = x), w !== b.s && D(m, "cx", b.s = w), C !== b.h && D(m, "cy", b.h = C), A !== b.r && D(m, "r", b.r = A), P !== b.d && D(m, "stroke-width", b.d = P), R !== b.l && D(y, "class", b.l = R), F !== b.u && D(y, "cx", b.u = F), N !== b.c && D(y, "cy", b.c = N), re !== b.w && D(y, "r", b.w = re), Se !== b.m && D(y, "stroke-width", b.m = Se), Ce !== b.f && D(y, "stroke-dasharray", b.f = Ce), je !== b.y && D(y, "stroke-dashoffset", b.y = je), b;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0,
        i: void 0,
        n: void 0,
        s: void 0,
        h: void 0,
        r: void 0,
        d: void 0,
        l: void 0,
        u: void 0,
        c: void 0,
        w: void 0,
        m: void 0,
        f: void 0,
        y: void 0
      }), c;
    })()
  );
}, rc = (e) => {
  const t = () => e.variant ?? "linear";
  return v(E, {
    get when() {
      return t() === "circular";
    },
    get fallback() {
      return v(mo, e);
    },
    get children() {
      return v(po, e);
    }
  });
};
var bo = /* @__PURE__ */ $('<svg fill=none viewBox="0 0 24 24"stroke=currentColor stroke-width=2 aria-hidden=true><path stroke-linecap=round stroke-linejoin=round d="M6 18L18 6M6 6l12 12">'), vo = /* @__PURE__ */ $('<button type=button class="inline-flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors -mr-0.5"aria-label=Remove>'), xo = /* @__PURE__ */ $("<span>");
const ko = {
  sm: {
    container: "px-2 py-0.5 text-xs gap-1",
    icon: "w-3 h-3"
  },
  md: {
    container: "px-2.5 py-1 text-sm gap-1.5",
    icon: "w-3.5 h-3.5"
  },
  lg: {
    container: "px-3 py-1.5 text-base gap-2",
    icon: "w-4 h-4"
  }
}, yo = {
  default: "glass-button",
  primary: "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border border-violet-200/50 dark:border-violet-700/50",
  success: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-700/50",
  warning: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-700/50",
  error: "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border border-rose-200/50 dark:border-rose-700/50"
}, wo = {
  default: "bg-transparent border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300",
  primary: "bg-transparent border border-violet-300 dark:border-violet-600 text-violet-600 dark:text-violet-400",
  success: "bg-transparent border border-emerald-300 dark:border-emerald-600 text-emerald-600 dark:text-emerald-400",
  warning: "bg-transparent border border-amber-300 dark:border-amber-600 text-amber-600 dark:text-amber-400",
  error: "bg-transparent border border-rose-300 dark:border-rose-600 text-rose-600 dark:text-rose-400"
}, $o = (e) => (() => {
  var t = bo();
  return I(() => D(t, "class", e.class)), t;
})(), nc = (e) => {
  const t = () => e.variant ?? "filled", n = () => e.color ?? "default", r = () => e.size ?? "md", i = () => ko[r()], l = () => (t() === "filled" ? yo : wo)[n()], u = (a) => {
    var o;
    a.stopPropagation(), (o = e.onRemove) == null || o.call(e);
  };
  return (() => {
    var a = xo();
    return p(a, () => e.children, null), p(a, v(E, {
      get when() {
        return $e(() => !!e.onRemove)() && !e.disabled;
      },
      get children() {
        var o = vo();
        return o.$$click = u, p(o, v($o, {
          get class() {
            return i().icon;
          }
        })), o;
      }
    }), null), I(() => L(a, `inline-flex items-center rounded-full font-medium transition-all ${i().container} ${l()} ${e.disabled ? "opacity-50 cursor-not-allowed" : ""} ${e.class ?? ""}`)), a;
  })();
};
W(["click"]);
export {
  Bo as Accordion,
  Ho as AccordionPanel,
  Ro as Alert,
  cs as ArrayField,
  ec as Avatar,
  Eo as Badge,
  wn as BooleanField,
  Zo as Breadcrumb,
  Ao as Button,
  Qo as Card,
  ea as Checkbox,
  nc as Chip,
  Uo as CodeBlock,
  Io as Dialog,
  Oo as Drawer,
  Yo as Dropdown,
  $n as EnumField,
  Vo as ErrorDisplay,
  Qr as Input,
  tr as JsonSchemaForm,
  Go as JsonViewer,
  qo as Markdown,
  Xo as Menu,
  Lo as Modal,
  yn as NumberField,
  ns as ObjectField,
  Yl as OneOfField,
  Ko as Pagination,
  rc as Progress,
  Xr as SchemaField,
  Wo as Section,
  jo as SegmentedControl,
  Kn as Select,
  tc as Skeleton,
  No as Snackbar,
  zn as Spinner,
  er as StringField,
  Jo as Table,
  Fo as Tabs,
  en as Textarea,
  Po as ToastContainer,
  zo as Tooltip,
  Mo as clearToasts,
  rn as dismissToast,
  kn as getDefaultValue,
  hr as toDisplayString,
  Wl as toDisplayStringJson,
  Do as toast,
  tn as useCopyToClipboard,
  $a as useDialogState,
  _a as useDisclosure,
  _t as useIsDark
};
//# sourceMappingURL=index.js.map
