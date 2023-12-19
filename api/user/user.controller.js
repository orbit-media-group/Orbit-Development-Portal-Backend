const { gql } = require("apollo-server-express");
const UsersService = require("./user.service");
const userService = new UsersService();

const userTypeDefs = gql`
  type Query {
    users: [User]
  }
  type User {
    fname: String
    lname: String
    email: String
    password: String
  }
`;

const userResolvers = {
  Query: {
    users: () => userService.getAllUsers(),
  },
};

module.exports = { userTypeDefs, userResolvers };
