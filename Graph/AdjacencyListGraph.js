var Stack = require('../Stack/stack');
var Queue = require('../Queue/Queue').Queue;
var ChildSiblingTree = require('../Binary tree/BinaryTree').ChildSiblingTree;

// 图的数组（邻接矩阵）存储表示
var DG = 1;     // 有向图
var DN = 2;     // 有向网
var UDG = 3;    // 无向图
var UDN = 4;    // 无向网


/*
 邻接链表法

 基本思想：对图的每个顶点建立一个单链表，存储该顶点所有邻接顶点及其相关信息。每一个单链表设一个表头结点。

 第i个单链表表示依附于顶点Vi的边(对有向图是以顶点Vi为头或尾的弧)。

 1  结点结构与邻接链表示例

 链表中的结点称为表结点，每个结点由三个域组成。其中邻接点域(adjvex)指示与顶点Vi邻接的顶点在图中的位置(顶点编号)，链域(nextarc)指向下一个与顶点Vi邻接的表结点，数据域(info)存储和边或弧相关的信息，如权值等。对于无权图，如果没有与边相关的其他信息，可省略此域。

 每个链表设一个表头结点(称为顶点结点)，由两个域组成。链域(firstarc)指向链表中的第一个结点，数据域(data) 存储顶点名或其他信息。

 在图的邻接链表表示中，所有顶点结点用一个向量 以顺序结构形式存储，可以随机访问任意顶点的链表，该向量称为表头向量，向量的下标指示顶点的序号。

 用邻接链表存储图时，对无向图，其邻接链表是唯一的；对有向图，其邻接链表有两种形式。


 2  邻接表法的特点

 ◆ 表头向量中每个分量就是一个单链表的头结点，分量个数就是图中的顶点数目；
 ◆ 在边或弧稀疏的条件下，用邻接表表示比用邻接矩阵表示节省存储空间；
 ◆ 在无向图，顶点Vi的度是第i个链表的结点数；
 ◆ 对有向图可以建立正邻接表或逆邻接表。正邻接表是以顶点Vi为出度(即为弧的起点)而建立的邻接表；逆邻接表是以顶点Vi为入度(即为弧的终点)而建立的邻接表；
 ◆ 在有向图中，第i个链表中的结点数是顶点Vi的出 (或入)度；求入 (或出)度，须遍历整个邻接表；
 ◆ 在邻接表上容易找出任一顶点的第一个邻接点和下一个邻接点；

 */

/**
 *
 * @param {Number} adjVex
 * @param {ArcNode} nextArc
 * @param {*} info
 * @constructor
 */
function ArcNode(adjVex, nextArc, info) {
    // 该弧所指向的顶点的位置
    this.adjVex = adjVex || 0;
    // 指向下一条弧的指针
    this.nextArc = nextArc || null;
    // 该弧相关信息的指针
    this.info = info || null;
}

/**
 *
 * @param {*} data
 * @param {ArcNode} firstArc
 * @param {Number} indegree
 * @constructor
 */
function VexNode(data, firstArc, indegree) {
    // 顶点信息
    this.data = data;
    // 指向第一条依附该顶点的弧的指针
    this.firstArc = firstArc || null;
    //  顶点的度, 有向图是入度或出度或没有
    this.indegree = indegree || 0;
}

/**
 *
 * @param {Array | VexNode} vertices
 * @param {Number} vexnum
 * @param {Number} arcnum
 * @param {Number} kind
 * @constructor
 */
