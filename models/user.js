const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const config = require("config");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["Vendeur", "Client", "Admin"],
    required: true
  },
  phone: {
    type: Number,
    required: function() {
      return this.role === "Vendeur";
    }
  }
});

UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    config.get("jwtSecret"),
    { expiresIn: "5h" }
  );
  return token;
};

module.exports = mongoose.model("User", UserSchema);
