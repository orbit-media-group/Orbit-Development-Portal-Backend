import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { ApolloServer } from "apollo-server-express";
import { helloResolvers, helloTypeDefs } from "./api/hello/hello.controller.js";

import express from "express";
import { PORT, SECRET_KEY } from "./config.js";

async function startServer() {
  const typeDefs = mergeTypeDefs([helloTypeDefs]);
  const resolvers = mergeResolvers([helloResolvers]);

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
