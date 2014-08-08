/*
Minimum heap, i.e. smallest node at root.

**Note:** does not accept null or undefined. This is by design. Those values
cause comparison problems and might report false negative during extraction.

## Overview example:

```js
var heap = new Heap([5, 6, 3, 4]);
heap.add(10); // => 10
heap.removeMin(); // => 3
heap.peekMin(); // => 4
```

## Properties:

- size: total number of items.
*/


(function() {
  var Heap, _leftChild, _parent, _rightChild;

  Heap = (function() {
    function Heap(dataToHeapify) {
      var i, item, _i, _j, _len, _ref;
      if (dataToHeapify == null) {
        dataToHeapify = [];
      }
      /*
      Pass an optional array to be heapified. Takes only O(n) time.
      */

      this._data = [void 0];
      for (_i = 0, _len = dataToHeapify.length; _i < _len; _i++) {
        item = dataToHeapify[_i];
        if (item != null) {
          this._data.push(item);
        }
      }
      if (this._data.length > 1) {
        for (i = _j = 2, _ref = this._data.length; 2 <= _ref ? _j < _ref : _j > _ref; i = 2 <= _ref ? ++_j : --_j) {
          this._upHeap(i);
        }
      }
      this.size = this._data.length - 1;
    }

    Heap.prototype.add = function(value) {
      /*
      **Remember:** rejects null and undefined for mentioned reasons.
      
      _Returns:_ the value added.
      */

      if (value == null) {
        return;
      }
      this._data.push(value);
      this._upHeap(this._data.length - 1);
      this.size++;
      return value;
    };

    Heap.prototype.removeMin = function() {
      /*
      _Returns:_ the smallest item (the root).
      */

      var min;
      if (this._data.length === 1) {
        return;
      }
      this.size--;
      if (this._data.length === 2) {
        return this._data.pop();
      }
      min = this._data[1];
      this._data[1] = this._data.pop();
      this._downHeap();
      return min;
    };

    Heap.prototype.peekMin = function() {
      /*
      Check the smallest item without removing it.
      
      _Returns:_ the smallest item (the root).
      */

      return this._data[1];
    };

    Heap.prototype._upHeap = function(index) {
      var valueHolder, _ref;
      valueHolder = this._data[index];
      while (this._data[index] < this._data[_parent(index)] && index > 1) {
        _ref = [this._data[_parent(index)], this._data[index]], this._data[index] = _ref[0], this._data[_parent(index)] = _ref[1];
        index = _parent(index);
      }
    };

    Heap.prototype._downHeap = function() {
      var currentIndex, smallerChildIndex, _ref;
      currentIndex = 1;
      while (_leftChild(currentIndex < this._data.length)) {
        smallerChildIndex = _leftChild(currentIndex);
        if (smallerChildIndex < this._data.length - 1) {
          if (this._data[_rightChild(currentIndex)] < this._data[smallerChildIndex]) {
            smallerChildIndex = _rightChild(currentIndex);
          }
        }
        if (this._data[smallerChildIndex] < this._data[currentIndex]) {
          _ref = [this._data[currentIndex], this._data[smallerChildIndex]], this._data[smallerChildIndex] = _ref[0], this._data[currentIndex] = _ref[1];
          currentIndex = smallerChildIndex;
        } else {
          break;
        }
      }
    };

    return Heap;

  })();

  _parent = function(index) {
    return index >> 1;
  };

  _leftChild = function(index) {
    return index << 1;
  };

  _rightChild = function(index) {
    return (index << 1) + 1;
  };

  module.exports = Heap;

}).call(this);
