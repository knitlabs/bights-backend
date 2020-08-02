const mongoose = require("../config/db");
const Schema = mongoose.Schema;

//schema for storing user details
const userSchema = new Schema({
  name: { type: String, required: true },
  emailId: { type: String, required: true },
  passwordHash: { type: String, required: true },
  creationDate: { type: Date, required: true },
//  photoUrl: { type: String },
  isInUse: { type: Boolean, default: true },
  skillRatings: {type:Map, of: Number}, //Default value for new key is zero 
});

const User = mongoose.model("user", userSchema);

module.exports = User;
