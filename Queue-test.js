function Queue(){
  this.rear = this.front = null;
  this.size = 0;
}
Queue.prototype = {
  clear: function(){
    this.rear = this.front = null;
    this.size = 0;
  },
  getHead: function(){
    return this.front ? this.front.data : null;
  },
  enQueue: function(elem){
    if(this.front === null){
      this.rear = this.front = {data: elem, next: null};
    } else {
      var p = {data: elem, next: null};
      this.rear.next = p;
      this.rear = p;
    }
    this.size++;
  },
  deQueue: function(){
    if(this.front){
      var elem = this.front.data;
      this.front = this.front.next;
      if(this.front === null){
        this.rear = null;
      }
      this.size--;
      return elem;
    } else {
      return null;
    }
  },
  queueTraverse: function(iterator){
    var current = this.front;
    while(current){
      if(iterator(current.data)) break;
      current = current.next;
    }
  }
};

function CycleQueue(){
  this.base = {};
  this.front = this.rear = 0;
  this.MAXQSIZE = 100;
}
CycleQueue.prototype = {
  enQueue: function(data){
    if((this.rear + 1) % this.MAXQSIZE === 0) throw new Error('cycleQueue is already full!');

    this.base[this.rear] = data;
    this.rear = (this.rear + 1) % this.MAXQSIZE;
  },
  deQueue: function(){
    if(this.front === this.rear) throw new Error('cycleQueue is already empty');

    var elem = this.base[this.front];
    this.front = (this.front + 1) % this.MAXQSIZE;

    return elem;
  },
  clear: function(){
    this.base = {};
    this.front = this.rear = 0;
  },
  size: function(){
    return (this.rear - this.front + this.MAXQSIZE) % this.MAXQSIZE;
  },
  peekAt: function(index){
    index = (index || 0 + this.MAXQSIZE) % this.MAXQSIZE;

    return this.base[index + this.front] || null
  },
  getHead: function(){
    var elem = this.base[this.front];
    return elem ? elem : null;
  },
  queueTraverse: function(iterator){
    for(var i = this.front, len = this.rear = this.front; i < len; i++){
      if(iterator(this.base[i], i)) break;
    }
  },
  displayAll: function(){
    var base = [].slice.call(this.base);

    return base.slice(this.front, this.rear - this.front);
  }
};

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


  var queue2 = new CycleQueue();


  it('should insert an element into cycleQueue, and then delete it, lastly it must be an empty queue', function(){
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

  it('should insert into two elements into cycleQueue, and peek them in order', function(){
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