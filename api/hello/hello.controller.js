const { gql } = require("apollo-server-express");
const HelloService = require("./hello.service");

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
