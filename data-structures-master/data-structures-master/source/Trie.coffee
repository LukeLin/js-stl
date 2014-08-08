###
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
###

# Needed for breath-first traversal for finding all words with a certain prefix.
Queue = require './Queue'
# Special value for marking end of word. No conflict possible, since every
# node's one letter.
WORD_END = 'end'

class Trie
  constructor: (words = []) ->
    ###
    Pass an optional array of strings to be inserted initially.
    ###
    # Example structure for 'he', 'hello', 'za'
    # h:
    #     e:
    #         end: true,
    #         l:
    #             l:
    #                 o:
    #                     end: true,
    # z:
    #     a:
    #         end: true
    @_root = {}
    @size = 0
    @add word for word in words

  add: (word) ->
    ###
    Add a whole string to the trie.

    _Returns:_ the word added. Will return undefined (without adding the value)
    if the word passed is null or undefined.
    ###
    if not word? then return
    @size++
    currentNode = @_root
    for letter in word
      if not currentNode[letter]? then currentNode[letter] = {}
      currentNode = currentNode[letter]
    # Add the terminator. The value should be something defined, as to not cause
    # search problems and so that we can validate using `if
    # currentNode[WORD_END]` rather than `if currentNode[WORD_END]?`
    currentNode[WORD_END] = yes
    return word

  has: (word) ->
    ###
    __Returns:_ true or false.
    ###
    if not word? then return no
    currentNode = @_root
    for letter in word
      if not currentNode[letter]? then return no
      currentNode = currentNode[letter]
    # Check for null terminator
    if currentNode[WORD_END] then yes
    else no

  longestPrefixOf: (word) ->
    ###
    Find all words containing the prefix. The word itself counts as a prefix.

    ```js
    var trie = new Trie;
    trie.add('hello');
    trie.longestPrefixOf('he'); // 'he'
    trie.longestPrefixOf('hello'); // 'hello'
    trie.longestPrefixOf('helloha!'); // 'hello'
    ```

    _Returns:_ the prefix string, or empty string if no prefix found.
    ###
    if not word? then return ''
    currentNode = @_root
    prefix = ''
    for letter in word
      if not currentNode[letter]? then break
      prefix += letter
      currentNode = currentNode[letter]
    return prefix

  wordsWithPrefix: (prefix) ->
    ###
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
    ###
    if not prefix? then return []
    # Can't set default value to parameter. It turns undefined and null into ''.
    prefix? or prefix = ''
    words = []
    currentNode = @_root
    for letter in prefix
      currentNode = currentNode[letter]
      if not currentNode? then return []
    # Reached the end of prefix.
    # Enqueue like this: [node, accumulatedLetters]
    queue = new Queue()
    queue.enqueue [currentNode, '']
    while queue.size isnt 0
      [node, accumulatedLetters] = queue.dequeue()
      if node[WORD_END]
        words.push prefix + accumulatedLetters
      for own letter, subNode of node
        queue.enqueue [subNode, accumulatedLetters + letter]
    return words

  remove: (word) ->
    ###
    _Returns:_ the string removed, or undefined if the word in its whole doesn't
    exist. **Note:** this means removing `beers` when only `beer` exists will
    return undefined and conserve `beer`.
    ###
    if not word? then return
    currentNode = @_root
    prefix = []
    for letter in word
      if not currentNode[letter]? then return
      currentNode = currentNode[letter]
      prefix.push [letter, currentNode]
    # Check for null terminator
    if not currentNode[WORD_END] then return
    # Traverse back upward to delete nodes. Last node in prefix is the before-
    # last letter right now.
    @size--
    delete currentNode[WORD_END]
    if _hasAtLeastNChildren currentNode, 1 then return word
    for i in [prefix.length - 1..1]
      if not _hasAtLeastNChildren prefix[i][1], 1
        # previousNode[currentLetter]
        delete prefix[i - 1][1][prefix[i][0]]
      else break
    # Clean the ndoe at the root itself.
    if not _hasAtLeastNChildren @_root[prefix[0][0]], 1
      delete @_root[prefix[0][0]]
    return word

_hasAtLeastNChildren = (node, n) ->
  return yes if n is 0
  childCount = 0
  for own child of node
    childCount++
    return yes if childCount >= n
  return no

module.exports = Trie
