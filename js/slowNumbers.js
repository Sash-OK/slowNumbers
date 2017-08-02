(function ($) {

    var timers = [],
        initItems = 0,
        methods = {
            init: function (options) {

                var settings = $.extend({
                    start: 0,
                    end: 0,
                    format: false
                }, options);

                return this.each(function () {

                    var $this = $(this),
                        isFormat = settings.format,
                        numValue = settings.start.toString();

                    if (isFormat) {
                        numValue = numValue.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
                    }

                    $this.prop('slowNumbersValue', settings.start);
                    $this.text(numValue);
                    $this.prop('slowNumbersId', initItems);

                    initItems++;
                });
            },
            stop: function () {
                return this.each(function () {

                    var id = $(this).prop('slowNumbersId');

                    clearTimeout(timers[id]);
                })
            },
            update: function (opt) {

                return this.each(function () {
                    var $this = $(this),
                        timeDelta = 0,
                        tId = $this.prop('slowNumbersId'),
                        time = 0,
                        start = parseInt(opt.start) || parseInt($this.prop('slowNumbersValue')) || 0,
                        end = parseInt(opt.end),
                        slowSpeed = parseFloat(opt.slowSpeed) / 100 || 0.1,
                        isFormat = opt.format || false;

                    clearTimeout(timers[tId]);

                    if (isNaN(end)) {
                        console.error('Конечное число не может быть равно - NaN!');
                    } else {
                        insertValue();
                    }

                    function insertValue() {
                        var numValue = start.toString();

                        if (isFormat) {
                            numValue = numValue.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
                        }

                        $this.prop('slowNumbersValue', start.toString());
                        $this.text(numValue);

                        timers[tId] = setTimeout(function () {
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
                                        step = 11;
                                        break;
                                    case 4:
                                        step = 111;
                                        break;
                                    case 5:
                                        step = 1111;
                                        break;
                                    case 6:
                                        step = 11111;
                                        break;
                                    case 7:
                                        step = 111111;
                                        break;
                                    case 8:
                                        step = 1111111;
                                        break;
                                    case 9:
                                        step = 11111111;
                                        break;
                                    default: step = 111111111;
                                }

                                if (end > start) {
                                    start += step;
                                } else {
                                    start -= step;
                                }

                                time += Math.floor(timeDelta * slowSpeed);

                                insertValue();
                            } else {
                                clearTimeout(timers[tId]);
                            }
                        }, time);
                    }
                });
            }
        };

    $.fn.slowNumbers = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.tooltip');
        }
    }
})(jQuery);
