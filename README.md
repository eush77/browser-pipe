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
$ ecstatic dist/ |browser-pipe
```

Add `--limit=N` option to open the first `N` links.

```
$ curl "http://api.duckduckgo.com/?q=unicorn&format=xml&pretty=1" |browser-pipe --limit=2"
```

## API

#### `browserPipe([opts])`

Returns a writable stream.

##### `opts.limit`

Type: `Number`<br>
Default: `Infinity`

Number of URLs to open.

## Install

```
npm install browser-pipe
```

## License

MIT