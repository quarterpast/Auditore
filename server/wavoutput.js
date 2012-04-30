(function(){
  var WavOutput;
  exports.WavOutput = WavOutput = (function(superclass){
    WavOutput.displayName = 'WavOutput';
    var RIFF, WAVE, fmt, data, WAVE_FORMAT_PCM, prototype = __extend(WavOutput, superclass).prototype, constructor = WavOutput;
    RIFF = new Buffer('RIFF', 'ascii');
    WAVE = new Buffer('WAVE', 'ascii');
    fmt = new Buffer('fmt ', 'ascii');
    data = new Buffer('data', 'ascii');
    function NumberBuf(num, size){
      var out;
      size == null && (size = 4);
      out = new Buffer(size);
      out["writeInt" + size * 8 + "LE"](num);
      return out;
    }
    WAVE_FORMAT_PCM = new Buffer('0001', 'hex');
    function WavOutput(length, rate, channels, bytes){
      var buf;
      this.length = length != null ? length : 30;
      this.rate = rate != null ? rate : 44100;
      this.channels = channels != null ? channels : 2;
      this.bytes = bytes != null ? bytes : 2;
      this.samples = this.length * this.rate * this.samples;
      this.pad = this.bytes * this.channels * this.samples % 2;
      for (buf in [RIFF, NumberBuf(4 + 24 + 8 + this.bytes * this.samples + this.pad), WAVE, fmt, NumberBuf(16), WAVE_FORMAT_PCM, NumberBuf(this.channels, 2), NumberBuf(this.rate), NumberBuf(this.rate * this.bytes * this.channels), NumberBuf(this.bytes * this.channels, 2), NumberBuf(8 * Math.ceil(this.bytes, 2)), data, NumberBuf(this.bytes * this.channels * this.samples)]) {
        this.emit('data', buf);
      }
    }
    prototype.resume = function(){
      var i, _to, _results = [];
      for (i = 0, _to = this.samples; i <= _to; ++i) {
        _results.push(this.emit('data', NumberBuf(this.generate(i, this.bytes))));
      }
      return _results;
    };
    prototype.generate = function(){
      return Math.random() * Math.pow(2, this.bytes * 8);
    };
    return WavOutput;
  }(process.EventEmitter));
  function __extend(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
}).call(this);
