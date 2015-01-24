/* create by Luke */
/**
 * 图(Graph)
 *
 * 图(Graph)是一种比线性表和树更为复杂的数据结构。
 *
 * 线性结构：是研究数据元素之间的一对一关系。在这种结构中，除第一个和最后一个元素外，任何一个元素都有唯一的一个直接前驱和直接后继。
 *
 * 树结构：是研究数据元素之间的一对多的关系。在这种结构中，每个元素对下(层)可以有0个或多个元素相联系，对上(层)只有唯一的一个元素相关，数据元素之间有明显的层次关系。
 *
 * 图结构：是研究数据元素之间的多对多的关系。在这种结构中，任意两个元素之间可能存在关系。即结点之间的关系可以是任意的，图中任意元素之间都可能相关。
 *
 * 图的应用极为广泛，已渗入到诸如语言学、逻辑学、物理、化学、电讯、计算机科学以及数学的其它分支。
 *
 * 图的基本概念
 *
 * 一个图(G)定义为一个偶对(V,E) ，记为G=(V,E) 。其中： V是顶点(Vertex)的非空有限集合，记为V(G)；E是无序集V&V的一个子集，记为E(G) ，其元素是图的弧(Arc)。
 * 将顶点集合为空的图称为空图。其形式化定义为：
 G=(V ，E)
 V={v|v∈data object}
 E={<v,w>| v,w∈V∧p(v,w)}
 P(v,w)表示从顶点v到顶点w有一条直接通路。
 *
 * 弧(Arc) ：表示两个顶点v和w之间存在一个关系，用顶点偶对<v,w>表示。通常根据图的顶点偶对将图分为有向图和无向图。
 * 有向图(Digraph)： 若图G的关系集合E(G)中，顶点偶对<v,w>的v和w之间是有序的，称图G是有向图。
 *   在有向图中，若 <v,w>∈E(G) ，表示从顶点v到顶点w有一条弧。 其中：v称为弧尾(tail)或始点(initial node)，w称为弧头(head)或终点(terminal node) 。
 * 无向图(Undigraph)： 若图G的关系集合E(G)中，顶点偶对<v,w>的v和w之间是无序的，称图G是无向图。
 *   在无向图中，若<v,w>∈E(G) ，有<w,v>∈E(G) ，即E(G)是对称，则用无序对(v,w) 表示v和w之间的一条边(Edge)，因此(v,w) 和(w,v)代表的是同一条边。
 *
 * 例1：设有有向图G1和无向图G2，形式化定义分别是：
 G1=(V1 ，E1)
 V1={a,b,c,d,e}
 E1={<a,b>,<a,c>, <a,e>,<c,d>,<c,e> ,<d,a>,<d,b>,<e,d>}
 G2=(V2 ，E2)
 V2={a,b,c,d}
 E2={(a,b), (a,c), (a,d), (b,d), (b,c), (c,d)}
 *
 * 完全无向图：对于无向图，若图中顶点数为n ，用e表示边的数目，则e ∈[0，n(n-1)/2] 。具有n(n-1)/2条边的无向图称为完全无向图。
 完全无向图另外的定义是：
 * 对于无向图G=(V，E)，若vi，vj ∈V ，当vi≠vj时，有(vi ,vj)∈E，即图中任意两个不同的顶点间都有一条无向边，这样的无向图称为完全无向图。
 *
 * 完全有向图：对于有向图，若图中顶点数为n ，用e表示弧的数目，则e∈[0，n(n-1)] 。具有n(n-1)条边的有向图称为完全有向图。
 完全有向图另外的定义是：
 * 对于有向图G=(V，E)，若vi，vj∈V ，当vi ≠vj时，有<vi ,vj>∈E∧<vj , vi >∈E ，即图中任意两个不同的顶点间都有一条弧，这样的有向图称为完全有向图。
 *
 * 有很少边或弧的图（e<n㏒n）的图称为稀疏图，反之称为稠密图。
 * 权(Weight)：与图的边和弧相关的数。权可以表示从一个顶点到另一个顶点的距离或耗费。
 *
 * 子图和生成子图：设有图G=(V，E)和G’=(V’，E’)，若V’∈V且E’∈E ，则称图G’是G的子图；若V’=V且E’∈E，则称图G’是G的一个生成子图。
 * 顶点的邻接(Adjacent)：对于无向图G=(V，E)，若边(v,w)∈E，则称顶点v和w 互为邻接点，即v和w相邻接。边(v,w)依附(incident)与顶点v和w 。
 * 对于有向图G=(V ，E)，若有向弧<v,w>∈E，则称顶点v “邻接到”顶点w，顶点w “邻接自”顶点v ，弧<v,w> 与顶点v和w “相关联” 。
 *
 * 顶点的度、入度、出度：对于无向图G=(V，E)， vi∈V，图G中依附于vi的边的数目称为顶点vi的度(degree)，记为TD(vi)。
 显然，在无向图中，所有顶点度的和是图中边的2倍。 即   ∑TD(vi)=2e      i=1, 2, …, n ，e为图的边数。
 对有向图G=(V，E)，若vi ∈V ，图G中以vi作为起点的有向边(弧)的数目称为顶点vi的出度(Outdegree)，记为OD(vi) ；以vi作为终点的有向边(弧)的数目称为顶点vi的入度(Indegree)，记为ID(vi) 。顶点vi的出度与入度之和称为vi的度，记为TD(vi) 。即
 TD(vi)=OD(vi)+ID(vi)
 *
 * 路径(Path)、路径长度、回路(Cycle) ：对无向图G=(V，E)，若从顶点vi经过若干条边能到达vj，称顶点vi和vj是连通的，又称顶点vi到vj有路径。
 对有向图G=(V，E)，从顶点vi到vj有有向路径，指的是从顶点vi经过若干条有向边(弧)能到达vj。
 或路径是图G中连接两顶点之间所经过的顶点序列。即
 Path=vi0vi1…vim ，vij∈V且(vij-1, vij)∈E   j=1,2, …,m
 或
 Path=vi0vi1 …vim ，vij∈V且<vij-1, vij>∈E  j=1,2, …,m
 路径上边或有向边(弧)的数目称为该路径的长度。
 在一条路径中，若没有重复相同的顶点，该路径称为简单路径；第一个顶点和最后一个顶点相同的路径称为回路(环)；在一个回路中，若除第一个与最后一个顶点外，其余顶点不重复出现的回路称为简单回路(简单环)。
 *
 * 连通图、图的连通分量：对无向图G=(V，E)，若vi ，vj ∈V，vi和vj都是连通的，则称图G是连通图，否则称为非连通图。若G是非连通图，则极大的连通子图称为G的连通分量。
 对有向图G=(V，E)，若vi ，vj ∈V，都有以vi为起点， vj 为终点以及以vj为起点，vi为终点的有向路径，称图G是强连通图，否则称为非强连通图。若G是非强连通图，则极大的强连通子图称为G的强连通分量。
 “极大”的含义：指的是对子图再增加图G中的其它顶点，子图就不再连通。
 生成树、生成森林：一个连通图(无向图)的生成树是一个极小连通子图，它含有图中全部n个顶点和只有足以构成一棵树的n-1条边，称为图的生成树。
 关于无向图的生成树的几个结论：
 ◆ 一棵有n个顶点的生成树有且仅有n-1条边；
 ◆ 如果一个图有n个顶点和小于n-1条边，则是非连通图；
 ◆ 如果多于n-1条边，则一定有环；
 ◆ 有n-1条边的图不一定是生成树。

 有向图的生成森林是这样一个子图，由若干棵有向树组成，含有图中全部顶点。
 有向树是只有一个顶点的入度为0 ，其余顶点的入度均为1的有向图。

 *
 * 网：每个边(或弧)都附加一个权值的图，称为带权图。带权的连通图(包括弱连通的有向图)称为网或网络。网络是工程上常用的一个概念，用来表示一个工程或某种流程
 */

