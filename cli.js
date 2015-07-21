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
    'Reads stdin and open URLs in the browser.',
    '',
    'Options:',
    '  --limit=N  Open first N links.'
  ].join('\n');
}


var opts = minimist(process.argv.slice(2), {
  default: {
    limit: Infinity
  }
});


(function (opts) {
  process.stdin.pipe(multiWrite([browserPipe(opts),
                                 process.stdout]));
}(opts));
