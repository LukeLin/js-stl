'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _iterator2 = require('babel-runtime/core-js/symbol/iterator');

var _iterator3 = _interopRequireDefault(_iterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _DoubleLinkedList = require('./DoubleLinkedList');

var _DoubleLinkedList2 = _interopRequireDefault(_DoubleLinkedList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LIMIT = 20; /**
                 * LRU( Least recently used )
                 */

var LRUCache = function () {
    function LRUCache(sqList) {
        var limit = arguments.length <= 1 || arguments[1] === undefined ? LIMIT : arguments[1];
        (0, _classCallCheck3.default)(this, LRUCache);

        this.limit = limit;
        sqList = sqList && sqList.length ? sqList && sqList.length.slice(0, this.limit) : [];
        this.__cache = new _DoubleLinkedList2.default(sqList, function (a, b) {
            return a.key === b.key;
        });
    }

    (0, _createClass3.default)(LRUCache, [{
        key: _iterator3.default,
        value: function value() {
            return (0, _getIterator3.default)(this.__cache);
        }
    }, {
        key: 'remove',
        value: function remove(key) {
            return this.__cache.remove({ key: key });
        }
    }, {
        key: 'clear',
        value: function clear() {
            return this.___cache.clear();
        }
    }, {
        key: 'get',
        value: function get(key) {
            var index = this.__cache.indexOf({ key: key });

            if (index >= 0) {
                var data = this.__cache.findByIndex(index);
                this.__cache.remove(data);
                this.__cache.unshift(data);

                return data;
            }

            return false;
        }
    }, {
        key: 'add',
        value: function add(key, value) {
            var data = this.get(key);
            if (data) {
                data.value = value;
            } else {
                if (this.size === this.limit) {
                    this.__cache.pop();
                }

                this.__cache.unshift({
                    key: key,
                    value: value
                });
            }
        }
    }, {
        key: 'toString',
        value: function toString() {
            var arr = [];
            this.__cache.forEach(function (data) {
                arr.push(data.key + ':' + data.value);
            });

            return arr.join(' > ');
        }
    }, {
        key: 'toJSON',
        value: function toJSON() {
            return this.__cache.toJSON();
        }
    }, {
        key: 'size',
        get: function get() {
            return this.__cache.size;
        }
    }]);
    return LRUCache;
}();

exports.default = LRUCache;


console.log('LRUCache');

var a = new LRUCache([], 3);
a.add('adam', 29);
a.add('john', 26);
a.add('angela', 24);
console.log(a + '');
a.get('john');
console.log(a + '');
a.add('zorro', 141);
console.log(a + '');
console.log(a.toJSON());

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = (0, _getIterator3.default)(a), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;

        console.log(item);
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

a.remove('zorro');
a.remove('john');
a.remove('angela');
console.log(a + '');

// test case:
// Input:
// 2,[add(2,1),add(1,1),add(2,3),add(4,1),get(1),get(2)]
// Expected:
// [ false, { key: 2, value: 3 } ]
console.log('add');

var b = new LRUCache([], 2);
b.add(2, 1);
b.add(1, 1);
b.add(2, 3);
b.add(4, 1);
console.log([b.get(1), b.get(2)]);

console.log('~add');

console.log('LRUCacheEnd');