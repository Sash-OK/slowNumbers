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

                    $this.prop('changeNumbersValue', settings.start);
                    $this.text(settings.start);
                    $this.prop('changeNumbersId', initItems);

                    initItems++;
                });
            },
            stop: function () {
                return this.each(function () {

                    var id = $(this).prop('changeNumbersId');

                    clearTimeout(timerId[id]);
                })
            },
            update: function (opt) {

                return this.each(function () {
                    var $this = $(this),
                        timeDelta = 0,
                        tId = $this.prop('changeNumbersId'),
                        time = 0,
                        start = parseInt(opt.start),
                        end = parseInt(opt.end),
                        speed = 0.1;

                    clearTimeout(timerId[tId]);

                    insertValue();

                    function insertValue() {
                        $this.prop('changeNumbersValue', start.toString());
                        $this.text(start);

                        timerId[tId] = setTimeout(function () {
                            var diff = Math.abs(end - start),
                                diffLength = diff.toString().length,
                                step = 0;

                            if (diff !== 0) {
                                timeDelta = Math.floor((1000 / diff) - time);

                                switch (diffLength) {
                                    case 1:
                                    case 2:
                                        step = 1;
                                        break;
                                    case 3:
                                        step = 9;
                                        break;
                                    case 4:
                                        step = 49;
                                        break;
                                    case 5:
                                        step = 999;
                                        break;
                                    case 6:
                                        step = 4999;
                                        break;
                                    case 7:
                                        step = 99999;
                                        break;
                                    case 8:
                                        step = 999999;
                                        break;
                                    default: step = 9999999;
                                }

                                if (end > start) {
                                    start += step;
                                } else {
                                    start -= step;
                                }

                                time += Math.floor(timeDelta * speed);

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

    $('.test-e').changeNumbers({
        start: 100
    });


    $('.wrap').find('.btn').each(function (i, btn) {
        $(btn).on('click', function (e) {
            e.preventDefault();

            var start = $(btn).parent().find('.test').prop('changeNumbersValue') || 0;
            var end = $(btn).parent().find('.inp').val();

            //$(btn).parent().find('.test').prop('changeNumbersValue', start.toString());

            $(btn).parent().find('.test').changeNumbers('update', {
                start: start,
                end: end
            });
        });
    });

    $('.inp-e').on('keyup', function () {
        var start = $('.test-e').prop('changeNumbersValue') || 0;
        var end = $(this).val();
        $('.test-e').changeNumbers('update', {
            start: start,
            end: end
        })
    });

    $('.wrap').find('.stop').each(function (i, btn) {
        $(btn).on('click', function (e) {
            e.preventDefault();
            $(btn).parent().find('.test').changeNumbers('stop');
        })
    });

    $('.wrap').find('.btn-1').on('click', function () {

        var start = $('.test-1').prop('changeNumbersValue') || 0;
        var end = $('.inp-1').val();

        $('.test-1').changeNumbers('update', {
            start: start,
            end: end
        })
    });

    $('.stop-1').on('click', function (e) {
        e.preventDefault();
        $('.test-1').changeNumbers('stop');
    });
});