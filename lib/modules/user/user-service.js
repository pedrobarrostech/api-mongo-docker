'use strict';

var q = require('bluebird');

var commonErrorTypes = require('../../common-error-types');
var userErrorTypes = require('./user-error-types');

/**
 * User service
 */
function UserService(UserModel) {
  this.UserModel = UserModel;
}

UserService.prototype = {
  /**
   * Get list of users
   */
  get: function () {
    var deferred = q.pending();

    this.UserModel.find({}, function (err, users) {
      if (err) {
        deferred.reject(new commonErrorTypes.QueryError);
      } else {
        deferred.resolve(users);
      }
    });

    return deferred.promise;
  },

  /**
   * Creates a new user
   */
  create: function (data) {
    var deferred = q.pending();
    var newUser = new this.UserModel(data);

    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.save(function (err, user) {
      var token;
      if (err) {
        deferred.reject(new userErrorTypes.ValidationError(err));
      } else {
        deferred.resolve({token: token});
      }
    }.bind(this));

    return deferred.promise;
  },

  /**
   * Get a single user
   */
  getById: function (userId) {
    var deferred = q.pending();

    this.UserModel.findById(userId, function (err, user) {
      if (err) {
        deferred.reject(new commonErrorTypes.QueryError);
      } else if (!user) {
        deferred.reject(new userErrorTypes.UserNotFound);
      } else {
        deferred.resolve(user);
      }
    });

    return deferred.promise;
  },

  /**
   * Get a user profile
   */
  getProfile: function (userId) {
    var deferred = q.pending();

    this.getById(userId)
      .then(function (user) {
        deferred.resolve(user.profile);
      }, deferred.reject.bind(deferred));

    return deferred.promise;
  },

  /**
   * Deletes a user
   */
  removeById: function (userId) {
    var deferred = q.pending();

    this.UserModel.findByIdAndRemove(userId, function (err) {
      if (err) {
        deferred.reject(new commonErrorTypes.QueryError);
      } else {
        deferred.resolve();
      }
    }.bind(this));

    return deferred.promise;
  },

  /**
   * Change a users update
   */
  update: function (request) {
    var deferred = q.pending();
    this.UserModel.findOneAndUpdate({_id: request.params.id}, request.payload, function (error, data) {
        if (error) {
           deferred.reject(new commonErrorTypes.QueryError);
        } else {
          deferred.resolve();
        }
    });
    return deferred.promise;
  }

}

module.exports = UserService;
