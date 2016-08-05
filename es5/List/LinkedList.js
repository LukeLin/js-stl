'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _iterator = require('babel-runtime/core-js/symbol/iterator');

var _iterator2 = _interopRequireDefault(_iterator);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 由于链表在空间的合理利用上和插入，删除时不需要移动等的有点，因此在很多场合下，它是线性表的首选存储结构。然而，它也存在着实现某些基本操作，如求线性表长度时不如顺序存储结构的缺点；另一方面，由于在链表中，结点之间的关系使用指针来表示，则数据元素在线性表中的“位序”的概念已淡化，而被数据元素在线性链表中的“位置”所代替。为此，从实际出发重新定义线性链表及其基本操作
 */

var Node = function Node() {
    var data = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var next = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    (0, _classCallCheck3.default)(this, Node);

    this.data = data;
    this.next = next;
};

var LinkedList = function () {
    function LinkedList(sqList) {
        (0, _classCallCheck3.default)(this, LinkedList);

        this.head = null;
        this.tail = null;

        if (sqList) {
            for (var i = 0, len = sqList.length; i < len; ++i) {
                this.push(sqList[i]);
            }
        }
    }

    (0, _createClass3.default)(LinkedList, [{
        key: 'shift',


        // delete first element and return it
        value: function shift() {
            var head = this.head;
            this.head = this.head.next;
            head.next = null;

            if (this.head === null) this.tail = null;
            return head;
        }
    }, {
        key: 'pop',
        value: function pop() {
            var current = this.head;
            var previous = this.head;
            var elem = void 0;

            while (current !== null) {
                if (this.tail === current) {
                    if (current === this.head) {
                        elem = this.tail.data;
                        this.head = null;
                        break;
                    }

                    this.tail = previous;

                    previous.next = current.next;
                    elem = current.data;
                    break;
                }

                previous = current;
                current = current.next;
            }

            if (this.head === null) this.tail = null;

            return elem ? elem : false;
        }

        // append node

    }, {
        key: 'append',
        value: function append(node) {
            if (this.head !== null) {
                this.tail.next = node;
                this.tail = this.tail.next;
            } else {
                this.head = node;
                this.tail = node;
            }
        }

        // add data

    }, {
        key: 'push',
        value: function push(data) {
            if (this.head === null) {
                this.head = new Node(data);
                this.tail = this.head;
            } else {
                this.tail.next = new Node(data);
                this.tail = this.tail.next;
            }

            this.tail.data = data;
        }

        // remove data

    }, {
        key: 'remove',
        value: function remove(data) {
            var current = this.head;
            var previous = this.head;
            var elem = void 0;

            while (current !== null) {
                if (data === current.data) {
                    if (current === this.head) {
                        this.head = current.next;
                        elem = current.data;
                        break;
                    }

                    if (current === this.tail) this.tail = previous;

                    previous.next = current.next;
                    elem = current.data;
                    break;
                }

                previous = current;
                current = current.next;
            }

            if (this.head === null) this.tail = null;

            return elem ? elem : false;
        }
    }, {
        key: 'indexOf',
        value: function indexOf(data) {
            var current = this.head;
            var index = -1;
            while (current !== null) {
                ++index;
                if (current.data === data) {
                    return index;
                }

                current = current.next;
            }

            return index;
        }
    }, {
        key: 'unshift',
        value: function unshift(data) {
            var temp = new Node(data);
            temp.next = this.head;
            this.head = temp;
        }
    }, {
        key: 'insertAfter',
        value: function insertAfter(target, data) {
            var current = this.head;
            while (current !== null) {
                if (current.data === target) {
                    var temp = new Node(data);
                    temp.next = current.next;

                    if (current === this.tail) this.tail = temp;

                    current.next = temp;
                    return;
                }

                current = current.next;
            }
        }
    }, {
        key: 'item',
        value: function item(index) {
            var current = this.head;

            while (current !== null) {
                if (--index === 0) return current;

                current = current.next;
            }

            return null;
        }
    }, {
        key: 'each',
        value: function each(callback) {
            if (typeof callback !== 'function') return;

            for (var current = this.head; current; current = current.next) {
                if (callback(current)) break;
            }
        }
    }, {
        key: _iterator2.default,
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
        key: 'size',
        value: function size() {
            var current = this.head;
            var size = 0;

            while (current !== null) {
                ++size;
                current = current.next;
            }

            return size;
        }
    }, {
        key: 'toString',
        value: function toString() {
            var str = '';

            this.each(function (node) {
                str += node.data + (node.next ? ',' : '');
            });

            return str;
        }
    }, {
        key: 'orderInsert',
        value: function orderInsert(data, cmp) {
            cmp = typeof cmp === 'function' ? cmp : function (a, b) {
                if (a > b) return 1;else if (a === b) return 0;else return -1;
            };
            var previous = this.head;
            var current = this.head;

            if (current === null) {
                this.head = this.tail = new Node(data);
                return;
            }

            var me = this;
            while (current) {
                var ret = cmp(data, current.data);
                // 如果插入元素大于当前元素，准备下次遍历
                if (ret > 0) {
                    previous = current;
                    current = current.next;

                    // 如果等于，直接插入到后面
                } else if (ret === 0) {
                        return insertBetween(data, previous, current);

                        // 如果小于则插入到前节点和当前节点中
                        // 因为已经是排序了，所以不需要多余判断了
                    } else {
                            if (this.head === previous && previous === current) return this.unshift(data);else return insertBetween(data, previous, current);
                        }
            }

            // 插入到最后一个结点
            previous.next = new Node(data);
            this.tail = previous.next;

            function insertBetween(data, a, b) {
                if (a == b) {
                    if (a == me.head) return me.unshift(data);
                } else {
                    var temp = new Node(data);
                    temp.next = b;
                    a.next = temp;
                    return true;
                }
            }
        }

        // 删除元素递增排列的链表中值大于min，且小于max的所有元素

    }, {
        key: 'delete_between',
        value: function delete_between(min, max) {
            var p = this.head;

            // p是最后一个不大于min的元素
            while (p.next && p.next.data <= min) {
                p = p.next;
            } // 如果还有比min更大的元素
            var q = void 0;
            if (p.next) {
                q = p.next;
                // q是第一个不小于max的元素
                while (q && q.data < max) {
                    q = q.next;
                }p.next = q;
            }

            var last = q || p;
            while (last.next) {
                last = last.next;
            }this.tail = last;
        }

        // 删除元素递增排列的链表的重复元素

    }, {
        key: 'delete_equal',
        value: function delete_equal() {
            var p = this.head;
            var q = p.next;

            while (p.next) {
                // 当相邻两元素不相等时，p,q都向后移
                if (p.data !== q.data) {
                    p = p.next;
                    q = p.next;
                } else {
                    while (q.data === p.data) {
                        q = q.next;
                    } // 删除
                    p.next = q;
                    p = q;
                    q = p.next;
                }
            }
        }
    }, {
        key: 'reverse',
        value: function reverse() {
            var p = this.head;
            var q = p.next;
            var s = q.next;
            p.next = null;

            while (s.next) {
                q.next = p;
                p = q;
                q = s;
                s = s.next;
            }

            q.next = p;
            s.next = q;
            this.head = s;
        }
    }], [{
        key: 'mergeList',
        value: function mergeList(a, b) {
            var compare = arguments.length <= 2 || arguments[2] === undefined ? compFn : arguments[2];

            var ha = a.head;
            var hb = b.head;
            var pa = ha;
            var pb = hb;
            var c = new LinkedList();
            var q = void 0;

            while (pa && pb) {
                var data1 = pa.data;
                var data2 = pb.data;

                if (!compare(data1, data2)) {
                    // delete head node
                    q = a.shift();
                    // append the node to c linkedList
                    c.append(q);
                    pa = a.head;
                } else {
                    q = b.shift();
                    c.append(q);
                    pb = b.head;
                }
            }

            if (pa) c.append(pa);else c.append(pb);

            return c;
        }
    }]);
    return LinkedList;
}();