function AdjacencyListGraph(vertices, vexnum, arcnum, kind) {
    this.vertices = vertices || [];
    // 图的当前顶点数和弧数
    this.vexnum = vexnum || 0;
    this.arcnum = arcnum || 0;
    // 图的种类标志
    this.kind = kind || DG;
}
exports.AdjacencyListGraph = AdjacencyListGraph;
AdjacencyListGraph.prototype = {
    constructor: AdjacencyListGraph,

    // 查找顶点位置
    locateVex: function (vp) {
        for (var i = 0; i < this.vexnum; ++i) {
            if (this.vertices[i].data === vp) return i;
        }

        return -1;
    },

    // 添加顶点
    addVertex: function (vp) {
        if (this.locateVex(vp) !== -1) throw new Error('Vertex has existed!');

        this.vertices[this.vexnum++] = new VexNode(vp, null, 0);
        return this.vexnum;
    },

    /**
     * 添加弧
     * 如果是无向图或者无向网,arc1和arc2无顺序要求
     * 如果是有向图或者有向网，只会添加arc1，因此正邻接表和逆邻接表的顺序需要注意
     * @param {String} arc1
     * @param {String} arc2
     * @param {*} info
     * @returns {boolean}
     */
    addArc: function (arc1, arc2, info) {
        var k = this.locateVex(arc1);
        var j = this.locateVex(arc2);

        if (k === -1 || j === -1) throw new Error('Arc\'s Vertex do not existed!');

        // 边的起始表结点赋值
        var p = new ArcNode(k, null, info);
        // 边的末尾表结点赋值
        var q = new ArcNode(j, null, info);

        // 是无向图，用头插入法插入到两个单链表
        if (this.kind === UDG || this.kind === UDN) {
            q.nextArc = this.vertices[k].firstArc;
            this.vertices[k].firstArc = q;
            p.nextArc = this.vertices[j].firstArc;
            this.vertices[j].firstArc = p;
        }
        // 建立有向图的邻接链表，用头插入法
        else {
            p.nextArc = this.vertices[j].firstArc;
            this.vertices[j].firstArc = p;
        }

        ++this.arcnum;

        return true;
    },

    // TODO 其他图类型的创建暂时没弄
    createGraph: function () {
        this.vexnum = +prompt('vexnum: ');
        this.arcnum = +prompt('arcnum: ');
        // incInfo为0则各弧不含其他信息
        var incInfo = +prompt('incInfo: ');

        for (var m = 0; m < this.vexnum; ++m) {
            this.vertices[m] = new VexNode();
            this.vertices[m].data = prompt('vertex: ');
        }

        for (m = 0; m < this.arcnum; ++m) {
            var h = prompt('弧头: ');
            var t = prompt('弧尾: ');
            var i = this.locateVex(t);
            var j = this.locateVex(h);

            if (i < 0 || j < 0) {
                alert('顶点为找到，请重新输入！');
                m--;
                continue;
            }

            var p = new ArcNode(j, null, incInfo && prompt('info: '));

            if (!this.vertices[i].firstArc) this.vertices[i].firstArc = p;
            else {
                for (var q = this.vertices[i].firstArc; q.nextArc; q = q.nextArc);
                q.nextArc = p;
            }
        }
    },

    // 判断一个邻接表存储的有向图是否可传递
    isPass: function () {
        if (this.kind !== DG) throw new Error('graph kind should be DG');

        for (var x = 0; x < this.vexnum; ++x) {
            for (var p = this.vertices[x].firstArc; p; p = p.nextArc) {
                var y = p.adjVex;
                for (var q = this.vertices[y].firstArc; q; q = q.nextArc) {
                    var z = q.adjVex;
                    if (z !== x && this.isAdj(x, z)) return false;
                }
            }
        }

        return true;
    },

    // 判断有向图是否存在边(m,n)
    isAdj: function (m, n) {
        for (var p = this.vertices[m].firstArc; p; p = p.nextArc) {
            if (p.adjVex === n) return true;
        }
        return false;
    },

    /**
     * 深度优先判断<b>有向图<b>的顶点i到顶点j是否有路径，实则返回true，否则返回false
     * @param {String} i
     * @param {String} j
     */
    exist_path_DFS: function (i, j) {
        var visited = [];
        i = this.locateVex(i);
        j = this.locateVex(j);

        if (i < 0 || j < 0) throw new Error('vertex not found!');

        return exist_path(this, i, j);

        function exist_path(graph, i, j) {
            if (i === j) return true;

            visited[i] = true;
            for (var p = graph.vertices[i].firstArc; p; p = p.nextArc) {
                var k = p.adjVex;
                if (!visited[k] && exist_path(graph, k, j)) return true;
            }

            return false;
        }
    },

    /**
     * 广度优先判断<b>有向图<b>的顶点i到顶点j是否有路径，实则返回true，否则返回false
     * @param {String} i
     * @param {String} j
     */
    exist_path_BFS: function (i, j) {
        i = this.locateVex(i);
        j = this.locateVex(j);
        var visited = [];
        var queue = new Queue();
        queue.enQueue(i);

        while (queue.rear) {
            var u = queue.deQueue();
            visited[u] = 1;

            for (var p = this.vertices[i].firstArc; p; p = p.nextArc) {
                var k = p.adjVex;
                if (k === j) return true;
                if (!visited[k]) queue.enQueue(k);
            }
        }

        return false;
    },

    /**
     * 判断邻接表方式存储的有向图的顶点i到j是否存在长度为k的简单路径
     * @param {String} i
     * @param {String} j
     * @param {Number} k
     */
    exist_path_len: function (i, j, k) {
        i = this.locateVex(i);
        j = this.locateVex(j);
        var visited = [];

        return (function recurse(graph, i, j, k) {
            // 找到了一条路径，且长度符合
            if (i === j && k === 0) return true;
            else if (k > 0) {
                visited[i] = 1;
                for (var p = graph.vertices[i].firstArc; p; p = p.nextArc) {
                    var l = p.adjVex;
                    if (!visited[l]) {
                        // 剩余路径长度减一
                        if (recurse(graph, l, j, k - 1)) return true;
                    }
                }
                // 允许曾经被访问过的结点出现在另一条路径上
                visited[i] = 0;
            }

            return false;
        })(this, i, j, k);
    },

    /**
     * 求有向图中顶点u到v之间的所有简单路径，k为当前路径长度
     * @param {String} u
     * @param {String} v
     * @param {Number} k
     *
     * @example
     *  graph.find_all_path('v1', 'v2', 0);
     */
    find_all_path: function (u, v, k) {
        u = this.locateVex(u);
        v = this.locateVex(v);
        var path = [];
        var visited = [];

        findPath(this, u, v, k);

        function findPath(graph, u, v, k) {
            // 加入当前路径中
            path[k] = u;
            visited[u] = 1;

            // 找到一条简单路径
            if (u === v) {
                console.log('Found one path!');
                for (var i = 0; path[i]; ++i) console.log(path[i]);
            } else {
                for (var p = graph.vertices[u].firstArc; p; p = p.nextArc) {
                    var l = p.adjVex;
                    // 继续寻找
                    if (!visited[l]) findPath(graph, l, v, k + 1);
                }
            }

            visited[u] = 0;
            // 回溯
            path[k] = 0;
        }
    },

    /**
     * 求有向图的顶点之间长度为len的简单路径条数
     * @param {String} i
     * @param {String} j
     * @param {Number} len
     */
    getPathNum_len: function (i, j, len) {
        var visited = [];

        return (function recurse(graph, i, j, len) {
            if (i === j && len === 0) return 1;
            else if (len > 0) {
                var sum = 0;
                visited[i] = 1;
                for (var p = graph.vertices[i].firstArc; p; p = p.nextArc) {
                    var l = p.adjVex;
                    if (!visited[l]) sum += recurse(l, j, len - 1);
                }
                visited[i] = 0;
                return sum;
            }
        })(this, i, j, len);
    },

    /**
     * 求有向无环图的根
     */
    getRoot: function(){
        var visited = [];

        for(var i = 0; i < this.vexnum; ++i) {
            // 每次都要将访问数组清零
            for (var w = 0; w < this.vexnum; ++w) visited[w] = false;
            // 从顶点i出发进行深度优先遍历
            dfs(this, i);

            var flag = true;
            for(w = 0; w < this.vexnum; ++w){
                // 如果i是根，则深度优先遍历可以访问到所有结点
                if(!visited[w]) flag = false;
            }

            if(flag) console.log('Found a root vertex: %d', i);
        }

        function dfs(graph, v){
            visited[v] = true;

            for(var p = graph.vertices[v].firstArc; p; p = p.nextArc){
                var w = p.adjVex;
                if(!visited[w]) dfs(graph, w);
            }
        }
    },

    /**
     * 求一个有向无环图中最长的路径
     */
    getLongestPath: function(){
        var mlp = [];
        var path = [];
        var visited = [];
        var maxLen = 0;

        this.countIndegree();

        for(var i = 0; i < this.vexnum; ++i) {
            for (var j = 0; j < this.vexnum; ++j) visited[j] = false;
            // 从每一个零入度结点开始深度优先遍历
            if (this.vertices[i].indegree === 0) dfs(this, i, 0);
        }

        console.log('Longest Path:');
        // 输出最长路径
        for(i = 0; mlp[i]; ++i) console.log(mlp.join(','));

        function dfs(graph, i, len){
            visited[i] = true;
            path[len] = i;

            // 新的最长路径
            if(len > maxLen && !graph.vertices[i].firstArc) {
                // 保存下来
                for(var j = 0; j <= len; ++j) mlp[j] = path[j];
                maxLen = len;
            } else {
                for(var p = graph.vertices[i].firstArc; p; p = p.nextArc){
                    var w = p.adjVex;
                    if(!visited[w]) dfs(graph, w, len + 1);
                }
            }

            path[i] = 0;
            visited[i] = false;
        }
    }
};


