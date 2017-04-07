/**
 * FastPriorityQueue.js : a fast heap-based priority queue  in JavaScript.
 * (c) the authors
 * Licensed under the Apache License, Version 2.0.
 *
 * Speed-optimized heap-based priority queue for modern browsers and JavaScript engines.
 *
 * Usage :
         Installation (in shell, if you use node):
         $ npm install fastpriorityqueue
         Running test program (in JavaScript):
         // var FastPriorityQueue = require("fastpriorityqueue");// in node
         var x = new FastPriorityQueue();
         x.add(1);
         x.add(0);
         x.add(5);
         x.add(4);
         x.add(3);
         x.peek(); // should return 0, leaves x unchanged
         x.size; // should return 5, leaves x unchanged
         while(!x.isEmpty()) {
           console.log(x.poll());
         } // will print 0 1 3 4 5
         x.trim(); // (optional) optimizes memory usage
 */
"use strict";

var defaultcomparator = function (a, b) {
    return a < b;
};

// the provided comparator function should take a, b and return *true* when a < b
function FastPriorityQueue(comparator) {
    this.array = [];
    this.size = 0;
    this.compare = comparator || defaultcomparator;
}


// Add an element the the queue
// runs in O(log n) time
FastPriorityQueue.prototype.add = function (myval) {
    var i = this.size;
    this.array[this.size] = myval;
    this.size += 1;
    var p;
    var ap;
    while (i > 0) {
        p = (i - 1) >> 1;
        ap = this.array[p];
        if (!this.compare(myval, ap)) {
             break;
        }
        this.array[i] = ap;
        i = p;
    }
    this.array[i] = myval;
};

// replace the content of the heap by provided array and "heapifies it"
FastPriorityQueue.prototype.heapify = function (arr) {
    this.array = arr;
    this.size = arr.length;
    var i;
    for (i = (this.size >> 1); i >= 0; i--) {
        this._percolateDown(i);
    }
};

// for internal use
FastPriorityQueue.prototype._percolateUp = function (i) {
    var myval = this.array[i];
    var p;
    var ap;
    while (i > 0) {
        p = (i - 1) >> 1;
        ap = this.array[p];
        if (!this.compare(myval, ap)) {
            break;
        }
        this.array[i] = ap;
        i = p;
    }
    this.array[i] = myval;
};


// for internal use
FastPriorityQueue.prototype._percolateDown = function (i) {
    var size = this.size;
    var hsize = this.size >>> 1;
    var ai = this.array[i];
    var l;
    var r;
    var bestc;
    while (i < hsize) {
        l = (i << 1) + 1;
        r = l + 1;
        bestc = this.array[l];
        if (r < size) {
            if (this.compare(this.array[r], bestc)) {
                l = r;
                bestc = this.array[r];
            }
        }
        if (!this.compare(bestc, ai)) {
            break;
        }
        this.array[i] = bestc;
        i = l;
    }
    this.array[i] = ai;
};

// Look at the top of the queue (a smallest element)
// executes in constant time
//
// Calling peek on an empty priority queue returns
// the "undefined" value.
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined
//
FastPriorityQueue.prototype.peek = function () {
    if(this.size == 0) return undefined;
    return this.array[0];
};

// remove the element on top of the heap (a smallest element)
// runs in logarithmic time
//
// If the priority queue is empty, the function returns the
// "undefined" value.
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined
//
// For long-running and large priority queues, or priority queues
// storing large objects, you may  want to call the trim function
// at strategic times to recover allocated memory.
FastPriorityQueue.prototype.poll = function () {
    if (this.size == 0) 
        return undefined;
    var ans = this.array[0];
    if (this.size > 1) {
        this.array[0] = this.array[--this.size];
        this._percolateDown(0 | 0);
    } else {
        this.size -= 1;
    }
    return ans;
};


// recover unused memory (for long-running priority queues)
FastPriorityQueue.prototype.trim = function () {
    this.array = this.array.slice(0, this.size);
};

// Check whether the heap is empty
FastPriorityQueue.prototype.isEmpty = function () {
    return this.size === 0;
};

// just for illustration purposes
var main = function () {
    // main code
    var test = new FastPriorityQueue(function (a, b) {
        return a.priority - b.priority;
    });

            test.add({
                value: 8,
                priority: 5
            });
        test.add({
            value: 7,
            priority: 2
        });
        test.add({
            value: 6,
            priority: 1
        });
        test.add({
            value: 5,
            priority: 4
        });
        test.add({
            value: 4,
            priority: 7
        });
        test.add({
            value: 3,
            priority: 3
        });
        test.add({
            value: 2,
            priority: 8
        });
        test.add({
            value: 1,
            priority: 10
        });
        console.log(test.array)
};

if (require.main === module) {
    main();
}

module.exports = FastPriorityQueue;