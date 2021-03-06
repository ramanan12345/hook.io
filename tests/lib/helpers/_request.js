process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

var parseJSON = require('./parseJSON');
var request = require('request');
var colors = require('colors');
module['exports'] = function _request (opts, cb) {
  opts.headers = opts.headers || {};
  var data = { uri: opts.uri, json: opts.json, qs: opts.qs, form: opts.form, method: opts.method, headers: opts.headers };
  if (opts.json) {
    //data.body = opts.json;
    //data.json = true;
  }
  request(data, function (err, res) {
    if (err) {
      return cb(err);
    }
    var json;
    if (typeof res.body === "object") {
      json = res.body
    } else {
      json = parseJSON(res.body);
    }
    return cb(null, json);
  });
};