# Data Structures [![Build Status](https://travis-ci.org/chenglou/data-structures.png?branch=master)](https://travis-ci.org/chenglou/data-structures)
Fast, light and hassle-free JavaScript data structures, written in CoffeeScript.

- (Hash) Map
- Heap
- Graph
- (Doubly) Linked List
- Queue
- Self-Balancing Binary Search Tree (Red-Black Tree)
- Trie

## Installation and Usage

### Server-side:
Using [npm](http://www.npmjs.org):

```bash
npm install data-structures
```
Then where needed:

```js
var Heap = require('data-structures').Heap;
var heap = new Heap();
heap.add(3);
heap.removeMin();
```
Alternatively, you can directly use the compiled JavaScript version in the "distribution" folder. It's always in sync with the CoffeeScript one.

### Client-side:
Using [Bower](http://bower.io):

```bash
bower install data-structures
```
Or if you prefer a more traditional approach, [Get the whole file here.](https://github.com/chenglou/data-structures/tree/master/distribution/browser)
Either use the development version or the minified production version.

Then put the file in your HTML page,

```html
<script src="path/to/dataStructure/file"></script>
<script>
    var Heap = require("data-structures").Heap;
    var heap = new Heap();
    heap.add(3);
    heap.removeMin();
</script>
```
(Magical client-side `require()`) courtesy of [Browserify](https://github.com/substack/node-browserify).

## Documentation
[Wiki page](https://github.com/chenglou/data-structures/wiki)

The wiki page is a formatted version of the documentation in the code.

## [Roadmap](https://github.com/chenglou/data-structures/wiki/Roadmap)

## For Contributors
Install the npm development dependencies:

```bash
npm install
```

Then, with [Grunt](http://gruntjs.com):

```bash
grunt test
```

### Build JavaScript for server-side and browser
_Note that if it's a pull request you'd like to submit, ignore this section. The code will be rebuilt after the pull anyways._

Feel free to modify the source code and rebuild it for your own needs:

```bash
grunt
```

This will take care of compiling CoffeeScript into JavaScript and, if needed, bundle them for the browser.

## License
MIT.
