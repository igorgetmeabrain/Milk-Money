const mongoose = require('mongoose');
const { type } = require('os');
const {Schema} = mongoose;

const UserSchema = new Schema(
  {
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    security: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    transactions: {
      type: Array,
      required: true
    },
    balance: {
      type: Number,
      required: true
    },
    scores: {
      type: Array,
      required: true
    }
  },
);

const User = mongoose.model("User", UserSchema);

module.exports = User;