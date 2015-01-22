/**
 * Created by Luke on 2015/1/11.
 */

/*

如果一个关键字可以表示成字符的序号，即字符串，那么可以用键树（keyword tree），又称数字搜索树（digital search tree）或字符树，也叫字典树，来表示这样的字符串的集合。

概念

如果一个关键字可以表示成字符的序号，即字符串，那么可以用键树（keyword tree），又称数字搜索树（digital search tree）或字符树，来表示这样的字符串的集合。键树又称为数字查找树（Digital Search Tree)或Trie树(trie为retrieve中间4个字符)，其结构受启发于一部大型字典的“书边标目”。字典中标出首字母是 A,B,C,....Z的单词所在页,再对各部分标出第二字母为A,B,C,...Z的单词所在的页, ....等等。

键树是一种特殊的查找树，它的某个节点不是包含一个或多个关键字，而是只包含组成关键字的一部分（字符或数字），比如：如果关键字是数值，则节点中只包含一个数位；如果关键字是单词，则节点中只包含一个字母字符。

根结点不代表任何字符，根以下第一层的结点对应于字符串的第一个字符，第二层的结点对应于字符串的第二个字符……每个字符串可由一个特殊的字符如“$”等作为字符串的结束符，用一个叶子结点来表示该特殊字符。把从根到叶子的路径上，所有结点（除根以外）对应的字符连接起来，就得到一个字符串。因此，每个叶子结点对应一个关键字。在叶子结点还可以包含一个指针，指向该关键字所对应的元素。整个字符串集合中的字符串的数目等于叶子结点的数目。如果一个集合中的关键字都具有这样的字符串特性，那么，该关键字集合就可采用这样一棵键树来表示。事实上，还可以赋予“字符串”更广泛的含义，它可以是任何类型的对象组成的串。


键树的存储
1）双链树表示
2) 多重链表表示


键树的应用场景
 1. 保存一本字典，英文字典大约只有50,000个单词，并且Trie还演化出来一种叫做Directed acyclic word graph的东西，它将后缀一样的字符串也进行了压缩，所以空间利用率有了进一步提高。所以Trie在空间利用率上不会比Binary Search Tree差太多。
 2. 根据保存的字典，可以预测用户输入内容
 3. 断词和拼写查错软件也运用了Trie -- spellings/suggestions/type-ahead-lookup/auto-completion/
 这些应用场景都有一个特点，就是不是单独地查询一个词，而是获取以有一定字母顺序的一组字符串


 有一个存放英文单词的文本文件，现在需要知道某些给定的单词是否在该文件中存在，若存在，它又出现了多少次？

 这样的问题解法有多种，普通青年直接暴力查找，稍文艺点的用map。顺序查找的话，每给定一个单词就得遍历整个字符串数组，时间开销实在太大；如果将所有的单词都存放在一个map中，每次查找的时间复杂度则降为O(log(n))。不得不说，对于一般的应用场景，map足够满足所有需求。

 但对于这个问题，还有更好的方法。有一种数据结构似乎就是为解决此类问题而诞生的，它就是字典树。我们知道，英文单词有很多都有相同的前缀，对于相同的前缀，字典树只存储一次，而map则是有多少个单词就存储多少次，所以在这个问题中，字典树比map省空间；在字典树中查找字符串的时间复杂度只跟树的深度有关而跟究竟有多少个字符串无关，而树的深度只跟字符串的长度有关，超过30个拉丁字母的英文单词基本没有，所以在该问题中查找字符串的时间复杂度只有O(1)，比map省时间。

 所以对于这样一个特定的问题，字典树自然是最佳的选择
 */


