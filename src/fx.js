(function($, undefined){
    var prefix = '', eventPrefix, endEventName, endAnimationName,
        vendors = {Webkit: 'webkit', Moz: '', O: 'o', ms: 'MS'},
        document = window.document, testEl = document.createElement('div'),
        supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;

    function downcase(str) { return str.toLowerCase() }
    function normalizeEvent(name) { return eventPrefix ? eventPrefix + name : downcase(name) };

    $.each(vendors, function(vendor, event){
        if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
            prefix = '-' + downcase(vendor) + '-';
            eventPrefix = event;
            return false;
        }
    });

    $.fx = {
        off: false,
        cssPrefix: prefix,
        transitionEnd: normalizeEvent('TransitionEnd'),
        animationEnd: normalizeEvent('AnimationEnd')
    };

    $.fn.anim = function(properties, duration, ease, callback) {
        var transforms = [],
            cssProperties = {},
            key,
            that = this,
            wrappedCallback,
            endEventName = 'webkitTransitionEnd';

        if (duration === undefined) {
            duration = 0.5;
        }

        if (typeof properties === 'string') {
            // Keyframe animation
            cssProperties['-webkit-animation-name'] = properties;
            cssProperties['-webkit-animation-duration'] = duration + 's';
            endEventName = 'webkitAnimationEnd';
        } else {
            // CSS / transition animation
            for (key in properties) {
                if (supportedTransforms.indexOf(key) >= 0) {
                    transforms.push(key + '(' + properties[key] + ')');
                } else {
                    cssProperties[key] = properties[key];
                }

            }

            if (transforms.length > 0) {
                cssProperties['-webkit-transform'] = transforms.join(' ');
            }
            cssProperties['-webkit-transition'] = 'all ' + duration + 's ' + (ease || '');
        }

        wrappedCallback = function() {
            $(this).css({
                '-webkit-transition': 'none',
                '-webkit-animation-name': 'none'
            });
            callback && callback.call(this);
        }
        if (duration > 0) this.one(endEventName, wrappedCallback);

        setTimeout(function () {
            that.css(cssProperties);
            if (duration <= 0) {
                setTimeout(function () {
                    that.each(function () {
                        wrappedCallback.call(this);
                    });
                }, 0);
            }
        }, 0);
        return this;
    }
})(Zepto);
