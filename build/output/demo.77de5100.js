// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/slow-numbers/slow-numbers.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlowNumbers = void 0;

function format(value) {
  return value.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
}

var SlowNumbers =
/** @class */
function () {
  function SlowNumbers($element, currentValue, options) {
    if (currentValue === void 0) {
      currentValue = 0;
    }

    if (options === void 0) {
      options = {};
    }

    this.$element = $element;
    this.currentValue = currentValue;
    this.options = options;
    this.updateElementValue();
  }

  SlowNumbers.prototype.stopChange = function () {
    clearTimeout(this.timer);
  };

  SlowNumbers.prototype.changeTo = function (endValue, options) {
    if (options === void 0) {
      options = {};
    }

    this.startChanging(endValue, options);
  };

  SlowNumbers.prototype.add = function (value, options) {
    if (options === void 0) {
      options = {};
    }

    this.startChanging(this.currentValue + value, options);
  };

  SlowNumbers.prototype.subtract = function (value, options) {
    if (options === void 0) {
      options = {};
    }

    this.startChanging(this.currentValue - value, options);
  };

  SlowNumbers.prototype.startChanging = function (endValue, options) {
    var _this = this;

    if (options === void 0) {
      options = {};
    }

    this.options = __assign(__assign({}, this.options), options);
    clearTimeout(this.timer);
    var timeDelta = 0;
    var timeOut = 0;
    var slowSpeed = this.options.speed / 100 || 0.1;

    var insertValue = function insertValue() {
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
          timeDelta = Math.floor(1000 / diff - timeOut);

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

            default:
              step = 111111111;
          }

          if (endValue > _this.currentValue) {
            _this.currentValue += step;
          } else {
            _this.currentValue -= step;
          }

          timeOut += Math.floor(timeDelta * slowSpeed);
          insertValue();
        } else {
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
}();

exports.SlowNumbers = SlowNumbers;
},{}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var slow_numbers_1 = require("../src/slow-numbers/slow-numbers");

window.onload = function () {
  var exampleInput1 = document.querySelector('.js-example-1');
  var exampleInput2 = document.querySelector('.js-example-2');
  var exampleInput3 = document.querySelector('.js-example-3');
  var speedSelect1 = document.querySelector('.js-speed-1');
  var speedSelect2 = document.querySelector('.js-speed-2');
  var speedSelect3 = document.querySelector('.js-speed-3');
  var stopExample1 = document.querySelector('.js-stop-1');
  var stopExample2 = document.querySelector('.js-stop-2');
  var startBtn1 = document.querySelector('.js-start-1');
  var example1 = new slow_numbers_1.SlowNumbers(document.querySelector('.js-result-1'), 5500, {
    format: true,
    speed: Number(speedSelect1.value)
  });
  var example2 = new slow_numbers_1.SlowNumbers(document.querySelector('.js-result-2'), 0, {
    format: true,
    speed: Number(speedSelect2.value)
  });
  var example3 = new slow_numbers_1.SlowNumbers(document.querySelector('.js-result-3'), 5500, {
    format: true,
    speed: Number(speedSelect3.value)
  });

  exampleInput1.onchange = function (event) {
    example1.changeTo(Number(event.target.value), {
      speed: Number(speedSelect1.value)
    });
  };

  exampleInput2.onkeyup = function (event) {
    example2.changeTo(Number(event.target.value), {
      speed: Number(speedSelect2.value)
    });
  };

  exampleInput3.onchange = function (event) {
    console.log(event.target.value, event.target.checked);

    if (event.target.checked) {
      example3.add(Number(event.target.value), {
        speed: Number(speedSelect3.value)
      });
    } else {
      example3.subtract(Number(event.target.value), {
        speed: Number(speedSelect3.value)
      });
    }
  };

  stopExample1.onclick = function () {
    example1.stopChange();
  };

  stopExample2.onclick = function () {
    example2.stopChange();
  };

  startBtn1.onclick = function () {
    example1.changeTo(Number(exampleInput1.value), {
      speed: Number(speedSelect1.value)
    });
  };
};
},{"../src/slow-numbers/slow-numbers":"../src/slow-numbers/slow-numbers.ts"}],"C:/Users/SSS/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64004" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/SSS/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/demo.77de5100.js.map