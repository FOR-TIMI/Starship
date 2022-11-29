const { User, Basket, Like, Post, Ticker, Comment } = require("../model");

const { signToken } =require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {

    //Get signedIn User
  signedInUser: async(parent, args,context) => {
    if(context.user){
      const userData = await User.findOne({_id: context.user._id})
      .select('-__v -password')
      .populate('followers')
      .populate('followings')
      .populate('posts')
      .populate('baskets')

        return userData
    }
    throw new AuthenticationError("You're currently not signed in")
  },

   //Get all users => friends,posts, baskets
   users: async() => {
     return User.find()
                .select('-__v -password')
                .populate('followers')
                .populate('followings')
                .populate('posts')
                .populate('baskets')
   },

   //Get a user by username
   user: async(parent, { username }) => {
     return User.findOne({ username })
               .select('-__v -password')
               .populate('followers')
               .populate('followings')
               .populate('posts')
               .populate('baskets')
   },

    //Get all posts
    posts: async(parent, { username }, { user }) => {

      /**
       * used to search for all posts related to a user or all posts
       * if the user has followers, it should return all the posts of the followers from the most recent post
       */
      const params = username ? { username }: {};

      /**
       * If a user is signed in, it gets the following id and trys to find all the posts
       */
      
      if (user) {
          try{
            return Post.find( { userId : { $in : user.followings } })
                      .sort({ createdAt: -1})

          } catch{
            return Post.find(params).sort({createdAt: -1}); // if user does not have any friends
        }
      
      } 
      return  Post.find(params).sort({createdAt: -1}); // when a user is not signed in
      
    },
 
    //To get One post
    post: async(parent, {_id}) => {
       return Post.findOne({_id})
    },

    //Get all Baskets
    baskets: async(parent, { username }) => {

      const params = username ? { username } : {};

      return Basket.find(params).sort({createdAt: -1});
    },

    //Get one Basket
    basket: async(parent, {_id}) => {
        return Basket.findOne({_id})
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      // First we create the user
      const user = await User.create({ username, email, password });
      // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
      const token = signToken(user);
      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      const user = await User.findOne({ email });

      // If there is no user with that email address, return an Authentication error stating so
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, return an Authentication error stating so
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      // If email and password are correct, sign user into the application with a JWT
      const token = signToken(user);

      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },
    //addBasket(basketId: ID!): Basket
    //basket: [Basket]
    //ADD basket to USER 
    //use parent? 
    // IM NOT TOO SURE IF I AM PASSING IN THE RIGHT ARGS do we need {basketId} instead? , line 52 
    addBasket: async (parent, args, context) => {
      if (context.user) {
        const basket = await Basket.create({ ...args, username: context.user.username }); //need pass in user creds via args so that the basket can be associated to the user (?)
        //NOT TOO SURE THIS WILL WORK WILL NEED TO DISCUSS 
        await User.findByIdAndUpdate(
          { _id: context.user._id }, // get the user Id to access basket:[Basket] 
          { $push: { basket: basket._id } }, // push only to the basket component of the User TypeDef, by basketId
          { new: true, runValidators: true } // flag which tells mongo to return the updated document from the database 
        );

        return basket;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    //ADD tickers to basket object, NTS ADD API and MARKET Arguments if need later on 
    addTicker: async (parent, { basketId, ticker }, context) => {
      if (context.user) {
        const tick = await Ticker.create({ ticker }); //need pass in user creds via args so that the basket can be associated to the user (?)
        //NOT TOO SURE THIS WILL WORK WILL NEED TO DISCUSS 
        await Basket.findOneAndUpdate(
          { _id: basketId }, // get the user Id to access basket:[Basket] 
          { $addToSet: { tickers: { ticker, username: context.user.username } } }, // addtoSet to ensure no duplicate ticker objects are added, 
          { new: true, runValidators: true } // flag which tells mongo to return the updated document from the database 
        );

        return tick;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    // userId will be my userId and the followId would be the userId of the person i'm following
    addFollowing: async (parent, { followingId }, context) => {
         
      if (context.user && followingId) {
        try{
          //To update the person i'm following's follower list
          await User.findOneAndUpdate(
            {_id : followingId},
            {$addToSet: { followers: context.user._id } },
          )

          //update my following list and userImFollowing's follower list
          //To update my following list
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { followings: followingId } },
          { new: true }
        )
        return updatedUser
       } catch{
          throw new AuthenticationError("Something went wrong")
       }
      }
      throw new AuthenticationError("You need to be logged in!")
    },
    
    addPost: async (parent, args, context) => {

      if (context.user) {
        const post = await Post.create({ ...args, username: context.user.username, userId: context.user._id })

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true }
        )
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!")
    },

    addComment: async (parent, { postId, comment }, context) => {
      if (context.user) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          { $push: { comments: { comment, username: context.user.username } } }
        )
        return updatedPost;
      }
      throw new AuthenticationError("You need to be logged in!")
    },
  }

}


module.exports = resolvers;

