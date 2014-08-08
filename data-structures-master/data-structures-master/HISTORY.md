### 1.4.2 (March 4th 2014)
- Graph's `forEachNode`'s callback now passes you the `nodeId` as a second param, in addition to the `nodeObject`.

### 1.4.1 (January 2nd 2014)
- All traversals now protect against looping through properties on `Object.prototype`.

## 1.4.0 (June 28th 2013)
- Switched graph's removeNode back to O(E). [Issue 4](https://github.com/chenglou/data-structures/issues/4). Internal clean-up.

### 1.3.5 (June 26th 2013)
- Reverted tests back to test Coffee source files instead of compiled js.
- Every file now has a methods/properties overview. Wiki updated.
- All the documentation is now based on js.

### 1.3.4 (June 25th 2013)
- Bower support.

### 1.3.2 (June 16th 2013)
- Moved CoffeeScript dependency into development dependency. Compiled js now available. [Issue 3](https://github.com/chenglou/data-structures/issues/3).

### 1.3.1 (May 24th 2013)
- CoffeScript lint task.
- Changed indentation from 4 spaces to 2.

## 1.3.0 (May 21th 2013)
- New way to include script in browser. Please check README.
- For contributors: cleaner build process using [Grunt](http://gruntjs.com).

## 1.2.0 (May 17th 2013)
- All the [traversal methods](https://github.com/chenglou/data-structures/wiki) now return `undefined`. Performance boost by avoiding CoffeeScript's accumulated array for returning. Heap's private methods also act this way now. [Issue 1](https://github.com/chenglou/data-structures/pull/1).

### 1.1.3 (May 12th 2013)
- Browser support through Browserify.

### 1.1.2 (May 12th 2013)
- Travis.
- This file.
- Initial public release.
