describe('Zepto Test Suit', function () {
    describe('$ Test Suit', function () {
        it('当传入function的时候，会对当前dom数组遍历执行', function () {
            var originDom = $.dom,
                result = [];
            $.dom = [1, 2, 3];

            $(function (value, index, array) {
                result.push(value * 2);
            });

            expect(result).toEqual([2, 4, 6]);

            $.dom = originDom;
        });
    });
});
