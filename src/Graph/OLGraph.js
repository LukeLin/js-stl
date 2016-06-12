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
export default function OLGraph(xList, vexnum, arcnum) {
    this.xList = xList || [];
    this.vexnum = vexnum || 0;
    this.arcnum = arcnum || 0;
}
OLGraph.prototype = {
    constructor: OLGraph,

    locateVex: function (vp) {
        for (var i = 0; i < this.vexnum; ++i) {
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
        for (i = 0; i < n; ++i) {
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
        for (i = 0; i < n; ++i) {
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
        for (i = m; i < n; ++i) {
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
        for (var i = 0; i < this.vexnum; ++i) {
            this.xList[i] = new OLVexNode(prompt('data: '), null, null);
        }

        for (var k = 0; k < this.arcnum; ++k) {
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
    },

    /**
     * 求有向图的强连通分量
     */
    getSGraph: function () {
        var visited = [];
        var finished = [];
        var count = 0;

        for (var i = 0; i < this.vexnum; ++i) visited[i] = false;
        // 第一次深度优先遍历建立finished数组
        for (i = 0; i < this.vexnum; ++i) {
            if (!visited[i]) dfs1(this, i);
        }
        // 清空visited数组
        for (i = 0; i < this.vexnum; ++i) visited[i] = false;
        // 第二次逆向的深度优先遍历
        for (var len = this.vexnum - 1; len >= 0; --len) {
            i = finished[i];
            if (!visited[i]) dfs2(this, i);
        }

        function dfs1(graph, v) {
            visited[v] = true;
            for (var p = graph.xList[v].firstOut; p; p = p.tLink) {
                var w = p.headVex;
                if (!visited[w]) dfs1(graph, w);
            }
            finished[++count] = v;
        }

        function dfs2(graph, v) {
            visited[v] = true;
            console.log('%d', v);
            for (var p = graph.xList[v].firstIn; p; p = p.hLink) {
                var w = p.tailVex;
                if (!visited[w]) dfs2(graph, w);
            }
        }
    }
};

//var g = new OLGraph();
//g.createDG();
//console.log(g);


/*
 有向图的强连通分量

 对于有向图，在其每一个强连通分量中，任何两个顶点都是可达的。 V∈G，与V可相互到达的所有顶点就是包含V的强连通分量的所有顶点。

 设从V可到达 (以V为起点的所有有向路径的终点)的顶点集合为T1(G)，而到达V (以V为终点的所有有向路径的起点)的顶点集合为T2(G)，则包含V的强连通分量的顶点集合是： T1(G)∩T2(G) 。

 求有向图G的强连通分量的基本步骤是：
 ⑴ 对G进行深度优先遍历，生成G的深度优先生成森林T。
 ⑵  对森林T的顶点按中序遍历顺序进行编号。
 ⑶  改变G中每一条弧的方向，构成一个新的有向图G’。
 ⑷  按⑵中标出的顶点编号，从编号最大的顶点开始对G’进行深度优先搜索，得到一棵深度优先生成树。若一次完整的搜索过程没有遍历G’的所有顶点，则从未访问的顶点中选择一个编号最大的顶点，由它开始再进行深度优先搜索，并得到另一棵深度优先生成树。在该步骤中，每一次深度优先搜索所得到的生成树中的顶点就是G的一个强连通分量的所有顶点。
 ⑸  重复步骤⑷ ，直到G’中的所有顶点都被访问。

 在算法实现时，建立一个数组in_order[n]存放深度优先生成森林的中序遍历序列。对每个顶点v，在调用DFS函数结束时，将顶点依次存放在数组in_order[n]中。图采用十字链表作为存储结构最合适。

 */

// todo to be tested
OLGraph.prototype.connected_DG = function () {
    var visited = [];
    var in_order = [];
    var count = 0;

    for (var i = 0; i < this.vexnum; ++i) visited[i] = false;
    // 对图正向遍历
    for (i = 0; i < this.vexnum; ++i) {
        if (!visited[i]) {
            dfs(this, i, in_order);
        }
    }

    for (i = 0; i < this.vexnum; ++i) visited[i] = false;
    // 对图逆向遍历
    var k = 1;
    for (var j = this.vexnum - 1; j >= 0; --j) {
        var v = in_order[j];
        if (!visited[v]) {
            console.log('第' + k++ + '个连通分量顶点');
            rev_dfs(this, v);
        }
    }

    function dfs(graph, v) {
        visited[v] = true;

        for (var p = graph.xList[v].firstOut; p; p = p.tLink) {
            if (!visited[p.headVex]) {
                dfs(graph, p.headVex);
            }
        }

        in_order[count++] = v;
    }

    function rev_dfs(graph, v) {
        visited[v] = true;
        console.log('顶点：' + v);

        for (var p = graph.xList[v].firstIn; p; p = p.hLink) {
            if (!visited[p.tailVex]) {
                rev_dfs(graph, p.tailVex);
            }
        }
    }
};