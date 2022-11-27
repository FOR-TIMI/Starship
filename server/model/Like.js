const { Schema } = require("mongoose");

const likeSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
  }
);

module.exports = likeSchema;