// 无向图的邻接表
var adjListGraph = new AdjacencyListGraph([], 0, 0, UDG);
adjListGraph.addVertex('v1');
adjListGraph.addVertex('v2');
adjListGraph.addVertex('v3');
adjListGraph.addVertex('v4');
adjListGraph.addVertex('v5');

adjListGraph.addArc('v1', 'v2');
adjListGraph.addArc('v1', 'v3');
adjListGraph.addArc('v1', 'v4');
adjListGraph.addArc('v2', 'v3');
adjListGraph.addArc('v3', 'v4');
adjListGraph.addArc('v3', 'v5');
adjListGraph.addArc('v4', 'v5');

console.log(adjListGraph);

// 有向图的逆邻接表
var g = new AdjacencyListGraph([], 0, 0, DG);
g.addVertex('v1');
g.addVertex('v2');
g.addVertex('v3');
g.addVertex('v4');
g.addVertex('v5');

g.addArc('v1', 'v2');
g.addArc('v1', 'v4');
g.addArc('v3', 'v2');
g.addArc('v3', 'v1');
g.addArc('v4', 'v3');
g.addArc('v3', 'v5');
g.addArc('v5', 'v4');

console.log(g);

// 有向图的正邻接表
var g = new AdjacencyListGraph([], 0, 0, DG);
g.addVertex('v1');
g.addVertex('v2');
g.addVertex('v3');
g.addVertex('v4');
g.addVertex('v5');

g.addArc('v2', 'v1');
g.addArc('v4', 'v1');
g.addArc('v2', 'v3');
g.addArc('v1', 'v3');
g.addArc('v3', 'v4');
g.addArc('v5', 'v3');
g.addArc('v4', 'v5');

console.log(g);


// 邻接表的递归式深度优先遍历
AdjacencyListGraph.prototype.DFSTraverse = function (visitFn) {
    var visited = [];
    for (var i = 0; i < this.vexnum; ++i) visited[i] = false;

    for (i = 0; i < this.vexnum; ++i) {
        if (!visited[i]) dfs(this, i);
    }

    function dfs(graph, v) {
        visited[v] = true;
        visitFn.call(graph, v);

        var p = graph.vertices[v].firstArc;
        while (p) {
            if (!visited[p.adjVex]) dfs(graph, p.adjVex);

            p = p.nextArc;
        }
    }
};

console.log('adjListGraph DFSTraverse: ');
var adjListGraph = new AdjacencyListGraph([], 0, 0, UDG);
adjListGraph.addVertex('v1');
adjListGraph.addVertex('v2');
adjListGraph.addVertex('v3');
adjListGraph.addVertex('v4');
adjListGraph.addVertex('v5');

adjListGraph.addArc('v5', 'v4');
adjListGraph.addArc('v3', 'v2');
adjListGraph.addArc('v2', 'v1');
adjListGraph.addArc('v3', 'v1');

