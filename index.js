'use strict';

var through = require('through2'),
    urlRegExp = require('url-regex'),
    open = require('opn');


module.exports = function () {
  return through(function (chunk, enc, done) {
    chunk.toString().match(urlRegExp()).forEach(function (url) {
      open(url);
    });
    done();
  });
};
