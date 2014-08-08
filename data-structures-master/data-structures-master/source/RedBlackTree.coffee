###
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
###

NODE_FOUND = 0
NODE_TOO_BIG = 1
NODE_TOO_SMALL = 2
STOP_SEARCHING = 3
# For debugging.
# RED = 'RED'
# BLACK = 'BLACK'
RED = 1
BLACK = 2

# Property of a red-black tree, taken from Wikipedia:

# 1. A node is either red or black.
# 2. Root is black.
# 3. Leaves are all null and considered black.
# 4. Both children of a red node are black.
# 5. Every path from a node to any of its descendent leaves contains the same
# number of black nodes.

# **In our implementation, leaves are simply undefined.**

class RedBlackTree
  constructor: (valuesToAdd = []) ->
    ###
    Pass an optional array to be turned into binary tree. **Note:** does not
    accept duplicate, undefined and null.
    ###
    @_root
    @size = 0
    @add value for value in valuesToAdd when value?

  add: (value) ->
    ###
    Again, make sure to not pass a value already in the tree, or undefined, or
    null.

    _Returns:_ value added.
    ###
    if not value? then return
    @size++
    nodeToInsert =
      value: value
      _color: RED

    if not @_root then @_root = nodeToInsert
    else
      foundNode = _findNode @_root, (node) ->
        if value is node.value then NODE_FOUND
        else
          if value < node.value
            if node._left then NODE_TOO_BIG
            else
              nodeToInsert._parent = node
              node._left = nodeToInsert
              STOP_SEARCHING
          # Inserting 'undefined' will go to right child. Important to keep this
          # conditional in sync with has().
          else
            if node._right then NODE_TOO_SMALL
            else
              nodeToInsert._parent = node
              node._right = nodeToInsert
              STOP_SEARCHING
      if foundNode? then return
    # After adding the node, we need to operate on it to preserve the tree's
    # properties by filtering it through a series of cases. It'd be easier if
    # there's tail recursion in JavaScript, as some cases fix the node but
    # restart the cases on the node's ancestor. We'll have to use loops for now.
    currentNode = nodeToInsert
    loop
      # Case 1: node is root. Violates 1. Paint it black.
      if currentNode is @_root
        currentNode._color = BLACK
        break
      # Case 2: parent black. No properties violated. After that, parent is sure
      # to be red.
      if currentNode._parent._color is BLACK
        break
      # Case 3: if node's parent and uncle are red, they are painted black.
      # Their parent (node's grandparent) should be painted red, and the
      # grandparent red. Note that node certainly has a grandparent, since at
      # this point, its parent's red, which can't be the root.

      # After the painting, the grandparent might violate 2 or 4.
      if _uncleOf(currentNode)?._color is RED
        currentNode._parent._color = BLACK
        _uncleOf(currentNode)._color = BLACK
        _grandParentOf(currentNode)._color = RED
        currentNode = _grandParentOf currentNode
        continue
      # At this point, uncle is either black or doesn't exist.

      # Case 4: parent red, uncle black, node is right child, parent is left
      # child. Do a left rotation. Then, former parent passes through case 5.
      if not _isLeft(currentNode) and _isLeft(currentNode._parent)
        @_rotateLeft currentNode._parent
        currentNode = currentNode._left
      else if _isLeft(currentNode) and not _isLeft(currentNode._parent)
        @_rotateRight currentNode._parent
        currentNode = currentNode._right
      # Case 5: parent red, uncle black, node is left child, parent is left
      # child. Right rotation. Switch parent and grandparent's color.
      currentNode._parent._color = BLACK
      _grandParentOf(currentNode)._color = RED
      if _isLeft currentNode
        @_rotateRight _grandParentOf currentNode
      else
        @_rotateLeft _grandParentOf currentNode
      break
    return value

  has: (value) ->
    ###
    _Returns:_ true or false.
    ###
    foundNode = _findNode @_root, (node) ->
      if value is node.value then NODE_FOUND
      # Keep the conditional this way; node.value > value wouldn't work. The
      # insertion uses the same comparison to add 'undefined' (to the right
      # child).
      else if value < node.value then NODE_TOO_BIG
      else NODE_TOO_SMALL
    if foundNode then yes else no

  peekMin: ->
    ###
    Check the minimum value without removing it.

    _Returns:_ the minimum value.
    ###
    _peekMinNode(@_root)?.value

  peekMax: ->
    ###
    Check the maximum value without removing it.

    _Returns:_ the maximum value.
    ###
    _peekMaxNode(@_root)?.value

  remove: (value) ->
    ###
    _Returns:_ the value removed, or undefined if the value's not found.
    ###
    foundNode = _findNode @_root, (node) ->
      if value is node.value then NODE_FOUND
      # Keep the conditional this way; node.value > value wouldn't work. The
      # insertion uses the same comparison to add 'undefined' (to the right
      # child).
      else if value < node.value then NODE_TOO_BIG
      else NODE_TOO_SMALL
    if not foundNode then return
    @_removeNode @_root, foundNode
    @size--
    return value

  removeMin: ->
    ###
    _Returns:_ smallest item removed, or undefined if tree's empty.
    ###
    nodeToRemove = _peekMinNode @_root
    if not nodeToRemove then return
    # Store in. Might destroy the node during removal in the future, so can't
    # just return nodeToRemove.value.
    valueToReturn = nodeToRemove.value
    @_removeNode @_root, nodeToRemove
    return valueToReturn

  removeMax: ->
    ###
    _Returns:_ biggest item removed, or undefined if tree's empty.
    ###
    nodeToRemove = _peekMaxNode @_root
    if not nodeToRemove then return
    # Store in. Might destroy the node during removal in the future, so can't
    # just return nodeToRemove.value.
    valueToReturn = nodeToRemove.value
    @_removeNode @_root, nodeToRemove
    return valueToReturn

  # To simplify removal cases, we can notice this:

  # 1. Node has no child.

  # 2. Node has two children. Select the smallest child on the right branch
  # (leftmost) and copy its value into the node to delete. This replacement node
  # certainly has less than two children or it wouldn't be the smallest. Then
  # delete this replacement node.

  # 3. Node has one child.

  # They all come down to removing a node with maximum one child.
  _removeNode: (root, node) ->
    if node._left and node._right
      successor = _peekMinNode node._right
      node.value = successor.value
      node = successor
    # At this point, the node to remove has only one child.
    successor = node._left or node._right
    if not successor
      # Hard code a leaf in, to make case checking easier.
      successor =
        color: BLACK
        _right: undefined
        _left: undefined
        isLeaf: yes

    successor._parent = node._parent
    node._parent?[_leftOrRight node] = successor
    # We're done if node's red. If it's black and its child that took its place
    # is red, change it to black. If both are black, we do cases checking like
    # in insert.
    if node._color is BLACK
      if successor._color is RED
        successor._color = BLACK
        if not successor._parent then @_root = successor
      else
        loop
          # Case 1: node is root. Done.
          if not successor._parent
            if not successor.isLeaf then @_root = successor
            else @_root = undefined
            break
          # Case 2: sibling red. Flip color of P and S. Left rotate P.
          sibling = _siblingOf successor
          if sibling?._color is RED
            successor._parent._color = RED
            sibling._color = BLACK
            if _isLeft successor
              @_rotateLeft successor._parent
            else @_rotateRight successor._parent
          # Case 3: parent, sibling and sibling children all black. Paint
          # sibling red. Rebalance parent.
          sibling = _siblingOf successor
          if successor._parent._color is BLACK and
          (not sibling or (sibling._color is BLACK and
          (not sibling._left or sibling._left._color is BLACK) and
          (not sibling._right or sibling._right._color is BLACK)))
            sibling?._color = RED
            if successor.isLeaf
              successor._parent[_leftOrRight successor] = undefined
            successor = successor._parent
            continue
          # Case 4: sibling and sibling children black. Node parent red. Swap
          # color of sibling and node parent.
          if successor._parent._color is RED and
          (not sibling or (sibling._color is BLACK and
          (not sibling._left or sibling._left?._color is BLACK) and
          (not sibling._right or sibling._right?._color is BLACK)))
            sibling?._color = RED
            successor._parent._color = BLACK
            break
          # Case 5: sibling black, sibling left child red, right child black,
          # node is left child. Rotate right sibling. Swap color of sibling and
          # its new parent.
          if sibling?._color is BLACK
            if _isLeft(successor) and
            (not sibling._right or sibling._right._color is BLACK) and
            sibling._left?._color is RED
              sibling._color = RED
              sibling._left?._color = BLACK
              @_rotateRight sibling
            else if not _isLeft(successor) and
            (not sibling._left or sibling._left._color is BLACK) and
            sibling._right?._color is RED
              sibling._color = RED
              sibling._right?._color = BLACK
              @_rotateLeft sibling
            break
          # Case 6: sibling black, sibling right child red, node is left child.
          # Rotate left node parent. Swap color of parent and sibling. Paint
          # sibling right child black.
          sibling = _siblingOf successor
          sibling._color = successor._parent._color
          if _isLeft successor
            sibling._right._color = BLACK
            @_rotateRight successor._parent
          else
            sibling._left._color = BLACK
            @_rotateLeft successor._parent
    # Don't forget to detatch the artificially created leaf.
    if successor.isLeaf
      successor._parent?[_leftOrRight successor] = undefined

  _rotateLeft: (node) ->
    node._parent?[_leftOrRight node] = node._right
    node._right._parent = node._parent
    node._parent = node._right
    node._right = node._right._left
    node._parent._left = node
    node._right?._parent = node
    if not node._parent._parent? then @_root = node._parent

  _rotateRight: (node) ->
    node._parent?[_leftOrRight node] = node._left
    node._left._parent = node._parent
    node._parent = node._left
    node._left = node._left._right
    node._parent._right = node
    node._left?._parent = node
    if not node._parent._parent? then @_root = node._parent

