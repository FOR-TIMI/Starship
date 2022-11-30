const { Schema, model } = require("mongoose");
const dateFormat =require('../utils/dateFormat');

// Imported Schemas 
const likeSchema = require('./Like')
const commentSchema = require('./Comment')

const postSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  userId:{
    type: String,
    required: true
  },
  title: {
    type: String,
    required: "You must add a title",
    minLength: 1,
    maxLength: 100,
  },
  basketId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timeStamp => dateFormat(timeStamp)
  },

  comments: [commentSchema],
  likes: [likeSchema]
},
{
    toJSON: {
        getters: true,
        virtuals: true
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

module.exports = Post