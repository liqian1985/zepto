var $ = (function (d) {
    var slice = [].slice,
        k,
        ADJ_OPS = {
            append: 'beforeEnd',
            prepend: 'afterBegin',
            before: 'beforeBegin',
            after: 'afterEnd'
        };
    function $(_) {
        function fn(_){
            arguments.callee.dom.forEach(_);
            return arguments.callee;
        }

        if (_ instanceof Element) {
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

    $.fn = {
        get: function(idx) {
            if (idx === 'undefined') {
                return this.dom;
            } else {
                return this.dom[idx];
            }
        },

        remove: function() {
            return this(function (el) {
                el.parentNode.removeChild(el);
            });
        },

        each: function(callback) {
            return this(function (e) {
                callback.call(e);
            });
        },

        html: function(html) {
            if (html === undefined) {
                return this.dom[0].innerHTML;
            } else {
                return this(function (el) {
                    el.innerHTML = html;
                });
            }
        },

        attr: function(name, value) {
            if (value === undefined) {
                return this.dom[0].getAttribute(name) || undefined;
            } else {
                return this(function (el) {
                    el.setAttribute(name, value);
                });
            }
        },

        css: function(style) {
            return this(function (el) {
                el.style.cssText += ';' + style;
            });
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

        live: function(event, callback) {
            var selector = this.selector;
            document.body.addEventListener(event, function (event) {
                var target = event.target,
                    nodes = slice.call(document.querySelectorAll(selector));
                while (target && nodes.indexOf(target) < 0) {
                    target = target.parentNode;
                }
                if (target && !(target === document)) {
                    callback.call(target, event);
                }
            }, false);
            return this;
        },

        delegate: function(selector, event, callback) {
            return this(function (el) {
                el.addEventListener(event, function (event) {
                    var target = event.target,
                        nodes = slice.call(el.querySelectorAll(selector));
                    while (target && nodes.indexOf(target) < 0) {
                        target = target.parentNode;
                    }
                    if (target && !(target === el) && !(target === d)) {
                        callback.call(target, event);
                    }
                }, false);
            });
        },
        addClass: function(name) {
            return this(function (el) {
                !classRE(name).test(el.className)
                    && (el.className += (el.className ? ' ' : '') + name);
            });
        },
        removeClass: function(name) {
            return this(function (el) {
                el.className = el.className.replace(classRE(name), ' ').replace(/^\s+|\s+$/g, '');
            });
        }
    };

    for (k in ADJ_OPS) {
        $.fn[k] = (function(op){
            return function(html) {
                return this(function (el) {
                    el.insertAdjacentHTML(op, html);
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