/**
 * 图的存储结构
 *
 图的存储结构比较复杂，其复杂性主要表现在：
 ◆ 任意顶点之间可能存在联系，无法以数据元素在存储区中的物理位置来表示元素之间的关系。
 ◆ 图中顶点的度不一样，有的可能相差很大，若按度数最大的顶点设计结构，则会浪费很多存储单元，反之按每个顶点自己的度设计不同的结构，又会影响操作。
 图的常用的存储结构有：邻接矩阵、邻接链表、十字链表、邻接多重表和边表。
 */

/*
 邻接矩阵(数组)表示法

 基本思想：对于有n个顶点的图，用一维数组vexs[n]存储顶点信息，用二维数组A[n][n]存储顶点之间关系的信息。该二维数组称为邻接矩阵。在邻接矩阵中，以顶点在vexs数组中的下标代表顶点，邻接矩阵中的元素A[i][j]存放的是顶点i到顶点j之间关系的信息。

 1  无向图的数组表示

 (1)  无权图的邻接矩阵
 无向无权图G=(V，E)有n(n≧1)个顶点，其邻接矩阵是n阶对称方阵。其元素的定义如下：
            -- 1   若(vi , vj)∈E，即vi , vj邻接
 A[i][j]=
             -- 0   若(vi , vj)∉E，即vi , vj不邻接

 (2)  带权图的邻接矩阵
 无向带权图G=(V，E) 的邻接矩阵。其元素的定义如下：
            -- Wij    若(vi , vj)∈E，即vi , vj邻接，权值为wij
 A[i][j]=

            -- ∞   若(vi , vj)∉E，即vi , vj不邻接时

 (3)  无向图邻接矩阵的特性
 ◆ 邻接矩阵是对称方阵
 ◆ 对于顶点vi，其度数是第i行的非0元素的个数；
 ◆ 无向图的边数是上(或下)三角形矩阵中非0元素个数。

 2  有向图的数组表示

 (1)  无权图的邻接矩阵
 若有向无权图G=(V，E)有n(n≧1)个顶点，则其邻接矩阵是n阶对称方阵。元素定义如下：
            -- 1   若<vi, vj>∈E，从vi到vj有弧
 A[i][j]=
            -- 0   若<vi , vj>∉E  从vi到vj 没有弧

 (2)  带权图的邻接矩阵
 有向带权图G=(V，E)的邻接矩阵。其元素的定义如下：
            -- wij    若<vi,vj>∈E，即vi , vj邻接，权值为wij
 A[i][j]=
            ∞   若<vi,vj>∉E，即vi , vj不邻接时

 ⑶ 有向图邻接矩阵的特性
 ◆ 对于顶点vi，第i行的非0元素的个数是其出度OD(vi)；第i列的非0元素的个数是其入度ID(vi) 。
 ◆ 邻接矩阵中非0元素的个数就是图的弧的数目。

 3  图的邻接矩阵的操作

 图的邻接矩阵的实现比较容易，定义两个数组分别存储顶点信息(数据元素)和边或弧的信息(数据元素之间的关系) 。

 */

var Stack = require('../Stack/stack');
var Queue = require('../Queue/Queue').Queue;
var ChildSiblingTree = require('../Binary tree/BinaryTree').ChildSiblingTree;

// 图的数组（邻接矩阵）存储表示
var DG = 1;     // 有向图
var DN = 2;     // 有向网
var UDG = 3;    // 无向图
var UDN = 4;    // 无向网

/**
 *
 * @param {Number} adj
 * @param {*} info
 * @constructor
 */
