'use strict';

var through = require('through2'),
    urlRegExp = require('url-regex'),
    open = require('opn');


module.exports = function (opts) {
  opts = opts || {};
  opts.count = (opts.count != null) ? opts.count : Infinity;
  opts.open = opts.open || open;

  if (opts.count >= 0) {
    return openFirst(opts.count, opts.open);
  }
  else {
    return openLast(-opts.count, opts.open);
  }
};


function openFirst (count, open) {
  return through(function (chunk, enc, cb) {
    getUrls(chunk.toString()).forEach(function (url) {
      if (--count >= 0) {
        open(url);
      }
    });
    cb();
  });
}


function openLast (count, open) {
  var queue = Array(count);

  return through(function (chunk, enc, cb) {
    getUrls(chunk.toString()).forEach(function (url) {
      queue.shift();
      queue.push(url);
    });
    cb();
  }, function (cb) {
    // `forEach` is not called for missing elements.
    queue.forEach(function (url) {
      // `open` is external, we shouldn't call it with more arguments
      // than it is required to handle.
      open(url);
    });
    cb();
  });
}


function getUrls (str) {
  return str.match(urlRegExp()) || [];
}
