(function(win, doc) {
	"use strict";
	if (win.__define) {
		return;
	}
	var F, iS, seed = 0,
		sys, _M = {},
		//是否是函数
		iF = $.isFunction,
		r_qo = /^\s*\{\s*([^\}]+?)\s*\}\s*$/,
		r_v = /\{\s*(?:%(\d+)|([\w\-\.]+))\s*(?:\|\s*([^\}]+?)\s*)?\}/g,
		//取得数组的原型
		ap = Array.prototype,
		//偏移量函数
		slice = ap.slice;
	ap.forEach = ap.forEach ||
		function(f, c) {
			for (var i = 0,
					t = this,
					j = t.length; i < j; i++) {
				if (i in t) {
					f.call(c, t[i], i, t);
				}
			}
		};
	ap.map = ap.map ||
		function(f, c) {
			var r = [];
			this.forEach(function(v, i, t) {
				r.push(f.call(c, v, i, t));
			});
			return r;
		};
	//空函数
	function noop(r) {
		return r;
	}
	//返回参数
	function _A() {
		//arguments是值传递给函数_A的参数
		return noop.call.apply(slice, arguments);
	}
	/*
	返回参数的结果：
	1、a是一个函数对象，则返回a执行的结果，其中a函数接受的参数是result函数除第一个参数外接受的其他参数。
	2、a不是一个函数对象，返回a
	 */
	function result(a) {
		// console.log(arguments);
		//判断是否是函数，如果是函数，则返回执行结果，如果不是，则返回该对象
		return iF(a) ? a.apply(this, _A(arguments, 1)) : a;
	}
	var cnl = win.console = win.console || {
		log: noop,
		error: noop
	};
	//引入模块函数
	win.__require = function(s) {
		//去掉前后的空格
		s = $.trim(s);
		//判断模块是否存在
		if (!(s in _M)) {
			//不存在时抛出错误
			throw Error('module "' + s + '" not found');
		}
		//取出该模块
		var m = _M[s];
		//判断标志t是否存在
		//此步判断用于判断该类是否已经被初始化过了
		if (!('t' in m)) {
			// console.log('now');
			//取得m.v执行的结果
			m.t = result.call({},
				m.v);
		}
		//返回执行的结果
		return m.t;
	};
	//定义模块
	win.__define = function(s, fn) {
		//对模块名称的前后去掉空格
		s = $.trim(s);
		//判断模块名称是否存在
		if (s in _M) {
			//模块已存在，打印错误
			cnl.error('module "' + s + '" existing');
		} else {
			//模块未存在，保存函数到该模块的v对象中
			_M[s] = {
				v: fn
			};
			// console.log(_M);
		}
	};
	//全局唯一一个guidid，可以通过该id或者该实例，即__sys.find(guid);
	function guid(s) {
		return (s || 'id') + (1e3 + parseInt(Math.random() * 999, 10)) + 'e' + (++seed);
	}
	//判断是否是字符串
	iS = $.isString = function(s) {
		return typeof s == 'string';
	};
	F = function(s, o) {
		var u, q, args = _A(arguments, 1),
			ret = ('' + (s || '')).replace(r_v,
				function(_, i, w, n) {
					var v = i ? args[i] : (w.indexOf('sys.') ? (o || '')[w] : sys.get(w.slice(4)));
					q = v === null || v === u ? (n || '') : v;
					return q;
				});
		return this === noop && s.match(r_qo) ? q : ret;
	};
	var base, build, objs = {},
		tap = ("ontouchend" in win) && ('tap' in $.fn),
		r_tag = /<[^>]+>/,
		r_ex = /(?!change)\b(\w+)(?=$|,| )/g,
		r_pro = /^(href|src|checked|title|disabled|value)$/,
		r_htv = /^(html|val|show|hide)$/,
		r_vm = /^(css|prop|attr)_\w+$/,
		r_fn = /^\s*(\w+)(?:\s*\(\s*([^\(\)]*)\s*\))?\s*$/,
		exts = 'ui,events,options,defaults,statics'.split(','),
		hs = {
			hide: 'show',
			show: 'hide'
		};

	function pd(v, e, el) {
		v = $.trim(v);
		var l = v.slice(1);
		return v.charAt(0) == '$' ? (l == 'e' ? e : (l == 'el' ? el : $(el)[r_pro.test(l) ? 'prop' : 'attr'](l))) : (v == 'false' ? false : (v == 'true' ? true : v));
	}

	function invoke(o, s, e, el) {
		var f, m = s.match(r_fn);
		if (m) {
			f = o[m[1]];
		}
		if (iF(f)) {
			return f.apply(o, m[2] ? m[2].split(',').map(function(v) {
				return pd(v, e, el);
			}) : []);
		}
	}

	function vm(el, g, o, t) {
		var p, m = [],
			x = g.shift();
		if (t.match(r_v)) {
			p = t;
			t.replace(r_v,
				function(_, i, k) {
					m.push(k);
				});
			t = m.join(',');
		}
		o.on($.trim(t).replace(r_ex, '$1.change'),
			function(v, w, t) {
				$.fn[(x in hs) ? (v ? x : hs[x]) : x].apply(el, g.concat(p ? F(p, o.get()) : v));
			},
			o);
	}

	function handler(_this, s, e, el, a) {
		return iF(s) ? s.call(_this, e, el) : invoke(_this, (a ? el.getAttribute(s) : s) || '', e, el);
	}

	function on(z, el, t, d, a) {
		el = $(el);
		var s = t.split(/\s+/);
		t = s.shift();

		function fn(e) {
			return handler(z, d, e, this, a);
		}
		t = !t.indexOf('_') ? t.slice(1) : (tap && t == 'click' ? 'tap' : t);
		el.on.apply(el, s.length ? [t, s.join(' '), fn] : [t, fn]);
		z.on('destroy',
			function() {
				el.off(t, fn);
			});
	}

	function s2o(s, v) {
		var r = s;
		if (iS(s)) {
			r = {};
			r[s] = v;
		}
		return r;
	}
	//基础类的一些方法
	var PROP = {
		noop: noop,
		ready: result,
		createGuid: guid,
		propFilter: noop,
		destroy: function() {
			this.trigger('destroy');
			sys.off(0, 0, this);
			delete objs[this.guid];
			this.off();
		},
		on: function(t, fn, ctx) {
			var ts, s, c, x, b = this;
			if (t && !iS(t)) {
				$.each(t,
					function(k, v) {
						b.on(k, v, fn);
					});
			} else if (fn) {
				ts = t.split(',');
				if (ts.length > 1) {
					ts.forEach(function(t) {
						b.on(t, fn, ctx);
					});
				} else {
					c = ctx || b;
					t = $.trim(t);
					if (!t.indexOf('sys.')) {
						sys.on(t.slice(4), fn, c);
					} else {
						s = b.__events__;
						x = t.indexOf('?') > -1;
						t = t.replace(/\?/g, '');
						if (!s[t]) {
							s[t] = [];
						}
						if (/\.change$/.test(t)) {
							var u = t.slice(0, -7),
								d = b.get();
							if (u in d) {
								fn.call(c, d[u], null, u);
								if (x) {
									return this;
								}
							}
						}
						s[t].push([fn, c, x]);
					}
				}
			}
			return this;
		},
		off: function(t, f, c) {
			var s = this.__events__;
			if (!arguments.length) {
				this.__events__ = {};
			} else {
				$.each(t ? s2o(t, s[t]) : s,
					function(k, g) {
						if (!t || t === k) {
							s[k] = $.grep(g || [],
								function(v) {
									return v && !((!f || f === v[0]) && (!c || c === v[1]));
								});
						}
					});
			}
		},
		trigger: function(t) {
			var o, u = false,
				i = 0,
				g = this.__events__[$.trim(t)],
				d = _A(arguments, 1),
				j = g ? g.length : 0;
			for (; i < j; i++) {
				o = g[i];
				if (o) {
					if (o[2]) {
						g[i] = u;
					}
					if (u === o[0].apply(o[1], d)) {
						return u;
					}
				}
			}
		},
		get: function(s, m) {
			var d = this.__props__;
			return arguments.length ? (s in d ? d[s] : m) : d;
		},
		set: function(k, v, u) {
			var p, t = this,
				d = t.__props__;
			if (!iS(k)) {
				$.each(k || '',
					function(k, s) {
						t.set(k, s, v);
					});
			} else if (v !== noop) {
				v = this.propFilter(v, k);
				p = d[k];
				d[k] = v;
				if (u || v !== p) {
					t.trigger(k + '.change', v, p, k);
					t.trigger('*', k, v, p);
				}
			}
			return t;
		},
		//锁定
		lock: function(s, y, n) {
			s = 'lock.' + s;
			return this.get(s) ? result.call(this, n) : result.call(this.set(s, true), y);
		},
		//解锁
		unlock: function(s) {
			return this.set('lock.' + s, false);
		},
		bind: function(f) {
			var t = this;
			return function() {
				return f.apply(t, arguments);
			};
		},
		parent: function(n) {
			var r, a, o = this,
				k = 'class-ctx';
			if (!(k in o)) {
				o[k] = o;
			}
			a = o[k].fn;
			while (a && !a.hasOwnProperty(n)) {
				a = a.fn;
			}
			if (a) {
				o[k] = a;
				r = a[n].apply(o, _A(arguments, 1));
			}
			delete o[k];
			return r;
		},
		addUI: function(sel, opts, box) {
			var el, _this = this,
				cg = _this.options;
			sel = iS(sel) ? (sel == 'document' ? doc : (sel == 'window' ? win : F.call(noop, sel, cg))) : sel;
			el = $(sel, iS(sel) ? box : null);
			if (box && r_tag.test(sel)) {
				el.appendTo(box);
			}

			function each(k, v) {
				k = $.trim(k);
				if (k == 'init') {
					_this.on('initialized.change?',
						function() {
							handler(_this, v, el, el);
						});
				} else if (!k.indexOf('on')) {
					on(_this, el, F(k.slice(2), cg), v);
				} else if (k == 'name') {
					v = 'ui_' + v;
					if (v in _this) {
						cnl.error('ui "' + v + '" existing');
					}
					_this[v] = el;
				} else if (k == 'classList') {
					$.each(v,
						function(c, s) {
							_this.on(s + '.change',
								function(v) {
									el[(v ? 'add' : 'remove') + 'Class'](c);
								});
						});
				} else if (k == 'bind') {
					v.split(',').forEach(function(v) {
						v = $.trim(v);
						var f = v.split('-').pop(),
							a = '[' + v + ']';
						if (r_htv.test(f)) {
							el.find(a).each(function(i, s) {
								vm($(this), [f], _this, this.getAttribute(v));
							});
						} else {
							on(_this, el, f + ' ' + a, v, 1);
						}
					});
				} else if (r_htv.test(k) || r_pro.test(k) || r_vm.test(k)) {
					vm(el, $.trim(r_pro.test(k) ? ('prop_' + k) : k).split('_'), _this, v);
				} else if (k == 'watch') {
					$.each(v,
						function(e, f) {
							_this.on(e + '.change',
								function(v) {
									handler(_this, f, v, el);
								});
						});
				} else {
					_this.addUI(k, v, el);
				}
			}
			$.each((iS(opts) ? {
				name: opts
			} : result.call(_this, opts)) || '', each);
			return this;
		}
	};

	function sup() {
		return this.parent.apply(this, ['init'].concat(_A(arguments)));
	}

	function _ex() {
		return build.apply(this, arguments);
	}
	build = function(q) {
		var Class, instance, prop, obj = {};
		$.extend(obj, result.call(obj, q));
		prop = iF(this) ? this.prototype : PROP;
		Class = function(s, a) {
			var p, t = this;
			if (s !== _A) {
				return new Class(_A, _A(arguments));
			}
			if (t.single) {
				if (instance) {
					return instance;
				}
				instance = t;
			}
			p = t.options = $.extend({},
				t.options, a[0]);
			t.__events__ = {};
			t.__props__ = $.extend({},
				t.defaults);
			t.Class = Class;
			t.guid = guid('drcos');
			t.ready(function() {
					if (!t.initialized) {
						objs[t.guid] = t.addUI('body', t.ui).addUI('body', p.ui).on(t.events).on(p.on).set(p.set).set('initialized', true);
						t.init.apply(t, a);
						result.call(t, p.init);
					}
				},
				t);
		};

		function e() {}
		e.prototype = prop;
		exts.forEach(function(k) {
			obj[k] = $.extend({},
				prop[k], obj[k]);
		});
		return $.extend(Class, obj.statics, {
			prototype: $.extend(new e(), $.extend({
					init: sup,
					fn: prop,
					constructor: Class
				},
				obj)),
			extend: _ex
		});
	};
	win.__class = base = build();
	//可视化
	win.__object = function(s) {
		return base.extend(s)();
	};
	//来自于__object，只是在其基础上添加一些对象和方法
	win.__sys = sys = win.__object({
		args: _A,
		format: F,
		result: result,
		find: function(g, fn) {
			return objs[g];
		}
	});
})(window, window.document);
/*
drcos.js
d: __define 指定义一个模块
r: __require 指引进一个模块
c: __class	指一个基类，供其他类继承
o: __object	指一个类的执行实例
s: __system	指系统类的执行实例
 */