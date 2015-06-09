'use strict';

var assert = require('assert');
var converter = require('./index');

describe('Swagger converter', function () {
  it('should read a local file', function (done) {
    converter.run({'_': ['uber.yml']}, function (err, blueprint) {
      assert.ifError(err);
      assert(blueprint);
      done();
    });
  });

  it('should read a URL', function (done) {
    converter.run({'_': ['http://petstore.swagger.io/v2/swagger.json']}, function (err, blueprint) {
      assert.ifError(err);
      assert(blueprint);
      done();
    });
  });
});
