
//var Queue = require('./Queue').Queue;
//var CycleQueue = require('./Queue').CycleQueue;

describe('Queue tests', function(){
  var queue = new Queue();

  it('should enqueue 1', function(){
    queue.enQueue(1);
    expect(queue.getHead()).toBe(1);
    expect(queue.size).toBe(1);
    expect(queue.rear).toBe(queue.front);
  });

  it('should be an empty queue', function(){
    queue.deQueue();
    expect(queue.getHead()).toBe(null);
    expect(queue.size).toBe(0);
    expect(queue.rear).toBe(null);
    expect(queue.front).toBe(null);
  });

  it('should enqueue 2 elems', function(){
    queue.enQueue(2);
    expect(queue.getHead()).toBe(2);
    expect(queue.size).toBe(1);
    queue.enQueue(3);
    expect(queue.front.next.data).toBe(3);
    expect(queue.size).toBe(2);

    expect(queue.rear.data).toBe(3);
    expect(queue.front.data).toBe(2);
  });




  

});