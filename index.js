'use strict';

var through = require('through2'),
    urlRegExp = require('url-regex'),
    open = require('opn');


module.exports = function (opts) {
  opts = opts || {};
  opts.limit = (opts.limit != null) ? opts.limit : Infinity;
  opts.open = opts.open || open;

  return through(function (chunk, enc, done) {
    (chunk.toString().match(urlRegExp()) || []).forEach(function (url) {
      if (--opts.limit >= 0) {
        opts.open(url);
      }
    });
    done();
  });
};
