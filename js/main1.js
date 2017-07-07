(function ($) {

    var methods = {
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

            return this.each(function () {

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

    var start = 0,
        end = 100,
        timeDelta = 0,
        time = 0,
        timerId,
        speed = 0.2;

    function tick() {
        $('.wrap').find('.test').testing('insert', start);

        if (end !== start) {
            if (Math.abs(end - start) < 5e2) {
                timeDelta = 100 / Math.abs(end - start);

                if (end > start) {
                    start += 1;
                }
                if (end < start) {
                    start -= 1;
                }

                time += (timeDelta * speed);

                timerId = setTimeout(tick, Math.floor(time * 100) / 100);

            } else if (Math.abs(end - start) >= 5e2 && Math.abs(end - start) < 5e3) {
                timeDelta = (100 / Math.abs(end - start));

                if (end > start) {
                    start += 19;
                }
                if (end < start) {
                    start -= 19;
                }

                time += (timeDelta * speed);

                timerId = setTimeout(tick, Math.floor(time * 100) / 100);

            } else if (Math.abs(end - start) >= 5e3 && Math.abs(end - start) < 1e4) {
                timeDelta = (100 / Math.abs(end - start));

                if (end > start) {
                    start += 99;
                }
                if (end < start) {
                    start -= 99;
                }

                time += (timeDelta * speed);

                timerId = setTimeout(tick, Math.floor(time * 100) / 100);

            } else if (Math.abs(end - start) > 1e4) {
                timeDelta = (100 / Math.abs(end - start));

                if (end > start) {
                    start += 599;
                }
                if (end < start) {
                    start -= 599;
                }

                time += (timeDelta * speed);

                timerId = setTimeout(tick, Math.floor(time * 100) / 100);
            }
        } else {
            clearTimeout(timerId);
            debugger;
        }
    }

    tick();

    //$('.wrap').find('.test').testing('insert', 'aaaaaaaaaaaa');

    $('.wrap').find('.btn').on('click', function (e) {
        e.preventDefault();
        clearTimeout(timerId);
        start = parseInt($(this).parent().find('.test').prop('numbers'));
        end = parseInt($(this).parent().find('.inp').val());
        time = 0;
        $(this).parent().find('.test').prop('numbers', start.toString());
        tick();
    });

    $('.wrap').find('.stop').on('click', function (e) {
        e.preventDefault();
        clearTimeout(timerId);
    })
});