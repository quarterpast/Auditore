(function(){
  var Stream, StreamGenerator;
  Stream = require('stream');
  exports.StreamGenerator = StreamGenerator = (function(superclass){
    StreamGenerator.displayName = 'StreamGenerator';
    var CHUNK_SIZE, prototype = __extend(StreamGenerator, superclass).prototype, constructor = StreamGenerator;
    CHUNK_SIZE = 800;
    prototype.readable = true;
    prototype.paused = false;
    function StreamGenerator(){
      process.nextTick(__bind(this, 'tick'));
    }
    prototype.pause = function(){
      return this.paused = true;
    };
    prototype.resume = function(){
      this.paused = false;
      return process.nextTick(__bind(this, 'tick'));
    };
    prototype.normalise = function(it){
      return Math.floor((1 + it) * Math.pow(2, this.bytes * 8 - 1));
    };
    prototype.cursor = 0;
    prototype.soundoff = 0;
    prototype.off = 0;
    prototype.tick = function(){
      var l, r, _ref;
      _ref = this.generate(this.cursor++), l = _ref[0], r = _ref[1];
      l = this.normalise(l);
      r = this.normalise(r);
      if (this.off >= this.bytes * this.channels * CHUNK_SIZE) {
        this.emit('data', this.runningBuf);
        this.runningBuf.copy(this.soundBuf, this.soundoff);
        this.soundoff += this.runningBuf.length;
        this.runningBuf = new Buffer(this.bytes * this.channels * CHUNK_SIZE);
        this.off = 0;
      }
      this.runningBuf["writeUInt" + this.bytes * 8 + "LE"](l, this.off);
      this.off += this.bytes;
      this.runningBuf["writeUInt" + this.bytes * 8 + "LE"](r, this.off);
      this.off += this.bytes;
      if (this.cursor === this.samples) {
        this.emit('end', this.soundBuf);
      }
      if (!this.paused) {
        return process.nextTick(__bind(this, 'tick'));
      }
    };
    prototype.generate = function(i, out){
      return [Math.random(), Math.random()];
    };
    return StreamGenerator;
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
