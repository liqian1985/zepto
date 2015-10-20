(function ($) {
    var jsonpID = 0,
        isObject = $.isObject,
        key;

    function empty() {}

    $.ajaxJSONP = function(options) {
        var callbackName = 'jsonp' + (++jsonpID),
            script = document.createElement('script'),
            context = options.context,
            abort = function(){
                $(script).remove();
                if (callbackName in window) window[callbackName] = empty;
            },
            xhr = { abort: abort }, abortTimeout;

        window[callbackName] = function(data) {
            clearTimeout(abortTimeout);
            $(script).remove();
            delete window[callbackName];
            options.success.call(context, data);
        }
        script.src = options.url.replace(/=\?/, '=' + callbackName);
        $('head').append(script);
        if (options.timeout > 0) abortTimeout = setTimeout(function(){
            xhr.abort();
            options.error.call(context, xhr, 'timeout');
        }, options.timeout);
        return xhr;
    };

    $.ajaxSettings = {
        type: 'GET',
        beforeSend: empty,
        success: empty,
        error: empty,
        complete: empty,
        // The context for the callbacks
        context: null,
        // Transport
        xhr: function () {
            return new window.XMLHttpRequest();
        },
        accepts: {
            script: 'text/javascript, application/javascript',
            json:   'application/json',
            xml:    'application/xml, text/xml',
            html:   'text/html',
            text:   'text/plain'
        },
        timeout: 0
    };

    $.ajax = function(options) {
        options = options || {};
        var settings = $.extend({}, options);
        for (key in $.ajaxSettings) {
            if (!settings[key]) {
                settings[key] = $.ajaxSettings[key];
            }
        }
        if (options.url && /=\?/.test(options.url)) {
            return $.ajaxJSONP(options);
        }

        if (!settings.url) {
            settings.url = window.location.toString();
        }
        if (settings.data && !settings.contentType) {
            settings.contentType = "application/x-www-form-urlencoded";
        }
        if (isObject(settings.data)) {
            settings.data = $.param(settings.data);
        }
        if (settings.type.match(/get/i) && settings.data) {
            var queryString = settings.data;
            if (settings.url.match(/\?.*=/)) {
                queryString = '&' + queryString;
            } else if (queryString[0] != '?') {
                queryString = '?' + queryString;
            }
            settings.url += queryString;
        }

        var mime = settings.accepts[settings.dataType],
            xhr = $.ajaxSettings.xhr(), abortTimeout,
            context = settings.context;

        settings.headers = $.extend(
            {'X-Requested-With': 'XMLHttpRequest'}, settings.headers || {}
        );
        if (mime) {
            settings.headers['Accept'] = mime;
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                clearTimeout(abortTimeout);
                var result,
                    error = false;
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 0) {
                    if (mime == 'application/json' && !(/^\s*$/.test(xhr.responseText))) {
                        try { result = JSON.parse(xhr.responseText); }
                        catch (e) { error = e; }
                    } else {
                        result = xhr.responseText;
                    }
                    if (error) settings.error.call(context, xhr, 'parsererror', error);
                    else settings.success.call(context, result, 'success', xhr);
                } else {
                    error = true;
                    settings.error.call(context, xhr, 'error');
                }
                settings.complete.call(context, xhr, error ? 'error' : 'success');
            }
        }
        xhr.open(settings.type, settings.url, true);

        if (settings.contentType) {
            settings.headers['Content-Type'] = settings.contentType;
        }
        for (name in settings.headers) {
            xhr.setRequestHeader(name, settings.headers[name]);
        }
        if (settings.beforeSend.call(context, xhr, settings) === false) {
            xhr.abort();
            return false;
        }
        if (settings.timeout > 0) abortTimeout = setTimeout(function(){
            xhr.onreadystatechange = empty;
            xhr.abort();
            settings.error.call(context, xhr, 'timeout');
        }, settings.timeout);

        xhr.send(settings.data);
        return xhr;
    };

    $.get = function(url, success){ return $.ajax({ url: url, success: success }) };

    $.post = function(url, data, success, dataType) {
        if ($.isFunction(data)) {
            dataType = dataType || success,
                success = data,
                data = null;
        }
        return $.ajax({ type: 'POST', url: url, data: data, success: success, dataType: dataType });
    };

    $.getJSON = function(url, success){
        return $.ajax({ url: url, success: success, dataType: 'json' });
    };

    $.fn.load = function(url, success) {
        var self = this,
            parts = url.split(/\s/),
            selector;
        if (!this.length) {
            return this;
        }
        if (parts.length > 1) {
            url = parts[0];
            selector = parts[1];
        }
        $.get(url, function(response) {
            self.html(selector ?
                $(document.createElement('div')).html(response).find(selector).html()
                : response);
            success && success.call(self);
        });
        return this;
    };

    var escape = encodeURIComponent;

    function serialize(params, obj, traditional, scope){
        var array = $.isArray(obj);
        $.each(obj, function(key, value) {
            if (scope) key = traditional ? scope : scope + '[' + (array ? '' : key) + ']';
            // handle data in serializeArray() format
            if (!scope && array) params.add(value.name, value.value);
            // recurse into nested objects
            else if (traditional ? $.isArray(value) : isObject(value))
                serialize(params, value, traditional, key);
            else params.add(key, value);
        });
    }
    $.param = function(obj, traditional) {
        var params = [];
        params.add = function (k, v) {
            this.push(escape(k) + '=' + escape(v))
        };
        serialize(params, obj, traditional);
        return params.join('&').replace('%20', '+');
    }

})(Zepto);