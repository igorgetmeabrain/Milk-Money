const mongoose = require('mongoose');
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
    }
  },
  {timestamps: true}
);

const User = mongoose.model("User", UserSchema);

module.exports = User;