/*
 Copyright 2013 Daniel Wirtz <dcode@dcode.io>
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * @license btree.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: http://github.com/dcodeIO/btree.js for details
 */
(function (module, console) {
    'use strict';

    /**
     * Concatenates multiple arrays into a new one.
     * @param {...[Array]} var_args
     * @returns {Array}
     * @private
     */
    function concat(var_args) {
        // Array#concat behaves strangely for empty arrays, so...
        var a = [];
        for (var i = 0; i < arguments.length; i++) {
            Array.prototype.push.apply(a, arguments[i]);
        }
        return a;
    }

    /**
     * Searches an array for the specified value.
     * @param {Array} a
     * @param {*} v
     * @returns {number} Index or -1 if not found
     * @private
     */
    function asearch(a, v) {
        // This is faster than Array#indexOf because it's raw. However, we
        // cannot use binary search because nodes do not have a comparable
        // key. If the compiler is smart, it will inline this.
        for (var i = 0; i < a.length; i++) {
            if (a[i] === v) return i;
        }
        return -i;
    }

    /**
     * btree namespace.
     * @type {Object.<string,*>}
     */
    var btree = {};

    /**
     * Strictly compares two strings, character by character. No locales, no number extension.
     * @param {string} a
     * @param {string} b
     * @returns {number} -1 if a < b, 1 if a > b, 0 otherwise
     * @expose
     */
    btree.strcmp = function strcmp(a, b) {
        /** @type {number} */
        var ac;
        /** @type {number} */
        var bc;
        for (var i = 0; i < a.length; i++) {
            if (i >= b.length) {
                return 1;
            }
            if ((ac = a.charCodeAt(i)) < (bc = b.charCodeAt(i))) {
                return -1;
            } else if (ac > bc) {
                return 1;
            }
            // If same, continue
        }
        return a.length == b.length ? 0 : -1;
    };

    /**
     * Compares two numbers.
     * @param {number} a
     * @param {number} b
     * @returns {number} -1 if a < b, 1 if a > b, 0 otherwise
     * @expose
     */
    btree.numcmp = function intcmp(a, b) {
        return a < b ? -1 : (a > b ? 1 : 0);
    };

    /**
     * Creates a BTree class using the given order.
     * Note that this method returns a class, not an instance.
     * @param {number=} order Defaults to 2
     * @param {function(?, ?):number=} compare Compare implementation to use on keys
     * @returns {Function}
     * @expose
     */
    btree.create = function (order, compare) {

        // Validate order
        if (typeof order == 'undefined') {
            order = 52; // Benchmarks proofed that this is close to the optimum
        } else if (typeof order == 'number') {
            order = Math.floor(order);
        } else {
            order = parseInt(order, 10);
        }
        if (order < 1) order = 1;
        var minOrder = order > 1 ? Math.floor(order / 2) : 1;

        // Use numcmp by default
        if (typeof compare != 'function') {
            compare = btree.numcmp;
        }

        /**
         * Validates a node and prints debugging info if something went wrong.
         * @param {!TreeNode|!Tree} node
         * @private
         */
        function validate(node) { // This function will be stripped by the compiler
            if ((node instanceof Tree)) return;
            if (node.leaves.length + 1 != node.nodes.length) {
                console.log("ERROR: Illegal leaf/node count in " + node + ": " + node.leaves.length + "/" + node.nodes.length);
            }
            for (var i = 0; i < node.leaves.length; i++) {
                if (!node.leaves[i]) {
                    console.log("ERROR: Illegal leaf in " + node + " at " + i + ": " + node.leaves[i]);
                }
            }
            for (i = 0; i < node.nodes.length; i++) {
                if (typeof node.nodes[i] == 'undefined') {
                    console.log("ERROR: Illegal node in " + node + " at " + i + ": undefined");
                }
            }
        }

        /**
         * Constructs a new TreeNode.
         * @class A TreeNode.
         * @param {!(TreeNode|Tree)} parent Parent node
         * @param {Array.<!Leaf>=} leaves Leaf nodes
         * @param {Array.<TreeNode>=} nodes Child nodes
         * @constructor
         */
        var TreeNode = function (parent, leaves, nodes) {

            /**
             * Parent node.
             * @type {!TreeNode|!Tree}
             */
            this.parent = parent;

            /**
             * Leaf nodes (max. order).
             * @type {!Array.<!Leaf>}
             */
            this.leaves = leaves || [];
            this.leaves.forEach(function (leaf) {
                leaf.parent = this;
            }, this);

            /**
             * Child nodes (max. order+1).
             * @type {!Array.<TreeNode>}
             */
            this.nodes = nodes || [null];
            this.nodes.forEach(function (node) {
                if (node !== null) node.parent = this;
            }, this);
        };

        /**
         * Searches for the node that would contain the specified key.
         * @param {!*} key
         * @returns {{leaf: !Leaf, index: number}|{node: !TreeNode, index: number}} Leaf if the key exists, else the insertion node
         */
        TreeNode.prototype.search = function (key) {
            if (this.leaves.length > 0) {
                var a = this.leaves[0];
                if (compare(a.key, key) == 0) return {leaf: a, index: 0};
                if (compare(key, a.key) < 0) {
                    if (this.nodes[0] !== null) {
                        return this.nodes[0].search(key); // Left
                    }
                    return {node: this, index: 0}
                }
                for (var i = 1; i < this.leaves.length; i++) {
                    var b = this.leaves[i];
                    if (compare(b.key, key) == 0) return {leaf: b, index: i};
                    if (compare(key, b.key) < 0) {
                        if (this.nodes[i] !== null) {
                            return this.nodes[i].search(key); // Inner
                        }
                        return {node: this, index: i};
                    }
                    a = b;
                }
                if (this.nodes[i] !== null) {
                    return this.nodes[i].search(key); // Right
                }
                return {node: this, index: i};
            }
            return {node: this, index: 0};
        };

        /**
         * Gets the value for the given key.
         * @param {!*} key
         * @returns {*|undefined} If there is no such key, undefined is returned
         */
        TreeNode.prototype.get = function (key) {
            var result = this.search(key);
            if (result.leaf) return result.leaf.value;
            return undefined;
        };

        /**
         * Inserts a key/value pair into this node.
         * @param {!*} key
         * @param {*} value
         * @param {boolean=} overwrite Whether to overwrite existing values, defaults to `true`
         * @returns {boolean} true if successfully set, false if already present and overwrite is `false`
         */
        TreeNode.prototype.put = function (key, value, overwrite) {
            var result = this.search(key);
            if (result.leaf) {
                if (typeof overwrite !== 'undefined' && !overwrite) {
                    return false;
                }
                result.leaf.value = value;
                return true;
            } // Key already exists
            var node = result.node,
                index = result.index;
            node.leaves.splice(index, 0, new Leaf(node, key, value));
            node.nodes.splice(index + 1, 0, null);
            if (node.leaves.length > order) { // Rebalance
                node.split();
            }
            return true;
        };

        /**
         * Deletes a key from this node.
         * @param {!*} key
         * @returns {boolean} true if the key has been deleted, false if the key does not exist
         */
        TreeNode.prototype.del = function (key) {
            var result = this.search(key);
            if (!result.leaf) return false;
            var leaf = result.leaf,
                node = leaf.parent,
                index = result.index,
                left = node.nodes[index];
            if (left === null) {
                node.leaves.splice(index, 1);
                node.nodes.splice(index, 1);
                node.balance();
            } else {
                var max = left.leaves[left.leaves.length - 1];
                left.del(max.key);
                max.parent = node;
                node.leaves.splice(index, 1, max);
            }
            return true;
        };

        /**
         * Balances this node to fulfill all conditions.
         */
        TreeNode.prototype.balance = function () {
            if (this.parent instanceof Tree) {
                // Special case: Root has just a single child and no leaves
                if (this.leaves.length == 0 && this.nodes[0] !== null) {
                    this.parent.root = this.nodes[0];
                    this.parent.root.parent = this.parent;
                }
                return;
            }
            if (this.leaves.length >= minOrder) {
                return;
            }
            var index = asearch(this.parent.nodes, this),
                left = index > 0 ? this.parent.nodes[index - 1] : null,
                right = this.parent.nodes.length > index + 1 ? this.parent.nodes[index + 1] : null;
            var sep, leaf, rest;
            if (right !== null && right.leaves.length > minOrder) {
                // Append the seperator from parent to this
                sep = this.parent.leaves[index];
                sep.parent = this;
                this.leaves.push(sep);
                // Replace the blank with the first right leaf
                leaf = right.leaves.shift();
                leaf.parent = this.parent;
                this.parent.leaves[index] = leaf;
                // Append the right rest to this
                rest = right.nodes.shift();
                if (rest !== null) rest.parent = this;
                this.nodes.push(rest);
            } else if (left !== null && left.leaves.length > minOrder) {
                // Prepend the seperator from parent to this
                sep = this.parent.leaves[index - 1];
                sep.parent = this;
                this.leaves.unshift(sep);
                // Replace the blank with the last left leaf
                leaf = left.leaves.pop();
                leaf.parent = this.parent;
                this.parent.leaves[index - 1] = leaf;
                // Prepend the left rest to this
                rest = left.nodes.pop();
                if (rest !== null) rest.parent = this;
                this.nodes.unshift(rest);
            } else {
                var subst;
                if (right !== null) {
                    // Combine this + seperator from the parent + right
                    sep = this.parent.leaves[index];
                    subst = new TreeNode(this.parent, concat(this.leaves, [sep], right.leaves), concat(this.nodes, right.nodes));
                    // Remove the seperator from the parent
                    this.parent.leaves.splice(index, 1);
                    // And replace the nodes it seperated with subst
                    this.parent.nodes.splice(index, 2, subst);
                } else if (left !== null) {
                    // Combine left + seperator from parent + this
                    sep = this.parent.leaves[index - 1];
                    subst = new TreeNode(this.parent, concat(left.leaves, [sep], this.leaves), concat(left.nodes, this.nodes));
                    // Remove the seperator from the parent
                    this.parent.leaves.splice(index - 1, 1);
                    // And replace the nodes it seperated with subst
                    this.parent.nodes.splice(index - 1, 2, subst);
                } else {
                    // We should never end here
                    throw(new Error("Internal error: " + this.toString(true) + " has neither a left nor a right sibling"));
                }
                this.parent.balance();
            }
            // validate(this);
            // validate(this.parent);
        };

        /**
         * Unsplits a child.
         * @param {!Leaf} leaf
         * @param {!TreeNode} rest
         */
        TreeNode.prototype.unsplit = function (leaf, rest) {
            leaf.parent = this;
            rest.parent = this;
            var a = this.leaves[0];
            if (compare(leaf.key, a.key) < 0) {
                this.leaves.unshift(leaf);
                this.nodes.splice(1, 0, rest);
            } else {
                for (var i = 1; i < this.leaves.length; i++) {
                    var b = this.leaves[i];
                    if (compare(leaf.key, b.key) < 0) {
                        this.leaves.splice(i, 0, leaf);
                        this.nodes.splice(i + 1, 0, rest);
                        break;
                    }
                }
                if (i == this.leaves.length) {
                    this.leaves.push(leaf);
                    this.nodes.push(rest);
                }
            }
            if (this.leaves.length > order) {
                this.split();
            }
        };

        /**
         * Splits this node.
         */
        TreeNode.prototype.split = function () {
            var index = Math.floor(this.leaves.length / 2);
            if (this.parent instanceof Tree) {
                this.nodes = [
                    new TreeNode(this, this.leaves.slice(0, index), this.nodes.slice(0, index + 1)),
                    new TreeNode(this, this.leaves.slice(index + 1), this.nodes.slice(index + 1))
                ];
                this.leaves = [this.leaves[index]];
            } else {
                var leaf = this.leaves[index];
                var rest = new TreeNode(this.parent, this.leaves.slice(index + 1), this.nodes.slice(index + 1));
                this.leaves = this.leaves.slice(0, index);
                this.nodes = this.nodes.slice(0, index + 1);
                this.parent.unsplit(leaf, rest);
            }
        };

        /**
         * Returns a string representation of this node.
         * @param {boolean=} includeNodes Whether to include sub-nodes or not
         * @returns {string}
         */
        TreeNode.prototype.toString = function (includeNodes) {
            var val = [];
            for (var i = 0; i < this.leaves.length; i++) {
                val.push(this.leaves[i].key);
            }
            var s = "[" + val.toString() + "]" + (this.parent instanceof Tree ? ":*" : ":" + this.parent);
            if (includeNodes) {
                for (i = 0; i < this.nodes.length; i++) {
                    s += " -> " + this.nodes[i];
                }
            }
            return s;
        };

        /**
         * Prints out the nodes leaves and nodes.
         * @param {number} indent
         */
        TreeNode.prototype.print = function (indent) {
            var space = "";
            for (var i = 0; i < indent; i++) space += " ";
            for (i = this.leaves.length - 1; i >= 0; i--) {
                if (this.nodes[i + 1] !== null) this.nodes[i + 1].print(indent + 2);
                console.log(space + this.leaves[i].key + (this.parent instanceof Tree ? "*" : ""));
            }
            if (this.nodes[0] !== null) this.nodes[0].print(indent + 2);
        };

        /**
         * Constructs a new Leaf containing a value.
         * @class A Leaf.
         * @param {!TreeNode} parent
         * @param {!*} key
         * @param {*} value
         * @constructor
         */
        var Leaf = function (parent, key, value) {

            /**
             * Parent node.
             * @type {!TreeNode}
             */
            this.parent = parent;

            /**
             * Key.
             * @type {!*}
             */
            this.key = key;

            /**
             * Value.
             * @type {*}
             */
            this.value = value;
        };

        /**
         * Returns a string representation of this instance.
         * @returns {string}
         */
        Leaf.prototype.toString = function () {
            return "" + this.key;
        };

        /**
         * Constructs a new Tree.
         * @class A Tree.
         * @constructor
         */
        function Tree() {
            this.root = new TreeNode(this);
        }

        /**
         * Inserts a key/value pair into the tree.
         * @param {!*} key
         * @param {*} value
         * @param {boolean=} overwrite Whether to overwrite existing values, defaults to `true`
         * @returns {boolean} true if set, false if already present and overwrite is `false`
         * @throws {Error} If the key is undefined or null or the value is undefined
         * @expose
         */
        Tree.prototype.put = function (key, value, overwrite) {
            if (typeof key === 'undefined' || key === null)  throw(new Error("Illegal key: " + key));
            if (typeof value === 'undefined') throw(new Error("Illegal value: " + value));
            return this.root.put(key, value, overwrite);
        };

        /**
         * Gets the value of the specified key.
         * @param {!*} key
         * @returns {*|undefined} If there is no such key, undefined is returned
         * @throws {Error} If the key is undefined or null
         * @expose
         */
        Tree.prototype.get = function (key) {
            if (typeof key === 'undefined' || key === null)  throw(new Error("Illegal key: " + key));
            return this.root.get(key);
        };

        /**
         * Deletes a key from the tree.
         * @param {!*} key
         * @returns {boolean} true if the key has been deleted, false if the key does not exist
         * @expose
         */
        Tree.prototype.del = function (key) {
            if (typeof key === 'undefined' || key === null)  throw(new Error("Illegal key: " + key));
            return this.root.del(key);
        };

        /**
         * Walks through all keys [minKey, ..., maxKey] in ascending order.
         * @param {*|function(*, *):(boolean|undefined)} minKey If omitted or NULL, starts at the beginning
         * @param {(*|function(*, *):(boolean|undefined))=} maxKey If omitted or NULL, walks till the end
         * @param {function(*, *):(boolean|undefined)=} callback Callback receiving the key and the corresponding value as its
         *  parameters. May explicitly return true to stop the loop.
         * @expose
         */
        Tree.prototype.walkAsc = function (minKey, maxKey, callback) {
            if (this.root.leaves.length == 0) {
                return;
            }
            if (typeof minKey == 'function') {
                callback = minKey;
                minKey = maxKey = null;
            } else if (typeof maxKey == 'function') {
                callback = maxKey;
                maxKey = null;
            }
            minKey = typeof minKey != 'undefined' ? minKey : null;
            maxKey = typeof maxKey != 'undefined' ? maxKey : null;
            var ptr, index;
            if (minKey === null) { // If there is no minimum limit
                ptr = this.root; // set ptr to the outer left node
                while (ptr.nodes[0] !== null) {
                    ptr = ptr.nodes[0];
                }
                index = 0; // and start at its first leaf
            } else { // Else lookup
                var result = this.root.search(minKey);
                if (result.leaf) { // If the minimum key itself exists
                    ptr = result.leaf.parent; // set ptr to the containing node
                    index = asearch(ptr.leaves, result.leaf); // and start at its index
                } else { // If the key does not exist
                    ptr = result.node; // set ptr to the insertion node
                    index = result.index; // and start at the insertion index (key > minKey)
                    if (index >= ptr.leaves.length) { // on overrun, begin at the separator in the parent
                        if (ptr.parent instanceof Tree) {
                            return; // empty range
                        }
                        index = asearch(ptr.parent.nodes, ptr);
                        if (index >= ptr.parent.leaves.length) {
                            return; // empty range
                        }
                        ptr = ptr.parent;
                    }
                }
            }
            // ptr/index now points at our first result
            while (true) {
                if (maxKey !== null && compare(ptr.leaves[index].key, maxKey) > 0) {
                    break; // if there are no more keys less than maxKey
                }
                if (callback(ptr.leaves[index].key, ptr.leaves[index].value)) {
                    break; // if the user explicitly breaks the loop by returning true
                }
                if (ptr.nodes[index + 1] !== null) { // Descend
                    ptr = ptr.nodes[index + 1];
                    index = 0;
                    while (ptr.nodes[0] !== null) {
                        ptr = ptr.nodes[0];
                    }
                } else if (ptr.leaves.length > index + 1) { // Next
                    index++;
                } else { // Ascend
                    do {
                        if ((ptr.parent instanceof Tree)) {
                            return;
                        }
                        index = asearch(ptr.parent.nodes, ptr);
                        ptr = ptr.parent;
                    } while (index >= ptr.leaves.length);
                }
            }
        };

        /**
         * Alias of {@link Tree#walkAsc}.
         * @param {*|function(*, *):(boolean|undefined)} minKey If omitted or NULL, starts at the beginning
         * @param {(*|(function(*, *):(boolean|undefined)))=} maxKey If omitted or NULL, walks till the end
         * @param {function(*, *):(boolean|undefined)=} callback Callback receiving the key and the corresponding value as its
         *  parameters. May explicitly return true to stop the loop.
         * @expose
         */
        Tree.prototype.walk = Tree.prototype.walkAsc;

        /**
         * Walks through all keys [minKey, ..., maxKey] in descending order.
         * @param {*|function(*, *):(boolean|undefined)} minKey If omitted or null, walks till the beginning
         * @param {(*|function(*, *):(boolean|undefined))=} maxKey If omitted or null, starts at the end
         * @param {function(*, *):(boolean|undefined)=} callback Callback receiving the key and the corresponding value as its
         *  parameters. May explicitly return true to stop the loop.
         * @expose
         */
        Tree.prototype.walkDesc = function (minKey, maxKey, callback) {
            if (typeof minKey == 'function') {
                callback = minKey;
                minKey = maxKey = null;
            } else if (typeof maxKey == 'function') {
                callback = maxKey;
                maxKey = null;
            }
            minKey = typeof minKey != 'undefined' ? minKey : null;
            maxKey = typeof maxKey != 'undefined' ? maxKey : null;
            var ptr, index;
            if (maxKey === null) { // If there is no maximum limit
                ptr = this.root; // set ptr to the outer right node
                while (ptr.nodes[ptr.nodes.length - 1] !== null) {
                    ptr = ptr.nodes[ptr.nodes.length - 1];
                }
                index = ptr.leaves.length - 1; // and start at its last leaf
            } else { // Else lookup
                var result = this.root.search(maxKey);
                if (result.leaf) { // If the maximum key itself exists
                    ptr = result.leaf.parent; // set ptr to the containing node
                    index = asearch(ptr.leaves, result.leaf); // and start at its index
                } else { // If the key does not exist
                    ptr = result.node; // set ptr to the insertion node
                    index = result.index - 1; // and start at the insertion index-1 (key < maxKey)
                    while (index < 0) { // on underrun, begin at the separator in the parent
                        if (ptr.parent instanceof Tree) {
                            return; // empty range
                        }
                        index = asearch(ptr.parent.nodes, ptr) - 1;
                        if (index < 0) {
                            return; // empty range
                        }
                        ptr = ptr.parent;
                    }
                }
            }
            // ptr/index now points at our first result
            while (true) {
                if (minKey !== null && compare(ptr.leaves[index].key, minKey) < 0) {
                    break; // if there are no more keys bigger than minKey
                }
                if (callback(ptr.leaves[index].key, ptr.leaves[index].value)) {
                    break; // if the user explicitly breaks the loop by returning true
                }
                if (ptr.nodes[index] !== null) { // Descend
                    ptr = ptr.nodes[index];
                    while (ptr.nodes[ptr.nodes.length - 1] !== null) {
                        ptr = ptr.nodes[ptr.nodes.length - 1];
                    }
                    index = ptr.leaves.length - 1;
                } else if (index > 0) { // Next
                    index--;
                } else { // Ascend
                    do {
                        if ((ptr.parent instanceof Tree)) {
                            return;
                        }
                        index = asearch(ptr.parent.nodes, ptr) - 1;
                        ptr = ptr.parent;
                    } while (index < 0);
                }
            }
        };

        /**
         * Counts the number of keys between minKey and maxKey (both inclusive).
         * @param {*=} minKey If omitted, counts from the start
         * @param {*=} maxKey If omitted, counts till the end
         * @returns {number}
         * @expose
         */
        Tree.prototype.count = function (minKey, maxKey) {
            var n = 0;
            this.walk(
                typeof minKey != 'undefined' ? minKey : null,
                typeof maxKey != 'undefined' ? maxKey : null,
                function (key, value) { n++; }
            );
            return n;
        };

        /**
         * Prints out all nodes in the tree.
         * @expose
         */
        Tree.prototype.print = function () {
            this.root.print(0);
        };

        /**
         * Returns a string representation of this instance.
         * @returns {string}
         */
        Tree.prototype.toString = function () {
            return "Tree(" + order + ") " + this.root.toString();
        };

        return Tree;
    };

    module.exports = btree;

})(module, console);