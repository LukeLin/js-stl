'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by ldp on 2015/1/19.
 */

// 循环队列
var CycleQueue = function () {
    function CycleQueue() {
        var maxsize = arguments.length <= 0 || arguments[0] === undefined ? 100 : arguments[0];
        (0, _classCallCheck3.default)(this, CycleQueue);

        this.base = {};
        this.front = this.rear = 0;
        this.MAXQSIZE = maxsize;
    }

    (0, _createClass3.default)(CycleQueue, [{
        key: 'enQueue',
        value: function enQueue(data) {
            if ((this.rear + 1) % this.MAXQSIZE === 0) throw new Error('cycleQueue is already full!');

            this.base[this.rear] = data;
            this.rear = (this.rear + 1) % this.MAXQSIZE;
        }
    }, {
        key: 'deQueue',
        value: function deQueue() {
            if (this.front === this.rear) throw new Error('cycleQueue is already empty');

            var elem = this.base[this.front];
            this.front = (this.front + 1) % this.MAXQSIZE;

            return elem;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.base = {};
            this.front = this.rear = 0;
        }
    }, {
        key: 'peekAt',
        value: function peekAt() {
            var index = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

            index = (index + this.MAXQSIZE) % this.MAXQSIZE;

            return this.base[index + this.front] || null;
        }
    }, {
        key: 'getHead',
        value: function getHead() {
            var elem = this.base[this.front];
            return elem ? elem : null;
        }
    }, {
        key: 'queueTraverse',
        value: function queueTraverse(iterator) {
            for (var i = this.front, len = this.rear = this.front; i < len; i++) {
                if (iterator(this.base[i], i)) break;
            }
        }
    }, {
        key: 'toString',
        value: function toString() {
            var base = [].slice.call(this.base);

            return base.slice(this.front, this.rear - this.front);
        }
    }, {
        key: 'size',
        get: function get() {
            return (this.rear - this.front + this.MAXQSIZE) % this.MAXQSIZE;
        }
    }]);
    return CycleQueue;
}();

exports.default = CycleQueue;


var queue = new CycleQueue();
queue.enQueue(1);
queue.deQueue();
queue.enQueue(2);
queue.enQueue(3);
console.log(queue.peekAt(0));
console.log(queue.peekAt(1));
console.log(queue.peekAt(2));