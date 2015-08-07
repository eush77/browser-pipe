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
    'Reads stdin and opens URLs in the browser.',
    '',
    'Options:',
    '  --limit=N  Open first N links.',
    '  --dry-run  Print URLs that would be opened. Discards normal output.'
  ].join('\n');
}


var opts = minimist(process.argv.slice(2), {
  boolean: ['dry-run'],
  default: {
    limit: Infinity
  }
});


(function (opts) {
  if (opts['dry-run']) {
    process.stdin.pipe(browserPipe({
      limit: opts.limit,
      open: console.log
    }));
  }
  else {
    process.stdin.pipe(multiWrite([
      process.stdout,
      browserPipe({
        limit: opts.limit
      })
    ]));
  }
}(opts));
