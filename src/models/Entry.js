const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entrySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: { type: String, required: true },
  image: String,
  author: String,
  date: { type: Date, default: new Date() },
});

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;
