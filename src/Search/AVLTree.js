/**
 * AVL TREE Class
 *
 * @author Brice Chevalier
 *
 *
 * @desc
 *
 *    Method                Time Complexity
 *    ___________________________________
 *
 *    add                    O(log2(n))
 *    remove                O(log2(n))
 *    getFirst            O(1)
 *    getLast                O(1)
 *    getCount            O(1)
 *    apply                O(n)
 *    clear                O(n)
 *
 *    Memory Complexity in O(n)
 */

function Node(obj) {
    this.object = obj;
    this.height = 1;
    this.left = null;
    this.right = null;
    this.previous = null;
    this.next = null;
    this.parent = null;
}

function AvlTree() {
    this.count = 0;
    this.root = null;
    this.first = null;
    this.last = null;
}
AvlTree.cmp = function(a, b){
    if(a > b) return 1;
    else if(a < b) return -1;
    else return 0;
};

AvlTree.prototype._addLeft = function (node, parent) {
    node.previous = parent.previous;
    node.next = parent;
    node.parent = parent;

    parent.left = node;
    parent.previous = node;

    if (node.previous) {
        node.previous.next = node;
    }

    if (parent === this.first) {
        this.first = node;
    }
};

AvlTree.prototype._addRight = function (node, parent) {
    node.previous = parent;
    node.next = parent.next;
    node.parent = parent;

    parent.right = node;
    parent.next = node;

    if (node.next) {
        node.next.previous = node;
    }

    if (parent === this.last) {
        this.last = node;
    }
};

AvlTree.prototype.add = function (obj) {
    this.count += 1;
    var newNode = new Node(obj);

    if (this.root === null) {
        this.root = newNode;
        this.first = this.root;
        this.last = this.root;
        return newNode;
    }

    var current = this.root;

    while (true) {

        var cmp = AvlTree.cmp(obj, current.object);
        if (cmp < 0) {
            // Adding to the left
            if (current.left === null) {
                this._addLeft(newNode, current);
                break;
            } else {
                current = current.left;
            }
        } else if (cmp > 0) {
            // Adding to the right
            if (current.right === null) {
                this._addRight(newNode, current);
                break;
            } else {
                current = current.right;
            }
        } else {
            if (current.left === null) {
                this._addLeft(newNode, current);
                break;
            } else if (current.right === null) {
                this._addRight(newNode, current);
                break;
            } else {
                if (current.right.height < current.left.height) {
                    current = current.right;
                } else {
                    current = current.left;
                }
            }
        }
    }

    this._balance(newNode.parent);

    return newNode;
};

AvlTree.prototype._balanceLeftRight = function (node) {
    var left = node.left;
    var a = left.left;
    var b = left.right.left;

    left.right.left = left;
    node.left = left.right;
    left = node.left;
    left.parent = node;

    var leftLeft = left.left;
    leftLeft.parent = left;
    leftLeft.left = a;
    leftLeft.right = b;
    if (a !== null) {
        a.parent = leftLeft;
    }
    if (b !== null) {
        b.parent = leftLeft;
    }

    left.height = leftLeft.height + 1;
};

AvlTree.prototype._balanceLeftLeft = function (node) {
    var left = node.left;
    var c = left.right;

    if (node === this.root) {
        this.root = left;
    } else {
        if (node.parent.right === node) {
            node.parent.right = left;
        } else {
            node.parent.left = left;
        }
    }

    left.right = node;
    left.parent = node.parent;
    node.parent = left;
    node.left = c;
    if(c !== null) {
        c.parent = node;
    }

    node.height = node.height - 1;
};

AvlTree.prototype._balanceRightLeft = function (node) {
    var right = node.right;
    var a = right.right;
    var b = right.left.right;

    right.left.right = right;
    node.right = right.left;
    right = node.right;
    right.parent = node;

    var rightRight = right.right;
    rightRight.parent = right;
    rightRight.right = a;
    rightRight.left = b;
    if (a !== null) {
        a.parent = rightRight;
    }
    if (b !== null) {
        b.parent = rightRight;
    }

    node.right.height = rightRight.height + 1;
};