adjListGraph.DFSTraverse(function (v) {
    console.log(this.vertices[v].data);
});

// 邻接表的非递归深度优先搜索
AdjacencyListGraph.prototype.DFSTraverse_NonRecurse = function (visitFn) {
    var visited = [];
    var stack = new Stack();
    for (var i = 0; i < this.vexnum; ++i) visited[i] = false;

    for (i = 0; i < this.vexnum; ++i) {
        if (!visited[i]) {
            stack.push(i);
            visited[i] = true;
            visitFn.call(this, i);

            var v;
            while ((v = stack.peek()) != null) {
                var p = this.vertices[v].firstArc;
                while (p) {
                    if (!visited[p.adjVex]) {
                        visited[p.adjVex] = true;
                        visitFn.call(this, p.adjVex);
                        stack.push(p.adjVex);
                    } else stack.pop();

                    p = p.nextArc;
                }
            }
        }

    }
};

console.log('adjListGraph DFSTraverse_NonRecurse: ');
adjListGraph.DFSTraverse_NonRecurse(function (v) {
    console.log(this.vertices[v].data);
});

// 邻接表的广度优先搜索
AdjacencyListGraph.prototype.BFSTraverse = function (visitFn) {
    var queue = new Queue();
    var visited = [];
    for (var i = 0; i < this.vexnum; ++i) visited[i] = false;

    for (i = 0; i < this.vexnum; ++i) {
        if (!visited[i]) {
            queue.enQueue(i);
            visited[i] = true;
            visitFn.call(this, i);

            while (queue.rear) {
                var w = queue.deQueue();
                var p = this.vertices[w].firstArc;
                while (p) {
                    if (!visited[p.adjVex]) {
                        visited[p.adjVex] = true;
                        visitFn.call(this, p.adjVex);
                        queue.enQueue(p.adjVex);
                    }

                    p = p.nextArc;
                }
            }
        }
    }
};

console.log('adjListGraph BFSTraverse: ');
var g2 = new AdjacencyListGraph([], 0, 0, DG);
g2.addVertex('v1');
g2.addVertex('v2');
g2.addVertex('v3');
g2.addVertex('v4');
g2.addVertex('v5');

g2.addArc('v4', 'v1');
g2.addArc('v2', 'v1');
g2.addArc('v5', 'v3');
g2.addArc('v2', 'v3');
g2.addArc('v1', 'v3');
g2.addArc('v3', 'v4');
g2.addArc('v4', 'v5');

g2.BFSTraverse(function (v) {
    console.log(this.vertices[v].data);
});

console.log('DFS: expect false: ' + adjListGraph.exist_path_DFS('v1', 'v4'));
console.log('DFS: expect true: ' + adjListGraph.exist_path_DFS('v1', 'v2'));

console.log('BFS : expect false: ' + adjListGraph.exist_path_BFS('v1', 'v4'));
console.log('BFS :expect true: ' + adjListGraph.exist_path_BFS('v1', 'v2'));



/*
 图的连通性问题

 无向图的连通分量与生成树

 1 无向图的连通分量和生成树
 对于无向图，对其进行遍历时：
 ◆ 若是连通图：仅需从图中任一顶点出发，就能访问图中的所有顶点；
 ◆ 若是非连通图：需从图中多个顶点出发。每次从一个新顶点出发所访问的顶点集序列恰好是各个连通分量的顶点集；

 ⑴ 若G=(V,E)是无向连通图， 顶点集和边集分别是V(G) ，E(G) 。若从G中任意点出发遍历时， E(G)被分成两个互不相交的集合：
 T(G) ：遍历过程中所经过的边的集合；
 B(G) ：遍历过程中未经过的边的集合；
 显然： E(G)=T(G)∪B(G) ，T(G)∩B(G)=Ø
 显然，图G’=(V, T(G))是G的极小连通子图，且G’是一棵树。G’称为图G的一棵生成树。
 从任意点出发按DFS算法得到生成树G’称为深度优先生成树；按BFS算法得到的G’称为广度优先生成树。

 ⑵  若G=(V,E)是无向非连通图，对图进行遍历时得到若干个连通分量的顶点集：V1(G) ,V2(G) ,…,Vn(G)和相应所经过的边集：T1(G) ,T2(G) , …,Tn(G) 。
 则对应的顶点集和边集的二元组：Gi=(Vi(G),Ti(G))
 (1≦i≦n)是对应分量的生成树，所有这些生成树构成了原来非连通图的生成森林。

 说明：当给定无向图要求画出其对应的生成树或生成森林时，必须先给出相应的邻接表，然后才能根据邻接表画出其对应的生成树或生成森林。


 2  图的生成树和生成森林算法

 对图的深度优先搜索遍历DFS(或BFS)算法稍作修改，就可得到构造图的DFS生成树算法。
 在算法中，树的存储结构采用孩子—兄弟表示法。首先建立从某个顶点V出发，建立一个树结点，然后再分别以V的邻接点为起始点，建立相应的子生成树，并将其作为V 结点的子树链接到V结点上。显然，算法是一个递归算法。

 */


