(function ($) {

    var timerId = [],
        initItems = 0,
        methods = {
            init: function (options) {

                var settings = $.extend({
                    start: 0,
                    end: 0
                }, options);

                return this.each(function () {

                    var $this = $(this);

                    $this.css(settings);
                    $this.prop('changeNumbersValue', '0');
                    $this.prop('changeNumbersId', initItems);

                    initItems++;
                });
            },
            stop: function () {
                return this.each(function (i) {
                    clearTimeout(timerId[i]);
                })
            },
            update: function (opt) {

                return this.each(function () {
                    var $this = $(this),
                        timeDelta = 0,
                        tId = $this.prop('changeNumbersId'),
                        time = 0,
                        start = opt.start,
                        end = opt.end,
                        speed = 0.25;

                    clearTimeout(timerId[tId]);

                    insertValue();

                    function insertValue() {
                        $this.prop('changeNumbersValue', start.toString());
                        $this.text(start);

                        timerId[tId] = setTimeout(function () {

                            if (Math.abs(end - start) !== 0) {
                                timeDelta = 10 / Math.abs(end - start);

                                if (end > start) {
                                    start += 1;
                                }
                                if (end < start) {
                                    start -= 1;
                                }

                                time += (timeDelta * speed);

                                insertValue();
                            } else {
                                clearTimeout(timerId[tId]);
                            }
                        }, time);
                    }
                });
            }
        };

    $.fn.changeNumbers = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.tooltip');
        }
    }
})(jQuery);

$(function () {

    $('.wrap').find('.test').changeNumbers({
        start: 0,
        end: 100
    });

    $('.wrap').find('.test-1').changeNumbers({
        start: 0,
        end: 100
    });


    $('.wrap').find('.btn').each(function (i, btn) {
        $(btn).on('click', function (e) {
            e.preventDefault();

            var start = $(btn).parent().find('.test').prop('changeNumbersValue') || 0;
            var end = parseInt($(btn).parent().find('.inp').val());

            $(btn).parent().find('.test').prop('changeNumbersValue', start.toString());

            $(btn).parent().find('.test').changeNumbers('update', {
                start: parseInt(start),
                end: end
            });
        });
    });

    $('.wrap').find('.stop').each(function (i, btn) {
        $(btn).on('click', function (e) {
            e.preventDefault();
            $('.wrap').find('.test').changeNumbers('stop');
        })
    });
});