function ArcCell(adj, info) {
    // 顶点类型。对于无权图，用1或0表示相邻否；对带权图，则为权值类型
    this.adj = typeof adj === 'number' ? adj : Infinity;
    // 该弧相关信息
    this.info = info || null;
}

/**
 *
 * @param {Array} vexs 顶点向量
 * @param {Array | ArcCell} arcs 邻接矩阵
 * @param {Number} vexnum
 * @param {Number} arcnum
 * @param {Number} kind
 * @constructor
 */
function AdjacencyMatrixGraph(vexs, arcs, vexnum, arcnum, kind) {
    // 顶点向量
    this.vexs = vexs || [];
    // 邻接矩阵
    this.arcs = arcs || [];
    // 图的当前顶点数
    this.vexnum = vexnum || 0;
    // 图的当前弧数
    this.arcnum = arcnum || 0;
    // 图的种类标志
    this.kind = kind || DG;
}
exports.AdjacencyMatrixGraph = AdjacencyMatrixGraph;
AdjacencyMatrixGraph.prototype = {
    createGraph: function () {
        switch (this.kind) {
            case DG:
                return createDG(this);     // 构造有向图
            case DN:
                return createDN(this);     // 构造有向网
            case UDG:
                return createUDG(this);    // 构造无向图
            case UDN:
                return createUDN(this);    // 构造无向网
            default:
                throw new Error('非有效的图类型');
        }
    },

    /**
     * 查找顶点
     * @param {*} vp 顶点向量
     * @returns {number}
     */
    locateVex: function (vp) {
        for (var i = 0; i < this.vexnum; ++i) {
            if (this.vexs[i] === vp) return i;
        }

        return -1;
    },

    /**
     * 向图中增加顶点
     * @param {*} vp 顶点向量
     */
    addVertex: function (vp) {
        if (this.locateVex(vp) !== -1)
            throw new Error('Vertex has existed!');

        var k = this.vexnum;
        this.vexs[this.vexnum++] = vp;

        var value = this.kind === DG || this.kind === UDG ?
            0 : Infinity;
        for (var j = 0; j < this.vexnum; ++j) {
            this.arcs[j] = this.arcs[j] || [];
            this.arcs[k] = this.arcs[k] || [];
            this.arcs[j][k] = this.arcs[j][k] || new ArcCell();
            this.arcs[k][j] = this.arcs[k][j] || new ArcCell();
            this.arcs[j][k].adj = this.arcs[k][j].adj = value;
        }
    },

    /**
     * 向图中增加一条弧
     * @param {*} vex1 顶点1向量
     * @param {*} vex2 顶点2向量
     * @param {ArcCell} arc
     * @returns {boolean}
     */
    addArc: function (vex1, vex2, arc) {
        arc = arc || new ArcCell(this.kind === DG || this.kind === UDG ? 1 : 'weight');
        var k = this.locateVex(vex1);
        var j = this.locateVex(vex2);

        if (k === -1 || j === -1)
            throw new Error('Arc\'s Vertex do not existed!');

        this.arcs[k][j].adj = arc.adj;
        this.arcs[k][j].info = arc.info;
        // 无向图或无向网
        if (this.kind === UDG || this.kind === UDN) {
            this.arcs[j][k].adj = arc.adj;
            this.arcs[j][k].info = arc.info;
        }

        ++this.arcnum;

        return true;
    },

    /**
     * 删除顶点
     * @param {String} vex 要删除的顶点
     */
    deleteVex: function (vex) {
        var n = this.vexnum - 1;
        var m = this.locateVex(vex);

        if (m < 0) return false;

        // 将待删除顶点交换到最后一个顶点
        var temp = this.vexs[m];
        this.vexs[m] = this.vexs[n];
        this.vexs[n] = temp;

        // 将边的关系随之交换
        for (var i = 0; i <= n; ++i) {
            this.arcs[i][m] = this.arcs[i][n];
            this.arcs[m][i] = this.arcs[n][i];
        }

        this.arcs[m][m].adj = 0;
        this.vexs.length = --this.vexnum;
        return true;
    },

    /**
     * 删除边(v, w)
     * @param {String} v
     * @param {String} w
     * @returns {boolean}
     */
    deleteArc: function (v, w) {
        var i = this.locateVex(v);
        var j = this.locateVex(w);

        if (i < 0 || j < 0) return false;

        if (this.arcs[i][j].adj) {
            this.arcs[i][j].adj = 0;
            this.arcnum--;
        }

        return true;
    },

    // 判断一个邻接矩阵存储的有向图是否可传递
    isPass: function () {
        if (this.kind !== DG) throw new Error('graph kind should be DG');

        for (var x = 0; x < this.vexnum; ++x) {
            for (var y = 0; y < this.vexnum; ++y) {
                if (this.arcs[x][y]) {
                    for (var z = 0; z < this.vexnum; ++z) {
                        if (z !== x && this.arcs[y][z] && !this.arcs[x][z]) return false;
                    }
                }
            }
        }

        return true;
    },

    firstAdjVex: function (v) {
        for (var i = 0; i < this.vexnum; ++i) {
            if (this.arcs[v][i].adj !== 0 && this.arcs[v][i].adj !== Infinity) return i;
        }

        return -1;
    },

    nextAdjVex: function (v, w) {
        for (var i = w + 1; i < this.vexnum; ++i) {
            if (this.arcs[v][i].adj !== 0 && this.arcs[v][i].adj !== Infinity) return i;
        }

        return -1;
    }
};

var createDG = createGraph(DG);
var createDN = createGraph(DN);
var createUDG = createGraph(UDG);
var createUDN = createGraph(UDN);

