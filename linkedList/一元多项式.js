
var List = require('./complete-LinkedList');

function Term(coef, expn) {
  // 系数
  this.coef = coef || null;
  // 指数
  this.expn = expn || null;
}

// 一元多项式
function Polynomial() {
  List.call(this);
}
Polynomial.prototype = {
  __proto__: List.prototype,

  locateElem: function (elem, compare) {
    var current = this.head;
    var prev = current;
    var obj;

    while (current !== null) {
      obj = {};
      var ret = compare(current.data, elem);
      if (ret === 0) {
        obj.data = current;
        obj.found = true;
        break;
      } else if (ret > 0) {
        obj.data = prev;
        obj.found = false;
        break;
      }

      prev = current;
      current = current.next;
    }

    return obj;
  },
  initList: function () {
    this.head = List.makeNode();
    this.head.data = new Term();
    this.tail = this.head;
  },
  cmp: function (a, b) {
    if (a.expn < b.expn) {
      return -1;
    } else if (a.expn === b.expn) {
      return 0;
    } else {
      return 1;
    }
  },
  // 输入m项的系数和指数，建立表示一元多项式的有序链表p
  createPolyn: function (elems, elems2) {
    var m = elems.length;
    this.initList();
    var h = this.head;
    var e = h.data;
    e.coef = 0;
    e.expn = -1;

    for (var i = 0; i < m; i++) {
      e.coef = +elems[i];
      e.expn = +elems2[i];

      var q = this.locateElem(e, this.cmp);
      if (!q.found) {
        this.insertAsFirst(e);
      }

      e = {};
    }
  },
  // 多项式加法，a = a + b
  addPolyn: function (b) {
    var a = this;
    // ha, hb分别指向头结点
    var ha = a.head;
    var hb = b.head;
    // qa，qb分别指向当前结点
    var qa = ha;
    var qb = hb;

    while (qa && qb) {
      // 当前的比较元素
      var elem1 = qa.data;
      var elem2 = qb.data;

      switch (this.cmp(elem1, elem2)) {
        // 多项式a中当前结点的指数值小
        case -1:
          ha = qa;
          qa = qa.next;
          break;
        // 两者的指数相等
        case 0:
          var sum = elem1.coef + elem2.coef;
          // 修改多项式a中当前结点的系数值
          if (sum !== 0) {
            qa.data.coef = sum;
            ha = qa;

            // 删除多项式a中当前结点
          } else {
            a.delete(elem1);
          }

          b.delFirst();
          hb = b.head;
          qb = hb;
          qa = ha.next;
          break;
        // 多项式a中当前结点的指数值大
        case 1:
          a.insertAsFirst(b.delFirst().data);
          qb = b.head;
          ha = a.head;
          break;
      }
    }

    if (b.head) {
      a.append(qb);
    }
  }
};

var test = new Polynomial();
test.createPolyn([-1, 2, 4], [1, 2, 3]);

var test2 = new Polynomial();
test2.createPolyn([1, 2, 3], [1, 2, 3]);
test.addPolyn(test2);
console.log(JSON.stringify(test));

var test3 = new Polynomial();
test3.createPolyn([1, 5, 2], [1, 5, 2]);
test.addPolyn(test3);

console.log(test);