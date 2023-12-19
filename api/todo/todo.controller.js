const { gql } = require("apollo-server-express");
const TodoService = require("./todo.service");

const todoService = new TodoService();

// Define your GraphQL schema
const todoTypeDefs = gql`
  type Query {
    todos: [Todo]
  }
  type Todo {
    title: String
    body: String
  }
`;

// Define your resolvers
const todoResolvers = {
  Query: {
    todos: () => todoService.getAllTodos(),
  },
};

module.exports = { todoTypeDefs, todoResolvers };
