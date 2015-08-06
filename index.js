'use strict';

var through = require('through2'),
    urlRegExp = require('url-regex'),
    open = require('opn');


module.exports = function (opts) {
  var limit = opts && opts.limit != null ? opts.limit : Infinity;

  return through(function (chunk, enc, done) {
    (chunk.toString().match(urlRegExp()) || []).forEach(function (url) {
      if (--limit >= 0) {
        open(url);
      }
    });
    done();
  });
};
