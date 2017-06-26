(function ($) {

    $.fn.changeNumbers = function (options) {
        var time = 0,
            timeDelta = 0,
            timerId = 0;

        options = $.extend({
            start: 0,
            end: 0,
            format: true
        }, options);

        $.fn.changeNumbers.timers = [];

        $.fn.changeNumbers.updateValue = function(timeOutTimers) {
            //var timeOutTimers = $elem.prop('timersArr');
            debugger;
            //console.log(timeOutTimers);
            if (timeOutTimers) {
                for (var i = 0; i < timeOutTimers.length; i++) {
                    clearTimeout(timeOutTimers[i]);
                }
            }
            /*$elem.prop('timersArr', 0).length = 0;
            console.log(timeOutTimers);*/
        };

        $.fn.changeNumbers.setValue = function(number, time, timerId, isFormat, $elem) {
            var formatted = number.toString();

            $($elem).changeNumbers.timers[timerId] = setTimeout(function () {

                if (isFormat) {
                    formatted = formatted.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
                }

                $($elem).prop('startValue', number);
                //$($elem).prop('timersArr', timeOutTimers);
                $($elem).text(formatted);


            }, time);
        };

        this.each(function () {

            var start = parseInt(options.start),
                end = parseInt(options.end);

            console.log($(this).changeNumbers.timers);

            $(this).changeNumbers.updateValue($(this).changeNumbers.timers);

            if (isNaN(start)) {
                console.error('StartValue is NaN');
                return false;
            }

            if (isNaN(end)) {
                console.error('EndValue is NaN');
                return false;
            }

            for (start; end !== start;) {

                if (Math.abs(end - start) < 5e4) {
                    timeDelta = 1000 / Math.abs(end - start);

                    if (end > start) {
                        start++;
                    }
                    if (end < start) {
                        start--;
                    }

                } else if (Math.abs(end - start) >= 5e4 && Math.abs(end - start) < 5e5) {
                    timeDelta = (1000 / Math.abs(end - start));

                    if (end > start) {
                        start += 19;
                    }
                    if (end < start) {
                        start -= 19;
                    }

                } else if (Math.abs(end - start) >= 5e5 && Math.abs(end - start) < 1e6) {
                    timeDelta = (1000 / Math.abs(end - start));

                    if (end > start) {
                        start += 99;
                    }
                    if (end < start) {
                        start -= 99;
                    }

                } else if (Math.abs(end - start) > 1e6) {
                    timeDelta = (1000 / Math.abs(end - start));

                    if (end > start) {
                        start += 599;
                    }
                    if (end < start) {
                        start -= 599;
                    }
                }

                $(this).changeNumbers.setValue(start, time, timerId, options.format, this);
                time += (timeDelta * 0.4);
                timerId++;
            }
        });
    };
})(jQuery);

$(document).ready(function () {

    $('.ch1').on('change', function () {

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

    $('.ch2').on('keyup', function () {

        var startValue = $('.num2').prop('startValue') || 0,
            endValue = 0;
        endValue += parseInt(this.value);

        $('.num2').changeNumbers({
            start: startValue,
            end: endValue
        });
    });
});/**
 * Created by SSS on 04.11.2016.
 */
