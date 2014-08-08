###
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
###
class Heap
  constructor: (dataToHeapify = []) ->
    ###
    Pass an optional array to be heapified. Takes only O(n) time.
    ###
    # Use 1-indexed array. Simpler for calculating parent, leftChild and
    # rightChild. Item 0 is a placeholder.
    @_data = [undefined]
    @_data.push item for item in dataToHeapify when item? # <3 CoffeScript.
    if @_data.length > 1 then @_upHeap i for i in [2...@_data.length]
    @size = @_data.length - 1

  add: (value) ->
    ###
    **Remember:** rejects null and undefined for mentioned reasons.

    _Returns:_ the value added.
    ###
    if not value? then return
    @_data.push value
    @_upHeap @_data.length - 1
    @size++
    return value

  removeMin: ->
    ###
    _Returns:_ the smallest item (the root).
    ###
    if @_data.length is 1 then return
    @size--
    if @_data.length is 2 then return @_data.pop()
    min = @_data[1]
    # Replace the removed root with the last item, then trickle it down.
    @_data[1] = @_data.pop()
    @_downHeap()
    return min

  peekMin: ->
    ###
    Check the smallest item without removing it.

    _Returns:_ the smallest item (the root).
    ###
    @_data[1]

  _upHeap: (index) ->
    valueHolder = @_data[index]
    while @_data[index] < @_data[_parent index] and index > 1
      [@_data[index], @_data[_parent index]] =
      [@_data[_parent index], @_data[index]]
      index = _parent index
    # Avoid generated `_results` array created by CoffeeScript accumulated for
    # the sake of returning an expression. Return manually.
    return

  _downHeap: ->
    currentIndex = 1
    while _leftChild currentIndex < @_data.length # There's a left child.
      smallerChildIndex = _leftChild currentIndex
      if smallerChildIndex < @_data.length - 1 # There's a right child.
        # Choose right child if it's smaller.
        if @_data[_rightChild currentIndex] < @_data[smallerChildIndex]
          smallerChildIndex = _rightChild currentIndex
      if @_data[smallerChildIndex] < @_data[currentIndex]
        [@_data[smallerChildIndex], @_data[currentIndex]] =
        [@_data[currentIndex], @_data[smallerChildIndex]]
        currentIndex = smallerChildIndex
      else
        break
    # Return manually, same reason as `_upHeap`.
    return

_parent = (index) -> index >> 1 # Fast divide by 2 then flooring.

_leftChild = (index) -> index << 1 # Fast multiply by 2.

_rightChild = (index) -> (index << 1) + 1

module.exports = Heap