/*
双链树表示

以树的孩子兄弟链表来表示键树，则每个分支结点包括三个域：
symbol域：存储关键字的一个字符；
first域：存储指向第一棵子树根的指针；
next域：存储指向右兄弟的指针。

同时，叶子结点不含first域，它的infoptr域存储指向该关键字记录的指针。
此时的键树又称双链树。
在双链树中插入或删除一个关键字，相当于在树中某个结点上插入或删除一棵子树。
结点的结构中可以设置一个枚举变量表示结点的类型，叶子结点和分支结点。
叶子结点和分支结点都有symbol域和next域。不同的一个域可以用联合表示，叶子结点包含infoptr指向记录，而分支结点是first域指向其第一棵子树。


双链树的查找

假设给定值为K.ch(0..num-1), 其中K.ch[0]至 K.ch[num-2]表示待查关键字中num-1个字符， K.ch[num-1]为结束符$。
从双链树的根指针出发，顺first指针找到第一棵子树的根结点，以K.ch[0]和此结点的symbol域比较，若相等，则顺first域再比较下一字符，否则沿next域顺序查找。
若直至空仍比较不等，则查找不成功。


 */

var LEAF = 'leaf';
var BRANCH = 'branch';

function DoubleLinkedTree(symbol, kind, info){
    this.symbol = symbol || 'root';
    this.next = null;
    this.kind = kind || BRANCH;
    this.info = info || null;
    this.first = null;
}
DoubleLinkedTree.prototype = {
    constructor: DoubleLinkedTree,

    search: function(key){
        var p = this.first;
        var i = 0;

        while(p && i < key.length){
            while(p && p.symbol < key[i]) p = p.next;

            if(p && p.symbol === key[i]) {
                p = p.first;
                ++i;
            } else p = null;
        }

        return p && p.kind === LEAF ? p.info : null;
    },

    insert: function(key) {
        key += '';
        var cur = this;

        for (var i = 0; i < key.length; ++i) {
            var c = key[i];
            var p = cur;
            cur = cur.first;
            var node = new DoubleLinkedTree(c);

            // 如果没有子结点则将新结点作为子结点
            if (!cur) {
                p.first = node;
                node.parent = p;
                cur = node;
            } else {
                // 在兄弟结点中找到对应结点
                var b;
                while (cur) {
                    // 如果相等，退出该循环查找下一字符
                    if (c === cur.symbol) break;
                    // 如果小于当前字符，则插入到当前结点前面
                    else if(c < cur.symbol) {
                        node.parent = cur.parent;
                        node.next = cur.next;
                        cur.next = node;
                    }

                    b = cur;
                    cur = cur.next;
                }

                // 如果没有兄弟结点则插入到兄弟结点
                if(!cur) {
                    b.next = node;
                    node.parent = b.parent;
                    cur = node;
                }
            }
        }

        // 生成叶子结点
        var success = false;
        if (cur.kind === BRANCH) {
            var child = cur.first;

            // 如果不存在关键字则说明插入成功，否则插入失败
            if(!(child && child.symbol === '$')) {
                cur.first = new DoubleLinkedTree('$', LEAF, key);
                cur.first.parent = cur;
                cur.first.next = child;
                success = true;
            }
        }

        return success;
    },

    remove: function(key){
        var p = this.first;
        var i = 0;

        while(p && i < key.length){
            while(p && p.symbol < key[i]) p = p.next;

            if(p && p.symbol === key[i]) {
                p = p.first;
                ++i;
            } else return false;
        }

        while(!p.next && p.parent) p = p.parent;
        var top = p;

        if(top == this) {
            this.first = null;
            return true;
        }

        p = top.parent;
        if(p) {
            p = p.first;
            while(p){
                var pre;
                if(p == top) {
                    if(!pre)
                        top.parent.first = top.parent.first.next;
                    else
                        pre.next = pre.next.next;

                    return true;
                } else {
                    pre = p;
                    p = p.next;
                }
            }
        }

        return false;
    }
};

var test = new DoubleLinkedTree();
test.insert('CAI');
test.insert('LAN');
test.insert('CAO');
test.insert('CHA');
test.insert('CHANG');
test.insert('CHAO');
test.insert('CHEN');
test.insert('LI');
test.insert('LIU');
test.insert('ZHAO');
test.insert('ZHAO');

console.log(test.search('CAI'));
console.log(test.search('CAT'));
console.log(test.search('CHANG'));
console.log(test.search('ZHAO'));

test.remove('CAI');
test.remove('CAI');
test.remove('LAN');
test.remove('CAO');
test.remove('CHA');
test.remove('CHANG');
test.remove('CHAO');
test.remove('CHEN');
test.remove('LI');
test.remove('LIU');
test.remove('ZHAO');