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

//To add random cover photo to posts
postSchema.pre("save", function(){
  //all  post covers
  const covers = []
    // to add covers and avatars
  for(let i =1; i <= 24; i++){
    covers.push(`cover_${i}.jpg`)
  }
  //get random cover photo
  const randomCoverIndex = Math.floor(Math.random() * covers.length);
  
  this.coverPhoto = covers[randomCoverIndex]
});


postSchema
    .virtual('likeCount')
    .get(function(){
        return this.likes.length
    })

const Post = model('Post', postSchema);


module.exports = Post;