_isLeft = (node) -> node is node._parent._left
_leftOrRight = (node) ->
  # No need to check if parent exist. It's never used this way.
  if _isLeft node then '_left' else '_right'

_findNode = (startingNode, comparator) ->
  currentNode = startingNode
  foundNode = undefined
  while currentNode
    comparisonResult = comparator currentNode
    if comparisonResult is NODE_FOUND
      foundNode = currentNode
      break
    if comparisonResult is NODE_TOO_BIG
      currentNode = currentNode._left
    else if comparisonResult is NODE_TOO_SMALL
      currentNode = currentNode._right
    else if comparisonResult is STOP_SEARCHING
      break
  return foundNode

_peekMinNode = (startingNode) ->
  _findNode startingNode, (node) ->
    if node._left then NODE_TOO_BIG else NODE_FOUND

_peekMaxNode = (startingNode) ->
  _findNode startingNode, (node) ->
    if node._right then NODE_TOO_SMALL else NODE_FOUND

_grandParentOf = (node) -> node._parent?._parent

_uncleOf = (node) ->
  if not _grandParentOf node then return
  if _isLeft node._parent
    _grandParentOf(node)._right
  else
    _grandParentOf(node)._left

_siblingOf = (node) ->
  if _isLeft node then node._parent._right
  else node._parent._left

module.exports = RedBlackTree

