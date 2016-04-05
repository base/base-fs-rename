# base-fs-rename [![NPM version](https://img.shields.io/npm/v/base-fs-rename.svg?style=flat)](https://www.npmjs.com/package/base-fs-rename) [![NPM downloads](https://img.shields.io/npm/dm/base-fs-rename.svg?style=flat)](https://npmjs.org/package/base-fs-rename) [![Build Status](https://img.shields.io/travis/node-base/base-fs-rename.svg?style=flat)](https://travis-ci.org/node-base/base-fs-rename)

> Plugin for 'base' applications that adds a `rename` method that, when called, can be passed to `app.dest()` as the rename function (this is an instance plugin, not pipeline plugin)

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install base-fs-rename --save
```

## Usage

Requires either the [base-fs](https://github.com/node-base/base-fs) or the [assemble-fs](https://github.com/assemble/assemble-fs) plugin to work.

```js
var fs = require('base-fs');
var rename = require('base-fs-rename');
var Base = require('base');
var app = new Base();

app.use(rename());
app.use(fs());

app.src('fixtures/a.txt')
  // pass `app.rename()` to `app.dest()`
  .pipe(app.dest(app.rename('actual')));
```

## Related projects

You might also be interested in these projects:

* [assemble-fs](https://www.npmjs.com/package/assemble-fs): Assemble plugin to add methods to assemble for working with the file system, like src,… [more](https://www.npmjs.com/package/assemble-fs) | [homepage](https://github.com/assemble/assemble-fs)
* [base](https://www.npmjs.com/package/base): base is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting… [more](https://www.npmjs.com/package/base) | [homepage](https://github.com/node-base/base)
* [base-fs](https://www.npmjs.com/package/base-fs): base-methods plugin that adds vinyl-fs methods to your 'base' application for working with the file… [more](https://www.npmjs.com/package/base-fs) | [homepage](https://github.com/node-base/base-fs)
* [base-fs-conflicts](https://www.npmjs.com/package/base-fs-conflicts): Detect potential file system conflicts and if necessary prompt the user before overwriting files. | [homepage](https://github.com/node-base/base-fs-conflicts)
* [base-task](https://www.npmjs.com/package/base-task): base plugin that provides a very thin wrapper around [https://github.com/doowb/composer](https://github.com/doowb/composer) for adding task methods to… [more](https://www.npmjs.com/package/base-task) | [homepage](https://github.com/node-base/base-task)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/base-fs-rename/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/node-base/base-fs-rename/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v, on April 05, 2016._