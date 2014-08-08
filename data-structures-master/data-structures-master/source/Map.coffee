###
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
###

# TODO: maybe change the hashing method for arrays and objects to something less
# hacky. We can recursively dig out their properties' value and join them, but
# that'd make it O(n).

# For hashing special types, e.g. objects, arrays and dates.
SPECIAL_TYPE_KEY_PREFIX = '_mapId_'

class Map

  # Class variable and method.
  @_mapIdTracker: 0
  @_newMapId: -> @_mapIdTracker++

  constructor: (objectToMap)->
    ###
    Pass an optional object whose (key, value) pair will be hashed. **Careful**
    not to pass something like {5: 'hi', '5': 'hello'}, since JavaScript's
    native object behavior will crush the first 5 property before it gets to
    constructor.
    ###
    # _content is composed of (key, value) pairs where `value` itself is an
    # array of two elements: first being the actual value to store, second being
    # the original key, displayed for iteration.
    @_content = {}
    # Used to track objects and arrays.
    @_itemId = 0
    @_id = Map._newMapId()
    @size = 0
    @set key, value for own key, value of objectToMap

  # Public. Allow user-defined hash function.
  hash: (key, makeHash = no) ->
    ###
    The hash function for hashing keys is public. Feel free to replace it with
    your own. The `makeHash` parameter is optional and accepts a boolean
    (defaults to `false`) indicating whether or not to produce a new hash (for
    the first use, naturally).

    _Returns:_ the hash.
    ###
    # [object typeExtracted].
    type = _extractDataType key
    # Obscure hack to add a secret property to the object, used as key for hash
    # map. Reason for doing so on array: [obj1, obj2] would have the same hash
    # as [obj3, obj4].
    if _isSpecialType key
      propertyForMap = SPECIAL_TYPE_KEY_PREFIX + @_id
      if makeHash and not key[propertyForMap]
        key[propertyForMap] = @_itemId++
      # Format: '_hashMapId'
      return propertyForMap + '_' + key[propertyForMap]
    else return type + '_' + key

  set: (key, value) ->
    ###
    _Returns:_ value.
    ###
    if not @has key then @size++
    @_content[@hash(key, yes)] = [value, key]
    return value
  get: (key) ->
    ###
    _Returns:_ value corresponding to the key, or undefined if not found.
    ###
    @_content[@hash key]?[0]
  has: (key) ->
    ###
    Check whether a value exists for the key.

    _Returns:_ true or false.
    ###
    @hash(key) of @_content

  delete: (key) ->
    ###
    Remove the (key, value) pair.

    _Returns:_ **true or false**. Unlike most of this library, this method
    doesn't return the deleted value. This is so that it conforms to the future
    JavaScript `map.delete()`'s behavior.
    ###
    hashedKey = @hash key
    if hashedKey of @_content
      delete @_content[hashedKey]
      if _isSpecialType key then delete key[SPECIAL_TYPE_KEY_PREFIX + @_id]
      @size--
      return true
    return false

  forEach: (operation) ->
    ###
    Traverse through the map. Pass a function of the form `fn(key, value)`.

    _Returns:_ undefined.
    ###
    operation(value[1], value[0]) for own key, value of @_content
    # Manual return to avoid CoffeeScript accumulating an array for return.
    return

_isSpecialType = (key) ->
  simpleHashableTypes = ['Boolean', 'Number', 'String',
  'Undefined', 'Null', 'RegExp', 'Function']
  type = _extractDataType key
  for simpleType in simpleHashableTypes
    if type is simpleType then return no
  return yes

_extractDataType = (type) ->
  Object.prototype.toString.apply(type).match(/\[object (.+)\]/)[1]

module.exports = Map
