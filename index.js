/*!
 * base-fs-rename <https://github.com/jonschlinkert/base-fs-rename>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var path = require('path');
var placeholders = require('placeholders');
var isObject = require('isobject');
var merge = require('mixin-deep');

module.exports = function(config) {
  return function(app) {
    if (this.isRegistered('base-fs-rename')) return;

    this.define('rename', function(dest, params) {
      if (isObject(dest)) {
        params = dest;
        dest = null;
      }

      params = params || {};
      var opts = merge({}, config, this.options);
      var fn = placeholders(opts);

      return function(file) {
        for (var key in params) {
          if (params.hasOwnProperty(key)) {
            file[key] = params[key];
          }
        }

        file.base = path.resolve(file.dest || dest || this.cwd || file.base);

        var data = merge({}, opts, params, copyPaths(file));
        file.path = fn(path.resolve(file.base, file.basename), data);
        file.base = path.dirname(file.path);

        // replace leading non-word chars on templates
        if (file.basename && opts.replace === true) {
          file.basename = file.basename.replace(/^_/, '.');
          file.basename = file.basename.replace(/^\$/, '');
        }

        return file.base;
      }.bind(this);
    });
  };
};

/**
 * Since vinyl file paths are getters/setters, we need to
 * copy paths from `file` onto a plain object so the object
 * can be used as context for resolving path params.
 */

function copyPaths(file, fn) {
  var paths = {};
  paths.cwd = file.cwd;
  paths.base = file.base;
  paths.path = file.path;
  paths.absolute = path.resolve(file.path);
  paths.dirname = file.dirname;
  paths.relative = file.relative;
  paths.basename = file.basename;
  paths.extname = file.extname;
  paths.ext = file.extname;

  paths.filename = file.stem;
  paths.name = file.stem;
  paths.stem = file.stem;
  if (typeof fn === 'function') {
    var val = fn(paths);
    if (val) paths = val;
  }
  return paths;
}
