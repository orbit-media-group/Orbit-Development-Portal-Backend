import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { ApolloServer } from "apollo-server-express";
import { todoResolvers, todoTypeDefs } from "./api/todo/todo.controller.js";
import { userTypeDefs, userResolvers } from "./api/user/user.controller.js";
import jwt from "jsonwebtoken";

import express from "express";
import { PORT, SECRET_KEY } from "./config.js";

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

// Define your GraphQL schema
const helloTypeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define your resolvers
const helloResolvers = {
  Query: {
    hello: () => "Bismillah",
  },
};

async function startServer() {
  const typeDefs = mergeTypeDefs([helloTypeDefs]);
  const resolvers = mergeResolvers([helloResolvers]);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    introspection: true,
    playground: true,
  });
  await server.start();

  const app = express();

  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server is running on port :: ${PORT}`);
  });
}

startServer();