exports.default = LinkedList;


function compFn(a, b) {
    return a - b;
}

// 求元素递增排列的线性表A和B的元素的交集并存入C
function intersect(list, bList) {
    var cList = new LinkedList();

    var p = list.head;
    var q = bList.head;

    while (p && q) {
        if (p.data < q.data) p = p.next;else if (q.data > q.data) q = q.next;else {
            cList.push(q.data);
            p = p.next;
            q = q.next;
        }
    }

    return cList;
}

// 求元素递增排列的线性表A和B的元素的交集并存入回a
function intersect_true(list, bList) {
    var p = list.head;
    var q = bList.head;
    var pc = list.head;

    while (p && q) {
        if (p.data < q.data) p = p.next;else if (p.data > q.data) q = q.next;else {
            pc.data = p.data;
            p = p.next;
            q = q.next;

            if (!p || !q) {
                pc.next = null;
                list.tail = pc;
            } else pc = pc.next;
        }
    }

    pc.next = null;
    list.tail = pc;
}

// a，b，c的元素均是非递减排列
// 求a链表中非b链表和c链表的交集的元素。
function intersect_delete(list, b, c) {
    var p = b.head;
    var q = c.head;
    var r = list.head;

    while (p && q && r) {
        if (p.data < q.data) p = p.next;else if (p.data > q.data) q = q.next;else {
            // 确定待删除元素
            var elem = p.data;

            if (r.data === elem && r === list.head) {
                list.head = list.head.next;
            } else {
                // 确定最后一个小于elem的元素指针
                while (r.next && r.next.data < elem) {
                    r = r.next;
                }if (r.next.data === elem) {
                    var s = r.next;

                    // 确定第一个大于elem的元素指针
                    while (s && s.data === elem) {
                        s = s.next;
                    } // 删除r和s之间的元素
                    r.next = s;
                }
            }

            while (p && p.data === elem) {
                p = p.next;
            }while (q && q.data === elem) {
                q = q.next;
            }
        }
    }

    list.tail = r;
}

