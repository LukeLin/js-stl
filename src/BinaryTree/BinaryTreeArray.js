/**
 * 二叉树的顺序存储结构
 */

// 顺序存储结构的遍历
export function preOrderRecursive(tree, x, visit) {
    visit(tree[x]);
    if (tree[2 * x + 1]) preOrderRecursive(tree, 2 * x + 1, visit);
    if (tree[2 * x + 2]) preOrderRecursive(tree, 2 * x + 2, visit);
};

export function inOrderRecursive(tree, x, visit) {
    if (tree[2 * x + 1]) inOrderRecursive(tree, 2 * x + 1, visit);
    visit(tree[x]);
    if (tree[2 * x + 2]) inOrderRecursive(tree, 2 * x + 2, visit);
}

export function postOrderRecursive(tree, x, visit) {
    if (tree[2 * x + 1]) postOrderRecursive(tree, 2 * x + 1, visit);
    if (tree[2 * x + 2]) postOrderRecursive(tree, 2 * x + 2, visit);
    visit(tree[x]);
}

let tree = [1, 2, 3, 4, 5, , 6, , , 7];

console.log('preOrder:');
preOrderRecursive(tree, 0, (value) => {
    console.log(value);
});

console.log('inOrder:');
inOrderRecursive(tree, 0, (value) => {
    console.log(value);
});

console.log('postOrder:');
postOrderRecursive(tree, 0, (value) => {
    console.log(value);
});
