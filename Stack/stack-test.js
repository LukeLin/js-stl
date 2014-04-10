//var Stack = require('./stack');

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