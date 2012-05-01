(function(){
  var WavOutput, Sine;
  WavOutput = require("./wavoutput").WavOutput;
  exports.Sine = Sine = (function(superclass){
    Sine.displayName = 'Sine';
    var prototype = __extend(Sine, superclass).prototype, constructor = Sine;
    function Sine(){
      superclass.apply(this, arguments);
    }
    prototype.generate = function(t, out){
      var s;
      s = Math.floor((1 + Math.sin(t / 100)) * this.amplitude / 8);
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
