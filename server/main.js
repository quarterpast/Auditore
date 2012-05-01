(function(){
  var Serve, Static, Redirect, Template, Reader, WavOutput, conf, app, _ref;
  _ref = require('sabor'), Serve = _ref.Serve, Static = _ref.Static, Redirect = _ref.Redirect, Template = _ref.Template;
  Reader = require('q-io').Reader;
  WavOutput = require("./wavoutput").WavOutput;
  conf = __import({
    port: 8002
  }, Coco.run("return " + process.argv.slice(2).join(" ") || "{}", {
    bare: true
  }));
  app = Serve({
    "/": function(req){
      return Template("app/home.eco").render();
    },
    "/sound": function(){
      return Reader(new WavOutput);
    },
    "/favicon.ico": function(){
      return Redirect("client/favicon.png");
    },
    "/static/(.*)": Static.dir("client")
  });
  app.listen(conf.port, conf.host);
  console.log("Listening on " + (conf.host || '*') + ":" + conf.port);
  function __import(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
