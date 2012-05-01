(function(){
  var WavOutput, Sine;
  WavOutput = require("./wavoutput").WavOutput;
  exports.Sine = Sine = (function(superclass){
    Sine.displayName = 'Sine';
    var prototype = __extend(Sine, superclass).prototype, constructor = Sine;
    function Sine(l, A, f){
      this.A = A;
      this.f = f;
      superclass.call(this, l);
    }
    prototype.phase = 0;
    prototype.generate = function(t, out){
      var y;
      y = this.A * Math.sin(this.phase);
      this.phase += 2 * Math.PI * this.f / this.rate;
      return out(s, s);
    };
    return Sine;
  }(WavOutput));
  function __extend(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
}).call(this);