// 建立无向图的深度优先生成森林的孩子兄弟链表树
AdjacencyListGraph.prototype.createDFSForest = function () {
    var tree = null;
    var visited = [];
    for (var i = 0; i < this.vexnum; ++i) visited[i] = false;

    var q;
    for (i = 0; i < this.vexnum; ++i) {
        if (!visited[i]) {
            // 新的生成树的根结点
            var p = new ChildSiblingTree(this.vertices[i].data);

            // 第一棵生成树的根
            if (!tree) tree = p;
            // 其它生成树的根
            else q.nextSibling = p;

            // q为当前生成树的根
            q = p;
            // 建立以p为根的生成树
            DFSTree(this, i, p);
        }
    }

    return tree;

    // 以第v个顶点触发深度优先遍历图，建立以tree为根的生成树
    function DFSTree(graph, v, tree) {
        visited[v] = true;
        var first = true;
        var w = graph.vertices[v].firstArc;
        var q;

        while (w) {
            if (!visited[w.adjVex]) {
                visited[w.adjVex] = true;
                var p = new ChildSiblingTree(graph.vertices[w.adjVex].data);

                // w是v的第一个未被访问的邻接结点
                if (first) {
                    tree.firstChild = p;
                    first = false;
                }
                // w是v的其它未被访问的邻接顶点
                else q.nextSibling = p;

                q = p;

                DFSTree(graph, w.adjVex, q);
            }

            w = w.nextArc;
        }
    }
};

console.log(adjListGraph.createDFSForest());


AdjacencyListGraph.prototype.createBFSForest = function () {
    var tree = null;
    var visited = [];
    var queue = new Queue();
    for (var i = 0; i < this.vexnum; ++i) visited[i] = false;

    var q;
    for (i = 0; i < this.vexnum; ++i) {
        if (!visited[i]) {
            visited[i] = true;
            queue.enQueue(i);

            var node = new ChildSiblingTree(this.vertices[i].data);
            if (!tree) tree = node;
            else q.nextSibling = node;

            q = node;

            while (queue.rear) {
                var w = queue.deQueue();
                var p = this.vertices[w].firstArc;
                var first = true;

                while (p) {
                    if (!visited[p.adjVex]) {
                        visited[p.adjVex] = true;
                        queue.enQueue(p.adjVex);

                        var node2 = new ChildSiblingTree(this.vertices[p.adjVex].data);
                        var pre;
                        if (first) {
                            node.firstChild = node2;
                            first = false;
                        }
                        else pre.nextSibling = node2;

                        pre = node2;
                    }
                    p = p.nextArc;
                }
            }
        }
    }

    return tree;
};

console.log(adjListGraph.createBFSForest());



/*
 在某图中，若删除顶点V以及V相关的边后，图的一个连通分量分割为两个或两个以上的连通分量，则称顶点V为该图的一个关节点。一个没有关节点的连通图称为重连通图。
 在重连通图中，任意一对顶点之间至少存在两条路径，则再删去某个顶点即相关各边后也不破坏图的连通性。若在图的连通图上删去k个节点才能破坏图的连通性，则称K为此图的连通度。
 他们常常在通信网络的图或航空网中应用，K越大，系统越稳定，反之，战争中若要摧毁敌方的运输线，只须破坏其运输网中的关节点即可。
 */

AdjacencyListGraph.prototype.findArticul = function () {
    var visited = [];
    var count = 1;
    var low = [];
    low[0] = count;
    visited[0] = 1;
    for (var i = 1; i < this.vexnum; ++i) visited[i] = 0;
    var p = this.vertices[0].firstArc;
    var v = p.adjVex;

    DFSArticul(this, v);
    if (count < this.vexnum) {
        console.log(0 + '  ' + this.vertices[0].data);
        while (p.nextArc) {
            p = p.nextArc;
            v = p.adjVex;
            if (visited[v] === 0) DFSArticul(this, v);
        }
    }

    function DFSArticul(graph, v0) {
        var min = visited[v0] = ++count;
        for (var p = graph.vertices[v0].firstArc; p; p = p.nextArc) {
            var w = p.adjVex;
            if (visited[w] === 0) {
                DFSArticul(graph, w);
                if (low[w] < min) min = low[w];
                if (low[w] >= visited[v0]) console.log(v0 + '  ' + graph.vertices[v0].data);
            } else if (visited[w] < min) min = visited[w];
        }
        low[v0] = min;
    }
};

var articulTest = new AdjacencyListGraph([], 0, 0, UDG);
articulTest.addVertex('A');
articulTest.addVertex('B');
articulTest.addVertex('C');
articulTest.addVertex('D');
articulTest.addVertex('E');
articulTest.addVertex('F');
articulTest.addVertex('G');
articulTest.addVertex('H');
articulTest.addVertex('I');
articulTest.addVertex('J');
articulTest.addVertex('K');
articulTest.addVertex('L');
articulTest.addVertex('M');

articulTest.addArc('A', 'B');
articulTest.addArc('A', 'C');
articulTest.addArc('A', 'F');
articulTest.addArc('A', 'L');
articulTest.addArc('C', 'B');
articulTest.addArc('D', 'B');
articulTest.addArc('G', 'B');
articulTest.addArc('H', 'B');
articulTest.addArc('M', 'B');
articulTest.addArc('D', 'E');
articulTest.addArc('G', 'H');
articulTest.addArc('G', 'I');
articulTest.addArc('G', 'K');
articulTest.addArc('H', 'K');
articulTest.addArc('J', 'L');
articulTest.addArc('J', 'M');
articulTest.addArc('L', 'M');

articulTest.findArticul();


