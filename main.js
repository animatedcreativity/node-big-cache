module.exports = exports = function(config) {
  var sanitize = require("node-sanitize-options");
  var random = require("random-key");
  var fileJson = require("node-file-json");
  var fs = require("fs");
  config = sanitize.options(config, {
    folder: "node-big-cache",
    jsonFile: "node-big-cache-json"
  });
  var json = new fileJson();
  json.load(config.jsonFile + ".json");
  if (fs.existsSync(config.folder) === false) {
    fs.mkdirSync(config.folder);
  }
  var cache = {
    list: function() {
      return JSON.parse(JSON.stringify(json.data));
    },
    get: function(key) {
      if (typeof key === "undefined" || !key) {
        console.log("Key is not provided.");
        return false;
      }
      if (typeof json.data[key] !== "undefined") {
        var file = config.folder + "/" + json.data[key];
        if (fs.existsSync(file) === true) {
          return fs.readFileSync(file, "utf-8");
        }
      }
    },
    set: function(key, data) {
      if (typeof key === "undefined" || !key) {
        console.log("Key is not provided.");
        return false;
      }
      if (typeof json.data[key] === "undefined" || !json.data[key]) {
        json.data[key] = random.generate(32) + ".txt";
        json.save();
      }
      if (typeof json.data[key] !== "undefined") {
        var file = config.folder + "/" + json.data[key];
        fs.writeFileSync(file, data, "utf-8");
      }
    },
    remove: function(key) {
      if (typeof key === "undefined" || !key) {
        console.log("Key is not provided.");
        return false;
      }
      if (typeof json.data[key] !== "undefined") {
        var file = config.folder + "/" + json.data[key];
        if (fs.existsSync(file) === true) {
          fs.unlinkSync(file);
        }
        delete json.data[key];
        json.save();
      }
    },
    clear: function() {
      var list = cache.list();
      for (var key in list) {
        cache.remove(key);
      }
    }
  };
  return cache;
};