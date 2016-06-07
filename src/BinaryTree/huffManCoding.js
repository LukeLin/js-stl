/**
 * 赫夫曼（Huffman）树，又称最优树，是一类带权路径长度最短的树，有着广泛应用。
 *
 * 从树中一个结点到另一个结点之间的分支构成这两个结点之间的路径，路径上的分支数目称作路径长度。
 * 树的路径长度是从树根到每一个结点的路径之和。
 * 结点的带权路径长度为从该结点到树根之间的路径长度与结点上权的乘积。树的带权路径长度为树中所有叶子结点的带权路径长度之和。
 *
 * 构造赫夫曼树的步骤：
 * （1）根据给定的n个权值{w1,w2,...wn}构成n棵二叉树的集合F = {T1,T2,...Tn}，其中每棵二叉树Ti中只有一个带权为wi的根结点，其左右子树均空。
 * （2）在F中选取两棵根结点的权值最小的树作为左右子树构造一棵新的二叉树，且置新的二叉树的根结点的权值为其左右子树上根结点的权值之和。
 * （3）在F中删除这两棵树，同时将新得到的二叉树加入F中。
 * （4）重复（2）和（3），直到F只含一棵树为止。这棵树便是赫夫曼树。
 */
/*
赫夫曼编码
http://zh.wikipedia.org/wiki/%E9%9C%8D%E5%A4%AB%E6%9B%BC%E7%BC%96%E7%A0%81

假设电报需传送的电文为“A B A C C D A”，它只有4种字符只需两个字符串便可分辨。假设A,B,C,D的编码分别为00,01,10和11，则上述7个字符的电文便为“00010010101100”，对方接收时，可按二位一分进行译码。
在传送电文时，希望总长尽可能地短。如果对每个字符设计长度不等的编码，且让电文中出现次数较多的字符采用尽可能短的编码，则传送电文的总长便可减少。
如果涉及A,B,C,D的编码分别为0,00,1和01，则上述7个字符的电文可转换成总长为9的字符串“000011010”。但是，这样的电文无法翻译，因为可有多种译法。
因此，若要设计长短不等的编码，则必须是任意个字符的编码都不是另一个字符编码的前缀，这种编码称作前缀编码。
可利用二叉树来设计二进制的前缀编码。假设有一棵二叉树，其4个叶子结点分别表示A,B,C,D这4个字符，且约定左分支表示字符“0”，右分支表示字符“1”，则可以从根结点到叶子结点的路径上分支字符组成的字符串作为该叶子结点字符的编码。所得二进制前缀编码分别为0,10,110,111.
设计电文总长最短的二进制前缀编码即以n种字符出现的频率作权。
 */

// 赫夫曼树和赫夫曼编码的存储结构
function HuffmanNode(weight, parent, leftChild, rightChild) {
    this.weight = weight || 0;
    this.parent = parent || 0;
    this.leftChild = leftChild || 0;
    this.rightChild = rightChild || 0;
}
export function huffManCoding(weights) {
    let n = weights.length;
    if (n < 1) return;

    let huffmanTree = buildHuffmanTree(weights, n);

    // 从叶子到根逆向求每个字符的赫夫曼编码
    let hc = calcHuffmanCode(huffmanTree, n);

    return [huffmanTree, hc];
}


function calcHuffmanCode(huffmanTree, n) {
    // 从叶子到根逆向求每个字符的赫夫曼编码
    let hc = [];
    let cd = [];
    for (let i = 0; i < n; i++) {
        let start = n - 1;
        for (let c = i, f = huffmanTree[i].parent; f != 0; c = f, f = huffmanTree[f].parent) {
            if (huffmanTree[f].leftChild == c) cd[--start] = '0';
            else cd[--start] = '1';
        }

        hc[i] = strCopy(cd, start);
    }

    return hc;
}

// 创建一棵叶子结点数为n的Huffman树
function buildHuffmanTree(weights, n) {
    n = n || weights.length;
    let m = 2 * n - 1;
    let huffmanTree = [];

    // 初始化
    let i;
    for (i = 0; i < n; i++)
        huffmanTree[i] = new HuffmanNode(weights[i], 0, 0, 0);
    for (; i < m; i++)
        huffmanTree[i] = new HuffmanNode(0, 0, 0, 0);

    for (let i = n; i < m; i++) {
        // 在HT[1..i-1]选择parent为0且weight最小的两个结点，返回其序号为[s1, s2]
        let ret = select(huffmanTree, i);
        let s1 = ret[0];
        let s2 = ret[1];
        huffmanTree[s1].parent = i;
        huffmanTree[s2].parent = i;
        huffmanTree[i].leftChild = s1;
        huffmanTree[i].rightChild = s2;
        huffmanTree[i].weight = huffmanTree[s1].weight + huffmanTree[s2].weight;
    }

    return huffmanTree;
}

function strCopy(str, start) {
    let s = '';
    for (; str[start]; start++) {
        s += str[start];
    }
    return s;
}

function select(huffmanTree, len) {
    let ret = [];
    for (let i = 0; i < len; i++) {
        let node = huffmanTree[i];
        if (node.parent !== 0) continue;

        if (ret.length < 2) {
            ret.push(i);
        } else {
            let index = huffmanTree[ret[0]].weight > huffmanTree[ret[1]].weight
                ? 0 : 1;

            if (node.weight < huffmanTree[ret[index]].weight)
                ret[index] = i;
        }
    }

    if (ret[0] > ret[1]) {
        let temp = ret[0];
        ret[0] = ret[1];
        ret[1] = temp;
    }

    return ret;
}

console.log('-------huffman coding 1:------');
console.log(huffManCoding([5, 29, 7, 8, 14, 23, 3, 11]));