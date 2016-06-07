describe('SString tests', function(){
  var a = new SString();
  var b = new SString();

  it('should concat without break strings', function(){
    for(var i = 0; i < 4; i++){
      a[i + 1] = i + '';
      b[i + 1] = i + '';
    }
    a[0] = b[0] = 4;

    var t = a.concat(b);
    console.log(a);
    console.log(b);
    expect(t[0]).toBe(8);
    expect(t + '').toBe('01230123');
  });

  it('should break strings of b', function(){
    for(var i = 0; i < 7; i++){
      b[i + 1] = i + '';
    }
    b[0] = 7;

    var t = a.concat(b);
    console.log(a);
    console.log(b);
    expect(t[0]).toBe(10);
    expect(t + '').toBe('0123012345');
  });

  it('should break strings of a', function(){
    for(var i = 4; i < 10; i++){
      a[i + 1] = i + '';
    }
    a[0] = 10;

    var t = a.concat(b);
    console.log(a);
    console.log(b);
    expect(t[0]).toBe(10);
    expect(t + '').toBe('0123456789');
  });

  it('should get substring', function(){
    console.log(a);
    var t = a.substring(1, 10);
    expect(t + '').toBe('0123456789');

    t = a.substring(3, 5);
    expect(t + '').toBe('23456');
  });
});