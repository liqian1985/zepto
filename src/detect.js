(function ($) {
    function detect(ua) {
        var os = (this.os = {}), browser = (this.browser = {}),
            webkit = ua.match(/WebKit\/([\d.]+)/),
            android = ua.match(/(Android)\s+([\d.]+)/),
            ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
            iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
            webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
            touchpad = webos && ua.match(/TouchPad/),
            blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/);

        if (webkit) browser.version = webkit[1];
        browser.webkit = !!webkit;

        if (android) {
            os.android = true;
            os.version = android[2];
        }
        if (iphone) {
            os.ios = true;
            os.version = iphone[2].replace(/_/g, '.');
            os.iphone = true;
        }
        if (ipad) {
            os.ios = true;
            os.version = ipad[2].replace(/_/g, '.');
            os.ipad = true;
        }
        if (webos) {
            os.webos = true;
            os.version = webos[2];
        }
        if (touchpad) os.touchpad = true;
        if (blackberry) {
            os.blackberry = true;
            os.version = blackberry[2];
        }
    }
    // ### $.browser
    //
    // *Example:*
    //
    //     $.browser.webkit  // => true if the browser is WebKit-based
    //     $.browser.version // => WebKit version string
    detect.call($, navigator.userAgent);

    // make available to unit tests
    $.__detect = detect;

})(Zepto);

