'use strict';

var Boom = require('boom');

var commonErrorTypes = require('../../common-error-types');
var userErrorTypes = require('./user-error-types');

/**
 * User controller
 * handles HTTP responses
 */
function UserController(userService) {
  this.userService = userService;
}

UserController.prototype = {
  /**
   * Get list of users
   */
  index: function (req, reply) {
    this.userService.get()
      .then(reply)
      .catch(commonErrorTypes.QueryError, replyError(reply));
  },

  /**
   * Creates a new user
   */
  create: function (req, reply) {
    this.userService.create(req.payload)
      .then(reply)
      .catch(commonErrorTypes.QueryError, replyError(reply));
  },

  /**
   * Get a single user
   */
  show: function (req, reply) {
    this.userService.getProfile(req.params.id)
      .then(reply)
      .catch(commonErrorTypes.QueryError, replyError(reply));
  },

  /**
   * Deletes a user
   */
  destroy: function (req, reply) {
    this.userService.removeById(req.params.id)
      .then(reply)
      .catch(commonErrorTypes.QueryError, replyError(reply));
  },

  /**
   * Update a user
   */
  update: function (req, reply) {
    this.userService.update(req)
      .then(reply)
      .catch(commonErrorTypes.QueryError, replyError(reply));
  }
};

/**
 * Reply a Boom error
 * code defaults to 500
 */
function replyError(reply, code) {
  return function (err) {
    reply(Boom.wrap(err, code));
  };
}

/**
 * Reply a Boom.badData error
 */
function replyValidationError(reply) {
  return function (err) {
    var e = Boom.badData(err.message);
    // Handle mongoose validation error
    if (err.errors) {
      e.output.payload.errors = err.errors;
    }
    reply(e);
  };
}

module.exports = UserController;
