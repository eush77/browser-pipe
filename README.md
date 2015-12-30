[![npm](https://nodei.co/npm/browser-pipe.png)](https://npmjs.com/package/browser-pipe)

# browser-pipe

[![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david]

Open URLs from stdin in the browser.

[travis]: https://travis-ci.org/eush77/browser-pipe
[travis-badge]: https://travis-ci.org/eush77/browser-pipe.svg
[david]: https://david-dm.org/eush77/browser-pipe
[david-badge]: https://david-dm.org/eush77/browser-pipe.png

## Usage

#### `browser-pipe [--count=N] [--dry-run]`

```
$ echo http://github.com |browser-pipe
```

`browser-pipe` forwards stdin to stdout, thus the original output is not modified:

```
$ ecstatic / |browser-pipe
ecstatic serving / at http://0.0.0.0:8000
```

##### `--count=[-]N`, `-n[-]N`

Open the first `N` links instead of all links. With the leading `-`, open the last `N` links.

```fish
$ curl "http://api.duckduckgo.com/?q=unicorn&format=xml&pretty=1" | browser-pipe -n2
```

##### `--dry-run`

Print URLs that would be opened, but do not open them.

## API

#### `browserPipe([opts])`

Returns a writable stream.

__Note__: a single URL must not be split across multiple chunks of data in order to be recognized by this module. This is intentional. Open an issue if there is a legitimate use case where this property does not hold true.

##### `opts.count`

Type: `Number`<br>
Default: `Infinity`

If positive or zero, serves as the upper bound on the number of URLs to open.

If negative, gives the index of the first URL to print, counting from the end.

##### `opts.open`

Type: `Function` <br>
Default: `require('opn')`

URL opener.

## Install

```
npm install browser-pipe
```

## License

MIT
