(function(){
  var Serve, Static, Redirect, Template, Reader, WavOutput, SweepSquare, Coco, cluster, os, conf, cpu, app, _ref, _i, _len;
  _ref = require('sabor'), Serve = _ref.Serve, Static = _ref.Static, Redirect = _ref.Redirect, Template = _ref.Template;
  Reader = require('q-io').Reader;
  WavOutput = require("./wavoutput").WavOutput;
  SweepSquare = require("./sweepsquare").SweepSquare;
  Coco = require('coco');
  cluster = require('cluster');
  os = require('os');
  conf = __import({
    port: 8002
  }, Coco.run("return " + process.argv.slice(2).join(" ") || "{}", {
    bare: true
  }));
  if (cluster.isMaster) {
    for (_i = 0, _len = (_ref = os.cpus()).length; _i < _len; ++_i) {
      cpu = _ref[_i];
      cluster.fork();
    }
  } else {
    app = Serve({
      "/": function(req){
        return Template("app/home.eco").render();
      },
      "/sound": function(req, length){
        var wav;
        wav = new SweepSquare(0.5, 440);
        return {
          body: Reader(wav),
          status: 200,
          headers: {
            'content-type': "audio/wave",
            'content-length': wav.byteLength
          }
        };
      },
      "/favicon.ico": function(){
        return Redirect("client/favicon.png");
      },
      "/static/(.*)": Static.dir("client")
    });
    app.listen(conf.port, conf.host);
    console.log(process.pid + " listening on " + (conf.host || '*') + ":" + conf.port);
  }
  function __import(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