var list = new LinkedList();
list.push('b');
list.unshift('a');
list.insertAfter('b', 'c');
console.log(list.item(2));
console.log((0, _stringify2.default)(list));
list.each(function (node) {
    if (node.data === 'b') {
        console.log('get b in each');
    }
});
list.remove('c');
list.remove('a');
console.log(list);

var list2 = new LinkedList();
list2.push('c');
list2.unshift('d');
list2.insertAfter('d', 'b');
console.log((0, _stringify2.default)(list2));

var list3 = LinkedList.mergeList(list, list2);
console.log(list3);

var list = new LinkedList();

list.orderInsert(5);
list.orderInsert(2);
list.orderInsert(3);
list.orderInsert(1);
list.orderInsert(4);
list.orderInsert(4);
list.orderInsert(6);
list.orderInsert(6);
list.orderInsert(7);

list.delete_between(5, 8);
console.log('delete-between:  ');
console.log(list);

list.orderInsert(2);
list.orderInsert(3);
list.orderInsert(1);

list.delete_equal();
console.log(list);

list.reverse();
console.log(list);

var a = new LinkedList();
a.orderInsert(1);
a.orderInsert(3);
a.orderInsert(5);
a.orderInsert(7);
a.orderInsert(9);

var b = new LinkedList();
b.orderInsert(1);
b.orderInsert(5);
b.orderInsert(9);
b.orderInsert(13);
b.orderInsert(17);
console.log(intersect(a, b));

console.log(intersect_true(a, b));

a = new LinkedList();
a.orderInsert(1);
a.orderInsert(3);
a.orderInsert(5);
a.orderInsert(7);
a.orderInsert(9);

var test = new LinkedList();
test.orderInsert(1);
test.orderInsert(2);
test.orderInsert(3);
test.orderInsert(4);
test.orderInsert(5);
test.orderInsert(6);
test.orderInsert(9);

intersect_delete(test, a, b);
console.log(test);

var popTest = new LinkedList();
popTest.push(1);
popTest.push(2);
popTest.pop();
popTest.pop();