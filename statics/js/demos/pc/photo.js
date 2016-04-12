function Drag() {
    this.initialize.apply(this, arguments)
}
Drag.prototype = {
    initialize: function(b, a) {
        this.element = this.getElem(b);
        this._x = this._y = 0;
        this._moveDrag = this.bind(this, this.moveDrag);
        this._stopDrag = this.bind(this, this.stopDrag);
        this.setOptions(a);
        this.handle = this.getElem(this.options.handle);
        this.onStart = this.options.onStart;
        this.onMove = this.options.onMove;
        this.onStop = this.options.onStop;
        this.handle.style.cursor = "move";
        this.changeLayout();
        if (!this.isMobile()) {
            this.addHandler(this.handle, "mousedown", this.bind(this, this.startDrag))
        } else {
            this.addHandler(this.handle, "touchstart", this.bind(this, this.startDrag))
        }
    },
    isMobile: function() {
        return ("ontouchstart" in document.documentElement)
    },
    xInRange: function(c) {
        var e = this,
            b = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth) - 24,
            d = e.element.offsetWidth,
            f = 0,
            a = b - d;
        if (c >= f && c < a) {
            return true
        } else {
            return false
        }
    },
    yInRange: function(b) {
        var e = this,
            d = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight),
            f = e.element.offsetHeight,
            c = 0,
            a = d - f;
        if (b >= c && b < a) {
            return true
        } else {
            return false
        }
    },
    getClient: function(c) {
        var b, a;
        this.isMobile() ? b = c.targetTouches[0].pageX : b = c.clientX;
        this.isMobile() ? a = c.targetTouches[0].pageY : a = c.clientY;
        return {
            clientX: b,
            clientY: a
        }
    },
    changeLayout: function() {
        this.element.style.top = this.element.offsetTop + "px";
        this.element.style.left = this.element.offsetLeft + "px";
        this.element.style.position = "absolute";
        this.element.style.margin = "0"
    },
    startDrag: function(a) {
        var a = this.getEvent(a);
        this._x = this.getClient(a).clientX - this.element.offsetLeft;
        this._y = this.getClient(a).clientY - this.element.offsetTop;
        if (!this.isMobile()) {
            this.addHandler(document, "mousemove", this._moveDrag);
            this.addHandler(document, "mouseup", this._stopDrag)
        } else {
            this.addHandler(document, "touchmove", this._moveDrag);
            this.addHandler(document, "touchend", this._stopDrag)
        }
        this.preventDefault(a);
        this.handle.setCapture && this.handle.setCapture();
        this.onStart()
    },
    moveDrag: function(d) {
        var c = this;
        var d = c.getEvent(d);
        var f = c.getClient(d).clientY - c._y;
        var e = c.getClient(d).clientX - c._x;
        var b = c.xInRange(e);
        var a = c.yInRange(f);
        if (b) {
            c.element.style.left = e + "px"
        }
        if (a) {
            c.element.style.top = f + "px"
        }
        (b || a) && c.onMove()
    },
    stopDrag: function() {
        if (!this.isMobile()) {
            this.removeHandler(document, "mousemove", this._moveDrag);
            this.removeHandler(document, "mouseup", this._stopDrag)
        } else {
            this.removeHandler(document, "touchmove", this._moveDrag);
            this.removeHandler(document, "touchend", this._stopDrag)
        }
        this.handle.releaseCapture && this.handle.releaseCapture();
        this.onStop()
    },
    setOptions: function(a) {
        this.options = {
            handle: this.element,
            onStart: function() {},
            onMove: function() {},
            onStop: function() {}
        };
        for (var b in a) {
            this.options[b] = a[b]
        }
    },
    getElem: function(a) {
        return typeof a === "string" ? document.getElementById(a) : a
    },
    addHandler: function(b, a, c) {
        if (b.addEventListener) {
            return b.addEventListener(a, c, false)
        } else {
            return b.attachEvent("on" + a, c)
        }
    },
    removeHandler: function(b, a, c) {
        if (b.removeEventListener) {
            return b.removeEventListener(a, c, false)
        } else {
            return b.detachEvent("on" + a, c)
        }
    },
    getEvent: function(a) {
        return a || window.event
    },
    preventDefault: function(a) {
        if (a.preventDefault) {
            a.preventDefault()
        } else {
            a.returnValue = false
        }
    },
    bind: function(b, a) {
        return function() {
            return a.apply(b, arguments)
        }
    }
};



