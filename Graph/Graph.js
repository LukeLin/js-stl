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
        for (var i = 0; i < this.vexnum; i++) {
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
        for (var j = 0; j < this.vexnum; j++) {
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
        for (var i = 0; i <= n; i++) {
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

        for (var x = 0; x < this.vexnum; x++) {
            for (var y = 0; y < this.vexnum; y++) {
                if (this.arcs[x][y]) {
                    for (var z = 0; z < this.vexnum; z++) {
                        if (z !== x && this.arcs[y][z] && !this.arcs[x][z]) return false;
                    }
                }
            }
        }

        return true;
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
        var i , j;
        for (i = 0; i < AdjacencyMatrixGraph.vexnum; i++) AdjacencyMatrixGraph.vexs[i] = prompt('顶点向量vex: ');

        // 初始化邻接矩阵
        for (i = 0; i < AdjacencyMatrixGraph.vexnum; i++) {
            for (j = 0; j < AdjacencyMatrixGraph.vexnum; j++) {
                AdjacencyMatrixGraph.arcs[i] = AdjacencyMatrixGraph.arcs[i] || [];
                AdjacencyMatrixGraph.arcs[i][j] = new ArcCell(adj, null);
            }
        }

        // 构造邻接矩阵
        for (var k = 0; k < AdjacencyMatrixGraph.arcnum; k++) {
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
var dn = new AdjacencyMatrixGraph([], [], 0, 7, 2);
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

AdjacencyListGraph.prototype = {
    constructor: AdjacencyListGraph,

    // 查找顶点位置
    locateVex: function (vp) {
        for (var i = 0; i < this.vexnum; i++) {
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
     * @param {ArcNode} arc1
     * @param {ArcNode} arc2
     * @returns {boolean}
     */
    addArc: function (arc1, arc2) {
        var k = this.locateVex(arc1.adjVex);
        var j = this.locateVex(arc2.adjVex);

        if (k === -1 || j === -1) throw new Error('Arc\'s Vertex do not existed!');

        // 边的起始表结点赋值
        var p = new ArcNode(arc1.adjVex, arc1.nextArc || null, arc1.info);
        // 边的末尾表结点赋值
        var q = new ArcNode(arc2.adjVex, arc2.nextArc || null, arc2.info);

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

        return true;
    },

    // TODO 其他图类型的创建暂时没弄
    createGraph: function () {
        this.vexnum = +prompt('vexnum: ');
        this.arcnum = +prompt('arcnum: ');
        // incInfo为0则各弧不含其他信息
        var incInfo = +prompt('incInfo: ');

        for (var m = 0; m < this.vexnum; m++) {
            this.vertices[m] = new VexNode();
            this.vertices[m].data = prompt('vertex: ');
        }

        for (m = 0; m < this.arcnum; m++) {
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

        for (var x = 0; x < this.vexnum; x++) {
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
    }
};

// 无向图的邻接表
var g = new AdjacencyListGraph([], 0, 7, UDG);
g.addVertex('v1');
g.addVertex('v2');
g.addVertex('v3');
g.addVertex('v4');
g.addVertex('v5');

g.addArc(new ArcNode('v1'), new ArcNode('v2'));
g.addArc(new ArcNode('v1'), new ArcNode('v3'));
g.addArc(new ArcNode('v1'), new ArcNode('v4'));
g.addArc(new ArcNode('v2'), new ArcNode('v3'));
g.addArc(new ArcNode('v3'), new ArcNode('v4'));
g.addArc(new ArcNode('v3'), new ArcNode('v5'));
g.addArc(new ArcNode('v4'), new ArcNode('v5'));

console.log(g);

// 有向图的逆邻接表
var g = new AdjacencyListGraph([], 0, 7, DG);
g.addVertex('v1');
g.addVertex('v2');
g.addVertex('v3');
g.addVertex('v4');
g.addVertex('v5');

g.addArc(new ArcNode('v1'), new ArcNode('v2'));
g.addArc(new ArcNode('v1'), new ArcNode('v4'));
g.addArc(new ArcNode('v3'), new ArcNode('v2'));
g.addArc(new ArcNode('v3'), new ArcNode('v1'));
g.addArc(new ArcNode('v4'), new ArcNode('v3'));
g.addArc(new ArcNode('v3'), new ArcNode('v5'));
g.addArc(new ArcNode('v5'), new ArcNode('v4'));

console.log(g);

// 有向图的正邻接表
var g = new AdjacencyListGraph([], 0, 7, DG);
g.addVertex('v1');
g.addVertex('v2');
g.addVertex('v3');
g.addVertex('v4');
g.addVertex('v5');

g.addArc(new ArcNode('v2'), new ArcNode('v1'));
g.addArc(new ArcNode('v4'), new ArcNode('v1'));
g.addArc(new ArcNode('v2'), new ArcNode('v3'));
g.addArc(new ArcNode('v1'), new ArcNode('v3'));
g.addArc(new ArcNode('v3'), new ArcNode('v4'));
g.addArc(new ArcNode('v5'), new ArcNode('v3'));
g.addArc(new ArcNode('v4'), new ArcNode('v5'));

console.log(g);


/*
十字链表法

十字链表(Orthogonal List)是有向图的另一种链式存储结构，是将有向图的正邻接表和逆邻接表结合起来得到的一种链表。

在这种结构中，每条弧的弧头结点和弧尾结点都存放在链表中，并将弧结点分别组织到以弧尾结点为头(顶点)结点和以弧头结点为头(顶点)结点的链表中。

◆  data域：存储和顶点相关的信息；
◆ 指针域firstin：指向以该顶点为弧头的第一条弧所对应的弧结点；
◆ 指针域firstout：指向以该顶点为弧尾的第一条弧所对应的弧结点；
◆ 尾域tailvex：指示弧尾顶点在图中的位置；
◆ 头域headvex：指示弧头顶点在图中的位置；
◆ 指针域hlink：指向弧头相同的下一条弧；
◆ 指针域tlink：指向弧尾相同的下一条弧；
◆ Info域：指向该弧的相关信息；

从这种存储结构图可以看出，从一个顶点结点的firstout出发，沿表结点的tlink指针构成了正邻接表的链表结构，而从一个顶点结点的firstin出发，沿表结点的hlink指针构成了逆邻接表的链表结构。

 */

/**
 *
 * @param {Number} headVex 弧的头顶点的位置
 * @param {Number} tailVex 弧的尾顶点位置
 * @param {ArcBox} hLink 弧头相同的弧的链域
 * @param {ArcBox} tLink 弧尾相同的弧的链域
 * @param {*} info
 * @constructor
 */
function ArcBox(tailVex, headVex, hLink, tLink, info) {
    this.headVex = headVex || 0;
    this.tailVex = tailVex || 0;
    this.hLink = hLink || null;
    this.tLink = tLink || null;
    this.info = info || null;
}

/**
 *
 * @param {*} data
 * @param {ArcBox} firstIn 该顶点第一条入弧
 * @param {ArcBox} firstOut 该顶点第一条出弧
 * @constructor
 */
function OLVexNode(data, firstIn, firstOut) {
    this.data = data || null;
    this.firstIn = firstIn || null;
    this.firstOut = firstOut || null;
}

/**
 *
 * @param {Array | OLVexNode} xList 表头向量
 * @param {Number} vexnum 有向图的当前顶点数
 * @param {Number} arcnum 有向图的当前弧数
 * @constructor
 */
function OLGraph(xList, vexnum, arcnum) {
    this.xList = xList || [];
    this.vexnum = vexnum || 0;
    this.arcnum = arcnum || 0;
}
OLGraph.prototype = {
    constructor: OLGraph,

    locateVex: function (vp) {
        for (var i = 0; i < this.vexnum; i++) {
            if (this.xList[i].data === vp) return i;
        }

        return -1;
    },

    // 删除顶点
    deleteVertex: function (v) {
        var m = this.locateVex(v);

        if (m < 0) throw new Error('vertex not found!');

        var n = this.vexnum;
        var q, i, p;
        // 删除所有以v为头的边
        for (i = 0; i < n; i++) {
            // 如果待删除的边是头链上的第一个结点
            if (this.xList[i].firstIn.tailVex === m) {
                q = this.xList[i].firstIn;
                this.xList[i].firstIn = q.hLink;
                this.arcnum--;
            } else {
                for (p = this.xList[i].firstIn; p && p.hLink.tailVex !== m; p = p.hLink);
                if (p) {
                    q = p.hLink;
                    p.hLink = q.hLink;
                    this.arcnum--;
                }
            }
        }

        // 删除所有以v为尾的边
        for (i = 0; i < n; i++) {
            // 如果待删除的边是尾链上的第一个结点
            if (this.xList[i].firstOut.headVex === m) {
                q = this.xList[i].firstOut;
                this.xList[i].firstOut = q.tLink;
                this.arcnum--;
            } else {
                for (p = this.xList[i].firstOut; p && p.tLink.headVex !== m; p = p.tLink);
                if (p) {
                    q = p.tLink;
                    p.tLink = q.tLink;
                    this.arcnum--;
                }
            }
        }

        // 顺次用结点m之后的顶点取代前一个顶点
        for (i = m; i < n; i++) {
            // 修改表头向量
            this.xList[i] = this.xList[i + 1];
            for (p = this.xList[i].firstIn; p; p = p.hLink)
                p.headVex--;
            for (p = this.xList[i].firstOut; p; p = p.tLink)
                p.tailVex--;
        }

        this.vexnum--;
        return true;
    },

    createDG: function () {
        this.vexnum = prompt('Vexnum: ');
        this.arcnum = prompt('Arcnum: ');
        // IncInfo为0则各弧不含其他信息
        var incInfo = +prompt('IncInfo: ');

        // 输入顶点值
        for (var i = 0; i < this.vexnum; i++) {
            this.xList[i] = new OLVexNode(prompt('data: '), null, null);
        }

        for (var k = 0; k < this.arcnum; k++) {
            var v1 = prompt('v1: ');
            var v2 = prompt('v2: ');

            i = this.locateVex(v1);
            var j = this.locateVex(v2);

            if (i === -1 || j === -1) {
                alert('无此顶点，请重新输入!');
                k--;
                continue;
            }

            var p = new ArcBox(i, j, this.xList[j].firstIn, this.xList[i].firstOut, incInfo && prompt('info: '));
            this.xList[j].firstIn = this.xList[i].firstOut = p;
        }
    }
};

//var g = new OLGraph();
//g.createDG();
//console.log(g);


/*
邻接多重表

邻接多重表(Adjacency Multilist)是无向图的另一种链式存储结构。

邻接表是无向图的一种有效的存储结构，在无向图的邻接表中，一条边(v,w)的两个表结点分别初选在以v和w为头结点的链表中，很容易求得顶点和边的信息，但在涉及到边的操作会带来不便。

邻接多重表的结构和十字链表类似，每条边用一个结点表示；邻接多重表中的顶点结点结构与邻接表中的完全相同，而表结点包括六个域。

◆  Data域：存储和顶点相关的信息；
◆ 指针域firstedge：指向依附于该顶点的第一条边所对应的表结点；
◆ 标志域mark：用以标识该条边是否被访问过；
◆ ivex和jvex域：分别保存该边所依附的两个顶点在图中的位置；
◆ info域：保存该边的相关信息；
◆ 指针域ilink：指向下一条依附于顶点ivex的边；
◆ 指针域jlink：指向下一条依附于顶点jvex的边；

邻接多重表与邻接表的区别：
后者的同一条边用两个表结点表示，而前者只用一个表结点表示；除标志域外，邻接多重表与邻接表表达的信息是相同的，因此，操作的实现也基本相似。

 */

var UNVISITED = 0;
var VISITED = 1;

/**
 * 边的结点表示
 * @param {Number} mark 访问标记 0 -- 未访问  1 == 已访问
 * @param {Number} ivex 该边依附的两个顶点的位置
 * @param {Number} jvex 该边依附的两个顶点的位置
 * @param {EBox} ilink 分别指向依附这两个顶点的下一条边
 * @param {EBox} jlink 分别指向依附这两个顶点的下一条边
 * @param {*} info 该边信息
 * @constructor
 */
function EBox(mark, ivex, jvex, ilink, jlink, info) {
    this.mark = mark || UNVISITED;
    this.ivex = ivex || 0;
    this.jvex = jvex || 0;
    this.ilink = ilink || null;
    this.jlink = jlink || null;
    this.info = info || null;
}

/**
 * 顶点的结点表示
 * @param {*} data
 * @param {EBox} firstEdge 指向第一条依附该顶点的边
 * @constructor
 */
function AMLVexBox(data, firstEdge) {
    this.data = data || null;
    this.firstEdge = firstEdge || null;
}

/**
 *
 * @param {Array | AMLVexBox} adjMulist
 * @param {Number} vexnum
 * @param {Number} edgenum
 * @constructor
 */
function AMLGraph(adjMulist, vexnum, edgenum) {
    this.adjMulist = adjMulist || [];
    this.vexnum = vexnum || 0;
    this.edgenum = edgenum || 0;
}
AMLGraph.prototype = {
    constructor: AMLGraph,

    locateVex: function (v) {
        for (var i = 0; i < this.vexnum; i++) {
            if (this.adjMulist[i].data === v) return i;
        }
        return -1;
    },

    deleteArc: function (v, w) {
        var i = this.locateVex(v);
        var j = this.locateVex(w);

        if (i < 0 || j < 0) throw new Error('Vertex not found!');

        var p;
        // 在i链表中删除该边
        if (this.adjMulist[i].firstEdge.jvex === j) {
            this.adjMulist[i].firstEdge = this.adjMulist[i].firstEdge.ilink;
        } else {
            for (p = this.adjMulist[i].firstEdge; p && p.ilink.jvex !== j; p = p.ilink);
            if (!p) throw new Error('edge not found!');
            p.ilink = p.ilink.ilink;
        }

        // 在j链表中删除该边
        if (this.adjMulist[j].firstEdge.ivex === i) {
            this.adjMulist[j].firstEdge = this.adjMulist[j].firstEdge.jlink;
        } else {
            for (p = this.adjMulist[j].firstEdge; p && p.jlink.ivex !== i; p = p.jlink);
            if (!p) throw new Error('edge not found!');
            p.jlink = p.jlink.jlink;
        }

        this.edgenum--;
        return true;
    },

    createGraph: function () {
        var vexnum = +prompt('vexnum: ');
        this.vexnum = vexnum;
        var edgenum = +prompt('edgenum: ');
        this.edgenum = edgenum;

        for (var m = 0; m < vexnum; m++) {
            this.adjMulist[m] = new AMLVexBox(prompt('data: '), null);
        }

        for (m = 0; m < edgenum; m++) {
            var t = prompt('tailVex: ');
            var h = prompt('headVex: ');
            var i = this.locateVex(t);
            var j = this.locateVex(h);

            if (i < 0 || j < 0) {
                console.error('vertex not found! Try again:');
                m--;
                continue;
            }

            var p = new EBox(0, i, j, null, null);
            var q, r;

            // 插入i链表尾部
            if (!this.adjMulist[i].firstEdge) {
                this.adjMulist[i].firstEdge = p;
            } else {
                q = this.adjMulist[i].firstEdge;
                while (q) {
                    r = q;
                    if (q.ivex === i) q = q.ilink;
                    else q = q.jlink;
                }
                if (r.ivex === i) r.ilink = p;
                else r.jlink = p;
            }

            // 插入j链表尾部
            if (!this.adjMulist[j].firstEdge) {
                this.adjMulist[j].firstEdge = p;
            } else {
                q = this.adjMulist[j].firstEdge;
                while (q) {
                    r = q;
                    if (q.jvex === j) q = q.jlink;
                    else q = q.ilink;
                }
                if (r.jvex === j) r.jlink = p;
                else r.ilink = p;
            }
        }
    }
};

//var g = new AMLGraph();
//g.createGraph();
//console.log(g);


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
⑶：转⑴ ，直到和vi相邻接的所有顶点都被访问为止 ⑷ ：继续选取图中未被访问顶点vj作为起始顶点，转(1)，直到图中所有顶点都被访问为止。


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
    for (var i = 0; i < this.vexnum; i++) visited[i] = false;
    for (i = 0; i < this.vexnum; i++) {
        if (!visited[i]) dfs(this, i);
    }

    function dfs(graph, vertex) {
        visited[vertex] = true;
        visitFn(vertex);

        for (var j = 0; j < graph.vexnum; j++) {
            if ((graph.arcs[vertex][j] !== 0 || graph.arcs[vertex][j] !== Infinity)
                && !visited[j]) dfs(graph, j);
        }
    }
};

console.log('DFSTraverse: udn');
udn.DFSTraverse(function (v) {
    console.log(v);
});
console.log('DFSTraverse: dn');
dn.DFSTraverse(function (v) {
    console.log(v);
});


// 非递归
AdjacencyMatrixGraph.prototype.DFSTraverse_NonRecurse = function(visitFn){
    var visited = [];
    var stack = new Stack();
    // 访问标志数组初始化
    for (var i = 0; i < this.vexnum; i++) visited[i] = false;

    stack.push(0);
    visited[0] = true;
    visitFn(0);

    var vertex;
    while((vertex = stack.peek()) != null){
        for (var j = 0; j < this.vexnum; j++) {
            if ((this.arcs[vertex][j] !== 0 || this.arcs[vertex][j] !== Infinity)
                && !visited[j]) {
                visitFn(j);
                visited[j] = true;
                stack.push(j);
            } else stack.pop();
        }
    }
};

console.log('DFSTraverse_NonRecurse: udn');
udn.DFSTraverse_NonRecurse(function (v) {
    console.log(v);
});
console.log('DFSTraverse_NonRecurse: dn');
dn.DFSTraverse_NonRecurse(function (v) {
    console.log(v);
});

// 对邻接矩阵图作广度优先遍历
AdjacencyMatrixGraph.prototype.BFSTraverse = function (visitFn) {

};

AdjacencyMatrixGraph.prototype.BFSTraverse_NonRecurse = function (visitFn) {

};


AdjacencyListGraph.prototype.DFSTraverse = function(visitFn){

};

AdjacencyListGraph.prototype.DFSTraverse_NonRecurse = function(visitFn){

};

AdjacencyListGraph.prototype.BFSTraverse = function(visitFn){

};

AdjacencyListGraph.prototype.BFSTraverse_NonRecurse = function(visitFn){

};

