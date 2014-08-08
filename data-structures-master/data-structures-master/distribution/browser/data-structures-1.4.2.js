require=(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({"data-structures":[function(require,module,exports){
module.exports=require('SuzRTw');
},{}],"SuzRTw":[function(require,module,exports){
(function() {
  module.exports = {
    Graph: require('./Graph'),
    Heap: require('./Heap'),
    LinkedList: require('./LinkedList'),
    Map: require('./Map'),
    Queue: require('./Queue'),
    RedBlackTree: require('./RedBlackTree'),
    Trie: require('./Trie')
  };

}).call(this);

},{"./Graph":1,"./Heap":2,"./LinkedList":3,"./Map":4,"./Queue":5,"./RedBlackTree":6,"./Trie":7}],1:[function(require,module,exports){
/*
Graph implemented as a modified incidence list. O(1) for every typical
operation except `removeNode()` at O(E) where E is the number of edges.

## Overview example:

```js
var graph = new Graph;
graph.addNode('A'); // => a node object. For more info, log the output or check
                    // the documentation for addNode
graph.addNode('B');
graph.addNode('C');
graph.addEdge('A', 'C'); // => an edge object
graph.addEdge('A', 'B');
graph.getEdge('B', 'A'); // => undefined. Directed edge!
graph.getEdge('A', 'B'); // => the edge object previously added
graph.getEdge('A', 'B').weight = 2 // weight is the only built-in handy property
                                   // of an edge object. Feel free to attach
                                   // other properties
graph.getInEdgesOf('B'); // => array of edge objects, in this case only one;
                         // connecting A to B
graph.getOutEdgesOf('A'); // => array of edge objects, one to B and one to C
graph.getAllEdgesOf('A'); // => all the in and out edges. Edge directed toward
                          // the node itself are only counted once
forEachNode(function(nodeObject) {
  console.log(node);
});
forEachEdge(function(edgeObject) {
  console.log(edgeObject);
});
graph.removeNode('C'); // => 'C'. The edge between A and C also removed
graph.removeEdge('A', 'B'); // => the edge object removed
```

## Properties:

- nodeSize: total number of nodes.
- edgeSize: total number of edges.
*/


(function() {
  var Graph,
    __hasProp = {}.hasOwnProperty;

  Graph = (function() {
    function Graph() {
      this._nodes = {};
      this.nodeSize = 0;
      this.edgeSize = 0;
    }

    Graph.prototype.addNode = function(id) {
      /*
      The `id` is a unique identifier for the node, and should **not** change
      after it's added. It will be used for adding, retrieving and deleting
      related edges too.
      
      **Note** that, internally, the ids are kept in an object. JavaScript's
      object hashes the id `'2'` and `2` to the same key, so please stick to a
      simple id data type such as number or string.
      
      _Returns:_ the node object. Feel free to attach additional custom properties
      on it for graph algorithms' needs. **Undefined if node id already exists**,
      as to avoid accidental overrides.
      */

      if (!this._nodes[id]) {
        this.nodeSize++;
        return this._nodes[id] = {
          _outEdges: {},
          _inEdges: {}
        };
      }
    };

    Graph.prototype.getNode = function(id) {
      /*
      _Returns:_ the node object. Feel free to attach additional custom properties
      on it for graph algorithms' needs.
      */

      return this._nodes[id];
    };

    Graph.prototype.removeNode = function(id) {
      /*
      _Returns:_ the node object removed, or undefined if it didn't exist in the
      first place.
      */

      var inEdgeId, nodeToRemove, outEdgeId, _ref, _ref1;
      nodeToRemove = this._nodes[id];
      if (!nodeToRemove) {
        return;
      } else {
        _ref = nodeToRemove._outEdges;
        for (outEdgeId in _ref) {
          if (!__hasProp.call(_ref, outEdgeId)) continue;
          this.removeEdge(id, outEdgeId);
        }
        _ref1 = nodeToRemove._inEdges;
        for (inEdgeId in _ref1) {
          if (!__hasProp.call(_ref1, inEdgeId)) continue;
          this.removeEdge(inEdgeId, id);
        }
        this.nodeSize--;
        delete this._nodes[id];
      }
      return nodeToRemove;
    };

    Graph.prototype.addEdge = function(fromId, toId, weight) {
      var edgeToAdd, fromNode, toNode;
      if (weight == null) {
        weight = 1;
      }
      /*
      `fromId` and `toId` are the node id specified when it was created using
      `addNode()`. `weight` is optional and defaults to 1. Ignoring it effectively
      makes this an unweighted graph. Under the hood, `weight` is just a normal
      property of the edge object.
      
      _Returns:_ the edge object created. Feel free to attach additional custom
      properties on it for graph algorithms' needs. **Or undefined** if the nodes
      of id `fromId` or `toId` aren't found, or if an edge already exists between
      the two nodes.
      */

      if (this.getEdge(fromId, toId)) {
        return;
      }
      fromNode = this._nodes[fromId];
      toNode = this._nodes[toId];
      if (!fromNode || !toNode) {
        return;
      }
      edgeToAdd = {
        weight: weight
      };
      fromNode._outEdges[toId] = edgeToAdd;
      toNode._inEdges[fromId] = edgeToAdd;
      this.edgeSize++;
      return edgeToAdd;
    };

    Graph.prototype.getEdge = function(fromId, toId) {
      /*
      _Returns:_ the edge object, or undefined if the nodes of id `fromId` or
      `toId` aren't found.
      */

      var fromNode, toNode;
      fromNode = this._nodes[fromId];
      toNode = this._nodes[toId];
      if (!fromNode || !toNode) {

      } else {
        return fromNode._outEdges[toId];
      }
    };

    Graph.prototype.removeEdge = function(fromId, toId) {
      /*
      _Returns:_ the edge object removed, or undefined of edge wasn't found.
      */

      var edgeToDelete, fromNode, toNode;
      fromNode = this._nodes[fromId];
      toNode = this._nodes[toId];
      edgeToDelete = this.getEdge(fromId, toId);
      if (!edgeToDelete) {
        return;
      }
      delete fromNode._outEdges[toId];
      delete toNode._inEdges[fromId];
      this.edgeSize--;
      return edgeToDelete;
    };

    Graph.prototype.getInEdgesOf = function(nodeId) {
      /*
      _Returns:_ an array of edge objects that are directed toward the node, or
      empty array if no such edge or node exists.
      */

      var fromId, inEdges, toNode, _ref;
      toNode = this._nodes[nodeId];
      inEdges = [];
      _ref = toNode != null ? toNode._inEdges : void 0;
      for (fromId in _ref) {
        if (!__hasProp.call(_ref, fromId)) continue;
        inEdges.push(this.getEdge(fromId, nodeId));
      }
      return inEdges;
    };

    Graph.prototype.getOutEdgesOf = function(nodeId) {
      /*
      _Returns:_ an array of edge objects that go out of the node, or empty array
      if no such edge or node exists.
      */

      var fromNode, outEdges, toId, _ref;
      fromNode = this._nodes[nodeId];
      outEdges = [];
      _ref = fromNode != null ? fromNode._outEdges : void 0;
      for (toId in _ref) {
        if (!__hasProp.call(_ref, toId)) continue;
        outEdges.push(this.getEdge(nodeId, toId));
      }
      return outEdges;
    };

    Graph.prototype.getAllEdgesOf = function(nodeId) {
      /*
      **Note:** not the same as concatenating `getInEdgesOf()` and
      `getOutEdgesOf()`. Some nodes might have an edge pointing toward itself.
      This method solves that duplication.
      
      _Returns:_ an array of edge objects linked to the node, no matter if they're
      outgoing or coming. Duplicate edge created by self-pointing nodes are
      removed. Only one copy stays. Empty array if node has no edge.
      */

      var i, inEdges, outEdges, selfEdge, _i, _ref, _ref1;
      inEdges = this.getInEdgesOf(nodeId);
      outEdges = this.getOutEdgesOf(nodeId);
      if (inEdges.length === 0) {
        return outEdges;
      }
      selfEdge = this.getEdge(nodeId, nodeId);
      for (i = _i = 0, _ref = inEdges.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (inEdges[i] === selfEdge) {
          _ref1 = [inEdges[inEdges.length - 1], inEdges[i]], inEdges[i] = _ref1[0], inEdges[inEdges.length - 1] = _ref1[1];
          inEdges.pop();
          break;
        }
      }
      return inEdges.concat(outEdges);
    };

    Graph.prototype.forEachNode = function(operation) {
      /*
      Traverse through the graph in an arbitrary manner, visiting each node once.
      Pass a function of the form `fn(nodeObject, nodeId)`.
      
      _Returns:_ undefined.
      */

      var nodeId, nodeObject, _ref;
      _ref = this._nodes;
      for (nodeId in _ref) {
        if (!__hasProp.call(_ref, nodeId)) continue;
        nodeObject = _ref[nodeId];
        operation(nodeObject, nodeId);
      }
    };

    Graph.prototype.forEachEdge = function(operation) {
      /*
      Traverse through the graph in an arbitrary manner, visiting each edge once.
      Pass a function of the form `fn(edgeObject)`.
      
      _Returns:_ undefined.
      */

      var edgeObject, nodeId, nodeObject, toId, _ref, _ref1;
      _ref = this._nodes;
      for (nodeId in _ref) {
        if (!__hasProp.call(_ref, nodeId)) continue;
        nodeObject = _ref[nodeId];
        _ref1 = nodeObject._outEdges;
        for (toId in _ref1) {
          if (!__hasProp.call(_ref1, toId)) continue;
          edgeObject = _ref1[toId];
          operation(edgeObject);
        }
      }
    };

    return Graph;

  })();

  module.exports = Graph;

}).call(this);

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
/*
Kind of a stopgap measure for the upcoming [JavaScript
Map](http://wiki.ecmascript.org/doku.php?id=harmony:simple_maps_and_sets)

**Note:** due to JavaScript's limitations, hashing something other than Boolean,
Number, String, Undefined, Null, RegExp, Function requires a hack that inserts a
hidden unique property into the object. This means `set`, `get`, `has` and
`delete` must employ the same object, and not a mere identical copy as in the
case of, say, a string.

## Overview example:

```js
var map = new Map({'alice': 'wonderland', 20: 'ok'});
map.set('20', 5); // => 5
map.get('20'); // => 5
map.has('alice'); // => true
map.delete(20) // => true
var arr = [1, 2];
map.add(arr, 'goody'); // => 'goody'
map.has(arr); // => true
map.has([1, 2]); // => false. Needs to compare by reference
map.forEach(function(key, value) {
  console.log(key, value);
});
```

## Properties:

- size: The total number of `(key, value)` pairs.
*/


(function() {
  var Map, SPECIAL_TYPE_KEY_PREFIX, _extractDataType, _isSpecialType,
    __hasProp = {}.hasOwnProperty;

  SPECIAL_TYPE_KEY_PREFIX = '_mapId_';

  Map = (function() {
    Map._mapIdTracker = 0;

    Map._newMapId = function() {
      return this._mapIdTracker++;
    };

    function Map(objectToMap) {
      /*
      Pass an optional object whose (key, value) pair will be hashed. **Careful**
      not to pass something like {5: 'hi', '5': 'hello'}, since JavaScript's
      native object behavior will crush the first 5 property before it gets to
      constructor.
      */

      var key, value;
      this._content = {};
      this._itemId = 0;
      this._id = Map._newMapId();
      this.size = 0;
      for (key in objectToMap) {
        if (!__hasProp.call(objectToMap, key)) continue;
        value = objectToMap[key];
        this.set(key, value);
      }
    }

    Map.prototype.hash = function(key, makeHash) {
      var propertyForMap, type;
      if (makeHash == null) {
        makeHash = false;
      }
      /*
      The hash function for hashing keys is public. Feel free to replace it with
      your own. The `makeHash` parameter is optional and accepts a boolean
      (defaults to `false`) indicating whether or not to produce a new hash (for
      the first use, naturally).
      
      _Returns:_ the hash.
      */

      type = _extractDataType(key);
      if (_isSpecialType(key)) {
        propertyForMap = SPECIAL_TYPE_KEY_PREFIX + this._id;
        if (makeHash && !key[propertyForMap]) {
          key[propertyForMap] = this._itemId++;
        }
        return propertyForMap + '_' + key[propertyForMap];
      } else {
        return type + '_' + key;
      }
    };

    Map.prototype.set = function(key, value) {
      /*
      _Returns:_ value.
      */

      if (!this.has(key)) {
        this.size++;
      }
      this._content[this.hash(key, true)] = [value, key];
      return value;
    };

    Map.prototype.get = function(key) {
      /*
      _Returns:_ value corresponding to the key, or undefined if not found.
      */

      var _ref;
      return (_ref = this._content[this.hash(key)]) != null ? _ref[0] : void 0;
    };

    Map.prototype.has = function(key) {
      /*
      Check whether a value exists for the key.
      
      _Returns:_ true or false.
      */

      return this.hash(key) in this._content;
    };

    Map.prototype["delete"] = function(key) {
      /*
      Remove the (key, value) pair.
      
      _Returns:_ **true or false**. Unlike most of this library, this method
      doesn't return the deleted value. This is so that it conforms to the future
      JavaScript `map.delete()`'s behavior.
      */

      var hashedKey;
      hashedKey = this.hash(key);
      if (hashedKey in this._content) {
        delete this._content[hashedKey];
        if (_isSpecialType(key)) {
          delete key[SPECIAL_TYPE_KEY_PREFIX + this._id];
        }
        this.size--;
        return true;
      }
      return false;
    };

    Map.prototype.forEach = function(operation) {
      /*
      Traverse through the map. Pass a function of the form `fn(key, value)`.
      
      _Returns:_ undefined.
      */

      var key, value, _ref;
      _ref = this._content;
      for (key in _ref) {
        if (!__hasProp.call(_ref, key)) continue;
        value = _ref[key];
        operation(value[1], value[0]);
      }
    };

    return Map;

  })();

  _isSpecialType = function(key) {
    var simpleHashableTypes, simpleType, type, _i, _len;
    simpleHashableTypes = ['Boolean', 'Number', 'String', 'Undefined', 'Null', 'RegExp', 'Function'];
    type = _extractDataType(key);
    for (_i = 0, _len = simpleHashableTypes.length; _i < _len; _i++) {
      simpleType = simpleHashableTypes[_i];
      if (type === simpleType) {
        return false;
      }
    }
    return true;
  };

  _extractDataType = function(type) {
    return Object.prototype.toString.apply(type).match(/\[object (.+)\]/)[1];
  };

  module.exports = Map;

}).call(this);

},{}],5:[function(require,module,exports){
/*
Amortized O(1) dequeue!

## Overview example:

```js
var queue = new Queue([1, 6, 4]);
queue.enqueue(10); // => 10
queue.dequeue(); // => 1
queue.dequeue(); // => 6
queue.dequeue(); // => 4
queue.peek(); // => 10
queue.dequeue(); // => 10
queue.peek(); // => undefined
```

## Properties:

- size: The total number of items.
*/


(function() {
  var Queue;

  Queue = (function() {
    function Queue(initialArray) {
      if (initialArray == null) {
        initialArray = [];
      }
      /*
      Pass an optional array to be transformed into a queue. The item at index 0
      is the first to be dequeued.
      */

      this._content = initialArray;
      this._dequeueIndex = 0;
      this.size = this._content.length;
    }

    Queue.prototype.enqueue = function(item) {
      /*
      _Returns:_ the item.
      */

      this.size++;
      this._content.push(item);
      return item;
    };

    Queue.prototype.dequeue = function() {
      /*
      _Returns:_ the dequeued item.
      */

      var itemToDequeue;
      if (this.size === 0) {
        return;
      }
      this.size--;
      itemToDequeue = this._content[this._dequeueIndex];
      this._dequeueIndex++;
      if (this._dequeueIndex * 2 > this._content.length) {
        this._content = this._content.slice(this._dequeueIndex);
        this._dequeueIndex = 0;
      }
      return itemToDequeue;
    };

    Queue.prototype.peek = function() {
      /*
      Check the next item to be dequeued, without removing it.
      
      _Returns:_ the item.
      */

      return this._content[this._dequeueIndex];
    };

    return Queue;

  })();

  module.exports = Queue;

}).call(this);

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
/*
Good for fast insertion/removal/lookup of strings.

## Overview example:

```js
var trie = new Trie(['bear', 'beer']);
trie.add('hello'); // => 'hello'
trie.add('helloha!'); // => 'helloha!'
trie.has('bears'); // => false
trie.longestPrefixOf('beatrice'); // => 'bea'
trie.wordsWithPrefix('hel'); // => ['hello', 'helloha!']
trie.remove('beers'); // => undefined. 'beer' still exists
trie.remove('Beer') // => undefined. Case-sensitive
trie.remove('beer') // => 'beer'. Removed
```

## Properties:

- size: The total number of words.
*/


(function() {
  var Queue, Trie, WORD_END, _hasAtLeastNChildren,
    __hasProp = {}.hasOwnProperty;

  Queue = require('./Queue');

  WORD_END = 'end';

  Trie = (function() {
    function Trie(words) {
      var word, _i, _len;
      if (words == null) {
        words = [];
      }
      /*
      Pass an optional array of strings to be inserted initially.
      */

      this._root = {};
      this.size = 0;
      for (_i = 0, _len = words.length; _i < _len; _i++) {
        word = words[_i];
        this.add(word);
      }
    }

    Trie.prototype.add = function(word) {
      /*
      Add a whole string to the trie.
      
      _Returns:_ the word added. Will return undefined (without adding the value)
      if the word passed is null or undefined.
      */

      var currentNode, letter, _i, _len;
      if (word == null) {
        return;
      }
      this.size++;
      currentNode = this._root;
      for (_i = 0, _len = word.length; _i < _len; _i++) {
        letter = word[_i];
        if (currentNode[letter] == null) {
          currentNode[letter] = {};
        }
        currentNode = currentNode[letter];
      }
      currentNode[WORD_END] = true;
      return word;
    };

    Trie.prototype.has = function(word) {
      /*
      __Returns:_ true or false.
      */

      var currentNode, letter, _i, _len;
      if (word == null) {
        return false;
      }
      currentNode = this._root;
      for (_i = 0, _len = word.length; _i < _len; _i++) {
        letter = word[_i];
        if (currentNode[letter] == null) {
          return false;
        }
        currentNode = currentNode[letter];
      }
      if (currentNode[WORD_END]) {
        return true;
      } else {
        return false;
      }
    };

    Trie.prototype.longestPrefixOf = function(word) {
      /*
      Find all words containing the prefix. The word itself counts as a prefix.
      
      ```js
      var trie = new Trie;
      trie.add('hello');
      trie.longestPrefixOf('he'); // 'he'
      trie.longestPrefixOf('hello'); // 'hello'
      trie.longestPrefixOf('helloha!'); // 'hello'
      ```
      
      _Returns:_ the prefix string, or empty string if no prefix found.
      */

      var currentNode, letter, prefix, _i, _len;
      if (word == null) {
        return '';
      }
      currentNode = this._root;
      prefix = '';
      for (_i = 0, _len = word.length; _i < _len; _i++) {
        letter = word[_i];
        if (currentNode[letter] == null) {
          break;
        }
        prefix += letter;
        currentNode = currentNode[letter];
      }
      return prefix;
    };

    Trie.prototype.wordsWithPrefix = function(prefix) {
      /*
      Find all words containing the prefix. The word itself counts as a prefix.
      **Watch out for edge cases.**
      
      ```js
      var trie = new Trie;
      trie.wordsWithPrefix(''); // []. Check later case below.
      trie.add('');
      trie.wordsWithPrefix(''); // ['']
      trie.add('he');
      trie.add('hello');
      trie.add('hell');
      trie.add('bear');
      trie.add('z');
      trie.add('zebra');
      trie.wordsWithPrefix('hel'); // ['hell', 'hello']
      ```
      
      _Returns:_ an array of strings, or empty array if no word found.
      */

      var accumulatedLetters, currentNode, letter, node, queue, subNode, words, _i, _len, _ref;
      if (prefix == null) {
        return [];
      }
      (prefix != null) || (prefix = '');
      words = [];
      currentNode = this._root;
      for (_i = 0, _len = prefix.length; _i < _len; _i++) {
        letter = prefix[_i];
        currentNode = currentNode[letter];
        if (currentNode == null) {
          return [];
        }
      }
      queue = new Queue();
      queue.enqueue([currentNode, '']);
      while (queue.size !== 0) {
        _ref = queue.dequeue(), node = _ref[0], accumulatedLetters = _ref[1];
        if (node[WORD_END]) {
          words.push(prefix + accumulatedLetters);
        }
        for (letter in node) {
          if (!__hasProp.call(node, letter)) continue;
          subNode = node[letter];
          queue.enqueue([subNode, accumulatedLetters + letter]);
        }
      }
      return words;
    };

    Trie.prototype.remove = function(word) {
      /*
      _Returns:_ the string removed, or undefined if the word in its whole doesn't
      exist. **Note:** this means removing `beers` when only `beer` exists will
      return undefined and conserve `beer`.
      */

      var currentNode, i, letter, prefix, _i, _j, _len, _ref;
      if (word == null) {
        return;
      }
      currentNode = this._root;
      prefix = [];
      for (_i = 0, _len = word.length; _i < _len; _i++) {
        letter = word[_i];
        if (currentNode[letter] == null) {
          return;
        }
        currentNode = currentNode[letter];
        prefix.push([letter, currentNode]);
      }
      if (!currentNode[WORD_END]) {
        return;
      }
      this.size--;
      delete currentNode[WORD_END];
      if (_hasAtLeastNChildren(currentNode, 1)) {
        return word;
      }
      for (i = _j = _ref = prefix.length - 1; _ref <= 1 ? _j <= 1 : _j >= 1; i = _ref <= 1 ? ++_j : --_j) {
        if (!_hasAtLeastNChildren(prefix[i][1], 1)) {
          delete prefix[i - 1][1][prefix[i][0]];
        } else {
          break;
        }
      }
      if (!_hasAtLeastNChildren(this._root[prefix[0][0]], 1)) {
        delete this._root[prefix[0][0]];
      }
      return word;
    };

    return Trie;

  })();

  _hasAtLeastNChildren = function(node, n) {
    var child, childCount;
    if (n === 0) {
      return true;
    }
    childCount = 0;
    for (child in node) {
      if (!__hasProp.call(node, child)) continue;
      childCount++;
      if (childCount >= n) {
        return true;
      }
    }
    return false;
  };

  module.exports = Trie;

}).call(this);

},{"./Queue":5}]},{},["SuzRTw"])
;