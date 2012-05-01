(function(){
  var Stream, WavOutput;
  Stream = require('stream');
  exports.WavOutput = WavOutput = (function(superclass){
    WavOutput.displayName = 'WavOutput';
    var prototype = __extend(WavOutput, superclass).prototype, constructor = WavOutput;
    function u32(i){
      return [i & 0xFF, i >> 8 & 0xFF, i >> 16 & 0xFF, i >> 24 & 0xFF];
    }
    function u16(i){
      return [i & 0xFF, i >> 8 & 0xFF];
    }
    prototype.readable = true;
    prototype.writable = true;
    function WavOutput(length, rate, channels, bytes){
      var _this = this;
      this.length = length != null ? length : 120;
      this.rate = rate != null ? rate : 44100;
      this.channels = channels != null ? channels : 2;
      this.bytes = bytes != null ? bytes : 2;
      this.on('pipe', function(src){
        _this.head = new Buffer([].concat(0x52, 0x49, 0x46, 0x46, u32(src.byteLength), 0x57, 0x41, 0x56, 0x45, 0x66, 0x6d, 0x74, 0x20, u32(16), u16(1), u16(src.channels), u32(src.rate), u32(src.rate * src.bytes * src.channels), u16(src.bytes * src.channels), u16(8 * Math.ceil(src.bytes)), 0x64, 0x61, 0x74, 0x61, u32(src.bytes * src.channels * src.samples)));
        return _this.emit('data', _this.head);
      });
    }
    prototype.end = function(chunk){
      if (chunk != null) {
        write.apply(this, arguments);
      }
      return this.emit('end');
    };
    prototype.write = function(chunk, enc){
      if (enc != null && chunk instanceof String) {
        chunk = new Buffer(chunk, enc);
      }
      this.emit('data', chunk);
      return true;
    };
    return WavOutput;
  }(Stream));
  function __extend(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
}).call(this);
