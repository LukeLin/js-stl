function List() {
  this.head = null;
  this.tail = null;
}
module.exports = List;

List.mergeList = function (a, b, compare) {
  var ha = a.head;
  var hb = b.head;
  var pa = ha;
  var pb = hb;
  var c = new List();
  var q;
  compare = compare || function (data1, data2) {
    return data1 <= data2;
  };

  while (pa && pb) {
    var data1 = pa.data;
    var data2 = pb.data;

    if (!compare(data1, data2)) {
      // delete head node
      q = a.delFirst();
      // append the node to c linkedList
      c.append(q);
      pa = a.head;
    } else {
      q = b.delFirst();
      c.append(q);
      pb = b.head;
    }
  }

  if (pa) {
    c.append(pa);
  } else {
    c.append(pb);
  }

  return c;
};

List.prototype = {
  makeNode: function(data, next){
    return {
      data: data != null ?  data : null,
      next: next || null
    };
  },
  delFirst: function () {
    var head = this.head;
    this.head = this.head.next;
    head.next = null;

    if(this.head === null) this.tail = null;
    return head;
  },
  append: function (node) {
    if (this.head !== null) {
      this.tail.next = node;
      this.tail = this.tail.next;
    } else {
      this.head = node;
      this.tail = node;
    }
  },
  add: function (data) {
    if (this.head === null) {
      this.head = this.makeNode(data);
      this.tail = this.head;
    } else {
      this.tail.next = this.makeNode(data);
      this.tail = this.tail.next;
    }

    this.tail.data = data;
  },
  'delete': function (data) {
    var current = this.head;
    var previous = this.head;
    var elem;

    while (current !== null) {
      if (data === current.data) {
        if (current === this.head) {
          this.head = current.next;
          elem =  current.data;
          break;
        }

        if (current === this.tail) this.tail = previous;

        previous.next = current.next;
        elem =  current.data;
        break;
      }

      previous = current;
      current = current.next;
    }

    if(this.head === null) this.tail = null;

    return elem ? elem : false;
  },
  insertAsFirst: function (data) {
    var temp = this.makeNode(data);
    temp.next = this.head;
    this.head = temp;
  },
  insertAfter: function (target, data) {
    var current = this.head;
    while (current !== null) {
      if (current.data === target) {
        var temp = this.makeNode(data);
        temp.next = current.next;

        if (current === this.tail) this.tail = temp;

        current.next = temp;
        return;
      }

      current = current.next;
    }
  },
  item: function (index) {
    var current = this.head;

    while (current !== null) {
      if (--index === 0) return current;

      current = current.next;
    }

    return null;
  },
  each: function (callback) {
    var current = this.head;

    while (current !== null) {
      callback(current);
      current = current.next;
    }
  }
};
/*
var list = new List();
list.add('b');
list.insertAsFirst('a');
list.insertAfter('b', 'c');
console.log(list.item(2));
console.log(JSON.stringify(list));
list.each(function (node) {
  if (node.data === 'b') {
    console.log('get b in each');
  }
});
list['delete']('c');
list['delete']('a');
console.log(list);

var list2 = new List();
list2.add('c');
list2.insertAsFirst('d');
list2.insertAfter('d', 'b');
console.log(JSON.stringify(list2));

var list3 = List.mergeList(list, list2);
console.log(list3);
*/