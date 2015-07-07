var Zepto = (function() {
    var slice = [].slice,
        d = document,
        CN = "className",
        AEL = "addEventListener",
        PN = "parentNode",
        IO = "indexOf",
        IH = "innerHTML",
        SA = "setAttribute",
        ADJ_OPS = {
            append: 'beforeEnd',
            prepend: 'afterBegin',
            before: 'beforeBegin',
            after: 'afterEnd'
        },
        e,
        k,
        css;

    function $$(el, selector) {
        return slice.call(el.querySelectorAll(selector));
    }

    function classRE(name) {
        return new RegExp("(^|\\s)" + name + "(\\s|$)");
    }

    function $(_, context) {
        if (context !== void 0) {
            return $(context).find(_);
        }
        function fn(_){
            fn.dom.forEach(_);
            return fn;
        }

        if (typeof _ == 'function' && 'dom' in _) {
            fn.dom = _.dom;
        } else if (_ instanceof Array) {
            fn.dom = _;
        } else if (_ instanceof Element) {
            fn.dom = [_];
        } else {
            fn.dom = $$(d, fn.selector = _).filter(function (el) {
                return el !== void 0 && el !== null;
            });
        }

        $.extend(fn, $.fn);
        return fn;
    }

    $.extend = function (target, src) {
        for (k in src) {
            target[k] = src[k];
        }
    }

    camelize = function (str) {
        return str.replace(/-+(.)?/g, function (match, chr) {
            return chr ? chr.toUpperCase() : '' });
    }

    $.fn = {
        compact: function() {
            return $(this.dom);
        },

        get: function(idx) {
            if (idx === void 0) {
                return this.dom;
            } else {
                return this.dom[idx];
            }
        },

        remove: function() {
            return this(function (el) {
                el[PN].removeChild(el);
            });
        },

        each: function(callback) {
            return this(function (e) {
                callback.call(e);
            });
        },

        /*each: function(callback) {
            return this(callback);
        },*/

        find: function(selector) {
            return $(this.dom.map(function (el) {
                return $$(el, selector) })
                    .reduce(function (a, b) {
                        return a.concat(b) }, [])
            );
        },

        closest: function(selector) {
            var el = this.dom[0][PN],
                nodes = $$(d, selector);
            while (el && nodes[IO](el) < 0) {
                el = el[PN];
            }
            if (el && !(el === d)) {
                return el;
            } else {
                return [];
            }
        },

        pluck: function(property) {
            return this.dom.map(function (el) {
                return el[property];
            });
        },

        show: function() {
            return this.css('display', 'block');
        },

        hide: function() {
            return this.css('display', 'none');
        },

        prev: function() {
            return $(this.pluck('previousElementSibling'));
        },

        next: function() {
            return $(this.pluck('nextElementSibling'));
        },

        html: function(html) {
            if (html === void 0) {
                if (this.dom.length > 0) {
                    return this.dom[0][IH];
                } else {
                    return null;
                }
            } else {
                return this(function (el) {
                    el[IH] = html;
                });
            }
        },

        attr: function(name, value) {
            if (typeof name == 'string' && value === void 0) {
                if (this.dom.length > 0) {
                    return this.dom[0].getAttribute(name) || undefined;
                } else {
                    return null;
                }
            } else {
                this(function (el) {
                    if (typeof name == 'object') {
                        for (k in name) {
                            return el[SA](k, name[k]);
                        }
                    } else {
                        return el[SA](name, value);
                    }
                });
            }
        },

        css: function(prop, value) {
            if( value === void 0 && typeof prop == 'string') {
                return this.dom[0].style[camelize(prop)];
            }
            css = "";
            for (k in prop) {
                css += k + ':' + prop[k] + ';';
            }
            if (typeof prop == 'string') {
                css = prop + ":" + value;
            }
            return this(function (el) {
                el.style.cssText += ';' + css;
            });
        },

        offset: function() {
            var obj = this.dom[0].getBoundingClientRect();
            return {
                left: obj.left + d.body.scrollLeft,
                top: obj.top + d.body.scrollTop,
                width: obj.width,
                height: obj.height
            };
        },

        index: function(el) {
            return this.dom[IO]($(el).get(0));
        },

        anim: function(transform, opacity, dur) {
            return this.css({
                '-webkit-transition': 'all ' + (dur || 0.5) + 's',
                '-webkit-transform': transform,
                'opacity': (opacity === 0 ? 0 : opacity || 1)
            });
        },

        bind: function(event, callback) {
            return this(function (el) {
                event.split(/\s/).forEach(function (event) {
                    el[AEL](event, callback, false);
                });
            });
        },

        live: function(event, callback) {
            var selector = this.selector;
            d.body[AEL](event, function (event) {
                var target = event.target,
                    nodes = slice.call(d.querySelectorAll(selector));
                while (target && nodes.indexOf(target) < 0) {
                    target = target[PN];
                }
                if (target && !(target === D)) {
                    callback.call(target, event);
                }
            }, false);
            return this;
        },

        delegate: function(selector, event, callback) {
            return this(function (el) {
                el[AEL](event, function (event) {
                    var target = event.target,
                        nodes = $$(el, selector);
                    while (target && nodes[IO](target) < 0) {
                        target = target[PN];
                    }
                    if (target && !(target === el) && !(target === d)) {
                        callback.call(target, event);
                    }
                }, false);
            });
        },
        addClass: function(name) {
            return this(function (el) {
                !classRE(name).test(el[CN])
                    && (el[CN] += (el[CN] ? ' ' : '') + name);
            });
        },
        removeClass: function(name) {
            return this(function (el) {
                el[CN] = el[CN].replace(classRE(name), ' ').replace(/^\s+|\s+$/g, '');
            });
        },
        trigger: function (event) {
            return this(function (el) {
                var e;
                el.dispatchEvent(e = d.createEvent('Events'),
                    e.initEvent(event, true, false)) });
        }
    };

    ['width', 'height'].forEach(function (m) {
        $.fn[m] = function () {
            return this.offset()[m];
        }
    });

    for (k in ADJ_OPS) {
        $.fn[k] = (function (op) {
            return function(html) {
                return this(function (el) {
                    el['insertAdjacent' + (html instanceof Element ? 'Element' : 'HTML')](op, html);
                });
            };
        })(ADJ_OPS[k]);
    }

    return $;
})();

'$' in window || (window.$ = Zepto);

