"use strict";

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 MIT License
 Copyright (c) 2012 Santanu Basu
 Copyright (c) 2013 Daniel Wirtz
 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 "Software"), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:
 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// Based on Santanu Basu's BPlusJS
// https://github.com/santanubasu/BPlusJS
// Modified for stand-alone use

/**
 * @license BTree.js
 * Released under the MIT License
 * see: https://github.com/dcodeIO/BTree.js for details
 */
(function (global) {

    function isDefined(v) {
        return typeof v != 'undefined';
    }

    var Node = function Node(options) {
        options = options || {};
        this.order = options.order || 100;
        this.mergeThreshold = options.mergeThreshold || 40;
        this.data = [];
    };

    Node.prototype.getLeftPeer = function () {
        return this.leftPeer;
    };

    Node.prototype.setLeftPeer = function (leftPeer) {
        this.leftPeer = leftPeer;
    };

    Node.prototype.getRightPeer = function () {
        return this.rightPeer;
    };

    Node.prototype.setRightPeer = function (rightPeer) {
        this.rightPeer = rightPeer;
    };

    Node.prototype.getData = function () {
        return this.data;
    };

    Node.prototype.getSurplus = function () {
        return Math.max(0, Math.floor((this.data.length - this.mergeThreshold) / 2));
    };

    Node.prototype.getRightSurplusData = function () {
        var surplus = this.getSurplus();
        return this.data.splice(this.data.length - surplus);
    };

    Node.prototype.getLeftSurplusData = function () {
        var surplus = this.getSurplus();
        return this.data.splice(0, surplus);
    };

    var InternalNode = function InternalNode(options) {
        Node.call(this, options);
        this.data = options.data;
        this.leftPeer = options.leftPeer;
        this.rightPeer = options.rightPeer;
    };

    InternalNode.prototype = (0, _create2.default)(Node.prototype);

    InternalNode.prototype.findIndex = function (key) {
        var data = this.data;
        var left = 0;
        var right = data.length - 1;
        var mid = left + Math.floor((right - left) / 2);
        var found = false;
        do {
            mid = left + Math.floor((right - left) / 2);
            if (data[mid].key < key) {
                left = mid + 1;
            } else if (data[mid].key > key) {
                right = mid;
            } else {
                found = true;
            }
        } while (left < right && !found);
        if (found) {
            return mid;
        } else {
            return right;
        }
    };

    InternalNode.prototype.findChild = function (key) {
        var index = this.findIndex(key);
        var element = this.data[index];
        var child;
        if (element.key <= key) {
            child = element.right;
        } else {
            child = element.left;
        }
        return child;
    };

    InternalNode.prototype.insert = function (key, value, clobber) {
        var index = this.findIndex(key);
        var element = this.data[index];
        var child;
        var newNodes, leftElement, rightElement;
        if (element.key <= key) {
            child = element.right;
            newNodes = child.insert(key, value, clobber);
            if (newNodes.length == 3) {
                leftElement = {
                    key: element.key,
                    left: element.left,
                    right: newNodes[0]
                };
                rightElement = {
                    key: newNodes[1],
                    left: newNodes[0],
                    right: newNodes[2]
                };
                this.data.splice(index, 1, leftElement, rightElement);
                return this.split();
            }
        } else {
            child = element.left;
            newNodes = child.insert(key, value, clobber);
            if (newNodes.length == 3) {
                leftElement = {
                    key: newNodes[1],
                    left: newNodes[0],
                    right: newNodes[2]
                };
                rightElement = {
                    key: element.key,
                    left: newNodes[2],
                    right: element.right
                };
                this.data.splice(index, 1, leftElement, rightElement);
                return this.split();
            }
        }
        return newNodes;
    };

    InternalNode.prototype.split = function () {
        if (this.data.length < this.order) {
            return [];
        }
        var splitIndex = Math.floor(this.data.length / 2);
        var leftNode = new InternalNode({
            data: this.data.slice(0, splitIndex),
            leftPeer: this.leftPeer,
            order: this.order,
            mergeThreshold: this.mergeThreshold
        });
        var rightNode = new InternalNode({
            data: this.data.slice(splitIndex + 1, this.data.length),
            rightPeer: this.rightPeer,
            order: this.order,
            mergeThreshold: this.mergeThreshold
        });
        leftNode.setRightPeer(rightNode);
        rightNode.setLeftPeer(leftNode);
        if (isDefined(this.leftPeer)) {
            this.leftPeer.setRightPeer(leftNode);
        }
        if (isDefined(this.rightPeer)) {
            this.rightPeer.setLeftPeer(rightNode);
        }
        return [leftNode, this.data[splitIndex].key, rightNode];
    };

    InternalNode.prototype.remove = function (key, leftMergeOption, rightMergeOption) {
        var index = this.findIndex(key);
        var element = this.data[index];
        var mergeIndex = -1;
        var child;
        var retval;
        if (element.key <= key) {
            child = element.right;
            retval = child.remove(key, element.left, index < this.data.length - 1 ? child.getRightPeer() : undefined);
            if (this.data.length == 1 && retval.length == 4) {
                return [retval[0], retval[3]];
            }
            if (retval.length > 1) {
                if (retval[1] == 1) {
                    mergeIndex = index + 1;
                } else {
                    mergeIndex = index;
                }
            }
        } else {
            child = element.left;
            retval = child.remove(key, index > 0 ? child.getLeftPeer() : undefined, element.right);
            if (this.data.length == 1 && retval.length == 4) {
                return [retval[0], retval[3]];
            }
            if (retval.length > 1) {
                if (retval[1] == 1) {
                    mergeIndex = index;
                } else {
                    mergeIndex = index - 1;
                }
            }
        }
        if (mergeIndex >= 0) {
            var mergeElement = this.data[mergeIndex];
            if (retval.length == 5) {
                mergeElement.key = retval[3];
                return [retval[0]];
            } else {
                if (mergeIndex > 0) {
                    this.data[mergeIndex - 1].right = retval[3];
                }
                if (mergeIndex < this.data.length - 1) {
                    this.data[mergeIndex + 1].left = retval[3];
                }
                this.data.splice(mergeIndex, 1);
                return [retval[0]].concat(this.merge(leftMergeOption, rightMergeOption));
            }
        } else {
            return [retval[0]];
        }
    };

    InternalNode.prototype.merge = function (leftMergeOption, rightMergeOption) {
        if (this.data.length > this.mergeThreshold) {
            return [];
        }
        if (!isDefined(leftMergeOption) && !isDefined(rightMergeOption)) {
            return [];
        }
        var retval = [];
        // var deficit = true;
        var leftSurplus = 0;
        var leftData;
        var rightSurplus = 0;
        var rightData;
        var leftPeer = this.leftPeer;
        var rightPeer = this.rightPeer;
        if (isDefined(leftMergeOption)) {
            leftData = leftMergeOption.getData();
            leftSurplus = leftMergeOption.getSurplus();
        }
        if (isDefined(rightMergeOption)) {
            rightData = rightMergeOption.getData();
            rightSurplus = rightMergeOption.getSurplus();
        }
        if (leftSurplus > rightSurplus) {
            var leftSurplusData = leftMergeOption.getRightSurplusData();
            this.data = leftSurplusData.slice(1).concat([{
                key: this.data[0].left.getData()[0].key,
                left: leftSurplusData[leftSurplusData.length - 1].right,
                right: this.data[0].left
            }], this.data);
            retval[0] = -1;
            retval[1] = leftMergeOption;
            retval[2] = leftSurplusData[0].key;
            retval[3] = this;
        } else if (rightSurplus > leftSurplus) {
            var rightSurplusData = rightMergeOption.getLeftSurplusData();
            this.data = this.data.concat([{
                key: rightSurplusData[0].left.getData()[0].key,
                left: this.data[this.data.length - 1].right,
                right: rightSurplusData[0].left
            }], rightSurplusData.slice(0, rightSurplusData.length - 1));
            retval[0] = 1;
            retval[1] = this;
            retval[2] = rightSurplusData[rightSurplusData.length - 1].key;
            retval[3] = rightMergeOption;
        } else {
            var mergedInternalNode;
            if (!isDefined(leftData)) {
                mergedInternalNode = new InternalNode({
                    order: this.order,
                    mergeThreshold: this.mergeThreshold,
                    data: this.data.concat([{
                        key: rightData[0].left.getData()[0].key,
                        left: this.data[this.data.length - 1].right,
                        right: rightData[0].left
                    }], rightData)
                });
                retval[0] = 1;
                retval[1] = mergedInternalNode.getData()[0].key;
                retval[2] = mergedInternalNode;
                if (isDefined(rightPeer) && isDefined(rightPeer.getRightPeer())) {
                    rightPeer.getRightPeer().setLeftPeer(mergedInternalNode);
                    mergedInternalNode.setRightPeer(rightPeer.getRightPeer());
                }
                if (isDefined(leftPeer)) {
                    leftPeer.setRightPeer(mergedInternalNode);
                    mergedInternalNode.setLeftPeer(leftPeer);
                }
            } else if (!isDefined(rightData)) {
                mergedInternalNode = new InternalNode({
                    order: this.order,
                    mergeThreshold: this.mergeThreshold,
                    data: leftData.concat([{
                        key: this.data[0].left.getData()[0].key,
                        left: leftData[leftData.length - 1].right,
                        right: this.data[0].left
                    }], this.data)
                });
                retval[0] = -1;
                retval[1] = mergedInternalNode.getData()[0].key;
                retval[2] = mergedInternalNode;
                if (isDefined(leftPeer) && isDefined(leftPeer.getLeftPeer())) {
                    leftPeer.getLeftPeer().setRightPeer(mergedInternalNode);
                    mergedInternalNode.setLeftPeer(leftPeer.getLeftPeer());
                }
                if (isDefined(rightPeer)) {
                    rightPeer.setLeftPeer(mergedInternalNode);
                    mergedInternalNode.setRightPeer(rightPeer);
                }
            } else if (rightData.length < leftData.length) {
                mergedInternalNode = new InternalNode({
                    order: this.order,
                    mergeThreshold: this.mergeThreshold,
                    data: this.data.concat([{
                        key: rightData[0].left.getData()[0].key,
                        left: this.data[this.data.length - 1].right,
                        right: rightData[0].left
                    }], rightData)
                });
                retval[0] = 1;
                retval[1] = mergedInternalNode.getData()[0].key;
                retval[2] = mergedInternalNode;
                if (isDefined(rightPeer) && isDefined(rightPeer.getRightPeer())) {
                    rightPeer.getRightPeer().setLeftPeer(mergedInternalNode);
                    mergedInternalNode.setRightPeer(rightPeer.getRightPeer());
                }
                if (isDefined(leftPeer)) {
                    leftPeer.setRightPeer(mergedInternalNode);
                    mergedInternalNode.setLeftPeer(leftPeer);
                }
            } else {
                mergedInternalNode = new InternalNode({
                    order: this.order,
                    mergeThreshold: this.mergeThreshold,
                    data: leftData.concat([{
                        key: this.data[0].left.getData()[0].key,
                        left: leftData[leftData.length - 1].right,
                        right: this.data[0].left
                    }], this.data)
                });
                retval[0] = -1;
                retval[1] = mergedInternalNode.getData()[0].key;
                retval[2] = mergedInternalNode;
                if (isDefined(leftPeer) && isDefined(leftPeer.getLeftPeer())) {
                    leftPeer.getLeftPeer().setRightPeer(mergedInternalNode);
                    mergedInternalNode.setLeftPeer(leftPeer.getLeftPeer());
                }
                if (isDefined(rightPeer)) {
                    rightPeer.setLeftPeer(mergedInternalNode);
                    mergedInternalNode.setRightPeer(rightPeer);
                }
            }
        }
        return retval;
    };

    InternalNode.prototype.find = function (key) {
        return this.findChild(key).find(key);
    };

    InternalNode.prototype.range = function (start, end) {
        return this.findChild(start).range(start, end);
    };

    InternalNode.prototype.toString = function (indent) {
        return this.data.map(function (element) {
            return [indent + "[key=" + element.key, "\n" + indent + "    LEFT\n" + element.left.toString(indent + "    "), "\n" + indent + "    RIGHT\n" + element.right.toString(indent + "    ") + "\n" + indent + "]"];
        }).join(",\n");
    };

    var LeafNode = function LeafNode(options) {
        Node.call(this, options);
        this.data = options.data;
        this.leftPeer = options.leftPeer;
        this.rightPeer = options.rightPeer;
    };

    LeafNode.prototype = (0, _create2.default)(Node.prototype);

    LeafNode.prototype.findIndex = function (key) {
        var data = this.data;
        if (data.length == 0) {
            return 0;
        }
        var left = 0;
        var right = data.length;
        var mid = left + Math.floor((right - left) / 2);
        var found = false;
        do {
            mid = left + Math.floor((right - left) / 2);
            if (data[mid].key < key) {
                left = mid + 1;
            } else if (data[mid].key > key) {
                right = mid;
            } else {
                found = true;
            }
        } while (left !== right && !found);
        if (found) {
            return mid;
        } else {
            return left;
        }
    };

    LeafNode.prototype.insert = function (key, value, clobber) {
        var index = this.findIndex(key);
        var element = this.data[index];
        if (index == this.data.length) {
            this.data.push({
                key: key,
                value: value
            });
        } else if (element.key === key) {
            if (clobber) {
                element.value = value;
            } else {
                return [element.value];
            }
            // This condition may never occur, given the way findIndex is written
        } else if (element.key < key) {
                this.data.splice(index + 1, 0, {
                    key: key,
                    value: value
                });
            } else {
                this.data.splice(index, 0, {
                    key: key,
                    value: value
                });
            }
        return this.split();
    };

    LeafNode.prototype.split = function () {
        if (this.data.length < this.order) {
            return [];
        }
        var splitIndex = Math.floor(this.data.length / 2);
        var leftNode = new LeafNode({
            data: this.data.slice(0, splitIndex),
            leftPeer: this.leftPeer,
            order: this.order,
            mergeThreshold: this.mergeThreshold
        });
        var rightNode = new LeafNode({
            data: this.data.slice(splitIndex, this.data.length),
            rightPeer: this.rightPeer,
            order: this.order,
            mergeThreshold: this.mergeThreshold
        });
        leftNode.setRightPeer(rightNode);
        rightNode.setLeftPeer(leftNode);
        if (isDefined(this.leftPeer)) {
            this.leftPeer.setRightPeer(leftNode);
        }
        if (isDefined(this.rightPeer)) {
            this.rightPeer.setLeftPeer(rightNode);
        }
        return [leftNode, this.data[splitIndex].key, rightNode];
    };

    LeafNode.prototype.remove = function (key, leftMergeOption, rightMergeOption) {
        var index = this.findIndex(key);
        var element = this.data[index];
        if (index < this.data.length && element.key === key) {
            this.data.splice(index, 1);
            return [element.value].concat(this.merge(leftMergeOption, rightMergeOption));
        } else {
            return [undefined];
        }
    };

    LeafNode.prototype.merge = function (leftMergeOption, rightMergeOption) {
        if (this.data.length > this.mergeThreshold) {
            return [];
        }
        if (!isDefined(leftMergeOption) && !isDefined(rightMergeOption)) {
            return [];
        }
        var retval = [];
        // var deficit = true;
        var leftSurplus = 0;
        var leftData;
        var rightSurplus = 0;
        var rightData;
        var leftPeer = this.leftPeer;
        var rightPeer = this.rightPeer;
        if (isDefined(leftMergeOption)) {
            leftData = leftMergeOption.getData();
            leftSurplus = leftMergeOption.getSurplus();
        }
        if (isDefined(rightMergeOption)) {
            rightData = rightMergeOption.getData();
            rightSurplus = rightMergeOption.getSurplus();
        }
        if (leftSurplus > rightSurplus) {
            var leftSurplusData = leftMergeOption.getRightSurplusData();
            this.data = leftSurplusData.concat(this.data);
            retval[0] = -1;
            retval[1] = leftMergeOption;
            retval[2] = this.data[0].key;
            retval[3] = this;
        } else if (rightSurplus > leftSurplus) {
            var rightSurplusData = rightMergeOption.getLeftSurplusData();
            this.data = this.data.concat(rightSurplusData);
            retval[0] = 1;
            retval[1] = this;
            retval[2] = rightMergeOption.getData()[0].key;
            retval[3] = rightMergeOption;
        } else {
            var mergedLeafNode;
            if (!isDefined(leftData)) {
                mergedLeafNode = new LeafNode({
                    order: this.order,
                    mergeThreshold: this.mergeThreshold,
                    data: this.data.concat(rightData)
                });
                retval[0] = 1;
                retval[1] = mergedLeafNode.getData()[0].key;
                retval[2] = mergedLeafNode;
                if (isDefined(rightPeer) && isDefined(rightPeer.getRightPeer())) {
                    rightPeer.getRightPeer().setLeftPeer(mergedLeafNode);
                    mergedLeafNode.setRightPeer(rightPeer.getRightPeer());
                }
                if (isDefined(leftPeer)) {
                    leftPeer.setRightPeer(mergedLeafNode);
                    mergedLeafNode.setLeftPeer(leftPeer);
                }
            } else if (!isDefined(rightData)) {
                mergedLeafNode = new LeafNode({
                    order: this.order,
                    mergeThreshold: this.mergeThreshold,
                    data: leftData.concat(this.data)
                });
                retval[0] = -1;
                retval[1] = mergedLeafNode.getData()[0].key;
                retval[2] = mergedLeafNode;
                if (isDefined(leftPeer) && isDefined(leftPeer.getLeftPeer())) {
                    leftPeer.getLeftPeer().setRightPeer(mergedLeafNode);
                    mergedLeafNode.setLeftPeer(leftPeer.getLeftPeer());
                }
                if (isDefined(rightPeer)) {
                    rightPeer.setLeftPeer(mergedLeafNode);
                    mergedLeafNode.setRightPeer(rightPeer);
                }
            } else if (rightData.length < leftData.length) {
                mergedLeafNode = new LeafNode({
                    order: this.order,
                    mergeThreshold: this.mergeThreshold,
                    data: this.data.concat(rightData)
                });
                retval[0] = 1;
                retval[1] = mergedLeafNode.getData()[0].key;
                retval[2] = mergedLeafNode;
                if (isDefined(rightPeer) && isDefined(rightPeer.getRightPeer())) {
                    rightPeer.getRightPeer().setLeftPeer(mergedLeafNode);
                    mergedLeafNode.setRightPeer(rightPeer.getRightPeer());
                }
                if (isDefined(leftPeer)) {
                    leftPeer.setRightPeer(mergedLeafNode);
                    mergedLeafNode.setLeftPeer(leftPeer);
                }
            } else {
                mergedLeafNode = new LeafNode({
                    order: this.order,
                    mergeThreshold: this.mergeThreshold,
                    data: leftData.concat(this.data)
                });
                retval[0] = -1;
                retval[1] = mergedLeafNode.getData()[0].key;
                retval[2] = mergedLeafNode;
                if (isDefined(leftPeer) && isDefined(leftPeer.getLeftPeer())) {
                    leftPeer.getLeftPeer().setRightPeer(mergedLeafNode);
                    mergedLeafNode.setLeftPeer(leftPeer.getLeftPeer());
                }
                if (isDefined(rightPeer)) {
                    rightPeer.setLeftPeer(mergedLeafNode);
                    mergedLeafNode.setRightPeer(rightPeer);
                }
            }
        }
        return retval;
    };

    LeafNode.prototype.find = function (key) {
        var index = this.findIndex(key);
        var element = this.data[index];
        if (index < this.data.length && element.key === key) {
            return element.value;
        }
    };

    LeafNode.prototype.range = function (start, end) {
        var node = this;
        var range = [];
        while (isDefined(node)) {
            var startIndex = node.findIndex(start);
            var endIndex = node.findIndex(end);
            var nodeData = node.getData();
            if (startIndex < nodeData.length) {
                for (var i = startIndex; i < endIndex; i++) {
                    range.push(nodeData[i].value);
                }
            }
            if (endIndex == nodeData.length) {
                node = node.getRightPeer();
            } else {
                break;
            }
        }
        return range;
    };

    LeafNode.prototype.toString = function (indent) {
        return indent + "[" + this.data.map(function (element) {
            return element.key;
        }).toString() + "]";
    };

    var Tree = function Tree(options) {
        options = options || {};
        this.order = options.order || 100;
        this.mergeThreshold = options.mergeThreshold || 40;
        this.root = new LeafNode({
            order: this.order,
            mergeThreshold: this.mergeThreshold,
            data: []
        });
    };

    Tree.prototype.toString = function () {
        return this.root.toString("");
    };

    Tree.prototype.insert = function (key, value, clobber) {
        var newNodes = this.root.insert(key, value, clobber);
        if (newNodes.length == 3) {
            this.root = new InternalNode({
                order: this.order,
                mergeThreshold: this.mergeThreshold,
                data: [{
                    key: newNodes[1],
                    left: newNodes[0],
                    right: newNodes[2]
                }]
            });
        } else if (newNodes.length == 1) {
            return newNodes[0];
        }
        return value;
    };

    Tree.prototype.remove = function (key) {
        var retval = this.root.remove(key);
        if (retval.length == 2) {
            this.root = retval[1];
        }
        return retval[0];
    };

    Tree.prototype.find = function (key) {
        return this.root.find(key);
    };

    Tree.prototype.range = function (start, end) {
        return this.root.range(start, end);
    };

    // Expose all types on top
    Tree.Node = Node;
    Tree.InternalNode = InternalNode;
    Tree.LeafNode = LeafNode;

    // Enable module loading if available
    if (typeof module != 'undefined' && module["exports"]) {
        // CommonJS
        module["exports"] = Tree;
    } else if (typeof define != 'undefined' && define["amd"]) {
        // AMD
        define("BPlusTree", [], function () {
            return Tree;
        });
    } else {
        // Shim
        if (!global["dcodeIO"]) {
            global["dcodeIO"] = {};
        }
        global["dcodeIO"]["BPlusTree"] = Tree;
    }
})(undefined);