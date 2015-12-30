#!/usr/bin/env node
'use strict';

var browserPipe = require('./');

var help = require('help-version')(usage()).help,
    minimist = require('minimist'),
    multiWrite = require('multi-write-stream');


function usage() {
  return [
    'Usage:  browser-pipe [OPTION]... <input',
    '',
    'Forwards stdin to stdout and opens URLs in the browser.',
    '',
    'Options:',
    '  --count=N, n[-]N  Open first N links. With the leading `-`, start',
    '                    from Nth last URL.',
    '  --dry-run         Print URLs that would be opened. Discards normal',
    '                    output.'
  ].join('\n');
}


var opts = minimist(process.argv.slice(2), {
  boolean: ['dry-run'],
  alias: {
    count: 'n',
  },
  default: {
    count: Infinity
  }
});


(function (opts) {
  if (opts['dry-run']) {
    process.stdin.pipe(browserPipe({
      count: opts.count,
      open: console.log
    }));
  }
  else {
    process.stdin.pipe(multiWrite([
      process.stdout,
      browserPipe({
        count: opts.count
      })
    ]));
  }
}(opts));
