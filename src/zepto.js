function $(_) {
    if (typeof _ == 'function') {
        $.dom.forEach(_);
    } else {
        $.dom = [].slice.apply(document.querySelectorAll(_));
    }
    return $;
}

$.html = function (html) {
    $(function (el) {
        el.innerHTML = html;
    });
    return $;
}
$.append = function (html) {
    $(function (el) {
        el.insertAdjacentHTML('beforeEnd', html);
    });
    return $;
}
$.prepend = function (html) {
    $(function (el) {
        el.insertAdjacentHTML('afterBegin', html);
    });
    return $;
}
$.css = function (style) {
    $(function (el) {
        el.style.cssText += ';' + style;
    });
    return $;
}
