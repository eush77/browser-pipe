#!/usr/bin/env node
'use strict';

var browserPipe = require('./');

var help = require('help-version')(usage()).help;


function usage() {
  return [
    'Usage:  browser-pipe <input',
    '',
    'Reads stdin and open URLs in the browser.'
  ].join('\n');
}


process.stdin.pipe(browserPipe());
