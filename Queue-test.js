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
      if(iterator(current.data) === false) break;
      current = current.next;
    }
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
});