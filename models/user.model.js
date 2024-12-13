const mongoose = require('mongoose');
const {Schema} = mongoose;
const UserSchema = new Schema(
  {
    username: {
        type: String,
        required: [true, "Please enter a username"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    }
  },
  {timestamps: true}
);

const User = mongoose.model("User", UserSchema);

module.exports = User;