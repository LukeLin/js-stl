/*
后缀树算是很常见的字符串数据结构之一了，它在模式匹配中的应用非常多，比如DNA序列检测等。

后缀树的基本思路是是对一个字符串的所有后缀子串以Tries的方式进行描述，从而可以迅速地在后缀树上找出字符串的任意子串。

所以对于已经建立了后缀树的字符串，做字符串查找已经算是非常简单的任务了，同时由于Tries的特点，这种结构可以很方便地处理前/后任意字符串匹配（比如“*ABC”和“ABC*”），为了要处理中间的wildcard，比如ABC*DEF，可以分别查找ABC*和*DEF，然后再取交集即可。

后缀树也很适合于多模匹配问题，但它适用的场景主要是待匹配字符串固定，而模式串未定的场景。

一个利用后缀树的典型应用是LCS（Longest Common Substring）最大公共子串问题。采用动态规划也可以很容易地解决LCS问题，但它的时空复杂度均为O(N*M)，对于大多数应用是够了，可是，如果两个字符串是DNA序列，要从中间找出公共子串，O(N*M)的时空复杂度显然是无法接受的。而采用后缀树，复杂度就只是后缀树创建的复杂度，即O(N)

后缀树的应用

1.查找字符串 Pattern 是否在于字符串 Text 中
    方案：用 Text 构造后缀树，按在 Trie 中搜索字串的方法搜索 Pattern 即可。若 Pattern 在 Text 中，则 Pattern 必然是 Text 的某个后缀的前缀。
2.计算指定字符串 Pattern 在字符串 Text 中的出现次数
    方案：用 Text+'$' 构造后缀树，搜索 Pattern 所在节点下的叶节点数目即为重复次数。如果 Pattern 在 Text 中重复了 c 次，则 Text 应有 c 个后缀以 Pattern 为前缀。
3.查找字符串 Text 中的最长重复子串
    方案：用 Text+'$' 构造后缀树，搜索 Pattern 所在节点下的最深的非叶节点。从 root 到该节点所经历过的字符串就是最长重复子串。
4.查找两个字符串 Text1 和 Text2 的最长公共部分
    方案：连接 Text1+'#' + Text2+'$' 形成新的字符串并构造后缀树，找到最深的非叶节点，且该节点的叶节点既有 '#' 也有 '$'。
5.查找给定字符串 Text 里的最长回文
回文指："abcdefgfed" 中对称的字符串 "defgfed"。
回文半径指：回文 "defgfed" 的回文半径 "defg" 长度为 4，半径中心为字母 "g"。
    方案：将 Text 整体反转形成新的字符串 Text2，例如 "abcdefgfed" => "defgfedcba"。连接 Text+'#' + Text2+'$' 形成新的字符串并构造后缀树，然后将问题转变为查找 Text 和 Text1 的最长公共部分。

http://www.cnblogs.com/gaochundong/p/suffix_tree.html
http://vickyqi.com/2015/11/27/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E7%B3%BB%E5%88%97%E2%80%94%E2%80%94%E5%90%8E%E7%BC%80%E6%A0%91Java%E5%AE%9E%E7%8E%B0%E4%BB%A3%E7%A0%81/
*/

class Node {
    constructor(){
        // the index of a node with a matching suffix, representing a suffix link.
        // -1 indicates this node has no suffix link.
        this.suffixNode = -1;
    }

    toString(){
        return `Node(suffix link: ${ this.suffixNode })`;
    }
}

class Edge {
    /**
     * Creates an instance of Edge.
     * @param {any} firstCharIndex  index of start of string part represented by this edge
     * @param {any} lastCharIndex index of end of string part represented by this edge
     * @param {any} sourceNodeIndex ndex of source node of edge
     * @param {any} destNodeIndex index of destination node of edge
     * 
     * @memberOf Edge
     */
    constructor(firstCharIndex, lastCharIndex, sourceNodeIndex, destNodeIndex){
        this.firstCharIndex = firstCharIndex;
        this.lastCharIndex = lastCharIndex;
        this.sourceNodeIndex = sourceNodeIndex;
        this.destNodeIndex = destNodeIndex;
    }

    get length (){
        return this.lastCharIndex - this.firstCharIndex;
    }

    toString(){
        return `Edge(${this.sourceNodeIndex}, ${this.destNodeIndex}, ${this.firstCharIndex}, ${this.lastCharIndex})`;
    }
}
/**
 * Represents a suffix from first_char_index to last_char_index.
 * 
 * @class Suffix
 */
class Suffix {
    /**
     * Creates an instance of Suffix.
     * @param {any} sourceNodeIndex index of node where this suffix starts
     * @param {any} firstCharIndex index of start of suffix in string

     * @param {any} lastCharIndex index of end of suffix in string
     * 
     * @memberOf Suffix
     */
    constructor(sourceNodeIndex, firstCharIndex, lastCharIndex){
        this.sourceNodeIndex = sourceNodeIndex;
        this.firstCharIndex = firstCharIndex;
        this.lastCharIndex = lastCharIndex;
    }

    get length(){
        return this.lastCharIndex - this.firstCharIndex;
    }

    get explicit(){
        return this.firstCharIndex > this.lastCharIndex
    }

    get implicit(){
        return this.lastCharIndex >= this.firstCharIndex;
    }
}

/**
 * A suffix tree for string matching. Uses Ukkonen's algorithm
    for construction.
 * 
 * @class SuffixTree
 */
