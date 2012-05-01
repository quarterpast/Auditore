(function(){
  var WavOutput, twopi, Phase;
  WavOutput = require("./wavoutput").WavOutput;
  exports.twopi = twopi = 2 * Math.PI;
  exports.Phase = Phase = (function(superclass){
    Phase.displayName = 'Phase';
    var prototype = __extend(Phase, superclass).prototype, constructor = Phase;
    prototype.rawphase = 0;
    prototype.phase = 0;
    function Phase(){
      superclass.apply(this, arguments);
    }
    prototype.generate = function(){
      this.rawphase = this.phase += twopi * this.f / this.rate;
      if (this.phase > twopi) {
        this.phase -= twopi;
      }
      return [0, 0];
    };
    return Phase;
  }(WavOutput));
  function __extend(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
}).call(this);
