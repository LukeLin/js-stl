/*
Credit to Wikipedia's article on [Red-black
tree](http://en.wikipedia.org/wiki/Red–black_tree)

**Note:** doesn't handle duplicate entries, undefined and null. This is by
design.

## Overview example:

```js
var rbt = new RedBlackTree([7, 5, 1, 8]);
rbt.add(2); // => 2
rbt.add(10); // => 10
rbt.has(5); // => true
rbt.peekMin(); // => 1
rbt.peekMax(); // => 10
rbt.removeMin(); // => 1
rbt.removeMax(); // => 10
rbt.remove(8); // => 8
```

## Properties:

- size: The total number of items.
*/


(function() {
  var BLACK, NODE_FOUND, NODE_TOO_BIG, NODE_TOO_SMALL, RED, RedBlackTree, STOP_SEARCHING, _findNode, _grandParentOf, _isLeft, _leftOrRight, _peekMaxNode, _peekMinNode, _siblingOf, _uncleOf;

  NODE_FOUND = 0;

  NODE_TOO_BIG = 1;

  NODE_TOO_SMALL = 2;

  STOP_SEARCHING = 3;

  RED = 1;

  BLACK = 2;

  RedBlackTree = (function() {
    function RedBlackTree(valuesToAdd) {
      var value, _i, _len;
      if (valuesToAdd == null) {
        valuesToAdd = [];
      }
      /*
      Pass an optional array to be turned into binary tree. **Note:** does not
      accept duplicate, undefined and null.
      */

      this._root;
      this.size = 0;
      for (_i = 0, _len = valuesToAdd.length; _i < _len; _i++) {
        value = valuesToAdd[_i];
        if (value != null) {
          this.add(value);
        }
      }
    }

    RedBlackTree.prototype.add = function(value) {
      /*
      Again, make sure to not pass a value already in the tree, or undefined, or
      null.
      
      _Returns:_ value added.
      */

      var currentNode, foundNode, nodeToInsert, _ref;
      if (value == null) {
        return;
      }
      this.size++;
      nodeToInsert = {
        value: value,
        _color: RED
      };
      if (!this._root) {
        this._root = nodeToInsert;
      } else {
        foundNode = _findNode(this._root, function(node) {
          if (value === node.value) {
            return NODE_FOUND;
          } else {
            if (value < node.value) {
              if (node._left) {
                return NODE_TOO_BIG;
              } else {
                nodeToInsert._parent = node;
                node._left = nodeToInsert;
                return STOP_SEARCHING;
              }
            } else {
              if (node._right) {
                return NODE_TOO_SMALL;
              } else {
                nodeToInsert._parent = node;
                node._right = nodeToInsert;
                return STOP_SEARCHING;
              }
            }
          }
        });
        if (foundNode != null) {
          return;
        }
      }
      currentNode = nodeToInsert;
      while (true) {
        if (currentNode === this._root) {
          currentNode._color = BLACK;
          break;
        }
        if (currentNode._parent._color === BLACK) {
          break;
        }
        if (((_ref = _uncleOf(currentNode)) != null ? _ref._color : void 0) === RED) {
          currentNode._parent._color = BLACK;
          _uncleOf(currentNode)._color = BLACK;
          _grandParentOf(currentNode)._color = RED;
          currentNode = _grandParentOf(currentNode);
          continue;
        }
        if (!_isLeft(currentNode) && _isLeft(currentNode._parent)) {
          this._rotateLeft(currentNode._parent);
          currentNode = currentNode._left;
        } else if (_isLeft(currentNode) && !_isLeft(currentNode._parent)) {
          this._rotateRight(currentNode._parent);
          currentNode = currentNode._right;
        }
        currentNode._parent._color = BLACK;
        _grandParentOf(currentNode)._color = RED;
        if (_isLeft(currentNode)) {
          this._rotateRight(_grandParentOf(currentNode));
        } else {
          this._rotateLeft(_grandParentOf(currentNode));
        }
        break;
      }
      return value;
    };

    RedBlackTree.prototype.has = function(value) {
      /*
      _Returns:_ true or false.
      */

      var foundNode;
      foundNode = _findNode(this._root, function(node) {
        if (value === node.value) {
          return NODE_FOUND;
        } else if (value < node.value) {
          return NODE_TOO_BIG;
        } else {
          return NODE_TOO_SMALL;
        }
      });
      if (foundNode) {
        return true;
      } else {
        return false;
      }
    };

    RedBlackTree.prototype.peekMin = function() {
      /*
      Check the minimum value without removing it.
      
      _Returns:_ the minimum value.
      */

      var _ref;
      return (_ref = _peekMinNode(this._root)) != null ? _ref.value : void 0;
    };

    RedBlackTree.prototype.peekMax = function() {
      /*
      Check the maximum value without removing it.
      
      _Returns:_ the maximum value.
      */

      var _ref;
      return (_ref = _peekMaxNode(this._root)) != null ? _ref.value : void 0;
    };

    RedBlackTree.prototype.remove = function(value) {
      /*
      _Returns:_ the value removed, or undefined if the value's not found.
      */

      var foundNode;
      foundNode = _findNode(this._root, function(node) {
        if (value === node.value) {
          return NODE_FOUND;
        } else if (value < node.value) {
          return NODE_TOO_BIG;
        } else {
          return NODE_TOO_SMALL;
        }
      });
      if (!foundNode) {
        return;
      }
      this._removeNode(this._root, foundNode);
      this.size--;
      return value;
    };

    RedBlackTree.prototype.removeMin = function() {
      /*
      _Returns:_ smallest item removed, or undefined if tree's empty.
      */

      var nodeToRemove, valueToReturn;
      nodeToRemove = _peekMinNode(this._root);
      if (!nodeToRemove) {
        return;
      }
      valueToReturn = nodeToRemove.value;
      this._removeNode(this._root, nodeToRemove);
      return valueToReturn;
    };

    RedBlackTree.prototype.removeMax = function() {
      /*
      _Returns:_ biggest item removed, or undefined if tree's empty.
      */

      var nodeToRemove, valueToReturn;
      nodeToRemove = _peekMaxNode(this._root);
      if (!nodeToRemove) {
        return;
      }
      valueToReturn = nodeToRemove.value;
      this._removeNode(this._root, nodeToRemove);
      return valueToReturn;
    };

    RedBlackTree.prototype._removeNode = function(root, node) {
      var sibling, successor, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
      if (node._left && node._right) {
        successor = _peekMinNode(node._right);
        node.value = successor.value;
        node = successor;
      }
      successor = node._left || node._right;
      if (!successor) {
        successor = {
          color: BLACK,
          _right: void 0,
          _left: void 0,
          isLeaf: true
        };
      }
      successor._parent = node._parent;
      if ((_ref = node._parent) != null) {
        _ref[_leftOrRight(node)] = successor;
      }
      if (node._color === BLACK) {
        if (successor._color === RED) {
          successor._color = BLACK;
          if (!successor._parent) {
            this._root = successor;
          }
        } else {
          while (true) {
            if (!successor._parent) {
              if (!successor.isLeaf) {
                this._root = successor;
              } else {
                this._root = void 0;
              }
              break;
            }
            sibling = _siblingOf(successor);
            if ((sibling != null ? sibling._color : void 0) === RED) {
              successor._parent._color = RED;
              sibling._color = BLACK;
              if (_isLeft(successor)) {
                this._rotateLeft(successor._parent);
              } else {
                this._rotateRight(successor._parent);
              }
            }
            sibling = _siblingOf(successor);
            if (successor._parent._color === BLACK && (!sibling || (sibling._color === BLACK && (!sibling._left || sibling._left._color === BLACK) && (!sibling._right || sibling._right._color === BLACK)))) {
              if (sibling != null) {
                sibling._color = RED;
              }
              if (successor.isLeaf) {
                successor._parent[_leftOrRight(successor)] = void 0;
              }
              successor = successor._parent;
              continue;
            }
            if (successor._parent._color === RED && (!sibling || (sibling._color === BLACK && (!sibling._left || ((_ref1 = sibling._left) != null ? _ref1._color : void 0) === BLACK) && (!sibling._right || ((_ref2 = sibling._right) != null ? _ref2._color : void 0) === BLACK)))) {
              if (sibling != null) {
                sibling._color = RED;
              }
              successor._parent._color = BLACK;
              break;
            }
            if ((sibling != null ? sibling._color : void 0) === BLACK) {
              if (_isLeft(successor) && (!sibling._right || sibling._right._color === BLACK) && ((_ref3 = sibling._left) != null ? _ref3._color : void 0) === RED) {
                sibling._color = RED;
                if ((_ref4 = sibling._left) != null) {
                  _ref4._color = BLACK;
                }
                this._rotateRight(sibling);
              } else if (!_isLeft(successor) && (!sibling._left || sibling._left._color === BLACK) && ((_ref5 = sibling._right) != null ? _ref5._color : void 0) === RED) {
                sibling._color = RED;
                if ((_ref6 = sibling._right) != null) {
                  _ref6._color = BLACK;
                }
                this._rotateLeft(sibling);
              }
              break;
            }
            sibling = _siblingOf(successor);
            sibling._color = successor._parent._color;
            if (_isLeft(successor)) {
              sibling._right._color = BLACK;
              this._rotateRight(successor._parent);
            } else {
              sibling._left._color = BLACK;
              this._rotateLeft(successor._parent);
            }
          }
        }
      }
      if (successor.isLeaf) {
        return (_ref7 = successor._parent) != null ? _ref7[_leftOrRight(successor)] = void 0 : void 0;
      }
    };

    RedBlackTree.prototype._rotateLeft = function(node) {
      var _ref, _ref1;
      if ((_ref = node._parent) != null) {
        _ref[_leftOrRight(node)] = node._right;
      }
      node._right._parent = node._parent;
      node._parent = node._right;
      node._right = node._right._left;
      node._parent._left = node;
      if ((_ref1 = node._right) != null) {
        _ref1._parent = node;
      }
      if (node._parent._parent == null) {
        return this._root = node._parent;
      }
    };

    RedBlackTree.prototype._rotateRight = function(node) {
      var _ref, _ref1;
      if ((_ref = node._parent) != null) {
        _ref[_leftOrRight(node)] = node._left;
      }
      node._left._parent = node._parent;
      node._parent = node._left;
      node._left = node._left._right;
      node._parent._right = node;
      if ((_ref1 = node._left) != null) {
        _ref1._parent = node;
      }
      if (node._parent._parent == null) {
        return this._root = node._parent;
      }
    };

    return RedBlackTree;

  })();

  _isLeft = function(node) {
    return node === node._parent._left;
  };

  _leftOrRight = function(node) {
    if (_isLeft(node)) {
      return '_left';
    } else {
      return '_right';
    }
  };

  _findNode = function(startingNode, comparator) {
    var comparisonResult, currentNode, foundNode;
    currentNode = startingNode;
    foundNode = void 0;
    while (currentNode) {
      comparisonResult = comparator(currentNode);
      if (comparisonResult === NODE_FOUND) {
        foundNode = currentNode;
        break;
      }
      if (comparisonResult === NODE_TOO_BIG) {
        currentNode = currentNode._left;
      } else if (comparisonResult === NODE_TOO_SMALL) {
        currentNode = currentNode._right;
      } else if (comparisonResult === STOP_SEARCHING) {
        break;
      }
    }
    return foundNode;
  };

  _peekMinNode = function(startingNode) {
    return _findNode(startingNode, function(node) {
      if (node._left) {
        return NODE_TOO_BIG;
      } else {
        return NODE_FOUND;
      }
    });
  };

  _peekMaxNode = function(startingNode) {
    return _findNode(startingNode, function(node) {
      if (node._right) {
        return NODE_TOO_SMALL;
      } else {
        return NODE_FOUND;
      }
    });
  };

  _grandParentOf = function(node) {
    var _ref;
    return (_ref = node._parent) != null ? _ref._parent : void 0;
  };

  _uncleOf = function(node) {
    if (!_grandParentOf(node)) {
      return;
    }
    if (_isLeft(node._parent)) {
      return _grandParentOf(node)._right;
    } else {
      return _grandParentOf(node)._left;
    }
  };

  _siblingOf = function(node) {
    if (_isLeft(node)) {
      return node._parent._right;
    } else {
      return node._parent._left;
    }
  };

  module.exports = RedBlackTree;

}).call(this);
