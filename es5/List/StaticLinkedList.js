'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 静态单链表
/*
 有时可借用一维数组来描述线性链表，这就是线性表的静态单链表存储结构。
 在静态链表中，数组的一个分量表示一个结点，同时用游标（cur）代替指针指示结点在数组中的相对位置。
 数组的第0分量可看成头结点，其指针域指示链表的第一个结点。
 这种存储结构需要预先分配一个较大的空间，但在线性表的插入和删除操作时不需移动元素，
 仅需要修改指针，故仍具有链式存储结构的主要优点
 */

var StaticLinkedList = function () {
    function StaticLinkedList(MAXSIZE) {
        (0, _classCallCheck3.default)(this, StaticLinkedList);

        this[-1] = { cur: 0 };
        this.length = 0;
        this.MAXSIZE = MAXSIZE + 1 || 1000;
    }

    /**
     * 在静态单链线性表L中查找第1个值为e的元素，
     * 若找到，则返回它在L中的位序
     * @param data
     */


    (0, _createClass3.default)(StaticLinkedList, [{
        key: 'find',
        value: function find(data) {
            var i = this[0].cur;
            while (i && this[i].data !== data) {
                i = this[i].cur;
            }
            return i;
        }
        /**
         * 将一维数组中各分量链成一个备用链表
         * this[0].cur为头指针
         */

    }, {
        key: 'init',
        value: function init(len) {
            len = len ? len + 1 : this.MAXSIZE;
            for (var i = 0; i < len - 1; ++i) {
                this[i] = this[i] || { data: null, cur: null };
                this[i].cur = i + 1;
            }

            this[len - 1] = this[len - 1] || {};
            this[len - 1].cur = 0;
        }
        /**
         * 若备用链表非空，则返回分配的结点下标，反则返回0
         * @returns {*}
         */

    }, {
        key: 'malloc',
        value: function malloc() {
            var i = this[-1].cur;
            if (typeof this[-1].cur !== 'undefined') this[-1].cur = this[i].cur;
            return i;
        }
        /**
         * 将下标为k的空闲结点回收到备用链表
         * @param k
         */

    }, {
        key: 'free',
        value: function free(k) {
            this[k].cur = this[0].cur;
            this[0].cur = k;
        }
    }, {
        key: 'create',
        value: function create(sqList) {
            // 初始化备用空间
            this.init(sqList.length);
            // 生成s的头结点
            var s = this.malloc();
            // r指向s的当前最后结点
            var r = s;
            var m = sqList.length;

            // 建立集合A的链表
            for (var j = 0; j < m; ++j) {
                //分配结点
                var i = this.malloc();
                // 输入A元素的值
                this[i].data = sqList[j];
                // 插入到表尾
                this[r].cur = i;
                ++this.length;
                r = i;
            }
            // 尾结点的指针为空
            this[r].cur = 0;
        }

        // todo

    }, {
        key: 'add',
        value: function add(index, elem) {}
    }, {
        key: 'remove',
        value: function remove(index) {}
    }]);
    return StaticLinkedList;
}();

/**
 * 在一维数组中建立表示集合(A-B)U(B-A)
 * 的静态链表，s为其头指针。
 * @returns {*}
 */


exports.default = StaticLinkedList;
function difference(sllist, arr1, arr2) {
    // 初始化备用空间
    sllist.init();
    // 生成s的头结点
    var s = sllist.malloc();
    // r指向s的当前最后结点
    var r = s;
    // 删除A和B的元素个数
    var m = arr1.length;
    var n = arr2.length;

    // 建立集合A的链表
    for (var j = 0; j < m; ++j) {
        //分配结点
        var i = sllist.malloc();
        // 输入A元素的值
        sllist[i].data = arr1[j];
        // 插入到表尾
        sllist[r].cur = i;
        r = i;
    }
    // 尾结点的指针为空
    sllist[r].cur = 0;

    // 依次输入B的元素，若不在当前表中，则插入，
    // 否则删除
    for (var _j = 0; _j < n; ++_j) {
        var b = arr2[_j];
        var p = s;
        // k指向集合中的第一个结点
        var k = sllist[s].cur;
        // 在当前表中查找
        while (k !== sllist[r].cur && sllist[k].data !== b) {
            p = k;
            k = sllist[k].cur;
        }
        // 当前表中不存在该元素，插入在r所指结点之后，且r的位置不变
        if (k === sllist[r].cur) {
            var _i = sllist.malloc();
            sllist[_i].data = b;
            sllist[_i].cur = sllist[r].cur;
            sllist[r].cur = _i;

            // 该元素已在表中，删除之
        } else {
                sllist[p].cur = sllist[k].cur;
                sllist.free(k);
                // 若删除的是r所指结点，则需修改尾指针
                if (r === k) r = p;
            }
    }
}

var sl = new StaticLinkedList(10);
var ret = difference(sl, [1, 2, 3], [3, 4, 5]);
console.log(sl);

var test = new StaticLinkedList(10);
test.create([49, 38, 65, 97, 76, 13, 27, 49]);
console.log(test);