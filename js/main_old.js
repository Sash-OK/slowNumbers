(function ($) {
    var options,
        timeOutTimers = [],
        refresh = function (number, time, timerId,isFormat, $elem) {
            var format = number.toString();
            timeOutTimers[timerId] = setTimeout(function () {

                if (isFormat) {
                    format = format.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
                }

                $elem.prop('startValue', number);
                $elem.text(format);

                return timeOutTimers;
            }, time);
        };

    $.fn.changeNumbers = function (options) {
        var time = 0,
            timeDelta = 0,
            timerId = 0,
            speed;

        options = $.extend({
            start: 0,
            end: 1,
            format: true
        }, options);

        var start = parseInt(options.start),
            end = parseInt(options.end);

        if (timeOutTimers.length) {
            for (var i = 0; i < timeOutTimers.length; i++) {
                clearTimeout(timeOutTimers[i]);
            }
        }

        if (isNaN(start)) {
            console.error('StartValue is NaN');
            return false;
        }

        if (isNaN(end)) {
            console.error('EndValue is NaN');
            return false;
        }

        for (start; end !== start;) {

            if (Math.abs(end - start) < 2e4) {
                timeDelta = 1000 / Math.abs(end - start);

                if (end > start) {
                    start++;
                }
                if (end < start) {
                    start--;
                }

            } else if (Math.abs(end - start) >= 2e4 && Math.abs(end - start) < 5e5) {
                timeDelta = (1000 / Math.abs(end - start));

                if (end > start) {
                    start += 9;
                }
                if (end < start) {
                    start -= 9;
                }

            } else if (Math.abs(end - start) >= 5e5 && Math.abs(end - start) < 1e6) {
                timeDelta = (1000 / Math.abs(end - start));

                if (end > start) {
                    start += 49;
                }
                if (end < start) {
                    start -= 49;
                }

            } else if (Math.abs(end - start) > 1e6) {
                timeDelta = (1000 / Math.abs(end - start));

                if (end > start) {
                    start += 699;
                }
                if (end < start) {
                    start -= 699;
                }
            }

            refresh(start, time, timerId, options.format, this);
            time += (timeDelta * 0.4);
            timerId++;
        }
    };
})(jQuery);

$(document).ready(function () {

    $('.ch1').on('change', function (e) {
        //e.preventDefault();

        var startValue = $('.num1').prop('startValue') || 0,
            endValue = 0;

        $('.ch1').each(function (i, input) {
            if (input.checked) {
                endValue += parseInt(input.value);
            }
        });

        $('.num1').changeNumbers({
            start: startValue,
            end: endValue,
            format: false
        });

        $('.num2').changeNumbers({
            start: endValue,
            end: startValue
        });
    });

    $('.ch2').on('keyup', function (e) {
        //e.preventDefault();

        var startValue = $('.num2').prop('startValue') || 0,
            endValue = 0;
        endValue += parseInt(this.value);

        $('.num2').changeNumbers({
            start: startValue,
            end: endValue
        });
    });
});