export default class SuffixTree {
    constructor(string, caseInsensitive){
        this.string = string;
        this.caseInsensitive = caseInsensitive;
        this.N = string.length - 1;
        this.nodes = [new Node()];
        this.edges = {};
        this.active = new Suffix(0, 0, -1);

        if(caseInsensitive) {
            this.string = string.toLowerCase();
        }

        for(let i = 0; i < string.length; ++i){
            this.addPrefix(i);
        }
    }

    /**
     * Lists edges in the suffix tree
     * 
     * @returns 
     * 
     * @memberOf SuffixTree
     */
    toString(){
        let currentIndex = this.N;
        let s = `\tStart \tEnd \tSuf \tFirst \tLast \tString\n`;
        let values = Object.values(this.edges);
        values.sort((a, b) => a.sourceNodeIndex - b.sourceNodeIndex);

        for(let edge of values){
            if(edge.sourceNodeIndex === -1) continue;

            s += `\t${edge.sourceNodeIndex} \t${edge.destNodeIndex} \t${this.nodes[edge.destNodeIndex].suffixNode} \t${edge.firstCharIndex} \t${edge.lastCharIndex} \t`;

            let top = Math.min(currentIndex, edge.lastCharIndex);
            s += this.string.substring(edge.firstCharIndex, top + 1) + '\n';
        }

        return s;
    }

    /**
     * The core construction method.
     * 
     * @param {any} lastCharIndex 
     * 
     * @memberOf SuffixTree
     */
    addPrefix(lastCharIndex){
        let lastParentNode = -1;
        let e = null;
        let parentNode = -1;

        while(true){
            parentNode = this.active.sourceNodeIndex;

            if(this.active.explicit){
                // prefix is already in tree
                if(this.edges[`${this.active.sourceNodeIndex}-${this.string[lastCharIndex]}`]) break;
            } else {
                e = this.edges[`${this.active.sourceNodeIndex}-${this.string[this.active.firstCharIndex]}`];

                // prefix is already in tree
                if(this.string[e.firstCharIndex + this.active.length+ 1] === this.string[lastCharIndex]) break;

                parentNode = this._splitEdge(e, this.active);;
            }

            this.nodes.push(new Node());
            e = new Edge(lastCharIndex, this.N, parentNode, this.nodes.length - 1);
            this._insertEdge(e);

            if(lastParentNode > 0){
                this.nodes[lastParentNode].suffixNode = parentNode;
            }
            lastParentNode = parentNode;

            if(this.active.sourceNodeIndex === 0){
                this.active.firstCharIndex += 1;
            } else {
                this.active.sourceNodeIndex = this.nodes[this.active.sourceNodeIndex].suffixNode;
            }

            this._canonizeSuffix(this.active);
        }

        if(lastParentNode > 0) {
            this.nodes[lastParentNode].suffixNode = parentNode;
        }

        this.active.lastCharIndex += 1;
        this._canonizeSuffix(this.active);
    }

    _insertEdge(edge){
        this.edges[`${edge.sourceNodeIndex}-${this.string[edge.firstCharIndex]}`] = edge;
    }

    _removeEdge(edge){
        delete this.edges[`${edge.sourceNodeIndex}-${this.string[edge.firstCharIndex]}`];
    }

    _splitEdge(edge, suffix){
        this.nodes.push(new Node());
        let e = new Edge(edge.firstCharIndex, edge.firstCharIndex + suffix.length, suffix.sourceNodeIndex, this.nodes.length - 1);

        this._removeEdge(edge);
        this._insertEdge(e);
        
        // need to add node for each edge
        this.nodes[e.destNodeIndex].suffixNode = suffix.sourceNodeIndex;
        edge.firstCharIndex += suffix.length + 1;
        edge.sourceNodeIndex = e.destNodeIndex;

        this._insertEdge(edge);

        return e.destNodeIndex;
    }

    /**
     * This canonizes the suffix, walking along its suffix string until it 
        is explicit or there are no more matched nodes
     * 
     * @param {any} suffix 
     * 
     * @memberOf SuffixTree
     */
    _canonizeSuffix(suffix){
        if(!suffix.explicit){
            let e = this.edges[`${suffix.sourceNodeIndex}-${this.string[suffix.firstCharIndex]}`];
            if(e.length <= suffix.length){
                suffix.firstCharIndex += e.length + 1;
                suffix.sourceNodeIndex = e.destNodeIndex;
                this._canonizeSuffix(suffix);
            }
        }
    }

    /**
     * Returns the index of substring in string or -1 if it
        is not found.
     * 
     * @param {any} substr 
     * 
     * @memberOf SuffixTree
     */
    find(substr){
        if(!substr) return -1;

        if(this.caseInsensitive) substr = substr.toLowerCase();

        let currentNode = 0;
        let i = 0;
        let ln = 0;
        let edge = null;

        while(i < substr.length){
            edge = this.edges[`${currentNode}-${substr[i]}`];

            if(!edge) return -1;

            ln = Math.min(edge.length + 1, substr.length - i);

            if(substr.substring(i, i + ln) !== this.string.substring(edge.firstCharIndex, edge.firstCharIndex + ln)) return -1;

            i += edge.length + 1;
            currentNode = edge.destNodeIndex;
        }

        return edge.firstCharIndex - substr.length + ln;
    }
}

let str = 'I need to be searched';
let tree = new SuffixTree(str);
console.log(tree.find('sear'));
console.log(tree + '');

let tree2 = new SuffixTree('mississippi');
console.log(tree2 + '');
console.log(tree2.find('pp'));

let tree3 = new SuffixTree('abcabxabcd');
console.log(tree3 + '');
