'use strict';

var expect = require('chai').expect;

var server = require('../../../');
var LineModel = require('../../../lib/modules/line/line-model');
var LineService = require('../../../lib/modules/line/line-service');
var LineController = require('../../../lib/modules/line/line-controller');

describe('LineController', function () {
  var noop = function () {};
  var testLine = {
    name: 'Test',
    email: 'test@test.com',
    password: '123456',
    provider: 'local',
    role: 'line'
  };
  var fakeId = '5526709bde9252a349e5a054';

  beforeEach(function (done) {
    // Clear lines before testing
    LineModel.remove().exec().then(function () {
      var lineService = new LineService(LineModel);
      this.lineController = new LineController(lineService);
      done();
    }.bind(this))
  });

  describe('index()', function () {
    it('should reply a list of lines', function (done) {
      this.lineController.index(noop, function () {
        done();
      });
    });
  });

  describe('create()', function () {
    it('should create a line', function (done) {
      this.lineController.create({payload: testLine}, function (data) {
        expect(data.token).to.exist;
        done();
      });
    });

  describe('show()', function () {
    it('should retrieve line profile info by id', function (done) {
      var newLine = new LineModel(testLine);
      newLine.save(function (err, line) {
        this.lineController.show({params: {id: line._id}}, function (data) {
          expect(data.name).to.equal('Test');
          expect(data.role).to.equal('line');
          done();
        });
      }.bind(this));
    });

    it('should give an error if profile by id not found', function (done) {
      var newLine = new LineModel(testLine);
      this.lineController.show({params: {id: fakeId}}, function (data) {
        expect(data.output.statusCode).to.equal(404);
        expect(data.output.payload.message).to.equal('Unable to find line');
        done();
      });
    });

    it('should give an error if the query is bad', function (done) {
      var newLine = new LineModel(testLine);
      this.lineController.show({params: {id: 3}}, function (data) {
        expect(data.output.statusCode).to.equal(500);
        expect(data.output.payload.message).to.equal('An internal server error occurred');
        done();
      });
    });
  });

  describe('destroy()', function () {
    it('should remove a line', function (done) {
      var replyCode = function () {
        return {
          code: function (code) {
            expect(code).to.equal(204);
            done();
          }
        }
      };

      var newLine = new LineModel(testLine);
      newLine.save(function (err, line) {
        this.lineController.destroy({params: {id: line._id}}, replyCode);
      }.bind(this));

    });

    it('should fail to remove a line if no valid data passed', function (done) {
      var newLine = new LineModel(testLine);
      newLine.save(function (err, line) {
        this.lineController.destroy({params: {id: 3}}, function (data) {
          expect(data.output.statusCode).to.equal(500);
          expect(data.output.payload.message).to.equal('An internal server error occurred');
          done();
        });
      }.bind(this));

    });
  });

  describe('me()', function () {
    it('should show my info', function (done) {
      var newLine = new LineModel(testLine);
      newLine.save(function (err, line) {
        this.lineController.me({line: line}, function (data) {
          expect(data.name).to.equal(line.name);
          expect(data.email).to.equal(line.email);
          done();
        });
      }.bind(this));
    });

    it('should give an error if line not found by specified id', function (done) {
      this.lineController.me({line: {_id: fakeId}}, function (data) {
        expect(data.output.statusCode).to.equal(404);
        expect(data.output.payload.message).to.equal('Unable to find line');
        done();
      });
    });

    it('should give an error if bad arguments passed', function (done) {
      this.lineController.me({line: {_id: 3}}, function (data) {
        expect(data.output.statusCode).to.equal(500);
        expect(data.output.payload.message).to.equal('An internal server error occurred');
        done();
      });
    });
  });

});
