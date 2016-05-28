'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('kind-of', 'typeOf');
require('is-absolute', 'isAbsolute');
require('is-valid-instance');
require('is-registered');
require('through2', 'through');
require('mixin-deep', 'merge');
require = fn;

utils.isValid = function(app) {
  if (!utils.isValidInstance(app, ['app', 'views', 'collection'])) {
    return false;
  }
  if (utils.isRegistered(app, 'base-fs-rename')) {
    return false;
  }
  return true;
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
