(function(){
  var stream, WavOutput, fs, out, wav;
  stream = require('stream');
  exports.WavOutput = WavOutput = (function(superclass){
    WavOutput.displayName = 'WavOutput';
    var WAVE_FORMAT_PCM, prototype = __extend(WavOutput, superclass).prototype, constructor = WavOutput;
    function u32(i){
      return [i & 0xFF, i >> 8 & 0xFF, i >> 16 & 0xFF, i >> 24 & 0xFF];
    }
    function u16(i){
      return [i & 0xFF, i >> 8 & 0xFF];
    }
    WAVE_FORMAT_PCM = new Buffer('0001', 'hex');
    prototype.readable = true;
    function WavOutput(length, rate, channels, bytes){
      this.length = length != null ? length : 30;
      this.rate = rate != null ? rate : 44100;
      this.channels = channels != null ? channels : 2;
      this.bytes = bytes != null ? bytes : 2;
      this.samples = this.length * this.rate;
      this.pad = this.bytes * this.channels * this.samples % 2;
      this.head = new Buffer([].concat(0x52, 0x49, 0x46, 0x46, u32(4 + (8 + 16) + (8 + this.bytes * this.samples + this.pad)), 0x57, 0x41, 0x56, 0x45, 0x66, 0x6d, 0x74, 0x20, u32(16), u16(1), u16(this.channels), u32(this.rate), u32(this.rate * this.bytes * this.channels), u16(this.bytes * this.channels), u16(8 * Math.ceil(this.bytes)), 0x64, 0x61, 0x74, 0x61, u32(this.bytes * this.channels * this.samples)));
    }
    prototype.readable = true;
    prototype.resume = function(){
      var i;
      this.emit('data', this.head);
      return this.emit('data', new Buffer((function(){
        var _to, _results = [];
        for (i = 0, _to = this.samples; i <= _to; ++i) {
          _results.push(this.generate(i));
        }
        return _results;
      }.call(this))));
    };
    prototype.generate = function(it){
      if (it === this.samples) {
        console.log(it);
      }
      return Math.floor(Math.random() * Math.pow(2, this.bytes));
    };
    return WavOutput;
  }(stream));
  if (module === require.main) {
    fs = require('fs');
    out = fs.createWriteStream("test.wav");
    wav = new WavOutput;
    wav.pipe(out);
    wav.on('end', process.exit);
    wav.resume();
  }
  function __extend(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
}).call(this);
