import assert from 'assert';
import List from '../../src/List/LinkedList';

describe('linkedList tests', function () {

  var list = new List();

  it('LinkedList operating', function () {
    list.push('b');
    assert.equal(list.head.data, 'b');
    assert.equal(list.tail.next, null);

    list.unshift('a');
    assert.equal(list.head.data, 'a');
    assert.equal(list.head.next.data, 'b');

    list.insertAfter('b', 'c');
    assert.equal(list.item(2).data, 'b');
    assert.equal(list.tail.data, 'c');
  });

  it('LinkedList removing', function () {
    assert.equal(list.remove('c'), 'c');
    list.remove('a');
    assert.equal(list.head.data, 'b');
  });

  var list2 = new List();

  it('LinkedList deepStrictEqual', function () {
    list2.push('c');
    list2.unshift('d');
    list2.insertAfter('d', 'b');

    let result = {
      "head": {
        "data": "d",
        "next": {
          "data": "b",
          "next": {
            "data": "c",
            "next": null
          }
        }
      },
      "tail": {
        "data": "c",
        "next": null
      }
    };
    
    assert.deepEqual(list2, result);
  });

  it('LinkedList mergeList', function () {
    var list3 = List.mergeList(list, list2);

    assert.equal(list3.head.data, 'b');
    assert.equal(list3.head.next.data, 'd');
    assert.equal(list3.head.next.next.data, 'b');
    assert.equal(list3.tail.data, 'c');
  });

  var arr = [1,2,3,4];
  var list3 = new List(arr);

  it('LinkedList iterating', function () {
    console.log('iterating')
    console.log(list);
    list.each(function (node, index) {
      assert.equal(node.data, arr[index]);
    });
  });
});