function createGraph(kind) {
    var adj;
    var setMatrixValue;

    if (kind === 2 || kind === 4) {
        adj = Infinity;
        setMatrixValue = function () {
            return prompt('weight: ');
        };
    } else {
        adj = 0;
        setMatrixValue = function () {
            return 1;
        };
    }

    return function (AdjacencyMatrixGraph) {
        AdjacencyMatrixGraph.vexnum = parseInt(prompt('vexnum: '), 10);
        AdjacencyMatrixGraph.arcnum = parseInt(prompt('arcnum: '), 10);
        // incInfo为0则各弧不含其他信息
        var incInfo = parseInt(prompt('incInfo: '), 10);

        // 构造顶点向量
        var i, j;
        for (i = 0; i < AdjacencyMatrixGraph.vexnum; ++i) AdjacencyMatrixGraph.vexs[i] = prompt('顶点向量vex: ');

        // 初始化邻接矩阵
        for (i = 0; i < AdjacencyMatrixGraph.vexnum; ++i) {
            for (j = 0; j < AdjacencyMatrixGraph.vexnum; ++j) {
                AdjacencyMatrixGraph.arcs[i] = AdjacencyMatrixGraph.arcs[i] || [];
                AdjacencyMatrixGraph.arcs[i][j] = new ArcCell(adj, null);
            }
        }

        // 构造邻接矩阵
        for (var k = 0; k < AdjacencyMatrixGraph.arcnum; ++k) {
            // 输入一条边依附的顶点及权值
            var v1 = prompt('v1: ');
            var v2 = prompt('v2: ');

            // 确定v1，v2在G中的位置
            i = AdjacencyMatrixGraph.locateVex(v1);
            j = AdjacencyMatrixGraph.locateVex(v2);

            var w = setMatrixValue();
            // 弧<v1, v2>的权值
            AdjacencyMatrixGraph.arcs[i][j].adj = w;
            if (incInfo) AdjacencyMatrixGraph.arcs[i][j].info = prompt('info: ');
            if (kind === 3 || kind === 4) AdjacencyMatrixGraph.arcs[j][i] = AdjacencyMatrixGraph.arcs[i][j];
        }
    };
}

// 第一种创建图方法
var vexs = ['a', 'b', 'c', 'd', 'e'];
var arcs = [
    [
        {"adj": Infinity, "info": null},
        {"adj": "6", "info": null},
        {"adj": "2", "info": null},
        {"adj": Infinity, "info": null},
        {"adj": Infinity, "info": null}
    ],
    [
        {"adj": "6", "info": null},
        {"adj": Infinity, "info": null},
        {"adj": "3", "info": null},
        {"adj": "4", "info": null},
        {"adj": "3", "info": null}
    ],
    [
        {"adj": "2", "info": null},
        {"adj": "3", "info": null},
        {"adj": Infinity, "info": null},
        {"adj": "1", "info": null},
        {"adj": Infinity, "info": null}
    ],
    [
        {"adj": Infinity, "info": null},
        {"adj": "4", "info": null},
        {"adj": "1", "info": null},
        {"adj": Infinity, "info": null},
        {"adj": "5", "info": null}
    ],
    [
        {"adj": Infinity, "info": null},
        {"adj": "3", "info": null},
        {"adj": Infinity, "info": null},
        {"adj": "5", "info": null},
        {"adj": Infinity, "info": null}
    ]
];
var udn = new AdjacencyMatrixGraph(vexs, arcs, 5, 7, 4);

// 第二种创建图方法
var dn = new AdjacencyMatrixGraph([], [], 0, 0, 2);
dn.addVertex('a');
dn.addVertex('b');
dn.addVertex('c');
dn.addVertex('d');
dn.addVertex('e');

dn.addArc('a', 'b', {
    adj: 6
});
dn.addArc('a', 'c', {
    adj: 2
});
dn.addArc('c', 'b', {
    adj: 3
});
dn.addArc('c', 'd', {
    adj: 1
});
dn.addArc('d', 'b', {
    adj: 4
});
dn.addArc('b', 'e', {
    adj: 3
});
dn.addArc('d', 'e', {
    adj: 5
});

console.log(dn);

/*

 // 第三种创建图方法
 var g = new AdjacencyMatrixGraph();
 g.kind = DN;
 g.createGraph();
 console.log(g);

 */




/*
 图的遍历

 图的遍历(Travering Graph)：从图的某一顶点出发，访遍图中的其余顶点，且每个顶点仅被访问一次。图的遍历算法是各种图的操作的基础。

 ◆ 复杂性：图的任意顶点可能和其余的顶点相邻接，可能在访问了某个顶点后，沿某条路径搜索后又回到原顶点。
 ◆ 解决办法：在遍历过程中记下已被访问过的顶点。设置一个辅助向量Visited[1…n](n为顶点数)，其初值为0，一旦访问了顶点vi后，使Visited[i]为1或为访问的次序号。
 图的遍历算法有深度优先搜索算法和广度优先搜索算法。

 深度优先搜索(Depth First Search--DFS)遍历类似树的先序遍历，是树的先序遍历的推广。

 算法思想
 设初始状态时图中的所有顶点未被访问，则：
 ⑴ ：从图中某个顶点vi出发，访问vi；然后找到vi的一个邻接顶点vi1 ；
 ⑵：从vi1出发，深度优先搜索访问和vi1相邻接且未被访问的所有顶点；
 ⑶：转⑴ ，直到和vi相邻接的所有顶点都被访问为止
 ⑷ ：继续选取图中未被访问顶点vj作为起始顶点，转(1)，直到图中所有顶点都被访问为止。


 广度优先搜索(Breadth First Search--BFS)遍历类似树的按层次遍历的过程。

 算法思想
 设初始状态时图中的所有顶点未被访问，则：
 ⑴ ：从图中某个顶点vi出发，访问vi；
 ⑵：访问vi的所有相邻接且未被访问的所有顶点vi1，vi2，…，vim；
 ⑶：以vi1，vi2， …，vim的次序，以vij(1≦j≦m)依此作为vi ，转⑴；
 ⑷ ：继续选取图中未被访问顶点vk作为起始顶点，转⑴，直到图中所有顶点都被访问为止。

 用广度优先搜索算法遍历图与深度优先搜索算法遍历图的唯一区别是邻接点搜索次序不同.
 */