AvlTree.prototype._balanceRightRight = function (node) {
    var right = node.right;
    var c = right.left;

    if (node === this.root) {
        this.root = right;
    } else {
        if (node.parent.left === node) {
            node.parent.left = right;
        } else {
            node.parent.right = right;
        }
    }

    right.left = node;
    right.parent = node.parent;
    node.parent = right;
    node.right = c;
    if(c !== null) {
        c.parent = node;
    }

    node.height = node.height - 1;
};

AvlTree.prototype._balance = function (node) {
    // Balancing the tree
    var current = node;
    while (current !== null) {
        var leftHeight = (current.left === null) ? 0 : current.left.height;
        var rightHeight = (current.right === null) ? 0 : current.right.height;
        var newHeight = 1 + Math.max(leftHeight, rightHeight);

        if (newHeight > current.height) {
            current.height = newHeight;
            if (leftHeight - rightHeight > 1) {

                // Left case
                if (current.left.right !== null && (current.left.left === null || current.left.left.height < current.left.right.height)) {
                    // Left Right Case
                    this._balanceLeftRight(current);
                }

                // Left Left Case
                this._balanceLeftLeft(current);

                // The tree has been balanced
                break;
            } else if (rightHeight - leftHeight > 1) {

                // Right case
                if (current.right.left !== null && (current.right.right === null || current.right.right.height < current.right.left.height)) {
                    // Right Left Case
                    this._balanceRightLeft(current);
                }

                // Right Right Case
                this._balanceRightRight(current);

                // The tree has been balanced
                break;
            } else {
                // Node is balanced
                current = current.parent;
            }
        } else {
            break;
        }
    }
};

AvlTree.prototype.remove = function (obj) {
    this._remove(obj, this.root);
};

AvlTree.prototype._remove = function (obj, node) {
    var current = node;

    while (current !== null) {
        var cmp = AvlTree.cmp(obj, current.object);
        if (cmp < 0) {
            current = current.left;
        } else if (cmp > 0) {
            current = current.right;
        } else {
            if (obj === current.object) {

                // Node removal
                this.count -= 1;

                if (current.previous === null) {
                    this.first = current.next;
                } else {
                    current.previous.next = current.next;
                }
                if (current.next === null) {
                    this.last = current.previous;
                } else {
                    current.next.previous = current.previous;
                }

                // Replacing the node by the smallest element greater than it
                var parent = current.parent;
                var left = current.left;
                var right = current.right;

                if (current.right === null) {
                    if (parent === null) {
                        this.root = left;
                    } else {
                        if (parent.right === current) {
                            parent.right = left;
                        } else {
                            parent.left = left;
                        }
                    }

                    if (left !== null) {
                        left.parent = parent;
                    }

                    this._balance(parent);
                    return 1;
                }

                var replacement = current.right;
                var balanceFrom;

                if (replacement.left === null) {
                    balanceFrom = replacement;

                    if (left !== null) {
                        left.parent = replacement;
                    }
                    replacement.left = left;

                    if (parent === null) {
                        this.root = replacement;
                    } else {
                        if (parent.right === current) {
                            parent.right = replacement;
                        } else {
                            parent.left = replacement;
                        }
                    }
                    replacement.parent = parent;

                    this._balance(balanceFrom);

                    return 1;
                }

                replacement = replacement.left;
                while (replacement.left !== null) {
                    replacement = replacement.left;
                }

                if (replacement.right !== null) {
                    replacement.right.parent = replacement.parent;
                }
                replacement.parent.left = replacement.right;

                if (right !== null) {
                    right.parent = replacement;
                }
                replacement.right = right;

                balanceFrom = replacement.parent;

                if (left !== null) {
                    left.parent = replacement;
                }
                replacement.left = left;

                if (parent === null) {
                    this.root = replacement;
                } else {
                    if (parent.right === current) {
                        parent.right = replacement;
                    } else {
                        parent.left = replacement;
                    }
                }
                replacement.parent = parent;

                this._balance(balanceFrom);

                return 1;
            } else {
                if (!this._remove(obj, current.left)) {
                    this._remove(obj, current.right);
                }
            }
        }
    }

    return 0;
};

