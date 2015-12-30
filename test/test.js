'use strict';

var test = require('tape'),
    rewire = require('rewire'),
    through = require('through2');

var bpipe = rewire('..');


test('browser-pipe', function (t) {
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


test('opts.open', function (t) {
  t.plan(1);

  bpipe.__set__('open', function () {
    t.fail('opts.open did not work');
  });

  bpipe({ open: open }).end('http://domain.com');

  function open (url) {
    t.equal(url, 'http://domain.com');
  }
});


test('opts.count', function (t) {
  t.test('opts.count == 2', function (t) {
    t.plan(2);

    var outputIndex = 0;

    var open = function (url) {
      t.equal(url, 'http://domain.com/' + outputIndex++);
    };

    var pipe = bpipe({ count: 2, open: open });
    pipe.write('http://domain.com/0\n');
    pipe.write('http://domain.com/1\n');
    pipe.write('http://domain.com/2\n');
    pipe.write('http://domain.com/3\n');
    pipe.end();
  });

  t.test('opts.count == 0', function (t) {
    var pipe = bpipe({ count: 0, open: open });
    pipe.write('http://domain.com/0\n');
    pipe.write('http://domain.com/1\n');
    pipe.write('http://domain.com/2\n');
    pipe.write('http://domain.com/3\n');
    pipe.end();

    t.end();

    function open () {
      t.fail();
    }
  });

  t.test('opts.count == -2', function (t) {
    t.plan(2);

    var outputIndex = 2;

    var open = function (url) {
      t.equal(url, 'http://domain.com/' + outputIndex++);
    };

    var pipe = bpipe({ count: -2, open: open });
    pipe.write('http://domain.com/0\n');
    pipe.write('http://domain.com/1\n');
    pipe.write('http://domain.com/2\n');
    pipe.write('http://domain.com/3\n');
    pipe.end();
  });

  t.test('opts.count == -100', function (t) {
    t.plan(2);

    var outputIndex = 0;

    var open = function (url) {
      t.equal(url, 'http://domain.com/' + outputIndex++);
    };

    var pipe = bpipe({ count: -100, open: open });
    pipe.write('http://domain.com/0\n');
    pipe.write('http://domain.com/1\n');
    pipe.end();
  });

  t.test('opts.count == 100', function (t) {
    t.plan(2);

    var outputIndex = 0;

    var open = function (url) {
      t.equal(url, 'http://domain.com/' + outputIndex++);
    };

    var pipe = bpipe({ count: 100, open: open });
    pipe.write('http://domain.com/0\n');
    pipe.write('http://domain.com/1\n');
    pipe.end();
  });

  t.end();
});
