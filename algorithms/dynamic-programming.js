/**
 * Created by Luke on 2015/3/17.
 */

// unoptimized version
// 两矩阵相乘
function matrixMultiply(a, b){
    var c = [];
    var ra = a[0].length;
    var ca = a.length;
    var rb = b[0].length;
    var cb = b.length;

    if(ca !== rb) throw new Error('matrix can\'t be multiplied!');

    for(var i = 0; i < ra; ++i){
        if(!c[i]) c[i] = [];
        for(var j = 0; j < cb; ++j){
            var sum = a[i][0] * b[0][j];

            for(var k = 1; k < ca; ++k)
                sum += a[i][k] * b[k][j];

            c[i][j] = sum;
        }
    }

    return c;
}


var m1 = [
    [0, 0, 0, 0],
    [0, 3, 0, 5],
    [0, 0, -1, 0],
    [0, 2, 0, 0]
];
var m2 = [
    [0, 0, 0, 0],
    [0, 0, 2, 0],
    [0, 1, 0, 0],
    [0, -2, 4, 0]
];
console.log(matrixMultiply(m2, m1));

/*
[ [ 0, 0, 0, 0 ],
  [ 0, 0, -2, 0 ],
  [ 0, 3, 0, 5 ],
  [ 0, -6, -4, -10 ] ]
 */