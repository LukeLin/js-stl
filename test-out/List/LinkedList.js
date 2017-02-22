'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _LinkedList = require('../../lib/List/LinkedList');

var _LinkedList2 = _interopRequireDefault(_LinkedList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('linkedList tests', function () {

  var list = new _LinkedList2.default();

  it('should find the second item', function () {
    list.push('b');
    _assert2.default.equal(list.head.data, 'b');
    _assert2.default.equal(list.tail.next, null);

    list.unshift('a');
    _assert2.default.equal(list.head.data, 'a');
    _assert2.default.equal(list.head.next.data, 'b');

    list.insertAfter('b', 'c');
    _assert2.default.equal(list.item(2).data, 'b');
    _assert2.default.equal(list.tail.data, 'c');
  });

  it('should remove one item', function () {
    _assert2.default.equal(list.remove('c'), 'c');
    list.remove('a');
    _assert2.default.equal(list.head.data, 'b');
  });

  var list2 = new _LinkedList2.default();

  it('should match the json', function () {
    list2.push('c');
    list2.unshift('d');
    list2.insertAfter('d', 'b');
    _assert2.default.equal(JSON.stringify(list2), '{"head":{"data":"d","next":{"data":"b","next":{"data":"c","next":null}}},"tail":{"data":"c","next":null}}');
  });

  it('should merge the lists', function () {
    var list3 = _LinkedList2.default.mergeList(list, list2);
    console.log(JSON.stringify(list3));
    _assert2.default.equal(list3.head.data, 'b');
    _assert2.default.equal(list3.head.next.data, 'd');
    _assert2.default.equal(list3.head.next.next.data, 'b');
    _assert2.default.equal(list3.tail.data, 'c');
  });
});