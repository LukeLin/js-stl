'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('linkedList tests', function () {

  var list = new List();

  it('should find the second item', function () {
    list.push('b');
    expect(list.head.data).toBe('b');
    expect(list.tail.next).toBe(null);

    list.unshift('a');
    expect(list.head.data).toBe('a');
    expect(list.head.next.data).toBe('b');

    list.insertAfter('b', 'c');
    expect(list.item(2).data).toBe('b');
    expect(list.tail.data).toBe('c');
  });

  it('should remove one item', function () {
    expect(list.remove('c')).toBe(true);
    list.remove('a');
    expect(list.head.data).toBe('b');
  });

  var list2 = new List();

  it('should match the json', function () {
    list2.push('c');
    list2.unshift('d');
    list2.insertAfter('d', 'b');
    expect((0, _stringify2.default)(list2)).toBe('{"head":{"data":"d","next":{"data":"b","next":{"data":"c","next":null}}},"tail":{"data":"c","next":null}}');
  });

  it('should merge the lists', function () {
    var list3 = List.mergeList(list, list2);
    expect(list3.head.data).toBe('d');
    expect(list3.head.next.data).toBe('b');
    expect(list3.head.next.next.data).toBe('c');
    expect(list3.tail.data).toBe('b');
  });
});