// 对邻接矩阵图作递归式深度优先遍历
AdjacencyMatrixGraph.prototype.DFSTraverse = function (visitFn) {
    var visited = [];
    // 访问标志数组初始化
    for (var i = 0; i < this.vexnum; ++i) visited[i] = false;
    for (i = 0; i < this.vexnum; ++i) {
        if (!visited[i]) dfs(this, i);
    }

    function dfs(graph, vertex) {
        visited[vertex] = true;
        visitFn.call(graph, vertex);

        for (var j = 0; j < graph.vexnum; ++j) {
            if (graph.arcs[vertex][j].adj !== 0 && graph.arcs[vertex][j].adj !== Infinity
                && !visited[j]) dfs(graph, j);
        }
    }
};

console.log('DFSTraverse: udn');

var g1 = new AdjacencyMatrixGraph([], [], 0, 0, UDG);
g1.addVertex('v1');
g1.addVertex('v3');
g1.addVertex('v2');
g1.addVertex('v4');
g1.addVertex('v5');

g1.addArc('v5', 'v4');
g1.addArc('v3', 'v1');
g1.addArc('v2', 'v1');
g1.addArc('v3', 'v2');


g1.DFSTraverse(function (v) {
    console.log(this.vexs[v]);
});


// 非递归
AdjacencyMatrixGraph.prototype.DFSTraverse_NonRecurse = function (visitFn) {
    var visited = [];
    var stack = new Stack();
    var me = this;
    // 访问标志数组初始化
    for (var i = 0; i < this.vexnum; ++i) visited[i] = false;

    for (i = 0; i < this.vexnum; ++i) {
        if (!visited[i]) {
            stack.push(i);
            visited[i] = true;
            visitFn.call(me, i);

            var vertex;
            while ((vertex = stack.peek()) != null) {
                for (var j = 0; j < this.vexnum; ++j) {
                    if (this.arcs[vertex][j].adj !== 0 && this.arcs[vertex][j].adj !== Infinity
                        && !visited[j]) {
                        visitFn.call(me, j);
                        visited[j] = true;
                        stack.push(j);
                    } else stack.pop();
                }
            }
        }
    }
};

console.log('DFSTraverse_NonRecurse: udn');
g1.DFSTraverse_NonRecurse(function (v) {
    console.log(this.vexs[v]);
});

// 对邻接矩阵图作广度优先遍历
AdjacencyMatrixGraph.prototype.BFSTraverse = function (visitFn) {
    var visited = [];
    var queue = new Queue();

    for (var i = 0; i < this.vexnum; ++i) visited[i] = false;

    for (i = 0; i < this.vexnum; ++i) {
        if (!visited[i]) {
            visited[i] = true;
            visitFn.call(this, i);
            queue.enQueue(i);

            while (queue.rear) {
                var u = queue.deQueue();

                for (var j = 0; j < this.vexnum; ++j) {
                    if (this.arcs[u][j].adj !== 0 && this.arcs[u][j].adj !== Infinity
                        && !visited[j]) {
                        visited[j] = true;
                        visitFn.call(this, j);
                        queue.enQueue(j);
                    }
                }
            }
        }
    }
};


console.log('BFSTraverse: ');
var bsfG = new AdjacencyMatrixGraph([], [], 0, 0, DG);
bsfG.addVertex('v1');
bsfG.addVertex('v2');
bsfG.addVertex('v3');
bsfG.addVertex('v4');
bsfG.addVertex('v5');

bsfG.addArc('v1', 'v4');
bsfG.addArc('v1', 'v2');
bsfG.addArc('v3', 'v5');
bsfG.addArc('v3', 'v2');
bsfG.addArc('v3', 'v1');
bsfG.addArc('v4', 'v3');
bsfG.addArc('v5', 'v4');

bsfG.BFSTraverse(function (v) {
    console.log(this.vexs[v]);
});




/*
 最小生成树

 如果连通图是一个带权图，则其生成树中的边也带权，生成树中所有边的权值之和称为生成树的代价。

 最小生成树(Minimum Spanning Tree) ：带权连通图中代价最小的生成树称为最小生成树。

 最小生成树在实际中具有重要用途，如设计通信网。设图的顶点表示城市，边表示两个城市之间的通信线路，边的权值表示建造通信线路的费用。n个城市之间最多可以建n(n-1)/2条线路，如何选择其中的n-1条，使总的建造费用最低?

 构造最小生成树的算法有许多，基本原则是：
 ◆ 尽可能选取权值最小的边，但不能构成回路；
 ◆ 选择n-1条边构成最小生成树。
 以上的基本原则是基于MST的如下性质：
 设G=(V，E)是一个带权连通图，U是顶点集V的一个非空子集。若u∈U ，v∈V-U，且(u, v)是U中顶点到V-U中顶点之间权值最小的边，则必存在一棵包含边(u, v)的最小生成树。

 证明： 用反证法证明。
 设图G的任何一棵最小生成树都不包含边(u,v)。设T是G的一棵生成树，则T是连通的，从u到v必有一条路径(u,…,v)，当将边(u,v)加入到T中时就构成了回路。则路径(u, …,v)中必有一条边(u’,v’) ，满足u’∈U ，v’∈V-U 。删去边(u’,v’) 便可消除回路，同时得到另一棵生成树T’。
 由于(u,v)是U中顶点到V-U中顶点之间权值最小的边，故(u,v)的权值不会高于(u’,v’)的权值，T’的代价也不会高于T， T’是包含(u,v) 的一棵最小生成树，与假设矛盾。

 */

