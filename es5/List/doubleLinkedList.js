'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _iterator3 = require('babel-runtime/core-js/symbol/iterator');

var _iterator4 = _interopRequireDefault(_iterator3);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 循环链表（circular linked list）
 * 是另一种形式的链式存储结构。它的特点是表中最后一个结点的指针域指向头结点，整个表形成一个环。
 * 循环链表的操作和线性链表基本一致，仅有细微差别。
 */

/**
 * 双向链表
 *
 * 双向链表是为了克服单链表这种单向性的缺点。
 * 双向链表的结点中有两个指针域，其一指向直接后继，另一指向直接前趋。
 *
 * 双向链表也可以有循环表。
 */

var Node = function Node(data) {
    var prev = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var next = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    (0, _classCallCheck3.default)(this, Node);

    this.data = data;
    this.prev = prev;
    this.next = next;
};

function defaultCompare(a, b) {
    return a === b;
}

var DoubleLinkedList = function () {
    function DoubleLinkedList(sqList) {
        var compare = arguments.length <= 1 || arguments[1] === undefined ? defaultCompare : arguments[1];
        (0, _classCallCheck3.default)(this, DoubleLinkedList);

        this.head = null;
        this.tail = null;
        this.size = 0;
        this.compare = compare;

        if (sqList && sqList.length) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(sqList), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    this.push(item);
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
        }
    }

    (0, _createClass3.default)(DoubleLinkedList, [{
        key: _iterator4.default,
        value: _regenerator2.default.mark(function value() {
            var current;
            return _regenerator2.default.wrap(function value$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            current = this.head;

                        case 1:
                            if (!current) {
                                _context.next = 7;
                                break;
                            }

                            _context.next = 4;
                            return current.data;

                        case 4:

                            current = current.next;
                            _context.next = 1;
                            break;

                        case 7:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, value, this);
        })
    }, {
        key: 'clear',
        value: function clear() {
            this.head = null;
            this.tail = null;
            this.size = 0;

            return true;
        }
    }, {
        key: 'push',
        value: function push(data) {
            if (typeof data === 'undefined') throw new Error('data argument required');

            ++this.size;

            if (!this.head) {
                this.head = this.tail = new Node(data);
            } else {
                var node = new Node(data, this.tail, null);
                this.tail.next = node;
                this.tail = node;
            }

            return data;
        }
    }, {
        key: 'unshift',
        value: function unshift(data) {
            if (typeof data === 'undefined') throw new Error('data argument required');

            ++this.size;

            if (!this.head) {
                this.head = this.tail = new Node(data);
            } else {
                var node = new Node(data, null, this.head);
                this.head.prev = node;
                this.head = node;
            }

            return data;
        }
    }, {
        key: 'pop',
        value: function pop() {
            if (!this.tail) {
                this.head = this.tail = null;
                return;
            }

            --this.size;

            this.tail.prev.next = null;
            this.tail = this.tail.prev;
        }
    }, {
        key: 'shift',
        value: function shift() {
            if (!this.head) {
                this.head = this.tail = null;
                return;
            }

            --this.size;

            this.head.next.prev = null;
            this.head = this.head.next;
        }
    }, {
        key: 'update',
        value: function update(index, data) {
            var node = this.findByIndex(index, true);
            node.data = data;
            return this;
        }
    }, {
        key: 'remove',
        value: function remove(data) {
            if (typeof data === 'function') throw new Error('data argument required');

            var current = this.head;

            while (current) {
                if (this.compare(data, current.data)) {
                    --this.size;

                    if (current === this.head) {
                        this.head = this.head.next;

                        if (this.head) {
                            this.head.prev = null;
                        } else {
                            this.head = this.tail = null;
                        }
                    } else if (current === this.tail) {
                        this.tail = this.tail.prev;

                        if (this.tail) {
                            this.tail.next = null;
                        } else {
                            this.head = this.tail = null;
                        }
                    } else {
                        current.prev.next = current.next;
                        current.next.prev = current.prev;
                    }

                    return current.data;
                }

                current = current.next;
            }

            return false;
        }
    }, {
        key: 'indexOf',
        value: function indexOf(data) {
            var current = this.head;
            var index = -1;

            while (current) {
                ++index;
                if (this.compare(data, current.data)) return index;

                current = current.next;
            }

            return -1;
        }
    }, {
        key: 'findByIndex',
        value: function findByIndex() {
            var index = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var returnNode = arguments[1];

            var current = this.head;
            var j = 0;

            while (current) {
                if (j++ === index) break;

                current = current.next;
            }

            return returnNode ? current : current.data;
        }
    }, {
        key: 'forEach',
        value: function forEach() {
            var cb = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            if (typeof cb !== 'function') throw new Error('argument should be a function');

            var current = this.head;

            while (current) {
                cb(current.data);

                current = current.next;
            }
        }
    }, {
        key: 'toJSON',
        value: function toJSON() {
            var list = [];
            var current = this.head;

            while (current) {
                list.push(current.data);

                current = current.next;
            }

            return list;
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.toJSON() + '';
        }
    }, {
        key: 'length',
        get: function get() {
            return this.size;
        }
    }]);
    return DoubleLinkedList;
}();

exports.default = DoubleLinkedList;


var a = new DoubleLinkedList([2, 3]);
a.unshift(1);
a.push(4);
console.log(a.indexOf(4));
console.log(a.findByIndex(2));

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
    for (var _iterator2 = (0, _getIterator3.default)(a), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var item = _step2.value;

        console.log(item);
    }
} catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
} finally {
    try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
        }
    } finally {
        if (_didIteratorError2) {
            throw _iteratorError2;
        }
    }
}

a.pop();
a.shift();
a.remove(2);
a.remove(32);
a.remove(3);