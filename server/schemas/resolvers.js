const {getBarData, getBarsData} = require("../utils/API_calls/queries");
const { AuthenticationError } = require("apollo-server-express");
const { signToken, authMiddleware } = require("../utils/auth");
const { User, Basket, Like, Post, Ticker, Comment } = require("../model");

const resolvers = {
  Query: {
    posts: async () => {
      let data = await Post.find().populate("comments").populate("likes");
      return await Post.find().populate("comments").populate("likes");
    },

    barDataQuery: async (parent, { symbol, timeframe, limit, days }) => {
      
      
      let data = await getBarData(symbol, timeframe, limit, days);
      // console.log(data);
      return data;
    },

    barsDataQuery:async (parent, { symbols, timeframe, limit, days }) => {
      let data = await getBarsData(symbols, timeframe, limit, days);
      console.log(data);
      return data;
    },

    // dataQuery: async () => {
    //     let test = {name:"appl"};
    //     // let data = await getBarData("AAPL", "1Min", 100, 2);
    //     console.log(data);
    //     return test;
    //   },



    


    // We are putting this issue on hold due to the complexity of this function.
    // friendsPosts: async (parent, { _id }) => {
    //   let friends = await User.findById(_id).select( "friends" );
    //   let friendsarr = friends.friends;
    //   let arr = [];
    //   let posts = await Post.find().select("_id");
    //   console.log(posts);
    //   console.log(friendsarr);
    //   return posts;
    // },
    
    post: async (parent, { _id }) => {
      return await Post.findById(_id).populate("comments").populate("likes");
    },
    user: async (parent, { username }) => {
      return await User.findOne({ username })
        .populate("basket")
        .populate("friends")
        .populate("posts");
    },
    basket: async (parent, { _id }) => {
      return await Basket.findById(_id).populate("tickers");
    },
    baskets: async () => {
      return await Basket.find().populate("tickers");
    },
    users: async () => {
      return await User.find()
        .populate("basket")
        .populate("friends")
        .populate("posts");
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
        const basket = await Basket.create({
          ...args,
          username: context.user.username,
        }); //need pass in user creds via args so that the basket can be associated to the user (?)
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
          {
            $addToSet: { tickers: { ticker, username: context.user.username } },
          }, // addtoSet to ensure no duplicate ticker objects are added,
          { new: true, runValidators: true } // flag which tells mongo to return the updated document from the database
        );

        return tick;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({
          ...args,
          username: context.user.username,
        });

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addComment: async (parent, { postId, comment }, context) => {
      if (context.user) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          { $push: { comments: { comment, username: context.user.username } } }
        );
        return updatedPost;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};
module.exports = resolvers;