/*
 普里姆(Prim)算法

 适合边稠密的网

 从连通网N=(U，E)中找最小生成树T=(U，TE) 。

 1 算法思想
 ⑴  若从顶点v0出发构造，U={v0}，TE={}；
 ⑵ 先找权值最小的边(u，v)，其中u∈U且v∈V-U，并且子图不构成环，则U= U∪{v}，TE=TE∪{(u，v)} ；
 ⑶ 重复⑵ ，直到U=V为止。则TE中必有n-1条边， T=(U，TE)就是最小生成树。

 2.算法实现说明
 为便于算法实现，设置一个一维数组closedge[n]，用来保存V- U中各顶点到U中顶点具有权值最小的边。
 closedge[j].adjvex=k，表明边(vj, vk)是V-U中顶点vj到U中权值最小的边，而顶点vk是该边所依附的U中的顶点。 closedge[j].lowcost存放该边的权值。
 假设从顶点vs开始构造最小生成树。初始时令：
 Closedge[s].lowcost=0 ：表明顶点vs首先加入到U中；
 Closedge[k].adjvex=s ，Closedge[k].lowcost=cost(k, s)
 表示V-U中的各顶点到U中权值最小的边(k≠s) ，cost(k, s)表示边(vk, vs) 权值。

 3.算法步骤
 ⑴  从closedge中选择一条权值(不为0)最小的边(vk, vj) ，然后做：
 ① 置closedge[k].lowcost为0 ，表示vk已加入到U中。
 ②  根据新加入vk的更新closedge中每个元素：
 vi∈V-U ，若cost(i, k)≦colsedge[i].lowcost，表明在U中新加入顶点vk后， (vi, vk)成为vi到U中权值最小的边，置：
 Closedge[i].lowcost=cost(i, k)
 Closedge[i].adjvex=k
 ⑵  重复⑴n-1次就得到最小生成树。

 算法分析：
 设带权连通图有n个顶点，则算法的主要执行是二重循环： 求closedge中权值最小的边，频度为n-1； 修改closedge数组，频度为n 。因此，整个算法的时间复杂度是O(n2)，与边的数目无关。

 */

AdjacencyMatrixGraph.prototype.minSpanTree_PRIM = function (u) {
    var closedge = [];

    // 初始化
    for (var j = 0; j < this.vexnum; ++j) {
        closedge[j] = {adjvex: u, lowcost: +this.arcs[j][u].adj};
    }
    closedge[u].lowcost = 0;

    var te = [];
    // 选择其余this.vexnum - 1个顶点
    for (j = 0; j < this.vexnum - 1; ++j) {
        var min = Infinity;
        var k;
        for (var v = 0; v < this.vexnum; ++v) {
            if (closedge[v].lowcost !== 0 && closedge[v].lowcost < min) {
                min = closedge[v].lowcost;
                k = v;
            }
        }

        te[j] = {
            vex1: closedge[k].adjvex,
            vex2: k,
            weight: closedge[k].lowcost
        };
        closedge[k].lowcost = 0;
        for (v = 0; v < this.vexnum; ++v) {
            if (this.arcs[v][k].adj < closedge[v].lowcost) {
                closedge[v].lowcost = this.arcs[v][k].adj;
                closedge[v].adjvex = k;
            }
        }
    }

    return te;
};

udn = new AdjacencyMatrixGraph([], [], 0, 0, 4);
udn.addVertex('v1');
udn.addVertex('v2');
udn.addVertex('v3');
udn.addVertex('v4');
udn.addVertex('v5');
udn.addVertex('v6');

udn.addArc('v1', 'v2', {adj: 6});
udn.addArc('v1', 'v3', {adj: 1});
udn.addArc('v1', 'v4', {adj: 5});
udn.addArc('v2', 'v3', {adj: 5});
udn.addArc('v2', 'v5', {adj: 3});
udn.addArc('v3', 'v4', {adj: 5});
udn.addArc('v3', 'v5', {adj: 6});
udn.addArc('v3', 'v6', {adj: 4});
udn.addArc('v4', 'v6', {adj: 2});
udn.addArc('v5', 'v6', {adj: 6});

console.log('minSpanTree_PRIM: ');
console.log(udn.minSpanTree_PRIM(0));



/*
 克鲁斯卡尔(Kruskal)算法

 适合边稀疏的网

 1 算法思想
 设G=(V, E)是具有n个顶点的连通网，T=(U, TE)是其最小生成树。初值：U=V，TE={} 。
 对G中的边按权值大小从小到大依次选取。
 ⑴   选取权值最小的边(vi，vj)，若边(vi，vj)加入到TE后形成回路，则舍弃该边(边(vi，vj) ；否则，将该边并入到TE中，即TE=TE∪{(vi，vj)} 。
 ⑵ 重复⑴ ，直到TE中包含有n-1条边为止。
 如图7-22所提示。

 2 算法实现说明
 Kruskal算法实现的关键是：当一条边加入到TE的集合后，如何判断是否构成回路?
 简单的解决方法是：定义一个一维数组Vset[n] ，存放图T中每个顶点所在的连通分量的编号。
 ◆ 初值：Vset[i]=i，表示每个顶点各自组成一个连通分量，连通分量的编号简单地使用顶点在图中的位置(编号)。
 ◆ 当往T中增加一条边(vi，vj) 时，先检查Vset[i]和Vset[j]值：
 ☆ 若Vset[i]=Vset[j]：表明vi和vj处在同一个连通分量中，加入此边会形成回路；
 ☆ 若Vset[i]≠Vset[j]，则加入此边不会形成回路，将此边加入到生成树的边集中。
 ◆ 加入一条新边后，将两个不同的连通分量合并：将一个连通分量的编号换成另一个连通分量的编号。

 */

