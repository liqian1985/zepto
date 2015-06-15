describe('zepto suite text', function () {
    var div;

    beforeEach(function () {
        div = document.createElement('div');
        div.id = 'text';
        div.innerHTML = "<p>text</p><p>text</p><div>innerdiv</div>";
        document.body.appendChild(div);
    });

    afterEach(function () {
        document.body.removeChild(div);
    });

    describe('$ suite text', function () {
        it ('验证$函数返回值中包含dom数组属性', function () {
            var result = $('div');

            expect($.dom).toEqual(jasmine.any(Array));
            expect($.dom.length).toBe(2);
            expect($.dom[0]).toBe(div);
            expect($.dom[1].innerHTML).toBe('innerdiv');
        })
    });

    describe('$.fn.get() suite text', function () {
        it('验证$.fn.get() 方法', function () {
            var result = $('div');
            expect(result.get).toEqual(jasmine.any(Function));
            expect(result.get(0)).toBe(div);
            expect(result.get(1).innerHTML).toBe('innerdiv');
        });
    });

    describe('html suite text', function () {
        it ('验证$函数返回值中包含html方法', function () {
            var result = $('div');
            result.html('123');
            expect($.fn.html).toEqual(jasmine.any(Function));
            expect($.dom[0].innerHTML).toBe('123');
            expect($.dom[1].innerHTML).toBe('123');
        });
    });

    describe('$.css suite text', function () {
        it ('验证$函数返回值中包含css方法', function () {
            var result = $('div');
            result.css('width:100px');
            result.css('font-size:12px');
            expect($.fn.css).toEqual(jasmine.any(Function));
            expect($.dom[0].style.width).toBe('100px');
            expect($.dom[0].style.fontSize).toBe('12px');
            expect($.dom[1].style.fontSize).toBe('12px');
        });
    });
    describe('链式语法', function () {
        it ('测试$方法返回值的链式语法', function () {
            var result = $('div');
            result.html('456').css('height:100px');
            expect($.dom[0].innerHTML).toBe('456');
            expect($.dom[1].innerHTML).toBe('456');
            expect($.dom[0].style.height).toBe('100px');
            expect($.dom[1].style.height).toBe('100px');
        });
    });
    describe('append suite text', function () {
        it ('验证$方法返回值中包含append方法', function () {
            var result = $('div'),
                appendB;
            result.append('<b class="app">appendHTML</b>');
            appendB = $('b');
            expect($.fn.append).toEqual(jasmine.any(Function));
            expect($.dom.length).toBe(2);
            expect($.dom[0].innerHTML).toBe('appendHTML');
            expect($.dom[1].innerHTML).toBe('appendHTML');
            expect($.dom[1].parentNode.id).toBe('text');
        });
    });
    describe('prepend suite text', function () {
        it('验证$方法返回值中包含prepend方法', function () {
            var result = $('div'),
            prependB;
            result.prepend('<b>prependHTML</b>');
            prependB = $('b');
            expect($.fn.prepend).toEqual(jasmine.any(Function));
            expect($.dom.length).toBe(2);
            expect($.dom[0].innerHTML).toBe('prependHTML');
            expect($.dom[1].innerHTML).toBe('prependHTML');
            expect($.dom[0].parentNode.id).toBe('text');
        });
    });
    describe("mocking ajax", function() {
        describe("suite wide usage", function () {
            beforeEach(function () {
                jasmine.Ajax.install();
            });
            afterEach(function () {
                jasmine.Ajax.uninstall();
            });
            it("specifying response when you need it", function () {
                var doneFn = jasmine.createSpy("success"),
                    xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function (args) {
                    if (this.readyState == this.DONE) {
                        doneFn(this.responseText);
                    }
                };
                xhr.open("GET", "/some/cool/url");
                xhr.send();
                expect(jasmine.Ajax.requests.mostRecent().url).toBe('/some/cool/url');
                expect(doneFn).not.toHaveBeenCalled();
                jasmine.Ajax.requests.mostRecent().respondWith({
                    "status": 200,
                    "contentType": 'text/plain',
                    "responseText": 'awesome response'
                });
                expect(doneFn).toHaveBeenCalledWith('awesome response');
            });
            it("allows responses to be setup ahead of time", function () {
                var doneFn = jasmine.createSpy("success"),
                    xhr = new XMLHttpRequest();
                jasmine.Ajax.stubRequest('/another/url').andReturn({
                    "responseText": 'immediate response'
                });
                xhr.onreadystatechange = function (args) {
                    if (this.readyState == this.DONE) {
                        doneFn(this.responseText);
                    }
                };
                xhr.open("GET", "/another/url");
                xhr.send();
                expect(doneFn).toHaveBeenCalledWith('immediate response');
            });
        });
        it("allows use in a single spec", function() {
            var doneFn = jasmine.createSpy('success');
            jasmine.Ajax.withMock(function() {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function(args) {
                    if (this.readyState == this.DONE) {
                        doneFn(this.responseText);
                    }
                };
                xhr.open("GET", "/some/cool/url");
                xhr.send();
                expect(doneFn).not.toHaveBeenCalled();
                jasmine.Ajax.requests.mostRecent().respondWith({
                    "status": 200,
                    "responseText": 'in spec response'
                });
                expect(doneFn).toHaveBeenCalledWith('in spec response');
            });
        });
    });

});
