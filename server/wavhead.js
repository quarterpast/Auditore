(function(){
  exports.WavHead = function(src){
    function u32(i){
      return [i & 0xFF, i >> 8 & 0xFF, i >> 16 & 0xFF, i >> 24 & 0xFF];
    }
    function u16(i){
      return [i & 0xFF, i >> 8 & 0xFF];
    }
    return new Buffer([0x52, 0x49, 0x46, 0x46, u32(src.byteLength), 0x57, 0x41, 0x56, 0x45, 0x66, 0x6d, 0x74, 0x20, u32(16), u16(1), u16(src.channels), u32(src.rate), u32(src.rate * src.bytes * src.channels), u16(src.bytes * src.channels), u16(8 * Math.ceil(src.bytes)), 0x64, 0x61, 0x74, 0x61, u32(src.bytes * src.channels * src.samples)]);
  };
}).call(this);
