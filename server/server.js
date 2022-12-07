const express = require("express");
const db = require("./config/connection");
const app = express();
const path = require("path");

//Port
const PORT = process.env.PORT || 3001;

//Apollo server
const { ApolloServer } = require("apollo-server-express");

//Authentication middleware
const { authMiddleware } = require("./utils/auth");

// TypeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");

//To create a new apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// To parse out data with middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
  });
}

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  //Integrate our apollo server with the express application as middleware
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      // log where we can go to test our GQL API
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Intialize server
startApolloServer(typeDefs, resolvers);
