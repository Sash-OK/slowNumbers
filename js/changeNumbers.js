(function ($) {

    var timerId = [],
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

                    $this.prop('changeNumbersValue', settings.start);
                    $this.text(numValue);
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
                        speed = opt.speed || 0.1,
                        isFormat = opt.format || false;

                    clearTimeout(timerId[tId]);

                    insertValue();

                    function insertValue() {
                        var numValue = start.toString();

                        if (isFormat) {
                            numValue = numValue.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
                        }

                        $this.prop('changeNumbersValue', start.toString());
                        $this.text(numValue);

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
