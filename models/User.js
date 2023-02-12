const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought')

//email validation
const validateEmail = function (email) {
    const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
    return regex.test(email)
}

// schema to create user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: [validateEmail, 'Please enter a valid email address.']
    },
    thoughts: [thoughtSchema],
    friends: [userSchema]
  },
  {
    toJSON: {
        virtuals: true,
        getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;
