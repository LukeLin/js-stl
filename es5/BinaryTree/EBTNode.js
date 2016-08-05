"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 有mark域和双亲指针域的二叉树结点类型
var EBTNode = function () {
    function EBTNode() {
        (0, _classCallCheck3.default)(this, EBTNode);

        this.data = null;
        this.leftChild = null;
        this.rightChild = null;
        this.parent = null;
        this.mark = 0;
    }

    (0, _createClass3.default)(EBTNode, [{
        key: "postOrder_nonrecursive_nonstack",
        value: function postOrder_nonrecursive_nonstack(visit) {
            var p = this;
            while (p) {
                switch (p.mark) {
                    case 0:
                        p.mark = 1;
                        if (p.leftChild) p = p.leftChild;
                        break;
                    case 1:
                        p.mark = 2;
                        if (p.rightChild) p = p.rightChild;
                        break;
                    case 2:
                        p.data && visit(p.data);
                        p.mark = 0; // 恢复mark域
                        p = p.parent; // 返回双亲结点
                }
            }
        }
    }]);
    return EBTNode;
}();

exports.default = EBTNode;