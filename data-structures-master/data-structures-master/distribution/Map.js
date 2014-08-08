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
