/** 
 * Kendo UI v2016.1.420 (http://www.telerik.com/kendo-ui)                                                                                                                                               
 * Copyright 2016 Telerik AD. All rights reserved.                                                                                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/
(function(f, define) {
    define('util/main', ['kendo.core'], f);
}(function() {
    (function() {
        var math = Math,
            kendo = window.kendo,
            deepExtend = kendo.deepExtend;
        var DEG_TO_RAD = math.PI / 180,
            MAX_NUM = Number.MAX_VALUE,
            MIN_NUM = -Number.MAX_VALUE,
            UNDEFINED = 'undefined';

        function defined(value) {
            return typeof value !== UNDEFINED;
        }

        function round(value, precision) {
            var power = pow(precision);
            return math.round(value * power) / power;
        }

        function pow(p) {
            if (p) {
                return math.pow(10, p);
            } else {
                return 1;
            }
        }

        function limitValue(value, min, max) {
            return math.max(math.min(value, max), min);
        }

        function rad(degrees) {
            return degrees * DEG_TO_RAD;
        }

        function deg(radians) {
            return radians / DEG_TO_RAD;
        }

        function isNumber(val) {
            return typeof val === 'number' && !isNaN(val);
        }

        function valueOrDefault(value, defaultValue) {
            return defined(value) ? value : defaultValue;
        }

        function sqr(value) {
            return value * value;
        }

        function objectKey(object) {
            var parts = [];
            for (var key in object) {
                parts.push(key + object[key]);
            }
            return parts.sort().join('');
        }

        function hashKey(str) {
            var hash = 2166136261;
            for (var i = 0; i < str.length; ++i) {
                hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
                hash ^= str.charCodeAt(i);
            }
            return hash >>> 0;
        }

        function hashObject(object) {
            return hashKey(objectKey(object));
        }
        var now = Date.now;
        if (!now) {
            now = function() {
                return new Date().getTime();
            };
        }

        function arrayLimits(arr) {
            var length = arr.length,
                i, min = MAX_NUM,
                max = MIN_NUM;
            for (i = 0; i < length; i++) {
                max = math.max(max, arr[i]);
                min = math.min(min, arr[i]);
            }
            return {
                min: min,
                max: max
            };
        }

        function arrayMin(arr) {
            return arrayLimits(arr).min;
        }

        function arrayMax(arr) {
            return arrayLimits(arr).max;
        }

        function sparseArrayMin(arr) {
            return sparseArrayLimits(arr).min;
        }

        function sparseArrayMax(arr) {
            return sparseArrayLimits(arr).max;
        }

        function sparseArrayLimits(arr) {
            var min = MAX_NUM,
                max = MIN_NUM;
            for (var i = 0, length = arr.length; i < length; i++) {
                var n = arr[i];
                if (n !== null && isFinite(n)) {
                    min = math.min(min, n);
                    max = math.max(max, n);
                }
            }
            return {
                min: min === MAX_NUM ? undefined : min,
                max: max === MIN_NUM ? undefined : max
            };
        }

        function last(array) {
            if (array) {
                return array[array.length - 1];
            }
        }

        function append(first, second) {
            first.push.apply(first, second);
            return first;
        }

        function renderTemplate(text) {
            return kendo.template(text, {
                useWithBlock: false,
                paramName: 'd'
            });
        }

        function renderAttr(name, value) {
            return defined(value) && value !== null ? ' ' + name + '=\'' + value + '\' ' : '';
        }

        function renderAllAttr(attrs) {
            var output = '';
            for (var i = 0; i < attrs.length; i++) {
                output += renderAttr(attrs[i][0], attrs[i][1]);
            }
            return output;
        }

        function renderStyle(attrs) {
            var output = '';
            for (var i = 0; i < attrs.length; i++) {
                var value = attrs[i][1];
                if (defined(value)) {
                    output += attrs[i][0] + ':' + value + ';';
                }
            }
            if (output !== '') {
                return output;
            }
        }

        function renderSize(size) {
            if (typeof size !== 'string') {
                size += 'px';
            }
            return size;
        }

        function renderPos(pos) {
            var result = [];
            if (pos) {
                var parts = kendo.toHyphens(pos).split('-');
                for (var i = 0; i < parts.length; i++) {
                    result.push('k-pos-' + parts[i]);
                }
            }
            return result.join(' ');
        }

        function isTransparent(color) {
            return color === '' || color === null || color === 'none' || color === 'transparent' || !defined(color);
        }

        function arabicToRoman(n) {
            var literals = {
                1: 'i',
                10: 'x',
                100: 'c',
                2: 'ii',
                20: 'xx',
                200: 'cc',
                3: 'iii',
                30: 'xxx',
                300: 'ccc',
                4: 'iv',
                40: 'xl',
                400: 'cd',
                5: 'v',
                50: 'l',
                500: 'd',
                6: 'vi',
                60: 'lx',
                600: 'dc',
                7: 'vii',
                70: 'lxx',
                700: 'dcc',
                8: 'viii',
                80: 'lxxx',
                800: 'dccc',
                9: 'ix',
                90: 'xc',
                900: 'cm',
                1000: 'm'
            };
            var values = [
                1000,
                900,
                800,
                700,
                600,
                500,
                400,
                300,
                200,
                100,
                90,
                80,
                70,
                60,
                50,
                40,
                30,
                20,
                10,
                9,
                8,
                7,
                6,
                5,
                4,
                3,
                2,
                1
            ];
            var roman = '';
            while (n > 0) {
                if (n < values[0]) {
                    values.shift();
                } else {
                    roman += literals[values[0]];
                    n -= values[0];
                }
            }
            return roman;
        }

        function romanToArabic(r) {
            r = r.toLowerCase();
            var digits = {
                i: 1,
                v: 5,
                x: 10,
                l: 50,
                c: 100,
                d: 500,
                m: 1000
            };
            var value = 0,
                prev = 0;
            for (var i = 0; i < r.length; ++i) {
                var v = digits[r.charAt(i)];
                if (!v) {
                    return null;
                }
                value += v;
                if (v > prev) {
                    value -= 2 * prev;
                }
                prev = v;
            }
            return value;
        }

        function memoize(f) {
            var cache = Object.create(null);
            return function() {
                var id = '';
                for (var i = arguments.length; --i >= 0;) {
                    id += ':' + arguments[i];
                }
                if (id in cache) {
                    return cache[id];
                }
                return f.apply(this, arguments);
            };
        }

        function ucs2decode(string) {
            var output = [],
                counter = 0,
                length = string.length,
                value, extra;
            while (counter < length) {
                value = string.charCodeAt(counter++);
                if (value >= 55296 && value <= 56319 && counter < length) {
                    extra = string.charCodeAt(counter++);
                    if ((extra & 64512) == 56320) {
                        output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
                    } else {
                        output.push(value);
                        counter--;
                    }
                } else {
                    output.push(value);
                }
            }
            return output;
        }

        function ucs2encode(array) {
            return array.map(function(value) {
                var output = '';
                if (value > 65535) {
                    value -= 65536;
                    output += String.fromCharCode(value >>> 10 & 1023 | 55296);
                    value = 56320 | value & 1023;
                }
                output += String.fromCharCode(value);
                return output;
            }).join('');
        }
        deepExtend(kendo, {
            util: {
                MAX_NUM: MAX_NUM,
                MIN_NUM: MIN_NUM,
                append: append,
                arrayLimits: arrayLimits,
                arrayMin: arrayMin,
                arrayMax: arrayMax,
                defined: defined,
                deg: deg,
                hashKey: hashKey,
                hashObject: hashObject,
                isNumber: isNumber,
                isTransparent: isTransparent,
                last: last,
                limitValue: limitValue,
                now: now,
                objectKey: objectKey,
                round: round,
                rad: rad,
                renderAttr: renderAttr,
                renderAllAttr: renderAllAttr,
                renderPos: renderPos,
                renderSize: renderSize,
                renderStyle: renderStyle,
                renderTemplate: renderTemplate,
                sparseArrayLimits: sparseArrayLimits,
                sparseArrayMin: sparseArrayMin,
                sparseArrayMax: sparseArrayMax,
                sqr: sqr,
                valueOrDefault: valueOrDefault,
                romanToArabic: romanToArabic,
                arabicToRoman: arabicToRoman,
                memoize: memoize,
                ucs2encode: ucs2encode,
                ucs2decode: ucs2decode
            }
        });
        kendo.drawing.util = kendo.util;
        kendo.dataviz.util = kendo.util;
    }());
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3) {
    (a3 || a2)();
}));
(function(f, define) {
    define('util/text-metrics', [
        'kendo.core',
        'util/main'
    ], f);
}(function() {
    (function($) {
        var doc = document,
            kendo = window.kendo,
            Class = kendo.Class,
            util = kendo.util,
            defined = util.defined;
        var LRUCache = Class.extend({
            init: function(size) {
                this._size = size;
                this._length = 0;
                this._map = {};
            },
            put: function(key, value) {
                var lru = this,
                    map = lru._map,
                    entry = {
                        key: key,
                        value: value
                    };
                map[key] = entry;
                if (!lru._head) {
                    lru._head = lru._tail = entry;
                } else {
                    lru._tail.newer = entry;
                    entry.older = lru._tail;
                    lru._tail = entry;
                }
                if (lru._length >= lru._size) {
                    map[lru._head.key] = null;
                    lru._head = lru._head.newer;
                    lru._head.older = null;
                } else {
                    lru._length++;
                }
            },
            get: function(key) {
                var lru = this,
                    entry = lru._map[key];
                if (entry) {
                    if (entry === lru._head && entry !== lru._tail) {
                        lru._head = entry.newer;
                        lru._head.older = null;
                    }
                    if (entry !== lru._tail) {
                        if (entry.older) {
                            entry.older.newer = entry.newer;
                            entry.newer.older = entry.older;
                        }
                        entry.older = lru._tail;
                        entry.newer = null;
                        lru._tail.newer = entry;
                        lru._tail = entry;
                    }
                    return entry.value;
                }
            }
        });
        var defaultMeasureBox = $('<div style=\'position: absolute !important; top: -4000px !important; width: auto !important; height: auto !important;' + 'padding: 0 !important; margin: 0 !important; border: 0 !important;' + 'line-height: normal !important; visibility: hidden !important; white-space: nowrap!important;\' />')[0];

        function zeroSize() {
            return {
                width: 0,
                height: 0,
                baseline: 0
            };
        }
        var TextMetrics = Class.extend({
            init: function(options) {
                this._cache = new LRUCache(1000);
                this._initOptions(options);
            },
            options: {
                baselineMarkerSize: 1
            },
            measure: function(text, style, box) {
                if (!text) {
                    return zeroSize();
                }
                var styleKey = util.objectKey(style),
                    cacheKey = util.hashKey(text + styleKey),
                    cachedResult = this._cache.get(cacheKey);
                if (cachedResult) {
                    return cachedResult;
                }
                var size = zeroSize();
                var measureBox = box ? box : defaultMeasureBox;
                var baselineMarker = this._baselineMarker().cloneNode(false);
                for (var key in style) {
                    var value = style[key];
                    if (defined(value)) {
                        measureBox.style[key] = value;
                    }
                }
                $(measureBox).text(text);
                measureBox.appendChild(baselineMarker);
                doc.body.appendChild(measureBox);
                if ((text + '').length) {
                    size.width = measureBox.offsetWidth - this.options.baselineMarkerSize;
                    size.height = measureBox.offsetHeight;
                    size.baseline = baselineMarker.offsetTop + this.options.baselineMarkerSize;
                }
                if (size.width > 0 && size.height > 0) {
                    this._cache.put(cacheKey, size);
                }
                measureBox.parentNode.removeChild(measureBox);
                return size;
            },
            _baselineMarker: function() {
                return $('<div class=\'k-baseline-marker\' ' + 'style=\'display: inline-block; vertical-align: baseline;' + 'width: ' + this.options.baselineMarkerSize + 'px; height: ' + this.options.baselineMarkerSize + 'px;' + 'overflow: hidden;\' />')[0];
            }
        });
        TextMetrics.current = new TextMetrics();

        function measureText(text, style, measureBox) {
            return TextMetrics.current.measure(text, style, measureBox);
        }

        function loadFonts(fonts, callback) {
            var promises = [];
            if (fonts.length > 0 && document.fonts) {
                try {
                    promises = fonts.map(function(font) {
                        return document.fonts.load(font);
                    });
                } catch (e) {
                    kendo.logToConsole(e);
                }
                Promise.all(promises).then(callback, callback);
            } else {
                callback();
            }
        }
        kendo.util.TextMetrics = TextMetrics;
        kendo.util.LRUCache = LRUCache;
        kendo.util.loadFonts = loadFonts;
        kendo.util.measureText = measureText;
    }(window.kendo.jQuery));
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3) {
    (a3 || a2)();
}));
(function(f, define) {
    define('util/base64', ['util/main'], f);
}(function() {
    (function() {
        var kendo = window.kendo,
            deepExtend = kendo.deepExtend,
            fromCharCode = String.fromCharCode;
        var KEY_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        function encodeBase64(input) {
            var output = '';
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = encodeUTF8(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = (chr1 & 3) << 4 | chr2 >> 4;
                enc3 = (chr2 & 15) << 2 | chr3 >> 6;
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output + KEY_STR.charAt(enc1) + KEY_STR.charAt(enc2) + KEY_STR.charAt(enc3) + KEY_STR.charAt(enc4);
            }
            return output;
        }

        function encodeUTF8(input) {
            var output = '';
            for (var i = 0; i < input.length; i++) {
                var c = input.charCodeAt(i);
                if (c < 128) {
                    output += fromCharCode(c);
                } else if (c < 2048) {
                    output += fromCharCode(192 | c >>> 6);
                    output += fromCharCode(128 | c & 63);
                } else if (c < 65536) {
                    output += fromCharCode(224 | c >>> 12);
                    output += fromCharCode(128 | c >>> 6 & 63);
                    output += fromCharCode(128 | c & 63);
                }
            }
            return output;
        }
        deepExtend(kendo.util, {
            encodeBase64: encodeBase64,
            encodeUTF8: encodeUTF8
        });
    }());
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3) {
    (a3 || a2)();
}));
(function(f, define) {
    define('mixins/observers', ['kendo.core'], f);
}(function() {
    (function($) {
        var math = Math,
            kendo = window.kendo,
            deepExtend = kendo.deepExtend,
            inArray = $.inArray;
        var ObserversMixin = {
            observers: function() {
                this._observers = this._observers || [];
                return this._observers;
            },
            addObserver: function(element) {
                if (!this._observers) {
                    this._observers = [element];
                } else {
                    this._observers.push(element);
                }
                return this;
            },
            removeObserver: function(element) {
                var observers = this.observers();
                var index = inArray(element, observers);
                if (index != -1) {
                    observers.splice(index, 1);
                }
                return this;
            },
            trigger: function(methodName, event) {
                var observers = this._observers;
                var observer;
                var idx;
                if (observers && !this._suspended) {
                    for (idx = 0; idx < observers.length; idx++) {
                        observer = observers[idx];
                        if (observer[methodName]) {
                            observer[methodName](event);
                        }
                    }
                }
                return this;
            },
            optionsChange: function(e) {
                this.trigger('optionsChange', e);
            },
            geometryChange: function(e) {
                this.trigger('geometryChange', e);
            },
            suspend: function() {
                this._suspended = (this._suspended || 0) + 1;
                return this;
            },
            resume: function() {
                this._suspended = math.max((this._suspended || 0) - 1, 0);
                return this;
            },
            _observerField: function(field, value) {
                if (this[field]) {
                    this[field].removeObserver(this);
                }
                this[field] = value;
                value.addObserver(this);
            }
        };
        deepExtend(kendo, {
            mixins: {
                ObserversMixin: ObserversMixin
            }
        });
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3) {
    (a3 || a2)();
}));
(function(f, define) {
    define('kendo.grid', [
        'kendo.data',
        'kendo.columnsorter',
        'kendo.editable',
        'kendo.window',
        'kendo.filtermenu',
        'kendo.columnmenu',
        'kendo.groupable',
        'kendo.pager',
        'kendo.selectable',
        'kendo.sortable',
        'kendo.reorderable',
        'kendo.resizable',
        'kendo.mobile.actionsheet',
        'kendo.mobile.pane',
        'kendo.ooxml',
        'kendo.excel',
        'kendo.progressbar',
        'kendo.pdf'
    ], f);
}(function() {
    var __meta__ = {
        id: 'grid',
        name: 'Grid',
        category: 'web',
        description: 'The Grid widget displays tabular data and offers rich support for interacting with data,including paging, sorting, grouping, and selection.',
        depends: [
            'data',
            'columnsorter'
        ],
        features: [{
            id: 'grid-editing',
            name: 'Editing',
            description: 'Support for record editing',
            depends: [
                'editable',
                'window'
            ]
        }, {
            id: 'grid-filtering',
            name: 'Filtering',
            description: 'Support for record filtering',
            depends: ['filtermenu']
        }, {
            id: 'grid-columnmenu',
            name: 'Column menu',
            description: 'Support for header column menu',
            depends: ['columnmenu']
        }, {
            id: 'grid-grouping',
            name: 'Grouping',
            description: 'Support for grid grouping',
            depends: ['groupable']
        }, {
            id: 'grid-filtercell',
            name: 'Row filter',
            description: 'Support for grid header filtering',
            depends: ['filtercell']
        }, {
            id: 'grid-paging',
            name: 'Paging',
            description: 'Support for grid paging',
            depends: ['pager']
        }, {
            id: 'grid-selection',
            name: 'Selection',
            description: 'Support for row selection',
            depends: ['selectable']
        }, {
            id: 'grid-column-reorder',
            name: 'Column reordering',
            description: 'Support for column reordering',
            depends: ['reorderable']
        }, {
            id: 'grid-column-resize',
            name: 'Column resizing',
            description: 'Support for column resizing',
            depends: ['resizable']
        }, {
            id: 'grid-mobile',
            name: 'Grid adaptive rendering',
            description: 'Support for adaptive rendering',
            depends: [
                'mobile.actionsheet',
                'mobile.pane'
            ]
        }, {
            id: 'grid-excel-export',
            name: 'Excel export',
            description: 'Export grid data as Excel spreadsheet',
            depends: ['excel']
        }, {
            id: 'grid-pdf-export',
            name: 'PDF export',
            description: 'Export grid data as PDF',
            depends: [
                'pdf',
                'drawing',
                'progressbar'
            ]
        }]
    };
    (function($, undefined) {
        var kendo = window.kendo,
            ui = kendo.ui,
            DataSource = kendo.data.DataSource,
            tbodySupportsInnerHtml = kendo.support.tbodyInnerHtml,
            activeElement = kendo._activeElement,
            Widget = ui.Widget,
            keys = kendo.keys,
            isPlainObject = $.isPlainObject,
            extend = $.extend,
            map = $.map,
            grep = $.grep,
            isArray = $.isArray,
            inArray = $.inArray,
            push = Array.prototype.push,
            proxy = $.proxy,
            isFunction = kendo.isFunction,
            isEmptyObject = $.isEmptyObject,
            math = Math,
            PROGRESS = 'progress',
            ERROR = 'error',
            DATA_CELL = ':not(.k-group-cell):not(.k-hierarchy-cell):visible',
            SELECTION_CELL_SELECTOR = 'tbody>tr:not(.k-grouping-row):not(.k-detail-row):not(.k-group-footer) > td:not(.k-group-cell):not(.k-hierarchy-cell)',
            NAVROW = 'tr:not(.k-footer-template):visible',
            NAVCELL = ':not(.k-group-cell):not(.k-hierarchy-cell):visible',
            FIRSTNAVITEM = NAVROW + ':first>' + NAVCELL + ':first',
            HEADERCELLS = 'th.k-header:not(.k-group-cell):not(.k-hierarchy-cell)',
            NS = '.kendoGrid',
            EDIT = 'edit',
            SAVE = 'save',
            REMOVE = 'remove',
            DETAILINIT = 'detailInit',
            FILTERMENUINIT = 'filterMenuInit',
            COLUMNMENUINIT = 'columnMenuInit',
            CHANGE = 'change',
            COLUMNHIDE = 'columnHide',
            COLUMNSHOW = 'columnShow',
            SAVECHANGES = 'saveChanges',
            DATABOUND = 'dataBound',
            DETAILEXPAND = 'detailExpand',
            DETAILCOLLAPSE = 'detailCollapse',
            FOCUSED = 'k-state-focused',
            SELECTED = 'k-state-selected',
            NORECORDSCLASS = 'k-grid-norecords',
            COLUMNRESIZE = 'columnResize',
            COLUMNREORDER = 'columnReorder',
            COLUMNLOCK = 'columnLock',
            COLUMNUNLOCK = 'columnUnlock',
            NAVIGATE = 'navigate',
            CLICK = 'click',
            HEIGHT = 'height',
            TABINDEX = 'tabIndex',
            FUNCTION = 'function',
            STRING = 'string',
            DELETECONFIRM = 'Are you sure you want to delete this record?',
            NORECORDS = 'No records available.',
            CONFIRMDELETE = 'Delete',
            CANCELDELETE = 'Cancel',
            formatRegExp = /(\}|\#)/gi,
            templateHashRegExp = /#/gi,
            whitespaceRegExp = '[\\x20\\t\\r\\n\\f]',
            nonDataCellsRegExp = new RegExp('(^|' + whitespaceRegExp + ')' + '(k-group-cell|k-hierarchy-cell)' + '(' + whitespaceRegExp + '|$)'),
            filterRowRegExp = new RegExp('(^|' + whitespaceRegExp + ')' + '(k-filter-row)' + '(' + whitespaceRegExp + '|$)'),
            COMMANDBUTTONTMPL = '<a class="k-button k-button-icontext #=className#" #=attr# href="\\#"><span class="#=iconClass# #=imageClass#"></span>#=text#</a>',
            isRtl = false,
            browser = kendo.support.browser,
            isIE7 = browser.msie && browser.version == 7,
            isIE8 = browser.msie && browser.version == 8;
        var VirtualScrollable = Widget.extend({
            init: function(element, options) {
                var that = this;
                Widget.fn.init.call(that, element, options);
                that._refreshHandler = proxy(that.refresh, that);
                that.setDataSource(options.dataSource);
                that.wrap();
            },
            setDataSource: function(dataSource) {
                var that = this;
                if (that.dataSource) {
                    that.dataSource.unbind(CHANGE, that._refreshHandler);
                }
                that.dataSource = dataSource;
                that.dataSource.bind(CHANGE, that._refreshHandler);
            },
            options: {
                name: 'VirtualScrollable',
                itemHeight: $.noop,
                prefetch: true
            },
            destroy: function() {
                var that = this;
                Widget.fn.destroy.call(that);
                that.dataSource.unbind(CHANGE, that._refreshHandler);
                that.wrapper.add(that.verticalScrollbar).off(NS);
                if (that.drag) {
                    that.drag.destroy();
                    that.drag = null;
                }
                that.wrapper = that.element = that.verticalScrollbar = null;
                that._refreshHandler = null;
            },
            wrap: function() {
                var that = this,
                    scrollbar = kendo.support.scrollbar() + 1,
                    element = that.element,
                    wrapper;
                element.css({
                    width: 'auto',
                    overflow: 'hidden'
                }).css(isRtl ? 'padding-left' : 'padding-right', scrollbar);
                that.content = element.children().first();
                wrapper = that.wrapper = that.content.wrap('<div class="k-virtual-scrollable-wrap"/>').parent().bind('DOMMouseScroll' + NS + ' mousewheel' + NS, proxy(that._wheelScroll, that));
                if (kendo.support.kineticScrollNeeded) {
                    that.drag = new kendo.UserEvents(that.wrapper, {
                        global: true,
                        start: function(e) {
                            e.sender.capture();
                        },
                        move: function(e) {
                            that.verticalScrollbar.scrollTop(that.verticalScrollbar.scrollTop() - e.y.delta);
                            wrapper.scrollLeft(wrapper.scrollLeft() - e.x.delta);
                            e.preventDefault();
                        }
                    });
                }
                that.verticalScrollbar = $('<div class="k-scrollbar k-scrollbar-vertical" />').css({
                    width: scrollbar
                }).appendTo(element).bind('scroll' + NS, proxy(that._scroll, that));
            },
            _wheelScroll: function(e) {
                if (e.ctrlKey) {
                    return;
                }
                var scrollbar = this.verticalScrollbar,
                    scrollTop = scrollbar.scrollTop(),
                    delta = kendo.wheelDeltaY(e);
                if (delta && !(delta > 0 && scrollTop === 0) && !(delta < 0 && scrollTop + scrollbar[0].clientHeight == scrollbar[0].scrollHeight)) {
                    e.preventDefault();
                    $(e.currentTarget).one('wheel' + NS, false);
                    this.verticalScrollbar.scrollTop(scrollTop + -delta);
                }
            },
            _scroll: function(e) {
                var that = this,
                    delayLoading = !that.options.prefetch,
                    scrollTop = e.currentTarget.scrollTop,
                    dataSource = that.dataSource,
                    rowHeight = that.itemHeight,
                    skip = dataSource.skip() || 0,
                    start = that._rangeStart || skip,
                    height = that.element.innerHeight(),
                    isScrollingUp = !!(that._scrollbarTop && that._scrollbarTop > scrollTop),
                    firstItemIndex = math.max(math.floor(scrollTop / rowHeight), 0),
                    lastItemIndex = math.max(firstItemIndex + math.floor(height / rowHeight), 0);
                that._scrollTop = scrollTop - start * rowHeight;
                that._scrollbarTop = scrollTop;
                that._scrolling = delayLoading;
                if (!that._fetch(firstItemIndex, lastItemIndex, isScrollingUp)) {
                    that.wrapper[0].scrollTop = that._scrollTop;
                }
                if (delayLoading) {
                    if (that._scrollingTimeout) {
                        clearTimeout(that._scrollingTimeout);
                    }
                    that._scrollingTimeout = setTimeout(function() {
                        that._scrolling = false;
                        that._page(that._rangeStart, that.dataSource.take());
                    }, 100);
                }
            },
            itemIndex: function(rowIndex) {
                var rangeStart = this._rangeStart || this.dataSource.skip() || 0;
                return rangeStart + rowIndex;
            },
            position: function(index) {
                var rangeStart = this._rangeStart || this.dataSource.skip() || 0;
                var pageSize = this.dataSource.pageSize();
                var result;
                if (index > rangeStart) {
                    result = index - rangeStart + 1;
                } else {
                    result = rangeStart - index - 1;
                }
                return result > pageSize ? pageSize : result;
            },
            scrollIntoView: function(row) {
                var container = this.wrapper[0];
                var containerHeight = container.clientHeight;
                var containerScroll = this._scrollTop || container.scrollTop;
                var elementOffset = row[0].offsetTop;
                var elementHeight = row[0].offsetHeight;
                if (containerScroll > elementOffset) {
                    this.verticalScrollbar[0].scrollTop -= containerHeight / 2;
                } else if (elementOffset + elementHeight >= containerScroll + containerHeight) {
                    this.verticalScrollbar[0].scrollTop += containerHeight / 2;
                }
            },
            _fetch: function(firstItemIndex, lastItemIndex, scrollingUp) {
                var that = this,
                    dataSource = that.dataSource,
                    itemHeight = that.itemHeight,
                    take = dataSource.take(),
                    rangeStart = that._rangeStart || dataSource.skip() || 0,
                    currentSkip = math.floor(firstItemIndex / take) * take,
                    fetching = false,
                    prefetchAt = 0.33;
                if (firstItemIndex < rangeStart) {
                    fetching = true;
                    rangeStart = math.max(0, lastItemIndex - take);
                    that._scrollTop = (firstItemIndex - rangeStart) * itemHeight;
                    that._page(rangeStart, take);
                } else if (lastItemIndex >= rangeStart + take && !scrollingUp) {
                    fetching = true;
                    rangeStart = firstItemIndex;
                    that._scrollTop = itemHeight;
                    that._page(rangeStart, take);
                } else if (!that._fetching && that.options.prefetch) {
                    if (firstItemIndex < currentSkip + take - take * prefetchAt && firstItemIndex > take) {
                        dataSource.prefetch(currentSkip - take, take, $.noop);
                    }
                    if (lastItemIndex > currentSkip + take * prefetchAt) {
                        dataSource.prefetch(currentSkip + take, take, $.noop);
                    }
                }
                return fetching;
            },
            fetching: function() {
                return this._fetching;
            },
            _page: function(skip, take) {
                var that = this,
                    delayLoading = !that.options.prefetch,
                    dataSource = that.dataSource;
                clearTimeout(that._timeout);
                that._fetching = true;
                that._rangeStart = skip;
                if (dataSource.inRange(skip, take)) {
                    dataSource.range(skip, take);
                } else {
                    if (!delayLoading) {
                        kendo.ui.progress(that.wrapper.parent(), true);
                    }
                    that._timeout = setTimeout(function() {
                        if (!that._scrolling) {
                            if (delayLoading) {
                                kendo.ui.progress(that.wrapper.parent(), true);
                            }
                            dataSource.range(skip, take);
                        }
                    }, 100);
                }
            },
            repaintScrollbar: function() {
                var that = this,
                    html = '',
                    maxHeight = 250000,
                    dataSource = that.dataSource,
                    scrollbar = !kendo.support.kineticScrollNeeded ? kendo.support.scrollbar() : 0,
                    wrapperElement = that.wrapper[0],
                    totalHeight, idx, itemHeight;
                itemHeight = that.itemHeight = that.options.itemHeight() || 0;
                var addScrollBarHeight = wrapperElement.scrollWidth > wrapperElement.offsetWidth ? scrollbar : 0;
                totalHeight = dataSource.total() * itemHeight + addScrollBarHeight;
                for (idx = 0; idx < math.floor(totalHeight / maxHeight); idx++) {
                    html += '<div style="width:1px;height:' + maxHeight + 'px"></div>';
                }
                if (totalHeight % maxHeight) {
                    html += '<div style="width:1px;height:' + totalHeight % maxHeight + 'px"></div>';
                }
                that.verticalScrollbar.html(html);
                wrapperElement.scrollTop = that._scrollTop;
            },
            refresh: function() {
                var that = this,
                    dataSource = that.dataSource,
                    rangeStart = that._rangeStart;
                kendo.ui.progress(that.wrapper.parent(), false);
                clearTimeout(that._timeout);
                that.repaintScrollbar();
                if (that.drag) {
                    that.drag.cancel();
                }
                if (rangeStart && !that._fetching) {
                    that._rangeStart = dataSource.skip();
                    if (dataSource.page() === 1) {
                        that.verticalScrollbar[0].scrollTop = 0;
                    }
                }
                that._fetching = false;
            }
        });

        function groupCells(count) {
            return new Array(count + 1).join('<td class="k-group-cell">&nbsp;</td>');
        }

        function stringifyAttributes(attributes) {
            var attr, result = ' ';
            if (attributes) {
                if (typeof attributes === STRING) {
                    return attributes;
                }
                for (attr in attributes) {
                    result += attr + '="' + attributes[attr] + '"';
                }
            }
            return result;
        }
        var defaultCommands = {
            create: {
                text: 'Add new record',
                imageClass: 'k-add',
                className: 'k-grid-add',
                iconClass: 'k-icon'
            },
            cancel: {
                text: 'Cancel changes',
                imageClass: 'k-cancel',
                className: 'k-grid-cancel-changes',
                iconClass: 'k-icon'
            },
            save: {
                text: 'Save changes',
                imageClass: 'k-update',
                className: 'k-grid-save-changes',
                iconClass: 'k-icon'
            },
            destroy: {
                text: 'Delete',
                imageClass: 'k-delete',
                className: 'k-grid-delete',
                iconClass: 'k-icon'
            },
            edit: {
                text: 'Edit',
                imageClass: 'k-edit',
                className: 'k-grid-edit',
                iconClass: 'k-icon'
            },
            update: {
                text: 'Update',
                imageClass: 'k-update',
                className: 'k-primary k-grid-update',
                iconClass: 'k-icon'
            },
            canceledit: {
                text: 'Cancel',
                imageClass: 'k-cancel',
                className: 'k-grid-cancel',
                iconClass: 'k-icon'
            },
            excel: {
                text: 'Export to Excel',
                imageClass: 'k-i-excel',
                className: 'k-grid-excel',
                iconClass: 'k-icon'
            },
            pdf: {
                text: 'Export to PDF',
                imageClass: 'k-i-pdf',
                className: 'k-grid-pdf',
                iconClass: 'k-icon'
            }
        };

        function cursor(context, value) {
            $('th, th .k-grid-filter, th .k-link', context).add(document.body).css('cursor', value);
        }

        function reorder(selector, source, dest, before, count) {
            var sourceIndex = source;
            source = $();
            count = count || 1;
            for (var idx = 0; idx < count; idx++) {
                source = source.add(selector.eq(sourceIndex + idx));
            }
            if (typeof dest == 'number') {
                source[before ? 'insertBefore' : 'insertAfter'](selector.eq(dest));
            } else {
                source.appendTo(dest);
            }
        }

        function elements(lockedContent, content, filter) {
            return $(lockedContent).add(content).find(filter);
        }

        function attachCustomCommandEvent(context, container, commands) {
            var idx, length, command, commandName;
            commands = !isArray(commands) ? [commands] : commands;
            for (idx = 0, length = commands.length; idx < length; idx++) {
                command = commands[idx];
                if (isPlainObject(command) && command.click) {
                    commandName = command.name || command.text;
                    container.on(CLICK + NS, 'a.k-grid-' + (commandName || '').replace(/\s/g, ''), {
                        commandName: commandName
                    }, proxy(command.click, context));
                }
            }
        }

        function normalizeColumns(columns, encoded, hide) {
            return map(columns, function(column) {
                column = typeof column === STRING ? {
                    field: column
                } : column;
                var hidden;
                if (!isVisible(column) || hide) {
                    column.attributes = addHiddenStyle(column.attributes);
                    column.footerAttributes = addHiddenStyle(column.footerAttributes);
                    column.headerAttributes = addHiddenStyle(column.headerAttributes);
                    hidden = true;
                }
                if (column.columns) {
                    column.columns = normalizeColumns(column.columns, encoded, hidden);
                }
                var uid = kendo.guid();
                column.headerAttributes = extend({
                    id: uid
                }, column.headerAttributes);
                return extend({
                    encoded: encoded,
                    hidden: hidden
                }, column);
            });
        }

        function columnParent(column, columns) {
            var parents = [];
            columnParents(column, columns, parents);
            return parents[parents.length - 1];
        }

        function columnParents(column, columns, parents) {
            parents = parents || [];
            for (var idx = 0; idx < columns.length; idx++) {
                if (column === columns[idx]) {
                    return true;
                } else if (columns[idx].columns) {
                    var inserted = parents.length;
                    parents.push(columns[idx]);
                    if (!columnParents(column, columns[idx].columns, parents)) {
                        parents.splice(inserted, parents.length - inserted);
                    } else {
                        return true;
                    }
                }
            }
            return false;
        }

        function setColumnVisibility(column, visible) {
            var method = visible ? removeHiddenStyle : addHiddenStyle;
            column.hidden = !visible;
            column.attributes = method(column.attributes);
            column.footerAttributes = method(column.footerAttributes);
            column.headerAttributes = method(column.headerAttributes);
        }

        function isCellVisible() {
            return this.style.display !== 'none';
        }

        function isVisible(column) {
            return visibleColumns([column]).length > 0;
        }

        function visibleColumns(columns) {
            return grep(columns, function(column) {
                var result = !column.hidden;
                if (result && column.columns) {
                    result = visibleColumns(column.columns).length > 0;
                }
                return result;
            });
        }

        function toJQuery(elements) {
            return $(elements).map(function() {
                return this.toArray();
            });
        }

        function updateCellRowSpan(cell, columns, sourceLockedColumnsCount) {
            var lockedColumnDepth = depth(lockedColumns(columns));
            var nonLockedColumnDepth = depth(nonLockedColumns(columns));
            var rowSpan = cell.rowSpan;
            if (sourceLockedColumnsCount) {
                if (lockedColumnDepth > nonLockedColumnDepth) {
                    cell.rowSpan = rowSpan - (lockedColumnDepth - nonLockedColumnDepth) || 1;
                } else {
                    cell.rowSpan = rowSpan + (nonLockedColumnDepth - lockedColumnDepth);
                }
            } else {
                if (lockedColumnDepth > nonLockedColumnDepth) {
                    cell.rowSpan = rowSpan + (lockedColumnDepth - nonLockedColumnDepth);
                } else {
                    cell.rowSpan = rowSpan - (nonLockedColumnDepth - lockedColumnDepth) || 1;
                }
            }
        }

        function moveCellsBetweenContainers(sources, target, leafs, columns, container, destination, groups) {
            var sourcesDepth = depth(sources);
            var targetDepth = depth([target]);
            if (sourcesDepth > targetDepth) {
                var groupCells = new Array(groups + 1).join('<th class="k-group-cell k-header" scope="col">&nbsp;</th>');
                var rows = destination.children(':not(.k-filter-row)');
                $(new Array(sourcesDepth - targetDepth + 1).join('<tr>' + groupCells + '</tr>')).insertAfter(rows.last());
            }
            addRowSpanValue(destination, sourcesDepth - targetDepth);
            moveCells(leafs, columns, container, destination);
        }

        function updateCellIndex(thead, columns, offset) {
            offset = offset || 0;
            var position;
            var cell;
            var allColumns = columns;
            columns = leafColumns(columns);
            var cells = {};
            var rows = thead.find('>tr:not(.k-filter-row)');
            var filter = function() {
                var el = $(this);
                return !el.hasClass('k-group-cell') && !el.hasClass('k-hierarchy-cell');
            };
            for (var idx = 0, length = columns.length; idx < length; idx++) {
                position = columnPosition(columns[idx], allColumns);
                if (!cells[position.row]) {
                    cells[position.row] = rows.eq(position.row).find('.k-header').filter(filter);
                }
                cell = cells[position.row].eq(position.cell);
                cell.attr(kendo.attr('index'), offset + idx);
            }
            return columns.length;
        }

        function depth(columns) {
            var result = 1;
            var max = 0;
            for (var idx = 0; idx < columns.length; idx++) {
                if (columns[idx].columns) {
                    var temp = depth(columns[idx].columns);
                    if (temp > max) {
                        max = temp;
                    }
                }
            }
            return result + max;
        }

        function moveCells(leafs, columns, container, destination) {
            var sourcePosition = columnVisiblePosition(leafs[0], columns);
            var ths = container.find('>tr:not(.k-filter-row):eq(' + sourcePosition.row + ')>th.k-header');
            var t = $();
            var sourceIndex = sourcePosition.cell;
            var idx;
            for (idx = 0; idx < leafs.length; idx++) {
                t = t.add(ths.eq(sourceIndex + idx));
            }
            destination.find('>tr:not(.k-filter-row)').eq(sourcePosition.row).append(t);
            var children = [];
            for (idx = 0; idx < leafs.length; idx++) {
                if (leafs[idx].columns) {
                    children = children.concat(leafs[idx].columns);
                }
            }
            if (children.length) {
                moveCells(children, columns, container, destination);
            }
        }

        function columnPosition(column, columns, row, cellCounts) {
            var result;
            var idx;
            row = row || 0;
            cellCounts = cellCounts || {};
            cellCounts[row] = cellCounts[row] || 0;
            for (idx = 0; idx < columns.length; idx++) {
                if (columns[idx] == column) {
                    result = {
                        cell: cellCounts[row],
                        row: row
                    };
                    break;
                } else if (columns[idx].columns) {
                    result = columnPosition(column, columns[idx].columns, row + 1, cellCounts);
                    if (result) {
                        break;
                    }
                }
                cellCounts[row]++;
            }
            return result;
        }

        function findParentColumnWithChildren(columns, index, source, rtl) {
            var target;
            var locked = source.locked;
            do {
                target = columns[index];
                index += rtl ? 1 : -1;
            } while (target && index > -1 && index < columns.length && target != source && !target.columns && target.locked == locked);
            return target;
        }

        function findReorderTarget(columns, target, source, before) {
            if (target.columns) {
                target = target.columns;
                return target[before ? 0 : target.length - 1];
            } else {
                var parent = columnParent(target, columns);
                var parentColumns;
                if (parent) {
                    parentColumns = parent.columns;
                } else {
                    parentColumns = columns;
                }
                var index = inArray(target, parentColumns);
                if (index === 0 && before) {
                    index++;
                } else if (index == parentColumns.length - 1 && !before) {
                    index--;
                } else if (index > 0 || index === 0 && !before) {
                    index += before ? -1 : 1;
                }
                var sourceIndex = inArray(source, parentColumns);
                target = findParentColumnWithChildren(parentColumns, index, source, sourceIndex > index);
                if (target && target != source && target.columns) {
                    return findReorderTarget(columns, target, source, before);
                }
            }
            return null;
        }

        function columnVisiblePosition(column, columns, row, cellCounts) {
            var result;
            var idx;
            row = row || 0;
            cellCounts = cellCounts || {};
            cellCounts[row] = cellCounts[row] || 0;
            for (idx = 0; idx < columns.length; idx++) {
                if (columns[idx] == column) {
                    result = {
                        cell: cellCounts[row],
                        row: row
                    };
                    break;
                } else if (columns[idx].columns) {
                    result = columnVisiblePosition(column, columns[idx].columns, row + 1, cellCounts);
                    if (result) {
                        break;
                    }
                }
                if (!columns[idx].hidden) {
                    cellCounts[row]++;
                }
            }
            return result;
        }

        function flatColumnsInDomOrder(columns) {
            var result = flatColumns(lockedColumns(columns));
            return result.concat(flatColumns(nonLockedColumns(columns)));
        }

        function flatColumns(columns) {
            var result = [];
            var children = [];
            for (var idx = 0; idx < columns.length; idx++) {
                result.push(columns[idx]);
                if (columns[idx].columns) {
                    children = children.concat(columns[idx].columns);
                }
            }
            if (children.length) {
                result = result.concat(flatColumns(children));
            }
            return result;
        }

        function hiddenLeafColumnsCount(columns) {
            var counter = 0;
            var column;
            for (var idx = 0; idx < columns.length; idx++) {
                column = columns[idx];
                if (column.columns) {
                    counter += hiddenLeafColumnsCount(column.columns);
                } else if (column.hidden) {
                    counter++;
                }
            }
            return counter;
        }

        function columnsWidth(cols) {
            var colWidth, width = 0;
            for (var idx = 0, length = cols.length; idx < length; idx++) {
                colWidth = cols[idx].style.width;
                if (colWidth && colWidth.indexOf('%') == -1) {
                    width += parseInt(colWidth, 10);
                }
            }
            return width;
        }

        function removeRowSpanValue(container, count) {
            var cells = container.find('tr:not(.k-filter-row) th:not(.k-group-cell,.k-hierarchy-cell)');
            var rowSpan;
            for (var idx = 0; idx < cells.length; idx++) {
                rowSpan = cells[idx].rowSpan;
                if (rowSpan > 1) {
                    cells[idx].rowSpan = rowSpan - count || 1;
                }
            }
        }

        function addRowSpanValue(container, count) {
            var cells = container.find('tr:not(.k-filter-row) th:not(.k-group-cell,.k-hierarchy-cell)');
            for (var idx = 0; idx < cells.length; idx++) {
                cells[idx].rowSpan += count;
            }
        }

        function removeEmptyRows(container) {
            var rows = container.find('tr:not(.k-filter-row)');
            var emptyRowsCount = rows.filter(function() {
                return !$(this).children().length;
            }).remove().length;
            var cells = rows.find('th:not(.k-group-cell,.k-hierarchy-cell)');
            for (var idx = 0; idx < cells.length; idx++) {
                if (cells[idx].rowSpan > 1) {
                    cells[idx].rowSpan -= emptyRowsCount;
                }
            }
            return rows.length - emptyRowsCount;
        }

        function mapColumnToCellRows(columns, cells, rows, rowIndex, offset) {
            var idx, row, length, children = [];
            for (idx = 0, length = columns.length; idx < length; idx++) {
                row = rows[rowIndex] || [];
                row.push(cells.eq(offset + idx));
                rows[rowIndex] = row;
                if (columns[idx].columns) {
                    children = children.concat(columns[idx].columns);
                }
            }
            if (children.length) {
                mapColumnToCellRows(children, cells, rows, rowIndex + 1, offset + columns.length);
            }
        }

        function lockedColumns(columns) {
            return grep(columns, function(column) {
                return column.locked;
            });
        }

        function nonLockedColumns(columns) {
            return grep(columns, function(column) {
                return !column.locked;
            });
        }

        function visibleNonLockedColumns(columns) {
            return grep(columns, function(column) {
                return !column.locked && isVisible(column);
            });
        }

        function visibleLockedColumns(columns) {
            return grep(columns, function(column) {
                return column.locked && isVisible(column);
            });
        }

        function visibleLeafColumns(columns) {
            var result = [];
            for (var idx = 0; idx < columns.length; idx++) {
                if (columns[idx].hidden) {
                    continue;
                }
                if (columns[idx].columns) {
                    result = result.concat(visibleLeafColumns(columns[idx].columns));
                } else {
                    result.push(columns[idx]);
                }
            }
            return result;
        }

        function leafColumns(columns) {
            var result = [];
            for (var idx = 0; idx < columns.length; idx++) {
                if (!columns[idx].columns) {
                    result.push(columns[idx]);
                    continue;
                }
                result = result.concat(leafColumns(columns[idx].columns));
            }
            return result;
        }

        function leafDataCells(container) {
            var rows = container.find('>tr:not(.k-filter-row)');
            var filter = function() {
                var el = $(this);
                return !el.hasClass('k-group-cell') && !el.hasClass('k-hierarchy-cell');
            };
            var cells = $();
            if (rows.length > 1) {
                cells = rows.find('th').filter(filter).filter(function() {
                    return this.rowSpan > 1;
                });
            }
            cells = cells.add(rows.last().find('th').filter(filter));
            var indexAttr = kendo.attr('index');
            cells.sort(function(a, b) {
                a = $(a);
                b = $(b);
                var indexA = a.attr(indexAttr);
                var indexB = b.attr(indexAttr);
                if (indexA === undefined) {
                    indexA = $(a).index();
                }
                if (indexB === undefined) {
                    indexB = $(b).index();
                }
                indexA = parseInt(indexA, 10);
                indexB = parseInt(indexB, 10);
                return indexA > indexB ? 1 : indexA < indexB ? -1 : 0;
            });
            return cells;
        }

        function parentColumnsCells(cell) {
            var container = cell.closest('table');
            var result = $().add(cell);
            var row = cell.closest('tr');
            var headerRows = container.find('tr:not(.k-filter-row)');
            var level = headerRows.index(row);
            if (level > 0) {
                var parent = headerRows.eq(level - 1);
                var parentCellsWithChildren = parent.find('th:not(.k-group-cell,.k-hierarchy-cell)').filter(function() {
                    return !$(this).attr('rowspan');
                });
                var offset = 0;
                var index = row.find('th:not(.k-group-cell,.k-hierarchy-cell)').index(cell);
                var prevCells = cell.prevAll(':not(.k-group-cell,.k-hierarchy-cell)').filter(function() {
                    return this.colSpan > 1;
                });
                for (var idx = 0; idx < prevCells.length; idx++) {
                    offset += prevCells[idx].colSpan || 1;
                }
                index += Math.max(offset - 1, 0);
                offset = 0;
                for (idx = 0; idx < parentCellsWithChildren.length; idx++) {
                    var parentCell = parentCellsWithChildren.eq(idx);
                    if (parentCell.attr('colSpan')) {
                        offset += parentCell[0].colSpan;
                    } else {
                        offset += 1;
                    }
                    if (index >= idx && index < offset) {
                        result = parentColumnsCells(parentCell).add(result);
                        break;
                    }
                }
            }
            return result;
        }

        function childColumnsCells(cell) {
            var container = cell.closest('thead');
            var result = $().add(cell);
            var row = cell.closest('tr');
            var headerRows = container.find('tr:not(.k-filter-row)');
            var level = headerRows.index(row) + cell[0].rowSpan;
            var colSpanAttr = kendo.attr('colspan');
            if (level <= headerRows.length - 1) {
                var child = row.next();
                var prevCells = cell.prevAll(':not(.k-group-cell,.k-hierarchy-cell)');
                var idx;
                prevCells = prevCells.filter(function() {
                    return !this.rowSpan || this.rowSpan === 1;
                });
                var offset = 0;
                for (idx = 0; idx < prevCells.length; idx++) {
                    offset += parseInt(prevCells.eq(idx).attr(colSpanAttr), 10) || 1;
                }
                var cells = child.find('th:not(.k-group-cell,.k-hierarchy-cell)');
                var colSpan = parseInt(cell.attr(colSpanAttr), 10) || 1;
                idx = 0;
                while (idx < colSpan) {
                    child = cells.eq(idx + offset);
                    result = result.add(childColumnsCells(child));
                    var value = parseInt(child.attr(colSpanAttr), 10);
                    if (value > 1) {
                        colSpan -= value - 1;
                    }
                    idx++;
                }
            }
            return result;
        }

        function appendContent(tbody, table, html, empty) {
            var placeholder, tmp = tbody;
            if (empty) {
                tbody.empty();
            }
            if (tbodySupportsInnerHtml) {
                tbody[0].innerHTML = html;
            } else {
                placeholder = document.createElement('div');
                placeholder.innerHTML = '<table><tbody>' + html + '</tbody></table>';
                tbody = placeholder.firstChild.firstChild;
                table[0].replaceChild(tbody, tmp[0]);
                tbody = $(tbody);
            }
            return tbody;
        }

        function addHiddenStyle(attr) {
            attr = attr || {};
            var style = attr.style;
            if (!style) {
                style = 'display:none';
            } else {
                style = style.replace(/((.*)?display)(.*)?:([^;]*)/i, '$1:none');
                if (style === attr.style) {
                    style = style.replace(/(.*)?/i, 'display:none;$1');
                }
            }
            return extend({}, attr, {
                style: style
            });
        }

        function removeHiddenStyle(attr) {
            attr = attr || {};
            var style = attr.style;
            if (style) {
                attr.style = style.replace(/(display\s*:\s*none\s*;?)*/gi, '');
            }
            return attr;
        }

        function normalizeCols(table, visibleColumns, hasDetails, groups) {
            var colgroup = table.find('>colgroup'),
                width, cols = map(visibleColumns, function(column) {
                    width = column.width;
                    if (width && parseInt(width, 10) !== 0) {
                        return kendo.format('<col style="width:{0}"/>', typeof width === STRING ? width : width + 'px');
                    }
                    return '<col />';
                });
            if (hasDetails || colgroup.find('.k-hierarchy-col').length) {
                cols.splice(0, 0, '<col class="k-hierarchy-col" />');
            }
            if (colgroup.length) {
                colgroup.remove();
            }
            colgroup = $(new Array(groups + 1).join('<col class="k-group-col">') + cols.join(''));
            if (!colgroup.is('colgroup')) {
                colgroup = $('<colgroup/>').append(colgroup);
            }
            table.prepend(colgroup);
            if (browser.msie && browser.version == 8) {
                table.css('display', 'inline-table');
                window.setTimeout(function() {
                    table.css('display', '');
                }, 1);
            }
        }

        function normalizeHeaderCells(container, columns) {
            var lastIndex = 0;
            var idx, len;
            var th = container.find('th:not(.k-group-cell)');
            for (idx = 0, len = columns.length; idx < len; idx++) {
                if (columns[idx].locked) {
                    th.eq(idx).insertBefore(th.eq(lastIndex));
                    th = container.find('th:not(.k-group-cell)');
                    lastIndex++;
                }
            }
        }

        function convertToObject(array) {
            var result = {},
                item, idx, length;
            for (idx = 0, length = array.length; idx < length; idx++) {
                item = array[idx];
                result[item.value] = item.text;
            }
            return result;
        }

        function formatGroupValue(value, format, columnValues, encoded) {
            var isForeignKey = columnValues && columnValues.length && isPlainObject(columnValues[0]) && 'value' in columnValues[0],
                groupValue = isForeignKey ? convertToObject(columnValues)[value] : value;
            groupValue = groupValue != null ? groupValue : '';
            return format ? kendo.format(format, groupValue) : encoded === false ? groupValue : kendo.htmlEncode(groupValue);
        }

        function setCellVisibility(cells, index, visible) {
            var pad = 0,
                state, cell = cells[pad];
            while (cell) {
                state = visible ? true : cell.style.display !== 'none';
                if (state && !nonDataCellsRegExp.test(cell.className) && --index < 0) {
                    cell.style.display = visible ? '' : 'none';
                    break;
                }
                cell = cells[++pad];
            }
        }

        function hideColumnCells(rows, columnIndex) {
            var idx = 0,
                length = rows.length,
                cell, row;
            for (; idx < length; idx += 1) {
                row = rows.eq(idx);
                if (row.is('.k-grouping-row,.k-detail-row')) {
                    cell = row.children(':not(.k-group-cell):first,.k-detail-cell').last();
                    cell.attr('colspan', parseInt(cell.attr('colspan'), 10) - 1);
                } else {
                    if (row.hasClass('k-grid-edit-row') && (cell = row.children('.k-edit-container')[0])) {
                        cell = $(cell);
                        cell.attr('colspan', parseInt(cell.attr('colspan'), 10) - 1);
                        cell.find('col').eq(columnIndex).remove();
                        row = cell.find('tr:first');
                    }
                    setCellVisibility(row[0].cells, columnIndex, false);
                }
            }
        }

        function groupRows(data) {
            var result = [];
            var item;
            for (var idx = 0; idx < data.length; idx++) {
                item = data[idx];
                if (!('field' in item && 'value' in item && 'items' in item)) {
                    break;
                }
                result.push(item);
                if (item.hasSubgroups) {
                    result = result.concat(groupRows(item.items));
                }
            }
            return result;
        }

        function groupFooters(data) {
            var result = [];
            var item;
            for (var idx = 0; idx < data.length; idx++) {
                item = data[idx];
                if (!('field' in item && 'value' in item && 'items' in item)) {
                    break;
                }
                if (item.hasSubgroups) {
                    result = result.concat(groupFooters(item.items));
                }
                result.push(item.aggregates);
            }
            return result;
        }

        function showColumnCells(rows, columnIndex) {
            var idx = 0,
                length = rows.length,
                cell, row, columns;
            for (; idx < length; idx += 1) {
                row = rows.eq(idx);
                if (row.is('.k-grouping-row,.k-detail-row')) {
                    cell = row.children(':not(.k-group-cell):first,.k-detail-cell').last();
                    cell.attr('colspan', parseInt(cell.attr('colspan'), 10) + 1);
                } else {
                    if (row.hasClass('k-grid-edit-row') && (cell = row.children('.k-edit-container')[0])) {
                        cell = $(cell);
                        cell.attr('colspan', parseInt(cell.attr('colspan'), 10) + 1);
                        normalizeCols(cell.find('>form>table'), visibleColumns(columns), false, 0);
                        row = cell.find('tr:first');
                    }
                    setCellVisibility(row[0].cells, columnIndex, true);
                }
            }
        }

        function updateColspan(toAdd, toRemove, num) {
            num = num || 1;
            var item, idx, length;
            for (idx = 0, length = toAdd.length; idx < length; idx++) {
                item = toAdd.eq(idx).children().last();
                item.attr('colspan', parseInt(item.attr('colspan'), 10) + num);
                item = toRemove.eq(idx).children().last();
                item.attr('colspan', parseInt(item.attr('colspan'), 10) - num);
            }
        }

        function tableWidth(table) {
            var idx, length, width = 0;
            var cols = table.find('>colgroup>col');
            for (idx = 0, length = cols.length; idx < length; idx += 1) {
                width += parseInt(cols[idx].style.width, 10);
            }
            return width;
        }
        var Grid = kendo.ui.DataBoundWidget.extend({
            init: function(element, options, events) {
                var that = this;
                options = isArray(options) ? {
                    dataSource: options
                } : options;
                Widget.fn.init.call(that, element, options);
                if (events) {
                    that._events = events;
                }
                isRtl = kendo.support.isRtl(element);
                that._element();
                that._aria();
                that._columns(that.options.columns);
                that._dataSource();
                that._tbody();
                that._pageable();
                that._thead();
                that._groupable();
                that._toolbar();
                that._setContentHeight();
                that._templates();
                that._navigatable();
                that._selectable();
                that._clipboard();
                that._details();
                that._editable();
                that._attachCustomCommandsEvent();
                that._minScreenSupport();
                if (that.options.autoBind) {
                    that.dataSource.fetch();
                } else {
                    that._group = that._groups() > 0;
                    that._footer();
                }
                if (that.lockedContent) {
                    that.wrapper.addClass('k-grid-lockedcolumns');
                    that._resizeHandler = function() {
                        that.resize();
                    };
                    $(window).on('resize' + NS, that._resizeHandler);
                }
                kendo.notify(that);
            },
            events: [
                CHANGE,
                'dataBinding',
                'cancel',
                DATABOUND,
                DETAILEXPAND,
                DETAILCOLLAPSE,
                DETAILINIT,
                FILTERMENUINIT,
                COLUMNMENUINIT,
                EDIT,
                SAVE,
                REMOVE,
                SAVECHANGES,
                COLUMNRESIZE,
                COLUMNREORDER,
                COLUMNSHOW,
                COLUMNHIDE,
                COLUMNLOCK,
                COLUMNUNLOCK,
                NAVIGATE
            ],
            setDataSource: function(dataSource) {
                var that = this;
                var scrollable = that.options.scrollable;
                that.options.dataSource = dataSource;
                that._dataSource();
                that._pageable();
                that._thead();
                if (scrollable) {
                    if (scrollable.virtual) {
                        that.content.find('>.k-virtual-scrollable-wrap').scrollLeft(0);
                    } else {
                        that.content.scrollLeft(0);
                    }
                }
                if (that.options.groupable) {
                    that._groupable();
                }
                if (that.virtualScrollable) {
                    that.virtualScrollable.setDataSource(that.options.dataSource);
                }
                if (that.options.navigatable) {
                    that._navigatable();
                }
                if (that.options.selectable) {
                    that._selectable();
                }
                if (that.options.autoBind) {
                    dataSource.fetch();
                }
            },
            options: {
                name: 'Grid',
                columns: [],
                toolbar: null,
                autoBind: true,
                filterable: false,
                scrollable: true,
                sortable: false,
                selectable: false,
                allowCopy: false,
                navigatable: false,
                pageable: false,
                editable: false,
                groupable: false,
                rowTemplate: '',
                altRowTemplate: '',
                noRecords: false,
                dataSource: {},
                height: null,
                resizable: false,
                reorderable: false,
                columnMenu: false,
                detailTemplate: null,
                columnResizeHandleWidth: 3,
                mobile: '',
                messages: {
                    editable: {
                        cancelDelete: CANCELDELETE,
                        confirmation: DELETECONFIRM,
                        confirmDelete: CONFIRMDELETE
                    },
                    commands: {
                        create: defaultCommands.create.text,
                        cancel: defaultCommands.cancel.text,
                        save: defaultCommands.save.text,
                        destroy: defaultCommands.destroy.text,
                        edit: defaultCommands.edit.text,
                        update: defaultCommands.update.text,
                        canceledit: defaultCommands.canceledit.text,
                        excel: defaultCommands.excel.text,
                        pdf: defaultCommands.pdf.text
                    },
                    noRecords: NORECORDS
                }
            },
            destroy: function() {
                var that = this,
                    element;
                that._angularItems('cleanup');
                that._destroyColumnAttachments();
                Widget.fn.destroy.call(that);
                this._navigatableTables = null;
                if (that._resizeHandler) {
                    $(window).off('resize' + NS, that._resizeHandler);
                }
                if (that.pager && that.pager.element) {
                    that.pager.destroy();
                }
                that.pager = null;
                if (that.groupable && that.groupable.element) {
                    that.groupable.element.kendoGroupable('destroy');
                }
                that.groupable = null;
                if (that.options.reorderable) {
                    that.wrapper.data('kendoReorderable').destroy();
                }
                if (that.selectable && that.selectable.element) {
                    that.selectable.destroy();
                    that.clearArea();
                    if (that.copyHandler) {
                        that.wrapper.off('keydown', that.copyHandler);
                        that.unbind(that.copyHandler);
                    }
                    if (that.updateClipBoardState) {
                        that.unbind(that.updateClipBoardState);
                        that.updateClipBoardState = null;
                    }
                    if (that.clearAreaHandler) {
                        that.wrapper.off('keyup', that.clearAreaHandler);
                    }
                }
                that.selectable = null;
                if (that.resizable) {
                    that.resizable.destroy();
                    if (that._resizeUserEvents) {
                        if (that._resizeHandleDocumentClickHandler) {
                            $(document).off('click', that._resizeHandleDocumentClickHandler);
                        }
                        that._resizeUserEvents.destroy();
                        that._resizeUserEvents = null;
                    }
                    that.resizable = null;
                }
                if (that.virtualScrollable && that.virtualScrollable.element) {
                    that.virtualScrollable.destroy();
                }
                that.virtualScrollable = null;
                that._destroyEditable();
                if (that.dataSource) {
                    that.dataSource.unbind(CHANGE, that._refreshHandler).unbind(PROGRESS, that._progressHandler).unbind(ERROR, that._errorHandler);
                    that._refreshHandler = that._progressHandler = that._errorHandler = null;
                }
                element = that.element.add(that.wrapper).add(that.table).add(that.thead).add(that.wrapper.find('>.k-grid-toolbar'));
                if (that.content) {
                    element = element.add(that.content).add(that.content.find('>.k-virtual-scrollable-wrap'));
                }
                if (that.lockedHeader) {
                    that._removeLockedContainers();
                }
                if (that.pane) {
                    that.pane.destroy();
                }
                if (that.minScreenResizeHandler) {
                    $(window).off('resize', that.minScreenResizeHandler);
                }
                if (that._draggableInstance && that._draggableInstance.element) {
                    that._draggableInstance.destroy();
                }
                that._draggableInstance = null;
                element.off(NS);
                kendo.destroy(that.wrapper);
                that.rowTemplate = that.altRowTemplate = that.lockedRowTemplate = that.lockedAltRowTemplate = that.detailTemplate = that.footerTemplate = that.groupFooterTemplate = that.lockedGroupFooterTemplate = that.noRecordsTemplate = null;
                that.scrollables = that.thead = that.tbody = that.element = that.table = that.content = that.footer = that.wrapper = that.lockedTable = that.lockedContent = that.lockedHeader = that.lockedFooter = that._groupableClickHandler = that._setContentWidthHandler = null;
            },
            getOptions: function() {
                var options = this.options;
                options.dataSource = null;
                var result = extend(true, {}, this.options);
                result.columns = kendo.deepExtend([], this.columns);
                var dataSource = this.dataSource;
                var initialData = dataSource.options.data && dataSource._data;
                dataSource.options.data = null;
                result.dataSource = $.extend(true, {}, dataSource.options);
                dataSource.options.data = initialData;
                result.dataSource.data = initialData;
                result.dataSource.page = dataSource.page();
                result.dataSource.filter = dataSource.filter();
                result.dataSource.pageSize = dataSource.pageSize();
                result.dataSource.sort = dataSource.sort();
                result.dataSource.group = dataSource.group();
                result.dataSource.aggregate = dataSource.aggregate();
                if (result.dataSource.transport) {
                    result.dataSource.transport.dataSource = null;
                }
                if (result.pageable && result.pageable.pageSize) {
                    result.pageable.pageSize = dataSource.pageSize();
                }
                result.$angular = undefined;
                return result;
            },
            setOptions: function(options) {
                var currentOptions = this.getOptions();
                kendo.deepExtend(currentOptions, options);
                if (!options.dataSource) {
                    currentOptions.dataSource = this.dataSource;
                }
                var wrapper = this.wrapper;
                var events = this._events;
                var element = this.element;
                this.destroy();
                this.options = null;
                if (this._isMobile) {
                    var mobileWrapper = wrapper.closest(kendo.roleSelector('pane')).parent();
                    mobileWrapper.after(wrapper);
                    mobileWrapper.remove();
                    wrapper.removeClass('k-grid-mobile');
                }
                if (wrapper[0] !== element[0]) {
                    wrapper.before(element);
                    wrapper.remove();
                }
                element.empty();
                this.init(element, currentOptions, events);
                this._setEvents(currentOptions);
            },
            items: function() {
                if (this.lockedContent) {
                    return this._items(this.tbody).add(this._items(this.lockedTable.children('tbody')));
                } else {
                    return this._items(this.tbody);
                }
            },
            _items: function(container) {
                return container.children().filter(function() {
                    var tr = $(this);
                    return !tr.hasClass('k-grouping-row') && !tr.hasClass('k-detail-row') && !tr.hasClass('k-group-footer');
                });
            },
            dataItems: function() {
                var dataItems = kendo.ui.DataBoundWidget.fn.dataItems.call(this);
                if (this.lockedContent) {
                    var n = dataItems.length,
                        tmp = new Array(2 * n);
                    for (var i = n; --i >= 0;) {
                        tmp[i] = tmp[i + n] = dataItems[i];
                    }
                    dataItems = tmp;
                }
                return dataItems;
            },
            _destroyColumnAttachments: function() {
                var that = this;
                that.resizeHandle = null;
                if (!that.thead) {
                    return;
                }
                this.angular('cleanup', function() {
                    return {
                        elements: that.thead.get()
                    };
                });
                that.thead.add(that.lockedHeader).find('th').each(function() {
                    var th = $(this),
                        filterMenu = th.data('kendoFilterMenu'),
                        sortable = th.data('kendoColumnSorter'),
                        columnMenu = th.data('kendoColumnMenu');
                    if (filterMenu) {
                        filterMenu.destroy();
                    }
                    if (sortable) {
                        sortable.destroy();
                    }
                    if (columnMenu) {
                        columnMenu.destroy();
                    }
                });
            },
            _attachCustomCommandsEvent: function() {
                var that = this,
                    columns = leafColumns(that.columns || []),
                    command, idx, length;
                for (idx = 0, length = columns.length; idx < length; idx++) {
                    command = columns[idx].command;
                    if (command) {
                        attachCustomCommandEvent(that, that.wrapper, command);
                    }
                }
            },
            _aria: function() {
                var id = this.element.attr('id') || 'aria';
                if (id) {
                    this._cellId = id + '_active_cell';
                }
            },
            _element: function() {
                var that = this,
                    table = that.element;
                if (!table.is('table')) {
                    if (that.options.scrollable) {
                        table = that.element.find('> .k-grid-content > table');
                    } else {
                        table = that.element.children('table');
                    }
                    if (!table.length) {
                        table = $('<table />').appendTo(that.element);
                    }
                }
                if (isIE7) {
                    table.attr('cellspacing', 0);
                }
                that.table = table.attr('role', that._hasDetails() ? 'treegrid' : 'grid');
                that._wrapper();
            },
            _createResizeHandle: function(container, th) {
                var that = this;
                var indicatorWidth = that.options.columnResizeHandleWidth;
                var scrollable = that.options.scrollable;
                var resizeHandle = that.resizeHandle;
                var groups = this._groups();
                var left;
                if (resizeHandle && that.lockedContent && resizeHandle.data('th')[0] !== th[0]) {
                    resizeHandle.off(NS).remove();
                    resizeHandle = null;
                }
                if (!resizeHandle) {
                    resizeHandle = that.resizeHandle = $('<div class="k-resize-handle"><div class="k-resize-handle-inner"></div></div>');
                    container.append(resizeHandle);
                }
                if (!isRtl) {
                    left = th[0].offsetWidth;
                    var cells = leafDataCells(th.closest('thead')).filter(':visible');
                    for (var idx = 0; idx < cells.length; idx++) {
                        if (cells[idx] == th[0]) {
                            break;
                        }
                        left += cells[idx].offsetWidth;
                    }
                    if (groups > 0) {
                        left += container.find('.k-group-cell:first').outerWidth() * groups;
                    }
                    if (that._hasDetails()) {
                        left += container.find('.k-hierarchy-cell:first').outerWidth();
                    }
                } else {
                    left = th.position().left;
                    if (scrollable) {
                        var headerWrap = th.closest('.k-grid-header-wrap, .k-grid-header-locked'),
                            ieCorrection = browser.msie ? headerWrap.scrollLeft() : 0,
                            webkitCorrection = browser.webkit ? headerWrap[0].scrollWidth - headerWrap[0].offsetWidth - headerWrap.scrollLeft() : 0,
                            firefoxCorrection = browser.mozilla ? headerWrap[0].scrollWidth - headerWrap[0].offsetWidth - (headerWrap[0].scrollWidth - headerWrap[0].offsetWidth - headerWrap.scrollLeft()) : 0;
                        left -= webkitCorrection - firefoxCorrection + ieCorrection;
                    }
                }
                resizeHandle.css({
                    top: th.position().top,
                    left: left - indicatorWidth,
                    height: th.outerHeight(),
                    width: indicatorWidth * 3
                }).data('th', th).show();
                resizeHandle.off('dblclick' + NS).on('dblclick' + NS, function() {
                    that._autoFitLeafColumn(th.data('index'));
                });
            },
            _positionColumnResizeHandle: function() {
                var that = this,
                    indicatorWidth = that.options.columnResizeHandleWidth,
                    lockedHead = that.lockedHeader ? that.lockedHeader.find('thead:first') : $();
                that.thead.add(lockedHead).on('mousemove' + NS, 'th', function(e) {
                    var th = $(this);
                    if (th.hasClass('k-group-cell') || th.hasClass('k-hierarchy-cell')) {
                        return;
                    }
                    var clientX = e.clientX / parseFloat(document.documentElement.style.zoom || document.body.style.zoom || 1),
                        winScrollLeft = $(window).scrollLeft(),
                        position = th.offset().left + (!isRtl ? this.offsetWidth : 0);
                    if (clientX + winScrollLeft > position - indicatorWidth && clientX + winScrollLeft < position + indicatorWidth) {
                        that._createResizeHandle(th.closest('div'), th);
                    } else if (that.resizeHandle) {
                        that.resizeHandle.hide();
                    } else {
                        cursor(that.wrapper, '');
                    }
                });
            },
            _resizeHandleDocumentClick: function(e) {
                if ($(e.target).closest('.k-column-active').length) {
                    return;
                }
                $(document).off(e);
                this._hideResizeHandle();
            },
            _hideResizeHandle: function() {
                if (this.resizeHandle) {
                    this.resizeHandle.data('th').removeClass('k-column-active');
                    if (this.lockedContent && !this._isMobile) {
                        this.resizeHandle.off(NS).remove();
                        this.resizeHandle = null;
                    } else {
                        this.resizeHandle.hide();
                    }
                }
            },
            _positionColumnResizeHandleTouch: function() {
                var that = this,
                    lockedHead = that.lockedHeader ? that.lockedHeader.find('thead:first') : $();
                that._resizeUserEvents = new kendo.UserEvents(lockedHead.add(that.thead), {
                    filter: 'th:not(.k-group-cell):not(.k-hierarchy-cell)',
                    threshold: 10,
                    hold: function(e) {
                        var th = $(e.target);
                        e.preventDefault();
                        th.addClass('k-column-active');
                        that._createResizeHandle(th.closest('div'), th);
                        if (!that._resizeHandleDocumentClickHandler) {
                            that._resizeHandleDocumentClickHandler = proxy(that._resizeHandleDocumentClick, that);
                        }
                        $(document).on('click', that._resizeHandleDocumentClickHandler);
                    }
                });
            },
            _resizable: function() {
                var that = this,
                    options = that.options,
                    container, columnStart, columnWidth, gridWidth, isMobile = this._isMobile,
                    scrollbar = !kendo.support.mobileOS ? kendo.support.scrollbar() : 0,
                    isLocked, col, th;
                if (options.resizable) {
                    container = options.scrollable ? that.wrapper.find('.k-grid-header-wrap:first') : that.wrapper;
                    if (isMobile) {
                        that._positionColumnResizeHandleTouch(container);
                    } else {
                        that._positionColumnResizeHandle(container);
                    }
                    if (that.resizable) {
                        that.resizable.destroy();
                    }
                    that.resizable = new ui.Resizable(container.add(that.lockedHeader), {
                        handle: (!!options.scrollable ? '' : '>') + '.k-resize-handle',
                        hint: function(handle) {
                            return $('<div class="k-grid-resize-indicator" />').css({
                                height: handle.data('th').outerHeight() + that.tbody.attr('clientHeight')
                            });
                        },
                        start: function(e) {
                            th = $(e.currentTarget).data('th');
                            if (isMobile) {
                                that._hideResizeHandle();
                            }
                            var header = th.closest('table'),
                                index = $.inArray(th[0], leafDataCells(th.closest('thead')).filter(':visible'));
                            isLocked = header.parent().hasClass('k-grid-header-locked');
                            var contentTable = isLocked ? that.lockedTable : that.table,
                                footer = that.footer || $();
                            if (that.footer && that.lockedContent) {
                                footer = isLocked ? that.footer.children('.k-grid-footer-locked') : that.footer.children('.k-grid-footer-wrap');
                            }
                            cursor(that.wrapper, 'col-resize');
                            if (options.scrollable) {
                                col = header.find('col:not(.k-group-col):not(.k-hierarchy-col):eq(' + index + ')').add(contentTable.children('colgroup').find('col:not(.k-group-col):not(.k-hierarchy-col):eq(' + index + ')')).add(footer.find('colgroup').find('col:not(.k-group-col):not(.k-hierarchy-col):eq(' + index + ')'));
                            } else {
                                col = contentTable.children('colgroup').find('col:not(.k-group-col):not(.k-hierarchy-col):eq(' + index + ')');
                            }
                            columnStart = e.x.location;
                            columnWidth = th.outerWidth();
                            gridWidth = isLocked ? contentTable.children('tbody').outerWidth() : that.tbody.outerWidth();
                            if (browser.webkit) {
                                that.wrapper.addClass('k-grid-column-resizing');
                            }
                        },
                        resize: function(e) {
                            var rtlMultiplier = isRtl ? -1 : 1,
                                currentWidth = columnWidth + e.x.location * rtlMultiplier - columnStart * rtlMultiplier;
                            if (options.scrollable) {
                                var footer;
                                if (isLocked && that.lockedFooter) {
                                    footer = that.lockedFooter.children('table');
                                } else if (that.footer) {
                                    footer = that.footer.find('>.k-grid-footer-wrap>table');
                                }
                                if (!footer || !footer[0]) {
                                    footer = $();
                                }
                                var header = th.closest('table');
                                var contentTable = isLocked ? that.lockedTable : that.table;
                                var constrain = false;
                                var totalWidth = that.wrapper.width() - scrollbar;
                                var width = currentWidth;
                                if (isLocked && gridWidth - columnWidth + width > totalWidth) {
                                    width = columnWidth + (totalWidth - gridWidth - scrollbar * 2);
                                    if (width < 0) {
                                        width = currentWidth;
                                    }
                                    constrain = true;
                                }
                                if (width > 10) {
                                    col.css('width', width);
                                    if (gridWidth) {
                                        if (constrain) {
                                            width = totalWidth - scrollbar * 2;
                                        } else {
                                            width = gridWidth + e.x.location * rtlMultiplier - columnStart * rtlMultiplier;
                                        }
                                        contentTable.add(header).add(footer).css('width', width);
                                        if (!isLocked) {
                                            that._footerWidth = width;
                                        }
                                    }
                                }
                            } else if (currentWidth > 10) {
                                col.css('width', currentWidth);
                            }
                        },
                        resizeend: function() {
                            var newWidth = th.outerWidth(),
                                column, header;
                            cursor(that.wrapper, '');
                            if (browser.webkit) {
                                that.wrapper.removeClass('k-grid-column-resizing');
                            }
                            if (columnWidth != newWidth) {
                                header = that.lockedHeader ? that.lockedHeader.find('thead:first tr:first').add(that.thead.find('tr:first')) : th.parent();
                                var index = th.attr(kendo.attr('index'));
                                if (!index) {
                                    index = header.find('th:not(.k-group-cell):not(.k-hierarchy-cell)').index(th);
                                }
                                column = leafColumns(that.columns)[index];
                                column.width = newWidth;
                                that.trigger(COLUMNRESIZE, {
                                    column: column,
                                    oldWidth: columnWidth,
                                    newWidth: newWidth
                                });
                                that._applyLockedContainersWidth();
                                that._syncLockedContentHeight();
                                that._syncLockedHeaderHeight();
                            }
                            that._hideResizeHandle();
                            th = null;
                        }
                    });
                }
            },
            _draggable: function() {
                var that = this;
                if (that.options.reorderable) {
                    if (that._draggableInstance) {
                        that._draggableInstance.destroy();
                    }
                    that._draggableInstance = that.wrapper.kendoDraggable({
                        group: kendo.guid(),
                        autoScroll: true,
                        filter: that.content ? '.k-grid-header:first ' + HEADERCELLS : 'table:first>.k-grid-header ' + HEADERCELLS,
                        drag: function() {
                            that._hideResizeHandle();
                        },
                        hint: function(target) {
                            var title = target.attr(kendo.attr('title'));
                            if (title) {
                                title = kendo.htmlEncode(title);
                            }
                            return $('<div class="k-header k-drag-clue" />').css({
                                width: target.width(),
                                paddingLeft: target.css('paddingLeft'),
                                paddingRight: target.css('paddingRight'),
                                lineHeight: target.height() + 'px',
                                paddingTop: target.css('paddingTop'),
                                paddingBottom: target.css('paddingBottom')
                            }).html(title || target.attr(kendo.attr('field')) || target.text()).prepend('<span class="k-icon k-drag-status k-denied" />');
                        }
                    }).data('kendoDraggable');
                }
            },
            _reorderable: function() {
                var that = this;
                if (that.options.reorderable) {
                    if (that.wrapper.data('kendoReorderable')) {
                        that.wrapper.data('kendoReorderable').destroy();
                    }
                    var targetParentContainerIndex = function(columns, sourceIndex, targetIndex) {
                        var column = columns[sourceIndex];
                        var target = columns[targetIndex];
                        var parent = columnParent(column, that.columns);
                        columns = parent ? parent.columns : that.columns;
                        return inArray(target, columns);
                    };
                    that.wrapper.kendoReorderable({
                        draggable: that._draggableInstance,
                        dragOverContainers: function(sourceIndex, targetIndex) {
                            var columns = flatColumnsInDomOrder(that.columns);
                            return columns[sourceIndex].lockable !== false && targetParentContainerIndex(columns, sourceIndex, targetIndex) > -1;
                        },
                        inSameContainer: function(e) {
                            return $(e.source).parent()[0] === $(e.target).parent()[0] && targetParentContainerIndex(flatColumnsInDomOrder(that.columns), e.sourceIndex, e.targetIndex) > -1;
                        },
                        change: function(e) {
                            var columns = flatColumnsInDomOrder(that.columns);
                            var column = columns[e.oldIndex];
                            var newIndex = targetParentContainerIndex(columns, e.oldIndex, e.newIndex);
                            that.trigger(COLUMNREORDER, {
                                newIndex: newIndex,
                                oldIndex: inArray(column, columns),
                                column: column
                            });
                            that.reorderColumn(newIndex, column, e.position === 'before');
                        }
                    });
                }
            },
            _reorderHeader: function(sources, target, before) {
                var that = this;
                var sourcePosition = columnPosition(sources[0], that.columns);
                var destPosition = columnPosition(target, that.columns);
                var leafs = [];
                for (var idx = 0; idx < sources.length; idx++) {
                    if (sources[idx].columns) {
                        leafs = leafs.concat(sources[idx].columns);
                    }
                }
                var ths = elements(that.lockedHeader, that.thead, 'tr:eq(' + sourcePosition.row + ')>th.k-header:not(.k-group-cell,.k-hierarchy-cell)');
                var sourceLockedColumns = lockedColumns(sources).length;
                var targetLockedColumns = lockedColumns([target]).length;
                if (leafs.length) {
                    if (sourceLockedColumns > 0 && targetLockedColumns === 0) {
                        moveCellsBetweenContainers(sources, target, leafs, that.columns, that.lockedHeader.find('thead'), that.thead, this._groups());
                    } else if (sourceLockedColumns === 0 && targetLockedColumns > 0) {
                        moveCellsBetweenContainers(sources, target, leafs, that.columns, that.thead, that.lockedHeader.find('thead'), this._groups());
                    }
                    if (target.columns || sourcePosition.cell - destPosition.cell > 1 || destPosition.cell - sourcePosition.cell > 1) {
                        target = findReorderTarget(that.columns, target, sources[0], before);
                        if (target) {
                            that._reorderHeader(leafs, target, before);
                        }
                    }
                } else if (sourceLockedColumns !== targetLockedColumns) {
                    updateCellRowSpan(ths[sourcePosition.cell], that.columns, sourceLockedColumns);
                }
                reorder(ths, sourcePosition.cell, destPosition.cell, before, sources.length);
            },
            _reorderContent: function(sources, destination, before) {
                var that = this;
                var lockedRows = $();
                var source = sources[0];
                var visibleSources = visibleColumns(sources);
                var sourceIndex = inArray(source, leafColumns(that.columns));
                var destIndex = inArray(destination, leafColumns(that.columns));
                var colSourceIndex = inArray(source, visibleLeafColumns(that.columns));
                var colDest = inArray(destination, visibleLeafColumns(that.columns));
                var lockedCount = lockedColumns(that.columns).length;
                var isLocked = !!destination.locked;
                var footer = that.footer || that.wrapper.find('.k-grid-footer');
                var headerCol, footerCol;
                headerCol = footerCol = colDest;
                if (destination.hidden) {
                    if (isLocked) {
                        colDest = that.lockedTable.find('colgroup');
                        headerCol = that.lockedHeader.find('colgroup');
                        footerCol = $(that.lockedFooter).find('>table>colgroup');
                    } else {
                        colDest = that.tbody.prev();
                        headerCol = that.thead.prev();
                        footerCol = footer.find('.k-grid-footer-wrap').find('>table>colgroup');
                    }
                }
                if (that._hasFilterRow()) {
                    reorder(that.wrapper.find('.k-filter-row th:not(.k-group-cell,.k-hierarchy-cell)'), sourceIndex, destIndex, before, sources.length);
                }
                reorder(elements(that.lockedHeader, that.thead.prev(), 'col:not(.k-group-col,.k-hierarchy-col)'), colSourceIndex, headerCol, before, visibleSources.length);
                if (that.options.scrollable) {
                    reorder(elements(that.lockedTable, that.tbody.prev(), 'col:not(.k-group-col,.k-hierarchy-col)'), colSourceIndex, colDest, before, visibleSources.length);
                }
                if (footer && footer.length) {
                    reorder(elements(that.lockedFooter, footer.find('.k-grid-footer-wrap'), '>table>colgroup>col:not(.k-group-col,.k-hierarchy-col)'), colSourceIndex, footerCol, before, visibleSources.length);
                    reorder(footer.find('.k-footer-template>td:not(.k-group-cell,.k-hierarchy-cell)'), sourceIndex, destIndex, before, sources.length);
                }
                var rows = that.tbody.children(':not(.k-grouping-row,.k-detail-row)');
                if (that.lockedTable) {
                    if (lockedCount > destIndex) {
                        if (lockedCount <= sourceIndex) {
                            updateColspan(that.lockedTable.find('>tbody>tr.k-grouping-row'), that.table.find('>tbody>tr.k-grouping-row'), sources.length);
                        }
                    } else if (lockedCount > sourceIndex) {
                        updateColspan(that.table.find('>tbody>tr.k-grouping-row'), that.lockedTable.find('>tbody>tr.k-grouping-row'), sources.length);
                    }
                    lockedRows = that.lockedTable.find('>tbody>tr:not(.k-grouping-row,.k-detail-row)');
                }
                for (var idx = 0, length = rows.length; idx < length; idx += 1) {
                    reorder(elements(lockedRows[idx], rows[idx], '>td:not(.k-group-cell,.k-hierarchy-cell)'), sourceIndex, destIndex, before, sources.length);
                }
            },
            _autoFitLeafColumn: function(leafIndex) {
                this.autoFitColumn(leafColumns(this.columns)[leafIndex]);
            },
            autoFitColumn: function(column) {
                var that = this,
                    options = that.options,
                    columns = that.columns,
                    index, th, headerTable, isLocked, visibleLocked = that.lockedHeader ? leafDataCells(that.lockedHeader.find('>table>thead')).filter(isCellVisible).length : 0,
                    col, notGroupOrHierarchyCol = 'col:not(.k-group-col):not(.k-hierarchy-col)',
                    notGroupOrHierarchyVisibleCell = 'td:visible:not(.k-group-cell):not(.k-hierarchy-cell)';
                if (typeof column == 'number') {
                    column = columns[column];
                } else if (isPlainObject(column)) {
                    column = grep(flatColumns(columns), function(item) {
                        return item === column;
                    })[0];
                } else {
                    column = grep(flatColumns(columns), function(item) {
                        return item.field === column;
                    })[0];
                }
                if (!column || !isVisible(column)) {
                    return;
                }
                index = inArray(column, leafColumns(columns));
                isLocked = column.locked;
                if (isLocked) {
                    headerTable = that.lockedHeader.children('table');
                } else {
                    headerTable = that.thead.parent();
                }
                th = headerTable.find('[data-index=\'' + index + '\']');
                var contentTable = isLocked ? that.lockedTable : that.table,
                    footer = that.footer || $();
                if (that.footer && that.lockedContent) {
                    footer = isLocked ? that.footer.children('.k-grid-footer-locked') : that.footer.children('.k-grid-footer-wrap');
                }
                var footerTable = footer.find('table').first();
                if (that.lockedHeader && !isLocked) {
                    index -= visibleLocked;
                }
                for (var j = 0; j < columns.length; j++) {
                    if (columns[j] === column) {
                        break;
                    } else {
                        if (columns[j].hidden) {
                            index--;
                        }
                    }
                }
                if (options.scrollable) {
                    col = headerTable.find(notGroupOrHierarchyCol).eq(index).add(contentTable.children('colgroup').find(notGroupOrHierarchyCol).eq(index)).add(footerTable.find('colgroup').find(notGroupOrHierarchyCol).eq(index));
                } else {
                    col = contentTable.children('colgroup').find(notGroupOrHierarchyCol).eq(index);
                }
                var tables = headerTable.add(contentTable).add(footerTable);
                var oldColumnWidth = th.outerWidth();
                col.width('');
                tables.css('table-layout', 'fixed');
                col.width('auto');
                tables.addClass('k-autofitting');
                tables.css('table-layout', '');
                var newColumnWidth = Math.ceil(Math.max(th.outerWidth(), contentTable.find('tr:not(.k-grouping-row)').eq(0).children(notGroupOrHierarchyVisibleCell).eq(index).outerWidth(), footerTable.find('tr').eq(0).children(notGroupOrHierarchyVisibleCell).eq(index).outerWidth())) + 1;
                col.width(newColumnWidth);
                column.width = newColumnWidth;
                if (options.scrollable) {
                    var cols = headerTable.find('col'),
                        colWidth, totalWidth = 0;
                    for (var idx = 0, length = cols.length; idx < length; idx += 1) {
                        colWidth = cols[idx].style.width;
                        if (colWidth && colWidth.indexOf('%') == -1) {
                            totalWidth += parseInt(colWidth, 10);
                        } else {
                            totalWidth = 0;
                            break;
                        }
                    }
                    if (totalWidth) {
                        tables.each(function() {
                            this.style.width = totalWidth + 'px';
                        });
                    }
                }
                if (browser.msie && browser.version == 8) {
                    tables.css('display', 'inline-table');
                    setTimeout(function() {
                        tables.css('display', 'table');
                    }, 1);
                }
                tables.removeClass('k-autofitting');
                that.trigger(COLUMNRESIZE, {
                    column: column,
                    oldWidth: oldColumnWidth,
                    newWidth: newColumnWidth
                });
                that._applyLockedContainersWidth();
                that._syncLockedContentHeight();
                that._syncLockedHeaderHeight();
            },
            reorderColumn: function(destIndex, column, before) {
                var that = this,
                    parent = columnParent(column, that.columns),
                    columns = parent ? parent.columns : that.columns,
                    sourceIndex = inArray(column, columns),
                    destColumn = columns[destIndex],
                    lockChanged, isLocked = !!destColumn.locked,
                    lockedCount = lockedColumns(that.columns).length;
                if (sourceIndex === destIndex) {
                    return;
                }
                if (!column.locked && isLocked && nonLockedColumns(that.columns).length == 1) {
                    return;
                }
                if (column.locked && !isLocked && lockedCount == 1) {
                    return;
                }
                that._hideResizeHandle();
                if (before === undefined) {
                    before = destIndex < sourceIndex;
                }
                var sourceColumns = [column];
                that._reorderHeader(sourceColumns, destColumn, before);
                if (that.lockedHeader) {
                    removeEmptyRows(that.thead);
                    removeEmptyRows(that.lockedHeader);
                }
                if (destColumn.columns) {
                    destColumn = leafColumns(destColumn.columns);
                    destColumn = destColumn[before ? 0 : destColumn.length - 1];
                }
                if (column.columns) {
                    sourceColumns = leafColumns(column.columns);
                }
                that._reorderContent(sourceColumns, destColumn, before);
                lockChanged = !!column.locked;
                lockChanged = lockChanged != isLocked;
                column.locked = isLocked;
                columns.splice(before ? destIndex : destIndex + 1, 0, column);
                columns.splice(sourceIndex < destIndex ? sourceIndex : sourceIndex + 1, 1);
                that._templates();
                that._updateColumnCellIndex();
                that._updateTablesWidth();
                that._applyLockedContainersWidth();
                that._syncLockedHeaderHeight();
                that._syncLockedContentHeight();
                that._updateFirstColumnClass();
                if (!lockChanged) {
                    return;
                }
                if (isLocked) {
                    that.trigger(COLUMNLOCK, {
                        column: column
                    });
                } else {
                    that.trigger(COLUMNUNLOCK, {
                        column: column
                    });
                }
            },
            _updateColumnCellIndex: function() {
                var header;
                var offset = 0;
                if (this.lockedHeader) {
                    header = this.lockedHeader.find('thead');
                    offset = updateCellIndex(header, lockedColumns(this.columns));
                }
                updateCellIndex(this.thead, nonLockedColumns(this.columns), offset);
            },
            lockColumn: function(column) {
                var columns = this.columns;
                if (typeof column == 'number') {
                    column = columns[column];
                } else {
                    column = grep(columns, function(item) {
                        return item.field === column;
                    })[0];
                }
                if (!column || column.locked || column.hidden) {
                    return;
                }
                var index = lockedColumns(columns).length - 1;
                this.reorderColumn(index, column, false);
            },
            unlockColumn: function(column) {
                var columns = this.columns;
                if (typeof column == 'number') {
                    column = columns[column];
                } else {
                    column = grep(columns, function(item) {
                        return item.field === column;
                    })[0];
                }
                if (!column || !column.locked || column.hidden) {
                    return;
                }
                var index = lockedColumns(columns).length;
                this.reorderColumn(index, column, true);
            },
            cellIndex: function(td) {
                var lockedColumnOffset = 0;
                if (this.lockedTable && !$.contains(this.lockedTable[0], td[0])) {
                    lockedColumnOffset = leafColumns(lockedColumns(this.columns)).length;
                }
                return $(td).parent().children('td:not(.k-group-cell,.k-hierarchy-cell)').index(td) + lockedColumnOffset;
            },
            _modelForContainer: function(container) {
                container = $(container);
                if (!container.is('tr') && this._editMode() !== 'popup') {
                    container = container.closest('tr');
                }
                var id = container.attr(kendo.attr('uid'));
                return this.dataSource.getByUid(id);
            },
            _editable: function() {
                var that = this,
                    selectable = that.selectable && that.selectable.options.multiple,
                    editable = that.options.editable,
                    handler = function() {
                        var target = activeElement(),
                            cell = that._editContainer;
                        if (cell && !$.contains(cell[0], target) && cell[0] !== target && !$(target).closest('.k-animation-container').length) {
                            if (that.editable.end()) {
                                that.closeCell();
                            }
                        }
                    };
                if (editable) {
                    this.wrapper.addClass('k-editable');
                    var mode = that._editMode();
                    if (mode === 'incell') {
                        if (editable.update !== false) {
                            that.wrapper.on(CLICK + NS, 'tr:not(.k-grouping-row) > td', function(e) {
                                var td = $(this),
                                    isLockedCell = that.lockedTable && td.closest('table')[0] === that.lockedTable[0];
                                if (td.hasClass('k-hierarchy-cell') || td.hasClass('k-detail-cell') || td.hasClass('k-group-cell') || td.hasClass('k-edit-cell') || td.has('a.k-grid-delete').length || td.has('button.k-grid-delete').length || td.closest('tbody')[0] !== that.tbody[0] && !isLockedCell || $(e.target).is(':input')) {
                                    return;
                                }
                                if (that.editable) {
                                    if (that.editable.end()) {
                                        if (selectable) {
                                            $(activeElement()).blur();
                                        }
                                        that.closeCell();
                                        that.editCell(td);
                                    }
                                } else {
                                    that.editCell(td);
                                }
                            }).on('focusin' + NS, function() {
                                if (!$.contains(this, activeElement())) {
                                    clearTimeout(that.timer);
                                    that.timer = null;
                                }
                            }).on('focusout' + NS, function() {
                                that.timer = setTimeout(handler, 1);
                            });
                        }
                    } else {
                        if (editable.update !== false) {
                            that.wrapper.on(CLICK + NS, 'tbody>tr:not(.k-detail-row,.k-grouping-row):visible a.k-grid-edit', function(e) {
                                e.preventDefault();
                                that.editRow($(this).closest('tr'));
                            });
                        }
                    }
                    if (editable.destroy !== false) {
                        that.wrapper.on(CLICK + NS, 'tbody>tr:not(.k-detail-row,.k-grouping-row):visible .k-grid-delete', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            that.removeRow($(this).closest('tr'));
                        });
                    } else {
                        that.wrapper.on(CLICK + NS, 'tbody>tr:not(.k-detail-row,.k-grouping-row):visible button.k-grid-delete', function(e) {
                            e.stopPropagation();
                            if (!that._confirmation()) {
                                e.preventDefault();
                            }
                        });
                    }
                }
            },
            editCell: function(cell) {
                cell = $(cell);
                var that = this,
                    column = leafColumns(that.columns)[that.cellIndex(cell)],
                    model = that._modelForContainer(cell);
                that.closeCell();
                if (model && (!model.editable || model.editable(column.field)) && !column.command && column.field) {
                    that._attachModelChange(model);
                    that._editContainer = cell;
                    that.editable = cell.addClass('k-edit-cell').kendoEditable({
                        fields: {
                            field: column.field,
                            format: column.format,
                            editor: column.editor,
                            values: column.values
                        },
                        model: model,
                        target: that,
                        change: function(e) {
                            if (that.trigger(SAVE, {
                                    values: e.values,
                                    container: cell,
                                    model: model
                                })) {
                                e.preventDefault();
                            }
                        }
                    }).data('kendoEditable');
                    var tr = cell.parent().addClass('k-grid-edit-row');
                    if (that.lockedContent) {
                        adjustRowHeight(tr[0], that._relatedRow(tr).addClass('k-grid-edit-row')[0]);
                    }
                    that.trigger(EDIT, {
                        container: cell,
                        model: model
                    });
                }
            },
            _adjustLockedHorizontalScrollBar: function() {
                var table = this.table,
                    content = table.parent();
                var scrollbar = table[0].offsetWidth > content[0].clientWidth ? kendo.support.scrollbar() : 0;
                this.lockedContent.height(content.height() - scrollbar);
            },
            _syncLockedContentHeight: function() {
                if (this.lockedTable) {
                    if (!this.touchScroller) {
                        this._adjustLockedHorizontalScrollBar();
                    }
                    this._adjustRowsHeight(this.table, this.lockedTable);
                }
            },
            _syncLockedHeaderHeight: function() {
                if (this.lockedHeader) {
                    var lockedTable = this.lockedHeader.children('table');
                    var table = this.thead.parent();
                    this._adjustRowsHeight(lockedTable, table);
                    syncTableHeight(lockedTable, table);
                }
            },
            _syncLockedFooterHeight: function() {
                if (this.lockedFooter && this.footer && this.footer.length) {
                    this._adjustRowsHeight(this.lockedFooter.children('table'), this.footer.find('.k-grid-footer-wrap > table'));
                }
            },
            _destroyEditable: function() {
                var that = this;
                var destroy = function() {
                    if (that.editable) {
                        var container = that.editView ? that.editView.element : that._editContainer;
                        if (container) {
                            container.off(CLICK + NS, 'a.k-grid-cancel', that._editCancelClickHandler);
                            container.off(CLICK + NS, 'a.k-grid-update', that._editUpdateClickHandler);
                        }
                        that._detachModelChange();
                        that.editable.destroy();
                        that.editable = null;
                        that._editContainer = null;
                        that._destroyEditView();
                    }
                };
                if (that.editable) {
                    if (that._editMode() === 'popup' && !that._isMobile) {
                        that._editContainer.data('kendoWindow').bind('deactivate', destroy).close();
                    } else {
                        destroy();
                    }
                }
                if (that._actionSheet) {
                    that._actionSheet.destroy();
                    that._actionSheet = null;
                }
            },
            _destroyEditView: function() {
                if (this.editView) {
                    this.editView.purge();
                    this.editView = null;
                    this.pane.navigate('');
                }
            },
            _attachModelChange: function(model) {
                var that = this;
                that._modelChangeHandler = function(e) {
                    that._modelChange({
                        field: e.field,
                        model: this
                    });
                };
                model.bind('change', that._modelChangeHandler);
            },
            _detachModelChange: function() {
                var that = this,
                    container = that._editContainer,
                    model = that._modelForContainer(container);
                if (model) {
                    model.unbind(CHANGE, that._modelChangeHandler);
                }
            },
            closeCell: function(isCancel) {
                var that = this,
                    cell = that._editContainer,
                    id, column, tr, model;
                if (!cell) {
                    return;
                }
                id = cell.closest('tr').attr(kendo.attr('uid'));
                model = that.dataSource.getByUid(id);
                if (isCancel && that.trigger('cancel', {
                        container: cell,
                        model: model
                    })) {
                    return;
                }
                cell.removeClass('k-edit-cell');
                column = leafColumns(that.columns)[that.cellIndex(cell)];
                tr = cell.parent().removeClass('k-grid-edit-row');
                that._destroyEditable();
                that._displayCell(cell, column, model);
                if (cell.hasClass('k-dirty-cell')) {
                    $('<span class="k-dirty"/>').prependTo(cell);
                }
                that.trigger('itemChange', {
                    item: tr,
                    data: model,
                    ns: ui
                });
                if (that.lockedContent) {
                    adjustRowHeight(tr.css('height', '')[0], that._relatedRow(tr).css('height', '')[0]);
                }
            },
            _displayCell: function(cell, column, dataItem) {
                var that = this,
                    state = {
                        storage: {},
                        count: 0
                    },
                    settings = extend({}, kendo.Template, that.options.templateSettings),
                    tmpl = kendo.template(that._cellTmpl(column, state), settings);
                if (state.count > 0) {
                    tmpl = proxy(tmpl, state.storage);
                }
                cell.empty().html(tmpl(dataItem));
                that.angular('compile', function() {
                    return {
                        elements: cell,
                        data: [{
                            dataItem: dataItem
                        }]
                    };
                });
            },
            removeRow: function(row) {
                if (!this._confirmation(row)) {
                    return;
                }
                this._removeRow(row);
            },
            _removeRow: function(row) {
                var that = this,
                    model, mode = that._editMode();
                if (mode !== 'incell') {
                    that.cancelRow();
                }
                row = $(row);
                if (that.lockedContent) {
                    row = row.add(that._relatedRow(row));
                }
                row = row.hide();
                model = that._modelForContainer(row);
                if (model && !that.trigger(REMOVE, {
                        row: row,
                        model: model
                    })) {
                    that.dataSource.remove(model);
                    if (mode === 'inline' || mode === 'popup') {
                        that.dataSource.sync();
                    }
                } else if (mode === 'incell') {
                    that._destroyEditable();
                }
            },
            _editMode: function() {
                var mode = 'incell',
                    editable = this.options.editable;
                if (editable !== true) {
                    if (typeof editable == 'string') {
                        mode = editable;
                    } else {
                        mode = editable.mode || mode;
                    }
                }
                return mode;
            },
            editRow: function(row) {
                var model;
                var that = this;
                if (row instanceof kendo.data.ObservableObject) {
                    model = row;
                } else {
                    row = $(row);
                    model = that._modelForContainer(row);
                }
                var mode = that._editMode();
                var container;
                that.cancelRow();
                if (model) {
                    row = that.tbody.children('[' + kendo.attr('uid') + '=' + model.uid + ']');
                    that._attachModelChange(model);
                    if (mode === 'popup') {
                        that._createPopupEditor(model);
                    } else if (mode === 'inline') {
                        that._createInlineEditor(row, model);
                    } else if (mode === 'incell') {
                        $(row).children(DATA_CELL).each(function() {
                            var cell = $(this);
                            var column = leafColumns(that.columns)[that.cellIndex(cell)];
                            model = that._modelForContainer(cell);
                            if (model && (!model.editable || model.editable(column.field)) && column.field) {
                                that.editCell(cell);
                                return false;
                            }
                        });
                    }
                    container = that.editView ? that.editView.element : that._editContainer;
                    if (container) {
                        if (!this._editCancelClickHandler) {
                            this._editCancelClickHandler = proxy(this._editCancelClick, this);
                        }
                        container.on(CLICK + NS, 'a.k-grid-cancel', this._editCancelClickHandler);
                        if (!this._editUpdateClickHandler) {
                            this._editUpdateClickHandler = proxy(this._editUpdateClick, this);
                        }
                        container.on(CLICK + NS, 'a.k-grid-update', this._editUpdateClickHandler);
                    }
                }
            },
            _editUpdateClick: function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.saveRow();
            },
            _editCancelClick: function(e) {
                var that = this;
                var navigatable = that.options.navigatable;
                var model = that.editable.options.model;
                var container = that.editView ? that.editView.element : that._editContainer;
                e.preventDefault();
                e.stopPropagation();
                if (that.trigger('cancel', {
                        container: container,
                        model: model
                    })) {
                    return;
                }
                var currentIndex = that.items().index($(that.current()).parent());
                that.cancelRow();
                if (navigatable) {
                    that._setCurrent(that.items().eq(currentIndex).children().filter(NAVCELL).first());
                    focusTable(that.table, true);
                }
            },
            _createPopupEditor: function(model) {
                var that = this,
                    html = '<div ' + kendo.attr('uid') + '="' + model.uid + '" class="k-popup-edit-form' + (that._isMobile ? ' k-mobile-list' : '') + '"><div class="k-edit-form-container">',
                    column, command, fields = [],
                    idx, length, tmpl, updateText, cancelText, tempCommand, columns = leafColumns(that.columns),
                    attr, editable = that.options.editable,
                    template = editable.template,
                    options = isPlainObject(editable) ? editable.window : {},
                    settings = extend({}, kendo.Template, that.options.templateSettings);
                options = options || {};
                if (template) {
                    if (typeof template === STRING) {
                        template = window.unescape(template);
                    }
                    html += kendo.template(template, settings)(model);
                    for (idx = 0, length = columns.length; idx < length; idx++) {
                        column = columns[idx];
                        if (column.command) {
                            tempCommand = getCommand(column.command, 'edit');
                            if (tempCommand) {
                                command = tempCommand;
                            }
                        }
                    }
                } else {
                    for (idx = 0, length = columns.length; idx < length; idx++) {
                        column = columns[idx];
                        if (!column.command) {
                            html += '<div class="k-edit-label"><label for="' + column.field + '">' + (column.title || column.field || '') + '</label></div>';
                            if ((!model.editable || model.editable(column.field)) && column.field) {
                                fields.push({
                                    field: column.field,
                                    format: column.format,
                                    editor: column.editor,
                                    values: column.values
                                });
                                html += '<div ' + kendo.attr('container-for') + '="' + column.field + '" class="k-edit-field"></div>';
                            } else {
                                var state = {
                                    storage: {},
                                    count: 0
                                };
                                tmpl = kendo.template(that._cellTmpl(column, state), settings);
                                if (state.count > 0) {
                                    tmpl = proxy(tmpl, state.storage);
                                }
                                html += '<div class="k-edit-field">' + tmpl(model) + '</div>';
                            }
                        } else if (column.command) {
                            tempCommand = getCommand(column.command, 'edit');
                            if (tempCommand) {
                                command = tempCommand;
                            }
                        }
                    }
                }
                if (command) {
                    if (isPlainObject(command)) {
                        if (command.text && isPlainObject(command.text)) {
                            updateText = command.text.update;
                            cancelText = command.text.cancel;
                        }
                        if (command.attr) {
                            attr = command.attr;
                        }
                    }
                }
                var container;
                if (!that._isMobile) {
                    html += '<div class="k-edit-buttons k-state-default">';
                    html += that._createButton({
                        name: 'update',
                        text: updateText,
                        attr: attr
                    }) + that._createButton({
                        name: 'canceledit',
                        text: cancelText,
                        attr: attr
                    });
                    html += '</div></div></div>';
                    container = that._editContainer = $(html).appendTo(that.wrapper).eq(0).kendoWindow(extend({
                        modal: true,
                        resizable: false,
                        draggable: true,
                        title: 'Edit',
                        visible: false,
                        close: function(e) {
                            if (e.userTriggered) {
                                e.sender.element.focus();
                                if (that.trigger('cancel', {
                                        container: container,
                                        model: model
                                    })) {
                                    e.preventDefault();
                                    return;
                                }
                                var currentIndex = that.items().index($(that.current()).parent());
                                that.cancelRow();
                                if (that.options.navigatable) {
                                    that._setCurrent(that.items().eq(currentIndex).children().filter(NAVCELL).first());
                                    focusTable(that.table, true);
                                }
                            }
                        }
                    }, options));
                } else {
                    html += '</div></div>';
                    that.editView = that.pane.append('<div data-' + kendo.ns + 'role="view" data-' + kendo.ns + 'use-native-scrolling="true" data-' + kendo.ns + 'init-widgets="false" class="k-grid-edit-form">' + '<div data-' + kendo.ns + 'role="header" class="k-header">' + that._createButton({
                        name: 'update',
                        text: updateText,
                        attr: attr
                    }) + (options.title || 'Edit') + that._createButton({
                        name: 'canceledit',
                        text: cancelText,
                        attr: attr
                    }) + '</div>' + html + '</div>');
                    container = that._editContainer = that.editView.element.find('.k-popup-edit-form');
                }
                that.editable = that._editContainer.kendoEditable({
                    fields: fields,
                    model: model,
                    clearContainer: false,
                    target: that
                }).data('kendoEditable');
                if (that._isMobile) {
                    container.find('input[type=checkbox],input[type=radio]').parent('.k-edit-field').addClass('k-check').prev('.k-edit-label').addClass('k-check').click(function() {
                        $(this).next().children('input').click();
                    });
                }
                that._openPopUpEditor();
                that.trigger(EDIT, {
                    container: container,
                    model: model
                });
            },
            _openPopUpEditor: function() {
                if (!this._isMobile) {
                    this._editContainer.data('kendoWindow').center().open();
                } else {
                    this.pane.navigate(this.editView, this._editAnimation);
                }
            },
            _createInlineEditor: function(row, model) {
                var that = this,
                    column, cell, command, fields = [];
                if (that.lockedContent) {
                    row = row.add(that._relatedRow(row));
                }
                row.children(':not(.k-group-cell,.k-hierarchy-cell)').each(function() {
                    cell = $(this);
                    column = leafColumns(that.columns)[that.cellIndex(cell)];
                    if (!column.command && column.field && (!model.editable || model.editable(column.field))) {
                        fields.push({
                            field: column.field,
                            format: column.format,
                            editor: column.editor,
                            values: column.values
                        });
                        cell.attr(kendo.attr('container-for'), column.field);
                        cell.empty();
                    } else if (column.command) {
                        command = getCommand(column.command, 'edit');
                        if (command) {
                            cell.empty();
                            var updateText, cancelText, attr;
                            if (isPlainObject(command)) {
                                if (command.text && isPlainObject(command.text)) {
                                    updateText = command.text.update;
                                    cancelText = command.text.cancel;
                                }
                                if (command.attr) {
                                    attr = command.attr;
                                }
                            }
                            $(that._createButton({
                                name: 'update',
                                text: updateText,
                                attr: attr
                            }) + that._createButton({
                                name: 'canceledit',
                                text: cancelText,
                                attr: attr
                            })).appendTo(cell);
                        }
                    }
                });
                that._editContainer = row;
                that.editable = new kendo.ui.Editable(row.addClass('k-grid-edit-row'), {
                    target: that,
                    fields: fields,
                    model: model,
                    clearContainer: false
                });
                if (row.length > 1) {
                    adjustRowHeight(row[0], row[1]);
                    that._applyLockedContainersWidth();
                }
                that.trigger(EDIT, {
                    container: row,
                    model: model
                });
            },
            cancelRow: function(notify) {
                var that = this,
                    container = that._editContainer,
                    model;
                if (container) {
                    model = that._modelForContainer(container);
                    if (notify && that.trigger('cancel', {
                            container: container,
                            model: model
                        })) {
                        return;
                    }
                    that._destroyEditable();
                    that.dataSource.cancelChanges(model);
                    if (that._editMode() !== 'popup') {
                        that._displayRow(container);
                    } else {
                        that._displayRow(that.tbody.find('[' + kendo.attr('uid') + '=' + model.uid + ']'));
                    }
                }
            },
            saveRow: function() {
                var that = this,
                    container = that._editContainer,
                    model = that._modelForContainer(container),
                    editable = that.editable;
                if (container && editable && editable.end() && !that.trigger(SAVE, {
                        container: container,
                        model: model
                    })) {
                    that.dataSource.sync();
                }
            },
            _displayRow: function(row) {
                var that = this,
                    model = that._modelForContainer(row),
                    related, newRow, nextRow, isSelected = row.hasClass('k-state-selected'),
                    isAlt = row.hasClass('k-alt');
                if (model) {
                    if (that.lockedContent) {
                        related = $((isAlt ? that.lockedAltRowTemplate : that.lockedRowTemplate)(model));
                        that._relatedRow(row.last()).replaceWith(related);
                    }
                    that.angular('cleanup', function() {
                        return {
                            elements: row.get()
                        };
                    });
                    newRow = $((isAlt ? that.altRowTemplate : that.rowTemplate)(model));
                    row.replaceWith(newRow);
                    that.trigger('itemChange', {
                        item: newRow,
                        data: model,
                        ns: ui
                    });
                    if (related && related.length) {
                        that.trigger('itemChange', {
                            item: related,
                            data: model,
                            ns: ui
                        });
                    }
                    var angularElements = newRow;
                    var angularData = [{
                        dataItem: model
                    }];
                    if (related && related.length) {
                        angularElements = newRow.add(related);
                        angularData.push({
                            dataItem: model
                        });
                    }
                    that.angular('compile', function() {
                        return {
                            elements: angularElements.get(),
                            data: angularData
                        };
                    });
                    if (isSelected && that.options.selectable) {
                        that.select(newRow.add(related));
                    }
                    if (related) {
                        adjustRowHeight(newRow[0], related[0]);
                    }
                    nextRow = newRow.next();
                    if (nextRow.hasClass('k-detail-row') && nextRow.is(':visible')) {
                        newRow.find('.k-hierarchy-cell .k-icon').removeClass('k-plus').addClass('k-minus');
                    }
                }
            },
            _showMessage: function(messages, row) {
                var that = this;
                if (!that._isMobile) {
                    return window.confirm(messages.title);
                }
                var template = kendo.template('<ul>' + '<li class="km-actionsheet-title">#:title#</li>' + '<li><a href="\\#" class="k-button k-grid-delete">#:confirmDelete#</a></li>' + '</ul>');
                var html = $(template(messages)).appendTo(that.view.element);
                var actionSheet = that._actionSheet = new kendo.mobile.ui.ActionSheet(html, {
                    cancel: messages.cancelDelete,
                    cancelTemplate: '<li class="km-actionsheet-cancel"><a class="k-button" href="\\#">#:cancel#</a></li>',
                    close: function() {
                        this.destroy();
                    },
                    command: function(e) {
                        var item = $(e.currentTarget).parent();
                        if (!item.hasClass('km-actionsheet-cancel')) {
                            that._removeRow(row);
                        }
                    },
                    popup: that._actionSheetPopupOptions
                });
                actionSheet.open(row);
                return false;
            },
            _confirmation: function(row) {
                var that = this,
                    editable = that.options.editable,
                    confirmation = editable === true || typeof editable === STRING ? that.options.messages.editable.confirmation : editable.confirmation;
                if (confirmation !== false && confirmation != null) {
                    if (typeof confirmation === FUNCTION) {
                        confirmation = confirmation(that._modelForContainer(row));
                    }
                    return that._showMessage({
                        confirmDelete: editable.confirmDelete || that.options.messages.editable.confirmDelete,
                        cancelDelete: editable.cancelDelete || that.options.messages.editable.cancelDelete,
                        title: confirmation === true ? that.options.messages.editable.confirmation : confirmation
                    }, row);
                }
                return true;
            },
            cancelChanges: function() {
                this.dataSource.cancelChanges();
            },
            saveChanges: function() {
                var that = this;
                if ((that.editable && that.editable.end() || !that.editable) && !that.trigger(SAVECHANGES)) {
                    that.dataSource.sync();
                }
            },
            addRow: function() {
                var that = this,
                    index, dataSource = that.dataSource,
                    mode = that._editMode(),
                    createAt = that.options.editable.createAt || '',
                    pageSize = dataSource.pageSize(),
                    view = dataSource.view() || [];
                if (that.editable && that.editable.end() || !that.editable) {
                    if (mode != 'incell') {
                        that.cancelRow();
                    }
                    index = dataSource.indexOf(view[0]);
                    if (createAt.toLowerCase() == 'bottom') {
                        index += view.length;
                        if (pageSize && !dataSource.options.serverPaging && pageSize <= view.length) {
                            index -= 1;
                        }
                    }
                    if (index < 0) {
                        if (dataSource.page() > dataSource.totalPages()) {
                            index = (dataSource.page() - 1) * pageSize;
                        } else {
                            index = 0;
                        }
                    }
                    var model = dataSource.insert(index, {}),
                        id = model.uid,
                        table = that.lockedContent ? that.lockedTable : that.table,
                        row = table.find('tr[' + kendo.attr('uid') + '=' + id + ']'),
                        cell = row.children('td:not(.k-group-cell,.k-hierarchy-cell)').eq(that._firstEditableColumnIndex(row));
                    if (mode === 'inline' && row.length) {
                        that.editRow(row);
                    } else if (mode === 'popup') {
                        that.editRow(model);
                    } else if (cell.length) {
                        that.editCell(cell);
                    }
                    if (createAt.toLowerCase() == 'bottom' && that.lockedContent) {
                        that.lockedContent[0].scrollTop = that.content[0].scrollTop = that.table[0].offsetHeight;
                    }
                }
            },
            _firstEditableColumnIndex: function(container) {
                var that = this,
                    column, columns = leafColumns(that.columns),
                    idx, length, model = that._modelForContainer(container);
                for (idx = 0, length = columns.length; idx < length; idx++) {
                    column = columns[idx];
                    if (model && (!model.editable || model.editable(column.field)) && !column.command && column.field && column.hidden !== true) {
                        return idx;
                    }
                }
                return -1;
            },
            _toolbar: function() {
                var that = this,
                    wrapper = that.wrapper,
                    toolbar = that.options.toolbar,
                    editable = that.options.editable,
                    container;
                if (toolbar) {
                    container = that.wrapper.find('.k-grid-toolbar');
                    if (!container.length) {
                        if (!isFunction(toolbar)) {
                            toolbar = typeof toolbar === STRING ? toolbar : that._toolbarTmpl(toolbar).replace(templateHashRegExp, '\\#');
                            toolbar = proxy(kendo.template(toolbar), that);
                        }
                        container = $('<div class="k-header k-grid-toolbar" />').html(toolbar({})).prependTo(wrapper);
                        that.angular('compile', function() {
                            return {
                                elements: container.get()
                            };
                        });
                    }
                    if (editable && editable.create !== false) {
                        container.on(CLICK + NS, '.k-grid-add', function(e) {
                            e.preventDefault();
                            that.addRow();
                        }).on(CLICK + NS, '.k-grid-cancel-changes', function(e) {
                            e.preventDefault();
                            that.cancelChanges();
                        }).on(CLICK + NS, '.k-grid-save-changes', function(e) {
                            e.preventDefault();
                            that.saveChanges();
                        });
                    }
                    container.on(CLICK + NS, '.k-grid-excel', function(e) {
                        e.preventDefault();
                        that.saveAsExcel();
                    });
                    container.on(CLICK + NS, '.k-grid-pdf', function(e) {
                        e.preventDefault();
                        that.saveAsPDF();
                    });
                }
            },
            _toolbarTmpl: function(commands) {
                var that = this,
                    idx, length, html = '';
                if (isArray(commands)) {
                    for (idx = 0, length = commands.length; idx < length; idx++) {
                        html += that._createButton(commands[idx]);
                    }
                }
                return html;
            },
            _createButton: function(command) {
                var template = command.template || COMMANDBUTTONTMPL,
                    commandName = typeof command === STRING ? command : command.name || command.text,
                    className = defaultCommands[commandName] ? defaultCommands[commandName].className : 'k-grid-' + (commandName || '').replace(/\s/g, ''),
                    options = {
                        className: className,
                        text: commandName,
                        imageClass: '',
                        attr: '',
                        iconClass: ''
                    },
                    messages = this.options.messages.commands,
                    attributeClassMatch;
                if (!commandName && !(isPlainObject(command) && command.template)) {
                    throw new Error('Custom commands should have name specified');
                }
                if (isPlainObject(command)) {
                    command = extend(true, {}, command);
                    if (command.className && inArray(options.className, command.className.split(' ')) < 0) {
                        command.className += ' ' + options.className;
                    } else if (command.className === undefined) {
                        command.className = options.className;
                    }
                    if (commandName === 'edit' && isPlainObject(command.text)) {
                        command = extend(true, {}, command);
                        command.text = command.text.edit;
                    }
                    if (command.attr) {
                        if (isPlainObject(command.attr)) {
                            command.attr = stringifyAttributes(command.attr);
                        }
                        if (typeof command.attr === STRING) {
                            attributeClassMatch = command.attr.match(/class="(.+?)"/);
                            if (attributeClassMatch && inArray(attributeClassMatch[1], command.className.split(' ')) < 0) {
                                command.className += ' ' + attributeClassMatch[1];
                            }
                        }
                    }
                    options = extend(true, options, defaultCommands[commandName], {
                        text: messages[commandName]
                    }, command);
                } else {
                    options = extend(true, options, defaultCommands[commandName], {
                        text: messages[commandName]
                    });
                }
                return kendo.template(template)(options);
            },
            _hasFooters: function() {
                return !!this.footerTemplate || !!this.groupFooterTemplate || this.footer && this.footer.length > 0 || this.wrapper.find('.k-grid-footer').length > 0;
            },
            _groupable: function() {
                var that = this;
                if (that._groupableClickHandler) {
                    that.table.add(that.lockedTable).off(CLICK + NS, that._groupableClickHandler);
                } else {
                    that._groupableClickHandler = function(e) {
                        var element = $(this),
                            group = element.closest('tr');
                        if (element.hasClass('k-i-collapse')) {
                            that.collapseGroup(group);
                        } else {
                            that.expandGroup(group);
                        }
                        e.preventDefault();
                        e.stopPropagation();
                    };
                }
                if (that._isLocked()) {
                    that.lockedTable.on(CLICK + NS, '.k-grouping-row .k-i-collapse, .k-grouping-row .k-i-expand', that._groupableClickHandler);
                } else {
                    that.table.on(CLICK + NS, '.k-grouping-row .k-i-collapse, .k-grouping-row .k-i-expand', that._groupableClickHandler);
                }
                that._attachGroupable();
            },
            _attachGroupable: function() {
                var that = this,
                    wrapper = that.wrapper,
                    groupable = that.options.groupable,
                    draggables = HEADERCELLS + '[' + kendo.attr('field') + ']',
                    filter = that.content ? '.k-grid-header:first ' + draggables : 'table:first>.k-grid-header ' + draggables;
                if (groupable && groupable.enabled !== false) {
                    if (!wrapper.has('div.k-grouping-header')[0]) {
                        $('<div>&nbsp;</div>').addClass('k-grouping-header').prependTo(wrapper);
                    }
                    if (that.groupable) {
                        that.groupable.destroy();
                    }
                    that.groupable = new ui.Groupable(wrapper, extend({}, groupable, {
                        draggable: that._draggableInstance,
                        groupContainer: '>div.k-grouping-header',
                        dataSource: that.dataSource,
                        draggableElements: filter,
                        filter: filter,
                        allowDrag: that.options.reorderable
                    }));
                }
            },
            _continuousItems: function(filter, cell) {
                if (!this.lockedContent) {
                    return;
                }
                var that = this;
                var elements = that.table.add(that.lockedTable);
                var lockedItems = $(filter, elements[0]);
                var nonLockedItems = $(filter, elements[1]);
                var columns = cell ? lockedColumns(that.columns).length : 1;
                var nonLockedColumns = cell ? that.columns.length - columns : 1;
                var result = [];
                for (var idx = 0; idx < lockedItems.length; idx += columns) {
                    push.apply(result, lockedItems.slice(idx, idx + columns));
                    push.apply(result, nonLockedItems.splice(0, nonLockedColumns));
                }
                return result;
            },
            _selectable: function() {
                var that = this,
                    multi, cell, notString = [],
                    isLocked = that._isLocked(),
                    selectable = that.options.selectable;
                if (selectable) {
                    if (that.selectable) {
                        that.selectable.destroy();
                    }
                    selectable = kendo.ui.Selectable.parseOptions(selectable);
                    multi = selectable.multiple;
                    cell = selectable.cell;
                    if (that._hasDetails()) {
                        notString[notString.length] = '.k-detail-row';
                    }
                    if (that.options.groupable || that._hasFooters()) {
                        notString[notString.length] = '.k-grouping-row,.k-group-footer';
                    }
                    notString = notString.join(',');
                    if (notString !== '') {
                        notString = ':not(' + notString + ')';
                    }
                    var elements = that.table;
                    if (isLocked) {
                        elements = elements.add(that.lockedTable);
                    }
                    var filter = '>' + (cell ? SELECTION_CELL_SELECTOR : 'tbody>tr' + notString);
                    that.selectable = new kendo.ui.Selectable(elements, {
                        filter: filter,
                        aria: true,
                        multiple: multi,
                        change: function() {
                            that.trigger(CHANGE);
                            try {
                                if (that.select === undefined) return;
                                var tr = that.select().closest("tr");
                                var dataItem = that.dataItem(tr);
                                that.$angular_scope[that.element.attr("k-ng-model")] = dataItem;
                                if (that.$angular_scope.$root.$$phase != '$apply' && that.$angular_scope.$root.$$phase != '$digest') {
                                    that.$angular_scope.$apply();
                                }
                            } catch (e) {

                            }

                        },
                        useAllItems: isLocked && multi && cell,
                        relatedTarget: function(items) {
                            if (cell || !isLocked) {
                                return;
                            }
                            var related;
                            var result = $();
                            for (var idx = 0, length = items.length; idx < length; idx++) {
                                related = that._relatedRow(items[idx]);
                                if (inArray(related[0], items) < 0) {
                                    result = result.add(related);
                                }
                            }
                            return result;
                        },
                        continuousItems: function() {
                            return that._continuousItems(filter, cell);
                        }
                    });
                    if (that.options.navigatable) {
                        elements.on('keydown' + NS, function(e) {
                            var current = that.current();
                            var target = e.target;
                            if (e.keyCode === keys.SPACEBAR && $.inArray(target, elements) > -1 && !current.is('.k-edit-cell,.k-header') && current.parent().is(':not(.k-grouping-row,.k-detail-row,.k-group-footer)')) {
                                e.preventDefault();
                                e.stopPropagation();
                                current = cell ? current : current.parent();
                                if (isLocked && !cell) {
                                    current = current.add(that._relatedRow(current));
                                }
                                if (multi) {
                                    if (!e.ctrlKey) {
                                        that.selectable.clear();
                                    } else {
                                        if (current.hasClass(SELECTED)) {
                                            current.removeClass(SELECTED);
                                            that.trigger(CHANGE);
                                            return;
                                        }
                                    }
                                } else {
                                    that.selectable.clear();
                                }
                                that.selectable.value(current);
                            }
                        });
                    }
                }
            },
            _clipboard: function() {
                var options = this.options;
                var selectable = options.selectable;
                if (selectable && options.allowCopy) {
                    var grid = this;
                    if (!options.navigatable) {
                        grid.table.add(grid.lockedTable).attr('tabindex', 0).on('mousedown' + NS + ' keydown' + NS, '.k-detail-cell', function(e) {
                            if (e.target !== e.currentTarget) {
                                e.stopImmediatePropagation();
                            }
                        }).on('mousedown' + NS, NAVROW + '>' + NAVCELL, proxy(tableClick, grid));
                    }
                    grid.copyHandler = proxy(grid.copySelection, grid);
                    grid.updateClipBoardState = function() {
                        if (grid.areaClipBoard) {
                            grid.areaClipBoard.val(grid.getTSV()).focus().select();
                        }
                    };
                    grid.bind('change', grid.updateClipBoardState);
                    grid.wrapper.on('keydown', grid.copyHandler);
                    grid.clearAreaHandler = proxy(grid.clearArea, grid);
                    grid.wrapper.on('keyup', grid.clearAreaHandler);
                }
            },
            copySelection: function(e) {
                if (e instanceof jQuery.Event && !(e.ctrlKey || e.metaKey) || $(e.target).is('input:visible,textarea:visible') || window.getSelection && window.getSelection().toString() || document.selection && document.selection.createRange().text) {
                    return;
                }
                if (!this.areaClipBoard) {
                    this.areaClipBoard = $('<textarea />').css({
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        opacity: 0,
                        width: 0,
                        height: 0
                    }).appendTo(this.wrapper);
                }
                this.areaClipBoard.val(this.getTSV()).focus().select();
            },
            getTSV: function() {
                var grid = this;
                var selected = grid.select();
                var delimeter = '\t';
                var allowCopy = grid.options.allowCopy;
                var onlyVisible = true;
                if ($.isPlainObject(allowCopy) && allowCopy.delimeter) {
                    delimeter = allowCopy.delimeter;
                }
                var text = '';
                if (selected.length) {
                    if (selected.eq(0).is('tr')) {
                        selected = selected.find('td:not(.k-group-cell)');
                    }
                    if (onlyVisible) {
                        selected.filter(':visible');
                    }
                    var result = [];
                    var cellsOffset = this.columns.length;
                    var lockedCols = grid._isLocked() && lockedColumns(grid.columns).length;
                    var inLockedArea = true;
                    $.each(selected, function(idx, cell) {
                        cell = $(cell);
                        var tr = cell.closest('tr');
                        var rowIndex = tr.index();
                        var cellIndex = cell.index();
                        if (onlyVisible) {
                            cellIndex -= cell.prevAll(':hidden').length;
                        }
                        if (lockedCols && inLockedArea) {
                            inLockedArea = $.contains(grid.lockedTable[0], cell[0]);
                        }
                        if (grid._groups() && inLockedArea) {
                            cellIndex -= grid._groups();
                        }
                        cellIndex = inLockedArea ? cellIndex : cellIndex + lockedCols;
                        if (cellsOffset > cellIndex) {
                            cellsOffset = cellIndex;
                        }
                        var cellText = cell.text();
                        if (!result[rowIndex]) {
                            result[rowIndex] = [];
                        }
                        result[rowIndex][cellIndex] = cellText;
                    });
                    var rowsOffset = result.length;
                    result = $.each(result, function(idx, val) {
                        if (val) {
                            result[idx] = val.slice(cellsOffset);
                            if (rowsOffset > idx) {
                                rowsOffset = idx;
                            }
                        }
                    });
                    $.each(result.slice(rowsOffset), function(idx, val) {
                        if (val) {
                            text += val.join(delimeter) + '\r\n';
                        } else {
                            text += '\r\n';
                        }
                    });
                }
                return text;
            },
            clearArea: function(e) {
                var table;
                if (this.areaClipBoard && e && e.target === this.areaClipBoard[0]) {
                    if (this.options.navigatable) {
                        table = $(this.current()).closest('table');
                    } else {
                        table = this.table;
                    }
                    focusTable(table, true);
                }
                if (this.areaClipBoard) {
                    this.areaClipBoard.remove();
                    this.areaClipBoard = null;
                }
            },
            _minScreenSupport: function() {
                var any = this.hideMinScreenCols();
                if (any) {
                    this.minScreenResizeHandler = proxy(this.hideMinScreenCols, this);
                    $(window).on('resize', this.minScreenResizeHandler);
                }
            },
            hideMinScreenCols: function() {
                var cols = this.columns,
                    screenWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
                return this._iterateMinScreenCols(cols, screenWidth);
            },
            _iterateMinScreenCols: function(cols, screenWidth) {
                var any = false;
                for (var i = 0; i < cols.length; i++) {
                    var col = cols[i];
                    var minWidth = col.minScreenWidth;
                    if (minWidth !== undefined && minWidth !== null) {
                        any = true;
                        if (minWidth > screenWidth) {
                            this.hideColumn(col);
                        } else {
                            this.showColumn(col);
                        }
                    }
                    if (!col.hidden && col.columns) {
                        any = this._iterateMinScreenCols(col.columns, screenWidth) || any;
                    }
                }
                return any;
            },
            _relatedRow: function(row) {
                var lockedTable = this.lockedTable;
                row = $(row);
                if (!lockedTable) {
                    return row;
                }
                var table = row.closest(this.table.add(this.lockedTable));
                var index = table.find('>tbody>tr').index(row);
                table = table[0] === this.table[0] ? lockedTable : this.table;
                return table.find('>tbody>tr').eq(index);
            },
            clearSelection: function() {
                var that = this;
                that.selectable.clear();
                that.trigger(CHANGE);
            },
            select: function(items) {
                var that = this,
                    selectable = that.selectable;
                items = that.table.add(that.lockedTable).find(items);
                if (items.length) {
                    if (!selectable.options.multiple) {
                        selectable.clear();
                        items = items.first();
                    }
                    if (that._isLocked()) {
                        items = items.add(items.map(function() {
                            return that._relatedRow(this);
                        }));
                    }
                    selectable.value(items);
                    return;
                }
                return selectable.value();
            },
            _updateCurrentAttr: function(current, next) {
                var headerId = $(current).data('headerId');
                $(current).removeClass(FOCUSED).removeAttr('aria-describedby').closest('table').removeAttr('aria-activedescendant');
                if (headerId) {
                    headerId = headerId.replace(this._cellId, '');
                    $(current).attr('id', headerId);
                } else {
                    $(current).removeAttr('id');
                }
                next.data('headerId', next.attr('id')).attr('id', this._cellId).addClass(FOCUSED).closest('table').attr('aria-activedescendant', this._cellId);
                if (!next.closest('tr').hasClass('k-grouping-row') && !next.hasClass('k-header')) {
                    var column = this.columns[this.cellIndex(next)];
                    if (column) {
                        headerId = column.headerAttributes.id;
                    }
                    next.attr('aria-describedby', headerId + ' ' + this._cellId);
                } else {
                    next.attr('aria-describedby', this._cellId);
                }
                this._current = next;
            },
            _scrollCurrent: function() {
                var current = this._current;
                var scrollable = this.options.scrollable;
                if (!current || !scrollable) {
                    return;
                }
                var row = current.parent();
                var tableContainer = row.closest('table').parent();
                var isInLockedContainer = tableContainer.is('.k-grid-content-locked,.k-grid-header-locked');
                var isInContent = tableContainer.is('.k-grid-content-locked,.k-grid-content,.k-virtual-scrollable-wrap');
                var scrollableContainer = $(this.content).find('>.k-virtual-scrollable-wrap').andSelf().last()[0];
                if (isInContent) {
                    if (scrollable.virtual) {
                        var rowIndex = Math.max(inArray(row[0], this._items(row.parent())), 0);
                        this._rowVirtualIndex = this.virtualScrollable.itemIndex(rowIndex);
                        this.virtualScrollable.scrollIntoView(row);
                    } else {
                        this._scrollTo(this._relatedRow(row)[0], scrollableContainer);
                    }
                }
                if (this.lockedContent) {
                    this.lockedContent[0].scrollTop = scrollableContainer.scrollTop;
                }
                if (!isInLockedContainer) {
                    this._scrollTo(current[0], scrollableContainer);
                }
            },
            current: function(next) {
                return this._setCurrent(next, true);
            },
            _setCurrent: function(next, preventTrigger) {
                var current = this._current;
                next = $(next);
                if (next.length) {
                    if (!current || current[0] !== next[0]) {
                        this._updateCurrentAttr(current, next);
                        this._scrollCurrent();
                        if (!preventTrigger) {
                            this.trigger(NAVIGATE, {
                                element: next
                            });
                        }
                    }
                }
                return this._current;
            },
            _removeCurrent: function() {
                if (this._current) {
                    this._current.removeClass(FOCUSED);
                    this._current = null;
                }
            },
            _scrollTo: function(element, container) {
                var elementToLowercase = element.tagName.toLowerCase();
                var isHorizontal = elementToLowercase === 'td' || elementToLowercase === 'th';
                var elementOffset = element[isHorizontal ? 'offsetLeft' : 'offsetTop'];
                var elementOffsetDir = element[isHorizontal ? 'offsetWidth' : 'offsetHeight'];
                var containerScroll = container[isHorizontal ? 'scrollLeft' : 'scrollTop'];
                var containerOffsetDir = container[isHorizontal ? 'clientWidth' : 'clientHeight'];
                var bottomDistance = elementOffset + elementOffsetDir;
                var result = 0;
                var ieCorrection = 0;
                var firefoxCorrection = 0;
                if (isRtl && isHorizontal) {
                    var table = $(element).closest('table')[0];
                    if (browser.msie) {
                        ieCorrection = table.offsetLeft;
                    } else if (browser.mozilla) {
                        firefoxCorrection = table.offsetLeft - kendo.support.scrollbar();
                    }
                }
                containerScroll = Math.abs(containerScroll + ieCorrection - firefoxCorrection);
                if (containerScroll > elementOffset) {
                    result = elementOffset;
                } else if (bottomDistance > containerScroll + containerOffsetDir) {
                    if (elementOffsetDir <= containerOffsetDir) {
                        result = bottomDistance - containerOffsetDir;
                    } else {
                        result = elementOffset;
                    }
                } else {
                    result = containerScroll;
                }
                result = Math.abs(result + ieCorrection) + firefoxCorrection;
                container[isHorizontal ? 'scrollLeft' : 'scrollTop'] = result;
            },
            _navigatable: function() {
                var that = this;
                if (!that.options.navigatable) {
                    return;
                }
                var dataTables = that.table.add(that.lockedTable);
                var headerTables = that.thead.parent().add($('>table', that.lockedHeader));
                var tables = dataTables;
                if (that.options.scrollable) {
                    tables = tables.add(headerTables);
                    headerTables.attr(TABINDEX, -1);
                }
                this._navigatableTables = tables;
                tables.off('mousedown' + NS + ' focus' + NS + ' focusout' + NS + ' keydown' + NS);
                headerTables.on('keydown' + NS, proxy(that._openHeaderMenu, that)).find('a.k-link').attr('tabIndex', -1);
                dataTables.attr(TABINDEX, math.max(dataTables.attr(TABINDEX) || 0, 0)).on('mousedown' + NS + ' keydown' + NS, '.k-detail-cell', function(e) {
                    if (e.target !== e.currentTarget) {
                        e.stopImmediatePropagation();
                    }
                });
                tables.on(kendo.support.touch ? 'touchstart' + NS : 'mousedown' + NS, NAVROW + '>' + NAVCELL, proxy(tableClick, that)).on('focus' + NS, proxy(that._tableFocus, that)).on('focusout' + NS, proxy(that._tableBlur, that)).on('keydown' + NS, proxy(that._tableKeyDown, that));
            },
            _openHeaderMenu: function(e) {
                if (e.altKey && e.keyCode == keys.DOWN) {
                    this.current().find('.k-grid-filter, .k-header-column-menu').click();
                    e.stopImmediatePropagation();
                }
            },
            _setTabIndex: function(table) {
                this._navigatableTables.attr(TABINDEX, -1);
                table.attr(TABINDEX, 0);
            },
            _tableFocus: function(e) {
                if (kendo.support.touch) {
                    return;
                }
                var current = this.current();
                var table = $(e.currentTarget);
                if (current && current.is(':visible')) {
                    current.addClass(FOCUSED);
                } else {
                    this._setCurrent(table.find(FIRSTNAVITEM));
                }
                this._setTabIndex(table);
            },
            _tableBlur: function() {
                var current = this.current();
                if (current) {
                    current.removeClass(FOCUSED);
                }
            },
            _tableKeyDown: function(e) {
                var current = this.current();
                var requestInProgress = this.virtualScrollable && this.virtualScrollable.fetching();
                var target = $(e.target);
                var canHandle = !e.isDefaultPrevented() && !target.is(':button,a,:input,a>.k-icon');
                if (requestInProgress) {
                    e.preventDefault();
                    return;
                }
                current = current ? current : $(this.lockedTable).add(this.table).find(FIRSTNAVITEM);
                if (!current.length) {
                    return;
                }
                var handled = false;
                if (canHandle && e.keyCode == keys.UP) {
                    handled = this._moveUp(current);
                }
                if (canHandle && e.keyCode == keys.DOWN) {
                    handled = this._moveDown(current);
                }
                if (canHandle && e.keyCode == (isRtl ? keys.LEFT : keys.RIGHT)) {
                    handled = this._moveRight(current, e.altKey);
                }
                if (canHandle && e.keyCode == (isRtl ? keys.RIGHT : keys.LEFT)) {
                    handled = this._moveLeft(current, e.altKey);
                }
                if (canHandle && e.keyCode == keys.PAGEDOWN) {
                    handled = this._handlePageDown();
                }
                if (canHandle && e.keyCode == keys.PAGEUP) {
                    handled = this._handlePageUp();
                }
                if (e.keyCode == keys.ENTER || e.keyCode == keys.F2) {
                    handled = this._handleEnterKey(current, e.currentTarget, target);
                }
                if (e.keyCode == keys.ESC) {
                    handled = this._handleEscKey(current, e.currentTarget);
                }
                if (e.keyCode == keys.TAB) {
                    handled = this._handleTabKey(current, e.currentTarget, e.shiftKey);
                }
                if (handled) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            },
            _moveLeft: function(current, altKey) {
                var next, index;
                var row = current.parent();
                var container = row.parent();
                if (altKey) {
                    this.collapseRow(row);
                } else {
                    index = container.find(NAVROW).index(row);
                    next = this._prevHorizontalCell(container, current, index);
                    if (!next[0]) {
                        container = this._horizontalContainer(container);
                        next = this._prevHorizontalCell(container, current, index);
                        if (next[0] !== current[0]) {
                            focusTable(container.parent(), true);
                        }
                    }
                    this._setCurrent(next);
                }
                return true;
            },
            _moveRight: function(current, altKey) {
                var next, index;
                var row = current.parent();
                var container = row.parent();
                if (altKey) {
                    this.expandRow(row);
                } else {
                    index = container.find(NAVROW).index(row);
                    next = this._nextHorizontalCell(container, current, index);
                    if (!next[0]) {
                        container = this._horizontalContainer(container, true);
                        next = this._nextHorizontalCell(container, current, index);
                        if (next[0] !== current[0]) {
                            focusTable(container.parent(), true);
                        }
                    }
                    this._setCurrent(next);
                }
                return true;
            },
            _moveUp: function(current) {
                var container = current.parent().parent();
                var next = this._prevVerticalCell(container, current);
                if (!next[0]) {
                    container = this._verticalContainer(container, true);
                    next = this._prevVerticalCell(container, current);
                    if (next[0]) {
                        focusTable(container.parent(), true);
                    }
                }
                this._setCurrent(next);
                return true;
            },
            _moveDown: function(current) {
                var container = current.parent().parent();
                var next = this._nextVerticalCell(container, current);
                if (!next[0]) {
                    container = this._verticalContainer(container);
                    next = this._nextVerticalCell(container, current);
                    if (next[0]) {
                        focusTable(container.parent(), true);
                    }
                }
                this._setCurrent(next);
                return true;
            },
            _handlePageDown: function() {
                if (!this.options.pageable) {
                    return false;
                }
                this.dataSource.page(this.dataSource.page() + 1);
                return true;
            },
            _handlePageUp: function() {
                if (!this.options.pageable) {
                    return false;
                }
                this.dataSource.page(this.dataSource.page() - 1);
                return true;
            },
            _handleTabKey: function(current, currentTable, shiftKey) {
                var isInCell = this.options.editable && this._editMode() == 'incell';
                var cell;
                if (!isInCell || current.is('th')) {
                    return false;
                }
                cell = $(activeElement()).closest('.k-edit-cell');
                if (cell[0] && cell[0] !== current[0]) {
                    current = cell;
                }
                cell = this._tabNext(current, currentTable, shiftKey);
                if (cell.length) {
                    this._handleEditing(current, cell, cell.closest('table'));
                    return true;
                }
                return false;
            },
            _handleEscKey: function(current, currentTable) {
                var active = activeElement();
                var isInCell = this._editMode() == 'incell';
                if (!isInEdit(current)) {
                    if (current.has(active).length) {
                        focusTable(currentTable, true);
                        return true;
                    }
                    return false;
                }
                if (isInCell) {
                    this.closeCell(true);
                } else {
                    var currentIndex = $(current).parent().index();
                    if (active) {
                        active.blur();
                    }
                    this.cancelRow(true);
                    if (currentIndex >= 0) {
                        this._setCurrent(this.items().eq(currentIndex).children(NAVCELL).first());
                    }
                }
                if (browser.msie && browser.version < 9) {
                    document.body.focus();
                }
                focusTable(currentTable, true);
                return true;
            },
            _toggleCurrent: function(current, editable) {
                var row = current.parent();
                if (row.is('.k-grouping-row')) {
                    row.find('.k-icon:first').click();
                    return true;
                }
                if (!editable && row.is('.k-master-row')) {
                    row.find('.k-icon:first').click();
                    return true;
                }
                return false;
            },
            _handleEnterKey: function(current, currentTable, target) {
                var editable = this.options.editable;
                var container = target.closest('[role=gridcell]');
                if (!target.is('table') && !$.contains(current[0], target[0])) {
                    current = container;
                }
                if (current.is('th')) {
                    current.find('.k-link').click();
                    return true;
                }
                if (this._toggleCurrent(current, editable)) {
                    return true;
                }
                var focusable = current.find(':kendoFocusable:first');
                if (focusable[0] && !current.hasClass('k-edit-cell') && current.hasClass('k-state-focused')) {
                    focusable.focus();
                    return true;
                }
                if (editable && !target.is(':button,.k-button,textarea')) {
                    if (!container[0]) {
                        container = current;
                    }
                    this._handleEditing(container, false, currentTable);
                    return true;
                }
                return false;
            },
            _nextHorizontalCell: function(table, current, originalIndex) {
                var cells = current.nextAll(DATA_CELL);
                if (!cells.length) {
                    var rows = table.find(NAVROW);
                    var rowIndex = rows.index(current.parent());
                    if (rowIndex == -1) {
                        if (current.hasClass('k-header')) {
                            var headerRows = [];
                            mapColumnToCellRows([lockedColumns(this.columns)[0]], childColumnsCells(rows.eq(0).children().first()), headerRows, 0, 0);
                            if (headerRows[originalIndex]) {
                                return headerRows[originalIndex][0];
                            }
                            return current;
                        }
                        if (current.parent().hasClass('k-filter-row')) {
                            return rows.last().children(DATA_CELL).first();
                        }
                        return rows.eq(originalIndex).children(DATA_CELL).first();
                    }
                }
                return cells.first();
            },
            _prevHorizontalCell: function(table, current, originalIndex) {
                var cells = current.prevAll(DATA_CELL);
                if (!cells.length) {
                    var rows = table.find(NAVROW);
                    var rowIndex = rows.index(current.parent());
                    if (rowIndex == -1) {
                        if (current.hasClass('k-header')) {
                            var headerRows = [];
                            var columns = lockedColumns(this.columns);
                            mapColumnToCellRows([columns[columns.length - 1]], childColumnsCells(rows.eq(0).children().last()), headerRows, 0, 0);
                            if (headerRows[originalIndex]) {
                                return headerRows[originalIndex][0];
                            }
                            return current;
                        }
                        if (current.parent().hasClass('k-filter-row')) {
                            return rows.last().children(DATA_CELL).last();
                        }
                        return rows.eq(originalIndex).children(DATA_CELL).last();
                    }
                }
                return cells.first();
            },
            _currentDataIndex: function(table, current) {
                var index = current.attr('data-index');
                if (!index) {
                    return undefined;
                }
                var lockedColumnsCount = lockedColumns(this.columns).length;
                if (lockedColumnsCount && !table.closest('div').hasClass('k-grid-content-locked')[0]) {
                    return index - lockedColumnsCount;
                }
                return index;
            },
            _prevVerticalCell: function(container, current) {
                var cells;
                var row = current.parent();
                var rows = container.children(NAVROW);
                var rowIndex = rows.index(row);
                var index = this._currentDataIndex(container, current);
                if (index || current.hasClass('k-header')) {
                    cells = parentColumnsCells(current);
                    return cells.eq(cells.length - 2);
                }
                index = row.children(DATA_CELL).index(current);
                if (row.hasClass('k-filter-row')) {
                    return leafDataCells(container).eq(index);
                }
                if (rowIndex == -1) {
                    row = container.find('.k-filter-row');
                    if (!row[0]) {
                        return leafDataCells(container).eq(index);
                    }
                } else {
                    row = rowIndex === 0 ? $() : rows.eq(rowIndex - 1);
                }
                cells = row.children(DATA_CELL);
                if (cells.length > index) {
                    return cells.eq(index);
                }
                return cells.eq(0);
            },
            _nextVerticalCell: function(container, current) {
                var cells;
                var row = current.parent();
                var rows = container.children(NAVROW);
                var rowIndex = rows.index(row);
                var index = this._currentDataIndex(container, current);
                if (rowIndex != -1 && index === undefined && current.hasClass('k-header')) {
                    return childColumnsCells(current).eq(1);
                }
                index = index ? parseInt(index, 10) : row.children(DATA_CELL).index(current);
                if (rowIndex == -1) {
                    row = rows.eq(0);
                } else {
                    row = rows.eq(rowIndex + current[0].rowSpan);
                }
                cells = row.children(DATA_CELL);
                if (cells.length > index) {
                    return cells.eq(index);
                }
                return cells.eq(0);
            },
            _verticalContainer: function(container, up) {
                var table = container.parent();
                var length = this._navigatableTables.length;
                var step = Math.floor(length / 2);
                var index = inArray(table[0], this._navigatableTables);
                if (up) {
                    step *= -1;
                }
                index += step;
                if (index >= 0 || index < length) {
                    table = this._navigatableTables.eq(index);
                }
                return table.find(up ? 'thead' : 'tbody');
            },
            _horizontalContainer: function(container, right) {
                var length = this._navigatableTables.length;
                if (length <= 2) {
                    return container;
                }
                var table = container.parent();
                var index = inArray(table[0], this._navigatableTables);
                index += right ? 1 : -1;
                if (right && (index == 2 || index == length)) {
                    return container;
                }
                if (!right && (index == 1 || index < 0)) {
                    return container;
                }
                return this._navigatableTables.eq(index).find('thead, tbody');
            },
            _tabNext: function(current, currentTable, back) {
                var switchRow = true;
                var next = back ? current.prevAll(DATA_CELL + ':first') : current.nextAll(':visible:first');
                if (!next.length) {
                    next = current.parent();
                    if (this.lockedTable) {
                        switchRow = back && currentTable == this.lockedTable[0] || !back && currentTable == this.table[0];
                        next = this._relatedRow(next);
                    }
                    if (switchRow) {
                        next = next[back ? 'prevAll' : 'nextAll']('tr:not(.k-grouping-row):not(.k-detail-row):visible:first');
                    }
                    next = next.children(DATA_CELL + (back ? ':last' : ':first'));
                }
                return next;
            },
            _handleEditing: function(current, next, table) {
                var that = this,
                    active = $(activeElement()),
                    mode = that._editMode(),
                    isIE = browser.msie,
                    oldIE = isIE && browser.version < 9,
                    editContainer = that._editContainer,
                    focusable, isEdited;
                table = $(table);
                if (mode == 'incell') {
                    isEdited = current.hasClass('k-edit-cell');
                } else {
                    isEdited = current.parent().hasClass('k-grid-edit-row');
                }
                if (that.editable) {
                    if ($.contains(editContainer[0], active[0])) {
                        if (browser.opera || oldIE) {
                            active.blur().change().triggerHandler('blur');
                        } else {
                            active.blur();
                            if (isIE) {
                                active.blur();
                            }
                        }
                    }
                    if (!that.editable) {
                        focusTable(table);
                        return;
                    }
                    if (that.editable.end()) {
                        if (mode == 'incell') {
                            that.closeCell();
                        } else {
                            that.saveRow();
                            isEdited = true;
                        }
                    } else {
                        if (mode == 'incell') {
                            that._setCurrent(editContainer);
                        } else {
                            that._setCurrent(editContainer.children().filter(DATA_CELL).first());
                        }
                        focusable = editContainer.find(':kendoFocusable:first')[0];
                        if (focusable) {
                            focusable.focus();
                        }
                        return;
                    }
                }
                if (next) {
                    that._setCurrent(next);
                }
                if (oldIE) {
                    document.body.focus();
                }
                focusTable(table, true);
                if (!isEdited && !next || next) {
                    if (mode == 'incell') {
                        that.editCell(that.current());
                    } else {
                        that.editRow(that.current().parent());
                    }
                }
            },
            _wrapper: function() {
                var that = this,
                    table = that.table,
                    height = that.options.height,
                    wrapper = that.element;
                if (!wrapper.is('div')) {
                    wrapper = wrapper.wrap('<div/>').parent();
                }
                that.wrapper = wrapper.addClass('k-grid k-widget');
                if (height) {
                    that.wrapper.css(HEIGHT, height);
                    table.css(HEIGHT, 'auto');
                }
                that._initMobile();
            },
            _initMobile: function() {
                var options = this.options;
                var that = this;
                this._isMobile = options.mobile === true && kendo.support.mobileOS || options.mobile === 'phone' || options.mobile === 'tablet';
                if (this._isMobile) {
                    var html = this.wrapper.addClass('k-grid-mobile').wrap('<div data-' + kendo.ns + 'stretch="true" data-' + kendo.ns + 'role="view" ' + 'data-' + kendo.ns + 'init-widgets="false"></div>').parent();
                    this.pane = kendo.mobile.ui.Pane.wrap(html);
                    this.view = this.pane.view();
                    this._actionSheetPopupOptions = $(document.documentElement).hasClass('km-root') ? {
                        modal: false
                    } : {
                        align: 'bottom center',
                        position: 'bottom center',
                        effect: 'slideIn:up'
                    };
                    if (options.height) {
                        this.pane.element.parent().css(HEIGHT, options.height);
                    }
                    this._editAnimation = 'slide';
                    this.view.bind('show', function() {
                        if (that._isLocked()) {
                            that._updateTablesWidth();
                            that._applyLockedContainersWidth();
                            that._syncLockedContentHeight();
                            that._syncLockedHeaderHeight();
                            that._syncLockedFooterHeight();
                        }
                    });
                }
            },
            _tbody: function() {
                var that = this,
                    table = that.table,
                    tbody;
                tbody = table.find('>tbody');
                if (!tbody.length) {
                    tbody = $('<tbody/>').appendTo(table);
                }
                that.tbody = tbody.attr('role', 'rowgroup');
            },
            _scrollable: function() {
                var that = this,
                    header, table, options = that.options,
                    scrollable = options.scrollable,
                    hasVirtualScroll = scrollable !== true && scrollable.virtual && !that.virtualScrollable,
                    scrollbar = !kendo.support.kineticScrollNeeded || hasVirtualScroll ? kendo.support.scrollbar() : 0;
                if (scrollable) {
                    header = that.wrapper.children('.k-grid-header');
                    if (!header[0]) {
                        header = $('<div class="k-grid-header" />').insertBefore(that.table);
                    }
                    header.css(isRtl ? 'padding-left' : 'padding-right', scrollable.virtual ? scrollbar + 1 : scrollbar);
                    table = $('<table role="grid" />');
                    if (isIE7) {
                        table.attr('cellspacing', 0);
                    }
                    table.width(that.table[0].style.width);
                    table.append(that.thead);
                    header.empty().append($('<div class="k-grid-header-wrap k-auto-scrollable" />').append(table));
                    that.content = that.table.parent();
                    if (that.content.is('.k-virtual-scrollable-wrap, .km-scroll-container')) {
                        that.content = that.content.parent();
                    }
                    if (!that.content.is('.k-grid-content, .k-virtual-scrollable-wrap')) {
                        that.content = that.table.wrap('<div class="k-grid-content k-auto-scrollable" />').parent();
                    }
                    if (hasVirtualScroll) {
                        that.virtualScrollable = new VirtualScrollable(that.content, {
                            dataSource: that.dataSource,
                            itemHeight: function() {
                                return that._averageRowHeight();
                            }
                        });
                    }
                    that.scrollables = header.children('.k-grid-header-wrap').add(that.content);
                    var footer = that.wrapper.find('.k-grid-footer');
                    if (footer.length) {
                        that.scrollables = that.scrollables.add(footer.children('.k-grid-footer-wrap'));
                    }
                    if (scrollable.virtual) {
                        that.content.find('>.k-virtual-scrollable-wrap').unbind('scroll' + NS).bind('scroll' + NS, function() {
                            that.scrollables.scrollLeft(this.scrollLeft);
                            if (that.lockedContent) {
                                that.lockedContent[0].scrollTop = this.scrollTop;
                            }
                        });
                    } else {
                        that.scrollables.unbind('scroll' + NS).bind('scroll' + NS, function(e) {
                            that.scrollables.not(e.currentTarget).scrollLeft(this.scrollLeft);
                            if (that.lockedContent && e.currentTarget == that.content[0]) {
                                that.lockedContent[0].scrollTop = this.scrollTop;
                            }
                        });
                        var touchScroller = that.content.data('kendoTouchScroller');
                        if (touchScroller) {
                            touchScroller.destroy();
                        }
                        touchScroller = kendo.touchScroller(that.content);
                        if (touchScroller && touchScroller.movable) {
                            that.touchScroller = touchScroller;
                            touchScroller.movable.bind('change', function(e) {
                                that.scrollables.scrollLeft(-e.sender.x);
                                if (that.lockedContent) {
                                    that.lockedContent.scrollTop(-e.sender.y);
                                }
                            });
                            that.one(DATABOUND, function(e) {
                                e.sender.wrapper.addClass('k-grid-backface');
                            });
                        }
                    }
                }
            },
            _renderNoRecordsContent: function() {
                var that = this;
                if (that.options.noRecords) {
                    var noRecordsElement = that.table.parent().children('.' + NORECORDSCLASS);
                    if (noRecordsElement.length) {
                        that.angular('cleanup', function() {
                            return {
                                elements: noRecordsElement.get()
                            };
                        });
                        noRecordsElement.remove();
                    }
                    if (!that.dataSource || !that.dataSource.view().length) {
                        noRecordsElement = $(that.noRecordsTemplate({})).insertAfter(that.table);
                        that.angular('compile', function() {
                            return {
                                elements: noRecordsElement.get(),
                                data: [{}]
                            };
                        });
                    }
                }
            },
            _setContentWidth: function(scrollLeft) {
                var that = this,
                    hiddenDivClass = 'k-grid-content-expander',
                    hiddenDiv = '<div class="' + hiddenDivClass + '"></div>',
                    resizable = that.resizable,
                    expander;
                if (that.options.scrollable && that.wrapper.is(':visible')) {
                    expander = that.table.parent().children('.' + hiddenDivClass);
                    that._setContentWidthHandler = proxy(that._setContentWidth, that);
                    if (!that.dataSource || !that.dataSource.view().length) {
                        if (!expander[0]) {
                            expander = $(hiddenDiv).appendTo(that.table.parent());
                            if (resizable) {
                                resizable.bind('resize', that._setContentWidthHandler);
                            }
                        }
                        if (that.thead) {
                            expander.width(that.thead.width());
                            if (scrollLeft) {
                                that.content.scrollLeft(scrollLeft);
                            }
                        }
                    } else if (expander[0]) {
                        expander.remove();
                        if (resizable) {
                            resizable.unbind('resize', that._setContentWidthHandler);
                        }
                    }
                    that._applyLockedContainersWidth();
                    if (that.lockedHeader && that.table[0].clientWidth === 0) {
                        that.table[0].style.width = '1px';
                    }
                }
            },
            _applyLockedContainersWidth: function() {
                if (this.options.scrollable && this.lockedHeader) {
                    var headerTable = this.thead.parent(),
                        headerWrap = headerTable.parent(),
                        contentWidth = this.wrapper[0].clientWidth,
                        groups = this._groups(),
                        scrollbar = kendo.support.scrollbar(),
                        cols = this.lockedHeader.find('>table>colgroup>col:not(.k-group-col, .k-hierarchy-col)'),
                        nonLockedCols = headerTable.find('>colgroup>col:not(.k-group-col, .k-hierarchy-col)'),
                        width = columnsWidth(cols),
                        nonLockedColsWidth = columnsWidth(nonLockedCols),
                        footerWrap;
                    if (groups > 0) {
                        width += this.lockedHeader.find('.k-group-cell:first').outerWidth() * groups;
                    }
                    if (width >= contentWidth) {
                        width = contentWidth - 3 * scrollbar;
                    }
                    this.lockedHeader.add(this.lockedContent).width(width);
                    headerWrap[0].style.width = headerWrap.parent().width() - width - 2 + 'px';
                    headerTable.add(this.table).width(nonLockedColsWidth);
                    if (this.virtualScrollable) {
                        contentWidth -= scrollbar;
                    }
                    this.content[0].style.width = contentWidth - width - 2 + 'px';
                    if (this.lockedFooter && this.lockedFooter.length) {
                        this.lockedFooter.width(width);
                        footerWrap = this.footer.find('.k-grid-footer-wrap');
                        footerWrap[0].style.width = headerWrap[0].clientWidth + 'px';
                        footerWrap.children().first().width(nonLockedColsWidth);
                    }
                }
            },
            _setContentHeight: function() {
                var that = this,
                    options = that.options,
                    height = that.wrapper.innerHeight(),
                    header = that.wrapper.children('.k-grid-header'),
                    scrollbar = kendo.support.scrollbar();
                if (options.scrollable && that.wrapper.is(':visible')) {
                    height -= header.outerHeight();
                    if (that.pager) {
                        height -= that.pager.element.outerHeight();
                    }
                    if (options.groupable) {
                        height -= that.wrapper.children('.k-grouping-header').outerHeight();
                    }
                    if (options.toolbar) {
                        height -= that.wrapper.children('.k-grid-toolbar').outerHeight();
                    }
                    if (that.footerTemplate) {
                        height -= that.wrapper.children('.k-grid-footer').outerHeight();
                    }
                    var isGridHeightSet = function(el) {
                        var initialHeight, newHeight;
                        if (el[0].style.height) {
                            return true;
                        } else {
                            initialHeight = el.height();
                        }
                        el.height('auto');
                        newHeight = el.height();
                        if (initialHeight != newHeight) {
                            el.height('');
                            return true;
                        }
                        el.height('');
                        return false;
                    };
                    if (isGridHeightSet(that.wrapper)) {
                        if (height > scrollbar * 2) {
                            if (that.lockedContent) {
                                scrollbar = that.table[0].offsetWidth > that.table.parent()[0].clientWidth ? scrollbar : 0;
                                that.lockedContent.height(height - scrollbar);
                            }
                            that.content.height(height);
                        } else {
                            that.content.height(scrollbar * 2 + 1);
                        }
                    }
                }
            },
            _averageRowHeight: function() {
                var that = this,
                    itemsCount = that._items(that.tbody).length,
                    rowHeight = that._rowHeight;
                if (itemsCount === 0) {
                    return rowHeight;
                }
                if (!that._rowHeight) {
                    that._rowHeight = rowHeight = that.table.outerHeight() / itemsCount;
                    that._sum = rowHeight;
                    that._measures = 1;
                }
                var currentRowHeight = that.table.outerHeight() / itemsCount;
                if (rowHeight !== currentRowHeight) {
                    that._measures++;
                    that._sum += currentRowHeight;
                    that._rowHeight = that._sum / that._measures;
                }
                return rowHeight;
            },
            _dataSource: function() {
                var that = this,
                    options = that.options,
                    pageable, dataSource = options.dataSource;
                dataSource = isArray(dataSource) ? {
                    data: dataSource
                } : dataSource;
                if (isPlainObject(dataSource)) {
                    extend(dataSource, {
                        table: that.table,
                        fields: that.columns
                    });
                    pageable = options.pageable;
                    if (isPlainObject(pageable) && pageable.pageSize !== undefined) {
                        dataSource.pageSize = pageable.pageSize;
                    }
                }
                if (that.dataSource && that._refreshHandler) {
                    that.dataSource.unbind(CHANGE, that._refreshHandler).unbind(PROGRESS, that._progressHandler).unbind(ERROR, that._errorHandler);
                } else {
                    that._refreshHandler = proxy(that.refresh, that);
                    that._progressHandler = proxy(that._requestStart, that);
                    that._errorHandler = proxy(that._error, that);
                }
                that.dataSource = DataSource.create(dataSource).bind(CHANGE, that._refreshHandler).bind(PROGRESS, that._progressHandler).bind(ERROR, that._errorHandler);
            },
            _error: function() {
                this._progress(false);
            },
            _requestStart: function() {
                this._progress(true);
            },
            _modelChange: function(e) {
                var that = this,
                    tbody = that.tbody,
                    model = e.model,
                    row = that.tbody.find('tr[' + kendo.attr('uid') + '=' + model.uid + ']'),
                    relatedRow, cell, column, isAlt = row.hasClass('k-alt'),
                    tmp, idx = that._items(tbody).index(row),
                    isLocked = that.lockedContent,
                    selectable, selectableRow, childCells, originalCells, length;
                if (isLocked) {
                    relatedRow = that._relatedRow(row);
                }
                if (row.add(relatedRow).children('.k-edit-cell').length && !that.options.rowTemplate) {
                    row.add(relatedRow).children(':not(.k-group-cell,.k-hierarchy-cell)').each(function() {
                        cell = $(this);
                        column = leafColumns(that.columns)[that.cellIndex(cell)];
                        if (column.field === e.field) {
                            if (!cell.hasClass('k-edit-cell')) {
                                that._displayCell(cell, column, model);
                                $('<span class="k-dirty"/>').prependTo(cell);
                            } else {
                                cell.addClass('k-dirty-cell');
                            }
                        }
                    });
                } else if (!row.hasClass('k-grid-edit-row')) {
                    selectableRow = $().add(row);
                    if (isLocked) {
                        tmp = (isAlt ? that.lockedAltRowTemplate : that.lockedRowTemplate)(model);
                        selectableRow = selectableRow.add(relatedRow);
                        relatedRow.replaceWith(tmp);
                    }
                    that.angular('cleanup', function() {
                        return {
                            elements: selectableRow.get()
                        };
                    });
                    tmp = (isAlt ? that.altRowTemplate : that.rowTemplate)(model);
                    row.replaceWith(tmp);
                    tmp = that._items(tbody).eq(idx);
                    var angularData = [{
                        dataItem: model
                    }];
                    if (isLocked) {
                        row = row.add(relatedRow);
                        relatedRow = that._relatedRow(tmp)[0];
                        adjustRowHeight(tmp[0], relatedRow);
                        tmp = tmp.add(relatedRow);
                        angularData.push({
                            dataItem: model
                        });
                    }
                    that.angular('compile', function() {
                        return {
                            elements: tmp.get(),
                            data: angularData
                        };
                    });
                    selectable = that.options.selectable;
                    if (selectable && row.hasClass('k-state-selected')) {
                        that.select(tmp);
                    }
                    originalCells = selectableRow.children(':not(.k-group-cell,.k-hierarchy-cell)');
                    childCells = tmp.children(':not(.k-group-cell,.k-hierarchy-cell)');
                    for (idx = 0, length = that.columns.length; idx < length; idx++) {
                        column = that.columns[idx];
                        cell = childCells.eq(idx);
                        if (selectable && originalCells.eq(idx).hasClass('k-state-selected')) {
                            cell.addClass('k-state-selected');
                        }
                        if (column.field === e.field) {
                            $('<span class="k-dirty"/>').prependTo(cell);
                        }
                    }
                    that.trigger('itemChange', {
                        item: tmp,
                        data: model,
                        ns: ui
                    });
                }
            },
            _pageable: function() {
                var that = this,
                    wrapper, pageable = that.options.pageable;
                if (pageable) {
                    wrapper = that.wrapper.children('div.k-grid-pager');
                    if (!wrapper.length) {
                        wrapper = $('<div class="k-pager-wrap k-grid-pager"/>').appendTo(that.wrapper);
                    }
                    if (that.pager) {
                        that.pager.destroy();
                    }
                    if (typeof pageable === 'object' && pageable instanceof kendo.ui.Pager) {
                        that.pager = pageable;
                    } else {
                        that.pager = new kendo.ui.Pager(wrapper, extend({}, pageable, {
                            dataSource: that.dataSource
                        }));
                    }
                }
            },
            _footer: function() {
                var that = this,
                    aggregates = that.dataSource.aggregates(),
                    html = '',
                    footerTemplate = that.footerTemplate,
                    options = that.options,
                    footerWrap, footer = that.footer || that.wrapper.find('.k-grid-footer');
                if (footerTemplate) {
                    html = $(that._wrapFooter(footerTemplate(aggregates)));
                    if (footer.length) {
                        var tmp = html;
                        that.angular('cleanup', function() {
                            return {
                                elements: footer.get()
                            };
                        });
                        footer.replaceWith(tmp);
                        footer = that.footer = tmp;
                    } else {
                        if (options.scrollable) {
                            footer = that.footer = options.pageable ? html.insertBefore(that.wrapper.children('div.k-grid-pager')) : html.appendTo(that.wrapper);
                        } else {
                            footer = that.footer = html.insertBefore(that.tbody);
                        }
                    }
                    that.angular('compile', function() {
                        return {
                            elements: footer.find('td:not(.k-group-cell, .k-hierarchy-cell)').get(),
                            data: map(that.columns, function(col) {
                                return {
                                    column: col,
                                    aggregate: aggregates[col.field]
                                };
                            })
                        };
                    });
                } else if (footer && !that.footer) {
                    that.footer = footer;
                }
                if (footer.length) {
                    if (options.scrollable) {
                        footerWrap = footer.attr('tabindex', -1).children('.k-grid-footer-wrap');
                        that.scrollables = that.scrollables.filter(function() {
                            return !$(this).is('.k-grid-footer-wrap');
                        }).add(footerWrap);
                    }
                    if (that._footerWidth) {
                        footer.find('table').css('width', that._footerWidth);
                    }
                    if (footerWrap) {
                        var offset = that.content.scrollLeft();
                        if (options.scrollable !== true && options.scrollable.virtual) {
                            offset = that.wrapper.find('.k-virtual-scrollable-wrap').scrollLeft();
                        }
                        footerWrap.scrollLeft(offset);
                    }
                }
                if (that.lockedContent) {
                    that._appendLockedColumnFooter();
                    that._applyLockedContainersWidth();
                    that._syncLockedFooterHeight();
                }
            },
            _wrapFooter: function(footerRow) {
                var that = this,
                    html = '',
                    scrollbar = !kendo.support.mobileOS ? kendo.support.scrollbar() : 0;
                if (that.options.scrollable) {
                    html = $('<div class="k-grid-footer"><div class="k-grid-footer-wrap"><table' + (isIE7 ? ' cellspacing="0"' : '') + '><tbody>' + footerRow + '</tbody></table></div></div>');
                    that._appendCols(html.find('table'));
                    html.css(isRtl ? 'padding-left' : 'padding-right', scrollbar);
                    return html;
                }
                return '<tfoot class="k-grid-footer">' + footerRow + '</tfoot>';
            },
            _columnMenu: function() {
                var that = this,
                    menu, columns = leafColumns(that.columns),
                    column, options = that.options,
                    columnMenu = options.columnMenu,
                    menuOptions, sortable, filterable, cells, hasMultiColumnHeaders = grep(that.columns, function(item) {
                        return item.columns !== undefined;
                    }).length > 0,
                    isMobile = this._isMobile,
                    initCallback = function(e) {
                        that.trigger(COLUMNMENUINIT, {
                            field: e.field,
                            container: e.container
                        });
                    },
                    closeCallback = function(element) {
                        focusTable(element.closest('table'), true);
                    },
                    $angular = options.$angular;
                if (columnMenu) {
                    if (typeof columnMenu == 'boolean') {
                        columnMenu = {};
                    }
                    cells = leafDataCells(that.thead);
                    for (var idx = 0, length = cells.length; idx < length; idx++) {
                        column = columns[idx];
                        var cell = cells.eq(idx);
                        if (!column.command && (column.field || cell.attr('data-' + kendo.ns + 'field'))) {
                            menu = cell.data('kendoColumnMenu');
                            if (menu) {
                                menu.destroy();
                            }
                            sortable = column.sortable !== false && columnMenu.sortable !== false && options.sortable !== false ? extend({}, options.sortable, {
                                compare: (column.sortable || {}).compare
                            }) : false;
                            filterable = options.filterable && column.filterable !== false && columnMenu.filterable !== false ? extend({
                                pane: that.pane
                            }, options.filterable, column.filterable) : false;
                            if (column.filterable && column.filterable.dataSource) {
                                filterable.forceUnique = false;
                                filterable.checkSource = column.filterable.dataSource;
                            }
                            if (filterable) {
                                filterable.format = column.format;
                            }
                            menuOptions = {
                                dataSource: that.dataSource,
                                values: column.values,
                                columns: columnMenu.columns,
                                sortable: sortable,
                                filterable: filterable,
                                messages: columnMenu.messages,
                                owner: that,
                                closeCallback: closeCallback,
                                init: initCallback,
                                pane: that.pane,
                                filter: isMobile ? ':not(.k-column-active)' : '',
                                lockedColumns: !hasMultiColumnHeaders && column.lockable !== false && lockedColumns(columns).length > 0
                            };
                            if ($angular) {
                                menuOptions.$angular = $angular;
                            }
                            cell.kendoColumnMenu(menuOptions);
                        }
                    }
                }
            },
            _headerCells: function() {
                return this.thead.find('th').filter(function() {
                    var th = $(this);
                    return !th.hasClass('k-group-cell') && !th.hasClass('k-hierarchy-cell');
                });
            },
            _filterable: function() {
                var that = this,
                    columns = leafColumns(that.columns),
                    filterMenu, cells, cell, filterInit = function(e) {
                        that.trigger(FILTERMENUINIT, {
                            field: e.field,
                            container: e.container
                        });
                    },
                    closeCallback = function(element) {
                        focusTable(element.closest('table'), true);
                    },
                    filterable = that.options.filterable;
                if (filterable && typeof filterable.mode == STRING && filterable.mode.indexOf('menu') == -1) {
                    filterable = false;
                }
                if (filterable && !that.options.columnMenu) {
                    cells = leafDataCells(that.thead);
                    for (var idx = 0, length = cells.length; idx < length; idx++) {
                        cell = cells.eq(idx);
                        if (columns[idx].filterable !== false && !columns[idx].command && (columns[idx].field || cell.attr('data-' + kendo.ns + 'field'))) {
                            filterMenu = cell.data('kendoFilterMenu');
                            if (filterMenu) {
                                filterMenu.destroy();
                            }
                            filterMenu = cell.data('kendoFilterMultiCheck');
                            if (filterMenu) {
                                filterMenu.destroy();
                            }
                            var columnFilterable = columns[idx].filterable;
                            var options = extend({}, filterable, columnFilterable, {
                                dataSource: that.dataSource,
                                values: columns[idx].values,
                                format: columns[idx].format,
                                closeCallback: closeCallback,
                                title: columns[idx].title || columns[idx].field,
                                init: filterInit,
                                pane: that.pane
                            });
                            if (columnFilterable && columnFilterable.messages) {
                                options.messages = extend(true, {}, filterable.messages, columnFilterable.messages);
                            }
                            if (columnFilterable && columnFilterable.dataSource) {
                                options.forceUnique = false;
                                options.checkSource = columnFilterable.dataSource;
                            }
                            if (columnFilterable && columnFilterable.multi) {
                                cell.kendoFilterMultiCheck(options);
                            } else {
                                cell.kendoFilterMenu(options);
                            }
                        }
                    }
                }
            },
            _filterRow: function() {
                var that = this;
                if (!that._hasFilterRow()) {
                    return;
                }
                var settings;
                var $angular = that.options.$angular;
                var columns = leafColumns(that.columns),
                    filterable = that.options.filterable,
                    rowheader = that.thead.find('.k-filter-row');
                this._updateHeader(this.dataSource.group().length);
                for (var i = 0; i < columns.length; i++) {
                    var suggestDataSource, col = columns[i],
                        operators = that.options.filterable.operators,
                        customDataSource = false,
                        th = $('<th/>'),
                        field = col.field;
                    if (col.hidden) {
                        th.hide();
                    }
                    rowheader.append(th);
                    if (field && col.filterable !== false) {
                        var cellOptions = col.filterable && col.filterable.cell || {};
                        suggestDataSource = that.options.dataSource;
                        if (suggestDataSource instanceof DataSource) {
                            suggestDataSource = that.options.dataSource.options;
                        }
                        var messages = extend(true, {}, filterable.messages);
                        if (col.filterable) {
                            extend(true, messages, col.filterable.messages);
                        }
                        if (cellOptions.enabled === false) {
                            th.html('&nbsp;');
                            continue;
                        }
                        if (cellOptions.dataSource) {
                            suggestDataSource = cellOptions.dataSource;
                            customDataSource = true;
                        }
                        if (col.filterable && col.filterable.operators) {
                            operators = col.filterable.operators;
                        }
                        settings = {
                            column: col,
                            dataSource: that.dataSource,
                            suggestDataSource: suggestDataSource,
                            customDataSource: customDataSource,
                            field: field,
                            messages: messages,
                            values: col.values,
                            template: cellOptions.template,
                            delay: cellOptions.delay,
                            inputWidth: cellOptions.inputWidth,
                            suggestionOperator: cellOptions.suggestionOperator,
                            minLength: cellOptions.minLength,
                            dataTextField: cellOptions.dataTextField,
                            operator: cellOptions.operator,
                            operators: operators,
                            showOperators: cellOptions.showOperators
                        };
                        if ($angular) {
                            settings.$angular = $angular;
                        }
                        $('<span/>').attr(kendo.attr('field'), field).appendTo(th).kendoFilterCell(settings);
                    } else {
                        th.html('&nbsp;');
                    }
                }
            },
            _sortable: function() {
                var that = this,
                    columns = leafColumns(that.columns),
                    column, sorterInstance, cell, sortable = that.options.sortable;
                if (sortable) {
                    var cells = leafDataCells(that.thead);
                    for (var idx = 0, length = cells.length; idx < length; idx++) {
                        column = columns[idx];
                        if (column.sortable !== false && !column.command && column.field) {
                            cell = cells.eq(idx);
                            sorterInstance = cell.data('kendoColumnSorter');
                            if (sorterInstance) {
                                sorterInstance.destroy();
                            }
                            cell.attr('data-' + kendo.ns + 'field', column.field).kendoColumnSorter(extend({}, sortable, column.sortable, {
                                dataSource: that.dataSource,
                                aria: true,
                                filter: ':not(.k-column-active)'
                            }));
                        }
                    }
                    cells = null;
                }
            },
            _columns: function(columns) {
                var that = this,
                    table = that.table,
                    encoded, cols = table.find('col'),
                    lockedCols, dataSource = that.options.dataSource;
                columns = columns.length ? columns : map(table.find('th'), function(th, idx) {
                    th = $(th);
                    var sortable = th.attr(kendo.attr('sortable')),
                        filterable = th.attr(kendo.attr('filterable')),
                        type = th.attr(kendo.attr('type')),
                        groupable = th.attr(kendo.attr('groupable')),
                        field = th.attr(kendo.attr('field')),
                        title = th.attr(kendo.attr('title')),
                        menu = th.attr(kendo.attr('menu'));
                    if (!field) {
                        field = th.text().replace(/\s|[^A-z0-9]/g, '');
                    }
                    return {
                        field: field,
                        type: type,
                        title: title,
                        sortable: sortable !== 'false',
                        filterable: filterable !== 'false',
                        groupable: groupable !== 'false',
                        menu: menu,
                        template: th.attr(kendo.attr('template')),
                        width: cols.eq(idx).css('width')
                    };
                });
                encoded = !(that.table.find('tbody tr').length > 0 && (!dataSource || !dataSource.transport));
                if (that.options.scrollable) {
                    var initialColumns = columns;
                    lockedCols = lockedColumns(columns);
                    columns = nonLockedColumns(columns);
                    if (lockedCols.length > 0 && columns.length === 0) {
                        throw new Error('There should be at least one non locked column');
                    }
                    normalizeHeaderCells(that.element.find('tr:has(th):first'), initialColumns);
                    columns = lockedCols.concat(columns);
                }
                that.columns = normalizeColumns(columns, encoded);
            },
            _groups: function() {
                var group = this.dataSource.group();
                return group ? group.length : 0;
            },
            _tmpl: function(rowTemplate, columns, alt, skipGroupCells) {
                var that = this,
                    settings = extend({}, kendo.Template, that.options.templateSettings),
                    idx, length = columns.length,
                    template, state = {
                        storage: {},
                        count: 0
                    },
                    column, type, hasDetails = that._hasDetails(),
                    className = [],
                    groups = that._groups();
                if (!rowTemplate) {
                    rowTemplate = '<tr';
                    if (alt) {
                        className.push('k-alt');
                    }
                    if (hasDetails) {
                        className.push('k-master-row');
                    }
                    if (className.length) {
                        rowTemplate += ' class="' + className.join(' ') + '"';
                    }
                    if (length) {
                        rowTemplate += ' ' + kendo.attr('uid') + '="#=' + kendo.expr('uid', settings.paramName) + '#"';
                    }
                    rowTemplate += ' role=\'row\'>';
                    if (groups > 0 && !skipGroupCells) {
                        rowTemplate += groupCells(groups);
                    }
                    if (hasDetails) {
                        rowTemplate += '<td class="k-hierarchy-cell"><a class="k-icon k-plus" href="\\#" tabindex="-1"></a></td>';
                    }
                    for (idx = 0; idx < length; idx++) {
                        column = columns[idx];
                        template = column.template;
                        type = typeof template;
                        rowTemplate += '<td' + stringifyAttributes(column.attributes) + ' role=\'gridcell\'>';
                        rowTemplate += that._cellTmpl(column, state);
                        rowTemplate += '</td>';
                    }
                    rowTemplate += '</tr>';
                }
                rowTemplate = kendo.template(rowTemplate, settings);
                if (state.count > 0) {
                    return proxy(rowTemplate, state.storage);
                }
                return rowTemplate;
            },
            _headerCellText: function(column) {
                var that = this,
                    settings = extend({}, kendo.Template, that.options.templateSettings),
                    template = column.headerTemplate,
                    type = typeof template,
                    text = column.title || column.field || '';
                if (type === FUNCTION) {
                    text = kendo.template(template, settings)({});
                } else if (type === STRING) {
                    text = template;
                }
                return text;
            },
            _cellTmpl: function(column, state) {
                var that = this,
                    settings = extend({}, kendo.Template, that.options.templateSettings),
                    template = column.template,
                    paramName = settings.paramName,
                    field = column.field,
                    html = '',
                    idx, length, format = column.format,
                    type = typeof template,
                    columnValues = column.values;
                if (column.command) {
                    if (isArray(column.command)) {
                        for (idx = 0, length = column.command.length; idx < length; idx++) {
                            html += that._createButton(column.command[idx]);
                        }
                        return html.replace(templateHashRegExp, '\\#');
                    }
                    return that._createButton(column.command).replace(templateHashRegExp, '\\#');
                }
                if (type === FUNCTION) {
                    state.storage['tmpl' + state.count] = template;
                    html += '#=this.tmpl' + state.count + '(' + paramName + ')#';
                    state.count++;
                } else if (type === STRING) {
                    html += template;
                } else if (columnValues && columnValues.length && isPlainObject(columnValues[0]) && 'value' in columnValues[0] && field) {
                    html += '#var v =' + kendo.stringify(convertToObject(columnValues)).replace(templateHashRegExp, '\\#') + '#';
                    html += '#var f = v[';
                    if (!settings.useWithBlock) {
                        html += paramName + '.';
                    }
                    html += field + ']#';
                    html += '${f != null ? f : \'\'}';
                } else {
                    html += column.encoded ? '#:' : '#=';
                    if (format) {
                        html += 'kendo.format("' + format.replace(formatRegExp, '\\$1') + '",';
                    }
                    if (field) {
                        field = kendo.expr(field, paramName);
                        html += field + '==null?\'\':' + field;
                    } else {
                        html += '\'\'';
                    }
                    if (format) {
                        html += ')';
                    }
                    html += '#';
                }
                return html;
            },
            _templates: function() {
                var that = this,
                    options = that.options,
                    dataSource = that.dataSource,
                    groups = dataSource.group(),
                    footer = that.footer || that.wrapper.find('.k-grid-footer'),
                    aggregates = dataSource.aggregate(),
                    columnLeafs = leafColumns(that.columns),
                    columnsLocked = leafColumns(lockedColumns(that.columns)),
                    columns = options.scrollable ? leafColumns(nonLockedColumns(that.columns)) : columnLeafs;
                if (options.scrollable && columnsLocked.length) {
                    if (options.rowTemplate || options.altRowTemplate) {
                        throw new Error('Having both row template and locked columns is not supported');
                    }
                    that.rowTemplate = that._tmpl(options.rowTemplate, columns, false, true);
                    that.altRowTemplate = that._tmpl(options.altRowTemplate || options.rowTemplate, columns, true, true);
                    that.lockedRowTemplate = that._tmpl(options.rowTemplate, columnsLocked);
                    that.lockedAltRowTemplate = that._tmpl(options.altRowTemplate || options.rowTemplate, columnsLocked, true);
                } else {
                    that.rowTemplate = that._tmpl(options.rowTemplate, columns);
                    that.altRowTemplate = that._tmpl(options.altRowTemplate || options.rowTemplate, columns, true);
                }
                if (that._hasDetails()) {
                    that.detailTemplate = that._detailTmpl(options.detailTemplate || '');
                }
                if (that._group && !isEmptyObject(aggregates) || !isEmptyObject(aggregates) && !footer.length || grep(columnLeafs, function(column) {
                        return column.footerTemplate;
                    }).length) {
                    that.footerTemplate = that._footerTmpl(columnLeafs, aggregates, 'footerTemplate', 'k-footer-template');
                }
                if (groups && grep(columnLeafs, function(column) {
                        return column.groupFooterTemplate;
                    }).length) {
                    aggregates = $.map(groups, function(g) {
                        return g.aggregates;
                    });
                    that.groupFooterTemplate = that._footerTmpl(columns, aggregates, 'groupFooterTemplate', 'k-group-footer', columnsLocked.length);
                    if (options.scrollable && columnsLocked.length) {
                        that.lockedGroupFooterTemplate = that._footerTmpl(columnsLocked, aggregates, 'groupFooterTemplate', 'k-group-footer');
                    }
                }
                if (that.options.noRecords) {
                    that.noRecordsTemplate = that._noRecordsTmpl();
                }
            },
            _noRecordsTmpl: function() {
                var wrapper = '<div class="{0}">{1}</div>';
                var defaultTemplate = '<div class="k-grid-norecords-template"{1}>{0}</div>';
                var scrollableNoGridHeightStyles = this.options.scrollable && !this.wrapper[0].style.height ? ' style="margin:0 auto;position:static;"' : '';
                var state = {
                    storage: {},
                    count: 0
                };
                var settings = $.extend({}, kendo.Template, this.options.templateSettings);
                var paramName = settings.paramName;
                var template;
                var html = '';
                var type;
                var tmpl;
                if (this.options.noRecords.template) {
                    template = this.options.noRecords.template;
                } else {
                    template = kendo.format(defaultTemplate, this.options.messages.noRecords, scrollableNoGridHeightStyles);
                }
                type = typeof template;
                if (type === 'function') {
                    state.storage['tmpl' + state.count] = template;
                    html += '#=this.tmpl' + state.count + '(' + paramName + ')#';
                    state.count++;
                } else if (type === 'string') {
                    html += template;
                }
                tmpl = kendo.template(kendo.format(wrapper, NORECORDSCLASS, html), settings);
                if (state.count > 0) {
                    tmpl = $.proxy(tmpl, state.storage);
                }
                return tmpl;
            },
            _footerTmpl: function(columns, aggregates, templateName, rowClass, skipGroupCells) {
                var that = this,
                    settings = extend({}, kendo.Template, that.options.templateSettings),
                    paramName = settings.paramName,
                    html = '',
                    idx, length, template, type, storage = {},
                    count = 0,
                    scope = {},
                    groups = that._groups(),
                    fieldsMap = that.dataSource._emptyAggregates(aggregates),
                    column;
                html += '<tr class="' + rowClass + '">';
                if (groups > 0 && !skipGroupCells) {
                    html += groupCells(groups);
                }
                if (that._hasDetails()) {
                    html += '<td class="k-hierarchy-cell">&nbsp;</td>';
                }
                for (idx = 0, length = columns.length; idx < length; idx++) {
                    column = columns[idx];
                    template = column[templateName];
                    type = typeof template;
                    html += '<td' + stringifyAttributes(column.footerAttributes) + '>';
                    if (template) {
                        if (type !== FUNCTION) {
                            scope = fieldsMap[column.field] ? extend({}, settings, {
                                paramName: paramName + '[\'' + column.field + '\']'
                            }) : {};
                            template = kendo.template(template, scope);
                        }
                        storage['tmpl' + count] = template;
                        html += '#=this.tmpl' + count + '(' + paramName + ')#';
                        count++;
                    } else {
                        html += '&nbsp;';
                    }
                    html += '</td>';
                }
                html += '</tr>';
                html = kendo.template(html, settings);
                if (count > 0) {
                    return proxy(html, storage);
                }
                return html;
            },
            _detailTmpl: function(template) {
                var that = this,
                    html = '',
                    settings = extend({}, kendo.Template, that.options.templateSettings),
                    paramName = settings.paramName,
                    templateFunctionStorage = {},
                    templateFunctionCount = 0,
                    groups = that._groups(),
                    colspan = visibleColumns(leafColumns(that.columns)).length,
                    type = typeof template;
                html += '<tr class="k-detail-row">';
                if (groups > 0) {
                    html += groupCells(groups);
                }
                html += '<td class="k-hierarchy-cell"></td><td class="k-detail-cell"' + (colspan ? ' colspan="' + colspan + '"' : '') + '>';
                if (type === FUNCTION) {
                    templateFunctionStorage['tmpl' + templateFunctionCount] = template;
                    html += '#=this.tmpl' + templateFunctionCount + '(' + paramName + ')#';
                    templateFunctionCount++;
                } else {
                    html += template;
                }
                html += '</td></tr>';
                html = kendo.template(html, settings);
                if (templateFunctionCount > 0) {
                    return proxy(html, templateFunctionStorage);
                }
                return html;
            },
            _hasDetails: function() {
                var that = this;
                return that.options.detailTemplate !== null || (that._events[DETAILINIT] || []).length;
            },
            _hasFilterRow: function() {
                var filterable = this.options.filterable;
                var hasFiltering = filterable && typeof filterable.mode == STRING && filterable.mode.indexOf('row') != -1;
                var columns = this.columns;
                var columnsWithoutFiltering = $.grep(columns, function(col) {
                    return col.filterable === false;
                });
                if (columns.length && columnsWithoutFiltering.length == columns.length) {
                    hasFiltering = false;
                }
                return hasFiltering;
            },
            _details: function() {
                var that = this;
                if (that.options.scrollable && that._hasDetails() && lockedColumns(that.columns).length) {
                    throw new Error('Having both detail template and locked columns is not supported');
                }
                that.table.on(CLICK + NS, '.k-hierarchy-cell .k-plus, .k-hierarchy-cell .k-minus', function(e) {
                    var button = $(this),
                        expanding = button.hasClass('k-plus'),
                        masterRow = button.closest('tr.k-master-row'),
                        detailRow, detailTemplate = that.detailTemplate,
                        data, hasDetails = that._hasDetails();
                    button.toggleClass('k-plus', !expanding).toggleClass('k-minus', expanding);
                    detailRow = masterRow.next();
                    if (hasDetails && !detailRow.hasClass('k-detail-row')) {
                        data = that.dataItem(masterRow);
                        detailRow = $(detailTemplate(data)).addClass(masterRow.hasClass('k-alt') ? 'k-alt' : '').insertAfter(masterRow);
                        that.angular('compile', function() {
                            return {
                                elements: detailRow.get(),
                                data: [{
                                    dataItem: data
                                }]
                            };
                        });
                        that.trigger(DETAILINIT, {
                            masterRow: masterRow,
                            detailRow: detailRow,
                            data: data,
                            detailCell: detailRow.find('.k-detail-cell')
                        });
                    }
                    that.trigger(expanding ? DETAILEXPAND : DETAILCOLLAPSE, {
                        masterRow: masterRow,
                        detailRow: detailRow
                    });
                    detailRow.toggle(expanding);
                    if (that._current) {
                        that._current.attr('aria-expanded', expanding);
                    }
                    e.preventDefault();
                    return false;
                });
            },
            dataItem: function(tr) {
                tr = $(tr)[0];
                if (!tr) {
                    return null;
                }
                var rows = this.tbody.children(),
                    classesRegEx = /k-grouping-row|k-detail-row|k-group-footer/,
                    idx = tr.sectionRowIndex,
                    j, correctIdx;
                correctIdx = idx;
                for (j = 0; j < idx; j++) {
                    if (classesRegEx.test(rows[j].className)) {
                        correctIdx--;
                    }
                }
                return this._data[correctIdx];
            },
            expandRow: function(tr) {
                $(tr).find('> td .k-plus, > td .k-i-expand').click();
            },
            collapseRow: function(tr) {
                $(tr).find('> td .k-minus, > td .k-i-collapse').click();
            },
            _createHeaderCells: function(columns, rowSpan) {
                var that = this,
                    idx, th, text, html = '',
                    length, leafs = leafColumns(that.columns),
                    field;
                for (idx = 0, length = columns.length; idx < length; idx++) {
                    th = columns[idx].column || columns[idx];
                    text = that._headerCellText(th);
                    field = '';
                    var index = inArray(th, leafs);
                    if (!th.command) {
                        if (th.field) {
                            field = kendo.attr('field') + '=\'' + th.field + '\' ';
                        }
                        html += '<th scope=\'col\' role=\'columnheader\' ' + field;
                        if (rowSpan && !columns[idx].colSpan) {
                            html += ' rowspan=\'' + rowSpan + '\'';
                        }
                        if (columns[idx].colSpan > 1) {
                            html += 'colspan="' + (columns[idx].colSpan - hiddenLeafColumnsCount(th.columns)) + '" ';
                            html += kendo.attr('colspan') + '=\'' + columns[idx].colSpan + '\'';
                        }
                        if (th.title) {
                            html += kendo.attr('title') + '="' + th.title.replace('"', '&quot;').replace(/'/g, '\'') + '" ';
                        }
                        if (th.groupable !== undefined) {
                            html += kendo.attr('groupable') + '=\'' + th.groupable + '\' ';
                        }
                        if (th.aggregates && th.aggregates.length) {
                            html += kendo.attr('aggregates') + '=\'' + th.aggregates + '\'';
                        }
                        if (index > -1) {
                            html += kendo.attr('index') + '=\'' + index + '\'';
                        }
                        html += stringifyAttributes(th.headerAttributes);
                        html += '>' + text + '</th>';
                    } else {
                        html += '<th scope=\'col\'' + stringifyAttributes(th.headerAttributes);
                        if (rowSpan && !columns[idx].colSpan) {
                            html += ' rowspan=\'' + rowSpan + '\'';
                        }
                        if (index > -1) {
                            html += kendo.attr('index') + '=\'' + index + '\'';
                        }
                        html += '>' + text + '</th>';
                    }
                }
                return html;
            },
            _appendLockedColumnContent: function() {
                var columns = this.columns,
                    idx, colgroup = this.table.find('colgroup'),
                    cols = colgroup.find('col:not(.k-group-col,.k-hierarchy-col)'),
                    length, lockedCols = $(),
                    skipHiddenCount = 0,
                    container, colSpan, spanIdx, colOffset = 0;
                for (idx = 0, length = columns.length; idx < length; idx++) {
                    if (columns[idx].locked) {
                        if (isVisible(columns[idx])) {
                            colSpan = 1;
                            if (columns[idx].columns) {
                                colSpan = leafColumns(columns[idx].columns).length - hiddenLeafColumnsCount(columns[idx].columns);
                            }
                            colSpan = colSpan || 1;
                            for (spanIdx = 0; spanIdx < colSpan; spanIdx++) {
                                lockedCols = lockedCols.add(cols.eq(idx + colOffset + spanIdx - skipHiddenCount));
                            }
                            colOffset += colSpan - 1;
                        } else {
                            skipHiddenCount++;
                        }
                    }
                }
                container = $('<div class="k-grid-content-locked"><table' + (isIE7 ? ' cellspacing="0"' : '') + '><colgroup/><tbody></tbody></table></div>');
                colgroup.detach();
                container.find('colgroup').append(lockedCols);
                colgroup.insertBefore(this.table.find('tbody'));
                this.lockedContent = container.insertBefore(this.content);
                this.lockedTable = container.children('table');
            },
            _appendLockedColumnFooter: function() {
                var that = this;
                var footer = that.footer;
                var cells = footer.find('.k-footer-template>td');
                var cols = footer.find('.k-grid-footer-wrap>table>colgroup>col');
                var html = $('<div class="k-grid-footer-locked"><table><colgroup /><tbody><tr class="k-footer-template"></tr></tbody></table></div>');
                var idx, length;
                var groups = that._groups();
                var lockedCells = $(),
                    lockedCols = $();
                lockedCells = lockedCells.add(cells.filter('.k-group-cell'));
                for (idx = 0, length = leafColumns(lockedColumns(that.columns)).length; idx < length; idx++) {
                    lockedCells = lockedCells.add(cells.eq(idx + groups));
                }
                lockedCols = lockedCols.add(cols.filter('.k-group-col'));
                for (idx = 0, length = visibleColumns(leafColumns(visibleLockedColumns(that.columns))).length; idx < length; idx++) {
                    lockedCols = lockedCols.add(cols.eq(idx + groups));
                }
                lockedCells.appendTo(html.find('tr'));
                lockedCols.appendTo(html.find('colgroup'));
                that.lockedFooter = html.prependTo(footer);
            },
            _appendLockedColumnHeader: function(container) {
                var that = this,
                    columns = this.columns,
                    idx, html, length, colgroup, tr, trFilter, table, header, filtercellCells, rows = [],
                    skipHiddenCount = 0,
                    cols = $(),
                    hasFilterRow = that._hasFilterRow(),
                    filterCellOffset = 0,
                    filterCells = $(),
                    cell, leafColumnsCount = 0,
                    cells = $();
                colgroup = that.thead.prev().find('col:not(.k-group-col,.k-hierarchy-col)');
                header = that.thead.find('tr:first .k-header:not(.k-group-cell,.k-hierarchy-cell)');
                filtercellCells = that.thead.find('.k-filter-row').find('th:not(.k-group-cell,.k-hierarchy-cell)');
                var colOffset = 0;
                for (idx = 0, length = columns.length; idx < length; idx++) {
                    if (columns[idx].locked) {
                        cell = header.eq(idx);
                        leafColumnsCount = leafColumns(columns[idx].columns || []).length;
                        if (isVisible(columns[idx])) {
                            var colSpan = null;
                            if (columns[idx].columns) {
                                colSpan = leafColumnsCount - hiddenLeafColumnsCount(columns[idx].columns);
                            }
                            colSpan = colSpan || 1;
                            for (var spanIdx = 0; spanIdx < colSpan; spanIdx++) {
                                cols = cols.add(colgroup.eq(idx + colOffset + spanIdx - skipHiddenCount));
                            }
                            colOffset += colSpan - 1;
                        }
                        mapColumnToCellRows([columns[idx]], childColumnsCells(cell), rows, 0, 0);
                        leafColumnsCount = leafColumnsCount || 1;
                        for (var j = 0; j < leafColumnsCount; j++) {
                            filterCells = filterCells.add(filtercellCells.eq(filterCellOffset + j));
                        }
                        filterCellOffset += leafColumnsCount;
                    }
                    if (columns[idx].columns) {
                        skipHiddenCount += hiddenLeafColumnsCount(columns[idx].columns);
                    }
                    if (!isVisible(columns[idx])) {
                        skipHiddenCount++;
                    }
                }
                if (rows.length) {
                    html = '<div class="k-grid-header-locked" style="width:1px"><table' + (isIE7 ? ' cellspacing="0"' : '') + '><colgroup/><thead>';
                    html += new Array(rows.length + 1).join('<tr></tr>');
                    html += (hasFilterRow ? '<tr class="k-filter-row" />' : '') + '</thead></table></div>';
                    table = $(html);
                    colgroup = table.find('colgroup');
                    colgroup.append(that.thead.prev().find('col.k-group-col').add(cols));
                    tr = table.find('thead tr:not(.k-filter-row)');
                    for (idx = 0, length = rows.length; idx < length; idx++) {
                        cells = toJQuery(rows[idx]);
                        tr.eq(idx).append(that.thead.find('tr:eq(' + idx + ') .k-group-cell').add(cells));
                    }
                    var count = removeEmptyRows(this.thead);
                    if (rows.length < count) {
                        removeRowSpanValue(table, count - rows.length);
                    }
                    trFilter = table.find('.k-filter-row');
                    trFilter.append(that.thead.find('.k-filter-row .k-group-cell').add(filterCells));
                    this.lockedHeader = table.prependTo(container);
                    this.thead.find('.k-group-cell').remove();
                    return true;
                }
                return false;
            },
            _removeLockedContainers: function() {
                var elements = this.lockedHeader.add(this.lockedContent).add(this.lockedFooter);
                kendo.destroy(elements);
                elements.off(NS).remove();
                this.lockedHeader = this.lockedContent = this.lockedFooter = null;
                this.selectable = null;
            },
            _thead: function() {
                var that = this,
                    columns = that.columns,
                    hasDetails = that._hasDetails() && columns.length,
                    hasFilterRow = that._hasFilterRow(),
                    idx, html = '',
                    thead = that.table.find('>thead'),
                    hasTHead = that.element.find('thead:first').length > 0,
                    tr;
                if (!thead.length) {
                    thead = $('<thead/>').insertBefore(that.tbody);
                }
                if (that.lockedHeader && that.thead) {
                    tr = that.thead.find('tr:has(th):not(.k-filter-row)').html('');
                    tr.remove();
                    tr = $();
                    that._removeLockedContainers();
                } else if (hasTHead) {
                    tr = that.element.find('thead:first tr:has(th):not(.k-filter-row)');
                } else {
                    tr = that.element.find('tr:has(th):first');
                }
                if (!tr.length) {
                    tr = thead.children().first();
                    if (!tr.length) {
                        var rows = [{
                            rowSpan: 1,
                            cells: [],
                            index: 0
                        }];
                        that._prepareColumns(rows, columns);
                        for (idx = 0; idx < rows.length; idx++) {
                            html += '<tr>';
                            if (hasDetails) {
                                html += '<th class="k-hierarchy-cell" scope="col">&nbsp;</th>';
                            }
                            html += that._createHeaderCells(rows[idx].cells, rows[idx].rowSpan);
                            html += '</tr>';
                        }
                        tr = $(html);
                    }
                }
                if (hasFilterRow) {
                    var filterRow = $('<tr/>');
                    filterRow.addClass('k-filter-row');
                    if (hasDetails || tr.find('.k-hierarchy-cell').length) {
                        filterRow.prepend('<th class="k-hierarchy-cell" scope="col">&nbsp;</th>');
                    }
                    var existingFilterRow = (that.thead || thead).find('.k-filter-row');
                    if (existingFilterRow.length) {
                        kendo.destroy(existingFilterRow);
                        existingFilterRow.remove();
                    }
                    thead.append(filterRow);
                }
                if (!tr.children().length) {
                    html = '';
                    if (hasDetails) {
                        html += '<th class="k-hierarchy-cell" scope="col">&nbsp;</th>';
                    }
                    html += that._createHeaderCells(columns);
                    tr.html(html);
                } else if (hasDetails && !tr.find('.k-hierarchy-cell')[0]) {
                    tr.prepend('<th class="k-hierarchy-cell" scope="col">&nbsp;</th>');
                }
                tr.attr('role', 'row').find('th').addClass('k-header');
                if (!that.options.scrollable) {
                    thead.addClass('k-grid-header');
                }
                tr.find('script').remove().end().prependTo(thead);
                if (that.thead) {
                    that._destroyColumnAttachments();
                }
                this.angular('cleanup', function() {
                    return {
                        elements: thead.find('th').get()
                    };
                });
                this.angular('compile', function() {
                    return {
                        elements: thead.find('th').get(),
                        data: map(columns, function(col) {
                            return {
                                column: col
                            };
                        })
                    };
                });
                that.thead = thead.attr('role', 'rowgroup');
                that._sortable();
                that._filterable();
                that._filterRow();
                that._scrollable();
                that._updateCols();
                that._columnMenu();
                var syncHeight;
                var hasLockedColumns = this.options.scrollable && lockedColumns(this.columns).length;
                if (hasLockedColumns) {
                    syncHeight = that._appendLockedColumnHeader(that.thead.closest('.k-grid-header'));
                    that._appendLockedColumnContent();
                    that.lockedContent.bind('DOMMouseScroll' + NS + ' mousewheel' + NS, proxy(that._wheelScroll, that));
                }
                that._updateColumnCellIndex();
                that._updateFirstColumnClass();
                that._resizable();
                that._draggable();
                that._reorderable();
                that._updateHeader(that._groups());
                if (hasLockedColumns) {
                    if (syncHeight) {
                        that._syncLockedHeaderHeight();
                    }
                    that._applyLockedContainersWidth();
                }
                if (that.groupable) {
                    that._attachGroupable();
                }
            },
            _retrieveFirstColumn: function(columns, rows) {
                var result = $();
                if (rows.length && columns[0]) {
                    var column = columns[0];
                    while (column.columns && column.columns.length) {
                        column = column.columns[0];
                        rows = rows.filter(':not(:first())');
                    }
                    result = result.add(rows);
                }
                return result;
            },
            _updateFirstColumnClass: function() {
                var that = this,
                    columns = that.columns || [],
                    hasDetails = that._hasDetails() && columns.length;
                if (!hasDetails && !that._groups()) {
                    var tr = that.thead.find('>tr:not(.k-filter-row):not(:first)');
                    columns = nonLockedColumns(columns);
                    var rows = that._retrieveFirstColumn(columns, tr);
                    if (that._isLocked()) {
                        tr = that.lockedHeader.find('thead>tr:not(.k-filter-row):not(:first)');
                        columns = lockedColumns(that.columns);
                        rows = rows.add(that._retrieveFirstColumn(columns, tr));
                    }
                    rows.each(function() {
                        var ths = $(this).find('th');
                        ths.removeClass('k-first');
                        ths.eq(0).addClass('k-first');
                    });
                }
            },
            _prepareColumns: function(rows, columns, parentCell, parentRow) {
                var row = parentRow || rows[rows.length - 1];
                var childRow = rows[row.index + 1];
                var totalColSpan = 0;
                for (var idx = 0; idx < columns.length; idx++) {
                    var cell = {
                        column: columns[idx],
                        colSpan: 0
                    };
                    row.cells.push(cell);
                    if (columns[idx].columns && columns[idx].columns.length) {
                        if (!childRow) {
                            childRow = {
                                rowSpan: 0,
                                cells: [],
                                index: rows.length
                            };
                            rows.push(childRow);
                        }
                        cell.colSpan = columns[idx].columns.length;
                        this._prepareColumns(rows, columns[idx].columns, cell, childRow);
                        totalColSpan += cell.colSpan - 1;
                        row.rowSpan = rows.length - row.index;
                    }
                }
                if (parentCell) {
                    parentCell.colSpan += totalColSpan;
                }
            },
            _wheelScroll: function(e) {
                if (e.ctrlKey) {
                    return;
                }
                var content = this.content;
                if (this.options.scrollable.virtual) {
                    content = this.virtualScrollable.verticalScrollbar;
                }
                var scrollTop = content.scrollTop(),
                    delta = kendo.wheelDeltaY(e);
                if (delta) {
                    e.preventDefault();
                    $(e.currentTarget).one('wheel' + NS, false);
                    content.scrollTop(scrollTop + -delta);
                }
            },
            _isLocked: function() {
                return this.lockedHeader != null;
            },
            _updateHeaderCols: function() {
                var table = this.thead.parent().add(this.table);
                if (this._isLocked()) {
                    normalizeCols(table, visibleLeafColumns(visibleNonLockedColumns(this.columns)), this._hasDetails(), 0);
                } else {
                    normalizeCols(table, visibleLeafColumns(visibleColumns(this.columns)), this._hasDetails(), 0);
                }
            },
            _updateCols: function(table) {
                table = table || this.thead.parent().add(this.table);
                this._appendCols(table, this._isLocked());
            },
            _updateLockedCols: function(table) {
                if (this._isLocked()) {
                    table = table || this.lockedHeader.find('table').add(this.lockedTable);
                    normalizeCols(table, visibleLeafColumns(visibleLockedColumns(this.columns)), this._hasDetails(), this._groups());
                }
            },
            _appendCols: function(table, locked) {
                if (locked) {
                    normalizeCols(table, visibleLeafColumns(visibleNonLockedColumns(this.columns)), this._hasDetails(), 0);
                } else {
                    normalizeCols(table, visibleLeafColumns(visibleColumns(this.columns)), this._hasDetails(), this._groups());
                }
            },
            _autoColumns: function(schema) {
                if (schema && schema.toJSON) {
                    var that = this,
                        field, encoded;
                    schema = schema.toJSON();
                    encoded = !(that.table.find('tbody tr').length > 0 && (!that.dataSource || !that.dataSource.transport));
                    for (field in schema) {
                        that.columns.push({
                            field: field,
                            encoded: encoded,
                            headerAttributes: {
                                id: kendo.guid()
                            }
                        });
                    }
                    that._thead();
                    that._templates();
                }
            },
            _rowsHtml: function(data, templates) {
                var that = this,
                    html = '',
                    idx, rowTemplate = templates.rowTemplate,
                    altRowTemplate = templates.altRowTemplate,
                    length;
                for (idx = 0, length = data.length; idx < length; idx++) {
                    if (idx % 2) {
                        html += altRowTemplate(data[idx]);
                    } else {
                        html += rowTemplate(data[idx]);
                    }
                    that._data.push(data[idx]);
                }
                return html;
            },
            _groupRowHtml: function(group, colspan, level, groupHeaderBuilder, templates, skipColspan) {
                var that = this,
                    html = '',
                    idx, length, field = group.field,
                    column = grep(leafColumns(that.columns), function(column) {
                        return column.field == field;
                    })[0] || {},
                    template = column.groupHeaderTemplate,
                    text = (column.title || field) + ': ' + formatGroupValue(group.value, column.format, column.values, column.encoded),
                    footerDefaults = that._groupAggregatesDefaultObject || {},
                    aggregates = extend({}, footerDefaults, group.aggregates),
                    data = extend({}, {
                        field: group.field,
                        value: group.value,
                        aggregates: aggregates
                    }, group.aggregates[group.field]),
                    groupFooterTemplate = templates.groupFooterTemplate,
                    groupItems = group.items;
                if (template) {
                    text = typeof template === FUNCTION ? template(data) : kendo.template(template)(data);
                }
                html += groupHeaderBuilder(colspan, level, text);
                if (group.hasSubgroups) {
                    for (idx = 0, length = groupItems.length; idx < length; idx++) {
                        html += that._groupRowHtml(groupItems[idx], skipColspan ? colspan : colspan - 1, level + 1, groupHeaderBuilder, templates, skipColspan);
                    }
                } else {
                    html += that._rowsHtml(groupItems, templates);
                }
                if (groupFooterTemplate) {
                    html += groupFooterTemplate(aggregates);
                }
                return html;
            },
            collapseGroup: function(group) {
                group = $(group);
                var level, groupable = this.options.groupable,
                    showFooter = groupable.showFooter,
                    footerCount = showFooter ? 0 : 1,
                    offset, relatedGroup = $(),
                    idx, length, tr;
                if (this._isLocked()) {
                    if (!group.closest('div').hasClass('k-grid-content-locked')) {
                        relatedGroup = group.nextAll('tr');
                        group = this.lockedTable.find('>tbody>tr:eq(' + group.index() + ')');
                    } else {
                        relatedGroup = this.tbody.children('tr:eq(' + group.index() + ')').nextAll('tr');
                    }
                }
                level = group.find('.k-group-cell').length;
                group.find('.k-i-collapse').addClass('k-i-expand').removeClass('k-i-collapse');
                group.find('td[aria-expanded=\'true\']:first').attr('aria-expanded', false);
                group = group.nextAll('tr');
                var toHide = [];
                for (idx = 0, length = group.length; idx < length; idx++) {
                    tr = group.eq(idx);
                    offset = tr.find('.k-group-cell').length;
                    if (tr.hasClass('k-grouping-row')) {
                        footerCount++;
                    } else if (tr.hasClass('k-group-footer')) {
                        footerCount--;
                    }
                    if (offset <= level || tr.hasClass('k-group-footer') && footerCount < 0) {
                        break;
                    }
                    if (relatedGroup.length) {
                        toHide.push(relatedGroup[idx]);
                    }
                    toHide.push(tr[0]);
                }
                $(toHide).hide();
            },
            expandGroup: function(group) {
                group = $(group);
                var that = this,
                    showFooter = that.options.groupable.showFooter,
                    level, tr, offset, relatedGroup = $(),
                    idx, length, footersVisibility = [],
                    groupsCount = 1;
                if (this._isLocked()) {
                    if (!group.closest('div').hasClass('k-grid-content-locked')) {
                        relatedGroup = group.nextAll('tr');
                        group = this.lockedTable.find('>tbody>tr:eq(' + group.index() + ')');
                    } else {
                        relatedGroup = this.tbody.children('tr:eq(' + group.index() + ')').nextAll('tr');
                    }
                }
                level = group.find('.k-group-cell').length;
                group.find('.k-i-expand').addClass('k-i-collapse').removeClass('k-i-expand');
                group.find('td[aria-expanded=\'false\']:first').attr('aria-expanded', true);
                group = group.nextAll('tr');
                for (idx = 0, length = group.length; idx < length; idx++) {
                    tr = group.eq(idx);
                    offset = tr.find('.k-group-cell').length;
                    if (offset <= level) {
                        break;
                    }
                    if (offset == level + 1 && !tr.hasClass('k-detail-row')) {
                        tr.show();
                        relatedGroup.eq(idx).show();
                        if (tr.hasClass('k-grouping-row') && tr.find('.k-icon').hasClass('k-i-collapse')) {
                            that.expandGroup(tr);
                        }
                        if (tr.hasClass('k-master-row') && tr.find('.k-icon').hasClass('k-minus')) {
                            tr.next().show();
                            relatedGroup.eq(idx + 1).show();
                        }
                    }
                    if (tr.hasClass('k-grouping-row')) {
                        if (showFooter) {
                            footersVisibility.push(tr.is(':visible'));
                        }
                        groupsCount++;
                    }
                    if (tr.hasClass('k-group-footer')) {
                        if (showFooter) {
                            tr.toggle(footersVisibility.pop());
                        }
                        if (groupsCount == 1) {
                            tr.show();
                            relatedGroup.eq(idx).show();
                        } else {
                            groupsCount--;
                        }
                    }
                }
            },
            _updateHeader: function(groups) {
                var that = this,
                    container = that._isLocked() ? that.lockedHeader.find('thead') : that.thead,
                    filterCells = container.find('tr.k-filter-row').find('th.k-group-cell').length,
                    length = container.find('tr:first').find('th.k-group-cell').length,
                    rows = container.children('tr:not(:first)').filter(function() {
                        return !$(this).children(':visible').length;
                    });
                if (groups > length) {
                    $(new Array(groups - length + 1).join('<th class="k-group-cell k-header" scope="col">&nbsp;</th>')).prependTo(container.children('tr:not(.k-filter-row)'));
                    if (that.element.is(':visible')) {
                        rows.find('th.k-group-cell').hide();
                    }
                } else if (groups < length) {
                    container.find('tr').each(function() {
                        $(this).find('th.k-group-cell').filter(':eq(' + groups + '),' + ':gt(' + groups + ')').remove();
                    });
                }
                if (groups > filterCells) {
                    $(new Array(groups - filterCells + 1).join('<th class="k-group-cell k-header" scope="col">&nbsp;</th>')).prependTo(container.find('.k-filter-row'));
                }
            },
            _firstDataItem: function(data, grouped) {
                if (data && grouped) {
                    if (data.hasSubgroups) {
                        data = this._firstDataItem(data.items[0], grouped);
                    } else {
                        data = data.items[0];
                    }
                }
                return data;
            },
            _updateTablesWidth: function() {
                var that = this,
                    tables;
                if (!that._isLocked()) {
                    return;
                }
                tables = $('>.k-grid-footer>.k-grid-footer-wrap>table', that.wrapper).add(that.thead.parent()).add(that.table);
                that._footerWidth = tableWidth(tables.eq(0));
                tables.width(that._footerWidth);
                tables = $('>.k-grid-footer>.k-grid-footer-locked>table', that.wrapper).add(that.lockedHeader.find('>table')).add(that.lockedTable);
                tables.width(tableWidth(tables.eq(0)));
            },
            hideColumn: function(column) {
                var that = this,
                    cell, tables, idx, cols, colWidth, position, width = 0,
                    headerCellIndex, length, footer = that.footer || that.wrapper.find('.k-grid-footer'),
                    columns = that.columns,
                    visibleLocked = that.lockedHeader ? leafDataCells(that.lockedHeader.find('>table>thead')).filter(isCellVisible).length : 0,
                    columnIndex;
                if (typeof column == 'number') {
                    column = columns[column];
                } else if (isPlainObject(column)) {
                    column = grep(flatColumns(columns), function(item) {
                        return item === column;
                    })[0];
                } else {
                    column = grep(flatColumns(columns), function(item) {
                        return item.field === column;
                    })[0];
                }
                if (!column || !isVisible(column)) {
                    return;
                }
                if (column.columns && column.columns.length) {
                    position = columnVisiblePosition(column, columns);
                    setColumnVisibility(column, false);
                    setCellVisibility(elements($('>table>thead', that.lockedHeader), that.thead, '>tr:eq(' + position.row + ')>th'), position.cell, false);
                    for (idx = 0; idx < column.columns.length; idx++) {
                        this.hideColumn(column.columns[idx]);
                    }
                    that.trigger(COLUMNHIDE, {
                        column: column
                    });
                    return;
                }
                columnIndex = inArray(column, visibleColumns(leafColumns(columns)));
                setColumnVisibility(column, false);
                that._setParentsVisibility(column, false);
                that._templates();
                that._updateCols();
                that._updateLockedCols();
                var container = that.thead;
                headerCellIndex = columnIndex;
                if (that.lockedHeader && visibleLocked > columnIndex) {
                    container = that.lockedHeader.find('>table>thead');
                } else {
                    headerCellIndex -= visibleLocked;
                }
                cell = leafDataCells(container).filter(isCellVisible).eq(headerCellIndex);
                cell[0].style.display = 'none';
                setCellVisibility(elements($('>table>thead', that.lockedHeader), that.thead, '>tr.k-filter-row>th'), columnIndex, false);
                if (footer[0]) {
                    that._updateCols(footer.find('>.k-grid-footer-wrap>table'));
                    that._updateLockedCols(footer.find('>.k-grid-footer-locked>table'));
                    setCellVisibility(footer.find('.k-footer-template>td'), columnIndex, false);
                }
                if (that.lockedTable && visibleLocked > columnIndex) {
                    hideColumnCells(that.lockedTable.find('>tbody>tr'), columnIndex);
                } else {
                    hideColumnCells(that.tbody.children(), columnIndex - visibleLocked);
                }
                if (that.lockedTable) {
                    that._updateTablesWidth();
                    that._applyLockedContainersWidth();
                    that._syncLockedContentHeight();
                    that._syncLockedHeaderHeight();
                    that._syncLockedFooterHeight();
                } else {
                    cols = that.thead.prev().find('col');
                    for (idx = 0, length = cols.length; idx < length; idx += 1) {
                        colWidth = cols[idx].style.width;
                        if (colWidth && colWidth.indexOf('%') == -1) {
                            width += parseInt(colWidth, 10);
                        } else {
                            width = 0;
                            break;
                        }
                    }
                    tables = $('>.k-grid-header table:first,>.k-grid-footer table:first', that.wrapper).add(that.table);
                    that._footerWidth = null;
                    if (width) {
                        tables.each(function() {
                            this.style.width = width + 'px';
                        });
                        that._footerWidth = width;
                    }
                    if (browser.msie && browser.version == 8) {
                        tables.css('display', 'inline-table');
                        setTimeout(function() {
                            tables.css('display', 'table');
                        }, 1);
                    }
                }
                that._updateFirstColumnClass();
                that.trigger(COLUMNHIDE, {
                    column: column
                });
            },
            _setParentsVisibility: function(column, visible) {
                var columns = this.columns;
                var idx;
                var parents = [];
                var parent;
                var position;
                var cell;
                var colSpan;
                var predicate = visible ? function(p) {
                    return visibleColumns(p.columns).length && p.hidden;
                } : function(p) {
                    return !visibleColumns(p.columns).length && !p.hidden;
                };
                if (columnParents(column, columns, parents) && parents.length) {
                    for (idx = parents.length - 1; idx >= 0; idx--) {
                        parent = parents[idx];
                        position = columnPosition(parent, columns);
                        cell = elements($('>table>thead', this.lockedHeader), this.thead, '>tr:eq(' + position.row + ')>th:not(.k-group-cell):not(.k-hierarchy-cell)').eq(position.cell);
                        if (predicate(parent)) {
                            setColumnVisibility(parent, visible);
                            cell[0].style.display = visible ? '' : 'none';
                        }
                        if (cell.filter('[' + kendo.attr('colspan') + ']').length) {
                            colSpan = parseInt(cell.attr(kendo.attr('colspan')), 10);
                            cell[0].colSpan = colSpan - hiddenLeafColumnsCount(parent.columns) || 1;
                        }
                    }
                }
            },
            showColumn: function(column) {
                var that = this,
                    idx, length, cell, tables, width, headerCellIndex, position, colWidth, cols, columns = that.columns,
                    footer = that.footer || that.wrapper.find('.k-grid-footer'),
                    lockedColumnsCount = that.lockedHeader ? leafDataCells(that.lockedHeader.find('>table>thead')).length : 0,
                    columnIndex;
                if (typeof column == 'number') {
                    column = columns[column];
                } else if (isPlainObject(column)) {
                    column = grep(flatColumns(columns), function(item) {
                        return item === column;
                    })[0];
                } else {
                    column = grep(flatColumns(columns), function(item) {
                        return item.field === column;
                    })[0];
                }
                if (!column || isVisible(column)) {
                    return;
                }
                if (column.columns && column.columns.length) {
                    position = columnPosition(column, columns);
                    setColumnVisibility(column, true);
                    setCellVisibility(elements($('>table>thead', that.lockedHeader), that.thead, '>tr:eq(' + position.row + ')>th'), position.cell, true);
                    for (idx = 0; idx < column.columns.length; idx++) {
                        this.showColumn(column.columns[idx]);
                    }
                    that.trigger(COLUMNSHOW, {
                        column: column
                    });
                    return;
                }
                columnIndex = inArray(column, leafColumns(columns));
                setColumnVisibility(column, true);
                that._setParentsVisibility(column, true);
                that._templates();
                that._updateCols();
                that._updateLockedCols();
                var container = that.thead;
                headerCellIndex = columnIndex;
                if (that.lockedHeader && lockedColumnsCount > columnIndex) {
                    container = that.lockedHeader.find('>table>thead');
                } else {
                    headerCellIndex -= lockedColumnsCount;
                }
                cell = leafDataCells(container).eq(headerCellIndex);
                cell[0].style.display = '';
                setCellVisibility(elements($('>table>thead', that.lockedHeader), that.thead, '>tr.k-filter-row>th'), columnIndex, true);
                if (footer[0]) {
                    that._updateCols(footer.find('>.k-grid-footer-wrap>table'));
                    that._updateLockedCols(footer.find('>.k-grid-footer-locked>table'));
                    setCellVisibility(footer.find('.k-footer-template>td'), columnIndex, true);
                }
                if (that.lockedTable && lockedColumnsCount > columnIndex) {
                    showColumnCells(that.lockedTable.find('>tbody>tr'), columnIndex);
                } else {
                    showColumnCells(that.tbody.children(), columnIndex - lockedColumnsCount);
                }
                if (that.lockedTable) {
                    that._updateTablesWidth();
                    that._applyLockedContainersWidth();
                    that._syncLockedContentHeight();
                    that._syncLockedHeaderHeight();
                } else {
                    tables = $('>.k-grid-header table:first,>.k-grid-footer table:first', that.wrapper).add(that.table);
                    if (!column.width) {
                        tables.width('');
                    } else {
                        width = 0;
                        cols = that.thead.prev().find('col');
                        for (idx = 0, length = cols.length; idx < length; idx += 1) {
                            colWidth = cols[idx].style.width;
                            if (colWidth.indexOf('%') > -1) {
                                width = 0;
                                break;
                            }
                            width += parseInt(colWidth, 10);
                        }
                        that._footerWidth = null;
                        if (width) {
                            tables.each(function() {
                                this.style.width = width + 'px';
                            });
                            that._footerWidth = width;
                        }
                    }
                }
                that._updateFirstColumnClass();
                that.trigger(COLUMNSHOW, {
                    column: column
                });
            },
            _progress: function(toggle) {
                var element = this.element;
                if (this.lockedContent) {
                    element = this.wrapper;
                } else if (this.element.is('table')) {
                    element = this.element.parent();
                } else if (this.content && this.content.length) {
                    element = this.content;
                }
                kendo.ui.progress(element, toggle);
            },
            _resize: function(size, force) {
                this._syncLockedHeaderHeight();
                if (this.content) {
                    this._setContentWidth();
                    this._setContentHeight();
                }
                if (this.virtualScrollable && (force || this._rowHeight)) {
                    if (force) {
                        this._rowHeight = null;
                    }
                    this.virtualScrollable.repaintScrollbar();
                }
            },
            _isActiveInTable: function() {
                var active = activeElement();
                if (!active) {
                    return false;
                }
                return this.table[0] === active || $.contains(this.table[0], active) || this._isLocked() && (this.lockedTable[0] === active || $.contains(this.lockedTable[0], active));
            },
            refresh: function(e) {
                var that = this,
                    data = that.dataSource.view(),
                    navigatable = that.options.navigatable,
                    currentIndex, current = $(that.current()),
                    isCurrentInHeader = false,
                    groups = (that.dataSource.group() || []).length,
                    offsetLeft = that.content && that.content.scrollLeft(),
                    colspan = groups + visibleLeafColumns(visibleColumns(that.columns)).length;
                if (e && e.action === 'itemchange' && that.editable) {
                    return;
                }
                e = e || {};
                if (that.trigger('dataBinding', {
                        action: e.action || 'rebind',
                        index: e.index,
                        items: e.items
                    })) {
                    return;
                }
                that._angularItems('cleanup');
                if (navigatable && (that._isActiveInTable() || that._editContainer && that._editContainer.data('kendoWindow'))) {
                    isCurrentInHeader = current.is('th');
                    currentIndex = Math.max(that.cellIndex(current), 0);
                }
                that._destroyEditable();
                that._progress(false);
                that._hideResizeHandle();
                that._data = [];
                if (!that.columns.length) {
                    that._autoColumns(that._firstDataItem(data[0], groups));
                    colspan = groups + that.columns.length;
                }
                that._group = groups > 0 || that._group;
                if (that._group) {
                    that._templates();
                    that._updateCols();
                    that._updateLockedCols();
                    that._updateHeader(groups);
                    that._group = groups > 0;
                }
                that._renderContent(data, colspan, groups);
                that._renderLockedContent(data, colspan, groups);
                that._footer();
                that._renderNoRecordsContent();
                that._setContentHeight();
                that._setContentWidth(offsetLeft);
                if (that.lockedTable) {
                    if (that.options.scrollable.virtual) {
                        that.content.find('>.k-virtual-scrollable-wrap').trigger('scroll');
                    } else if (that.touchScroller) {
                        that.touchScroller.movable.trigger('change');
                    } else {
                        that.wrapper.one('scroll', function(e) {
                            e.stopPropagation();
                        });
                        that.content.trigger('scroll');
                    }
                }
                that._restoreCurrent(currentIndex, isCurrentInHeader);
                if (that.touchScroller) {
                    that.touchScroller.contentResized();
                }
                if (that.selectable) {
                    that.selectable.resetTouchEvents();
                }
                that._muteAngularRebind(function() {
                    that._angularItems('compile');
                });
                that.trigger(DATABOUND);
            },
            _restoreCurrent: function(currentIndex, isCurrentInHeader) {
                if (currentIndex === undefined || currentIndex < 0) {
                    return;
                }
                this._removeCurrent();
                if (isCurrentInHeader) {
                    this._setCurrent(this.thead.find('th:not(.k-group-cell)').eq(currentIndex));
                } else {
                    var rowIndex = 0;
                    if (this._rowVirtualIndex) {
                        rowIndex = this.virtualScrollable.position(this._rowVirtualIndex);
                    } else {
                        currentIndex = 0;
                    }
                    var row = $();
                    if (this.lockedTable) {
                        row = this.lockedTable.find('>tbody>tr').eq(rowIndex);
                    }
                    row = row.add(this.tbody.children().eq(rowIndex));
                    var td = row.find('>td:not(.k-group-cell):not(.k-hierarchy-cell)').eq(currentIndex);
                    this._setCurrent(td);
                }
                if (this._current) {
                    focusTable(this._current.closest('table')[0], true);
                }
            },
            _angularItems: function(cmd) {
                kendo.ui.DataBoundWidget.fn._angularItems.call(this, cmd);
                if (cmd === 'cleanup') {
                    this._cleanupDetailItems();
                }
                this._angularGroupItems(cmd);
                this._angularGroupFooterItems(cmd);
            },
            _cleanupDetailItems: function() {
                var that = this;
                if (that._hasDetails()) {
                    that.angular('cleanup', function() {
                        return {
                            elements: that.tbody.children('.k-detail-row')
                        };
                    });
                    that.tbody.find('.k-detail-cell').empty();
                }
            },
            _angularGroupItems: function(cmd) {
                var that = this,
                    container = that.tbody;
                if (that.lockedContent) {
                    container = that.lockedTable.find('tbody');
                }
                if (that._group) {
                    that.angular(cmd, function() {
                        return {
                            elements: container.children('.k-grouping-row'),
                            data: $.map(groupRows(that.dataSource.view()), function(dataItem) {
                                return {
                                    dataItem: dataItem
                                };
                            })
                        };
                    });
                }
            },
            _angularGroupFooterItems: function(cmd) {
                var that = this,
                    container = that.tbody;
                if (that.lockedContent) {
                    container = that.element;
                }
                if (that._group && that.groupFooterTemplate) {
                    that.angular(cmd, function() {
                        return {
                            elements: container.find('.k-group-footer'),
                            data: $.map(groupFooters(that.dataSource.view()), function(dataItem) {
                                return {
                                    dataItem: dataItem
                                };
                            })
                        };
                    });
                }
            },
            _renderContent: function(data, colspan, groups) {
                var that = this,
                    idx, length, html = '',
                    isLocked = that.lockedContent != null,
                    templates = {
                        rowTemplate: that.rowTemplate,
                        altRowTemplate: that.altRowTemplate,
                        groupFooterTemplate: that.groupFooterTemplate
                    };
                colspan = isLocked ? colspan - visibleLeafColumns(visibleLockedColumns(that.columns)).length : colspan;
                if (groups > 0) {
                    colspan = isLocked ? colspan - groups : colspan;
                    if (that.detailTemplate) {
                        colspan++;
                    }
                    if (that.groupFooterTemplate) {
                        that._groupAggregatesDefaultObject = that.dataSource.aggregates();
                    }
                    for (idx = 0, length = data.length; idx < length; idx++) {
                        html += that._groupRowHtml(data[idx], colspan, 0, isLocked ? groupRowLockedContentBuilder : groupRowBuilder, templates, isLocked);
                    }
                } else {
                    html += that._rowsHtml(data, templates);
                }
                that.tbody = appendContent(that.tbody, that.table, html, this.options.$angular);
            },
            _renderLockedContent: function(data, colspan, groups) {
                var html = '',
                    idx, length, templates = {
                        rowTemplate: this.lockedRowTemplate,
                        altRowTemplate: this.lockedAltRowTemplate,
                        groupFooterTemplate: this.lockedGroupFooterTemplate
                    };
                if (this.lockedContent) {
                    var table = this.lockedTable;
                    if (groups > 0) {
                        colspan = colspan - visibleColumns(leafColumns(nonLockedColumns(this.columns))).length;
                        for (idx = 0, length = data.length; idx < length; idx++) {
                            html += this._groupRowHtml(data[idx], colspan, 0, groupRowBuilder, templates);
                        }
                    } else {
                        html = this._rowsHtml(data, templates);
                    }
                    appendContent(table.children('tbody'), table, html, this.options.$angular);
                    this._syncLockedContentHeight();
                }
            },
            _adjustRowsHeight: function(table1, table2) {
                var rows = table1[0].rows,
                    length = rows.length,
                    idx, rows2 = table2[0].rows,
                    containers = table1.add(table2),
                    containersLength = containers.length,
                    heights = [];
                for (idx = 0; idx < length; idx++) {
                    if (!rows2[idx]) {
                        break;
                    }
                    if (rows[idx].style.height) {
                        rows[idx].style.height = rows2[idx].style.height = '';
                    }
                    var offsetHeight1 = rows[idx].offsetHeight;
                    var offsetHeight2 = rows2[idx].offsetHeight;
                    var height = 0;
                    if (offsetHeight1 > offsetHeight2) {
                        height = offsetHeight1;
                    } else if (offsetHeight1 < offsetHeight2) {
                        height = offsetHeight2;
                    }
                    heights.push(height);
                }
                for (idx = 0; idx < containersLength; idx++) {
                    containers[idx].style.display = 'none';
                }
                for (idx = 0; idx < length; idx++) {
                    if (heights[idx]) {
                        rows[idx].style.height = rows2[idx].style.height = heights[idx] + 1 + 'px';
                    }
                }
                for (idx = 0; idx < containersLength; idx++) {
                    containers[idx].style.display = '';
                }
            }
        });
        if (kendo.ExcelMixin) {
            kendo.ExcelMixin.extend(Grid.prototype);
        }
        if (kendo.PDFMixin) {
            kendo.PDFMixin.extend(Grid.prototype);
            Grid.prototype._drawPDF = function(progress) {
                var result = new $.Deferred();
                var grid = this;
                var dataSource = grid.dataSource;
                var allPages = grid.options.pdf.allPages;
                this._initPDFProgress(progress);
                var doc = new kendo.drawing.Group();
                var startingPage = dataSource.page();

                function resolve() {
                    if (allPages && startingPage !== undefined) {
                        dataSource.unbind('change', exportPage);
                        dataSource.one('change', function() {
                            result.resolve(doc);
                        });
                        dataSource.page(startingPage);
                    } else {
                        result.resolve(doc);
                    }
                }

                function exportPage() {
                    grid._drawPDFShadow({
                        width: grid.wrapper.width()
                    }, {
                        avoidLinks: grid.options.pdf.avoidLinks
                    }).done(function(group) {
                        var pageNum = dataSource.page();
                        var totalPages = allPages ? dataSource.totalPages() : 1;
                        var args = {
                            page: group,
                            pageNumber: pageNum,
                            progress: pageNum / totalPages,
                            totalPages: totalPages
                        };
                        progress.notify(args);
                        doc.append(args.page);
                        if (pageNum < totalPages) {
                            dataSource.page(pageNum + 1);
                        } else {
                            resolve();
                        }
                    }).fail(function(err) {
                        result.reject(err);
                    });
                }
                if (allPages) {
                    dataSource.bind('change', exportPage);
                    dataSource.page(1);
                } else {
                    exportPage();
                }
                return result.promise();
            };
            Grid.prototype._initPDFProgress = function(deferred) {
                var loading = $('<div class=\'k-loading-pdf-mask\'><div class=\'k-loading-color\'/></div>');
                loading.prepend(this.wrapper.clone().css({
                    position: 'absolute',
                    top: 0,
                    left: 0
                }));
                this.wrapper.append(loading);
                var pb = $('<div class=\'k-loading-pdf-progress\'>').appendTo(loading).kendoProgressBar({
                    type: 'chunk',
                    chunkCount: 10,
                    min: 0,
                    max: 1,
                    value: 0
                }).data('kendoProgressBar');
                deferred.progress(function(e) {
                    pb.value(e.progress);
                }).always(function() {
                    kendo.destroy(loading);
                    loading.remove();
                });
            };
        }

        function syncTableHeight(table1, table2) {
            table1 = table1[0];
            table2 = table2[0];
            if (table1.rows.length !== table2.rows.length) {
                var lockedHeigth = table1.offsetHeight;
                var tableHeigth = table2.offsetHeight;
                var row;
                var diff;
                if (lockedHeigth > tableHeigth) {
                    row = table2.rows[table2.rows.length - 1];
                    if (filterRowRegExp.test(row.className)) {
                        row = table2.rows[table2.rows.length - 2];
                    }
                    diff = lockedHeigth - tableHeigth;
                } else {
                    row = table1.rows[table1.rows.length - 1];
                    if (filterRowRegExp.test(row.className)) {
                        row = table1.rows[table1.rows.length - 2];
                    }
                    diff = tableHeigth - lockedHeigth;
                }
                row.style.height = row.offsetHeight + diff + 'px';
            }
        }

        function adjustRowHeight(row1, row2) {
            var height;
            var offsetHeight1 = row1.offsetHeight;
            var offsetHeight2 = row2.offsetHeight;
            if (offsetHeight1 > offsetHeight2) {
                height = offsetHeight1 + 'px';
            } else if (offsetHeight1 < offsetHeight2) {
                height = offsetHeight2 + 'px';
            }
            if (height) {
                row1.style.height = row2.style.height = height;
            }
        }

        function getCommand(commands, name) {
            var idx, length, command;
            if (typeof commands === STRING && commands === name) {
                return commands;
            }
            if (isPlainObject(commands) && commands.name === name) {
                return commands;
            }
            if (isArray(commands)) {
                for (idx = 0, length = commands.length; idx < length; idx++) {
                    command = commands[idx];
                    if (typeof command === STRING && command === name || command.name === name) {
                        return command;
                    }
                }
            }
            return null;
        }

        function focusTable(table, direct) {
            var msie = browser.msie || browser.edge;
            if (direct === true) {
                table = $(table);
                var scrollTop, scrollLeft;
                scrollTop = table.parent().scrollTop();
                scrollLeft = table.parent().scrollLeft();
                if (msie) {
                    try {
                        table[0].setActive();
                    } catch (e) {
                        table[0].focus();
                    }
                } else {
                    table[0].focus();
                }
                table.parent().scrollTop(scrollTop).scrollLeft(scrollLeft);
            } else {
                $(table).one('focusin', function(e) {
                    e.preventDefault();
                }).focus();
            }
        }

        function isInputElement(element) {
            return $(element).is(':button,a,:input,a>.k-icon,textarea,span.k-select,span.k-icon,span.k-link,.k-input,.k-multiselect-wrap,.k-tool-icon');
        }

        function tableClick(e) {
            var currentTarget = $(e.currentTarget),
                isHeader = currentTarget.is('th'),
                table = this.table.add(this.lockedTable),
                headerTable = this.thead.parent().add($('>table', this.lockedHeader)),
                isInput = isInputElement(e.target),
                currentTable = currentTarget.closest('table')[0];
            if (kendo.support.touch) {
                return;
            }
            if (isInput && currentTarget.find(kendo.roleSelector('filtercell')).length) {
                this._setCurrent(currentTarget);
                return;
            }
            if (currentTable !== table[0] && currentTable !== table[1] && currentTable !== headerTable[0] && currentTable !== headerTable[1]) {
                return;
            }
            if ($(e.target).is('a.k-i-collapse, a.k-i-expand')) {
                return;
            }
            if (this.options.navigatable) {
                this._setCurrent(currentTarget);
            }
            if (isHeader || !isInput) {
                setTimeout(function() {
                    if (!(isIE8 && $(kendo._activeElement()).hasClass('k-widget'))) {
                        if (!isInputElement(kendo._activeElement())) {
                            focusTable(currentTable, true);
                        }
                    }
                });
            }
            if (isHeader) {
                e.preventDefault();
            }
        }

        function isInEdit(cell) {
            return cell && (cell.hasClass('k-edit-cell') || cell.parent().hasClass('k-grid-edit-row'));
        }

        function groupRowBuilder(colspan, level, text) {
            return '<tr role="row" class="k-grouping-row">' + groupCells(level) + '<td colspan="' + colspan + '" aria-expanded="true">' + '<p class="k-reset">' + '<a class="k-icon k-i-collapse" href="#" tabindex="-1"></a>' + text + '</p></td></tr>';
        }

        function groupRowLockedContentBuilder(colspan) {
            return '<tr role="row" class="k-grouping-row">' + '<td colspan="' + colspan + '" aria-expanded="true">' + '<p class="k-reset">&nbsp;</p></td></tr>';
        }
        ui.plugin(Grid);
        ui.plugin(VirtualScrollable);
    }(window.kendo.jQuery));
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3) {
    (a3 || a2)();
}));