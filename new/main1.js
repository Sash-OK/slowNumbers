(function ($) {

    var timerId = [],
        methods = {
            init: function (options) {

                var settings = $.extend({
                    width: '1000px',
                    height: '200px',
                    margin: '0 auto',
                    border: '0'
                }, options);

                return this.each(function () {

                    var $this = $(this);

                    $this.css(settings);
                    $this.prop('changeNumbersValue', '0');
                });
            },
            stop: function () {
                return this.each(function (i) {
                    clearTimeout(timerId[i]);
                })
            },
            update: function (opt) {

                return this.each(function (i) {
                    var $this = $(this),
                        timeDelta = 0,
                        time = 0,
                        start = opt.start,
                        end = opt.end,
                        speed = 0.25;

                    clearTimeout(timerId[i]);

                    insertValue();

                    function insertValue() {
                        $this.prop('changeNumbersValue', start.toString());
                        $this.text(start);

                        timerId[i] = setTimeout(function () {

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
                                clearTimeout(timerId[i]);
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
        width: '200px',
        height: '100px',
        margin: '10px auto',
        border: '1px solid red'
    });


    $('.wrap').find('.btn').each(function (i, btn) {
        $(btn).on('click', function (e) {
            e.preventDefault();

            var start = parseInt($(btn).parent().find('.test').prop('changeNumbersValue'));
            var end = parseInt($(btn).parent().find('.inp').val());

            $(btn).parent().find('.test').prop('changeNumbersValue', start.toString());

            $('.wrap').find('.test').changeNumbers('update', {
                start: start,
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