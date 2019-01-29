/**
 * 有三个容器分别是三升、五升和八升的水桶，其中容积为八升的水桶装满了水，其余两桶为空。水桶没有刻度，除这三个桶外不能使用其它容器，将8升水等分为两份4升的水。
 */
(function () {
    var FullBacket = [8, 5, 3] //桶的最大容量
    var states = [
        [8, 0, 0]
    ]; //状态队列，js的数组已经已经有队列和堆栈的支持

    // 检测倒水操作是否可行
    function canTakeDumpAction(curr, from, to) {
        if (from >= 0 && from < 3 && to >= 0 && to < 3) {
            if (from != to && curr[from] > 0 && curr[to] < FullBacket[to]) {
                return true;
            }
        }
        return false;
    }

    // 倒水操作
    function dumpWater(curr, from, to) {
        var next = curr.slice(); //js对象为引用传值，这里要复制一份
        var dump_water = FullBacket[to] - curr[to] > curr[from] ? curr[from] : FullBacket[to] - curr[to] //倒水量的计算
        next[from] -= dump_water;
        next[to] += dump_water;
        return next;
    }

    function isStateExist(state) {
        for (var i = 0; i < states.length; i++) {
            if (state[0] == states[i][0] && state[1] == states[i][1] && state[2] == states[i][2]) {
                return true;
            }
        }
        return false;
    }

    (function searchState(states) {
        var curr = states[states.length - 1];
        if (curr[0] == 4 && curr[1] == 4) { //找到正确解
            var rs = ''
            states.forEach(function (al) {
                rs += al.join(',') + ' -> ';
            });
            console.log(rs.substr(0, rs.length - 4))
        }

        for (var j = 0; j < 3; j++) { //所有的倒水方案即为桶编号的全排列
            for (var i = 0; i < 3; i++) {
                if (canTakeDumpAction(curr, i, j)) {
                    var next = dumpWater(curr, i, j);
                    if (!isStateExist(next)) { //找到新状态
                        states.push(next);
                        searchState(states);
                        states.pop();
                    }
                }
            }
        }
    })(states);
})();