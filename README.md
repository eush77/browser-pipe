[![npm](https://nodei.co/npm/browser-pipe.png)](https://npmjs.com/package/browser-pipe)

# browser-pipe

[![Dependency Status][david-badge]][david]

Open URLs from stdin in the browser.

[david]: https://david-dm.org/eush77/browser-pipe
[david-badge]: https://david-dm.org/eush77/browser-pipe.png

## Usage

#### `browser-pipe [--limit N]`

```
$ echo http://github.com |browser-pipe
```

`browser-pipe` forwards stdin to stdout, thus the original output is not modified:

```
$ ecstatic / |browser-pipe
ecstatic serving / at http://0.0.0.0:8000
```

Add `--limit=N` option to open the first `N` links.

```
$ curl "http://api.duckduckgo.com/?q=unicorn&format=xml&pretty=1" |browser-pipe --limit=2
```

## API

#### `browserPipe([opts])`

Returns a writable stream.

__Note__: a single URL must not be split across multiple chunks of data in order to be recognized by this module. This is intentional. Open an issue if there is a legitimate use case where this property does not hold true.

##### `opts.limit`

Type: `Number`<br>
Default: `Infinity`

Upper bound on the number of URLs to open.

## Install

```
npm install browser-pipe
```

## License

MIT
