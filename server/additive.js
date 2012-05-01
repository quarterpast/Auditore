(function(){
  var WavOutput, Sine, Additive, __slice = [].slice;
  WavOutput = require("./wavoutput").WavOutput;
  Sine = require("./sine").Sine;
  exports.Additive = Additive = (function(superclass){
    Additive.displayName = 'Additive';
    var prototype = __extend(Additive, superclass).prototype, constructor = Additive;
    function Additive(){
      var osc, a, f, sine, _i, _len, _ref;
      osc = __slice.call(arguments);
      this.oscillators = [];
      for (_i = 0, _len = osc.length; _i < _len; ++_i) {
        _ref = osc[_i], a = _ref[0], f = _ref[1];
        sine = new Sine(a, f);
        sine.pause();
        this.oscillators.push(sine);
      }
      superclass.call(this);
    }
    prototype.generate = function(i){
      var r, l, osc, lo, ro, _i, _ref, _len, _ref2;
      l = r = 0;
      for (_i = 0, _len = (_ref = this.oscillators).length; _i < _len; ++_i) {
        osc = _ref[_i];
        _ref2 = osc.generate(i), lo = _ref2[0], ro = _ref2[1];
        l += lo / this.oscillators.length;
        r += ro / this.oscillators.length;
      }
      return [l, r];
    };
    return Additive;
  }(WavOutput));
  function __extend(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
}).call(this);
