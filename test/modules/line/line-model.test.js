'use strict';

var expect = require('chai').expect;
require('../../../');
var Line = require('../../../lib/modules/line/line-model');

var fakeLine = {
  provider: 'local',
  name: 'Fake Line',
  email: 'test@test.com',
  password: 'password'
};

var line;

describe('LineModel', function () {
  beforeEach(function (done) {
    line = new Line(fakeLine);
    Line.remove().exec().then(function () {
      done();
    });
  });

  afterEach(function (done) {
    Line.remove().exec().then(function () {
      done();
    });
  });

  it('should begin with no lines', function (done) {
    Line.find({}, function (err, lines) {
      expect(err).to.not.exist;
      expect(lines.length).to.equal(0);
      done();
    });
  });

  it('should fail when saving a duplicate line', function (done) {
    line.save(function () {
      var lineDup = new Line(fakeLine);
      lineDup.save(function (err) {
        expect(err).to.exist;
        done();
      });
    });
  });

  it('should fail when saving without an email', function (done) {
    line.email = '';
    line.save(function(err) {
      expect(err).to.exist;
      done();
    });
  });

  it('should fail if email is already taken', function (done) {
    line.save(function (err, line1) {
      var lineSameEmail = new Line(fakeLine);
      expect(line1.email).to.equal(lineSameEmail.email);
      lineSameEmail.save(function (err, line) {
        expect(err).to.exist;
        expect(err.errors.email.message).to.equal('The specified email address is already in use.');
        done();
      });
    });
  });

  it('should not fail if trying to save the same line', function (done) {
    line.save(function (err, line1) {
      var line2 = new Line(line1);
      line2.save(function (err, line) {
        done();
      });
    });
  });

  it('should authenticate line if password is valid', function () {
    expect(line.authenticate(fakeLine.password)).to.equal(true);
  });

  it('should not authenticate line if password is invalid', function () {
    expect(line.authenticate('blah')).not.equal(true);
  });

  it('should get virtual password', function () {
    expect(line.password).to.equal(fakeLine.password);
  });

  it('should get virtual token info', function () {
    var tokenInfo = line.token;
    expect(tokenInfo._id).to.equal(line._id);
    expect(tokenInfo.role).to.equal(line.role);
  });
});
