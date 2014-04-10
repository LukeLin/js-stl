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
  },
  orderInsert: function(data, cmp){
    cmp = typeof cmp === 'function' ? cmp : function (a, b){
      if(a > b)
        return 1;
      else if(a === b)
        return 0;
      else
        return -1;
    };
    var previous = this.head;
    var current = this.head;

    if(current === null){
      this.head = this.tail = this.makeNode(data);
      return;
    }

    var me = this;
    while(current){
      var ret = cmp(data, current.data);
      // 如果插入元素大于当前元素，准备下次遍历
      if(ret > 0){
        previous = current;
        current = current.next;

        // 如果等于，直接插入到后面
      } else if(ret === 0){
        return insertBetween(data, previous, current);

        // 如果小于则插入到前节点和当前节点中
        // 因为已经是排序了，所以不需要多余判断了
      } else {
        if(this.head === previous && previous === current){
          return this.insertAsFirst(data);
        } else {
          return insertBetween(data, previous, current);
        }
      }
    }

    // 插入到最后一个结点
    previous.next = this.makeNode(data);
    this.tail = previous.next;

    function insertBetween(data, a, b){
      var temp = me.makeNode(data);
      temp.next = b;
      a.next = temp;
      return true;
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
/*
var list = new List();

list.orderInsert('e');
list.orderInsert('b');
list.orderInsert('c');
list.orderInsert('a');
list.orderInsert('d');
list.orderInsert('f');
*/