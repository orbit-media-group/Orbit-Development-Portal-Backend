import gql from "apollo-server-express";
import HelloService from "./hello.service";

const helloService = new HelloService();

// Define your GraphQL schema
const helloTypeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define your resolvers
const helloResolvers = {
  Query: {
    hello: () => helloService.getHelloMessage(),
  },
};

module.exports = { helloTypeDefs, helloResolvers };
