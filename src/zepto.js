var Zepto = (function() {
    var slice = [].slice,
        d = document,
        ADJ_OPS = {
            append: 'beforeEnd',
            prepend: 'afterBegin',
            before: 'beforeBegin',
            after: 'afterEnd'
        },
        e,
        k,
        css,
        un;

    // fix for iOS 3.2
    if (String.prototype.trim === un) {
        String.prototype.trim = function(){
            return this.replace(/^\s+/, '').replace(/\s+$/, '');
        };
    }

    function $$(el, selector) {
        return slice.call(el.querySelectorAll(selector));
    }

    function classRE(name) {
        return new RegExp("(^|\\s)" + name + "(\\s|$)");
    }

    function compact(array) {
        return array.filter(function (el) {
            return el !== un && el !== null;
        });
    }

    function Z(dom, _) {
        this.dom = dom || [];
        this.selector = _ || '';
    }

    Z.prototype = $.fn;

    function $(_, context) {
        if (_ == d) {
            return new Z;
        } else if (context !== un) {
            return $(context).find(_);
        } else if (_ instanceof Z) {
            return new Z(compact(_.dom), _);
        } else if (_ instanceof Array) {
            return new Z(compact(_), _);
        } else if (_ instanceof Element) {
            return new Z(compact([_]), _);
        } else {
            return new Z(compact($$(d, _)), _);
        }
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
        ready: function(callback) {
            d.addEventListener('DOMContentLoaded', callback, false);
            return this;
        },

        compact: function() {
            this.dom = compact(this.dom);
            return this;
        },

        get: function(idx) {
            if (idx === un) {
                return this.dom;
            } else {
                return this.dom[idx];
            }
        },

        remove: function() {
            return this.each(function (el) {
                el.parentNode.removeChild(el);
            });
        },

        each: function(callback) {
            this.dom.forEach(function (value) {
                callback.apply(value, arguments);
            });
            return this;
        },

        filter: function(selector) {
            return $(this.dom.filter(function (el) {
                return $$(el.parentNode, selector).indexOf(el) >= 0;
            }));
        },

        is: function(selector) {
            return this.dom.length > 0 && $(this.dom[0]).filter(selector).dom.length > 0;
        },

        first: function(callback) {
            this.dom = compact([this.dom[0]]);
            return this;
        },

        find: function(selector) {
            return $(this.dom.map(function (el) {
                return $$(el, selector) })
                    .reduce(function (a, b) {
                        return a.concat(b) }, [])
            );
        },

        closest: function(selector) {
            var el = this.dom[0].parentNode,
                nodes = $$(d, selector);
            while (el && nodes.indexOf(el) < 0) {
                el = el.parentNode;
            }
            if (el && !(el === d)) {
                return $(el);
            } else {
                return $([]);
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
            if (html === un) {
                if (this.dom.length > 0) {
                    return this.dom[0].innerHTML;
                } else {
                    return null;
                }
            } else {
                return this.each(function (el) {
                    el.innerHTML = html;
                });
            }
        },

        attr: function(name, value) {
            if (typeof name == 'string' && value === un) {
                if (this.dom.length > 0) {
                    return this.dom[0].getAttribute(name) || undefined;
                } else {
                    return null;
                }
            } else {
                this.each(function (el) {
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

        css: function(prop, value) {
            if( value === un && typeof prop == 'string') {
                return this.dom[0].style[camelize(prop)];
            }
            css = "";
            for (k in prop) {
                css += k + ':' + prop[k] + ';';
            }
            if (typeof prop == 'string') {
                css = prop + ":" + value;
            }
            return this.each(function (el) {
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
            return this.dom.indexOf($(el).get(0));
        },

        bind: function(event, callback) {
            return this.each(function (el) {
                event.split(/\s/).forEach(function (event) {
                    el.addEventListener(event, callback, false);
                });
            });
        },

        delegate: function(selector, event, callback) {
            return this.each(function (el) {
                el.addEventListener(event, function (event) {
                    var target = event.target,
                        nodes = $$(el, selector);
                    while (target && nodes.indexOf(target) < 0) {
                        target = target.parentNode;
                    }
                    if (target && !(target === el) && !(target === d)) {
                        callback.call(target, event);
                    }
                }, false);
            });
        },

        live: function(event, callback) {
            $(d.body).delegate(this.selector, event, callback);
            return this;
        },


        hasClass: function(name) {
            return classRE(name).test(this.dom[0].className);
        },

        addClass: function(name) {
            return this.each(function (el) {
                //在这里学习了一下&&作为判断时的用法，好处是精简了代码，
                // 坏处是不利于阅读，对读代码的人要求高些，可以适当的写注释
                !$(el).hasClass(name) && (el.className += (el.className ? ' ' : '') + name);
            });
        },
        removeClass: function(name) {
            return this.each(function (el) {
                el.className = el.className.replace(classRE(name), ' ').trim();
            });
        },
        trigger: function (event) {
            return this.each(function (el) {
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
                return this.each(function (el) {
                    el['insertAdjacent' + (html instanceof Element ? 'Element' : 'HTML')](op, html);
                });
            };
        })(ADJ_OPS[k]);
    }

    Z.prototype = $.fn;

    return $;
})();

'$' in window || (window.$ = Zepto);

