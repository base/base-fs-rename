/*!
 * base-fs-rename <https://github.com/jonschlinkert/base-fs-rename>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var path = require('path');
var extend = require('extend-shallow');
var isAbsolute = require('is-absolute');

module.exports = function(config) {
  return function plugin(app) {
    if (this.isView || this.isCollection) return;
    if (this.isRegistered('base-fs-rename')) return;

    this.define('rename', function(dest, params) {
      return function(file) {
        var opts = extend({cwd: app.cwd || process.cwd()}, app.options);
        var data = extend({}, opts, config, params);
        data.cwd = path.resolve(data.cwd, dest);
        file.cwd = data.cwd;
        data.base = data.cwd;

        normalizeDir(data);
        normalizeExt(data);

        for (var key in data) {
          if (data.hasOwnProperty(key) && (key in file)) {
            file[key] = data[key];
          }
        }

        // replace leading non-word chars on templates
        if (file.basename && data.replace === true) {
          file.basename = file.basename.replace(/^_/, '.');
          file.basename = file.basename.replace(/^\$/, '');
        }

        file.path = path.resolve(file.base, file.basename);
        return file.base;
      };
    });

    return plugin;
  };
};

function normalizeDir(opts) {
  var dir = opts.dir || opts.dirname;
  if (dir && !isAbsolute(dir)) {
    opts.dirname = path.resolve(opts.cwd, dir);
  }
}

function normalizeExt(opts) {
  var ext = opts.extname || opts.ext;
  if (ext && ext.charAt(0) !== '.') {
    opts.extname = '.' + ext;
  }
}
