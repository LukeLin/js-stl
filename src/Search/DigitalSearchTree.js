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

 Trie是一种非常简单高效的数据结构，但有大量的应用实例。
 （1） 字符串检索
 事先将已知的一些字符串（字典）的有关信息保存到trie树里，查找另外一些未知字符串是否出现过或者出现频率。
 举例：
 @  给出N 个单词组成的熟词表，以及一篇全用小写英文书写的文章，请你按最早出现的顺序写出所有不在熟词表中的生词。
 @  给出一个词典，其中的单词为不良单词。单词均为小写字母。再给出一段文本，文本的每一行也由小写字母构成。判断文本中是否含有任何不良单词。例如，若rob是不良单词，那么文本problem含有不良单词。

 （2）字符串最长公共前缀
 Trie树利用多个字符串的公共前缀来节省存储空间，反之，当我们把大量字符串存储到一棵trie树上时，我们可以快速得到某些字符串的公共前缀。
 举例：
 @ 给出N 个小写英文字母串，以及Q 个询问，即询问某两个串的最长公共前缀的长度是多少？
 解决方案：首先对所有的串建立其对应的字母树。此时发现，对于两个串的最长公共前缀的长度即它们所在结点的公共祖先个数，于是，问题就转化为了离线（Offline）的最近公共祖先（Least Common Ancestor，简称LCA）问题。
 而最近公共祖先问题同样是一个经典问题，可以用下面几种方法：
 1. 利用并查集（Disjoint Set），可以采用采用经典的Tarjan 算法；
 2. 求出字母树的欧拉序列（Euler Sequence ）后，就可以转为经典的最小值查询（Range Minimum Query，简称RMQ）问题了；
 （关于并查集，Tarjan算法，RMQ问题，网上有很多资料。）

 （3）排序
 Trie树是一棵多叉树，只要先序遍历整棵树，输出相应的字符串便是按字典序排序的结果。
 举例：
 @ 给你N 个互不相同的仅由一个单词构成的英文名，让你将它们按字典序从小到大排序输出。

 （4） 作为其他数据结构和算法的辅助结构
 如后缀树，AC自动机等
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

 // 相关资料
 http://www.cnblogs.com/rollenholt/archive/2012/04/24/2468932.html
 http://blog.csdn.net/v_july_v/article/details/6897097
 http://www.raychase.net/1783
 */

const LEAF = 'leaf';
const BRANCH = 'branch';
const TERMINAL = new String('$');

export class DoubleLinkedTree {
    constructor(symbol = 'root', kind = BRANCH, info = null) {
        this.symbol = symbol;
        this.next = null;
        this.kind = kind;
        this.info = info;
        this.first = null;
    }

    synoSearch (key) {
        let p = this.first;

        for (let i = 0; p && i < key.length; ++i) {
            if (p && p.kind === LEAF) break;
            while (p && p.symbol < key[i]) p = p.next;

            if (p && p.symbol === key[i])
                p = p.first;
            else p = null;
        }

        return p && p.kind === LEAF ? p.info : null;
    }

    search (key) {
        let p = this.first;

        for (let i = 0; p && i < key.length; ++i) {
            while (p && p.symbol < key[i]) p = p.next;

            if (p && p.symbol === key[i])
                p = p.first;
            else p = null;
        }

        return p && p.kind === LEAF ? p.info : null;
    }

    insert(key, value) {
        key += '';
        let cur = this;

        for (let i = 0; i < key.length; ++i) {
            let c = key[i];
            let p = cur;
            cur = cur.first;
            let node = new DoubleLinkedTree(c, BRANCH);

            // 如果没有子结点则将新结点作为子结点
            if (!cur) {
                p.first = node;
                node.parent = p;
                cur = node;
            } else {
                // 在兄弟结点中找到对应结点
                if(c < cur.symbol) {
                    node.parent = cur.parent;
                    node.next = cur;
                    node.parent.first = node;
                    cur = node;
                } else if(c > cur.symbol) {
                    let b;
                    while (cur) {
                        // 如果相等，退出该循环查找下一字符
                        if (c === cur.symbol) break;
                        // 如果小于当前字符，则插入到当前结点前面
                        else if(c < cur.symbol) {
                            node.parent = cur.parent;
                            node.next = cur;
                            b.next = node;
                            cur = node;
                            break;
                        } else {
                            b = cur;
                            cur = cur.next;
                        }
                    }

                    // 如果没有兄弟结点则插入到兄弟结点
                    if(!cur) {
                        b.next = node;
                        node.parent = b.parent;
                        cur = node;
                    }
                }
            }
        }

        // 生成叶子结点
        let success = false;
        if (cur.kind === BRANCH) {
            let child = cur.first;

            // 如果不存在关键字则说明插入成功，否则插入失败
            if(!(child && child.symbol === TERMINAL)) {
                cur.first = new DoubleLinkedTree(TERMINAL, LEAF, value != null ? value : key);
                cur.first.parent = cur;
                cur.first.next = child;
                success = true;
            }
        }

        return success;
    }

