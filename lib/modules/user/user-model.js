'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var userErrorTypes = require('./user-error-types');

var UserSchema = new Schema({
  name: String,
  email: {type: String, lowercase: true},
  address: String
});

/**
 * Validations
 */

// Validate empty name
UserSchema
  .path('name')
  .validate(function (name) {
    return name.length;
  }, 'Name cannot be blank');


// Validate empty email
UserSchema
  .path('email')
  .validate(function (email) {
    return email.length;
  }, 'Email cannot be blank');

// Validate empty adress
UserSchema
  .path('address')
  .validate(function (address) {
    return address.length;
  }, 'Address cannot be blank');

module.exports = mongoose.model('User', UserSchema);
