import Queue from '../../src/Queue/Queue.js';
import assert from 'assert';

describe('Queue tests', function(){
    let queue = new Queue();

    it('enQueue peekAt getHead', function(){
        queue.enQueue(1);
        assert.equal(queue.peekAt(0), 1);
        assert.equal(queue.getHead(), 1);
        assert.equal(queue.size, 1);
        queue.enQueue(2);
        assert.equal(queue.peekAt(1), 2);
        assert.equal(queue.size, 2);
        queue.enQueue(3);
        assert.equal(queue.peekAt(2), 3);
        assert.equal(queue.peekAt(3), -1);
        assert.equal(queue.size, 3);
    });

    it('toString', function(){
        assert.deepEqual(queue.toString(), [1, 2, 3]);
    });

    it('iterator', function(){
        let iterator = queue[Symbol.iterator]();
        assert.equal(iterator.next().value, 1);
        assert.equal(iterator.next().value, 2);
        assert.equal(iterator.next().value, 3);
        assert.equal(iterator.next().value, null);              
    });

    it('deQueue', function(){
        assert.equal(queue.deQueue(), 1);
        assert.equal(queue.size, 2);
        assert.equal(queue.deQueue(), 2);
        assert.equal(queue.size, 1);
        assert.equal(queue.deQueue(), 3);
        assert.equal(queue.size, 0);
        assert.equal(queue.deQueue(), null);
    });
});
