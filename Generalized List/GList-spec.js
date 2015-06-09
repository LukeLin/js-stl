describe('GList specs', function(){

    var node = new GLNode();

    it('createGList', function(){
        node.createGList('((), (ea), (sa, (bd, ce, dh)))');
    });

    it('toString', function(){
        expect(node + '').toBe('((), (ea), (sa, (bd, ce, dh)))');
    });

    it('depth', function(){
        expect(node.depth()).toBe();
    });

    it('reverse', function(){
        console.log(node + '');
        node.reverse();
        console.log(node + '');
    });

    it('copyList', function(){
        var node2 = new GLNode();
        node.copyList(node2);
        console.log(GLNode.equal(node, node2));
    });

    it('orderPrint', function(){
        console.log(node + '');
        console.time('A');
        node.orderPrint();
        console.timeEnd('A');
    });

    it('orderPrint2', function(){
        console.time('B');
        node.orderPrint2();
        console.timeEnd('B');
    });
});