AdjacencyMatrixGraph.prototype.minSpanTree_Kruskal = function () {
    var set = [];
    var te = [];

    for(var i = 0; i < this.vexnum; ++i) set[i] = i;

    var k = 0;
    var min = Infinity;
    var a = 0;
    var b = 0;
    while(k < this.vexnum - 1){
        for(i = 0; i < this.vexnum; ++i){
            for(var j = i + 1; j < this.vexnum; ++j){
                if(this.arcs[i][j].adj < min) {
                    min = this.arcs[i][j].adj;
                    a = i;
                    b = j;
                }
            }
        }

        if(set[a] !== set[b]){
            te[k++] = {
                vex1: a,
                vex2: b,
                weight: this.arcs[a][b].adj
            };

            for(i = 0; i < this.vexnum; ++i){
                if(set[i] === set[b] && i !== b)
                    set[i] = set[a];
            }
            set[b] = set[a];
        }

        min = this.arcs[a][b].adj = Infinity;
    }

    return te;
};

console.log('minSpanTree_Kruskal: ');
console.log(udn.minSpanTree_Kruskal());




/*
 最短路径

 若用带权图表示交通网，图中顶点表示地点，边代表两地之间有直接道路，边上的权值表示路程(或所花费用或时间) 。从一个地方到另一个地方的路径长度表示该路径上各边的权值之和。问题：
 ◆ 两地之间是否有通路?
 ◆ 在有多条通路的情况下，哪条最短?
 考虑到交通网的有向性，直接讨论的是带权有向图的最短路径问题，但解决问题的算法也适用于无向图。
 将一个路径的起始顶点称为源点，最后一个顶点称为终点。


 单源点最短路径

 对于给定的有向图G=(V，E)及单个源点Vs，求Vs到G的其余各顶点的最短路径。
 针对单源点的最短路径问题，Dijkstra提出了一种按路径长度递增次序产生最短路径的算法，即迪杰斯特拉(Dijkstra)算法。

 1 基本思想
 从图的给定源点到其它各个顶点之间客观上应存在一条最短路径，在这组最短路径中，按其长度的递增次序，依次求出到不同顶点的最短路径和路径长度。
 即按长度递增的次序生成各顶点的最短路径，即先求出长度最小的一条最短路径，然后求出长度第二小的最短路径，依此类推，直到求出长度最长的最短路径。

 2 算法思想说明
 设给定源点为Vs，S为已求得最短路径的终点集，开始时令S={Vs} 。当求得第一条最短路径(Vs ，Vi)后，S为{Vs，Vi} 。根据以下结论可求下一条最短路径。
 设下一条最短路径终点为Vj ，则Vj只有：
 ◆  源点到终点有直接的弧<Vs，Vj>；
 ◆ 从Vs 出发到Vj 的这条最短路径所经过的所有中间顶点必定在S中。即只有这条最短路径的最后一条弧才是从S内某个顶点连接到S外的顶点Vj 。
 若定义一个数组dist[n]，其每个dist[i]分量保存从Vs 出发中间只经过集合S中的顶点而到达Vi的所有路径中长度最小的路径长度值，则下一条最短路径的终点Vj必定是不在S中且值最小的顶点，即：
 dist[i]=Min{ dist[k]| Vk∈V-S }
 利用上述公式就可以依次找出下一条最短路径。

 3  算法步骤
 ① 令S={Vs} ，用带权的邻接矩阵表示有向图，对图中每个顶点Vi按以下原则置初值：
 0    i =s
 dist[i] =   Wsi     i≠s且<vs,vi>∈E， wsi为弧上的权值
 ∞   i≠s且<vs,vi>不属于E
 ② 选择一个顶点Vj ，使得：
 dist[j]=Min{ dist[k]| Vk∈V-S }
 Vj就是求得的下一条最短路径终点，将Vj 并入到S中，即S=S∪{Vj} 。
 ③ 对V-S中的每个顶点Vk ，修改dist[k]，方法是：
 若dist[j]+Wjk<dist[k]，则修改为：
 dist[k]=dist[j]+Wjk (Vk∈V-S )
 ④ 重复②，③，直到S=V为止。

 4 算法实现
 用带权的邻接矩阵表示有向图， 对Prim算法略加改动就成了Dijkstra算法，将Prim算法中求每个顶点Vk的lowcost值用dist[k]代替即可。
 ◆  设数组pre[n]保存从Vs到其它顶点的最短路径。若pre[i]=k，表示从Vs 到Vi的最短路径中，Vi的前一个顶点是Vk，即最短路径序列是(Vs , …, Vk  , Vi) 。
 ◆ 设数组final[n]，标识一个顶点是否已加入S中。

 5  算法分析
 Dijkstra算法的主要执行是：
 ◆ 数组变量的初始化：时间复杂度是O(n) ；
 ◆ 求最短路径的二重循环：时间复杂度是O(n2) ；
 因此，整个算法的时间复杂度是O(n2) 。

 */

/**
 * 用Dijkstra算法求有向网的v0顶点到其余顶点v的最短路径pre[v]及其带权长度dist[v]。
 * 若pre[v][w]为true，则w是从v0到v当前求得最短路径上的顶点。
 * final[v]为true当且仅当v∈S，即已经求得v0到v的最短路径
 * @param v0
 */
