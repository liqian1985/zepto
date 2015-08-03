describe('zepto suite text', function () {
    var div;

    beforeEach(function () {
        div = document.createElement('div');
        div.id = 'text';
        div.className = "test0";
        div.setAttribute('name', 'box');
        div.innerHTML = "<ul id='ul1'><li id='item1'>item1</li>" +
                            "<li id='item2'>" +
                                "<ul><li id='item2-1'>item2-1</li><li>item2-2</li></ul>" +
                            "</li>" +
                        "</ul>" +
                        "<p><span>spantext</span></p><p>text</p>" +
                        "<input type='text' value='inputval' />" +
                        "<div class='test1'>innerdiv</div>";
        document.body.appendChild(div);
    });

    afterEach(function () {
        document.body.removeChild(div);
    });

    describe('fn.dom suite text', function () {
        it ('验证$函数返回值中包含dom数组属性', function () {
            var result = $('div'),
                arrayResult = [1, 2, 3];

            expect(result.dom).toEqual(jasmine.any(Array));
            expect(result.dom.length).toBe(2);
            expect(result.dom[0]).toBe(div);
            expect(result.dom[1].innerHTML).toBe('innerdiv');

            expect(arrayResult.length).toBe(3);
            expect(arrayResult).toEqual(jasmine.any(Array));
        })
    });

    describe('$.fn.get() suite text', function () {
        it('验证$.fn.get()方法', function () {
            var result = $('div');
            expect(result.get).toEqual(jasmine.any(Function));
            expect(result.get(0)).toBe(div);
            expect(result.get(1).innerHTML).toBe('innerdiv');
        });
    });

    describe('$.fn.size() suite text', function () {
        it('验证$.fn.size()', function () {
            expect($('div').size()).toBe(2);
        });
    });

    describe('$.fn.remove() suite text', function () {
        it('验证$.fn.remove()方法', function () {
            var result = $('p');
            //result.remove('span');
            expect($.fn.remove).toEqual(jasmine.any(Function));
            //expect($('span').dom.length).toBe(0);
        });
    });

    describe('each() suite text', function () {
        it('验证$.fn.each方法', function () {
            var result = $('div');
            result.each(function () {
                $(this).html('123');
            });
            expect($.fn.each).toEqual(jasmine.any(Function));
            expect(result.dom[0].innerHTML).toBe('123');
            expect(result.dom[1].innerHTML).toBe('123');
        });
    });

    describe('filter() suite text', function () {
        it('验证 $.fn.filter 方法', function () {
            var result = $('div').filter('.test1');
            expect($.fn.filter).toEqual(jasmine.any(Function));
            expect(result.dom.length).toBe(1);
            expect(result.dom[0].className).toBe('test1');
            expect(result.dom[0].innerHTML).toBe('innerdiv');
        });
    });

    describe('is suite text', function () {
        it('验证$.fn.is方法', function () {
            var result = $('#ul1'),
                result2 = result.dom[0].parentNode;
            expect($.fn.is).toEqual(jasmine.any(Function));
            expect(result.dom.length).toBe(1);
            expect(result.dom[0].parentNode.nodeName).toBe('DIV');
            expect($(result2).is("div")).toBe(true);
        });
    });

    describe('first suite text', function () {
        it('验证$.fn.first 方法', function () {
            var result = $('div').first();
            expect($.fn.first).toEqual(jasmine.any(Function));
            expect(result.dom.length).toBe(1);
            expect(result.dom[0].id).toBe('text');
        });
    });

    describe('last suite text', function () {
        it('验证$.fn.last 方法', function () {
            var result = $('div').last();
            expect($.fn.last).toEqual(jasmine.any(Function));
            expect(result.dom.length).toBe(1);
            expect(result.dom[0].innerHTML).toBe('innerdiv');
        });
    });

    describe('find suite text', function () {
        it('验证$.fn.find 方法', function () {
            var result = $('div'),
                result2 = result.find('p');
            expect($.fn.find).toEqual(jasmine.any(Function));
            expect(result2.dom.length).toBe(2);
            expect(typeof(result2.dom)).toBe('object');
        });
    });

    describe('closest suite text', function () {
       it('验证 closest 方法', function () {
           var result = $('#item2-1').closest('li');
           expect($.fn.closest).toEqual(jasmine.any(Function));
           expect(result.dom.length).toBe(1);
       });
    });

    describe('parents suite text', function () {
        it('验证parents()', function () {
            var result = $('#item1'),
                result1 = result.parents(),
                result2 = result.parents('div');
            expect($.fn.parents).toEqual(jasmine.any(Function));
            expect(result1.dom[0].id).toBe('ul1');
            expect(result2.dom[0].id).toBe('text');
        });
    });

    describe('parent suite text', function () {
        it('验证parent()', function () {
            var result = $('#item1'),
                result1 = result.parent(),
                result2 = result.parent('ul');
            expect($.fn.parent).toEqual(jasmine.any(Function));
            expect(result1.dom[0].id).toBe('ul1');
            expect(result2.dom[0].id).toBe('ul1');
        });
    });

    describe('show suite text', function () {
        it('验证 show 方法', function () {
            var result = $('div');
            result.show();
            expect($.fn.show).toEqual(jasmine.any(Function));
            expect(result.dom[0].style.display).toBe('block');
        });
    });

    describe('hide suite text', function () {
        it('验证 hide 方法', function () {
            var result = $('div');
            result.hide();
            expect($.fn.hide).toEqual(jasmine.any(Function));
            expect(result.dom[0].style.display).toBe('none');
        });
    });

    describe('prev suite text', function () {
        it('验证 prev 方法', function () {
            var result = $('#item2'),
                result2 = result.prev();

            expect($.fn.prev).toEqual(jasmine.any(Function));
            expect(result2.dom[0].id).toBe('item1');
        });
    });

    describe('next suite text', function () {
        it('验证 next 方法', function () {
            var result = $('#item1'),
                result2 = result.next();

            expect($.fn.next).toEqual(jasmine.any(Function));
            expect(result2.dom[0].id).toBe('item2');
        });
    });

    describe('html suite text', function () {
        it ('验证$函数返回值中包含html方法', function () {
            var result = $('div'),
                $span = $('span');
            result.html('123');
            expect($.fn.html).toEqual(jasmine.any(Function));
            expect(result.dom[0].innerHTML).toBe('123');
            expect(result.dom[1].innerHTML).toBe('123');
            expect($span.html()).toBe('spantext');
        });
    });

    describe('text suite text', function () {
        it ('验证$函数返回值中包含text方法', function () {
            var result = $('div');
            result.text('123');
            expect($.fn.text).toEqual(jasmine.any(Function));
            expect(result.dom[0].innerText).toBe('123');
            expect(result.dom[1].innerText).toBe('123');
            //expect($('span').text()).toBe('spantext');
        });
    });

    describe('attr suite text', function () {
        it ('验证$函数返回值中包含attr方法', function () {
            var result = $('div');
            result.attr('data', '123');
            expect($('p').attr('data')).toBe(undefined);
            expect($('i').attr('data')).toBe(null);
            expect($.fn.attr).toEqual(jasmine.any(Function));
            expect(result.attr('name')).toBe('box');
            expect(result.dom[0].getAttribute('name')).toBe('box');
            expect(result.dom[0].getAttribute('data')).toBe('123');
            expect(result.dom[1].getAttribute('data')).toBe('123');
            expect($('input').attr('value')).toBe('inputval');
        });
    });

    describe('$.css suite text', function () {
        it ('验证$函数返回值中包含css方法', function () {
            var result = $('div');
            result.css('width', '100px');
            result.css('font-size', '12px');
            expect($.fn.css).toEqual(jasmine.any(Function));
            expect(result.dom[0].style.width).toBe('100px');
            expect(result.dom[0].style.fontSize).toBe('12px');
            expect(result.dom[1].style.fontSize).toBe('12px');
        });
    });

    describe('offset suite text', function () {
        it('验证offset方法', function () {
            var result = $('div'),
                top,
                left;
            document.body.style.position = 'relative';
            result.dom[0].style.position = 'absolute';
            result.dom[0].style.top = '100px';
            result.dom[0].style.left = '100px';
            top = result.offset().top + document.body.scrollTop;
            left = result.offset().left + document.body.scrollLeft;

            expect($.fn.offset).toEqual(jasmine.any(Function));
            expect(result.offset().top).toBe(top);
            expect(result.offset().left).toBe(left);
            expect(result.offset().width).toBe(result.dom[0].getBoundingClientRect().width);
            expect(result.offset().height).toBe(result.dom[0].getBoundingClientRect().height);
        });
    });

    describe('width height suite text', function () {
        it('验证width height的返回值', function () {
            var result = $('div');
            document.body.style.position = 'relative';
            result.dom[0].style.position = 'absolute';

            expect($.fn.width).toEqual(jasmine.any(Function));
            expect($.fn.height).toEqual(jasmine.any(Function));
            expect(result.width()).toBe(result.offset().width);
            expect(result.height()).toBe(result.offset().height);
        });
    });

    describe('index suite text', function () {
        it('验证$函数返回值中包含index方法', function () {
            var result = $('p');
            result.each(function () {
                $(this).html(result.index(this));
            });
            expect($.fn.index).toEqual(jasmine.any(Function));
            expect(result.dom[0].innerHTML).toBe('0');
            expect(result.dom[1].innerHTML).toBe('1');
        });
    });

    describe('链式语法', function () {
        it ('测试$方法返回值的链式语法', function () {
            var result = $('div');
            result.html('456').css('height', '100px');
            expect(result.dom[0].innerHTML).toBe('456');
            expect(result.dom[1].innerHTML).toBe('456');
            expect(result.dom[0].style.height).toBe('100px');
            expect(result.dom[1].style.height).toBe('100px');
        });
    });

    describe('append suite text', function () {
        it ('验证$方法返回值中包含append方法', function () {
            var result = $('div'),
                appendB;
            result.append('<b class="app">appendHTML</b>');
            appendB = $('b');
            expect($.fn.append).toEqual(jasmine.any(Function));
            expect(appendB.dom.length).toBe(2);
            expect(appendB.dom[0].innerHTML).toBe('appendHTML');
            expect(appendB.dom[1].innerHTML).toBe('appendHTML');
            expect(appendB.dom[1].parentNode.id).toBe('text');
        });
    });

    describe('prepend suite text', function () {
        it('验证$方法返回值中包含prepend方法', function () {
            var result = $('div'),
            prependB;
            result.prepend('<b>prependHTML</b>');
            prependB = $('b');
            expect($.fn.prepend).toEqual(jasmine.any(Function));
            expect(prependB.dom.length).toBe(2);
            expect(prependB.dom[0].innerHTML).toBe('prependHTML');
            expect(prependB.dom[1].innerHTML).toBe('prependHTML');
            expect(prependB.dom[0].parentNode.id).toBe('text');
        });
    });

    describe('addClass suite text', function () {
        it('验证$方法返回值中包含addClass方法', function () {
            var result = $('div');
            result.addClass('test');
            expect($.fn.addClass).toEqual(jasmine.any(Function));
            expect(result.dom.length).toBe(2);
            expect(result.dom[0].className).toBe('test0 test');
            expect(result.dom[1].className).toBe('test1 test');
        });
    });

    describe('removeClass suite text', function () {
        it('验证$方法返回值中包含removeClass方法', function () {
            var result = $('div');
            result.removeClass('test0');
            expect($.fn.removeClass).toEqual(jasmine.any(Function));
            expect(result.dom.length).toBe(2);
            expect(result.dom[0].className).toBe('');
            expect(result.dom[1].className).toBe('test1');
        });
    });

    describe('toggleClass suite text', function () {
        it('验证$方法返回值中包含toggleClass方法', function () {
            var result = $('div');
            result.toggleClass('test0');
            expect($.fn.toggleClass).toEqual(jasmine.any(Function));
            expect(result.dom[0].className).toBe('');
            expect(result.dom[1].className).toBe('test1 test0');
        });
    });
});
