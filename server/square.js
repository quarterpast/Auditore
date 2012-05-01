(function(){
  var Phase, twopi, Square, _ref;
  _ref = require("./phase"), Phase = _ref.Phase, twopi = _ref.twopi;
  exports.Square = Square = (function(superclass){
    Square.displayName = 'Square';
    var prototype = __extend(Square, superclass).prototype, constructor = Square;
    function Square(A, f, work){
      this.A = A;
      this.f = f;
      this.work = work != null ? work : 1;
      superclass.call(this);
    }
    prototype.rawphase = 0;
    prototype.phase = 0;
    prototype.generate = function(t){
      var y;
      superclass.prototype.generate.apply(this, arguments);
      y = this.phase < this.work * Math.PI
        ? this.A
        : -this.A;
      return [y, y];
    };
    return Square;
  }(Phase));
  function __extend(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
}).call(this);
