/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
var Auth = (function(t) {
	"use strict";
	function e(t) {
		var e = { exports: {} };
		return t(e, e.exports), e.exports;
	}
	var r = e(function(t) {
		var e = (function(t) {
			var e,
				r = Object.prototype,
				n = r.hasOwnProperty,
				o = "function" == typeof Symbol ? Symbol : {},
				i = o.iterator || "@@iterator",
				c = o.asyncIterator || "@@asyncIterator",
				a = o.toStringTag || "@@toStringTag";
			function u(t, e, r) {
				return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e];
			}
			try {
				u({}, "");
			} catch (t) {
				u = function(t, e, r) {
					return (t[e] = r);
				};
			}
			function f(t, e, r, n) {
				var o = e && e.prototype instanceof d ? e : d,
					i = Object.create(o.prototype),
					c = new j(n || []);
				return (
					(i._invoke = (function(t, e, r) {
						var n = l;
						return function(o, i) {
							if (n === p) throw new Error("Generator is already running");
							if (n === y) {
								if ("throw" === o) throw i;
								return T();
							}
							for (r.method = o, r.arg = i; ; ) {
								var c = r.delegate;
								if (c) {
									var a = L(c, r);
									if (a) {
										if (a === v) continue;
										return a;
									}
								}
								if ("next" === r.method) r.sent = r._sent = r.arg;
								else if ("throw" === r.method) {
									if (n === l) throw ((n = y), r.arg);
									r.dispatchException(r.arg);
								} else "return" === r.method && r.abrupt("return", r.arg);
								n = p;
								var u = s(t, e, r);
								if ("normal" === u.type) {
									if (((n = r.done ? y : h), u.arg === v)) continue;
									return { value: u.arg, done: r.done };
								}
								"throw" === u.type && ((n = y), (r.method = "throw"), (r.arg = u.arg));
							}
						};
					})(t, r, c)),
					i
				);
			}
			function s(t, e, r) {
				try {
					return { type: "normal", arg: t.call(e, r) };
				} catch (t) {
					return { type: "throw", arg: t };
				}
			}
			t.wrap = f;
			var l = "suspendedStart",
				h = "suspendedYield",
				p = "executing",
				y = "completed",
				v = {};
			function d() {}
			function g() {}
			function m() {}
			var w = {};
			w[i] = function() {
				return this;
			};
			var b = Object.getPrototypeOf,
				x = b && b(b(S([])));
			x && x !== r && n.call(x, i) && (w = x);
			var E = (m.prototype = d.prototype = Object.create(w));
			function O(t) {
				["next", "throw", "return"].forEach(function(e) {
					u(t, e, function(t) {
						return this._invoke(e, t);
					});
				});
			}
			function k(t, e) {
				function r(o, i, c, a) {
					var u = s(t[o], t, i);
					if ("throw" !== u.type) {
						var f = u.arg,
							l = f.value;
						return l && "object" == typeof l && n.call(l, "__await")
							? e.resolve(l.__await).then(
									function(t) {
										r("next", t, c, a);
									},
									function(t) {
										r("throw", t, c, a);
									},
							  )
							: e.resolve(l).then(
									function(t) {
										(f.value = t), c(f);
									},
									function(t) {
										return r("throw", t, c, a);
									},
							  );
					}
					a(u.arg);
				}
				var o;
				this._invoke = function(t, n) {
					function i() {
						return new e(function(e, o) {
							r(t, n, e, o);
						});
					}
					return (o = o ? o.then(i, i) : i());
				};
			}
			function L(t, r) {
				var n = t.iterator[r.method];
				if (n === e) {
					if (((r.delegate = null), "throw" === r.method)) {
						if (t.iterator.return && ((r.method = "return"), (r.arg = e), L(t, r), "throw" === r.method)) return v;
						(r.method = "throw"), (r.arg = new TypeError("The iterator does not provide a 'throw' method"));
					}
					return v;
				}
				var o = s(n, t.iterator, r.arg);
				if ("throw" === o.type) return (r.method = "throw"), (r.arg = o.arg), (r.delegate = null), v;
				var i = o.arg;
				return i ? (i.done ? ((r[t.resultName] = i.value), (r.next = t.nextLoc), "return" !== r.method && ((r.method = "next"), (r.arg = e)), (r.delegate = null), v) : i) : ((r.method = "throw"), (r.arg = new TypeError("iterator result is not an object")), (r.delegate = null), v);
			}
			function P(t) {
				var e = { tryLoc: t[0] };
				1 in t && (e.catchLoc = t[1]), 2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])), this.tryEntries.push(e);
			}
			function _(t) {
				var e = t.completion || {};
				(e.type = "normal"), delete e.arg, (t.completion = e);
			}
			function j(t) {
				(this.tryEntries = [{ tryLoc: "root" }]), t.forEach(P, this), this.reset(!0);
			}
			function S(t) {
				if (t) {
					var r = t[i];
					if (r) return r.call(t);
					if ("function" == typeof t.next) return t;
					if (!isNaN(t.length)) {
						var o = -1,
							c = function r() {
								for (; ++o < t.length; ) if (n.call(t, o)) return (r.value = t[o]), (r.done = !1), r;
								return (r.value = e), (r.done = !0), r;
							};
						return (c.next = c);
					}
				}
				return { next: T };
			}
			function T() {
				return { value: e, done: !0 };
			}
			return (
				(g.prototype = E.constructor = m),
				(m.constructor = g),
				(g.displayName = u(m, a, "GeneratorFunction")),
				(t.isGeneratorFunction = function(t) {
					var e = "function" == typeof t && t.constructor;
					return !!e && (e === g || "GeneratorFunction" === (e.displayName || e.name));
				}),
				(t.mark = function(t) {
					return Object.setPrototypeOf ? Object.setPrototypeOf(t, m) : ((t.__proto__ = m), u(t, a, "GeneratorFunction")), (t.prototype = Object.create(E)), t;
				}),
				(t.awrap = function(t) {
					return { __await: t };
				}),
				O(k.prototype),
				(k.prototype[c] = function() {
					return this;
				}),
				(t.AsyncIterator = k),
				(t.async = function(e, r, n, o, i) {
					void 0 === i && (i = Promise);
					var c = new k(f(e, r, n, o), i);
					return t.isGeneratorFunction(r)
						? c
						: c.next().then(function(t) {
								return t.done ? t.value : c.next();
						  });
				}),
				O(E),
				u(E, a, "Generator"),
				(E[i] = function() {
					return this;
				}),
				(E.toString = function() {
					return "[object Generator]";
				}),
				(t.keys = function(t) {
					var e = [];
					for (var r in t) e.push(r);
					return (
						e.reverse(),
						function r() {
							for (; e.length; ) {
								var n = e.pop();
								if (n in t) return (r.value = n), (r.done = !1), r;
							}
							return (r.done = !0), r;
						}
					);
				}),
				(t.values = S),
				(j.prototype = {
					constructor: j,
					reset: function(t) {
						if (((this.prev = 0), (this.next = 0), (this.sent = this._sent = e), (this.done = !1), (this.delegate = null), (this.method = "next"), (this.arg = e), this.tryEntries.forEach(_), !t)) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = e);
					},
					stop: function() {
						this.done = !0;
						var t = this.tryEntries[0].completion;
						if ("throw" === t.type) throw t.arg;
						return this.rval;
					},
					dispatchException: function(t) {
						if (this.done) throw t;
						var r = this;
						function o(n, o) {
							return (a.type = "throw"), (a.arg = t), (r.next = n), o && ((r.method = "next"), (r.arg = e)), !!o;
						}
						for (var i = this.tryEntries.length - 1; i >= 0; --i) {
							var c = this.tryEntries[i],
								a = c.completion;
							if ("root" === c.tryLoc) return o("end");
							if (c.tryLoc <= this.prev) {
								var u = n.call(c, "catchLoc"),
									f = n.call(c, "finallyLoc");
								if (u && f) {
									if (this.prev < c.catchLoc) return o(c.catchLoc, !0);
									if (this.prev < c.finallyLoc) return o(c.finallyLoc);
								} else if (u) {
									if (this.prev < c.catchLoc) return o(c.catchLoc, !0);
								} else {
									if (!f) throw new Error("try statement without catch or finally");
									if (this.prev < c.finallyLoc) return o(c.finallyLoc);
								}
							}
						}
					},
					abrupt: function(t, e) {
						for (var r = this.tryEntries.length - 1; r >= 0; --r) {
							var o = this.tryEntries[r];
							if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
								var i = o;
								break;
							}
						}
						i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
						var c = i ? i.completion : {};
						return (c.type = t), (c.arg = e), i ? ((this.method = "next"), (this.next = i.finallyLoc), v) : this.complete(c);
					},
					complete: function(t, e) {
						if ("throw" === t.type) throw t.arg;
						return "break" === t.type || "continue" === t.type ? (this.next = t.arg) : "return" === t.type ? ((this.rval = this.arg = t.arg), (this.method = "return"), (this.next = "end")) : "normal" === t.type && e && (this.next = e), v;
					},
					finish: function(t) {
						for (var e = this.tryEntries.length - 1; e >= 0; --e) {
							var r = this.tryEntries[e];
							if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), _(r), v;
						}
					},
					catch: function(t) {
						for (var e = this.tryEntries.length - 1; e >= 0; --e) {
							var r = this.tryEntries[e];
							if (r.tryLoc === t) {
								var n = r.completion;
								if ("throw" === n.type) {
									var o = n.arg;
									_(r);
								}
								return o;
							}
						}
						throw new Error("illegal catch attempt");
					},
					delegateYield: function(t, r, n) {
						return (this.delegate = { iterator: S(t), resultName: r, nextLoc: n }), "next" === this.method && (this.arg = e), v;
					},
				}),
				t
			);
		})(t.exports);
		try {
			regeneratorRuntime = e;
		} catch (t) {
			Function("r", "regeneratorRuntime = r")(e);
		}
	});
	var n = function(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
	};
	function o(t, e) {
		for (var r = 0; r < e.length; r++) {
			var n = e[r];
			(n.enumerable = n.enumerable || !1), (n.configurable = !0), "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
		}
	}
	var i = function(t, e, r) {
		return e && o(t.prototype, e), r && o(t, r), t;
	};
	function c(t, e, r, n) {
		return new (r || (r = Promise))(function(o, i) {
			function c(t) {
				try {
					u(n.next(t));
				} catch (t) {
					i(t);
				}
			}
			function a(t) {
				try {
					u(n.throw(t));
				} catch (t) {
					i(t);
				}
			}
			function u(t) {
				var e;
				t.done
					? o(t.value)
					: ((e = t.value),
					  e instanceof r
							? e
							: new r(function(t) {
									t(e);
							  })).then(c, a);
			}
			u((n = n.apply(t, e || [])).next());
		});
	}
	var a = function(t) {
			if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return t;
		},
		u = e(function(t) {
			function e(r, n) {
				return (
					(t.exports = e =
						Object.setPrototypeOf ||
						function(t, e) {
							return (t.__proto__ = e), t;
						}),
					e(r, n)
				);
			}
			t.exports = e;
		});
	var f = function(t, e) {
			if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
			(t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } })), e && u(t, e);
		},
		s = e(function(t) {
			function e(r) {
				return (
					"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
						? (t.exports = e = function(t) {
								return typeof t;
						  })
						: (t.exports = e = function(t) {
								return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
						  }),
					e(r)
				);
			}
			t.exports = e;
		});
	var l = function(t, e) {
			return !e || ("object" !== s(e) && "function" != typeof e) ? a(t) : e;
		},
		h = e(function(t) {
			function e(r) {
				return (
					(t.exports = e = Object.setPrototypeOf
						? Object.getPrototypeOf
						: function(t) {
								return t.__proto__ || Object.getPrototypeOf(t);
						  }),
					e(r)
				);
			}
			t.exports = e;
		});
	var p = function(t) {
		return -1 !== Function.toString.call(t).indexOf("[native code]");
	};
	var y = function() {
			if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ("function" == typeof Proxy) return !0;
			try {
				return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0;
			} catch (t) {
				return !1;
			}
		},
		v = e(function(t) {
			function e(r, n, o) {
				return (
					y()
						? (t.exports = e = Reflect.construct)
						: (t.exports = e = function(t, e, r) {
								var n = [null];
								n.push.apply(n, e);
								var o = new (Function.bind.apply(t, n))();
								return r && u(o, r.prototype), o;
						  }),
					e.apply(null, arguments)
				);
			}
			t.exports = e;
		});
	function d(t) {
		var e = (function() {
			if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ("function" == typeof Proxy) return !0;
			try {
				return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0;
			} catch (t) {
				return !1;
			}
		})();
		return function() {
			var r,
				n = h(t);
			if (e) {
				var o = h(this).constructor;
				r = Reflect.construct(n, arguments, o);
			} else r = n.apply(this, arguments);
			return l(this, r);
		};
	}
	var g = (function(t) {
			f(r, t);
			var e = d(r);
			function r(t) {
				var o;
				return n(this, r), (o = e.call(this, t)), Object.setPrototypeOf(a(o), r.prototype), o;
			}
			return (
				i(r, null, [
					{
						key: "setGraphClientError",
						value: function(t) {
							var e;
							return t instanceof Error ? (e = t) : ((e = new r()).customError = t), e;
						},
					},
				]),
				r
			);
		})(
			e(function(t) {
				function e(r) {
					var n = "function" == typeof Map ? new Map() : void 0;
					return (
						(t.exports = e = function(t) {
							if (null === t || !p(t)) return t;
							if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
							if (void 0 !== n) {
								if (n.has(t)) return n.get(t);
								n.set(t, e);
							}
							function e() {
								return v(t, arguments, h(this).constructor);
							}
							return (e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })), u(e, t);
						}),
						e(r)
					);
				}
				t.exports = e;
			})(Error),
		),
		m = (function() {
			function t(e, r) {
				if ((n(this, t), !e)) throw new g("Please pass a token credential object to the TokenCredentialAuthenticationProvider class constructor");
				if (!r) throw new g("Please pass the TokenCredentialAuthenticationProviderOptions with scopes to the TokenCredentialAuthenticationProvider class constructor");
				(this.authenticationProviderOptions = r), (this.tokenCredential = e);
			}
			return (
				i(t, [
					{
						key: "getAccessToken",
						value: function() {
							return c(
								this,
								void 0,
								void 0,
								r.mark(function t() {
									var e, n, o;
									return r.wrap(
										function(t) {
											for (;;)
												switch ((t.prev = t.next)) {
													case 0:
														if (((e = this.authenticationProviderOptions.scopes), (n = new g()), e && 0 !== e.length)) {
															t.next = 6;
															break;
														}
														throw ((n.name = "Empty Scopes"), (n.message = "Scopes cannot be empty, Please provide scopes"), n);
													case 6:
														return (t.next = 8), this.tokenCredential.getToken(e, this.authenticationProviderOptions.getTokenoptions);
													case 8:
														if (((o = t.sent), console.log(o), console.log(o.token), !o)) {
															t.next = 13;
															break;
														}
														return t.abrupt("return", o.token);
													case 13:
														throw ((n.message = "Cannot retrieve accessToken from the Token Credential object"), (n.name = "Access token is undefined"), n);
													case 16:
													case "end":
														return t.stop();
												}
										},
										t,
										this,
									);
								}),
							);
						},
					},
				]),
				t
			);
		})();
	return (t.TokenCredentialAuthenticationProvider = m), Object.defineProperty(t, "__esModule", { value: !0 }), t;
})({});
