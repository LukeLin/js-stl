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