    remove (key) {
        let p = this.first;
        let i = 0;

        while (p && i < key.length) {
            while (p && p.symbol < key[i]) p = p.next;

            if (p && p.symbol === key[i]) {
                p = p.first;
                ++i;
            } else return false;
        }

        let data = p.info;
        while (!p.next && p.parent) p = p.parent;
        let top = p;

        if (top == this) {
            this.first = null;
            return data;
        }

        p = top.parent;
        if (p) {
            p = p.first;
            while (p) {
                let pre;
                if (p == top) {
                    // 删除在first域上的子树结点
                    if (!pre) top.parent.first = top.parent.first.next;
                    // 删除在next域的兄弟结点
                    else pre.next = pre.next.next;

                    return data;
                } else {
                    pre = p;
                    p = p.next;
                }
            }
        }

        return false;
    }
}

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

console.log('\nsearch: ');
console.log(test.search('CAI'));
console.log(test.search('CHA'));
console.log(test.search('CHANG'));
console.log(test.search('ZHAOx'));

console.log('\nremove:');
console.log(test.remove('CAI'));
console.log(test.remove('CAI'));
console.log(test.remove('LAN'));
console.log(test.remove('CAO'));
console.log(test.remove('CHA'));
console.log(test.remove('CHANG'));
console.log(test.remove('CHAO'));
console.log(test.remove('CHEN'));
console.log(test.remove('LI'));
console.log(test.remove('LIU'));
console.log(test.remove('ZHAO'));


/*
 多重链表表示

 若以树的多重链表表示键树，则树的每个结点中应含有d个指针域，此时的键树又称Trie树。
 （Trie是从检索retrieve中取中间四个字符的，读音同try）。
 若从键树中某个结点到叶子结点的路径上每个结点都只有一个孩子，则可将该路径上所有结点压缩成一个“叶子结点”，且在该叶子结点中存储关键字及指向记录的指针等信息。
 在Trie树中有两种结点：
 分支结点：含有d个指针域和一个指示该结点中非空指针域的个数的整数域。在分支结点中不设数据域，每个分支结点所表示的字符均有其父结点中指向该结点的指针所在位置决定。
 叶子结点：含有关键字域和指向记录的指针域。


 在Trie树上进行查找

 从根结点出发，沿和给定值相应的指针逐层向下，直至叶子结点，若叶子结点中的关键字和给定值相等，则查找成功，若分支结点中和给定值相应的指针为空，或叶子结点中的关键字和给定值不相等，则查找不成功。


 优化Trie树的深度

 我们可对关键字集选择一种合适的分割。先按首字符不通分成多个子集之后，然后按最后一个字符不同分割每个子集，再按第二个字符。。。前后交叉分割。一缩减Trie树的深度
 */
// 求字符在字母表中的序号
function order(c) {
    return c ? c.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0) + 1 : 0;
}

// 通过回溯法清理Trie树的函数
function removeNode(trieNode, order, clear) {
    trieNode.branch.nodes[order] = null;
    --trieNode.branch.num;

    if (!clear) return;

    let nodes = trieNode.branch.nodes;
    let parent = trieNode.parent;
    let pre = trieNode;

    while (parent) {
        for (let i in nodes) {
            if (nodes.hasOwnProperty(i) && nodes[i]) return;
        }

        let index;
        let parentNodes = parent.branch.nodes;
        for (let i in parentNodes) {
            if (parentNodes.hasOwnProperty(i) && parentNodes[i] && parentNodes[i] == pre)
                index = i;
        }
        parent.branch.nodes[index] = null;
        --parent.branch.num;

        pre = parent;
        nodes = parent.branch.nodes;
        parent = parent.parent;
    }
}