/*
 有向无环图及其应用

 有向无环图(Directed Acycling Graph)：是图中没有回路(环)的有向图。是一类具有代表性的图，主要用于研究工程项目的工序问题、工程时间进度问题等。

 一个工程(project)都可分为若干个称为活动(active)的子工程(或工序)，各个子工程受到一定的条件约束：某个子工程必须开始于另一个子工程完成之后；整个工程有一个开始点(起点)和一个终点。人们关心：
 ◆ 工程能否顺利完成?影响工程的关键活动是什么?
 ◆ 估算整个工程完成所必须的最短时间是多少?

 对工程的活动加以抽象：图中顶点表示活动，有向边表示活动之间的优先关系，这样的有向图称为顶点表示活动的网(Activity On Vertex Network ，AOV网) 。


 拓扑排序

 1 定义
 拓扑排序(Topological Sort) ：由某个集合上的一个偏序得到该集合上的一个全序的操作。

 ◆ 集合上的关系：集合A上的关系是从A到A的关系(AA) 。
 ◆ 关系的自反性：若a∈A有(a，a)∈R，称集合A上的关系R是自反的。
 ◆ 关系的对称性：如果对于a，b∈A ，只要有(a，b)∈R就有(b，a)∈R ，称集合A上的关系R是对称的。
 ◆ 关系的对称性与反对称性：如果对于a，b∈A ，只要有(a，b)∈R就有(b，a)∈R ，称集合A上的关系R是对称的。如果对于a，b∈A ，仅当a=b时有(a，b)∈R和(b，a)∈R ，称集合A上的关系R是反对称的。
 ◆ 关系的传递性：若a，b，c∈A，若(a，b)∈R，并且(b，c)∈R ，则(a，c)∈R ，称集合A上的关系R是传递的。
 ◆ 偏序：若集合A上的关系R是自反的，反对称的和传递的，则称R是集合A上的偏序关系。
 ◆ 全序：设R是集合A上的偏序关系，a，b∈A，必有aRb或bRa， 则称R是集合A上的全序关系。

 即偏序是指集合中仅有部分元素之间可以比较，而全序是指集合中任意两个元素之间都可以比较。
 在AOV网中，若有有向边<i, j>，则i是j的直接前驱，j是i的直接后继；推而广之，若从顶点i到顶点j有有向路径，则i是j的前驱，j是i的后继。
 在AOV网中，不能有环，否则，某项活动能否进行是以自身的完成作为前提条件。
 检查方法：对有向图的顶点进行拓扑排序，若所有顶点都在其拓扑有序序列中，则无环。
 有向图的拓扑排序：构造AOV网中顶点的一个拓扑线性序列(v’1,v’2, ⋯,v’n)，使得该线性序列不仅保持原来有向图中顶点之间的优先关系，而且对原图中没有优先关系的顶点之间也建立一种(人为的)优先关系。

 2 拓扑排序算法
 算法思想

 ① 在AOV网中选择一个没有前驱的顶点且输出；
 ② 在AOV网中删除该顶点以及从该顶点出发的(以该顶点为尾的弧)所有有向弧(边) ；
 ③ 重复①、②，直到图中全部顶点都已输出(图中无环)或图中不存在无前驱的顶点(图中必有环)。

 3  算法实现说明
 ◆ 采用正邻接链作为AOV网的存储结构；
 ◆ 设立堆栈，用来暂存入度为0的顶点；
 ◆ 删除顶点以它为尾的弧：弧头顶点的入度减1。

 整个算法的时间复杂度是O(n+e) 。

 */

// 统计各顶点入度的函数
AdjacencyListGraph.prototype.countIndegree = function () {
    for (var k = 0; k < this.vexnum; ++k) this.vertices[k].indegree = 0;

    for (k = 0; k < this.vexnum; ++k) {
        for (var p = this.vertices[k].firstArc; p; p = p.nextArc)
            ++this.vertices[p.adjVex].indegree;
    }
};

// 拓扑排序算法
AdjacencyListGraph.prototype.topologicSort = function () {
    var stack = new Stack();
    this.topologicalOrder = [];
    this.countIndegree();

    for (var i = 0; i < this.vexnum; ++i) {
        if (this.vertices[i].indegree === 0) stack.push(i);
    }

    var count = 0;
    while (stack.top) {
        i = stack.pop();
        this.topologicalOrder.push(i);
        console.log(this.vertices[i].data);
        ++count;
        for (var p = this.vertices[i].firstArc; p; p = p.nextArc) {
            var k = p.adjVex;
            if (--this.vertices[k].indegree === 0) stack.push(k);
        }
    }

    return (count >= this.vexnum);
};

var topologicTest = new AdjacencyListGraph([], 0, 0, DG);
topologicTest.addVertex('v1');
topologicTest.addVertex('v2');
topologicTest.addVertex('v3');
topologicTest.addVertex('v4');
topologicTest.addVertex('v5');
topologicTest.addVertex('v6');

topologicTest.addArc('v2', 'v1');
topologicTest.addArc('v4', 'v1');
topologicTest.addArc('v3', 'v1');
topologicTest.addArc('v2', 'v3');
topologicTest.addArc('v5', 'v3');
topologicTest.addArc('v4', 'v6');
topologicTest.addArc('v5', 'v4');
topologicTest.addArc('v5', 'v6');

console.log('topologicSort: ');
console.log(topologicTest.topologicSort());



