"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PBTNode = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 有双亲指针域的二叉树结点类型
var PBTNode = exports.PBTNode = function () {
    function PBTNode() {
        (0, _classCallCheck3.default)(this, PBTNode);

        this.data = null;
        this.leftChild = null;
        this.rightChild = null;
        this.parent = null;
    }

    (0, _createClass3.default)(PBTNode, [{
        key: "inOrder_nonrecursive_nonstack",
        value: function inOrder_nonrecursive_nonstack(visit) {
            var p = this;
            while (p.leftChild) {
                p = p.leftChild;
            }while (p) {
                p.data && visit(p.data);

                if (p.rightChild) {
                    p = p.rightChild;
                    while (p.leftChild) {
                        p = p.leftChild;
                    }
                } else if (p.parent.leftChild == p) {
                    p = p.parent;
                } else {
                    p = p.parent;

                    while (p.parent && p.parent.rightChild == p) {
                        p = p.parent;
                    }p = p.parent;
                }
            }
        }
    }]);
    return PBTNode;
}();