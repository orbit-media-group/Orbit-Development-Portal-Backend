import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { ApolloServer } from "apollo-server-express";
import { todoResolvers, todoTypeDefs } from "./api/todo/todo.controller.js";
import { userTypeDefs, userResolvers } from "./api/user/user.controller.js";
import jwt from "jsonwebtoken";

import express from "express";
import { SECRET_KEY } from "./config.js";

const context = ({ req }) => {
  const token = req.headers.authorization || "";

  if (!token) {
    return {};
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
    const user = decoded.user;

    return { user, req };
  } catch (error) {
    return {};
  }
};

async function startServer() {
  const typeDefs = mergeTypeDefs([todoTypeDefs, userTypeDefs]);
  const resolvers = mergeResolvers([todoResolvers, userResolvers]);

  const server = new ApolloServer({ typeDefs, resolvers, context });
  await server.start();

  const app = express();

  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server is running on port :: 4000");
  });
}

startServer();
