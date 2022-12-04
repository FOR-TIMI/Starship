const { User, Basket, Like, Post, Ticker, Comment } = require("../model");
const {
  getBarData,
  getBarsData,
  addBasketHelper,
  dataToBasket,
  getLargeTrades,
} = require("../utils/API_calls/queries");
const { searchGoogle } = require("../utils/API_calls/gnews");
const { signToken } = require("../utils/auth");
const mongoose = require('mongoose')
const { AuthenticationError } = require("apollo-server-express");


const resolvers = {
  Query: {
    barDataQuery: async (parent, { symbol, timeframe, limit, days }) => {
      let data = await getBarData(symbol, timeframe, limit, days);
      return data;
    },

    barsDataQuery: async (parent, { symbols, timeframe, limit, days }) => {
      let data = await getBarsData(symbols, timeframe, limit, days);
      return data;
    },

    getNews: async (parent, { ticker }) => {
      const sg = await searchGoogle(ticker);
      return sg;
    },

    getLargeTrades: async (parent, { ticker }) => {
      const trades = await getLargeTrades(ticker);
      return trades;
    },

    //Get signedIn User
    signedInUser: async (parent, args, context) => {
      if (context.user) {
        try{
          const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("followers")
          .populate("followings")
          .populate("posts")
          .populate("baskets");

        return userData;
        } catch (error) {
          console.error(error)
        }
      }
      throw new AuthenticationError("You're currently not signed in");
    },

    //Get all users => friends,posts, baskets
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("followers")
        .populate("followings")
        .populate("posts")
        .populate("baskets");
    },

    //Get a user by username
    user: async (parent, { username }) => {
      if(username) {
        return User.findOne({ username })
          .select("-__v -password")
          .populate("followers")
          .populate("followings")
          .populate("posts")
          .populate("baskets");
      } else {
        return new Error("Username parameter empty.");
      }
    },

    //Get all posts
    posts: async (parent, { username }, context) => {
      /**
       * used to search for all posts related to a user or all posts
       * if the user has followers, it should return all the posts of the followers from the most recent post
       */
      const params = username ? { username } : {};

      /**
       * If a user is signed in, it gets the following id and trys to find all the posts
       */

      if (context.user) {
        try {
          const [{ followings }] = await User.find({
            username: context.user.username,
          });

          if (followings.length) {
            const friendsPosts = await Post.find({
              userId: { $in: followings },
            })
              .populate("author")
              .populate("likes")
              .populate({
                path: "comments",
                populate: {
                  path: "author",
                  model: "User",
                },
              })
              .sort({ createdAt: -1 });

            const allPosts = await Post.find(params)
              .populate("author")
              .populate("likes")
              .populate({
                path: "comments",
                populate: {
                  path: "author",
                  model: "User",
                },
              })
              .sort({ createdAt: -1 });

            return [...friendsPosts, ...allPosts];
          }

          return Post.find(params)
            .populate("author")
            .populate("likes")
            .populate({
              path: "comments",
              populate: {
                path: "author",
                model: "User",
              },
            })
            .sort({ createdAt: -1 });
        } catch {
          return Post.find(params)
            .populate("author")
            .populate("likes")
            .populate({
              path: "comments",
              populate: {
                path: "author",
                model: "User",
              },
            })
            .sort({ createdAt: -1 }); // if the user doesn't have friends
        }
      }
      return Post.find(params)
        .populate("author")
        .populate("likes")
        .populate({
          path: "comments",
          populate: {
            path: "author",
            model: "User",
          },
        })
        .sort({ createdAt: -1 }); // when a user is not signed in
    },

    post: async (parent, { _id }) => {
      return Post.findById(_id)
        .populate("author")
        .populate("likes")
        .populate({
          path: "comments",
          populate: {
            path: "author",
            model: "User",
          },
        });
    },

    getDataFromBasket: async (
      parent,
      { id, timeframe, limit, days },
      context
    ) => {
      const basket = await Basket.find({ _id: id }).populate("ticker");
      const data = [];
      let ret;
      // basket[0].tickers.map(async (each, key) => {
      for (let i = 0; i < basket[0].tickers.length; i++) {
        let bData = {};
        // console.log(basket[0].tickers[i].symbol);
        const barsData = await getBarData(
          basket[0].tickers[i].symbol,
          timeframe,
          limit,
          days
        );
        // console.log(barsData, i);
        bData["Name"] = basket[0].tickers[i].symbol;
        bData["Barsdata"] = barsData;
        for (let b = 0; b < bData.Barsdata.length; b++) {
          bData.Barsdata[b]["Symbol"] = basket[0].tickers[i].symbol;

          // console.log(bData, "BDATA");
          if (b == bData.Barsdata.length - 1) {
            data.push(bData);
          }
          if (
            i == basket[0].tickers.length - 1 &&
            b == bData.Barsdata.length - 1
          ) {
            ret = await dataToBasket(data);
            return ret;
          }
        }
      }
    },

    //Get all Baskets
    baskets: async (parent, args, context) => {
      // console.log("hello");
      if (context.user) {
        const params = context.user.username;
        return Basket.find({ username: params }).sort({ createdAt: -1 });
      } else {
        throw new AuthenticationError("You need to be logged in!");
      }
    },

    //Get one Basket
    basket: async (parent, { _id }) => {
      return Basket.findOne({ _id });
    },
    socialBaskets: async (parent, args, context) => {
  
      if (args.username) {
        const params = args.username;
        return Basket.find({ username: params }).sort({ createdAt: -1 });
      } else {
        throw new Error("No username provided.");
      }}
  },

  
  

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      // First we create the user

      try {
        const user = await User.create({ username, email, password });

        // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
        const token = signToken(user);
        // Return an `Auth` object that consists of the signed token and user's information
        return { token, user };
      } catch (err) {
        if (err.code === 11000) {
          throw new AuthenticationError("Username/email already exists!");
        } else {
          return err;
        }
      }
    },
    login: async (parent, { email, password }) => {
      // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      const user = await User.findOne({ email });

      // If there is no user with that email address, return an Authentication error stating so
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
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
    deleteBasket: async (parent, { basketId }, context) => {
      if (context.user) {
        try{
        let basket = await Basket.findOneAndDelete({_id: basketId});
        return basket;
      }
        catch{
          throw new Error("Something went wrong");
        }
    
      }
    },

    addBasket: async (parent, args, context) => {
      if (context.user) {
        let tickers = await addBasketHelper(args);
        let basketName = args.basketName;
        const basket = await Basket.create({
          tickers: tickers,
          username: context.user.username,
          basketName: basketName
        });

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
        let symbol = ticker;
        let b = await Basket.findById(basketId);
        let c = b.tickers.map((e)=>{return e.symbol});
        let t = c.includes(symbol);
        // verifying if symbol already exists in basket if not find and update else return error
        if(!t){
        let basket = await Basket.findOneAndUpdate(
          { _id: basketId }, // get the user Id to access basket:[Basket]
          { $addToSet: { tickers: {symbol} },}, // addtoSet not working ,
          { new: true, runValidators: true } // flag which tells mongo to return the updated document from the database
        );
        return basket;
      }

        return new Error("Already exists in basket");
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    // userId will be my userId and the followId would be the userId of the person i'm following
    addFollowing: async (parent, { followingId }, context) => {
      if ( context.user && followingId) {
        try {
          //To update the person i'm following's follower list
          await User.findOneAndUpdate(
            { _id: followingId },
            { $addToSet: { followers: context.user._id} },
            { new: true }
          );

          //update my following list and userImFollowing's follower list
          //To update my following list
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { followings: followingId } },
            { new: true }
          );
          return updatedUser;
        } catch {
          throw new AuthenticationError("Something went wrong");
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeFollowing: async (parent, { followingId }, context) => {
      if (context.user && followingId) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { followings: { $in: [followingId] }} },
            { new: true },
            function callback (err,data) {
              console.log(data)
            }
          )
          return updatedUser
        }
        throw new AuthenticationError("You need to be logged in!")
        },

    addPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({
          ...args,
          username: context.user.username,
          userId: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          {
            $push: {
              comments: { commentText, username: context.user.username },
            },
          }
        );
        return updatedPost;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addLike: async (parent, { postId }, context) => {
      if (context.user) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          { $addToSet: { likes: { _id: context.user._id } } },
          { new: true }
        );
        return updatedPost;
      }
      throw new AuthenticationError("You need to be logged In!");
    },
  },
};

module.exports = resolvers;
