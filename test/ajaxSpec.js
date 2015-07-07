describe('ajax suite text', function () {
    var div;

    beforeEach(function () {
        div = document.createElement('div');
        div.id = 'text';
        div.className = "test0";
        div.setAttribute('name', 'box');
        div.innerHTML = "<ul><li id='item1'>item1</li><li id='item2'>item2</li></ul>" +
                        "<p><span>text</span></p><p>text</p>" +
                        "<div class='test1'>innerdiv</div>";
        document.body.appendChild(div);
    });

    afterEach(function () {
        document.body.removeChild(div);
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
