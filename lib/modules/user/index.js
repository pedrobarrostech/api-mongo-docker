'use strict';

var UserModel = require('./user-model');
var UserService = require('./user-service');
var UserController = require('./user-controller');

var userService = new UserService(UserModel);
var userController = new UserController(userService);

module.exports = [
  {
    method: 'GET',
    path: '/users',
    config: {
      handler: userController.index,
      bind: userController
    }
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    config: {
      handler: userController.destroy,
      bind: userController
    }
  },

  {
    method: 'PUT',
    path: '/users/{id}',
    config: {
      handler: userController.update,
      bind: userController
    }
  },

  {
    method: 'GET',
    path: '/users/{id}',
    config: {
      handler: userController.show,
      bind: userController
    }
  },
  {
    method: 'POST',
    path: '/users',
    handler: userController.create,
    config: {
      bind: userController
    }
  }
];