/*
 关键路径(Critical Path)

 与AOV网相对应的是AOE(Activity On Edge) ，是边表示活动的有向无环图，如图7-24所示。图中顶点表示事件(Event)，每个事件表示在其前的所有活动已经完成，其后的活动可以开始；弧表示活动，弧上的权值表示相应活动所需的时间或费用。

 1 与AOE有关的研究问题
 ◆ 完成整个工程至少需要多少时间?
 ◆ 哪些活动是影响工程进度(费用)的关键?
 工程完成最短时间：从起点到终点的最长路径长度(路径上各活动持续时间之和) 。长度最长的路径称为关键路径，关键路径上的活动称为关键活动。关键活动是影响整个工程的关键。
 设v0是起点，从v0到vi的最长路径长度称为事件vi的最早发生时间，即是以vi为尾的所有活动的最早发生时间。
 若活动ai是弧<j, k>，持续时间是dut(<j, k>)，设：
 ◆ e(i)：表示活动ai的最早开始时间；
 ◆ l(i)：在不影响进度的前提下，表示活动ai的最晚开始时间； 则l(i)-e(i)表示活动ai的时间余量，若l(i)-e(i)=0，表示活动ai是关键活动。
 ◆ ve(i)：表示事件vi的最早发生时间，即从起点到顶点vi的最长路径长度；
 ◆ vl(i)：表示事件vi的最晚发生时间。则有以下关系：
 e(i)=ve(j)
 l(i)= vl(k)-dut(<j, k>)
 0    j=0，表示vj是起点
 ve(j)=
 Max{ve(i)+dut(<i, j>)|<vi, vj>是网中的弧}

 含义是：源点事件的最早发生时间设为0；除源点外，只有进入顶点vj的所有弧所代表的活动全部结束后，事件vj才能发生。即只有vj的所有前驱事件vi的最早发生时间ve(i)计算出来后，才能计算ve(j) 。
 方法是：对所有事件进行拓扑排序，然后依次按拓扑顺序计算每个事件的最早发生时间。
 ve(n-1)    j=n-1，表示vj是终点
 vl(j)=
 Min{vl(k)-dut(<j, k>)|<vj, vk>是网中的弧}
 含义是：只有vj的所有后继事件vk的最晚发生时间vl(k)计算出来后，才能计算vl(j) 。
 方法是：按拓扑排序的逆顺序，依次计算每个事件的最晚发生时间。


 2 求AOE中关键路径和关键活动
 ⑴ 算法思想
 ① 利用拓扑排序求出AOE网的一个拓扑序列；
 ②  从拓扑排序的序列的第一个顶点(源点)开始，按拓扑顺序依次计算每个事件的最早发生时间ve(i) ；
 ③  从拓扑排序的序列的最后一个顶点(汇点)开始，按逆拓扑顺序依次计算每个事件的最晚发生时间vl(i) ；

 设AOE网有n个事件，e个活动，则算法的主要执行是：
 ◆ 进行拓扑排序：时间复杂度是O(n+e) ；
 ◆ 求每个事件的ve值和vl值：时间复杂度是O(n+e) ；
 ◆ 根据ve值和vl值找关键活动：时间复杂度是O(n+e) ；
 因此，整个算法的时间复杂度是O(n+e) 。

 */

// 输出有向图的各项关键活动
AdjacencyListGraph.prototype.criticalPath = function () {
    if (!this.topologicSort()) throw new Error('AOE网中存在回路！');

    var ve = [];
    // 事件最早发生时间初始化
    for (var j = 0; j < this.vexnum; ++j) ve[j] = 0;
    // 计算每个事件的最早发生时间ve值
    for (var m = 0; m < this.vexnum; ++m) {
        j = this.topologicalOrder[m];
        for (var p = this.vertices[j].firstArc; p; p = p.nextArc) {
            var k = p.adjVex;
            if (ve[j] + p.info > ve[k]) ve[k] = ve[j] + p.info;
        }
    }
    var vl = [];
    // 事件最晚发生时间初始化
    for (j = 0; j < this.vexnum; ++j) vl[j] = ve[this.vexnum - 1];
    // 计算每个事件的最晚发生时间vl的值
    for (m = this.vexnum - 1; m >= 0; --m) {
        j = this.topologicalOrder[m];
        for (p = this.vertices[j].firstArc; p; p = p.nextArc) {
            k = p.adjVex;
            if (vl[k] - p.info < vl[j]) vl[j] = vl[k] - p.info;
        }
    }
    // 输出所有关键活动
    for (m = 0; m < this.vexnum; ++m) {
        for (p = this.vertices[m].firstArc; p; p = p.nextArc) {
            k = p.adjVex;
            if (ve[m] + p.info === vl[k]) console.log('<%d, %d>', m, k);
        }
    }
};

var criticalPathTest = new AdjacencyListGraph([], 0, 0, DG);
criticalPathTest.addVertex('v0');
criticalPathTest.addVertex('v1');
criticalPathTest.addVertex('v2');
criticalPathTest.addVertex('v3');
criticalPathTest.addVertex('v4');
criticalPathTest.addVertex('v5');
criticalPathTest.addVertex('v6');
criticalPathTest.addVertex('v7');
criticalPathTest.addVertex('v8');

criticalPathTest.addArc('v1', 'v0', 3);
criticalPathTest.addArc('v2', 'v0', 10);
criticalPathTest.addArc('v4', 'v1', 13);
criticalPathTest.addArc('v4', 'v2', 12);
criticalPathTest.addArc('v3', 'v1', 9);
criticalPathTest.addArc('v5', 'v2', 7);
criticalPathTest.addArc('v7', 'v4', 6);
criticalPathTest.addArc('v7', 'v3', 4);
criticalPathTest.addArc('v7', 'v5', 11);
criticalPathTest.addArc('v6', 'v3', 8);
criticalPathTest.addArc('v8', 'v7', 5);
criticalPathTest.addArc('v8', 'v6', 2);