AvlTree.prototype.removeByRef = function (node) {
    // Node removal
    this.count -= 1;

    if (node.previous === null) {
        this.first = node.next;
    } else {
        node.previous.next = node.next;
    }
    if (node.next === null) {
        this.last = node.previous;
    } else {
        node.next.previous = node.previous;
    }

    // Replacing the node by the smallest element greater than it
    var parent = node.parent;
    var left = node.left;
    var right = node.right;

    if (node.right === null) {
        if (parent === null) {
            this.root = left;
        } else {
            if (parent.right === node) {
                parent.right = left;
            } else {
                parent.left = left;
            }
        }

        if (left !== null) {
            left.parent = parent;
        }

        this._balance(parent);
        return 1;
    }

    var replacement = node.right;
    var balanceFrom;

    if (replacement.left === null) {
        balanceFrom = replacement;

        if (left !== null) {
            left.parent = replacement;
        }
        replacement.left = left;

        if (parent === null) {
            this.root = replacement;
        } else {
            if (parent.right === node) {
                parent.right = replacement;
            } else {
                parent.left = replacement;
            }
        }
        replacement.parent = parent;

        this._balance(balanceFrom);

        return 1;
    }

    replacement = replacement.left;
    while (replacement.left !== null) {
        replacement = replacement.left;
    }

    if (replacement.right !== null) {
        replacement.right.parent = replacement.parent;
    }
    replacement.parent.left = replacement.right;

    if (right !== null) {
        right.parent = replacement;
    }
    replacement.right = right;

    balanceFrom = replacement.parent;

    if (left !== null) {
        left.parent = replacement;
    }
    replacement.left = left;

    if (parent === null) {
        this.root = replacement;
    } else {
        if (parent.right === node) {
            parent.right = replacement;
        } else {
            parent.left = replacement;
        }
    }
    replacement.parent = parent;

    this._balance(balanceFrom);

    return 1;
};

AvlTree.prototype.getFirst = function () {
    return this.first;
};

AvlTree.prototype.getLast = function () {
    return this.last;
};

AvlTree.prototype.getHeight = function () {
    return this.root.height;
};

AvlTree.prototype.getRoot = function () {
    return this.root;
};

AvlTree.prototype.getCount = function () {
    return this.count;
};

AvlTree.prototype.forEach = function (processingFunc, params) {
    for (var current = this.first; current; current = current.next) {
        processingFunc(current.object, params);
    }
};

AvlTree.prototype.forEachReverse = function (processingFunc, params) {
    for (var current = this.last; current; current = current.previous) {
        processingFunc(current.object, params);
    }
};

AvlTree.prototype.clear = function () {
    this.count = 0;
    this.root = null;
    this.first = null;
    this.last = null;
};

module.exports = AvlTree;


console.log('\nAVL tree insert2: ');
var test = new AvlTree();
test.add(3);
test.add(14);
test.add(25);
test.add(81);
test.add(44);

/*
 14
 /    \
 3       44
 /   \
 25     81
 */


console.log('remove_Recursive 2:');

test.remove(81);
test.remove(3);
test.remove(14);
test.remove(25);
test.remove(44);


let str = 'cknobfjtlpqaegrmdhs';
//var str = 'ckbfjlaegmdh';


test = new AvlTree();
for(var i = 0; i < str.length; ++i){
    test.add(str[i]);
}


test.remove('e');
test.remove('h');
test.remove('b');
test.remove('l');
test.remove('f');
test.remove('j');
test.remove('g');
test.remove('d');
test.remove('k');
test.remove('a');
test.remove('m');
test.remove('n');
test.remove('o');
test.remove('p');
test.remove('q');
test.remove('r');
test.remove('s');
test.remove('t');
test.remove('c');