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

            expect(result.dom).toEqual(jasmine.any(Array));
            expect(result.dom.length).toBe(2);
            expect(result.dom[0]).toBe(div);
            expect(result.dom[1].innerHTML).toBe('innerdiv');
        })
    });

    describe('$.html suite text', function () {
        it ('验证$函数返回值中包含html方法', function () {
            var result = $('div');
            result.html('123');
            expect(result.html).toEqual(jasmine.any(Function));
            expect(result.dom[0].innerHTML).toBe('123');
            expect(result.dom[1].innerHTML).toBe('123');
        });
    });

    describe('$.css suite text', function () {
        it ('验证$函数返回值中包含css方法', function () {
            var result = $('div');
            result.css('width:100px');
            result.css('font-size:12px');
            expect(result.css).toEqual(jasmine.any(Function));
            expect(result.dom[0].style.width).toBe('100px');
            expect(result.dom[0].style.fontSize).toBe('12px');
            expect(result.dom[1].style.fontSize).toBe('12px');
        });
    });
    describe('链式语法', function () {
        it ('测试$方法返回值的链式语法', function () {
            var result = $('div');
            result.html('456').css('height:100px');
            expect(result.dom[0].innerHTML).toBe('456');
            expect(result.dom[1].innerHTML).toBe('456');
            expect(result.dom[0].style.height).toBe('100px');
            expect(result.dom[1].style.height).toBe('100px');
        });
    });
    describe('$.append suite text', function () {
        it ('验证$方法返回值中包含append方法', function () {
            var result = $('div'),
                appendB;
            result.append('<b class="app">appendHTML</b>');
            appendB = $('b');
            expect(appendB.dom.length).toBe(2);
            expect(appendB.dom[0].innerHTML).toBe('appendHTML');
            expect(appendB.dom[1].innerHTML).toBe('appendHTML');
            expect(appendB.dom[1].parentNode.id).toBe('text');
        });
    });
    describe('$.prepend suite text', function () {
        it('验证$方法返回值中包含prepend方法', function () {
            var result = $('div'),
            prependB;
            result.prepend('<b>prependHTML</b>');
            prependB = $('b');
            expect(prependB.dom.length).toBe(2);
            expect(prependB.dom[0].innerHTML).toBe('prependHTML');
            expect(prependB.dom[1].innerHTML).toBe('prependHTML');
            expect(prependB.dom[0].parentNode.id).toBe('text');
        });
    });

});