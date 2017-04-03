import Stack from '../src/Stack';
import assert from 'assert';

describe('stack tests', function () {
    var stack = new Stack();

    it('push peek size', function () {
        stack.push(1);
        assert.equal(stack.peek(), 1);
        stack.push('asd');
        assert.equal(stack.peek(), 'asd');
        assert.equal(stack.size, 2);
    });

    it('pop', function () {
        stack.pop();
        assert.equal(stack.peek(), 1);
        assert.equal(stack.size, 1);
        stack.push({a: 1});
        assert.deepEqual(stack.peek(), { a: 1 });
        assert.equal(stack.size, 2);
    });

    it('empty', function () {
        stack.pop();
        assert.equal(stack.peek(), 1);
        stack.pop();
        assert.equal(stack.peek(), null);
        assert.equal(stack.size, 0);
    });
});