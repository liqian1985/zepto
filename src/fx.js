(function ($) {
    $.fn.anim = function(props, dur, ease) {
        var transforms = [],
            opacity,
            k;
        for (k in props) {
            if (k === 'opacity') {
                opacity = props[k];
            } else {
                transforms.push(k + '(' + props[k] + ')');
            }
        }
        return this.css({
            '-webkit-transition': 'all ' + (dur || 0.5) + 's ' + (ease || ''),
            '-webkit-transform': transforms.join(' '),
            'opacity': opacity
        });
    }
})(Zepto);
