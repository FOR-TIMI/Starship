const { AuthenticationError } = require("apollo-server-express");
const { signToken, authMiddleware } = require("../utils/auth");
const { User, Basket, Like, Post, Ticker, Comment } = require("../model");

const resolvers = {
  Query: {
    posts: async () => {
      return await Post.find();
    },
    friendsposts: async (parent, { _id }) => {
      let posts = Post.find();
      let friends = User.findById(_id);
    },
    // post: async (parent, {username})=>
    
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
    // addBasket: async (parent, { thoughtId, ticker }, context) => {
    //     if (context.user) {

            
    //         const basket = await Basket.create({ ...args, username: context.user.username });
        
    //         await User.findByIdAndUpdate(
    //           { _id: context.user._id },
    //           { $push: { thoughts: thought._id } },
    //           { new: true } // flag which tells mongo to return the updated document from the database 
    //         );
        
    //         return basket;
    //       }

    //       throw new AuthenticationError("You need to be logged in!");
    //   },
    // },
  },
};
