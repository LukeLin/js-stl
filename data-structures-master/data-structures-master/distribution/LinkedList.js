/*
Doubly Linked.

## Overview example:

```js
var list = new LinkedList([5, 4, 9]);
list.add(12); // => 12
list.head.next.value; // => 4
list.tail.value; // => 12
list.at(-1); // => 12
list.removeAt(2); // => 9
list.remove(4); // => 4
list.indexOf(5); // => 0
list.add(5, 1); // => 5. Second 5 at position 1.
list.indexOf(5, 1); // => 1
```

## Properties:

- head: first item.
- tail: last item.
- size: total number of items.
- item.value: value passed to the item when calling `add()`.
- item.prev: previous item.
- item.next: next item.
*/


(function() {
  var LinkedList;

  LinkedList = (function() {
    function LinkedList(valuesToAdd) {
      var value, _i, _len;
      if (valuesToAdd == null) {
        valuesToAdd = [];
      }
      /*
      Can pass an array of elements to link together during `new LinkedList()`
      initiation.
      */

      this.head = {
        prev: void 0,
        value: void 0,
        next: void 0
      };
      this.tail = {
        prev: void 0,
        value: void 0,
        next: void 0
      };
      this.size = 0;
      for (_i = 0, _len = valuesToAdd.length; _i < _len; _i++) {
        value = valuesToAdd[_i];
        this.add(value);
      }
    }

    LinkedList.prototype.at = function(position) {
      /*
      Get the item at `position` (optional). Accepts negative index:
      
      ```js
      myList.at(-1); // Returns the last element.
      ```
      However, passing a negative index that surpasses the boundary will return
      undefined:
      
      ```js
      myList = new LinkedList([2, 6, 8, 3])
      myList.at(-5); // Undefined.
      myList.at(-4); // 2.
      ```
      _Returns:_ item gotten, or undefined if not found.
      */

      var currentNode, i, _i, _j, _ref;
      if (!((-this.size <= position && position < this.size))) {
        return;
      }
      position = this._adjust(position);
      if (position * 2 < this.size) {
        currentNode = this.head;
        for (i = _i = 1; _i <= position; i = _i += 1) {
          currentNode = currentNode.next;
        }
      } else {
        currentNode = this.tail;
        for (i = _j = 1, _ref = this.size - position - 1; _j <= _ref; i = _j += 1) {
          currentNode = currentNode.prev;
        }
      }
      return currentNode;
    };

    LinkedList.prototype.add = function(value, position) {
      var currentNode, nodeToAdd, _ref, _ref1, _ref2;
      if (position == null) {
        position = this.size;
      }
      /*
      Add a new item at `position` (optional). Defaults to adding at the end.
      `position`, just like in `at()`, can be negative (within the negative
      boundary). Position specifies the place the value's going to be, and the old
      node will be pushed higher. `add(-2)` on list of size 7 is the same as
      `add(5)`.
      
      _Returns:_ item added.
      */

      if (!((-this.size <= position && position <= this.size))) {
        return;
      }
      nodeToAdd = {
        value: value
      };
      position = this._adjust(position);
      if (this.size === 0) {
        this.head = nodeToAdd;
      } else {
        if (position === 0) {
          _ref = [nodeToAdd, this.head, nodeToAdd], this.head.prev = _ref[0], nodeToAdd.next = _ref[1], this.head = _ref[2];
        } else {
          currentNode = this.at(position - 1);
          _ref1 = [currentNode.next, nodeToAdd, nodeToAdd, currentNode], nodeToAdd.next = _ref1[0], (_ref2 = currentNode.next) != null ? _ref2.prev = _ref1[1] : void 0, currentNode.next = _ref1[2], nodeToAdd.prev = _ref1[3];
        }
      }
      if (position === this.size) {
        this.tail = nodeToAdd;
      }
      this.size++;
      return value;
    };

    LinkedList.prototype.removeAt = function(position) {
      var currentNode, valueToReturn, _ref;
      if (position == null) {
        position = this.size - 1;
      }
      /*
      Remove an item at index `position` (optional). Defaults to the last item.
      Index can be negative (within the boundary).
      
      _Returns:_ item removed.
      */

      if (!((-this.size <= position && position < this.size))) {
        return;
      }
      if (this.size === 0) {
        return;
      }
      position = this._adjust(position);
      if (this.size === 1) {
        valueToReturn = this.head.value;
        this.head.value = this.tail.value = void 0;
      } else {
        if (position === 0) {
          valueToReturn = this.head.value;
          this.head = this.head.next;
          this.head.prev = void 0;
        } else {
          currentNode = this.at(position);
          valueToReturn = currentNode.value;
          currentNode.prev.next = currentNode.next;
          if ((_ref = currentNode.next) != null) {
            _ref.prev = currentNode.prev;
          }
          if (position === this.size - 1) {
            this.tail = currentNode.prev;
          }
        }
      }
      this.size--;
      return valueToReturn;
    };

    LinkedList.prototype.remove = function(value) {
      /*
      Remove the item using its value instead of position. **Will remove the fist
      occurrence of `value`.**
      
      _Returns:_ the value, or undefined if value's not found.
      */

      var currentNode;
      if (value == null) {
        return;
      }
      currentNode = this.head;
      while (currentNode && currentNode.value !== value) {
        currentNode = currentNode.next;
      }
      if (!currentNode) {
        return;
      }
      if (this.size === 1) {
        this.head.value = this.tail.value = void 0;
      } else if (currentNode === this.head) {
        this.head = this.head.next;
        this.head.prev = void 0;
      } else if (currentNode === this.tail) {
        this.tail = this.tail.prev;
        this.tail.next = void 0;
      } else {
        currentNode.prev.next = currentNode.next;
        currentNode.next.prev = currentNode.prev;
      }
      this.size--;
      return value;
    };

    LinkedList.prototype.indexOf = function(value, startingPosition) {
      var currentNode, position;
      if (startingPosition == null) {
        startingPosition = 0;
      }
      /*
      Find the index of an item, similarly to `array.indexOf()`. Defaults to start
      searching from the beginning, by can start at another position by passing
      `startingPosition`. This parameter can also be negative; but unlike the
      other methods of this class, `startingPosition` (optional) can be as small
      as desired; a value of -999 for a list of size 5 will start searching
      normally, at the beginning.
      
      **Note:** searches forwardly, **not** backwardly, i.e:
      
      ```js
      var myList = new LinkedList([2, 3, 1, 4, 3, 5])
      myList.indexOf(3, -3); // Returns 4, not 1
      ```
      _Returns:_ index of item found, or -1 if not found.
      */

      if (((this.head.value == null) && !this.head.next) || startingPosition >= this.size) {
        return -1;
      }
      startingPosition = Math.max(0, this._adjust(startingPosition));
      currentNode = this.at(startingPosition);
      position = startingPosition;
      while (currentNode) {
        if (currentNode.value === value) {
          break;
        }
        currentNode = currentNode.next;
        position++;
      }
      if (position === this.size) {
        return -1;
      } else {
        return position;
      }
    };

    LinkedList.prototype._adjust = function(position) {
      if (position < 0) {
        return this.size + position;
      } else {
        return position;
      }
    };

    return LinkedList;

  })();

  module.exports = LinkedList;

}).call(this);

