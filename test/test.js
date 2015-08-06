'use strict';

var test = require('tape'),
    rewire = require('rewire'),
    through = require('through2');

var events = require('events');

var bpiped = new events;
var bpipe = rewire('..');
bpipe.__set__('open', bpiped.emit.bind(bpiped, 'open'));


test(function (t) {
  t.plan(3);

  var input = through();
  input.write('http://domain.com/first/path/\n');
  input.write('http:// ');
  input.write('http://domain.com/second/path');
  input.write('/garbage\n');
  input.write('(http://domain.com)');
  input.end();

  input.pipe(bpipe());

  var outputIndex = 0;
  var output = [
    'http://domain.com/first/path/',
    'http://domain.com/second/path',
    'http://domain.com'
  ];

  bpiped.on('open', function (url) {
    t.equal(url, output[outputIndex++]);
  });
});
