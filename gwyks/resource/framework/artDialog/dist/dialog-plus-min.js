/*! artDialog v6.0.5 | https://github.com/aui/artDialog */ ! function() {
    function a(b) {
        var d = c[b],
            e = "exports";
        return "object" == typeof d ? d : (d[e] || (d[e] = {}, d[e] = d.call(d[e], a, d[e], d) || d[e]), d[e])
    }

    function b(a, b) {
        c[a] = b
    }
    var c = {};
    b("jquery", function() {
        return jQuery
    }), b("popup", function(a) {
        function b() {
            this.destroyed = !1, this.__popup = c("<div />").css({
                display: "none",
                position: "absolute",
                outline: 0
            }).attr("tabindex", "-1").html(this.innerHTML).appendTo("body"), this.__backdrop = this.__mask = c("<div />").css({
                opacity: .7,
                background: "#000"
            }), this.node = this.__popup[0], this.backdrop = this.__backdrop[0], d++
        }
        var c = a("jquery"),
            d = 0,
            e = !("minWidth" in c("html")[0].style),
            f = !e;
        return c.extend(b.prototype, {
            node: null,
            backdrop: null,
            fixed: !1,
            destroyed: !0,
            open: !1,
            returnValue: "",
            autofocus: !0,
            align: "bottom left",
            innerHTML: "",
            className: "ui-popup",
            show: function(a) {
                if (this.destroyed) return this;
                var d = this.__popup,
                    g = this.__backdrop;
                if (this.__activeElement = this.__getActive(), this.open = !0, this.follow = a || this.follow, !this.__ready) {
                    if (d.addClass(this.className).attr("role", this.modal ? "alertdialog" : "dialog").css("position", this.fixed ? "fixed" : "absolute"), e || c(window).on("resize", c.proxy(this.reset, this)), this.modal) {
                        var h = {
                            position: "fixed",
                            left: 0,
                            top: 0,
                            width: "100%",
                            height: "100%",
                            overflow: "hidden",
                            userSelect: "none",
                            zIndex: this.zIndex || b.zIndex
                        };
                        d.addClass(this.className + "-modal"), f || c.extend(h, {
                            position: "absolute",
                            width: c(window).width() + "px",
                            height: c(document).height() + "px"
                        }), g.css(h).attr({
                            tabindex: "0"
                        }).on("focus", c.proxy(this.focus, this)), this.__mask = g.clone(!0).attr("style", "").insertAfter(d), g.addClass(this.className + "-backdrop").insertBefore(d), this.__ready = !0
                    }
                    d.html() || d.html(this.innerHTML)
                }
                return d.addClass(this.className + "-show").show(), g.show(), this.reset().focus(), this.__dispatchEvent("show"), this
            },
            showModal: function() {
                return this.modal = !0, this.show.apply(this, arguments)
            },
            close: function(a) {
                return !this.destroyed && this.open && (void 0 !== a && (this.returnValue = a), this.__popup.hide().removeClass(this.className + "-show"), this.__backdrop.hide(), this.open = !1, this.blur(), this.__dispatchEvent("close")), this
            },
            remove: function() {
                if (this.destroyed) return this;
                this.__dispatchEvent("beforeremove"), b.current === this && (b.current = null), this.__popup.remove(), this.__backdrop.remove(), this.__mask.remove(), e || c(window).off("resize", this.reset), this.__dispatchEvent("remove");
                for (var a in this) delete this[a];
                return this
            },
            reset: function() {
                var a = this.follow;
                return a ? this.__follow(a) : this.__center(), this.__dispatchEvent("reset"), this
            },
            focus: function() {
                var a = this.node,
                    d = this.__popup,
                    e = b.current,
                    f = this.zIndex = b.zIndex++;
                if (e && e !== this && e.blur(!1), !c.contains(a, this.__getActive())) {
                    var g = d.find("[autofocus]")[0];
                    !this._autofocus && g ? this._autofocus = !0 : g = a, this.__focus(g)
                }
                return d.css("zIndex", f), b.current = this, d.addClass(this.className + "-focus"), this.__dispatchEvent("focus"), this
            },
            blur: function() {
                var a = this.__activeElement,
                    b = arguments[0];
                return b !== !1 && this.__focus(a), this._autofocus = !1, this.__popup.removeClass(this.className + "-focus"), this.__dispatchEvent("blur"), this
            },
            addEventListener: function(a, b) {
                return this.__getEventListener(a).push(b), this
            },
            removeEventListener: function(a, b) {
                for (var c = this.__getEventListener(a), d = 0; d < c.length; d++) b === c[d] && c.splice(d--, 1);
                return this
            },
            __getEventListener: function(a) {
                var b = this.__listener;
                return b || (b = this.__listener = {}), b[a] || (b[a] = []), b[a]
            },
            __dispatchEvent: function(a) {
                var b = this.__getEventListener(a);
                this["on" + a] && this["on" + a]();
                for (var c = 0; c < b.length; c++) b[c].call(this)
            },
            __focus: function(a) {
                try {
                    this.autofocus && !/^iframe$/i.test(a.nodeName) && a.focus()
                } catch (b) {}
            },
            __getActive: function() {
                try {
                    var a = document.activeElement,
                        b = a.contentDocument,
                        c = b && b.activeElement || a;
                    return c
                } catch (d) {}
            },
            __center: function() {
                var a = this.__popup,
                    b = c(window),
                    d = c(document),
                    e = this.fixed,
                    f = e ? 0 : d.scrollLeft(),
                    g = e ? 0 : d.scrollTop(),
                    h = b.width(),
                    i = b.height(),
                    j = a.width(),
                    k = a.height(),
                    l = (h - j) / 2 + f,
                    m = 382 * (i - k) / 1e3 + g,
                    n = a[0].style;
                n.left = Math.max(parseInt(l), f) + "px", n.top = Math.max(parseInt(m), g) + "px"
            },
            __follow: function(a) {
                var b = a.parentNode && c(a),
                    d = this.__popup;
                if (this.__followSkin && d.removeClass(this.__followSkin), b) {
                    var e = b.offset();
                    if (e.left * e.top < 0) return this.__center()
                }
                var f = this,
                    g = this.fixed,
                    h = c(window),
                    i = c(document),
                    j = h.width(),
                    k = h.height(),
                    l = i.scrollLeft(),
                    m = i.scrollTop(),
                    n = d.width(),
                    o = d.height(),
                    p = b ? b.outerWidth() : 0,
                    q = b ? b.outerHeight() : 0,
                    r = this.__offset(a),
                    s = r.left,
                    t = r.top,
                    u = g ? s - l : s,
                    v = g ? t - m : t,
                    w = g ? 0 : l,
                    x = g ? 0 : m,
                    y = w + j - n,
                    z = x + k - o,
                    A = {},
                    B = this.align.split(" "),
                    C = this.className + "-",
                    D = {
                        top: "bottom",
                        bottom: "top",
                        left: "right",
                        right: "left"
                    },
                    E = {
                        top: "top",
                        bottom: "top",
                        left: "left",
                        right: "left"
                    },
                    F = [{
                        top: v - o,
                        bottom: v + q,
                        left: u - n,
                        right: u + p
                    }, {
                        top: v,
                        bottom: v - o + q,
                        left: u,
                        right: u - n + p
                    }],
                    G = {
                        left: u + p / 2 - n / 2,
                        top: v + q / 2 - o / 2
                    },
                    H = {
                        left: [w, y],
                        top: [x, z]
                    };
                c.each(B, function(a, b) {
                    F[a][b] > H[E[b]][1] && (b = B[a] = D[b]), F[a][b] < H[E[b]][0] && (B[a] = D[b])
                }), B[1] || (E[B[1]] = "left" === E[B[0]] ? "top" : "left", F[1][B[1]] = G[E[B[1]]]), C += B.join("-") + " " + this.className + "-follow", f.__followSkin = C, b && d.addClass(C), A[E[B[0]]] = parseInt(F[0][B[0]]), A[E[B[1]]] = parseInt(F[1][B[1]]), d.css(A)
            },
            __offset: function(a) {
                var b = a.parentNode,
                    d = b ? c(a).offset() : {
                        left: a.pageX,
                        top: a.pageY
                    };
                a = b ? a : a.target;
                var e = a.ownerDocument,
                    f = e.defaultView || e.parentWindow;
                if (f == window) return d;
                var g = f.frameElement,
                    h = c(e),
                    i = h.scrollLeft(),
                    j = h.scrollTop(),
                    k = c(g).offset(),
                    l = k.left,
                    m = k.top;
                return {
                    left: d.left + l - i,
                    top: d.top + m - j
                }
            }
        }), b.zIndex = 1024, b.current = null, b
    }), b("dialog-config", {
        backdropBackground: "#000",
        backdropOpacity: .7,
        content: '<span class="ui-dialog-loading">加载中...</span>',
        title: "",
        statusbar: "",
        button: null,
        ok: null,
        cancel: null,
        okValue: "ok",
        cancelValue: "cancel",
        cancelDisplay: !0,
        width: "",
        height: "",
        padding: "",
        skin: "",
        quickClose: !1,
        cssUri: "../css/ui-dialog.css",
        innerHTML: '<div i="dialog" class="ui-dialog"><div class="ui-dialog-arrow-a"></div><div class="ui-dialog-arrow-b"></div><table class="ui-dialog-grid"><tr><td i="header" class="ui-dialog-header"><button i="close" class="ui-dialog-close">&#215;</button><div i="title" class="ui-dialog-title"></div></td></tr><tr><td i="body" class="ui-dialog-body"><div i="content" class="ui-dialog-content"></div></td></tr><tr><td i="footer" class="ui-dialog-footer"><div i="statusbar" class="ui-dialog-statusbar"></div><div i="button" class="ui-dialog-button"></div></td></tr></table></div>'
    }), b("dialog", function(a) {
        var b = a("jquery"),
            c = a("popup"),
            d = a("dialog-config"),
            e = d.cssUri;
        if (e) {
            var f = a[a.toUrl ? "toUrl" : "resolve"];
            f && (e = f(e), e = '<link rel="stylesheet" href="' + e + '" />', b("base")[0] ? b("base").before(e) : b("head").append(e))
        }
        var g = 0,
            h = new Date - 0,
            i = !("minWidth" in b("html")[0].style),
            j = "createTouch" in document && !("onmousemove" in document) || /(iPhone|iPad|iPod)/i.test(navigator.userAgent),
            k = !i && !j,
            l = function(a, c, d) {
                var e = a = a || {};
                ("string" == typeof a || 1 === a.nodeType) && (a = {
                    content: a,
                    fixed: !j
                }), a = b.extend(!0, {}, l.defaults, a), a.original = e;
                var f = a.id = a.id || h + g,
                    i = l.get(f);
                return i ? i.focus() : (k || (a.fixed = !1), a.quickClose && (a.modal = !0, a.backdropOpacity = 0), b.isArray(a.button) || (a.button = []), void 0 !== d && (a.cancel = d), a.cancel && a.button.push({
                    id: "cancel",
                    value: a.cancelValue,
                    callback: a.cancel,
                    display: a.cancelDisplay
                }), void 0 !== c && (a.ok = c), a.ok && a.button.push({
                    id: "ok",
                    value: a.okValue,
                    callback: a.ok,
                    autofocus: !0
                }), l.list[f] = new l.create(a))
            },
            m = function() {};
        m.prototype = c.prototype;
        var n = l.prototype = new m;
        return l.create = function(a) {
            var d = this;
            b.extend(this, new c);
            var e = (a.original, b(this.node).html(a.innerHTML)),
                f = b(this.backdrop);
            return this.options = a, this._popup = e, b.each(a, function(a, b) {
                "function" == typeof d[a] ? d[a](b) : d[a] = b
            }), a.zIndex && (c.zIndex = a.zIndex), e.attr({
                "aria-labelledby": this._$("title").attr("id", "title:" + this.id).attr("id"),
                "aria-describedby": this._$("content").attr("id", "content:" + this.id).attr("id")
            }), this._$("close").css("display", this.cancel === !1 ? "none" : "").attr("title", this.cancelValue).on("click", function(a) {
                d._trigger("cancel"), a.preventDefault()
            }), this._$("dialog").addClass(this.skin), this._$("body").css("padding", this.padding), a.quickClose && f.on("onmousedown" in document ? "mousedown" : "click", function() {
                return d._trigger("cancel"), !1
            }), this.addEventListener("show", function() {
                f.css({
                    opacity: 0,
                    background: a.backdropBackground
                }).animate({
                    opacity: a.backdropOpacity
                }, 150)
            }), this._esc = function(a) {
                var b = a.target,
                    e = b.nodeName,
                    f = /^input|textarea$/i,
                    g = c.current === d,
                    h = a.keyCode;
                !g || f.test(e) && "button" !== b.type || 27 === h && d._trigger("cancel")
            }, b(document).on("keydown", this._esc), this.addEventListener("remove", function() {
                b(document).off("keydown", this._esc), delete l.list[this.id]
            }), g++, l.oncreate(this), this
        }, l.create.prototype = n, b.extend(n, {
            content: function(a) {
                var c = this._$("content");
                return "object" == typeof a ? (a = b(a), c.empty("").append(a.show()), this.addEventListener("beforeremove", function() {
                    b("body").append(a.hide())
                })) : c.html(a), this.reset()
            },
            title: function(a) {
                return this._$("title").text(a), this._$("header")[a ? "show" : "hide"](), this
            },
            width: function(a) {
                return this._$("content").css("width", a), this.reset()
            },
            height: function(a) {
                return this._$("content").css("height", a), this.reset()
            },
            button: function(a) {
                a = a || [];
                var c = this,
                    d = "",
                    e = 0;
                return this.callbacks = {}, "string" == typeof a ? (d = a, e++) : b.each(a, function(a, f) {
                    var g = f.id = f.id || f.value,
                        h = "";
                    c.callbacks[g] = f.callback, f.display === !1 ? h = ' style="display:none"' : e++, d += '<button type="button" i-id="' + g + '"' + h + (f.disabled ? " disabled" : "") + (f.autofocus ? ' autofocus class="ui-dialog-autofocus"' : "") + ">" + f.value + "</button>", c._$("button").on("click", "[i-id=" + g + "]", function(a) {
                        var d = b(this);
                        d.attr("disabled") || c._trigger(g), a.preventDefault()
                    })
                }), this._$("button").html(d), this._$("footer")[e ? "show" : "hide"](), this
            },
            statusbar: function(a) {
                return this._$("statusbar").html(a)[a ? "show" : "hide"](), this
            },
            _$: function(a) {
                return this._popup.find("[i=" + a + "]")
            },
            _trigger: function(a) {
                var b = this.callbacks[a];
                return "function" != typeof b || b.call(this) !== !1 ? this.close().remove() : this
            }
        }), l.oncreate = b.noop, l.getCurrent = function() {
            return c.current
        }, l.get = function(a) {
            return void 0 === a ? l.list : l.list[a]
        }, l.list = {}, l.defaults = d, l
    }), b("drag", function(a) {
        var b = a("jquery"),
            c = b(window),
            d = b(document),
            e = "createTouch" in document,
            f = document.documentElement,
            g = !("minWidth" in f.style),
            h = !g && "onlosecapture" in f,
            i = "setCapture" in f,
            j = {
                start: e ? "touchstart" : "mousedown",
                over: e ? "touchmove" : "mousemove",
                end: e ? "touchend" : "mouseup"
            },
            k = e ? function(a) {
                return a.touches || (a = a.originalEvent.touches.item(0)), a
            } : function(a) {
                return a
            },
            l = function() {
                this.start = b.proxy(this.start, this), this.over = b.proxy(this.over, this), this.end = b.proxy(this.end, this), this.onstart = this.onover = this.onend = b.noop
            };
        return l.types = j, l.prototype = {
            start: function(a) {
                return a = this.startFix(a), d.on(j.over, this.over).on(j.end, this.end), this.onstart(a), !1
            },
            over: function(a) {
                return a = this.overFix(a), this.onover(a), !1
            },
            end: function(a) {
                return a = this.endFix(a), d.off(j.over, this.over).off(j.end, this.end), this.onend(a), !1
            },
            startFix: function(a) {
                return a = k(a), this.target = b(a.target), this.selectstart = function() {
                    return !1
                }, d.on("selectstart", this.selectstart).on("dblclick", this.end), h ? this.target.on("losecapture", this.end) : c.on("blur", this.end), i && this.target[0].setCapture(), a
            },
            overFix: function(a) {
                return a = k(a)
            },
            endFix: function(a) {
                return a = k(a), d.off("selectstart", this.selectstart).off("dblclick", this.end), h ? this.target.off("losecapture", this.end) : c.off("blur", this.end), i && this.target[0].releaseCapture(), a
            }
        }, l.create = function(a, e) {
            var f, g, h, i, j = b(a),
                k = new l,
                m = l.types.start,
                n = function() {},
                o = a.className.replace(/^\s|\s.*/g, "") + "-drag-start",
                p = {
                    onstart: n,
                    onover: n,
                    onend: n,
                    off: function() {
                        j.off(m, k.start)
                    }
                };
            return k.onstart = function(b) {
                var e = "fixed" === j.css("position"),
                    k = d.scrollLeft(),
                    l = d.scrollTop(),
                    m = j.width(),
                    n = j.height();
                f = 0, g = 0, h = e ? c.width() - m + f : d.width() - m, i = e ? c.height() - n + g : d.height() - n;
                var q = j.offset(),
                    r = this.startLeft = e ? q.left - k : q.left,
                    s = this.startTop = e ? q.top - l : q.top;
                this.clientX = b.clientX, this.clientY = b.clientY, j.addClass(o), p.onstart.call(a, b, r, s)
            }, k.onover = function(b) {
                var c = b.clientX - this.clientX + this.startLeft,
                    d = b.clientY - this.clientY + this.startTop,
                    e = j[0].style;
                c = Math.max(f, Math.min(h, c)), d = Math.max(g, Math.min(i, d)), e.left = c + "px", e.top = d + "px", p.onover.call(a, b, c, d)
            }, k.onend = function(b) {
                var c = j.position(),
                    d = c.left,
                    e = c.top;
                j.removeClass(o), p.onend.call(a, b, d, e)
            }, k.off = function() {
                j.off(m, k.start)
            }, e ? k.start(e) : j.on(m, k.start), p
        }, l
    }), b("dialog-plus", function(a) {
        var b = a("jquery"),
            c = a("dialog"),
            d = a("drag");
        return c.oncreate = function(a) {
            var c, e = a.options,
                f = e.original,
                g = e.url,
                h = e.oniframeload;
            if (g && (this.padding = e.padding = 0, c = b("<iframe />"), c.attr({
                    src: g,
                    name: a.id,
                    width: "100%",
                    height: "100%",
                    allowtransparency: "yes",
                    frameborder: "no",
                    scrolling: "no"
                }).on("load", function() {
                    var b;
                    try {
                        b = c[0].contentWindow.frameElement
                    } catch (d) {}
                    b && (e.width || a.width(c.contents().width()), e.height || a.height(c.contents().height())), h && h.call(a)
                }), a.addEventListener("beforeremove", function() {
                    c.attr("src", "about:blank").remove()
                }, !1), a.content(c[0]), a.iframeNode = c[0]), !(f instanceof Object))
                for (var i = function() {
                        a.close().remove()
                    }, j = 0; j < frames.length; j++) try {
                    if (f instanceof frames[j].Object) {
                        b(frames[j]).one("unload", i);
                        break
                    }
                } catch (k) {}
            b(a.node).on(d.types.start, "[i=title]", function(b) {
                a.follow || (a.focus(), d.create(a.node, b))
            })
        }, c.get = function(a) {
            if (a && a.frameElement) {
                var b, d = a.frameElement,
                    e = c.list;
                for (var f in e)
                    if (b = e[f], b.node.getElementsByTagName("iframe")[0] === d) return b
            } else if (a) return c.list[a]
        }, c
    }), window.dialog = a("dialog-plus")
}();