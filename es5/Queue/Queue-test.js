'use strict';

//var Queue = require('./Queue').Queue;
//var CycleQueue = require('./Queue').CycleQueue;

describe('Queue tests', function () {
  var queue = new Queue();

  it('should enqueue 1', function () {
    queue.enQueue(1);
    expect(queue.getHead()).toBe(1);
    expect(queue.size).toBe(1);
    expect(queue.rear).toBe(queue.front);
  });

  it('should be an empty queue', function () {
    queue.deQueue();
    expect(queue.getHead()).toBe(null);
    expect(queue.size).toBe(0);
    expect(queue.rear).toBe(null);
    expect(queue.front).toBe(null);
  });

  it('should enqueue 2 elems', function () {
    queue.enQueue(2);
    expect(queue.getHead()).toBe(2);
    expect(queue.size).toBe(1);
    queue.enQueue(3);
    expect(queue.front.next.data).toBe(3);
    expect(queue.size).toBe(2);

    expect(queue.rear.data).toBe(3);
    expect(queue.front.data).toBe(2);
  });

  var queue2 = new CycleQueue();

  it('should insert an element into cycleQueue, and then delete it, lastly it must be an empty queue', function () {
    queue2.enQueue(1);
    expect(queue2.front).toBe(0);
    expect(queue2.rear).toBe(1);
    expect(queue2.base[queue2.front]).toBe(1);
    expect(queue2.base[queue2.rear]).toBe(undefined);
    expect(queue2.getHead()).toBe(1);
    expect(queue2.size()).toBe(1);

    queue2.deQueue();
    expect(queue2.front).toBe(1);
    expect(queue2.rear).toBe(queue2.front);
    expect(queue2[this.front]).toBe(undefined);
    expect(queue2.size()).toBe(0);
  });

  it('should insert into two elements into cycleQueue, and peek them in order', function () {
    queue2.enQueue(2);
    expect(queue2.front).toBe(1);
    expect(queue2.rear).toBe(2);
    expect(queue2.base[queue2.front]).toBe(2);
    expect(queue2.base[queue2.rear]).toBe(undefined);

    queue2.enQueue(3);
    expect(queue2.rear).toBe(3);
    expect(queue2.base[queue2.front]).toBe(2);
    expect(queue2.base[queue2.front + 1]).toBe(3);
    expect(queue2.base[this.rear]).toBe(undefined);
    expect(queue2.peekAt(0)).toBe(2);
    expect(queue2.peekAt(1)).toBe(3);
    expect(queue2.peekAt(2)).toBe(null);
  });
});