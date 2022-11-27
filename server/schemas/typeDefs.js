// import the gql tagged template function
const { gql } = require("apollo-server-express");

//creating typeDefs
const typeDefs = gql`

    type User{
        _id: ID
        username: String
        email: String
        friendCount: Int
        basket: [Basket]
        friends: [User]
        posts: [Post]
    }

    type Post{
        _id: ID
        title: String
        createdAt: String
        username: String
        basketId: String
        likes: [Like]
        comments: [Comment]
        
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
    }
    
    type Basket{
        _id: ID
        createdAt: String
        tickers: [Ticker]
    }

    type Ticker{
        _id: ID
        ticker: String
        market: String
        API: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        posts: [Post]
        friendsPosts(_id: ID!): [Post]
        post(_id: ID!): Post
        user(username: String!): User
        basket(_id: ID!): Basket
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addTicker(basketId: ID!, ticker: String!): Basket
        addBasket(tickers: [Ticker]):Basket
        addPost(title: String): Post
        addComment(postId: ID!, comment: String!): Post 
        addFriend(friendId: ID!): User
    }
`;

//addBasket(basket:[Basket] ): Basket
//exporting the typeDefs
module.exports = typeDefs;