(function(){
  var Stream, WavOutput;
  Stream = require('stream');
  exports.WavOutput = WavOutput = (function(superclass){
    WavOutput.displayName = 'WavOutput';
    var CHUNK_SIZE, prototype = __extend(WavOutput, superclass).prototype, constructor = WavOutput;
    function u32(i){
      return [i & 0xFF, i >> 8 & 0xFF, i >> 16 & 0xFF, i >> 24 & 0xFF];
    }
    function u16(i){
      return [i & 0xFF, i >> 8 & 0xFF];
    }
    CHUNK_SIZE = 800;
    prototype.readable = true;
    function WavOutput(length, rate, channels, bytes){
      var _this = this;
      this.length = length != null ? length : 30;
      this.rate = rate != null ? rate : 44100;
      this.channels = channels != null ? channels : 2;
      this.bytes = bytes != null ? bytes : 2;
      this.samples = this.length * this.rate;
      this.runningBuf = new Buffer(this.bytes * this.channels * CHUNK_SIZE);
      this.pad = this.bytes * this.channels * this.samples % 2;
      this.byteLength = 4 + (8 + 16) + (8 + this.bytes * this.channels * this.samples + this.pad);
      this.head = new Buffer([].concat(0x52, 0x49, 0x46, 0x46, u32(4 + (8 + 16) + (8 + this.bytes * this.channels * this.samples + this.pad)), 0x57, 0x41, 0x56, 0x45, 0x66, 0x6d, 0x74, 0x20, u32(16), u16(1), u16(this.channels), u32(this.rate), u32(this.rate * this.bytes * this.channels), u16(this.bytes * this.channels), u16(8 * Math.ceil(this.bytes)), 0x64, 0x61, 0x74, 0x61, u32(this.bytes * this.channels * this.samples)));
      process.nextTick(function(){
        return _this.emit('data', _this.head);
      });
      process.nextTick(__bind(this, 'tick'));
    }
    prototype.headless = true;
    prototype.readable = true;
    prototype.paused = false;
    prototype.cursor = 0;
    prototype.off = 0;
    prototype.pause = function(){
      return this.paused = true;
    };
    prototype.resume = function(){
      this.paused = false;
      return process.nextTick(__bind(this, 'tick'));
    };
    prototype.tick = function(){
      var _this = this;
      return this.generate(this.cursor++, function(it){
        if (_this.off >= _this.bytes * _this.channels * CHUNK_SIZE) {
          _this.emit('data', _this.runningBuf);
          _this.runningBuf = new Buffer(_this.bytes * _this.channels * CHUNK_SIZE);
          _this.off = 0;
        }
        _this.runningBuf["writeUInt" + _this.bytes * 8 + "LE"](it, _this.off);
        _this.off += _this.bytes;
        if (_this.cursor === _this.samples * _this.channels) {
          _this.emit('end');
        }
        if (!_this.paused) {
          return process.nextTick(__bind(_this, 'tick'));
        }
      });
    };
    prototype.generate = function(i, out){
      return out(Math.floor(Math.random() * Math.pow(2, this.bytes * 8)));
    };
    return WavOutput;
  }(Stream));
  function __extend(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function __bind(obj, key){
    return function(){ return obj[key].apply(obj, arguments) };
  }
}).call(this);
