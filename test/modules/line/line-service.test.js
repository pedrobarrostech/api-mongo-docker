'use strict';

var expect = require('chai').expect;
require('../../../');
var LineModel = require('../../../lib/modules/line/line-model');
var LineService = require('../../../lib/modules/line/line-service');
var commonErrorTypes = require('../../../lib/common-error-types');
var lineErrorTypes = require('../../../lib/modules/line/line-error-types');

describe('LineService', function () {

  beforeEach(function(done) {
    this.lineService = new LineService(LineModel, commonErrorTypes, lineErrorTypes);
    done();
  });

  describe('get()', function () {
    it('should list all lines', function (done) {
      this.lineService.get()
        .then(function (lines) {
        expect(lines.length).to.equal(0);
        done();
      });
    });
  });

  describe('create()', function () {
    it('should create a line', function (done) {
      this.lineService.create({
        name: 'Denis',
        email: 'asd@asd.com',
        password: 'asd'
      })
      .then(function (res) {
        expect(res.token).to.exist;
        done();
      })
      .catch(lineErrorTypes.ValidationError, function () {
        done();
      })
    });

    it('should handle error when creating a line', function (done) {
      this.lineService.create({
        name: 'Denis'
      })
      .catch(lineErrorTypes.ValidationError, function (err) {
        done();
      })
    });
  })
});
