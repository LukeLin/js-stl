function List(){
  this.head = null;
  this.tail = null;
}

List.makeNode = function(){
  return {
    data: null,
    next: null
  };
};

List.mergeList = function(a, b, compare){
  var ha = a.head;
  var hb = b.head;
  var pa = ha;
  var pb = hb;
  var c = new List();
  var q ;
  compare = compare || function(data1, data2){
    return data1 <= data2;
  };

  while(pa && pb){
    var data1 = pa.data;
    var data2 = pb.data;

    if(!compare(data1, data2)){
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

  if(pa){
    c.append(pa);
  } else {
    c.append(pb);
  }

  return c;
};

List.prototype = {
  delFirst: function(){
    var head = this.head;
    this.head = this.head.next;
    head.next = null;
    return head;
  },
  append: function(node){
    if(this.head !== null){
      this.tail.next = node;
      this.tail = this.tail.next;
    } else {
      this.head = node;
      this.tail = node;
    }
  },
  add: function(data){
    if(this.head === null){
      this.head = List.makeNode();
      this.tail = this.head;
    } else {
      this.tail.next = List.makeNode();
      this.tail = this.tail.next;
    }

    this.tail.data = data;
  },
  'delete': function(data){
    var current = this.head;
    var previous = this.head;

    while(current !== null){
      if(data === current.data){
        if(current === this.head){
          this.head = current.next;
          return true;
        }

        if(current === this.tail) this.tail = previous;

        previous.next = current.next;
        return true;
      }

      previous = current;
      current = current.next;
    }

    return false;
  },
  insertAsFirst: function(data){
    var temp = List.makeNode();
    temp.next = this.head;
    this.head = temp;
    temp.data = data;
  },
  insertAfter: function(target, data){
    var current = this.head;
    while(current !== null){
      if(current.data === target){
        var temp = List.makeNode();
        temp.data = data;
        temp.next = current.next;

        if(current === this.tail) this.tail = temp;

        current.next = temp;
        return;
      }

      current = current.next;
    }
  },
  item: function(index){
    var current = this.head;

    while(current !== null){
      if(--index === 0) return current;

      current = current.next;
    }

    return null;
  },
  each: function(callback){
    var current = this.head;

    while(current !== null){
      callback(current);
      current = current.next;
    }
  }
};