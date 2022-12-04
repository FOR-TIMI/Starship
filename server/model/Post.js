const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Imported Schemas 
const commentSchema = require('./Comment')

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
    },

    comments: [commentSchema],
    likes: [ 
      {
      type: Schema.Types.ObjectId,
      ref: "User",
     },
    ]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

postSchema
    .virtual('commentCount')
    .get(function(){
        return this.comments.length
    })

postSchema
    .virtual('likeCount')
    .get(function(){
        return this.likes.length
    })

const Post = model('Post', postSchema);


module.exports = Post;