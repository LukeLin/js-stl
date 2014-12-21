// АВЛ - деревья (ABL - tree)
//http://learn.javascript.ru/play/4KcYu
function Node(key) {
    this.key = key;
    this.left = this.right = null;
    this.balance = 0;
}
function balance (node) {
    function deepth(node) {
        return (node) ? 1 + Math.max(deepth(node.left), deepth(node.right)) : 0;
    };
    return deepth(node.right) - deepth(node.left);
};
Node.prototype.simpleRotation = function( node, to ) {
    var ato = (to == 'left') ? 'right' : 'left';
    var root = node[to];
    node[to] = root[ato];
    root[ato] = node;
    node.balance = balance(node);
    root.balance = balance(root);
    return root;
}
Node.prototype.doubleRotation = function ( node, to ) {

    var ato = (to == 'left') ? 'right' : 'left';
    var rootTo = node[to];
    var root = rootTo[ato];

    rootTo[ato] = root[to];
    node[to] = root[ato];
    root[to] = rootTo;
    root[ato] = node;

    rootTo.balance = balance(rootTo);
    node.balance = balance(node);
    root.balance = balance(root);
    return root;
}
Node.prototype.insert = function (node) {
    if ( this.key == node.key) return this;
    var to, result;
    to = (this.key < node.key) ? 'right' : 'left';

    //если есть поддеревья - спускаемся, если лист - добавляем ему узел
    //if there're  subtrees then we go down, else it's a leaf - add its the node
    if( this[to] ) {
        result = this[to].insert(node);
    } else {
        this[to] = node;
        this.balance = balance(this);
        return this;
    }


    this[to] = result;
    return this.rebalance();
}
Node.prototype.remove = function (node) {

    function isLeaf(node) {
        return (node.left == null || node.right == null);
    }
    function getLeaf(node) {
        return (node.left) ? node.left : node.right;
    }
    function getNode (node, to) {
        if (isLeaf(node) ) {
            return node;
        }
        return getNode(node[to], to);
    }
    function whereLeaf(node) {
        var to = '';
        if ( isLeaf(node.left) )  return to = 'left';
        if ( isLeaf(node.right) ) return to = 'right';
        return to;
    }

    var to = (this.key < node.key) ? 'right' : 'left';

    if (this.key != node.key) {
        if ( this[to] ) {
            this[to] = this[to].remove(node);
            return this.rebalance();
        }
    } else { // it's node we are searching

        if ( isLeaf(this) ) return getLeaf(this);
        //node - isn't leaf but its children may be a leaf
        if( to = whereLeaf(this) ) {
            var ato = (to == 'left') ? 'right' : 'left';
            if ( this[to][ato] == null ) {
                this[to][ato] = this[ato];
                return this[to].rebalance();
            } else {
                this[to][ato][ato] = this[ato];
                this[to][ato][to] = this[to];
                return this[to][ato].rebalance();
            }
        } else {
            //seach leaf for change to node
            to = (this.balance > 0 ) ? 'right' : 'left';
            ato = (to == 'left') ? 'right' : 'left';
            var leaf = getNode(this[to], ato);
            this[to] = this[to].remove(leaf);
            leaf.left = this.left;
            leaf.right = this.right;
            return leaf.rebalance();
        }
    }
    return this;
}
Node.prototype.rebalance = function () {
    this.balance = balance(this);
    if ( Math.abs(this.balance) == 2)  {
        var rb = (this.balance > 0 ) ? this.right.balance : this.left.balance;
        var tb = this.balance;
        var to = (this.balance > 0 ) ? 'right' : 'left';
        //простое вращение ( simple rotation)
        if( rb * tb > 0 ) {
            return this.simpleRotation(this, to);
        } else {
            //двойное вращение (double rotation)
            return  this.doubleRotation( this, to);
        }
    }
    return this;
}

/* Node.prototype.showTree = function(node,color, bgcolor) {
 var node = node || this;
 var bgcolor = bgcolor || '#ff0';
 var color = color || 'green';
 var style = '"color:' + color + ';background-color:' + bgcolor + ';border-bottom:1px solid black;border-left:1px solid black;border-top:1px solid black;"';
 var stringTree = '<ul>';
 if(node) {
 stringTree +='<li style=' + style +'>' + node.key + ', b:' + node.balance;
 if( node.right ) {
 stringTree += showTree(node.right,'red', '#09f');
 }
 if( node.left ) {
 stringTree += showTree(node.left, 'blue','red');
 }
 }
 return stringTree += '</ul>';
 }
 */
function showTree(node, color, bgcolor) {
    var stringTree = '<ul>';
    if (node) {
        stringTree += '<li style="color:' + color + ';background-color:' + bgcolor + '">' + node.key + ', b:' + node.balance;
        if (node.right) {
            stringTree += showTree(node.right, 'red', '#09f');
        }
        if (node.left) {
            stringTree += showTree(node.left, 'blue', 'red');
        }
    }
    return stringTree += '</ul>';
}

var str = 'ckbfjlaegmdh';

var test = new Node('c');
for(var i = 0; i < str.length; ++i){
    test.insert(new Node(str[i]));
}
console.log(test);