criticalPathTest.criticalPath();



AdjacencyListGraph.prototype.shortestPath_Dijkstra = function (v0) {
    var dist = [];
    var pre = [];
    var final = [];
    var w;

    for (var v = 0; v < this.vexnum; ++v)
        dist[v] = Infinity;
    for (var p = this.vertices[v0].firstArc; p; p = p.nextArc)
        dist[p.adjVex] = p.info;

    for (v = 0; v < this.vexnum; ++v) {
        final[v] = false;
        pre[v] = pre[v] || [];
        for (w = 0; w < this.vexnum; ++w) pre[v][w] = false;

        if (dist[v] < Infinity) {
            pre[v][v0] = true;
            pre[v][v] = true;
        }
    }

    dist[v0] = 0;
    final[v0] = true;

    for (var i = 1; i < this.vexnum; ++i) {
        var min = Infinity;
        for (w = 0; w < this.vexnum; ++w) {
            if (!final[w] && dist[w] < min) {
                v = w;
                min = dist[w];
            }
        }

        final[v] = true;

        for (p = this.vertices[v].firstArc; p; p = p.nextArc) {
            w = p.adjVex;
            if (!final[w] && min + p.info < dist[w]) {
                dist[w] = min + p.info;
                pre[w] = pre[v];
                pre[w][w] = true;
            }
        }
    }

    console.log(final);
    console.log(pre);
    console.log(dist);

    return {
        final: final,
        pre: pre,
        dist: dist
    };
};

var dijTest = new AdjacencyListGraph([], [], 0, 0, DN);

dijTest.addVertex('0');
dijTest.addVertex('1');
dijTest.addVertex('2');
dijTest.addVertex('3');
dijTest.addVertex('4');
dijTest.addVertex('5');

dijTest.addArc('1', '0', 20);
dijTest.addArc('4', '0', 10);
dijTest.addArc('2', '0', 60);
dijTest.addArc('5', '0', 65);
dijTest.addArc('2', '1', 30);
dijTest.addArc('3', '2', 40);
dijTest.addArc('2', '5', 15);
dijTest.addArc('5', '4', 20);
dijTest.addArc('4', '3', 35);
dijTest.addArc('3', '1', 70);

dijTest.shortestPath_Dijkstra(0);


(function(){
    /**
     * 输出有向无环图形式表示的逆波兰式
     */
    function niBoLan_DAG(graph){
        graph.countIndegree();
        for(var i = 0; i < graph.vexnum; ++i){
            // 找到有向无环图的根
            if(graph.vertices[i].indegree === 0) {
                printNiBoLan(graph, i);
                break;
            }
        }

        return false;
    }

    function printNiBoLan(graph, i){
        var c = graph.vertices[i].data;
        var p = graph.vertices[i].firstArc;

        // 子表达式
        if(p) {
            printNiBoLan(graph, p.adjVex);
            printNiBoLan(graph, p.nextArc.adjVex);
        }

        console.log(c + '');
    }

    /**
     * 给有向无环图表示的表达式求值
     */
    function evaluate_DAG(graph){
        graph.countIndegree();
        for(var i = 0; i < graph.vexnum; ++i){
            if(!graph.vertices[i].indegree) return evaluate_imp(graph, i);
        }
    }

    function evaluate_imp(g, i){
        if(/^\d+$/.test(g.vertices[i].data)) return g.vertices[i].data;
        else {
            var p = g.vertices[i].firstArc;
            var v1 = evaluate_imp(g, p.adjVex);
            var v2 = evaluate_imp(g, p.nextArc.adjVex);
            return calculate(v1, g.vertices[i].data, v2);
        }
    }

    function calculate(a, operation, b){
        // 偷一下懒..
        return eval(a + operation + b);
    }

    // ((1 + 2) * (2 * (3 + 4)) + (3 + 4) * 5) * ((3 + 4) * 5)
    var dag = new AdjacencyListGraph([], 0, 0, DG);

    var a1 = new String('*');
    var a2 = new String('+');
    var a3 = new String('*');
    var a4 = new String('*');
    var a5 = new String('+');
    var a6 = new String('*');
    var a7 = new String('+');

    // 12
    dag.addVertex(a1);
    dag.addVertex(a2);
    dag.addVertex(a3);
    dag.addVertex(a4);
    dag.addVertex(a5);
    dag.addVertex(a6);
    dag.addVertex(a7);
    dag.addVertex(1);
    dag.addVertex(2);
    dag.addVertex(3);
    dag.addVertex(4);
    dag.addVertex(5);

    // 14
    dag.addArc(a2, a1);
    dag.addArc(a4, a1);
    dag.addArc(a3, a2);
    dag.addArc(a4, a2);
    dag.addArc(a5, a3);
    dag.addArc(a6, a3);
    dag.addArc(a7, a6);
    dag.addArc(a7, a4);
    dag.addArc(5, a4);
    dag.addArc(1, a5);
    dag.addArc(2, a5);
    dag.addArc(2, a6);
    dag.addArc(3, a7);
    dag.addArc(4, a7);

    console.log('niBoLan_DAG: ');
    niBoLan_DAG(dag);
    console.log('evaluate_DAG: ' + evaluate_DAG(dag));  // 2695
})();