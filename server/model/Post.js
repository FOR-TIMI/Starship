const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: 'You must add a title',
      minlength: 1,
      maxlength: 100
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    coverPhoto: {
      type: String,
      required: 'You must select a cover for your post',
    },
    author:{
      type: Schema.Types.ObjectId, 
      ref: 'User'
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

postSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Post = model('Post', postSchema);

module.exports = Post;