export class TrieTree {
    constructor(kind) {
        this.kind = kind || BRANCH;
        this.parent = null;

        if (kind === LEAF) {
            this.leaf = {
                key: null,
                info: null
            };
        } else {
            this.branch = {
                // “$”为第一个字符，后续为26个字母
                nodes: new Array(27),
                num: 0
            };
        }
    }

    search (key) {
        let p = this, i = 0;
        for (;
             p && p.kind === BRANCH && i < key.length;
             p = p.branch.nodes[order(key[i])], ++i);

        if (p) {
            if (p.kind === LEAF && p.leaf.key === key) return p.leaf.info;
            // 同义词
            else if (p.kind === BRANCH) {
                p = p.branch.nodes[0];
                if (p && p.leaf.key === key) return p.leaf.info;
            }
        }

        return null;
    }

    insert (key, value) {
        // 建叶子结点
        let q = new TrieTree(LEAF);
        q.leaf.key = key;
        q.leaf.info = value;

        // 自上而下查找
        let last;
        let p = this, i = 0;
        for (;
             p && p.kind === BRANCH && i < key.length && p.branch.nodes[order(key[i])];
             p = p.branch.nodes[order(key[i])], ++i) last = p;

        // 如果最后落到分支结点（无同义词）
        // 直接连上叶子
        if (p.kind === BRANCH) {
            p.branch.nodes[order(key[i])] = q;
            q.parent = p;
            ++p.branch.num;
        }
        // 如果最后落到叶子结点（有同义词）
        else {
            if (p.leaf.key === key) return false;

            // 建立新的分支结点
            let r = new TrieTree(BRANCH);
            // 用新的分支结点取代老叶子结点和上一层的联系
            last.branch.nodes[order(key[i - 1])] = r;
            r.parent = last;
            r.branch.num = 2;
            r.branch.nodes[order(key[i])] = q;
            q.parent = r;
            // 新分支结点与新老两个叶子结点相连
            r.branch.nodes[order(p.leaf.key[i])] = p;
            p.parent = r;
        }

        return true;
    }

    /**
     *
     * @param key
     * @param {Boolean} clear 是否需要清理结点
     * @returns {*} 如果删除成功返回info数据否则返回false
     */
    remove (key, clear) {
        let last;
        let p = this, i = 0;
        // 查找待删除元素
        for (;
             p && p.kind === BRANCH && i < key.length;
             p = p.branch.nodes[order(key[i])], ++i) last = p;

        if (!p) return false;

        clear = typeof clear !== 'undefined' ? clear : true;
        let data = null;

        if (p.kind === LEAF && p.leaf.key === key) {
            data = p.leaf.info;
            removeNode(last, order(key[i - 1]), clear);
            return data;
        } else if (p.kind === BRANCH) {
            p = p.branch.nodes[0];
            if (p && p.leaf.key === key) {
                data = p.leaf.info;
                removeNode(p.parent, 0, clear);
                return data;
            }
        }

        return false;
    }
}

var test = new TrieTree();

test.insert('CHA');
test.insert('CHA');
test.insert('CHANG');
test.insert('CAI');
test.insert('CHEN');
test.insert('CAO');
test.insert('CHAO');
test.insert('LONG');
test.insert('LI');
test.insert('LAN');
test.insert('LIU');
test.insert('WANG');
test.insert('WEN');
test.insert('WU');
test.insert('YANG');
test.insert('YUN');
test.insert('ZHAO');

console.log('\nsearch: ');
console.log(test.search('YUN'));
console.log(test.search('ZHAO'));
console.log(test.search('CHA'));

test.remove('LAN');
test.remove('LIU');
test.remove('WANG');
test.remove('WEN');
test.remove('WU');
test.remove('YANG');
test.remove('YUN');
test.remove('ZHAO');
test.remove('CHA');
test.remove('CHANG');
test.remove('CAI');
test.remove('CHEN');
test.remove('CAO');
test.remove('CHAO');
test.remove('LONG');
test.remove('LI');

test.insert('LI');
test.insert('LAN');
test.insert('LIU');
