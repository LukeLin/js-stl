import assert from 'assert';
import DoubleLinkedList from '../../src/List/DoubleLinkedList';

describe('DoubleLinkedList tests', function () {
    let arr = [2, 3];
    let list = new DoubleLinkedList(arr);

    it('init', function () {
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

    it('iterator', function(){
        let iterator = list[Symbol.iterator]();
        assert.equal(iterator.next().value, 2);
        assert.equal(iterator.next().value, 3);

        list.forEach(function(data, index){
            assert.equal(data, arr[index]);
        });
    });
    
    it('clear', function(){
        list.clear();

        assert.equal(list.head, null);
        assert.equal(list.tail, null);
        assert.equal(list.size, 0);
    });

    it('push unshift pop shift toJSON', function(){
        list.push(3);
        list.push(4);
        list.unshift(2);
        list.unshift(1);

        assert.deepEqual(list.toJSON(), [1, 2, 3, 4]);

        assert.equal(list.pop(), 4);
        assert.equal(list.shift(), 1);

        assert.deepEqual(list.toJSON(), [2, 3]);
    })

    it('findByIndex indexOf', function(){
        list.unshift(1);
        list.push(4);

        let returnedNode = list.findByIndex(0, true);
        let returnedNode2 = list.findByIndex(1, true);
        let returnedNode3 = list.findByIndex(2, true);
        let returnedNode4 = list.findByIndex(3, true);
        let returnedNode5 = list.findByIndex(4, true);

        assert.equal(returnedNode.data, 1);
        assert.equal(returnedNode2.data, 2);
        assert.equal(returnedNode3.data, 3);
        assert.equal(returnedNode4.data, 4);
        assert.equal(returnedNode5, null);

        let data = list.findByIndex(0);
        let data2 = list.findByIndex(1);
        let data3 = list.findByIndex(2);
        let data4 = list.findByIndex(3);
        let data5 = list.findByIndex(4);

        assert.equal(data, 1);
        assert.equal(data2, 2);
        assert.equal(data3, 3);
        assert.equal(data4, 4);
        assert.equal(data5, null);

        assert.equal(list.indexOf(0), -1);
        assert.equal(list.indexOf(1), 0);
        assert.equal(list.indexOf(2), 1);
        assert.equal(list.indexOf(3), 2);
        assert.equal(list.indexOf(4), 3);
        assert.equal(list.indexOf(5), -1);
    });

    it('update', function(){
        list.update(0, 4);
        list.update(1, 3);
        list.update(2, 2);
        list.update(3, 1);
        assert.deepEqual(list.toJSON(), [4, 3, 2, 1]);
    });

    it('remove', function(){
        assert.equal(list.remove(4), 4);
        assert.equal(list.remove(3), 3);
        assert.equal(list.remove(2), 2);
        assert.equal(list.remove(1), 1);
        assert.equal(list.remove(3), null);
    });
});
