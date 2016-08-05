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
 * 堆分配存储表示
 *
 * 这种存储表示的特点是，仍以一组地址连续的存储单元存放串值字符序列，但它们的存储空间是在程序执行过程中动态分配而得。在c语言中，存在一个称之为“堆”的自由存储区，并由c语言的动态分配函数malloc()和free()来管理。利用函数malloc()为每个新产生的串分配一块实际串长所需的存储空间。
 */

var HString = function () {
    function HString() {
        (0, _classCallCheck3.default)(this, HString);

        this.ch = {};
        this.length = 0;
    }

    // 1 <= position <= this.length.在串的第position个字符之前插入串tHString


    (0, _createClass3.default)(HString, [{
        key: 'strInsert',
        value: function strInsert(position, tHString) {
            if (position < 1 || position > this.length + 1) throw new Error('unexpected position');

            if (tHString.length) {
                // 为插入t而腾出位置
                var i = this.length - 1;
                for (var len = position - 1; i >= len; --i) {
                    this.ch[i + tHString.length] = this.ch[i];
                }stringCopy(this.ch, tHString.ch, position - 1, tHString.length - 1, 0);

                this.length += tHString.length;
            }
        }
    }, {
        key: 'strAssign',
        value: function strAssign(chars) {
            stringCopy(this.ch, chars, 0, chars.length - 1, 0);
            this.length = chars.length;
        }
    }, {
        key: 'strLength',
        value: function strLength() {
            return this.length;
        }
    }, {
        key: 'strCompare',
        value: function strCompare(tHString) {
            for (var i = 0, len = this.length; i < len && i < tHString.length; i++) {
                if (this.ch[i] !== tHString.ch[i]) return this.ch[i] - tHString.ch[i];
            }return this.length - tHString.length;
        }
    }, {
        key: 'clearString',
        value: function clearString() {
            this.ch = {};
            this.length = 0;
        }
    }, {
        key: 'concat',
        value: function concat(s) {
            var t = new HString();

            // t.ch[0..this.length - 1] = this.ch[0..this.length - 1]
            stringCopy(t.ch, this.ch, 0, this.length - 1, 0);
            t.length = this.length + s.length;
            // t.ch[this.length..t.length - 1] = s.ch[0..s.length - 1]
            stringCopy(t.ch, s.ch, this.length, s.length - 1, 0);

            return t;
        }
    }, {
        key: 'substring',
        value: function substring(position, len) {
            position = ~~position || 0;
            len = ~~len || this.length;
            if (position < 0 || position > this.length - 1 || len < 0 || len > this.length - position) throw new Error('unexpected parameter');

            var sub = new HString();
            stringCopy(sub.ch, this.ch, 0, len - 1, position);
            sub.length = len;

            return sub;
        }
    }, {
        key: 'toString',
        value: function toString() {
            var s = '';
            for (var i = 0, len = this.length; i < len; i++) {
                s += this.ch[i];
            }
            return s;
        }
    }]);
    return HString;
}();

exports.default = HString;


function stringCopy(destination, target, destStart, length, targetStart) {
    destStart = destStart || 0;
    length = length || target.length;
    targetStart = targetStart || 0;

    for (var i = 0; i <= length; i++) {
        destination[destStart + i] = target[targetStart + i];
    }
}