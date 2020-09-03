var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
define("src/slow-numbers/slow-numbers", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SlowNumbers = void 0;
    function format(value) {
        return value.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
    }
    var SlowNumbers = /** @class */ (function () {
        function SlowNumbers(selector, currentValue, options) {
            if (currentValue === void 0) { currentValue = 0; }
            if (options === void 0) { options = {}; }
            this.selector = selector;
            this.currentValue = currentValue;
            this.options = options;
            this.$element = document.querySelector(selector);
            this.updateElementValue();
        }
        SlowNumbers.prototype.stopChange = function () {
            clearTimeout(this.timer);
        };
        SlowNumbers.prototype.changeTo = function (endValue, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            this.options = __assign(__assign({}, this.options), options);
            clearTimeout(this.timer);
            var timeDelta = 0;
            var timeOut = 0;
            var slowSpeed = this.options.slowSpeed / 100 || 0.1;
            var insertValue = function () {
                _this.updateElementValue();
                if (_this.stopped) {
                    clearTimeout(_this.timer);
                    _this.stopped = false;
                    return;
                }
                _this.timer = setTimeout(function () {
                    var diff = Math.abs(endValue - _this.currentValue);
                    var diffLength = diff.toString().length;
                    var step = 0;
                    if (diff !== 0) {
                        timeDelta = Math.floor((1000 / diff) - timeOut);
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
                        if (endValue > _this.currentValue) {
                            _this.currentValue += step;
                        }
                        else {
                            _this.currentValue -= step;
                        }
                        timeOut += Math.floor(timeDelta * slowSpeed);
                        insertValue();
                    }
                    else {
                        clearTimeout(_this.timer);
                    }
                }, timeOut);
            };
            insertValue();
        };
        SlowNumbers.prototype.updateElementValue = function () {
            this.$element.innerText = this.options.format ? format(this.currentValue) : this.currentValue.toString();
        };
        return SlowNumbers;
    }());
    exports.SlowNumbers = SlowNumbers;
});
define("index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
