(function ($) {
    $.ajax = function(options){
        // { type, url, data, success, dataType, contentType }
        options = options || {};
        var data = options.data,
            callback = options.success,
            mime = mimeTypes[options.dataType],
            content = options.contentType,
            xhr = new XMLHttpRequest();

        if (callback instanceof Function) {
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                    if (mime == 'application/json') {
                        callback(JSON.parse(xhr.responseText));
                    } else {
                        callback(xhr.responseText);
                    }
                }
            };
        }
        xhr.open(options.type || 'GET', options.url || window.location, true);
        if (mime) {
            xhr.setRequestHeader('Accept', mime);
        }
        if (data instanceof Object) {
            data = JSON.stringify(data);
            content = content || 'application/json';
        }
        if (content) {
            xhr.setRequestHeader('Content-Type', content);
        }
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(data);
    };

    var mimeTypes = $.ajax.mimeTypes = {
        json: 'application/json',
        xml:  'application/xml',
        html: 'text/html',
        text: 'text/plain'
    };

    $.get = function(url, success) {
        $.ajax({
            url: url,
            success: success
        });
    };
    $.post = function(url, data, success, dataType) {
        if (data instanceof Function) {
            dataType = dataType || success;
            success = data;
            data = null;
        }
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            success: success,
            dataType: dataType
        });
    };

    $.getJSON = function(url, success) {
        $.ajax({
            url: url,
            success: success,
            dataType: 'json'
        })
    };

    $.fn.load = function(url, success){
        var self = this,
            parts = url.split(/\s/),
            selector;
        if (!this.dom.length) {
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
            success && success();
        });
        return this;
    };

})(Zepto);