AdjacencyMatrixGraph.prototype.shortestPath_Dijkstra = function (v0) {
    var pre = [];
    var dist = [];
    var final = [];
    var w;

    for (var v = 0; v < this.vexnum; ++v) {
        final[v] = false;
        dist[v] = this.arcs[v0][v].adj;
        pre[v] = pre[v] || [];
        // 设空路径
        for (w = 0; w < this.vexnum; ++w) pre[v][w] = false;
        if (dist[v] < Infinity) {
            pre[v][v0] = true;
            pre[v][v] = true;
        }
    }

    // 初始化，v0顶点属于S集
    dist[v0] = 0;
    final[v0] = true;

    // 开始主循环，每次求得v0到某个v顶点的最短路径，并加v到S集

    // 其余的顶点
    for (var i = 1; i < this.vexnum; ++i) {
        var min = Infinity;
        // 当前所指离v0顶点的最近距离
        for (w = 0; w < this.vexnum; ++w) {
            // w顶点在V - S中
            // 且w顶点离v0顶点更近
            if (!final[w] && dist[w] < min) {
                v = w;
                min = dist[w];
            }
        }

        // 离v0顶点最近的v加入S集
        final[v] = true;
        // 更新当前最短路径及距离
        for (w = 0; w < this.vexnum; ++w) {
            if (!final[w] && min + this.arcs[v][w].adj < dist[w]) {
                dist[w] = min + this.arcs[v][w].adj;
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

var dijTest = new AdjacencyMatrixGraph([], [], 0, 0, DN);

dijTest.addVertex('0');
dijTest.addVertex('1');
dijTest.addVertex('2');
dijTest.addVertex('3');
dijTest.addVertex('4');
dijTest.addVertex('5');

dijTest.addArc('0', '1', {adj: 20});
dijTest.addArc('0', '4', {adj: 10});
dijTest.addArc('0', '2', {adj: 60});
dijTest.addArc('0', '5', {adj: 65});
dijTest.addArc('1', '2', {adj: 30});
dijTest.addArc('2', '3', {adj: 40});
dijTest.addArc('5', '2', {adj: 15});
dijTest.addArc('4', '5', {adj: 20});
dijTest.addArc('3', '4', {adj: 35});
dijTest.addArc('1', '3', {adj: 70});

dijTest.shortestPath_Dijkstra(0);





/*
 每一对顶点间的最短路径

 用Dijkstra算法也可以求得有向图G=(V，E)中每一对顶点间的最短路径。方法是：每次以一个不同的顶点为源点重复Dijkstra算法便可求得每一对顶点间的最短路径，时间复杂度是O(n3) 。

 弗罗伊德(Floyd)提出了另一个算法，其时间复杂度仍是O(n3) ， 但算法形式更为简明。

 1 算法思想

 设顶点集S(初值为空)，用数组A的每个元素A[i][j]保存从Vi只经过S中的顶点到达Vj的最短路径长度，其思想是：
 ① 初始时令S={ } ， A[i][j]的赋初值方式是：
 0    i =j时
 A[i][j]=    Wij     i≠j且<vi,vj>∈E， wij为弧上的权值
 ∞   i≠j且<vi,vj>不属于E
 ② 将图中一个顶点Vk 加入到S中，修改A[i][j]的值，修改方法是：
 A[i][j]=Min{A[i][j] , (A[i][k]+A[k][j]) }
 原因： 从Vj只经过S中的顶点(Vk)到达Vj的路径长度可能比原来不经过Vk的路径更短。
 ③ 重复②，直到G的所有顶点都加入到S中为止。

 2 算法实现

 ◆  定义二维数组Path[n][n](n为图的顶点数) ，元素Path[i][j]保存从Vi到Vj的最短路径所经过的顶点。
 ◆ 若Path[i][j]=k：从Vi到Vj 经过Vk ，最短路径序列是(Vi , …, Vk , …, Vj) ，则路径子序列：(Vi , …, Vk)和(Vk , …, Vj)一定是从Vi到Vk和从Vk到Vj 的最短路径。从而可以根据Path[i][k]和Path[k][j]的值再找到该路径上所经过的其它顶点，…依此类推。
 ◆ 初始化为Path[i][j]=-1，表示从Vi到Vj 不经过任何(S中的中间)顶点。当某个顶点Vk加入到S中后使A[i][j]变小时，令Path[i][j]=k。


 */

AdjacencyMatrixGraph.prototype.shortestPath_FLOYD = function () {
    var a = [];
    var path = [];

    for (var j = 0; j < this.vexnum; ++j) {
        a[j] = a[j] || [];
        path[j] = path[j] || [];
        for (var k = 0; k < this.vexnum; ++k) {
            if(j === k) a[j][k] = 0;
            else a[j][k] = this.arcs[j][k].adj;
            path[j][k] = -1;
        }
    }

    for (var m = 0; m < this.vexnum; ++m) {
        for (j = 0; j < this.vexnum; ++j) {
            for (k = 0; k < this.vexnum; ++k) {
                if (a[j][m] + a[m][k] < a[j][k]) {
                    a[j][k] = a[j][m] + a[m][k];
                    path[j][k] = m;
                }
            }
        }
    }

    for (j = 0; j < this.vexnum; ++j) {
        for (k = 0; k < this.vexnum; ++k) {
            if (j !== k) {
                console.log('%d到%d的最短路径为：', j, k);
                console.log('%d ', j); prn_pass(j, k);
                console.log('%d ', k);
                console.log('最短路径长度为： %d', a[j][k]);
            }
        }
    }

    function prn_pass(j, k) {
        if (path[j][k] !== -1) {
            prn_pass(j, path[j][k]);
            console.log(', %d', path[j][k]);
            prn_pass(path[j][k], k);
        }
    }
};

var floyd = new AdjacencyMatrixGraph([], [], 0, 0, DN);
floyd.addVertex('v0');
floyd.addVertex('v1');
floyd.addVertex('v2');
floyd.addArc('v0', 'v2', {adj: 8});
floyd.addArc('v0', 'v1', {adj: 2});
floyd.addArc('v1', 'v2', {adj: 4});
floyd.addArc('v2', 'v0', {adj: 5});

floyd.shortestPath_FLOYD();
