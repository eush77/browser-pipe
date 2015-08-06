'use strict';

var test = require('tape'),
    rewire = require('rewire'),
    through = require('through2');

var bpipe = rewire('..');


test(function (t) {
  t.plan(3);

  var outputIndex = 0;
  var output = [
    'http://domain.com/first/path/',
    'http://domain.com/second/path',
    'http://domain.com'
  ];

  bpipe.__set__('open', function (url) {
    t.equal(url, output[outputIndex++]);
  });

  var input = through();
  input.write('http://domain.com/first/path/\n');
  input.write('http:// ');
  input.write('http://domain.com/second/path');
  input.write('/garbage\n');
  input.write('(http://domain.com)');
  input.end();

  input.pipe(bpipe());
});


test('limit', function (t) {
  t.plan(2);

  var outputIndex = 0;

  bpipe.__set__('open', function (url) {
    t.equal(url, 'http://domain.com/' + outputIndex++);
  });

  var pipe = bpipe({ limit: 2 });
  pipe.write('http://domain.com/0\n');
  pipe.write('http://domain.com/1\n');
  pipe.write('http://domain.com/2\n');
  pipe.write('http://domain.com/3\n');
  pipe.end();
});
