var $ = (function (d) {
    var slice = [].slice,
        k,
        CN = "className",
        AEL = "addEventListener",
        PN = "parentNode",
        ADJ_OPS = {
            append: 'beforeEnd',
            prepend: 'afterBegin',
            before: 'beforeBegin',
            after: 'afterEnd'
        };
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
            fn.selector = _;
            fn.dom = slice.call(d.querySelectorAll(fn.selector));
        }

        for (k in $.fn) {
            fn[k] = $.fn[k];
        }
        return fn;
    }

    function classRE(name) {
        return new RegExp("(^|\\s)" + name + "(\\s|$)");
    }

    function elSelect(el, selector) {
        return slice.call(el.querySelectorAll(selector));
    }

    $.fn = {
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

        find: function(selector) {
            return $(this.dom.map(function (el) {
                return elSelect(el, selector) })
                    .reduce(function (a, b) {
                        return a.concat(b) }, [])
            );
        },

        closest: function(selector) {
            var el = this.dom[0][PN],
                nodes = elSelect(d, selector);
            while (el && nodes.indexOf(el) < 0) {
                el = el[PN];
            }
            if (el && !(el === d)) {
                return el;
            } else {
                return [];
            }
        },

        html: function(html) {
            if (html === void 0) {
                if (this.dom.length > 0) {
                    return this.dom[0].innerHTML;
                } else {
                    return null;
                }
            } else {
                return this(function (el) {
                    el.innerHTML = html;
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
                            return el.setAttribute(k, name[k]);
                        }
                    } else {
                        return el.setAttribute(name, value);
                    }
                });
            }
        },

        css: function(style) {
            return this(function (el) {
                el.style.cssText += ';' + style;
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

        index: function(target) {
            return this.dom.indexOf($(target).get(0));
        },

        anim: function(transform, opacity, dur) {
            var opa;
            if (opacity === 0) {
                opa = 0;
            } else {
                opa = opacity || 1;
            }
            return this.css('-webkit-transition:all' + (dur || 0.5) + 's' +
                '-webkit-transform:' + transform +
                ';opcity' + opa);
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
                        nodes = elSelect(el, selector);
                    while (target && nodes.indexOf(target) < 0) {
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
        }
    };

    for (k in ADJ_OPS) {
        $.fn[k] = (function (op) {
            return function(html) {
                return this(function (el) {
                    el['insertAdjacent' + (html instanceof Element ? 'Element' : 'HTML')](op, html);
                });
            };
        })(ADJ_OPS[k]);
    }

    function ajax(mothod, url, success) {
        var r = new XMLHttpRequest();
        r.onreadystatechange = function () {
            if (r.readyState == 4 && (r.status == 200 || r.status == 0)) {
                success(r.responseText);
            };
        };
        r.open(method, url, true);
        r.send(null);
    }
    $.get = function (url, success) {
        ajax('GET', url, success);
    };
    $.post = function (url, success) {
        ajax('POST', url, success);
        $.getJSON = function (url, success) {
        };
        $.get(url, function (json) {
            success(JSON.parse(json));
        });
    };
    return $;
})(document);

