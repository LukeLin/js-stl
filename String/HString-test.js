
describe('HString tests', function(){
  var s = new HString();
  var t = new HString();

  it('should assign chars', function(){
    s.strAssign('hello world!');
    expect(s + '').toBe('hello world!');

    t.strAssign('jesus ');
    expect(t + '').toBe('jesus ');
  });

  it('should insert string into s', function(){
    s.strInsert(7, t);
    expect(s + '').toBe('hello jesus world!');
  });

  it('should concat string', function(){
    var ret = s.concat(t);
    expect(ret + '').toBe('hello jesus world!jesus ');
  });

  it('should get substring', function(){
    var ret = s.substring(0);
    expect(ret + '').toBe('hello jesus world!');

    ret = s.substring(5, 13);
    expect(ret + '').toBe(' jesus world!');

    ret = s.substring(3, 8);
    expect(ret + '').toBe('lo jesus');
  });
});