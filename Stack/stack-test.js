function Stack(){
  this.top = null;
  this.size = 0;
}
Stack.prototype = {
  push: function(data){
    var node = {
      data: data,
      next: null
    };

    node.next = this.top;
    this.top = node;
    this.size++;
  },
  peek: function(){
    return this.top === null ?
      null :
      this.top.data;
  },
  pop: function(){
    if(this.top === null) return null;

    var out = this.top;
    this.top = this.top.next;

    if(this.size > 0) this.size--;

    return out.data;
  },
  displayAll: function(){
    if(this.top === null) return null;

    var arr = [];
    var current = this.top;

    for(var i = 0, len = this.size; i < len; i++){
      arr[i] = current.data;
      current = current.next;
    }

    return arr;
  }
};

describe('stack tests', function(){
  var stack = new Stack();

  it('should push into stack', function(){
    stack.push(1);
    expect(stack.peek()).toBe(1);
    stack.push('asd');
    expect(stack.peek()).toBe('asd');
    expect(stack.size).toBe(2);
  });

  it('should pop from stack', function(){
    stack.pop();
    expect(stack.peek()).toBe(1);
    expect(stack.size).toBe(1);
    stack.push({a: 1});
    expect(stack.peek()).toEqual({a: 1});
    expect(stack.size).toBe(2);
  });

  it('should be an empty stack', function(){
    stack.pop();
    expect(stack.peek()).toBe(1);
    stack.pop();
    expect(stack.peek()).toBe(null);
    expect(stack.size).toBe(0);
  });
});