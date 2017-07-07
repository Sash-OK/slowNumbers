(function ($) {

    var timerId = [],
        methods = {
            init: function(options) {

                var settings = $.extend({
                    width: '1000px',
                    height: '200px',
                    margin: '0 auto',
                    border: '0'
                }, options);

                return this.each(function () {

                    var $this = $(this);

                    $this.css(settings);
                    $this.prop('numbers', '0');
                });
            },
            insert: function(content) {

                return this.each(function (i) {

                    var $this = $(this),
                        numbers = parseInt($this.prop('numbers'));

                    //inserts.push(content);
                    $this.prop('numbers', (numbers + 1).toString());
                    //console.log($this.prop('inserts'));
                    $this.text(content);
                });
            }
        };

    $.fn.testing = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' +  method + ' не существует для jQuery.tooltip');
        }
    }
})(jQuery);

$(function () {

    $('.wrap').find('.test').testing({
        width: '200px',
        height: '100px',
        margin: '10px auto',
        border: '1px solid red'
    });

    var timeDelta = 0,
        timerId = [],
        speed = 0.25;

    function tick(start, end, id, time) {
        $('.wrap').find($('.test').get(id)).testing('insert', start);

        timerId[id] = setTimeout(function () {

            if (Math.abs(end - start) < 5e5) {
                timeDelta = 100 / Math.abs(end - start);

                if (end > start) {
                    start += 1;
                }
                if (end < start) {
                    start -= 1;
                }

                time += (timeDelta * speed);

                //timerId[id] = setTimeout(tick, Math.floor(time * 100) / 100);

                tick(start, end, id, time)
            } else {
                clearTimeout(timerId[id]);
                debugger;
            }
        }, time);
    }


    $('.wrap').find('.btn').each(function (i, btn) {
        $(btn).on('click', function (e) {

            e.preventDefault();
            clearTimeout(timerId[i]);
            var start = parseInt($(this).parent().find('.test').prop('numbers'));
            var end = parseInt($(this).parent().find('.inp').val());

            $(this).parent().find('.test').prop('numbers', start.toString());

            tick(start, end, i, 0);
        })
    });

    $('.wrap').find('.stop').each(function (i, btn) {
        $(btn).on('click', function (e) {
            e.preventDefault();
            clearTimeout(timerId[i]);
        })
    })
});