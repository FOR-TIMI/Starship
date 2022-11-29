// import the gql tagged template function
const { gql } = require("apollo-server-express");

//creating typeDefs
const typeDefs = gql`  
    type Query {
        posts: [Post]
        post(_id: ID!): Post
        user(username: String!): User
        users: [User]
        basket(_id: ID!): Basket
        baskets: [Basket]
        signedInUser: User
    }

    type User{
        _id: ID
        username: String
        email: String
        friendCount: Int
        baskets: [Basket]
        followers: [User]
        followerCount: Int
        followings: [User]
        followingCount: Int
        posts: [Post]
    }

    type Post{
        _id: ID
        userId: ID
        title: String
        createdAt: String
        username: String
        basketId: String
        likes: [Like]
        comments: [Comment]
        commentCount: Int
        likeCount: Int
    }

    type Comment{
        _id: ID
        username: String
        commentText: String
        createdAt: String
    }

    type Like{
        _id: ID
        username: String
        likeCount: Int
    }
    
    type Basket{
        _id: ID
        createdAt: String
        tickers: [Ticker]
    }

    type Ticker{
        _id: ID
        symbol: String
        market: String
        API: String
    }

    type Auth {
        token: ID!
        user: User
    }


    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addTicker(basketId: ID!, ticker: String!): Basket
        addBasket(tickerId: ID!):Basket
        addPost(title: String!): Post
        addComment(postId: ID!, commentText: String!): Post 
        addFollowing(followingId: ID!): User
    }
`;


//addBasket(basket:[Basket] ): Basket
//exporting the typeDefs
module.exports = typeDefs;