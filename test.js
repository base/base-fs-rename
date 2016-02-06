'use strict';

require('mocha');
var fs = require('fs');
var assert = require('assert');
var Base = require('base');
var vfs = require('base-fs');
var del = require('delete');
var rename = require('./');
var base;

describe('base-rename', function() {
  describe('plugin', function() {
    it('should export a function', function() {
      assert.equal(typeof rename, 'function');
    });

    it('should register as a plugin', function() {
      base = new Base();
      base.use(rename());
      assert.equal(typeof base.rename, 'function');
    });
  });

  describe('rename', function() {
    beforeEach(function() {
      base = new Base();
      base.use(rename());
      base.use(vfs());
    });

    afterEach(function(cb) {
      del('actual/', cb);
    });

    it('should rename a directory', function(cb) {
      base.src('fixtures/a.txt')
        .pipe(base.dest(base.rename('actual')))
        .on('end', function() {
          fs.exists('actual/a.txt', function(exists) {
            assert(exists);
            cb();
          });
        });
    });

    it('should rename a file', function(cb) {
      base.src('fixtures/a.txt')
        .pipe(base.dest(base.rename('actual', {basename: 'foo.txt'})))
        .on('end', function() {
          fs.exists('actual/foo.txt', function(exists) {
            assert(exists);
            cb();
          });
        });
    });

    it('should replace non-word characters when opts.replace is true', function(cb) {
      base = new Base();
      base.use(rename({ replace: true }));
      base.use(vfs());

      base.src('fixtures/*')
        .pipe(base.dest(base.rename('actual')))
        .on('end', function() {
          fs.exists('actual/.dotfile', function(exists) {
            assert(exists);
            cb();
          });
        });
    });
  });
});

