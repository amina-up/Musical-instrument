const mongoose = require("mongoose");
const comment = require("./comment");
const Schema = mongoose.Schema;
const PublicationSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },

  marque: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    require: true
  },

  Comments: [comment],
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("Publication", PublicationSchema);