var passport = passport || window.passport || {};
passport.setportrait = passport.setportrait || {};
(function(g) {
    var d = {};
    (function(j) {
        var k = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");
        j.trim = function(l) {
            return String(l).replace(k, "")
        };
        j.getUniqueId = function(l) {
            return l + Math.floor(Math.random() * 2147483648).toString(36)
        };
        j.g = function(l) {
            if (!l) {
                return null
            }
            if ("string" == typeof l || l instanceof String) {
                return document.getElementById(l)
            } else {
                if (l.nodeName && (l.nodeType == 1 || l.nodeType == 9)) {
                    return l
                }
            }
            return null
        };
        j.getParent = function(l) {
            l = j.g(l);
            return l.parentElement || l.parentNode || null
        };
        j.encodeHTML = function(l) {
            return String(l).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
        };
        j.array = j.array || {};
        j.array.indexOf = function(p, m, o) {
            var l = p.length,
                n = m;
            o = o | 0;
            if (o < 0) {
                o = Math.max(0, l + o)
            }
            for (; o < l; o++) {
                if (o in p && p[o] === m) {
                    return o
                }
            }
            return -1
        };
        j.array.contains = function(l, m) {
            return (baidu.array.indexOf(l, m) >= 0)
        };
        j.browser = j.browser || {};
        j.browser.opera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent) ? +(RegExp["\x246"] || RegExp["\x242"]) : undefined;
        j.insertHTML = function(o, l, n) {
            o = j.g(o);
            var m, p;
            if (o.insertAdjacentHTML && !j.browser.opera) {
                o.insertAdjacentHTML(l, n)
            } else {
                m = o.ownerDocument.createRange();
                l = l.toUpperCase();
                if (l == "AFTERBEGIN" || l == "BEFOREEND") {
                    m.selectNodeContents(o);
                    m.collapse(l == "AFTERBEGIN")
                } else {
                    p = l == "BEFOREBEGIN";
                    m[p ? "setStartBefore" : "setEndAfter"](o);
                    m.collapse(p)
                }
                m.insertNode(m.createContextualFragment(n))
            }
            return o
        };
        j.format = function(n, l) {
            n = String(n);
            var m = Array.prototype.slice.call(arguments, 1),
                o = Object.prototype.toString;
            if (m.length) {
                m = m.length == 1 ? (l !== null && (/\[object Array\]|\[object Object\]/.test(o.call(l))) ? l : m) : m;
                return n.replace(/#\{(.+?)\}/g, function(p, r) {
                    var q = m[r];
                    if ("[object Function]" == o.call(q)) {
                        q = q(r)
                    }
                    return ("undefined" == typeof q ? "" : q)
                })
            }
            return n
        };
        j.on = function(n, l, m) {
            if (n.addEventListener) {
                n.addEventListener(l, m, false)
            } else {
                if (n.attachEvent) {
                    n.attachEvent("on" + l, m)
                } else {
                    n["on" + l] = m
                }
            }
        };
        j.off = function(m, l, n) {
            if (m.removeEventListener) {
                m.removeEventListener(l, func, false)
            } else {
                if (m.detachEvent) {
                    m.detachEvent("on" + l, func)
                } else {
                    m["on" + l] = null
                }
            }
        };
        j.addClass = function(s, r) {
            element = j.g(s);
            var n = r.split(/\s+/),
                m = element.className,
                q = " " + m + " ",
                p = 0,
                o = n.length;
            for (; p < o; p++) {
                if (q.indexOf(" " + n[p] + " ") < 0) {
                    m += (m ? " " : "") + n[p]
                }
            }
            element.className = m;
            return element
        };
        j.removeClass = function(r, q) {
            element = j.g(r);
            var o = element.className.split(/\s+/),
                s = q.split(/\s+/),
                m, l = s.length,
                n, p = 0;
            for (; p < l; ++p) {
                for (n = 0,
                    m = o.length; n < m; ++n) {
                    if (o[n] == s[p]) {
                        o.splice(n, 1);
                        break
                    }
                }
            }
            element.className = o.join(" ");
            return element
        };
        j.hasClass = function(m, l) {
            if (!m) {
                return false
            }
            return m.className.indexOf(l) >= 0
        }
    })(d);
    var i = {
        "http:": "http://himg.baidu.com/",
        "https:": "https://passport.baidu.com/"
    };
    var h = (window.location ? window.location.protocol.toLowerCase() : document.location.protocol.toLowerCase());
    var f = i[h];
    var c = {
        PORTRAIT_WRAPPER: "passPortraitWrapper",
        PORTRAIT_DIALOG: "passPortraitDialog",
        PORTRAIT_CROP: "passPortraitCrop",
        CROP_IMG: "cropImg",
        PORTRAIT_RECHOICE_BTN: "passPortraitRechoicebtn",
        PORTRAIT_PROMPT: "passPortraitPrompt",
        HIDE_CLASS: "pass-portrait-hide",
        SAVE_PORTRAIT: "savePortrait"
    };
    var b = {
        "0": "成功更新头像",
        "1": "更新头像失败",
        "2": "请选择裁剪区域",
        "3": "请登录百度账号",
        "200007": "请登录百度账号",
        "4": "请上传正确格式图片",
        errnoErrno: 5,
        successErrno: 0,
        errnoPortraitMsg: "更新头像失败",
        errImgMsg: "请上传正确格式图片",
        errCropMsg: "请选择裁剪区域",
        errUploadMsg: "上传失败"
    };
    var e = (h == "http:") ? "http://himg.bdimg.com/" : "https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/";
    var a = function(j) {
        this.prefix = j.prefix || "";
        this.portraitType = j.portraitType || 0;
        this.wrapper = j.wrapper || document.body;
        this.rendId = j.rendId;
        this.staticpage = j.staticpage || (h + "//passport.baidu.com/v3Jump.html");
        this.previewDoamin = j.previewDoamin || e;
        this.recomNum = j.recomNum || 5;
        this.historyLen = j.historyLen || 3;
        this.portraitVars = j.portraitVars || {};
        this.isDrag = j.isDrag;
        this.onSaveSuccess = j.onSaveSuccess || function() {};
        this.onSaveError = j.onSaveError || function() {};
        this.onShow = j.onShow || function() {};
        this.onHide = j.onHide || function() {}
    };
    a.prototype = {
        init: function(k) {
            var m = this,
                j = document.createElement("div"),
                l = k ? m._initDialogTpl() : m._initEmbedTpl();
            j.setAttribute("id", c.PORTRAIT_WRAPPER);
            j.innerHTML = l;
            m._getHistory();
            m._getRecommend();
            m.wrapper.appendChild(j)
        },
        addEvents: function(j) {
            var m = this;
            if (j) {
                if (typeof(m.rendId) == "undefined") {
                    m._showPortraitDialog();
                    m._setDialogCenter();
                    if (!m._isMobile() && m.isDrag || typeof(m.isDrag) == "undefined") {
                        m._dragPortraitDialog()
                    }
                    m._winResize()
                } else {
                    d.on(d.g(m.rendId), "click", function() {
                        m._showPortraitDialog();
                        m._setDialogCenter();
                        if (!m._isMobile() && m.isDrag || typeof(m.isDrag) == "undefined") {
                            m._dragPortraitDialog()
                        }
                        m._winResize()
                    })
                }
                m._closePortraitDialog("portraitDialogClose")
            }
            m._bindPorTypeEvent();
            var l = d.g("fileImg");
            if (l) {
                $(l).on("change", function() {
                    m._uploadImg("fileImg")
                });
                m._mouseOverStyle(l, d.g("openImgBtn"), "pass-portrait-filebtn-hover");
                m._mouseOutStyle(l, d.g("openImgBtn"), "pass-portrait-filebtn-hover")
            }
            var k = d.g("fileReImg");
            if (k) {
                $(k).on("change", function() {
                    m._uploadImg("fileReImg")
                });
                m._mouseOverStyle(k, d.g("passPortraitRechoicebtn"), "pass-portrait-cancelbtn-hover");
                m._mouseOutStyle(k, d.g("passPortraitRechoicebtn"), "pass-portrait-cancelbtn-hover")
            }
            m._savePortrait()
        },
        _initEmbedTpl: function() {
            var j = this,
                k = [];
            k.push('<div class="pass-portrait">');
            k.push('<ul class="pass-portrait-nav" id="passPortraitNav">');
            k.push('<li class="pass-portrait-current" id="portraitCustomLi"><span>自定义头像</span></li>');
            k.push('<li class="pass-portrait-navright" id="portraitHotrecomLi"><span>热门推荐头像</span></li></ul>');
            k.push('<div class="pass-portrait-content pass-portrait-clearfix"><div class="pass-portrait-left">');
            k.push(j._initMainTpl() + j._initHiddenTpl() + j._initSaveTpl(0) + "</div>");
            k.push(j._initPreviewTpl() + "</div>");
            return k.join("")
        },
        _initDialogTpl: function() {
            var k = this,
                j = [];
            j.push('<div class="portrait-dialog-status ' + c.HIDE_CLASS + '" id="' + c.PORTRAIT_PROMPT + '"><span class="pass-portrait-status pass-portrait-statuserror">成功更新头像</span></div>');
            j.push('<div class="pass-portrait-dialog ' + c.HIDE_CLASS + '" id="' + c.PORTRAIT_DIALOG + '"><div class="portrait-dialog-mask" id="portraitMask"></div>');
            j.push('<div class="pass-portrait" id="passPortrait">');
            j.push('<div class="portrait-dialog-title" id="portraitDialogTitle"><span class="portrait-dialog-tithead">上传头像</span><span class="portrait-dialog-close" id="portraitDialogClose">&nbsp;</span></div>');
            j.push('<div class="pass-portrait-left">');
            j.push('<ul class="pass-portrait-nav" id="passPortraitNav"><li class="pass-portrait-current" id="portraitCustomLi"><span>自定义头像</span></li><li class="pass-portrait-navright" id="portraitHotrecomLi"><span>热门推荐头像</span></li></ul>');
            j.push(k._initMainTpl() + "</div>");
            j.push(k._initPreviewTpl() + k._initHiddenTpl() + k._initSaveTpl(1) + "</div></div></div>");
            return j.join("")
        },
        _initMainTpl: function() {
            var l = this,
                m = [],
                k = " ",
                j = h + "//passport.baidu.com/passApi/img/small_blank.gif?v=50079576.gif",
                n = h + "//passport.baidu.com/passApi/img/loadingPortrait.gif?v=50079576.gif";
            if (l._ieLowser6 || l._ie7) {
                k = " ie-lowser-crop "
            }
            m.push('<div class="pass-portrait-tabcontent" id="portraitCustom">');
            m.push('<div class="pass-portrait-crop' + k + c.HIDE_CLASS + '" id="' + c.PORTRAIT_CROP + '"><span id="loadingSpan"><img src="' + n + '" class="loadingImg" /></span><img src="' + j + '" id="' + c.CROP_IMG + '" /></div>');
            m.push('<p class="pass-portrain-commonp">方法一：选择本地照片，上传编辑自己的头像</p><div class="pass-portrait-openimg"><input type="button" class="pass-portrait-filebtn" name="openImgBtn" id="openImgBtn" value="选择图片" class="file-btn" /><input type="file" class="pass-portrait-file" name="file" id="fileImg" /><span class="pass-portrait-msg">支持jpg、jpeg、gif、png、bmp格式的图片</span></div>');
            m.push('<p class="pass-portrain-commonp">方法二：选择百度推荐头像，快速上传优质头像</p><ul class="pass-portrait-recommend pass-portrait-clearfix" id="passPortraitRecommend"></ul></div>');
            m.push('<div class="pass-portrait-tabcontent ' + c.HIDE_CLASS + '" id="portraitHotrecom"><ul class="pass-portrait-hotrecommend" id="passPortraitHotrecommend"></ul></div>');
            return m.join("")
        },
        _initPreviewTpl: function() {
            var k = this,
                j = [],
                l = k.previewDoamin + "sys/portrait/item/" + k.portraitVars.psign;
            j.push('<div class="pass-portrait-right"><p class="pass-portrain-commonp">头像预览</p>');
            j.push('<p id="previewBoxBig" class="pass-portrait-previewboxbig"><img src="' + l + '" class="pass-portrait-previewbig" id="previewImgBig" /></p><p class="pass-portrain-commonp pass-portrain-previewp"><span>大头像100*100</span></p>');
            j.push('<p id="previewBoxSmall" class="pass-portrait-previewboxbigsmall"><img src="' + l + '" class="pass-portrait-previewsmall" id="previewImgSmall" /></p><p class="pass-portrain-commonp pass-portrain-previewp"><span>小头像55*55</span></p>');
            j.push('<p>我使用过的头像</p><ul class="pass-portrait-history" id="passPortraitHistory"></ul></div>');
            return j.join("")
        },
        _initHiddenTpl: function() {
            var j = [];
            j.push('<div class="pass-form-hidden">');
            j.push('<input type="hidden" name="isCrop" id="isCrop" />');
            j.push('<input type="hidden" name="serie" id="serie" />');
            j.push('<input type="hidden" name="num" id="num" />');
            j.push('<input type="hidden" name="picId" id="picId" />');
            j.push('<input type="hidden" name="isHistory" id="isHistory" />');
            j.push('<input type="hidden" name="historyId" id="historyId" />');
            j.push("</div>");
            return j.join("")
        },
        _initSaveTpl: function(l) {
            var o = this,
                n = [],
                k = "",
                m = "",
                j = "";
            if (l) {
                k = "pass-portrait-clearfix";
                m = "pass-portrait-disabled";
                j = "disabled=true"
            } else {
                m = c.HIDE_CLASS
            }
            n.push('<div class="pass-portrait-save ' + k + '">');
            n.push('<input type="button" value="保存头像" class="pass-portrait-savebtn pass-portrait-disabled" disabled=true id="' + c.SAVE_PORTRAIT + '" />&nbsp;');
            n.push('<input type="button" value="重新选择" class="pass-portrait-cancelbtn ' + m + '"' + j + ' id="' + c.PORTRAIT_RECHOICE_BTN + '" />');
            n.push('<input type="file" class="pass-portrait-refile ' + c.HIDE_CLASS + '" name="file" id="fileReImg" />');
            if (!l) {
                n.push('<span class="pass-portrait-status pass-portrait-hide" id="' + c.PORTRAIT_PROMPT + '">成功更新头像</span>')
            }
            n.push("</div>");
            return n.join("")
        },
        _ieLowser6: /msie [1-6]\./.test(navigator.userAgent.toLowerCase()),
        _ie7: /msie [7]\./.test(navigator.userAgent.toLowerCase()),
        _ie8: /msie [8]\./.test(navigator.userAgent.toLowerCase()),
        _isMobile: function() {
            return ("ontouchstart" in document.documentElement)
        },
        _isNotSupportFixed: function() {
            var p = window.navigator.userAgent,
                o = p.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/),
                m = o && o[2] && (parseInt(o[2].replace(/_/g, "."), 10) < 5),
                k = /Opera Mini/i.test(p),
                j = document.body,
                q, l, n = "display:none;position:fixed;z-index:100;";
            q = document.createElement("div");
            q.style.cssText ? q.style.cssText = n : q.setAttribute("style", n);
            j.appendChild(q);
            l = q.style.position != "fixed";
            j.removeChild(q);
            q = null;
            return !!(l || m || k)
        },
        _setDialogCenter: function() {
            var n = this,
                k = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) - 4,
                j = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth) - 24,
                m, p, o = d.g("passPortrait"),
                l, m = (j - o.offsetWidth) / 2,
                p = (k - o.offsetHeight) / 2;
            if (m < 0) {
                m = 0
            }
            if (p < 0) {
                p = 0
            }
            l = "left:" + m + "px;top:" + p + "px;margin:0px;";
            if (n._isNotSupportFixed()) {
                d.g("portraitMask").style.position = "absolute"
            }
            d.g("portraitMask").style.height = k;
            d.g("portraitMask").style.width = j;
            o.style.cssText ? o.style.cssText = l : o.setAttribute("style", l)
        },
        _winResize: function() {
            var j = this;
            d.on(window, "resize", function() {
                j._setDialogCenter()
            })
        },
        _bindPorTypeEvent: function() {
            var l = this,
                j = d.g("portraitCustomLi"),
                m = d.g(c.PORTRAIT_RECHOICE_BTN),
                k = d.g("portraitHotrecomLi");
            d.on(j, "click", function() {
                l._setPorType("porCustomLi");
                if (!d.hasClass(d.g(c.PORTRAIT_CROP), c.HIDE_CLASS)) {
                    if (!l.portraitType && d.hasClass(m, c.HIDE_CLASS)) {
                        d.removeClass(m, c.HIDE_CLASS)
                    }
                    if (l.portraitType && d.hasClass(m, "pass-portrait-disabled")) {
                        d.removeClass(m, "pass-portrait-disabled");
                        m.disabled = ""
                    }
                    if (d.hasClass(d.g("fileReImg"), c.HIDE_CLASS)) {
                        d.removeClass(d.g("fileReImg"), c.HIDE_CLASS)
                    }
                }
            });
            d.on(k, "click", function() {
                l._setPorType("porHotrecomLi");
                if (!l.portraitType && !d.hasClass(m, c.HIDE_CLASS)) {
                    d.addClass(m, c.HIDE_CLASS)
                }
                if (l.portraitType && !d.hasClass(m, "pass-portrait-disabled")) {
                    d.addClass(m, "pass-portrait-disabled");
                    m.disabled = true
                }
                if (!d.hasClass(d.g("fileReImg"), c.HIDE_CLASS)) {
                    d.addClass(d.g("fileReImg"), c.HIDE_CLASS)
                }
            })
        },
        _setPorType: function(l) {
            var o = this,
                k = d.g("portraitCustomLi"),
                n = d.g("portraitHotrecomLi"),
                m = "pass-portrait-current",
                j = d.g("portraitCustom"),
                p = d.g("portraitHotrecom");
            if (l == "porCustomLi") {
                if (d.hasClass(n, m)) {
                    d.removeClass(n, m);
                    d.addClass(p, c.HIDE_CLASS)
                }
                if (!d.hasClass(k, m)) {
                    d.addClass(k, m);
                    d.removeClass(d.g("portraitCustom"), c.HIDE_CLASS)
                }
                if ((o._ieLowser6 || o._ie7) && d.hasClass(p, "pass-portrait-tabcontentIELowser")) {
                    d.removeClass(p, "pass-portrait-tabcontentIELowser")
                }
            }
            if (l == "porHotrecomLi") {
                if (d.hasClass(k, m)) {
                    d.removeClass(k, m);
                    d.addClass(j, c.HIDE_CLASS)
                }
                if (!d.hasClass(n, m)) {
                    d.addClass(n, m);
                    d.removeClass(p, c.HIDE_CLASS)
                }
                if ((o._ieLowser6 || o._ie7) && !d.hasClass(p, "pass-portrait-tabcontentIELowser")) {
                    d.addClass(p, "pass-portrait-tabcontentIELowser")
                }
            }
        },
        _validateImg: function(l) {
            var k = this,
                j = l.value || "";
            if (/^.*?\.(jpg|jpeg|gif|png|bmp)$/.test(j.toLowerCase())) {
                return true
            } else {
                k._showPromptInfo(b.errnoErrno, b.errImgMsg);
                return false
            }
        },
        _uploadImg: function(k) {
            var m = this,
                j = d.g(k);
            m._destroyCrop();
            if (!j) {
                return false
            }
            if (!m._validateImg(j)) {
                return false
            }
            var l = m.portraitVars || {};
            l.staticpage = m.staticpage;
            $.ajaxFileUpload({
                url: f + "sys/preview/" + l.psign,
                fileElementId: k,
                dataType: "json_url",
                data: l,
                success: function(o, n) {
                    if (o.errno == b.successErrno) {
                        m._showCrop(decodeURIComponent(decodeURIComponent(o.portraitUrl)));
                        d.g("picId").value = o.picId
                    } else {
                        if (o.errno == 1) {
                            m._showPromptInfo(o.errno, b.errUploadMsg)
                        } else {
                            m._showPromptInfo(o.errno, b[o.errno] || b.errUploadMsg)
                        }
                    }
                },
                error: function(o, n, p) {
                    m._showPromptInfo(b.errnoErrno, b.errUploadMsg)
                }
            })
        },
        _showCrop: function(k) {
            var l = this,
                j = d.g(c.CROP_IMG),
                o = d.g(c.PORTRAIT_CROP),
                q = d.g(c.PORTRAIT_RECHOICE_BTN),
                p = d.g(c.SAVE_PORTRAIT),
                n = "pass-portrait-disabled",
                m = d.g("fileReImg");
            j.setAttribute("src", k);
            if (d.hasClass(o, c.HIDE_CLASS)) {
                d.removeClass(o, c.HIDE_CLASS)
            }
            j.onload = function() {
                l._clearCurPortrait();
                if (!d.hasClass(d.g("loadingSpan"), c.HIDE_CLASS)) {
                    d.addClass(d.g("loadingSpan"), c.HIDE_CLASS)
                }
                l._crop();
                l._setZoom(c.PORTRAIT_CROP, k);
                if (d.hasClass(p, n)) {
                    d.removeClass(p, n);
                    p.disabled = "";
                    l._mouseOverStyle(p, p, "pass-portrait-savebtn-hover");
                    l._mouseOutStyle(p, p, "pass-portrait-savebtn-hover")
                }
                if (d.hasClass(q, c.HIDE_CLASS)) {
                    d.removeClass(q, c.HIDE_CLASS)
                }
                if (d.hasClass(q, n)) {
                    d.removeClass(q, n);
                    q.disabled = ""
                }
                if (m && d.hasClass(m, c.HIDE_CLASS)) {
                    d.removeClass(m, c.HIDE_CLASS)
                }
            }
        },
        _hideCrop: function() {
            var j = this,
                k = d.g(c.PORTRAIT_CROP),
                m = d.g(c.PORTRAIT_RECHOICE_BTN),
                l = d.g(c.SAVE_PORTRAIT);
            j._destroyCrop();
            if (!d.hasClass(k, c.HIDE_CLASS)) {
                d.addClass(k, c.HIDE_CLASS)
            }
            if (d.hasClass(d.g("loadingSpan"), c.HIDE_CLASS)) {
                d.removeClass(d.g("loadingSpan"), c.HIDE_CLASS)
            }
            if (!j.portraitType && !d.hasClass(m, c.HIDE_CLASS)) {
                d.addClass(m, c.HIDE_CLASS)
            }
            if (j.portraitType && !d.hasClass(m, "pass-portrait-disabled")) {
                d.addClass(m, "pass-portrait-disabled");
                m.disabled = true
            }
            if (!d.hasClass(d.g("fileReImg"), c.HIDE_CLASS)) {
                d.addClass(d.g("fileReImg"), c.HIDE_CLASS)
            }
        },
        _crop: function() {
            var j = this;
            setTimeout(function() {
                $("#" + c.CROP_IMG).Jcrop({
                    setSelect: [150, 100, 250, 200],
                    aspectRatio: 1,
                    keySupport: false,
                    onRelease: function() {
                        j._showPromptInfo(2, b.errCropMsg)
                    },
                    onChange: function(k) {
                        j._preview(k);
                        j._setCoordinate(k)
                    },
                    onSelect: function(k) {
                        j._preview(k);
                        j._setCoordinate(k)
                    }
                }, function() {
                    d.g("isCrop").value = 1;
                    d.g("isHistory").value = 0;
                    j.jcrop_api = this
                })
            }, 200)
        },
        _destroyCrop: function() {
            var k = this;
            if (k.jcrop_api) {
                k.jcrop_api.destroy();
                var j = d.g(c.CROP_IMG);
                j.style.cssText ? j.style.cssText = "" : j.setAttribute("style", "");
                if (k._ie8) {
                    j.setAttribute("src", "")
                }
                if (d.hasClass(d.g("loadingSpan"), c.HIDE_CLASS)) {
                    d.removeClass(d.g("loadingSpan"), c.HIDE_CLASS)
                }
            }
        },
        _setCoordinate: function(j) {
            this.coordinate = j
        },
        _getCoordinate: function() {
            if (this.coordinate) {
                this.coordinate.x *= this.zoom.wScale;
                this.coordinate.y *= this.zoom.hScale;
                this.coordinate.w *= this.zoom.wScale;
                this.coordinate.h *= this.zoom.hScale;
                return {
                    coordX: this.coordinate.x,
                    coordY: this.coordinate.y,
                    coordW: this.coordinate.w,
                    coordH: this.coordinate.h
                }
            }
        },
        _setZoom: function(m, j) {
            var k = this,
                l = new Image();
            l.onload = function() {
                var p = d.g(m).offsetWidth;
                var r = d.g(m).offsetHeight;
                var q = l.width / p;
                var n = l.height / r;
                if (q < 1 && n < 1) {
                    q = 1;
                    n = 1
                } else {
                    if (q > 1 || n > 1) {
                        var o = q >= n ? q : n;
                        q = o;
                        n = o;
                        if (k._ieLowser6) {
                            d.g(c.CROP_IMG).style.width = l.width / q + "px";
                            d.g(c.CROP_IMG).style.height = l.height / n + "px"
                        }
                    }
                }
                k.zoom = {
                    wScale: q,
                    hScale: n
                }
            };
            l.setAttribute("src", j)
        },
        _preview: function(t) {
            if (parseInt(t.w) > 0) {
                var m = c.CROP_IMG,
                    l, k, r, p, j, o = [],
                    n = [],
                    s, q;
                l = d.g(m).getAttribute("src");
                k = d.g("previewBoxBig").offsetWidth / t.w;
                r = d.g("previewBoxBig").offsetHeight / t.w;
                p = d.g("previewBoxSmall").offsetWidth / t.w;
                j = d.g("previewBoxSmall").offsetHeight / t.w;
                d.g("previewImgBig").setAttribute("src", l);
                $(d.g("previewImgBig")).css({
                    width: Math.round(k * $(d.g(m)).width()) + "px",
                    height: Math.round(k * $(d.g(m)).height()) + "px",
                    marginLeft: "-" + Math.round(k * t.x) + "px",
                    marginTop: "-" + Math.round(r * t.y) + "px"
                });
                d.g("previewImgSmall").setAttribute("src", l);
                $(d.g("previewImgSmall")).css({
                    width: Math.round(p * $(d.g(m)).width()) + "px",
                    height: Math.round(p * $(d.g(m)).height()) + "px",
                    marginLeft: "-" + Math.round(p * t.x) + "px",
                    marginTop: "-" + Math.round(j * t.y) + "px"
                })
            }
        },
        _resetInlineStyle: function() {
            var k = d.g("previewImgBig"),
                j = d.g("previewImgSmall");
            k.style.cssText ? k.style.cssText = "" : k.setAttribute("style", "");
            j.style.cssText ? j.style.cssText = "" : j.setAttribute("style", "")
        },
        _mouseOverStyle: function(k, l, j) {
            d.on(k, "mouseover", function(m) {
                if (!d.hasClass(l, j)) {
                    d.addClass(l, j)
                }
            })
        },
        _mouseOutStyle: function(k, l, j) {
            d.on(k, "mouseout", function(m) {
                if (d.hasClass(l, j)) {
                    d.removeClass(l, j)
                }
            })
        },
        _getRecommend: function() {
            var k = this,
                j = k.portraitVars;
            $.ajax({
                dataType: "jsonp",
                data: j,
                url: h + "//passport.baidu.com/sys/portrait/hotitemlist",
                success: function(l) {
                    if (l.errno != b.successErrno) {
                        return
                    }
                    k._setRecommend(l)
                },
                error: function(l) {}
            })
        },
        _setRecommend: function(o) {
            var u = this,
                m = o.list,
                r = m.length,
                p = [],
                q = [],
                k = u.recomNum,
                v = "",
                j, s = "";
            if (u._ieLowser6 || u._ie7) {
                v = " recommendSpanIELowser";
                s = " liIELowser"
            }
            if (u._ie8) {
                v = " recommendSpanIE8"
            }
            if (k) {
                for (var n = 0; n < k; n++) {
                    var t = "";
                    if (m[n].myitem) {
                        t = "visiHot";
                        j = m[n].serie + "-" + m[n].num
                    }
                    p.push('<li id="recom-' + m[n].serie + "-" + m[n].num + '" class="' + t + s + '"><img src="' + m[n].url + '" data-serie="' + m[n].serie + '" data-num="' + m[n].num + '"/><span class="recommendSpan' + v + '"></span></li>')
                }
                p.push('<li class="pass-portrait-more" id="passPortraitMore">更多&gt;</li>');
                d.g("passPortraitRecommend").innerHTML = p.join("")
            }
            for (var n = 0; n < r; n++) {
                var l = "",
                    t = "",
                    w = "";
                if ((n + 1) % 7 == 0) {
                    l = "pass-portrait-clearmr "
                }
                if (m[n].myitem) {
                    t = "visiHot ";
                    j = m[n].serie + "-" + m[n].num
                }
                if (u._isMobile()) {
                    w = "pass-portrait-padli "
                }
                q.push('<li id="hot-' + m[n].serie + "-" + m[n].num + '" class="' + l + t + s + w + '"><img src="' + m[n].url + '" data-serie="' + m[n].serie + '" data-num="' + m[n].num + '"/><span class="recommendSpan' + v + '"></span></li>')
            }
            d.g("passPortraitHotrecommend").innerHTML = q.join("");
            d.g("passPortraitRecommend").setAttribute("data-hotpor", j);
            d.g("passPortraitHotrecommend").setAttribute("data-hotpor", j);
            u._choiceRecommend();
            u._gotoHotRecommend();
            u._choiceHotRecommend()
        },
        _choiceRecommend: function() {
            var j = this,
                l, k = d.g("passPortraitRecommend");
            d.on(k, "click", function(m) {
                j._resetInlineStyle();
                m = m ? m : window.event;
                l = m.srcElement ? m.srcElement : m.target;
                if (l.tagName.toLowerCase() == "img") {
                    j._setChoicePortrait(l, k);
                    j._hideCrop()
                }
            })
        },
        _setChoicePortrait: function(k, n) {
            var l = this,
                p = k.getAttribute("src"),
                o = d.g(c.SAVE_PORTRAIT),
                j = n.getAttribute("data-hotpor"),
                m = k.getAttribute("data-serie") + "-" + k.getAttribute("data-num");
            l._clearCurPortrait();
            if (d.g("recom-" + j) && d.hasClass(d.g("recom-" + j), "visiHot")) {
                d.removeClass(d.g("recom-" + j), "visiHot")
            }
            if (d.g("hot-" + j) && d.hasClass(d.g("hot-" + j), "visiHot")) {
                d.removeClass(d.g("hot-" + j), "visiHot")
            }
            if (d.g("recom-" + m) && !d.hasClass(d.g("recom-" + m), "visiHot")) {
                d.addClass(d.g("recom-" + m), "visiHot")
            }
            if (d.g("hot-" + m) && !d.hasClass(d.g("hot-" + m), "visiHot")) {
                d.addClass(d.g("hot-" + m), "visiHot")
            }
            d.g("passPortraitRecommend").setAttribute("data-hotpor", m);
            d.g("passPortraitHotrecommend").setAttribute("data-hotpor", m);
            d.g("serie").value = k.getAttribute("data-serie");
            d.g("num").value = k.getAttribute("data-num");
            d.g("isCrop").value = 0;
            d.g("isHistory").value = 0;
            d.g("previewImgBig").setAttribute("src", p);
            d.g("previewImgSmall").setAttribute("src", p);
            if (d.hasClass(o, "pass-portrait-disabled")) {
                d.removeClass(o, "pass-portrait-disabled");
                o.disabled = "";
                l._mouseOverStyle(o, o, "pass-portrait-savebtn-hover");
                l._mouseOutStyle(o, o, "pass-portrait-savebtn-hover")
            }
        },
        _gotoHotRecommend: function() {
            var k = this,
                l = d.g("passPortraitMore"),
                j = d.g("portraitHotrecomLi"),
                m = d.g("portraitHotrecom");
            d.on(l, "click", function() {
                k._setPorType("porHotrecomLi")
            })
        },
        _choiceHotRecommend: function() {
            var j = this,
                l, k = d.g("passPortraitHotrecommend");
            d.on(k, "click", function(m) {
                j._resetInlineStyle();
                m = m ? m : window.event;
                l = m.srcElement ? m.srcElement : m.target;
                if (l.tagName.toLowerCase() == "img") {
                    j._setChoicePortrait(l, k);
                    j._hideCrop()
                }
            })
        },
        _getHistory: function() {
            var k = this,
                j = k.portraitVars;
            j.length = k.historyLen;
            j.prefix = k.prefix;
            $.ajax({
                dataType: "jsonp",
                data: j,
                url: h + "//passport.baidu.com/sys/history",
                success: function(l) {
                    if (l.errno != b.successErrno) {
                        return
                    }
                    k._setHistory(l)
                },
                error: function(l) {}
            })
        },
        _setHistory: function(n) {
            var m = this,
                p = n.history,
                q = p.length,
                o = [],
                l = "",
                j = m.historyLen - q;
            if (m._ieLowser6 || m._ie7) {
                l = " historySpanIELowser"
            }
            if (m._ie8) {
                l = " historySpanIE8"
            }
            if (j > 0) {
                for (var k = 0; k < q; k++) {
                    o.push('<li id="his-' + k + '"><img src="' + p[k] + '" data-history="' + k + '"/><span class="historySpan' + l + '"></span></li>')
                }
                for (var k = 0; k < j; k++) {
                    o.push('<li class="pass-portrait-hisdefault"></li>')
                }
            } else {
                if (j <= 0) {
                    for (var k = 0; k < m.historyLen; k++) {
                        o.push('<li id="his-' + k + '"><img src="' + p[k] + '" data-history="' + k + '"/><span class="historySpan' + l + '"></span></li>')
                    }
                }
            }
            d.g("passPortraitHistory").innerHTML = o.join("");
            m._choiceHistory()
        },
        _choiceHistory: function() {
            var j = this,
                l = d.g("passPortraitHistory"),
                k = d.g(c.SAVE_PORTRAIT);
            d.on(l, "click", function(n) {
                j._resetInlineStyle();
                var n = n ? n : window.event;
                var p = n.srcElement ? n.srcElement : n.target;
                if (p.tagName.toLowerCase() == "img") {
                    j._clearCurPortrait();
                    var m = d.g("passPortraitHistory").getAttribute("data-his"),
                        o = p.getAttribute("data-history"),
                        q = p.getAttribute("src");
                    d.g("passPortraitHistory").setAttribute("data-his", o);
                    if (m && d.g("his-" + m) && d.hasClass(d.g("his-" + m), "visiHisHot")) {
                        d.removeClass(d.g("his-" + m), "visiHisHot")
                    }
                    if (d.g("his-" + o) && !d.hasClass(d.g("his-" + o), "visiHisHot")) {
                        d.addClass(d.g("his-" + o), "visiHisHot")
                    }
                    d.g("historyId").value = o;
                    d.g("isCrop").value = 0;
                    d.g("isHistory").value = 1;
                    d.g("previewImgBig").setAttribute("src", q);
                    d.g("previewImgSmall").setAttribute("src", q);
                    if (d.hasClass(k, "pass-portrait-disabled")) {
                        d.removeClass(k, "pass-portrait-disabled");
                        k.disabled = "";
                        j._mouseOverStyle(k, k, "pass-portrait-savebtn-hover");
                        j._mouseOutStyle(k, k, "pass-portrait-savebtn-hover")
                    }
                    j._hideCrop()
                }
            })
        },
        _clearCurPortrait: function() {
            var k = d.g("passPortraitHotrecommend").getAttribute("data-hotpor"),
                j = d.g("passPortraitHistory").getAttribute("data-his");
            if (k && d.g("recom-" + k) && d.hasClass(d.g("recom-" + k), "visiHot")) {
                d.removeClass(d.g("recom-" + k), "visiHot");
                d.g("passPortraitRecommend").setAttribute("data-hotpor", "")
            }
            if (k && d.g("hot-" + k) && d.hasClass(d.g("hot-" + k), "visiHot")) {
                d.removeClass(d.g("hot-" + k), "visiHot");
                d.g("passPortraitHotrecommend").setAttribute("data-hotpor", "")
            }
            if (j && d.g("his-" + j) && d.hasClass(d.g("his-" + j), "visiHisHot")) {
                d.removeClass(d.g("his-" + j), "visiHisHot");
                d.g("passPortraitHistory").setAttribute("data-his", "")
            }
        },
        _savePortrait: function() {
            var j = this,
                k = d.g(c.SAVE_PORTRAIT);
            d.on(k, "click", function() {
                var l = j.portraitVars,
                    n, m;
                if (d.g("isCrop").value == 1) {
                    n = j._getCoordinate() || {};
                    n.psign = l.psign;
                    n.picId = d.g("picId").value;
                    n.bdstoken = l.bdstoken;
                    m = f + "sys/corpupload"
                } else {
                    if (d.g("isHistory").value == 1) {
                        n = {};
                        m = h + "//passport.baidu.com/sys/sethistoryitem";
                        n.historyId = d.g("historyId").value || ""
                    } else {
                        n = {};
                        m = f + "sys/sethotitem";
                        n.serie = d.g("serie").value || "";
                        n.num = d.g("num").value || ""
                    }
                }
                $.ajax({
                    dataType: "jsonp",
                    data: n,
                    url: m,
                    success: function(o) {
                        if (o.errno == b.successErrno) {
                            j._hideCrop();
                            j._showPromptInfo(o.errno, b[o.errno], true);
                            j.onSaveSuccess && j.onSaveSuccess();
                            j._getHistory()
                        } else {
                            if (o.errno == 1) {
                                j._showPromptInfo(o.errno, b.errnoPortraitMsg);
                                j.onSaveError && j.onSaveError()
                            } else {
                                j._showPromptInfo(o.errno, b[o.errno] || b.errnoPortraitMsg);
                                j.onSaveError && j.onSaveError()
                            }
                        }
                    },
                    error: function(o) {
                        j._showPromptInfo(b.errnoErrno, b.errnoPortraitMsg)
                    }
                })
            })
        },
        _showReChoiceBtn: function() {
            var j = d.g(PORTRAIT_RECHOICE_BTN);
            if (!j) {
                return false
            }
            if (!d.hasClass(j, c.HIDE_CLASS)) {
                d.addClass(j, c.HIDE_CLASS)
            }
        },
        _hideReChoiceBtn: function() {
            var j = d.g(PORTRAIT_RECHOICE_BTN);
            if (!j) {
                return false
            }
            if (d.hasClass(j, c.HIDE_CLASS)) {
                d.removeClass(j, c.HIDE_CLASS)
            }
        },
        _showPromptInfo: function(l, q, k) {
            var m = this,
                j = m.portraitType,
                p = j ? d.g(c.PORTRAIT_PROMPT).getElementsByTagName("span")[0] : d.g(c.PORTRAIT_PROMPT);
            var o = (d.hasClass(p, "pass-portrait-statuserror"));
            if (l == 0 && o) {
                d.removeClass(p, "pass-portrait-statuserror")
            } else {
                if (l != 0) {
                    if (!o) {
                        d.addClass(p, "pass-portrait-statuserror")
                    }
                    if (!d.hasClass(d.g("loadingSpan"), c.HIDE_CLASS)) {
                        d.addClass(d.g("loadingSpan"), c.HIDE_CLASS)
                    }
                }
            }
            p.innerHTML = q;
            if (d.hasClass(d.g(c.PORTRAIT_PROMPT), c.HIDE_CLASS)) {
                d.removeClass(d.g(c.PORTRAIT_PROMPT), c.HIDE_CLASS)
            }
            if (k) {
                m._hideCrop();
                m._hidePortraitDialog()
            }
            var n = d.g(c.SAVE_PORTRAIT);
            if ((l != 2) && (!d.hasClass(n, "pass-portrait-disabled"))) {
                d.addClass(n, "pass-portrait-disabled");
                n.disabled = true
            }
            setTimeout(function() {
                m._hidePromptInfo(l)
            }, 2000)
        },
        _hidePromptInfo: function(k) {
            var l = this,
                j = l.portraitType,
                m = j ? d.g(c.PORTRAIT_PROMPT).getElementsByTagName("span")[0] : d.g(c.PORTRAIT_PROMPT);
            if (k != 0 && !d.hasClass(m, "pass-portrait-statuserror")) {
                d.addClass(m, "pass-portrait-statuserror")
            }
            if (!d.hasClass(d.g(c.PORTRAIT_PROMPT), c.HIDE_CLASS)) {
                d.addClass(d.g(c.PORTRAIT_PROMPT), c.HIDE_CLASS)
            }
        },
        _showPortraitDialog: function() {
            var j = this,
                k = d.g(c.PORTRAIT_DIALOG);
            if (d.hasClass(k, c.HIDE_CLASS)) {
                d.removeClass(k, c.HIDE_CLASS)
            }
            j.onShow && j.onShow()
        },
        _hidePortraitDialog: function() {
            var j = this,
                l = d.g(c.PORTRAIT_DIALOG),
                k = d.g(c.SAVE_PORTRAIT),
                m = "pass-portrait-disabled";
            if (l && !d.hasClass(l, c.HIDE_CLASS)) {
                j._setPorType("porCustomLi");
                d.addClass(l, c.HIDE_CLASS);
                if (!d.hasClass(k, m)) {
                    d.addClass(k, m);
                    k.disabled = true
                }
            }
            j.onHide && j.onHide()
        },
        _dragPortraitDialog: function() {
            var l = this,
                j = d.g("passPortrait"),
                m = d.g("portraitDialogTitle"),
                k;
            k = new Drag(j, {
                handle: m
            })
        },
        _closePortraitDialog: function(l) {
            var k = this,
                j = d.g(l);
            d.on(j, "click", function() {
                k._hideCrop();
                k._hidePortraitDialog()
            })
        }
    };
    g.init = function(j) {
        var k = new a(j);
        k.init(k.portraitType);
        k.addEvents(k.portraitType);
        return {
            destroyPortrait: function() {
                var l = d.g(c.PORTRAIT_WRAPPER);
                if (l) {
                    k.wrapper.removeChild(l)
                }
            }
        }
    }
})(passport.setportrait);