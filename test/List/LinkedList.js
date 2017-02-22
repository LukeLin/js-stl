import assert from 'assert';
import List from '../../lib/List/LinkedList';

describe('linkedList tests', function(){

  var list = new List();

  it('should find the second item', function(){
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

  it('should remove one item', function(){
    assert.equal(list.remove('c'), 'c');
    list.remove('a');
    assert.equal(list.head.data, 'b');
  });

  var list2 = new List();

  it('should match the json', function(){
    list2.push('c');
    list2.unshift('d');
    list2.insertAfter('d', 'b');
    assert.equal(JSON.stringify(list2), '{"head":{"data":"d","next":{"data":"b","next":{"data":"c","next":null}}},"tail":{"data":"c","next":null}}');
  });

  it('should merge the lists', function(){
    var list3 = List.mergeList(list, list2);
    console.log(JSON.stringify(list3))
    assert.equal(list3.head.data,'b');
    assert.equal(list3.head.next.data,'d');
    assert.equal(list3.head.next.next.data,'b');
    assert.equal(list3.tail.data,'c');
  });
});