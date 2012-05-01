(function(){
  var Phase, twopi, Sine, _ref;
  _ref = require("./phase"), Phase = _ref.Phase, twopi = _ref.twopi;
  exports.Sine = Sine = (function(superclass){
    Sine.displayName = 'Sine';
    var prototype = __extend(Sine, superclass).prototype, constructor = Sine;
    function Sine(A, f){
      this.A = A;
      this.f = f;
      superclass.call(this);
    }
    prototype.generate = function(t){
      var y;
      y = this.A * Math.sin(this.phase);
      superclass.prototype.generate.apply(this, arguments);
      return [y, y];
    };
    return Sine;
  }(Phase));
  function __extend(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
}).call(this);
