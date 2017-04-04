import Queue from './Queue.js';

// 类似广度优先遍历
function repaintColor(matrix, i, j, color) {
    let old = matrix[i][j];
    let queue = new Queue();
    let m = matrix.length - 1;
    let n = matrix[0].length - 1;

    queue.enQueue({ x: i, y: j });

    while (queue.rear) {
        let a = queue.deQueue();
        let x = a.x;
        let y = a.y;

        if (x >= 1) setColor(x - 1, y);
        if (y >= 1) setColor(x, y - 1);
        if (x < m) setColor(x + 1, y);
        if (y < n) setColor(x, y + 1);
    }

    function setColor(x, y) {
        if (matrix[x][y] === old) {
            matrix[x][y] = color;
            queue.enQueue({ x: x, y: y });
        }
    }
}

let matrix = [];

for (let i = 0; i < 8; i++) {
    matrix[i] = [];
    for (let j = 0; j < 8; j++) {
        matrix[i][j] = 0;
    }
}

repaintColor(matrix, 4, 5, 1);
console.log(matrix);
