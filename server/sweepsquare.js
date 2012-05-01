(function(){
  var Square, SweepSquare;
  Square = require("./square").Square;
  exports.SweepSquare = SweepSquare = (function(superclass){
    SweepSquare.displayName = 'SweepSquare';
    var prototype = __extend(SweepSquare, superclass).prototype, constructor = SweepSquare;
    function SweepSquare(){
      superclass.apply(this, arguments);
    }
    prototype.generate = function(t){
      this.work = 0.1 * this.rawphase / Math.PI % 2;
      return superclass.prototype.generate.apply(this, arguments);
    };
    return SweepSquare;
  }(Square));
  function __extend(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
}).call(this);
