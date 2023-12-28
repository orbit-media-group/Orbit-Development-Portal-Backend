import { gql } from "apollo-server-express";

// Define your GraphQL schema
const helloTypeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define your resolvers
const helloResolvers = {
  Query: {
    hello: () => "working..",
  },
};

export { helloTypeDefs, helloResolvers };
