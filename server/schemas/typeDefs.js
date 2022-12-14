// import the gql tagged template function
const { gql } = require("apollo-server-express");

//creating typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    avatar: String
    email: String
    isVerified: Boolean
    friendCount: Int
    baskets: [Basket]
    followers: [User]
    followerCount: Int
    followings: [User]
    followingCount: Int
    likedPosts: [Post]
    posts: [Post]
  }

  type Post {
    _id: ID
    author: User
    title: String
    createdAt: String
    basketId: String
    basketName: String
    likes: [User]
    comments: [Comment]
    commentCount: Int
    likeCount: Int
    coverPhoto: String
  }

  type Comment {
    _id: ID
    author: User
    commentText: String
    createdAt: String
  }

  type Basket {
    _id: ID
    createdAt: String
    basketName: String
    tickers: [Ticker]
  }

  type Ticker {
    _id: ID
    symbol: String
    market: String
    API: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Bardata {
    Timestamp: String!
    OpenPrice: Float!
    HighPrice: Float!
    LowPrice: Float!
    ClosePrice: Float!
    Volume: Int!
    TradeCount: Int!
    VWAP: Float!
  }

  type Bardata2 {
    Timestamp: String
    OpenPrice: Float
    HighPrice: Float
    LowPrice: Float
    ClosePrice: Float
    Volume: Int
    TradeCount: Int
    VWAP: Float
    Symbol: String
  }

  type Barsdata {
    Name: String
    Barsdata: [Bardata2]
  }

  type GNews {
    title: String
    link: String
    pubDate: String
    content: String
    img: String
  }

  type Trade {
    Timestamp: String
    Exchange: String
    Price: Float
    Size: Float
    Conditions: [String]
    ID: Float
    Tape: String
  }

  type Images {
    url: String
    prompt: String
  }

  type Query {
    users: [User]
    baskets: [Basket]
    images: [Images]
    socialBaskets (username: String!): [Basket]
    likedPosts: [Post]
    posts(userId:ID, postId:ID): [Post]
    signedInUser: User
    post(_id: ID!): Post
    friendsPosts(_id: ID!): [Post]
    user(username: String): User
    basket(_id: ID!): Basket
    barDataQuery(
      symbol: String!
      timeframe: String!
      limit: Int!
      days: Int!
    ): [Bardata]
    barsDataQuery(
      symbols: [String]!
      timeframe: String!
      limit: Int!
      days: Int!
    ): [Barsdata]
    getDataFromBasket(
      id: ID!
      timeframe: String!
      limit: Int!
      days: Int!
    ): [Bardata!]
    getNews(ticker: String!): [GNews]
    getLargeTrades(ticker: String!): [Trade]
    checkLike(postId: String!): Boolean!
    checkFollowing(userId: ID!): Boolean!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser( avatar: String): User
    addVerification( user: String): User
    addTicker(basketId: ID!, ticker: String!): Basket
    addBasket(tickers: [String]!, basketName: String): Basket
    addPost(title: String!, basketId: String, basketName: String): Post
    addComment(postId: ID!, commentText: String!): Post
    addFollowing(followingId: ID!): User
    addImage(url: String!, prompt: String!): Images
    removeFollowing(followingId: ID!): User
    addLike(postId: ID!): Post
    removeLike(postId: ID!): Post
    deleteBasket(basketId: ID!): Basket
  }
`;

//addBasket(basket:[Basket] ): Basket
//exporting the typeDefs
module.exports = typeDefs;
