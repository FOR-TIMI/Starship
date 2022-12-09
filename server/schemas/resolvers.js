const {
  User,
  Basket,
  Like,
  Post,
  Ticker,
  Comment,
  Image,
} = require("../model");
const {
  getBarData,
  getBarsData,
  addBasketHelper,
  dataToBasket,
  getLargeTrades,
} = require("../utils/API_calls/queries");
const { searchGoogle } = require("../utils/API_calls/gnews");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const { query } = require("express");

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
      console.log(ticker);
      const sg = await searchGoogle(ticker);
      console.log(sg);
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
          return User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("followers")
          .populate("followings")
          .populate("likedPosts")
          .populate("posts")
          .populate("baskets");

        } catch (error) {
          console.error(error);
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
        .populate("likedPosts")
        .populate("posts")
        .populate("baskets");
    },

    //Get all images
    images: async () => {
      return Image.find();
    },

    //Get a user by username
    user: async (parent, { username }) => {
      if (username) {
        return User.findOne({ username })
          .select("-__v -password")
          .populate("followers")
          .populate("followings")
          .populate("likesPosts")
          .populate("posts")
          .populate("baskets");
      } else {
        return new Error("Username parameter empty.");
      }
    },

    //Get all posts
    posts: async (parent, { userId, postId }, context) => {

      /**
       * If a user is signed in, it gets the following id and trys to find all the posts
       */
      const params = userId ? { author: userId } : {};
      if (context.user) {
        if(postId){
          return Post.find({_id: postId})
          .populate("author")
          .populate("likes")
          .populate({
            path: "comments",
            populate: {
              path: "author",
              model: "User",
            },
          });
        }
        try {
          const [{ followings }] = await User.find({
            username: context.user.username,
          });

          if (followings.length) {
            const friendsPosts = await Post.find({
              author: { $in: followings },
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

            //Include posts that weren't made by the users followings
            const allPosts = await Post.find({ $nor: followings })
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
          return Post.find()
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

    //check like
    //Expect that the arguement is gonna be One post Id
    //get liked Posts array from the signed in user
    //Check if the current post Id is included in array of liked posts
    checkLike: async(parent, {postId},context) => {
      if(context.user){
         try{
           //query user liked posts
           const [{likedPosts}] = await User.find(
            { _id : context.user._id},      
           )
           //check if likedPosts includes postId
           return likedPosts.includes(postId)

         }catch(err){
           console.error(err)
         }
      }
      throw new AuthenticationError("You need to be logged In!");
    },

    checkFollowing: async(parent, { userId}, context) => {
      if(context.user){
        try{
          const [{ followings }] = await User.find({ _id: context.user._id})
          return followings.includes(userId)
        } catch(err){
          console.error(err)
        }
      }
      throw new AuthenticationError("You need to be logged In!");
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
     }
    },


    likedPosts: async(parent,args,context) => {
      if(context.user){
        const {likedPosts} = await User.findOne({ _id: context.user._id })
                            .select("-__v -password")


        return Post.find({
          _id : { $in: likedPosts }
        }).populate("author")
          .populate("likes")
          .populate({
            path: "comments",
            populate: {
              path: "author",
              model: "User",
            },
          })
      }

      throw new AuthenticationError("You need to be logged In!");
    }


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

    updateUser: async (parent, { avatar }, context) => {
      // First we create the user
      const update = { avatar: avatar };
      if (context.user) {
        try {
          let user = User.findOneAndUpdate({ _id: context.user._id }, update, {
            new: true,
          });
          return user;
        } catch (err) {
          console.error(err);
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addVerification: async (parent, { user }, context) => {
      if (context.user) {
        try {
          let user = User.findOneAndUpdate(
            { _id: context.user._id },
            { isVerified: true },
            { new: true }
          );
          return user;
        } catch (err) {
          console.error(err);
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addImage: async (parent, { url, prompt }, context) => {
      if (context.user) {
        let image = await Image.create({ url, prompt });
        return image;
      }
      throw new AuthenticationError("You need to be logged in!");
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
        try {
          let basket = await Basket.findOneAndDelete({ _id: basketId });
          return basket;
        } catch {
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
          basketName: basketName,
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
        let c = b.tickers.map((e) => {
          return e.symbol;
        });
        let t = c.includes(symbol);
        // verifying if symbol already exists in basket if not find and update else return error
        if (!t) {
          let basket = await Basket.findOneAndUpdate(
            { _id: basketId }, // get the user Id to access basket:[Basket]
            { $addToSet: { tickers: { symbol } } }, // addtoSet not working ,
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
      if (context.user && followingId) {
        try {
          //To update the person i'm following's follower list
          await User.findOneAndUpdate(
            { _id: followingId },
            { $addToSet: { followers: context.user._id } },
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
          { $pull: { followings: { $in: [followingId] } } },
          { new: true },
          function callback(err, data) {
            console.error(err);
          }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addPost: async (parent, args, context) => {
      if (context.user) {
        const { _id } = await Post.create({
          ...args,
          author: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { posts: _id } },
          { new: true }
        );
        return Post.findById(_id).populate("author");
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

        await User.findOneAndUpdate(
          {_id: context.user._id},
          { $addToSet: {likedPosts: { _id : postId } }},
          { new: true }
        )

        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          { $addToSet: { likes: { _id: context.user._id } } },
          { new: true }
        );

        return updatedPost;
      }
      throw new AuthenticationError("You need to be logged In!");
    },

    removeLike: async(parent, { postId }, context) => {
      if(context.user){
        await User.findOneAndUpdate(
          {_id: context.user._id},
          {$pull :{likedPosts: postId}},
          {new: true}
        )
      const updatedPost =  await Post.findOneAndUpdate(
          {_id: postId},
          {$pull :{likes: context.user._id}},
          {new: true}
        )

        return updatedPost
      }
      throw new AuthenticationError("You need to be logged In!");
    }


  }
};

module.exports = resolvers;
