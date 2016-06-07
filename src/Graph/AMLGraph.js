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

const UNVISITED = 0;
const VISITED = 1;


class EBox {
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
    constructor(mark, ivex, jvex, ilink, jlink, info){
        this.mark = mark || UNVISITED;
        this.ivex = ivex || 0;
        this.jvex = jvex || 0;
        this.ilink = ilink || null;
        this.jlink = jlink || null;
        this.info = info || null;
    }
}

class AMLVexBox {
    /**
     * 顶点的结点表示
     * @param {*} data
     * @param {EBox} firstEdge 指向第一条依附该顶点的边
     * @constructor
     */
    constructor(data, firstEdge){
        this.data = data || null;
        this.firstEdge = firstEdge || null;
    }
}

export default class AMLGraph {
    /**
     *
     * @param {Array | AMLVexBox} adjMulist
     * @param {Number} vexnum
     * @param {Number} edgenum
     * @constructor
     */
    constructor(adjMulist, vexnum, edgenum){
        this.adjMulist = adjMulist || [];
        this.vexnum = vexnum || 0;
        this.edgenum = edgenum || 0;
    }

    locateVex (v) {
        for (var i = 0; i < this.vexnum; ++i) {
            if (this.adjMulist[i].data === v) return i;
        }
        return -1;
    }

    deleteArc(v, w) {
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
    }

    createGraph() {
        var vexnum = +prompt('vexnum: ');
        this.vexnum = vexnum;
        var edgenum = +prompt('edgenum: ');
        this.edgenum = edgenum;

        for (var m = 0; m < vexnum; ++m) {
            this.adjMulist[m] = new AMLVexBox(prompt('data: '), null);
        }

        for (m = 0; m < edgenum; ++m) {
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
}

//var g = new AMLGraph();
//g.createGraph();
//console.log(g);
