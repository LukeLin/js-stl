import CycleQueue from '../../src/Queue/CycleQueue.js';
import assert from 'assert';

describe('CycleQueue tests', function(){
      var queue = new CycleQueue();

      it('enQueue getHead deQueue', function(){
    queue.enQueue(1);
    assert.equal(queue.front, 0);
    assert.equal(queue.rear, 1);
    assert.equal(queue.base[queue.front], 1);
    assert.equal(queue.base[queue.rear], undefined);
    assert.equal(queue.getHead(), 1);
    assert.equal(queue.size, 1);

    queue.deQueue();
    assert.equal(queue.front, 1);
    assert.equal(queue.rear, queue.front);
    assert.equal(queue[this.front], undefined);
    assert.equal(queue.size, 0);
  });

  it('peekAt', function(){
    queue.enQueue(2);
    assert.equal(queue.front, 1);
    assert.equal(queue.rear, 2);
    assert.equal(queue.base[queue.front], 2);
    assert.equal(queue.base[queue.rear], undefined);

    queue.enQueue(3);
    assert.equal(queue.rear, 3);
    assert.equal(queue.base[queue.front], 2);
    assert.equal(queue.base[queue.front + 1], 3);
    assert.equal(queue.base[this.rear], undefined);
    assert.equal(queue.peekAt(0), 2);
    assert.equal(queue.peekAt(1), 3);
    assert.equal(queue.peekAt(2), null);
  });
});
