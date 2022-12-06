const { Schema, model } = require("mongoose");

const imageSchema = new Schema({

  url: {
    type: String,
  },
  prompt: {
    type: String
  }
});

const Image = model('Image', imageSchema);

module.exports = Image;
