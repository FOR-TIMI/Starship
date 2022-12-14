const { Schema } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: true,
      maxLength: 280,
      minLength: 1,
    },
    author:   {
      type: Schema.Types.ObjectId,
      ref: "User",
     },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timeStamp => dateFormat(timeStamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = commentSchema;
