import assert from 'assert';
import DoubleLinkedList from '../../src/List/DoubleLinkedList';

describe('DoubleLinkedList tests', function () {
    let arr = [2, 3];
    let list = new DoubleLinkedList(arr);

    it('DoubleLinkedList init', function () {
        assert.equal(list.head.prev, null);
        assert.equal(list.head.data, 2);
        assert.equal(list.head.next.data, 3);
        assert.equal(list.head.next.next, null);
        assert.equal(list.head.next.prev.data, 2);
        assert.equal(list.head.next.prev.prev, null);

        assert.equal(list.size, 2);

        assert.equal(list.tail.data, 3);
        assert.equal(list.tail.next, null);
        assert.equal(list.tail.prev.data, 2);
        assert.equal(list.tail.prev.prev, null);
    });

    it('DoubleLinkedList iterating', function(){
        let iterator = list[Symbol.iterator]();
        assert.equal(iterator.next().value, 2);
        assert.equal(iterator.next().value, 3);

        list.forEach(function(data, index){
            assert.equal(data, arr[index]);
        });
    });
});
