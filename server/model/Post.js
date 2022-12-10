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
    basketId: {
      type: String,
    },
    basketName: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    coverPhoto: {
      type: String,
      default:"cover_22.jpg",
      match: [/cover_(2[0-4]|1[0-9]|[1-9]).jpg/, "Not a valid cover photo"]
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

//To add random to posts
postSchema.pre("save", function(){
  //get random 
  const randomCoverIndex = Math.floor(Math.random() * 24) + 1
  this.coverPhoto = `cover_${randomCoverIndex}.jpg`
});


postSchema
    .virtual('likeCount')
    .get(function(){
        return this.likes.length
    })

const Post = model('Post', postSchema);


module.exports = Post;