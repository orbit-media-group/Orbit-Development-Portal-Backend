import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { ApolloServer, gql } from "apollo-server-express";

import express from "express";
import { PORT, SECRET_KEY } from "./config.js";

// Define your GraphQL schema
const helloTypeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define your resolvers
const helloResolvers = {
  Query: {
    hello: () => "working..!!!",
  },
};

async function startServer() {
  const typeDefs = [helloTypeDefs];
  const resolvers = [helloResolvers];

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  const app = express();

  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server is running on port :: ${PORT}`);
  });
}

startServer();
